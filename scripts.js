// ========== VARIÁVEIS GLOBAIS ==========
// Array que armazena todas as tarefas da nossa lista
let tarefas = [];

// ========== FUNÇÕES PRINCIPAIS ==========

/**
 * Cria uma nova tarefa e adiciona à lista
 * @param {string} atividade - O texto da tarefa que será criada
 */
function novaTarefa(atividade) {
  // Verificação de segurança: garante que o array existe
  if (tarefas === undefined) {
    tarefas = [];
  }

  // Cria um objeto representando a nova tarefa
  const tarefa = {
    completa: false, // Por padrão, a tarefa não está completa
    atividade: atividade, // O texto da atividade
  };

  // Adiciona a nova tarefa ao final do array
  tarefas.push(tarefa);

  // Salva as alterações no navegador
  salvarTarefasLocalStorage();

  // Atualiza a interface do usuário
  renderizarTarefas(); // Redesenha todas as tarefas na tela
  atualizarContadores(); // Atualiza os contadores de tarefas
}

/**
 * Retorna o HTML do ícone de lixeira (SVG)
 * Separamos isso em uma função para manter o código mais limpo
 */
function obterIconeLixeira() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
      <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/**
 * Cria o HTML para uma única tarefa
 * @param {Object} tarefa - O objeto da tarefa
 * @param {number} indice - A posição da tarefa no array
 */
function criarHTMLTarefa(tarefa, indice) {
  // Determina se o checkbox deve estar marcado
  const estaCompleta = tarefa.completa ? "checked" : "";

  return `
    <input type="checkbox" 
           id="tarefa-${indice}" 
           value="${tarefa.atividade}" 
           ${estaCompleta}/>
    <span>${tarefa.atividade}</span>
    <button title="Deletar tarefa" 
            class="remove-btn" 
            data-index="${indice}">
      ${obterIconeLixeira()}
    </button>`;
}

/**
 * Adiciona eventos (cliques) aos elementos de uma tarefa
 * @param {number} indice - A posição da tarefa no array
 */
function adicionarEventosTarefa(indice) {
  // EVENTO 1: Botão de deletar tarefa
  const botaoRemover = document.querySelector(
    `.remove-btn[data-index='${indice}']`
  );
  botaoRemover.addEventListener("click", function () {
    const indiceTarefa = this.dataset.index;
    removerTarefa(indiceTarefa);
  });

  // EVENTO 2: Checkbox para marcar como completa/incompleta
  const checkbox = document.querySelector(`#tarefa-${indice}`);
  checkbox.addEventListener("change", function () {
    const indiceTarefa = this.id.split("-")[1];
    // Usa o valor atual do checkbox (true se marcado, false se desmarcado)
    tarefas[indiceTarefa].completa = this.checked;

    // Salva as alterações no navegador
    salvarTarefasLocalStorage();

    atualizarContadores();
  });

  // EVENTO 3: Duplo clique no texto para editar
  // Este é o novo evento que permite editar tarefas
  const textoTarefa = document.querySelector(
    `#tarefa-${indice}`
  ).nextElementSibling;

  textoTarefa.addEventListener("dblclick", function () {
    // Quando o usuário clica duas vezes no texto da tarefa:
    // 1. Identifica qual tarefa foi clicada
    const indiceTarefa = this.previousElementSibling.id.split("-")[1];

    // 2. Inicia o modo de edição para esta tarefa
    iniciarEdicaoTarefa(indiceTarefa, this);
  });

  // EVENTO 4: Adicionar feedback visual no hover do texto
  // Mostra ao usuário que o texto é editável
  textoTarefa.addEventListener("mouseenter", function () {
    // Adiciona uma dica visual de que o texto é editável
    this.style.cursor = "text";
    this.title = "Clique duas vezes para editar";
  });

  textoTarefa.addEventListener("mouseleave", function () {
    // Remove a dica quando o mouse sai
    this.style.cursor = "";
    this.title = "";
  });
}

/**
 * Remove uma tarefa da lista
 * @param {number} indice - A posição da tarefa a ser removida
 */
function removerTarefa(indice) {
  // Remove 1 elemento na posição indicada
  tarefas.splice(indice, 1);

  // Salva as alterações no navegador
  salvarTarefasLocalStorage();

  // Atualiza a interface
  renderizarTarefas();
  atualizarContadores();
}

/**
 * Inicia o modo de edição para uma tarefa específica
 * Transforma o texto da tarefa em um campo editável
 * @param {number} indice - A posição da tarefa na lista
 * @param {HTMLElement} elementoTexto - O elemento span que contém o texto
 *
 * Como funciona:
 * 1. Salva o texto original para caso o usuário cancele
 * 2. Cria um campo de entrada (input) com o texto atual
 * 3. Substitui o span pelo input temporariamente
 * 4. Foca no campo para o usuário começar a digitar
 * 5. Adiciona eventos para salvar (Enter) ou cancelar (Esc)
 */
function iniciarEdicaoTarefa(indice, elementoTexto) {
  // PASSO 1: Verificar se já está em modo de edição
  // Evita criar múltiplos campos de edição na mesma tarefa
  if (elementoTexto.querySelector("input")) {
    return; // Se já tem um input, sai da função
  }

  // PASSO 2: Salvar o texto original
  // Precisamos do texto original caso o usuário cancele a edição
  const textoOriginal = tarefas[indice].atividade;

  // PASSO 3: Criar o campo de entrada (input)
  const campoEdicao = document.createElement("input");
  campoEdicao.type = "text";
  campoEdicao.value = textoOriginal; // Preenche com o texto atual
  campoEdicao.className = "campo-edicao"; // Classe CSS para estilização

  // PASSO 4: Configurar aparência do campo
  // Faz o input parecer integrado ao design
  campoEdicao.style.background = "transparent";
  campoEdicao.style.border = "1px solid var(--purple-dark)";
  campoEdicao.style.borderRadius = "4px";
  campoEdicao.style.padding = "4px 8px";
  campoEdicao.style.color = "inherit";
  campoEdicao.style.fontFamily = "inherit";
  campoEdicao.style.fontSize = "inherit";
  campoEdicao.style.width = "100%";

  // PASSO 5: Substituir o texto pelo campo de edição
  // Temporariamente esconde o texto e mostra o input
  elementoTexto.style.display = "none"; // Esconde o span original
  elementoTexto.parentNode.insertBefore(campoEdicao, elementoTexto); // Adiciona o input

  // PASSO 6: Focar no campo e selecionar todo o texto
  // Facilita a edição para o usuário
  campoEdicao.focus();
  campoEdicao.select(); // Seleciona todo o texto para fácil substituição

  // PASSO 7: Função para finalizar a edição
  // Esta função será chamada quando o usuário terminar de editar
  function finalizarEdicao(salvar = true) {
    const novoTexto = campoEdicao.value.trim(); // Remove espaços extras

    if (salvar && novoTexto !== "" && novoTexto !== textoOriginal) {
      // SALVAR: Se o texto mudou e não está vazio
      tarefas[indice].atividade = novoTexto; // Atualiza o array
      salvarTarefasLocalStorage(); // Salva no navegador
      renderizarTarefas(); // Redesenha a interface
    } else {
      // CANCELAR: Restaura o estado original
      campoEdicao.remove(); // Remove o input
      elementoTexto.style.display = ""; // Mostra o span original novamente
    }
  }

  // PASSO 8: Adicionar eventos do teclado
  campoEdicao.addEventListener("keypress", function (evento) {
    if (evento.key === "Enter") {
      // ENTER: Salva as alterações
      evento.preventDefault(); // Evita comportamento padrão
      finalizarEdicao(true);
    }
  });

  campoEdicao.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      // ESC: Cancela a edição
      evento.preventDefault();
      finalizarEdicao(false);
    }
  });

  // PASSO 9: Adicionar evento de perda de foco
  // Se o usuário clicar fora do campo, salva automaticamente
  campoEdicao.addEventListener("blur", function () {
    // Pequeno delay para evitar conflitos com outros eventos
    setTimeout(() => finalizarEdicao(true), 100);
  });
}

/**
 * Edita o texto de uma tarefa existente
 * Atualiza a tarefa no array e na interface
 * @param {number} indice - A posição da tarefa na lista
 * @param {string} novoTexto - O novo texto da tarefa
 *
 * Esta função é uma versão mais direta da edição,
 * útil para outras partes do código que precisem editar tarefas
 */
function editarTarefa(indice, novoTexto) {
  // VALIDAÇÃO: Verifica se o índice é válido
  if (indice < 0 || indice >= tarefas.length) {
    console.error("Índice de tarefa inválido:", indice);
    return;
  }

  // VALIDAÇÃO: Verifica se o texto não está vazio
  const textoLimpo = novoTexto.trim();
  if (textoLimpo === "") {
    console.error("Texto da tarefa não pode estar vazio");
    return;
  }

  // ATUALIZAR: Modifica a tarefa no array
  tarefas[indice].atividade = textoLimpo;

  // PERSISTIR: Salva no navegador
  salvarTarefasLocalStorage();

  // ATUALIZAR INTERFACE: Redesenha a lista
  renderizarTarefas();
}

/**
 * Desenha todas as tarefas na tela
 * Esta é a função principal que atualiza a interface do usuário
 */
function renderizarTarefas() {
  // Encontra o elemento HTML onde as tarefas serão exibidas
  const containerTarefas = document.querySelector(".tarefas-box");

  // Limpa todo o conteúdo anterior
  containerTarefas.innerHTML = "";

  // Se não há tarefas, mostra mensagem de lista vazia
  if (tarefas.length === 0) {
    exibirListaVazia();
    return; // Sai da função pois não há tarefas para renderizar
  }

  // Para cada tarefa no array, cria um elemento na tela
  tarefas.forEach((tarefa, indice) => {
    // Cria um novo div para esta tarefa
    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");

    // Define o conteúdo HTML da tarefa
    divTarefa.innerHTML = criarHTMLTarefa(tarefa, indice);

    // Adiciona a tarefa ao container
    containerTarefas.appendChild(divTarefa);

    // Adiciona os eventos de clique e mudança
    adicionarEventosTarefa(indice);
  });
}

/**
 * Atualiza os números mostrados nos contadores da interface
 * Mostra quantas tarefas foram criadas e quantas estão completas
 */
function atualizarContadores() {
  // Encontra os elementos HTML dos contadores usando os IDs específicos
  const contadorCompletas = document.getElementById("contador-concluidas");
  const contadorCriadas = document.getElementById("contador-criadas");

  // Calcula quantas tarefas estão completas
  const numeroTarefasCompletas = tarefas.filter(
    (tarefa) => tarefa.completa
  ).length;
  const numeroTotalTarefas = tarefas.length;

  // Atualiza o texto dos contadores
  contadorCriadas.innerText = `${numeroTotalTarefas}`;
  contadorCompletas.innerText = `${numeroTarefasCompletas} de ${numeroTotalTarefas}`;
}

// ========== EVENTOS DA INTERFACE ==========

/**
 * Função que é executada quando o usuário clica no botão de criar tarefa
 * @param {Event} evento - O evento de clique do botão
 */
function aoClicarBotaoCriar(evento) {
  // Obtém o texto digitado pelo usuário e remove espaços extras
  const textoTarefa = document.getElementById("todo-input").value.trim();

  // Só cria a tarefa se o usuário digitou alguma coisa
  if (textoTarefa !== "") {
    novaTarefa(textoTarefa);

    // Limpa o campo de entrada após criar a tarefa
    document.getElementById("todo-input").value = "";
  }
}

// ========== INTERFACE DE ESTADO VAZIO ==========

/**
 * Retorna o HTML do ícone de lista vazia (SVG)
 * Mantém consistência com outras funções que retornam SVG
 */
function obterIconeListaVazia() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <line x1="96" y1="152" x2="160" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <line x1="96" y1="120" x2="160" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
      <path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
      <path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
    </svg>`;
}

/**
 * Exibe uma mensagem quando não há tarefas na lista
 * Melhora a experiência do usuário mostrando um estado visual claro
 */
function exibirListaVazia() {
  const containerTarefas = document.querySelector(".tarefas-box");

  // Cria o HTML para o estado vazio
  containerTarefas.innerHTML = `
    <div class="tarefas-empty">
      ${obterIconeListaVazia()}
      <span>Você ainda não tem tarefas cadastradas</span>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>`;
}

// ========== PERSISTÊNCIA DE DADOS ==========

/**
 * Salva todas as tarefas no navegador (localStorage)
 * O localStorage permite que os dados persistam mesmo após fechar o navegador
 */
function salvarTarefasLocalStorage() {
  try {
    // Converte o array de tarefas para texto JSON e salva no navegador
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  } catch (erro) {
    console.error("Erro ao salvar tarefas:", erro);
  }
}

/**
 * Carrega as tarefas salvas do navegador (localStorage)
 * Esta função é executada quando a página carrega
 */
function carregarTarefasLocalStorage() {
  try {
    // Busca as tarefas salvas no navegador
    const tarefasSalvas = localStorage.getItem("tarefas");

    // Se encontrou tarefas salvas, converte de texto JSON para array
    if (tarefasSalvas) {
      tarefas = JSON.parse(tarefasSalvas);
    }

    // Atualiza a interface com as tarefas carregadas
    renderizarTarefas();
    atualizarContadores();
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
    // Se houver erro, inicia com lista vazia
    tarefas = [];
  }
}

// ========== INICIALIZAÇÃO ==========

/**
 * Configura os eventos quando a página carrega
 * Esta função é executada automaticamente quando o script é carregado
 */
function inicializar() {
  // Encontra o botão de criar tarefa usando seu ID específico
  const botaoCriar = document.getElementById("btn-criar");

  // Verifica se o botão existe antes de adicionar o evento
  if (botaoCriar) {
    botaoCriar.addEventListener("click", aoClicarBotaoCriar);
  }

  // Permite criar tarefa pressionando Enter no campo de texto
  const campoTexto = document.getElementById("todo-input");
  if (campoTexto) {
    campoTexto.addEventListener("keypress", function (evento) {
      // Se a tecla pressionada foi Enter
      if (evento.key === "Enter") {
        aoClicarBotaoCriar(evento);
      }
    });
  }
}

/**
 * Função principal que inicia a aplicação
 * É executada quando o HTML da página termina de carregar
 */
function iniciarAplicacao() {
  // Configura todos os eventos da interface
  inicializar();

  // Carrega as tarefas salvas anteriormente no navegador
  carregarTarefasLocalStorage();
}

// Aguarda o HTML carregar completamente antes de iniciar a aplicação
// DOMContentLoaded garante que todos os elementos HTML estão disponíveis
document.addEventListener("DOMContentLoaded", iniciarAplicacao);

// ========== FUNCIONALIDADE DE EDIÇÃO - RESUMO ==========
/*
  NOVA FUNCIONALIDADE ADICIONADA: EDIÇÃO DE TAREFAS
  
  Como usar:
  1. Clique DUAS VEZES no texto de qualquer tarefa
  2. O texto se transformará em um campo editável
  3. Digite o novo texto
  4. Pressione ENTER para salvar OU ESC para cancelar
  5. Ou clique fora do campo para salvar automaticamente

  Tecnologias utilizadas:
  - Event Listener 'dblclick' (duplo clique)
  - Manipulação dinâmica do DOM
  - Criação de elementos HTML via JavaScript
  - Eventos de teclado (keypress, keydown)
  - Event Listener 'blur' (perda de foco)
  
  Conceitos de UX aplicados:
  - Feedback visual (cursor e hover)
  - Tooltip explicativo
  - Integração visual com o design
  - Múltiplas formas de confirmar/cancelar
  
  Funcionalidades implementadas:
  - iniciarEdicaoTarefa(): Transforma texto em campo editável
  - editarTarefa(): Versão programática para editar tarefas
  - Eventos no adicionarEventosTarefa(): Duplo clique e hover
  - CSS específico: Estilos para modo de edição
  
  Validações incluídas:
  - Previne múltiplas edições simultâneas
  - Não permite texto vazio
  - Trim automático (remove espaços extras)
  - Verificação de índices válidos
  
  Esta funcionalidade torna a aplicação mais interativa e 
  oferece uma experiência de usuário mais rica e intuitiva!
*/
