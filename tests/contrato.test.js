// ============================================================
// CONTRATO.TEST.JS — O "combinado" entre HTML, constantes e CSS
// ------------------------------------------------------------
// Estes testes não verificam comportamento: eles evitam que os
// nomes usados em um arquivo fiquem diferentes dos usados em outro.
// Se um seletor mudar no index.html, o teste aponta exatamente qual.
// ============================================================

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { CONFIG, CLASSES, SELETORES_ESTATICOS } from '../js/constants.js';
import { HTML_DOM_TESTE } from './helpers/fixtures.js';

// O Vitest roda a partir da raiz do projeto.
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
const css = readFileSync(resolve(process.cwd(), 'style.css'), 'utf8');

/**
 * Converte um texto HTML em uma árvore consultável.
 * Usamos <template> porque o conteúdo dele é inerte: os scripts do
 * HTML não são executados (diferente de inserir direto no <body>).
 * @param {string} texto
 * @returns {DocumentFragment}
 */
function analisarHTML(texto) {
  const template = document.createElement('template');
  template.innerHTML = texto;
  return template.content;
}

describe('contrato — index.html e constants.js', () => {
  const pagina = analisarHTML(html);

  it('todo seletor estático existe no index.html', () => {
    for (const [nome, seletor] of Object.entries(SELETORES_ESTATICOS)) {
      expect(pagina.querySelector(seletor), `${nome} (${seletor})`).not.toBeNull();
    }
  });

  it('o DOM dos testes replica todos os seletores estáticos', () => {
    const fixture = analisarHTML(HTML_DOM_TESTE);

    for (const [nome, seletor] of Object.entries(SELETORES_ESTATICOS)) {
      expect(fixture.querySelector(seletor), `${nome} (${seletor})`).not.toBeNull();
    }
  });

  it('o maxlength do HTML acompanha CONFIG.MAX_CARACTERES_TAREFA', () => {
    const campo = pagina.querySelector('#todo-input');
    expect(campo.getAttribute('maxlength')).toBe(String(CONFIG.MAX_CARACTERES_TAREFA));
  });
});

describe('contrato — classes do JavaScript e style.css', () => {
  it('toda classe criada pelo JS tem uma regra no CSS', () => {
    for (const [nome, classe] of Object.entries(CLASSES)) {
      expect(css, `classe "${nome}" (.${classe})`).toContain(`.${classe}`);
    }
  });
});
