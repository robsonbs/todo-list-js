# 📅 **PLANO DE AULA 3: EVENTOS E INTERATIVIDADE**

## **Duração: 50 minutos | Nível: Intermediário**

---

## 🎯 **INFORMAÇÕES GERAIS**

### **👥 Público-Alvo:**

* Estudantes com conhecimento básico de HTML, CSS e JavaScript
* Quem completou as Aulas 1 e 2 do curso
* Desenvolvedores iniciantes buscando dominar eventos em JavaScript

### **🎓 Pré-requisitos:**

* ✅ **HTML:** Estrutura básica, formulários, atributos
* ✅ **CSS:** Seletores, propriedades, classes
* ✅ **JavaScript:** Variáveis, funções, DOM básico (Aula 2)
* ✅ **Ferramentas:** VS Code + Live Server configurados

### **📚 Conceitos da Aula Anterior (Revisão Rápida):**

* Seletores DOM (`getElementById`,  `querySelector`)
* Modificação de elementos (`textContent`,  `style`)
* Estruturas condicionais e loops

---

## 🚀 **OBJETIVOS DE APRENDIZAGEM**

### **🎯 Objetivo Geral:**

Dominar o sistema de eventos do JavaScript para criar interfaces totalmente interativas e responsivas ao usuário.

### **📝 Objetivos Específicos:**

01. **Compreender** os diferentes tipos de eventos (mouse, teclado, formulário)
02. **Aplicar** event listeners para capturar interações do usuário
03. **Implementar** validação de formulários em tempo real
04. **Utilizar** preventDefault() e stopPropagation() adequadamente
05. **Desenvolver** técnicas avançadas como event delegation e debouncing
06. **Criar** interfaces responsivas com feedback visual imediato

### **🏆 Competências Desenvolvidas:**

* **Técnicas:** Event handling, form validation, DOM manipulation avançada
* **Soft Skills:** Pensamento lógico, resolução de problemas, atenção aos detalhes
* **Profissionais:** Desenvolvimento de interfaces interativas, UX/UI com JavaScript

---

## ⏰ **CRONOGRAMA DETALHADO (50 min)**

### **🟢 ABERTURA E REVISÃO (5 min)**

**⏰ 0:00 - 0:05**

#### **📋 Atividades:**

01. **Boas-vindas e chamada** (1 min)
02. **Revisão da Aula 2** (2 min)
   - "Quem lembra como selecionar um elemento?"
   - "Como mudamos o conteúdo de um elemento?"
03. **Apresentação dos objetivos da aula** (1 min)
04. **Verificação do ambiente de desenvolvimento** (1 min)

#### **💬 Perguntas de Aquecimento:**

* "Vocês já interagiram com algum site hoje? Que tipo de cliques fizeram?"
* "O que vocês esperam que aconteça quando clicam em um botão?"

#### **🎯 Expectativa:**

* Todos com VS Code aberto e Live Server funcionando
* Revisar conceitos fundamentais da aula anterior

---

### **🟡 INTRODUÇÃO AOS EVENTOS (10 min)**

**⏰ 0:05 - 0:15**

#### **📖 Teoria (4 min):**

```
🎯 CONCEITOS FUNDAMENTAIS:
├── O que são eventos?
├── Tipos de eventos mais comuns
├── Como o JavaScript "escuta" eventos
└── A função addEventListener()
```

#### **💻 Demonstração Prática (6 min):**

**Exemplo 1: Primeiro Event Listener (2 min)**

```javascript
// Professor demonstra ao vivo
const botao = document.getElementById('meuBotao');
botao.addEventListener('click', function() {
    alert('Botão foi clicado!');
});
```

**Exemplo 2: Mudando Conteúdo com Evento (2 min)**

```javascript
const botao = document.getElementById('contador');
let clicks = 0;

botao.addEventListener('click', function() {
    clicks++;
    botao.textContent = `Cliques: ${clicks}`;
});
```

**Exemplo 3: Evento de Teclado (2 min)**

```javascript
const input = document.getElementById('textoInput');
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter pressionado!');
    }
});
```

#### **🎯 Expectativa:**

* Alunos entendem o conceito básico de eventos
* Todos conseguem criar um event listener simples

---

### **🟠 PRÁTICA GUIADA (15 min)**

**⏰ 0:15 - 0:30**

#### **👨‍🏫 Exercício Guiado: Contador Interativo (15 min)**

**Objetivo:** Criar um contador que responde a diferentes eventos.

```html
<!-- HTML fornecido pelo professor -->
<div id="app">
    <h2>🎮 Contador Interativo</h2>
    <button id="aumentar">+</button>
    <span id="numero">0</span>
    <button id="diminuir">-</button>
    <button id="reset">Reset</button>
    <input type="number" id="inputValor" placeholder="Digite um valor">
    <button id="definir">Definir</button>
</div>
```

**Roteiro da Prática (Professor e alunos fazem juntos):**

**Passo 1: Configuração Básica (3 min)**

```javascript
// Todos fazem junto
let contador = 0;
const numeroSpan = document.getElementById('numero');

function atualizarDisplay() {
    numeroSpan.textContent = contador;
}
```

**Passo 2: Botão Aumentar (2 min)**

```javascript
const btnAumentar = document.getElementById('aumentar');
btnAumentar.addEventListener('click', function() {
    contador++;
    atualizarDisplay();
});
```

**Passo 3: Botão Diminuir (2 min)**

```javascript
const btnDiminuir = document.getElementById('diminuir');
btnDiminuir.addEventListener('click', function() {
    contador--;
    atualizarDisplay();
});
```

**Passo 4: Reset (2 min)**

```javascript
const btnReset = document.getElementById('reset');
btnReset.addEventListener('click', function() {
    contador = 0;
    atualizarDisplay();
});
```

**Passo 5: Input com Enter (3 min)**

```javascript
const inputValor = document.getElementById('inputValor');
const btnDefinir = document.getElementById('definir');

function definirValor() {
    const valor = parseInt(inputValor.value);
    if (!isNaN(valor)) {
        contador = valor;
        atualizarDisplay();
        inputValor.value = '';
    }
}

btnDefinir.addEventListener('click', definirValor);
inputValor.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        definirValor();
    }
});
```

**Passo 6: Efeitos Visuais (3 min)**

```javascript
function atualizarDisplay() {
    numeroSpan.textContent = contador;

    // Mudança de cor baseada no valor
    if (contador > 0) {
        numeroSpan.style.color = 'green';
    } else if (contador < 0) {
        numeroSpan.style.color = 'red';
    } else {
        numeroSpan.style.color = 'black';
    }
}
```

#### **🎯 Expectativa:**

* Todos os alunos têm um contador funcional
* Compreendem a estrutura básica de event listeners
* Sabem combinar eventos de click e keyboard

---

### **🔴 DEMONSTRAÇÃO AVANÇADA (10 min)**

**⏰ 0:30 - 0:40**

#### **🚀 Conceitos Avançados Demonstrados:**

**1. Event Object e preventDefault (3 min)**

```javascript
// Professor demonstra
const meuForm = document.getElementById('meuForm');
meuForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede envio padrão
    console.log('Formulário interceptado!');
    console.log('Tipo do evento:', event.type);
    console.log('Elemento que disparou:', event.target);
});
```

**2. Event Delegation (3 min)**

```javascript
// Lista dinâmica - professor explica e demonstra
const lista = document.getElementById('listaDinamica');

// Um listener para todos os botões (atuais e futuros)
lista.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-remover')) {
        event.target.parentElement.remove();
    }
});

// Função para adicionar itens
function adicionarItem() {
    const item = document.createElement('li');
    item.innerHTML = `
        Item ${Date.now()} 
        <button class="btn-remover">X</button>
    `;
    lista.appendChild(item);
}
```

**3. Validação em Tempo Real (4 min)**

```javascript
// Professor demonstra validação conforme usuário digita
const inputEmail = document.getElementById('email');
inputEmail.addEventListener('input', function() {
    const email = this.value;
    const isValid = email.includes('@') && email.includes('.');

    if (email.length > 0) {
        if (isValid) {
            this.style.borderColor = 'green';
        } else {
            this.style.borderColor = 'red';
        }
    } else {
        this.style.borderColor = '';
    }
});
```

#### **💬 Interação com Alunos:**

* "Vocês viram como um único listener pode gerenciar múltiplos elementos?"
* "Quem pode explicar a diferença entre validar no submit vs validar em tempo real?"

#### **🎯 Expectativa:**

* Alunos entendem conceitos mais avançados
* Visualizam possibilidades além do básico
* Ficam motivados para os exercícios práticos

---

### **🟣 EXERCÍCIOS INDIVIDUAIS (15 min)**

**⏰ 0:40 - 0:55**

#### **📝 Exercício Principal: Formulário de Cadastro Completo**

**HTML Fornecido:**

```html
<form id="formCadastro">
    <h3>📝 Cadastro de Usuário</h3>

    <div class="campo">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" placeholder="Mínimo 3 caracteres">
        <span class="feedback" id="feedbackNome"></span>
    </div>

    <div class="campo">
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="seu@email.com">
        <span class="feedback" id="feedbackEmail"></span>
    </div>

    <div class="campo">
        <label for="idade">Idade:</label>
        <input type="number" id="idade" min="1" max="120">
        <span class="feedback" id="feedbackIdade"></span>
    </div>

    <button type="submit">Cadastrar</button>
    <button type="reset">Limpar</button>
</form>

<div id="resultado"></div>
```

#### **🎯 Tarefas dos Alunos (por nível):**

**🥉 Nível Básico (nota 6-7):**
01. ✅ Validar nome (mínimo 3 caracteres) no evento `blur`
02. ✅ Validar email (contém @ e .) no evento `blur`
03. ✅ Prevenir submit se algum campo inválido
04. ✅ Mostrar mensagem de sucesso quando válido

**🥈 Nível Intermediário (nota 7-8.5):**
05. ✅ Validação em tempo real (evento `input`)
06. ✅ Feedback visual (cores, ícones)
07. ✅ Validar idade (1-120 anos)
08. ✅ Contador de caracteres para nome

**🥇 Nível Avançado (nota 8.5-10):**
09. ✅ Confirmar antes de limpar formulário
10. ✅ Salvar dados em objeto e exibir resumo
11. ✅ Implementar atalhos de teclado (Ctrl+Enter para enviar)
12. ✅ Animações CSS acionadas por JavaScript

#### **🆘 Apoio do Professor:**

* **Minuto 5:** "Como está o andamento? Alguém precisa de ajuda?"
* **Minuto 10:** Circular pela sala, apoio individual
* **Minuto 13:** "Últimos 2 minutos, finalizem o que conseguiram"

#### **🎯 Expectativa:**

* Alunos aplicam conceitos aprendidos
* Diferentes níveis de implementação conforme habilidade
* Todos conseguem pelo menos o nível básico

---

### **🟢 FECHAMENTO E NEXT STEPS (5 min)**

**⏰ 0:55 - 1:00**

#### **📊 Review e Avaliação (2 min):**

* **Pergunta:** "Quem conseguiu fazer a validação em tempo real?"
* **Demonstração:** 1-2 alunos mostram seu resultado
* **Reconhecimento:** Destacar diferentes abordagens e soluções criativas

#### **📝 Resumo da Aula (2 min):**

```
✅ O QUE APRENDEMOS HOJE:
├── Event listeners com addEventListener()
├── Diferentes tipos de eventos (click, keypress, submit, input)
├── Objeto event e métodos (preventDefault, target)
├── Validação de formulários
├── Event delegation para elementos dinâmicos
└── Feedback visual e experiência do usuário
```

#### **🚀 Prévia da Próxima Aula (1 min):**

* **Aula 4:** "Arrays e Manipulação de Dados"
* **Foco:** Trabalhar com listas de dados, criar/editar/deletar itens
* **Projeto:** Começar a estrutura real do TODO List

#### **📚 Para Casa (Opcional):**

* Completar exercícios não finalizados
* Experimentar com outros tipos de eventos
* Pensar em ideias para o projeto TODO List

---

## 🎯 **RECURSOS DIDÁTICOS**

### **💻 Tecnológicos:**

* **Projetor/TV:** Para demonstrações ao vivo
* **VS Code:** Editor principal
* **Live Server:** Para visualizar em tempo real
* **Chrome DevTools:** Para debugging (mostrar console)

### **📋 Materiais:**

* Código HTML base preparado
* Slides com conceitos principais
* Cheatsheet de eventos impressa (opcional)

### **🌐 Links de Apoio:**

* [MDN Event Reference](https://developer.mozilla.org/docs/Web/Events)
* [JavaScript.info Events](https://javascript.info/events)

---

## 🎭 **METODOLOGIA E ABORDAGEM**

### **🧠 Princípios Pedagógicos:**

01. **Demonstração → Prática Guiada → Prática Individual**
02. **Construção progressiva:** Do simples para o complexo
03. **Aprendizagem ativa:** Alunos fazem junto com professor
04. **Feedback imediato:** Resultados visuais das ações

### **👥 Estratégias de Engajamento:**

* **Perguntas frequentes:** Manter alunos atentos
* **Exemplos práticos:** Situações do dia a dia
* **Gamificação:** Sistema de níveis nos exercícios
* **Colaboração:** Alunos podem ajudar uns aos outros

### **🔄 Adaptações por Perfil:**

* **Alunos rápidos:** Exercícios de nível avançado
* **Alunos com dificuldade:** Foco no nível básico, apoio individual
* **Diferentes estilos:** Visual (demos), auditivo (explicações), kinestésico (prática)

---

## 🚨 **POSSÍVEIS DIFICULDADES E SOLUÇÕES**

### **❗ Problemas Técnicos Comuns:**

#### **1. Event Listener não funciona**

**Sintomas:** Nada acontece quando clica no botão
**Diagnóstico:**

```javascript
// Verificar se elemento existe
console.log(document.getElementById('meuBotao')); // null?
```

**Soluções:**
* Verificar se o ID existe no HTML
* Usar `DOMContentLoaded` se necessário
* Verificar sintaxe do addEventListener

#### **2. preventDefault() não funciona**

**Sintomas:** Formulário é enviado mesmo com preventDefault
**Diagnóstico:**

```javascript
// Verificar se event está definido
form.addEventListener('submit', function(event) {
    console.log('Event object:', event); // undefined?
    event.preventDefault();
});
```

**Soluções:**
* Confirmar que parâmetro `event` está na função
* Verificar se é o evento correto (`submit` vs `click`)

#### **3. Erros de sintaxe**

**Sintomas:** Código não executa, erro no console
**Diagnóstico:** Abrir DevTools e verificar console
**Soluções:**
* Revisar parênteses e chaves
* Verificar nomes de variáveis
* Usar `console.log()` para debug

### **🎯 Estratégias de Resolução:**

01. **Debugging conjunto:** Professor e aluno investigam juntos
02. **Peer learning:** Aluno que conseguiu ajuda colega
03. **Código de referência:** Ter solução completa disponível
04. **Console é seu amigo:** Ensinar a usar DevTools

---

## 📊 **AVALIAÇÃO E ACOMPANHAMENTO**

### **📝 Avaliação Formativa (Durante a Aula):**

* ✅ **Participação:** Responde perguntas, faz exercícios
* ✅ **Compreensão:** Consegue explicar conceitos básicos
* ✅ **Aplicação:** Implementa event listeners corretamente
* ✅ **Resolução de problemas:** Identifica e corrige erros

### **🎯 Critérios de Sucesso:**

* **Mínimo (60%):** Event listeners básicos funcionando
* **Adequado (70%):** Validação de formulário implementada
* **Proficiente (80%):** Feedback visual e preventDefault()
* **Avançado (90%+):** Event delegation e técnicas avançadas

### **📈 Acompanhamento Individual:**

```
ALUNO: _______________

☐ Conceitos básicos compreendidos
☐ Event listeners implementados
☐ Validação de formulário funcionando
☐ Demonstra autonomia na resolução de problemas
☐ Ajuda colegas (liderança técnica)

OBSERVAÇÕES:
_________________________________
```

### **🔄 Feedback para Próxima Aula:**

* Conceitos que precisam ser revisados
* Alunos que necessitam apoio extra
* Ritmo da turma (muito rápido/lento?)
* Ajustes na metodologia

---

## 🎊 **ENCERRAMENTO MOTIVACIONAL**

### **🏆 Celebração de Conquistas:**

* "Vocês criaram interfaces que respondem ao usuário!"
* "Agora sabem capturar e processar interações"
* "Estão prontos para criar aplicações reais"

### **🚀 Visão de Futuro:**

* "Na próxima aula vamos trabalhar com listas de dados"
* "Vocês vão ver como gerenciar múltiplos TODOs"
* "Estamos construindo as bases para aplicações profissionais"

### **💪 Motivação Final:**

> *"Eventos são a ponte entre o usuário e sua aplicação. Hoje vocês aprenderam a construir essa ponte de forma sólida e elegante. Continuem praticando!"*

---

**🎯 Objetivo alcançado:** Alunos saem da aula confiantes em trabalhar com eventos e motivados para a próxima etapa do curso!

**📅 Próxima aula:** Arrays e Manipulação de Dados - A base do CRUD!
