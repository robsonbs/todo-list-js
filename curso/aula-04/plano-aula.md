# 📋 Plano de Aula 4: Arrays e Manipulação de Dados

## 📊 Informações Gerais

* **Duração:** 50 minutos
* **Nível:** Iniciante a Avançado
* **Pré-requisitos:** Aulas 1-3 (Fundamentos, DOM, Eventos)
* **Objetivo Principal:** Domínio completo de arrays e preparação para desenvolvimento do TODO List

---

## 🎯 Objetivos de Aprendizagem

### Conhecimentos

* Compreender a importância dos arrays na programação
* Conhecer todos os métodos nativos de arrays do JavaScript
* Entender performance e complexidade de diferentes operações

### Habilidades

* Manipular arrays com todos os métodos CRUD
* Aplicar métodos de busca, filtragem e transformação
* Implementar algoritmos de ordenação e busca
* Otimizar código para performance

### Atitudes

* Pensar de forma estruturada sobre dados
* Escolher métodos apropriados para cada situação
* Valorizar código limpo e eficiente

---

## ⏰ Cronograma Detalhado (50 minutos)

### 📚 1. Introdução e Contexto (5 minutos)

#### Abertura (2 minutos)

* Boas-vindas e revisão da aula anterior
* Apresentação dos objetivos da aula
* Conexão com o projeto TODO List

#### Motivação (3 minutos)

```javascript
// Demonstração rápida do poder dos arrays
const dados = [1, 2, 3, 4, 5];
console.log('Soma:', dados.reduce((a, b) => a + b));
console.log('Pares:', dados.filter(n => n % 2 === 0));
console.log('Dobrados:', dados.map(n => n * 2));
```

**Frase de impacto:** *"Arrays são o coração da manipulação de dados. Hoje vocês vão dominar a ferramenta mais poderosa do JavaScript!"*

### 🔧 2. Operações CRUD Básicas (10 minutos)

#### Push, Pop, Unshift, Shift (5 minutos)

```javascript
// Demonstração ao vivo
let lista = ['a', 'b', 'c'];

// Adicionar/remover no final
lista.push('d'); // ['a', 'b', 'c', 'd']
lista.pop(); // ['a', 'b', 'c']

// Adicionar/remover no início  
lista.unshift('0'); // ['0', 'a', 'b', 'c']
lista.shift(); // ['a', 'b', 'c']
```

**Técnica pedagógica:** Demonstração visual com manipulação em tempo real

#### Splice - O Canivete Suíço (3 minutos)

```javascript
let arr = [1, 2, 3, 4, 5];

// Remover elementos
arr.splice(1, 2); // Remove 2 elementos a partir do índice 1

// Adicionar elementos
arr.splice(1, 0, 'a', 'b'); // Adiciona 'a' e 'b' no índice 1

// Substituir elementos
arr.splice(0, 1, 'novo'); // Substitui primeiro elemento
```

#### Exercício Prático (2 minutos)

* Alunos implementam uma lista de compras básica
* Adição e remoção de itens em diferentes posições

### 🔍 3. Busca e Localização (8 minutos)

#### Métodos de Busca Simples (4 minutos)

```javascript
let frutas = ['maçã', 'banana', 'laranja'];

// Busca por valor
frutas.indexOf('banana'); // 1
frutas.includes('uva'); // false

// Demonstração da diferença
console.log(frutas.indexOf('uva')); // -1
console.log(frutas.includes('uva')); // false
```

#### Busca com Condições (4 minutos)

```javascript
let users = [{
        name: 'João',
        age: 25
    },
    {
        name: 'Maria',
        age: 30
    },
    {
        name: 'Pedro',
        age: 35
    }
];

// Encontrar primeiro
const adulto = users.find(user => user.age > 30);

// Encontrar índice
const indice = users.findIndex(user => user.name === 'Maria');
```

**Dica importante:** *"find() para UMA ocorrência, filter() para MÚLTIPLAS"*

### 🔄 4. Filtro e Transformação (10 minutos)

#### Filter - Filtragem Inteligente (3 minutos)

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Números pares
const pares = numbers.filter(n => n % 2 === 0);

// Múltiplos filtros
const result = users
    .filter(user => user.age > 25)
    .filter(user => user.active);
```

#### Map - Transformação de Dados (3 minutos)

```javascript
// Transformar objetos
const formatted = users.map(user => ({
    ...user,
    displayName: `${user.name} (${user.age} anos)`
}));

// Extrair propriedades
const names = users.map(user => user.name);
```

#### ForEach vs Map (2 minutos)

```javascript
// forEach - efeitos colaterais
users.forEach(user => console.log(user.name));

// map - transformação
const upperNames = users.map(user => user.name.toUpperCase());
```

#### Exercício Hands-on (2 minutos)

* Filtrar produtos por categoria
* Transformar preços em formato monetário

### 📊 5. Agregação e Redução (10 minutos)

#### Reduce - O Método Mais Poderoso (5 minutos)

```javascript
const numbers = [1, 2, 3, 4, 5];

// Soma simples
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Objeto complexo
const stats = numbers.reduce((acc, num) => {
    acc.sum += num;
    acc.count++;
    acc.average = acc.sum / acc.count;
    return acc;
}, {
    sum: 0,
    count: 0,
    average: 0
});

// Agrupamento
const grouped = users.reduce((acc, user) => {
    const ageGroup = user.age < 30 ? 'young' : 'adult';
    acc[ageGroup] = acc[ageGroup] || [];
    acc[ageGroup].push(user);
    return acc;
}, {});
```

**Conceito chave:** *"Reduce transforma um array em QUALQUER COISA"*

#### Some e Every - Validações (3 minutos)

```javascript
const ages = [18, 25, 30, 35];

// Pelo menos um
const hasAdult = ages.some(age => age >= 18); // true

// Todos
const allAdults = ages.every(age => age >= 18); // true

// Casos práticos
const hasError = responses.some(r => r.error);
const allValid = forms.every(f => f.isValid);
```

#### Exercício Prático (2 minutos)

* Calcular estatísticas de vendas
* Validar formulários

### 🔢 6. Ordenação e Organização (5 minutos)

#### Sort Básico e Avançado (3 minutos)

```javascript
// Strings - ordem alfabética
const fruits = ['banana', 'apple', 'cherry'];
fruits.sort(); // ['apple', 'banana', 'cherry']

// Números - CUIDADO!
const nums = [10, 5, 40, 25, 1000, 1];
nums.sort(); // [1, 10, 1000, 25, 40, 5] - ERRADO!
nums.sort((a, b) => a - b); // [1, 5, 10, 25, 40, 1000] - CORRETO!

// Objetos
users.sort((a, b) => a.name.localeCompare(b.name));
users.sort((a, b) => a.age - b.age);
```

#### Reverse e Aplicações (2 minutos)

```javascript
// Reverter ordem
const reversed = [...array].reverse(); // Não modifica original

// Ordem decrescente
const desc = [...numbers].sort((a, b) => b - a);
```

### 🔗 7. Concatenação e Utilitários (5 minutos)

#### Juntando Arrays (2 minutos)

```javascript
// Concat
const all = arr1.concat(arr2, arr3);

// Spread (moderno)
const combined = [...arr1, ...arr2, ...arr3];

// Join - array para string
const csv = data.join(',');
const sentence = words.join(' ');
```

#### Slice - Extraindo Partes (2 minutos)

```javascript
const data = [1, 2, 3, 4, 5];

data.slice(1, 3); // [2, 3] - do índice 1 ao 3 (exclusivo)
data.slice(-2); // [4, 5] - últimos 2 elementos
data.slice(2); // [3, 4, 5] - do índice 2 até o final
```

#### Exercício Rápido (1 minuto)

* Paginar resultados usando slice
* Criar breadcrumb com join

### 🚀 8. Aplicação Prática - TODO System (5 minutos)

#### Implementação ao Vivo (5 minutos)

```javascript
class TodoManager {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    add(text) {
        const todo = {
            id: this.nextId++,
            text,
            completed: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }

    remove(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            return this.todos.splice(index, 1)[0];
        }
    }

    toggle(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
        return todo;
    }

    getActive() {
        return this.todos.filter(t => !t.completed);
    }

    getCompleted() {
        return this.todos.filter(t => t.completed);
    }

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        return {
            total,
            completed,
            active: total - completed,
            completionRate: (completed / total * 100).toFixed(1)
        };
    }
}
```

### 📝 9. Síntese e Próximos Passos (2 minutos)

#### Resumo dos Conceitos (1 minuto)

* **CRUD:** push, pop, unshift, shift, splice
* **Busca:** find, findIndex, indexOf, includes
* **Transformação:** map, filter, forEach
* **Agregação:** reduce, some, every
* **Organização:** sort, reverse
* **Utilitários:** concat, join, slice

#### Preview da Próxima Aula (1 minuto)

* Eventos avançados e interatividade
* Integração completa do TODO List
* Persistência de dados

---

## 🎯 Estratégias Pedagógicas

### Para Alunos Iniciantes

* Demonstrações visuais passo a passo
* Analogias com situações do dia a dia
* Exercícios com dados familiares (lista de compras, contatos)

### Para Alunos Intermediários

* Comparação de performance entre métodos
* Casos de uso práticos em desenvolvimento
* Debugging de código com arrays

### Para Alunos Avançados

* Discussão sobre complexidade algorítmica
* Implementação de algoritmos customizados
* Otimizações e best practices

---

## 🔧 Recursos e Ferramentas

### Obrigatórios

* Navegador com DevTools aberto
* Editor de código (VS Code)
* Console do navegador para testes

### Recomendados

* Extension para snippets de JavaScript
* Ferramenta de visualização de arrays
* Performance profiler

### Materiais de Apoio

* Cheat sheet de métodos de arrays
* Exemplos práticos para cada método
* Links para documentação oficial

---

## 📊 Avaliação e Feedback

### Avaliação Formativa (Durante a aula)

* ✅ Participa das demonstrações ao vivo
* ✅ Resolve exercícios práticos
* ✅ Faz perguntas relevantes
* ✅ Ajuda colegas com dificuldades

### Avaliação Somativa (Final da aula)

* Implementação correta do sistema TODO básico
* Uso apropriado de métodos de arrays
* Código limpo e organizado
* Aplicação de conceitos de performance

### Critérios de Sucesso

1. **Básico:** Usar push, pop, filter, map corretamente
2. **Intermediário:** Combinar métodos e usar reduce
3. **Avançado:** Otimizar performance e implementar algoritmos

---

## 🚨 Possíveis Dificuldades e Soluções

### Dificuldade 1: Confundir métodos que modificam vs não modificam

**Solução:** Demonstração clara com console.log do antes e depois

### Dificuldade 2: Entender o callback do reduce

**Solução:** Começar com soma simples, evoluir gradualmente

### Dificuldade 3: Sort com números

**Solução:** Mostrar o problema, explicar comparator function

### Dificuldade 4: Performance com arrays grandes

**Solução:** Demonstração prática com console.time

---

## 📚 Exercícios para Casa

### Obrigatórios

1. Completar todos os exercícios do Nível 1
2. Implementar sistema de notas com arrays
3. Ler documentação MDN sobre 3 métodos não vistos

### Opcionais

* Exercícios do Nível 2 e 3
* Pesquisar sobre algoritmos de ordenação
* Implementar própria versão de map/filter

### Projeto Contínuo

* Expandir o TODO List com categorias
* Adicionar sistema de prioridades
* Implementar busca e filtros

---

## 🎯 Indicadores de Sucesso da Aula

### Engajamento

* 90% dos alunos participam ativamente
* Perguntas relevantes sobre aplicações práticas
* Discussões espontâneas sobre performance

### Compreensão

* Alunos explicam diferenças entre métodos
* Conseguem escolher método apropriado para situação
* Identificam quando usar cada abordagem

### Aplicação

* Implementam funcionalidades básicas do TODO
* Resolvem problemas usando múltiplos métodos
* Código funciona corretamente na primeira tentativa

---

## 🔄 Melhorias Contínuas

### Feedback dos Alunos

* Enquete sobre ritmo da aula
* Sugestões de exemplos mais relevantes
* Dificuldades específicas encontradas

### Ajustes para Próximas Turmas

* Tempo adequado para cada seção
* Exemplos que funcionaram melhor
* Exercícios que geraram mais dúvidas

### Evolução do Conteúdo

* Novos métodos de arrays (ES2024+)
* Integração com frameworks modernos
* Casos de uso atualizados

---

**💡 Lema da Aula:** *"Arrays não são apenas listas - são a fundação de toda manipulação de dados em JavaScript!"*
