/**
 * Scripts do Guia do Professor
 * Funcionalidades interativas e navegação
 */

// === Inicialização ===
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎓 Guia do Professor carregado!");

  // Inicializar componentes
  inicializarNavegacao();
  inicializarGraficos();
  inicializarDownloads();
  inicializarAnimacoes();

  // Configurar eventos
  configurarEventos();
});

// === Navegação ===
function inicializarNavegacao() {
  // Smooth scrolling para links âncora
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Remover classe active de todos os links
        document
          .querySelectorAll(".sidebar-guia .nav-link")
          .forEach((navLink) => {
            navLink.classList.remove("active");
          });

        // Adicionar classe active ao link clicado
        this.classList.add("active");

        // Scroll suave
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Destacar seção ativa durante scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const navLink = document.querySelector(`a[href="#${id}"]`);

          // Remover active de todos
          document
            .querySelectorAll(".sidebar-guia .nav-link")
            .forEach((link) => {
              link.classList.remove("active");
            });

          // Adicionar active ao atual
          if (navLink) {
            navLink.classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-100px 0px -50% 0px",
    }
  );

  // Observar todas as seções
  document.querySelectorAll(".content-section").forEach((section) => {
    observer.observe(section);
  });
}

// === Gráficos ===
function inicializarGraficos() {
  // Gráfico de distribuição de atividades
  const ctx = document.getElementById("chartAtividades");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Teoria", "Prática Guiada", "Projetos", "Avaliação"],
        datasets: [
          {
            data: [30, 40, 20, 10],
            backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + context.parsed + "%";
              },
            },
          },
        },
        cutout: "60%",
      },
    });
  }

  // Animar barras de progresso
  animarBarrasProgresso();
}

function animarBarrasProgresso() {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width;

          // Reset para animação
          progressBar.style.width = "0%";

          // Animar até o valor final
          setTimeout(() => {
            progressBar.style.transition = "width 1.5s ease-out";
            progressBar.style.width = width;
          }, 200);

          // Parar de observar após animação
          observer.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

// === Downloads ===
function inicializarDownloads() {
  // Simular downloads de documentos
  window.baixarGuiaCompleto = function () {
    mostrarNotificacao("📄 Preparando Guia Completo em PDF...", "info");

    // Simular processo de geração
    setTimeout(() => {
      mostrarNotificacao("✅ Guia Completo baixado com sucesso!", "success");
      // Aqui seria implementada a geração real do PDF
    }, 2000);
  };

  window.baixarPlanosAula = function () {
    mostrarNotificacao("📅 Preparando Planos de Aula...", "info");

    setTimeout(() => {
      mostrarNotificacao("✅ Planos de Aula baixados com sucesso!", "success");
    }, 1500);
  };

  window.baixarRubricas = function () {
    mostrarNotificacao("📝 Preparando Rubricas de Avaliação...", "info");

    setTimeout(() => {
      mostrarNotificacao("✅ Rubricas baixadas com sucesso!", "success");
    }, 1200);
  };
}

// === Carregamento Dinâmico ===
window.carregarPlanosAula = function () {
  mostrarNotificacao("📚 Carregando planos de aula detalhados...", "info");

  // Simular carregamento
  setTimeout(() => {
    const contentArea = document.querySelector(".content-guia");
    const planosSection = criarSecaoPlanosAula();

    // Adicionar nova seção
    contentArea.appendChild(planosSection);

    // Scroll até a nova seção
    planosSection.scrollIntoView({
      behavior: "smooth",
    });

    mostrarNotificacao("✅ Planos de aula carregados!", "success");
  }, 1000);
};

// === Criação de Conteúdo Dinâmico ===
function criarSecaoPlanosAula() {
  const section = document.createElement("section");
  section.id = "planos-aula";
  section.className = "content-section";

  section.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-calendar-alt"></i> Planos de Aula Detalhados</h2>
            <p>Guias específicos para cada aula do curso</p>
        </div>
        
        <div class="accordion" id="accordionPlanosAula">
            ${gerarAccordionAulas()}
        </div>
        
        <div class="text-center mt-4">
            <button class="btn btn-outline-primary" onclick="expandirTodosPlanos()">
                <i class="fas fa-expand-alt"></i> Expandir Todos os Planos
            </button>
            <button class="btn btn-outline-secondary ms-2" onclick="recolherTodosPlanos()">
                <i class="fas fa-compress-alt"></i> Recolher Todos os Planos
            </button>
        </div>
    `;

  return section;
}

function gerarAccordionAulas() {
  const aulas = [
    {
      numero: 1,
      titulo: "Introdução ao JavaScript",
      duracao: "2h",
      objetivos: [
        "Compreender o que é JavaScript",
        "Configurar ambiente de desenvolvimento",
        "Escrever primeiro programa",
      ],
      atividades: [
        "Apresentação da linguagem",
        "Setup do ambiente",
        "Hello World interativo",
      ],
      materiais: ["Slides introdutórios", "Editor de código", "Navegador web"],
      avaliacao: "Questionário sobre conceitos básicos",
    },
    {
      numero: 2,
      titulo: "Variáveis e Tipos de Dados",
      duracao: "2h",
      objetivos: [
        "Declarar variáveis",
        "Identificar tipos de dados",
        "Converter entre tipos",
      ],
      atividades: [
        "Exercícios de declaração",
        "Calculadora simples",
        "Jogo de adivinhação",
      ],
      materiais: ["Exemplos práticos", "Exercícios interativos", "Debugger"],
      avaliacao: "Projeto: Calculadora de IMC",
    },
    {
      numero: 3,
      titulo: "Funções",
      duracao: "2h",
      objetivos: ["Criar funções", "Usar parâmetros", "Entender escopo"],
      atividades: [
        "Biblioteca de funções matemáticas",
        "Validador de formulários",
        "Conversor de unidades",
      ],
      materiais: [
        "Templates de funções",
        "Exercícios progressivos",
        "Casos de uso",
      ],
      avaliacao: "Projeto: Sistema de validação",
    },
    // Adicionar mais aulas conforme necessário
  ];

  return aulas
    .map(
      (aula) => `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#aula${
                          aula.numero
                        }" aria-expanded="false">
                    <i class="fas fa-book-open me-2"></i>
                    <strong>Aula ${aula.numero}: ${aula.titulo}</strong>
                    <span class="badge bg-primary ms-auto me-2">${
                      aula.duracao
                    }</span>
                </button>
            </h2>
            <div id="aula${
              aula.numero
            }" class="accordion-collapse collapse" data-bs-parent="#accordionPlanosAula">
                <div class="accordion-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h5><i class="fas fa-bullseye"></i> Objetivos de Aprendizagem</h5>
                            <ul>
                                ${aula.objetivos
                                  .map((obj) => `<li>${obj}</li>`)
                                  .join("")}
                            </ul>
                            
                            <h5><i class="fas fa-tasks"></i> Atividades</h5>
                            <ul>
                                ${aula.atividades
                                  .map((ativ) => `<li>${ativ}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h5><i class="fas fa-toolbox"></i> Materiais Necessários</h5>
                            <ul>
                                ${aula.materiais
                                  .map((mat) => `<li>${mat}</li>`)
                                  .join("")}
                            </ul>
                            
                            <h5><i class="fas fa-clipboard-check"></i> Avaliação</h5>
                            <p>${aula.avaliacao}</p>
                        </div>
                    </div>
                    
                    <div class="mt-3">
                        <button class="btn btn-sm btn-outline-primary" onclick="baixarPlanoAula(${
                          aula.numero
                        })">
                            <i class="fas fa-download"></i> Baixar Plano Completo
                        </button>
                        <button class="btn btn-sm btn-outline-info ms-2" onclick="visualizarAula(${
                          aula.numero
                        })">
                            <i class="fas fa-eye"></i> Visualizar Aula
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// === Utilitários ===
function mostrarNotificacao(mensagem, tipo = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    tipo === "info" ? "primary" : tipo === "success" ? "success" : "warning"
  } notification-toast`;
  notification.innerHTML = `
        <strong>${mensagem}</strong>
        <button type="button" class="btn-close" aria-label="Close"></button>
    `;

  // Estilos da notificação
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 1060;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Auto-remover após 4 segundos
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  }, 4000);

  // Remover ao clicar no X
  notification.querySelector(".btn-close").addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  });
}

function inicializarAnimacoes() {
  // Adicionar CSS para animações de notificação
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-toast {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border: none;
        }
    `;
  document.head.appendChild(style);
}

function configurarEventos() {
  // Event listener para redimensionamento
  window.addEventListener(
    "resize",
    debounce(() => {
      // Reajustar gráficos se necessário
      const chart = Chart.getChart("chartAtividades");
      if (chart) {
        chart.resize();
      }
    }, 250)
  );

  // Event listener para modo escuro (se implementado)
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      console.log("Tema alterado:", mediaQuery.matches ? "escuro" : "claro");
      // Implementar mudança de tema se necessário
    });
  }
}

// === Funções Auxiliares ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === Funções de Ação ===
window.expandirTodosPlanos = function () {
  document
    .querySelectorAll("#accordionPlanosAula .accordion-collapse")
    .forEach((collapse) => {
      const bsCollapse = new bootstrap.Collapse(collapse, { show: true });
    });
};

window.recolherTodosPlanos = function () {
  document
    .querySelectorAll("#accordionPlanosAula .accordion-collapse.show")
    .forEach((collapse) => {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
};

window.baixarPlanoAula = function (numero) {
  mostrarNotificacao(`📋 Baixando plano da Aula ${numero}...`, "info");
  setTimeout(() => {
    mostrarNotificacao(`✅ Plano da Aula ${numero} baixado!`, "success");
  }, 1000);
};

window.visualizarAula = function (numero) {
  const url = `../aula-0${numero}/index.html`;
  window.open(url, "_blank");
  mostrarNotificacao(`👁️ Abrindo Aula ${numero} em nova aba...`, "info");
};

// === Debug ===
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  window.guiaDebug = {
    mostrarNotificacao,
    carregarPlanosAula,
    expandirTodosPlanos,
    recolherTodosPlanos,
  };
  console.log(
    "🔧 Modo debug ativado. Use window.guiaDebug para acessar funções."
  );
}
