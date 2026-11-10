import { beforeEach, describe, expect, it } from 'vitest';
import { abrirFormularioItem, renderizarLista } from '../../js/hierarquia/dom.js';

beforeEach(() => {
  document.body.innerHTML =
    '<span class="logo-icon"></span><button id="btn-criar" aria-label="Criar tarefa principal"><span class="icone-adicionar" aria-hidden="true"></span>Criar</button><div id="lista-hierarquica"></div>';
});

describe('DOM da lista hierárquica', () => {
  it('renderiza listas aninhadas com nomes e níveis acessíveis', () => {
    renderizarLista([
      {
        id: 1,
        atividade: 'Projeto',
        completa: false,
        parcial: false,
        filhos: [
          {
            id: 2,
            atividade: 'Etapa',
            completa: false,
            parcial: false,
            filhos: [{ id: 3, atividade: 'Detalhe', completa: false, parcial: false, filhos: [] }],
          },
        ],
      },
    ]);

    expect(document.querySelectorAll('#lista-hierarquica li')).toHaveLength(3);
    expect(document.querySelectorAll('#lista-hierarquica ul ul')).toHaveLength(2);
    expect(document.querySelector('[data-id="3"]').dataset.nivel).toBe('3');
    expect(document.querySelector('ul[aria-label="Subtarefas de: Projeto"]')).not.toBeNull();
    const botaoSubtarefa = document.querySelector('.botao-subtarefa');
    const botaoEditar = document.querySelector('.botao-editar-tarefa');
    const botaoRemover = document.querySelector('.remove-btn');
    expect(botaoSubtarefa.querySelector('.icone-adicionar svg')).not.toBeNull();
    expect(botaoSubtarefa.textContent.trim()).toBe('');
    expect(botaoSubtarefa.getAttribute('aria-label')).toBe('Adicionar subtarefa a: Projeto');
    expect(botaoEditar.querySelector('.icone-editar svg')).not.toBeNull();
    expect(botaoEditar.textContent.trim()).toBe('');
    expect(botaoEditar.getAttribute('aria-label')).toBe('Editar tarefa: Projeto');
    expect(botaoRemover.querySelector('.icone-exclusao svg')).not.toBeNull();
    expect(botaoRemover.textContent.trim()).toBe('');
    expect(botaoRemover.getAttribute('aria-label')).toBe('Remover tarefa: Projeto');
    expect(document.querySelector('.logo-icon svg')).not.toBeNull();
    expect(document.querySelector('#btn-criar .icone-adicionar svg')).not.toBeNull();
    const viewBoxes = new Set(
      [...document.querySelectorAll('svg')].map((svg) => svg.getAttribute('viewBox'))
    );
    expect(viewBoxes).toEqual(new Set(['0 0 256 256']));
    expect(document.querySelector('#btn-criar').textContent.trim()).toBe('Criar');
    expect(document.querySelector('#btn-criar').getAttribute('aria-label')).toBe(
      'Criar tarefa principal'
    );
    const botoesDeMovimento = [...document.querySelectorAll('[data-movimento]')];
    expect(botoesDeMovimento).toHaveLength(12);
    expect(botoesDeMovimento.every((botao) => botao.hasAttribute('aria-label'))).toBe(true);
    expect(botoesDeMovimento.filter((botao) => botao.disabled)).toHaveLength(10);
    expect(
      document.querySelector(
        '[data-acao="adicionar-filho"][aria-label="Adicionar subtarefa a: Detalhe"]'
      )
    ).toBeNull();

    const reordenacao = document.querySelector('[data-id="3"] .tarefa-hierarquica__reordenacao');
    const botaoAbrir = reordenacao.querySelector('.botao-abrir-reordenacao');
    expect(botaoAbrir.getAttribute('aria-label')).toBe('Reordenar tarefa: Detalhe');
    expect(botaoAbrir.getAttribute('aria-expanded')).toBe('false');
    expect(reordenacao.querySelector('.acoes-reordenacao').hidden).toBe(true);
    expect(reordenacao.querySelector('[data-movimento="indentar"]').disabled).toBe(true);
    expect(reordenacao.querySelector('[data-movimento="promover"]').disabled).toBe(false);
  });

  it('apresenta pai parcial e impede alternar manualmente uma tarefa com filhos', () => {
    renderizarLista([
      {
        id: 1,
        atividade: 'Projeto',
        completa: false,
        parcial: true,
        filhos: [{ id: 2, atividade: 'Etapa', completa: true, parcial: false, filhos: [] }],
      },
    ]);

    const checkboxPai = document.querySelector('[data-id="1"] input[type="checkbox"]');
    expect(checkboxPai.indeterminate).toBe(true);
    expect(checkboxPai.disabled).toBe(true);
  });

  it('usa botões gráficos com nomes acessíveis para salvar e cancelar', () => {
    const tarefa = { id: 1, atividade: 'Projeto', filhos: [] };
    renderizarLista([{ ...tarefa, completa: false, parcial: false }]);
    const item = document.querySelector('[data-id="1"]');

    abrirFormularioItem(item, 'adicionar', tarefa);
    let formulario = item.querySelector('form');
    let salvar = formulario.querySelector('button[type="submit"]');
    let cancelar = formulario.querySelector('[data-acao="cancelar-formulario"]');

    expect(salvar.textContent.trim()).toBe('');
    expect(salvar.querySelector('.icone-salvar svg')).not.toBeNull();
    expect(salvar.getAttribute('aria-label')).toBe('Adicionar subtarefa de: Projeto');
    expect(cancelar.textContent.trim()).toBe('');
    expect(cancelar.querySelector('.icone-cancelar svg')).not.toBeNull();
    expect(cancelar.getAttribute('aria-label')).toBe('Cancelar adição de subtarefa de: Projeto');

    abrirFormularioItem(item, 'editar', tarefa);
    formulario = item.querySelector('form');
    salvar = formulario.querySelector('button[type="submit"]');
    cancelar = formulario.querySelector('[data-acao="cancelar-formulario"]');
    expect(salvar.getAttribute('aria-label')).toBe('Salvar edição de: Projeto');
    expect(cancelar.getAttribute('aria-label')).toBe('Cancelar edição de: Projeto');
  });

  it('insere o texto como texto e não como HTML executável', () => {
    renderizarLista([
      {
        id: 1,
        atividade: '<img src=x onerror=alert(1)>',
        completa: false,
        parcial: false,
        filhos: [],
      },
    ]);

    expect(document.querySelector('#lista-hierarquica img')).toBeNull();
    expect(document.querySelector('.texto-tarefa').textContent).toBe(
      '<img src=x onerror=alert(1)>'
    );
  });

  it('mostra uma orientação quando não há tarefas', () => {
    renderizarLista([]);
    expect(document.querySelector('#lista-hierarquica .tarefas-empty').textContent).toContain(
      'Crie uma tarefa principal'
    );
    expect(document.querySelector('.tarefas-empty__icone svg')).not.toBeNull();
  });
});
