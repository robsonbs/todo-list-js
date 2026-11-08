// ============================================================
// APLICACAO.JS — Helpers de teste de orquestração
// ------------------------------------------------------------
// Centraliza o que vários testes de integração precisam: montar o
// DOM, preparar o localStorage, iniciar a aplicação e simular as
// ações do usuário (enviar formulário, clicar, localizar tarefa).
// ============================================================

import { vi } from 'vitest';
import { CHAVE_ARMAZENAMENTO, SELETORES } from '../../js/constants.js';
import { montarDOMDeTeste } from './fixtures.js';

/**
 * Monta o DOM, prepara o localStorage e inicializa a aplicação.
 * Os módulos são recarregados para simular uma nova visita à página.
 * @param {{ tarefasSalvas?: object[]|null, dadosBrutos?: string|null }} [opcoes]
 * @returns {Promise<typeof import('../../js/state.js')>} Módulo de estado usado pela aplicação
 */
export async function iniciarAplicacao({ tarefasSalvas = null, dadosBrutos = null } = {}) {
  vi.resetModules();
  montarDOMDeTeste();
  localStorage.clear();

  if (dadosBrutos !== null) {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, dadosBrutos);
  } else if (tarefasSalvas !== null) {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(tarefasSalvas));
  }

  // Importa estado e main no MESMO grafo de módulos recém-criado.
  // Chamamos inicializarAplicacao() diretamente em vez de disparar
  // DOMContentLoaded: assim listeners de testes anteriores não se
  // acumulam e não interferem no formulário.
  const state = await import('../../js/state.js');
  const { inicializarAplicacao } = await import('../../js/main.js');
  inicializarAplicacao();

  return state;
}

/**
 * Preenche o campo e envia o formulário (equivale a clicar em "Criar").
 * @param {string} texto
 */
export function enviarFormulario(texto) {
  const campo = document.querySelector(SELETORES.campoEntrada);
  campo.value = texto;

  const formulario = document.querySelector(SELETORES.formulario);
  formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

/**
 * Dispara um evento de clique a partir de um elemento.
 * @param {Element} elemento
 */
export function clicar(elemento) {
  elemento.dispatchEvent(new Event('click', { bubbles: true }));
}

/**
 * Atalhos para os elementos da primeira tarefa da lista.
 * Evita repetir a mesma cadeia de querySelector nos testes.
 * @param {ParentNode} [raiz]
 * @returns {{
 *   raiz: HTMLElement,
 *   texto: HTMLElement,
 *   checkbox: HTMLInputElement,
 *   botaoRemover: HTMLButtonElement
 * }}
 */
export function obterTarefaUI(raiz = document) {
  const elemento = raiz.querySelector(SELETORES.tarefa);

  return {
    raiz: elemento,
    texto: elemento.querySelector(SELETORES.textoTarefa),
    checkbox: elemento.querySelector(SELETORES.checkboxTarefa),
    botaoRemover: elemento.querySelector(SELETORES.botaoRemover),
  };
}
