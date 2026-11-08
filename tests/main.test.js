// ============================================================
// MAIN.TEST.JS — Testes de orquestração
// ------------------------------------------------------------
// Aqui testamos a aplicação "de ponta a ponta" no DOM: o mesmo
// fluxo que o usuário executa (enviar formulário, marcar, remover
// e editar). Os módulos são recarregados a cada teste para simular
// uma nova visita à página.
// ============================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { criarTarefaFixture } from './helpers/fixtures.js';
import { iniciarAplicacao, enviarFormulario, clicar, obterTarefaUI } from './helpers/aplicacao.js';
import { CHAVE_ARMAZENAMENTO, MENSAGENS } from '../js/constants.js';

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('main.js — Inicialização', () => {
  it('deve exibir o estado vazio quando não há tarefas salvas', async () => {
    const state = await iniciarAplicacao();

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.tarefas-empty')).not.toBeNull();
    expect(document.getElementById('contador-criadas').textContent).toBe('0');
    expect(document.getElementById('contador-concluidas').textContent).toBe('0 de 0');
  });

  it('deve carregar tarefas salvas e normalizar dados inválidos', async () => {
    const state = await iniciarAplicacao({
      tarefasSalvas: [
        criarTarefaFixture({ id: 5, atividade: 'Salva', completa: true }),
        { id: 'inválido', atividade: 'Descartar', completa: false },
      ],
    });

    expect(state.obterTarefas()).toHaveLength(1);
    expect(document.querySelectorAll('.tarefa')).toHaveLength(1);
    expect(document.getElementById('contador-concluidas').textContent).toBe('1 de 1');
  });

  it('deve ignorar localStorage corrompido sem quebrar a aplicação', async () => {
    const state = await iniciarAplicacao({ dadosBrutos: '{isto não é json' });

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.tarefas-empty')).not.toBeNull();
  });

  it('deve iniciar em estado vazio quando getItem lança erro', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(localStorage, 'getItem').mockImplementationOnce(() => {
      throw new Error('Acesso bloqueado');
    });

    const state = await iniciarAplicacao();

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.tarefas-empty')).not.toBeNull();
    expect(console.error).toHaveBeenCalledOnce();
  });
});

describe('main.js — Criação de tarefas', () => {
  it('deve adicionar, renderizar, contar e salvar ao enviar o formulário', async () => {
    const state = await iniciarAplicacao();

    enviarFormulario('Estudar JavaScript');

    expect(state.obterTarefas()).toHaveLength(1);
    expect(state.obterTarefas()[0].atividade).toBe('Estudar JavaScript');

    expect(document.querySelectorAll('.tarefa')).toHaveLength(1);
    expect(document.querySelector('.texto-tarefa').textContent).toBe('Estudar JavaScript');

    expect(document.getElementById('contador-criadas').textContent).toBe('1');
    expect(document.getElementById('contador-concluidas').textContent).toBe('0 de 1');

    const dadosSalvos = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO));
    expect(dadosSalvos).toHaveLength(1);
  });

  it('deve limpar o campo após adicionar', async () => {
    await iniciarAplicacao();

    enviarFormulario('Tarefa');

    expect(document.getElementById('todo-input').value).toBe('');
  });

  it('deve avisar e não adicionar quando o campo está vazio', async () => {
    const state = await iniciarAplicacao();

    enviarFormulario('   ');

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.textoVazio);
  });

  it('deve avisar e não adicionar quando o texto excede o limite', async () => {
    const state = await iniciarAplicacao();

    enviarFormulario('a'.repeat(101));

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.textoMuitoLongo);
  });

  it('deve avisar quando o localStorage não consegue salvar', async () => {
    const state = await iniciarAplicacao();

    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Uma única falha simulada: depois dela, o localStorage volta ao
    // normal (evita que o mock vaze para os próximos testes).
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Quota excedida');
    });

    enviarFormulario('Tarefa');

    // A tarefa continua em memória, mas o usuário é avisado da falha.
    expect(state.obterTarefas()).toHaveLength(1);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.erroAoSalvar);
  });
});

describe('main.js — Conclusão de tarefas', () => {
  it('deve alternar a conclusão ao clicar no checkbox e atualizar os contadores', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Tarefa');

    const { checkbox } = obterTarefaUI();
    clicar(checkbox);

    expect(state.obterTarefas()[0].completa).toBe(true);
    expect(document.getElementById('contador-concluidas').textContent).toBe('1 de 1');
    expect(JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO))[0].completa).toBe(true);

    // Clicar de novo desmarca.
    clicar(checkbox);

    expect(state.obterTarefas()[0].completa).toBe(false);
    expect(document.getElementById('contador-concluidas').textContent).toBe('0 de 1');
  });

  it('deve atualizar a conclusão sem recriar o elemento da tarefa', async () => {
    await iniciarAplicacao();
    enviarFormulario('Tarefa');

    const { raiz, checkbox } = obterTarefaUI();
    clicar(checkbox);

    // Atualização incremental: o mesmo nó continua no DOM.
    expect(obterTarefaUI().raiz).toBe(raiz);
  });

  it('deve avisar se falhar ao persistir a conclusão', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Tarefa');
    const dadosAntes = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Quota excedida');
    });

    clicar(obterTarefaUI().checkbox);

    expect(state.obterTarefas()[0].completa).toBe(true);
    expect(obterTarefaUI().checkbox.checked).toBe(true);
    expect(localStorage.getItem(CHAVE_ARMAZENAMENTO)).toBe(dadosAntes);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.erroAoSalvar);
  });
});

describe('main.js — Remoção de tarefas', () => {
  it('deve remover ao clicar no ícone SVG dentro do botão', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Remover');

    const { botaoRemover } = obterTarefaUI();
    const icone = botaoRemover.querySelector('svg');
    clicar(icone);

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelectorAll('.tarefa')).toHaveLength(0);
    expect(document.querySelector('.tarefas-empty')).not.toBeNull();
    expect(document.getElementById('contador-criadas').textContent).toBe('0');
    expect(JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO))).toHaveLength(0);
  });

  it('deve avisar se falhar ao persistir uma remoção', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Remover sem persistir');
    const dadosAntes = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Quota excedida');
    });

    clicar(obterTarefaUI().botaoRemover);

    expect(state.obterTarefas()).toHaveLength(0);
    expect(document.querySelector('.tarefas-empty')).not.toBeNull();
    expect(localStorage.getItem(CHAVE_ARMAZENAMENTO)).toBe(dadosAntes);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.erroAoSalvar);
  });
});

describe('main.js — Edição de tarefas', () => {
  /**
   * Abre a edição com duplo clique no texto.
   * @returns {HTMLInputElement} O campo de edição criado
   */
  function abrirEdicao() {
    const { texto } = obterTarefaUI();
    texto.dispatchEvent(new Event('dblclick', { bubbles: true }));
    return document.querySelector('.campo-edicao');
  }

  it.each(['Enter', ' '])('deve iniciar edição por teclado com %s', async (tecla) => {
    await iniciarAplicacao();
    enviarFormulario('Editar por teclado');
    const { texto } = obterTarefaUI();
    texto.dispatchEvent(new KeyboardEvent('keydown', { key: tecla, bubbles: true }));

    const campo = document.querySelector('.campo-edicao');
    expect(campo).not.toBeNull();
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  });

  it('deve salvar a edição ao pressionar Enter', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Texto original');

    const campo = abrirEdicao();
    expect(campo).not.toBeNull();

    campo.value = 'Texto editado';
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(state.obterTarefas()[0].atividade).toBe('Texto editado');
    expect(document.querySelector('.texto-tarefa').textContent).toBe('Texto editado');
    expect(document.querySelector('.campo-edicao')).toBeNull();
  });

  it('deve cancelar a edição ao pressionar Escape', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Texto original');

    const campo = abrirEdicao();
    campo.value = 'Não deve salvar';
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(state.obterTarefas()[0].atividade).toBe('Texto original');
    expect(document.querySelector('.texto-tarefa').textContent).toBe('Texto original');
    expect(document.querySelector('.campo-edicao')).toBeNull();
  });

  it('deve preservar o texto e não persistir uma edição sem alterações', async () => {
    await iniciarAplicacao();
    enviarFormulario('Sem mudanças');
    const dadosAntes = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    const campo = abrirEdicao();
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(document.querySelector('.texto-tarefa').textContent).toBe('Sem mudanças');
    expect(localStorage.getItem(CHAVE_ARMAZENAMENTO)).toBe(dadosAntes);
    expect(document.querySelector('.mensagem-flash')).toBeNull();
  });

  it('deve avisar e preservar a tarefa quando a edição excede o limite', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Original');
    const campo = abrirEdicao();
    campo.value = 'x'.repeat(101);
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(state.obterTarefas()[0].atividade).toBe('Original');
    expect(document.querySelector('.texto-tarefa').textContent).toBe('Original');
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.textoMuitoLongo);
  });

  it('deve avisar se falhar ao persistir uma edição válida', async () => {
    const state = await iniciarAplicacao();
    enviarFormulario('Original');
    const dadosAntes = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Quota excedida');
    });
    const campo = abrirEdicao();
    campo.value = 'Editada';
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(state.obterTarefas()[0].atividade).toBe('Editada');
    expect(document.querySelector('.texto-tarefa').textContent).toBe('Editada');
    expect(localStorage.getItem(CHAVE_ARMAZENAMENTO)).toBe(dadosAntes);
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.erroAoSalvar);
  });
});
