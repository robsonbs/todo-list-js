// ========== DOM.JS — Manipulação de DOM pura ==========
// Este módulo é responsável apenas por criar e atualizar elementos HTML.
// Não contém lógica de negócio, não acessa localStorage e não conhece o estado da aplicação.
// Usa createElement + textContent para evitar XSS (nunca insere conteúdo do usuário via innerHTML).

import { SELETORES, CONFIG } from './constants.js';

const $ = (seletor) => document.querySelector(seletor);
const $id = (id) => document.getElementById(id);

// ========== CRIAÇÃO DE ELEMENTOS ==========

/**
 * Retorna o HTML do ícone de lixeira (SVG)
 * Este SVG é estático (não contém conteúdo do usuário), então é seguro usar innerHTML para ele.
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
 * Retorna o HTML do ícone de lista vazia (SVG)
 * Este SVG é estático (não contém conteúdo do usuário).
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
 * Cria um elemento de tarefa completo (DOM)
 * Usa createElement + textContent para evitar XSS.
 * @param {Object} tarefa - Objeto da tarefa { id, completa, atividade }
 * @returns {HTMLElement} Elemento div.tarefa
 */
export function criarElementoTarefa(tarefa) {
  const div = document.createElement('div');
  div.classList.add('tarefa');

  // Checkbox (com ARIA para acessibilidade)
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `tarefa-${tarefa.id}`;
  checkbox.checked = tarefa.completa;
  checkbox.setAttribute('aria-checked', tarefa.completa);
  checkbox.setAttribute('aria-label', `Marcar "${tarefa.atividade}" como concluída`);

  // Texto da tarefa (usando textContent para evitar XSS)
  const span = document.createElement('span');
  span.className = 'texto-tarefa';
  span.textContent = tarefa.atividade;

  // Botão de remover (com ARIA para acessibilidade)
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.title = 'Deletar tarefa';
  botao.className = 'remove-btn';
  botao.dataset.id = tarefa.id;
  botao.setAttribute('aria-label', `Deletar tarefa: ${tarefa.atividade}`);

  // Ícone SVG do botão (conteúdo estático, seguro)
  const iconeContainer = document.createElement('span');
  iconeContainer.className = 'icone-exclusao';
  iconeContainer.innerHTML = obterIconeLixeira();
  botao.appendChild(iconeContainer);

  // Monta a estrutura
  div.appendChild(checkbox);
  div.appendChild(span);
  div.appendChild(botao);

  return div;
}

/**
 * Cria o estado de lista vazia
 * @returns {HTMLElement} Elemento div.tarefas-empty
 */
export function criarEstadoVazio() {
  const div = document.createElement('div');
  div.className = 'tarefas-empty';

  const iconeContainer = document.createElement('span');
  iconeContainer.innerHTML = obterIconeListaVazia();

  const texto = document.createElement('span');
  texto.textContent = 'Você ainda não tem tarefas cadastradas';

  const subtitulo = document.createElement('p');
  subtitulo.textContent = 'Crie tarefas e organize seus itens a fazer';

  div.appendChild(iconeContainer);
  div.appendChild(texto);
  div.appendChild(subtitulo);

  return div;
}

// ========== FUNÇÕES DE RENDERIZAÇÃO ==========

/**
 * Limpa o container de tarefas
 */
export function limparContainerTarefas() {
  const container = $(SELETORES.containerTarefas);
  if (container) {
    container.innerHTML = '';
  }
}

/**
 * Renderiza uma lista de tarefas no container
 * @param {Array} tarefas - Array de objetos de tarefa
 */
export function renderizarLista(tarefas) {
  const container = $(SELETORES.containerTarefas);
  if (!container) {
    return;
  }

  limparContainerTarefas();

  if (!tarefas || tarefas.length === 0) {
    container.appendChild(criarEstadoVazio());
    return;
  }

  tarefas.forEach((tarefa) => {
    const elemento = criarElementoTarefa(tarefa);
    container.appendChild(elemento);
  });
}

/**
 * Atualiza os contadores de tarefas na interface
 * @param {number} total - Total de tarefas
 * @param {number} completas - Tarefas concluídas
 */
export function atualizarContadores(total, completas) {
  const contadorCriadas = $id(SELETORES.contadorCriadas.replace('#', ''));
  const contadorConcluidas = $id(SELETORES.contadorConcluidas.replace('#', ''));

  if (contadorCriadas) {
    contadorCriadas.innerText = `${total}`;
  }
  if (contadorConcluidas) {
    contadorConcluidas.innerText = `${completas} de ${total}`;
  }
}

// ========== FUNÇÕES DE INPUT ==========

/**
 * Obtém o valor do input de nova tarefa
 * @returns {string} Texto digitado no input
 */
export function obterValorInput() {
  const input = $(SELETORES.input);
  return input ? input.value.trim() : '';
}

/**
 * Limpa o input de nova tarefa
 */
export function limparInput() {
  const input = $(SELETORES.input);
  if (input) {
    input.value = '';
  }
}

// ========== ATUALIZAÇÃO INCREMENTAL ==========

/**
 * Atualiza visualmente o checkbox de uma tarefa sem re-renderizar a lista
 * @param {number} id - ID único da tarefa
 * @param {boolean} estaCompleta - Se a tarefa está concluída
 */
export function atualizarCheckboxTarefa(id, estaCompleta) {
  const checkbox = document.querySelector(`#tarefa-${id}`);
  if (!checkbox) {
    return;
  }
  checkbox.checked = estaCompleta;
  checkbox.setAttribute('aria-checked', estaCompleta);
}

// ========== CONTAINER ==========

/**
 * Retorna o container de tarefas
 * @returns {HTMLElement|null}
 */
export function obterContainerTarefas() {
  return $(SELETORES.containerTarefas);
}

// ========== MENSAGENS DE INTERFACE ==========

/**
 * Exibe uma mensagem temporária na interface
 * @param {string} texto - Texto da mensagem
 * @param {string} tipo - Tipo da mensagem ('erro', 'sucesso', 'info')
 */
export function mostrarMensagem(texto, tipo = 'erro') {
  // Remove mensagem anterior se existir
  const mensagemExistente = document.querySelector('.mensagem-flash');
  if (mensagemExistente) {
    mensagemExistente.remove();
  }

  const div = document.createElement('div');
  div.className = `mensagem-flash mensagem-flash--${tipo}`;
  div.textContent = texto;
  div.setAttribute('role', 'alert');
  div.setAttribute('aria-live', 'polite');

  // Inserir no topo do container principal
  const main = document.querySelector('.tarefas-container');
  if (main) {
    main.insertBefore(div, main.firstChild);
  } else {
    document.body.insertBefore(div, document.body.firstChild);
  }

  // Remover automaticamente após 3 segundos
  setTimeout(() => {
    div.remove();
  }, 3000);
}

// ========== FUNÇÕES DE EDIÇÃO ==========

/**
 * Inicia o modo de edição para uma tarefa específica
 * @param {HTMLElement} elementoTexto - O elemento span que contém o texto
 * @param {Function} onSalvar - Callback chamado ao salvar (recebe novoTexto)
 * @param {Function} onCancelar - Callback chamado ao cancelar
 */
export function iniciarEdicaoTarefa(elementoTexto, onSalvar, onCancelar) {
  if (elementoTexto.querySelector('input')) {
    return;
  }

  const textoOriginal = elementoTexto.textContent;

  const campoEdicao = document.createElement('input');
  campoEdicao.type = 'text';
  campoEdicao.value = textoOriginal;
  campoEdicao.className = 'campo-edicao';

  elementoTexto.style.display = 'none';
  elementoTexto.parentNode.insertBefore(campoEdicao, elementoTexto);

  campoEdicao.focus();
  campoEdicao.select();

  function finalizarEdicao(salvar = true) {
    const novoTexto = campoEdicao.value.trim();

    if (salvar && novoTexto !== '' && novoTexto !== textoOriginal) {
      if (novoTexto.length > CONFIG.MAX_CARACTERES_TAREFA) {
        campoEdicao.remove();
        elementoTexto.style.display = '';
        if (typeof onCancelar === 'function') {
          onCancelar();
        }
        return;
      }
      if (typeof onSalvar === 'function') {
        onSalvar(novoTexto);
      }
    } else {
      campoEdicao.remove();
      elementoTexto.style.display = '';
      if (typeof onCancelar === 'function') {
        onCancelar();
      }
    }
  }

  campoEdicao.addEventListener('keypress', function (evento) {
    if (evento.key === 'Enter') {
      evento.preventDefault();
      finalizarEdicao(true);
    }
  });

  campoEdicao.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      evento.preventDefault();
      finalizarEdicao(false);
    }
  });

  campoEdicao.addEventListener('blur', function () {
    setTimeout(() => finalizarEdicao(true), CONFIG.DELAY_SALVAR_BLUR);
  });
}
