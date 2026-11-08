import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { montarDOMDeTeste, criarTarefaFixture } from './helpers/fixtures.js';
import {
  criarElementoTarefa,
  criarEstadoVazio,
  renderizarLista,
  atualizarCheckboxTarefa,
  mostrarMensagem,
  obterContainerTarefas,
  iniciarEdicaoTarefa,
} from '../js/dom.js';
import { CONFIG, CLASSES, MENSAGENS } from '../js/constants.js';

// Monta o DOM mínimo (formulário, contadores e lista) antes de cada teste.
beforeEach(() => {
  montarDOMDeTeste();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('criarElementoTarefa — Estrutura visual', () => {
  it('deve criar um div com classe tarefa', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Estudar' })
    );
    expect(elemento.tagName).toBe('DIV');
    expect(elemento.classList.contains('tarefa')).toBe(true);
  });

  it('deve conter um checkbox do tipo correto e desmarcado', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 42, completa: false, atividade: 'Tarefa' })
    );
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);
  });

  it('checkbox não deve depender de id gerado', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 42, completa: false, atividade: 'Tarefa' })
    );
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.id).toBe('');
  });

  it('deve ter aria-label descritivo no checkbox', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Ler livro' })
    );
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
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Tarefa' })
    );
    const iconeExclusao = elemento.querySelector('.icone-exclusao');
    expect(iconeExclusao).not.toBeNull();
    // O icone-exclusao não deve ter a classe texto-tarefa
    expect(iconeExclusao.classList.contains('texto-tarefa')).toBe(false);
  });

  it('deve conter um botão de remover com classe remove-btn', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 7, completa: false, atividade: 'Tarefa' })
    );
    const botao = elemento.querySelector('.remove-btn');
    expect(botao).not.toBeNull();
    expect(botao.tagName).toBe('BUTTON');
    expect(botao.type).toBe('button');
    expect(botao.dataset.id).toBe('7');
    expect(botao.getAttribute('title')).toBe('Deletar tarefa');
    expect(botao.getAttribute('aria-label')).toBe('Deletar tarefa: Tarefa');
  });

  it('deve conter um ícone SVG dentro do botão de excluir', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Tarefa' })
    );
    const botao = elemento.querySelector('.remove-btn');
    const svg = botao.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('xmlns')).toContain('w3.org');
    expect(svg.getAttribute('fill')).toBe('currentColor');
  });

  it('deve ter a estrutura correta: checkbox → span → botão', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Tarefa' })
    );
    const children = Array.from(elemento.children);
    expect(children[0].tagName).toBe('INPUT');
    expect(children[0].type).toBe('checkbox');
    expect(children[1].tagName).toBe('SPAN');
    expect(children[1].classList.contains('texto-tarefa')).toBe(true);
    expect(children[2].tagName).toBe('BUTTON');
    expect(children[2].classList.contains('remove-btn')).toBe(true);
  });

  it('deve expor data-id e role listitem no elemento raiz', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 7, completa: false, atividade: 'Tarefa' })
    );
    expect(elemento.dataset.id).toBe('7');
    expect(elemento.getAttribute('role')).toBe('listitem');
  });

  it('texto editável deve ser um acionador acessível por teclado', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 7, completa: false, atividade: 'Revisar conteúdo' })
    );
    const texto = elemento.querySelector('.texto-tarefa');

    expect(texto.getAttribute('role')).toBe('button');
    expect(texto.getAttribute('aria-label')).toBe('Editar tarefa: Revisar conteúdo');
    expect(texto.tabIndex).toBe(0);
  });
});

describe('criarElementoTarefa — Estado concluído vs pendente', () => {
  it('checkbox deve estar marcado quando tarefa está completa', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: true, atividade: 'Feito' })
    );
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(true);
  });

  it('checkbox não deve estar marcado quando tarefa está pendente', () => {
    const elemento = criarElementoTarefa(
      criarTarefaFixture({ id: 1, completa: false, atividade: 'Pendente' })
    );
    const checkbox = elemento.querySelector('input[type="checkbox"]');
    expect(checkbox.checked).toBe(false);
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
  it('deve atualizar a propriedade checked do checkbox', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    atualizarCheckboxTarefa(checkbox, false);

    expect(checkbox.checked).toBe(false);
  });

  it('deve definir checked=true quando marcada como completa', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    atualizarCheckboxTarefa(checkbox, true);

    expect(checkbox.checked).toBe(true);
  });

  it('não deve quebrar quando o checkbox não existe', () => {
    expect(() => atualizarCheckboxTarefa(null, true)).not.toThrow();
  });
});

describe('iniciarEdicaoTarefa — Ciclo de edição e temporizadores', () => {
  function montarTarefa(texto, id = 1) {
    const raiz = criarElementoTarefa(criarTarefaFixture({ id, atividade: texto }));
    obterContainerTarefas().append(raiz);
    return { raiz, texto: raiz.querySelector('.texto-tarefa') };
  }

  function pressionar(campo, tecla) {
    campo.dispatchEvent(new KeyboardEvent('keydown', { key: tecla, bubbles: true }));
  }

  it('cria campo acessível com o limite e foco inicial', () => {
    const { texto } = montarTarefa('Texto original');
    iniciarEdicaoTarefa(texto);

    const campo = document.querySelector('.campo-edicao');
    expect(campo.getAttribute('aria-label')).toBe('Editar tarefa');
    expect(campo.maxLength).toBe(CONFIG.MAX_CARACTERES_TAREFA);
    expect(document.activeElement).toBe(campo);
    pressionar(campo, 'Escape');
  });

  it('salva no blur somente depois do atraso configurado', () => {
    vi.useFakeTimers();
    const { raiz, texto } = montarTarefa('Original');
    const onSalvar = vi.fn();
    const onCancelar = vi.fn();
    iniciarEdicaoTarefa(texto, onSalvar, onCancelar);
    const campo = raiz.querySelector('.campo-edicao');
    campo.value = 'Editada no blur';
    campo.dispatchEvent(new Event('blur'));

    vi.advanceTimersByTime(CONFIG.DELAY_SALVAR_BLUR - 1);
    expect(onSalvar).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    expect(onSalvar).toHaveBeenCalledExactlyOnceWith('Editada no blur');
    expect(onCancelar).not.toHaveBeenCalled();
    expect(raiz.querySelector('.campo-edicao')).toBeNull();
    expect(raiz.classList.contains(CLASSES.tarefaEditando)).toBe(false);
  });

  it('cancela o temporizador do blur quando Escape é pressionado', () => {
    vi.useFakeTimers();
    const { raiz, texto } = montarTarefa('Original');
    const onSalvar = vi.fn();
    const onCancelar = vi.fn();
    iniciarEdicaoTarefa(texto, onSalvar, onCancelar);
    const campo = raiz.querySelector('.campo-edicao');
    campo.value = 'Não salvar';
    campo.dispatchEvent(new Event('blur'));
    pressionar(campo, 'Escape');
    vi.advanceTimersByTime(CONFIG.DELAY_SALVAR_BLUR + 1);

    expect(onSalvar).not.toHaveBeenCalled();
    expect(onCancelar).toHaveBeenCalledOnce();
    expect(texto.textContent).toBe('Original');
    expect(raiz.querySelector('.campo-edicao')).toBeNull();
  });

  it('fecha sem salvar quando o texto fica vazio ou inalterado', () => {
    for (const valor of ['', 'Original']) {
      const { raiz, texto } = montarTarefa('Original', valor === '' ? 1 : 2);
      const onSalvar = vi.fn();
      const onCancelar = vi.fn();
      iniciarEdicaoTarefa(texto, onSalvar, onCancelar);
      const campo = raiz.querySelector('.campo-edicao');
      campo.value = valor;
      pressionar(campo, 'Enter');

      expect(onSalvar).not.toHaveBeenCalled();
      expect(onCancelar).toHaveBeenCalledOnce();
      expect(texto.textContent).toBe('Original');
      expect(raiz.querySelector('.campo-edicao')).toBeNull();
    }

    expect(document.querySelector('.mensagem-flash')).toBeNull();
  });

  it('informa edição acima do limite e preserva o texto anterior', () => {
    const { raiz, texto } = montarTarefa('Original');
    const onSalvar = vi.fn();
    iniciarEdicaoTarefa(texto, onSalvar);
    const campo = raiz.querySelector('.campo-edicao');
    campo.value = 'x'.repeat(CONFIG.MAX_CARACTERES_TAREFA + 1);
    pressionar(campo, 'Enter');

    expect(onSalvar).not.toHaveBeenCalled();
    expect(texto.textContent).toBe('Original');
    expect(document.querySelector('.mensagem-flash').textContent).toBe(MENSAGENS.textoMuitoLongo);
    expect(raiz.querySelector('.campo-edicao')).toBeNull();
  });

  it('cancela a edição anterior ao abrir outra tarefa', () => {
    const primeira = montarTarefa('Primeira', 1);
    const segunda = montarTarefa('Segunda', 2);
    const cancelarPrimeira = vi.fn();
    iniciarEdicaoTarefa(primeira.texto, undefined, cancelarPrimeira);
    iniciarEdicaoTarefa(segunda.texto);

    expect(cancelarPrimeira).toHaveBeenCalledOnce();
    expect(primeira.raiz.classList.contains(CLASSES.tarefaEditando)).toBe(false);
    expect(primeira.raiz.querySelector('.campo-edicao')).toBeNull();
    expect(segunda.raiz.classList.contains(CLASSES.tarefaEditando)).toBe(true);
    expect(document.querySelectorAll('.campo-edicao')).toHaveLength(1);
    pressionar(segunda.raiz.querySelector('.campo-edicao'), 'Escape');
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
      criarTarefaFixture({ id: 1, atividade: 'Tarefa 1' }),
      criarTarefaFixture({ id: 2, completa: true, atividade: 'Tarefa 2' }),
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
