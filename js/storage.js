// ============================================================
// STORAGE.JS — Persistência no localStorage
// ------------------------------------------------------------
// Responsabilidade: converter a lista de tarefas em JSON, salvar
// e carregar do localStorage, tratando erros.
// NÃO faz: não toca no DOM e não contém regras de negócio.
// Conceitos ensinados: try/catch, JSON e API do navegador.
// ============================================================

import { CHAVE_ARMAZENAMENTO } from './constants.js';

/**
 * Salva a lista de tarefas no localStorage.
 * @param {import('./state.js').Tarefa[]} tarefas
 * @returns {boolean} true se salvou, false em caso de erro
 */
export function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(tarefas));
    return true;
  } catch (erro) {
    // Pode falhar por quota cheia ou por restrições do modo privado.
    console.error('Erro ao salvar no localStorage:', erro);
    return false;
  }
}

/**
 * Carrega os dados crus do localStorage.
 * O retorno é desconhecido de propósito: JSON pode conter qualquer
 * coisa, então a validação fica em state.js (substituirTarefas).
 * @returns {unknown} Dados crus ou null se não houver/erro
 */
export function carregarTarefas() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!dadosSalvos) {
      return null;
    }
    return JSON.parse(dadosSalvos);
  } catch (erro) {
    console.error('Erro ao carregar do localStorage:', erro);
    return null;
  }
}
