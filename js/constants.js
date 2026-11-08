// ============================================================
// CONSTANTS.JS — Valores compartilhados por toda a aplicação
// ------------------------------------------------------------
// Responsabilidade: centralizar chaves, seletores, mensagens e
// configurações para que exista uma única fonte de verdade.
// NÃO faz: não executa lógica e não toca no DOM.
// Conceitos ensinados: constantes, objetos literais e organização.
// ============================================================

// Chave usada para guardar as tarefas no localStorage.
// O valor 'tarefas' NÃO deve mudar: ele identifica os dados que
// usuários já têm salvos no navegador.
export const CHAVE_ARMAZENAMENTO = 'tarefas';

// Seletores CSS dos elementos manipulados pelo JavaScript.
// Manter todos aqui evita "números mágicos" espalhados pelo código.
export const SELETORES = {
  formulario: '#todo-form',
  campoEntrada: '#todo-input',
  botaoCriar: '#btn-criar',
  containerPrincipal: '.tarefas-container',
  containerTarefas: '.tarefas-box',
  contadorCriadas: '#contador-criadas',
  contadorConcluidas: '#contador-concluidas',
  tarefa: '.tarefa',
  textoTarefa: '.texto-tarefa',
  botaoRemover: '.remove-btn',
  campoEdicao: '.campo-edicao',
  mensagemFlash: '.mensagem-flash',
};

// Mensagens exibidas ao usuário.
export const MENSAGENS = {
  textoVazio: 'Digite uma tarefa antes de criar.',
  textoMuitoLongo: 'A tarefa não pode ter mais de 100 caracteres.',
};

// Configurações numéricas da aplicação.
export const CONFIG = {
  MAX_CARACTERES_TAREFA: 100,
  DELAY_SALVAR_BLUR: 100, // ms de espera antes de salvar ao perder o foco
  DURACAO_MENSAGEM_MS: 3000, // tempo que a mensagem flash fica na tela
};
