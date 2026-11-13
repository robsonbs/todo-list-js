// ============================================================
// TAREFA.JS — Validação pura dos dados de tarefa
// ------------------------------------------------------------
// Responsabilidade: normalizar e validar campos enviados pelo usuário.
// NÃO faz: não acessa HTTP, banco de dados ou estado global.
// Conceitos ensinados: função pura, validação e limites de entrada.
// ============================================================

/**
 * Valida o texto de uma tarefa e devolve a versão aparada.
 * @param {unknown} texto Valor recebido na requisição.
 * @returns {{ valido: true, texto: string } | { valido: false }} Resultado da validação.
 */
export function validarTextoTarefa(texto) {
  if (typeof texto !== 'string') {
    return { valido: false };
  }

  const textoNormalizado = texto.trim();
  const quantidadeCaracteres = Array.from(textoNormalizado).length;

  if (quantidadeCaracteres < 1 || quantidadeCaracteres > 100) {
    return { valido: false };
  }

  return { valido: true, texto: textoNormalizado };
}

/**
 * Confere se um valor pode representar o estado de conclusão de uma tarefa.
 * @param {unknown} completa Valor recebido na requisição.
 * @returns {completa is boolean} Indica se o valor é booleano.
 */
export function estadoDeConclusaoValido(completa) {
  return typeof completa === 'boolean';
}

/**
 * Valida UUIDs usados como identificadores de tarefas nas rotas.
 * @param {unknown} identificador Valor recebido no parâmetro da URL.
 * @returns {identificador is string} Indica se o valor tem formato UUID.
 */
export function identificadorTarefaValido(identificador) {
  return (
    typeof identificador === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identificador)
  );
}
