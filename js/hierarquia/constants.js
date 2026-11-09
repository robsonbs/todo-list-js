// ============================================================
// CONSTANTS.JS — Configurações da lista hierárquica
// ------------------------------------------------------------
// Mantém seletores, classes, mensagens e limites num só lugar.
// A chave própria evita misturar esta árvore com a lista plana.
// ============================================================

import { CONFIG as CONFIG_BASE } from '../constants.js';

export const CHAVE_ARMAZENAMENTO = 'tarefas-hierarquicas';

export const CONFIG = {
  MAX_NIVEIS: 3,
  MAX_CARACTERES_TAREFA: CONFIG_BASE.MAX_CARACTERES_TAREFA,
};

export const CLASSES = {
  tarefa: 'tarefa',
  tarefaHierarquica: 'tarefa-hierarquica',
  lista: 'lista-hierarquica',
  filhos: 'lista-hierarquica__filhos',
  linha: 'tarefa-hierarquica__linha',
  acoes: 'tarefa-hierarquica__acoes',
  iconeExclusao: 'icone-exclusao',
  iconeAdicionar: 'icone-adicionar',
  iconeEditar: 'icone-editar',
  iconeSalvar: 'icone-salvar',
  iconeCancelar: 'icone-cancelar',
  iconeListaVazia: 'tarefas-empty__icone',
  texto: 'texto-tarefa',
  botaoAdicionarFilho: 'botao-subtarefa',
  botaoEditar: 'botao-editar-tarefa',
  botaoRemover: 'remove-btn',
  formularioItem: 'formulario-item',
  campoFormulario: 'campo-formulario-item',
  acoesFormulario: 'acoes-formulario-item',
  mensagem: 'mensagem-hierarquia',
};

export const SELETORES = {
  formularioPrincipal: '#todo-form',
  campoPrincipal: '#todo-input',
  lista: '#lista-hierarquica',
  contadorCriadas: '#contador-criadas',
  contadorConcluidas: '#contador-concluidas',
  mensagem: '#mensagem-hierarquia',
  tarefa: `.${CLASSES.tarefaHierarquica}`,
  texto: `.${CLASSES.texto}`,
  checkbox: 'input[type="checkbox"]',
  botaoAdicionarFilho: `.${CLASSES.botaoAdicionarFilho}`,
  botaoEditar: `.${CLASSES.botaoEditar}`,
  botaoRemover: `.${CLASSES.botaoRemover}`,
  formularioItem: `.${CLASSES.formularioItem}`,
};

export const MENSAGENS = {
  vazio: 'Crie uma tarefa principal para começar sua árvore.',
  nivelMaximo: `Uma tarefa pode ter até ${CONFIG.MAX_NIVEIS} níveis.`,
  textoInvalido: `Digite uma tarefa com até ${CONFIG.MAX_CARACTERES_TAREFA} caracteres.`,
  falhaAoSalvar: 'Não foi possível salvar as tarefas neste navegador.',
};
