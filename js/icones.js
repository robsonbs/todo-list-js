// ============================================================
// ICONES.JS — Ícones SVG usados na interface
// ------------------------------------------------------------
// Responsabilidade: guardar o markup estático dos ícones.
// NÃO faz: não toca no DOM e não conhece estado.
// Conceitos ensinados: separar "conteúdo fixo" de lógica e por que
// innerHTML é seguro quando o conteúdo é nosso (e não do usuário).
// ============================================================

/**
 * Ícone de lixeira do botão de exclusão.
 * É conteúdo estático (sem dados do usuário), então o uso de
 * innerHTML é seguro neste caso.
 * @returns {string}
 */
export function obterIconeLixeira() {
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
 * Ícone exibido quando a lista está vazia.
 * Também é conteúdo estático.
 * @returns {string}
 */
export function obterIconeListaVazia() {
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
 * Ícone de adição usado nos controles da variante hierárquica.
 * É SVG estático, sem conteúdo fornecido pelo usuário.
 * @returns {string}
 */
export function obterIconeAdicionar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle>
      <path d="M12 7v10M7 12h10" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
    </svg>`;
}

/** Ícone de lápis usado para editar uma tarefa. @returns {string} */
export function obterIconeEditar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="m15 5 4 4M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    </svg>`;
}

/** Ícone de confirmação usado para salvar ou adicionar uma tarefa. @returns {string} */
export function obterIconeSalvar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    </svg>`;
}

/** Ícone de cancelamento usado nos formulários de tarefa. @returns {string} */
export function obterIconeCancelar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
    </svg>`;
}
