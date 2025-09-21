# 📝 **EXERCÍCIOS - AULA 1**

## 🎯 **Objetivo da Aula**

Familiarizar-se com JavaScript básico, variáveis e funções simples.

---

## 🧪 **Exercício 1: Conhecendo Variáveis**

### **📋 Tarefa:**

No console do navegador, crie variáveis para:

```javascript
// 1. Seu nome completo
let nomeCompleto = "Seu Nome Aqui";

// 2. Sua idade
let minhaIdade = 25;

// 3. Se você é estudante (true/false)
let souEstudante = true;

// 4. Suas linguagens favoritas (array)
let linguagensFavoritas = ["JavaScript", "HTML", "CSS"];

// 5. Mostre todas no console
console.log("Nome:", nomeCompleto);
console.log("Idade:", minhaIdade);
console.log("Estudante:", souEstudante);
console.log("Linguagens:", linguagensFavoritas);
```

### **✅ Resultado Esperado:**

Deve aparecer no console todas as suas informações organizadas.

---

## 🧪 **Exercício 2: Primeira Função**

### **📋 Tarefa:**

Crie uma função que apresenta você:

```javascript
function meApresentar() {
    let apresentacao = "Olá! Eu sou " + nomeCompleto +
        ", tenho " + minhaIdade + " anos";

    if (souEstudante) {
        apresentacao += " e estou estudando programação!";
    } else {
        apresentacao += " e trabalho com tecnologia!";
    }

    return apresentacao;
}

// Teste sua função
console.log(meApresentar());
```

### **✅ Resultado Esperado:**

Uma apresentação personalizada aparecerá no console.

---

## 🧪 **Exercício 3: Operações Matemáticas**

### **📋 Tarefa:**

Crie uma calculadora simples:

```javascript
function calculadora(numero1, numero2, operacao) {
    if (operacao === "soma") {
        return numero1 + numero2;
    } else if (operacao === "subtracao") {
        return numero1 - numero2;
    } else if (operacao === "multiplicacao") {
        return numero1 * numero2;
    } else if (operacao === "divisao") {
        return numero1 / numero2;
    } else {
        return "Operação não reconhecida!";
    }
}

// Testes
console.log("10 + 5 =", calculadora(10, 5, "soma"));
console.log("10 - 5 =", calculadora(10, 5, "subtracao"));
console.log("10 × 5 =", calculadora(10, 5, "multiplicacao"));
console.log("10 ÷ 5 =", calculadora(10, 5, "divisao"));
```

### **✅ Resultado Esperado:**

Resultados de todas as operações matemáticas.

---

## 🧪 **Exercício 4: Trabalhando com Arrays**

### **📋 Tarefa:**

Manipule uma lista de tarefas:

```javascript
// Lista inicial de tarefas
let tarefasDoDia = [
    "Estudar JavaScript",
    "Fazer exercícios",
    "Revisar HTML",
    "Praticar CSS"
];

// Mostrar todas as tarefas
console.log("Tarefas do dia:");
for (let i = 0; i < tarefasDoDia.length; i++) {
    console.log((i + 1) + ". " + tarefasDoDia[i]);
}

// Adicionar nova tarefa
tarefasDoDia.push("Criar um projeto");

// Mostrar total de tarefas
console.log("Total de tarefas:", tarefasDoDia.length);

// Mostrar primeira e última tarefa
console.log("Primeira tarefa:", tarefasDoDia[0]);
console.log("Última tarefa:", tarefasDoDia[tarefasDoDia.length - 1]);
```

### **✅ Resultado Esperado:**

Lista numerada de tarefas e informações sobre o array.

---

## 🧪 **Exercício 5: Objeto Pessoa**

### **📋 Tarefa:**

Crie um objeto representando uma pessoa:

```javascript
let pessoa = {
    nome: "Ana Silva",
    idade: 28,
    profissao: "Desenvolvedora",
    hobbies: ["leitura", "jogos", "culinária"],

    // Método do objeto
    seApresentar: function() {
        return "Olá! Eu sou " + this.nome +
            ", trabalho como " + this.profissao +
            " e tenho " + this.idade + " anos.";
    },

    // Método para listar hobbies
    listarHobbies: function() {
        console.log("Meus hobbies são:");
        for (let i = 0; i < this.hobbies.length; i++) {
            console.log("- " + this.hobbies[i]);
        }
    }
};

// Testando o objeto
console.log(pessoa.seApresentar());
pessoa.listarHobbies();

// Acessando propriedades
console.log("Nome:", pessoa.nome);
console.log("Profissão:", pessoa.profissao);
```

### **✅ Resultado Esperado:**

Apresentação da pessoa e lista de seus hobbies.

---

## 🏠 **Para Casa**

### **📚 Estudo Adicional:**

1. Pesquise sobre **tipos de dados em JavaScript**
2. Leia sobre **escopo de variáveis** (let, const, var)
3. Explore o **console do navegador** - experimente diferentes comandos

### **💻 Prática Extra:**

Crie um objeto representando seu filme favorito com:
* Título
* Diretor
* Ano de lançamento
* Gêneros (array)
* Nota que você daria (1-10)
* Função para mostrar todas as informações

```javascript
let meuFilmeFavorito = {
    // Adicione as propriedades aqui

    mostrarInfo: function() {
        // Implemente esta função
    }
};
```

---

## 🎯 **Checklist da Aula**

Marque o que você conseguiu fazer:

* [ ] Criei variáveis de diferentes tipos
* [ ] Fiz minha primeira função
* [ ] Usei o console para testar códigos
* [ ] Trabalhei com arrays (push, length, índices)
* [ ] Criei um objeto com propriedades e métodos
* [ ] Entendi a diferença entre tipos de dados
* [ ] Consegui fazer operações matemáticas
* [ ] Usei estruturas condicionais (if/else)
* [ ] Implementei um loop (for)

### **🏆 Meta da Aula:**

Marcar pelo menos 7 itens da checklist!

---

## ❓ **Dúvidas Frequentes**

### **Q: Por que usar 'let' em vez de 'var'?**

**R:** `let` tem escopo de bloco e evita problemas comuns de `var` . É a forma moderna recomendada.

### **Q: O que significa 'undefined'?**

**R:** É o valor de uma variável que foi declarada mas ainda não recebeu um valor.

### **Q: Como posso ver erros no meu código?**

**R:** Abra o console (F12) e procure por mensagens em vermelho. Elas indicam erros.

### **Q: Posso usar acentos em nomes de variáveis?**

**R:** Tecnicamente sim, mas é melhor evitar. Use nomes em inglês ou sem acentos.

---

**🎉 Parabéns por completar a Aula 1! Na próxima aula veremos como conectar JavaScript com HTML!**
