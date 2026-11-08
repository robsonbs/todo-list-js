// ============================================================
// MAIN.JS — Orquestração da aplicação
// ------------------------------------------------------------
// Responsabilidade: conectar os eventos da interface às funções de
// state, storage e dom. É o ponto de entrada (type="module").
// Conceitos ensinados: módulos ES, event delegation, submit de
// formulário e fluxo de dados unidirecional.
// ============================================================

import {
  obterTarefas,
  obterTarefaPorId,
  adicionarTarefa,
  removerTarefa,
  editarTarefa,
  alternarConcluida,
  obterContadores,
  substituirTarefas,
} from './state.js';

import { salvarTarefas, carregarTarefas } from './storage.js';

import { validarTexto } from './validacao.js';

import {
  renderizarLista,
  atualizarContadores,
  obterValorCampoEntrada,
  limparCampoEntrada,
  iniciarEdicaoTarefa,
  obterContainerTarefas,
  atualizarCheckboxTarefa,
  mostrarMensagem,
} from './dom.js';

import { SELETORES, MENSAGENS } from './constants.js';

// Atalho para consultar elementos usando os seletores centralizados.
const selecionar = (seletor) => document.querySelector(seletor);

// ========== PERSISTÊNCIA E RENDERIZAÇÃO ==========

/**
 * Recria os contadores a partir do estado atual.
 */
function sincronizarContadores() {
  const { total, completas } = obterContadores();
  atualizarContadores(total, completas);
}

/**
 * Salva o estado, redesenha a lista e atualiza os contadores.
 */
function persistirERenderizar() {
  const tarefas = obterTarefas();
  salvarTarefas(tarefas);
  renderizarLista(tarefas);
  sincronizarContadores();
}

/**
 * Carrega os dados salvos e liga os eventos da interface.
 * Exportada para permitir testes de orquestração sem depender do
 * evento DOMContentLoaded (que dispara uma única vez por página).
 */
export function inicializarAplicacao() {
  const tarefasSalvas = carregarTarefas();
  if (tarefasSalvas) {
    substituirTarefas(tarefasSalvas);
  }

  renderizarLista(obterTarefas());
  sincronizarContadores();
  configurarFormulario();
  configurarDelegacaoDeEventos();
}

// ========== FORMULÁRIO ==========

/**
 * Trata o envio do formulário (clique em "Criar" ou tecla Enter).
 * @param {SubmitEvent} evento
 */
function aoSubmeterFormulario(evento) {
  // Impede o comportamento padrão do navegador (recarregar a página).
  evento.preventDefault();

  const validacao = validarTexto(obterValorCampoEntrada());

  if (!validacao.valido) {
    mostrarMensagem(MENSAGENS[validacao.motivo]);
    return;
  }

  if (!adicionarTarefa(validacao.texto)) {
    return;
  }

  limparCampoEntrada();
  persistirERenderizar();
}

/**
 * Liga o evento de submit ao formulário.
 */
function configurarFormulario() {
  const formulario = selecionar(SELETORES.formulario);
  if (formulario) {
    formulario.addEventListener('submit', aoSubmeterFormulario);
  }
}

// ========== EVENT DELEGATION ==========

/**
 * Descobre o ID da tarefa a partir de um elemento interno.
 * @param {Element} alvo
 * @returns {number|null}
 */
function obterIdDaTarefa(alvo) {
  const elementoTarefa = alvo.closest(SELETORES.tarefa);
  return elementoTarefa ? Number(elementoTarefa.dataset.id) : null;
}

/**
 * Registra um único listener no container de tarefas.
 * Assim, tarefas criadas depois também funcionam sem novos listeners
 * (é isso que chamamos de delegação de eventos).
 */
function configurarDelegacaoDeEventos() {
  const container = obterContainerTarefas();
  if (!container) {
    return;
  }

  // 1) Remover tarefa (clique no botão ou no ícone SVG dentro dele).
  container.addEventListener('click', function (evento) {
    const alvo = evento.target;

    if (alvo.closest(SELETORES.botaoRemover)) {
      const id = obterIdDaTarefa(alvo);
      if (id !== null) {
        removerTarefa(id);
        persistirERenderizar();
      }
      return;
    }

    // 2) Marcar/desmarcar como concluída.
    if (alvo.matches('input[type="checkbox"][id^="tarefa-"]')) {
      const id = obterIdDaTarefa(alvo);
      if (id !== null) {
        alternarConcluida(id);
        salvarTarefas(obterTarefas());

        const tarefa = obterTarefaPorId(id);
        if (tarefa) {
          atualizarCheckboxTarefa(id, tarefa.completa);
        }
        sincronizarContadores();
      }
    }
  });

  // 3) Editar com duplo clique no texto da tarefa.
  container.addEventListener('dblclick', function (evento) {
    const texto = evento.target.closest(SELETORES.textoTarefa);
    if (!texto) {
      return;
    }

    const id = obterIdDaTarefa(texto);
    if (id === null) {
      return;
    }

    iniciarEdicaoTarefa(
      texto,
      (novoTexto) => {
        editarTarefa(id, novoTexto);
        persistirERenderizar();
      },
      () => {
        // Cancelar não altera nada: o texto original continua visível.
      }
    );
  });
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', inicializarAplicacao);
