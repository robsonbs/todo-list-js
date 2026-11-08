import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock simples do localStorage antes de importar storage.js.
// Assim os testes não dependem do navegador real.
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => (store[key] !== undefined ? store[key] : null),
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

import { salvarTarefas, carregarTarefas } from '../js/storage.js';
import { CHAVE_ARMAZENAMENTO } from '../js/constants.js';
import { criarTarefaFixture } from './helpers/fixtures.js';

beforeEach(() => {
  localStorageMock.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('storage.js', () => {
  describe('salvarTarefas', () => {
    it('deve salvar dados no localStorage', () => {
      const dados = [criarTarefaFixture({ atividade: 'Teste' })];
      const resultado = salvarTarefas(dados);
      expect(resultado).toBe(true);
      expect(localStorageMock.getItem(CHAVE_ARMAZENAMENTO)).toBe(JSON.stringify(dados));
    });

    it('deve retornar false em caso de erro', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(localStorageMock, 'setItem').mockImplementation(() => {
        throw new Error('Quota excedida');
      });

      const resultado = salvarTarefas([{ id: 1 }]);
      expect(resultado).toBe(false);
      expect(localStorageMock.getItem(CHAVE_ARMAZENAMENTO)).toBeNull();
    });

    it('deve retornar false quando a serialização falha', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const circular = {};
      circular.referencia = circular;

      expect(salvarTarefas([circular])).toBe(false);
      expect(localStorageMock.getItem(CHAVE_ARMAZENAMENTO)).toBeNull();
    });
  });

  describe('carregarTarefas', () => {
    it('deve carregar dados do localStorage', () => {
      const dados = [criarTarefaFixture({ atividade: 'Teste' })];
      localStorageMock.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dados));

      const resultado = carregarTarefas();
      expect(resultado).toEqual(dados);
    });

    it('deve retornar null quando não há dados salvos', () => {
      expect(carregarTarefas()).toBeNull();
    });

    it('deve retornar null para dados corrompidos', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorageMock.setItem(CHAVE_ARMAZENAMENTO, 'não é json válido');
      expect(carregarTarefas()).toBeNull();
    });

    it('deve retornar null quando a leitura do localStorage lança erro', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(localStorageMock, 'getItem').mockImplementation(() => {
        throw new Error('Acesso bloqueado');
      });

      expect(carregarTarefas()).toBeNull();
    });
  });
});
