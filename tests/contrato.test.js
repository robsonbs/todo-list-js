// ============================================================
// CONTRATO.TEST.JS — O "combinado" entre HTML, constantes e CSS
// ------------------------------------------------------------
// Estes testes não verificam comportamento: eles evitam que os
// nomes usados em um arquivo fiquem diferentes dos usados em outro.
// Se um seletor mudar no index.html, o teste aponta exatamente qual.
// ============================================================

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { CONFIG, CLASSES, SELETORES_ESTATICOS } from '../js/constants.js';
import {
  CLASSES as CLASSES_HIERARQUIA,
  CONFIG as CONFIG_HIERARQUIA,
  CHAVE_ARMAZENAMENTO as CHAVE_HIERARQUIA,
} from '../js/hierarquia/constants.js';
import { HTML_DOM_TESTE } from './helpers/fixtures.js';

// O Vitest roda a partir da raiz do projeto.
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
const css = readFileSync(resolve(process.cwd(), 'style.css'), 'utf8');
const htmlHierarquico = readFileSync(resolve(process.cwd(), 'lista-hierarquica.html'), 'utf8');
const cssHierarquico = readFileSync(resolve(process.cwd(), 'style-hierarquia.css'), 'utf8');

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

  it('mantém os espaços SVG do cabeçalho e do botão principal', () => {
    expect(pagina.querySelector('#header .logo-icon')).not.toBeNull();
    expect(pagina.querySelector('#btn-criar .icone-adicionar')).not.toBeNull();
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

describe('contrato — fonte local e carregamento', () => {
  const pagina = analisarHTML(html);

  it('não depende de fontes externas (Google Fonts)', () => {
    expect(html).not.toContain('fonts.googleapis.com');
    expect(html).not.toContain('fonts.gstatic.com');
  });

  it('pré-carrega a fonte Inter local com crossorigin', () => {
    const preload = pagina.querySelector('link[rel="preload"][as="font"]');
    expect(preload).not.toBeNull();
    expect(preload.getAttribute('href')).toBe('assets/fonts/inter-latin.woff2');
    expect(preload.hasAttribute('crossorigin')).toBe(true);
  });

  it('o arquivo da fonte existe no projeto', () => {
    const caminho = resolve(process.cwd(), 'assets/fonts/inter-latin.woff2');
    expect(existsSync(caminho), caminho).toBe(true);
  });

  it('o style.css declara o @font-face local com font-display: swap', () => {
    expect(css).toContain('@font-face');
    expect(css).toContain('assets/fonts/inter-latin.woff2');
    expect(css).toContain('font-display: swap');
  });
});

describe('contrato — variante hierárquica', () => {
  const pagina = analisarHTML(htmlHierarquico);

  it('tem os elementos necessários para formulário, lista e contadores', () => {
    expect(pagina.querySelector('#todo-form')).not.toBeNull();
    expect(pagina.querySelector('#todo-input')).not.toBeNull();
    expect(pagina.querySelector('#lista-hierarquica')).not.toBeNull();
    expect(pagina.querySelector('#contador-criadas')).not.toBeNull();
    expect(pagina.querySelector('#contador-concluidas')).not.toBeNull();
    expect(pagina.querySelector('#header .logo-icon')).not.toBeNull();
    expect(pagina.querySelector('#btn-criar .icone-adicionar')).not.toBeNull();
  });

  it('mantém o limite do campo sincronizado e limita a árvore a três níveis', () => {
    expect(pagina.querySelector('#todo-input').getAttribute('maxlength')).toBe(
      String(CONFIG_HIERARQUIA.MAX_CARACTERES_TAREFA)
    );
    expect(CONFIG_HIERARQUIA.MAX_NIVEIS).toBe(3);
  });

  it('usa um armazenamento separado da lista simples', () => {
    expect(CHAVE_HIERARQUIA).not.toBe('tarefas');
  });

  it('todas as classes dinâmicas da árvore têm estilos', () => {
    for (const [nome, classe] of Object.entries(CLASSES_HIERARQUIA)) {
      expect(`${css}\n${cssHierarquico}`, `classe hierárquica "${nome}" (.${classe})`).toContain(
        `.${classe}`
      );
    }
  });
});
