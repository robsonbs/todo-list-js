# Guia de API — Correio entre a interface e o backend

Este guia relaciona o que o aluno vê na interface com as rotas Express e o
PostgreSQL. Os exemplos são locais; não cole senhas reais em terminal, aula
gravada ou captura de tela.

## Mapa das rotas

| Método e caminho                 | Exige conta? | Resultado principal         | Ideia HTTP                                         |
| -------------------------------- | ------------ | --------------------------- | -------------------------------------------------- |
| `GET /api/health`                | Não          | Estado do processo          | Consulta sem alterar dados                         |
| `GET /api/csrf-token`            | Não          | Token CSRF e cookies locais | Prepara uma sessão segura para formulários         |
| `POST /api/auth/registrar`       | Não          | Instrução de confirmação    | Recebe dados para criar uma conta                  |
| `POST /api/auth/confirmar-email` | Não          | Confirmação de e-mail       | Token é de uso único e tem validade limitada       |
| `POST /api/auth/login`           | Não          | Sessão de usuário           | O servidor renova o identificador da sessão        |
| `GET /api/auth/me`               | Não          | Estado da sessão atual      | Consulta quem está autenticado                     |
| `POST /api/auth/logout`          | Sessão atual | Encerra a sessão            | A sessão do servidor é removida                    |
| `POST /api/auth/esqueci-senha`   | Não          | Mensagem genérica           | Não revela se o e-mail está cadastrado             |
| `POST /api/auth/redefinir-senha` | Não          | Confirmação de troca        | Usa token de uso único e revoga sessões anteriores |
| `GET /api/tarefas`               | Sim          | Tarefas da sessão           | O servidor filtra pela pessoa autenticada          |
| `POST /api/tarefas`              | Sim          | Nova tarefa (`201`)         | Criação de um recurso                              |
| `PATCH /api/tarefas/:id`         | Sim          | Tarefa atualizada           | Alteração parcial                                  |
| `DELETE /api/tarefas/:id`        | Sim          | Sem corpo (`204`)           | Remoção do recurso próprio                         |
| `POST /api/tarefas/importar`     | Sim          | Quantidade importada        | Importação local única por conta                   |

Toda alteração enviada pelo navegador inclui o token CSRF no cabeçalho
`X-CSRF-Token`. A sessão viaja em cookie `HttpOnly`; o JavaScript não lê nem
armazena o identificador de sessão.

## Do pedido à consulta

Uma criação chega como `POST /api/tarefas` com JSON. O Express primeiro confere
CSRF e sessão; a rota valida o texto e então envia parâmetros separados do SQL:

```sql
INSERT INTO tarefas (usuario_id, texto)
VALUES ($1, $2)
RETURNING id, texto, completa, criada_em;
```

`$1` vem da sessão que o servidor verificou; `$2` é o texto validado. O driver
envia os valores separadamente, em vez de concatená-los no comando SQL. Isso
evita tratar o texto da tarefa como código SQL.

## Interpretando respostas

- `200 OK`: consulta ou atualização concluída.
- `201 Created`: recurso criado.
- `204 No Content`: operação concluída sem corpo de resposta.
- `400 Bad Request`: dados enviados não passaram pela validação.
- `401 Unauthorized`: sessão ausente ou expirada.
- `403 Forbidden`: token CSRF ausente ou inválido.
- `404 Not Found`: tarefa inexistente **ou que pertence a outra pessoa**. A API
  usa a mesma resposta para não revelar que um registro alheio existe.
- `409 Conflict`: a importação local daquela conta já foi realizada.

## Perguntas para acompanhar a depuração

1. Qual método e caminho aparecem no painel Network do navegador?
2. O corpo enviado é JSON? Qual status voltou?
3. A consulta inclui `usuario_id = $1`? De onde o servidor obteve esse valor?
4. Se alguém alterar o ID da tarefa no endereço, que resposta deve receber?

Teste de isolamento somente com duas contas fictícias no banco de teste isolado:

```bash
npm run test:integration:docker
```

O teste confirma que cada usuário lista apenas as próprias tarefas e recebe
`404` ao tentar atualizar ou remover a tarefa de outra conta.
