// ===============================================
// AULA 4: ARRAYS E MANIPULAÇÃO DE DADOS
// Código Progressivo - Do Básico ao Avançado
// ===============================================

console.log("📚 Aula 4: Iniciando sistema de arrays e manipulação de dados...");

// ==========================================
// PARTE 1: ARRAYS BÁSICOS E CRUD
// ==========================================

// Dados de exemplo para demonstrações
let todoList = [];
let fruits = ["maçã", "banana", "laranja"];
let numbers = [1, 5, 3, 9, 2, 8, 4, 7, 6];
let users = [
  { id: 1, name: "João", age: 25, active: true },
  { id: 2, name: "Maria", age: 30, active: false },
  { id: 3, name: "Pedro", age: 35, active: true },
  { id: 4, name: "Ana", age: 28, active: true },
  { id: 5, name: "Carlos", age: 42, active: false },
];

// Função utilitária para log visual
function logResult(method, description, input, output) {
  console.group(`🔍 ${method.toUpperCase()}`);
  console.log(`📝 Descrição: ${description}`);
  console.log(`📥 Input:`, input);
  console.log(`📤 Output:`, output);
  console.groupEnd();
}

// Função para atualizar displays na interface
function updateDisplay(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    if (typeof content === "object") {
      element.textContent = JSON.stringify(content, null, 2);
    } else {
      element.textContent = content;
    }
  }
}

// ==========================================
// MÉTODOS BÁSICOS - CRUD OPERATIONS
// ==========================================

// Adicionar elementos
function demonstrarPush() {
  const originalArray = [...fruits];
  const newFruit = "uva";
  const result = fruits.push(newFruit);

  logResult(
    "push",
    "Adiciona elemento no final do array",
    originalArray,
    fruits
  );
  updateDisplay(
    "pushResult",
    `Original: [${originalArray.join(", ")}] → Novo: [${fruits.join(", ")}]`
  );

  return result; // Retorna o novo length
}

function demonstrarPop() {
  const originalArray = [...fruits];
  const removedItem = fruits.pop();

  logResult("pop", "Remove e retorna o último elemento", originalArray, {
    removed: removedItem,
    newArray: fruits,
  });
  updateDisplay(
    "popResult",
    `Removido: "${removedItem}" → Array: [${fruits.join(", ")}]`
  );

  return removedItem;
}

function demonstrarUnshift() {
  const originalArray = [...fruits];
  const newFruit = "morango";
  const result = fruits.unshift(newFruit);

  logResult(
    "unshift",
    "Adiciona elemento no início do array",
    originalArray,
    fruits
  );
  updateDisplay(
    "unshiftResult",
    `Original: [${originalArray.join(", ")}] → Novo: [${fruits.join(", ")}]`
  );

  return result;
}

function demonstrarShift() {
  const originalArray = [...fruits];
  const removedItem = fruits.shift();

  logResult("shift", "Remove e retorna o primeiro elemento", originalArray, {
    removed: removedItem,
    newArray: fruits,
  });
  updateDisplay(
    "shiftResult",
    `Removido: "${removedItem}" → Array: [${fruits.join(", ")}]`
  );

  return removedItem;
}

function demonstrarSplice() {
  const originalArray = [...fruits];

  // Splice: splice(start, deleteCount, ...itemsToAdd)
  const removedItems = fruits.splice(1, 2, "kiwi", "manga");

  logResult(
    "splice",
    "Remove/adiciona elementos em posição específica",
    originalArray,
    {
      removed: removedItems,
      newArray: fruits,
    }
  );
  updateDisplay(
    "spliceResult",
    `Removidos: [${removedItems.join(", ")}] → Array: [${fruits.join(", ")}]`
  );

  return removedItems;
}

// ==========================================
// MÉTODOS DE BUSCA E LOCALIZAÇÃO
// ==========================================

function demonstrarIndexOf() {
  const item = "banana";
  const index = fruits.indexOf(item);

  logResult(
    "indexOf",
    "Encontra o índice da primeira ocorrência",
    {
      array: fruits,
      search: item,
    },
    index
  );
  updateDisplay(
    "indexOfResult",
    `Procurando "${item}" em [${fruits.join(", ")}] → Índice: ${index}`
  );

  return index;
}

function demonstrarIncludes() {
  const item = "maçã";
  const exists = fruits.includes(item);

  logResult(
    "includes",
    "Verifica se elemento existe no array",
    {
      array: fruits,
      search: item,
    },
    exists
  );
  updateDisplay(
    "includesResult",
    `"${item}" existe em [${fruits.join(", ")}]? ${exists ? "Sim" : "Não"}`
  );

  return exists;
}

function demonstrarFind() {
  const condition = (user) => user.age > 30;
  const found = users.find(condition);

  logResult(
    "find",
    "Encontra o primeiro elemento que atende a condição",
    users,
    found
  );
  updateDisplay(
    "findResult",
    `Primeiro usuário com idade > 30: ${found ? found.name : "Não encontrado"}`
  );

  return found;
}

function demonstrarFindIndex() {
  const condition = (user) => user.name === "Maria";
  const index = users.findIndex(condition);

  logResult(
    "findIndex",
    "Encontra o índice do primeiro elemento que atende a condição",
    users,
    index
  );
  updateDisplay("findIndexResult", `Índice do usuário "Maria": ${index}`);

  return index;
}

// ==========================================
// MÉTODOS DE FILTRO E TRANSFORMAÇÃO
// ==========================================

function demonstrarFilter() {
  const condition = (user) => user.active === true;
  const activeUsers = users.filter(condition);

  logResult(
    "filter",
    "Retorna novo array com elementos que atendem a condição",
    users,
    activeUsers
  );
  updateDisplay(
    "filterResult",
    `Usuários ativos: ${activeUsers.map((u) => u.name).join(", ")}`
  );

  return activeUsers;
}

function demonstrarMap() {
  const transformation = (user) => ({
    ...user,
    displayName: `${user.name} (${user.age} anos)`,
  });
  const transformedUsers = users.map(transformation);

  logResult(
    "map",
    "Retorna novo array com elementos transformados",
    users,
    transformedUsers
  );
  updateDisplay(
    "mapResult",
    `Nomes formatados: ${transformedUsers.map((u) => u.displayName).join(", ")}`
  );

  return transformedUsers;
}

function demonstrarForEach() {
  let output = [];

  users.forEach((user, index) => {
    const message = `${index + 1}. ${user.name} - ${
      user.active ? "Ativo" : "Inativo"
    }`;
    output.push(message);
    console.log(message);
  });

  logResult(
    "forEach",
    "Executa função para cada elemento (não retorna array)",
    users,
    "void"
  );
  updateDisplay("forEachResult", output.join("\n"));
}

// ==========================================
// MÉTODOS DE REDUÇÃO E AGREGAÇÃO
// ==========================================

function demonstrarReduce() {
  // Exemplo 1: Soma de números
  const sum = numbers.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  logResult("reduce", "Reduz array a um único valor", numbers, sum);
  updateDisplay("reduceResult", `Soma dos números: ${sum}`);

  // Exemplo 2: Agrupamento por propriedade
  const usersByStatus = users.reduce((acc, user) => {
    const status = user.active ? "active" : "inactive";
    if (!acc[status]) acc[status] = [];
    acc[status].push(user.name);
    return acc;
  }, {});

  updateDisplay(
    "reduceAdvancedResult",
    `Agrupamento: Ativos: [${usersByStatus.active?.join(
      ", "
    )}], Inativos: [${usersByStatus.inactive?.join(", ")}]`
  );

  return { sum, usersByStatus };
}

function demonstrarSome() {
  const hasMinor = users.some((user) => user.age < 25);
  const hasActiveUser = users.some((user) => user.active);

  logResult(
    "some",
    "Verifica se pelo menos um elemento atende a condição",
    users,
    {
      hasMinor,
      hasActiveUser,
    }
  );
  updateDisplay(
    "someResult",
    `Tem menor de 25: ${hasMinor ? "Sim" : "Não"}, Tem usuário ativo: ${
      hasActiveUser ? "Sim" : "Não"
    }`
  );

  return { hasMinor, hasActiveUser };
}

function demonstrarEvery() {
  const allAdults = users.every((user) => user.age >= 18);
  const allActive = users.every((user) => user.active);

  logResult(
    "every",
    "Verifica se todos os elementos atendem a condição",
    users,
    {
      allAdults,
      allActive,
    }
  );
  updateDisplay(
    "everyResult",
    `Todos adultos: ${allAdults ? "Sim" : "Não"}, Todos ativos: ${
      allActive ? "Sim" : "Não"
    }`
  );

  return { allAdults, allActive };
}

// ==========================================
// MÉTODOS DE ORDENAÇÃO
// ==========================================

function demonstrarSort() {
  // Ordenação de strings
  const sortedFruits = [...fruits].sort();

  // Ordenação de números
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  // Ordenação de objetos
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  logResult(
    "sort",
    "Ordena elementos do array",
    {
      fruits: fruits,
      numbers: numbers,
      users: users.map((u) => u.name),
    },
    {
      sortedFruits,
      sortedNumbers,
      sortedUsers: sortedUsers.map((u) => u.name),
    }
  );

  updateDisplay(
    "sortResult",
    `Frutas ordenadas: [${sortedFruits.join(
      ", "
    )}]\nNúmeros ordenados: [${sortedNumbers.join(", ")}]`
  );

  return { sortedFruits, sortedNumbers, sortedUsers };
}

function demonstrarReverse() {
  const reversedFruits = [...fruits].reverse();
  const reversedNumbers = [...numbers].reverse();

  logResult(
    "reverse",
    "Inverte a ordem dos elementos",
    {
      fruits,
      numbers,
    },
    {
      reversedFruits,
      reversedNumbers,
    }
  );

  updateDisplay(
    "reverseResult",
    `Frutas invertidas: [${reversedFruits.join(
      ", "
    )}]\nNúmeros invertidos: [${reversedNumbers.join(", ")}]`
  );

  return { reversedFruits, reversedNumbers };
}

// ==========================================
// MÉTODOS DE CONCATENAÇÃO E JUNÇÃO
// ==========================================

function demonstrarConcat() {
  const moreFruits = ["pêssego", "melão"];
  const allFruits = fruits.concat(moreFruits);

  logResult(
    "concat",
    "Junta arrays criando um novo array",
    {
      array1: fruits,
      array2: moreFruits,
    },
    allFruits
  );

  updateDisplay(
    "concatResult",
    `[${fruits.join(", ")}] + [${moreFruits.join(", ")}] = [${allFruits.join(
      ", "
    )}]`
  );

  return allFruits;
}

function demonstrarJoin() {
  const joinedDefault = fruits.join();
  const joinedCustom = fruits.join(" | ");
  const joinedSpaces = fruits.join(" ");

  logResult("join", "Converte array em string com separador", fruits, {
    default: joinedDefault,
    custom: joinedCustom,
    spaces: joinedSpaces,
  });

  updateDisplay(
    "joinResult",
    `Padrão: "${joinedDefault}"\nCustom: "${joinedCustom}"\nEspaços: "${joinedSpaces}"`
  );

  return { joinedDefault, joinedCustom, joinedSpaces };
}

function demonstrarSlice() {
  const sliced1 = fruits.slice(1, 3);
  const sliced2 = fruits.slice(-2);
  const sliced3 = fruits.slice(1);

  logResult("slice", "Extrai seção do array sem modificar original", fruits, {
    "slice(1,3)": sliced1,
    "slice(-2)": sliced2,
    "slice(1)": sliced3,
  });

  updateDisplay(
    "sliceResult",
    `slice(1,3): [${sliced1.join(", ")}]\nslice(-2): [${sliced2.join(
      ", "
    )}]\nslice(1): [${sliced3.join(", ")}]`
  );

  return { sliced1, sliced2, sliced3 };
}

// ==========================================
// OPERAÇÕES AVANÇADAS COM OBJETOS
// ==========================================

function demonstrarObjectMethods() {
  // Buscar usuário por ID
  function findUserById(id) {
    return users.find((user) => user.id === id);
  }

  // Atualizar usuário
  function updateUser(id, updates) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      return users[index];
    }
    return null;
  }

  // Remover usuário
  function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }

  // Adicionar usuário
  function addUser(userData) {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const newUser = { id: newId, ...userData };
    users.push(newUser);
    return newUser;
  }

  // Demonstrações
  const foundUser = findUserById(2);
  const updatedUser = updateUser(2, { age: 31 });
  const newUser = addUser({ name: "Lucas", age: 27, active: true });

  logResult(
    "Object Methods",
    "CRUD operations com arrays de objetos",
    "Operações múltiplas",
    {
      foundUser,
      updatedUser,
      newUser,
      currentUsers: users.length,
    }
  );

  updateDisplay(
    "objectMethodsResult",
    `Usuário encontrado: ${foundUser?.name}\nUsuário atualizado: ${updatedUser?.name} (${updatedUser?.age})\nNovo usuário: ${newUser?.name}`
  );

  return { findUserById, updateUser, removeUser, addUser };
}

// ==========================================
// PERFORMANCE E COMPARAÇÕES
// ==========================================

function demonstrarPerformance() {
  const bigArray = Array.from({ length: 100000 }, (_, i) => i);

  // Teste 1: for vs forEach vs map
  console.time("for loop");
  let sum1 = 0;
  for (let i = 0; i < bigArray.length; i++) {
    sum1 += bigArray[i];
  }
  console.timeEnd("for loop");

  console.time("forEach");
  let sum2 = 0;
  bigArray.forEach((num) => (sum2 += num));
  console.timeEnd("forEach");

  console.time("reduce");
  const sum3 = bigArray.reduce((acc, num) => acc + num, 0);
  console.timeEnd("reduce");

  // Teste 2: indexOf vs includes vs find
  const searchValue = 50000;

  console.time("indexOf");
  const index1 = bigArray.indexOf(searchValue);
  console.timeEnd("indexOf");

  console.time("includes");
  const exists1 = bigArray.includes(searchValue);
  console.timeEnd("includes");

  console.time("find");
  const found1 = bigArray.find((x) => x === searchValue);
  console.timeEnd("find");

  updateDisplay(
    "performanceResult",
    `Testes de performance realizados no console.\nSomas: ${sum1} | ${sum2} | ${sum3}\nBusca valor ${searchValue}: índice ${index1}, existe ${exists1}, encontrado ${found1}`
  );

  return { sum1, sum2, sum3, index1, exists1, found1 };
}

// ==========================================
// ALGORITMOS DE BUSCA AVANÇADOS
// ==========================================

function demonstrarBinarySearch() {
  const sortedArray = [...numbers].sort((a, b) => a - b);

  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let iterations = 0;

    while (left <= right) {
      iterations++;
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        return { found: true, index: mid, iterations };
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { found: false, index: -1, iterations };
  }

  const target = 7;
  const linearResult = sortedArray.indexOf(target);
  const binaryResult = binarySearch(sortedArray, target);

  logResult(
    "Binary Search",
    "Algoritmo de busca binária vs busca linear",
    {
      array: sortedArray,
      target,
    },
    {
      linear: { index: linearResult, iterations: sortedArray.length },
      binary: binaryResult,
    }
  );

  updateDisplay(
    "binarySearchResult",
    `Busca linear: ${linearResult} (${sortedArray.length} iterações)\nBusca binária: ${binaryResult.index} (${binaryResult.iterations} iterações)`
  );

  return { binarySearch, sortedArray, linearResult, binaryResult };
}

// ==========================================
// IMPLEMENTAÇÃO TODO LIST FUNCIONAL
// ==========================================

function createTodoSystem() {
  let todos = [
    {
      id: 1,
      text: "Aprender arrays",
      completed: false,
      priority: "high",
      createdAt: new Date("2024-01-01"),
    },
    {
      id: 2,
      text: "Praticar métodos",
      completed: true,
      priority: "medium",
      createdAt: new Date("2024-01-02"),
    },
    {
      id: 3,
      text: "Fazer exercícios",
      completed: false,
      priority: "low",
      createdAt: new Date("2024-01-03"),
    },
  ];

  // CRUD Operations
  function addTodo(text, priority = "medium") {
    const newTodo = {
      id: Math.max(...todos.map((t) => t.id), 0) + 1,
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
    };
    todos.push(newTodo);
    updateTodoDisplay();
    return newTodo;
  }

  function removeTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const removed = todos.splice(index, 1)[0];
      updateTodoDisplay();
      return removed;
    }
    return null;
  }

  function toggleTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      updateTodoDisplay();
      return todo;
    }
    return null;
  }

  function updateTodo(id, updates) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
      updateTodoDisplay();
      return todos[index];
    }
    return null;
  }

  // Filtering e Searching
  function getActiveTodos() {
    return todos.filter((todo) => !todo.completed);
  }

  function getCompletedTodos() {
    return todos.filter((todo) => todo.completed);
  }

  function getTodosByPriority(priority) {
    return todos.filter((todo) => todo.priority === priority);
  }

  function searchTodos(query) {
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Sorting
  function sortTodosByDate() {
    return [...todos].sort((a, b) => b.createdAt - a.createdAt);
  }

  function sortTodosByPriority() {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return [...todos].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  // Statistics
  function getTodoStats() {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const byPriority = todos.reduce((acc, todo) => {
      acc[todo.priority] = (acc[todo.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      completed,
      active,
      byPriority,
      completionRate: ((completed / total) * 100).toFixed(1),
    };
  }

  // Display Update
  function updateTodoDisplay() {
    const stats = getTodoStats();
    const display = document.getElementById("todoSystemResult");
    if (display) {
      display.innerHTML = `
                <div class="todo-stats">
                    <h4>📊 Estatísticas:</h4>
                    <p>Total: ${stats.total} | Concluídas: ${
        stats.completed
      } | Ativas: ${stats.active}</p>
                    <p>Taxa de conclusão: ${stats.completionRate}%</p>
                </div>
                <div class="todo-list">
                    <h4>📝 Lista de Tarefas:</h4>
                    ${todos
                      .map(
                        (todo) => `
                        <div class="todo-item ${
                          todo.completed ? "completed" : ""
                        }">
                            ${todo.completed ? "✅" : "⭕"} ${todo.text} 
                            <span class="priority ${todo.priority}">[${
                          todo.priority
                        }]</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
    }
  }

  // Inicializar display
  updateTodoDisplay();

  return {
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    getActiveTodos,
    getCompletedTodos,
    getTodosByPriority,
    searchTodos,
    sortTodosByDate,
    sortTodosByPriority,
    getTodoStats,
    getTodos: () => [...todos],
  };
}

// ==========================================
// ARRAYS MULTIDIMENSIONAIS
// ==========================================

function demonstrarMultiDimensional() {
  // Matriz 2D
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  // Acessar elementos
  const element = matrix[1][2]; // 6

  // Percorrer matriz
  function traverseMatrix(matrix) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        result.push(`[${i}][${j}] = ${matrix[i][j]}`);
      }
    }
    return result;
  }

  // Somar diagonal principal
  function sumDiagonal(matrix) {
    return matrix.reduce((sum, row, index) => sum + row[index], 0);
  }

  // Transpor matriz
  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  const traversal = traverseMatrix(matrix);
  const diagonal = sumDiagonal(matrix);
  const transposed = transpose(matrix);

  logResult("Multidimensional Arrays", "Operações com matrizes 2D", matrix, {
    element,
    traversal,
    diagonal,
    transposed,
  });

  updateDisplay(
    "multiDimensionalResult",
    `Elemento [1][2]: ${element}\nSoma diagonal: ${diagonal}\nMatriz transposta: ${JSON.stringify(
      transposed
    )}`
  );

  return { matrix, element, traversal, diagonal, transposed };
}

// ==========================================
// UTILITY FUNCTIONS E HELPERS
// ==========================================

function demonstrarUtilities() {
  // Remover duplicatas
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Aplanar array (flatten)
  function flatten(arr) {
    return arr.reduce(
      (flat, item) =>
        Array.isArray(item) ? flat.concat(flatten(item)) : flat.concat(item),
      []
    );
  }

  // Agrupar por propriedade
  function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  }

  // Paginar array
  function paginate(arr, pageSize, pageNumber) {
    const startIndex = (pageNumber - 1) * pageSize;
    return arr.slice(startIndex, startIndex + pageSize);
  }

  // Embaralhar array
  function shuffle(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Exemplos
  const duplicates = [1, 2, 2, 3, 3, 3, 4];
  const nested = [1, [2, 3], [4, [5, 6]]];
  const usersByAge = groupBy(users, "active");
  const page1 = paginate(numbers, 3, 1);
  const shuffledNumbers = shuffle(numbers);

  logResult(
    "Utility Functions",
    "Funções úteis para manipulação de arrays",
    {
      duplicates,
      nested,
      users,
      numbers,
    },
    {
      unique: removeDuplicates(duplicates),
      flattened: flatten(nested),
      grouped: usersByAge,
      paginated: page1,
      shuffled: shuffledNumbers,
    }
  );

  updateDisplay(
    "utilitiesResult",
    `Únicos: [${removeDuplicates(duplicates).join(", ")}]\nAplanado: [${flatten(
      nested
    ).join(", ")}]\nPágina 1: [${page1.join(", ")}]`
  );

  return {
    removeDuplicates,
    flatten,
    groupBy,
    paginate,
    shuffle,
  };
}

// ==========================================
// INICIALIZAÇÃO E EVENTOS DOM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM carregado, inicializando sistema de arrays...");

  // Configurar botões de demonstração
  const demos = {
    pushBtn: demonstrarPush,
    popBtn: demonstrarPop,
    unshiftBtn: demonstrarUnshift,
    shiftBtn: demonstrarShift,
    spliceBtn: demonstrarSplice,
    indexOfBtn: demonstrarIndexOf,
    includesBtn: demonstrarIncludes,
    findBtn: demonstrarFind,
    findIndexBtn: demonstrarFindIndex,
    filterBtn: demonstrarFilter,
    mapBtn: demonstrarMap,
    forEachBtn: demonstrarForEach,
    reduceBtn: demonstrarReduce,
    someBtn: demonstrarSome,
    everyBtn: demonstrarEvery,
    sortBtn: demonstrarSort,
    reverseBtn: demonstrarReverse,
    concatBtn: demonstrarConcat,
    joinBtn: demonstrarJoin,
    sliceBtn: demonstrarSlice,
    objectMethodsBtn: demonstrarObjectMethods,
    performanceBtn: demonstrarPerformance,
    binarySearchBtn: demonstrarBinarySearch,
    multiDimensionalBtn: demonstrarMultiDimensional,
    utilitiesBtn: demonstrarUtilities,
  };

  // Adicionar event listeners
  Object.entries(demos).forEach(([buttonId, demoFunction]) => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", function () {
        try {
          console.clear();
          console.log(`🎯 Executando demonstração: ${buttonId}`);
          demoFunction();

          // Feedback visual
          this.classList.add("success");
          setTimeout(() => this.classList.remove("success"), 1000);
        } catch (error) {
          console.error(`❌ Erro na demonstração ${buttonId}:`, error);
          this.classList.add("error");
          setTimeout(() => this.classList.remove("error"), 1000);
        }
      });
    }
  });

  // Inicializar sistema TODO
  window.todoSystem = createTodoSystem();

  // Configurar sistema TODO interativo
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoInput = document.getElementById("todoInput");

  if (addTodoBtn && todoInput) {
    addTodoBtn.addEventListener("click", () => {
      const text = todoInput.value.trim();
      if (text) {
        window.todoSystem.addTodo(text);
        todoInput.value = "";
      }
    });

    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTodoBtn.click();
      }
    });
  }

  // Demonstração automática inicial
  setTimeout(() => {
    console.log("🎭 Executando demonstrações iniciais...");
    updateDisplay(
      "statusDisplay",
      "Sistema carregado! Clique nos botões para ver as demonstrações."
    );
  }, 1000);

  // Reset de dados
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      fruits = ["maçã", "banana", "laranja"];
      numbers = [1, 5, 3, 9, 2, 8, 4, 7, 6];
      users = [
        { id: 1, name: "João", age: 25, active: true },
        { id: 2, name: "Maria", age: 30, active: false },
        { id: 3, name: "Pedro", age: 35, active: true },
        { id: 4, name: "Ana", age: 28, active: true },
        { id: 5, name: "Carlos", age: 42, active: false },
      ];
      console.log("🔄 Dados resetados para valores originais");
      updateDisplay(
        "statusDisplay",
        "Dados resetados! Arrays voltaram ao estado inicial."
      );
    });
  }
});

// ==========================================
// FUNCIONES GLOBAIS PARA CONSOLE
// ==========================================

// Tornar funções disponíveis no console para experimentação
window.arrayMethods = {
  demonstrarPush,
  demonstrarPop,
  demonstrarUnshift,
  demonstrarShift,
  demonstrarSplice,
  demonstrarIndexOf,
  demonstrarIncludes,
  demonstrarFind,
  demonstrarFindIndex,
  demonstrarFilter,
  demonstrarMap,
  demonstrarForEach,
  demonstrarReduce,
  demonstrarSome,
  demonstrarEvery,
  demonstrarSort,
  demonstrarReverse,
  demonstrarConcat,
  demonstrarJoin,
  demonstrarSlice,
  demonstrarObjectMethods,
  demonstrarPerformance,
  demonstrarBinarySearch,
  demonstrarMultiDimensional,
  demonstrarUtilities,
};

// Dados globais para experimentação
window.testData = {
  fruits,
  numbers,
  users,
  todoList,
};

// Log de inicialização
console.log("✅ Sistema de arrays da Aula 4 carregado completamente!");
console.log("🎯 Use window.arrayMethods para acessar as demonstrações");
console.log("📊 Use window.testData para acessar os dados de teste");
console.log("🚀 Use window.todoSystem para interagir com o sistema TODO");
