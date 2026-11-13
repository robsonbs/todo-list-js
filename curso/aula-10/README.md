# 🚀 Aula 10 — Missão: Lista na Nuvem

Módulo prático que acompanha a evolução da lista de tarefas local para uma
aplicação web com backend Express, contas individuais e PostgreSQL.

## Para quem é

Para quem concluiu o curso inicial de JavaScript. As atividades começam do zero
em backend, HTTP, Express e banco de dados; não pressupõem conhecimento prévio
desses temas.

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

## Unidades

1. Navegador, Node.js, servidor e backend.
2. Requisições e respostas HTTP.
3. Rotas, middleware e erros com Express.
4. Tabelas, registros, chaves e relações.
5. SQL, PostgreSQL e migrações.
6. Autenticação, autorização e segurança.
7. Integração do frontend usando `fetch`.
8. Testes, ambientes e publicação.

## Segurança no laboratório

Os exemplos conceituais não substituem a configuração segura do sistema. Nunca
use senhas verdadeiras em exercícios, nunca publique segredos e nunca teste
acesso a dados de outra pessoa sem autorização. O cenário “usuário A versus
usuário B” usa somente contas e dados de teste.
