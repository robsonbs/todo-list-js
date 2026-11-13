# Caderno de missões — Aula 10

Resolva na ordem: cada desafio usa o vocabulário da unidade anterior. Tente
responder antes de abrir a dica e o gabarito. Use somente dados fictícios e o
banco local de testes.

## Missão 1 — Ache o servidor

Associe cada peça ao lugar onde roda:

- HTML que mostra o formulário;
- JavaScript que atualiza a página;
- processo Express que recebe `POST /api/tarefas`;
- PostgreSQL que conserva os registros.

Depois responda: se a aba fecha, qual processo deixa de existir? Qual ainda
pode atender outro computador quando estiver publicado?

<details><summary>Dica</summary>Separe a máquina da pessoa dos processos que rodam no host remoto.</details>

## Missão 2 — Monte o envelope HTTP

Leia o pedido:

```http
POST /api/tarefas?origem=curso HTTP/1.1
Content-Type: application/json
Accept: application/json
Cookie: tarefas.sid=...
X-CSRF-Token: ...

{"texto":"Revisar HTTP"}
```

Identifique método, caminho, query, dois cabeçalhos e corpo. Qual informação
**não** deve ser adicionada ao corpo para escolher o proprietário da tarefa?

## Missão 3 — O status não é uma falha de rede

`fetch()` recebe uma resposta `401` do servidor. O código entrou no `catch`?
Qual propriedade deve ser conferida para saber se o status HTTP foi sucesso?
Qual mensagem é melhor para a pessoa: “servidor offline” ou “entre novamente”?

## Missão 4 — Endereço, query, cabeçalho ou corpo?

Na requisição da missão 2, classifique `POST`, `/api/tarefas`,
`?origem=curso`, `Content-Type` e `{"texto":"Revisar HTTP"}`. Qual desses
valores o servidor deve usar para descobrir a pessoa dona da tarefa?

## Missão 5 — Ordene a central Express

Coloque na ordem e explique por que:

- conferir a sessão;
- receber a requisição;
- responder com JSON;
- interpretar o corpo JSON;
- validar o texto;
- consultar o banco.

Complete o papel de cada objeto na rota:

```js
app.post('/api/tarefas', async (__________, __________) => {
  const texto = requisicao.body.texto;
  resposta.status(201).json({ texto });
});
```

## Missão 6 — Desenhe o fichário PostgreSQL

Uma pessoa tem muitas tarefas. Proponha as tabelas `usuarios` e `tarefas` e
marque:

1. a chave primária de cada tabela;
2. a chave estrangeira que liga a tarefa à pessoa;
3. uma regra para impedir e-mails repetidos;
4. uma regra para impedir tarefas vazias.

Explique com palavras como ler `USUARIOS ||--o{ TAREFAS` no Mermaid: o que é um
nó/caixa e o que a relação diz sobre a quantidade?

## Missão 7 — Faça CRUD sem furar o banco

Associe cada operação SQL à intenção:

```sql
SELECT ... FROM tarefas WHERE usuario_id = $1;
INSERT INTO tarefas (usuario_id, texto) VALUES ($1, $2);
UPDATE tarefas SET completa = true WHERE id = $1 AND usuario_id = $2;
DELETE FROM tarefas WHERE id = $1 AND usuario_id = $2;
```

1. Qual comando lê, cria, atualiza e remove?
2. Por que os valores usam `$1` e `$2` em vez de concatenar texto no SQL?
3. Na transação da importação, o que ocorre se o terceiro `INSERT` falhar depois
   de dois terem passado: `COMMIT` ou `ROLLBACK`?
4. Para que serve uma migração e por que não executar o mesmo arquivo toda vez?

## Missão 8 — Quem entrou e o que pode fazer?

Classifique cada pergunta como **autenticação** ou **autorização**:

- “Quem é a conta desta sessão?”
- “Esta conta pode remover a tarefa 81?”

Explique por que o banco guarda o hash da senha e não o texto original. O que o
navegador guarda depois do login: a senha, os dados da sessão ou um identificador
de cookie que aponta para a sessão do servidor?

## Missão 9 — Defesa em camadas

Associe risco e defesa:

| Risco                                                     | Defesa disponível |
| --------------------------------------------------------- | ----------------- |
| Texto de tarefa vira HTML executável                      | ?                 |
| Site externo tenta enviar um formulário usando sua sessão | ?                 |
| Ana tenta alterar tarefa de Bruno trocando o ID           | ?                 |
| Texto malicioso muda o comando SQL                        | ?                 |
| Cookie de sessão viaja sem HTTPS                          | ?                 |

Use as opções: filtrar pelo usuário da sessão; placeholders SQL; `textContent` e
CSP; token CSRF e `SameSite`; cookie `Secure` em HTTPS.

## Missão 10 — Despache com `fetch`

Qual informação precisa acompanhar um `POST /api/tarefas` além do texto? Escreva
os nomes de dois cabeçalhos e explique o que significam. Depois organize o fluxo:

1. mostrar a mensagem de erro quando `resposta.ok` é falso;
2. esperar a resposta;
3. enviar método `POST`, corpo JSON, cookie same-origin e token CSRF;
4. converter JSON de sucesso e atualizar a lista.

Por fim, explique por que a importação do `localStorage` pede uma ação explícita.
Esta aplicação serve tela e API na mesma origem; se fossem domínios diferentes,
que regra do navegador entraríamos para estudar? Por que liberar qualquer origem
com cookies não seria uma boa correção?

## Missão 11 — Pronto para o lançamento?

Classifique cada verificação como **unitária**, **integração** ou **E2E**:

- validar uma função que conta até 100 caracteres;
- provar que Ana não lê tarefa de Bruno via API/PostgreSQL;
- abrir a interface no Chromium e verificar que o formulário aparece.

Marque os itens que faltam antes de produção: HTTPS, SMTP real, segredos novos,
banco separado de testes, migrações aplicadas, backups com restauração ensaiada,
domínio e provedor de hospedagem. O curso usa um provedor específico? (Não: essa
decisão ainda deve ser feita.)

<details>
  <summary>Gabarito comentado</summary>

1. HTML/JS rodam no navegador; Express é o processo backend; PostgreSQL é o
   serviço que conserva dados. Fechar a aba encerra o cliente; não encerra um
   servidor remoto publicado.
2. Método `POST`; caminho `/api/tarefas`; query `origem=curso`; cabeçalhos
   `Content-Type`, `Accept`, `Cookie` e `X-CSRF-Token`; o texto está no corpo.
   O corpo não escolhe o usuário dono. O backend deriva esse ID da sessão.
3. `fetch` recebe a resposta normalmente; `resposta.ok` é falso para 401. A tela
   deve dizer que é preciso entrar novamente, não que a rede caiu.
4. Método `POST`; caminho, query, cabeçalhos e corpo têm funções diferentes.
   O backend obtém o proprietário da sessão, não do corpo ou query.
5. Receber → interpretar JSON → conferir sessão → validar → consultar → responder.
   Os argumentos são `requisicao` e `resposta`. Em código real, as rotas públicas
   de cadastro/login têm outro fluxo.
6. `usuarios.id` e `tarefas.id` são PK; `tarefas.usuario_id` é FK; `email UNIQUE`
   impede repetição; `CHECK` impede texto vazio. No Mermaid, caixas são tabelas,
   linhas são registros e `||--o{` indica uma conta com zero ou muitas tarefas.
7. `SELECT` lê, `INSERT` cria, `UPDATE` altera, `DELETE` remove. Placeholders
   separam dados de código e ajudam a impedir SQL injection. Em falha, a
   transação usa `ROLLBACK`; migração versionada registra mudança uma vez e
   permite que ambientes compartilhem o mesmo esquema.
8. A primeira pergunta é autenticação; a segunda é autorização. Argon2id permite
   comparar senhas sem guardar o texto original. O navegador recebe o cookie
   identificador; a sessão e o usuário ficam no servidor.
9. XSS → `textContent`/CSP; CSRF → token e `SameSite`; acesso cruzado → filtro
   pela sessão; SQL injection → parâmetros; tráfego → cookie `Secure` e HTTPS.
   Defesa em uma camada não substitui as demais.
10. `Content-Type: application/json` descreve o corpo; `X-CSRF-Token` prova que a
    ação veio da página legítima. Ordem: 3 → 2 → 1 → 4. Importar explicitamente
    evita misturar dados locais com a conta errada sem a pessoa saber. Como a tela
    e a API têm a mesma origem, CORS não precisa ser aberto; liberar qualquer
    origem com credenciais seria arriscado.
11. Função de validação é unitária; API e banco são integração; navegador é E2E.
    Antes da publicação, configurar e verificar os itens de produção. O curso
    não escolhe nem configura uma hospedagem real automaticamente.

</details>
