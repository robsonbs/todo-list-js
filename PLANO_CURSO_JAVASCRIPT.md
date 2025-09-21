# 🎓 **CURSO: APRENDENDO JAVASCRIPT ATRAVÉS DO TODO LIST**

## 📋 **Informações Gerais**

* **⏱️ Duração:** 8 aulas de 50 minutos cada
* **🎯 Público-alvo:** Iniciantes em programação web
* **📚 Pré-requisitos:** Conhecimentos básicos de HTML e CSS
* **🏗️ Projeto Final:** Lista de Tarefas funcional com JavaScript
* **🌐 Branch:** `learn/javascript`

---

## 🎯 **Objetivos do Curso**

### **🎓 Gerais:**

* Compreender os fundamentos do JavaScript moderno
* Aplicar conceitos através de um projeto prático
* Desenvolver lógica de programação
* Criar interfaces interativas

### **🔧 Específicos:**

* Manipular o DOM (Document Object Model)
* Trabalhar com eventos do usuário
* Gerenciar dados com arrays e objetos
* Implementar persistência de dados (localStorage)
* Aplicar boas práticas de código

---

## 📅 **CRONOGRAMA DETALHADO**

### **📚 AULA 1: Fundamentos e Estrutura (50min)**

**Tema:** "Primeiros Passos no JavaScript"

#### **🎯 Objetivos:**

* Entender o que é JavaScript e sua função
* Conhecer variáveis, tipos de dados e operadores
* Configurar o ambiente de desenvolvimento

#### **📋 Conteúdo:**

1. **Introdução ao JavaScript (10min)**
   - O que é JavaScript?
   - Onde e como é usado?
   - JavaScript vs HTML vs CSS

2. **Configuração do Ambiente (10min)**
   - Estrutura de arquivos
   - Ligando HTML, CSS e JS
   - Console do navegador

3. **Variáveis e Tipos de Dados (15min)**
   

```javascript
   // Variáveis básicas
   let nome = "João";
   let idade = 25;
   let ativo = true;

   // Arrays (listas)
   let tarefas = ["Estudar", "Trabalhar", "Exercitar"];

   // Objetos
   let tarefa = {
       texto: "Aprender JavaScript",
       completa: false
   };
```

4. **Primeira Interação (10min)**
   

```javascript
   // Primeira função simples
   function mostrarMensagem() {
       alert("Olá, JavaScript!");
   }
```

5. **Exercício Prático (5min)**
   - Criar variáveis para nome e sobrenome
   - Juntar em uma saudação
   - Mostrar no console

#### **🏠 Para Casa:**

* Ler sobre tipos de dados em JavaScript
* Experimentar no console do navegador

---

### **📚 AULA 2: DOM e Primeiras Interações (50min)**

**Tema:** "Conectando JavaScript com HTML"

#### **🎯 Objetivos:**

* Entender o conceito de DOM
* Selecionar elementos HTML com JavaScript
* Modificar conteúdo e estilos

#### **📋 Conteúdo:**

1. **O que é DOM? (10min)**
   - Document Object Model
   - Árvore de elementos
   - JavaScript como "animador" da página

2. **Selecionando Elementos (15min)**
   

```javascript
   // Diferentes formas de selecionar
   const titulo = document.getElementById("titulo");
   const botoes = document.getElementsByClassName("botao");
   const lista = document.querySelector("#lista-tarefas");
   const todos = document.querySelectorAll(".tarefa");
```

3. **Modificando Elementos (15min)**
   

```javascript
   // Mudando conteúdo
   titulo.textContent = "Minha Lista";
   titulo.innerHTML = "<strong>Minha Lista</strong>";

   // Mudando estilos
   titulo.style.color = "blue";
   titulo.classList.add("destaque");
```

4. **Projeto: Estrutura Básica (10min)**
   - Criar HTML básico para TODO list
   - Adicionar IDs e classes necessários
   - Conectar com JavaScript

#### **🎯 Exercício:**

* Criar botão que muda cor do título
* Adicionar/remover classes CSS via JS

---

### **📚 AULA 3: Eventos e Interatividade (50min)**

**Tema:** "Reagindo às Ações do Usuário"

#### **🎯 Objetivos:**

* Compreender sistema de eventos
* Implementar event listeners
* Capturar dados de formulários

#### **📋 Conteúdo:**

1. **Sistema de Eventos (15min)**
   

```javascript
   // Diferentes tipos de eventos
   botao.addEventListener("click", function() {
       console.log("Botão clicado!");
   });

   input.addEventListener("keypress", function(evento) {
       if (evento.key === "Enter") {
           console.log("Enter pressionado!");
       }
   });
```

2. **Capturando Dados (15min)**
   

```javascript
   // Pegando valor de input
   const inputTarefa = document.getElementById("nova-tarefa");
   const textoTarefa = inputTarefa.value;

   // Validando dados
   if (textoTarefa.trim() !== "") {
       console.log("Tarefa válida:", textoTarefa);
   }
```

3. **Projeto: Primeira Funcionalidade (20min)**
   - Implementar adição de tarefas
   - Validar entrada do usuário
   - Limpar campo após adicionar

#### **💻 Código da Aula:**

```javascript
function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.value.trim();

    if (texto !== "") {
        console.log("Nova tarefa:", texto);
        input.value = ""; // Limpar campo
    } else {
        alert("Digite uma tarefa!");
    }
}
```

---

### **📚 AULA 4: Arrays e Manipulação de Dados (50min)**

**Tema:** "Gerenciando Lista de Tarefas"

#### **🎯 Objetivos:**

* Trabalhar com arrays em JavaScript
* Adicionar, remover e modificar elementos
* Implementar estrutura de dados para tarefas

#### **📋 Conteúdo:**

1. **Arrays Avançados (15min)**
   

```javascript
   let tarefas = [];

   // Adicionando elementos
   tarefas.push("Nova tarefa");

   // Removendo elementos
   tarefas.splice(index, 1);

   // Encontrando elementos
   const tarefa = tarefas.find(t => t.id === 1);
```

2. **Objetos como Estrutura de Dados (15min)**
   

```javascript
   // Estrutura de uma tarefa
   const tarefa = {
       id: Date.now(),
       texto: "Aprender JavaScript",
       completa: false,
       dataCriacao: new Date()
   };

   // Array de objetos
   let listaTarefas = [tarefa];
```

3. **Projeto: Sistema de Dados (20min)**
   - Implementar array global de tarefas
   - Criar função para adicionar tarefa
   - Gerar IDs únicos para cada tarefa

#### **💻 Código da Aula:**

```javascript
let listaDeTarefas = [];

function criarTarefa(texto) {
    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        completa: false
    };

    listaDeTarefas.push(novaTarefa);
    console.log("Tarefas atuais:", listaDeTarefas);
}
```

---

### **📚 AULA 5: Criação Dinâmica de Elementos (50min)**

**Tema:** "Construindo a Interface Dinamicamente"

#### **🎯 Objetivos:**

* Criar elementos HTML via JavaScript
* Montar estrutura complexa de componentes
* Implementar visualização das tarefas

#### **📋 Conteúdo:**

1. **Criação de Elementos (15min)**
   

```javascript
   // Criando elementos
   const div = document.createElement("div");
   const p = document.createElement("p");
   const button = document.createElement("button");

   // Configurando elementos
   div.className = "tarefa";
   p.textContent = "Minha tarefa";
   button.textContent = "Deletar";

   // Montando estrutura
   div.appendChild(p);
   div.appendChild(button);
```

2. **Template de Tarefa (20min)**
   

```javascript
   function criarElementoTarefa(tarefa) {
       const li = document.createElement("li");
       li.innerHTML = `
       <input type="checkbox" ${tarefa.completa ? 'checked' : ''}>
       <span class="texto-tarefa">${tarefa.texto}</span>
       <button class="botao-deletar">🗑️</button>
     `;
       return li;
   }
```

3. **Renderização da Lista (15min)**
   

```javascript
   function renderizarTarefas() {
       const lista = document.getElementById("lista-tarefas");
       lista.innerHTML = ""; // Limpar lista

       listaDeTarefas.forEach(tarefa => {
           const elemento = criarElementoTarefa(tarefa);
           lista.appendChild(elemento);
       });
   }
```

#### **🎯 Exercício:**

* Implementar função completa de renderização
* Testar com diferentes tarefas
* Adicionar estilos CSS para os elementos

---

### **📚 AULA 6: Eventos Avançados e Funcionalidades (50min)**

**Tema:** "Completar, Deletar e Interagir"

#### **🎯 Objetivos:**

* Implementar marcar/desmarcar tarefas
* Adicionar funcionalidade de deletar
* Trabalhar com eventos em elementos dinâmicos

#### **📋 Conteúdo:**

1. **Event Delegation (15min)**
   

```javascript
   // Escutando eventos em elementos dinâmicos
   document.addEventListener("click", function(evento) {
       if (evento.target.classList.contains("botao-deletar")) {
           const tarefaId = evento.target.dataset.id;
           deletarTarefa(tarefaId);
       }
   });
```

2. **Funcionalidades CRUD (25min)**
   

```javascript
   // Marcar como completa
   function toggleTarefa(id) {
       const tarefa = listaDeTarefas.find(t => t.id == id);
       if (tarefa) {
           tarefa.completa = !tarefa.completa;
           renderizarTarefas();
       }
   }

   // Deletar tarefa
   function deletarTarefa(id) {
       const index = listaDeTarefas.findIndex(t => t.id == id);
       if (index > -1) {
           listaDeTarefas.splice(index, 1);
           renderizarTarefas();
       }
   }
```

3. **Projeto: Integração Completa (10min)**
   - Conectar todas as funcionalidades
   - Testar fluxo completo
   - Debug e ajustes

#### **🐛 Debugging:**

* Uso do console.log
* Inspetor de elementos
* Breakpoints no DevTools

---

### **📚 AULA 7: LocalStorage e Persistência (50min)**

**Tema:** "Salvando Dados no Navegador"

#### **🎯 Objetivos:**

* Entender localStorage
* Implementar salvamento automático
* Carregar dados ao abrir página

#### **📋 Conteúdo:**

1. **LocalStorage API (15min)**
   

```javascript
   // Salvando dados
   localStorage.setItem("chave", "valor");

   // Salvando objetos (JSON)
   localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));

   // Recuperando dados
   const dados = localStorage.getItem("tarefas");
   const tarefas = JSON.parse(dados);
```

2. **Funções de Persistência (20min)**
   

```javascript
   function salvarTarefas() {
       localStorage.setItem("todoList", JSON.stringify(listaDeTarefas));
   }

   function carregarTarefas() {
       const dadosSalvos = localStorage.getItem("todoList");
       if (dadosSalvos) {
           listaDeTarefas = JSON.parse(dadosSalvos);
       }
   }
```

3. **Integração Automática (15min)**
   - Salvar após cada modificação
   - Carregar ao inicializar página
   - Tratamento de erros

#### **💻 Código Completo:**

```javascript
// Inicialização
document.addEventListener("DOMContentLoaded", function() {
    carregarTarefas();
    renderizarTarefas();
});

// Salvar após modificações
function adicionarTarefa(texto) {
    // ... código da função
    salvarTarefas(); // Adicionar esta linha
}
```

---

### **📚 AULA 8: Funcionalidades Avançadas e Finalização (50min)**

**Tema:** "Recursos Extras e Polimento"

#### **🎯 Objetivos:**

* Implementar edição de tarefas
* Adicionar contadores e estatísticas
* Finalizar e testar projeto

#### **📋 Conteúdo:**

1. **Edição Inline (20min)**
   

```javascript
   function iniciarEdicao(id) {
       const elemento = document.querySelector(`[data-id="${id}"]`);
       const span = elemento.querySelector(".texto-tarefa");
       const textoAtual = span.textContent;

       const input = document.createElement("input");
       input.value = textoAtual;
       input.className = "campo-edicao";

       span.replaceWith(input);
       input.focus();
   }
```

2. **Contadores e Estatísticas (15min)**
   

```javascript
   function atualizarContadores() {
       const total = listaDeTarefas.length;
       const completas = listaDeTarefas.filter(t => t.completa).length;
       const pendentes = total - completas;

       document.getElementById("total").textContent = total;
       document.getElementById("completas").textContent = completas;
       document.getElementById("pendentes").textContent = pendentes;
   }
```

3. **Polimento e Testes (15min)**
   - Validações adicionais
   - Feedback visual
   - Testes de usabilidade
   - Revisão do código

#### **🎯 Projeto Final:**

Lista de tarefas completa com:
* ✅ Adicionar tarefas
* ✅ Marcar como completa
* ✅ Deletar tarefas
* ✅ Editar tarefas
* ✅ Persistência de dados
* ✅ Contadores
* ✅ Interface responsiva

---

## 📚 **RECURSOS PEDAGÓGICOS**

### **🛠️ Ferramentas Necessárias:**

* VS Code ou editor de código
* Navegador moderno (Chrome, Firefox, Safari)
* Extensão Live Server (opcional)
* DevTools do navegador

### **📋 Material de Apoio:**

* Slides para cada aula
* Código inicial (templates)
* Exercícios práticos
* Checklists de conceitos
* Glossário de termos

### **🎯 Metodologia:**

1. **Demonstração (15min)** - Professor mostra o conceito
2. **Explicação (10min)** - Teoria e exemplos
3. **Prática Guiada (15min)** - Alunos fazem junto
4. **Prática Individual (10min)** - Exercícios próprios

### **📊 Avaliação:**

* **Participação em aula (30%)**
* **Exercícios práticos (40%)**
* **Projeto final (30%)**

---

## 🎯 **COMPETÊNCIAS DESENVOLVIDAS**

### **🔧 Técnicas:**

* Manipulação do DOM
* Event handling
* Estruturas de dados (arrays, objetos)
* LocalStorage API
* Debugging
* JSON
* ES6+ features

### **🧠 Conceituais:**

* Lógica de programação
* Pensamento algorítmico
* Arquitetura de aplicações
* Separação de responsabilidades
* Boas práticas de código

### **🤝 Comportamentais:**

* Resolução de problemas
* Pensamento crítico
* Trabalho autônomo
* Persistência na depuração

---

## 📈 **PROGRESSÃO DE DIFICULDADE**

```
Aula 1: ⭐ Básico
Aula 2: ⭐⭐ Iniciante
Aula 3: ⭐⭐ Iniciante
Aula 4: ⭐⭐⭐ Intermediário
Aula 5: ⭐⭐⭐ Intermediário
Aula 6: ⭐⭐⭐⭐ Intermediário+
Aula 7: ⭐⭐⭐⭐ Intermediário+
Aula 8: ⭐⭐⭐⭐⭐ Avançado
```

---

## 🚀 **PRÓXIMOS PASSOS**

Após completar este curso, os alunos estarão preparados para:

### **📚 Estudos Avançados:**

* Frameworks (React, Vue, Angular)
* Node.js e desenvolvimento backend
* APIs e AJAX
* Testes automatizados
* Bundlers (Webpack, Vite)

### **🏗️ Projetos Sugestionados:**

* Calculadora avançada
* Jogo da memória
* App de clima
* Blog pessoal
* E-commerce simples

---

## 🎯 **CONCLUSÃO**

Este curso oferece uma base sólida em JavaScript através de um projeto prático e motivador. A abordagem hands-on garante que os conceitos sejam aplicados imediatamente, facilitando a fixação do aprendizado.

**🌟 Resultado esperado:** Alunos capazes de criar aplicações web interativas com JavaScript, prontos para continuar sua jornada no desenvolvimento web!
