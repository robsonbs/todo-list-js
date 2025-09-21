# 🎯 **AULA 3: EVENTOS E INTERATIVIDADE**

## **Curso JavaScript TODO List | 50 minutos**

---

## 📋 **VISÃO GERAL**

### **🎓 Descrição:**

Terceira aula do curso JavaScript TODO List, focada em dominar o sistema de eventos para criar interfaces totalmente interativas e responsivas ao usuário.

### **⏰ Duração:** 50 minutos

### **🎯 Nível:** Intermediário

### **👥 Público:** Estudantes que completaram Aulas 1 e 2

### **🧠 Conceitos Centrais:**

* Event listeners e addEventListener()
* Tipos de eventos (mouse, teclado, formulário)
* Objeto event e métodos (preventDefault, target)
* Event delegation para elementos dinâmicos
* Validação de formulários em tempo real
* Técnicas avançadas (debouncing, custom events)

---

## 📁 **ESTRUTURA DOS ARQUIVOS**

```
aula-03/
├── 📄 README.md                    # Este arquivo - documentação completa
├── 🌐 index.html                   # Página principal com demos interativas
├── ⚙️ codigo-progressivo.js        # JavaScript progressivo (básico → avançado)
├── 📚 exercicios.md               # Exercícios práticos (3 níveis)
├── 📅 plano-aula.md               # Plano detalhado de 50 minutos
└── 🎭 teste-progressivo.html      # Ferramenta para professor (demos ao vivo)
```

### **📋 Descrição dos Arquivos:**

#### **🌐 index.html**

* **Propósito:** Página principal com 9 seções interativas
* **Conteúdo:** Demos de eventos, formulários, drag & drop, navegação por teclado
* **Uso:** Exploração livre pelos alunos e demonstrações

#### **⚙️ codigo-progressivo.js**

* **Propósito:** Código JavaScript completo e comentado
* **Estrutura:** Do básico (click simples) ao avançado (custom events, debouncing)
* **Didática:** Comentários explicativos e log detalhado de eventos

#### **📚 exercicios.md**

* **Propósito:** Sistema progressivo de exercícios práticos
* **Níveis:** 🥉 Iniciante | 🥈 Intermediário | 🥇 Avançado
* **Conteúdo:** 12 exercícios + projeto integrador TODO List

#### **📅 plano-aula.md**

* **Propósito:** Roteiro completo para o professor
* **Cronograma:** Divisão minuto a minuto da aula de 50 min
* **Metodologia:** Demonstração → Prática Guiada → Exercícios Individuais

#### **🎭 teste-progressivo.html**

* **Propósito:** Ferramenta de apoio para o professor
* **Funcionalidades:** Cronômetro, demos interativas, controle de progresso
* **Uso:** Projeção durante a aula para acompanhar timing e demonstrações

---

## 🚀 **QUICK START**

### **👨‍🏫 Para Professores:**

01. **Preparação (5 min antes da aula):**
   

```bash
   # Abrir arquivos no VS Code
   code aula-03/
   
   # Iniciar Live Server
   # Extensão Live Server → Go Live
   
   # Abrir teste-progressivo.html no navegador
   # Para controle da aula em tempo real
   ```

02. **Projeção:**
   - Navegador com `teste-progressivo.html` (demos)
   - VS Code com arquivos para live coding
   - Console do navegador (DevTools) para debugging

03. **Material de Apoio:**
   - `plano-aula.md` impresso ou em tablet
   - HTML base dos exercícios preparado
   - Timer/cronômetro visível

### **👨‍🎓 Para Alunos:**

01. **Configuração Inicial:**
   

```bash
   # Criar pasta para a aula
   mkdir aula-03-eventos
   cd aula-03-eventos
   
   # Abrir VS Code
   code .
   ```

02. **Exploração:**
   - Abrir `index.html` no navegador
   - Experimentar todas as seções
   - Abrir DevTools para ver logs

03. **Prática:**
   - Seguir exercícios em `exercicios.md`

   - Começar pelo nível iniciante
   - Progressão conforme conforto

---

## 🎯 **OBJETIVOS DE APRENDIZAGEM**

### **📚 Conhecimentos (Saber):**

* ✅ Compreender o sistema de eventos do JavaScript
* ✅ Conhecer diferentes tipos de eventos e suas aplicações
* ✅ Entender o objeto event e suas propriedades
* ✅ Dominar preventDefault() e stopPropagation()

### **🛠️ Habilidades (Saber Fazer):**

* ✅ Implementar event listeners eficientes
* ✅ Validar formulários em tempo real
* ✅ Criar interfaces responsivas e interativas
* ✅ Aplicar event delegation para elementos dinâmicos
* ✅ Debuggar problemas relacionados a eventos

### **🎭 Atitudes (Saber Ser):**

* ✅ Pensamento orientado à experiência do usuário
* ✅ Atenção aos detalhes na interação
* ✅ Resolução sistemática de problemas
* ✅ Colaboração em debugging conjunto

---

## 📖 **CONTEÚDO PROGRAMÁTICO**

### **🟢 Módulo 1: Fundamentos de Eventos (15 min)**

```javascript
// Tópicos abordados:
•
O que são eventos e como funcionam• addEventListener() vs onclick• Event listeners básicos(click, keypress)• Captura e processamento de entrada do usuário
```

### **🟡 Módulo 2: Objeto Event e Controle (10 min)**

```javascript
// Tópicos abordados:
•
Propriedades do objeto event(target, type, timestamp)• preventDefault() - controlando comportamento padrão• stopPropagation() - controlando propagação• Debugging com console e DevTools
```

### **🟠 Módulo 3: Formulários e Validação (10 min)**

```javascript
// Tópicos abordados:
•
Eventos de formulário(submit, input, change, blur)• Validação em tempo real vs validação no submit• Feedback visual para o usuário• Tratamento de diferentes tipos de input
```

### **🔴 Módulo 4: Técnicas Avançadas (10 min)**

```javascript
// Tópicos abordados:
•
Event delegation para elementos dinâmicos• Navegação por teclado e acessibilidade• Custom events e comunicação entre componentes• Debouncing para otimização de performance
```

### **🟣 Módulo 5: Projeto Prático (15 min)**

```javascript
// Aplicação no TODO List:
•
Captura de entrada(Enter + click)• Validação de tarefa não vazia• Eventos para marcar / desmarcar como completa• Eventos para deletar tarefas
```

---

## 🔧 **CONFIGURAÇÃO DO AMBIENTE**

### **💻 Requisitos Técnicos:**

* **Editor:** VS Code (recomendado)
* **Extensões:** Live Server, Prettier (opcional)
* **Navegador:** Chrome ou Firefox com DevTools
* **Sistema:** Windows/Mac/Linux (qualquer)

### **📂 Estrutura de Projeto Sugerida:**

```
meu-projeto/
├── index.html          # Página principal
├── style.css           # Estilos (da aula anterior)
├── script.js           # JavaScript (começando nesta aula)
└── README.md           # Documentação do projeto
```

### **🌐 Template HTML Base:**

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Eventos JavaScript</title>
</head>

<body>
    <h1>Praticando Eventos</h1>

    <button id="meuBotao">Clique aqui!</button>
    <input type="text" id="meuInput" placeholder="Digite algo...">

    <script>
        // Seu código JavaScript aqui
        console.log('Página carregada!');
    </script>
</body>

</html>
```

---

## 🎮 **EXERCÍCIOS E ATIVIDADES**

### **🥉 Nível Iniciante (4 exercícios):**

01. **Contador de Cliques** - addEventListener básico
02. **Input com Enter** - eventos de teclado
03. **Validação de Formulário** - preventDefault e validação
04. **Hover Effects** - eventos de mouse

### **🥈 Nível Intermediário (4 exercícios):**

05. **Lista Dinâmica** - event delegation
06. **Navegação por Teclado** - acessibilidade
07. **Validação em Tempo Real** - múltiplos eventos
08. **Sistema de Abas** - data attributes e estado

### **🥇 Nível Avançado (4 exercícios):**

09. **Busca com Debounce** - otimização de performance
10. **Drag and Drop** - eventos complexos
11. **Custom Events** - observer pattern
12. **Gestos Touch** - eventos mobile

### **🏆 Projeto Integrador:**

**TODO List Interativo** - Aplicação de todos os conceitos aprendidos

---

## 🛠️ **TROUBLESHOOTING**

### **❗ Problemas Comuns e Soluções:**

#### **1. Event Listener Não Funciona**

```javascript
// ❌ Problema: Elemento não encontrado
const botao = document.getElementById('botaoInexistente'); // null
botao.addEventListener('click', function() {
    ...
}); // Erro!

// ✅ Solução: Verificar se elemento existe
const botao = document.getElementById('meuBotao');
if (botao) {
    botao.addEventListener('click', function() {
        console.log('Botão clicado!');
    });
}

// ✅ Alternativa: Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const botao = document.getElementById('meuBotao');
    botao.addEventListener('click', function() {
        console.log('Botão clicado!');
    });
});
```

#### **2. preventDefault() Não Funciona**

```javascript
// ❌ Problema: Event não definido
form.addEventListener('submit', function() {
    event.preventDefault(); // event is not defined
});

// ✅ Solução: Parâmetro event na função
form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário interceptado!');
});
```

#### **3. Event Delegation Não Funciona**

```javascript
// ❌ Problema: Listener no elemento errado
const botao = document.getElementById('botaoDinamico'); // Não existe ainda
botao.addEventListener('click', function() {
    ...
}); // Erro!

// ✅ Solução: Listener no elemento pai
const container = document.getElementById('container');
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('botao-dinamico')) {
        console.log('Botão dinâmico clicado!');
    }
});
```

#### **4. Múltiplos Event Listeners**

```javascript
// ❌ Problema: Listeners duplicados
function adicionarListener() {
    botao.addEventListener('click', function() {
        console.log('Clicado!');
    });
}
adicionarListener(); // Chama múltiplas vezes = múltiplos listeners

// ✅ Solução: Remover antes de adicionar
function adicionarListener() {
    botao.removeEventListener('click', minhafuncao);
    botao.addEventListener('click', minhaFuncao);
}

function minhaFuncao() {
    console.log('Clicado!');
}
```

### **🔍 Ferramentas de Debug:**

```javascript
// Console logs para debug
console.log('Elemento encontrado:', document.getElementById('meuElemento'));
console.log('Evento disparado:', event.type);
console.log('Target do evento:', event.target);

// Breakpoints no código
debugger; // Pausa execução no DevTools

// Monitorar eventos no console
monitorEvents(document.body, 'click');
unmonitorEvents(document.body, 'click');
```

---

## 📊 **AVALIAÇÃO E CRITÉRIOS**

### **📝 Avaliação Formativa (Durante a Aula):**

* **Participação:** Responde perguntas, experimenta demos
* **Compreensão:** Explica conceitos com suas palavras
* **Aplicação:** Implementa event listeners corretamente
* **Resolução:** Identifica e corrige erros autonomamente

### **🎯 Critérios de Proficiência:**

#### **🥉 Iniciante (60-70 pontos):**

* ✅ Implementa event listeners básicos (click, keypress)
* ✅ Usa preventDefault() corretamente
* ✅ Validação simples de formulários
* ✅ Compreende conceito de eventos

#### **🥈 Intermediário (70-85 pontos):**

* ✅ Aplica event delegation efetivamente
* ✅ Implementa validação em tempo real
* ✅ Usa múltiplos tipos de eventos
* ✅ Debugga problemas de forma independente

#### **🥇 Avançado (85-100 pontos):**

* ✅ Implementa debouncing e otimizações
* ✅ Cria custom events
* ✅ Código organizado e eficiente
* ✅ Demonstra thinking oriented to UX

### **📈 Rubrica Detalhada:**

```
EVENTO LISTENERS:
□ Sintaxe correta do addEventListener
□ Escolha apropriada do tipo de evento
□ Função callback bem estruturada
□ Tratamento de erros básico

VALIDAÇÃO:
□ Verificação de campos obrigatórios
□ Feedback visual adequado
□ preventDefault() usado corretamente
□ Experiência do usuário intuitiva

CÓDIGO:
□ Organização lógica
□ Comentários explicativos
□ Variáveis com nomes descritivos
□ Reutilização de código
```

---

## 🔄 **INTEGRAÇÃO COM TODO LIST**

### **🎯 Como Esta Aula se Conecta ao Projeto:**

#### **Aulas Anteriores (Fundação):**

* **Aula 1:** Variáveis, funções, estruturas de controle
* **Aula 2:** DOM manipulation, seletores, modificação de elementos

#### **Esta Aula (Interatividade):**

* **Captura de entrada:** Input de novas tarefas
* **Validação:** Não permitir tarefas vazias
* **Ações do usuário:** Click em botões, Enter no input
* **Feedback:** Resposta visual às ações

#### **Próximas Aulas (Construção):**

* **Aula 4:** Arrays para gerenciar lista de tarefas
* **Aula 5:** Criação dinâmica de elementos TODO
* **Aula 6:** CRUD completo (Create, Read, Update, Delete)

### **🧩 Funcionalidades TODO List (Aula 3):**

```javascript
// Funcionalidades implementadas nesta aula:
✅
Adicionar tarefa(Enter + Click)✅ Validar entrada não vazia✅ Feedback visual de ações✅ Prevenção de comportamentos padrão✅ Base para próximas funcionalidades
```

---

## 📚 **RECURSOS COMPLEMENTARES**

### **🔗 Links Úteis:**

* [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events) - Referência oficial de eventos
* [JavaScript.info Events](https://javascript.info/events) - Tutorial detalhado
* [Event Delegation Guide](https://davidwalsh.name/event-delegate) - Guia de event delegation
* [Form Validation Examples](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) - Exemplos de validação

### **📖 Leitura Complementar:**

* **Event Bubbling vs Capturing** - Fases dos eventos
* **Passive Event Listeners** - Otimização de performance
* **Touch Events** - Eventos para dispositivos móveis
* **Keyboard Navigation** - Acessibilidade e usabilidade

### **🎥 Recursos Multimídia:**

* Vídeos de demonstração de cada conceito
* Screencast das soluções dos exercícios
* Exemplos interativos no CodePen
* Workshops gravados

### **🛠️ Ferramentas Úteis:**

* **EventListener Visualizer** - Para entender propagação
* **Form Validation Library** - Exemplos de validação robusta
* **Event Debugger** - Browser extension para debug
* **Performance Monitor** - Para otimização

---

## 🎯 **PRÓXIMOS PASSOS**

### **📅 Preparação para Aula 4:**

01. **Revisar conceitos:** Certificar que eventos estão sólidos
02. **Praticar:** Completar exercícios não finalizados
03. **Experimentar:** Criar pequenos projetos com eventos
04. **Pesquisar:** Explorar tipos de eventos não abordados

### **🚀 Evolução do Projeto:**

* **Aula 4:** Implementar array de tarefas
* **Aula 5:** Criar elementos dinamicamente
* **Aula 6:** Sistema CRUD completo
* **Aula 7:** Persistência com localStorage
* **Aula 8:** Features avançadas e polimento

### **💡 Projetos Extras:**

* Calculadora interativa
* Jogo da velha com eventos
* Formulário de múltiplas etapas
* Gallery com navegação por teclado

---

## 🤝 **CONTRIBUIÇÕES E FEEDBACK**

### **📝 Como Melhorar Este Material:**

01. **Teste com alunos reais** - Feedback é fundamental
02. **Documente dificuldades** - Onde alunos têm mais problemas?
03. **Sugira exercícios** - Novos desafios e aplicações
04. **Reporte bugs** - Código que não funciona como esperado
05. **Compartilhe sucessos** - Estratégias que funcionaram bem

### **🎯 Áreas para Expansão:**

* Mais exercícios para cada nível
* Versões para diferentes frameworks
* Suporte a outros idiomas
* Material para diferentes faixas etárias
* Integração com outras tecnologias

### **📧 Contato:**

* Issues no repositório para bugs
* Discussions para sugestões
* Pull requests para melhorias
* Compartilhe experiências de ensino

---

## 🎉 **CONCLUSÃO**

### **🏆 O Que Foi Alcançado:**

Ao completar esta aula, os alunos terão dominado o sistema de eventos JavaScript, sendo capazes de criar interfaces totalmente interativas e responsivas. Eles compreenderão desde conceitos fundamentais até técnicas avançadas, tendo uma base sólida para desenvolver aplicações web modernas.

### **🎯 Impacto no Desenvolvimento:**

* **Técnico:** Domínio completo de eventos JavaScript
* **Profissional:** Habilidade essencial para desenvolvimento web
* **Pessoal:** Confiança para criar projetos interativos
* **Educacional:** Base para frameworks modernos (React, Vue, Angular)

### **💪 Motivação Final:**

> *"Eventos são a ponte entre o usuário e sua aplicação. Hoje vocês aprenderam a construir essa ponte de forma sólida e elegante. Com esse conhecimento, vocês podem criar experiências digitais que realmente engajam e respondem aos usuários. Continuem praticando e explorando - o mundo das interfaces interativas está ao alcance de vocês!"*

---

**🎓 Parabéns por completar a Aula 3! Você agora domina os eventos JavaScript e está pronto para a próxima etapa do desenvolvimento do TODO List!**

**📅 Próxima parada: Aula 4 - Arrays e Manipulação de Dados!**
