// ============================================================
// DOM.JS — Camada de interface (DOM)
// ------------------------------------------------------------
// Responsabilidade: criar elementos, renderizar a lista, atualizar
// contadores, exibir mensagens e controlar o modo de edição.
// NÃO faz: não guarda estado e não acessa localStorage.
// Conceitos ensinados: createElement, textContent (anti-XSS),
// classes CSS, eventos e acessibilidade (ARIA).
// ============================================================

import { SELETORES, CONFIG, MENSAGENS } from './constants.js';

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
  div.classList.add('tarefa');
  // O ID fica na raiz da tarefa: qualquer clique pode descobrir a
  // tarefa correspondente sem depender da posição dos filhos no DOM.
  div.dataset.id = tarefa.id;
  div.setAttribute('role', 'listitem');

  // Checkbox com ARIA para leitores de tela.
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `tarefa-${tarefa.id}`;
  checkbox.checked = tarefa.completa;
  checkbox.setAttribute('aria-checked', tarefa.completa);
  checkbox.setAttribute('aria-label', `Marcar "${tarefa.atividade}" como concluída`);

  // Texto da tarefa.
  // textContent (em vez de innerHTML) impede que o texto digitado
  // pelo usuário seja interpretado como HTML — proteção contra XSS.
  const span = document.createElement('span');
  span.className = 'texto-tarefa';
  span.textContent = tarefa.atividade;

  // Botão de remover, com rótulo acessível.
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.title = 'Deletar tarefa';
  botao.className = 'remove-btn';
  botao.dataset.id = tarefa.id;
  botao.setAttribute('aria-label', `Deletar tarefa: ${tarefa.atividade}`);

  // Ícone SVG (conteúdo estático, seguro).
  const iconeContainer = document.createElement('span');
  iconeContainer.className = 'icone-exclusao';
  iconeContainer.innerHTML = obterIconeLixeira();
  botao.appendChild(iconeContainer);

  // Monta a estrutura: [checkbox] [texto] [botão]
  div.appendChild(checkbox);
  div.appendChild(span);
  div.appendChild(botao);

  return div;
}

/**
 * Cria o bloco exibido quando a lista está vazia.
 * @returns {HTMLElement}
 */
export function criarEstadoVazio() {
  const div = document.createElement('div');
  div.className = 'tarefas-empty';

  const iconeContainer = document.createElement('span');
  iconeContainer.className = 'tarefas-empty__icone';
  iconeContainer.innerHTML = obterIconeListaVazia();

  const titulo = document.createElement('span');
  titulo.className = 'tarefas-empty__titulo';
  titulo.textContent = 'Você ainda não tem tarefas cadastradas';

  const subtitulo = document.createElement('p');
  subtitulo.className = 'tarefas-empty__subtitulo';
  subtitulo.textContent = 'Crie tarefas e organize seus itens a fazer';

  div.appendChild(iconeContainer);
  div.appendChild(titulo);
  div.appendChild(subtitulo);

  return div;
}

// ========== RENDERIZAÇÃO ==========

/**
 * Remove todo o conteúdo do container de tarefas.
 */
export function limparContainerTarefas() {
  const container = selecionar(SELETORES.containerTarefas);
  if (container) {
    container.innerHTML = '';
  }
}

/**
 * Renderiza a lista de tarefas no container.
 * @param {import('./state.js').Tarefa[]} tarefas
 */
export function renderizarLista(tarefas) {
  const container = selecionar(SELETORES.containerTarefas);
  if (!container) {
    return;
  }

  limparContainerTarefas();

  if (!tarefas || tarefas.length === 0) {
    container.appendChild(criarEstadoVazio());
    return;
  }

  tarefas.forEach((tarefa) => {
    container.appendChild(criarElementoTarefa(tarefa));
  });
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
    contadorCriadas.innerText = `${total}`;
  }
  if (contadorConcluidas) {
    contadorConcluidas.innerText = `${completas} de ${total}`;
  }
}

// ========== INPUT ==========

/**
 * Lê e normaliza o valor do campo de nova tarefa.
 * @returns {string}
 */
export function obterValorCampoEntrada() {
  const input = selecionar(SELETORES.campoEntrada);
  return input ? input.value.trim() : '';
}

/**
 * Limpa o campo de nova tarefa.
 */
export function limparCampoEntrada() {
  const input = selecionar(SELETORES.campoEntrada);
  if (input) {
    input.value = '';
  }
}

// ========== ATUALIZAÇÃO INCREMENTAL ==========

/**
 * Atualiza o checkbox de uma tarefa sem re-renderizar toda a lista.
 * @param {number} id
 * @param {boolean} estaCompleta
 */
export function atualizarCheckboxTarefa(id, estaCompleta) {
  const checkbox = document.getElementById(`tarefa-${id}`);
  if (!checkbox) {
    return;
  }

  checkbox.checked = estaCompleta;
  checkbox.setAttribute('aria-checked', estaCompleta);
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
  div.className = `mensagem-flash mensagem-flash--${tipo}`;
  div.textContent = texto;
  div.setAttribute('role', 'alert');
  div.setAttribute('aria-live', 'polite');

  // Insere no topo do container principal (ou no body, se necessário).
  const main = selecionar(SELETORES.containerPrincipal);
  if (main) {
    main.insertBefore(div, main.firstChild);
  } else {
    document.body.insertBefore(div, document.body.firstChild);
  }

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
  campo.className = 'campo-edicao';
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
  elementoTarefa.classList.remove('tarefa--editando');
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
  if (!elementoTarefa || elementoTarefa.classList.contains('tarefa--editando')) {
    return;
  }

  const textoOriginal = elementoTexto.textContent;
  const campoEdicao = criarCampoEdicao(textoOriginal);

  // A classe esconde o texto pelo CSS; o JS não mexe em style inline.
  elementoTarefa.classList.add('tarefa--editando');
  elementoTexto.parentNode.insertBefore(campoEdicao, elementoTexto);

  campoEdicao.focus();
  campoEdicao.select();

  // Garante que o fluxo termine apenas uma vez (Enter, Esc ou blur).
  let finalizado = false;

  function cancelarEdicao() {
    if (finalizado) {
      return;
    }
    finalizado = true;
    encerrarEdicao(elementoTarefa, campoEdicao);
    if (typeof onCancelar === 'function') {
      onCancelar();
    }
  }

  function salvarEdicao() {
    if (finalizado) {
      return;
    }

    const novoTexto = campoEdicao.value.trim();

    if (novoTexto === '' || novoTexto === textoOriginal) {
      cancelarEdicao();
      return;
    }

    if (novoTexto.length > CONFIG.MAX_CARACTERES_TAREFA) {
      mostrarMensagem(MENSAGENS.textoMuitoLongo);
      cancelarEdicao();
      return;
    }

    finalizado = true;
    encerrarEdicao(elementoTarefa, campoEdicao);
    if (typeof onSalvar === 'function') {
      onSalvar(novoTexto);
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
    setTimeout(salvarEdicao, CONFIG.DELAY_SALVAR_BLUR);
  });
}
