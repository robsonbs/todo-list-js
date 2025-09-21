// ===============================================
// AULA 3: EVENTOS E INTERATIVIDADE
// Código Progressivo - Do Básico ao Avançado
// ===============================================

// ==========================================
// PARTE 1: EVENTOS BÁSICOS
// ==========================================

console.log("🎯 Aula 3: Iniciando sistema de eventos...");

// Variáveis globais para controle
let clickCounter = 0;
let isPaused = false;
let currentMenuIndex = 0;
let draggedElement = null;
let notificationCounter = 0;

// Função utilitária para log de eventos
function logEvent(eventName, details = "") {
  if (isPaused) return;

  const now = new Date().toLocaleTimeString();
  const logElement = document.getElementById("globalEventLog");

  if (logElement) {
    const eventItem = document.createElement("div");
    eventItem.className = "event-item";
    eventItem.innerHTML = `[${now}] <strong>${eventName}</strong> ${details}`;

    logElement.insertBefore(eventItem, logElement.firstChild);

    // Manter apenas os últimos 20 eventos
    while (logElement.children.length > 20) {
      logElement.removeChild(logElement.lastChild);
    }
  }
}

// ==========================================
// EVENTOS DE CLIQUE
// ==========================================

// Evento básico de clique
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM carregado, inicializando eventos...");

  // Botão de clique simples
  const clickBtn = document.getElementById("clickBtn");
  if (clickBtn) {
    clickBtn.addEventListener("click", function () {
      this.textContent = "Clicado! 🎉";
      this.style.background =
        "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)";

      setTimeout(() => {
        this.textContent = "Clique em mim!";
        this.style.background = "";
      }, 2000);

      logEvent("CLICK", "Botão básico clicado");
    });
  }

  // Contador de cliques
  const clickCounterBtn = document.getElementById("clickCounterBtn");
  if (clickCounterBtn) {
    clickCounterBtn.addEventListener("click", function () {
      clickCounter++;
      const countSpan = document.getElementById("clickCount");
      if (countSpan) {
        countSpan.textContent = clickCounter;

        // Efeito visual baseado no número de cliques
        if (clickCounter % 5 === 0) {
          this.classList.add("bounce");
          setTimeout(() => this.classList.remove("bounce"), 1000);
        }

        if (clickCounter % 10 === 0) {
          showNotification(`🎉 Parabéns! ${clickCounter} cliques!`, "success");
        }
      }

      logEvent("COUNTER_CLICK", `Total: ${clickCounter} cliques`);
    });
  }

  // Área clicável com efeitos
  const clickArea = document.getElementById("clickArea");
  if (clickArea) {
    clickArea.addEventListener("click", function (event) {
      // Mudança de cor aleatória
      const colors = [
        "linear-gradient(45deg, #ff6b6b, #feca57)",
        "linear-gradient(45deg, #48cae4, #023e8a)",
        "linear-gradient(45deg, #f72585, #b5179e)",
        "linear-gradient(45deg, #06ffa5, #1cb5e0)",
        "linear-gradient(45deg, #fdbb2d, #22c1c3)",
      ];

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.style.background = randomColor;

      // Efeito de ondulação no ponto clicado
      createRippleEffect(event, this);

      logEvent("CLICK_AREA", `Posição: (${event.offsetX}, ${event.offsetY})`);
    });
  }
});

// Função para criar efeito de ondulação
function createRippleEffect(event, element) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${event.offsetX - size / 2}px;
        top: ${event.offsetY - size / 2}px;
        animation: ripple 0.6s ease-out;
        z-index: 1000;
    `;

  // Adicionar animação CSS se não existir
  if (!document.querySelector("#ripple-animation")) {
    const style = document.createElement("style");
    style.id = "ripple-animation";
    style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  element.style.position = "relative";
  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// ==========================================
// EVENTOS DE TECLADO
// ==========================================

// Input com Enter
const keyboardInput = document.getElementById("keyboardInput");
if (keyboardInput) {
  keyboardInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const value = this.value.trim();
      if (value) {
        const output = document.getElementById("keyOutput");
        if (output) {
          output.style.display = "block";
          output.textContent = `Você digitou: "${value}"`;
          output.className = "message success";

          // Limpar após 3 segundos
          setTimeout(() => {
            output.style.display = "none";
            this.value = "";
          }, 3000);
        }

        logEvent("ENTER_PRESSED", `Texto: "${value}"`);
      }
    }
  });
}

// Monitor de teclas em tempo real
const keylogger = document.getElementById("keylogger");
if (keylogger) {
  keylogger.addEventListener("keydown", function (event) {
    logEvent("KEYDOWN", `Tecla: ${event.key} (${event.code})`);
  });

  keylogger.addEventListener("keyup", function (event) {
    logEvent("KEYUP", `Tecla: ${event.key} liberada`);
  });

  keylogger.addEventListener("input", function (event) {
    logEvent("INPUT", `Valor atual: "${this.value}"`);
  });
}

// ==========================================
// EVENTOS DE MOUSE
// ==========================================

const mouseTracker = document.getElementById("mouseTracker");
if (mouseTracker) {
  const positionSpan = document.getElementById("mousePosition");
  const eventSpan = document.getElementById("lastMouseEvent");

  mouseTracker.addEventListener("mousemove", function (event) {
    const rect = this.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    if (positionSpan) {
      positionSpan.textContent = `X: ${x}, Y: ${y}`;
    }

    if (eventSpan) {
      eventSpan.textContent = "mousemove";
    }

    // Log apenas a cada 10 movimentos para não poluir
    if (Math.random() < 0.1) {
      logEvent("MOUSEMOVE", `(${x}, ${y})`);
    }
  });

  mouseTracker.addEventListener("mouseenter", function () {
    if (eventSpan) eventSpan.textContent = "mouseenter";
    this.style.background = "#e8f5e8";
    logEvent("MOUSEENTER", "Entrou na área de rastreamento");
  });

  mouseTracker.addEventListener("mouseleave", function () {
    if (eventSpan) eventSpan.textContent = "mouseleave";
    this.style.background = "#f8f9fa";
    logEvent("MOUSELEAVE", "Saiu da área de rastreamento");
  });

  mouseTracker.addEventListener("click", function (event) {
    if (eventSpan) eventSpan.textContent = "click";
    const rect = this.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    logEvent("MOUSE_CLICK", `Clique em (${x}, ${y})`);
  });
}

// ==========================================
// FORMULÁRIOS E VALIDAÇÃO
// ==========================================

// Validação em tempo real
const validationForm = document.getElementById("validationForm");
if (validationForm) {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userAge = document.getElementById("userAge");
  const formMessages = document.getElementById("formMessages");

  // Validação do nome
  if (userName) {
    userName.addEventListener("input", function () {
      const value = this.value.trim();

      if (value.length === 0) {
        this.className = "form-control";
      } else if (value.length < 3) {
        this.className = "form-control error";
      } else {
        this.className = "form-control success";
      }

      logEvent("NAME_VALIDATION", `Caracteres: ${value.length}`);
    });
  }

  // Validação do email
  if (userEmail) {
    userEmail.addEventListener("blur", function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(this.value);

      this.className = isValid ? "form-control success" : "form-control error";

      logEvent("EMAIL_VALIDATION", `Válido: ${isValid}`);
    });
  }

  // Validação da idade
  if (userAge) {
    userAge.addEventListener("change", function () {
      const age = parseInt(this.value);
      const isValid = age > 0 && age <= 120;

      this.className = isValid ? "form-control success" : "form-control error";

      logEvent("AGE_VALIDATION", `Idade: ${age}, Válido: ${isValid}`);
    });
  }

  // Submit do formulário
  validationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = userName?.value.trim() || "";
    const email = userEmail?.value.trim() || "";
    const age = userAge?.value || "";

    const isValidForm =
      name.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      parseInt(age) > 0 &&
      parseInt(age) <= 120;

    if (formMessages) {
      if (isValidForm) {
        formMessages.innerHTML = `
                    <div class="message success">
                        ✅ Formulário válido! Dados: ${name}, ${email}, ${age} anos
                    </div>
                `;
        logEvent("FORM_SUBMIT", "Formulário enviado com sucesso");
      } else {
        formMessages.innerHTML = `
                    <div class="message error">
                        ❌ Por favor, corrija os erros no formulário
                    </div>
                `;
        logEvent("FORM_ERROR", "Formulário com erros");
      }
    }
  });

  // Reset do formulário
  validationForm.addEventListener("reset", function () {
    // Resetar classes dos inputs
    const inputs = this.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.className = "form-control";
    });

    if (formMessages) {
      formMessages.innerHTML = "";
    }

    logEvent("FORM_RESET", "Formulário resetado");
  });
}

// ==========================================
// PREVENTDEFAULT E OBJECT EVENT
// ==========================================

// Link com preventDefault
const preventLink = document.getElementById("preventLink");
if (preventLink) {
  preventLink.addEventListener("click", function (event) {
    event.preventDefault();
    this.textContent = "Link bloqueado! 🚫";
    this.style.background = "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";

    setTimeout(() => {
      this.textContent = "Link que não funciona (preventDefault)";
      this.style.background = "";
    }, 2000);

    logEvent("PREVENT_DEFAULT", "Link bloqueado pelo preventDefault");
  });
}

// Formulário com preventDefault
const preventForm = document.getElementById("preventForm");
if (preventForm) {
  preventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const input = this.querySelector("input");
    const value = input?.value || "";

    showNotification(`🛑 Envio bloqueado! Valor: "${value}"`, "error");

    logEvent("FORM_PREVENT", `Envio bloqueado. Valor: "${value}"`);
  });
}

// Botão com informações detalhadas do evento
const eventInfoBtn = document.getElementById("eventInfoBtn");
if (eventInfoBtn) {
  eventInfoBtn.addEventListener("click", function (event) {
    const eventDetails = document.getElementById("eventDetails");
    if (eventDetails) {
      eventDetails.style.display = "block";
      eventDetails.innerHTML = `
                <div class="event-item"><strong>Tipo:</strong> ${event.type}</div>
                <div class="event-item"><strong>Target:</strong> ${event.target.tagName}</div>
                <div class="event-item"><strong>Timestamp:</strong> ${event.timeStamp}</div>
                <div class="event-item"><strong>ClientX:</strong> ${event.clientX}</div>
                <div class="event-item"><strong>ClientY:</strong> ${event.clientY}</div>
                <div class="event-item"><strong>Button:</strong> ${event.button}</div>
                <div class="event-item"><strong>Ctrl Key:</strong> ${event.ctrlKey}</div>
                <div class="event-item"><strong>Alt Key:</strong> ${event.altKey}</div>
                <div class="event-item"><strong>Shift Key:</strong> ${event.shiftKey}</div>
            `;
    }

    logEvent("EVENT_INFO", "Detalhes do evento exibidos");
  });
}

// ==========================================
// EVENT DELEGATION
// ==========================================

let itemCounter = 0;

// Adicionar itens dinamicamente
const addItemBtn = document.getElementById("addItemBtn");
if (addItemBtn) {
  addItemBtn.addEventListener("click", function () {
    const dynamicList = document.getElementById("dynamicList");
    if (dynamicList) {
      itemCounter++;

      const newItem = document.createElement("div");
      newItem.className = "draggable-item";
      newItem.style.marginBottom = "0.5rem";
      newItem.innerHTML = `
                📋 Item Dinâmico ${itemCounter} 
                <small style="opacity: 0.8;">(clique para remover)</small>
            `;
      newItem.dataset.id = itemCounter;

      dynamicList.appendChild(newItem);

      // Animação de entrada
      newItem.style.opacity = "0";
      newItem.style.transform = "translateY(-20px)";
      setTimeout(() => {
        newItem.style.transition = "all 0.3s ease";
        newItem.style.opacity = "1";
        newItem.style.transform = "translateY(0)";
      }, 10);
    }

    logEvent("ADD_ITEM", `Item ${itemCounter} adicionado`);
  });
}

// Event delegation para itens dinâmicos
const dynamicList = document.getElementById("dynamicList");
if (dynamicList) {
  dynamicList.addEventListener("click", function (event) {
    // Verifica se clicou em um item dinâmico
    if (event.target.classList.contains("draggable-item")) {
      const item = event.target;
      const itemId = item.dataset.id;

      // Animação de saída
      item.style.transform = "translateX(100px)";
      item.style.opacity = "0";

      setTimeout(() => {
        if (item.parentNode) {
          item.parentNode.removeChild(item);
        }
      }, 300);

      logEvent("REMOVE_ITEM", `Item ${itemId} removido via delegation`);
    }
  });
}

// Remover todos os itens
const removeAllBtn = document.getElementById("removeAllBtn");
if (removeAllBtn) {
  removeAllBtn.addEventListener("click", function () {
    const items = dynamicList?.querySelectorAll(".draggable-item") || [];

    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = "translateY(-50px)";
        item.style.opacity = "0";

        setTimeout(() => {
          if (item.parentNode) {
            item.parentNode.removeChild(item);
          }
        }, 300);
      }, index * 100);
    });

    logEvent("REMOVE_ALL", `${items.length} itens removidos`);
  });
}

// ==========================================
// NAVEGAÇÃO POR TECLADO
// ==========================================

const menuItems = document.querySelectorAll(".menu-item");
function updateMenuSelection() {
  menuItems.forEach((item, index) => {
    if (index === currentMenuIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Navegação por teclado no menu
document.addEventListener("keydown", function (event) {
  // Só funciona se não estivermos em um input
  if (event.target.tagName.toLowerCase() === "input") return;

  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      currentMenuIndex = Math.max(0, currentMenuIndex - 1);
      updateMenuSelection();
      logEvent("KEYBOARD_NAV", `Navegou para cima: item ${currentMenuIndex}`);
      break;

    case "ArrowDown":
      event.preventDefault();
      currentMenuIndex = Math.min(menuItems.length - 1, currentMenuIndex + 1);
      updateMenuSelection();
      logEvent("KEYBOARD_NAV", `Navegou para baixo: item ${currentMenuIndex}`);
      break;

    case "Enter":
      if (menuItems[currentMenuIndex]) {
        const selectedItem = menuItems[currentMenuIndex];
        const selectionOutput = document.getElementById("selectionOutput");

        if (selectionOutput) {
          selectionOutput.style.display = "block";
          selectionOutput.textContent = `Selecionado: ${selectedItem.textContent}`;

          // Efeito visual
          selectedItem.classList.add("pulse");
          setTimeout(() => selectedItem.classList.remove("pulse"), 500);
        }

        logEvent("KEYBOARD_SELECT", `Selecionado: ${selectedItem.textContent}`);
      }
      break;

    case "Escape":
      currentMenuIndex = 0;
      updateMenuSelection();
      const selectionOutput = document.getElementById("selectionOutput");
      if (selectionOutput) {
        selectionOutput.style.display = "none";
      }
      logEvent("KEYBOARD_ESC", "Seleção limpa");
      break;
  }
});

// Inicializar seleção do menu
if (menuItems.length > 0) {
  updateMenuSelection();
}

// ==========================================
// DRAG AND DROP
// ==========================================

const draggableItems = document.querySelectorAll(".draggable-item");
const dragZones = document.querySelectorAll(".drag-zone");

// Configurar itens arrastáveis
draggableItems.forEach((item) => {
  item.addEventListener("dragstart", function (event) {
    draggedElement = this;
    this.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
    event.dataTransfer.setData("text/plain", this.dataset.item);

    logEvent("DRAG_START", `Item ${this.dataset.item} iniciou arraste`);
  });

  item.addEventListener("dragend", function () {
    this.classList.remove("dragging");
    draggedElement = null;

    logEvent("DRAG_END", `Item ${this.dataset.item} terminou arraste`);
  });
});

// Configurar zonas de drop
dragZones.forEach((zone) => {
  zone.addEventListener("dragover", function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    this.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", function () {
    this.classList.remove("drag-over");
  });

  zone.addEventListener("drop", function (event) {
    event.preventDefault();
    this.classList.remove("drag-over");

    if (draggedElement && this !== draggedElement.parentNode) {
      const itemData = event.dataTransfer.getData("text/plain");
      const itemHtml = event.dataTransfer.getData("text/html");

      // Criar novo elemento no destino
      const newItem = document.createElement("div");
      newItem.className = "draggable-item";
      newItem.draggable = true;
      newItem.innerHTML = itemHtml;
      newItem.dataset.item = itemData;

      // Configurar eventos do novo item
      setupDragEvents(newItem);

      // Adicionar à zona de destino
      this.appendChild(newItem);

      // Remover o item original
      if (draggedElement.parentNode) {
        draggedElement.parentNode.removeChild(draggedElement);
      }

      logEvent("DROP", `Item ${itemData} movido para ${this.id}`);
      showNotification(`Item ${itemData} movido com sucesso! 🎯`, "success");
    }
  });
});

// Função para configurar eventos de drag em novos elementos
function setupDragEvents(element) {
  element.addEventListener("dragstart", function (event) {
    draggedElement = this;
    this.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", this.innerHTML);
    event.dataTransfer.setData("text/plain", this.dataset.item);

    logEvent("DRAG_START", `Item ${this.dataset.item} iniciou arraste`);
  });

  element.addEventListener("dragend", function () {
    this.classList.remove("dragging");
    draggedElement = null;

    logEvent("DRAG_END", `Item ${this.dataset.item} terminou arraste`);
  });
}

// Reset do drag and drop
const resetDragBtn = document.getElementById("resetDragBtn");
if (resetDragBtn) {
  resetDragBtn.addEventListener("click", function () {
    const sourceZone = document.getElementById("sourceZone");
    const targetZone = document.getElementById("targetZone");

    if (sourceZone && targetZone) {
      // Limpar zonas
      sourceZone.innerHTML = "<h4>📦 Itens Disponíveis</h4>";
      targetZone.innerHTML =
        "<h4>🎯 Área de Destino</h4><p>Arraste itens aqui</p>";

      // Recriar itens originais
      for (let i = 1; i <= 3; i++) {
        const item = document.createElement("div");
        item.className = "draggable-item";
        item.draggable = true;
        item.dataset.item = i;
        item.textContent = `Item ${i}`;

        setupDragEvents(item);
        sourceZone.appendChild(item);
      }
    }

    logEvent("DRAG_RESET", "Sistema de drag and drop resetado");
  });
}

// ==========================================
// CUSTOM EVENTS
// ==========================================

// Criar eventos customizados
const customNotificationEvent = new CustomEvent("notification", {
  detail: { type: "info", message: "Evento personalizado disparado!" },
});

const customSuccessEvent = new CustomEvent("notification", {
  detail: { type: "success", message: "Operação realizada com sucesso!" },
});

const customErrorEvent = new CustomEvent("notification", {
  detail: { type: "error", message: "Erro na operação!" },
});

// Listener para eventos customizados
document.addEventListener("notification", function (event) {
  notificationCounter++;
  const countElement = document.getElementById("notificationCount");
  if (countElement) {
    countElement.textContent = notificationCounter;
  }

  showNotification(event.detail.message, event.detail.type);
  logEvent("CUSTOM_EVENT", `${event.detail.type}: ${event.detail.message}`);
});

// Botões para disparar eventos customizados
const triggerNotification = document.getElementById("triggerNotification");
if (triggerNotification) {
  triggerNotification.addEventListener("click", function () {
    document.dispatchEvent(customNotificationEvent);
  });
}

const triggerSuccess = document.getElementById("triggerSuccess");
if (triggerSuccess) {
  triggerSuccess.addEventListener("click", function () {
    document.dispatchEvent(customSuccessEvent);
  });
}

const triggerError = document.getElementById("triggerError");
if (triggerError) {
  triggerError.addEventListener("click", function () {
    document.dispatchEvent(customErrorEvent);
  });
}

// Função para mostrar notificações
function showNotification(message, type = "info", duration = 3000) {
  const notificationArea = document.getElementById("notificationArea");
  if (!notificationArea) return;

  const notification = document.createElement("div");
  notification.className = `message ${type}`;
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentNode.remove()" style="float: right; background: none; border: none; font-size: 1.2em; cursor: pointer;">×</button>
    `;

  notificationArea.appendChild(notification);

  // Animação de entrada
  notification.style.opacity = "0";
  notification.style.transform = "translateY(-20px)";
  setTimeout(() => {
    notification.style.transition = "all 0.3s ease";
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);

  // Remover automaticamente
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, duration);
}

// ==========================================
// DEBOUNCING
// ==========================================

// Função de debounce
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Simulação de busca com debounce
function performSearch(query, logElement, withDebounce = false) {
  const now = new Date().toLocaleTimeString();
  const searchItem = document.createElement("div");
  searchItem.className = "event-item";
  searchItem.innerHTML = `[${now}] Buscando: "${query}" ${
    withDebounce ? "(debounced)" : "(direto)"
  }`;

  logElement.insertBefore(searchItem, logElement.firstChild);

  // Manter apenas os últimos 10 itens
  while (logElement.children.length > 10) {
    logElement.removeChild(logElement.lastChild);
  }

  logEvent("SEARCH", `"${query}" ${withDebounce ? "(debounced)" : "(direto)"}`);
}

// Busca com debounce
const searchInput = document.getElementById("searchInput");
const debounceLog = document.getElementById("debounceLog");
if (searchInput && debounceLog) {
  const debouncedSearch = debounce((query) => {
    performSearch(query, debounceLog, true);
  }, 500);

  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    if (query) {
      debouncedSearch(query);
    }
  });
}

// Busca sem debounce (para comparação)
const normalSearch = document.getElementById("normalSearch");
const normalLog = document.getElementById("normalLog");
if (normalSearch && normalLog) {
  normalSearch.addEventListener("input", function () {
    const query = this.value.trim();
    if (query) {
      performSearch(query, normalLog, false);
    }
  });
}

// ==========================================
// CONTROLES DO MONITOR DE EVENTOS
// ==========================================

// Limpar log
const clearLogBtn = document.getElementById("clearLogBtn");
if (clearLogBtn) {
  clearLogBtn.addEventListener("click", function () {
    const globalLog = document.getElementById("globalEventLog");
    if (globalLog) {
      globalLog.innerHTML = '<div class="event-item">Log limpo...</div>';
    }

    const debounceLog = document.getElementById("debounceLog");
    if (debounceLog) {
      debounceLog.innerHTML =
        '<div class="event-item">Aguardando entrada...</div>';
    }

    const normalLog = document.getElementById("normalLog");
    if (normalLog) {
      normalLog.innerHTML =
        '<div class="event-item">Aguardando entrada...</div>';
    }

    console.log("🧹 Logs limpos");
  });
}

// Pausar/retomar log
const pauseLogBtn = document.getElementById("pauseLogBtn");
if (pauseLogBtn) {
  pauseLogBtn.addEventListener("click", function () {
    isPaused = !isPaused;
    this.textContent = isPaused ? "Retomar" : "Pausar";
    this.className = isPaused ? "btn btn-success" : "btn";

    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator) => {
      if (indicator.classList.contains("green")) {
        indicator.style.background = isPaused ? "#e74c3c" : "#27ae60";
      }
    });

    console.log(`📊 Sistema de log ${isPaused ? "pausado" : "retomado"}`);
  });
}

// ==========================================
// INICIALIZAÇÃO FINAL
// ==========================================

// Log de inicialização
setTimeout(() => {
  logEvent("SYSTEM_READY", "Todos os eventos configurados");
  console.log("✅ Sistema de eventos da Aula 3 carregado completamente!");

  // Mostrar notificação de boas-vindas
  showNotification(
    "🎯 Sistema de eventos carregado! Explore todas as funcionalidades.",
    "success",
    5000
  );
}, 1000);

// Rastrear eventos globais para demonstração
const eventsToTrack = ["click", "keydown", "submit", "change"];

eventsToTrack.forEach((eventType) => {
  document.addEventListener(
    eventType,
    function (event) {
      // Log apenas uma amostra para não poluir
      if (Math.random() < 0.3) {
        logEvent(
          `GLOBAL_${eventType.toUpperCase()}`,
          `Target: ${event.target.tagName || "unknown"}`
        );
      }
    },
    true
  ); // Use capture para pegar todos os eventos
});

// Tratamento de erros globais
window.addEventListener("error", function (event) {
  logEvent(
    "ERROR",
    `${event.error.message} em ${event.filename}:${event.lineno}`
  );
  showNotification(`❌ Erro JavaScript: ${event.error.message}`, "error");
});

// Performance monitoring
let interactionCount = 0;
document.addEventListener("click", function () {
  interactionCount++;
  if (interactionCount % 20 === 0) {
    logEvent("PERFORMANCE", `${interactionCount} interações realizadas`);
  }
});

console.log(
  "🎓 Aula 3: Sistema completo de eventos e interatividade carregado!"
);
