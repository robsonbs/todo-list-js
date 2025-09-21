/* ========================================
   AULA 2: DOM E PRIMEIRAS INTERAÇÕES
   CÓDIGO PROGRESSIVO PARA CONSTRUIR EM AULA
   
   Este arquivo será construído PASSO A PASSO
   durante a aula, junto com os alunos.
======================================== */

// ========== PASSO 1: SELECIONANDO ELEMENTOS ==========

console.log("🎯 PASSO 1: Aprendendo a selecionar elementos");

// Quando a página carregar, vamos praticar seleções
document.addEventListener("DOMContentLoaded", function () {
  // 1.1 Seleção por ID (elemento único)
  const tituloPrincipal = document.getElementById("titulo-principal");
  console.log("Título encontrado:", tituloPrincipal);

  // 1.2 Seleção por classe (pode ter vários elementos)
  const botoesClasse = document.getElementsByClassName("botao");
  console.log("Botões por classe:", botoesClasse.length);

  // 1.3 Seleção moderna com querySelector (CSS selector)
  const primeiroBotao = document.querySelector(".botao");
  console.log("Primeiro botão:", primeiroBotao);

  // 1.4 Seleção de múltiplos elementos
  const todosBotoes = document.querySelectorAll(".botao");
  console.log("Todos os botões:", todosBotoes.length);

  // 1.5 Seletores mais específicos
  const botaoPorAtributo = document.querySelector('[data-acao="salvar"]');
  console.log("Botão por atributo:", botaoPorAtributo);
});

// ========== PASSO 2: MODIFICANDO CONTEÚDO ==========

console.log("✏️ PASSO 2: Modificando conteúdo dos elementos");

// 2.1 Função para mudar texto simples
function demonstrarTextContent() {
  // Selecionar elemento
  const titulo = document.getElementById("titulo-demonstracao");

  // Verificar se existe (boa prática)
  if (titulo) {
    // Mudar apenas o texto
    titulo.textContent = "Texto alterado com JavaScript!";
    console.log("✅ Texto alterado com textContent");
  } else {
    console.log("❌ Elemento não encontrado!");
  }
}

// 2.2 Função para mudar conteúdo HTML
function demonstrarInnerHTML() {
  const container = document.getElementById("container-html");

  if (container) {
    // Inserir HTML formatado
    container.innerHTML = `
            <h3>Conteúdo criado com innerHTML</h3>
            <p>Posso incluir <strong>formatação</strong> e <em>estilos</em>!</p>
            <ul>
                <li>Item da lista</li>
                <li>Outro item</li>
            </ul>
        `;
    console.log("✅ HTML inserido com innerHTML");
  }
}

// 2.3 Função para modificar atributos
function demonstrarAtributos() {
  const imagem = document.getElementById("imagem-exemplo");

  if (imagem) {
    // Mudar atributos
    imagem.setAttribute("alt", "Nova descrição da imagem");
    imagem.setAttribute("title", "Imagem modificada via JS");

    // Usar propriedades diretas
    imagem.id = "imagem-modificada";

    console.log("✅ Atributos modificados");
  }
}

// ========== PASSO 3: MODIFICANDO ESTILOS ==========

console.log("🎨 PASSO 3: Modificando estilos e aparência");

// 3.1 Modificar estilos diretamente
function mudarEstilosDiretos() {
  const caixa = document.getElementById("caixa-estilo");

  if (caixa) {
    // Mudar propriedades CSS uma por vez
    caixa.style.backgroundColor = "#4CAF50";
    caixa.style.color = "white";
    caixa.style.padding = "20px";
    caixa.style.borderRadius = "10px";
    caixa.style.textAlign = "center";

    console.log("✅ Estilos aplicados diretamente");
  }
}

// 3.2 Trabalhar com classes CSS (RECOMENDADO)
function demonstrarClasses() {
  const elemento = document.getElementById("elemento-classes");

  if (elemento) {
    // Adicionar classe
    elemento.classList.add("destaque");
    console.log("Classe 'destaque' adicionada");

    // Após 2 segundos, alternar classe
    setTimeout(() => {
      elemento.classList.toggle("ativo");
      console.log("Classe 'ativo' alternada");
    }, 2000);

    // Após 4 segundos, remover classe
    setTimeout(() => {
      elemento.classList.remove("destaque");
      console.log("Classe 'destaque' removida");
    }, 4000);
  }
}

// 3.3 Função para alternar temas
function alternarTema() {
  const body = document.body;

  // Verificar tema atual
  if (body.classList.contains("tema-escuro")) {
    body.classList.remove("tema-escuro");
    body.classList.add("tema-claro");
    console.log("🌞 Tema claro ativado");
  } else {
    body.classList.remove("tema-claro");
    body.classList.add("tema-escuro");
    console.log("🌙 Tema escuro ativado");
  }
}

// ========== PASSO 4: PRIMEIROS EVENTOS ==========

console.log("🖱️ PASSO 4: Implementando eventos básicos");

// 4.1 Configurar evento de clique simples
function configurarEventoClique() {
  const botaoClique = document.getElementById("botao-clique");

  if (botaoClique) {
    // Adicionar event listener
    botaoClique.addEventListener("click", function () {
      console.log("🎉 Botão foi clicado!");

      // Mudar texto do botão
      this.textContent = "Clicado!";

      // Voltar ao texto original após 1 segundo
      setTimeout(() => {
        this.textContent = "Clique em mim!";
      }, 1000);
    });

    console.log("✅ Evento de clique configurado");
  }
}

// 4.2 Contador de cliques mais avançado
let contadorCliques = 0;

function configurarContador() {
  const botaoContador = document.getElementById("botao-contador");
  const displayContador = document.getElementById("display-contador");

  if (botaoContador && displayContador) {
    botaoContador.addEventListener("click", function () {
      contadorCliques++;

      // Atualizar display
      displayContador.textContent = contadorCliques;

      // Mudanças baseadas no número de cliques
      if (contadorCliques === 1) {
        this.textContent = "Continue clicando!";
      } else if (contadorCliques === 5) {
        this.style.backgroundColor = "#FF9800";
        this.textContent = "5 cliques!";
      } else if (contadorCliques === 10) {
        this.style.backgroundColor = "#4CAF50";
        this.textContent = "10 cliques! 🎉";
      }

      console.log(`Clique número: ${contadorCliques}`);
    });
  }
}

// 4.3 Eventos de teclado
function configurarEventosTeclado() {
  const campoTexto = document.getElementById("campo-texto");
  const displayTexto = document.getElementById("display-texto");

  if (campoTexto && displayTexto) {
    // Evento enquanto digita
    campoTexto.addEventListener("input", function () {
      const texto = this.value;
      displayTexto.textContent = `Você digitou: ${texto}`;

      // Mudar cor baseado no comprimento
      if (texto.length > 10) {
        displayTexto.style.color = "#4CAF50";
      } else {
        displayTexto.style.color = "#333";
      }
    });

    // Evento quando pressiona Enter
    campoTexto.addEventListener("keypress", function (evento) {
      if (evento.key === "Enter") {
        alert(`Você pressionou Enter! Texto: "${this.value}"`);
      }
    });
  }
}

// 4.4 Eventos de mouse
function configurarEventosMouse() {
  const caixaMouse = document.getElementById("caixa-mouse");

  if (caixaMouse) {
    // Mouse entra
    caixaMouse.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#2196F3";
      this.style.color = "white";
      this.textContent = "Mouse está aqui! 🐭";
    });

    // Mouse sai
    caixaMouse.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#f0f0f0";
      this.style.color = "#333";
      this.textContent = "Passe o mouse aqui";
    });

    // Clique
    caixaMouse.addEventListener("click", function () {
      const cores = ["#F44336", "#E91E63", "#9C27B0", "#673AB7"];
      const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

      this.style.backgroundColor = corAleatoria;
      this.textContent = "Clicado! 🎉";
    });
  }
}

// ========== PASSO 5: MINI PROJETO - LISTA INTERATIVA ==========

console.log("📋 PASSO 5: Criando lista interativa");

// 5.1 Array para armazenar itens da lista
let itensLista = ["Item 1", "Item 2", "Item 3"];

// 5.2 Função para renderizar a lista
function renderizarLista() {
  const containerLista = document.getElementById("lista-interativa");

  if (containerLista) {
    // Limpar container
    containerLista.innerHTML = "";

    // Criar elementos para cada item
    itensLista.forEach((item, index) => {
      const divItem = document.createElement("div");
      divItem.className = "item-lista";
      divItem.innerHTML = `
                <span>${item}</span>
                <button onclick="removerItem(${index})">Remover</button>
            `;

      containerLista.appendChild(divItem);
    });

    console.log(`Lista renderizada com ${itensLista.length} itens`);
  }
}

// 5.3 Função para adicionar item
function adicionarItem() {
  const input = document.getElementById("novo-item");

  if (input) {
    const novoItem = input.value.trim();

    if (novoItem !== "") {
      itensLista.push(novoItem);
      input.value = "";
      renderizarLista();

      console.log(`Item adicionado: ${novoItem}`);
    } else {
      alert("Digite um item válido!");
    }
  }
}

// 5.4 Função para remover item
function removerItem(index) {
  const itemRemovido = itensLista.splice(index, 1)[0];
  renderizarLista();

  console.log(`Item removido: ${itemRemovido}`);
}

// 5.5 Configurar eventos da lista
function configurarListaInterativa() {
  const botaoAdicionar = document.getElementById("botao-adicionar");
  const inputNovoItem = document.getElementById("novo-item");

  if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click", adicionarItem);
  }

  if (inputNovoItem) {
    // Permitir adicionar com Enter
    inputNovoItem.addEventListener("keypress", function (evento) {
      if (evento.key === "Enter") {
        adicionarItem();
      }
    });
  }

  // Renderizar lista inicial
  renderizarLista();
}

// ========== INICIALIZAÇÃO GERAL ==========

// Função principal que executa quando a página carrega
function inicializarAula2() {
  console.log("🚀 Iniciando Aula 2: DOM e Primeiras Interações");

  // Configurar todos os eventos e demonstrações
  configurarEventoClique();
  configurarContador();
  configurarEventosTeclado();
  configurarEventosMouse();
  configurarListaInterativa();

  console.log("✅ Aula 2 inicializada com sucesso!");
  console.log("💡 Dica: Abra o console e teste as funções!");
}

// Executar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", inicializarAula2);

// ========== FUNÇÕES PARA DEMONSTRAÇÃO EM AULA ==========

// Função que o professor pode usar para mostrar a estrutura DOM
function mostrarEstruturaDom() {
  console.log("🌳 ESTRUTURA DO DOM:");
  console.log("document");
  console.log("├── html");
  console.log("│   ├── head");
  console.log("│   │   ├── title");
  console.log("│   │   └── style");
  console.log("│   └── body");
  console.log("│       ├── elementos diversos");
  console.log("│       └── script");

  // Mostrar alguns elementos encontrados na página
  const todosElementos = document.querySelectorAll("*");
  console.log(`Total de elementos na página: ${todosElementos.length}`);
}

// Função para testar todos os seletores
function testarSeletores() {
  console.log("🎯 TESTANDO SELETORES:");

  // Por ID
  const porId = document.getElementById("titulo-principal");
  console.log("Por ID:", porId ? "✅ Encontrado" : "❌ Não encontrado");

  // Por classe
  const porClasse = document.getElementsByClassName("botao");
  console.log(`Por classe: ${porClasse.length} elementos encontrados`);

  // Query selector
  const querySelector = document.querySelector(".botao");
  console.log(
    "Query selector:",
    querySelector ? "✅ Encontrado" : "❌ Não encontrado"
  );

  // Query selector all
  const querySelectorAll = document.querySelectorAll("button");
  console.log(
    `Query selector all: ${querySelectorAll.length} botões encontrados`
  );
}

// Função para demonstrar diferença entre textContent e innerHTML
function demonstrarDiferenca() {
  const elemento = document.getElementById("demo-diferenca");

  if (elemento) {
    console.log("📝 DEMONSTRANDO textContent vs innerHTML:");

    // textContent
    elemento.textContent = "<strong>Texto com tags</strong>";
    console.log("Com textContent:", elemento.textContent);

    setTimeout(() => {
      // innerHTML
      elemento.innerHTML = "<strong>Texto com tags</strong>";
      console.log("Com innerHTML:", elemento.innerHTML);
    }, 2000);
  }
}

// Mensagem de boas-vindas para os alunos
console.log("🎓 BEM-VINDOS À AULA 2!");
console.log("📚 Hoje aprenderemos:");
console.log("  • Como selecionar elementos HTML");
console.log("  • Como modificar conteúdo e estilos");
console.log("  • Como reagir a eventos do usuário");
console.log("  • Como criar interações básicas");
console.log("💡 Dica: Use o console para experimentar!");

// ========== EXERCÍCIOS PARA OS ALUNOS ==========

/*
EXERCÍCIOS PARA PRATICAR:

1. Selecione um elemento por ID e mude seu texto
2. Selecione todos os botões e mude suas cores
3. Crie um contador que aumenta a cada clique
4. Faça um campo de texto que mostra o que você digita
5. Crie uma caixa que muda de cor quando você passa o mouse

DESAFIO EXTRA:
Crie uma calculadora simples que soma dois números
quando você clica em um botão!
*/
