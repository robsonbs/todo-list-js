/**
 * SISTEMA DE EXERCÍCIOS INTERATIVO
 * 
 * Gerencia a interface e execução dos exercícios
 */

class ExerciseSystem {
    constructor() {
        this.exercises = window.exercisesData || [];
        this.currentExercise = null;
        this.editor = null;
        this.completedExercises = this.getCompletedExercises();
        
        this.init();
    }
    
    init() {
        this.setupCodeEditor();
        this.renderExerciseGrid();
        this.updateProgress();
    }
    
    setupCodeEditor() {
        const textarea = document.getElementById('code-editor');
        if (textarea && typeof CodeMirror !== 'undefined') {
            this.editor = CodeMirror.fromTextArea(textarea, {
                mode: 'javascript',
                theme: 'monokai',
                lineNumbers: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                indentUnit: 4,
                lineWrapping: true,
                fontSize: '14px'
            });
        }
    }
    
    renderExerciseGrid() {
        const grid = document.getElementById('exercise-grid');
        if (!grid) return;
        
        grid.innerHTML = this.exercises.map(exercise => `
            <div class="exercise-card ${this.completedExercises.includes(exercise.id) ? 'completed' : ''}" 
                 onclick="exerciseSystem.selectExercise(${exercise.id})">
                <div class="exercise-difficulty difficulty-${exercise.difficulty}">
                    ${exercise.difficulty.toUpperCase()}
                </div>
                <h6>${exercise.title}</h6>
                <p class="mb-2">${exercise.description}</p>
                <small class="text-muted">Aula ${exercise.lesson}</small>
                ${this.completedExercises.includes(exercise.id) ? 
                    '<div class="mt-2"><i class="fas fa-check-circle text-success"></i> Concluído</div>' : 
                    ''
                }
            </div>
        `).join('');
    }
    
    selectExercise(exerciseId) {
        this.currentExercise = this.exercises.find(ex => ex.id === exerciseId);
        if (!this.currentExercise) return;
        
        this.renderExerciseDetails();
        this.showWorkspace();
        this.loadInitialCode();
    }
    
    renderExerciseDetails() {
        const exercise = this.currentExercise;
        
        // Título e descrição
        document.getElementById('exercise-title').textContent = exercise.title;
        document.getElementById('exercise-description').textContent = exercise.description;
        
        // Objetivos
        const objectivesList = document.getElementById('exercise-objectives');
        objectivesList.innerHTML = exercise.objectives.map(obj => `<li>${obj}</li>`).join('');
        
        // Requisitos
        const requirementsList = document.getElementById('exercise-requirements');
        requirementsList.innerHTML = exercise.requirements.map(req => `<li>${req}</li>`).join('');
        
        // Dicas
        const hintsList = document.getElementById('exercise-hints');
        hintsList.innerHTML = exercise.hints.map(hint => `<li>${hint}</li>`).join('');
        
        // Solução
        document.getElementById('exercise-solution').textContent = exercise.solution;
        
        // Limpar seções expandidas
        document.getElementById('hints-section').classList.remove('show');
        document.getElementById('solution-section').classList.remove('show');
        
        // Limpar resultados dos testes
        document.getElementById('test-results-container').innerHTML = 
            '<p class="text-muted">Execute o código para ver os resultados</p>';
    }
    
    showWorkspace() {
        document.getElementById('exercise-workspace').style.display = 'grid';
        
        // Destacar exercício selecionado
        document.querySelectorAll('.exercise-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const selectedCard = Array.from(document.querySelectorAll('.exercise-card'))
            .find(card => card.textContent.includes(this.currentExercise.title));
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
    }
    
    loadInitialCode() {
        if (this.editor && this.currentExercise) {
            this.editor.setValue(this.currentExercise.initialCode);
        }
    }
    
    runCode() {
        if (!this.editor || !this.currentExercise) return;
        
        const code = this.editor.getValue();
        const outputContainer = document.getElementById('output-container');
        
        try {
            // Limpar console anterior
            outputContainer.innerHTML = '';
            
            // Capturar console.log
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => logs.push(args.join(' '));
            
            // Executar código
            eval(code);
            
            // Restaurar console.log
            console.log = originalLog;
            
            // Mostrar logs se houver
            if (logs.length > 0) {
                outputContainer.innerHTML += `<div><strong>Console:</strong></div>`;
                logs.forEach(log => {
                    outputContainer.innerHTML += `<div>→ ${log}</div>`;
                });
            }
            
            // Executar testes
            this.runTests(code);
            
        } catch (error) {
            outputContainer.innerHTML = `<div style="color: #ff6b6b;">
                <strong>❌ Erro:</strong> ${error.message}
            </div>`;
        }
    }
    
    runTests(code) {
        const tests = this.currentExercise.tests;
        const resultsContainer = document.getElementById('test-results-container');
        
        let passedTests = 0;
        const testResults = tests.map(test => {
            try {
                // Executar código do teste
                const result = eval(`${code}; ${test.input}`);
                const passed = this.deepEqual(result, test.expected);
                
                if (passed) passedTests++;
                
                return {
                    input: test.input,
                    expected: test.expected,
                    actual: result,
                    passed: passed
                };
            } catch (error) {
                return {
                    input: test.input,
                    expected: test.expected,
                    actual: `Erro: ${error.message}`,
                    passed: false
                };
            }
        });
        
        // Renderizar resultados
        resultsContainer.innerHTML = testResults.map(result => `
            <div class="test-case">
                <div>
                    <strong>Teste:</strong> ${result.input}<br>
                    <small>Esperado: ${JSON.stringify(result.expected)}</small><br>
                    <small>Obtido: ${JSON.stringify(result.actual)}</small>
                </div>
                <div class="test-status ${result.passed ? 'test-passed' : 'test-failed'}">
                    ${result.passed ? '✅ PASSOU' : '❌ FALHOU'}
                </div>
            </div>
        `).join('');
        
        // Verificar se exercício foi concluído
        if (passedTests === tests.length) {
            this.markExerciseCompleted();
            resultsContainer.innerHTML += `
                <div class="alert alert-success mt-3">
                    <i class="fas fa-trophy"></i>
                    <strong>Parabéns!</strong> Você concluiu este exercício!
                </div>
            `;
        }
    }
    
    resetCode() {
        if (this.editor && this.currentExercise) {
            this.editor.setValue(this.currentExercise.initialCode);
            document.getElementById('output-container').innerHTML = 
                '<div>💡 Digite seu código acima e clique em "Executar"</div>';
            document.getElementById('test-results-container').innerHTML = 
                '<p class="text-muted">Execute o código para ver os resultados</p>';
        }
    }
    
    markExerciseCompleted() {
        const exerciseId = this.currentExercise.id;
        if (!this.completedExercises.includes(exerciseId)) {
            this.completedExercises.push(exerciseId);
            this.saveCompletedExercises();
            this.updateProgress();
            this.renderExerciseGrid();
        }
    }
    
    updateProgress() {
        const total = this.exercises.length;
        const completed = this.completedExercises.length;
        const percentage = (completed / total) * 100;
        
        document.getElementById('progress-text').textContent = 
            `${completed} de ${total} exercícios concluídos`;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }
    
    getCompletedExercises() {
        return JSON.parse(localStorage.getItem('completedExercises')) || [];
    }
    
    saveCompletedExercises() {
        localStorage.setItem('completedExercises', JSON.stringify(this.completedExercises));
    }
    
    deepEqual(a, b) {
        if (a === b) return true;
        
        if (a == null || b == null) return false;
        
        if (typeof a !== typeof b) return false;
        
        if (typeof a === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            
            if (keysA.length !== keysB.length) return false;
            
            for (let key of keysA) {
                if (!keysB.includes(key)) return false;
                if (!this.deepEqual(a[key], b[key])) return false;
            }
            return true;
        }
        
        return false;
    }
}

// Funções globais para os botões
function runCode() {
    if (window.exerciseSystem) {
        window.exerciseSystem.runCode();
    }
}

function resetCode() {
    if (window.exerciseSystem) {
        window.exerciseSystem.resetCode();
    }
}

function toggleHints() {
    const hintsSection = document.getElementById('hints-section');
    hintsSection.classList.toggle('show');
}

function toggleSolution() {
    const solutionSection = document.getElementById('solution-section');
    solutionSection.classList.toggle('show');
}

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.exerciseSystem = new ExerciseSystem();
});