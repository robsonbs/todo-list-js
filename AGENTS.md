# AGENTS.md

Este arquivo fornece instruções e contexto para agentes de IA (IA agents) que trabalham neste projeto **todo-list-js**.

> **Idioma do projeto:** Português do Brasil (pt-BR)

---

## 📋 Visão Geral do Projeto

**Nome:** todo-list-js  
**Descrição:** Uma aplicação de Lista de Tarefas (To-Do List) construída com HTML, CSS e JavaScript puro, com foco educacional para iniciantes em desenvolvimento web frontend.  
**Objetivo:** Ensinar conceitos fundamentais de JavaScript (DOM, eventos, arrays, objetos, localStorage) através de um projeto prático e funcional.  
**Status:** Projeto completo e funcional, com material didático estruturado para diferentes níveis de aprendizado.

---

## 🛠️ Stack de Tecnologia

| Tecnologia        | Uso                     | Versão/Notas                                                          |
| ----------------- | ----------------------- | --------------------------------------------------------------------- |
| HTML5             | Estrutura da página     | Semântico, com atributos ARIA para acessibilidade                     |
| CSS3              | Estilização             | Custom Properties (variáveis CSS), Flexbox, Media Queries, Dark Theme |
| JavaScript (ES6+) | Lógica e interatividade | Vanilla JS, sem frameworks, manipulação do DOM, localStorage          |
| Navegador         | Runtime                 | Qualquer navegador moderno (Chrome, Firefox, Safari, Edge)            |

---

## 📁 Estrutura de Pastas e Arquivos

```
todo-list-js/
├── 📄 index.html              # Página principal (HTML semântico, acessível)
├── 🎨 style.css               # Estilos principais (CSS variáveis, flexbox, responsivo)
├── 🤖 AGENTS.md               # Este arquivo - instruções para agentes de IA
├── 📖 README.md               # Documentação completa do projeto
├── 📦 package.json            # Scripts de desenvolvimento (sem dependências locais de E2E)
├── ⚙️ eslint.config.js        # Configuração ESLint v10
├── 📝 .prettierrc             # Configuração Prettier
├── 🎭 playwright.config.js    # Configuração Playwright (apenas via Docker)
├── 🐳 Dockerfile.playwright   # Imagem Docker para testes E2E
├── 🐳 docker-compose.yml      # Orquestração servidor + Playwright (Docker)
│
├── 📂 js/                     # Módulos JavaScript (ES modules)
│   ├── constants.js           # Constantes centralizadas (seletores, mensagens, chave)
│   ├── state.js               # Gerência pura do estado das tarefas (IDs únicos)
│   ├── storage.js             # Abstração do localStorage (salvarTarefas/carregarTarefas)
│   ├── dom.js                 # Manipulação pura de DOM (createElement + textContent, sem XSS)
│   └── main.js                # Orquestração de eventos (event delegation)
│
├── 🧪 tests/
│   ├── helpers/fixtures.js    # DOM e dados reutilizáveis nos testes
│   ├── state.test.js          # Testes unitários de lógica de negócio (Vitest)
│   ├── storage.test.js        # Testes unitários de persistência (Vitest)
│   ├── dom.test.js            # Testes unitários de estrutura DOM e ARIA (Vitest)
│   └── main.test.js           # Testes de orquestração (fluxo completo)
│
├── 🎭 tests/e2e/              # Testes end-to-end Playwright (APENAS via Docker)
│   ├── visual.spec.ts         # 10 testes de validação visual
│   └── screenshots/           # Capturas de tela em caso de falha
│
├── 📚 MELHORIAS_PARA_INICIANTES.md  # Documentação das melhorias educativas
├── 📖 PLANO_CURSO_JAVASCRIPT.md     # Plano de curso de 8 aulas de JavaScript
├── 📊 RESUMO_MELHORIAS.md             # Resumo das melhorias implementadas
├── 🎉 TRABALHO_CONTINUADO_SUCESSO.md  # Resumo do trabalho continuado (9 aulas+)
├── 📂 curso/                  # Material do curso (9 aulas, exercícios, dashboard professor)
│   ├── index.html             # Navegação principal do curso
│   ├── course-navigation.js   # Sistema de navegação entre aulas
│   ├── exercicios/            # Sistema de exercícios interativos
│   ├── professor/             # Dashboard do professor (analytics, gestão)
│   └── aula-01/ até aula-09/  # 9 aulas completas
└── 📂 iniciante/              # Versões simplificadas para iniciantes absolutos
    ├── index-iniciantes.html
    ├── style-iniciantes.css
    └── scripts-iniciantes.js
```

---

## 🧩 Responsabilidades dos Arquivos Principais

### `index.html`

- Estrutura semântica da aplicação (`<header>`, `<main>`, `<section>`, `<form>`)
- Atributos ARIA para acessibilidade (`role`, `aria-label`, `aria-live`)
- Carrega `js/main.js` como módulo ES (`<script type="module">`)
- Meta tags para charset UTF-8 e viewport (responsividade)
- Fonte Inter importada do Google Fonts

### `style.css`

- Variáveis CSS (`:root`) para cores, cinzas e tons
- Reset CSS (`* { margin: 0; padding: 0; box-sizing: border-box }`)
- Tipografia com fonte Inter
- Layout com Flexbox
- Media queries para tablets (≤768px) e celulares (≤480px)
- Dark theme (fundo escuro por padrão)
- Estilos para estados: hover, focus, checked, edição de tarefa
- Animações (tooltip fadeIn, mensagens flash slideIn)

### `js/constants.js`

- `CHAVE_ARMAZENAMENTO` — Chave do localStorage (valor preservado: `"tarefas"`)
- `SELETORES` — Seletores CSS centralizados (IDs e classes)
- `MENSAGENS` — Mensagens de interface e validação
- `CONFIG` — Configurações (max caracteres, delay de blur, duração da mensagem)

### `js/state.js`

- Gerência pura do estado (array de tarefas com IDs únicos)
- `obterTarefas()`, `adicionarTarefa()`, `removerTarefa()`, `editarTarefa()`
- `toggleConcluida()`, `obterContadores()`, `substituirTarefas()`
- Não manipula DOM, não acessa localStorage

### `js/storage.js`

- Abstração do `localStorage` (`salvarTarefas()`, `carregarTarefas()`)
- Tratamento de erros com `try/catch`
- Não manipula DOM, não contém lógica de negócio

### `js/dom.js`

- Manipulação pura de DOM (`createElement` + `textContent`, sem `innerHTML` com conteúdo do usuário)
- `criarElementoTarefa()`, `renderizarLista()`, `atualizarContadores()`
- `iniciarEdicaoTarefa()`, `atualizarCheckboxTarefa()`, `mostrarMensagem()`
- Proteção contra XSS (texto do usuário inserido via `textContent`)

### `js/main.js`

- Orquestração: conecta eventos da interface com state.js, storage.js e dom.js
- Usa **event delegation** (um único listener no container para todos os eventos de tarefa)
- Ponto de entrada da aplicação (`DOMContentLoaded`)
- `inicializarAplicacao()` é exportada para permitir testes de orquestração

---

## 🚀 Como Executar / Desenvolver

Não há dependências de runtime (não usa frameworks, bundlers, etc.). As dependências de desenvolvimento (ESLint, Prettier, Vitest) só são necessárias para rodar as verificações:

```bash
npm install   # instala as ferramentas de desenvolvimento
```

```bash
# Abrir o index.html diretamente no navegador
# Ou usar uma extensão como "Live Server" no VS Code
```

**Fluxo de desenvolvimento recomendado:**

1. Abra `index.html` no navegador
2. Faça alterações em `js/*.js`, `style.css` ou `index.html`
3. Recarregue a página para ver as mudanças
4. Use o DevTools do navegador (F12) para debug e console.log

---

## 🧪 Testes

### Testes Unitários (Vitest — executar localmente)

```bash
npm test           # Executa todos os testes unitários
npm run test:watch # Modo watch
npm run verify     # Lint + formatação + testes
```

- `tests/state.test.js` — Lógica de negócio (adicionar, remover, editar, toggle, contadores)
- `tests/storage.test.js` — Persistência (salvar, carregar, dados corrompidos)
- `tests/dom.test.js` — Estrutura visual (classes, ARIA, ícones, checkbox, mensagens flash, estado vazio)
- `tests/main.test.js` — Orquestração (submit, checkbox, remoção, edição e inicialização)
- `tests/helpers/fixtures.js` — DOM mínimo e fábrica de tarefas reutilizados nos testes

### Testes End-to-End (Playwright — APENAS via Docker)

**Nunca instalar Playwright localmente.** Os testes E2E devem rodar exclusivamente via container Docker:

```bash
npm run test:e2e      # Via Docker Compose (headless)
npm run test:e2e:headed # Via Docker Compose (com interface visual)
```

O Playwright está configurado em `playwright.config.js`, `Dockerfile.playwright` e `docker-compose.yml`, mas **não é uma dependência local** do projeto.

---

## 📜 Convenções e Padrões de Código

### Idioma

- **Comentários e documentação:** Português do Brasil (pt-BR)
- **Nomes de variáveis e funções:** Português (ex: `novaTarefa`, `tarefas`, `salvarTarefasLocalStorage`)
- **Textos da interface:** Português (ex: "Adicione uma nova tarefa", "Criar", "Concluídas")

### JavaScript

- Usar `let` para variáveis que mudam, `const` para constantes
- Nomes de funções em camelCase, iniciando com verbo (`novaTarefa`, `renderizarTarefas`, `atualizarContadores`)
- Comentários JSDoc em pt-BR em funções exportadas (`@param`, `@returns`), com tipos precisos (`Tarefa`, `Tarefa[]`)
- Tratamento de erros com `try/catch` em operações de localStorage
- Validação de entrada (não permitir texto vazio, trim de espaços)
- Organização em seções com comentários em blocos (`// ========== SECAO ==========`)
- Não adicionar dependências externas (manter como Vanilla JS/HTML/CSS puro)
- IDs únicos para tarefas (não confiar em índices do array)

### Comentários didáticos

- Cada módulo começa com um cabeçalho: responsabilidade, o que **não** faz e conceitos ensinados
- Comentar o "por quê" de decisões não óbvias (ex.: `textContent` em vez de `innerHTML` contra XSS)
- Não comentar o óbvio (`// incrementa i`) nem deixar comentários desatualizados
- HTML: um comentário por bloco semântico, explicando atributos ARIA quando usados
- CSS: um comentário por seção e por grupo de propriedades

### CSS

- Variáveis CSS (`--nome-variavel`) definidas em `:root`
- Nomes de variáveis descritivos (`--blue-dark`, `--gray-600`, `--purple-dark`)
- Seções organizadas com comentários (`/* ========== SECAO ========== */`)
- Unidades: `rem` para a maioria, `px` para tamanhos pequenos específicos
- Ajustes de responsividade com media queries

### HTML

- HTML semântico (`<header>`, `<main>`, `<section>`, `<form>`)
- Atributos ARIA para acessibilidade
- IDs únicos para elementos manipulados por JavaScript
- Classes CSS para estilização (`tarefa`, `tarefas-box`, `remove-btn`, etc.)

---

## ⚠️ Gotchas e Pontos de Atenção

1. **Persistência:** Os dados são salvos em `localStorage` com a chave `"tarefas"` (constante `CHAVE_ARMAZENAMENTO`). Limpar o navegador remove todos os dados.
2. **IDs únicos:** As tarefas têm um `id` próprio (não usam índices do array). Ao remover, os IDs das tarefas restantes não mudam.
3. **Renderização completa:** `renderizarLista()` limpa e recria todo o HTML da lista. O estado visual do checkbox é restaurado via CSS `:checked`.
4. **Modo de edição:** Só permite uma edição por vez (verifica se já existe um `input` dentro do elemento de texto).
5. **Duplo clique:** O evento de duplo clique no texto da tarefa inicia a edição inline; Enter salva, Esc cancela, blur salva após 100ms.
6. **Sem `innerHTML` com conteúdo do usuário:** Todo texto do usuário é inserido via `textContent` para evitar XSS.
7. **Playwright apenas via Docker:** Nunca instalar Playwright como dependência local.

---

## 🔧 Tarefas Comuns para Agentes

### Adicionar uma nova funcionalidade

1. Entenda o fluxo existente em `js/main.js` (adicionar → `persistirERenderizar()` → renderizar → atualizar contadores)
2. Adicione a função no módulo apropriado (`state.js` para dados, `dom.js` para interface, `main.js` para eventos)
3. Siga as convenções (nome em português, JSDoc, validação)
4. Atualize `renderizarLista()` se a funcionalidade afetar a exibição das tarefas
5. Salve no `localStorage` via `storage.js` se houver mudança de dados
6. Teste manualmente no navegador e rode `npm test`

### Modificar estilos

1. Edite `style.css` usando as variáveis CSS existentes (`var(--nome)`)
2. Adicione novas variáveis em `:root` se necessário
3. Mantenha a responsividade (teste em mobile e desktop)
4. Siga a organização por seções com comentários em blocos

### Alterar textos da interface

1. Atualize em `index.html` para textos estáticos
2. Atualize em `js/dom.js` ou `js/main.js` para textos gerados dinamicamente
3. Mantenha em português do Brasil

### Depurar problemas

1. Abra o DevTools (F12) → Console para ver erros de JavaScript
2. Verifique o `localStorage` (Application → Local Storage) para dados persistidos
3. Inspecione elementos para verificar classes e IDs no DOM

---

## 🤝 Como Contribuir

1. Mantenha o código em português (comentários, nomes, textos da UI)
2. Siga as convenções de nomeação e organização existentes
3. Adicione comentários explicativos (JSDoc em funções, comentários de bloco em seções)
4. Não adicione dependências externas (manter como Vanilla JS/HTML/CSS puro)
5. Não instale Playwright localmente — testes E2E via Docker apenas
6. Execute `npm run verify` antes de commitar (lint + formatação + testes)
7. Consulte `MELHORIAS_PARA_INICIANTES.md` para entender o foco educacional do projeto
