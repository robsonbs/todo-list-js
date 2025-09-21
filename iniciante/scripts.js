/* ========================================
   JAVASCRIPT PARA INICIANTES - TODO LIST
   
   Este arquivo contém todo o código JavaScript
   da nossa aplicação de lista de tarefas.
   
   O JavaScript é responsável por:
   - Reagir aos cliques do usuário
   - Adicionar/remover tarefas
   - Salvar dados no navegador
   - Atualizar a interface
======================================== */

// ========== VARIÁVEIS GLOBAIS ==========
// Variáveis globais são acessíveis por todas as funções
// Evite usar muitas, mas aqui faz sentido para armazenar as tarefas

/**
 * ARRAY DE TAREFAS: Armazena todas as tarefas da nossa lista
 * Cada tarefa é um objeto com duas propriedades:
 * - completa: boolean (true se está marcada, false se não)
 * - atividade: string (o texto da tarefa)
 */
let listaDeTarefas = [];

// ========== FUNÇÕES PRINCIPAIS ==========

/**
 * CRIAR NOVA TAREFA
 * Esta função recebe um texto e cria uma nova tarefa na lista
 *
 * @param {string} textoTarefa - O texto da tarefa que será criada
 *
 * Como funciona:
 * 1. Verifica se a lista existe (segurança)
 * 2. Cria um objeto representando a nova tarefa
 * 3. Adiciona a tarefa ao final da lista
 * 4. Salva no navegador
 * 5. Atualiza a tela
 */
function criarNovaTarefa(textoTarefa) {
  // VERIFICAÇÃO DE SEGURANÇA: garante que o array existe
  if (listaDeTarefas === undefined) {
    listaDeTarefas = [];
  }

  // CRIAÇÃO DO OBJETO TAREFA
  // Em JavaScript, objetos são criados com chaves {}
  const novaTarefa = {
    completa: false, // Por padrão, nova tarefa não está completa
    atividade: textoTarefa, // O texto que o usuário digitou
  };

  // ADICIONAR À LISTA
  // push() adiciona um elemento ao final do array
  listaDeTarefas.push(novaTarefa);

  // SALVAR NO NAVEGADOR
  // Para que as tarefas não sejam perdidas quando fechar a página
  salvarDadosNoNavegador();

  // ATUALIZAR A TELA
  mostrarTodasAsTarefas(); // Redesenha todas as tarefas
  atualizarContadores(); // Atualiza os números dos contadores
}

/**
 * GERAR ÍCONE DE LIXEIRA
 * Retorna o código SVG do ícone de lixeira
 * Separamos em uma função para manter o código organizado
 *
 * @returns {string} O código HTML do ícone SVG
 */
function gerarIconeLixeira() {
  return `
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <line x1="216" y1="56" x2="40" y2="56" stroke="currentColor" stroke-width="16"></line>
      <line x1="104" y1="104" x2="104" y2="168" stroke="currentColor" stroke-width="16"></line>
      <line x1="152" y1="104" x2="152" y2="168" stroke="currentColor" stroke-width="16"></line>
      <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" stroke="currentColor" stroke-width="16"></path>
      <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" stroke="currentColor" stroke-width="16"></path>
    </svg>`;
}

/**
 * CRIAR HTML DE UMA TAREFA
 * Gera o código HTML para exibir uma tarefa na tela
 *
 * @param {Object} tarefa - O objeto da tarefa
 * @param {number} posicao - A posição da tarefa na lista (começando do 0)
 * @returns {string} O HTML da tarefa
 *
 * Como funciona:
 * 1. Verifica se a tarefa está completa
 * 2. Monta o HTML com checkbox, texto e botão
 * 3. Retorna o código HTML pronto
 */
function criarHTMLDaTarefa(tarefa, posicao) {
  // VERIFICAR SE ESTÁ COMPLETA
  // Se tarefa.completa for true, adiciona "checked" ao checkbox
  const estaCompleta = tarefa.completa ? "checked" : "";

  // RETORNAR HTML
  // Template string (crase) permite variáveis no texto com ${}
  return `
    <input type="checkbox" 
           id="tarefa-${posicao}" 
           value="${tarefa.atividade}" 
           ${estaCompleta}/>
    <span>${tarefa.atividade}</span>
    <button title="Deletar tarefa" 
            class="botao-deletar" 
            data-posicao="${posicao}">
      ${gerarIconeLixeira()}
    </button>`;
}

/**
 * CONFIGURAR EVENTOS DE UMA TAREFA
 * Adiciona os eventos de clique nos elementos de uma tarefa
 *
 * @param {number} posicao - A posição da tarefa na lista
 *
 * Eventos configurados:
 * - Clique no botão deletar -> remove a tarefa
 * - Mudança no checkbox -> marca/desmarca como completa
 * - NOVO: Duplo clique no texto -> permite editar a tarefa
 */
function configurarEventosDaTarefa(posicao) {
  // EVENTO 1: BOTÃO DELETAR
  // Busca o botão usando o atributo data-posicao
  const botaoDeletar = document.querySelector(
    `.botao-deletar[data-posicao='${posicao}']`
  );

  // addEventListener adiciona um "ouvinte" de eventos
  botaoDeletar.addEventListener("click", function () {
    // this se refere ao elemento que foi clicado
    const posicaoParaDeletar = this.dataset.posicao;
    deletarTarefa(posicaoParaDeletar);
  });

  // EVENTO 2: CHECKBOX
  // Busca o checkbox usando o ID único
  const checkbox = document.querySelector(`#tarefa-${posicao}`);

  checkbox.addEventListener("change", function () {
    // Pega a posição do ID (exemplo: "tarefa-2" -> posição 2)
    const posicaoTarefa = this.id.split("-")[1];

    // Atualiza o estado da tarefa baseado no checkbox
    listaDeTarefas[posicaoTarefa].completa = this.checked;

    // Salva as alterações
    salvarDadosNoNavegador();
    atualizarContadores();
  });

  // EVENTO 3: DUPLO CLIQUE NO TEXTO (NOVA FUNCIONALIDADE!)
  // Busca o texto da tarefa (que fica depois do checkbox)
  const textoTarefa = document.querySelector(
    `#tarefa-${posicao}`
  ).nextElementSibling;

  // Duplo clique para editar
  textoTarefa.addEventListener("dblclick", function () {
    console.log("Duplo clique detectado na tarefa", posicao);

    // Pega a posição da tarefa
    const posicaoTarefa = this.previousElementSibling.id.split("-")[1];

    // Inicia a edição
    iniciarEdicaoDaTarefa(posicaoTarefa, this);
  });

  // EVENTO 4: MOSTRAR DICA VISUAL
  // Quando o mouse passa sobre o texto, mostra que é editável
  textoTarefa.addEventListener("mouseenter", function () {
    this.style.cursor = "text";
    this.title = "Clique duas vezes para editar";
    console.log("Mouse sobre a tarefa - mostrando dica");
  });

  // Remove a dica quando o mouse sai
  textoTarefa.addEventListener("mouseleave", function () {
    this.style.cursor = "";
    this.title = "";
  });
}

/**
 * DELETAR TAREFA
 * Remove uma tarefa da lista baseada na sua posição
 *
 * @param {number} posicao - A posição da tarefa a ser removida
 *
 * Como funciona:
 * 1. Remove a tarefa do array
 * 2. Salva no navegador
 * 3. Atualiza a tela
 */
function deletarTarefa(posicao) {
  // REMOVER DO ARRAY
  // splice(posição, quantidade) remove elementos do array
  listaDeTarefas.splice(posicao, 1);

  // SALVAR E ATUALIZAR
  salvarDadosNoNavegador();
  mostrarTodasAsTarefas();
  atualizarContadores();
}

// ========== FUNCIONALIDADE DE EDIÇÃO ==========
// Nova funcionalidade: Editar tarefas clicando duas vezes no texto

/**
 * INICIAR EDIÇÃO DE TAREFA
 * Transforma o texto da tarefa em um campo que pode ser editado
 *
 * @param {number} posicao - A posição da tarefa na lista
 * @param {HTMLElement} elementoTexto - O elemento span que contém o texto
 *
 * Como funciona:
 * 1. Verifica se já não está editando (para evitar problemas)
 * 2. Salva o texto original (caso o usuário queira cancelar)
 * 3. Cria um campo de entrada (input) no lugar do texto
 * 4. Configura o campo para ficar bonito e funcional
 * 5. Adiciona eventos para salvar (Enter) ou cancelar (Esc)
 */
function iniciarEdicaoDaTarefa(posicao, elementoTexto) {
  // PASSO 1: Verificar se já está editando
  // Se já tem um input, não faz nada
  if (elementoTexto.querySelector("input")) {
    console.log("Já está editando esta tarefa");
    return;
  }

  // PASSO 2: Guardar o texto original
  const textoOriginal = listaDeTarefas[posicao].atividade;
  console.log("Iniciando edição da tarefa:", textoOriginal);

  // PASSO 3: Criar um campo de entrada (input)
  const campoEdicao = document.createElement("input");
  campoEdicao.type = "text";
  campoEdicao.value = textoOriginal;
  campoEdicao.className = "campo-edicao";

  // PASSO 4: Deixar o campo bonito
  // Fazemos ele parecer integrado ao design
  campoEdicao.style.background = "var(--cor-fundo-elemento)";
  campoEdicao.style.color = "var(--cor-texto-principal)";
  campoEdicao.style.border = "2px solid var(--cor-roxo-escuro)";
  campoEdicao.style.borderRadius = "4px";
  campoEdicao.style.padding = "4px 8px";
  campoEdicao.style.fontSize = "14px";
  campoEdicao.style.fontFamily = "inherit";
  campoEdicao.style.width = "100%";

  // PASSO 5: Esconder o texto original e mostrar o campo
  elementoTexto.style.display = "none";
  elementoTexto.parentNode.insertBefore(campoEdicao, elementoTexto);

  // PASSO 6: Focar no campo e selecionar todo o texto
  campoEdicao.focus();
  campoEdicao.select();

  // PASSO 7: Criar função para finalizar a edição
  function finalizarEdicao(salvar = true) {
    const novoTexto = campoEdicao.value.trim();

    if (salvar && novoTexto !== "" && novoTexto !== textoOriginal) {
      // SALVAR: O usuário quer salvar e o texto mudou
      console.log("Salvando novo texto:", novoTexto);
      listaDeTarefas[posicao].atividade = novoTexto;
      salvarDadosNoNavegador();
      mostrarTodasAsTarefas();
    } else {
      // CANCELAR: Voltar ao estado original
      console.log("Cancelando edição");
      campoEdicao.remove();
      elementoTexto.style.display = "";
    }
  }

  // PASSO 8: Adicionar eventos do teclado
  campoEdicao.addEventListener("keypress", function (evento) {
    if (evento.key === "Enter") {
      // ENTER: Salvar as mudanças
      console.log("Usuário pressionou Enter - salvando");
      evento.preventDefault();
      finalizarEdicao(true);
    }
  });

  campoEdicao.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      // ESC: Cancelar a edição
      console.log("Usuário pressionou Escape - cancelando");
      evento.preventDefault();
      finalizarEdicao(false);
    }
  });

  // PASSO 9: Salvar se clicar fora do campo
  campoEdicao.addEventListener("blur", function () {
    // Pequeno delay para evitar conflitos
    setTimeout(() => {
      console.log("Campo perdeu foco - salvando");
      finalizarEdicao(true);
    }, 100);
  });
}

/**
 * EDITAR TAREFA (Versão simples)
 * Função mais direta para editar uma tarefa
 *
 * @param {number} posicao - A posição da tarefa na lista
 * @param {string} novoTexto - O novo texto da tarefa
 */
function editarTarefa(posicao, novoTexto) {
  // VALIDAR: Verificar se a posição é válida
  if (posicao < 0 || posicao >= listaDeTarefas.length) {
    console.error("Posição inválida:", posicao);
    return;
  }

  // VALIDAR: Verificar se o texto não está vazio
  const textoLimpo = novoTexto.trim();
  if (textoLimpo === "") {
    console.error("Texto da tarefa não pode estar vazio");
    return;
  }

  // ATUALIZAR: Modificar a tarefa
  listaDeTarefas[posicao].atividade = textoLimpo;

  // SALVAR: Persistir no navegador
  salvarDadosNoNavegador();

  // ATUALIZAR: Redesenhar a lista
  mostrarTodasAsTarefas();
}

/**
 * MOSTRAR TODAS AS TAREFAS NA TELA
 * Esta é a função principal que atualiza a interface
 *
 * Como funciona:
 * 1. Limpa o conteúdo atual
 * 2. Se não há tarefas, mostra mensagem vazia
 * 3. Se há tarefas, cria um elemento para cada uma
 * 4. Adiciona eventos aos elementos criados
 */
function mostrarTodasAsTarefas() {
  // ENCONTRAR O CONTAINER
  // querySelector busca um elemento usando seletor CSS
  const containerTarefas = document.querySelector(".tarefas-box");

  // LIMPAR CONTEÚDO ANTERIOR
  // innerHTML = "" remove todo o conteúdo HTML interno
  containerTarefas.innerHTML = "";

  // VERIFICAR SE ESTÁ VAZIO
  if (listaDeTarefas.length === 0) {
    mostrarMensagemListaVazia();
    return; // return para o função aqui (não executa o resto)
  }

  // CRIAR ELEMENTO PARA CADA TAREFA
  // forEach percorre cada item do array
  listaDeTarefas.forEach((tarefa, posicao) => {
    // CRIAR DIV DA TAREFA
    const divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");

    // DEFINIR CONTEÚDO HTML
    divTarefa.innerHTML = criarHTMLDaTarefa(tarefa, posicao);

    // ADICIONAR AO CONTAINER
    containerTarefas.appendChild(divTarefa);

    // CONFIGURAR EVENTOS
    configurarEventosDaTarefa(posicao);
  });
}

/**
 * ATUALIZAR CONTADORES
 * Atualiza os números mostrados na interface
 * (quantas tarefas criadas e quantas concluídas)
 *
 * Como funciona:
 * 1. Conta tarefas completas usando filter
 * 2. Atualiza os elementos HTML com os novos números
 */
function atualizarContadores() {
  // ENCONTRAR OS ELEMENTOS DOS CONTADORES
  const elementoContadorCompletas = document.getElementById(
    "contador-concluidas"
  );
  const elementoContadorCriadas = document.getElementById("contador-criadas");

  // CALCULAR QUANTIDADES
  // filter cria um novo array só com elementos que atendem a condição
  const quantidadeCompletas = listaDeTarefas.filter(
    (tarefa) => tarefa.completa
  ).length;

  const quantidadeTotal = listaDeTarefas.length;

  // ATUALIZAR TEXTOS
  // innerText muda o texto de um elemento HTML
  elementoContadorCriadas.innerText = `${quantidadeTotal}`;
  elementoContadorCompletas.innerText = `${quantidadeCompletas} de ${quantidadeTotal}`;
}

// ========== EVENTOS DA INTERFACE ==========

/**
 * FUNÇÃO EXECUTADA AO CLICAR NO BOTÃO
 * Chamada quando o usuário clica em "Criar"
 *
 * @param {Event} evento - O evento de clique (não usamos aqui)
 *
 * Como funciona:
 * 1. Pega o texto digitado
 * 2. Remove espaços extras
 * 3. Se não está vazio, cria a tarefa
 * 4. Limpa o campo de entrada
 */
function aoClicarBotaoCriar(evento) {
  // PEGAR TEXTO DIGITADO
  const campoTexto = document.getElementById("todo-input");
  const textoDigitado = campoTexto.value.trim(); // trim() remove espaços extras

  // VERIFICAR SE NÃO ESTÁ VAZIO
  if (textoDigitado !== "") {
    // CRIAR A TAREFA
    criarNovaTarefa(textoDigitado);

    // LIMPAR O CAMPO
    campoTexto.value = "";
  }
}

// ========== INTERFACE DE ESTADO VAZIO ==========

/**
 * GERAR ÍCONE DE LISTA VAZIA
 * Retorna o código SVG do ícone de clipboard vazio
 *
 * @returns {string} O HTML do ícone SVG
 */
function gerarIconeListaVazia() {
  return `
    <svg width="56" height="56" fill="currentColor" viewBox="0 0 256 256">
      <line x1="96" y1="152" x2="160" y2="152" stroke="currentColor" stroke-width="16"></line>
      <line x1="96" y1="120" x2="160" y2="120" stroke="currentColor" stroke-width="16"></line>
      <path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" stroke="currentColor" stroke-width="16"></path>
      <path d="M88,72V64a40,40,0,0,1,80,0v8Z" stroke="currentColor" stroke-width="16"></path>
    </svg>`;
}

/**
 * MOSTRAR MENSAGEM DE LISTA VAZIA
 * Exibe uma mensagem quando não há tarefas
 * Melhora a experiência do usuário
 */
function mostrarMensagemListaVazia() {
  const containerTarefas = document.querySelector(".tarefas-box");

  // CRIAR HTML DA MENSAGEM
  containerTarefas.innerHTML = `
    <div class="tarefas-empty">
      ${gerarIconeListaVazia()}
      <span>Você ainda não tem tarefas cadastradas</span>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>`;
}

// ========== PERSISTÊNCIA DE DADOS ==========

/**
 * SALVAR DADOS NO NAVEGADOR
 * Salva a lista de tarefas no localStorage do navegador
 *
 * Como funciona:
 * 1. Converte o array para texto JSON
 * 2. Salva no localStorage
 * 3. Trata erros se algo der errado
 *
 * localStorage: armazenamento local do navegador
 * JSON: formato de texto para dados estruturados
 */
function salvarDadosNoNavegador() {
  try {
    // CONVERTER PARA JSON E SALVAR
    // JSON.stringify converte objetos/arrays para texto
    const textoJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", textoJson);
  } catch (erro) {
    // SE DER ERRO, MOSTRA NO CONSOLE
    console.error("Erro ao salvar tarefas:", erro);
  }
}

/**
 * CARREGAR DADOS DO NAVEGADOR
 * Recupera a lista de tarefas salva anteriormente
 *
 * Como funciona:
 * 1. Busca os dados salvos
 * 2. Se encontrar, converte de JSON para array
 * 3. Atualiza a interface
 * 4. Se der erro, inicia com lista vazia
 */
function carregarDadosDoNavegador() {
  try {
    // BUSCAR DADOS SALVOS
    const textoJson = localStorage.getItem("tarefas");

    // SE ENCONTROU DADOS
    if (textoJson) {
      // CONVERTER DE JSON PARA ARRAY
      // JSON.parse converte texto JSON para objetos/arrays
      listaDeTarefas = JSON.parse(textoJson);
    }

    // ATUALIZAR INTERFACE
    mostrarTodasAsTarefas();
    atualizarContadores();
  } catch (erro) {
    // SE DER ERRO, LISTA VAZIA
    console.error("Erro ao carregar tarefas:", erro);
    listaDeTarefas = [];
  }
}

// ========== CONFIGURAÇÃO INICIAL ==========

/**
 * CONFIGURAR EVENTOS DA INTERFACE
 * Adiciona os eventos aos botões e campos da página
 *
 * Como funciona:
 * 1. Encontra os elementos pelos IDs
 * 2. Adiciona eventos de clique e tecla
 * 3. Verifica se os elementos existem (segurança)
 */
function configurarEventos() {
  // EVENTO DO BOTÃO CRIAR
  const botaoCriar = document.getElementById("btn-criar");

  if (botaoCriar) {
    botaoCriar.addEventListener("click", aoClicarBotaoCriar);
  }

  // EVENTO DA TECLA ENTER NO CAMPO DE TEXTO
  const campoTexto = document.getElementById("todo-input");

  if (campoTexto) {
    campoTexto.addEventListener("keypress", function (evento) {
      // SE A TECLA FOR ENTER (código 'Enter')
      if (evento.key === "Enter") {
        aoClicarBotaoCriar(evento);
      }
    });
  }
}

/**
 * INICIAR APLICAÇÃO
 * Função principal que é executada quando a página carrega
 *
 * Como funciona:
 * 1. Configura todos os eventos
 * 2. Carrega dados salvos anteriormente
 *
 * Esta é a "porta de entrada" da nossa aplicação
 */
function iniciarAplicacao() {
  // PASSO 1: Configurar eventos da interface
  configurarEventos();

  // PASSO 2: Carregar dados salvos
  carregarDadosDoNavegador();
}

// ========== EXECUÇÃO AUTOMÁTICA ==========

/**
 * AGUARDAR CARREGAMENTO DA PÁGINA
 *
 * DOMContentLoaded: evento que dispara quando o HTML está pronto
 * Garantimos que todos os elementos existem antes de usar
 *
 * addEventListener no document (página inteira) escuta eventos globais
 */
document.addEventListener("DOMContentLoaded", iniciarAplicacao);

/* ========================================
   FIM DO ARQUIVO JAVASCRIPT
   
   RESUMO DO QUE APRENDEMOS:
   
   1. VARIÁVEIS E ARRAYS
      - let para variáveis que mudam
      - Arrays para listas de dados
      - Objetos para estruturas complexas
   
   2. FUNÇÕES
      - function para criar funções
      - Parâmetros para receber dados
      - return para retornar valores
   
   3. MANIPULAÇÃO DO DOM
      - document.querySelector para encontrar elementos
      - innerHTML para mudar conteúdo HTML
      - addEventListener para escutar eventos
   
   4. LÓGICA DE PROGRAMAÇÃO
      - if/else para condições
      - forEach para percorrer arrays
      - filter para filtrar dados
   
   5. PERSISTÊNCIA DE DADOS
      - localStorage para salvar no navegador
      - JSON para converter dados
      - try/catch para tratar erros
   
   6. EVENTOS
      - click para cliques
      - keypress para teclas
      - change para mudanças em campos
      - NOVO: dblclick para duplo clique
      - NOVO: mouseenter/mouseleave para hover
   
   7. BOAS PRÁTICAS
      - Funções pequenas e específicas
      - Nomes descritivos
      - Comentários explicativos
      - Tratamento de erros

   === NOVA FUNCIONALIDADE: EDIÇÃO DE TAREFAS ===
   
   🎯 Como usar:
   1. Clique DUAS VEZES no texto de qualquer tarefa
   2. Digite o novo texto
   3. Pressione ENTER para salvar ou ESC para cancelar
   
   🧠 O que aprendemos:
   - Como criar elementos HTML dinamicamente
   - Como substituir conteúdo temporariamente
   - Como capturar diferentes tipos de eventos
   - Como dar feedback visual ao usuário
   - Como validar dados de entrada
   
   🔧 Tecnologias usadas:
   - document.createElement() - criar elementos
   - element.style - modificar CSS via JavaScript
   - Event listeners múltiplos - vários tipos de evento
   - setTimeout() - atrasar execução
   - console.log() - debugar e acompanhar execução
   
   Esta funcionalidade mostra como uma aplicação
   pode evoluir adicionando recursos mais avançados
   mantendo a base sólida que já criamos!
======================================== */
