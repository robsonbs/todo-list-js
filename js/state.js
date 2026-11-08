// ========== STATE.JS — Gerência do estado das tarefas ==========
// Este módulo é responsável apenas pelos dados (array de tarefas).
// Não manipula DOM e não acessa localStorage diretamente.

// Contador incremental para gerar IDs únicos
let proximoId = 1;

// Array que armazena todas as tarefas da nossa lista
let tarefas = [];

/**
 * Gera um ID único para uma nova tarefa
 * @returns {number} ID único
 */
function gerarId() {
  return proximoId++;
}

/**
 * Retorna uma cópia do array de tarefas
 * @returns {Array} Cópia do array de tarefas
 */
export function obterTarefas() {
  return [...tarefas];
}

/**
 * Retorna uma tarefa pelo ID
 * @param {number} id - ID único da tarefa
 * @returns {Object|null} Objeto da tarefa ou null se não encontrada
 */
export function obterTarefaPorId(id) {
  return tarefas.find((t) => t.id === id) || null;
}

/**
 * Retorna o índice de uma tarefa no array pelo ID
 * @param {number} id - ID único da tarefa
 * @returns {number} Índice da tarefa ou -1 se não encontrada
 */
export function obterIndicePorId(id) {
  return tarefas.findIndex((t) => t.id === id);
}

/**
 * Adiciona uma nova tarefa ao estado
 * @param {string} atividade - Texto da tarefa
 * @returns {Object|null} Objeto da tarefa criada ou null se falhar
 */
export function adicionarTarefa(atividade) {
  const textoLimpo = atividade.trim();
  if (textoLimpo === '') {
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
 * Remove uma tarefa pelo ID
 * @param {number} id - ID único da tarefa a ser removida
 * @returns {boolean} true se removeu com sucesso, false caso contrário
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
 * Edita o texto de uma tarefa existente
 * @param {number} id - ID único da tarefa
 * @param {string} novoTexto - Novo texto da tarefa
 * @returns {boolean} true se editou com sucesso, false caso contrário
 */
export function editarTarefa(id, novoTexto) {
  const indice = obterIndicePorId(id);
  if (indice === -1) {
    return false;
  }

  const textoLimpo = novoTexto.trim();
  if (textoLimpo === '') {
    return false;
  }

  tarefas[indice].atividade = textoLimpo;
  return true;
}

/**
 * Alterna o status de conclusão de uma tarefa
 * @param {number} id - ID único da tarefa
 * @returns {boolean} true se alterou com sucesso, false caso contrário
 */
export function toggleConcluida(id) {
  const indice = obterIndicePorId(id);
  if (indice === -1) {
    return false;
  }

  tarefas[indice].completa = !tarefas[indice].completa;
  return true;
}

/**
 * Retorna a contagem de tarefas totais e concluídas
 * @returns {Object} { total, completas }
 */
export function obterContadores() {
  const total = tarefas.length;
  const completas = tarefas.filter((t) => t.completa).length;
  return { total, completas };
}

/**
 * Substitui todo o array de tarefas (usado ao carregar do localStorage)
 * @param {Array} novasTarefas - Novo array de tarefas
 */
export function substituirTarefas(novasTarefas) {
  tarefas = novasTarefas ? [...novasTarefas] : [];
  // Recalcula o próximo ID baseado no máximo existente
  if (tarefas.length > 0) {
    const maxId = Math.max(...tarefas.map((t) => t.id));
    proximoId = maxId + 1;
  }
}

/**
 * Limpa todas as tarefas
 */
export function limparTarefas() {
  tarefas = [];
  proximoId = 1;
}
