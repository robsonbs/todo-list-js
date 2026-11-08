// ========== CONSTANTES DO PROJETO ==========
// Centraliza valores reutilizados para facilitar manutenção

export const STORAGE_KEY = 'tarefas';

// Seletores DOM (IDs e classes usados no JavaScript)
export const SELETORES = {
  form: '#todo-form',
  input: '#todo-input',
  btnCriar: '#btn-criar',
  containerTarefas: '.tarefas-box',
  contadorCriadas: '#contador-criadas',
  contadorConcluidas: '#contador-concluidas',
  tarefa: '.tarefa',
  checkbox: 'input[type="checkbox"]',
  textoTarefa: 'span',
  btnRemover: '.remove-btn',
  campoEdicao: '.campo-edicao',
};

// Mensagens de interface e validação
export const MENSAGENS = {
  textoVazio: 'Digite uma tarefa antes de criar.',
  textoMuitoLongo: 'A tarefa não pode ter mais de 100 caracteres.',
  indiceInvalido: 'Índice de tarefa inválido.',
  erroLocalStorage: 'Erro ao acessar o armazenamento do navegador.',
};

// Configurações
export const CONFIG = {
  MAX_CARACTERES_TAREFA: 100,
  DELAY_SALVAR_BLUR: 100, // ms
};
