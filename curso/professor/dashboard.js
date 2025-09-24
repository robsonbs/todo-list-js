/**
 * DASHBOARD DO PROFESSOR - SISTEMA DE GESTÃO
 * 
 * Sistema completo de acompanhamento de estudantes e análise de progresso
 */

class TeacherDashboard {
    constructor() {
        this.currentSection = 'overview';
        this.charts = {};
        this.mockData = this.generateMockData();
        
        this.init();
    }
    
    init() {
        this.setupCharts();
        this.updateStatistics();
        this.startRealTimeUpdates();
    }
    
    generateMockData() {
        // Dados simulados para demonstração
        return {
            students: [
                {
                    id: 1,
                    name: "Maria João Santos",
                    email: "maria@email.com",
                    completedLessons: 8,
                    totalLessons: 9,
                    completedExercises: 12,
                    totalExercises: 15,
                    avgScore: 89,
                    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
                    currentLesson: "Aula 9: Web APIs Modernas"
                },
                {
                    id: 2,
                    name: "Pedro Silva Costa",
                    email: "pedro@email.com",
                    completedLessons: 6,
                    totalLessons: 9,
                    completedExercises: 8,
                    totalExercises: 15,
                    avgScore: 67,
                    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
                    currentLesson: "Aula 7: APIs e AJAX"
                },
                {
                    id: 3,
                    name: "Ana Luiza Ferreira",
                    email: "ana@email.com",
                    completedLessons: 4,
                    totalLessons: 9,
                    completedExercises: 5,
                    totalExercises: 15,
                    avgScore: 44,
                    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
                    currentLesson: "Aula 5: DOM e Eventos"
                }
            ],
            lessons: [
                { number: 1, title: "Fundamentos", completionRate: 95, avgTime: 135, difficulty: "Baixa" },
                { number: 2, title: "Estruturas de Controle", completionRate: 88, avgTime: 165, difficulty: "Média" },
                { number: 3, title: "Funções", completionRate: 82, avgTime: 190, difficulty: "Média" },
                { number: 4, title: "Arrays e Objetos", completionRate: 78, avgTime: 210, difficulty: "Média" },
                { number: 5, title: "DOM e Eventos", completionRate: 75, avgTime: 180, difficulty: "Média" },
                { number: 6, title: "Programação Assíncrona", completionRate: 65, avgTime: 240, difficulty: "Alta" },
                { number: 7, title: "APIs e AJAX", completionRate: 58, avgTime: 220, difficulty: "Alta" },
                { number: 8, title: "DOM Avançado", completionRate: 42, avgTime: 280, difficulty: "Alta" },
                { number: 9, title: "Web APIs Modernas", completionRate: 25, avgTime: 300, difficulty: "Alta" }
            ],
            exercises: [
                { name: "Calculadora Básica", completionRate: 92, avgScore: 85 },
                { name: "Verificador de Idade", completionRate: 88, avgScore: 82 },
                { name: "Contador de Pares", completionRate: 75, avgScore: 78 },
                { name: "Tabuada Customizada", completionRate: 70, avgScore: 75 },
                { name: "Calculadora de IMC", completionRate: 68, avgScore: 73 },
                { name: "Gerenciador de Estudantes", completionRate: 55, avgScore: 68 },
                { name: "Contador Interativo", completionRate: 48, avgScore: 65 },
                { name: "Sistema de Promessas", completionRate: 35, avgScore: 60 },
                { name: "Simulador de API", completionRate: 28, avgScore: 58 },
                { name: "Observer Pattern", completionRate: 22, avgScore: 55 }
            ]
        };
    }
    
    setupCharts() {
        this.setupLessonsChart();
        this.setupExercisesChart();
        this.setupExercisePerformanceChart();
    }
    
    setupLessonsChart() {
        const ctx = document.getElementById('lessonsChart');
        if (!ctx) return;
        
        this.charts.lessons = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.mockData.lessons.map(l => `Aula ${l.number}`),
                datasets: [{
                    label: 'Taxa de Conclusão (%)',
                    data: this.mockData.lessons.map(l => l.completionRate),
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    setupExercisesChart() {
        const ctx = document.getElementById('exercisesChart');
        if (!ctx) return;
        
        const completedCount = this.mockData.exercises.filter(e => e.completionRate > 50).length;
        const partialCount = this.mockData.exercises.filter(e => e.completionRate > 20 && e.completionRate <= 50).length;
        const notStartedCount = this.mockData.exercises.filter(e => e.completionRate <= 20).length;
        
        this.charts.exercises = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Concluídos', 'Em Progresso', 'Não Iniciados'],
                datasets: [{
                    data: [completedCount, partialCount, notStartedCount],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    setupExercisePerformanceChart() {
        const ctx = document.getElementById('exercisePerformanceChart');
        if (!ctx) return;
        
        this.charts.exercisePerformance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.mockData.exercises.map(e => e.name.substring(0, 15) + '...'),
                datasets: [
                    {
                        label: 'Taxa de Conclusão (%)',
                        data: this.mockData.exercises.map(e => e.completionRate),
                        borderColor: 'rgba(99, 102, 241, 1)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Pontuação Média',
                        data: this.mockData.exercises.map(e => e.avgScore),
                        borderColor: 'rgba(16, 185, 129, 1)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Exercícios'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Taxa de Conclusão (%)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Pontuação Média'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }
    
    updateStatistics() {
        // Atualizar estatísticas em tempo real
        const totalStudents = this.mockData.students.length;
        const avgCompletion = this.mockData.students.reduce((acc, s) => 
            acc + (s.completedLessons / s.totalLessons), 0) / totalStudents * 100;
        
        // Simular atualizações (normalmente viria de uma API)
        this.animateNumber('.stat-number', totalStudents, 24);
    }
    
    animateNumber(selector, endValue, displayValue) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        let startValue = 0;
        const duration = 1000;
        const increment = displayValue / (duration / 16);
        
        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= displayValue) {
                element.textContent = displayValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(startValue);
            }
        }, 16);
    }
    
    startRealTimeUpdates() {
        // Simular atualizações em tempo real
        setInterval(() => {
            this.updateRecentActivity();
        }, 30000); // Atualizar a cada 30 segundos
    }
    
    updateRecentActivity() {
        // Simular nova atividade
        const activities = [
            "Concluiu exercício: Calculadora Básica",
            "Iniciou Aula 4: Arrays e Objetos",
            "Completou Aula 2: Estruturas de Controle",
            "Enviou pergunta no fórum",
            "Alcançou 80% de progresso"
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        console.log("Nova atividade:", randomActivity);
    }
    
    exportStudentReport(studentId) {
        const student = this.mockData.students.find(s => s.id === studentId);
        if (!student) return;
        
        const report = {
            student: student.name,
            progress: `${student.completedLessons}/${student.totalLessons} aulas`,
            exercises: `${student.completedExercises}/${student.totalExercises} exercícios`,
            averageScore: `${student.avgScore}%`,
            lastActivity: student.lastActivity.toLocaleDateString('pt-BR'),
            recommendations: this.generateRecommendations(student)
        };
        
        // Converter para CSV ou PDF (simulado)
        console.log("Relatório gerado:", report);
        
        // Simular download
        const blob = new Blob([JSON.stringify(report, null, 2)], 
            { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${student.name.replace(/\s+/g, '_')}.json`;
        a.click();
    }
    
    generateRecommendations(student) {
        const recommendations = [];
        
        if (student.avgScore < 70) {
            recommendations.push("Revisar conceitos fundamentais");
            recommendations.push("Praticar mais exercícios básicos");
        }
        
        if (student.completedLessons < 5) {
            recommendations.push("Focar na progressão das aulas");
        }
        
        if (student.completedExercises < 8) {
            recommendations.push("Completar exercícios pendentes");
        }
        
        return recommendations;
    }
}

// Funções globais para navegação
function showSection(sectionName) {
    // Esconder todas as seções
    document.querySelectorAll('[id$="-section"]').forEach(section => {
        section.classList.add('section-hidden');
        section.classList.remove('section-active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('section-active');
        targetSection.classList.remove('section-hidden');
    }
    
    // Atualizar menu ativo
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

// Função para gerar relatório de estudante
function generateStudentReport(studentId) {
    if (window.dashboard) {
        window.dashboard.exportStudentReport(studentId);
    }
}

// Inicializar dashboard quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.dashboard = new TeacherDashboard();
    
    // Configurar tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});