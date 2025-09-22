/* ============================================================================
   🚀 AULA 8: MANIPULAÇÃO AVANÇADA DO DOM - CÓDIGO PROGRESSIVO
   ============================================================================
   
   Demonstrações práticas de técnicas avançadas de manipulação DOM:
   • Performance Optimization com DocumentFragment
   • Observadores: IntersectionObserver e MutationObserver
   • Virtual Scrolling para listas grandes
   • API de Seleção e Range para editores
   • Custom Elements e Web Components
   • Drag & Drop API avançado
   • RequestAnimationFrame para animações fluidas
   
   Autor: Sistema de Educação JavaScript
   Data: Setembro 2025
   ============================================================================ */

// ============================================================================
// 🎯 DEMONSTRAÇÃO 1: PERFORMANCE OPTIMIZATION
// ============================================================================

class Demo1_PerformanceOptimization {
  constructor() {
    this.container = null;
    this.stats = {
      createElement: 0,
      documentFragment: 0,
      batchUpdate: 0,
    };
    this.init();
  }

  init() {
    console.log("🚀 Demo 1: Performance Optimization inicializada");
    this.container = document.getElementById("demo1-container");
    this.setupControls();
  }

  setupControls() {
    // Método tradicional (lento)
    document.getElementById("btn-traditional").addEventListener("click", () => {
      this.demonstrarMetodoTradicional();
    });

    // Método com DocumentFragment (rápido)
    document.getElementById("btn-fragment").addEventListener("click", () => {
      this.demonstrarDocumentFragment();
    });

    // Método com Batch Updates (otimizado)
    document.getElementById("btn-batch").addEventListener("click", () => {
      this.demonstrarBatchUpdates();
    });

    // Comparar performance
    document.getElementById("btn-benchmark").addEventListener("click", () => {
      this.executarBenchmark();
    });
  }

  demonstrarMetodoTradicional() {
    console.log("📊 Testando método tradicional...");
    const startTime = performance.now();

    const container = document.getElementById("traditional-list");
    container.innerHTML = ""; // Limpar lista

    // Método LENTO: cada appendChild causa reflow
    for (let i = 0; i < 1000; i++) {
      const item = document.createElement("li");
      item.className = "list-item";
      item.textContent = `Item tradicional ${i + 1}`;
      item.style.padding = "8px";
      item.style.borderBottom = "1px solid #eee";

      container.appendChild(item); // Reflow a cada inserção!
    }

    const endTime = performance.now();
    this.stats.createElement = endTime - startTime;

    this.updateStats();
    console.log(
      `⏱️ Método tradicional: ${this.stats.createElement.toFixed(2)}ms`
    );
  }

  demonstrarDocumentFragment() {
    console.log("📊 Testando DocumentFragment...");
    const startTime = performance.now();

    const container = document.getElementById("fragment-list");
    container.innerHTML = "";

    // Método RÁPIDO: usar DocumentFragment
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 1000; i++) {
      const item = document.createElement("li");
      item.className = "list-item";
      item.textContent = `Item fragment ${i + 1}`;
      item.style.padding = "8px";
      item.style.borderBottom = "1px solid #eee";

      fragment.appendChild(item); // Sem reflow!
    }

    container.appendChild(fragment); // Um único reflow!

    const endTime = performance.now();
    this.stats.documentFragment = endTime - startTime;

    this.updateStats();
    console.log(
      `⚡ DocumentFragment: ${this.stats.documentFragment.toFixed(2)}ms`
    );
  }

  demonstrarBatchUpdates() {
    console.log("📊 Testando Batch Updates...");
    const startTime = performance.now();

    const container = document.getElementById("batch-list");
    container.innerHTML = "";

    // Método OTIMIZADO: batch de innerHTML
    let htmlContent = "";

    for (let i = 0; i < 1000; i++) {
      htmlContent += `
                <li class="list-item" style="padding: 8px; border-bottom: 1px solid #eee;">
                    Item batch ${i + 1}
                </li>
            `;
    }

    container.innerHTML = htmlContent; // Uma única operação DOM!

    const endTime = performance.now();
    this.stats.batchUpdate = endTime - startTime;

    this.updateStats();
    console.log(`🔥 Batch Updates: ${this.stats.batchUpdate.toFixed(2)}ms`);
  }

  async executarBenchmark() {
    console.log("🏁 Executando benchmark completo...");

    // Limpar tudo
    document.querySelectorAll(".benchmark-list").forEach((list) => {
      list.innerHTML = "";
    });

    // Executar testes sequencialmente
    await this.delay(100);
    this.demonstrarMetodoTradicional();

    await this.delay(100);
    this.demonstrarDocumentFragment();

    await this.delay(100);
    this.demonstrarBatchUpdates();

    // Mostrar resultados
    this.exibirResultadosBenchmark();
  }

  updateStats() {
    const statsElement = document.getElementById("performance-stats");
    if (statsElement) {
      statsElement.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Tradicional:</span>
                    <span class="stat-value">${this.stats.createElement.toFixed(
                      2
                    )}ms</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">DocumentFragment:</span>
                    <span class="stat-value">${this.stats.documentFragment.toFixed(
                      2
                    )}ms</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Batch Updates:</span>
                    <span class="stat-value">${this.stats.batchUpdate.toFixed(
                      2
                    )}ms</span>
                </div>
            `;
    }
  }

  exibirResultadosBenchmark() {
    const fastest = Math.min(
      this.stats.createElement,
      this.stats.documentFragment,
      this.stats.batchUpdate
    );
    let winner = "";

    if (fastest === this.stats.createElement) winner = "Tradicional";
    else if (fastest === this.stats.documentFragment)
      winner = "DocumentFragment";
    else winner = "Batch Updates";

    const improvement = (
      ((this.stats.createElement - fastest) / this.stats.createElement) *
      100
    ).toFixed(1);

    alert(`🏆 Vencedor: ${winner}\n⚡ Melhoria: ${improvement}% mais rápido!`);
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ============================================================================
// 🔍 DEMONSTRAÇÃO 2: OBSERVADORES (INTERSECTION & MUTATION)
// ============================================================================

class Demo2_Observadores {
  constructor() {
    this.intersectionObserver = null;
    this.mutationObserver = null;
    this.init();
  }

  init() {
    console.log("🔍 Demo 2: Observadores inicializada");
    this.setupIntersectionObserver();
    this.setupMutationObserver();
    this.createScrollableContent();
  }

  setupIntersectionObserver() {
    // Configurar Intersection Observer para lazy loading
    const options = {
      root: null, // viewport
      rootMargin: "50px",
      threshold: 0.1,
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadContent(entry.target);
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    }, options);

    console.log("👁️ IntersectionObserver configurado");
  }

  setupMutationObserver() {
    const targetNode = document.getElementById("mutation-target");

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.logMutation(mutation);
      });
    });

    if (targetNode) {
      this.mutationObserver.observe(targetNode, config);
      console.log("🔧 MutationObserver configurado");
    }
  }

  createScrollableContent() {
    const container = document.getElementById("lazy-load-container");
    if (!container) return;

    // Criar cards que serão carregados sob demanda
    for (let i = 1; i <= 20; i++) {
      const card = document.createElement("div");
      card.className = "lazy-card";
      card.dataset.content = i;
      card.innerHTML = `
                <div class="card-placeholder">
                    <div class="loading-spinner"></div>
                    <p>Carregando conteúdo ${i}...</p>
                </div>
            `;

      container.appendChild(card);
      this.intersectionObserver.observe(card);
    }
  }

  loadContent(element) {
    const contentId = element.dataset.content;

    // Simular carregamento assíncrono
    setTimeout(() => {
      element.innerHTML = `
                <div class="card-content">
                    <h3>Conteúdo ${contentId}</h3>
                    <p>Este conteúdo foi carregado dinamicamente quando entrou na viewport!</p>
                    <img src="https://picsum.photos/300/200?random=${contentId}" 
                         alt="Imagem ${contentId}" 
                         style="width: 100%; border-radius: 8px;">
                    <p><small>Carregado em: ${new Date().toLocaleTimeString()}</small></p>
                </div>
            `;

      element.classList.add("loaded");
      console.log(`📦 Conteúdo ${contentId} carregado!`);
    }, Math.random() * 1000 + 500); // 500-1500ms
  }

  logMutation(mutation) {
    const log = document.getElementById("mutation-log");
    if (!log) return;

    const time = new Date().toLocaleTimeString();
    let message = "";

    switch (mutation.type) {
      case "childList":
        if (mutation.addedNodes.length > 0) {
          message = `➕ ${mutation.addedNodes.length} nó(s) adicionado(s)`;
        }
        if (mutation.removedNodes.length > 0) {
          message = `➖ ${mutation.removedNodes.length} nó(s) removido(s)`;
        }
        break;
      case "attributes":
        message = `🔧 Atributo '${mutation.attributeName}' modificado`;
        break;
      case "characterData":
        message = `📝 Texto modificado`;
        break;
    }

    if (message) {
      const logEntry = document.createElement("div");
      logEntry.className = "mutation-entry";
      logEntry.innerHTML = `<span class="time">${time}</span> ${message}`;
      log.appendChild(logEntry);

      // Manter apenas os últimos 10 logs
      while (log.children.length > 10) {
        log.removeChild(log.firstChild);
      }

      log.scrollTop = log.scrollHeight;
    }
  }

  // Métodos para demonstrar mutations
  adicionarElemento() {
    const target = document.getElementById("mutation-target");
    const newElement = document.createElement("div");
    newElement.className = "dynamic-item";
    newElement.textContent = `Item ${target.children.length + 1}`;
    target.appendChild(newElement);
  }

  removerElemento() {
    const target = document.getElementById("mutation-target");
    if (target.children.length > 0) {
      target.removeChild(target.lastElementChild);
    }
  }

  modificarAtributo() {
    const target = document.getElementById("mutation-target");
    const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
    target.style.backgroundColor = randomColor;
  }
}

// ============================================================================
// 📜 DEMONSTRAÇÃO 3: VIRTUAL SCROLLING
// ============================================================================

class Demo3_VirtualScrolling {
  constructor() {
    this.totalItems = 10000;
    this.itemHeight = 50;
    this.visibleItems = 10;
    this.scrollTop = 0;
    this.container = null;
    this.viewport = null;
    this.data = [];

    this.init();
  }

  init() {
    console.log("📜 Demo 3: Virtual Scrolling inicializada");
    this.generateData();
    this.setupVirtualList();
  }

  generateData() {
    // Gerar dados mock para lista grande
    this.data = Array.from({ length: this.totalItems }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      description: `Descrição do item ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
      category: ["Categoria A", "Categoria B", "Categoria C"][
        Math.floor(Math.random() * 3)
      ],
    }));

    console.log(`📊 ${this.totalItems} itens gerados para virtual scrolling`);
  }

  setupVirtualList() {
    this.container = document.getElementById("virtual-scroll-container");
    if (!this.container) return;

    // Criar estrutura do virtual scroll
    this.container.innerHTML = `
            <div class="virtual-list-info">
                <span>Total de itens: ${this.totalItems.toLocaleString()}</span>
                <span>Renderizados: <span id="rendered-count">0</span></span>
            </div>
            <div class="virtual-list-viewport" style="height: ${
              this.visibleItems * this.itemHeight
            }px; overflow-y: auto;">
                <div class="virtual-list-spacer" style="height: ${
                  this.totalItems * this.itemHeight
                }px; position: relative;">
                    <div class="virtual-list-content" style="position: absolute; top: 0; width: 100%;"></div>
                </div>
            </div>
        `;

    this.viewport = this.container.querySelector(".virtual-list-viewport");
    this.content = this.container.querySelector(".virtual-list-content");

    // Event listener para scroll
    this.viewport.addEventListener("scroll", () => {
      this.handleScroll();
    });

    // Renderizar inicialmente
    this.renderItems();
  }

  handleScroll() {
    this.scrollTop = this.viewport.scrollTop;
    this.renderItems();
  }

  renderItems() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + this.visibleItems + 2,
      this.totalItems
    );

    // Limpar conteúdo atual
    this.content.innerHTML = "";

    // Renderizar apenas itens visíveis
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.data[i];
      const element = this.createItemElement(item, i);
      this.content.appendChild(element);
    }

    // Posicionar conteúdo corretamente
    this.content.style.transform = `translateY(${
      startIndex * this.itemHeight
    }px)`;

    // Atualizar contador
    const renderedCount = document.getElementById("rendered-count");
    if (renderedCount) {
      renderedCount.textContent = endIndex - startIndex;
    }

    console.log(`📊 Renderizando itens ${startIndex} a ${endIndex - 1}`);
  }

  createItemElement(item, index) {
    const element = document.createElement("div");
    element.className = "virtual-list-item";
    element.style.height = `${this.itemHeight}px`;
    element.style.display = "flex";
    element.style.alignItems = "center";
    element.style.padding = "0 16px";
    element.style.borderBottom = "1px solid #eee";
    element.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff";

    element.innerHTML = `
            <div style="flex: 1;">
                <div style="font-weight: bold;">${item.name}</div>
                <div style="font-size: 12px; color: #666;">${item.description}</div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: bold; color: #007bff;">$${item.value}</div>
                <div style="font-size: 12px; color: #666;">${item.category}</div>
            </div>
        `;

    return element;
  }

  // Método para demonstrar busca
  filtrarItens(searchTerm) {
    if (!searchTerm) {
      this.data = Array.from({ length: this.totalItems }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Descrição do item ${i + 1}`,
        value: Math.floor(Math.random() * 1000),
        category: ["Categoria A", "Categoria B", "Categoria C"][
          Math.floor(Math.random() * 3)
        ],
      }));
    } else {
      this.data = this.data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Atualizar altura do spacer
    const spacer = this.container.querySelector(".virtual-list-spacer");
    spacer.style.height = `${this.data.length * this.itemHeight}px`;

    // Resetar scroll e renderizar
    this.viewport.scrollTop = 0;
    this.scrollTop = 0;
    this.renderItems();
  }
}

// ============================================================================
// ✂️ DEMONSTRAÇÃO 4: SELECTION API E RANGE
// ============================================================================

class Demo4_SelectionAPI {
  constructor() {
    this.selection = null;
    this.range = null;
    this.editor = null;
    this.init();
  }

  init() {
    console.log("✂️ Demo 4: Selection API inicializada");
    this.setupEditor();
    this.setupControls();
    this.monitorSelection();
  }

  setupEditor() {
    this.editor = document.getElementById("text-editor");
    if (!this.editor) return;

    // Tornar editável
    this.editor.contentEditable = true;
    this.editor.innerHTML = `
            <h2>Editor de Texto Avançado</h2>
            <p>Este é um <strong>editor</strong> que demonstra o uso da <em>Selection API</em>.</p>
            <p>Selecione qualquer texto para ver as opções de formatação aparecerem!</p>
            <ul>
                <li>Suporte a formatação rica</li>
                <li>Seleção de texto avançada</li>
                <li>Manipulação de ranges</li>
            </ul>
        `;
  }

  setupControls() {
    // Toolbar de formatação
    const toolbar = document.getElementById("formatting-toolbar");
    if (!toolbar) return;

    toolbar.innerHTML = `
            <button onclick="demo4.aplicarFormatacao('bold')">
                <strong>B</strong>
            </button>
            <button onclick="demo4.aplicarFormatacao('italic')">
                <em>I</em>
            </button>
            <button onclick="demo4.aplicarFormatacao('underline')">
                <u>U</u>
            </button>
            <button onclick="demo4.destacarTexto()">
                Destacar
            </button>
            <button onclick="demo4.inserirLink()">
                Link
            </button>
            <button onclick="demo4.obterTextoSelecionado()">
                Obter Seleção
            </button>
        `;
  }

  monitorSelection() {
    document.addEventListener("selectionchange", () => {
      this.atualizarInfoSelecao();
    });
  }

  atualizarInfoSelecao() {
    this.selection = window.getSelection();
    const info = document.getElementById("selection-info");
    if (!info) return;

    if (this.selection.toString().length > 0) {
      const range = this.selection.getRangeAt(0);

      info.innerHTML = `
                <div class="selection-details">
                    <h4>Informações da Seleção:</h4>
                    <p><strong>Texto:</strong> "${this.selection.toString()}"</p>
                    <p><strong>Comprimento:</strong> ${
                      this.selection.toString().length
                    } caracteres</p>
                    <p><strong>Ranges:</strong> ${this.selection.rangeCount}</p>
                    <p><strong>Elemento Pai:</strong> ${
                      range.commonAncestorContainer.nodeName
                    }</p>
                </div>
            `;
    } else {
      info.innerHTML = '<p class="no-selection">Nenhum texto selecionado</p>';
    }
  }

  aplicarFormatacao(comando) {
    if (this.selection.toString().length === 0) {
      alert("Selecione um texto primeiro!");
      return;
    }

    document.execCommand(comando);
    console.log(`✨ Formatação aplicada: ${comando}`);
  }

  destacarTexto() {
    if (this.selection.toString().length === 0) {
      alert("Selecione um texto primeiro!");
      return;
    }

    const range = this.selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.style.padding = "2px 4px";
    span.style.borderRadius = "3px";

    try {
      range.surroundContents(span);
      console.log("🎨 Texto destacado");
    } catch (e) {
      console.error("Erro ao destacar:", e);
      alert("Não é possível destacar a seleção atual");
    }
  }

  inserirLink() {
    if (this.selection.toString().length === 0) {
      alert("Selecione um texto primeiro!");
      return;
    }

    const url = prompt("Digite a URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      console.log("🔗 Link inserido");
    }
  }

  obterTextoSelecionado() {
    if (this.selection.toString().length === 0) {
      alert("Nenhum texto selecionado!");
      return;
    }

    const textoSelecionado = this.selection.toString();
    const range = this.selection.getRangeAt(0);

    const info = {
      texto: textoSelecionado,
      comprimento: textoSelecionado.length,
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      elemento: range.commonAncestorContainer.nodeName,
    };

    console.log("📋 Informações da seleção:", info);
    alert(
      `Texto selecionado: "${textoSelecionado}"\nComprimento: ${textoSelecionado.length} caracteres`
    );
  }

  limparFormatacao() {
    document.execCommand("removeFormat");
    console.log("🧹 Formatação removida");
  }
}

// ============================================================================
// 🎪 DEMONSTRAÇÃO 5: DRAG & DROP AVANÇADO
// ============================================================================

class Demo5_DragDropAvancado {
  constructor() {
    this.draggedElement = null;
    this.dropZones = [];
    this.init();
  }

  init() {
    console.log("🎪 Demo 5: Drag & Drop Avançado inicializada");
    this.setupDragAndDrop();
    this.createKanbanBoard();
  }

  setupDragAndDrop() {
    // Configurar eventos de drag & drop
    document.addEventListener("dragstart", this.handleDragStart.bind(this));
    document.addEventListener("dragover", this.handleDragOver.bind(this));
    document.addEventListener("drop", this.handleDrop.bind(this));
    document.addEventListener("dragend", this.handleDragEnd.bind(this));
  }

  createKanbanBoard() {
    const container = document.getElementById("kanban-board");
    if (!container) return;

    const columns = [
      {
        id: "todo",
        title: "A Fazer",
        items: ["Tarefa 1", "Tarefa 2", "Tarefa 3"],
      },
      { id: "doing", title: "Fazendo", items: ["Tarefa 4"] },
      { id: "done", title: "Concluído", items: ["Tarefa 5", "Tarefa 6"] },
    ];

    container.innerHTML = columns
      .map(
        (column) => `
            <div class="kanban-column" data-column="${column.id}">
                <h3>${column.title}</h3>
                <div class="drop-zone" data-column="${column.id}">
                    ${column.items
                      .map(
                        (item, index) => `
                        <div class="kanban-card" draggable="true" data-item-id="${
                          column.id
                        }-${index}">
                            <div class="card-content">
                                <h4>${item}</h4>
                                <p>Descrição da ${item.toLowerCase()}</p>
                                <div class="card-meta">
                                    <span class="priority">Alta</span>
                                    <span class="assignee">João</span>
                                </div>
                            </div>
                            <div class="drag-handle">⋮⋮</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");

    // Registrar drop zones
    this.dropZones = Array.from(container.querySelectorAll(".drop-zone"));
  }

  handleDragStart(e) {
    if (!e.target.classList.contains("kanban-card")) return;

    this.draggedElement = e.target;
    e.target.classList.add("dragging");

    // Configurar dados de transferência
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData("text/plain", e.target.dataset.itemId);

    // Feedback visual
    setTimeout(() => {
      e.target.style.opacity = "0.5";
    }, 0);

    console.log("🎯 Drag iniciado:", e.target.dataset.itemId);
  }

  handleDragOver(e) {
    e.preventDefault();

    const dropZone = e.target.closest(".drop-zone");
    if (!dropZone) return;

    e.dataTransfer.dropEffect = "move";

    // Adicionar feedback visual
    dropZone.classList.add("drag-over");

    // Encontrar posição de inserção
    const afterElement = this.getDragAfterElement(dropZone, e.clientY);
    const dragging = document.querySelector(".dragging");

    if (afterElement == null) {
      dropZone.appendChild(dragging);
    } else {
      dropZone.insertBefore(dragging, afterElement);
    }
  }

  handleDrop(e) {
    e.preventDefault();

    const dropZone = e.target.closest(".drop-zone");
    if (!dropZone || !this.draggedElement) return;

    const sourceColumn =
      this.draggedElement.closest(".drop-zone").dataset.column;
    const targetColumn = dropZone.dataset.column;

    // Log da movimentação
    console.log(`📦 Item movido de ${sourceColumn} para ${targetColumn}`);

    // Remover feedback visual
    dropZone.classList.remove("drag-over");
    this.draggedElement.classList.remove("dragging");
    this.draggedElement.style.opacity = "";

    // Atualizar dados (em uma aplicação real, seria salvo)
    this.updateItemStatus(this.draggedElement.dataset.itemId, targetColumn);

    // Animação de sucesso
    this.showDropSuccess(dropZone);
  }

  handleDragEnd(e) {
    if (!e.target.classList.contains("kanban-card")) return;

    // Limpar estado
    e.target.classList.remove("dragging");
    e.target.style.opacity = "";

    // Remover feedback de todas as drop zones
    this.dropZones.forEach((zone) => {
      zone.classList.remove("drag-over");
    });

    this.draggedElement = null;
  }

  getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".kanban-card:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  updateItemStatus(itemId, newStatus) {
    // Em uma aplicação real, aqui faria a persistência
    console.log(`📊 Item ${itemId} atualizado para status: ${newStatus}`);

    // Salvar no localStorage para demonstração
    const kanbanData = JSON.parse(localStorage.getItem("kanbanData") || "{}");
    kanbanData[itemId] = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("kanbanData", JSON.stringify(kanbanData));
  }

  showDropSuccess(dropZone) {
    const successIndicator = document.createElement("div");
    successIndicator.className = "drop-success";
    successIndicator.textContent = "✅ Movido!";
    successIndicator.style.cssText = `
            position: absolute;
            background: #28a745;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            animation: fadeInOut 2s ease;
        `;

    dropZone.appendChild(successIndicator);

    setTimeout(() => {
      successIndicator.remove();
    }, 2000);
  }

  // Método para adicionar nova tarefa
  adicionarNovaTarefa(columnId, titulo) {
    const dropZone = document.querySelector(`[data-column="${columnId}"]`);
    if (!dropZone) return;

    const itemId = `${columnId}-${Date.now()}`;
    const newCard = document.createElement("div");
    newCard.className = "kanban-card";
    newCard.draggable = true;
    newCard.dataset.itemId = itemId;

    newCard.innerHTML = `
            <div class="card-content">
                <h4>${titulo}</h4>
                <p>Nova tarefa adicionada</p>
                <div class="card-meta">
                    <span class="priority">Média</span>
                    <span class="assignee">Novo</span>
                </div>
            </div>
            <div class="drag-handle">⋮⋮</div>
        `;

    dropZone.appendChild(newCard);

    // Animação de entrada
    newCard.style.transform = "scale(0)";
    newCard.style.opacity = "0";

    requestAnimationFrame(() => {
      newCard.style.transition = "all 0.3s ease";
      newCard.style.transform = "scale(1)";
      newCard.style.opacity = "1";
    });

    console.log(`➕ Nova tarefa adicionada: ${titulo}`);
  }
}

// ============================================================================
// 🎬 DEMONSTRAÇÃO 6: ANIMAÇÕES COM REQUESTANIMATIONFRAME
// ============================================================================

class Demo6_AnimacaoAvancada {
  constructor() {
    this.animationId = null;
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    console.log("🎬 Demo 6: Animações Avançadas inicializada");
    this.setupCanvas();
    this.setupControls();
    this.createParticleSystem();
  }

  setupCanvas() {
    this.canvas = document.getElementById("animation-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = 400;
  }

  setupControls() {
    document
      .getElementById("btn-start-animation")
      ?.addEventListener("click", () => {
        this.startAnimation();
      });

    document
      .getElementById("btn-stop-animation")
      ?.addEventListener("click", () => {
        this.stopAnimation();
      });

    document
      .getElementById("btn-add-particles")
      ?.addEventListener("click", () => {
        this.addParticles(10);
      });

    document
      .getElementById("btn-clear-particles")
      ?.addEventListener("click", () => {
        this.clearParticles();
      });
  }

  createParticleSystem() {
    this.particles = [];

    // Criar partículas iniciais
    for (let i = 0; i < 50; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      life: 1.0,
      decay: Math.random() * 0.01 + 0.005,
    };
  }

  startAnimation() {
    if (this.animationId) return;

    console.log("▶️ Animação iniciada");
    this.animate();
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      console.log("⏹️ Animação parada");
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(() => {
      this.animate();
    });

    this.update();
    this.render();
  }

  update() {
    // Atualizar partículas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Movimento
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce nas bordas
      if (
        particle.x <= particle.radius ||
        particle.x >= this.canvas.width - particle.radius
      ) {
        particle.vx *= -0.8;
      }
      if (
        particle.y <= particle.radius ||
        particle.y >= this.canvas.height - particle.radius
      ) {
        particle.vy *= -0.8;
      }

      // Manter dentro do canvas
      particle.x = Math.max(
        particle.radius,
        Math.min(this.canvas.width - particle.radius, particle.x)
      );
      particle.y = Math.max(
        particle.radius,
        Math.min(this.canvas.height - particle.radius, particle.y)
      );

      // Decaimento
      particle.life -= particle.decay;

      // Remover partículas mortas
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Adicionar novas partículas ocasionalmente
    if (Math.random() < 0.02 && this.particles.length < 100) {
      this.particles.push(this.createParticle());
    }
  }

  render() {
    // Limpar canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Desenhar fundo gradiente
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Desenhar partículas
    this.particles.forEach((particle) => {
      this.ctx.save();

      // Transparência baseada na vida
      this.ctx.globalAlpha = particle.life;

      // Desenhar partícula
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      // Glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color;
      this.ctx.fill();

      this.ctx.restore();
    });

    // Informações na tela
    this.ctx.fillStyle = "white";
    this.ctx.font = "14px Arial";
    this.ctx.fillText(`Partículas: ${this.particles.length}`, 10, 20);
    this.ctx.fillText(`FPS: ${this.getFPS()}`, 10, 40);
  }

  getFPS() {
    // Cálculo simples de FPS
    const now = performance.now();
    if (!this.lastFrame) {
      this.lastFrame = now;
      return 60;
    }

    const fps = 1000 / (now - this.lastFrame);
    this.lastFrame = now;
    return Math.round(fps);
  }

  addParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
    console.log(`➕ ${count} partículas adicionadas`);
  }

  clearParticles() {
    this.particles = [];
    console.log("🧹 Partículas removidas");
  }
}

// ============================================================================
// 🚀 INICIALIZAÇÃO E CONTROLE GLOBAL
// ============================================================================

// Variáveis globais para acesso nas demonstrações
let demo1, demo2, demo3, demo4, demo5, demo6;

// Inicializar quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎯 Aula 8: Manipulação Avançada do DOM carregada!");

  // Inicializar demonstrações
  demo1 = new Demo1_PerformanceOptimization();
  demo2 = new Demo2_Observadores();
  demo3 = new Demo3_VirtualScrolling();
  demo4 = new Demo4_SelectionAPI();
  demo5 = new Demo5_DragDropAvancado();
  demo6 = new Demo6_AnimacaoAvancada();

  // Configurar navegação entre demos
  setupDemoNavigation();

  console.log("✅ Todas as demonstrações inicializadas com sucesso!");
});

function setupDemoNavigation() {
  const tabs = document.querySelectorAll(".demo-tab");
  const panels = document.querySelectorAll(".demo-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetDemo = tab.dataset.demo;

      // Remover active de todas as tabs
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Ativar tab e panel selecionados
      tab.classList.add("active");
      document.getElementById(targetDemo).classList.add("active");

      console.log(`📋 Navegando para: ${targetDemo}`);
    });
  });
}

// Funções utilitárias globais
function resetAllDemos() {
  console.log("🔄 Resetando todas as demonstrações...");

  // Parar animações
  if (demo6 && demo6.animationId) {
    demo6.stopAnimation();
  }

  // Limpar listeners de mutation observer
  if (demo2 && demo2.mutationObserver) {
    demo2.mutationObserver.disconnect();
  }

  // Recriar instâncias
  demo1 = new Demo1_PerformanceOptimization();
  demo2 = new Demo2_Observadores();
  demo3 = new Demo3_VirtualScrolling();
  demo4 = new Demo4_SelectionAPI();
  demo5 = new Demo5_DragDropAvancado();
  demo6 = new Demo6_AnimacaoAvancada();

  console.log("✅ Reset completo!");
}

function exportDemoData() {
  const data = {
    timestamp: new Date().toISOString(),
    performanceStats: demo1.stats,
    kanbanData: JSON.parse(localStorage.getItem("kanbanData") || "{}"),
    particleCount: demo6.particles.length,
  };

  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "aula8-demo-data.json";
  a.click();

  URL.revokeObjectURL(url);
  console.log("📥 Dados das demonstrações exportados");
}

// Expor para acesso global
window.Aula8 = {
  Demo1_PerformanceOptimization,
  Demo2_Observadores,
  Demo3_VirtualScrolling,
  Demo4_SelectionAPI,
  Demo5_DragDropAvancado,
  Demo6_AnimacaoAvancada,
  resetAllDemos,
  exportDemoData,
};
