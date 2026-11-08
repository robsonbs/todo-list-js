// ========== MAIN.JS — Orquestração da aplicação ==========
// Este módulo conecta eventos da interface com state.js, storage.js e dom.js.
// É o ponto de entrada da aplicação.
// Usa event delegation para eventos de tarefas (um único listener no container).

import {
  obterTarefas,
  obterTarefaPorId,
  adicionarTarefa,
  removerTarefa,
  editarTarefa,
  toggleConcluida,
  obterContadores,
  substituirTarefas,
} from './state.js';

import { salvar, carregar } from './storage.js';

import {
  renderizarLista,
  atualizarContadores,
  obterValorInput,
  limparInput,
  iniciarEdicaoTarefa,
  obterContainerTarefas,
  atualizarCheckboxTarefa,
  mostrarMensagem,
} from './dom.js';

import { MENSAGENS } from './constants.js';

// ========== PERSISTÊNCIA E RENDERIZAÇÃO ==========

/**
 * Salva o estado atual no localStorage e renderiza a interface completa
 */
function salvarERenderizar() {
  const tarefas = obterTarefas();
  salvar(tarefas);
  renderizarLista(tarefas);
  const { total, completas } = obterContadores();
  atualizarContadores(total, completas);
}

/**
 * Carrega tarefas salvas e inicia a aplicação
 */
function inicializarAplicacao() {
  const tarefasSalvas = carregar();
  if (tarefasSalvas) {
    substituirTarefas(tarefasSalvas);
  }

  renderizarLista(obterTarefas());
  const { total, completas } = obterContadores();
  atualizarContadores(total, completas);
  configurarEventosDaInterface();
  configurarEventDelegation();
}

// ========== EVENTOS DA INTERFACE (BOTÕES FIXOS) ==========

/**
 * Configura eventos de elementos fixos (botão criar, input Enter)
 */
function configurarEventosDaInterface() {
  configurarBotaoCriar();
  configurarEnterNoInput();
}

/**
 * Configura o evento do botão "Criar"
 */
function configurarBotaoCriar() {
  const botao = document.getElementById('btn-criar');
  if (!botao) {
    return;
  }

  botao.addEventListener('click', function () {
    const texto = obterValorInput();
    if (texto === '') {
      mostrarMensagem(MENSAGENS.textoVazio);
      return;
    }

    adicionarTarefa(texto);
    limparInput();
    salvarERenderizar();
  });
}

/**
 * Configura o evento Enter no input
 */
function configurarEnterNoInput() {
  const input = document.querySelector('#todo-input');
  if (!input) {
    return;
  }

  input.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
      const texto = obterValorInput();
      if (texto === '') {
        mostrarMensagem(MENSAGENS.textoVazio);
        return;
      }

      adicionarTarefa(texto);
      limparInput();
      salvarERenderizar();
    }
  });
}

// ========== EVENT DELEGATION ==========

/**
 * Configura um único listener no container para todos os eventos de tarefas.
 * Isso evita anexar múltiplos listeners (um por tarefa) e simplifica o código.
 */
function configurarEventDelegation() {
  const container = obterContainerTarefas();
  if (!container) {
    return;
  }

  // Clique no container (captura eventos de checkbox, botão deletar, texto)
  container.addEventListener('click', function (evento) {
    const alvo = evento.target;

    // Botão de deletar
    if (alvo.classList.contains('remove-btn')) {
      const id = Number(alvo.dataset.id);
      removerTarefa(id);
      salvarERenderizar();
      return;
    }

    // Ícone SVG dentro do botão deletar
    if (alvo.closest('.remove-btn')) {
      const botao = alvo.closest('.remove-btn');
      const id = Number(botao.dataset.id);
      removerTarefa(id);
      salvarERenderizar();
      return;
    }

    // Checkbox
    if (alvo.type === 'checkbox' && alvo.id.startsWith('tarefa-')) {
      const id = Number(alvo.id.replace('tarefa-', ''));
      toggleConcluida(id);
      salvar(obterTarefas());
      const tarefa = obterTarefaPorId(id);
      if (tarefa) {
        atualizarCheckboxTarefa(id, tarefa.completa);
      }
      const { total, completas } = obterContadores();
      atualizarContadores(total, completas);
      return;
    }

    // Duplo clique no texto da tarefa para editar
    if (alvo.tagName === 'SPAN' && alvo.parentElement.classList.contains('tarefa')) {
      const checkbox = alvo.previousElementSibling;
      if (checkbox && checkbox.id.startsWith('tarefa-')) {
        const id = Number(checkbox.id.replace('tarefa-', ''));
        iniciarEdicaoTarefa(
          alvo,
          function (novoTexto) {
            editarTarefa(id, novoTexto);
            salvarERenderizar();
          },
          function () {
            // Cancelar: não faz nada, o texto original permanece
          }
        );
      }
    }
  });
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', inicializarAplicacao);
