# todo-list-js

Uma aplicação de Lista de Tarefas (To-Do List) construída com HTML, CSS e JavaScript puro, com foco educacional para iniciantes em desenvolvimento web frontend.

## 🚀 Como executar

Não há dependências de runtime. Basta abrir o arquivo `index.html` em qualquer navegador moderno:

```bash
# Abrir diretamente no navegador
open index.html

# Ou usar uma extensão como "Live Server" no VS Code
```

Para rodar testes e ferramentas de qualidade, use Node.js 26.13.0 e npm 11 ou
compatíveis. Com [nvm](https://github.com/nvm-sh/nvm), entre na pasta do projeto
e ative a versão fixada:

```bash
nvm install
nvm use
npm ci
```

O `.nvmrc` fixa a versão do Node e o `.npmrc` faz o npm rejeitar versões
incompatíveis e salvar novas dependências com versões exatas. O `package-lock.json`
trava toda a árvore de dependências; após mudanças nas dependências, atualize-o
deliberadamente e valide com `npm ci`.

## 📁 Estrutura do projeto

```
todo-list-js/
├── index.html              # Página principal (HTML semântico)
├── style.css               # Estilos (variáveis CSS, Flexbox, responsivo)
├── favicon.svg             # Ícone da aba (evita o 404 de /favicon.ico)
├── vercel.json             # Cache HTTP da fonte no deploy
├── assets/
│   └── fonts/
│       ├── inter-latin.woff2 # Fonte Inter local (subset latin, variável)
│       └── OFL.txt           # Licença SIL OFL 1.1 da Inter
├── README.md               # Este arquivo
├── ARTIGO_DELEGACAO_DE_EVENTOS.md # Guia didático sobre eventos na lista
├── AGENTS.md               # Instruções para agentes de IA
├── package.json            # Scripts de desenvolvimento
├── package-lock.json       # Versões travadas (builds reprodutíveis)
├── .nvmrc                  # Versão exata do Node.js (26.13.0)
├── .npmrc                  # Versões exatas e validação estrita do Node
├── eslint.config.js        # Configuração do ESLint (flat config)
├── .prettierrc             # Configuração do Prettier
├── .prettierignore         # Arquivos ignorados pelo Prettier
├── .editorconfig           # Convenções de edição entre IDEs
├── vitest.config.js        # Configuração do Vitest
├── playwright.config.js    # Configuração do Playwright (via Docker)
├── commitlint.config.js    # Regras de mensagens Conventional Commits
├── .vercelignore           # Arquivos internos excluídos do site publicado
├── .github/workflows/
│   └── ci.yml              # CI, validação de commits e deploy via Vercel
├── js/
│   ├── constants.js        # Classes, seletores, mensagens e configurações
│   ├── validacao.js        # Regra única de validação do texto
│   ├── state.js            # Gerência do estado das tarefas
│   ├── storage.js          # Abstração do localStorage
│   ├── icones.js           # SVGs estáticos da interface
│   ├── dom.js              # Manipulação pura de DOM
│   └── main.js             # Orquestração e eventos
├── tests/
│   ├── helpers/
│   │   ├── fixtures.js     # DOM e dados reutilizáveis nos testes
│   │   └── aplicacao.js    # Inicialização e ações de usuário nos testes
│   ├── contrato.test.js    # Contrato entre HTML, constantes e CSS
│   ├── validacao.test.js   # Testes da regra de validação
│   ├── state.test.js       # Testes unitários do state.js
│   ├── storage.test.js     # Testes unitários do storage.js
│   ├── dom.test.js         # Testes de estrutura e acessibilidade do DOM
│   ├── main.test.js        # Testes de orquestração (fluxo completo)
│   └── e2e/
│       ├── package.json                      # Runner Playwright (somente no Docker)
│       ├── package-lock.json                 # Árvore E2E travada
│       ├── fixtures.ts                       # Contexto comum dos testes E2E
│       ├── helpers.ts                      # Ações comuns baseadas na interface acessível
│       ├── aplicacao.spec.ts                # Criação, conclusão, remoção e edição
│       ├── validacao.spec.ts                # Limites, mensagens e conteúdo seguro
│       ├── persistencia.spec.ts             # Recarga, dados inválidos e falha ao salvar
│       ├── acessibilidade-responsividade.spec.ts # Teclado, rótulos e tamanhos de tela
│       └── visual.spec.ts                   # Estados e estilos visuais
├── curso/                  # Material do curso (9 aulas)
└── iniciante/              # Versões simplificadas para iniciantes
```

## ⚡ Performance

- **Fonte local:** a Inter é servida de `assets/fonts/inter-latin.woff2` com
  `@font-face` e `font-display: swap`. Não há requisição ao Google Fonts, então
  nenhum CSS de terceiros bloqueia a renderização.
- **Preload:** o `.woff2` é pré-carregado no `<head>` (`rel="preload"` com
  `crossorigin`) para antecipar o download.
- **modulepreload:** os módulos ES são baixados em paralelo, sem esperar a
  descoberta em cadeia a partir de `main.js`.
- **Cache:** `vercel.json` define cache longo e imutável apenas para a fonte.
  JS e CSS continuam com a revalidação padrão da Vercel (os nomes não têm hash).

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

- **constants.js** — Fonte única de verdade: `CHAVE_ARMAZENAMENTO`, `CLASSES`, `SELETORES_ESTATICOS`, `SELETORES_DINAMICOS`, `SELETORES`, `MENSAGENS` e `CONFIG`.
- **validacao.js** — Função pura `validarTexto()` com a regra de texto vazio e limite de caracteres. Não toca no DOM.
- **state.js** — Gerencia o estado (array de tarefas com IDs únicos). Não toca no DOM nem no `localStorage`.
- **storage.js** — Abstrai o `localStorage` (`salvarTarefas` / `carregarTarefas`), com `try/catch`.
- **icones.js** — Guarda o markup estático dos ícones SVG. Não toca no DOM.
- **dom.js** — Manipulação pura de DOM (`createElement` + `textContent`, proteção contra XSS).
- **main.js** — Orquestração de eventos (usa event delegation) e ponto de entrada da aplicação.

**Seletores:** `SELETORES_ESTATICOS` são os elementos que já existem no `index.html`; `SELETORES_DINAMICOS` são os criados pelo JavaScript. `SELETORES` reúne os dois. O teste de contrato garante que HTML, constantes e CSS continuem batendo.

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

| Nome                   | Significado                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `CHAVE_ARMAZENAMENTO`  | Chave do `localStorage` (valor preservado: `'tarefas'`)           |
| `salvarTarefas`        | Salva a lista no `localStorage`                                   |
| `carregarTarefas`      | Carrega a lista do `localStorage`                                 |
| `validarTexto`         | Regra única que valida e normaliza o texto de uma tarefa          |
| `selecionar`           | Atalho para `document.querySelector`                              |
| `salvarEstado`         | Persiste o estado e avisa o usuário quando o `localStorage` falha |
| `persistirERenderizar` | Salva, redesenha a lista e atualiza contadores                    |
| `alternarConcluida`    | Alterna o estado de conclusão de uma tarefa                       |
| `iniciarEdicaoTarefa`  | Abre a edição inline (duplo clique)                               |

## 🧪 Testes

- **Unitários (Vitest):** `validacao`, `state`, `storage`, `dom` e a orquestração em `main.test.js`.
- **Contrato:** `tests/contrato.test.js` confere que os seletores existem no `index.html`, que o `maxlength` acompanha `CONFIG` e que toda classe criada pelo JavaScript tem regra no CSS.
- **Helpers:** `tests/helpers/fixtures.js` monta o DOM mínimo; `tests/helpers/aplicacao.js` inicializa a aplicação e simula ações do usuário.
- **E2E (Playwright):** `tests/e2e/` organiza cenários por jornada; interações
  preferem rótulos e papéis acessíveis, enquanto seletores CSS ficam para
  verificações visuais. A suíte roda somente via Docker com `npm run test:e2e`.
- **Imagens E2E:** `Dockerfile.playwright` usa Playwright `1.65.0` com os
  navegadores correspondentes; o servidor usa Python `3.15.2-slim-trixie`.
  Ambas as imagens são fixadas por digest, e o runner tem lockfile próprio em
  `tests/e2e/`. Atualize imagem, versão do runner e lockfile em conjunto.
- **Desempenho E2E:** o container usa quatro workers por padrão; ajuste com
  `PLAYWRIGHT_WORKERS=2 npm run test:e2e` em máquinas com menos recursos. A
  aplicação não carrega recursos externos; o primeiro build precisa acessar os
  registries para baixar as imagens e dependências fixadas.
- **Isolamento E2E:** cada teste recebe contexto de navegador isolado. Cenários
  de recarga usam a mesma página/contexto para verificar a persistência real.
- **Escopo E2E:** cobre as jornadas integradas no Chromium; validações de
  permutações de dados e regras puras permanecem nos testes Vitest.

## 🚀 CI/CD no GitHub

O workflow `.github/workflows/ci.yml` roda em pushes e PRs para `main`:

- `workflows`: valida a sintaxe do GitHub Actions com actionlint.
- `qualidade`: instala pelo `npm ci`, executa `npm run verify` e valida todas
  as mensagens novas com Commitlint (Conventional Commits).
- `e2e`: roda os testes Playwright usando Docker Compose e envia traces/screenshots
  como artefatos quando falham.
- PRs internos recebem deploy de preview no Vercel depois de todos os checks;
  pushes para `main` publicam produção. PRs de forks não recebem secrets.

### Configuração inicial do Vercel

1. Configure o projeto Vercel como **Other**, sem build command, servindo a raiz
   estática do repositório. `.vercelignore` exclui testes, configuração e
   documentação interna, preservando a aplicação, `curso/` e `iniciante/`.
2. Crie os ambientes GitHub `preview` e `production` e configure em ambos os
   secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`.
3. No ambiente `production`, restrinja deployments à branch `main`; configure
   aprovação manual se desejar uma confirmação adicional antes de publicar.
4. Se o repositório já estiver conectado ao deploy automático do Vercel,
   desative essa integração para evitar deploys duplicados.
5. Proteja `main` exigindo os checks `Sintaxe dos workflows`,
   `Qualidade e mensagens de commit` e `Testes de navegador (Docker)`.

## ♿ Acessibilidade

- O checkbox nativo já expõe o estado marcado; por isso não usamos `aria-checked` nem um `id` gerado.
- O texto de cada tarefa funciona como acionador nomeado de edição: pode ser ativado com Enter/Espaço ou duplo clique; o foco recebe destaque visível.
- Há um editor inline ativo por vez. Abrir outra tarefa descarta o rascunho anterior; Enter salva, Escape cancela e perder o foco salva após o atraso configurado.
- A lista não usa `aria-live`: como ela é recriada a cada mudança, o leitor de tela reanunciaria todas as tarefas. O feedback vem dos contadores e das mensagens flash (`role="alert"`).
- Os ícones são decorativos; a ação é descrita pelo `aria-label` do botão.

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
