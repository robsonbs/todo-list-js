/**
 * AULA 6: EVENTOS AVANÇADOS E INTERATIVIDADE
 *
 * Este arquivo contém demonstrações progressivas de eventos em JavaScript:
 * 1. Eventos Básicos (addEventListener, removeEventListener)
 * 2. Event Object e suas propriedades
 * 3. Event Bubbling e Capturing
 * 4. Event Delegation
 * 5. Custom Events
 * 6. Keyboard Events
 * 7. Mouse Events Avançados
 * 8. Drag and Drop
 * 9. Touch Events
 * 10. Sistema Completo de Eventos para TODO List
 */

// ===== DEMONSTRAÇÃO 1: EVENTOS BÁSICOS =====
console.log("🎯 === DEMONSTRAÇÃO 1: EVENTOS BÁSICOS ===");

function demonstrarEventosBasicos() {
  console.log("📝 Criando elementos e vinculando eventos básicos...");

  // Criar elementos de demonstração
  const demoArea = document.getElementById("demo-eventos-basicos");
  if (!demoArea) {
    console.warn("Área de demonstração não encontrada");
    return;
  }

  // Limpar área
  demoArea.innerHTML = "";

  // 1. Evento de clique simples
  const botaoClick = document.createElement("button");
  botaoClick.textContent = "Clique em mim!";
  botaoClick.className = "btn btn-primary";

  // Usando addEventListener (método recomendado)
  botaoClick.addEventListener("click", function (event) {
    console.log("🖱️ Botão clicado!", event);
    this.textContent = "Clicado! ✅";
    this.style.backgroundColor = "#28a745";

    // Voltar ao estado original após 2 segundos
    setTimeout(() => {
      this.textContent = "Clique em mim!";
      this.style.backgroundColor = "";
    }, 2000);
  });

  // 2. Evento de mouse over/out
  const botaoHover = document.createElement("button");
  botaoHover.textContent = "Passe o mouse aqui";
  botaoHover.className = "btn btn-secondary";

  botaoHover.addEventListener("mouseenter", function () {
    this.textContent = "Mouse sobre o botão! 🖱️";
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
  });

  botaoHover.addEventListener("mouseleave", function () {
    this.textContent = "Passe o mouse aqui";
    this.style.transform = "scale(1)";
    this.style.boxShadow = "";
  });

  // 3. Evento de input em tempo real
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Digite algo...";
  input.className = "form-control";

  const output = document.createElement("div");
  output.className = "output-text";
  output.innerHTML = "<em>O que você digitar aparecerá aqui...</em>";

  input.addEventListener("input", function (event) {
    const texto = event.target.value;
    if (texto.trim()) {
      output.innerHTML = `<strong>Você digitou:</strong> ${texto}`;
      output.style.color = "#007bff";
    } else {
      output.innerHTML = "<em>O que você digitar aparecerá aqui...</em>";
      output.style.color = "";
    }
  });

  // Adicionar elementos à área de demonstração
  const container = document.createElement("div");
  container.className = "demo-container";
  container.style.cssText = "display: grid; gap: 15px; padding: 20px;";

  container.appendChild(botaoClick);
  container.appendChild(botaoHover);
  container.appendChild(input);
  container.appendChild(output);

  demoArea.appendChild(container);

  console.log("✅ Demonstração de eventos básicos criada!");
}

// ===== DEMONSTRAÇÃO 2: EVENT OBJECT E PROPRIEDADES =====
console.log("🎯 === DEMONSTRAÇÃO 2: EVENT OBJECT ===");

function demonstrarEventObject() {
  console.log("📝 Explorando propriedades do Event Object...");

  const demoArea = document.getElementById("demo-event-object");
  if (!demoArea) {
    console.warn("Área de demonstração não encontrada");
    return;
  }

  demoArea.innerHTML = "";

  // Criar área de demonstração
  const playground = document.createElement("div");
  playground.className = "event-playground";
  playground.style.cssText = `
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
        border: 2px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        min-height: 200px;
        cursor: pointer;
        position: relative;
    `;
  playground.innerHTML =
    '<p style="text-align: center; color: #666;">Clique em qualquer lugar desta área para ver as propriedades do evento!</p>';

  // Área de informações do evento
  const infoArea = document.createElement("div");
  infoArea.className = "event-info";
  infoArea.style.cssText = `
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        padding: 15px;
        font-family: monospace;
        font-size: 14px;
        max-height: 300px;
        overflow-y: auto;
    `;
  infoArea.innerHTML = "<em>Propriedades do evento aparecerão aqui...</em>";

  // Event listener que mostra propriedades do evento
  playground.addEventListener("click", function (event) {
    console.log("🔍 Analisando Event Object:", event);

    const eventInfo = {
      type: event.type,
      target: event.target.tagName,
      currentTarget: event.currentTarget.tagName,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
      button: event.button,
      timeStamp: Math.floor(event.timeStamp),
      bubbles: event.bubbles,
      cancelable: event.cancelable,
    };

    let html = "<h4>📊 Propriedades do Evento:</h4>";
    for (const [key, value] of Object.entries(eventInfo)) {
      html += `<div><strong>${key}:</strong> ${value}</div>`;
    }

    infoArea.innerHTML = html;

    // Mostrar ponto visual do clique
    const ponto = document.createElement("div");
    ponto.style.cssText = `
            position: absolute;
            left: ${event.offsetX - 5}px;
            top: ${event.offsetY - 5}px;
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 50%;
            pointer-events: none;
            animation: pulse 1s ease-out;
        `;

    playground.appendChild(ponto);

    // Remover ponto após animação
    setTimeout(() => {
      if (ponto.parentNode) {
        ponto.parentNode.removeChild(ponto);
      }
    }, 1000);
  });

  // Adicionar CSS para animação
  const style = document.createElement("style");
  style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  // Montar estrutura
  const container = document.createElement("div");
  container.appendChild(playground);
  container.appendChild(infoArea);

  demoArea.appendChild(container);

  console.log("✅ Demonstração do Event Object criada!");
}

// ===== DEMONSTRAÇÃO 3: EVENT BUBBLING E CAPTURING =====
console.log("🎯 === DEMONSTRAÇÃO 3: EVENT BUBBLING E CAPTURING ===");

function demonstrarBubblingCapturing() {
  console.log("📝 Demonstrando event bubbling e capturing...");

  const demoArea = document.getElementById("demo-bubbling-capturing");
  if (!demoArea) {
    console.warn("Área de demonstração não encontrada");
    return;
  }

  demoArea.innerHTML = "";

  // Log area para mostrar a sequência de eventos
  const logArea = document.createElement("div");
  logArea.className = "event-log";
  logArea.style.cssText = `
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        max-height: 200px;
        overflow-y: auto;
        font-family: monospace;
        font-size: 14px;
    `;
  logArea.innerHTML = "<div><em>Log de eventos aparecerá aqui...</em></div>";

  function adicionarLog(mensagem, cor = "#000") {
    const logEntry = document.createElement("div");
    logEntry.style.color = cor;
    logEntry.textContent = mensagem;
    logArea.appendChild(logEntry);
    logArea.scrollTop = logArea.scrollHeight;
  }

  // Criar estrutura hierárquica para demonstrar bubbling
  const grandPai = document.createElement("div");
  grandPai.className = "grandpai";
  grandPai.style.cssText = `
        background: #ffebee;
        border: 3px solid #f44336;
        border-radius: 15px;
        padding: 30px;
        margin: 20px 0;
        cursor: pointer;
    `;
  grandPai.innerHTML = "<h4>👴 Avô (clique aqui)</h4>";

  const pai = document.createElement("div");
  pai.className = "pai";
  pai.style.cssText = `
        background: #e3f2fd;
        border: 3px solid #2196f3;
        border-radius: 12px;
        padding: 20px;
        margin: 15px 0;
        cursor: pointer;
    `;
  pai.innerHTML = "<h4>👨 Pai (clique aqui)</h4>";

  const filho = document.createElement("div");
  filho.className = "filho";
  filho.style.cssText = `
        background: #e8f5e8;
        border: 3px solid #4caf50;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        cursor: pointer;
    `;
  filho.innerHTML = "<h4>👶 Filho (clique aqui)</h4>";

  // Montar hierarquia
  pai.appendChild(filho);
  grandPai.appendChild(pai);

  // Adicionar event listeners para demonstrar bubbling
  grandPai.addEventListener("click", function (event) {
    adicionarLog(
      `🔵 BUBBLING: Avô (${event.currentTarget.className})`,
      "#f44336"
    );
  });

  pai.addEventListener("click", function (event) {
    adicionarLog(
      `🔵 BUBBLING: Pai (${event.currentTarget.className})`,
      "#2196f3"
    );
  });

  filho.addEventListener("click", function (event) {
    adicionarLog(
      `🔵 BUBBLING: Filho (${event.currentTarget.className})`,
      "#4caf50"
    );
    adicionarLog(`🎯 TARGET: ${event.target.className}`, "#ff9800");
  });

  // Botão para limpar log
  const botaoLimpar = document.createElement("button");
  botaoLimpar.textContent = "🗑️ Limpar Log";
  botaoLimpar.style.cssText =
    "background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin: 10px 0;";
  botaoLimpar.addEventListener("click", function () {
    logArea.innerHTML = "<div><em>Log limpo...</em></div>";
  });

  // Montar estrutura
  const container = document.createElement("div");
  container.appendChild(logArea);
  container.appendChild(grandPai);
  container.appendChild(botaoLimpar);

  demoArea.appendChild(container);

  console.log("✅ Demonstração de Bubbling e Capturing criada!");
}

// ===== DEMONSTRAÇÃO 4: EVENT DELEGATION =====
console.log("🎯 === DEMONSTRAÇÃO 4: EVENT DELEGATION ===");

function demonstrarEventDelegation() {
  console.log("📝 Demonstrando Event Delegation...");

  const demoArea = document.getElementById("demo-event-delegation");
  if (!demoArea) {
    console.warn("Área de demonstração não encontrada");
    return;
  }

  demoArea.innerHTML = "";

  // Container principal
  const container = document.createElement("div");
  container.style.cssText = "padding: 20px;";

  // Explicação
  const explicacao = document.createElement("div");
  explicacao.style.cssText = `
        background: #e7f3ff;
        border: 1px solid #b3d7ff;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
    `;
  explicacao.innerHTML = `
        <h4>🎯 Event Delegation</h4>
        <p>Técnica que permite gerenciar eventos de múltiplos elementos usando um único listener no elemento pai.</p>
        <p><strong>Vantagens:</strong> Performance, elementos dinâmicos são automaticamente incluídos.</p>
    `;

  // Lista dinâmica para demonstrar delegation
  const listaDinamica = document.createElement("ul");
  listaDinamica.className = "lista-dinamica";
  listaDinamica.style.cssText = `
        background: #f8f9fa;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        list-style: none;
        min-height: 100px;
    `;

  // Event delegation no pai (ul) para gerenciar cliques nos filhos (li)
  listaDinamica.addEventListener("click", function (event) {
    console.log("🎯 Event Delegation - Evento capturado no pai:", event);

    // Verificar se o clique foi em um item da lista
    if (event.target.classList.contains("item-lista")) {
      const item = event.target;
      item.classList.toggle("completed");
      if (item.classList.contains("completed")) {
        item.style.textDecoration = "line-through";
        item.style.opacity = "0.6";
        console.log("✅ Item marcado como completo");
      } else {
        item.style.textDecoration = "none";
        item.style.opacity = "1";
        console.log("⭕ Item desmarcado");
      }
    }
  });

  // Função para criar item da lista
  function criarItemLista(texto, id) {
    const li = document.createElement("li");
    li.className = "item-lista";
    li.dataset.id = id;
    li.style.cssText = `
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 12px;
            margin: 8px 0;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
    li.textContent = texto;
    return li;
  }

  // Controles para adicionar itens
  const controles = document.createElement("div");
  controles.style.cssText =
    "display: flex; gap: 10px; margin: 20px 0; align-items: center; flex-wrap: wrap;";

  const inputNovoItem = document.createElement("input");
  inputNovoItem.type = "text";
  inputNovoItem.placeholder = "Digite um novo item...";
  inputNovoItem.style.cssText =
    "flex: 1; min-width: 200px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;";

  const botaoAdicionar = document.createElement("button");
  botaoAdicionar.textContent = "➕ Adicionar";
  botaoAdicionar.style.cssText =
    "background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;";

  let proximoId = 1;

  function adicionarNovoItem() {
    const texto = inputNovoItem.value.trim();
    if (texto) {
      const novoItem = criarItemLista(texto, proximoId++);
      listaDinamica.appendChild(novoItem);
      inputNovoItem.value = "";
      console.log("📝 Novo item adicionado:", texto);
    }
  }

  botaoAdicionar.addEventListener("click", adicionarNovoItem);

  inputNovoItem.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      adicionarNovoItem();
    }
  });

  controles.appendChild(inputNovoItem);
  controles.appendChild(botaoAdicionar);

  // Adicionar alguns itens iniciais
  ["Item 1 - Clique para completar", "Item 2 - Adicione mais itens!"].forEach(
    (texto, index) => {
      const item = criarItemLista(texto, proximoId++);
      listaDinamica.appendChild(item);
    }
  );

  // Montar estrutura
  container.appendChild(explicacao);
  container.appendChild(controles);
  container.appendChild(listaDinamica);

  demoArea.appendChild(container);

  console.log("✅ Demonstração de Event Delegation criada!");
}

// ===== DEMONSTRAÇÃO 5: CUSTOM EVENTS =====
console.log("🎯 === DEMONSTRAÇÃO 5: CUSTOM EVENTS ===");

function demonstrarCustomEvents() {
  console.log("📝 Demonstrando Custom Events...");

  const demoArea = document.getElementById("demo-custom-events");
  if (!demoArea) {
    console.warn("Área de demonstração não encontrada");
    return;
  }

  demoArea.innerHTML = "";

  // Container principal
  const container = document.createElement("div");
  container.style.cssText = "padding: 20px;";

  // Explicação
  const explicacao = document.createElement("div");
  explicacao.style.cssText = `
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
    `;
  explicacao.innerHTML = `
        <h4>🎆 Custom Events</h4>
        <p>Eventos personalizados permitem criar sistemas de comunicação flexíveis entre componentes.</p>
        <p><strong>Usos:</strong> Notificações, comunicação entre módulos, arquiteturas orientadas a eventos.</p>
    `;

  // Sistema de notificações
  const notificationsContainer = document.createElement("div");
  notificationsContainer.style.cssText = `
        min-height: 100px;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        padding: 15px;
        margin: 20px 0;
    `;
  notificationsContainer.innerHTML = "<em>Notificações aparecerão aqui...</em>";

  // Listener para custom events
  document.addEventListener("notification:show", function (event) {
    console.log("🔔 Custom event recebido:", event.detail);

    const notification = document.createElement("div");
    notification.style.cssText = `
            background: #007bff;
            color: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            animation: slideIn 0.3s ease-out;
        `;
    notification.innerHTML = `
            <strong>${event.detail.title}</strong><br>
            ${event.detail.message}
        `;

    if (
      notificationsContainer.innerHTML.includes("Notificações aparecerão aqui")
    ) {
      notificationsContainer.innerHTML = "";
    }

    notificationsContainer.appendChild(notification);

    // Auto-remove após 3 segundos
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  });

  // Controles
  const controles = document.createElement("div");
  controles.style.cssText =
    "display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap;";

  const botaoCustomEvent = document.createElement("button");
  botaoCustomEvent.textContent = "🎆 Disparar Custom Event";
  botaoCustomEvent.style.cssText =
    "background: #e83e8c; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;";

  botaoCustomEvent.addEventListener("click", function () {
    const customEvent = new CustomEvent("notification:show", {
      detail: {
        title: "Evento Personalizado!",
        message: "Este é um custom event funcionando!",
      },
      bubbles: true,
    });

    console.log("🚀 Disparando custom event:", customEvent);
    document.dispatchEvent(customEvent);
  });

  controles.appendChild(botaoCustomEvent);

  // CSS para animações
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
  if (!document.querySelector("style[data-aula6]")) {
    style.setAttribute("data-aula6", "true");
    document.head.appendChild(style);
  }

  // Montar estrutura
  container.appendChild(explicacao);
  container.appendChild(controles);
  container.appendChild(notificationsContainer);

  demoArea.appendChild(container);

  console.log("✅ Demonstração de Custom Events criada!");
}

// ===== FUNÇÃO DE INICIALIZAÇÃO =====
function inicializarAula6() {
  console.log("🚀 Inicializando Aula 6: Eventos Avançados e Interatividade");

  // Aguardar o DOM estar carregado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      executarDemonstracoes();
    });
  } else {
    executarDemonstracoes();
  }
}

function executarDemonstracoes() {
  console.log("▶️ Executando demonstrações da Etapa 2...");

  // Executar demonstrações conforme elementos estiverem disponíveis
  setTimeout(() => {
    try {
      demonstrarEventosBasicos();
    } catch (error) {
      console.error("Erro na demonstração de eventos básicos:", error);
    }
  }, 100);

  setTimeout(() => {
    try {
      demonstrarEventObject();
    } catch (error) {
      console.error("Erro na demonstração do Event Object:", error);
    }
  }, 200);

  setTimeout(() => {
    try {
      demonstrarBubblingCapturing();
    } catch (error) {
      console.error("Erro na demonstração de Bubbling/Capturing:", error);
    }
  }, 300);

  setTimeout(() => {
    try {
      demonstrarEventDelegation();
    } catch (error) {
      console.error("Erro na demonstração de Event Delegation:", error);
    }
  }, 400);

  setTimeout(() => {
    try {
      demonstrarCustomEvents();
    } catch (error) {
      console.error("Erro na demonstração de Custom Events:", error);
    }
  }, 500);

  console.log("✅ Demonstrações da Etapa 2 carregadas!");
}

// Inicializar automaticamente
inicializarAula6();

// Exportar funções para uso externo
if (typeof window !== "undefined") {
  window.Aula6 = {
    demonstrarEventosBasicos,
    demonstrarEventObject,
    demonstrarBubblingCapturing,
    demonstrarEventDelegation,
    demonstrarCustomEvents,
    inicializarAula6,
  };
}

console.log("📚 Arquivo de código da Aula 6 carregado! Etapa 2 concluída.");
