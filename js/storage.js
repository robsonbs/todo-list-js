// ========== STORAGE.JS — Abstração do localStorage ==========
// Este módulo é responsável apenas por persistir e carregar dados.
// Não manipula DOM e não contém lógica de negócio.

import { STORAGE_KEY } from './constants.js';

/**
 * Salva dados no localStorage
 * @param {any} dados - Dados a serem salvos (serão convertidos para JSON)
 * @returns {boolean} true se salvou com sucesso, false em caso de erro
 */
export function salvar(dados) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar no localStorage:', erro);
    return false;
  }
}

/**
 * Carrega dados do localStorage
 * @returns {any|null} Dados carregados ou null se não houver ou houver erro
 */
export function carregar() {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (!dadosSalvos) {
      return null;
    }
    return JSON.parse(dadosSalvos);
  } catch (erro) {
    console.error('Erro ao carregar do localStorage:', erro);
    return null;
  }
}
