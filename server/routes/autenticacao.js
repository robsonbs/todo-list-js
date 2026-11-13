// ============================================================
// AUTENTICACAO.JS — Cadastro, sessão e recuperação de conta
// ------------------------------------------------------------
// Responsabilidade: implementar fluxos de autenticação sem expor tokens.
// NÃO faz: não entrega ao cliente hashes, tokens armazenados ou SQL interno.
// Conceitos ensinados: Argon2id, sessão, tokens de uso único e rate limiting.
// ============================================================

import { createHash, randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import express from 'express';
import { rateLimit } from 'express-rate-limit';

const senhaFicticia = argon2.hash(randomBytes(32));

function limitarTentativas(configuracao) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: configuracao.ambiente === 'test' ? 100 : 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { erro: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
  });
}

function normalizarEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function emailValido(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function senhaValida(senha) {
  return typeof senha === 'string' && senha.length >= 12 && Buffer.byteLength(senha, 'utf8') <= 128;
}

function resumirToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function criarToken() {
  return randomBytes(32).toString('base64url');
}

function linkDeAutenticacao(configuracao, tipo, token) {
  const url = new URL('/', configuracao.urlPublica);
  url.searchParams.set(tipo === 'confirmar_email' ? 'confirmar-email' : 'redefinir-senha', token);
  return url.toString();
}

async function criarTokenParaUsuario(poolBanco, usuarioId, tipo, configuracao, enviarEmail, email) {
  const token = criarToken();
  const tokenHash = resumirToken(token);

  await poolBanco.query(
    `INSERT INTO tokens_autenticacao (usuario_id, tipo, token_hash, expira_em)
     VALUES ($1, $2, $3, now() + interval '30 minutes')`,
    [usuarioId, tipo, tokenHash]
  );

  await enviarEmail({
    destinatario: email,
    tipo,
    link: linkDeAutenticacao(configuracao, tipo, token),
  });
}

function salvarSessao(requisicao) {
  return new Promise((resolver, rejeitar) => {
    requisicao.session.save((erro) => {
      if (erro) {
        rejeitar(erro);
        return;
      }

      resolver();
    });
  });
}

function renovarSessao(requisicao) {
  return new Promise((resolver, rejeitar) => {
    requisicao.session.regenerate((erro) => {
      if (erro) {
        rejeitar(erro);
        return;
      }

      resolver();
    });
  });
}

async function consumirToken(poolBanco, token, tipo, executarComUsuario) {
  if (typeof token !== 'string' || token.length > 128) {
    return false;
  }

  const cliente = await poolBanco.connect();

  try {
    await cliente.query('BEGIN');
    const encontrado = await cliente.query(
      `SELECT id, usuario_id
       FROM tokens_autenticacao
       WHERE token_hash = $1 AND tipo = $2
         AND consumido_em IS NULL AND expira_em > now()
       FOR UPDATE`,
      [resumirToken(token), tipo]
    );

    if (encontrado.rowCount === 0) {
      await cliente.query('ROLLBACK');
      return false;
    }

    const registro = encontrado.rows[0];
    await executarComUsuario(cliente, registro.usuario_id);
    await cliente.query('UPDATE tokens_autenticacao SET consumido_em = now() WHERE id = $1', [
      registro.id,
    ]);
    await cliente.query('COMMIT');
    return true;
  } catch (erro) {
    await cliente.query('ROLLBACK');
    throw erro;
  } finally {
    cliente.release();
  }
}

/**
 * Cria as rotas de conta com dependências explícitas para facilitar testes.
 * @param {object} dependencias Recursos de banco, e-mail e configuração.
 * @returns {import('express').Router} Rotas de autenticação.
 */
export function criarRotasAutenticacao({ poolBanco, enviarEmail, configuracao }) {
  const roteador = express.Router();
  const limitarLogin = limitarTentativas(configuracao);

  roteador.get('/me', (requisicao, resposta) => {
    if (!requisicao.session.usuarioId) {
      resposta.status(200).json({ autenticado: false });
      return;
    }

    resposta.status(200).json({
      autenticado: true,
      usuario: {
        id: requisicao.session.usuarioId,
        email: requisicao.session.email,
      },
    });
  });

  roteador.post('/registrar', limitarLogin, async (requisicao, resposta) => {
    const email = normalizarEmail(requisicao.body?.email);
    const senha = requisicao.body?.senha;

    if (!emailValido(email) || !senhaValida(senha)) {
      resposta.status(400).json({
        erro: 'Informe um e-mail válido e uma senha com 12 a 128 bytes.',
      });
      return;
    }

    const hashSenha = await argon2.hash(senha, { type: argon2.argon2id });
    const inserido = await poolBanco.query(
      `INSERT INTO usuarios (email, hash_senha)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email`,
      [email, hashSenha]
    );

    if (inserido.rowCount > 0) {
      try {
        await criarTokenParaUsuario(
          poolBanco,
          inserido.rows[0].id,
          'confirmar_email',
          configuracao,
          enviarEmail,
          email
        );
      } catch (erro) {
        // Não revelar a existência da conta nem o token na resposta HTTP.
        console.error('Falha ao enviar confirmação de e-mail:', erro);
      }
    }

    resposta.status(202).json({
      mensagem: 'Se o cadastro puder ser concluído, enviaremos instruções ao e-mail informado.',
    });
  });

  roteador.post('/confirmar-email', limitarLogin, async (requisicao, resposta) => {
    const confirmado = await consumirToken(
      poolBanco,
      requisicao.body?.token,
      'confirmar_email',
      async (cliente, usuarioId) => {
        await cliente.query(
          'UPDATE usuarios SET email_confirmado_em = COALESCE(email_confirmado_em, now()) WHERE id = $1',
          [usuarioId]
        );
      }
    );

    if (!confirmado) {
      resposta.status(400).json({ erro: 'Link inválido, expirado ou já utilizado.' });
      return;
    }

    resposta.status(200).json({ mensagem: 'E-mail confirmado. Agora você pode entrar.' });
  });

  roteador.post('/reenviar-confirmacao', limitarLogin, async (requisicao, resposta) => {
    const email = normalizarEmail(requisicao.body?.email);

    if (emailValido(email)) {
      const usuario = await poolBanco.query(
        'SELECT id, email FROM usuarios WHERE email = $1 AND email_confirmado_em IS NULL',
        [email]
      );

      if (usuario.rowCount > 0) {
        try {
          await criarTokenParaUsuario(
            poolBanco,
            usuario.rows[0].id,
            'confirmar_email',
            configuracao,
            enviarEmail,
            email
          );
        } catch (erro) {
          console.error('Falha ao reenviar confirmação de e-mail:', erro);
        }
      }
    }

    resposta.status(202).json({
      mensagem: 'Se houver uma conta aguardando confirmação, enviaremos um novo link.',
    });
  });

  roteador.post('/login', limitarLogin, async (requisicao, resposta) => {
    const email = normalizarEmail(requisicao.body?.email);
    const senha = requisicao.body?.senha;

    if (!emailValido(email) || typeof senha !== 'string' || senha.length > 128) {
      resposta.status(401).json({ erro: 'E-mail ou senha inválidos, ou e-mail não confirmado.' });
      return;
    }

    const resultado = await poolBanco.query(
      'SELECT id, email, hash_senha, email_confirmado_em FROM usuarios WHERE email = $1',
      [email]
    );
    const usuario = resultado.rows[0];
    const senhaConfere = await argon2.verify(usuario?.hash_senha ?? (await senhaFicticia), senha);

    if (!usuario || !usuario.email_confirmado_em || !senhaConfere) {
      resposta.status(401).json({ erro: 'E-mail ou senha inválidos, ou e-mail não confirmado.' });
      return;
    }

    await renovarSessao(requisicao);
    requisicao.session.usuarioId = usuario.id;
    requisicao.session.email = usuario.email;
    await salvarSessao(requisicao);

    resposta.clearCookie(configuracao.nomeCookieCsrf, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: configuracao.producao,
    });
    resposta.status(200).json({
      usuario: { id: usuario.id, email: usuario.email },
    });
  });

  roteador.post('/logout', async (requisicao, resposta) => {
    if (!requisicao.session.usuarioId) {
      resposta.status(204).end();
      return;
    }

    await new Promise((resolver, rejeitar) => {
      requisicao.session.destroy((erro) => {
        if (erro) {
          rejeitar(erro);
          return;
        }

        resolver();
      });
    });

    resposta.clearCookie(configuracao.nomeCookieSessao, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: configuracao.producao,
    });
    resposta.clearCookie(configuracao.nomeCookieCsrf, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: configuracao.producao,
    });
    resposta.status(204).end();
  });

  roteador.post('/esqueci-senha', limitarLogin, async (requisicao, resposta) => {
    const email = normalizarEmail(requisicao.body?.email);

    if (emailValido(email)) {
      const usuario = await poolBanco.query(
        'SELECT id, email FROM usuarios WHERE email = $1 AND email_confirmado_em IS NOT NULL',
        [email]
      );

      if (usuario.rowCount > 0) {
        try {
          await criarTokenParaUsuario(
            poolBanco,
            usuario.rows[0].id,
            'redefinir_senha',
            configuracao,
            enviarEmail,
            email
          );
        } catch (erro) {
          console.error('Falha ao enviar link de recuperação:', erro);
        }
      }
    }

    resposta.status(202).json({
      mensagem: 'Se houver uma conta para esse e-mail, enviaremos instruções de recuperação.',
    });
  });

  roteador.post('/redefinir-senha', limitarLogin, async (requisicao, resposta) => {
    const { token, senha } = requisicao.body ?? {};

    if (!senhaValida(senha)) {
      resposta.status(400).json({ erro: 'A nova senha deve ter de 12 a 128 bytes.' });
      return;
    }

    const hashSenha = await argon2.hash(senha, { type: argon2.argon2id });
    const redefinida = await consumirToken(
      poolBanco,
      token,
      'redefinir_senha',
      async (cliente, usuarioId) => {
        await cliente.query(
          'UPDATE usuarios SET hash_senha = $1, atualizado_em = now() WHERE id = $2',
          [hashSenha, usuarioId]
        );
        await cliente.query("DELETE FROM sessoes_http WHERE sess ->> 'usuarioId' = $1", [
          usuarioId,
        ]);
      }
    );

    if (!redefinida) {
      resposta.status(400).json({ erro: 'Link inválido, expirado ou já utilizado.' });
      return;
    }

    resposta.status(200).json({ mensagem: 'Senha redefinida. Entre novamente com a nova senha.' });
  });

  return roteador;
}
