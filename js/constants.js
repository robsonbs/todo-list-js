// ============================================================
// CONSTANTS.JS — Valores compartilhados por toda a aplicação
// ------------------------------------------------------------
// Responsabilidade: centralizar chaves, classes, seletores,
// mensagens e configurações para que exista uma única fonte de verdade.
// NÃO faz: não executa lógica de negócio e não toca no DOM.
// Conceitos ensinados: constantes, objetos literais e organização.
// ============================================================

// Chave usada para guardar as tarefas no localStorage.
// O valor 'tarefas' NÃO deve mudar: ele identifica os dados que
// usuários já têm salvos no navegador.
export const CHAVE_ARMAZENAMENTO = 'tarefas';

// Configurações numéricas da aplicação.
export const CONFIG = {
  MAX_CARACTERES_TAREFA: 100,
  DELAY_SALVAR_BLUR: 100, // ms de espera antes de salvar ao perder o foco
  DURACAO_MENSAGEM_MS: 3000, // tempo que a mensagem flash fica na tela
};

// Classes CSS criadas pelo JavaScript.
// Elas ficam aqui para que o nome usado no HTML, no CSS e no JS
// seja sempre o mesmo: renomear um componente vira uma edição só.
export const CLASSES = {
  tarefa: 'tarefa',
  tarefaEditando: 'tarefa--editando',
  textoTarefa: 'texto-tarefa',
  botaoRemover: 'remove-btn',
  iconeExclusao: 'icone-exclusao',
  iconeAdicionar: 'icone-adicionar',
  campoEdicao: 'campo-edicao',
  mensagemFlash: 'mensagem-flash',
  estadoVazio: 'tarefas-empty',
  estadoVazioIcone: 'tarefas-empty__icone',
  estadoVazioTitulo: 'tarefas-empty__titulo',
  estadoVazioSubtitulo: 'tarefas-empty__subtitulo',
};

// Seletores de elementos que JÁ existem no index.html.
// O teste de contrato (tests/contrato.test.js) garante que eles
// continuem batendo com o HTML de verdade.
export const SELETORES_ESTATICOS = {
  formulario: '#todo-form',
  campoEntrada: '#todo-input',
  containerPrincipal: '.tarefas-container',
  containerTarefas: '.tarefas-box',
  contadorCriadas: '#contador-criadas',
  contadorConcluidas: '#contador-concluidas',
};

// Seletores de elementos CRIADOS pelo JavaScript em tempo de execução.
export const SELETORES_DINAMICOS = {
  tarefa: `.${CLASSES.tarefa}`,
  textoTarefa: `.${CLASSES.textoTarefa}`,
  botaoRemover: `.${CLASSES.botaoRemover}`,
  checkboxTarefa: 'input[type="checkbox"]',
  campoEdicao: `.${CLASSES.campoEdicao}`,
  mensagemFlash: `.${CLASSES.mensagemFlash}`,
};

// Atalho com todos os seletores juntos, para quem precisa consultar
// tanto elementos estáticos quanto dinâmicos.
export const SELETORES = {
  ...SELETORES_ESTATICOS,
  ...SELETORES_DINAMICOS,
};

// Mensagens exibidas ao usuário.
// O limite é interpolado para que texto e regra nunca fiquem diferentes.
export const MENSAGENS = {
  textoVazio: 'Digite uma tarefa antes de criar.',
  textoMuitoLongo: `A tarefa não pode ter mais de ${CONFIG.MAX_CARACTERES_TAREFA} caracteres.`,
  erroAoSalvar: 'Não foi possível salvar as tarefas no navegador.',
};
