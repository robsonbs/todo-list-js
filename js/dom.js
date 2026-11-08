// ============================================================
// DOM.JS — Camada de interface (DOM)
// ------------------------------------------------------------
// Responsabilidade: criar elementos, renderizar a lista, atualizar
// contadores, exibir mensagens e controlar o modo de edição.
// NÃO faz: não guarda estado e não acessa localStorage.
// Conceitos ensinados: createElement, textContent (anti-XSS),
// classes CSS, eventos e acessibilidade (ARIA).
// ============================================================

import { CLASSES, SELETORES, CONFIG, MENSAGENS } from './constants.js';
import { validarTexto } from './validacao.js';

// Atalho para consultar um elemento usando os seletores centralizados.
const selecionar = (seletor) => document.querySelector(seletor);

// ========== CRIAÇÃO DE ELEMENTOS ==========

/**
 * Retorna o HTML do ícone de lixeira (SVG).
 * É um conteúdo estático (sem dados do usuário), então o uso de
 * innerHTML é seguro neste caso.
 * @returns {string}
 */
function obterIconeLixeira() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
      <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/**
 * Retorna o HTML do ícone de lista vazia (SVG).
 * Também é conteúdo estático.
 * @returns {string}
 */
function obterIconeListaVazia() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <line x1="96" y1="152" x2="160" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="96" y1="120" x2="160" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
      <path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/**
 * Cria o elemento visual completo de uma tarefa.
 * @param {import('./state.js').Tarefa} tarefa
 * @returns {HTMLElement}
 */
export function criarElementoTarefa(tarefa) {
  const div = document.createElement('div');
  div.className = CLASSES.tarefa;
  // O ID fica na raiz da tarefa: qualquer clique pode descobrir a
  // tarefa correspondente sem depender da posição dos filhos no DOM.
  div.dataset.id = String(tarefa.id);
  div.setAttribute('role', 'listitem');

  // Checkbox acessível pelo aria-label.
  // Um checkbox nativo já expõe o estado "marcado" para leitores de
  // tela, então não precisamos duplicar isso com aria-checked.
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = tarefa.completa;
  checkbox.setAttribute('aria-label', `Marcar "${tarefa.atividade}" como concluída`);

  // Texto da tarefa.
  // textContent (em vez de innerHTML) impede que o texto digitado
  // pelo usuário seja interpretado como HTML — proteção contra XSS.
  const span = document.createElement('span');
  span.className = CLASSES.textoTarefa;
  span.textContent = tarefa.atividade;

  // Botão de remover, com rótulo acessível.
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.title = 'Deletar tarefa';
  botao.className = CLASSES.botaoRemover;
  botao.dataset.id = String(tarefa.id);
  botao.setAttribute('aria-label', `Deletar tarefa: ${tarefa.atividade}`);

  // Ícone SVG (conteúdo estático, seguro).
  const iconeContainer = document.createElement('span');
  iconeContainer.className = CLASSES.iconeExclusao;
  iconeContainer.innerHTML = obterIconeLixeira();
  botao.appendChild(iconeContainer);

  // Monta a estrutura: [checkbox] [texto] [botão]
  div.append(checkbox, span, botao);

  return div;
}

/**
 * Cria o bloco exibido quando a lista está vazia.
 * @returns {HTMLElement}
 */
export function criarEstadoVazio() {
  const div = document.createElement('div');
  div.className = CLASSES.estadoVazio;

  const iconeContainer = document.createElement('span');
  iconeContainer.className = CLASSES.estadoVazioIcone;
  iconeContainer.innerHTML = obterIconeListaVazia();

  const titulo = document.createElement('span');
  titulo.className = CLASSES.estadoVazioTitulo;
  titulo.textContent = 'Você ainda não tem tarefas cadastradas';

  const subtitulo = document.createElement('p');
  subtitulo.className = CLASSES.estadoVazioSubtitulo;
  subtitulo.textContent = 'Crie tarefas e organize seus itens a fazer';

  div.append(iconeContainer, titulo, subtitulo);

  return div;
}

// ========== RENDERIZAÇÃO ==========

/**
 * Renderiza a lista de tarefas no container.
 * replaceChildren troca todo o conteúdo de uma vez: mais simples
 * que limpar e depois inserir item por item.
 * @param {import('./state.js').Tarefa[]} tarefas
 */
export function renderizarLista(tarefas) {
  const container = selecionar(SELETORES.containerTarefas);
  if (!container) {
    return;
  }

  const itens = tarefas.length === 0 ? [criarEstadoVazio()] : tarefas.map(criarElementoTarefa);
  container.replaceChildren(...itens);
}

/**
 * Atualiza os contadores de tarefas na interface.
 * @param {number} total
 * @param {number} completas
 */
export function atualizarContadores(total, completas) {
  const contadorCriadas = selecionar(SELETORES.contadorCriadas);
  const contadorConcluidas = selecionar(SELETORES.contadorConcluidas);

  if (contadorCriadas) {
    contadorCriadas.textContent = `${total}`;
  }
  if (contadorConcluidas) {
    contadorConcluidas.textContent = `${completas} de ${total}`;
  }
}

// ========== INPUT ==========

/**
 * Lê e normaliza o valor do campo de nova tarefa.
 * @returns {string}
 */
export function obterValorCampoEntrada() {
  const campo = selecionar(SELETORES.campoEntrada);
  return campo ? campo.value.trim() : '';
}

/**
 * Limpa o campo de nova tarefa.
 */
export function limparCampoEntrada() {
  const campo = selecionar(SELETORES.campoEntrada);
  if (campo) {
    campo.value = '';
  }
}

/**
 * Retorna o formulário de criação de tarefas.
 * @returns {HTMLFormElement|null}
 */
export function obterFormulario() {
  return selecionar(SELETORES.formulario);
}

// ========== ATUALIZAÇÃO INCREMENTAL ==========

/**
 * Atualiza o checkbox de uma tarefa sem re-renderizar toda a lista.
 * O estado "marcado" de um checkbox nativo é exposto sozinho na
 * árvore de acessibilidade, então basta alterar a propriedade checked.
 * @param {HTMLInputElement} checkbox
 * @param {boolean} estaCompleta
 */
export function atualizarCheckboxTarefa(checkbox, estaCompleta) {
  if (!checkbox) {
    return;
  }

  checkbox.checked = estaCompleta;
}

/**
 * Retorna o container onde as tarefas são renderizadas.
 * @returns {HTMLElement|null}
 */
export function obterContainerTarefas() {
  return selecionar(SELETORES.containerTarefas);
}

// ========== MENSAGENS DE INTERFACE ==========

/**
 * Exibe uma mensagem temporária na interface.
 * @param {string} texto
 * @param {'erro'|'sucesso'|'info'} tipo
 */
export function mostrarMensagem(texto, tipo = 'erro') {
  // Remove a mensagem anterior para não empilhar avisos.
  const mensagemExistente = selecionar(SELETORES.mensagemFlash);
  if (mensagemExistente) {
    mensagemExistente.remove();
  }

  const div = document.createElement('div');
  div.className = `${CLASSES.mensagemFlash} ${CLASSES.mensagemFlash}--${tipo}`;
  div.textContent = texto;
  div.setAttribute('role', 'alert');
  div.setAttribute('aria-live', 'polite');

  // Insere no topo do container principal (ou no body, se necessário).
  const main = selecionar(SELETORES.containerPrincipal);
  (main || document.body).prepend(div);

  // Remove automaticamente depois de alguns segundos.
  setTimeout(() => {
    div.remove();
  }, CONFIG.DURACAO_MENSAGEM_MS);
}

// ========== MODO DE EDIÇÃO ==========

/**
 * Cria o campo de edição inline já configurado.
 * @param {string} textoOriginal
 * @returns {HTMLInputElement}
 */
function criarCampoEdicao(textoOriginal) {
  const campo = document.createElement('input');
  campo.type = 'text';
  campo.value = textoOriginal;
  campo.className = CLASSES.campoEdicao;
  campo.maxLength = CONFIG.MAX_CARACTERES_TAREFA;
  campo.setAttribute('aria-label', 'Editar tarefa');
  return campo;
}

/**
 * Encerra o modo de edição, removendo o campo e a classe de estado.
 * @param {HTMLElement} elementoTarefa
 * @param {HTMLInputElement} campoEdicao
 */
function encerrarEdicao(elementoTarefa, campoEdicao) {
  campoEdicao.remove();
  elementoTarefa.classList.remove(CLASSES.tarefaEditando);
}

/**
 * Inicia o modo de edição de uma tarefa.
 * Enter salva, Esc cancela e perder o foco salva após um pequeno delay.
 * @param {HTMLElement} elementoTexto
 * @param {(novoTexto: string) => void} [onSalvar]
 * @param {() => void} [onCancelar]
 */
export function iniciarEdicaoTarefa(elementoTexto, onSalvar, onCancelar) {
  const elementoTarefa = elementoTexto.closest(SELETORES.tarefa);

  // Evita abrir duas edições ao mesmo tempo para a mesma tarefa.
  if (!elementoTarefa || elementoTarefa.classList.contains(CLASSES.tarefaEditando)) {
    return;
  }

  const textoOriginal = elementoTexto.textContent;
  const campoEdicao = criarCampoEdicao(textoOriginal);

  // A classe esconde o texto pelo CSS; o JS não mexe em style inline.
  elementoTarefa.classList.add(CLASSES.tarefaEditando);
  elementoTexto.parentNode.insertBefore(campoEdicao, elementoTexto);

  campoEdicao.focus();
  campoEdicao.select();

  // Garante que o fluxo termine apenas uma vez (Enter, Esc ou blur).
  let finalizado = false;
  let timerSalvar = null;

  function cancelarEdicao() {
    if (finalizado) {
      return;
    }
    finalizado = true;
    clearTimeout(timerSalvar);
    encerrarEdicao(elementoTarefa, campoEdicao);
    if (typeof onCancelar === 'function') {
      onCancelar();
    }
  }

  function salvarEdicao() {
    if (finalizado) {
      return;
    }

    const validacao = validarTexto(campoEdicao.value);

    // Texto vazio ou igual ao original: apenas fecha, sem aviso.
    if (!validacao.valido) {
      if (validacao.motivo === 'textoMuitoLongo') {
        mostrarMensagem(MENSAGENS.textoMuitoLongo);
      }
      cancelarEdicao();
      return;
    }

    if (validacao.texto === textoOriginal) {
      cancelarEdicao();
      return;
    }

    finalizado = true;
    clearTimeout(timerSalvar);
    encerrarEdicao(elementoTarefa, campoEdicao);
    if (typeof onSalvar === 'function') {
      onSalvar(validacao.texto);
    }
  }

  campoEdicao.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      salvarEdicao();
    } else if (evento.key === 'Escape') {
      evento.preventDefault();
      cancelarEdicao();
    }
  });

  campoEdicao.addEventListener('blur', () => {
    // O pequeno delay evita conflito com o clique em outro controle.
    timerSalvar = setTimeout(salvarEdicao, CONFIG.DELAY_SALVAR_BLUR);
  });
}
