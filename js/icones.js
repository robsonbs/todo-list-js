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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"></circle>
      <line x1="128" y1="80" x2="128" y2="176" stroke="currentColor" stroke-linecap="round" stroke-width="16"></line>
      <line x1="80" y1="128" x2="176" y2="128" stroke="currentColor" stroke-linecap="round" stroke-width="16"></line>
    </svg>`;
}

/** Ícone de lápis usado para editar uma tarefa. @returns {string} */
export function obterIconeEditar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M216 56 200 40a16 16 0 0 0-23 0L56 161l-16 55 55-16L216 79a16 16 0 0 0 0-23Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
      <line x1="160" y1="56" x2="200" y2="96" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
    </svg>`;
}

/** Ícone de confirmação usado para salvar ou adicionar uma tarefa. @returns {string} */
export function obterIconeSalvar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="m48 136 48 48L208 72" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/** Ícone de cancelamento usado nos formulários de tarefa. @returns {string} */
export function obterIconeCancelar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <line x1="192" y1="64" x2="64" y2="192" stroke="currentColor" stroke-linecap="round" stroke-width="16"></line>
      <line x1="64" y1="64" x2="192" y2="192" stroke="currentColor" stroke-linecap="round" stroke-width="16"></line>
    </svg>`;
}

/** Ícone para abrir as opções de reordenação. @returns {string} */
export function obterIconeReordenar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M128 208V48m-48 48 48-48 48 48m-96 64 48 48 48-48" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/** Ícone para mover uma tarefa para cima. @returns {string} */
export function obterIconeMoverCima() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M128 208V48m-48 48 48-48 48 48" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/** Ícone para mover uma tarefa para baixo. @returns {string} */
export function obterIconeMoverBaixo() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M128 48v160m-48-48 48 48 48-48" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/** Ícone para indentar sob o irmão anterior. @returns {string} */
export function obterIconeIndentar() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M32 56h192M32 200h192M32 128h128m-56-56 56 56-56 56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/** Ícone para promover uma subtarefa ao nível do pai. @returns {string} */
export function obterIconePromover() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 256 256">
      <path d="M32 56h192M32 200h192M224 128H96m56-56-56 56 56 56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}
