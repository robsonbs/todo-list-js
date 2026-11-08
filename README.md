# todo-list-js

Uma aplicação de Lista de Tarefas (To-Do List) construída com HTML, CSS e JavaScript puro, com foco educacional para iniciantes em desenvolvimento web frontend.

## 🚀 Como executar

Não há dependências de runtime. Basta abrir o arquivo `index.html` em qualquer navegador moderno:

```bash
# Abrir diretamente no navegador
open index.html

# Ou usar uma extensão como "Live Server" no VS Code
```

Para rodar testes e ferramentas de qualidade, instale as dependências de desenvolvimento:

```bash
npm install
```

## 📁 Estrutura do projeto

```
todo-list-js/
├── index.html              # Página principal (HTML semântico)
├── style.css               # Estilos (variáveis CSS, Flexbox, responsivo)
├── README.md               # Este arquivo
├── AGENTS.md               # Instruções para agentes de IA
├── package.json            # Scripts de desenvolvimento
├── package-lock.json       # Versões travadas (builds reprodutíveis)
├── eslint.config.js        # Configuração do ESLint (flat config)
├── .prettierrc             # Configuração do Prettier
├── .prettierignore         # Arquivos ignorados pelo Prettier
├── .editorconfig           # Convenções de edição entre IDEs
├── vitest.config.js        # Configuração do Vitest
├── playwright.config.js    # Configuração do Playwright (via Docker)
├── js/
│   ├── constants.js        # Constantes centralizadas
│   ├── state.js            # Gerência do estado das tarefas
│   ├── storage.js          # Abstração do localStorage
│   ├── dom.js              # Manipulação pura de DOM
│   └── main.js             # Orquestração e eventos
├── tests/
│   ├── helpers/
│   │   └── fixtures.js     # DOM e dados reutilizáveis nos testes
│   ├── state.test.js       # Testes unitários do state.js
│   ├── storage.test.js     # Testes unitários do storage.js
│   ├── dom.test.js         # Testes de estrutura e acessibilidade do DOM
│   ├── main.test.js        # Testes de orquestração (fluxo completo)
│   └── e2e/
│       └── visual.spec.ts  # Testes end-to-end (Playwright via Docker)
├── curso/                  # Material do curso (9 aulas)
└── iniciante/              # Versões simplificadas para iniciantes
```

## 🛠️ Scripts disponíveis

| Script                 | Descrição                                         |
| ---------------------- | ------------------------------------------------- |
| `npm run lint`         | Verifica todo o projeto com ESLint                |
| `npm run lint:fix`     | Corrige problemas automaticamente com ESLint      |
| `npm run format`       | Formata o projeto com Prettier                    |
| `npm run format:check` | Verifica formatação com Prettier                  |
| `npm test`             | Executa testes unitários com Vitest               |
| `npm run test:watch`   | Executa testes em modo watch                      |
| `npm run verify`       | Roda lint + formatação + testes (validação geral) |
| `npm run test:e2e`     | Executa testes E2E via Docker Compose             |

> **Playwright somente via Docker.** Nunca instale o Playwright localmente.
> Use `npm run test:e2e` para subir o servidor e o navegador no container.

## 🧩 Arquitetura

O código segue separação de responsabilidades:

- **constants.js** — Fonte única de verdade: `CHAVE_ARMAZENAMENTO`, `SELETORES`, `MENSAGENS` e `CONFIG`.
- **state.js** — Gerencia o estado (array de tarefas com IDs únicos). Não toca no DOM nem no `localStorage`.
- **storage.js** — Abstrai o `localStorage` (`salvarTarefas` / `carregarTarefas`), com `try/catch`.
- **dom.js** — Manipulação pura de DOM (`createElement` + `textContent`, proteção contra XSS).
- **main.js** — Orquestração de eventos (usa event delegation) e ponto de entrada da aplicação.

### Fluxo de dados

```
Usuário → main.js → state.js → storage.js
                 ↘ dom.js (renderiza)
```

1. O usuário interage (submit, clique ou duplo clique).
2. `main.js` valida e chama a operação correspondente em `state.js`.
3. O estado é persistido com `storage.js` e renderizado por `dom.js`.
4. Os contadores são sincronizados a partir de `state.obterContadores()`.

### Glossário de nomes

| Nome                   | Significado                                             |
| ---------------------- | ------------------------------------------------------- |
| `CHAVE_ARMAZENAMENTO`  | Chave do `localStorage` (valor preservado: `'tarefas'`) |
| `salvarTarefas`        | Salva a lista no `localStorage`                         |
| `carregarTarefas`      | Carrega a lista do `localStorage`                       |
| `selecionar`           | Atalho para `document.querySelector`                    |
| `persistirERenderizar` | Salva, redesenha a lista e atualiza contadores          |
| `iniciarEdicaoTarefa`  | Abre a edição inline (duplo clique)                     |

## 💬 Padrão de comentários

Os comentários fazem parte do material didático e seguem um padrão:

- Cabeçalho em cada módulo: responsabilidade, o que **não** faz e conceitos ensinados.
- JSDoc em pt-BR em todas as funções exportadas (`@param` / `@returns`).
- Banners de seção (`// ========== SEÇÃO ==========`) para facilitar a busca.
- Comentários de "por quê" em decisões não óbvias (ex.: `textContent` contra XSS).
- HTML: um comentário por bloco semântico, explicando ARIA quando usado.
- CSS: um comentário por seção e por grupo de propriedades.

Evite comentários que apenas repetem o código e mantenha-os atualizados após refatorações.

## ✅ Funcionalidades

- Adicionar tarefas (clique ou Enter)
- Marcar como concluída/pendente (checkbox)
- Deletar tarefas
- Editar tarefas (duplo clique, Enter/Esc/blur)
- Persistência automática no `localStorage`
- Contadores de tarefas criadas e concluídas
- Interface responsiva (mobile e desktop)
- Dark theme
- Feedback visual (mensagens flash)

## 🤝 Contribuindo

1. Mantenha o código em português do Brasil (comentários, nomes, mensagens)
2. Siga as convenções do `AGENTS.md`
3. Execute `npm run verify` antes de commitar
4. Consulte `MELHORIAS_PARA_INICIANTES.md` para entender o foco educacional

## 📄 Licença

Livre para uso educacional.
