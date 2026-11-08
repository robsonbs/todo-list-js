// ============================================================
// STATE.JS — Estado das tarefas (a "memória" da aplicação)
// ------------------------------------------------------------
// Responsabilidade: guardar a lista de tarefas e as operações
// sobre ela (adicionar, remover, editar, concluir e contar).
// NÃO faz: não toca no DOM e não acessa localStorage.
// Conceitos ensinados: arrays, objetos, IDs únicos e funções puras.
// ============================================================

import { CONFIG } from './constants.js';

/**
 * Formato de uma tarefa usado em toda a aplicação.
 * @typedef {Object} Tarefa
 * @property {number} id        Identificador único da tarefa
 * @property {string} atividade Texto da tarefa
 * @property {boolean} completa Se a tarefa foi concluída
 */

// Contador incremental: garante um ID único para cada tarefa mesmo
// após remoções. Não usamos a posição no array como identidade,
// pois ela muda quando itens são removidos.
let proximoId = 1;

// Array interno. Não é exportado diretamente para evitar que outros
// módulos o modifiquem sem passar pelas funções de estado.
let tarefas = [];

/**
 * Gera o próximo ID disponível.
 * @returns {number} ID único
 */
function gerarId() {
  return proximoId++;
}

/**
 * Localiza a posição de uma tarefa pelo ID (uso interno).
 * @param {number} id
 * @returns {number} Índice no array ou -1
 */
function obterIndicePorId(id) {
  return tarefas.findIndex((t) => t.id === id);
}

/**
 * Retorna uma cópia da lista de tarefas.
 * A cópia evita que quem chama altere o estado por engano.
 * @returns {Tarefa[]}
 */
export function obterTarefas() {
  return [...tarefas];
}

/**
 * Retorna uma tarefa pelo ID.
 * @param {number} id
 * @returns {Tarefa|null}
 */
export function obterTarefaPorId(id) {
  return tarefas.find((t) => t.id === id) || null;
}

/**
 * Adiciona uma nova tarefa ao estado.
 * @param {string} atividade Texto digitado pelo usuário
 * @returns {Tarefa|null} A tarefa criada ou null se inválida
 */
export function adicionarTarefa(atividade) {
  const textoLimpo = atividade.trim();

  // Defesa em profundidade: a interface também valida, mas o estado
  // não deve confiar cegamente em quem o chama.
  if (textoLimpo === '' || textoLimpo.length > CONFIG.MAX_CARACTERES_TAREFA) {
    return null;
  }

  const tarefa = {
    id: gerarId(),
    completa: false,
    atividade: textoLimpo,
  };

  tarefas.push(tarefa);
  return { ...tarefa };
}

/**
 * Remove uma tarefa pelo ID.
 * @param {number} id
 * @returns {boolean} true se removeu, false se não encontrou
 */
export function removerTarefa(id) {
  const indice = obterIndicePorId(id);
  if (indice === -1) {
    return false;
  }

  tarefas.splice(indice, 1);
  return true;
}

/**
 * Edita o texto de uma tarefa existente.
 * @param {number} id
 * @param {string} novoTexto
 * @returns {boolean} true se editou, false se inválido
 */
export function editarTarefa(id, novoTexto) {
  const indice = obterIndicePorId(id);
  if (indice === -1) {
    return false;
  }

  const textoLimpo = novoTexto.trim();
  if (textoLimpo === '' || textoLimpo.length > CONFIG.MAX_CARACTERES_TAREFA) {
    return false;
  }

  tarefas[indice].atividade = textoLimpo;
  return true;
}

/**
 * Alterna o status de conclusão de uma tarefa.
 * @param {number} id
 * @returns {boolean} true se alterou, false se não encontrou
 */
export function alternarConcluida(id) {
  const indice = obterIndicePorId(id);
  if (indice === -1) {
    return false;
  }

  tarefas[indice].completa = !tarefas[indice].completa;
  return true;
}

/**
 * Retorna a contagem de tarefas totais e concluídas.
 * @returns {{ total: number, completas: number }}
 */
export function obterContadores() {
  const total = tarefas.length;
  const completas = tarefas.filter((t) => t.completa).length;
  return { total, completas };
}

/**
 * Valida e normaliza uma tarefa vinda do localStorage.
 * @param {unknown} item
 * @returns {Tarefa|null} Tarefa normalizada ou null se inválida
 */
function normalizarTarefa(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }
  if (typeof item.id !== 'number' || !Number.isFinite(item.id)) {
    return null;
  }
  if (typeof item.atividade !== 'string') {
    return null;
  }

  const atividade = item.atividade.trim();
  if (atividade === '') {
    return null;
  }

  return { id: item.id, atividade, completa: Boolean(item.completa) };
}

/**
 * Substitui toda a lista (usado ao carregar do localStorage).
 * Entradas inválidas são descartadas para que dados antigos ou
 * corrompidos não quebrem a renderização.
 * @param {unknown} novasTarefas
 */
export function substituirTarefas(novasTarefas) {
  const lista = Array.isArray(novasTarefas) ? novasTarefas : [];
  tarefas = lista.map(normalizarTarefa).filter(Boolean);

  // Recalcula o próximo ID a partir do maior existente.
  // Usamos reduce (e não Math.max(...ids)) para não estourar a pilha
  // de chamadas quando a lista é muito grande.
  proximoId = tarefas.reduce((maior, tarefa) => Math.max(maior, tarefa.id), 0) + 1;
}
