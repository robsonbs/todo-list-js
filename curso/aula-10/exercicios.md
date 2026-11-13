# Exercícios — Missão: Lista na Nuvem

Tente resolver cada desafio antes de abrir o gabarito. Use somente dados de
teste e o ambiente local do projeto.

## 1. Detetive de HTTP

Leia a requisição:

```http
POST /api/tarefas HTTP/1.1
Content-Type: application/json

{"texto":"Revisar HTTP"}
```

1. Qual é o método?
2. Qual caminho foi solicitado?
3. Para que serve `Content-Type`?
4. Qual status indicaria que uma tarefa foi criada?

## 2. Rota ou middleware?

Coloque estas etapas na ordem mais segura:

- gravar a tarefa no PostgreSQL;
- verificar a sessão;
- validar o texto recebido;
- responder com JSON e status;
- receber a requisição.

## 3. Modelagem de dados

Uma pessoa pode ter muitas tarefas. Desenhe as tabelas `usuarios` e `tarefas`.
Marque a chave primária de cada tabela e a chave estrangeira que liga cada
tarefa à pessoa dona dela.

## 4. Complete a consulta

Complete a condição para retornar somente as tarefas do usuário autenticado:

```sql
SELECT id, texto, completa
FROM tarefas
WHERE usuario_id = $1;
```

De onde deve vir o valor passado como `$1`: do campo oculto da página ou da
sessão verificada no servidor? Explique.

## 5. Cenário de segurança

Ana está autenticada e troca o identificador de uma tarefa na URL para tentar
abrir uma tarefa de Bruno. O que a API deve fazer? Em que camada deve ocorrer a
verificação?

## 6. Fluxo de erro

O navegador chama `GET /api/tarefas`, mas a sessão expirou. Qual status HTTP é
adequado para informar que é necessário autenticar novamente? O que a interface
deve mostrar para a pessoa?

<details>
  <summary>Gabarito comentado</summary>

1. `POST`; `/api/tarefas`; o cabeçalho diz que o corpo está em JSON; `201 Created`.
2. Receber → verificar sessão → validar entrada → gravar → responder. Rotas
   públicas, como cadastro/login, terão fluxo próprio.
3. `usuarios.id` é chave primária; `tarefas.id` também. `tarefas.usuario_id`
   referencia `usuarios.id`.
4. `$1` recebe o identificador derivado da sessão autenticada. Um campo enviado
   pela página pode ser alterado pela pessoa cliente e não é autoridade.
5. A API deve responder sem revelar o conteúdo e restringir a consulta ao usuário
   autenticado. A decisão é no backend, em toda operação, nunca apenas na tela.
6. `401 Unauthorized` para sessão ausente/expirada; a interface explica que a
   sessão terminou e oferece entrar novamente, preservando uma mensagem clara.

</details>
