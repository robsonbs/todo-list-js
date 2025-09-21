// ===============================================
// AULA 5: CRIAÇÃO DINÂMICA DE ELEMENTOS
// Código Progressivo - Do Básico ao Avançado
// ===============================================

console.log("🎨 Aula 5: Iniciando sistema de criação dinâmica de elementos...");

// ==========================================
// PARTE 1: CREATEELEMENT E MANIPULAÇÃO BÁSICA
// ==========================================

// Container principal para demonstrações
let demoContainer = null;

// Função utilitária para log visual
function logResult(method, description, element, metadata = {}) {
  console.group(`🔧 ${method.toUpperCase()}`);
  console.log(`📝 Descrição: ${description}`);
  console.log(`🏗️ Elemento criado:`, element);
  if (Object.keys(metadata).length > 0) {
    console.log(`📊 Metadados:`, metadata);
  }
  console.groupEnd();
}

// Função para limpar área de demonstração
function clearDemo() {
  const container = document.getElementById("demoArea");
  if (container) {
    container.innerHTML = "";
    container.className = "demo-area";
  }
}

// Função para atualizar displays na interface
function updateDisplay(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    if (typeof content === "object") {
      element.innerHTML = content.outerHTML || JSON.stringify(content, null, 2);
    } else {
      element.textContent = content;
    }
  }
}

// ==========================================
// MÉTODOS BÁSICOS - CRIAÇÃO DE ELEMENTOS
// ==========================================

function demonstrarCreateElement() {
  clearDemo();

  // Criar diferentes tipos de elementos
  const div = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const input = document.createElement("input");
  const span = document.createElement("span");

  // Configurar elementos
  div.className = "demo-container";
  p.textContent = "Parágrafo criado dinamicamente!";
  button.textContent = "Botão Dinâmico";
  input.placeholder = "Digite algo...";
  span.textContent = "Span criado!";

  // Montar estrutura
  div.appendChild(p);
  div.appendChild(button);
  div.appendChild(input);
  div.appendChild(span);

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(div);
  }

  logResult("createElement", "Criação de elementos básicos", div, {
    childNodes: div.childNodes.length,
    className: div.className,
    elementos: ["div", "p", "button", "input", "span"],
  });

  updateDisplay(
    "createElementResult",
    "Elementos criados e adicionados ao DOM"
  );

  return { div, p, button, input, span };
}

function demonstrarSetAttribute() {
  clearDemo();

  // Criar elemento com atributos
  const img = document.createElement("img");
  const link = document.createElement("a");
  const input = document.createElement("input");

  // Definir atributos usando setAttribute
  img.setAttribute(
    "src",
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzRhOWVmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SU1BR0VNPC90ZXh0Pjwvc3ZnPg=="
  );
  img.setAttribute("alt", "Imagem criada dinamicamente");
  img.setAttribute("width", "100");
  img.setAttribute("height", "100");

  link.setAttribute("href", "#");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
  link.textContent = "Link Dinâmico";

  input.setAttribute("type", "email");
  input.setAttribute("required", "true");
  input.setAttribute("placeholder", "seu@email.com");
  input.setAttribute("data-validation", "email");

  // Criar container
  const container = document.createElement("div");
  container.className = "attributes-demo";
  container.appendChild(img);
  container.appendChild(document.createElement("br"));
  container.appendChild(link);
  container.appendChild(document.createElement("br"));
  container.appendChild(input);

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult("setAttribute", "Definição de atributos dinâmicos", container, {
    img: Array.from(img.attributes).map(
      (attr) => `${attr.name}="${attr.value}"`
    ),
    link: Array.from(link.attributes).map(
      (attr) => `${attr.name}="${attr.value}"`
    ),
    input: Array.from(input.attributes).map(
      (attr) => `${attr.name}="${attr.value}"`
    ),
  });

  updateDisplay(
    "setAttributeResult",
    "Elementos com atributos configurados dinamicamente"
  );

  return { img, link, input, container };
}

function demonstrarAppendChild() {
  clearDemo();

  // Criar estrutura hierárquica
  const article = document.createElement("article");
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  // Cabeçalho
  const title = document.createElement("h2");
  title.textContent = "Artigo Criado Dinamicamente";
  const subtitle = document.createElement("p");
  subtitle.textContent = "Demonstração de appendChild()";
  subtitle.className = "subtitle";

  header.appendChild(title);
  header.appendChild(subtitle);

  // Conteúdo principal
  const paragraph1 = document.createElement("p");
  paragraph1.textContent = "Este é o primeiro parágrafo do artigo.";

  const paragraph2 = document.createElement("p");
  paragraph2.textContent = "Este é o segundo parágrafo com mais conteúdo.";

  const list = document.createElement("ul");
  const items = ["Item 1", "Item 2", "Item 3"];
  items.forEach((itemText) => {
    const li = document.createElement("li");
    li.textContent = itemText;
    list.appendChild(li);
  });

  main.appendChild(paragraph1);
  main.appendChild(paragraph2);
  main.appendChild(list);

  // Rodapé
  const footerText = document.createElement("small");
  footerText.textContent = "Criado em: " + new Date().toLocaleString();
  footer.appendChild(footerText);

  // Montar artigo completo
  article.appendChild(header);
  article.appendChild(main);
  article.appendChild(footer);
  article.className = "dynamic-article";

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(article);
  }

  logResult("appendChild", "Construção hierárquica de elementos", article, {
    structure: "article > header + main + footer",
    totalElements: article.querySelectorAll("*").length,
    depth: 3,
  });

  updateDisplay(
    "appendChildResult",
    "Estrutura hierárquica criada com appendChild"
  );

  return { article, header, main, footer, list };
}

// ==========================================
// MÉTODOS INTERMEDIÁRIOS - TEMPLATES E FRAGMENTOS
// ==========================================

function demonstrarInnerHTML() {
  clearDemo();

  const container = document.createElement("div");
  container.className = "innerHTML-demo";

  // Demonstrar innerHTML com template string
  const userData = {
    name: "Maria Silva",
    email: "maria@email.com",
    age: 28,
    skills: ["JavaScript", "React", "Node.js"],
  };

  // Template usando innerHTML
  container.innerHTML = `
        <div class="user-card">
            <div class="user-header">
                <h3>${userData.name}</h3>
                <span class="user-age">${userData.age} anos</span>
            </div>
            <div class="user-contact">
                <p>📧 ${userData.email}</p>
            </div>
            <div class="user-skills">
                <h4>Habilidades:</h4>
                <ul>
                    ${userData.skills
                      .map((skill) => `<li>${skill}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="user-actions">
                <button onclick="alert('Perfil de ${
                  userData.name
                }')">Ver Perfil</button>
                <button onclick="alert('Enviando email para ${
                  userData.email
                }')">Enviar Email</button>
            </div>
        </div>
    `;

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult(
    "innerHTML",
    "Criação de elementos usando innerHTML e template strings",
    container,
    {
      method: "innerHTML",
      dataSource: "JavaScript Object",
      templating: "Template Literals",
      elementsCreated: container.querySelectorAll("*").length,
    }
  );

  updateDisplay(
    "innerHTMLResult",
    "Card de usuário criado com innerHTML e template string"
  );

  return { container, userData };
}

function demonstrarDocumentFragment() {
  clearDemo();

  // Criar fragment para performance
  const fragment = document.createDocumentFragment();

  // Dados para criar múltiplos elementos
  const products = [
    { id: 1, name: "Notebook Gamer", price: 2500, category: "Eletrônicos" },
    { id: 2, name: "Mouse RGB", price: 150, category: "Periféricos" },
    { id: 3, name: "Teclado Mecânico", price: 300, category: "Periféricos" },
    { id: 4, name: "Monitor 4K", price: 800, category: "Eletrônicos" },
    { id: 5, name: "Headset Gamer", price: 200, category: "Áudio" },
  ];

  // Criar elementos no fragment
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.id = product.id;
    productCard.dataset.category = product.category;

    const productName = document.createElement("h4");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `R$ ${product.price.toLocaleString()}`;
    productPrice.className = "price";

    const productCategory = document.createElement("span");
    productCategory.textContent = product.category;
    productCategory.className = "category";

    const addButton = document.createElement("button");
    addButton.textContent = "Adicionar ao Carrinho";
    addButton.onclick = () => alert(`${product.name} adicionado ao carrinho!`);

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productCategory);
    productCard.appendChild(addButton);

    // Adicionar ao fragment (não ao DOM ainda)
    fragment.appendChild(productCard);
  });

  // Criar container principal
  const container = document.createElement("div");
  container.className = "products-grid";

  // Adicionar fragment ao container (uma única operação DOM)
  container.appendChild(fragment);

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult(
    "documentFragment",
    "Criação otimizada com DocumentFragment",
    container,
    {
      productsCount: products.length,
      domOperations: 1,
      performance: "Otimizada",
      elementsCreated: container.children.length,
    }
  );

  updateDisplay(
    "fragmentResult",
    `${products.length} produtos criados com DocumentFragment (1 operação DOM)`
  );

  return { container, fragment, products };
}

function demonstrarCloneNode() {
  clearDemo();

  // Criar template base
  const templateCard = document.createElement("div");
  templateCard.className = "notification-card template";
  templateCard.innerHTML = `
        <div class="notification-header">
            <span class="notification-icon">📬</span>
            <span class="notification-title">Título</span>
            <button class="close-btn">×</button>
        </div>
        <div class="notification-body">
            <p class="notification-message">Mensagem da notificação</p>
            <small class="notification-time">Agora</small>
        </div>
    `;

  // Dados para notificações
  const notifications = [
    {
      title: "Nova Mensagem",
      message: "Você recebeu uma nova mensagem",
      icon: "💬",
      type: "info",
    },
    {
      title: "Tarefa Concluída",
      message: "Sua tarefa foi concluída com sucesso!",
      icon: "✅",
      type: "success",
    },
    {
      title: "Aviso",
      message: "Memória do sistema está baixa",
      icon: "⚠️",
      type: "warning",
    },
    {
      title: "Erro",
      message: "Falha na conexão com o servidor",
      icon: "❌",
      type: "error",
    },
  ];

  const container = document.createElement("div");
  container.className = "notifications-container";

  // Clonar template para cada notificação
  notifications.forEach((notif, index) => {
    // Clonar o template (true = deep clone)
    const notificationCard = templateCard.cloneNode(true);
    notificationCard.className = `notification-card ${notif.type}`;

    // Personalizar conteúdo
    notificationCard.querySelector(".notification-icon").textContent =
      notif.icon;
    notificationCard.querySelector(".notification-title").textContent =
      notif.title;
    notificationCard.querySelector(".notification-message").textContent =
      notif.message;
    notificationCard.querySelector(".notification-time").textContent = `${
      index + 1
    } min atrás`;

    // Adicionar evento de fechar
    const closeBtn = notificationCard.querySelector(".close-btn");
    closeBtn.onclick = () => {
      notificationCard.style.animation = "slideOut 0.3s ease-in-out";
      setTimeout(() => notificationCard.remove(), 300);
    };

    container.appendChild(notificationCard);
  });

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult(
    "cloneNode",
    "Clonagem de template para múltiplos elementos",
    container,
    {
      template: "notification-card",
      clones: notifications.length,
      deepClone: true,
      customization: "Dynamic content replacement",
    }
  );

  updateDisplay(
    "cloneNodeResult",
    `${notifications.length} notificações criadas clonando template`
  );

  return { container, templateCard, notifications };
}

// ==========================================
// COMPONENTES REUTILIZÁVEIS
// ==========================================

function createComponent(type, props = {}, children = []) {
  const element = document.createElement(type);

  // Aplicar propriedades
  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "onClick") {
      element.onclick = value;
    } else if (key.startsWith("data-")) {
      element.setAttribute(key, value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else {
      element[key] = value;
    }
  });

  // Adicionar filhos
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

function demonstrarComponentes() {
  clearDemo();

  // Componente Button
  function Button(text, variant = "primary", onClick = null) {
    return createComponent("button", {
      className: `btn btn-${variant}`,
      textContent: text,
      onClick: onClick || (() => alert(`Botão ${text} clicado!`)),
    });
  }

  // Componente Card
  function Card(title, content, actions = []) {
    const header = createComponent("div", { className: "card-header" }, [
      createComponent("h3", {}, [title]),
    ]);

    const body = createComponent("div", { className: "card-body" }, [
      createComponent("p", {}, [content]),
    ]);

    const footer = createComponent("div", { className: "card-footer" });
    actions.forEach((action) => footer.appendChild(action));

    return createComponent("div", { className: "card" }, [
      header,
      body,
      footer,
    ]);
  }

  // Componente TodoItem
  function TodoItem(todo) {
    const checkbox = createComponent("input", {
      type: "checkbox",
      checked: todo.completed,
      onChange: () => {
        todo.completed = !todo.completed;
        item.classList.toggle("completed", todo.completed);
      },
    });

    const text = createComponent("span", {
      className: "todo-text",
      textContent: todo.text,
    });

    const deleteBtn = Button("🗑️", "danger", () => {
      if (confirm("Deletar tarefa?")) {
        item.remove();
      }
    });

    const item = createComponent(
      "div",
      {
        className: `todo-item ${todo.completed ? "completed" : ""}`,
        "data-id": todo.id,
      },
      [checkbox, text, deleteBtn]
    );

    return item;
  }

  // Demonstração dos componentes
  const container = createComponent("div", { className: "components-demo" });

  // Seção de botões
  const buttonsSection = createComponent("div", { className: "section" }, [
    createComponent("h3", {}, ["Componentes Button"]),
    Button("Primário", "primary"),
    Button("Secundário", "secondary"),
    Button("Sucesso", "success"),
    Button("Perigo", "danger"),
  ]);

  // Seção de cards
  const cardsSection = createComponent("div", { className: "section" }, [
    createComponent("h3", {}, ["Componentes Card"]),
    Card("Card 1", "Este é o conteúdo do primeiro card.", [
      Button("Ação 1", "primary"),
      Button("Ação 2", "secondary"),
    ]),
    Card("Card 2", "Este é o conteúdo do segundo card.", [
      Button("Salvar", "success"),
      Button("Cancelar", "danger"),
    ]),
  ]);

  // Seção de todos
  const todosSection = createComponent("div", { className: "section" }, [
    createComponent("h3", {}, ["Componentes TodoItem"]),
    TodoItem({ id: 1, text: "Aprender componentes", completed: false }),
    TodoItem({ id: 2, text: "Criar elementos dinamicamente", completed: true }),
    TodoItem({ id: 3, text: "Implementar TODO List", completed: false }),
  ]);

  container.appendChild(buttonsSection);
  container.appendChild(cardsSection);
  container.appendChild(todosSection);

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult("componentes", "Sistema de componentes reutilizáveis", container, {
    components: ["Button", "Card", "TodoItem"],
    reusability: "High",
    props: "Configurable",
    composition: "Hierarchical",
  });

  updateDisplay(
    "componentesResult",
    "Sistema de componentes funcionais implementado"
  );

  return { container, Button, Card, TodoItem, createComponent };
}

// ==========================================
// TEMPLATE ENGINE SIMPLES
// ==========================================

class SimpleTemplateEngine {
  constructor() {
    this.templates = new Map();
  }

  // Registrar template
  register(name, template) {
    this.templates.set(name, template);
  }

  // Renderizar template com dados
  render(templateName, data = {}) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' não encontrado`);
    }

    // Substituição simples de variáveis
    let html = template;

    // Substituir variáveis simples {{ variavel }}
    html = html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : "";
    });

    // Substituir loops {{ #each array }}...{{ /each }}
    html = html.replace(
      /\{\{\s*#each\s+(\w+)\s*\}\}([\s\S]*?)\{\{\s*\/each\s*\}\}/g,
      (match, arrayKey, content) => {
        const array = data[arrayKey];
        if (!Array.isArray(array)) return "";

        return array
          .map((item) => {
            let itemContent = content;
            // Substituir variáveis do item
            Object.keys(item).forEach((key) => {
              const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
              itemContent = itemContent.replace(regex, item[key]);
            });
            return itemContent;
          })
          .join("");
      }
    );

    // Substituir condicionais {{ #if condition }}...{{ /if }}
    html = html.replace(
      /\{\{\s*#if\s+(\w+)\s*\}\}([\s\S]*?)\{\{\s*\/if\s*\}\}/g,
      (match, condition, content) => {
        return data[condition] ? content : "";
      }
    );

    return html;
  }

  // Renderizar e inserir no DOM
  renderToElement(templateName, data, targetElement) {
    const html = this.render(templateName, data);
    if (targetElement) {
      targetElement.innerHTML = html;
    }
    return html;
  }
}

function demonstrarTemplateEngine() {
  clearDemo();

  const engine = new SimpleTemplateEngine();

  // Registrar templates
  engine.register(
    "userProfile",
    `
        <div class="user-profile">
            <div class="user-avatar">👤</div>
            <h2>{{ name }}</h2>
            <p class="user-email">{{ email }}</p>
            {{ #if isAdmin }}
                <span class="admin-badge">ADMIN</span>
            {{ /if }}
            <div class="user-stats">
                <div class="stat">
                    <span class="stat-label">Posts</span>
                    <span class="stat-value">{{ posts }}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Seguidores</span>
                    <span class="stat-value">{{ followers }}</span>
                </div>
            </div>
        </div>
    `
  );

  engine.register(
    "todoList",
    `
        <div class="todo-list">
            <h3>{{ title }}</h3>
            <div class="todo-items">
                {{ #each items }}
                    <div class="todo-item {{ status }}">
                        <input type="checkbox" {{ checked }}>
                        <span>{{ text }}</span>
                        <span class="priority {{ priority }}">{{ priority }}</span>
                    </div>
                {{ /each }}
            </div>
        </div>
    `
  );

  engine.register(
    "productGrid",
    `
        <div class="product-grid">
            <h3>{{ category }}</h3>
            <div class="products">
                {{ #each products }}
                    <div class="product-card">
                        <h4>{{ name }}</h4>
                        <p class="price">R$ {{ price }}</p>
                        <p class="description">{{ description }}</p>
                        {{ #if inStock }}
                            <button class="buy-btn">Comprar</button>
                        {{ /if }}
                    </div>
                {{ /each }}
            </div>
        </div>
    `
  );

  // Dados para os templates
  const userData = {
    name: "João Silva",
    email: "joao@email.com",
    isAdmin: true,
    posts: 42,
    followers: 1337,
  };

  const todoData = {
    title: "Minha Lista de Tarefas",
    items: [
      {
        text: "Estudar JavaScript",
        status: "completed",
        checked: "checked",
        priority: "high",
      },
      {
        text: "Fazer exercícios",
        status: "pending",
        checked: "",
        priority: "medium",
      },
      {
        text: "Revisar código",
        status: "pending",
        checked: "",
        priority: "low",
      },
    ],
  };

  const productData = {
    category: "Eletrônicos",
    products: [
      {
        name: "Smartphone",
        price: "899,00",
        description: "Smartphone com 128GB",
        inStock: true,
      },
      {
        name: "Tablet",
        price: "599,00",
        description: "Tablet 10 polegadas",
        inStock: false,
      },
      {
        name: "Laptop",
        price: "1899,00",
        description: "Laptop para trabalho",
        inStock: true,
      },
    ],
  };

  // Renderizar templates
  const container = document.createElement("div");
  container.className = "template-engine-demo";

  const userSection = document.createElement("div");
  userSection.innerHTML = engine.render("userProfile", userData);

  const todoSection = document.createElement("div");
  todoSection.innerHTML = engine.render("todoList", todoData);

  const productSection = document.createElement("div");
  productSection.innerHTML = engine.render("productGrid", productData);

  container.appendChild(userSection);
  container.appendChild(todoSection);
  container.appendChild(productSection);

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult("templateEngine", "Template Engine customizado", container, {
    templates: Array.from(engine.templates.keys()),
    features: ["Variables", "Loops", "Conditionals"],
    performance: "Client-side rendering",
  });

  updateDisplay(
    "templateEngineResult",
    "Templates renderizados com engine customizado"
  );

  return { engine, container, userData, todoData, productData };
}

// ==========================================
// VIRTUAL DOM SIMPLES
// ==========================================

class SimpleVirtualDOM {
  constructor() {
    this.vdom = null;
    this.realDOM = null;
  }

  // Criar representação virtual
  createElement(type, props = {}, ...children) {
    return {
      type,
      props: props || {},
      children: children.flat(),
    };
  }

  // Renderizar virtual DOM para real DOM
  render(vnode) {
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(vnode);
    }

    const element = document.createElement(vnode.type);

    // Aplicar propriedades
    Object.entries(vnode.props).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });

    // Renderizar filhos
    vnode.children.forEach((child) => {
      element.appendChild(this.render(child));
    });

    return element;
  }

  // Diff simples entre virtual DOMs
  diff(oldVNode, newVNode) {
    const patches = [];

    if (!oldVNode) {
      patches.push({ type: "CREATE", vnode: newVNode });
    } else if (!newVNode) {
      patches.push({ type: "REMOVE" });
    } else if (oldVNode.type !== newVNode.type) {
      patches.push({ type: "REPLACE", vnode: newVNode });
    } else {
      // Diff propriedades
      const propChanges = this.diffProps(oldVNode.props, newVNode.props);
      if (propChanges.length > 0) {
        patches.push({ type: "UPDATE_PROPS", changes: propChanges });
      }

      // Diff filhos
      const childPatches = this.diffChildren(
        oldVNode.children,
        newVNode.children
      );
      if (childPatches.length > 0) {
        patches.push({ type: "UPDATE_CHILDREN", patches: childPatches });
      }
    }

    return patches;
  }

  diffProps(oldProps, newProps) {
    const changes = [];
    const allKeys = new Set([
      ...Object.keys(oldProps),
      ...Object.keys(newProps),
    ]);

    allKeys.forEach((key) => {
      if (oldProps[key] !== newProps[key]) {
        changes.push({ key, value: newProps[key] });
      }
    });

    return changes;
  }

  diffChildren(oldChildren, newChildren) {
    const patches = [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      const childPatches = this.diff(oldChildren[i], newChildren[i]);
      if (childPatches.length > 0) {
        patches.push({ index: i, patches: childPatches });
      }
    }

    return patches;
  }

  // Aplicar patches no DOM real
  patch(realDOM, patches) {
    patches.forEach((patch) => {
      switch (patch.type) {
        case "CREATE":
          realDOM.appendChild(this.render(patch.vnode));
          break;
        case "REMOVE":
          realDOM.remove();
          break;
        case "REPLACE":
          realDOM.replaceWith(this.render(patch.vnode));
          break;
        case "UPDATE_PROPS":
          patch.changes.forEach((change) => {
            if (change.key === "className") {
              realDOM.className = change.value;
            } else {
              realDOM.setAttribute(change.key, change.value);
            }
          });
          break;
        case "UPDATE_CHILDREN":
          patch.patches.forEach((childPatch) => {
            this.patch(realDOM.children[childPatch.index], childPatch.patches);
          });
          break;
      }
    });
  }
}

function demonstrarVirtualDOM() {
  clearDemo();

  const vdom = new SimpleVirtualDOM();

  // Estado da aplicação
  let state = {
    counter: 0,
    todos: [
      { id: 1, text: "Aprender Virtual DOM", completed: false },
      { id: 2, text: "Implementar diff algorithm", completed: true },
    ],
    showCompleted: true,
  };

  // Função para criar virtual DOM baseado no estado
  function createVirtualDOM(state) {
    return vdom.createElement(
      "div",
      { className: "virtual-dom-app" },
      vdom.createElement("h3", {}, "Virtual DOM Demo"),

      // Contador
      vdom.createElement(
        "div",
        { className: "counter-section" },
        vdom.createElement("h4", {}, "Contador: " + state.counter),
        vdom.createElement(
          "button",
          {
            onclick: () => updateState({ counter: state.counter + 1 }),
          },
          "Incrementar"
        ),
        vdom.createElement(
          "button",
          {
            onclick: () => updateState({ counter: state.counter - 1 }),
          },
          "Decrementar"
        )
      ),

      // Lista de TODOs
      vdom.createElement(
        "div",
        { className: "todos-section" },
        vdom.createElement("h4", {}, "TODOs"),
        vdom.createElement(
          "button",
          {
            onclick: () =>
              updateState({
                showCompleted: !state.showCompleted,
              }),
          },
          state.showCompleted ? "Ocultar Concluídos" : "Mostrar Concluídos"
        ),

        ...state.todos
          .filter((todo) => state.showCompleted || !todo.completed)
          .map((todo) =>
            vdom.createElement(
              "div",
              {
                className: `todo-item ${todo.completed ? "completed" : ""}`,
                key: todo.id,
              },
              vdom.createElement("input", {
                type: "checkbox",
                checked: todo.completed,
                onchange: () => toggleTodo(todo.id),
              }),
              vdom.createElement("span", {}, todo.text)
            )
          )
      )
    );
  }

  // Função para atualizar estado
  function updateState(newState) {
    const oldVDOM = currentVDOM;
    state = { ...state, ...newState };
    currentVDOM = createVirtualDOM(state);

    // Calcular diff
    const patches = vdom.diff(oldVDOM, currentVDOM);
    console.log("Virtual DOM Patches:", patches);

    // Aplicar patches
    vdom.patch(container, patches);

    updateDisplay(
      "virtualDOMResult",
      `Estado atualizado - Patches aplicados: ${patches.length}`
    );
  }

  // Função para toggle de TODO
  function toggleTodo(id) {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateState({ todos: newTodos });
  }

  // Renderização inicial
  let currentVDOM = createVirtualDOM(state);
  const container = vdom.render(currentVDOM);
  container.className = "virtual-dom-container";

  // Adicionar ao DOM
  const demoArea = document.getElementById("demoArea");
  if (demoArea) {
    demoArea.appendChild(container);
  }

  logResult("virtualDOM", "Sistema Virtual DOM com diff algorithm", container, {
    state: Object.keys(state),
    features: ["State Management", "Diff Algorithm", "Efficient Updates"],
    performance: "Optimized DOM operations",
  });

  return { vdom, container, state, updateState };
}

// ==========================================
// SISTEMA TODO COMPLETO COM CRIAÇÃO DINÂMICA
// ==========================================

class DynamicTodoSystem {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.todos = [
      {
        id: 1,
        text: "Aprender createElement",
        completed: true,
        priority: "high",
        category: "study",
      },
      {
        id: 2,
        text: "Implementar componentes",
        completed: false,
        priority: "medium",
        category: "code",
      },
      {
        id: 3,
        text: "Testar Virtual DOM",
        completed: false,
        priority: "low",
        category: "test",
      },
    ];
    this.nextId = 4;
    this.filters = { status: "all", category: "all", priority: "all" };

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  createElement(tag, props = {}, ...children) {
    const element = document.createElement(tag);

    Object.entries(props).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key.startsWith("on")) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key.startsWith("data-")) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });

    return element;
  }

  createTodoItem(todo) {
    const checkbox = this.createElement("input", {
      type: "checkbox",
      checked: todo.completed,
      onchange: () => this.toggleTodo(todo.id),
    });

    const text = this.createElement(
      "span",
      {
        className: "todo-text",
        ondblclick: () => this.editTodo(todo.id),
      },
      todo.text
    );

    const priority = this.createElement(
      "span",
      {
        className: `priority priority-${todo.priority}`,
      },
      todo.priority
    );

    const category = this.createElement(
      "span",
      {
        className: "category",
      },
      todo.category
    );

    const editBtn = this.createElement(
      "button",
      {
        className: "btn btn-edit",
        onclick: () => this.editTodo(todo.id),
      },
      "✏️"
    );

    const deleteBtn = this.createElement(
      "button",
      {
        className: "btn btn-delete",
        onclick: () => this.deleteTodo(todo.id),
      },
      "🗑️"
    );

    const actions = this.createElement(
      "div",
      {
        className: "todo-actions",
      },
      editBtn,
      deleteBtn
    );

    return this.createElement(
      "div",
      {
        className: `todo-item ${todo.completed ? "completed" : ""}`,
        "data-id": todo.id,
        "data-priority": todo.priority,
        "data-category": todo.category,
      },
      checkbox,
      text,
      priority,
      category,
      actions
    );
  }

  createAddForm() {
    const textInput = this.createElement("input", {
      type: "text",
      placeholder: "Nova tarefa...",
      className: "todo-input",
      id: "newTodoText",
    });

    const prioritySelect = this.createElement(
      "select",
      {
        className: "priority-select",
        id: "newTodoPriority",
      },
      this.createElement("option", { value: "low" }, "Baixa"),
      this.createElement(
        "option",
        { value: "medium", selected: true },
        "Média"
      ),
      this.createElement("option", { value: "high" }, "Alta")
    );

    const categorySelect = this.createElement(
      "select",
      {
        className: "category-select",
        id: "newTodoCategory",
      },
      this.createElement("option", { value: "study" }, "Estudo"),
      this.createElement("option", { value: "code" }, "Código"),
      this.createElement("option", { value: "test" }, "Teste"),
      this.createElement("option", { value: "other" }, "Outro")
    );

    const addBtn = this.createElement(
      "button",
      {
        className: "btn btn-add",
        onclick: () => this.addTodo(),
      },
      "➕ Adicionar"
    );

    return this.createElement(
      "div",
      {
        className: "add-todo-form",
      },
      textInput,
      prioritySelect,
      categorySelect,
      addBtn
    );
  }

  createFilters() {
    const statusFilter = this.createElement(
      "select",
      {
        className: "filter-select",
        onchange: (e) => this.updateFilter("status", e.target.value),
      },
      this.createElement("option", { value: "all" }, "Todas"),
      this.createElement("option", { value: "pending" }, "Pendentes"),
      this.createElement("option", { value: "completed" }, "Concluídas")
    );

    const categoryFilter = this.createElement(
      "select",
      {
        className: "filter-select",
        onchange: (e) => this.updateFilter("category", e.target.value),
      },
      this.createElement("option", { value: "all" }, "Todas Categorias"),
      this.createElement("option", { value: "study" }, "Estudo"),
      this.createElement("option", { value: "code" }, "Código"),
      this.createElement("option", { value: "test" }, "Teste"),
      this.createElement("option", { value: "other" }, "Outro")
    );

    const priorityFilter = this.createElement(
      "select",
      {
        className: "filter-select",
        onchange: (e) => this.updateFilter("priority", e.target.value),
      },
      this.createElement("option", { value: "all" }, "Todas Prioridades"),
      this.createElement("option", { value: "high" }, "Alta"),
      this.createElement("option", { value: "medium" }, "Média"),
      this.createElement("option", { value: "low" }, "Baixa")
    );

    return this.createElement(
      "div",
      {
        className: "filters",
      },
      this.createElement("h4", {}, "Filtros:"),
      statusFilter,
      categoryFilter,
      priorityFilter
    );
  }

  createStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;
    const pending = total - completed;

    return this.createElement(
      "div",
      {
        className: "stats",
      },
      this.createElement(
        "div",
        { className: "stat" },
        this.createElement("span", { className: "stat-label" }, "Total"),
        this.createElement(
          "span",
          { className: "stat-value" },
          total.toString()
        )
      ),
      this.createElement(
        "div",
        { className: "stat" },
        this.createElement("span", { className: "stat-label" }, "Concluídas"),
        this.createElement(
          "span",
          { className: "stat-value" },
          completed.toString()
        )
      ),
      this.createElement(
        "div",
        { className: "stat" },
        this.createElement("span", { className: "stat-label" }, "Pendentes"),
        this.createElement(
          "span",
          { className: "stat-value" },
          pending.toString()
        )
      )
    );
  }

  getFilteredTodos() {
    return this.todos.filter((todo) => {
      const statusMatch =
        this.filters.status === "all" ||
        (this.filters.status === "completed" && todo.completed) ||
        (this.filters.status === "pending" && !todo.completed);

      const categoryMatch =
        this.filters.category === "all" ||
        todo.category === this.filters.category;

      const priorityMatch =
        this.filters.priority === "all" ||
        todo.priority === this.filters.priority;

      return statusMatch && categoryMatch && priorityMatch;
    });
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = "";

    const header = this.createElement("h2", {}, "Sistema TODO Dinâmico");
    const addForm = this.createAddForm();
    const filters = this.createFilters();
    const stats = this.createStats();

    const todosList = this.createElement("div", { className: "todos-list" });
    const filteredTodos = this.getFilteredTodos();

    if (filteredTodos.length === 0) {
      todosList.appendChild(
        this.createElement(
          "p",
          {
            className: "empty-message",
          },
          "Nenhuma tarefa encontrada"
        )
      );
    } else {
      filteredTodos.forEach((todo) => {
        todosList.appendChild(this.createTodoItem(todo));
      });
    }

    this.container.appendChild(header);
    this.container.appendChild(addForm);
    this.container.appendChild(filters);
    this.container.appendChild(stats);
    this.container.appendChild(todosList);
  }

  addTodo() {
    const textInput = document.getElementById("newTodoText");
    const prioritySelect = document.getElementById("newTodoPriority");
    const categorySelect = document.getElementById("newTodoCategory");

    const text = textInput.value.trim();
    if (!text) return;

    const newTodo = {
      id: this.nextId++,
      text,
      completed: false,
      priority: prioritySelect.value,
      category: categorySelect.value,
    };

    this.todos.push(newTodo);
    textInput.value = "";
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  deleteTodo(id) {
    if (confirm("Deletar esta tarefa?")) {
      this.todos = this.todos.filter((t) => t.id !== id);
      this.render();
    }
  }

  editTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      const newText = prompt("Editar tarefa:", todo.text);
      if (newText !== null && newText.trim()) {
        todo.text = newText.trim();
        this.render();
      }
    }
  }

  updateFilter(type, value) {
    this.filters[type] = value;
    this.render();
  }

  bindEvents() {
    // Eventos globais se necessário
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.id === "newTodoText") {
        this.addTodo();
      }
    });
  }
}

// ==========================================
// INICIALIZAÇÃO E EVENTOS DOM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM carregado, inicializando sistema de criação dinâmica...");

  // Configurar botões de demonstração
  const demos = {
    createElementBtn: demonstrarCreateElement,
    setAttributeBtn: demonstrarSetAttribute,
    appendChildBtn: demonstrarAppendChild,
    innerHTMLBtn: demonstrarInnerHTML,
    fragmentBtn: demonstrarDocumentFragment,
    cloneNodeBtn: demonstrarCloneNode,
    componentesBtn: demonstrarComponentes,
    templateEngineBtn: demonstrarTemplateEngine,
    virtualDOMBtn: demonstrarVirtualDOM,
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

  // Inicializar sistema TODO dinâmico
  window.dynamicTodoSystem = new DynamicTodoSystem("dynamicTodoContainer");

  // Botão de reset
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearDemo();
      console.log("🔄 Área de demonstração limpa");
      updateDisplay(
        "statusDisplay",
        "Demonstrações resetadas! Clique nos botões para ver as funcionalidades."
      );
    });
  }

  // Demonstração automática inicial
  setTimeout(() => {
    console.log("🎭 Sistema de criação dinâmica carregado!");
    updateDisplay(
      "statusDisplay",
      "Sistema carregado! Explore as demonstrações de criação dinâmica de elementos."
    );
  }, 1000);
});

// ==========================================
// FUNCIONES GLOBAIS PARA CONSOLE
// ==========================================

// Tornar funções disponíveis no console para experimentação
window.dynamicElements = {
  demonstrarCreateElement,
  demonstrarSetAttribute,
  demonstrarAppendChild,
  demonstrarInnerHTML,
  demonstrarDocumentFragment,
  demonstrarCloneNode,
  demonstrarComponentes,
  demonstrarTemplateEngine,
  demonstrarVirtualDOM,
  clearDemo,
  createComponent,
  SimpleTemplateEngine,
  SimpleVirtualDOM,
  DynamicTodoSystem,
};

// Log de inicialização
console.log(
  "✅ Sistema de criação dinâmica da Aula 5 carregado completamente!"
);
console.log("🎯 Use window.dynamicElements para acessar as demonstrações");
console.log(
  "🏗️ Use window.dynamicTodoSystem para interagir com o TODO dinâmico"
);
console.log("🚀 Explore createElement, templates, componentes e Virtual DOM!");
