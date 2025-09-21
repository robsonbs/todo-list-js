# 📚 Exercícios - Aula 4: Arrays e Manipulação de Dados

## 🎯 Objetivos dos Exercícios

* Dominar todos os métodos de arrays do JavaScript
* Aplicar conceitos em situações práticas
* Desenvolver lógica de programação com estruturas de dados
* Preparar para implementação do sistema TODO

---

## 📝 NÍVEL 1: INICIANTE

### Exercício 1.1: CRUD Básico

```javascript
// Complete as funções para manipular uma lista de compras
let listaCompras = ['leite', 'ovos', 'pão'];

// a) Adicione 'queijo' no final da lista
function adicionarItem(item) {
    // Seu código aqui
}

// b) Remova o último item da lista
function removerUltimo() {
    // Seu código aqui
}

// c) Adicione 'frutas' no início da lista
function adicionarNoInicio(item) {
    // Seu código aqui
}

// d) Remova o primeiro item da lista
function removerPrimeiro() {
    // Seu código aqui
}

// Teste suas funções
console.log('Lista inicial:', listaCompras);
adicionarItem('queijo');
console.log('Após adicionar queijo:', listaCompras);
```

### Exercício 1.2: Busca e Localização

```javascript
// Trabalhe com uma lista de nomes
let nomes = ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo'];

// a) Encontre a posição de 'Carlos'
function encontrarPosicao(nome) {
    // Seu código aqui
}

// b) Verifique se 'Maria' está na lista
function verificarExistencia(nome) {
    // Seu código aqui
}

// c) Encontre o primeiro nome com mais de 5 letras
function primeiroNomeLongo() {
    // Seu código aqui
}

// Teste suas funções
console.log('Posição de Carlos:', encontrarPosicao('Carlos'));
console.log('Maria existe?', verificarExistencia('Maria'));
console.log('Primeiro nome longo:', primeiroNomeLongo());
```

### Exercício 1.3: Iteração Básica

```javascript
// Lista de números para praticar
let numeros = [10, 25, 30, 45, 50];

// a) Mostre todos os números multiplicados por 2 (use forEach)
function mostrarDobrados() {
    // Seu código aqui
}

// b) Crie um novo array com números divididos por 5 (use map)
function criarDivididos() {
    // Seu código aqui
}

// c) Encontre todos os números maiores que 30 (use filter)
function encontrarMaiores() {
    // Seu código aqui
}

// Teste suas funções
mostrarDobrados();
console.log('Divididos por 5:', criarDivididos());
console.log('Maiores que 30:', encontrarMaiores());
```

### Exercício 1.4: Ordenação Simples

```javascript
// Lista de idades para ordenar
let idades = [25, 18, 30, 22, 35, 28];

// a) Ordene as idades do menor para o maior
function ordenarCrescente() {
    // Seu código aqui
}

// b) Ordene as idades do maior para o menor
function ordenarDecrescente() {
    // Seu código aqui
}

// c) Embaralhe a lista original usando reverse
function embaralhar() {
    // Seu código aqui
}

// Teste suas funções
console.log('Original:', idades);
console.log('Crescente:', ordenarCrescente());
console.log('Decrescente:', ordenarDecrescente());
```

### ✅ Desafio Nível 1: Lista de Tarefas Simples

```javascript
// Crie um sistema básico de lista de tarefas
let tarefas = [];

function adicionarTarefa(descricao) {
    // Adicione uma tarefa com formato: { id: numero, descricao: string, concluida: false }
}

function removerTarefa(id) {
    // Remova a tarefa pelo ID
}

function marcarConcluida(id) {
    // Marque a tarefa como concluída
}

function listarTarefas() {
    // Liste todas as tarefas com forEach
}

// Teste o sistema
adicionarTarefa('Estudar JavaScript');
adicionarTarefa('Fazer exercícios');
marcarConcluida(1);
listarTarefas();
```

---

## 🎖️ NÍVEL 2: INTERMEDIÁRIO

### Exercício 2.1: Métodos Avançados

```javascript
// Lista de produtos para e-commerce
let produtos = [{
        id: 1,
        nome: 'Notebook',
        preco: 2500,
        categoria: 'eletrônicos',
        estoque: 5
    },
    {
        id: 2,
        nome: 'Mouse',
        preco: 50,
        categoria: 'eletrônicos',
        estoque: 20
    },
    {
        id: 3,
        nome: 'Teclado',
        preco: 150,
        categoria: 'eletrônicos',
        estoque: 0
    },
    {
        id: 4,
        nome: 'Cadeira',
        preco: 300,
        categoria: 'móveis',
        estoque: 8
    },
    {
        id: 5,
        nome: 'Mesa',
        preco: 600,
        categoria: 'móveis',
        estoque: 3
    }
];

// a) Calcule o valor total do estoque usando reduce
function calcularValorTotalEstoque() {
    // Seu código aqui
}

// b) Verifique se todos os produtos têm preço maior que 0 usando every
function todosTemPreco() {
    // Seu código aqui
}

// c) Verifique se algum produto está em falta (estoque = 0) usando some
function temProdutoEmFalta() {
    // Seu código aqui
}

// d) Agrupe produtos por categoria usando reduce
function agruparPorCategoria() {
    // Seu código aqui
}

// Teste suas funções
console.log('Valor total:', calcularValorTotalEstoque());
console.log('Todos têm preço:', todosTemPreco());
console.log('Tem produto em falta:', temProdutoEmFalta());
console.log('Agrupados:', agruparPorCategoria());
```

### Exercício 2.2: Filtragem Complexa

```javascript
// Continue com o array de produtos
// a) Produtos em estoque e com preço menor que 500
function produtosBaratosEmEstoque() {
    // Seu código aqui
}

// b) Produtos de eletrônicos ordenados por preço
function eletronicosPorPreco() {
    // Seu código aqui
}

// c) Nomes dos produtos sem estoque
function nomesProdutosSemEstoque() {
    // Seu código aqui
}

// d) Média de preços por categoria
function mediaPrecoPorCategoria() {
    // Seu código aqui
}

// Teste suas funções
console.log('Baratos em estoque:', produtosBaratosEmEstoque());
console.log('Eletrônicos por preço:', eletronicosPorPreco());
console.log('Sem estoque:', nomesProdutosSemEstoque());
console.log('Média por categoria:', mediaPrecoPorCategoria());
```

### Exercício 2.3: Manipulação de Strings em Arrays

```javascript
// Array de frases para processar
let frases = [
    'JavaScript é incrível',
    'Arrays são muito úteis',
    'Programação é divertida',
    'Métodos facilitam o trabalho'
];

// a) Transforme todas as frases em maiúsculas
function frasesEmMaiusculas() {
    // Seu código aqui
}

// b) Encontre frases que contenham a palavra 'é'
function frasesComE() {
    // Seu código aqui
}

// c) Conte o total de palavras em todas as frases
function contarTotalPalavras() {
    // Seu código aqui
}

// d) Crie um array com a primeira palavra de cada frase
function primeirasPalavras() {
    // Seu código aqui
}

// Teste suas funções
console.log('Maiúsculas:', frasesEmMaiusculas());
console.log('Com é:', frasesComE());
console.log('Total palavras:', contarTotalPalavras());
console.log('Primeiras palavras:', primeirasPalavras());
```

### ✅ Desafio Nível 2: Sistema de Vendas

```javascript
// Crie um sistema de análise de vendas
let vendas = [{
        id: 1,
        produto: 'Notebook',
        valor: 2500,
        data: '2024-01-15',
        vendedor: 'Ana'
    },
    {
        id: 2,
        produto: 'Mouse',
        valor: 50,
        data: '2024-01-16',
        vendedor: 'Bruno'
    },
    {
        id: 3,
        produto: 'Teclado',
        valor: 150,
        data: '2024-01-16',
        vendedor: 'Ana'
    },
    {
        id: 4,
        produto: 'Monitor',
        valor: 800,
        data: '2024-01-17',
        vendedor: 'Carlos'
    }
];

function relatorioVendas() {
    // Implemente:
    // - Total de vendas
    // - Venda de maior valor
    // - Vendas por vendedor
    // - Média de vendas por dia
}

function metasVendas() {
    // Implemente:
    // - Vendedores que bateram meta de R$ 1000
    // - Produtos mais vendidos
    // - Análise por período
}
```

---

## 🏆 NÍVEL 3: AVANÇADO

### Exercício 3.1: Performance e Algoritmos

```javascript
// Compare performance de diferentes abordagens
let numeroGrande = Array.from({
    length: 100000
}, (_, i) => i);

// a) Implemente busca linear
function buscaLinear(array, valor) {
    // Seu código aqui - meça o tempo
}

// b) Implemente busca binária
function buscaBinaria(array, valor) {
    // Seu código aqui - meça o tempo
}

// c) Compare performance dos métodos de iteração
function compararIteracao() {
    // Compare: for, forEach, map, reduce
    // Meça tempo de execução
}

// d) Otimize operações em arrays grandes
function operacoesOtimizadas() {
    // Demonstre técnicas de otimização
}
```

### Exercício 3.2: Estruturas de Dados Complexas

```javascript
// Trabalhe com arrays multidimensionais
let matriz = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

// a) Implemente transposição de matriz
function transporMatriz(matriz) {
    // Seu código aqui
}

// b) Encontre o maior elemento da matriz
function maiorElemento(matriz) {
    // Seu código aqui
}

// c) Calcule soma das diagonais
function somaDiagonais(matriz) {
    // Seu código aqui
}

// d) Implemente rotação de matriz 90°
function rotacionarMatriz(matriz) {
    // Seu código aqui
}

// Teste suas funções
console.log('Original:', matriz);
console.log('Transposta:', transporMatriz(matriz));
console.log('Maior elemento:', maiorElemento(matriz));
console.log('Soma diagonais:', somaDiagonais(matriz));
```

### Exercício 3.3: Algoritmos de Ordenação

```javascript
// Implemente diferentes algoritmos de ordenação
let arrayDesordenado = [64, 34, 25, 12, 22, 11, 90];

// a) Bubble Sort
function bubbleSort(array) {
    // Implemente bubble sort
    // Conte comparações e trocas
}

// b) Quick Sort
function quickSort(array) {
    // Implemente quick sort
    // Meça performance
}

// c) Merge Sort
function mergeSort(array) {
    // Implemente merge sort
    // Compare com sort() nativo
}

// d) Compare performance dos algoritmos
function compararOrdenacao() {
    // Compare todos os algoritmos
    // Analise complexidade
}
```

### ✅ Desafio Nível 3: Sistema de Análise de Dados

```javascript
// Crie um sistema completo de análise de dados
let dadosVendas = [
    // Grande dataset simulado
];

class AnalisadorDados {
    constructor(dados) {
        this.dados = dados;
    }

    // Implemente métodos avançados:
    // - Análise estatística completa
    // - Agrupamentos complexos
    // - Correlações entre variáveis
    // - Previsões simples
    // - Otimização de queries
    // - Cache de resultados

    analisarTendencias() {
        // Análise de tendências temporais
    }

    criarRelatorios() {
        // Relatórios dinâmicos
    }

    otimizarConsultas() {
        // Otimização de performance
    }
}

// Use o sistema para análises complexas
const analisador = new AnalisadorDados(dadosVendas);
```

---

## 🎯 PROJETO PRÁTICO FINAL

### Sistema TODO Completo com Arrays

```javascript
// Implemente um sistema TODO completo usando todos os conceitos
class TodoManager {
    constructor() {
        this.todos = [];
        this.nextId = 1;
        this.categories = ['pessoal', 'trabalho', 'estudos'];
        this.priorities = ['baixa', 'média', 'alta'];
    }

    // Implemente todos os métodos usando array methods:

    // CRUD básico
    add(todo) {
        /* use push, find */ }
    remove(id) {
        /* use findIndex, splice */ }
    update(id, updates) {
        /* use find, Object.assign */ }

    // Filtragem
    getByStatus(completed) {
        /* use filter */ }
    getByCategory(category) {
        /* use filter */ }
    getByPriority(priority) {
        /* use filter */ }
    search(query) {
        /* use filter, includes */ }

    // Ordenação
    sortByDate() {
        /* use sort */ }
    sortByPriority() {
        /* use sort com custom comparator */ }

    // Análise
    getStats() {
        /* use reduce, every, some */ }
    getCompletion() {
        /* use filter, length */ }

    // Utilitários
    export () {
        /* use map, JSON.stringify */ }
    import(data) {
        /* use forEach, push */ }
    backup() {
        /* use slice ou spread */ }

    // Avançado
    batchOperations(operations) {
        /* use forEach */ }
    undo() {
        /* use pop de um array de states */ }
    redo() {
        /* use push, pop */ }
}

// Teste completo do sistema
const todoManager = new TodoManager();

// Adicione funcionalidades extras:
// - Drag and drop (reorder com splice)
// - Tags (filter com includes)
// - Dates (filter com comparações)
// - Sync (merge de arrays)
```

---

## 📊 Gabarito e Dicas

### ⚡ Dicas de Performance

1. **Use for loops** para máxima performance
2. **forEach** para legibilidade
3. **map** para transformações
4. **filter** para seleções
5. **reduce** para agregações
6. **find** para busca única
7. **some/every** para verificações booleanas

### 🎯 Padrões Comuns

```javascript
// Buscar e atualizar
const item = array.find(x => x.id === id);
if (item) Object.assign(item, updates);

// Remover por condição
const index = array.findIndex(x => x.id === id);
if (index !== -1) array.splice(index, 1);

// Agrupar por propriedade
const grouped = array.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
}, {});

// Operações em cadeia
const result = array
    .filter(x => x.active)
    .map(x => ({
        ...x,
        processed: true
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
```

### 🏅 Critérios de Avaliação

* **Nível 1**: Uso correto de métodos básicos
* **Nível 2**: Combinação de métodos e lógica
* **Nível 3**: Otimização e algoritmos complexos
* **Projeto**: Aplicação completa dos conceitos

### 📚 Recursos Extras

* [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JavaScript.info Arrays](https://javascript.info/array)
* [Array Performance Tips](https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript)

---

**💡 Lembre-se**: Arrays são fundamentais em JavaScript. Dominar esses métodos é essencial para se tornar um desenvolvedor eficiente!
