import { afterEach, describe, expect, it } from 'vitest';
import { obterConfiguracao } from '../../server/config.js';

const nomesAmbiente = [
  'PORT',
  'DATABASE_URL',
  'NODE_ENV',
  'SESSION_SECRET',
  'CSRF_SECRET',
  'EMAIL_MODE',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'EMAIL_FROM',
  'PUBLIC_URL',
  'TRUST_PROXY_HOPS',
];
const ambienteOriginal = Object.fromEntries(nomesAmbiente.map((nome) => [nome, process.env[nome]]));

afterEach(() => {
  for (const nome of nomesAmbiente) {
    if (ambienteOriginal[nome] === undefined) {
      delete process.env[nome];
    } else {
      process.env[nome] = ambienteOriginal[nome];
    }
  }
});

describe('configuração do servidor', () => {
  it('lê a porta, a conexão e o ambiente definidos', () => {
    process.env.PORT = '3100';
    process.env.DATABASE_URL = 'postgres://localhost/tarefas';
    process.env.NODE_ENV = 'test';

    expect(obterConfiguracao()).toMatchObject({
      porta: 3100,
      urlBanco: 'postgres://localhost/tarefas',
      ambiente: 'test',
      producao: false,
      modoEmail: 'console',
    });
  });

  it('rejeita uma porta fora do intervalo válido', () => {
    process.env.PORT = '70000';
    process.env.DATABASE_URL = 'postgres://localhost/tarefas';

    expect(() => obterConfiguracao()).toThrow('PORT deve ser um número');
  });

  it('não inicia sem a URL do banco', () => {
    delete process.env.DATABASE_URL;

    expect(() => obterConfiguracao()).toThrow('Defina DATABASE_URL');
  });

  it('não aceita segredos de exemplo em produção', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'postgres://localhost/tarefas';
    process.env.SESSION_SECRET = 'dev-only-session-secret-que-nao-deve-ser-usado';
    process.env.CSRF_SECRET = 'dev-only-csrf-secret-que-nao-deve-ser-usado';
    process.env.EMAIL_MODE = 'smtp';
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.EMAIL_FROM = 'Lista <lista@example.com>';

    expect(() => obterConfiguracao()).toThrow('Substitua o SESSION_SECRET');
  });

  it('exige endereço HTTPS para os links enviados em produção', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'postgres://localhost/tarefas';
    process.env.SESSION_SECRET = 'segredo-de-sessao-producao-aleatorio-123456789';
    process.env.CSRF_SECRET = 'segredo-csrf-producao-aleatorio-123456789012';
    process.env.EMAIL_MODE = 'smtp';
    process.env.SMTP_HOST = 'smtp.example.com';
    process.env.EMAIL_FROM = 'Lista <lista@example.com>';
    process.env.PUBLIC_URL = 'http://tarefas.example.com';

    expect(() => obterConfiguracao()).toThrow('PUBLIC_URL deve usar HTTPS');
  });
});
