# 👨‍🏫 **PLANO DE AULA 2: DOM E PRIMEIRAS INTERAÇÕES**

## 📊 **Informações da Aula**

* **Duração:** 50 minutos
* **Tema:** DOM e Primeiras Interações
* **Público:** Iniciantes em JavaScript
* **Pré-requisitos:** Aula 1 (Fundamentos JavaScript)

---

## 🎯 **Objetivos da Aula**

### **🎓 Objetivos de Aprendizagem:**

Ao final desta aula, os alunos serão capazes de:
* ✅ Explicar o conceito de DOM como árvore de elementos
* ✅ Selecionar elementos HTML usando diferentes métodos
* ✅ Modificar conteúdo e atributos de elementos
* ✅ Alterar estilos CSS via JavaScript
* ✅ Implementar event listeners básicos
* ✅ Criar interações simples usuário-página

### **🔧 Habilidades Técnicas:**

* `document.getElementById()`
* `document.querySelector()` / `querySelectorAll()`
* `textContent` vs `innerHTML`
* `style.propriedade` e `classList`
* `addEventListener()` para eventos básicos

---

## ⏰ **Cronograma Detalhado (50min)**

### **🎯 1. ABERTURA (5min)**

#### **Revisão da Aula Anterior (2min):**

```javascript
// Perguntar aos alunos:
"Quem lembra o que aprendemos na aula passada?" -
Variáveis(let,
        const) -
    Funções -
    Arrays básicos -
    Console.log para debugging
```

#### **Apresentação dos Objetivos (3min):**

* Mostrar página final funcionando
* Explicar que hoje conectaremos JS com HTML
* Motivar: "Vamos dar vida às páginas!"

---

### **📺 2. DEMONSTRAÇÃO: O QUE É DOM (10min)**

#### **Conceito de DOM (5min):**

```
💡 ANALOGIA: DOM como árvore genealógica
- document = bisavô
- html = avô  
- head/body = pais
- h1, p, div = filhos
- text content = netos
```

#### **Visualização Prática (5min):**

```javascript
// No console, mostrar:
console.log(document);
console.log(document.body);
console.log(document.body.children);

// Abrir DevTools Elements tab
// Mostrar a árvore visualmente
```

**🎨 DICA VISUAL:** Desenhar árvore na lousa/tela

---

### **📚 3. SELECIONANDO ELEMENTOS (10min)**

#### **Métodos de Seleção (7min):**

```javascript
// 1. Por ID (único)
const titulo = document.getElementById("meu-titulo");
console.log("Título:", titulo);

// 2. Por classe (múltiplos)
const botoes = document.getElementsByClassName("botao");
console.log("Botões:", botoes.length);

// 3. Query selector moderno (RECOMENDADO)
const primeiroBotao = document.querySelector(".botao");
const todosBotoes = document.querySelectorAll(".botao");

// 4. Seletores específicos
const botaoEspecial = document.querySelector('[data-acao="salvar"]');
```

#### **Prática Guiada (3min):**

* Alunos seguem junto no teste-progressivo.html
* Cada um testa os seletores no console
* Professor circula ajudando

**⚠️ PONTOS DE ATENÇÃO:**
* Explicar que elementos devem existir
* Mostrar o que acontece quando não encontra (null)
* Enfatizar diferença entre um elemento vs lista

---

### **💻 4. PRÁTICA: MODIFICANDO CONTEÚDO (10min)**

#### **textContent vs innerHTML (5min):**

```javascript
// textContent - apenas texto
elemento.textContent = "Novo texto aqui";

// innerHTML - pode incluir HTML
elemento.innerHTML = "<strong>Texto formatado</strong>";

// Demonstrar diferença na prática
const demo = document.getElementById("demo");
demo.textContent = "<h1>Título</h1>"; // Aparece literal
demo.innerHTML = "<h1>Título</h1>"; // Renderiza HTML
```

#### **Modificando Atributos (5min):**

```javascript
// Alterar atributos
imagem.setAttribute("src", "nova-imagem.jpg");
imagem.setAttribute("alt", "Nova descrição");

// Propriedades diretas
elemento.id = "novo-id";
elemento.className = "nova-classe";
```

**🧪 EXERCÍCIO RÁPIDO:**
Cada aluno modifica um elemento diferente da página

---

### **🎨 5. MODIFICANDO ESTILOS (8min)**

#### **Estilos Diretos (3min):**

```javascript
// Modificar CSS diretamente
elemento.style.backgroundColor = "blue";
elemento.style.fontSize = "20px";
elemento.style.border = "2px solid red";
```

#### **Classes CSS (5min) - MÉTODO RECOMENDADO:**

```javascript
// Trabalhar com classes
elemento.classList.add("destaque");
elemento.classList.remove("antigo");
elemento.classList.toggle("ativo");

// Verificar se tem classe
if (elemento.classList.contains("ativo")) {
    console.log("Elemento está ativo");
}
```

**💡 EXPLICAR:**
* Classes CSS são mais organizadas
* Permitem reutilização
* Melhor performance
* Mais fácil de manter

---

### **🖱️ 6. PRIMEIROS EVENTOS (12min)**

#### **addEventListener Básico (4min):**

```javascript
// Evento de clique
botao.addEventListener("click", function() {
    console.log("Botão clicado!");
});

// Arrow function (moderna)
botao.addEventListener("click", () => {
    console.log("Clicado com arrow function!");
});
```

#### **Diferentes Tipos de Eventos (4min):**

```javascript
// Eventos de mouse
elemento.addEventListener("mouseenter", function() {
    this.style.backgroundColor = "yellow";
});

// Eventos de teclado
input.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        console.log("Enter pressionado!");
    }
});

// Eventos de formulário
input.addEventListener("input", function() {
    console.log("Usuário está digitando:", this.value);
});
```

#### **Projeto Mini: Contador (4min):**

```javascript
let contador = 0;

botaoContador.addEventListener("click", function() {
    contador++;
    display.textContent = contador;

    // Feedback visual
    if (contador === 5) {
        this.style.backgroundColor = "green";
        this.textContent = "5 cliques!";
    }
});
```

**🎮 INTERAÇÃO:**
* Cada aluno implementa o contador
* Competição amigável: quem chega primeiro a 10 cliques

---

### **🎯 7. FECHAMENTO (5min)**

#### **Resumo dos Conceitos (3min):**

```
✅ DOM: Árvore de elementos HTML
✅ Seletores: getElementById, querySelector
✅ Conteúdo: textContent, innerHTML
✅ Estilos: style.propriedade, classList
✅ Eventos: addEventListener
```

#### **Preview Próxima Aula (1min):**

* Eventos mais avançados
* Formulários complexos
* Validação de dados

#### **Exercícios para Casa (1min):**

* Completar exercícios do arquivo exercicios.md
* Experimentar com diferentes elementos
* Criar mini projeto pessoal

---

## 🛠️ **Recursos e Materiais**

### **📁 Arquivos Necessários:**

* `index.html` - Página principal interativa
* `codigo-progressivo.js` - Código para construir junto
* `teste-progressivo.html` - Página para testes
* `exercicios.md` - Exercícios práticos

### **💻 Setup Técnico:**

* Projetor/TV para demonstração
* VS Code com Live Server
* DevTools aberto (Elements + Console)
* Zoom no editor: mínimo 150%

### **🎨 Material Visual:**

* Diagrama da árvore DOM
* Comparação textContent vs innerHTML
* Tabela de eventos principais

---

## 💡 **Estratégias Pedagógicas**

### **🗣️ Comunicação:**

* **Analogias consistentes:** DOM = árvore familiar
* **Vocabulário progressivo:** Introduzir termos gradualmente
* **Repetição ativa:** Fazer alunos explicarem de volta
* **Debugging normalizado:** "Erros fazem parte do aprendizado"

### **🤝 Engajamento:**

* **Live coding:** Construir código ao vivo
* **Pair programming:** Alunos ajudam colegas
* **Mini competições:** Primeiros a completar exercícios
* **Show and tell:** Alunos mostram descobertas

### **📊 Verificação de Aprendizado:**

* **Perguntas direcionadas:** "O que acontece se...?"
* **Debugging colaborativo:** Resolver erros juntos
* **Exercícios progressivos:** Do simples ao complexo
* **Code review:** Verificar código dos alunos

---

## ⚠️ **Pontos de Atenção**

### **🐛 Problemas Comuns:**

#### **"Elemento não encontrado":**

```javascript
// PROBLEMA: Seletor errado ou elemento não existe
const elemento = document.getElementById("id-errado");
console.log(elemento); // null

// SOLUÇÃO: Verificar sempre
if (elemento) {
    elemento.textContent = "Encontrado!";
} else {
    console.log("Elemento não encontrado!");
}
```

#### **"textContent vs innerHTML confuso":**

```javascript
// DEMONSTRAR DIFERENÇA:
div.textContent = "<h1>Título</h1>"; // Literal
div.innerHTML = "<h1>Título</h1>"; // Renderizado
```

#### **"addEventListener não funciona":**

```javascript
// PROBLEMA: Elemento não existe ainda
const botao = document.getElementById("botao");
botao.addEventListener("click", função); // ERRO se botao é null

// SOLUÇÃO: DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    const botao = document.getElementById("botao");
    if (botao) {
        botao.addEventListener("click", função);
    }
});
```

### **🎯 Dificuldades Conceituais:**

#### **"DOM é abstrato":**

* Usar DevTools para mostrar visualmente
* Analogia da árvore familiar
* Desenhar no quadro/tela
* Fazer alunos "navegarem" pela árvore

#### **"Muitos seletores":**

* Começar apenas com getElementById
* Introduzir querySelector depois
* Mostrar que querySelector é mais flexível
* Praticar bastante com exemplos

#### **"Eventos são confusos":**

* Analogia: eventos = reflexos humanos
* Começar com click (mais intuitivo)
* Mostrar causa e efeito visualmente
* Usar console.log para debugging

---

## 📈 **Avaliação da Aula**

### **✅ Indicadores de Sucesso:**

* [ ] 90%+ dos alunos conseguem selecionar elementos
* [ ] 80%+ implementam addEventListener básico
* [ ] 70%+ completam o contador funcional
* [ ] 85%+ entendem diferença textContent vs innerHTML

### **📝 Checklist do Professor:**

* [ ] Todos os arquivos funcionando
* [ ] Ambiente técnico testado
* [ ] DevTools explicado para todos
* [ ] Pelo menos 3 exercícios práticos completed
* [ ] Dúvidas principais esclarecidas

### **🔄 Adaptações em Tempo Real:**

* **Se muito rápido:** Adicionar exercícios extras
* **Se muito lento:** Focar nos conceitos essenciais
* **Se muitas dúvidas:** Parar para debugging coletivo
* **Se alunos avançados:** Dar desafios extras

---

## 🏠 **Para Casa e Próximos Passos**

### **📚 Exercícios Obrigatórios:**

1. Completar todos os exercícios do exercicios.md
2. Criar uma página própria com 3 interações diferentes
3. Experimentar com diferentes tipos de eventos

### **🚀 Exercícios Extras:**

1. Criar calculadora simples
2. Fazer galeria de imagens que mudam ao clicar
3. Implementar sistema de likes em elementos

### **📖 Leitura Complementar:**

* MDN: Introduction to the DOM
* MDN: Document.querySelector()
* MDN: EventTarget.addEventListener()

---

## 🎉 **Mensagem Final**

### **🌟 Para os Alunos:**

"Parabéns! Vocês acabaram de dar o primeiro passo para criar páginas verdadeiramente interativas. O DOM é a ponte entre o que vocês veem na tela e o que podem controlar com JavaScript. Continue praticando!"

### **👨‍🏫 Para o Professor:**

"Esta aula é crucial pois conecta teoria com prática visual. Mantenha energia alta, use muito o console para demonstrações, e celebre cada pequena conquista dos alunos. O 'aha moment' desta aula é quando eles veem que podem controlar a página!"

**🚀 Próxima aula:** Eventos avançados e formulários interativos!
