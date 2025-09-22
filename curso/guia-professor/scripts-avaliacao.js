/**
 * Scripts do Sistema de Avaliação
 * Funcionalidades para acompanhamento e relatórios
 */

// === Inicialização ===
document.addEventListener("DOMContentLoaded", function () {
  console.log("📊 Sistema de Avaliação carregado!");

  inicializarGraficos();
  inicializarCalculadoraNotas();
  inicializarSimuladorProgresso();
  inicializarEventos();
});

// === Gráficos ===
function inicializarGraficos() {
  // Gráfico de distribuição de notas
  const ctxNotas = document.getElementById("chartNotas");
  if (ctxNotas) {
    new Chart(ctxNotas, {
      type: "doughnut",
      data: {
        labels: ["Projetos", "Exercícios", "Participação", "Avaliações"],
        datasets: [
          {
            data: [40, 30, 20, 10],
            backgroundColor: ["#28a745", "#007bff", "#ffc107", "#dc3545"],
            borderWidth: 0,
            hoverOffset: 8,
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
        cutout: "65%",
      },
    });
  }
}

// === Calculadora de Notas ===
function inicializarCalculadoraNotas() {
  window.calcularNotaFinal = function (
    projetos,
    exercicios,
    participacao,
    avaliacoes
  ) {
    const pesos = {
      projetos: 0.4,
      exercicios: 0.3,
      participacao: 0.2,
      avaliacoes: 0.1,
    };

    const notaFinal =
      projetos * pesos.projetos +
      exercicios * pesos.exercicios +
      participacao * pesos.participacao +
      avaliacoes * pesos.avaliacoes;

    return {
      nota: notaFinal.toFixed(2),
      conceito: obterConceito(notaFinal),
      status: obterStatus(notaFinal),
    };
  };

  window.obterConceito = function (nota) {
    if (nota >= 9.0) return "A+";
    if (nota >= 8.0) return "A";
    if (nota >= 7.0) return "B+";
    if (nota >= 6.0) return "B";
    if (nota >= 5.0) return "C";
    return "D";
  };

  window.obterStatus = function (nota) {
    if (nota >= 7.0) return "Aprovado";
    if (nota >= 5.0) return "Recuperação";
    return "Reprovado";
  };
}

// === Simulador de Progresso ===
function inicializarSimuladorProgresso() {
  // Dados simulados de alunos
  window.dadosAlunos = [
    {
      id: 1,
      nome: "Ana Silva",
      email: "ana@email.com",
      aulas: [
        { numero: 1, concluida: true, nota: 8.5, tempo: 120 },
        { numero: 2, concluida: true, nota: 9.0, tempo: 110 },
        { numero: 3, concluida: true, nota: 7.5, tempo: 135 },
        { numero: 4, concluida: false, nota: null, tempo: null },
        { numero: 5, concluida: false, nota: null, tempo: null },
      ],
      projetos: [
        { nome: "Calculadora", nota: 8.0, entregue: true },
        { nome: "Todo List", nota: 9.5, entregue: true },
        { nome: "Quiz", nota: null, entregue: false },
      ],
      participacao: 85,
      mediaGeral: 8.3,
    },
    {
      id: 2,
      nome: "Carlos Santos",
      email: "carlos@email.com",
      aulas: [
        { numero: 1, concluida: true, nota: 7.0, tempo: 140 },
        { numero: 2, concluida: true, nota: 6.5, tempo: 150 },
        { numero: 3, concluida: false, nota: null, tempo: null },
        { numero: 4, concluida: false, nota: null, tempo: null },
        { numero: 5, concluida: false, nota: null, tempo: null },
      ],
      projetos: [
        { nome: "Calculadora", nota: 7.5, entregue: true },
        { nome: "Todo List", nota: null, entregue: false },
        { nome: "Quiz", nota: null, entregue: false },
      ],
      participacao: 60,
      mediaGeral: 6.8,
    },
  ];

  window.obterProgressoAluno = function (alunoId) {
    const aluno = dadosAlunos.find((a) => a.id === alunoId);
    if (!aluno) return null;

    const aulasCompletas = aluno.aulas.filter((a) => a.concluida).length;
    const totalAulas = aluno.aulas.length;
    const projetosEntregues = aluno.projetos.filter((p) => p.entregue).length;
    const totalProjetos = aluno.projetos.length;

    return {
      ...aluno,
      progresso: {
        aulas: Math.round((aulasCompletas / totalAulas) * 100),
        projetos: Math.round((projetosEntregues / totalProjetos) * 100),
        geral: Math.round(
          ((aulasCompletas + projetosEntregues) /
            (totalAulas + totalProjetos)) *
            100
        ),
      },
    };
  };
}

// === Sistema de Progresso ===
window.carregarSistemaProgresso = function () {
  const contentArea = document.querySelector(".content-guia");
  const progressoSection = criarSecaoProgresso();

  contentArea.appendChild(progressoSection);

  // Scroll até a nova seção
  progressoSection.scrollIntoView({
    behavior: "smooth",
  });

  // Inicializar componentes da seção
  inicializarDashboardAlunos();
  mostrarNotificacao("✅ Sistema de progresso carregado!", "success");
};

function criarSecaoProgresso() {
  const section = document.createElement("section");
  section.id = "progresso";
  section.className = "content-section";

  section.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-chart-line"></i> Sistema de Acompanhamento de Progresso</h2>
            <p>Dashboard completo para monitorar o desenvolvimento dos alunos</p>
        </div>
        
        <!-- Estatísticas Gerais -->
        <div class="row mb-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <i class="fas fa-users fa-2x text-primary mb-2"></i>
                        <h4 id="totalAlunos">-</h4>
                        <p class="mb-0">Total de Alunos</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <i class="fas fa-chart-line fa-2x text-success mb-2"></i>
                        <h4 id="mediaGeral">-</h4>
                        <p class="mb-0">Média Geral</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <i class="fas fa-clock fa-2x text-info mb-2"></i>
                        <h4 id="tempoMedio">-</h4>
                        <p class="mb-0">Tempo Médio/Aula</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <i class="fas fa-trophy fa-2x text-warning mb-2"></i>
                        <h4 id="taxaAprovacao">-</h4>
                        <p class="mb-0">Taxa de Aprovação</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Dashboard de Alunos -->
        <div class="row">
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-table"></i> Lista de Alunos e Progresso</h5>
                        <div class="card-tools">
                            <button class="btn btn-sm btn-outline-primary" onclick="exportarProgresso()">
                                <i class="fas fa-download"></i> Exportar
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="tabelaAlunos">
                                <thead>
                                    <tr>
                                        <th>Aluno</th>
                                        <th>Progresso Aulas</th>
                                        <th>Progresso Projetos</th>
                                        <th>Participação</th>
                                        <th>Média</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="corpoTabelaAlunos">
                                    <!-- Dados serão inseridos via JavaScript -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-chart-pie"></i> Distribuição de Notas</h5>
                    </div>
                    <div class="card-body">
                        <canvas id="chartDistribuicao" width="300" height="200"></canvas>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-header">
                        <h5><i class="fas fa-exclamation-triangle"></i> Alertas</h5>
                    </div>
                    <div class="card-body" id="alertasContainer">
                        <!-- Alertas serão inseridos via JavaScript -->
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Relatórios -->
        <div class="card mt-4">
            <div class="card-header">
                <h5><i class="fas fa-file-chart"></i> Relatórios Disponíveis</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="d-grid">
                            <button class="btn btn-outline-primary" onclick="gerarRelatorioGeral()">
                                <i class="fas fa-chart-bar"></i><br>
                                Relatório Geral da Turma
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-grid">
                            <button class="btn btn-outline-info" onclick="gerarRelatorioIndividual()">
                                <i class="fas fa-user-chart"></i><br>
                                Relatório Individual
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-grid">
                            <button class="btn btn-outline-success" onclick="gerarRelatorioComparativo()">
                                <i class="fas fa-balance-scale"></i><br>
                                Análise Comparativa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  return section;
}

function inicializarDashboardAlunos() {
  // Calcular estatísticas gerais
  const totalAlunos = dadosAlunos.length;
  const mediaGeral =
    dadosAlunos.reduce((acc, aluno) => acc + aluno.mediaGeral, 0) / totalAlunos;
  const taxaAprovacao =
    (dadosAlunos.filter((aluno) => aluno.mediaGeral >= 7.0).length /
      totalAlunos) *
    100;

  // Atualizar elementos da interface
  document.getElementById("totalAlunos").textContent = totalAlunos;
  document.getElementById("mediaGeral").textContent = mediaGeral.toFixed(1);
  document.getElementById("tempoMedio").textContent = "125 min";
  document.getElementById("taxaAprovacao").textContent =
    Math.round(taxaAprovacao) + "%";

  // Preencher tabela de alunos
  const tbody = document.getElementById("corpoTabelaAlunos");
  tbody.innerHTML = "";

  dadosAlunos.forEach((aluno) => {
    const progresso = obterProgressoAluno(aluno.id);
    const row = criarLinhaAluno(progresso);
    tbody.appendChild(row);
  });

  // Criar gráfico de distribuição
  criarGraficoDistribuicao();

  // Gerar alertas
  gerarAlertas();
}

function criarLinhaAluno(aluno) {
  const tr = document.createElement("tr");
  const status =
    aluno.mediaGeral >= 7.0
      ? "success"
      : aluno.mediaGeral >= 5.0
      ? "warning"
      : "danger";
  const statusTexto =
    aluno.mediaGeral >= 7.0
      ? "Aprovado"
      : aluno.mediaGeral >= 5.0
      ? "Recuperação"
      : "Risco";

  tr.innerHTML = `
        <td>
            <div class="d-flex align-items-center">
                <div class="avatar me-2">
                    <i class="fas fa-user-circle fa-2x text-muted"></i>
                </div>
                <div>
                    <strong>${aluno.nome}</strong><br>
                    <small class="text-muted">${aluno.email}</small>
                </div>
            </div>
        </td>
        <td>
            <div class="progress mb-1">
                <div class="progress-bar bg-info" style="width: ${
                  aluno.progresso.aulas
                }%"></div>
            </div>
            <small>${aluno.progresso.aulas}% completo</small>
        </td>
        <td>
            <div class="progress mb-1">
                <div class="progress-bar bg-warning" style="width: ${
                  aluno.progresso.projetos
                }%"></div>
            </div>
            <small>${aluno.progresso.projetos}% entregue</small>
        </td>
        <td>
            <span class="badge ${
              aluno.participacao >= 80
                ? "bg-success"
                : aluno.participacao >= 60
                ? "bg-warning"
                : "bg-danger"
            }">
                ${aluno.participacao}%
            </span>
        </td>
        <td>
            <strong class="text-${status}">${aluno.mediaGeral.toFixed(
    1
  )}</strong>
        </td>
        <td>
            <span class="badge bg-${status}">${statusTexto}</span>
        </td>
        <td>
            <div class="btn-group-sm">
                <button class="btn btn-outline-primary btn-sm" onclick="verDetalhesAluno(${
                  aluno.id
                })" title="Ver detalhes">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-outline-info btn-sm" onclick="enviarFeedback(${
                  aluno.id
                })" title="Enviar feedback">
                    <i class="fas fa-comment"></i>
                </button>
            </div>
        </td>
    `;

  return tr;
}

function criarGraficoDistribuicao() {
  const ctx = document.getElementById("chartDistribuicao");
  if (!ctx) return;

  // Agrupar alunos por faixa de nota
  const faixas = {
    "A (9.0-10.0)": 0,
    "B (7.0-8.9)": 0,
    "C (5.0-6.9)": 0,
    "D (0.0-4.9)": 0,
  };

  dadosAlunos.forEach((aluno) => {
    if (aluno.mediaGeral >= 9.0) faixas["A (9.0-10.0)"]++;
    else if (aluno.mediaGeral >= 7.0) faixas["B (7.0-8.9)"]++;
    else if (aluno.mediaGeral >= 5.0) faixas["C (5.0-6.9)"]++;
    else faixas["D (0.0-4.9)"]++;
  });

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(faixas),
      datasets: [
        {
          data: Object.values(faixas),
          backgroundColor: ["#28a745", "#007bff", "#ffc107", "#dc3545"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

function gerarAlertas() {
  const container = document.getElementById("alertasContainer");
  if (!container) return;

  container.innerHTML = "";

  // Verificar alunos em risco
  const alunosRisco = dadosAlunos.filter((aluno) => aluno.mediaGeral < 5.0);
  const alunosAtrasados = dadosAlunos.filter(
    (aluno) => aluno.progresso?.aulas < 50
  );

  if (alunosRisco.length > 0) {
    container.innerHTML += `
            <div class="alert alert-danger alert-sm">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>${alunosRisco.length}</strong> aluno(s) em risco de reprovação
            </div>
        `;
  }

  if (alunosAtrasados.length > 0) {
    container.innerHTML += `
            <div class="alert alert-warning alert-sm">
                <i class="fas fa-clock"></i>
                <strong>${alunosAtrasados.length}</strong> aluno(s) com atraso nas aulas
            </div>
        `;
  }

  if (alunosRisco.length === 0 && alunosAtrasados.length === 0) {
    container.innerHTML = `
            <div class="alert alert-success alert-sm">
                <i class="fas fa-check-circle"></i>
                Todos os alunos estão progredindo bem!
            </div>
        `;
  }
}

// === Funções de Ação ===
window.verDetalhesAluno = function (alunoId) {
  const aluno = obterProgressoAluno(alunoId);
  if (!aluno) return;

  // Criar modal com detalhes do aluno
  const modal = criarModalDetalhes(aluno);
  document.body.appendChild(modal);

  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

  modal.addEventListener("hidden.bs.modal", () => {
    modal.remove();
  });
};

function criarModalDetalhes(aluno) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user"></i> Detalhes - ${aluno.nome}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Progresso por Aula</h6>
                            <div class="aulas-progress">
                                ${aluno.aulas
                                  .map(
                                    (aula) => `
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span>Aula ${aula.numero}</span>
                                        <div>
                                            ${
                                              aula.concluida
                                                ? `<span class="badge bg-success">Concluída</span>
                                                 <span class="text-muted">Nota: ${aula.nota}</span>`
                                                : `<span class="badge bg-secondary">Pendente</span>`
                                            }
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h6>Projetos</h6>
                            <div class="projetos-progress">
                                ${aluno.projetos
                                  .map(
                                    (projeto) => `
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span>${projeto.nome}</span>
                                        <div>
                                            ${
                                              projeto.entregue
                                                ? `<span class="badge bg-success">Entregue</span>
                                                 <span class="text-muted">Nota: ${projeto.nota}</span>`
                                                : `<span class="badge bg-warning">Pendente</span>`
                                            }
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="enviarFeedback(${
                      aluno.id
                    })">
                        <i class="fas fa-comment"></i> Enviar Feedback
                    </button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    `;

  return modal;
}

// === Relatórios ===
window.gerarRelatorioGeral = function () {
  mostrarNotificacao("📊 Gerando relatório geral da turma...", "info");
  setTimeout(() => {
    mostrarNotificacao("✅ Relatório gerado com sucesso!", "success");
  }, 2000);
};

window.exportarProgresso = function () {
  mostrarNotificacao("📤 Exportando dados de progresso...", "info");
  setTimeout(() => {
    mostrarNotificacao("✅ Dados exportados para CSV!", "success");
  }, 1500);
};

// === Eventos ===
function inicializarEventos() {
  // Adicionar estilos CSS dinamicamente
  const style = document.createElement("style");
  style.textContent = `
        .stat-card {
            transition: transform 0.2s;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .alert-sm {
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.5rem;
        }
        
        .btn-group-sm .btn {
            margin-right: 0.25rem;
        }
        
        .nivel-1 { background-color: #ffe6e6; }
        .nivel-2 { background-color: #fff4e6; }
        .nivel-3 { background-color: #e6f3ff; }
        .nivel-4 { background-color: #e6ffe6; }
        
        .rubrica-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        .tipo-avaliacao-card {
            height: 100%;
            border: none;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .formativa .card-header { background: linear-gradient(135deg, #28a745, #20c997); }
        .somativa .card-header { background: linear-gradient(135deg, #007bff, #6610f2); }
        .diagnostica .card-header { background: linear-gradient(135deg, #ffc107, #fd7e14); }
        .adaptativa .card-header { background: linear-gradient(135deg, #6f42c1, #e83e8c); }
        
        .badge-formativa { background: #28a745; }
        .badge-somativa { background: #007bff; }
        .badge-diagnostica { background: #ffc107; color: #000; }
        .badge-adaptativa { background: #6f42c1; }
    `;
  document.head.appendChild(style);
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

  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 1060;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  }, 4000);

  notification.querySelector(".btn-close").addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  });
}

// === Debug ===
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  window.avaliacaoDebug = {
    dadosAlunos,
    calcularNotaFinal,
    obterProgressoAluno,
    gerarRelatorioGeral,
  };
  console.log("🔧 Sistema de Avaliação Debug ativado.");
}
