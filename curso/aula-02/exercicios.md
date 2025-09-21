# 📝 **EXERCÍCIOS - AULA 2: DOM E PRIMEIRAS INTERAÇÕES**

## 🎯 **Objetivo da Aula**

Compreender o DOM, aprender a selecionar e modificar elementos HTML com JavaScript, e implementar primeiras interações.

---

## 🌐 **Conceitos Fundamentais**

### **🧠 O que você precisa saber:**

* **DOM:** Document Object Model - representação em árvore do HTML
* **Seletores:** Formas de "encontrar" elementos na página
* **Propriedades:** textContent, innerHTML, style, classList
* **Eventos:** Reações a ações do usuário (cliques, digitação, etc.)

---

## 🧪 **Exercício 1: Explorando Seletores**

### **📋 Tarefa:**

Crie uma página HTML com diferentes elementos e pratique a seleção.

```html
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Exercício 1 - Seletores</title>
</head>

<body>
    <h1 id="titulo-principal">Meu Site</h1>
    <p class="paragrafo">Este é o primeiro parágrafo.</p>
    <p class="paragrafo">Este é o segundo parágrafo.</p>
    <div id="container">
        <button class="botao" data-acao="salvar">Salvar</button>
        <button class="botao" data-acao="cancelar">Cancelar</button>
    </div>

    <script>
        // SEU CÓDIGO AQUI:

        // 1. Selecione o título por ID
        const titulo = document.getElementById("titulo-principal");
        console.log("Título:", titulo.textContent);

        // 2. Selecione todos os parágrafos por classe
        const paragrafos = document.getElementsByClassName("paragrafo");
        console.log("Número de parágrafos:", paragrafos.length);

        // 3. Selecione o primeiro botão usando querySelector
        const primeiroBotao = document.querySelector(".botao");
        console.log("Primeiro botão:", primeiroBotao.textContent);

        // 4. Selecione todos os botões usando querySelectorAll
        const todosBotoes = document.querySelectorAll(".botao");
        todosBotoes.forEach((botao, index) => {
            console.log(`Botão ${index + 1}:`, botao.textContent);
        });

        // 5. Selecione botão por atributo data
        const botaoSalvar = document.querySelector('[data-acao="salvar"]');
        console.log("Botão salvar:", botaoSalvar.textContent);
    </script>
</body>

</html>
```

### **✅ Resultado Esperado:**

No console você deve ver:
* Título: "Meu Site"
* Número de parágrafos: 2
* Primeiro botão: "Salvar"
* Lista de todos os botões
* Botão salvar: "Salvar"

---

## 🧪 **Exercício 2: Modificando Conteúdo**

### **📋 Tarefa:**

Pratique mudança de conteúdo usando textContent e innerHTML.

```javascript
// HTML base para este exercício
/*
<div id="area-conteudo">
    <h2 id="subtitulo">Título Original</h2>
    <p id="descricao">Descrição original do conteúdo.</p>
    <div id="info-usuario"></div>
</div>
*/

// 1. Modificar texto simples
function mudarTitulo() {
    const subtitulo = document.getElementById("subtitulo");
    subtitulo.textContent = "Título Modificado via JavaScript!";
}

// 2. Modificar com HTML
function adicionarConteudoRico() {
    const descricao = document.getElementById("descricao");
    descricao.innerHTML = `
        <strong>Descrição melhorada</strong> com 
        <em>formatação HTML</em> e 
        <a href="#">links funcionais</a>!
    `;
}

// 3. Criar conteúdo dinâmico
function criarPerfilUsuario() {
    const infoUsuario = document.getElementById("info-usuario");

    const nomeUsuario = "João Silva";
    const idade = 28;
    const profissao = "Desenvolvedor";

    infoUsuario.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px;">
            <h3>Perfil do Usuário</h3>
            <p><strong>Nome:</strong> ${nomeUsuario}</p>
            <p><strong>Idade:</strong> ${idade} anos</p>
            <p><strong>Profissão:</strong> ${profissao}</p>
        </div>
    `;
}

// 4. Exercício: Crie uma função que muda o conteúdo baseado na hora
function atualizarSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();
    const subtitulo = document.getElementById("subtitulo");

    if (hora < 12) {
        subtitulo.textContent = "🌅 Bom dia! Hora de programar!";
    } else if (hora < 18) {
        subtitulo.textContent = "☀️ Boa tarde! Continue codando!";
    } else {
        subtitulo.textContent = "🌙 Boa noite! Estudando até tarde?";
    }
}

// Teste suas funções
mudarTitulo();
adicionarConteudoRico();
criarPerfilUsuario();
atualizarSaudacao();
```

### **💡 Desafio Extra:**

Crie uma função que gera uma lista de tarefas aleatórias:

```javascript
function gerarListaTarefas() {
    const tarefas = [
        "Estudar JavaScript",
        "Fazer exercícios de DOM",
        "Criar um projeto pessoal",
        "Revisar conceitos de HTML",
        "Praticar CSS Grid"
    ];

    const container = document.getElementById("info-usuario");
    let listaHTML = "<h3>📋 Tarefas do Dia</h3><ul>";

    // Embaralhar e pegar 3 tarefas aleatórias
    const tarefasAleatorias = tarefas.sort(() => 0.5 - Math.random()).slice(0, 3);

    tarefasAleatorias.forEach(tarefa => {
        listaHTML += `<li>${tarefa}</li>`;
    });

    listaHTML += "</ul>";
    container.innerHTML = listaHTML;
}
```

---

## 🧪 **Exercício 3: Manipulando Estilos**

### **📋 Tarefa:**

Aprenda a modificar a aparência dos elementos dinamicamente.

```javascript
// HTML base
/*
<div id="caixa-demo" style="padding: 20px; margin: 10px; border: 1px solid #ccc;">
    Caixa para modificar estilos
</div>
<div class="botoes-controle">
    <button onclick="mudarCor()">Mudar Cor</button>
    <button onclick="mudarTamanho()">Mudar Tamanho</button>
    <button onclick="adicionarBorda()">Adicionar Borda</button>
    <button onclick="toggleDestaque()">Toggle Destaque</button>
</div>
*/

// 1. Modificar cor de fundo
function mudarCor() {
    const caixa = document.getElementById("caixa-demo");
    const cores = ["#ffeb3b", "#4caf50", "#2196f3", "#ff9800", "#e91e63"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    caixa.style.backgroundColor = corAleatoria;
    console.log(`Cor alterada para: ${corAleatoria}`);
}

// 2. Modificar tamanho da fonte
function mudarTamanho() {
    const caixa = document.getElementById("caixa-demo");
    const tamanhoAtual = window.getComputedStyle(caixa).fontSize;
    const novoTamanho = parseInt(tamanhoAtual) + 2;

    caixa.style.fontSize = novoTamanho + "px";
    console.log(`Fonte alterada para: ${novoTamanho}px`);
}

// 3. Modificar bordas
function adicionarBorda() {
    const caixa = document.getElementById("caixa-demo");
    const estilosBorda = [
        "3px solid #f44336",
        "5px dashed #9c27b0",
        "2px dotted #3f51b5",
        "4px double #009688"
    ];

    const bordaAleatoria = estilosBorda[Math.floor(Math.random() * estilosBorda.length)];
    caixa.style.border = bordaAleatoria;
    console.log(`Borda alterada para: ${bordaAleatoria}`);
}

// 4. Trabalhar com classes CSS
function toggleDestaque() {
    const caixa = document.getElementById("caixa-demo");
    caixa.classList.toggle("destaque");

    if (caixa.classList.contains("destaque")) {
        console.log("Classe 'destaque' adicionada");
    } else {
        console.log("Classe 'destaque' removida");
    }
}

// CSS que você deve adicionar no <style>
/*
.destaque {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    font-weight: bold;
    transform: scale(1.05);
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
*/
```

### **🎯 Exercício Avançado:**

Crie um sistema de temas:

```javascript
function aplicarTema(nomeTema) {
    const caixa = document.getElementById("caixa-demo");

    // Remover classes de tema existentes
    caixa.classList.remove("tema-escuro", "tema-neon", "tema-natural");

    // Aplicar novo tema
    if (nomeTema) {
        caixa.classList.add(`tema-${nomeTema}`);
    }

    console.log(`Tema aplicado: ${nomeTema || "padrão"}`);
}

// Adicione estes estilos CSS:
/*
.tema-escuro {
    background-color: #2c3e50;
    color: #ecf0f1;
    border: 2px solid #34495e;
}

.tema-neon {
    background-color: #0a0a0a;
    color: #00ff00;
    border: 2px solid #ff00ff;
    text-shadow: 0 0 10px #00ff00;
    box-shadow: 0 0 20px #ff00ff;
}

.tema-natural {
    background-color: #8bc34a;
    color: #2e7d32;
    border: 2px solid #689f38;
}
*/
```

---

## 🧪 **Exercício 4: Primeiros Eventos**

### **📋 Tarefa:**

Implemente interações básicas usando addEventListener.

```javascript
// HTML base
/*
<div id="area-interacao">
    <h3>🎮 Área de Interação</h3>
    <button id="botao-clique">Clique em mim!</button>
    <p id="contador-cliques">Cliques: 0</p>
    
    <input type="text" id="campo-texto" placeholder="Digite algo...">
    <p id="texto-digitado">Você digitou: </p>
    
    <div id="caixa-hover" style="width: 200px; height: 100px; background: #eee; margin: 10px;">
        Passe o mouse aqui
    </div>
</div>
*/

// 1. Contador de cliques
let totalCliques = 0;

function configurarContadorCliques() {
    const botao = document.getElementById("botao-clique");
    const contadorDisplay = document.getElementById("contador-cliques");

    botao.addEventListener("click", function() {
        totalCliques++;
        contadorDisplay.textContent = `Cliques: ${totalCliques}`;

        // Mudar texto do botão baseado no número de cliques
        if (totalCliques === 1) {
            botao.textContent = "Clique novamente!";
        } else if (totalCliques === 5) {
            botao.textContent = "Você está clicando muito!";
        } else if (totalCliques === 10) {
            botao.textContent = "Parabéns! 10 cliques!";
            botao.style.backgroundColor = "#4caf50";
            botao.style.color = "white";
        }

        console.log(`Clique registrado! Total: ${totalCliques}`);
    });
}

// 2. Capturar texto digitado
function configurarCampoTexto() {
    const campo = document.getElementById("campo-texto");
    const display = document.getElementById("texto-digitado");

    campo.addEventListener("input", function() {
        const textoDigitado = campo.value;
        display.textContent = `Você digitou: ${textoDigitado}`;

        // Mudar cor baseado no comprimento
        if (textoDigitado.length > 10) {
            display.style.color = "#4caf50";
            display.textContent += " (texto longo!)";
        } else {
            display.style.color = "#333";
        }
    });

    // Evento quando pressiona Enter
    campo.addEventListener("keypress", function(evento) {
        if (evento.key === "Enter") {
            alert(`Você pressionou Enter! Texto: "${campo.value}"`);
        }
    });
}

// 3. Eventos de mouse
function configurarEventosMouse() {
    const caixa = document.getElementById("caixa-hover");

    caixa.addEventListener("mouseenter", function() {
        caixa.style.backgroundColor = "#ffeb3b";
        caixa.textContent = "Mouse está aqui! 🐭";
        console.log("Mouse entrou na caixa");
    });

    caixa.addEventListener("mouseleave", function() {
        caixa.style.backgroundColor = "#eee";
        caixa.textContent = "Passe o mouse aqui";
        console.log("Mouse saiu da caixa");
    });

    caixa.addEventListener("click", function() {
        const cores = ["#f44336", "#e91e63", "#9c27b0", "#673ab7"];
        const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

        caixa.style.backgroundColor = corAleatoria;
        caixa.style.color = "white";
        caixa.textContent = "Clicado! 🎉";

        setTimeout(() => {
            caixa.style.backgroundColor = "#eee";
            caixa.style.color = "#333";
            caixa.textContent = "Passe o mouse aqui";
        }, 1000);
    });
}

// Inicializar todos os eventos
function inicializarEventos() {
    configurarContadorCliques();
    configurarCampoTexto();
    configurarEventosMouse();

    console.log("✅ Todos os eventos configurados!");
}

// Chamar quando a página carregar
document.addEventListener("DOMContentLoaded", inicializarEventos);
```

### **💡 Desafio Extra:**

Crie um jogo simples de "acerte a cor":

```javascript
function jogoAcerteCor() {
    const cores = ["vermelho", "azul", "verde", "amarelo", "roxo"];
    const corEscolhida = cores[Math.floor(Math.random() * cores.length)];

    const caixaJogo = document.getElementById("caixa-hover");
    caixaJogo.innerHTML = `
        <h4>🎯 Acerte a Cor!</h4>
        <p>Qual cor estou pensando?</p>
        <select id="selecao-cor">
            ${cores.map(cor => `<option value="${cor}">${cor}</option>`).join('')}
        </select>
        <button onclick="verificarResposta('${corEscolhida}')">Verificar</button>
    `;
}

function verificarResposta(corCorreta) {
    const selecao = document.getElementById("selecao-cor").value;
    const caixaJogo = document.getElementById("caixa-hover");

    if (selecao === corCorreta) {
        caixaJogo.innerHTML = "<h3>🎉 Acertou!</h3>";
        caixaJogo.style.backgroundColor = "#4caf50";
    } else {
        caixaJogo.innerHTML = `<h3>❌ Errou!</h3><p>Era ${corCorreta}</p>`;
        caixaJogo.style.backgroundColor = "#f44336";
    }

    setTimeout(() => {
        jogoAcerteCor();
    }, 2000);
}
```

---

## 🧪 **Exercício 5: Mini TODO List**

### **📋 Tarefa:**

Crie uma versão simplificada do TODO List usando os conceitos aprendidos.

```html
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Mini TODO List - Aula 2</title>
    <style>
        .tarefa {
            background: #f0f0f0;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tarefa.completa {
            background: #d4edda;
            text-decoration: line-through;
            opacity: 0.7;
        }

        .botao-deletar {
            background: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }

        .contador {
            background: #007bff;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            text-align: center;
        }
    </style>
</head>

<body>
    <h1>📝 Mini TODO List</h1>

    <div>
        <input type="text" id="nova-tarefa" placeholder="Digite uma nova tarefa...">
        <button onclick="adicionarTarefa()">Adicionar</button>
    </div>

    <div id="contador" class="contador">
        Total: 0 | Pendentes: 0 | Completas: 0
    </div>

    <div id="lista-tarefas">
        <!-- Tarefas aparecerão aqui -->
    </div>

    <script>
        // Array para armazenar as tarefas
        let tarefas = [];
        let proximoId = 1;

        function adicionarTarefa() {
            const input = document.getElementById("nova-tarefa");
            const texto = input.value.trim();

            if (texto === "") {
                alert("Digite uma tarefa válida!");
                return;
            }

            // Criar objeto da tarefa
            const novaTarefa = {
                id: proximoId++,
                texto: texto,
                completa: false
            };

            // Adicionar ao array
            tarefas.push(novaTarefa);

            // Limpar input
            input.value = "";

            // Atualizar interface
            renderizarTarefas();
            atualizarContador();

            console.log("Tarefa adicionada:", novaTarefa);
        }

        function renderizarTarefas() {
            const lista = document.getElementById("lista-tarefas");
            lista.innerHTML = "";

            tarefas.forEach(tarefa => {
                const divTarefa = document.createElement("div");
                divTarefa.className = `tarefa ${tarefa.completa ? 'completa' : ''}`;

                divTarefa.innerHTML = `
                    <span onclick="toggleTarefa(${tarefa.id})">${tarefa.texto}</span>
                    <button class="botao-deletar" onclick="deletarTarefa(${tarefa.id})">
                        Deletar
                    </button>
                `;

                lista.appendChild(divTarefa);
            });
        }

        function toggleTarefa(id) {
            const tarefa = tarefas.find(t => t.id === id);
            if (tarefa) {
                tarefa.completa = !tarefa.completa;
                renderizarTarefas();
                atualizarContador();
                console.log(`Tarefa ${id} ${tarefa.completa ? 'completada' : 'reativada'}`);
            }
        }

        function deletarTarefa(id) {
            const index = tarefas.findIndex(t => t.id === id);
            if (index > -1) {
                const tarefaRemovida = tarefas.splice(index, 1)[0];
                renderizarTarefas();
                atualizarContador();
                console.log("Tarefa removida:", tarefaRemovida);
            }
        }

        function atualizarContador() {
            const total = tarefas.length;
            const completas = tarefas.filter(t => t.completa).length;
            const pendentes = total - completas;

            const contador = document.getElementById("contador");
            contador.textContent = `Total: ${total} | Pendentes: ${pendentes} | Completas: ${completas}`;
        }

        // Permitir adicionar tarefa com Enter
        document.getElementById("nova-tarefa").addEventListener("keypress", function(evento) {
            if (evento.key === "Enter") {
                adicionarTarefa();
            }
        });

        // Inicialização
        document.addEventListener("DOMContentLoaded", function() {
            console.log("Mini TODO List carregado!");
            atualizarContador();
        });
    </script>
</body>

</html>
```

### **✅ Funcionalidades Implementadas:**

* ✅ Adicionar tarefas
* ✅ Marcar como completa (clique no texto)
* ✅ Deletar tarefas
* ✅ Contador de tarefas
* ✅ Adicionar com Enter
* ✅ Visual diferenciado para completas

---

## 🏠 **Para Casa**

### **📚 Estudo Adicional:**

1. **Pesquise sobre:** Diferentes tipos de eventos (focus, blur, change)
2. **Leia sobre:** Propriedades do objeto Event
3. **Explore:** Métodos avançados de manipulação do DOM

### **💻 Prática Extra:**

1. **Melhore o Mini TODO List:**
   - Adicione edição de tarefas
   - Implemente categorias
   - Crie filtros (todas, pendentes, completas)

2. **Crie um projeto novo:**
   - Calculadora simples
   - Galeria de imagens
   - Formulário interativo

### **🎯 Experimente:**

```javascript
// Desafio: Crie um elemento que muda de cor a cada segundo
function criarElementoPiscante() {
    const div = document.createElement("div");
    div.textContent = "Elemento Piscante";
    div.style.padding = "20px";
    div.style.textAlign = "center";
    document.body.appendChild(div);

    const cores = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    let indice = 0;

    setInterval(() => {
        div.style.backgroundColor = cores[indice];
        indice = (indice + 1) % cores.length;
    }, 1000);
}
```

---

## 🎯 **Checklist da Aula**

Marque o que você conseguiu fazer:

* [ ] Entendi o conceito de DOM como árvore
* [ ] Usei getElementById para selecionar elementos
* [ ] Pratiquei querySelector e querySelectorAll
* [ ] Modifiquei textContent de elementos
* [ ] Usei innerHTML para adicionar HTML
* [ ] Mudei estilos usando style.propriedade
* [ ] Trabalhei com classList (add, remove, toggle)
* [ ] Implementei addEventListener para clicks
* [ ] Capturei eventos de teclado (keypress)
* [ ] Criei interações com mouse (mouseenter, mouseleave)
* [ ] Construí um Mini TODO List funcional

### **🏆 Meta da Aula:**

Marcar pelo menos 9 itens da checklist!

---

## ❓ **Dúvidas Frequentes**

### **Q: Qual a diferença entre textContent e innerHTML?**

**R:** `textContent` altera apenas o texto, `innerHTML` pode incluir tags HTML. Use innerHTML com cuidado para evitar problemas de segurança.

### **Q: Por que usar addEventListener em vez de onclick?**

**R:** `addEventListener` é mais flexível, permite múltiplos listeners no mesmo evento e é a forma moderna recomendada.

### **Q: Como saber se um elemento foi encontrado?**

**R:** Verifique se não é `null` : `if (elemento !== null) { /* elemento existe */ }`

### **Q: Posso selecionar elementos que ainda não existem?**

**R:** Não. O elemento deve existir no DOM no momento da seleção. Use `DOMContentLoaded` para garantir que a página carregou.

---

**🎉 Parabéns por completar a Aula 2! Na próxima aula veremos eventos mais avançados e interatividade complexa!**
