// ============================================================
// MAIN.JS — Orquestração da aplicação
// ------------------------------------------------------------
// Responsabilidade: conectar os eventos da interface às funções de
// state, storage e dom. É o ponto de entrada (type="module").
// Conceitos ensinados: módulos ES, event delegation, submit de
// formulário e fluxo de dados unidirecional:
//
//   evento → state → storage → dom → contadores
//
// NÃO faz: não cria elementos e não guarda dados.
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
  obterFormulario,
  atualizarCheckboxTarefa,
  mostrarMensagem,
} from './dom.js';

import { SELETORES, MENSAGENS } from './constants.js';

// ========== PERSISTÊNCIA E RENDERIZAÇÃO ==========

/**
 * Recria os contadores a partir do estado atual.
 */
function sincronizarContadores() {
  const { total, completas } = obterContadores();
  atualizarContadores(total, completas);
}

/**
 * Salva o estado no localStorage e avisa o usuário se falhar.
 * @returns {import('./state.js').Tarefa[]} Lista salva (ou tentada)
 */
function salvarEstado() {
  const tarefas = obterTarefas();

  if (!salvarTarefas(tarefas)) {
    mostrarMensagem(MENSAGENS.erroAoSalvar);
  }

  return tarefas;
}

/**
 * Salva o estado, redesenha a lista e atualiza os contadores.
 * Usado quando a lista muda de tamanho ou de conteúdo.
 */
function persistirERenderizar() {
  renderizarLista(salvarEstado());
  sincronizarContadores();
}

/**
 * Salva e atualiza só os contadores, sem recriar a lista.
 * Usado ao marcar/desmarcar: preserva o foco e a posição de rolagem.
 */
function persistirAtualizacaoIncremental() {
  salvarEstado();
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
  const formulario = obterFormulario();
  if (formulario) {
    formulario.addEventListener('submit', aoSubmeterFormulario);
  }
}

// ========== DELEGAÇÃO DE EVENTOS ==========

/**
 * Descobre o ID da tarefa a partir de um elemento interno.
 * @param {Element} elemento
 * @returns {number|null}
 */
function obterIdDaTarefa(elemento) {
  const elementoTarefa = elemento.closest(SELETORES.tarefa);
  return elementoTarefa ? Number(elementoTarefa.dataset.id) : null;
}

/**
 * Remove a tarefa representada pelo elemento clicado.
 * @param {Element} elemento
 */
function removerDaInterface(elemento) {
  const id = obterIdDaTarefa(elemento);
  if (id === null) {
    return;
  }

  removerTarefa(id);
  persistirERenderizar();
}

/**
 * Alterna a conclusão e atualiza apenas o checkbox clicado.
 * @param {HTMLInputElement} checkbox
 */
function alternarConclusao(checkbox) {
  const id = obterIdDaTarefa(checkbox);
  if (id === null || !alternarConcluida(id)) {
    return;
  }

  persistirAtualizacaoIncremental();

  const tarefa = obterTarefaPorId(id);
  if (tarefa) {
    atualizarCheckboxTarefa(checkbox, tarefa.completa);
  }
}

/**
 * Abre o campo de edição inline do texto clicado.
 * @param {HTMLElement} elementoTexto
 */
function iniciarEdicaoDoTexto(elementoTexto) {
  const id = obterIdDaTarefa(elementoTexto);
  if (id === null) {
    return;
  }

  iniciarEdicaoTarefa(elementoTexto, (novoTexto) => {
    if (editarTarefa(id, novoTexto)) {
      persistirERenderizar();
    }
  });
}

/**
 * Trata cliques na lista: remover ou marcar como concluída.
 * @param {MouseEvent} evento
 */
function aoClicarNaLista(evento) {
  const botaoRemover = evento.target.closest(SELETORES.botaoRemover);
  if (botaoRemover) {
    removerDaInterface(botaoRemover);
    return;
  }

  const checkbox = evento.target.closest(SELETORES.checkboxTarefa);
  if (checkbox) {
    alternarConclusao(checkbox);
  }
}

/**
 * Trata o duplo clique que inicia a edição.
 * @param {MouseEvent} evento
 */
function aoDuploCliqueNaLista(evento) {
  const elementoTexto = evento.target.closest(SELETORES.textoTarefa);
  if (elementoTexto) {
    iniciarEdicaoDoTexto(elementoTexto);
  }
}

/**
 * Inicia edição ao ativar o texto acessível pelo teclado.
 * @param {KeyboardEvent} evento
 */
function aoPressionarTeclaNaLista(evento) {
  if (evento.key !== 'Enter' && evento.key !== ' ') {
    return;
  }

  const elementoTexto = evento.target.closest(SELETORES.textoTarefa);
  if (elementoTexto) {
    evento.preventDefault();
    iniciarEdicaoDoTexto(elementoTexto);
  }
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

  container.addEventListener('click', aoClicarNaLista);
  container.addEventListener('dblclick', aoDuploCliqueNaLista);
  container.addEventListener('keydown', aoPressionarTeclaNaLista);
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', inicializarAplicacao);
