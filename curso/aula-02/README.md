# 🌐 **AULA 2: DOM E PRIMEIRAS INTERAÇÕES**

## 📋 **Visão Geral**

Nesta aula, os alunos aprendem a conectar JavaScript com HTML através do DOM, criando suas primeiras interações dinâmicas.

---

## 🎯 **Objetivos de Aprendizagem**

### **🧠 Conceituais:**

* Compreender o DOM como árvore de elementos
* Entender a diferença entre textContent e innerHTML
* Conhecer os principais tipos de eventos web

### **🛠️ Práticos:**

* Selecionar elementos HTML com JavaScript
* Modificar conteúdo e estilos dinamicamente
* Implementar event listeners básicos
* Criar interações simples usuário-página

---

## 📁 **Arquivos da Aula**

```
aula-02/
├── 📄 index.html                 # Página principal interativa
├── 📝 exercicios.md             # Exercícios práticos detalhados
├── ⚙️ codigo-progressivo.js      # Código para construir em aula
├── 🧪 teste-progressivo.html     # Página para testar códigos
├── 👨‍🏫 plano-aula.md             # Plano detalhado para professor
└── 📖 README.md                 # Este arquivo
```

---

## 🚀 **Como Usar**

### **👨‍🎓 Para Alunos:**

01. **📖 Comece pela página principal:**
   

```bash
   # Abra index.html no navegador
   # Ou use Live Server no VS Code
   ```

02. **🧪 Pratique com exercícios:**
   - Leia `exercicios.md` para exercícios detalhados
   - Use `teste-progressivo.html` para experimentar

03. **🔧 Debugging:**
   - Sempre mantenha o console aberto (F12)
   - Use `console.log()` para verificar valores
   - Experimente no DevTools

### **👨‍🏫 Para Professores:**

01. **📋 Prepare a aula:**
   - Leia `plano-aula.md` completamente
   - Teste todos os arquivos antes da aula
   - Configure projetor com zoom adequado

02. **🎥 Durante a aula:**
   - Use `codigo-progressivo.js` como roteiro
   - Construa código ao vivo com os alunos
   - Mantenha console sempre visível

03. **📊 Avaliação:**
   - Observe se alunos conseguem completar exercícios
   - Verifique compreensão através de perguntas
   - Use checklist do plano de aula

---

## 🎓 **Progressão da Aula (50min)**

### **⏰ Cronograma:**

```
5min  - 🎯 Abertura e revisão
10min - 📚 Conceito de DOM
10min - 🔍 Selecionando elementos  
10min - ✏️ Modificando conteúdo
8min  - 🎨 Modificando estilos
12min - 🖱️ Primeiros eventos
5min  - 🎯 Fechamento e próximos passos
```

### **📈 Dificuldade:**

```
Conceitos DOM        ⭐⭐ Iniciante
Seletores básicos    ⭐⭐ Iniciante  
Modificar conteúdo   ⭐⭐⭐ Intermediário
Eventos simples      ⭐⭐⭐ Intermediário
Projeto mini         ⭐⭐⭐⭐ Intermediário+
```

---

## 🛠️ **Conceitos Principais**

### **🌳 DOM (Document Object Model):**

```javascript
// DOM como árvore
document├── html│├── head││└── title│└── body│├── h1│├── p│└── div
```

### **🎯 Seletores Essenciais:**

```javascript
// Por ID (único)
const elemento = document.getElementById("meu-id");

// Por classe (múltiplos)  
const elementos = document.getElementsByClassName("minha-classe");

// Query selector (moderno - recomendado)
const primeiro = document.querySelector(".classe");
const todos = document.querySelectorAll(".classe");
```

### **✏️ Modificação de Conteúdo:**

```javascript
// Apenas texto
elemento.textContent = "Novo texto";

// HTML formatado
elemento.innerHTML = "<strong>Texto formatado</strong>";

// Atributos
elemento.setAttribute("src", "nova-imagem.jpg");
```

### **🎨 Modificação de Estilos:**

```javascript
// Estilos diretos
elemento.style.backgroundColor = "blue";

// Classes CSS (recomendado)
elemento.classList.add("destaque");
elemento.classList.remove("antigo");
elemento.classList.toggle("ativo");
```

### **🖱️ Eventos Básicos:**

```javascript
// Event listener moderno
botao.addEventListener("click", function() {
    console.log("Clicado!");
});

// Diferentes tipos de eventos
input.addEventListener("input", handleInput);
elemento.addEventListener("mouseenter", handleMouseEnter);
```

---

## 🧪 **Exercícios Práticos**

### **🥉 Nível Iniciante:**

01. **Seleção básica:** Selecionar elementos por ID e classe
02. **Modificar texto:** Usar textContent para alterar conteúdo
03. **Primeiro evento:** Implementar addEventListener para click
04. **Mudar cores:** Alterar backgroundColor via JavaScript

### **🥈 Nível Intermediário:**

05. **innerHTML:** Inserir HTML formatado dinamicamente
06. **Classes CSS:** Usar classList para alternar estilos
07. **Eventos múltiplos:** mouseenter, mouseleave, keypress
08. **Contador:** Criar contador de cliques funcional

### **🥇 Nível Avançado:**

09. **Lista dinâmica:** Criar lista que adiciona/remove itens
10. **Validação:** Verificar se elementos existem antes de usar
11. **Event object:** Usar propriedades do evento (event.key)
12. **Mini projeto:** Todo list simplificado

---

## 💡 **Dicas e Melhores Práticas**

### **✅ Faça:**

* Sempre verifique se elementos existem: `if (elemento) { ... }`
* Use `DOMContentLoaded` para garantir que página carregou
* Prefira `classList` a `style` para mudanças de aparência
* Use `querySelector` para seleções modernas
* Mantenha código organizando com funções

### **❌ Evite:**

* Modificar estilos diretamente sem necessidade
* Usar `innerHTML` com dados não confiáveis
* Esquecer de verificar se elementos existem
* Misturar muito JavaScript inline no HTML
* Não usar console.log para debugging

### **🐛 Debugging:**

```javascript
// Verificar se elemento foi encontrado
console.log("Elemento:", elemento);

// Verificar eventos
elemento.addEventListener("click", function() {
    console.log("Evento disparado!");
});

// Verificar valores
console.log("Valor atual:", input.value);
```

---

## 📚 **Recursos Complementares**

### **🔗 Links Úteis:**

* [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [MDN: Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
* [MDN: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### **📖 Glossário:**

* **DOM:** Representação em árvore do HTML que o JS pode manipular
* **Seletor:** Método para encontrar elementos específicos
* **Event Listener:** Função que reage a eventos do usuário
* **textContent:** Propriedade para texto puro (sem HTML)
* **innerHTML:** Propriedade para HTML formatado
* **classList:** Interface para manipular classes CSS

---

## 🎯 **Avaliação e Próximos Passos**

### **📊 Critérios de Sucesso:**

* [ ] Compreende conceito de DOM como árvore
* [ ] Seleciona elementos usando getElementById e querySelector
* [ ] Modifica conteúdo com textContent e innerHTML
* [ ] Implementa addEventListener básico
* [ ] Cria interação funcional simples

### **🔄 Se tiver dificuldades:**

01. **Revise Aula 1:** Fundamentos JavaScript
02. **Pratique seletores:** Use DevTools para explorar DOM
03. **Comece simples:** Apenas textContent e click
04. **Use console:** Debug passo a passo
05. **Peça ajuda:** Para professor ou colegas

### **🚀 Se estiver indo bem:**

01. **Exercícios extras:** Complete nível avançado
02. **Criatividade:** Invente suas próprias interações
03. **Ajude colegas:** Ensinar reforça o aprendizado
04. **Antecipe próxima aula:** Pesquise sobre formulários

---

## 🎉 **Resultados Esperados**

Ao final desta aula, você deve conseguir:

### **🛠️ Tecnicamente:**

* ✅ Navegar pela árvore DOM
* ✅ Selecionar qualquer elemento HTML
* ✅ Modificar texto e aparência de elementos
* ✅ Criar botões que respondem a cliques
* ✅ Capturar entrada do usuário

### **🧠 Conceitualmente:**

* ✅ Entender como JavaScript controla HTML
* ✅ Pensar em interações usuário-página
* ✅ Debuggar problemas de seleção
* ✅ Planejar interfaces dinâmicas

### **🎯 Praticamente:**

* ✅ Construir páginas que reagem ao usuário
* ✅ Criar elementos que mudam de aparência
* ✅ Implementar contadores e formulários básicos
* ✅ Base sólida para próximas aulas

---

## 🔄 **Conexão com Outras Aulas**

### **⬅️ Vem da Aula 1:**

* Variáveis e funções
* Arrays básicos
* Console.log
* Estruturas condicionais

### **➡️ Vai para Aula 3:**

* Eventos mais complexos
* Formulários avançados
* Validação de dados
* Event delegation

### **🎯 No projeto final:**

* Selecionar elementos da lista de tarefas
* Modificar status visual das tarefas
* Responder a cliques em botões
* Capturar entrada de novas tarefas

---

**💪 Continue praticando! O DOM é a base de toda interatividade web!**
