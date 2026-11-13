# Plano de Aula 10 — Missão: Lista na Nuvem

## Público e pré-requisitos

Pessoas que concluíram o curso inicial de JavaScript. Podem conhecer HTML,
CSS, funções, objetos, arrays, DOM, eventos e `localStorage`. O módulo revisa
requisições do navegador desde o começo: **não presume** conhecimento de
backend, servidores, HTTP em profundidade, Express, bancos de dados, SQL ou
PostgreSQL.

## Objetivo geral

Construir, em etapas, uma lista web com backend Express, PostgreSQL, contas
individuais e autorização aplicada no servidor. Cada conceito novo deve aparecer
na interface ou no código do projeto antes de avançar.

## Resultados de aprendizagem

Ao concluir, o aluno deverá conseguir:

1. Diferenciar navegador, Node.js, backend, API e banco de dados.
2. Ler uma requisição e uma resposta HTTP, incluindo cabeçalhos, corpo e status.
3. Explicar como uma rota Express e seus middlewares processam uma requisição.
4. Modelar usuários e tarefas com chaves e restrições relacionais.
5. Ler e escrever SQL CRUD parametrizado e explicar migrações e transações.
6. Distinguir autenticação de autorização e explicar sessão, cookie e hash.
7. Integrar a interface à API com `fetch`, verificando status e tratando falhas.
8. Demonstrar, com duas contas de teste, que uma pessoa não acessa as tarefas da outra.
9. Identificar segredos e requisitos que precisam ser configurados antes de produção.

## Método: uma missão por encontro

Cada encontro segue o mesmo roteiro visual:

1. **Briefing:** situação do usuário e objetivo do encontro.
2. **Mapa:** SVG ou Mermaid com texto alternativo e leitura guiada.
3. **Demonstração:** código curto, com cada linha nova explicada.
4. **Missão guiada:** alterar ou completar uma parte do projeto.
5. **Checkpoint:** pergunta de compreensão antes da próxima unidade.
6. **Desafio opcional:** variação para quem terminou antes.

As metáforas de “correio”, “central” e “arquivo” ajudam a imaginar o sistema,
mas cada explicação também apresenta o termo técnico. Evitar introduzir vários
termos novos no mesmo parágrafo.

## Sequência detalhada — dez encontros de 50 minutos

| Encontro                       | Conteúdo desde o início                                                                                                                 | Atividade lúdica e demonstração                                                                               | Entrega / critério de compreensão                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1. O servidor                  | Navegador versus Node.js; terminal; processo; porta; `localhost`; frontend, backend e runtime                                           | Mapa de peças: colocar a tela, Express e banco no lugar certo; iniciar o servidor e localizar a rota de saúde | O aluno explica por que fechar a página não desliga um servidor remoto e distingue Node.js de npm     |
| 2. O correio HTTP              | Request line, URL, método, cabeçalhos, corpo, JSON, response line e status; path, query e headers                                       | Detetive HTTP: separar cartões de uma requisição e montar a resposta correspondente                           | Consegue explicar um `POST /api/tarefas` e diferenciar 201, 400, 401, 403, 404 e 500                  |
| 3. Express por dentro          | Criar app; `listen`; rotas; `req`/`res`; `express.json`; parâmetros; middleware; erros                                                  | Central de entregas: ordenar receber → interpretar → validar → autorizar → responder                          | Consegue localizar uma rota GET/POST e explicar por que middleware precisa da ordem certa             |
| 4. Organizar um banco          | Tabela, linha, coluna, tipo, chave primária/estrangeira, cardinalidade e restrições                                                     | Cartões de usuários e tarefas: encontrar duplicação e desenhar a ligação 1-para-muitos                        | Produz o modelo `usuarios` → `tarefas` e lê a legenda do Mermaid, inclusive PK/FK/UK                  |
| 5. PostgreSQL e SQL            | PostgreSQL versus SQL; conectar ao banco; `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `RETURNING` e placeholders                   | Bibliotecária SQL: selecionar, criar, concluir e remover apenas o registro solicitado                         | Escreve CRUD básico e explica por que `$1` recebe valores separados do comando                        |
| 6. API, migrações e transações | Driver `pg`; pool; REST; consulta por usuário; migrações; `BEGIN`, `COMMIT`, `ROLLBACK`; índice                                         | Entrega completa: acompanhar um clique até o `INSERT`; simular falha no meio de uma importação                | Consegue ligar uma rota Express à consulta e explicar como uma transação evita importação parcial     |
| 7. Criar uma conta             | Cadastro; confirmação de e-mail; Argon2id; hash versus criptografia; sessão; cookie; expiração e recuperação                            | Cofre da missão: comparar senha, hash e identificador de sessão                                               | Explica por que não se salva senha e por que login regenera a sessão                                  |
| 8. Autorizar e defender        | Usuário autenticado versus autorizado; propriedade; SQL injection; XSS; CSRF; `HttpOnly`, `Secure`, `SameSite`; rate limit; CSP e HTTPS | Desafio A/B: mudar um ID e observar que o backend ainda recusa a tarefa de outra conta                        | Indica onde cada defesa acontece e afirma que ocultar um botão não é autorização                      |
| 9. Ligar a tela à API          | `fetch`; JSON; cookies same-origin; token CSRF; `response.ok`; estados de carregamento, erro e sessão expirada; importação local        | Correio em ação: enviar GET e POST, observar Network e recuperar a interface de um erro                       | Implementa uma ação que atualiza a tela só após resposta de sucesso e importa dados com consentimento |
| 10. Testar e publicar          | Teste unitário, integração e E2E; Docker; variáveis de ambiente; SMTP; migrações de release; HTTPS; backup/restauração; provedor        | Auditoria de lançamento: procurar uma credencial exposta e montar checklist de produção                       | Explica quais testes provam isolamento e quais serviços/segredos ainda faltam para o deploy real      |

### Distribuição de tempo por encontro

- 5 min — missão e revisão do encontro anterior;
- 10 min — conceito e vocabulário;
- 10 min — diagrama e interpretação passo a passo;
- 15 min — demonstração/código guiado;
- 7 min — missão individual ou em dupla;
- 3 min — checkpoint e saída.

Em encontros com laboratório SQL ou autenticação, permitir mais tempo de prática
e deixar o desafio opcional para casa.

## Vocabulário que deve aparecer antes do primeiro uso

`cliente`, `servidor`, `backend`, `API`, `runtime`, `porta`, `requisição`,
`resposta`, `cabeçalho`, `corpo`, `status`, `rota`, `middleware`, `tabela`,
`registro`, `chave primária`, `chave estrangeira`, `migração`, `transação`,
`autenticação`, `autorização`, `hash`, `sessão` e `token CSRF`.

Quando um termo reaparecer, usar o mesmo significado e apontar para o glossário
na página do módulo.

## Recursos visuais e acessibilidade

- SVG do percurso navegador → Express → PostgreSQL com `<title>`, `<desc>` e legenda.
- Mermaid para sequência HTTP, modelo relacional e operação autenticada.
- Imediatamente após **cada** Mermaid, explicar os participantes/nós, o sentido
  das setas e o aprendizado esperado em prosa pt-BR.
- Se a biblioteca de diagramas não carregar, a interpretação e o texto-fonte
  continuam visíveis; nenhuma instrução importante existe só na imagem.
- Manter o gradiente roxo, cartões e responsividade das aulas 8/9, mas priorizar
  contraste, texto de corpo legível, parágrafos curtos e foco de teclado visível.

## Avaliação formativa

- Pedir que o aluno narre uma tarefa completa: clique → request → rota → validação
  → sessão → SQL → response → atualização da tela.
- Usar contas fictícias em toda demonstração de autorização.
- Para cada checkpoint, oferecer uma dica antes do gabarito; avaliar raciocínio,
  não memorização de nomes de métodos.
- Não incentivar testes em sistemas ou contas de terceiros.

## Critério para considerar a aula completa

Um aluno que conhece somente o curso inicial consegue executar o laboratório,
explicar o diagrama e completar uma tarefa pela aplicação local; consegue também
mostrar, por teste, que duas contas não compartilham tarefas. A publicação pública
só entra no critério final depois de escolhido e configurado um provedor real.
