# 🎯 **EXERCÍCIOS PRÁTICOS - AULA 3**

## **Eventos e Interatividade**

---

## 🎯 **Objetivo da Aula**

Dominar o sistema de eventos do JavaScript, desde eventos básicos até técnicas avançadas como event delegation, custom events e debouncing. Ao final, você será capaz de criar interfaces totalmente interativas e responsivas.

---

## 📚 **Conceitos Fundamentais**

### **🎪 Tipos de Eventos:**

* **Mouse:** click, dblclick, mouseover, mouseout, mousemove
* **Teclado:** keydown, keyup, keypress
* **Formulário:** submit, change, input, focus, blur
* **Janela:** load, resize, scroll

### **🛠️ Métodos Essenciais:**

* `addEventListener()` - Adicionar event listeners
* `removeEventListener()` - Remover event listeners
* `preventDefault()` - Prevenir comportamento padrão
* `stopPropagation()` - Parar propagação do evento

### **📦 Object Event:**

* `event.target` - Elemento que disparou o evento
* `event.type` - Tipo do evento
* `event.preventDefault()` - Previne ação padrão
* `event.stopPropagation()` - Para propagação

---

## 🥉 **NÍVEL INICIANTE**

*Eventos básicos e fundamentos*

### **📝 Exercício 1: Botão Contador**

**Objetivo:** Criar um contador simples que aumenta a cada clique.

```html
<button id="contador">Cliques: 0</button>
```

**Tarefas:**
1. ✅ Criar um contador que inicia em 0
2. ✅ A cada clique, aumentar o contador em 1
3. ✅ Atualizar o texto do botão com o valor atual
4. ✅ Quando atingir 10 cliques, mudar a cor do botão
5. ✅ Quando atingir 20 cliques, mostrar um alerta

**💡 Dicas:**
* Use `addEventListener('click', function)`
* Mantenha o contador em uma variável global
* Use `textContent` para atualizar o texto

**🎯 Resultado Esperado:**
* Botão que conta cliques e muda aparência conforme progresso

---

### **📝 Exercício 2: Input com Enter**

**Objetivo:** Capturar texto quando o usuário pressionar Enter.

```html
<input type="text" id="textoInput" placeholder="Digite e pressione Enter">
<div id="resultado"></div>
```

**Tarefas:**
1. ✅ Escutar o evento `keypress` no input
2. ✅ Verificar se a tecla pressionada foi Enter (`event.key === 'Enter'`)
3. ✅ Capturar o valor do input
4. ✅ Exibir o texto na div resultado
5. ✅ Limpar o input após capturar

**💡 Dicas:**
* Use `event.key` para identificar a tecla
* Valide se o input não está vazio
* Use `value` para pegar o conteúdo do input

**🎯 Resultado Esperado:**
* Input que responde ao Enter e exibe o texto digitado

---

### **📝 Exercício 3: Validação de Formulário**

**Objetivo:** Validar formulário antes do envio.

```html
<form id="meuForm">
    <input type="text" id="nome" placeholder="Nome (mínimo 3 caracteres)">
    <input type="email" id="email" placeholder="Email">
    <button type="submit">Enviar</button>
</form>
<div id="mensagens"></div>
```

**Tarefas:**
1. ✅ Prevenir o envio padrão do formulário (`preventDefault`)
2. ✅ Validar se o nome tem pelo menos 3 caracteres
3. ✅ Validar se o email contém @ e .
4. ✅ Exibir mensagem de erro ou sucesso
5. ✅ Mudar a cor dos campos inválidos

**💡 Dicas:**
* Use `event.preventDefault()` no submit
* Crie funções separadas para cada validação
* Use classes CSS para indicar erro/sucesso

**🎯 Resultado Esperado:**
* Formulário que valida dados e exibe feedback visual

---

### **📝 Exercício 4: Mudança de Cor ao Hover**

**Objetivo:** Criar efeitos visuais com mouse.

```html
<div class="caixa">Passe o mouse aqui</div>
```

**Tarefas:**
1. ✅ Adicionar evento `mouseenter` para mudar cor de fundo
2. ✅ Adicionar evento `mouseleave` para voltar cor original
3. ✅ Criar efeito suave com transições CSS
4. ✅ Adicionar evento `click` para mudança permanente
5. ✅ Mostrar coordenadas do mouse no elemento

**💡 Dicas:**
* Use `style.backgroundColor` para mudar cores
* Combine JavaScript com transições CSS
* Use `event.clientX` e `event.clientY` para coordenadas

**🎯 Resultado Esperado:**
* Elemento que reage ao mouse com efeitos visuais

---

## 🥈 **NÍVEL INTERMEDIÁRIO**

*Event delegation e técnicas avançadas*

### **📝 Exercício 5: Lista Dinâmica com Remoção**

**Objetivo:** Criar lista onde itens podem ser removidos dinamicamente.

```html
<button id="adicionarItem">Adicionar Item</button>
<ul id="lista"></ul>
```

**Tarefas:**
1. ✅ Criar função que adiciona novos itens à lista
2. ✅ Usar **event delegation** para remover itens
3. ✅ Adicionar botão "X" em cada item para remoção
4. ✅ Implementar confirmação antes de remover
5. ✅ Adicionar animação de remoção

**💡 Dicas:**
* Use event delegation no elemento pai (`ul`)
* Verifique `event.target` para identificar o botão clicado
* Use `closest()` para encontrar o item pai

**🎯 Resultado Esperado:**
* Lista funcional com adição/remoção dinâmica de itens

---

### **📝 Exercício 6: Navegação por Teclado**

**Objetivo:** Implementar navegação acessível em um menu.

```html
<div id="menu">
    <div class="item-menu">Início</div>
    <div class="item-menu">Produtos</div>
    <div class="item-menu">Contato</div>
</div>
```

**Tarefas:**
1. ✅ Usar setas ↑↓ para navegar entre itens
2. ✅ Destacar item ativo visualmente
3. ✅ Enter para "selecionar" item atual
4. ✅ Escape para limpar seleção
5. ✅ Tab para sair do menu

**💡 Dicas:**
* Mantenha índice do item atual em variável
* Use `event.key` para identificar teclas especiais
* Adicione classe CSS para item ativo

**🎯 Resultado Esperado:**
* Menu navegável inteiramente pelo teclado

---

### **📝 Exercício 7: Formulário com Validação em Tempo Real**

**Objetivo:** Validar campos conforme o usuário digita.

```html
<form id="formCompleto">
    <input type="text" id="usuario" placeholder="Usuário">
    <input type="password" id="senha" placeholder="Senha">
    <input type="password" id="confirmarSenha" placeholder="Confirmar Senha">
    <button type="submit">Cadastrar</button>
</form>
```

**Tarefas:**
1. ✅ Validar usuário em tempo real (evento `input`)
2. ✅ Verificar força da senha conforme digitação
3. ✅ Comparar senhas em tempo real
4. ✅ Mostrar indicadores visuais de validação
5. ✅ Habilitar botão submit apenas quando tudo válido

**💡 Dicas:**
* Use diferentes eventos: `input`,  `blur`,  `focus`
* Crie indicadores visuais (ícones, cores)
* Desabilite submit até formulário estar válido

**🎯 Resultado Esperado:**
* Formulário com feedback instantâneo e intuitivo

---

### **📝 Exercício 8: Sistema de Abas (Tabs)**

**Objetivo:** Criar sistema de navegação por abas.

```html
<div class="tabs">
    <div class="tab-button active" data-tab="tab1">Aba 1</div>
    <div class="tab-button" data-tab="tab2">Aba 2</div>
    <div class="tab-button" data-tab="tab3">Aba 3</div>
</div>
<div class="tab-content">
    <div id="tab1" class="tab-panel active">Conteúdo da Aba 1</div>
    <div id="tab2" class="tab-panel">Conteúdo da Aba 2</div>
    <div id="tab3" class="tab-panel">Conteúdo da Aba 3</div>
</div>
```

**Tarefas:**
1. ✅ Implementar clique nas abas para mudança de conteúdo
2. ✅ Usar `data-*` attributes para identificar abas
3. ✅ Adicionar/remover classes ativas
4. ✅ Implementar navegação por teclado (setas)
5. ✅ Adicionar animação de transição

**💡 Dicas:**
* Use `dataset` para acessar data attributes
* Remova classe ativa de todos antes de adicionar ao atual
* Combine com CSS para animações

**🎯 Resultado Esperado:**
* Sistema de abas funcional com navegação por mouse e teclado

---

## 🥇 **NÍVEL AVANÇADO**

*Custom events, debouncing e técnicas profissionais*

### **📝 Exercício 9: Sistema de Busca com Debounce**

**Objetivo:** Implementar busca inteligente que não sobrecarrega o sistema.

```html
<input type="text" id="buscaAvancada" placeholder="Buscar...">
<div id="resultadosBusca"></div>
```

**Tarefas:**
1. ✅ Criar função de debounce personalizada
2. ✅ Aplicar debounce na busca (delay de 300ms)
3. ✅ Simular chamada para API/base de dados
4. ✅ Mostrar indicador de carregamento
5. ✅ Cancelar busca anterior se nova busca iniciar

**💡 Dicas:**
* Função debounce: `clearTimeout` + `setTimeout`
* Use `setTimeout` para simular delay de API
* Implemente loading spinner

**🎯 Resultado Esperado:**
* Sistema de busca otimizado que não faz requisições excessivas

---

### **📝 Exercício 10: Drag and Drop Personalizado**

**Objetivo:** Implementar arrastar e soltar elementos.

```html
<div class="container-drag">
    <div class="zona-origem">
        <div class="item-drag" draggable="true">Item 1</div>
        <div class="item-drag" draggable="true">Item 2</div>
    </div>
    <div class="zona-destino">Arraste itens aqui</div>
</div>
```

**Tarefas:**
1. ✅ Implementar eventos de drag: `dragstart`, `dragend`
2. ✅ Implementar eventos de drop: `dragover`, `drop`
3. ✅ Usar `dataTransfer` para passar dados
4. ✅ Adicionar feedback visual durante o drag
5. ✅ Permitir reordenação dentro da mesma zona

**💡 Dicas:**
* `preventDefault()` é essencial no `dragover`
* Use `dataTransfer.setData()` e `getData()`
* Adicione classes CSS para feedback visual

**🎯 Resultado Esperado:**
* Sistema completo de drag and drop com feedback visual

---

### **📝 Exercício 11: Custom Events e Observer Pattern**

**Objetivo:** Criar sistema de comunicação entre componentes.

```html
<div id="publicador">
    <button id="btnEvento">Disparar Evento</button>
</div>
<div id="observador1">Observador 1: aguardando...</div>
<div id="observador2">Observador 2: aguardando...</div>
```

**Tarefas:**
1. ✅ Criar custom events com `CustomEvent`
2. ✅ Implementar sistema publisher/subscriber
3. ✅ Passar dados complexos nos eventos
4. ✅ Criar múltiplos observadores
5. ✅ Implementar sistema de prioridades

**💡 Dicas:**
* Use `new CustomEvent()` com `detail` property
* `dispatchEvent()` para disparar eventos
* `addEventListener()` para escutar custom events

**🎯 Resultado Esperado:**
* Sistema flexível de comunicação entre componentes

---

### **📝 Exercício 12: Gestos Touch (Mobile)**

**Objetivo:** Implementar gestos para dispositivos móveis.

```html
<div id="areaTouch">
    <div class="elemento-touch">Elemento para gestos</div>
</div>
<div id="infoGestos">Info dos gestos aparecerá aqui</div>
```

**Tarefas:**
1. ✅ Detectar touch events: `touchstart`, `touchmove`, `touchend`
2. ✅ Implementar swipe (deslizar) em 4 direções
3. ✅ Detectar pinch (zoom) com múltiplos toques
4. ✅ Implementar tap duplo (double tap)
5. ✅ Adicionar threshold para evitar falsos positivos

**💡 Dicas:**
* Use `event.touches` para múltiplos toques
* Calcule diferenças de posição e tempo
* Defina thresholds para distância e velocidade

**🎯 Resultado Esperado:**
* Interface responsiva a gestos móveis

---

## 🎮 **PROJETO INTEGRADOR**

### **🚀 TODO List Interativo - Etapa 3**

**Objetivo:** Adicionar todos os eventos necessários ao TODO List.

**Funcionalidades a Implementar:**
1. ✅ **Adicionar tarefa** - Enter no input ou clique no botão
2. ✅ **Marcar como completa** - Clique no checkbox
3. ✅ **Deletar tarefa** - Clique no botão delete
4. ✅ **Edição inline** - Duplo clique no texto
5. ✅ **Validação** - Não permitir tarefas vazias
6. ✅ **Undo** - Desfazer última ação
7. ✅ **Atalhos de teclado** - Ctrl+Z, Delete, Enter
8. ✅ **Drag and drop** - Reordenar tarefas

**Código Base:**

```html
<div class="todo-app">
    <input type="text" id="novoTodo" placeholder="Digite uma nova tarefa...">
    <button id="addBtn">Adicionar</button>
    <ul id="listaTodos"></ul>
    <div class="stats">
        <span id="total">0</span> total |
        <span id="concluidas">0</span> concluídas |
        <span id="pendentes">0</span> pendentes
    </div>
</div>
```

**Eventos Necessários:**
* `input` - para capturar Enter
* `click` - para botões e checkboxes
* `dblclick` - para edição inline
* `keydown` - para atalhos de teclado
* `dragstart`,  `drop` - para reordenação

---

## 🏆 **CRITÉRIOS DE AVALIAÇÃO**

### **🥉 Nível Iniciante (60-70 pontos):**

* ✅ Eventos básicos funcionando
* ✅ preventDefault() usado corretamente
* ✅ Validação simples de formulários
* ✅ Feedback visual básico

### **🥈 Nível Intermediário (70-85 pontos):**

* ✅ Event delegation implementado
* ✅ Navegação por teclado funcional
* ✅ Validação em tempo real
* ✅ Múltiplos tipos de eventos

### **🥇 Nível Avançado (85-100 pontos):**

* ✅ Debouncing implementado
* ✅ Custom events funcionais
* ✅ Drag and drop completo
* ✅ Código organizado e otimizado

---

## 🔧 **DICAS DE DEBUGGING**

### **🐛 Problemas Comuns:**

1. **Event listener não funciona**
   - Verificar se elemento existe quando código executa
   - Usar `DOMContentLoaded` se necessário

2. **preventDefault() não funciona**
   - Verificar se está no evento correto
   - Confirmar que `event` está definido

3. **Event delegation não funciona**
   - Verificar se está ouvindo no elemento pai correto
   - Usar `event.target` ou `event.target.closest()`

4. **Memory leaks com event listeners**
   - Usar `removeEventListener()` quando necessário
   - Evitar closures desnecessárias

### **🔍 Ferramentas de Debug:**

```javascript
// Console log para debug
console.log('Evento disparado:', event.type);
console.log('Target:', event.target);
console.log('Current target:', event.currentTarget);

// Breakpoints no DevTools
debugger; // Para pausar execução

// Monitorar eventos
monitorEvents(document.body, 'click');
```

---

## 📚 **RECURSOS EXTRAS**

### **🔗 Links Úteis:**

* [MDN - Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [JavaScript Event Delegation](https://davidwalsh.name/event-delegate)

### **📖 Leitura Complementar:**

* Event Bubbling vs Capturing
* Passive Event Listeners
* Touch Events para Mobile
* Intersection Observer API

### **🎯 Próximos Passos:**

* Aula 4: Arrays e Manipulação de Dados
* Implementar CRUD completo
* Gerenciamento de estado
* Performance com grandes listas

---

**🎓 Lembre-se:** Eventos são a base da interatividade web. Dominar eventos significa criar experiências de usuário excepcionais!

**💪 Pratique bastante:** Cada exercício construa sobre o anterior. A prática é fundamental para consolidar o aprendizado!
