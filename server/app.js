// ============================================================
// APP.JS — Configuração da aplicação HTTP
// ------------------------------------------------------------
// Responsabilidade: montar middleware, rotas públicas e arquivos da interface.
// NÃO faz: não abre a porta do servidor nem consulta o banco de dados.
// Conceitos ensinados: middleware Express, HTTP e política de segurança.
// ============================================================

import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectPgSimple from 'connect-pg-simple';
import { doubleCsrf } from 'csrf-csrf';
import session from 'express-session';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { criarRotasAutenticacao } from './routes/autenticacao.js';
import { criarRotasTarefas } from './routes/tarefas.js';

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
const diretorioWeb = path.resolve(diretorioAtual, '../web');

/**
 * Monta a aplicação Express sem iniciar um servidor de rede.
 * @returns {import('express').Express} Aplicação pronta para receber requisições.
 */
export function criarAplicacao({ poolBanco, configuracao, enviarEmail } = {}) {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          connectSrc: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
        },
      },
    })
  );
  app.use(express.json({ limit: '10kb' }));

  if (poolBanco && configuracao) {
    if (configuracao.quantidadeProxies > 0) {
      app.set('trust proxy', configuracao.quantidadeProxies);
    }

    app.use(cookieParser());

    const PGStore = connectPgSimple(session);
    app.use(
      session({
        name: configuracao.nomeCookieSessao,
        secret: configuracao.segredoSessao,
        store: new PGStore({
          pool: poolBanco,
          tableName: 'sessoes_http',
          createTableIfMissing: false,
          ttl: 8 * 60 * 60,
        }),
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
          httpOnly: true,
          secure: configuracao.producao,
          sameSite: 'lax',
          path: '/',
          maxAge: 8 * 60 * 60 * 1000,
        },
      })
    );

    const csrf = doubleCsrf({
      getSecret: () => configuracao.segredoCsrf,
      getSessionIdentifier: (requisicao) => requisicao.sessionID,
      cookieName: configuracao.nomeCookieCsrf,
      cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: configuracao.producao,
      },
      ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
      getCsrfTokenFromRequest: (requisicao) => requisicao.headers['x-csrf-token'],
    });

    app.get('/api/csrf-token', async (requisicao, resposta) => {
      // Criar sessão anônima mantém o token CSRF vinculado a um identificador de sessão.
      requisicao.session.iniciada = true;
      const token = csrf.generateCsrfToken(requisicao, resposta);
      await new Promise((resolver, rejeitar) => {
        requisicao.session.save((erro) => (erro ? rejeitar(erro) : resolver()));
      });
      resposta.status(200).json({ token });
    });

    app.use('/api', csrf.doubleCsrfProtection);
    app.use('/api/auth', criarRotasAutenticacao({ poolBanco, configuracao, enviarEmail }));
    app.use('/api/tarefas', criarRotasTarefas({ poolBanco }));

    app.use((erro, _requisicao, resposta, proximo) => {
      if (erro === csrf.invalidCsrfTokenError) {
        resposta.status(403).json({ erro: 'A página expirou. Atualize e tente novamente.' });
        return;
      }

      proximo(erro);
    });
  }

  // A rota de saúde permite verificar o processo sem expor configuração interna.
  app.get('/api/health', (_requisicao, resposta) => {
    resposta.status(200).json({ status: 'ok', servico: 'lista-tarefas-web' });
  });

  app.use('/api', (_requisicao, resposta) => {
    resposta.status(404).json({ erro: 'Rota da API não encontrada.' });
  });

  app.use(express.static(diretorioWeb, { index: 'index.html' }));

  app.use((_requisicao, resposta) => {
    resposta.status(404).send('Página não encontrada.');
  });

  // O cliente recebe mensagem genérica; detalhes ficam somente no log do servidor.
  app.use((erro, _requisicao, resposta, proximo) => {
    if (resposta.headersSent) {
      return proximo(erro);
    }

    console.error('Erro não tratado na aplicação:', erro);
    resposta.status(500).json({ erro: 'Ocorreu um erro inesperado.' });
  });

  return app;
}
