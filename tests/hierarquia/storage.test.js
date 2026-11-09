import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CHAVE_ARMAZENAMENTO } from '../../js/hierarquia/constants.js';
import { carregarTarefas, salvarTarefas } from '../../js/hierarquia/storage.js';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('storage hierárquico', () => {
  it('usa uma chave exclusiva e salva a árvore completa', () => {
    const arvore = [{ id: 1, atividade: 'Plano', completa: false, filhos: [] }];
    localStorage.setItem('tarefas', 'lista original');

    expect(salvarTarefas(arvore)).toBe(true);
    expect(CHAVE_ARMAZENAMENTO).toBe('tarefas-hierarquicas');
    expect(JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO))).toEqual(arvore);
    expect(localStorage.getItem('tarefas')).toBe('lista original');
  });

  it('devolve null quando não há conteúdo salvo', () => {
    expect(carregarTarefas()).toBeNull();
  });

  it('devolve null quando o JSON salvo está corrompido', () => {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, '{quebrado');
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(carregarTarefas()).toBeNull();
  });

  it('trata falha de escrita sem quebrar a página', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Quota excedida');
    });

    expect(salvarTarefas([])).toBe(false);
  });
});
