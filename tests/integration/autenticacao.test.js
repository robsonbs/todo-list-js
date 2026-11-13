import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { request as requisitarHttp } from 'node:http';
import pg from 'pg';
import { criarAplicacao } from '../../server/app.js';

const { Pool } = pg;
const poolBanco = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;
const emailsEnviados = [];
const configuracaoTeste = {
  ambiente: 'test',
  segredoSessao: 'segredo-de-sessao-unico-para-testes-locais',
  segredoCsrf: 'segredo-csrf-unico-para-testes-locais-123456',
  nomeCookieSessao: 'tarefas.sid',
  nomeCookieCsrf: 'tarefas.csrf',
  producao: false,
  quantidadeProxies: 0,
  urlPublica: 'http://localhost:3000',
};

function solicitarHTTP(porta, metodo, caminho, dados, cabecalhos = {}) {
  return new Promise((resolver, rejeitar) => {
    const corpo = dados === undefined ? undefined : JSON.stringify(dados);
    const requisicao = requisitarHttp(
      {
        hostname: '127.0.0.1',
        port: porta,
        method: metodo,
        path: caminho,
        headers: {
          ...(corpo ? { 'content-type': 'application/json' } : {}),
          ...(corpo ? { 'content-length': Buffer.byteLength(corpo) } : {}),
          ...cabecalhos,
        },
      },
      (resposta) => {
        const pedacos = [];
        resposta.on('data', (pedaco) => pedacos.push(pedaco));
        resposta.on('end', () => {
          const texto = Buffer.concat(pedacos).toString('utf8');
          resolver({
            status: resposta.statusCode,
            cabecalhos: resposta.headers,
            corpo: texto ? JSON.parse(texto) : null,
          });
        });
      }
    );

    requisicao.on('error', rejeitar);
    if (corpo) {
      requisicao.write(corpo);
    }
    requisicao.end();
  });
}

class ClienteAutenticacao {
  constructor(porta) {
    this.porta = porta;
    this.cookies = new Map();
    this.tokenCsrf = undefined;
  }

  async chamar(metodo, caminho, dados, { usarCsrf = true } = {}) {
    const cabecalhos = {};
    const cookie = [...this.cookies].map(([nome, valor]) => `${nome}=${valor}`).join('; ');

    if (cookie) {
      cabecalhos.cookie = cookie;
    }
    if (dados !== undefined) {
      cabecalhos.accept = 'application/json';
    }
    if (usarCsrf && !['GET', 'HEAD', 'OPTIONS'].includes(metodo) && this.tokenCsrf) {
      cabecalhos['x-csrf-token'] = this.tokenCsrf;
    }

    const resposta = await solicitarHTTP(this.porta, metodo, caminho, dados, cabecalhos);

    for (const cookieDefinido of resposta.cabecalhos['set-cookie'] ?? []) {
      const parte = cookieDefinido.split(';', 1)[0];
      const separador = parte.indexOf('=');
      const nome = parte.slice(0, separador);
      const valor = parte.slice(separador + 1);

      if (!valor) {
        this.cookies.delete(nome);
      } else {
        this.cookies.set(nome, valor);
      }
    }

    if (caminho === '/api/csrf-token' && resposta.corpo?.token) {
      this.tokenCsrf = resposta.corpo.token;
    }

    return resposta;
  }

  async obterTokenCsrf() {
    return this.chamar('GET', '/api/csrf-token');
  }

  obterCookieSessao() {
    return this.cookies.get('tarefas.sid');
  }
}

describe.skipIf(!poolBanco)('integração de autenticação com PostgreSQL', () => {
  let servidor;
  let porta;

  beforeAll(async () => {
    await poolBanco.query('SELECT 1');
    const app = criarAplicacao({
      poolBanco,
      configuracao: configuracaoTeste,
      enviarEmail: async (mensagem) => emailsEnviados.push(mensagem),
    });
    servidor = app.listen(0, '127.0.0.1');
    await new Promise((resolver) => servidor.once('listening', resolver));
    porta = servidor.address().port;
  });

  beforeEach(async () => {
    emailsEnviados.length = 0;
    await poolBanco.query('TRUNCATE sessoes_http, tokens_autenticacao, tarefas, usuarios CASCADE');
  });

  afterAll(async () => {
    if (servidor) {
      await new Promise((resolver) => servidor.close(resolver));
    }
    await poolBanco.end();
  });

  async function criarContaConfirmada(cliente, email) {
    await cliente.obterTokenCsrf();
    const cadastro = await cliente.chamar('POST', '/api/auth/registrar', {
      email,
      senha: 'senha-segura-de-teste-123',
    });
    const link = emailsEnviados.at(-1)?.link;
    const token = new URL(link).searchParams.get('confirmar-email');
    const confirmacao = await cliente.chamar('POST', '/api/auth/confirmar-email', { token });

    return { cadastro, confirmacao };
  }

  it('protege mutações contra CSRF e exige confirmação antes do login', async () => {
    const cliente = new ClienteAutenticacao(porta);
    const semToken = await cliente.chamar(
      'POST',
      '/api/auth/registrar',
      { email: 'ana@example.com', senha: 'senha-segura-de-teste-123' },
      { usarCsrf: false }
    );

    expect(semToken.status).toBe(403);

    await cliente.obterTokenCsrf();
    const cadastro = await cliente.chamar('POST', '/api/auth/registrar', {
      email: 'Ana@Example.com',
      senha: 'senha-segura-de-teste-123',
    });

    expect(cadastro.status).toBe(202);
    expect(cadastro.corpo).not.toHaveProperty('token');

    const senhaSalva = await poolBanco.query(
      'SELECT email, hash_senha FROM usuarios WHERE email = $1',
      ['ana@example.com']
    );
    expect(senhaSalva.rows[0].hash_senha).not.toBe('senha-segura-de-teste-123');
    expect(senhaSalva.rows[0].hash_senha).toMatch(/^\$argon2id\$/);

    const tokenConfirmacao = new URL(emailsEnviados[0].link).searchParams.get('confirmar-email');
    const loginAntesDaConfirmacao = await cliente.chamar('POST', '/api/auth/login', {
      email: 'ana@example.com',
      senha: 'senha-segura-de-teste-123',
    });
    expect(loginAntesDaConfirmacao.status).toBe(401);

    const confirmacao = await cliente.chamar('POST', '/api/auth/confirmar-email', {
      token: tokenConfirmacao,
    });
    expect(confirmacao.status).toBe(200);

    const sessaoAnonima = cliente.obterCookieSessao();
    const login = await cliente.chamar('POST', '/api/auth/login', {
      email: 'ana@example.com',
      senha: 'senha-segura-de-teste-123',
    });

    expect(login.status).toBe(200);
    expect(cliente.obterCookieSessao()).not.toBe(sessaoAnonima);
    expect(
      login.cabecalhos['set-cookie'].some((cookie) => cookie.startsWith('tarefas.csrf='))
    ).toBe(true);

    const semCsrfDepoisDoLogin = await cliente.chamar('POST', '/api/auth/logout', undefined, {
      usarCsrf: false,
    });
    expect(semCsrfDepoisDoLogin.status).toBe(403);

    await cliente.obterTokenCsrf();
    const sessao = await cliente.chamar('GET', '/api/auth/me');
    expect(sessao.corpo).toMatchObject({
      autenticado: true,
      usuario: { email: 'ana@example.com' },
    });

    const tokenReutilizado = await cliente.chamar('POST', '/api/auth/confirmar-email', {
      token: tokenConfirmacao,
    });
    expect(tokenReutilizado.status).toBe(400);
  });

  it('recupera a senha com token de uso único e encerra as sessões antigas', async () => {
    const cliente = new ClienteAutenticacao(porta);
    await criarContaConfirmada(cliente, 'bia@example.com');
    await cliente.chamar('POST', '/api/auth/login', {
      email: 'bia@example.com',
      senha: 'senha-segura-de-teste-123',
    });
    await cliente.obterTokenCsrf();
    const sessaoAntiga = cliente.obterCookieSessao();

    await cliente.chamar('POST', '/api/auth/esqueci-senha', {
      email: 'bia@example.com',
    });
    const link = emailsEnviados.at(-1).link;
    const token = new URL(link).searchParams.get('redefinir-senha');
    const reset = await cliente.chamar('POST', '/api/auth/redefinir-senha', {
      token,
      senha: 'nova-senha-segura-de-teste-456',
    });

    expect(reset.status).toBe(200);
    expect(cliente.obterCookieSessao()).toBe(sessaoAntiga);

    const meComSessaoRevogada = await cliente.chamar('GET', '/api/auth/me');
    expect(meComSessaoRevogada.corpo).toEqual({ autenticado: false });

    await cliente.obterTokenCsrf();
    const senhaAntiga = await cliente.chamar('POST', '/api/auth/login', {
      email: 'bia@example.com',
      senha: 'senha-segura-de-teste-123',
    });
    expect(senhaAntiga.status).toBe(401);

    const senhaNova = await cliente.chamar('POST', '/api/auth/login', {
      email: 'bia@example.com',
      senha: 'nova-senha-segura-de-teste-456',
    });
    expect(senhaNova.status).toBe(200);
  });
});
