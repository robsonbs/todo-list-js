// ============================================================
// VALIDACAO.JS — Regra de validação do texto de uma tarefa
// ------------------------------------------------------------
// Responsabilidade: dizer se um texto pode virar (ou continuar
// sendo) o título de uma tarefa. É uma função pura: não toca no
// DOM e não guarda estado.
// NÃO faz: não exibe mensagens e não salva dados.
// Conceitos ensinados: função pura, objeto de resultado e "fonte
// única de verdade" para uma regra usada em vários lugares.
// ============================================================

import { CONFIG } from './constants.js';

/**
 * @typedef {Object} ResultadoValidacao
 * @property {boolean} valido
 * @property {string} [texto] Texto limpo (apenas quando válido)
 * @property {'textoVazio'|'textoMuitoLongo'} [motivo] Chave em MENSAGENS
 */

/**
 * Valida e normaliza o texto digitado pelo usuário.
 * @param {unknown} texto
 * @returns {ResultadoValidacao}
 */
export function validarTexto(texto) {
  const limpo = String(texto ?? '').trim();

  if (limpo === '') {
    return { valido: false, motivo: 'textoVazio' };
  }

  if (limpo.length > CONFIG.MAX_CARACTERES_TAREFA) {
    return { valido: false, motivo: 'textoMuitoLongo' };
  }

  return { valido: true, texto: limpo };
}
