/* ========================================
   JAVASCRIPT PARA TODO LIST - TEMPLATE BASE
   
   Este arquivo será preenchido progressivamente
   durante as aulas do curso.
   
   INSTRUÇÕES PARA PROFESSORES:
   - Este é o template inicial
   - Cada aula adicionará funcionalidades
   - Mantenha comentários educativos
   - Use nomes descritivos para variáveis
======================================== */

// ========== VARIÁVEIS GLOBAIS ==========
// Aqui vamos declarar nossas variáveis principais

// Lista que armazenará todas as tarefas
let listaDeTarefas = [];

// Referências aos elementos HTML (serão preenchidas nas aulas)
let inputNovaTarefa = null;
let botaoAdicionar = null;
let listaTarefasElement = null;
let contadorTotal = null;
let contadorPendentes = null;
let contadorCompletas = null;
let listaVazia = null;

// ========== FUNÇÕES PRINCIPAIS ==========

/**
 * FUNÇÃO DE INICIALIZAÇÃO
 * Esta função será chamada quando a página carregar
 * Aqui vamos configurar todos os elementos e eventos
 */
function inicializar() {
  console.log("🚀 Aplicação TODO List iniciada!");
  console.log("📚 Curso de JavaScript - Template Base");

  // TODO: Nas próximas aulas implementaremos:
  // - Buscar elementos HTML
  // - Configurar event listeners
  // - Carregar tarefas salvas
  // - Atualizar contadores
}

/**
 * FUNÇÃO PARA ADICIONAR NOVA TAREFA
 * Esta função será implementada durante o curso
 */
function adicionarTarefa() {
  console.log("📝 Função adicionarTarefa() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA RENDERIZAR LISTA DE TAREFAS
 * Esta função criará os elementos HTML para cada tarefa
 */
function renderizarLista() {
  console.log("🎨 Função renderizarLista() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA MARCAR/DESMARCAR TAREFA
 * Esta função alternará o status de uma tarefa
 */
function alternarTarefa(id) {
  console.log("✅ Função alternarTarefa() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA DELETAR TAREFA
 * Esta função removerá uma tarefa da lista
 */
function deletarTarefa(id) {
  console.log("🗑️ Função deletarTarefa() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA ATUALIZAR CONTADORES
 * Esta função calculará e mostrará as estatísticas
 */
function atualizarContadores() {
  console.log("📊 Função atualizarContadores() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA SALVAR DADOS
 * Esta função salvará as tarefas no localStorage
 */
function salvarTarefas() {
  console.log("💾 Função salvarTarefas() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

/**
 * FUNÇÃO PARA CARREGAR DADOS
 * Esta função carregará as tarefas do localStorage
 */
function carregarTarefas() {
  console.log("📂 Função carregarTarefas() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

// ========== EVENTOS ==========

/**
 * EVENTO DE CARREGAMENTO DA PÁGINA
 * Este evento é disparado quando o HTML termina de carregar
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 Página carregada - DOM pronto!");
  inicializar();
});

// ========== FUNÇÕES AUXILIARES ==========

/**
 * FUNÇÃO PARA GERAR ID ÚNICO
 * Esta função cria um identificador único para cada tarefa
 */
function gerarId() {
  return Date.now(); // Usa timestamp como ID único
}

/**
 * FUNÇÃO PARA VALIDAR TEXTO
 * Esta função verifica se o texto da tarefa é válido
 */
function validarTexto(texto) {
  return texto && texto.trim().length > 0;
}

/**
 * FUNÇÃO PARA MOSTRAR/OCULTAR LISTA VAZIA
 * Esta função controla a mensagem quando não há tarefas
 */
function gerenciarListaVazia() {
  console.log("👀 Função gerenciarListaVazia() será implementada nas aulas");
  // TODO: Implementar nas aulas futuras
}

// ========== MENSAGENS PARA O CURSO ==========

console.log("🎓 CURSO DE JAVASCRIPT - TODO LIST");
console.log("📚 Template Base Carregado");
console.log("🚀 Pronto para começar as aulas!");
console.log("💡 Dica: Abra o console para acompanhar o desenvolvimento");

// Função para mostrar o progresso do curso
function mostrarProgresso() {
  console.log("📈 PROGRESSO DO CURSO:");
  console.log("✅ Aula 1: Fundamentos JavaScript");
  console.log("⏳ Aula 2: DOM e Interações");
  console.log("⏳ Aula 3: Eventos");
  console.log("⏳ Aula 4: Arrays e Dados");
  console.log("⏳ Aula 5: Criação Dinâmica");
  console.log("⏳ Aula 6: Funcionalidades CRUD");
  console.log("⏳ Aula 7: LocalStorage");
  console.log("⏳ Aula 8: Recursos Avançados");
}

// Mostrar progresso automaticamente
mostrarProgresso();
