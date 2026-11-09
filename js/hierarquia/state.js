// ============================================================
// STATE.JS — Árvore de tarefas
// ------------------------------------------------------------
// Guarda e altera tarefas aninhadas, sem acessar DOM ou storage.
// Folhas podem ser marcadas; o estado dos pais é calculado pelos filhos.
// ============================================================

import { validarTexto } from '../validacao.js';
import { CONFIG } from './constants.js';

/** @typedef {{ id: number, atividade: string, completa: boolean, parcial: boolean, filhos: Tarefa[] }} Tarefa */

let tarefas = [];
let proximoId = 1;

function copiarTarefa(tarefa) {
  return {
    id: tarefa.id,
    atividade: tarefa.atividade,
    completa: tarefa.completa,
    parcial: tarefa.parcial,
    filhos: tarefa.filhos.map(copiarTarefa),
  };
}

function copiarLista(lista) {
  return lista.map(copiarTarefa);
}

function recalcularLista(lista) {
  for (const tarefa of lista) {
    recalcularLista(tarefa.filhos);

    if (tarefa.filhos.length > 0) {
      tarefa.completa = tarefa.filhos.every((filho) => filho.completa);
      tarefa.parcial =
        !tarefa.completa && tarefa.filhos.some((filho) => filho.completa || filho.parcial);
    } else {
      tarefa.parcial = false;
    }
  }
}

function localizarTarefa(id, lista = tarefas, nivel = 1, ancestral = null) {
  for (const tarefa of lista) {
    if (tarefa.id === id) {
      return { tarefa, nivel, ancestral };
    }

    const encontrada = localizarTarefa(id, tarefa.filhos, nivel + 1, tarefa);
    if (encontrada) {
      return encontrada;
    }
  }

  return null;
}

function contarLista(lista, contadores) {
  for (const tarefa of lista) {
    contadores.total += 1;
    if (tarefa.completa) {
      contadores.completas += 1;
    }
    contarLista(tarefa.filhos, contadores);
  }
}

/** Retorna uma cópia profunda para impedir alterações externas no estado. @returns {Tarefa[]} */
export function obterTarefas() {
  return copiarLista(tarefas);
}

/** Procura uma tarefa em qualquer nível e devolve uma cópia. @param {number} id */
export function obterTarefaPorId(id) {
  const encontrada = localizarTarefa(id);
  return encontrada ? copiarTarefa(encontrada.tarefa) : null;
}

/** Adiciona uma tarefa principal ou uma filha; recusa criar além do limite. */
export function adicionarTarefa(atividade, idPai = null) {
  const validacao = validarTexto(atividade);
  if (!validacao.valido) {
    return null;
  }

  let destino = tarefas;
  if (idPai !== null) {
    const pai = localizarTarefa(idPai);
    if (!pai || pai.nivel >= CONFIG.MAX_NIVEIS) {
      return null;
    }
    destino = pai.tarefa.filhos;
  }

  const novaTarefa = {
    id: proximoId++,
    atividade: validacao.texto,
    completa: false,
    parcial: false,
    filhos: [],
  };

  destino.push(novaTarefa);
  recalcularLista(tarefas);
  return copiarTarefa(novaTarefa);
}

/** Edita o texto de uma tarefa existente. @param {number} id @param {string} novoTexto */
export function editarTarefa(id, novoTexto) {
  const encontrada = localizarTarefa(id);
  const validacao = validarTexto(novoTexto);
  if (!encontrada || !validacao.valido) {
    return false;
  }

  encontrada.tarefa.atividade = validacao.texto;
  return true;
}

/** Alterna somente folhas; tarefas com filhos são calculadas automaticamente. */
export function alternarConcluida(id) {
  const encontrada = localizarTarefa(id);
  if (!encontrada || encontrada.tarefa.filhos.length > 0) {
    return false;
  }

  encontrada.tarefa.completa = !encontrada.tarefa.completa;
  recalcularLista(tarefas);
  return true;
}

function removerDaLista(id, lista) {
  const indice = lista.findIndex((tarefa) => tarefa.id === id);
  if (indice !== -1) {
    lista.splice(indice, 1);
    return true;
  }

  for (const tarefa of lista) {
    if (removerDaLista(id, tarefa.filhos)) {
      // Se a última filha foi removida, o antigo pai vira uma folha nova.
      if (tarefa.filhos.length === 0) {
        tarefa.completa = false;
      }
      return true;
    }
  }

  return false;
}

/** Remove uma tarefa e todos os seus descendentes. @param {number} id */
export function removerTarefa(id) {
  const removida = removerDaLista(id, tarefas);
  if (removida) {
    recalcularLista(tarefas);
  }
  return removida;
}

/** Conta todos os nós da árvore, incluindo pais e subtarefas. */
export function obterContadores() {
  const contadores = { total: 0, completas: 0 };
  contarLista(tarefas, contadores);
  return contadores;
}

function normalizarTarefa(item, nivel, idsVistos) {
  if (!item || typeof item !== 'object' || !Number.isInteger(item.id) || item.id <= 0) {
    return null;
  }
  if (idsVistos.has(item.id)) {
    return null;
  }

  const validacao = validarTexto(item.atividade);
  if (!validacao.valido) {
    return null;
  }

  idsVistos.add(item.id);
  const filhos =
    nivel < CONFIG.MAX_NIVEIS && Array.isArray(item.filhos)
      ? item.filhos.map((filho) => normalizarTarefa(filho, nivel + 1, idsVistos)).filter(Boolean)
      : [];

  return {
    id: item.id,
    atividade: validacao.texto,
    completa: filhos.length === 0 && Boolean(item.completa),
    parcial: false,
    filhos,
  };
}

/** Valida uma árvore carregada, descarta dados ruins e recalcula os pais. */
export function substituirTarefas(novasTarefas) {
  const idsVistos = new Set();
  tarefas = Array.isArray(novasTarefas)
    ? novasTarefas.map((tarefa) => normalizarTarefa(tarefa, 1, idsVistos)).filter(Boolean)
    : [];

  recalcularLista(tarefas);
  proximoId = [...idsVistos].reduce((maior, id) => Math.max(maior, id), 0) + 1;
}
