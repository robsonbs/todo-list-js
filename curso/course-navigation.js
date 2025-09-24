/**
 * SISTEMA DE NAVEGAÇÃO ENTRE AULAS
 * 
 * Este script adiciona navegação automática entre aulas do curso.
 * Inclua este arquivo em qualquer aula para ter navegação completa.
 */

class CourseNavigation {
    constructor() {
        this.lessons = [
            { number: 1, title: 'Fundamentos do JavaScript', path: '../aula-01/' },
            { number: 2, title: 'Estruturas de Controle', path: '../aula-02/' },
            { number: 3, title: 'Funções', path: '../aula-03/' },
            { number: 4, title: 'Arrays e Objetos', path: '../aula-04/' },
            { number: 5, title: 'DOM e Eventos', path: '../aula-05/' },
            { number: 6, title: 'Programação Assíncrona', path: '../aula-06/' },
            { number: 7, title: 'APIs e AJAX', path: '../aula-07/' },
            { number: 8, title: 'DOM Avançado', path: '../aula-08/' },
            { number: 9, title: 'Web APIs Modernas', path: '../aula-09/' }
        ];
        
        this.currentLesson = this.detectCurrentLesson();
        this.init();
    }
    
    detectCurrentLesson() {
        const path = window.location.pathname;
        const match = path.match(/aula-(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }
    
    init() {
        this.addNavigationStyles();
        this.createNavigationBar();
        this.createLessonProgress();
    }
    
    addNavigationStyles() {
        const styles = `
            <style>
                .course-navigation {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    color: white;
                    padding: 0.75rem 1rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                }
                
                .nav-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }
                
                .nav-lesson-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .nav-lesson-number {
                    background: white;
                    color: #6366f1;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.9rem;
                }
                
                .nav-lesson-title {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0;
                }
                
                .nav-controls {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .nav-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .nav-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    color: white;
                    text-decoration: none;
                    transform: translateY(-1px);
                }
                
                .nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .nav-btn:disabled:hover {
                    transform: none;
                }
                
                .nav-progress {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    transition: width 0.5s ease;
                }
                
                .body-with-nav {
                    padding-top: 70px;
                }
                
                .lesson-selector {
                    position: relative;
                    display: inline-block;
                }
                
                .lesson-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 0.5rem 0;
                    min-width: 250px;
                    max-height: 400px;
                    overflow-y: auto;
                    display: none;
                    z-index: 1001;
                }
                
                .lesson-dropdown.show {
                    display: block;
                    animation: fadeIn 0.3s ease;
                }
                
                .lesson-item {
                    padding: 0.75rem 1rem;
                    color: #374151;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: background 0.2s ease;
                }
                
                .lesson-item:hover {
                    background: #f3f4f6;
                    color: #374151;
                    text-decoration: none;
                }
                
                .lesson-item.current {
                    background: #e0e7ff;
                    color: #6366f1;
                    font-weight: 600;
                }
                
                .lesson-item-number {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background: #e5e7eb;
                    color: #6b7280;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: bold;
                }
                
                .lesson-item.current .lesson-item-number {
                    background: #6366f1;
                    color: white;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Responsividade */
                @media (max-width: 768px) {
                    .nav-content {
                        flex-direction: column;
                        gap: 0.5rem;
                        align-items: stretch;
                    }
                    
                    .nav-lesson-info {
                        justify-content: center;
                    }
                    
                    .nav-controls {
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                    
                    .nav-lesson-title {
                        font-size: 0.9rem;
                    }
                    
                    .nav-btn {
                        font-size: 0.8rem;
                        padding: 0.4rem 0.8rem;
                    }
                    
                    .body-with-nav {
                        padding-top: 90px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    createNavigationBar() {
        const currentLessonData = this.lessons.find(l => l.number === this.currentLesson);
        const previousLesson = this.lessons.find(l => l.number === this.currentLesson - 1);
        const nextLesson = this.lessons.find(l => l.number === this.currentLesson + 1);
        
        const progressPercentage = (this.currentLesson / this.lessons.length) * 100;
        
        const navigationHTML = `
            <div class="course-navigation">
                <div class="nav-content">
                    <div class="nav-lesson-info">
                        <div class="nav-lesson-number">${this.currentLesson}</div>
                        <h1 class="nav-lesson-title">${currentLessonData ? currentLessonData.title : 'Curso JavaScript'}</h1>
                    </div>
                    
                    <div class="nav-controls">
                        ${previousLesson ? 
                            `<a href="${previousLesson.path}" class="nav-btn">
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </a>` : 
                            `<span class="nav-btn" style="opacity: 0.5;">
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </span>`
                        }
                        
                        <div class="lesson-selector">
                            <button class="nav-btn" onclick="courseNav.toggleLessonDropdown()">
                                <i class="fas fa-list"></i>
                                Aulas
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="lesson-dropdown" id="lesson-dropdown">
                                ${this.lessons.map(lesson => `
                                    <a href="${lesson.path}" class="lesson-item ${lesson.number === this.currentLesson ? 'current' : ''}">
                                        <div class="lesson-item-number">${lesson.number}</div>
                                        <div>
                                            <div>${lesson.title}</div>
                                        </div>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        
                        <a href="../" class="nav-btn">
                            <i class="fas fa-home"></i>
                            Início
                        </a>
                        
                        ${nextLesson ? 
                            `<a href="${nextLesson.path}" class="nav-btn">
                                Próxima
                                <i class="fas fa-chevron-right"></i>
                            </a>` : 
                            `<span class="nav-btn" style="opacity: 0.5;">
                                Próxima
                                <i class="fas fa-chevron-right"></i>
                            </span>`
                        }
                    </div>
                </div>
                <div class="nav-progress" style="width: ${progressPercentage}%"></div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', navigationHTML);
        document.body.classList.add('body-with-nav');
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lesson-selector')) {
                document.getElementById('lesson-dropdown').classList.remove('show');
            }
        });
    }
    
    toggleLessonDropdown() {
        const dropdown = document.getElementById('lesson-dropdown');
        dropdown.classList.toggle('show');
    }
    
    createLessonProgress() {
        // Salvar progresso da aula atual
        this.markLessonAsVisited(this.currentLesson);
    }
    
    markLessonAsVisited(lessonNumber) {
        let visitedLessons = JSON.parse(localStorage.getItem('visitedLessons')) || [];
        if (!visitedLessons.includes(lessonNumber)) {
            visitedLessons.push(lessonNumber);
            localStorage.setItem('visitedLessons', JSON.stringify(visitedLessons));
        }
    }
    
    getVisitedLessons() {
        return JSON.parse(localStorage.getItem('visitedLessons')) || [];
    }
}

// Inicializar navegação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.courseNav = new CourseNavigation();
});

// Função global para alternar dropdown (chamada pelo HTML)
function toggleLessonDropdown() {
    if (window.courseNav) {
        window.courseNav.toggleLessonDropdown();
    }
}