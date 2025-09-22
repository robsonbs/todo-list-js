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
    console.log("🔧 Inicializando demonstrações...");

    // Demo 1: Performance Optimization
    if (typeof Demo1_PerformanceOptimization !== "undefined") {
      demo1 = new Demo1_PerformanceOptimization();
      console.log("✅ Demo1 inicializada");
    } else {
      console.warn("⚠️ Demo1_PerformanceOptimization não encontrada");
    }

    // Demo 2: Observadores
    if (typeof Demo2_Observadores !== "undefined") {
      demo2 = new Demo2_Observadores();
      console.log("✅ Demo2 inicializada");
    } else {
      console.warn("⚠️ Demo2_Observadores não encontrada");
    }

    // Demo 3: Virtual Scrolling
    if (typeof Demo3_VirtualScrolling !== "undefined") {
      demo3 = new Demo3_VirtualScrolling("virtual-scroll-container", 10000);
      console.log("✅ Demo3 inicializada");
    } else {
      console.warn("⚠️ Demo3_VirtualScrolling não encontrada");
    }

    // Demo 4: Selection API
    if (typeof Demo4_SelectionAPI !== "undefined") {
      demo4 = new Demo4_SelectionAPI();
      console.log("✅ Demo4 inicializada");
    } else {
      console.warn("⚠️ Demo4_SelectionAPI não encontrada");
    }

    // Demo 5: Drag & Drop
    if (typeof Demo5_DragDropAvancado !== "undefined") {
      demo5 = new Demo5_DragDropAvancado();
      console.log("✅ Demo5 inicializada");
    } else {
      console.warn("⚠️ Demo5_DragDropAvancado não encontrada");
    }

    // Demo 6: Animações
    if (typeof Demo6_AnimacaoAvancada !== "undefined") {
      demo6 = new Demo6_AnimacaoAvancada("animation-canvas");
      console.log("✅ Demo6 inicializada");
    } else {
      console.warn("⚠️ Demo6_AnimacaoAvancada não encontrada");
    }

    // Configurar todas as demos
    configurarDemo1();
    configurarDemo2();
    configurarDemo3();
    configurarDemo4();
    configurarDemo5();
    configurarDemo6();

    console.log("🎉 Todas as demonstrações foram inicializadas!");
  } catch (error) {
    console.error("❌ Erro ao inicializar demonstrações:", error);
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4757;
      color: white;
      padding: 15px;
      border-radius: 8px;
      z-index: 9999;
      max-width: 300px;
    `;
    errorDiv.innerHTML = `
      <strong>⚠️ Erro na Aula 8</strong><br>
      Algumas demonstrações podem não funcionar.<br>
      <small>Verifique o console para detalhes.</small>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 10000);
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
      if (demo1 && typeof demo1.demonstrarMetodoTradicional === "function") {
        demo1.demonstrarMetodoTradicional();
      } else {
        console.error("Demo1 não está disponível ou método não existe");
      }
    });
  }

  if (btnFragment) {
    btnFragment.addEventListener("click", () => {
      if (demo1 && typeof demo1.demonstrarDocumentFragment === "function") {
        demo1.demonstrarDocumentFragment();
      } else {
        console.error("Demo1 não está disponível ou método não existe");
      }
    });
  }

  if (btnBatch) {
    btnBatch.addEventListener("click", () => {
      if (demo1 && typeof demo1.demonstrarBatchUpdates === "function") {
        demo1.demonstrarBatchUpdates();
      } else {
        console.error("Demo1 não está disponível ou método não existe");
      }
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
  // Demo 2 se auto-inicializa no constructor
  // Apenas verificamos se foi criada corretamente
  if (!demo2) {
    console.error("Demo2 não foi inicializada corretamente");
  } else {
    console.log("✅ Demo 2: Observadores configurada");
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
  // Demo 4 se auto-inicializa no constructor
  // Apenas verificamos se foi criada corretamente
  if (!demo4) {
    console.error("Demo4 não foi inicializada corretamente");
  } else {
    console.log("✅ Demo 4: Selection API configurada");
  }
}

// === Configuração Demo 5: Drag & Drop ===
function configurarDemo5() {
  // Demo 5 se auto-inicializa no constructor
  // Apenas verificamos se foi criada corretamente
  if (!demo5) {
    console.error("Demo5 não foi inicializada corretamente");
  } else {
    console.log("✅ Demo 5: Drag & Drop configurada");
  }
}

// === Configuração Demo 6: Animações ===
function configurarDemo6() {
  const btnStart = document.getElementById("btn-start-animation");
  const btnStop = document.getElementById("btn-stop-animation");
  const btnAdd = document.getElementById("btn-add-particles");
  const btnClear = document.getElementById("btn-clear-particles");

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      if (demo6 && typeof demo6.startAnimation === "function") {
        demo6.startAnimation();
      }
    });
  }

  if (btnStop) {
    btnStop.addEventListener("click", () => {
      if (demo6 && typeof demo6.stopAnimation === "function") {
        demo6.stopAnimation();
      }
    });
  }

  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      if (demo6 && typeof demo6.addParticles === "function") {
        demo6.addParticles(10);
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (demo6 && typeof demo6.clearParticles === "function") {
        demo6.clearParticles();
      }
    });
  }

  console.log("✅ Demo 6: Animações configurada");
}

// === Inicialização Específica por Demo ===
function inicializarDemoEspecifico(demoId) {
  try {
    switch (demoId) {
      case "demo1":
        // Demo 1 não precisa de inicialização específica
        console.log("📊 Demo 1: Performance ativa");
        break;
      case "demo2":
        // Demo 2 se auto-gerencia com observers
        console.log("👀 Demo 2: Observadores ativa");
        break;
      case "demo3":
        // Demo 3 se auto-gerencia com virtual scrolling
        console.log("📜 Demo 3: Virtual Scrolling ativa");
        break;
      case "demo4":
        // Demo 4 se auto-gerencia com Selection API
        console.log("✏️ Demo 4: Selection API ativa");
        break;
      case "demo5":
        // Demo 5 se auto-gerencia com localStorage
        console.log("🎯 Demo 5: Drag & Drop ativa");
        break;
      case "demo6":
        if (demo6 && typeof demo6.resizeCanvas === "function") {
          demo6.resizeCanvas();
          console.log("🎬 Demo 6: Animações ativa");
        }
        break;
    }
  } catch (error) {
    console.error(`❌ Erro ao inicializar ${demoId}:`, error);
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
    console.log("🏁 Executando benchmark completo...");

    // Executar os métodos de demonstração que realmente existem
    if (demo1 && typeof demo1.demonstrarMetodoTradicional === "function") {
      demo1.demonstrarMetodoTradicional();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (demo1 && typeof demo1.demonstrarDocumentFragment === "function") {
      demo1.demonstrarDocumentFragment();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (demo1 && typeof demo1.demonstrarBatchUpdates === "function") {
      demo1.demonstrarBatchUpdates();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Exibir resultados
    if (statsContainer) {
      statsContainer.innerHTML = `
        <h5><i class="fas fa-chart-line"></i> Benchmark Completo!</h5>
        <div class="success-state">
          <i class="fas fa-check-circle success-icon"></i>
          <p>Todas as demonstrações de performance foram executadas.<br>
          Verifique os tempos de execução acima de cada resultado.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Erro no benchmark:", error);
    if (statsContainer) {
      statsContainer.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle error-icon"></i>
                <p>Erro ao executar benchmark</p>
            </div>
        `;
    }
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
      demo6.resizeCanvas();
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
      demo6.stopAnimation();
    }
  });

  // Visibilidade da página (pausar animações quando não visível)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && demo6) {
      demo6.stopAnimation();
    }
  });
}

// === Funções de Utilidade Global ===
function resetAllDemos() {
  console.log("🔄 Resetando demonstrações...");

  // Parar animação se estiver rodando
  if (demo6 && typeof demo6.stopAnimation === "function") {
    demo6.stopAnimation();
  }

  // Reset localStorage para demo 5
  localStorage.removeItem("kanban-data");

  // Limpar containers de resultados
  const containers = [
    "demo1-container",
    "performance-stats",
    "mutation-log",
    "virtual-scroll-container",
  ];

  containers.forEach((id) => {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = "";
    }
  });

  // Recriar as demonstrações
  setTimeout(() => {
    inicializarDemonstracoes();
  }, 100);

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
    stats: demo1 ? demo1.stats : null,
    particleCount: demo6 && demo6.particles ? demo6.particles.length : 0,
    demoStatus: {
      demo1: demo1 ? "loaded" : "not loaded",
      demo2: demo2 ? "loaded" : "not loaded",
      demo3: demo3 ? "loaded" : "not loaded",
      demo4: demo4 ? "loaded" : "not loaded",
      demo5: demo5 ? "loaded" : "not loaded",
      demo6: demo6 ? "loaded" : "not loaded",
    },
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
    get demo1() {
      return demo1;
    },
    get demo2() {
      return demo2;
    },
    get demo3() {
      return demo3;
    },
    get demo4() {
      return demo4;
    },
    get demo5() {
      return demo5;
    },
    get demo6() {
      return demo6;
    },
    currentDemo: () => currentDemo,
    resetAll: resetAllDemos,
    exportData: exportDemoData,
    status: () => {
      console.log("📊 Status das Demonstrações:");
      console.log(
        "Demo1 (Performance):",
        demo1 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log(
        "Demo2 (Observadores):",
        demo2 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log(
        "Demo3 (Virtual Scroll):",
        demo3 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log(
        "Demo4 (Selection API):",
        demo4 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log(
        "Demo5 (Drag & Drop):",
        demo5 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log(
        "Demo6 (Animações):",
        demo6 ? "✅ Carregada" : "❌ Não carregada"
      );
      console.log("Demo Atual:", currentDemo);
    },
  };

  console.log(
    "🔧 Modo Debug ativado. Use window.demoDebug para acessar as demos."
  );
  console.log(
    "💡 Digite window.demoDebug.status() para ver o status das demos"
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
