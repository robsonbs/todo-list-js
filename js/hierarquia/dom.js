// ============================================================
// DOM.JS — Apresentação da árvore de tarefas
// ------------------------------------------------------------
// Cria listas recursivas e formulários locais. Não guarda estado
// nem acessa o localStorage.
// ============================================================

import { CONFIG, CLASSES, MENSAGENS, SELETORES } from './constants.js';
import {
  obterIconeAdicionar,
  obterIconeCancelar,
  obterIconeEditar,
  obterIconeIndentar,
  obterIconeListaVazia,
  obterIconeLixeira,
  obterIconeMoverBaixo,
  obterIconeMoverCima,
  obterIconePromover,
  obterIconeReordenar,
  obterIconeSalvar,
} from '../icones.js';

const selecionar = (seletor, raiz = document) => raiz.querySelector(seletor);
let temporizadorMensagem = null;

function criarBotao(classe, classeIcone, svg, acao, rotulo) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = classe;
  botao.dataset.acao = acao;
  botao.setAttribute('aria-label', rotulo);
  botao.title = rotulo;
  botao.append(criarIcone(classeIcone, svg));
  return botao;
}

function criarIcone(classe, svg) {
  const icone = document.createElement('span');
  icone.className = classe;
  icone.setAttribute('aria-hidden', 'true');
  // Estes SVGs são constantes do projeto, nunca texto digitado pelo usuário.
  icone.innerHTML = svg;
  return icone;
}

function criarBotaoMovimento(movimento, svg, rotulo, desabilitado) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = CLASSES.botaoMover;
  botao.dataset.movimento = movimento;
  botao.disabled = desabilitado;
  botao.setAttribute('aria-label', rotulo);
  botao.title = rotulo;
  botao.append(criarIcone(CLASSES.iconeMovimento, svg));
  return botao;
}

function obterAlturaDaSubarvore(tarefa) {
  if (tarefa.filhos.length === 0) {
    return 1;
  }
  return 1 + Math.max(...tarefa.filhos.map(obterAlturaDaSubarvore));
}

function criarFormularioItem(tipo, tarefa) {
  const formulario = document.createElement('form');
  formulario.className = CLASSES.formularioItem;
  formulario.dataset.formulario = tipo;
  formulario.dataset.id = String(tarefa.id);

  const campo = document.createElement('input');
  campo.type = 'text';
  campo.name = 'atividade';
  campo.className = CLASSES.campoFormulario;
  campo.maxLength = CONFIG.MAX_CARACTERES_TAREFA;
  campo.autocomplete = 'off';

  if (tipo === 'editar') {
    campo.value = tarefa.atividade;
    campo.setAttribute('aria-label', `Editar tarefa: ${tarefa.atividade}`);
  } else {
    campo.setAttribute('aria-label', `Nova subtarefa de: ${tarefa.atividade}`);
    campo.placeholder = 'Nome da subtarefa';
  }

  const acoes = document.createElement('div');
  acoes.className = CLASSES.acoesFormulario;

  const salvar = document.createElement('button');
  salvar.type = 'submit';
  const rotuloSalvar =
    tipo === 'editar'
      ? `Salvar edição de: ${tarefa.atividade}`
      : `Adicionar subtarefa de: ${tarefa.atividade}`;
  salvar.setAttribute('aria-label', rotuloSalvar);
  salvar.title = rotuloSalvar;
  salvar.append(criarIcone(CLASSES.iconeSalvar, obterIconeSalvar()));

  const cancelar = document.createElement('button');
  cancelar.type = 'button';
  cancelar.dataset.acao = 'cancelar-formulario';
  const rotuloCancelar =
    tipo === 'editar'
      ? `Cancelar edição de: ${tarefa.atividade}`
      : `Cancelar adição de subtarefa de: ${tarefa.atividade}`;
  cancelar.setAttribute('aria-label', rotuloCancelar);
  cancelar.title = rotuloCancelar;
  cancelar.append(criarIcone(CLASSES.iconeCancelar, obterIconeCancelar()));

  acoes.append(salvar, cancelar);
  formulario.append(campo, acoes);
  return formulario;
}

function criarItem(tarefa, nivel, indice, quantidadeIrmaos) {
  const item = document.createElement('li');
  item.className = `${CLASSES.tarefa} ${CLASSES.tarefaHierarquica}`;
  item.dataset.id = String(tarefa.id);
  item.dataset.nivel = String(nivel);

  const linha = document.createElement('div');
  linha.className = CLASSES.linha;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = tarefa.completa;
  checkbox.indeterminate = tarefa.parcial;
  checkbox.disabled = tarefa.filhos.length > 0;
  checkbox.setAttribute(
    'aria-label',
    tarefa.filhos.length > 0
      ? `Conclusão automática de: ${tarefa.atividade}`
      : `Marcar como concluída: ${tarefa.atividade}`
  );

  const texto = document.createElement('span');
  texto.className = CLASSES.texto;
  texto.textContent = tarefa.atividade;
  texto.setAttribute('role', 'button');
  texto.setAttribute('aria-label', `Editar pelo teclado: ${tarefa.atividade}`);
  texto.tabIndex = 0;

  const acoes = document.createElement('div');
  acoes.className = CLASSES.acoes;
  linha.append(checkbox, texto, acoes);

  if (nivel < CONFIG.MAX_NIVEIS) {
    acoes.append(
      criarBotao(
        CLASSES.botaoAdicionarFilho,
        CLASSES.iconeAdicionar,
        obterIconeAdicionar(),
        'adicionar-filho',
        `Adicionar subtarefa a: ${tarefa.atividade}`
      )
    );
  }

  acoes.append(
    criarBotao(
      CLASSES.botaoEditar,
      CLASSES.iconeEditar,
      obterIconeEditar(),
      'editar',
      `Editar tarefa: ${tarefa.atividade}`
    ),
    criarBotao(
      CLASSES.botaoRemover,
      CLASSES.iconeExclusao,
      obterIconeLixeira(),
      'remover',
      `Remover tarefa: ${tarefa.atividade}`
    )
  );

  const reordenacao = document.createElement('div');
  reordenacao.className = CLASSES.reordenacao;

  const abrirReordenacao = document.createElement('button');
  abrirReordenacao.type = 'button';
  abrirReordenacao.className = CLASSES.botaoAbrirReordenacao;
  abrirReordenacao.setAttribute('aria-label', `Reordenar tarefa: ${tarefa.atividade}`);
  abrirReordenacao.title = `Reordenar tarefa: ${tarefa.atividade}`;
  abrirReordenacao.setAttribute('aria-expanded', 'false');
  abrirReordenacao.setAttribute('aria-controls', `opcoes-movimento-${tarefa.id}`);
  abrirReordenacao.append(criarIcone(CLASSES.iconeReordenar, obterIconeReordenar()));

  const acoesReordenacao = document.createElement('div');
  acoesReordenacao.className = CLASSES.acoesReordenacao;
  acoesReordenacao.id = `opcoes-movimento-${tarefa.id}`;
  acoesReordenacao.hidden = true;
  acoesReordenacao.setAttribute('role', 'group');
  acoesReordenacao.setAttribute('aria-label', `Movimentação de: ${tarefa.atividade}`);

  const alturaSubarvore = obterAlturaDaSubarvore(tarefa);
  acoesReordenacao.append(
    criarBotaoMovimento(
      'cima',
      obterIconeMoverCima(),
      `Mover para cima: ${tarefa.atividade}`,
      indice === 0
    ),
    criarBotaoMovimento(
      'baixo',
      obterIconeMoverBaixo(),
      `Mover para baixo: ${tarefa.atividade}`,
      indice === quantidadeIrmaos - 1
    ),
    criarBotaoMovimento(
      'indentar',
      obterIconeIndentar(),
      `Indentar sob o irmão anterior: ${tarefa.atividade}`,
      indice === 0 || nivel + alturaSubarvore > CONFIG.MAX_NIVEIS
    ),
    criarBotaoMovimento(
      'promover',
      obterIconePromover(),
      `Promover um nível: ${tarefa.atividade}`,
      nivel === 1
    )
  );

  reordenacao.append(abrirReordenacao, acoesReordenacao);
  acoes.append(reordenacao);
  item.append(linha);

  if (tarefa.filhos.length > 0) {
    const listaFilhos = document.createElement('ul');
    listaFilhos.className = CLASSES.filhos;
    listaFilhos.setAttribute('aria-label', `Subtarefas de: ${tarefa.atividade}`);
    listaFilhos.append(
      ...tarefa.filhos.map((filho, indiceFilho, irmaos) =>
        criarItem(filho, nivel + 1, indiceFilho, irmaos.length)
      )
    );
    item.append(listaFilhos);
  }

  return item;
}

/** Renderiza tarefas aninhadas ou a mensagem de estado vazio. */
export function renderizarLista(tarefas) {
  const iconeCabecalho = selecionar('.logo-icon');
  if (iconeCabecalho && !iconeCabecalho.querySelector('svg')) {
    iconeCabecalho.innerHTML = obterIconeListaVazia();
  }

  const botaoPrincipal = selecionar('#btn-criar');
  const iconeCriar = selecionar(`#btn-criar .${CLASSES.iconeAdicionar}`);
  if (iconeCriar && !iconeCriar.querySelector('svg')) {
    iconeCriar.innerHTML = obterIconeAdicionar();
  }
  if (botaoPrincipal) {
    botaoPrincipal.title = botaoPrincipal.getAttribute('aria-label') || 'Criar tarefa principal';
  }

  const container = selecionar(SELETORES.lista);
  if (!container) {
    return;
  }

  if (tarefas.length === 0) {
    const vazio = document.createElement('div');
    vazio.className = 'tarefas-empty';

    const icone = criarIcone(CLASSES.iconeListaVazia, obterIconeListaVazia());
    const titulo = document.createElement('span');
    titulo.className = 'tarefas-empty__titulo';
    titulo.textContent = 'Sua árvore está vazia';

    const instrucao = document.createElement('p');
    instrucao.className = 'tarefas-empty__subtitulo';
    instrucao.textContent = MENSAGENS.vazio;

    vazio.append(icone, titulo, instrucao);
    container.replaceChildren(vazio);
    return;
  }

  const lista = document.createElement('ul');
  lista.className = CLASSES.lista;
  lista.setAttribute('aria-label', 'Tarefas principais');
  lista.append(
    ...tarefas.map((tarefa, indice, principais) => criarItem(tarefa, 1, indice, principais.length))
  );
  container.replaceChildren(lista);
}

/** Atualiza os contadores de todos os níveis. */
export function atualizarContadores(total, completas) {
  const criadas = selecionar(SELETORES.contadorCriadas);
  const concluidas = selecionar(SELETORES.contadorConcluidas);
  if (criadas) {
    criadas.textContent = String(total);
  }
  if (concluidas) {
    concluidas.textContent = `${completas} de ${total}`;
  }
}

/** Retorna o formulário para criar tarefas principais. */
export function obterFormularioPrincipal() {
  return selecionar(SELETORES.formularioPrincipal);
}

/** Retorna o texto digitado no formulário principal. */
export function obterTextoPrincipal() {
  return selecionar(SELETORES.campoPrincipal)?.value.trim() || '';
}

/** Limpa e devolve o foco ao campo de tarefa principal. */
export function limparCampoPrincipal() {
  const campo = selecionar(SELETORES.campoPrincipal);
  if (campo) {
    campo.value = '';
    campo.focus();
  }
}

/** Abre um formulário contextual de edição ou de nova subtarefa. */
export function abrirFormularioItem(item, tipo, tarefa) {
  const container = selecionar(SELETORES.lista);
  container
    ?.querySelectorAll(SELETORES.formularioItem)
    .forEach((formulario) => formulario.remove());

  const formulario = criarFormularioItem(tipo, tarefa);
  const linha = item.firstElementChild;
  if (linha) {
    linha.after(formulario);
  } else {
    item.append(formulario);
  }
  selecionar('input[name="atividade"]', formulario)?.focus();
}

/** Mostra mensagem e informa leitores de tela sem interromper o fluxo. */
export function mostrarMensagem(texto, tipo = 'info') {
  const mensagem = selecionar(SELETORES.mensagem);
  if (!mensagem) {
    return;
  }

  clearTimeout(temporizadorMensagem);
  mensagem.className = `mensagem-flash mensagem-flash--${tipo}`;
  mensagem.textContent = texto;
  mensagem.hidden = !texto;
  mensagem.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  mensagem.setAttribute('aria-live', tipo === 'erro' ? 'assertive' : 'polite');

  if (texto) {
    temporizadorMensagem = setTimeout(() => {
      mensagem.hidden = true;
      mensagem.textContent = '';
    }, CONFIG.DURACAO_MENSAGEM_MS);
  }
}

/** Restaura o foco em uma tarefa após a lista ser redesenhada. */
export function focarTarefa(id, controle = 'texto') {
  const container = selecionar(SELETORES.lista);
  const item = [...(container?.querySelectorAll(SELETORES.tarefa) || [])].find(
    (tarefa) => Number(tarefa.dataset.id) === id
  );
  if (!item) {
    selecionar(SELETORES.campoPrincipal)?.focus();
    return;
  }

  const seletores = {
    texto: SELETORES.texto,
    checkbox: SELETORES.checkbox,
    editar: SELETORES.botaoEditar,
    reordenar: `.${CLASSES.botaoAbrirReordenacao}`,
  };
  if (controle === 'reordenar') {
    const menu = selecionar(SELETORES.acoesReordenacao, item);
    const botao = selecionar(SELETORES.botaoAbrirReordenacao, item);
    if (menu && botao) {
      menu.hidden = false;
      botao.setAttribute('aria-expanded', 'true');
      (selecionar('button:not(:disabled)', menu) || botao).focus();
      return;
    }
  }
  selecionar(seletores[controle] || seletores.texto, item)?.focus();
}
