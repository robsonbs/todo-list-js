// ============================================================
// FIXTURES.JS — Apoio aos testes
// ------------------------------------------------------------
// Centraliza a criação de dados e do DOM usados nos testes.
// Assim, quando o HTML ou o formato de uma tarefa mudar, basta
// ajustar este arquivo em vez de todos os testes.
// ============================================================

/**
 * HTML mínimo que reproduz os elementos estáticos do index.html.
 * Exportado para que o teste de contrato valide os mesmos seletores.
 */
export const HTML_DOM_TESTE = `
  <header id="header">
    <h1><span class="logo-icon" aria-hidden="true"></span>TODO List</h1>
  </header>

  <form id="todo-form">
    <label for="todo-input" class="sr-only">Nova tarefa</label>
    <input type="text" id="todo-input" maxlength="100" />
    <button type="submit" id="btn-criar"><span class="icone-adicionar" aria-hidden="true"></span>Criar</button>
  </form>

  <main class="tarefas-container">
    <header class="tarefas-header">
      <p id="contador-criadas">0</p>
      <p id="contador-concluidas">0 de 0</p>
    </header>

    <section
      class="tarefas-box"
      id="tarefas-box"
      role="list"
      aria-label="Lista de tarefas"
    ></section>
  </main>
`;

/**
 * Monta no <body> o HTML mínimo esperado pela aplicação.
 * Os seletores precisam corresponder aos de js/constants.js.
 */
export function montarDOMDeTeste() {
  document.body.innerHTML = HTML_DOM_TESTE;
}

/**
 * Cria uma tarefa válida para testes.
 * @param {Partial<{ id: number, atividade: string, completa: boolean }>} [sobrescritas]
 * @returns {{ id: number, atividade: string, completa: boolean }}
 */
export function criarTarefaFixture(sobrescritas = {}) {
  return {
    id: 1,
    atividade: 'Tarefa de teste',
    completa: false,
    ...sobrescritas,
  };
}
