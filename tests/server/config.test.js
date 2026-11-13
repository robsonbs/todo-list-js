import { afterEach, describe, expect, it } from 'vitest';
import { obterConfiguracao } from '../../server/config.js';

const nomesAmbiente = ['PORT', 'DATABASE_URL', 'NODE_ENV'];
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

    expect(obterConfiguracao()).toEqual({
      porta: 3100,
      urlBanco: 'postgres://localhost/tarefas',
      ambiente: 'test',
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
});
