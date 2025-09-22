/**
 * BANCO DE DADOS DE EXERCÍCIOS
 * 
 * Exercícios organizados por aula e dificuldade
 */

const exercisesData = [
    // ========== AULA 1: FUNDAMENTOS ==========
    {
        id: 1,
        lesson: 1,
        title: "Calculadora Básica",
        difficulty: "easy",
        description: "Crie uma função que realize operações matemáticas básicas.",
        objectives: [
            "Criar funções para soma, subtração, multiplicação e divisão",
            "Usar parâmetros e retorno de funções",
            "Praticar operadores matemáticos"
        ],
        requirements: [
            "Função somar(a, b)",
            "Função subtrair(a, b)", 
            "Função multiplicar(a, b)",
            "Função dividir(a, b) - tratar divisão por zero"
        ],
        initialCode: `// Complete as funções abaixo
function somar(a, b) {
    // Seu código aqui
}

function subtrair(a, b) {
    // Seu código aqui
}

function multiplicar(a, b) {
    // Seu código aqui
}

function dividir(a, b) {
    // Seu código aqui (não esqueça da divisão por zero!)
}`,
        solution: `function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Erro: Divisão por zero!";
    }
    return a / b;
}`,
        hints: [
            "Use o operador + para somar",
            "Use o operador - para subtrair", 
            "Use o operador * para multiplicar",
            "Use o operador / para dividir",
            "Verifique se o divisor é zero antes de dividir"
        ],
        tests: [
            { input: "somar(5, 3)", expected: 8 },
            { input: "subtrair(10, 4)", expected: 6 },
            { input: "multiplicar(6, 7)", expected: 42 },
            { input: "dividir(15, 3)", expected: 5 },
            { input: "dividir(10, 0)", expected: "Erro: Divisão por zero!" }
        ]
    },
    
    {
        id: 2,
        lesson: 1,
        title: "Verificador de Idade",
        difficulty: "easy",
        description: "Crie uma função que classifica a idade de uma pessoa.",
        objectives: [
            "Usar estruturas condicionais (if/else)",
            "Comparar valores numéricos",
            "Retornar strings baseadas em condições"
        ],
        requirements: [
            "Função classificarIdade(idade)",
            "0-12 anos: 'Criança'",
            "13-17 anos: 'Adolescente'",
            "18-59 anos: 'Adulto'",
            "60+ anos: 'Idoso'"
        ],
        initialCode: `function classificarIdade(idade) {
    // Seu código aqui
}`,
        solution: `function classificarIdade(idade) {
    if (idade >= 0 && idade <= 12) {
        return "Criança";
    } else if (idade >= 13 && idade <= 17) {
        return "Adolescente";
    } else if (idade >= 18 && idade <= 59) {
        return "Adulto";
    } else if (idade >= 60) {
        return "Idoso";
    } else {
        return "Idade inválida";
    }
}`,
        hints: [
            "Use if/else para múltiplas condições",
            "Verifique os intervalos de idade",
            "Não esqueça de tratar idades inválidas (negativas)"
        ],
        tests: [
            { input: "classificarIdade(8)", expected: "Criança" },
            { input: "classificarIdade(15)", expected: "Adolescente" },
            { input: "classificarIdade(25)", expected: "Adulto" },
            { input: "classificarIdade(65)", expected: "Idoso" },
            { input: "classificarIdade(-5)", expected: "Idade inválida" }
        ]
    },
    
    // ========== AULA 2: ESTRUTURAS DE CONTROLE ==========
    {
        id: 3,
        lesson: 2,
        title: "Contador de Números Pares",
        difficulty: "medium",
        description: "Conte quantos números pares existem em um intervalo.",
        objectives: [
            "Usar loops for",
            "Usar operador módulo (%)",
            "Contar elementos que atendem uma condição"
        ],
        requirements: [
            "Função contarPares(inicio, fim)",
            "Contar números pares no intervalo (inclusive)",
            "Retornar a quantidade total"
        ],
        initialCode: `function contarPares(inicio, fim) {
    // Seu código aqui
}`,
        solution: `function contarPares(inicio, fim) {
    let count = 0;
    for (let i = inicio; i <= fim; i++) {
        if (i % 2 === 0) {
            count++;
        }
    }
    return count;
}`,
        hints: [
            "Use um loop for de inicio até fim",
            "Use i % 2 === 0 para verificar se é par",
            "Incremente um contador para cada número par"
        ],
        tests: [
            { input: "contarPares(1, 10)", expected: 5 },
            { input: "contarPares(2, 8)", expected: 4 },
            { input: "contarPares(1, 1)", expected: 0 },
            { input: "contarPares(2, 2)", expected: 1 }
        ]
    },
    
    {
        id: 4,
        lesson: 2,
        title: "Tabuada Customizada",
        difficulty: "medium",
        description: "Gere a tabuada de um número específico.",
        objectives: [
            "Usar loops para repetição",
            "Concatenar strings",
            "Formatar saída de dados"
        ],
        requirements: [
            "Função gerarTabuada(numero, limite)",
            "Retornar array com todas as multiplicações",
            "Formato: ['1 x 2 = 2', '2 x 2 = 4', ...]"
        ],
        initialCode: `function gerarTabuada(numero, limite) {
    // Seu código aqui
}`,
        solution: `function gerarTabuada(numero, limite) {
    const tabuada = [];
    for (let i = 1; i <= limite; i++) {
        const resultado = numero * i;
        tabuada.push(\`\${i} x \${numero} = \${resultado}\`);
    }
    return tabuada;
}`,
        hints: [
            "Crie um array vazio para armazenar os resultados",
            "Use um loop de 1 até o limite",
            "Use template literals (\`\`) para formatar a string",
            "Use push() para adicionar cada linha ao array"
        ],
        tests: [
            { input: "gerarTabuada(2, 3)", expected: ["1 x 2 = 2", "2 x 2 = 4", "3 x 2 = 6"] },
            { input: "gerarTabuada(5, 2)", expected: ["1 x 5 = 5", "2 x 5 = 10"] }
        ]
    },
    
    // ========== AULA 3: FUNÇÕES ==========
    {
        id: 5,
        lesson: 3,
        title: "Calculadora de IMC",
        difficulty: "easy",
        description: "Calcule o Índice de Massa Corporal e sua classificação.",
        objectives: [
            "Criar função com múltiplos parâmetros",
            "Fazer cálculos matemáticos",
            "Retornar objeto com múltiplas propriedades"
        ],
        requirements: [
            "Função calcularIMC(peso, altura)",
            "Retornar objeto com 'imc' e 'classificacao'",
            "Classificações: Baixo peso (<18.5), Normal (18.5-24.9), Sobrepeso (25-29.9), Obesidade (>=30)"
        ],
        initialCode: `function calcularIMC(peso, altura) {
    // Seu código aqui
}`,
        solution: `function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    let classificacao;
    
    if (imc < 18.5) {
        classificacao = "Baixo peso";
    } else if (imc <= 24.9) {
        classificacao = "Normal";
    } else if (imc <= 29.9) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }
    
    return {
        imc: parseFloat(imc.toFixed(2)),
        classificacao: classificacao
    };
}`,
        hints: [
            "IMC = peso / (altura²)",
            "Use toFixed(2) para limitar casas decimais",
            "Retorne um objeto com as duas propriedades",
            "Use parseFloat() para converter string em número"
        ],
        tests: [
            { input: "calcularIMC(70, 1.75)", expected: { imc: 22.86, classificacao: "Normal" } },
            { input: "calcularIMC(50, 1.70)", expected: { imc: 17.30, classificacao: "Baixo peso" } }
        ]
    },
    
    // ========== AULA 4: ARRAYS E OBJETOS ==========
    {
        id: 6,
        lesson: 4,
        title: "Gerenciador de Estudantes",
        difficulty: "medium",
        description: "Manipule um array de objetos representando estudantes.",
        objectives: [
            "Trabalhar com arrays de objetos",
            "Usar métodos de array (filter, map, find)",
            "Calcular médias e estatísticas"
        ],
        requirements: [
            "Função calcularMediaTurma(estudantes)",
            "Função buscarEstudante(estudantes, nome)",
            "Função estudantesAprovados(estudantes) - nota >= 7"
        ],
        initialCode: `function calcularMediaTurma(estudantes) {
    // Seu código aqui
}

function buscarEstudante(estudantes, nome) {
    // Seu código aqui
}

function estudantesAprovados(estudantes) {
    // Seu código aqui
}`,
        solution: `function calcularMediaTurma(estudantes) {
    const total = estudantes.reduce((soma, estudante) => soma + estudante.nota, 0);
    return parseFloat((total / estudantes.length).toFixed(2));
}

function buscarEstudante(estudantes, nome) {
    return estudantes.find(estudante => estudante.nome === nome) || null;
}

function estudantesAprovados(estudantes) {
    return estudantes.filter(estudante => estudante.nota >= 7);
}`,
        hints: [
            "Use reduce() para somar todas as notas",
            "Use find() para buscar por nome",
            "Use filter() para filtrar por condição",
            "Não esqueça de tratar o caso quando não encontrar o estudante"
        ],
        tests: [
            { 
                input: `calcularMediaTurma([{nome: "Ana", nota: 8}, {nome: "João", nota: 6}])`, 
                expected: 7.00 
            },
            { 
                input: `buscarEstudante([{nome: "Ana", nota: 8}], "Ana")`, 
                expected: {nome: "Ana", nota: 8} 
            }
        ]
    },
    
    // ========== AULA 5: DOM E EVENTOS ==========
    {
        id: 7,
        lesson: 5,
        title: "Contador Interativo",
        difficulty: "medium",
        description: "Crie um contador que pode ser incrementado e decrementado.",
        objectives: [
            "Criar variáveis de estado",
            "Simular manipulação de DOM",
            "Implementar funções de controle"
        ],
        requirements: [
            "Variável contador iniciando em 0",
            "Função incrementar()",
            "Função decrementar()",
            "Função obterValor()",
            "Função reset()"
        ],
        initialCode: `// Crie um sistema de contador
let contador = 0;

function incrementar() {
    // Seu código aqui
}

function decrementar() {
    // Seu código aqui
}

function obterValor() {
    // Seu código aqui
}

function reset() {
    // Seu código aqui
}`,
        solution: `let contador = 0;

function incrementar() {
    contador++;
    return contador;
}

function decrementar() {
    contador--;
    return contador;
}

function obterValor() {
    return contador;
}

function reset() {
    contador = 0;
    return contador;
}`,
        hints: [
            "Use ++ para incrementar",
            "Use -- para decrementar",
            "Retorne o valor atual após cada operação",
            "Reset deve voltar o contador para 0"
        ],
        tests: [
            { input: "incrementar(); obterValor()", expected: 1 },
            { input: "decrementar(); obterValor()", expected: 0 },
            { input: "reset(); obterValor()", expected: 0 }
        ]
    },
    
    // ========== EXERCÍCIOS AVANÇADOS ==========
    {
        id: 8,
        lesson: 6,
        title: "Sistema de Promessas",
        difficulty: "hard",
        description: "Simule operações assíncronas com Promises.",
        objectives: [
            "Criar e usar Promises",
            "Simular operações assíncronas",
            "Tratar sucesso e erro"
        ],
        requirements: [
            "Função buscarUsuario(id) que retorna Promise",
            "Simular delay de 1 segundo",
            "Retornar usuário se id > 0, erro se id <= 0"
        ],
        initialCode: `function buscarUsuario(id) {
    // Retorne uma Promise que resolve após 1 segundo
    // Se id > 0: resolve com {id: id, nome: "Usuário " + id}
    // Se id <= 0: rejeita com "ID inválido"
}`,
        solution: `function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({
                    id: id,
                    nome: "Usuário " + id
                });
            } else {
                reject("ID inválido");
            }
        }, 1000);
    });
}`,
        hints: [
            "Use new Promise((resolve, reject) => {})",
            "Use setTimeout para simular delay",
            "Chame resolve() para sucesso",
            "Chame reject() para erro"
        ],
        tests: [
            { input: "buscarUsuario(1)", expected: {id: 1, nome: "Usuário 1"} },
            { input: "buscarUsuario(-1)", expected: "ID inválido" }
        ]
    },
    
    {
        id: 9,
        lesson: 7,
        title: "Simulador de API",
        difficulty: "hard",
        description: "Simule chamadas para uma API REST.",
        objectives: [
            "Simular requisições HTTP",
            "Trabalhar com JSON",
            "Implementar CRUD básico"
        ],
        requirements: [
            "Array 'database' para armazenar dados",
            "Função GET(id) - buscar por ID",
            "Função POST(data) - adicionar novo item",
            "Função PUT(id, data) - atualizar item",
            "Função DELETE(id) - remover item"
        ],
        initialCode: `let database = [];
let nextId = 1;

function GET(id) {
    // Seu código aqui
}

function POST(data) {
    // Seu código aqui
}

function PUT(id, data) {
    // Seu código aqui
}

function DELETE(id) {
    // Seu código aqui
}`,
        solution: `let database = [];
let nextId = 1;

function GET(id) {
    if (id) {
        return database.find(item => item.id === id) || null;
    }
    return database;
}

function POST(data) {
    const newItem = { id: nextId++, ...data };
    database.push(newItem);
    return newItem;
}

function PUT(id, data) {
    const index = database.findIndex(item => item.id === id);
    if (index !== -1) {
        database[index] = { id, ...data };
        return database[index];
    }
    return null;
}

function DELETE(id) {
    const index = database.findIndex(item => item.id === id);
    if (index !== -1) {
        return database.splice(index, 1)[0];
    }
    return null;
}`,
        hints: [
            "Use find() para buscar por ID",
            "Use spread operator (...) para mesclar objetos",
            "Use findIndex() para encontrar posição",
            "Use splice() para remover elementos"
        ],
        tests: [
            { input: "POST({nome: 'Teste'})", expected: {id: 1, nome: 'Teste'} },
            { input: "GET(1)", expected: {id: 1, nome: 'Teste'} }
        ]
    },
    
    {
        id: 10,
        lesson: 8,
        title: "Observer Pattern",
        difficulty: "hard",
        description: "Implemente o padrão Observer para notificações.",
        objectives: [
            "Implementar padrão de design",
            "Gerenciar lista de observadores",
            "Notificar mudanças de estado"
        ],
        requirements: [
            "Classe Subject com observers array",
            "Método addObserver(observer)",
            "Método removeObserver(observer)",
            "Método notifyObservers(data)"
        ],
        initialCode: `class Subject {
    constructor() {
        // Seu código aqui
    }
    
    addObserver(observer) {
        // Seu código aqui
    }
    
    removeObserver(observer) {
        // Seu código aqui
    }
    
    notifyObservers(data) {
        // Seu código aqui
    }
}`,
        solution: `class Subject {
    constructor() {
        this.observers = [];
    }
    
    addObserver(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notifyObservers(data) {
        this.observers.forEach(observer => {
            if (typeof observer.update === 'function') {
                observer.update(data);
            }
        });
    }
}`,
        hints: [
            "Initialize observers como array vazio",
            "Use includes() para verificar se já existe",
            "Use indexOf() e splice() para remover",
            "Use forEach() para notificar todos"
        ],
        tests: [
            { input: "new Subject().observers.length", expected: 0 }
        ]
    }
];

// Exportar dados para uso global
window.exercisesData = exercisesData;