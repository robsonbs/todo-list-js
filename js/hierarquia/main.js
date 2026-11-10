// ============================================================
// MAIN.JS — Eventos e coordenação da lista hierárquica
// ------------------------------------------------------------
// Fluxo: evento → state → storage → DOM. Os controles dos itens
// usam delegação para continuar funcionando depois de renderizar.
// ============================================================

import {
  adicionarTarefa,
  alternarConcluida,
  editarTarefa,
  obterContadores,
  obterTarefaPorId,
  obterTarefas,
  reordenarTarefa,
  removerTarefa,
  substituirTarefas,
} from './state.js';
import { carregarTarefas, salvarTarefas } from './storage.js';
import { CONFIG, MENSAGENS, SELETORES } from './constants.js';
import {
  abrirFormularioItem,
  atualizarContadores,
  focarTarefa,
  limparCampoPrincipal,
  mostrarMensagem,
  obterFormularioPrincipal,
  obterTextoPrincipal,
  renderizarLista,
} from './dom.js';

function sincronizarTela() {
  const tarefas = obterTarefas();
  const { total, completas } = obterContadores();
  renderizarLista(tarefas);
  atualizarContadores(total, completas);
}

function persistir() {
  if (!salvarTarefas(obterTarefas())) {
    mostrarMensagem(MENSAGENS.falhaAoSalvar, 'erro');
  }
}

function aoSubmeterFormularioPrincipal(evento) {
  evento.preventDefault();
  const atividade = obterTextoPrincipal();
  const novaTarefa = adicionarTarefa(atividade);

  if (!novaTarefa) {
    mostrarMensagem(MENSAGENS.textoInvalido, 'erro');
    return;
  }

  mostrarMensagem('Tarefa principal adicionada.', 'sucesso');
  limparCampoPrincipal();
  persistir();
  sincronizarTela();
}

function encontrarTarefaDoElemento(elemento) {
  const item = elemento.closest(SELETORES.tarefa);
  return item ? { item, tarefa: obterTarefaPorId(Number(item.dataset.id)) } : null;
}

function aoClicarNaLista(evento) {
  const botaoCancelar = evento.target.closest('[data-acao="cancelar-formulario"]');
  if (botaoCancelar) {
    const item = botaoCancelar.closest(SELETORES.tarefa);
    const id = Number(item?.dataset.id);
    botaoCancelar.closest(SELETORES.formularioItem)?.remove();
    if (id) {
      focarTarefa(id);
    }
    return;
  }

  const encontrado = encontrarTarefaDoElemento(evento.target);
  if (!encontrado?.tarefa) {
    return;
  }

  const { item, tarefa } = encontrado;
  const botaoAbrirReordenacao = evento.target.closest(SELETORES.botaoAbrirReordenacao);
  if (botaoAbrirReordenacao) {
    const menu = item.querySelector(SELETORES.acoesReordenacao);
    if (menu) {
      const abrir = menu.hidden;
      menu.hidden = !abrir;
      botaoAbrirReordenacao.setAttribute('aria-expanded', String(abrir));
      if (abrir) {
        (menu.querySelector('button:not(:disabled)') || botaoAbrirReordenacao).focus();
      }
    }
    return;
  }

  const botaoAdicionar = evento.target.closest(SELETORES.botaoAdicionarFilho);
  if (botaoAdicionar) {
    if (Number(item.dataset.nivel) >= CONFIG.MAX_NIVEIS) {
      mostrarMensagem(MENSAGENS.nivelMaximo, 'erro');
      return;
    }
    abrirFormularioItem(item, 'adicionar', tarefa);
    return;
  }

  if (evento.target.closest(SELETORES.botaoEditar)) {
    abrirFormularioItem(item, 'editar', tarefa);
    return;
  }

  if (evento.target.closest(SELETORES.botaoRemover)) {
    const proximoItem = item.nextElementSibling || item.previousElementSibling;
    const tarefaPai = item.parentElement.closest(SELETORES.tarefa);
    const idParaFoco = Number(proximoItem?.dataset.id || tarefaPai?.dataset.id || 0);
    removerTarefa(tarefa.id);
    mostrarMensagem('Tarefa e subtarefas removidas.', 'sucesso');
    persistir();
    sincronizarTela();
    focarTarefa(idParaFoco);
    return;
  }

  const botaoMovimento = evento.target.closest(SELETORES.botaoMovimento);
  if (botaoMovimento) {
    const movimento = botaoMovimento.dataset.movimento;
    if (reordenarTarefa(tarefa.id, movimento)) {
      mostrarMensagem(MENSAGENS.tarefaReordenada, 'sucesso');
      persistir();
      sincronizarTela();
      focarTarefa(tarefa.id, 'reordenar');
    }
    return;
  }

  const checkbox = evento.target.closest(SELETORES.checkbox);
  if (checkbox && !checkbox.disabled) {
    alternarConcluida(tarefa.id);
    persistir();
    sincronizarTela();
    focarTarefa(tarefa.id, 'checkbox');
  }
}

function aoSubmeterFormularioDaLista(evento) {
  const formulario = evento.target.closest(SELETORES.formularioItem);
  if (!formulario) {
    return;
  }

  evento.preventDefault();
  const id = Number(formulario.dataset.id);
  const campo = formulario.elements.namedItem('atividade');
  const atividade = campo?.value.trim() || '';
  const tipo = formulario.dataset.formulario;
  let idParaFoco = id;
  let sucesso;
  if (tipo === 'editar') {
    sucesso = editarTarefa(id, atividade);
  } else {
    const novaTarefa = adicionarTarefa(atividade, id);
    sucesso = Boolean(novaTarefa);
    if (novaTarefa) {
      idParaFoco = novaTarefa.id;
    }
  }

  if (!sucesso) {
    mostrarMensagem(MENSAGENS.textoInvalido, 'erro');
    campo?.focus();
    return;
  }

  mostrarMensagem(tipo === 'editar' ? 'Tarefa atualizada.' : 'Subtarefa adicionada.', 'sucesso');
  persistir();
  sincronizarTela();
  focarTarefa(idParaFoco);
}

function iniciarEdicaoPeloTexto(evento) {
  const texto = evento.target.closest(SELETORES.texto);
  if (!texto) {
    return;
  }
  const encontrado = encontrarTarefaDoElemento(texto);
  if (encontrado?.tarefa) {
    abrirFormularioItem(encontrado.item, 'editar', encontrado.tarefa);
  }
}

function aoPressionarTeclaNaLista(evento) {
  if (evento.key === 'Escape') {
    const botaoMovimento = evento.target.closest(SELETORES.botaoMovimento);
    if (botaoMovimento) {
      const item = botaoMovimento.closest(SELETORES.tarefa);
      const menu = item?.querySelector(SELETORES.acoesReordenacao);
      const botaoAbrir = item?.querySelector(SELETORES.botaoAbrirReordenacao);
      if (menu && botaoAbrir && !menu.hidden) {
        menu.hidden = true;
        botaoAbrir.setAttribute('aria-expanded', 'false');
        botaoAbrir.focus();
        evento.preventDefault();
      }
      return;
    }
  }

  if (evento.key !== 'Enter' && evento.key !== ' ') {
    return;
  }
  const texto = evento.target.closest(SELETORES.texto);
  if (texto) {
    evento.preventDefault();
    iniciarEdicaoPeloTexto(evento);
  }
}

function configurarAplicacao() {
  const dadosSalvos = carregarTarefas();
  if (dadosSalvos) {
    substituirTarefas(dadosSalvos);
  }

  sincronizarTela();

  obterFormularioPrincipal()?.addEventListener('submit', aoSubmeterFormularioPrincipal);
  const lista = document.querySelector(SELETORES.lista);
  lista?.addEventListener('click', aoClicarNaLista);
  lista?.addEventListener('submit', aoSubmeterFormularioDaLista);
  lista?.addEventListener('dblclick', iniciarEdicaoPeloTexto);
  lista?.addEventListener('keydown', aoPressionarTeclaNaLista);
}

document.addEventListener('DOMContentLoaded', configurarAplicacao, { once: true });
