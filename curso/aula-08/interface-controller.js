/**
 * Aula 8: Script de Integração da Interface
 * Conecta a interface HTML com as demonstrações JavaScript
 */

// === Inicialização Global ===
let demo1, demo2, demo3, demo4, demo5, demo6;
let currentDemo = "demo1";

// === Inicialização quando o DOM estiver carregado ===
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Iniciando Aula 8: Manipulação Avançada do DOM");

  // Inicializar navegação por tabs
  inicializarNavegacao();

  // Inicializar todas as demonstrações
  inicializarDemonstracoes();

  // Configurar eventos globais
  configurarEventosGlobais();

  console.log("✅ Interface inicializada com sucesso!");
});

// === Navegação por Demonstrações ===
function inicializarNavegacao() {
  const tabs = document.querySelectorAll(".demo-tab");
  const panels = document.querySelectorAll(".demo-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetDemo = this.dataset.demo;

      // Remover classe active de todas as tabs e panels
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      // Adicionar classe active na tab e panel selecionados
      this.classList.add("active");
      document.getElementById(targetDemo).classList.add("active");

      // Atualizar demo atual
      currentDemo = targetDemo;

      // Inicializar demo específico se necessário
      inicializarDemoEspecifico(targetDemo);
    });
  });
}

// === Inicialização das Demonstrações ===
function inicializarDemonstracoes() {
  try {
    // Demo 1: Performance Optimization
    if (typeof Demo1_PerformanceOptimization !== "undefined") {
      demo1 = new Demo1_PerformanceOptimization();
      configurarDemo1();
    }

    // Demo 2: Observadores
    if (typeof Demo2_Observadores !== "undefined") {
      demo2 = new Demo2_Observadores();
      configurarDemo2();
    }

    // Demo 3: Virtual Scrolling
    if (typeof Demo3_VirtualScrolling !== "undefined") {
      demo3 = new Demo3_VirtualScrolling("virtual-scroll-container", 10000);
      configurarDemo3();
    }

    // Demo 4: Selection API
    if (typeof Demo4_SelectionAPI !== "undefined") {
      demo4 = new Demo4_SelectionAPI();
      configurarDemo4();
    }

    // Demo 5: Drag & Drop
    if (typeof Demo5_DragDropAvancado !== "undefined") {
      demo5 = new Demo5_DragDropAvancado();
      configurarDemo5();
    }

    // Demo 6: Animações
    if (typeof Demo6_AnimacaoAvancada !== "undefined") {
      demo6 = new Demo6_AnimacaoAvancada("animation-canvas");
      configurarDemo6();
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar demonstrações:", error);
    exibirErroNaInterface(
      "Erro ao carregar demonstrações. Verifique o console para mais detalhes."
    );
  }
}

// === Configuração Demo 1: Performance ===
function configurarDemo1() {
  const btnTraditional = document.getElementById("btn-traditional");
  const btnFragment = document.getElementById("btn-fragment");
  const btnBatch = document.getElementById("btn-batch");
  const btnBenchmark = document.getElementById("btn-benchmark");

  if (btnTraditional) {
    btnTraditional.addEventListener("click", () => {
      exibirCarregamento("traditional-list");
      demo1.exemploTradicional().then((result) => {
        exibirResultadoPerformance("Método Tradicional", result);
      });
    });
  }

  if (btnFragment) {
    btnFragment.addEventListener("click", () => {
      exibirCarregamento("fragment-list");
      demo1.exemploFragment().then((result) => {
        exibirResultadoPerformance("DocumentFragment", result);
      });
    });
  }

  if (btnBatch) {
    btnBatch.addEventListener("click", () => {
      exibirCarregamento("batch-list");
      demo1.exemploBatch().then((result) => {
        exibirResultadoPerformance("Batch Updates", result);
      });
    });
  }

  if (btnBenchmark) {
    btnBenchmark.addEventListener("click", () => {
      executarBenchmarkCompleto();
    });
  }
}

// === Configuração Demo 2: Observadores ===
function configurarDemo2() {
  const container = document.getElementById("lazy-load-container");
  if (container && demo2) {
    demo2.configurarLazyLoading(container);
    demo2.configurarMutationObserver(
      document.getElementById("mutation-target")
    );
  }
}

// === Configuração Demo 3: Virtual Scrolling ===
function configurarDemo3() {
  const searchInput = document.getElementById("virtual-search");
  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        demo3.filtrarItens(this.value);
      }
    });
  }
}

// === Configuração Demo 4: Selection API ===
function configurarDemo4() {
  const editor = document.getElementById("text-editor");
  const toolbar = document.getElementById("formatting-toolbar");

  if (editor && demo4) {
    demo4.configurarEditor(editor);
    demo4.criarToolbar(toolbar);
  }
}

// === Configuração Demo 5: Drag & Drop ===
function configurarDemo5() {
  const board = document.getElementById("kanban-board");
  if (board && demo5) {
    demo5.configurarKanban(board);
  }
}

// === Configuração Demo 6: Animações ===
function configurarDemo6() {
  const btnStart = document.getElementById("btn-start-animation");
  const btnStop = document.getElementById("btn-stop-animation");
  const btnAdd = document.getElementById("btn-add-particles");
  const btnClear = document.getElementById("btn-clear-particles");

  if (btnStart) {
    btnStart.addEventListener("click", () => demo6.iniciar());
  }

  if (btnStop) {
    btnStop.addEventListener("click", () => demo6.parar());
  }

  if (btnAdd) {
    btnAdd.addEventListener("click", () => demo6.adicionarParticulas(10));
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => demo6.limparParticulas());
  }
}

// === Inicialização Específica por Demo ===
function inicializarDemoEspecifico(demoId) {
  switch (demoId) {
    case "demo1":
      if (demo1) demo1.reset();
      break;
    case "demo2":
      if (demo2) demo2.resetObservers();
      break;
    case "demo3":
      if (demo3) demo3.reset();
      break;
    case "demo4":
      if (demo4) demo4.reset();
      break;
    case "demo5":
      if (demo5) demo5.carregarDados();
      break;
    case "demo6":
      if (demo6) demo6.redimensionarCanvas();
      break;
  }
}

// === Utilitários de Interface ===
function exibirCarregamento(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
            <div class="text-center p-4">
                <div class="loading-spinner"></div>
                <p>Executando teste de performance...</p>
            </div>
        `;
  }
}

function exibirResultadoPerformance(metodo, resultado) {
  const statsContainer = document.getElementById("performance-stats");
  if (statsContainer && resultado) {
    const existingStats =
      statsContainer.querySelector(".performance-results") ||
      document.createElement("div");
    existingStats.className = "performance-results";

    existingStats.innerHTML += `
            <div class="stat-item">
                <span>${metodo}:</span>
                <span class="stat-value">${resultado.tempo}ms</span>
            </div>
        `;

    if (!statsContainer.querySelector(".performance-results")) {
      statsContainer.appendChild(existingStats);
    }
  }
}

async function executarBenchmarkCompleto() {
  const statsContainer = document.getElementById("performance-stats");
  if (statsContainer) {
    statsContainer.innerHTML = `
            <h5><i class="fas fa-chart-line"></i> Executando Benchmark Completo...</h5>
            <div class="loading-spinner"></div>
        `;
  }

  try {
    const resultados = [];

    // Executar todos os testes
    resultados.push({
      metodo: "Tradicional",
      resultado: await demo1.exemploTradicional(),
    });

    resultados.push({
      metodo: "Fragment",
      resultado: await demo1.exemploFragment(),
    });

    resultados.push({
      metodo: "Batch",
      resultado: await demo1.exemploBatch(),
    });

    // Exibir resultados comparativos
    exibirComparacaoBenchmark(resultados);
  } catch (error) {
    console.error("Erro no benchmark:", error);
    statsContainer.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle error-icon"></i>
                <p>Erro ao executar benchmark</p>
            </div>
        `;
  }
}

function exibirComparacaoBenchmark(resultados) {
  const statsContainer = document.getElementById("performance-stats");
  if (!statsContainer) return;

  const melhorTempo = Math.min(...resultados.map((r) => r.resultado.tempo));

  let html = `
        <h5><i class="fas fa-chart-line"></i> Resultados do Benchmark</h5>
        <div class="performance-comparison">
    `;

  resultados.forEach(({ metodo, resultado }) => {
    const melhorMetodo = resultado.tempo === melhorTempo;
    const diferenca = ((resultado.tempo / melhorTempo - 1) * 100).toFixed(1);

    html += `
            <div class="comparison-item ${melhorMetodo ? "success-state" : ""}">
                <span class="comparison-value">${resultado.tempo}ms</span>
                <span class="comparison-label">${metodo}</span>
                ${
                  !melhorMetodo
                    ? `<small>+${diferenca}%</small>`
                    : "<small>🏆 Melhor</small>"
                }
            </div>
        `;
  });

  html += "</div>";
  statsContainer.innerHTML = html;
}

function exibirErroNaInterface(mensagem) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-state";
  errorContainer.innerHTML = `
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <p>${mensagem}</p>
    `;

  document.body.insertBefore(errorContainer, document.body.firstChild);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

// === Eventos Globais ===
function configurarEventosGlobais() {
  // Redimensionamento da janela
  window.addEventListener("resize", function () {
    if (demo6 && currentDemo === "demo6") {
      demo6.redimensionarCanvas();
    }
  });

  // Teclas de atalho
  document.addEventListener("keydown", function (e) {
    // Ctrl + número para navegar entre demos
    if (e.ctrlKey && e.key >= "1" && e.key <= "6") {
      e.preventDefault();
      const demoNumber = e.key;
      const targetTab = document.querySelector(
        `[data-demo="demo${demoNumber}"]`
      );
      if (targetTab) {
        targetTab.click();
      }
    }

    // ESC para parar animações
    if (e.key === "Escape" && demo6) {
      demo6.parar();
    }
  });

  // Visibilidade da página (pausar animações quando não visível)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && demo6) {
      demo6.parar();
    }
  });
}

// === Funções de Utilidade Global ===
function resetAllDemos() {
  Object.values({ demo1, demo2, demo3, demo4, demo5, demo6 }).forEach(
    (demo) => {
      if (demo && typeof demo.reset === "function") {
        demo.reset();
      }
    }
  );

  // Reset localStorage para demo 5
  localStorage.removeItem("kanban-data");

  // Reinicializar demos
  inicializarDemonstracoes();

  // Exibir confirmação
  const notification = document.createElement("div");
  notification.className = "success-state";
  notification.innerHTML = `
        <i class="fas fa-check-circle success-icon"></i>
        <p>Todas as demonstrações foram resetadas!</p>
    `;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "9999";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function exportDemoData() {
  const data = {
    timestamp: new Date().toISOString(),
    currentDemo: currentDemo,
    kanbanData: localStorage.getItem("kanban-data"),
    performanceResults: demo1 ? demo1.getResults() : null,
    virtualScrollState: demo3 ? demo3.getState() : null,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `aula8-demo-data-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// === Debug e Desenvolvimento ===
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  window.demoDebug = {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
    currentDemo: () => currentDemo,
    resetAll: resetAllDemos,
    exportData: exportDemoData,
  };

  console.log(
    "🔧 Modo Debug ativado. Use window.demoDebug para acessar as demos."
  );
}

// === Performance Monitoring ===
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        `⚡ Tempo de carregamento: ${
          perfData.loadEventEnd - perfData.loadEventStart
        }ms`
      );
    }, 0);
  });
}
