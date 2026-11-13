# 🚀 Aula 10 — Missão: Lista na Nuvem

Módulo prático que acompanha a evolução da lista de tarefas local para uma
aplicação web com backend Express, contas individuais e PostgreSQL.

## Para quem é

Para quem concluiu o curso inicial de JavaScript. Só pressupomos contato com
variáveis, funções, DOM, eventos e persistência local. HTTP é revisado com
detalhes e nenhum conhecimento de backend, Express, SQL ou banco de dados é
exigido.

## Como usar

1. Abra [`index.html`](index.html) em um navegador conectado à internet para ver
   os diagramas Mermaid e interagir com os exemplos HTTP.
2. Leia [`plano-aula.md`](plano-aula.md) para acompanhar os objetivos e a ordem
   sugerida.
3. Faça os desafios de [`exercicios.md`](exercicios.md) antes de consultar o
   gabarito.
4. Consulte [`guia-api.md`](guia-api.md) para relacionar verbos HTTP, rotas,
   respostas e consultas ao banco.
5. Acompanhe cada unidade com a implementação correspondente do projeto.

## Laboratório local do banco

Na etapa de PostgreSQL, com Node.js 26.13.0 e Docker disponíveis:

```bash
cp .env.example .env
docker compose --env-file .env.example -f docker-compose.web.yml up -d banco-web
docker compose --env-file .env.example -f docker-compose.web.yml run --rm migrar
npm run dev
```

Como alternativa, a aplicação e o Node.js também podem rodar dentro do Docker:

```bash
docker compose --env-file .env.example -f docker-compose.web.yml --profile aplicacao up app-web
```

O `docker-compose.web.yml` usa somente um PostgreSQL local de desenvolvimento.
Os valores de `.env.example` são didáticos e não podem ser reaproveitados em
produção. As migrações registram quais arquivos SQL já foram aplicados. No modo
local, `EMAIL_MODE=console` mostra o link de confirmação no terminal do servidor;
isso existe apenas para o laboratório. Produção exige SMTP e segredos novos.

Os testes de integração usam um banco isolado, sem volume persistente, dentro do
Docker Compose:

```bash
npm run test:integration:docker
```

Os diagramas Mermaid são renderizados pela biblioteca carregada pela página. O
texto-fonte e uma interpretação em português acompanham cada diagrama. A
ilustração SVG principal funciona sem JavaScript.

## Trilha de dez unidades

1. Navegador, Node.js, terminal, servidor e backend.
2. Anatomia de requisições e respostas HTTP.
3. Express: servidor, rotas, middleware, validação e erros.
4. Tabelas, registros, chaves, relações e restrições.
5. PostgreSQL, consultas SQL e operações CRUD.
6. API, driver `pg`, pool de conexões, migrações e transações.
7. Cadastro, hash de senha, sessão e cookies.
8. Autorização, CSRF, XSS, SQL injection e HTTPS.
9. `fetch`, estados de tela, sessão expirada e importação local.
10. Testes, Docker e checklist de produção.

## Segurança no laboratório

Os exemplos conceituais não substituem a configuração segura do sistema. Nunca
use senhas verdadeiras em exercícios, nunca publique segredos e nunca teste
acesso a dados de outra pessoa sem autorização. O cenário “usuário A versus
usuário B” usa somente contas e dados de teste.
