import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  criarElementoTarefa,
  criarEstadoVazio,
  renderizarLista,
  atualizarCheckboxTarefa,
  mostrarMensagem,
  obterContainerTarefas,
} from '../js/dom.js';

// Configura happy-dom com um container para testar renderização
beforeEach(() => {
  document.body.innerHTML = `
    <section class="tarefas-box" id="tarefas-box"></section>
    <main class="tarefas-container"></main>
  `;
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('criarElementoTarefa — Estrutura visual', () => {
  it('deve criar um div com classe tarefa', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Estudar' });
    expect(elemento.tagName).toBe('DIV');
    expect(elemento.classList.contains('tarefa')).toBe(true);
  });

  it('deve conter um checkbox com tipo e id corretos', () => {
    const elemento = criarElementoTarefa({ id: 42, completa: false, atividade: 'Tarefa' });
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(checkbox.id).toBe('tarefa-42');
    expect(checkbox.checked).toBe(false);
  });

  it('deve ter aria-checked no checkbox', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: true, atividade: 'Tarefa' });
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.getAttribute('aria-checked')).toBe('true');

    const elemento2 = criarElementoTarefa({ id: 2, completa: false, atividade: 'Tarefa 2' });
    const checkbox2 = elemento2.querySelector('input[type="checkbox"]');
    expect(checkbox2.getAttribute('aria-checked')).toBe('false');
  });

  it('deve ter aria-label descritivo no checkbox', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Ler livro' });
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.getAttribute('aria-label')).toBe('Marcar "Ler livro" como concluída');
  });

  it('deve conter um span com classe texto-tarefa e o texto da atividade', () => {
    const elemento = criarElementoTarefa({
      id: 1,
      completa: false,
      atividade: 'Estudar JavaScript',
    });
    const span = elemento.querySelector('span.texto-tarefa');
    expect(span).not.toBeNull();
    expect(span.textContent).toBe('Estudar JavaScript');
  });

  it('não deve aplicar classes de estilo ao ícone de exclusão', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Tarefa' });
    const iconeExclusao = elemento.querySelector('.icone-exclusao');
    expect(iconeExclusao).not.toBeNull();
    // O icone-exclusao não deve ter a classe texto-tarefa
    expect(iconeExclusao.classList.contains('texto-tarefa')).toBe(false);
  });

  it('deve conter um botão de remover com classe remove-btn', () => {
    const elemento = criarElementoTarefa({ id: 7, completa: false, atividade: 'Tarefa' });
    const botao = elemento.querySelector('.remove-btn');
    expect(botao).not.toBeNull();
    expect(botao.tagName).toBe('BUTTON');
    expect(botao.type).toBe('button');
    expect(botao.dataset.id).toBe('7');
    expect(botao.getAttribute('title')).toBe('Deletar tarefa');
    expect(botao.getAttribute('aria-label')).toBe('Deletar tarefa: Tarefa');
  });

  it('deve conter um ícone SVG dentro do botão de excluir', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Tarefa' });
    const botao = elemento.querySelector('.remove-btn');
    const svg = botao.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('xmlns')).toContain('w3.org');
    expect(svg.getAttribute('fill')).toBe('currentColor');
  });

  it('deve ter a estrutura correta: checkbox → span → botão', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Tarefa' });
    const children = Array.from(elemento.children);
    expect(children[0].tagName).toBe('INPUT');
    expect(children[0].type).toBe('checkbox');
    expect(children[1].tagName).toBe('SPAN');
    expect(children[1].classList.contains('texto-tarefa')).toBe(true);
    expect(children[2].tagName).toBe('BUTTON');
    expect(children[2].classList.contains('remove-btn')).toBe(true);
  });
});

describe('criarElementoTarefa — Estado concluído vs pendente', () => {
  it('checkbox deve estar marcado quando tarefa está completa', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: true, atividade: 'Feito' });
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  it('checkbox não deve estar marcado quando tarefa está pendente', () => {
    const elemento = criarElementoTarefa({ id: 1, completa: false, atividade: 'Pendente' });
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(false);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });
});

describe('criarEstadoVazio — Estrutura visual', () => {
  it('deve criar um div com classe tarefas-empty', () => {
    const elemento = criarEstadoVazio();
    expect(elemento.tagName).toBe('DIV');
    expect(elemento.className).toBe('tarefas-empty');
  });

  it('deve conter um ícone SVG de lista vazia', () => {
    const elemento = criarEstadoVazio();
    const svg = elemento.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('deve conter texto informativo no span correto (não no container do ícone)', () => {
    const elemento = criarEstadoVazio();
    // O primeiro span é o container do ícone SVG, o segundo span tem o texto
    const spans = elemento.querySelectorAll('span');
    expect(spans.length).toBeGreaterThanOrEqual(2);
    const texto = spans[1];
    expect(texto.textContent).toBe('Você ainda não tem tarefas cadastradas');
    const subtitulo = elemento.querySelector('p');
    expect(subtitulo.textContent).toBe('Crie tarefas e organize seus itens a fazer');
  });
});

describe('atualizarCheckboxTarefa — Atualização visual incremental', () => {
  it('deve atualizar checked e aria-checked do checkbox', () => {
    document.body.innerHTML = `
      <div class="tarefa">
        <input type="checkbox" id="tarefa-99" checked aria-checked="true">
        <span class="texto-tarefa">Tarefa</span>
        <button class="remove-btn" data-id="99">X</button>
      </div>
    `;

    atualizarCheckboxTarefa(99, false);
    const checkbox = document.getElementById('tarefa-99');
    expect(checkbox.checked).toBe(false);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  it('deve definir checked=true quando marcada como completa', () => {
    document.body.innerHTML = `
      <input type="checkbox" id="tarefa-5" aria-checked="false">
    `;
    atualizarCheckboxTarefa(5, true);
    const checkbox = document.getElementById('tarefa-5');
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });
});

describe('mostrarMensagem — Feedback visual', () => {
  it('deve criar uma div com classe mensagem-flash e tipo correto', () => {
    mostrarMensagem('Erro de teste', 'erro');
    const mensagem = document.querySelector('.mensagem-flash');
    expect(mensagem).not.toBeNull();
    expect(mensagem.classList.contains('mensagem-flash--erro')).toBe(true);
    expect(mensagem.textContent).toBe('Erro de teste');
    expect(mensagem.getAttribute('role')).toBe('alert');
    expect(mensagem.getAttribute('aria-live')).toBe('polite');
  });

  it('deve remover mensagem anterior antes de criar nova', () => {
    mostrarMensagem('Primeira', 'erro');
    mostrarMensagem('Segunda', 'sucesso');
    const mensagens = document.querySelectorAll('.mensagem-flash');
    expect(mensagens.length).toBe(1);
    expect(mensagens[0].textContent).toBe('Segunda');
    expect(mensagens[0].classList.contains('mensagem-flash--sucesso')).toBe(true);
  });
});

describe('renderizarLista — Renderização completa no container', () => {
  it('deve renderizar tarefas no container .tarefas-box', () => {
    const container = document.getElementById('tarefas-box');
    renderizarLista([
      { id: 1, completa: false, atividade: 'Tarefa 1' },
      { id: 2, completa: true, atividade: 'Tarefa 2' },
    ]);

    const tarefas = container.querySelectorAll('.tarefa');
    expect(tarefas.length).toBe(2);

    const primeiroCheckbox = tarefas[0].querySelector('input[type="checkbox"]');
    expect(primeiroCheckbox.checked).toBe(false);

    const segundoCheckbox = tarefas[1].querySelector('input[type="checkbox"]');
    expect(segundoCheckbox.checked).toBe(true);
  });

  it('deve mostrar estado vazio quando não há tarefas', () => {
    const container = document.getElementById('tarefas-box');
    renderizarLista([]);
    const estadoVazio = container.querySelector('.tarefas-empty');
    expect(estadoVazio).not.toBeNull();
  });

  it('deve retornar null para container inexistente sem erro', () => {
    // Temporariamente remove o container
    document.getElementById('tarefas-box').remove();
    expect(() => renderizarLista([])).not.toThrow();
  });
});

describe('obterContainerTarefas — Acesso ao container', () => {
  it('deve retornar o container .tarefas-box', () => {
    const container = obterContainerTarefas();
    expect(container).not.toBeNull();
    expect(container.classList.contains('tarefas-box')).toBe(true);
    expect(container.id).toBe('tarefas-box');
  });
});
