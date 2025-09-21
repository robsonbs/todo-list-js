# 📚 Exercícios - Aula 5: Criação Dinâmica de Elementos

## 🎯 Objetivos dos Exercícios

* Dominar criação dinâmica de elementos HTML
* Aplicar técnicas de manipulação DOM avançada
* Desenvolver componentes reutilizáveis
* Implementar sistemas de templates e Virtual DOM

---

## 📝 NÍVEL 1: INICIANTE

### Exercício 1.1: Criação Básica de Elementos

```javascript
// Complete as funções para criar elementos dinamicamente

// a) Crie um parágrafo com texto
function criarParagrafo(texto) {
    // Seu código aqui
    // Dica: use document.createElement e textContent
}

// b) Crie uma imagem com atributos
function criarImagem(src, alt, width, height) {
    // Seu código aqui
    // Dica: use setAttribute para cada atributo
}

// c) Crie um botão com evento
function criarBotao(texto, callback) {
    // Seu código aqui
    // Dica: use onclick ou addEventListener
}

// Teste suas funções
const container = document.getElementById('exercicio1');
container.appendChild(criarParagrafo('Texto do parágrafo'));
container.appendChild(criarImagem('image.jpg', 'Descrição', '100', '100'));
container.appendChild(criarBotao('Clique aqui', () => alert('Botão clicado!')));
```

### Exercício 1.2: Hierarquia de Elementos

```javascript
// Crie uma estrutura hierárquica de elementos

function criarCard(titulo, conteudo, imagemSrc) {
    // Crie a estrutura:
    // <div class="card">
    //   <img src="..." alt="..." class="card-image">
    //   <div class="card-content">
    //     <h3 class="card-title">Título</h3>
    //     <p class="card-text">Conteúdo</p>
    //   </div>
    // </div>

    // Seu código aqui
}

// Teste
const card = criarCard(
    'Meu Card',
    'Este é o conteúdo do card',
    'placeholder.jpg'
);
document.getElementById('exercicio2').appendChild(card);
```

### Exercício 1.3: Lista Dinâmica

```javascript
// Crie uma lista ordenada dinamicamente

function criarLista(items, ordenada = true) {
    // Crie ul ou ol baseado no parâmetro 'ordenada'
    // Adicione cada item como li

    // Seu código aqui
}

// Teste
const frutas = ['Maçã', 'Banana', 'Laranja', 'Uva'];
const numeros = ['Primeiro', 'Segundo', 'Terceiro'];

const container = document.getElementById('exercicio3');
container.appendChild(criarLista(frutas, false)); // Lista não ordenada
container.appendChild(criarLista(numeros, true)); // Lista ordenada
```

### Exercício 1.4: Formulário Dinâmico

```javascript
// Crie um formulário com campos dinâmicos

function criarCampo(tipo, nome, placeholder, obrigatorio = false) {
    // Crie input com tipo específico
    // Configure name, placeholder e required

    // Seu código aqui
}

function criarFormulario(campos) {
    // Crie form e adicione todos os campos
    // Adicione um botão de submit

    // Seu código aqui
}

// Teste
const campos = [{
        tipo: 'text',
        nome: 'nome',
        placeholder: 'Seu nome',
        obrigatorio: true
    },
    {
        tipo: 'email',
        nome: 'email',
        placeholder: 'seu@email.com',
        obrigatorio: true
    },
    {
        tipo: 'tel',
        nome: 'telefone',
        placeholder: '(11) 99999-9999',
        obrigatorio: false
    }
];

const form = criarFormulario(campos);
document.getElementById('exercicio4').appendChild(form);
```

### ✅ Desafio Nível 1: Galeria de Imagens

```javascript
// Crie uma galeria de imagens responsiva

function criarGaleria(imagens) {
    // Para cada imagem no array, crie:
    // - Container da imagem
    // - Elemento img
    // - Legenda
    // - Evento de clique para ampliar

    // Estrutura esperada:
    // <div class="galeria">
    //   <div class="imagem-container">
    //     <img src="..." alt="...">
    //     <p class="legenda">...</p>
    //   </div>
    // </div>
}

// Dados de teste
const imagens = [{
        src: 'img1.jpg',
        alt: 'Paisagem 1',
        legenda: 'Montanhas'
    },
    {
        src: 'img2.jpg',
        alt: 'Paisagem 2',
        legenda: 'Praia'
    },
    {
        src: 'img3.jpg',
        alt: 'Paisagem 3',
        legenda: 'Floresta'
    }
];

const galeria = criarGaleria(imagens);
document.getElementById('desafio1').appendChild(galeria);
```

---

## 🎖️ NÍVEL 2: INTERMEDIÁRIO

### Exercício 2.1: innerHTML vs createElement

```javascript
// Compare as duas abordagens para criação de elementos

// Método 1: usando innerHTML
function criarUsuarioInnerHTML(usuario) {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="usuario-card">
            <img src="${usuario.avatar}" alt="${usuario.nome}">
            <h3>${usuario.nome}</h3>
            <p>${usuario.email}</p>
            <button onclick="verPerfil('${usuario.id}')">Ver Perfil</button>
        </div>
    `;
    return container.firstElementChild;
}

// Método 2: usando createElement
function criarUsuarioCreateElement(usuario) {
    // Recrie a mesma estrutura usando apenas createElement
    // Seu código aqui
}

// Compare performance
function compararPerformance() {
    const usuarios = [{
            id: 1,
            nome: 'João',
            email: 'joao@email.com',
            avatar: 'avatar1.jpg'
        },
        {
            id: 2,
            nome: 'Maria',
            email: 'maria@email.com',
            avatar: 'avatar2.jpg'
        }
    ];

    console.time('innerHTML');
    usuarios.forEach(user => criarUsuarioInnerHTML(user));
    console.timeEnd('innerHTML');

    console.time('createElement');
    usuarios.forEach(user => criarUsuarioCreateElement(user));
    console.timeEnd('createElement');
}
```

### Exercício 2.2: DocumentFragment

```javascript
// Use DocumentFragment para otimização

function criarTabelaOtimizada(dados) {
    // Crie uma tabela com cabeçalho e dados
    // Use DocumentFragment para adicionar as linhas

    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Criar cabeçalho
    const headerRow = document.createElement('tr');
    Object.keys(dados[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Criar linhas usando Fragment
    const fragment = document.createDocumentFragment();

    // Seu código aqui - adicione as linhas de dados ao fragment

    tbody.appendChild(fragment);
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    return tabela;
}

// Teste
const dadosProdutos = [{
        nome: 'Notebook',
        preco: 2500,
        categoria: 'Eletrônicos'
    },
    {
        nome: 'Mouse',
        preco: 50,
        categoria: 'Periféricos'
    },
    {
        nome: 'Teclado',
        preco: 150,
        categoria: 'Periféricos'
    }
];

const tabela = criarTabelaOtimizada(dadosProdutos);
document.getElementById('exercicio2_2').appendChild(tabela);
```

### Exercício 2.3: Sistema de Templates

```javascript
// Implemente um sistema básico de templates

class TemplateSystem {
    constructor() {
        this.templates = new Map();
    }

    // Registrar template
    register(name, template) {
        this.templates.set(name, template);
    }

    // Renderizar template com dados
    render(templateName, data) {
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(`Template '${templateName}' não encontrado`);
        }

        // Implementar substituição de variáveis {{ variavel }}
        // Seu código aqui
    }

    // Renderizar lista com template
    renderList(templateName, dataArray) {
        // Renderizar template para cada item do array
        // Retornar DocumentFragment com todos os elementos
        // Seu código aqui
    }
}

// Uso do sistema
const templateSystem = new TemplateSystem();

templateSystem.register('produto', `
    <div class="produto">
        <h3>{{ nome }}</h3>
        <p class="preco">R$ {{ preco }}</p>
        <span class="categoria">{{ categoria }}</span>
    </div>
`);

const produtos = [{
        nome: 'Smartphone',
        preco: '899',
        categoria: 'Eletrônicos'
    },
    {
        nome: 'Livro',
        preco: '45',
        categoria: 'Educação'
    }
];

const fragment = templateSystem.renderList('produto', produtos);
document.getElementById('exercicio2_3').appendChild(fragment);
```

### Exercício 2.4: Clonagem e Reutilização

```javascript
// Implemente sistema de clonagem de templates

function criarTemplateNotificacao() {
    // Crie template base para notificação
    const template = document.createElement('div');
    template.className = 'notificacao template';
    template.innerHTML = `
        <div class="notificacao-header">
            <span class="icone"></span>
            <span class="titulo">Título</span>
            <button class="fechar">×</button>
        </div>
        <div class="notificacao-body">
            <p class="mensagem">Mensagem</p>
        </div>
    `;
    return template;
}

function criarNotificacao(tipo, titulo, mensagem, icone) {
    // Clone o template e personalize
    // Seu código aqui
}

// Sistema de notificações
class NotificationManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.template = criarTemplateNotificacao();
    }

    show(tipo, titulo, mensagem, icone, duracao = 5000) {
        // Criar notificação usando clone
        // Adicionar ao container
        // Remover automaticamente após duracao
        // Seu código aqui
    }

    clear() {
        // Limpar todas as notificações
        // Seu código aqui
    }
}

// Teste
const notificationManager = new NotificationManager('notifications');
notificationManager.show('success', 'Sucesso!', 'Operação realizada com sucesso', '✅');
notificationManager.show('error', 'Erro!', 'Ocorreu um erro na operação', '❌');
```

### ✅ Desafio Nível 2: Componente de Tabela Avançado

```javascript
// Crie um componente de tabela com funcionalidades avançadas

class AdvancedTable {
    constructor(containerId, data, config = {}) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.config = {
            sortable: true,
            filterable: true,
            pageable: true,
            pageSize: 5,
            ...config
        };
        this.currentPage = 1;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.filterValue = '';

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    createHeader() {
        // Criar cabeçalho com ordenação
        // Seu código aqui
    }

    createBody() {
        // Criar corpo da tabela com dados filtrados e paginados
        // Seu código aqui
    }

    createPagination() {
        // Criar controles de paginação
        // Seu código aqui
    }

    createFilter() {
        // Criar campo de filtro
        // Seu código aqui
    }

    render() {
        // Renderizar tabela completa
        // Seu código aqui
    }

    sort(column) {
        // Implementar ordenação
        // Seu código aqui
    }

    filter(value) {
        // Implementar filtro
        // Seu código aqui
    }

    goToPage(page) {
        // Navegar para página
        // Seu código aqui
    }

    bindEvents() {
        // Vincular eventos
        // Seu código aqui
    }
}

// Teste
const tableData = [{
        id: 1,
        nome: 'João',
        idade: 25,
        cidade: 'São Paulo'
    },
    {
        id: 2,
        nome: 'Maria',
        idade: 30,
        cidade: 'Rio de Janeiro'
    },
    {
        id: 3,
        nome: 'Pedro',
        idade: 35,
        cidade: 'Belo Horizonte'
    },
    // ... mais dados
];

const table = new AdvancedTable('advanced-table', tableData);
```

---

## 🏆 NÍVEL 3: AVANÇADO

### Exercício 3.1: Virtual DOM Simples

```javascript
// Implemente um Virtual DOM básico

class SimpleVirtualDOM {
    constructor() {
        this.vdom = null;
        this.realDOM = null;
    }

    // Criar elemento virtual
    createElement(type, props = {}, ...children) {
        return {
            type,
            props: props || {},
            children: children.flat()
        };
    }

    // Renderizar virtual para real DOM
    render(vnode) {
        // Seu código aqui
        // Converter vnode em elemento DOM real
    }

    // Diff entre dois virtual nodes
    diff(oldVNode, newVNode) {
        // Seu código aqui
        // Retornar array de patches necessários
    }

    // Aplicar patches no DOM real
    patch(realDOM, patches) {
        // Seu código aqui
        // Aplicar mudanças no DOM real
    }

    // Atualizar aplicação
    update(newVDOM) {
        if (!this.vdom) {
            this.vdom = newVDOM;
            this.realDOM = this.render(newVDOM);
            return this.realDOM;
        }

        const patches = this.diff(this.vdom, newVDOM);
        this.patch(this.realDOM, patches);
        this.vdom = newVDOM;

        return this.realDOM;
    }
}

// Teste do Virtual DOM
const vdom = new SimpleVirtualDOM();

// Estado inicial
let state = {
    counter: 0,
    items: ['Item 1', 'Item 2']
};

function createApp(state) {
    return vdom.createElement('div', {
            class: 'app'
        },
        vdom.createElement('h1', {}, 'Counter: ' + state.counter),
        vdom.createElement('button', {
            onclick: () => updateState({
                counter: state.counter + 1
            })
        }, 'Increment'),
        vdom.createElement('ul', {},
            ...state.items.map(item =>
                vdom.createElement('li', {}, item)
            )
        )
    );
}

function updateState(newState) {
    state = {
        ...state,
        ...newState
    };
    const newVDOM = createApp(state);
    vdom.update(newVDOM);
}

// Inicializar
const app = vdom.update(createApp(state));
document.getElementById('vdom-app').appendChild(app);
```

### Exercício 3.2: Sistema de Componentes Avançado

```javascript
// Implemente sistema de componentes com lifecycle

class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
        this.children = [];
    }

    // Lifecycle methods
    componentWillMount() {
        // Override in child classes
    }

    componentDidMount() {
        // Override in child classes
    }

    componentWillUpdate(newProps, newState) {
        // Override in child classes
    }

    componentDidUpdate() {
        // Override in child classes
    }

    componentWillUnmount() {
        // Override in child classes
    }

    // State management
    setState(newState) {
        const oldState = {
            ...this.state
        };
        this.state = {
            ...this.state,
            ...newState
        };

        if (this.element) {
            this.componentWillUpdate(this.props, this.state);
            this.update();
            this.componentDidUpdate();
        }
    }

    // Render method - must be implemented by child classes
    render() {
        throw new Error('render() method must be implemented');
    }

    // Mount component
    mount(parentElement) {
        this.componentWillMount();
        this.element = this.render();
        parentElement.appendChild(this.element);
        this.componentDidMount();
        return this.element;
    }

    // Update component
    update() {
        if (this.element && this.element.parentNode) {
            const newElement = this.render();
            this.element.parentNode.replaceChild(newElement, this.element);
            this.element = newElement;
        }
    }

    // Unmount component
    unmount() {
        this.componentWillUnmount();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.children.forEach(child => child.unmount());
    }
}

// Exemplo de componente
class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            inputValue: ''
        };
    }

    componentDidMount() {
        console.log('TodoApp mounted');
        this.loadTodos();
    }

    loadTodos() {
        // Simular carregamento
        setTimeout(() => {
            this.setState({
                todos: [{
                        id: 1,
                        text: 'Learn Components',
                        completed: false
                    },
                    {
                        id: 2,
                        text: 'Build App',
                        completed: true
                    }
                ]
            });
        }, 1000);
    }

    addTodo() {
        if (this.state.inputValue.trim()) {
            const newTodo = {
                id: Date.now(),
                text: this.state.inputValue,
                completed: false
            };

            this.setState({
                todos: [...this.state.todos, newTodo],
                inputValue: ''
            });
        }
    }

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo =>
                todo.id === id ? {
                    ...todo,
                    completed: !todo.completed
                } : todo
            )
        });
    }

    render() {
        const container = document.createElement('div');
        container.className = 'todo-app';

        // Header
        const header = document.createElement('h2');
        header.textContent = 'Advanced Todo App';
        container.appendChild(header);

        // Input
        const input = document.createElement('input');
        input.value = this.state.inputValue;
        input.placeholder = 'Add new todo...';
        input.oninput = (e) => this.setState({
            inputValue: e.target.value
        });
        input.onkeypress = (e) => {
            if (e.key === 'Enter') this.addTodo();
        };

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.onclick = () => this.addTodo();

        const inputContainer = document.createElement('div');
        inputContainer.appendChild(input);
        inputContainer.appendChild(addButton);
        container.appendChild(inputContainer);

        // Todos list
        const todosList = document.createElement('ul');
        todosList.className = 'todos-list';

        this.state.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.onchange = () => this.toggleTodo(todo.id);

            const text = document.createElement('span');
            text.textContent = todo.text;

            li.appendChild(checkbox);
            li.appendChild(text);
            todosList.appendChild(li);
        });

        container.appendChild(todosList);

        // Stats
        const stats = document.createElement('p');
        const total = this.state.todos.length;
        const completed = this.state.todos.filter(t => t.completed).length;
        stats.textContent = `Total: ${total}, Completed: ${completed}`;
        container.appendChild(stats);

        return container;
    }
}

// Uso do componente
const todoApp = new TodoApp();
todoApp.mount(document.getElementById('component-app'));
```

### Exercício 3.3: Micro Framework

```javascript
// Crie um micro framework para desenvolvimento

class MicroFramework {
    constructor() {
        this.components = new Map();
        this.routes = new Map();
        this.state = {};
        this.observers = [];
    }

    // Sistema de componentes
    component(name, factory) {
        this.components.set(name, factory);
    }

    // Sistema de roteamento
    route(path, component) {
        this.routes.set(path, component);
    }

    // Sistema de estado global
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.notifyObservers();
    }

    getState() {
        return {
            ...this.state
        };
    }

    // Observer pattern
    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer(this.state));
    }

    // Renderização
    render(componentName, container, props = {}) {
        const factory = this.components.get(componentName);
        if (!factory) {
            throw new Error(`Component '${componentName}' not found`);
        }

        const component = factory(props, this);
        container.innerHTML = '';
        container.appendChild(component);
    }

    // Navegação
    navigate(path) {
        const component = this.routes.get(path);
        if (component) {
            this.render(component, document.getElementById('app'));
        }
    }

    // Template helper
    template(strings, ...values) {
        const container = document.createElement('div');
        let html = '';

        strings.forEach((string, i) => {
            html += string + (values[i] || '');
        });

        container.innerHTML = html;
        return container.firstElementChild || container;
    }
}

// Uso do framework
const app = new MicroFramework();

// Definir componentes
app.component('Header', (props, framework) => {
    return framework.template`
        <header>
            <h1>${props.title}</h1>
            <nav>
                <button onclick="app.navigate('/')">Home</button>
                <button onclick="app.navigate('/about')">About</button>
            </nav>
        </header>
    `;
});

app.component('Home', (props, framework) => {
    const state = framework.getState();
    return framework.template`
        <div>
            <h2>Home Page</h2>
            <p>Counter: ${state.counter || 0}</p>
            <button onclick="app.setState({counter: (app.getState().counter || 0) + 1})">
                Increment
            </button>
        </div>
    `;
});

app.component('About', (props, framework) => {
    return framework.template`
        <div>
            <h2>About Page</h2>
            <p>This is a micro framework demo</p>
        </div>
    `;
});

// Definir rotas
app.route('/', 'Home');
app.route('/about', 'About');

// Inicializar
app.render('Header', document.getElementById('header'), {
    title: 'Micro Framework'
});
app.navigate('/');
```

### ✅ Desafio Nível 3: Editor WYSIWYG

```javascript
// Implemente um editor WYSIWYG usando criação dinâmica

class WYSIWYGEditor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.content = [];
        this.history = [];
        this.historyIndex = -1;
        this.selectedElement = null;

        this.init();
    }

    init() {
        this.createToolbar();
        this.createEditArea();
        this.createPropertiesPanel();
        this.bindEvents();
    }

    createToolbar() {
        // Criar barra de ferramentas com botões para:
        // - Adicionar texto, imagem, botão, lista
        // - Desfazer/Refazer
        // - Salvar/Carregar
        // Seu código aqui
    }

    createEditArea() {
        // Criar área editável com drag and drop
        // Seu código aqui
    }

    createPropertiesPanel() {
        // Painel para editar propriedades do elemento selecionado
        // Seu código aqui
    }

    addElement(type, properties = {}) {
        // Adicionar novo elemento ao editor
        // Salvar no histórico
        // Seu código aqui
    }

    selectElement(element) {
        // Selecionar elemento e mostrar propriedades
        // Seu código aqui
    }

    updateElement(element, properties) {
        // Atualizar propriedades do elemento
        // Seu código aqui
    }

    deleteElement(element) {
        // Remover elemento
        // Seu código aqui
    }

    undo() {
        // Desfazer última ação
        // Seu código aqui
    }

    redo() {
        // Refazer ação
        // Seu código aqui
    }

    saveToJSON() {
        // Serializar conteúdo para JSON
        // Seu código aqui
    }

    loadFromJSON(json) {
        // Carregar conteúdo do JSON
        // Seu código aqui
    }

    exportHTML() {
        // Exportar como HTML limpo
        // Seu código aqui
    }

    bindEvents() {
        // Vincular eventos de drag and drop, teclado, etc.
        // Seu código aqui
    }
}

// Inicializar editor
const editor = new WYSIWYGEditor('wysiwyg-editor');
```

---

## 📊 Gabarito e Dicas

### ⚡ Dicas de Performance

1. **Use DocumentFragment** para múltiplas inserções
2. **createElement vs innerHTML** - createElement é mais seguro
3. **cloneNode(true)** para templates reutilizáveis
4. **Event delegation** para elementos dinâmicos
5. **Virtual DOM** para updates eficientes

### 🎯 Padrões Comuns

```javascript
// Criação básica
const element = document.createElement('div');
element.className = 'my-class';
element.textContent = 'Content';

// Com atributos
element.setAttribute('data-id', '123');
element.setAttribute('aria-label', 'Description');

// Hierarquia
const parent = document.createElement('div');
const child = document.createElement('p');
child.textContent = 'Child content';
parent.appendChild(child);

// Fragment para performance
const fragment = document.createDocumentFragment();
items.forEach(item => {
    const element = createItem(item);
    fragment.appendChild(element);
});
container.appendChild(fragment);

// Template com função
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}
```

### 🏅 Critérios de Avaliação

* **Nível 1**: Criação correta de elementos básicos
* **Nível 2**: Uso eficiente de templates e fragmentos
* **Nível 3**: Implementação de sistemas complexos

### 📚 Recursos Extras

* [MDN createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
* [MDN DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
* [Virtual DOM Explained](https://javascript.info/virtual-dom)

---

**💡 Lembre-se**: Criação dinâmica de elementos é fundamental para aplicações modernas. Domine essas técnicas para construir interfaces reativas e eficientes!
