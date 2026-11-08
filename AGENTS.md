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
│   ├── constants.js           # Classes, seletores estáticos/dinâmicos, mensagens e config
│   ├── validacao.js           # Regra única de validação do texto (função pura)
│   ├── state.js               # Gerência pura do estado das tarefas (IDs únicos)
│   ├── storage.js             # Abstração do localStorage (salvarTarefas/carregarTarefas)
│   ├── icones.js              # SVGs estáticos da interface
│   ├── dom.js                 # Manipulação pura de DOM (createElement + textContent, sem XSS)
│   └── main.js                # Orquestração de eventos (event delegation)
│
├── 🧪 tests/
│   ├── helpers/fixtures.js    # DOM e dados reutilizáveis nos testes
│   ├── helpers/aplicacao.js   # Inicialização e ações de usuário nos testes
│   ├── contrato.test.js       # Contrato entre index.html, constantes e style.css
│   ├── validacao.test.js      # Testes unitários da regra de validação
│   ├── state.test.js          # Testes unitários de lógica de negócio (Vitest)
│   ├── storage.test.js        # Testes unitários de persistência (Vitest)
│   ├── dom.test.js            # Testes unitários de estrutura DOM e ARIA (Vitest)
│   └── main.test.js           # Testes de orquestração (fluxo completo)
│
├── 🎭 tests/e2e/              # Testes end-to-end Playwright (APENAS via Docker)
│   ├── helpers.ts             # Ações reutilizáveis via interface acessível
│   ├── aplicacao.spec.ts      # Jornadas de criação, conclusão, remoção e edição
│   ├── validacao.spec.ts      # Limites, mensagens e proteção contra XSS
│   ├── persistencia.spec.ts   # Recarga, dados inválidos e falha ao salvar
│   ├── acessibilidade-responsividade.spec.ts # Teclado e tamanhos de tela
│   ├── visual.spec.ts         # Aparência e estados visuais
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
- Atributos ARIA pontuais (`role="list"`, `aria-label`, mensagens com `role="alert"`)
- Carrega `js/main.js` como módulo ES (`<script type="module">`)
- Meta tags para charset UTF-8 e viewport (responsividade)
- Fonte Inter importada do Google Fonts
- O `maxlength` do campo acompanha `CONFIG.MAX_CARACTERES_TAREFA` (verificado por contrato)

### `style.css`

- Índice de seções no topo do arquivo
- Variáveis CSS (`:root`) para cores, cinzas e tons
- Reset CSS (`* { margin: 0; padding: 0; box-sizing: border-box }`)
- Tipografia com fonte Inter
- Layout com Flexbox
- Media queries para tablets (≤768px) e celulares (≤480px)
- Dark theme (fundo escuro por padrão)
- Estilos para estados: hover, focus, checked, edição de tarefa
- Tooltip de edição com `opacity`/`visibility` (sem `@keyframes`) e animação `slideIn` das mensagens flash

### `js/constants.js`

- `CHAVE_ARMAZENAMENTO` — Chave do localStorage (valor preservado: `"tarefas"`)
- `CLASSES` — Nomes de classe criados pelo JavaScript (fonte única para HTML/CSS/JS)
- `SELETORES_ESTATICOS` — Elementos que já existem no `index.html`
- `SELETORES_DINAMICOS` — Elementos criados pelo JavaScript em tempo de execução
- `SELETORES` — Merge dos dois anteriores
- `MENSAGENS` — Mensagens de interface e validação (limite interpolado de `CONFIG`)
- `CONFIG` — Configurações (max caracteres, delay de blur, duração da mensagem)

### `js/validacao.js`

- `validarTexto(texto)` — função pura que devolve `{ valido, texto?, motivo? }`
- Única implementação da regra de texto vazio e do limite de 100 caracteres
- Não toca no DOM, não guarda estado e não exibe mensagens

### `js/state.js`

- Gerência pura do estado (array de tarefas com IDs únicos)
- `obterTarefas()`, `adicionarTarefa()`, `removerTarefa()`, `editarTarefa()`
- `alternarConcluida()`, `obterContadores()`, `substituirTarefas()`
- Normaliza dados carregados: exige `id` inteiro positivo e descarta IDs repetidos
- Não manipula DOM, não acessa localStorage

### `js/storage.js`

- Abstração do `localStorage` (`salvarTarefas()`, `carregarTarefas()`)
- Tratamento de erros com `try/catch`
- `carregarTarefas()` devolve `unknown` (a validação fica em `state.js`)
- Não manipula DOM, não contém lógica de negócio

### `js/icones.js`

- `obterIconeLixeira()` e `obterIconeListaVazia()` — markup SVG estático
- Não toca no DOM e não conhece estado

### `js/dom.js`

- Manipulação pura de DOM (`createElement` + `textContent`, sem `innerHTML` com conteúdo do usuário)
- `criarElementoTarefa()`, `renderizarLista()`, `atualizarContadores()`
- `iniciarEdicaoTarefa()`, `atualizarCheckboxTarefa(checkbox, completa)`, `mostrarMensagem()`
- Edição inline: duplo clique ou ativação por Enter/Espaço; um editor ativo por vez
- Checkbox sem `id` gerado e sem `aria-checked` (o estado nativo já é acessível)
- Proteção contra XSS (texto do usuário inserido via `textContent`)

### `js/main.js`

- Orquestração: conecta eventos da interface com state.js, storage.js e dom.js
- Handlers nomeados (`aoSubmeterFormulario`, `aoClicarNaLista`, `aoDuploCliqueNaLista`, `aoPressionarTeclaNaLista`)
- `salvarEstado()` centraliza a persistência e avisa quando o `localStorage` falha
- `persistirERenderizar()` recria a lista; `persistirAtualizacaoIncremental()` preserva o DOM ao marcar
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

- `tests/validacao.test.js` — Regra única de validação (texto vazio, limite e normalização)
- `tests/state.test.js` — Lógica de negócio (adicionar, remover, editar, alternar, contadores)
- `tests/storage.test.js` — Persistência (salvar, carregar, dados corrompidos)
- `tests/dom.test.js` — Estrutura visual (classes, ARIA, ícones, checkbox, mensagens flash, estado vazio)
- `tests/main.test.js` — Orquestração (submit, checkbox, remoção, edição, inicialização e falha ao salvar)
- `tests/contrato.test.js` — Contrato entre `index.html`, `js/constants.js` e `style.css`
- `tests/helpers/fixtures.js` — DOM mínimo e fábrica de tarefas reutilizados nos testes
- `tests/helpers/aplicacao.js` — Inicialização e ações de usuário (enviar formulário, clicar, obter tarefa)

**Ao adicionar um seletor ou classe:** atualize `js/constants.js`. O teste de contrato avisa se o HTML, o CSS ou o DOM dos testes ficarem dessincronizados.

### Testes End-to-End (Playwright — APENAS via Docker)

**Nunca instalar Playwright localmente.** Os testes E2E devem rodar exclusivamente via container Docker:

```bash
npm run test:e2e      # Via Docker Compose (headless)
npm run test:e2e:headed # Via Docker Compose (com interface visual)
```

Os cenários E2E são separados por jornada em `tests/e2e/`. Prefira rótulos,
papéis e textos para interações; seletores CSS são apropriados para testar
estilos. Cada caso deve ser independente; testes de recarga mantêm o mesmo
contexto para verificar o `localStorage`. Regras puras e permutações extensas
de dados continuam cobertas pelo Vitest, sem duplicar cada combinação no E2E.

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
- Ao mudar um nome, procure referências em `js/`, `tests/`, `index.html`, `style.css` e na documentação

### CSS

- Índice de seções no topo do arquivo (mantenha-o atualizado ao criar uma seção)
- Variáveis CSS (`--nome-variavel`) definidas em `:root`
- Nomes de variáveis descritivos (`--blue-dark`, `--gray-600`, `--purple-dark`)
- Seções organizadas com comentários (`/* ========== SECAO ========== */`)
- Unidades: `rem` para a maioria, `px` para tamanhos pequenos específicos
- Ajustes de responsividade com media queries

### HTML

- HTML semântico (`<header>`, `<main>`, `<section>`, `<form>`)
- Atributos ARIA apenas quando acrescentam informação (evite `role` redundante)
- IDs únicos para elementos manipulados por JavaScript
- Classes CSS centralizadas em `CLASSES` quando criadas pelo JS (`tarefa`, `texto-tarefa`, `remove-btn`, etc.)

---

## ⚠️ Gotchas e Pontos de Atenção

1. **Persistência:** Os dados são salvos em `localStorage` com a chave `"tarefas"` (constante `CHAVE_ARMAZENAMENTO`). Limpar o navegador remove todos os dados.
2. **IDs únicos:** As tarefas têm um `id` próprio (não usam índices do array). Ao remover, os IDs das tarefas restantes não mudam.
3. **Renderização completa:** `renderizarLista()` usa `replaceChildren()` e recria toda a lista. O estado visual do checkbox é restaurado a partir de `tarefa.completa`.
4. **Atualização incremental:** ao marcar/desmarcar, `main.js` só atualiza o checkbox clicado e os contadores — a lista não é recriada.
5. **Modo de edição:** Só permite uma edição ativa globalmente. Iniciar outra cancela o rascunho anterior sem salvá-lo.
6. **Edição acessível:** Duplo clique ou ativação por Enter/Espaço no texto abre a edição; Enter salva, Esc cancela e blur salva após 100ms. O temporizador é cancelado ao salvar/cancelar.
7. **Sem `innerHTML` com conteúdo do usuário:** Todo texto do usuário é inserido via `textContent` para evitar XSS. `innerHTML` só é usado com os SVGs estáticos de `js/icones.js`.
8. **Checkbox sem `id`:** o checkbox é acessível pelo `aria-label` e o estado nativo substitui `aria-checked`.
9. **Classes e seletores:** use `CLASSES` e `SELETORES` de `js/constants.js`; o teste de contrato falha se o HTML ou o CSS ficarem dessincronizados.
10. **Playwright apenas via Docker:** Nunca instalar Playwright como dependência local.

---

## 🔧 Tarefas Comuns para Agentes

### Adicionar uma nova funcionalidade

1. Entenda o fluxo existente em `js/main.js` (adicionar → `persistirERenderizar()` → renderizar → atualizar contadores)
2. Adicione a função no módulo apropriado (`validacao.js` para regras puras, `state.js` para dados, `dom.js` para interface, `main.js` para eventos)
3. Siga as convenções (nome em português, JSDoc, validação via `validarTexto`)
4. Atualize `renderizarLista()` se a funcionalidade afetar a exibição das tarefas
5. Salve no `localStorage` via `storage.js` se houver mudança de dados
6. Se criar classe/seletor novo, registre em `js/constants.js`
7. Teste manualmente no navegador e rode `npm test`

### Modificar estilos

1. Edite `style.css` usando as variáveis CSS existentes (`var(--nome)`)
2. Adicione novas variáveis em `:root` se necessário
3. Mantenha a responsividade (teste em mobile e desktop)
4. Siga a organização por seções com comentários em blocos e atualize o índice do topo
5. Classes criadas pelo JS precisam existir em `CLASSES` e ter regra no CSS (teste de contrato)

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
