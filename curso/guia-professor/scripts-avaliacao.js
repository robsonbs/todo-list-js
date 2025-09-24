/**
 * Sistema de Avaliação - Scripts
 * Funcionalidades para acompanhamento e avaliação de alunos
 */

// === Dados Simulados ===
let students = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    class: "turma-a",
    progress: 85,
    totalGrade: 8.5,
    lessons: {
      1: {
        completed: true,
        grade: 9.0,
        feedback: "Excelente compreensão dos conceitos básicos",
      },
      2: {
        completed: true,
        grade: 8.5,
        feedback: "Boa manipulação de variáveis",
      },
      3: { completed: true, grade: 8.0, feedback: "Funções bem implementadas" },
      4: { completed: true, grade: 8.8, feedback: "Domina arrays e métodos" },
      5: { completed: false, grade: null, feedback: null },
    },
    competencies: {
      syntax: 4,
      logic: 3,
      problemSolving: 4,
      debugging: 3,
    },
    lastActivity: "2025-09-20",
    joinDate: "2025-08-15",
  },
  {
    id: 2,
    name: "Bruno Santos",
    email: "bruno.santos@email.com",
    class: "turma-a",
    progress: 60,
    totalGrade: 7.2,
    lessons: {
      1: {
        completed: true,
        grade: 7.0,
        feedback: "Bom início, precisa praticar mais",
      },
      2: { completed: true, grade: 7.5, feedback: "Melhorando com variáveis" },
      3: {
        completed: true,
        grade: 7.0,
        feedback: "Dificuldade com funções complexas",
      },
      4: { completed: false, grade: null, feedback: null },
    },
    competencies: {
      syntax: 3,
      logic: 2,
      problemSolving: 3,
      debugging: 2,
    },
    lastActivity: "2025-09-18",
    joinDate: "2025-08-15",
  },
  {
    id: 3,
    name: "Carla Oliveira",
    email: "carla.oliveira@email.com",
    class: "turma-b",
    progress: 92,
    totalGrade: 9.1,
    lessons: {
      1: { completed: true, grade: 9.5, feedback: "Excepcional!" },
      2: {
        completed: true,
        grade: 9.0,
        feedback: "Domina variáveis perfeitamente",
      },
      3: {
        completed: true,
        grade: 9.2,
        feedback: "Funções avançadas implementadas",
      },
      4: {
        completed: true,
        grade: 9.0,
        feedback: "Arrays complexos dominados",
      },
      5: { completed: true, grade: 8.8, feedback: "Objetos bem estruturados" },
    },
    competencies: {
      syntax: 4,
      logic: 4,
      problemSolving: 4,
      debugging: 4,
    },
    lastActivity: "2025-09-21",
    joinDate: "2025-08-10",
  },
];

let charts = {};
let currentStudentId = null;

// === Inicialização ===
document.addEventListener("DOMContentLoaded", function () {
  console.log("📊 Sistema de Avaliação carregado!");

  // Inicializar componentes
  initializeDashboard();
  initializeStudents();
  initializeCharts();
  initializeFeedbackForm();

  // Configurar eventos
  setupEventListeners();

  // Atualizar métricas
  updateMetrics();
});

// === Dashboard ===
function initializeDashboard() {
  updateTopPerformers();
  updateRecentActivities();
  updateProgressChart();
}

function updateMetrics() {
  const totalStudents = students.length;
  const averageProgress = Math.round(
    students.reduce((sum, s) => sum + s.progress, 0) / totalStudents
  );
  const completionRate = Math.round(
    (students.filter((s) => s.progress >= 80).length / totalStudents) * 100
  );
  const averageGrade = (
    students.reduce((sum, s) => sum + s.totalGrade, 0) / totalStudents
  ).toFixed(1);

  document.getElementById("totalStudents").textContent = totalStudents;
  document.getElementById("averageProgress").textContent =
    averageProgress + "%";
  document.getElementById("completionRate").textContent = completionRate + "%";
  document.getElementById("averageGrade").textContent = averageGrade;
}

function updateTopPerformers() {
  const topStudents = [...students]
    .sort((a, b) => b.totalGrade - a.totalGrade)
    .slice(0, 5);

  const container = document.getElementById("topPerformers");
  container.innerHTML = topStudents
    .map(
      (student, index) => `
        <div class="d-flex align-items-center mb-2 p-2 border rounded">
            <div class="me-2">
                <span class="badge bg-${
                  index === 0
                    ? "warning"
                    : index === 1
                    ? "secondary"
                    : index === 2
                    ? "warning"
                    : "primary"
                }">
                    ${index + 1}º
                </span>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold">${student.name}</div>
                <small class="text-muted">${student.totalGrade}/10</small>
            </div>
            <div class="progress-ring">
                ${createProgressRing(student.progress)}
            </div>
        </div>
    `
    )
    .join("");
}

function updateRecentActivities() {
  const recentActivities = [
    {
      student: "Ana Silva",
      action: "Completou Aula 4",
      time: "2 horas atrás",
      type: "success",
    },
    {
      student: "Bruno Santos",
      action: "Entregou exercício",
      time: "4 horas atrás",
      type: "info",
    },
    {
      student: "Carla Oliveira",
      action: "Iniciou Aula 5",
      time: "1 dia atrás",
      type: "primary",
    },
    {
      student: "Diego Costa",
      action: "Fez pergunta no fórum",
      time: "2 dias atrás",
      type: "warning",
    },
  ];

  const container = document.getElementById("recentActivities");
  container.innerHTML = recentActivities
    .map(
      (activity) => `
        <div class="d-flex align-items-center mb-2 p-2 border rounded">
            <div class="me-2">
                <i class="fas fa-circle text-${activity.type}"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold">${activity.student}</div>
                <div class="small text-muted">${activity.action}</div>
            </div>
            <div class="small text-muted">${activity.time}</div>
        </div>
    `
    )
    .join("");
}

// === Estudantes ===
function initializeStudents() {
  renderStudentsGrid();
  populateStudentSelect();
}

function renderStudentsGrid() {
  const container = document.getElementById("studentsGrid");
  container.innerHTML = students
    .map((student) => createStudentCard(student))
    .join("");
}

function createStudentCard(student) {
  const completedLessons = Object.values(student.lessons).filter(
    (l) => l.completed
  ).length;
  const totalLessons = 9;

  return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card student-card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">${student.name}</h6>
                    <span class="badge bg-primary">${student.class.toUpperCase()}</span>
                </div>
                <div class="card-body">
                    <div class="row align-items-center mb-3">
                        <div class="col-8">
                            <div class="text-muted small">Progresso Geral</div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" style="width: ${
                                  student.progress
                                }%"></div>
                            </div>
                            <div class="small text-muted">${
                              student.progress
                            }% completo</div>
                        </div>
                        <div class="col-4 text-center">
                            <div class="metric-value" style="font-size: 1.5rem;">${
                              student.totalGrade
                            }</div>
                            <div class="small text-muted">Nota</div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="text-muted small">Aulas Concluídas</div>
                        <div class="fw-bold">${completedLessons}/${totalLessons}</div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="text-muted small">Competências</div>
                        <div class="row text-center">
                            <div class="col-3">
                                <div class="small fw-bold">${
                                  student.competencies.syntax
                                }/4</div>
                                <div class="tiny text-muted">Sint.</div>
                            </div>
                            <div class="col-3">
                                <div class="small fw-bold">${
                                  student.competencies.logic
                                }/4</div>
                                <div class="tiny text-muted">Lóg.</div>
                            </div>
                            <div class="col-3">
                                <div class="small fw-bold">${
                                  student.competencies.problemSolving
                                }/4</div>
                                <div class="tiny text-muted">Prob.</div>
                            </div>
                            <div class="col-3">
                                <div class="small fw-bold">${
                                  student.competencies.debugging
                                }/4</div>
                                <div class="tiny text-muted">Debug</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-muted small">
                        <i class="fas fa-clock"></i> Última atividade: ${formatDate(
                          student.lastActivity
                        )}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2 d-md-flex">
                        <button class="btn btn-primary btn-sm flex-fill" onclick="viewStudentDetails(${
                          student.id
                        })">
                            <i class="fas fa-eye"></i> Detalhes
                        </button>
                        <button class="btn btn-outline-primary btn-sm flex-fill" onclick="giveFeedback(${
                          student.id
                        })">
                            <i class="fas fa-comment"></i> Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function populateStudentSelect() {
  const select = document.getElementById("studentSelect");
  select.innerHTML =
    '<option value="">Escolher aluno...</option>' +
    students
      .map(
        (student) => `<option value="${student.id}">${student.name}</option>`
      )
      .join("");
}

// === Gráficos ===
function initializeCharts() {
  createProgressChart();
  createGradesChart();
  createCompetenciesChart();
  createTimelineChart();
}

function createProgressChart() {
  const ctx = document.getElementById("progressChart");
  if (!ctx) return;

  const lessons = [
    "Aula 1",
    "Aula 2",
    "Aula 3",
    "Aula 4",
    "Aula 5",
    "Aula 6",
    "Aula 7",
    "Aula 8",
    "Aula 9",
  ];
  const completionData = lessons.map((_, index) => {
    const lessonNumber = index + 1;
    const completed = students.filter(
      (s) => s.lessons[lessonNumber]?.completed
    ).length;
    return Math.round((completed / students.length) * 100);
  });

  charts.progress = new Chart(ctx, {
    type: "line",
    data: {
      labels: lessons,
      datasets: [
        {
          label: "Taxa de Conclusão (%)",
          data: completionData,
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.1)",
          tension: 0.4,
          fill: true,
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
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

function createGradesChart() {
  const ctx = document.getElementById("gradesChart");
  if (!ctx) return;

  const gradeRanges = [
    { range: "9.0-10.0", count: 0, color: "#28a745" },
    { range: "8.0-8.9", count: 0, color: "#17a2b8" },
    { range: "7.0-7.9", count: 0, color: "#ffc107" },
    { range: "6.0-6.9", count: 0, color: "#fd7e14" },
    { range: "0.0-5.9", count: 0, color: "#dc3545" },
  ];

  students.forEach((student) => {
    const grade = student.totalGrade;
    if (grade >= 9.0) gradeRanges[0].count++;
    else if (grade >= 8.0) gradeRanges[1].count++;
    else if (grade >= 7.0) gradeRanges[2].count++;
    else if (grade >= 6.0) gradeRanges[3].count++;
    else gradeRanges[4].count++;
  });

  charts.grades = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: gradeRanges.map((r) => r.range),
      datasets: [
        {
          data: gradeRanges.map((r) => r.count),
          backgroundColor: gradeRanges.map((r) => r.color),
          borderWidth: 0,
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

function createCompetenciesChart() {
  const ctx = document.getElementById("competenciesChart");
  if (!ctx) return;

  const competencies = ["Sintaxe", "Lógica", "Resolução", "Debug"];
  const averages = competencies.map((_, index) => {
    const key = ["syntax", "logic", "problemSolving", "debugging"][index];
    return (
      students.reduce((sum, s) => sum + s.competencies[key], 0) /
      students.length
    ).toFixed(1);
  });

  charts.competencies = new Chart(ctx, {
    type: "bar",
    data: {
      labels: competencies,
      datasets: [
        {
          label: "Média da Turma",
          data: averages,
          backgroundColor: [
            "rgba(0, 123, 255, 0.8)",
            "rgba(40, 167, 69, 0.8)",
            "rgba(255, 193, 7, 0.8)",
            "rgba(220, 53, 69, 0.8)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}

function createTimelineChart() {
  const ctx = document.getElementById("timelineChart");
  if (!ctx) return;

  // Dados simulados de evolução temporal
  const weeks = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
  const averageGrades = [6.5, 7.0, 7.3, 7.8, 8.1, 8.2];

  charts.timeline = new Chart(ctx, {
    type: "line",
    data: {
      labels: weeks,
      datasets: [
        {
          label: "Evolução da Nota Média",
          data: averageGrades,
          borderColor: "#28a745",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          tension: 0.4,
          fill: true,
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
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    },
  });
}

// === Feedback ===
function initializeFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", handleFeedbackSubmit);
  }
}

function handleFeedbackSubmit(e) {
  e.preventDefault();

  const formData = {
    studentId: document.getElementById("studentSelect").value,
    lesson: document.getElementById("lessonSelect").value,
    ratings: {
      syntax: parseInt(document.getElementById("syntaxRating").value),
      logic: parseInt(document.getElementById("logicRating").value),
      problemSolving: parseInt(
        document.getElementById("problemSolvingRating").value
      ),
    },
    feedback: document.getElementById("feedbackText").value,
    suggestions: document.getElementById("improvementSuggestions").value,
  };

  // Simular salvamento
  console.log("Feedback salvo:", formData);

  // Mostrar confirmação
  showNotification("Feedback salvo com sucesso!", "success");

  // Limpar formulário
  clearFeedbackForm();

  // Atualizar dados do aluno
  updateStudentData(formData);
}

function updateStudentData(feedbackData) {
  const student = students.find((s) => s.id == feedbackData.studentId);
  if (student) {
    // Atualizar competências
    Object.keys(feedbackData.ratings).forEach((key) => {
      student.competencies[key] = feedbackData.ratings[key];
    });

    // Atualizar dados da aula
    if (!student.lessons[feedbackData.lesson]) {
      student.lessons[feedbackData.lesson] = {};
    }
    student.lessons[feedbackData.lesson].feedback = feedbackData.feedback;

    // Recalcular métricas
    updateMetrics();
    renderStudentsGrid();
  }
}

// === Funções de Ação ===
function viewStudentDetails(studentId) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return;

  currentStudentId = studentId;

  const modalBody = document.getElementById("studentModalBody");
  modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Informações Pessoais</h6>
                <p><strong>Nome:</strong> ${student.name}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Turma:</strong> ${student.class.toUpperCase()}</p>
                <p><strong>Data de Ingresso:</strong> ${formatDate(
                  student.joinDate
                )}</p>
                <p><strong>Última Atividade:</strong> ${formatDate(
                  student.lastActivity
                )}</p>
            </div>
            <div class="col-md-6">
                <h6>Desempenho</h6>
                <p><strong>Progresso Geral:</strong> ${student.progress}%</p>
                <p><strong>Nota Média:</strong> ${student.totalGrade}/10</p>
                <div class="progress mb-2">
                    <div class="progress-bar" style="width: ${
                      student.progress
                    }%"></div>
                </div>
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-12">
                <h6>Competências</h6>
                ${Object.entries(student.competencies)
                  .map(
                    ([key, value]) => `
                    <div class="mb-2">
                        <div class="d-flex justify-content-between">
                            <span class="capitalize">${key}</span>
                            <span>${value}/4</span>
                        </div>
                        <div class="competency-meter">
                            <div class="competency-fill bg-primary" style="width: ${
                              (value / 4) * 100
                            }%"></div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-12">
                <h6>Progresso por Aula</h6>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Aula</th>
                                <th>Status</th>
                                <th>Nota</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(student.lessons)
                              .map(
                                ([lessonNum, lesson]) => `
                                <tr>
                                    <td>Aula ${lessonNum}</td>
                                    <td>
                                        <span class="badge bg-${
                                          lesson.completed
                                            ? "success"
                                            : "warning"
                                        }">
                                            ${
                                              lesson.completed
                                                ? "Concluída"
                                                : "Em andamento"
                                            }
                                        </span>
                                    </td>
                                    <td>${lesson.grade || "-"}</td>
                                    <td>${lesson.feedback || "-"}</td>
                                </tr>
                            `
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

  const modal = new bootstrap.Modal(document.getElementById("studentModal"));
  modal.show();
}

function giveFeedback(studentId) {
  document.getElementById("studentSelect").value = studentId;

  // Mudar para a aba de feedback
  const feedbackTab = new bootstrap.Tab(
    document.getElementById("feedback-tab")
  );
  feedbackTab.show();

  showNotification(
    "Formulário de feedback preparado para o aluno selecionado.",
    "info"
  );
}

function addNewStudent() {
  // Simular adição de novo aluno
  const newStudent = {
    id: students.length + 1,
    name: `Novo Aluno ${students.length + 1}`,
    email: `aluno${students.length + 1}@email.com`,
    class: "turma-a",
    progress: 0,
    totalGrade: 0,
    lessons: {},
    competencies: {
      syntax: 1,
      logic: 1,
      problemSolving: 1,
      debugging: 1,
    },
    lastActivity: new Date().toISOString().split("T")[0],
    joinDate: new Date().toISOString().split("T")[0],
  };

  students.push(newStudent);
  renderStudentsGrid();
  populateStudentSelect();
  updateMetrics();

  showNotification("Novo aluno adicionado com sucesso!", "success");
}

function clearFeedbackForm() {
  document.getElementById("feedbackForm").reset();
}

function downloadRubrics() {
  showNotification("Baixando rubricas de avaliação...", "info");
  // Simular download
  setTimeout(() => {
    showNotification("Rubricas baixadas com sucesso!", "success");
  }, 1500);
}

function customizeRubrics() {
  showNotification(
    "Funcionalidade de personalização em desenvolvimento.",
    "warning"
  );
}

function saveStudentChanges() {
  showNotification("Alterações salvas com sucesso!", "success");
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("studentModal")
  );
  modal.hide();
}

// === Utilitários ===
function createProgressRing(percentage) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return `
        <svg class="progress-ring" width="40" height="40">
            <circle
                class="progress-ring-circle"
                stroke="#007bff"
                stroke-width="3"
                fill="transparent"
                r="${radius}"
                cx="20"
                cy="20"
                stroke-dasharray="${strokeDasharray}"
            />
            <text x="20" y="25" text-anchor="middle" font-size="10" fill="#007bff">${percentage}%</text>
        </svg>
    `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} notification-toast`;
  notification.innerHTML = `
        <strong>${message}</strong>
        <button type="button" class="btn-close" aria-label="Close"></button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 1060;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border: none;
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

function setupEventListeners() {
  // Busca de alunos
  const searchInput = document.getElementById("studentSearch");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterStudents, 300));
  }

  // Filtro de turma
  const classFilter = document.getElementById("classFilter");
  if (classFilter) {
    classFilter.addEventListener("change", filterStudents);
  }
}

function filterStudents() {
  const searchTerm = document
    .getElementById("studentSearch")
    .value.toLowerCase();
  const classFilter = document.getElementById("classFilter").value;

  let filteredStudents = students;

  if (searchTerm) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
  }

  if (classFilter) {
    filteredStudents = filteredStudents.filter(
      (student) => student.class === classFilter
    );
  }

  const container = document.getElementById("studentsGrid");
  container.innerHTML = filteredStudents
    .map((student) => createStudentCard(student))
    .join("");
}

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

// === Animações ===
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
    
    .capitalize {
        text-transform: capitalize;
    }
    
    .tiny {
        font-size: 0.75rem;
    }
`;
document.head.appendChild(style);

// === Debug ===
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  window.evaluationDebug = {
    students,
    charts,
    showNotification,
    updateMetrics,
    renderStudentsGrid,
  };
  console.log(
    "🔧 Modo debug ativado. Use window.evaluationDebug para acessar dados."
  );
}
