# todo-list-js

Uma aplicação de Lista de Tarefas (To-Do List) construída com HTML, CSS e JavaScript puro, com foco educacional para iniciantes em desenvolvimento web frontend.

## 🚀 Como executar

Não há dependências de instalação. Basta abrir o arquivo `index.html` em qualquer navegador moderno:

```bash
# Abrir diretamente no navegador
open index.html

# Ou usar uma extensão como "Live Server" no VS Code
```

## 📁 Estrutura do projeto

```
todo-list-js/
├── index.html              # Página principal (HTML semântico)
├── style.css               # Estilos (variáveis CSS, Flexbox, responsivo)
├── README.md               # Este arquivo
├── AGENTS.md               # Instruções para agentes de IA
├── package.json            # Scripts de desenvolvimento
├── eslint.config.js        # Configuração do ESLint
├── .prettierrc             # Configuração do Prettier
├── vitest.config.js        # Configuração do Vitest
├── js/
│   ├── constants.js        # Constantes centralizadas
│   ├── state.js            # Gerência do estado das tarefas
│   ├── storage.js          # Abstração do localStorage
│   ├── dom.js              # Manipulação pura de DOM
│   └── main.js             # Orquestração e eventos
├── tests/
│   ├── state.test.js       # Testes unitários do state.js
│   └── storage.test.js     # Testes unitários do storage.js
├── curso/                  # Material do curso (9 aulas)
└── iniciante/              # Versões simplificadas para iniciantes
```

## 🛠️ Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run lint` | Verifica o código com ESLint |
| `npm run lint:fix` | Corrige problemas automaticamente com ESLint |
| `npm run format` | Formata código com Prettier |
| `npm run format:check` | Verifica formatação com Prettier |
| `npm test` | Executa testes unitários com Vitest |
| `npm run test:watch` | Executa testes em modo watch |

## 🧩 Arquitetura

O código segue separação de responsabilidades:

- **state.js** — Gerencia o estado (array de tarefas com IDs únicos)
- **storage.js** — Abstrai o `localStorage` (salvar/carregar)
- **dom.js** — Manipulação pura de DOM (`createElement` + `textContent`)
- **main.js** — Orquestração de eventos (usa event delegation)

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
3. Execute `npm run lint` e `npm run format` antes de commitar
4. Execute `npm test` para garantir que nada quebrou
5. Consulte `MELHORIAS_PARA_INICIANTES.md` para entender o foco educacional

## 📄 Licença

Livre para uso educacional.
