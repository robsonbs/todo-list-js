# 📚 EXERCÍCIOS - AULA 6: EVENTOS AVANÇADOS E INTERATIVIDADE

## 🎯 **Objetivos dos Exercícios**

* Dominar `addEventListener` e `removeEventListener`
* Compreender Event Object e suas propriedades
* Aplicar Event Bubbling, Capturing e Delegation
* Criar Custom Events para comunicação entre componentes
* Implementar interações avançadas: keyboard, mouse, drag & drop, touch
* Integrar todos os conceitos em um sistema completo de eventos

---

## 🟢 **NÍVEL INICIANTE - Fundamentos de Eventos**

### **Exercício 1.1: Primeiros Passos com addEventListener**

**Objetivo:** Aprender a sintaxe básica e diferentes tipos de eventos

```javascript
// Crie um botão que muda de cor quando clicado
// Adicione os seguintes comportamentos:

// 1. Clique: alterna entre azul e verde
// 2. Mouse over: adiciona borda preta
// 3. Mouse out: remove a borda
// 4. Duplo clique: mostra um alert com "Duplo clique detectado!"

// HTML sugerido:
// <button id="botao-cores">Clique em mim!</button>

// SEU CÓDIGO AQUI:
```

**Dica:** Use `addEventListener` para cada tipo de evento separadamente.

---

### **Exercício 1.2: Formulário com Validação em Tempo Real**

**Objetivo:** Trabalhar com eventos de input e validação

```html
<!-- HTML fornecido -->
<form id="form-usuario">
    <div>
        <label>Nome:</label>
        <input type="text" id="nome" placeholder="Digite seu nome">
        <span id="erro-nome" class="erro"></span>
    </div>
    <div>
        <label>Email:</label>
        <input type="email" id="email" placeholder="Digite seu email">
        <span id="erro-email" class="erro"></span>
    </div>
    <div>
        <label>Idade:</label>
        <input type="number" id="idade" placeholder="Digite sua idade">
        <span id="erro-idade" class="erro"></span>
    </div>
    <button type="submit">Enviar</button>
</form>
```

```javascript
// Implemente validação em tempo real:
// 1. Nome: mínimo 2 caracteres
// 2. Email: formato válido
// 3. Idade: entre 13 e 120 anos
// 4. Mostre mensagens de erro em tempo real
// 5. Desabilite o botão submit se houver erros

// SEU CÓDIGO AQUI:
```

---

### **Exercício 1.3: Lista de Tarefas Básica**

**Objetivo:** Praticar manipulação de DOM com eventos

```javascript
// Crie uma lista de tarefas com as seguintes funcionalidades:
// 1. Adicionar nova tarefa (input + botão)
// 2. Marcar tarefa como completa (clique no item)
// 3. Remover tarefa (botão X em cada item)
// 4. Contador de tarefas pendentes

// HTML sugerido:
// <div id="todo-app">
//     <input type="text" id="nova-tarefa" placeholder="Nova tarefa...">
//     <button id="adicionar">Adicionar</button>
//     <ul id="lista-tarefas"></ul>
//     <div id="contador">Tarefas pendentes: 0</div>
// </div>

// SEU CÓDIGO AQUI:
```

---

## 🟡 **NÍVEL INTERMEDIÁRIO - Técnicas Avançadas**

### **Exercício 2.1: Event Object e Coordenadas**

**Objetivo:** Explorar propriedades do Event Object

```javascript
// Crie um "Paint" simples onde:
// 1. Clique na tela cria círculos coloridos
// 2. A cor muda baseada na posição do mouse (RGB)
// 3. O tamanho do círculo varia com a velocidade do movimento
// 4. Pressione 'C' para limpar a tela
// 5. Mostre informações do evento em tempo real

// HTML sugerido:
// <div id="canvas" style="width: 800px; height: 400px; border: 1px solid black; position: relative;">
//     <div id="info-evento"></div>
// </div>

// SEU CÓDIGO AQUI:
```

---

### **Exercício 2.2: Event Delegation Avançado**

**Objetivo:** Implementar delegation eficiente para elementos dinâmicos

```javascript
// Crie um sistema de comentários onde:
// 1. Usuários podem adicionar comentários
// 2. Cada comentário pode ter respostas (nested)
// 3. Use delegation para gerenciar todos os eventos
// 4. Funcionalidades: curtir, responder, editar, excluir
// 5. Contador de curtidas em tempo real

// Estrutura de comentário:
// {
//     id: 1,
//     autor: "João",
//     texto: "Ótimo artigo!",
//     curtidas: 5,
//     respostas: [...]
// }

// SEU CÓDIGO AQUI:
```

---

### **Exercício 2.3: Custom Events para Módulos**

**Objetivo:** Criar sistema de comunicação entre componentes

```javascript
// Crie um sistema de notificações com:
// 1. Módulo NotificationManager (gerencia notificações)
// 2. Módulo UserActions (ações do usuário)
// 3. Módulo Analytics (rastreia eventos)
// 4. Use custom events para comunicação
// 5. Tipos: success, error, warning, info

// Eventos customizados necessários:
// - 'notification:show'
// - 'notification:hide'
// - 'user:action'
// - 'analytics:track'

// SEU CÓDIGO AQUI:
```

---

### **Exercício 2.4: Keyboard Events - Atalhos e Combos**

**Objetivo:** Implementar sistema de atalhos de teclado

```javascript
// Crie um editor de texto com atalhos:
// 1. Ctrl+S: Salvar
// 2. Ctrl+Z: Desfazer
// 3. Ctrl+Y: Refazer
// 4. Ctrl+B: Negrito
// 5. Ctrl+I: Itálico
// 6. Esc: Sair do modo edição
// 7. F11: Modo tela cheia
// 8. Tab: Aumentar indentação

// Funcionalidades adicionais:
// - Histórico de mudanças (undo/redo)
// - Indicador visual dos atalhos ativos
// - Prevenção de atalhos padrão do browser

// SEU CÓDIGO AQUI:
```

---

## 🔴 **NÍVEL AVANÇADO - Sistemas Complexos**

### **Exercício 3.1: Drag and Drop Avançado**

**Objetivo:** Sistema completo de drag and drop com múltiplas funcionalidades

```javascript
// Crie um Kanban Board com:
// 1. Múltiplas colunas (TODO, In Progress, Done)
// 2. Cards arrastavéis entre colunas
// 3. Reordenação dentro da mesma coluna
// 4. Indicadores visuais durante o arrasto
// 5. Persistência usando localStorage
// 6. Animações suaves
// 7. Diferentes tipos de cards (task, bug, feature)

// Funcionalidades extras:
// - Drag de arquivos externos para criar cards
// - Hover zones com feedback visual
// - Touch support para mobile
// - Undo/redo para movimentações

// SEU CÓDIGO AQUI:
```

---

### **Exercício 3.2: Touch Events - Gestos Mobile**

**Objetivo:** Implementar gestos touch avançados

```javascript
// Crie um Photo Viewer com gestos:
// 1. Swipe left/right: próxima/anterior imagem
// 2. Pinch to zoom: zoom in/out
// 3. Double tap: zoom 100%
// 4. Long press: mostrar menu de ações
// 5. Pan: mover imagem quando zoomed
// 6. Rotation: rotacionar imagem

// Funcionalidades extras:
// - Momentum scrolling
// - Boundaries para pan/zoom
// - Smooth animations
// - Performance otimizada
// - Fallback para mouse events

// SEU CÓDIGO AQUI:
```

---

### **Exercício 3.3: Game Engine com Eventos**

**Objetivo:** Sistema de eventos para jogos

```javascript
// Crie um jogo simples (ex: Snake, Pong, ou Breakout) com:
// 1. Game loop otimizado
// 2. Sistema de eventos customizados
// 3. Input handling (keyboard, mouse, touch)
// 4. Collision detection
// 5. Score system
// 6. Pause/resume
// 7. Multiple levels

// Arquitetura orientada a eventos:
// - 'game:start'
// - 'game:pause'
// - 'game:over'
// - 'player:move'
// - 'collision:detected'
// - 'score:update'
// - 'level:complete'

// SEU CÓDIGO AQUI:
```

---

### **Exercício 3.4: Sistema Completo de Eventos para TODO**

**Objetivo:** Integrar todos os conceitos em uma aplicação real

```javascript
// Evolua a TODO List com funcionalidades avançadas:

// 1. ESTRUTURA DE DADOS:
// - Categorias/projetos
// - Prioridades (baixa, média, alta, urgente)
// - Datas de vencimento
// - Subtarefas
// - Tags/labels
// - Anexos

// 2. INTERFACE AVANÇADA:
// - Drag and drop para reordenar
// - Edição inline com double-click
// - Filtros e busca em tempo real
// - Views: lista, grid, calendar
// - Dark/light mode toggle

// 3. EVENTOS AVANÇADOS:
// - Auto-save com debounce
// - Atalhos de teclado
// - Touch gestures para mobile
// - Notifications/reminders
// - Collaboration (real-time updates)

// 4. PERFORMANCE:
// - Virtual scrolling para listas grandes
// - Event delegation otimizada
// - Lazy loading de dados
// - Caching inteligente

// 5. ACESSIBILIDADE:
// - Navegação por teclado
// - Screen reader support
// - Focus management
// - ARIA attributes

// SEU CÓDIGO AQUI:
```

---

## 🎯 **EXERCÍCIOS BÔNUS - Desafios Especiais**

### **Bônus 1: Event Performance**

```javascript
// Otimize uma página com 10.000 botões:
// 1. Use event delegation
// 2. Implemente throttle/debounce
// 3. Meça performance com console.time
// 4. Compare diferentes abordagens

// Cenários para testar:
// - addEventListener em cada botão vs delegation
// - Scroll events com throttle vs sem throttle
// - Resize events com debounce vs sem debounce
```

### **Bônus 2: Cross-Browser Events**

```javascript
// Crie uma biblioteca de eventos cross-browser:
// 1. Normalize diferenças entre browsers
// 2. Polyfills para eventos modernos
// 3. Touch events para desktop
// 4. Keyboard events para mobile
// 5. Custom events com fallbacks
```

### **Bônus 3: Event Analytics**

```javascript
// Sistema de analytics para eventos:
// 1. Rastreie todos os eventos da página
// 2. Calcule heatmaps de cliques
// 3. Analise user journeys
// 4. Detecte comportamentos anômalos
// 5. Export data para análise
```

---

## 📝 **CRITÉRIOS DE AVALIAÇÃO**

### **Nível Iniciante (1-3 pontos por exercício)**

* ✅ Código funciona corretamente
* ✅ Usa addEventListener apropriadamente
* ✅ Trata eventos básicos
* ✅ Manipula DOM corretamente

### **Nível Intermediário (4-6 pontos por exercício)**

* ✅ Implementa event delegation
* ✅ Usa Event Object adequadamente
* ✅ Cria custom events
* ✅ Gerencia estado complexo
* ✅ Otimiza performance

### **Nível Avançado (7-10 pontos por exercício)**

* ✅ Arquitetura escalável
* ✅ Múltiplos tipos de eventos
* ✅ Performance otimizada
* ✅ Cross-browser compatibility
* ✅ Acessibilidade
* ✅ Code quality e documentação

---

## 🛠️ **RECURSOS ÚTEIS**

### **Documentação:**

* [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
* [MDN: Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [MDN: CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

### **Ferramentas de Debug:**

* DevTools Event Listeners tab
* `console.trace()` para call stack
* `performance.mark()` para medições
* Lighthouse para performance audit

### **Libraries para Inspiração:**

* Hammer.js (touch gestures)
* Interact.js (drag and drop)
* Hotkeys.js (keyboard shortcuts)
* RxJS (reactive events)

---

## 🎉 **PROJETO FINAL**

Ao completar todos os exercícios, você terá construído uma **TODO List Completa** com:

* ✅ **10+ tipos de eventos** implementados
* ✅ **Event delegation** otimizada
* ✅ **Custom events** para arquitetura modular
* ✅ **Drag and drop** para UX avançada
* ✅ **Keyboard shortcuts** para produtividade
* ✅ **Touch support** para mobile
* ✅ **Performance** otimizada para listas grandes
* ✅ **Acessibilidade** completa
* ✅ **Cross-browser** compatibility

**Parabéns! 🎊** Você dominou os eventos JavaScript e está pronto para criar interfaces web altamente interativas!

---

*💡 **Dica Final:** Pratique um exercício por dia e construa um portfólio incrível de projetos interativos!*
