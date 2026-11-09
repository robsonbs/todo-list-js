// ============================================================
// STORAGE.JS — Persistência exclusiva da árvore
// ------------------------------------------------------------
// Usa uma chave diferente da lista plana. Não valida os dados:
// state.js é responsável por normalizar o JSON carregado.
// ============================================================

import { CHAVE_ARMAZENAMENTO } from './constants.js';

/** Salva a árvore no localStorage. @param {unknown[]} tarefas @returns {boolean} */
export function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(tarefas));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar a árvore de tarefas:', erro);
    return false;
  }
}

/** Lê dados crus; a validação acontece em state.js. @returns {unknown|null} */
export function carregarTarefas() {
  try {
    const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return dados ? JSON.parse(dados) : null;
  } catch (erro) {
    console.error('Erro ao carregar a árvore de tarefas:', erro);
    return null;
  }
}
