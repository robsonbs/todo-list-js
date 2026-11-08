import { describe, it, expect, beforeEach } from 'vitest';

// Mock do localStorage antes de importar storage.js
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

import { salvar, carregar } from '../js/storage.js';

beforeEach(() => {
  localStorageMock.clear();
});

describe('storage.js', () => {
  describe('salvar', () => {
    it('deve salvar dados no localStorage', () => {
      const dados = [{ id: 1, atividade: 'Teste', completa: false }];
      const resultado = salvar(dados);
      expect(resultado).toBe(true);
      expect(localStorageMock.getItem('tarefas')).toBe(JSON.stringify(dados));
    });

    it('deve retornar false em caso de erro', () => {
      // Simular erro fazendo localStorage lançar exceção
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error('Quota excedida');
      };

      const resultado = salvar([{ id: 1 }]);
      expect(resultado).toBe(false);

      localStorageMock.setItem = originalSetItem;
    });
  });

  describe('carregar', () => {
    it('deve carregar dados do localStorage', () => {
      const dados = [{ id: 1, atividade: 'Teste', completa: false }];
      localStorageMock.setItem('tarefas', JSON.stringify(dados));

      const resultado = carregar();
      expect(resultado).toEqual(dados);
    });

    it('deve retornar null quando não há dados salvos', () => {
      expect(carregar()).toBeNull();
    });

    it('deve retornar null para dados corrompidos', () => {
      localStorageMock.setItem('tarefas', 'não é json válido');
      expect(carregar()).toBeNull();
    });
  });
});
