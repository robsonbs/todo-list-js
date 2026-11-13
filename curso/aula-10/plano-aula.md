# Plano de Aula 10 — Missão: Lista na Nuvem

## Público e pré-requisitos

Alunos que concluíram o curso inicial de JavaScript. Presume-se familiaridade
com variáveis, funções, DOM, eventos, arrays, objetos e `fetch` básico, mas não
com backend, servidores, HTTP em profundidade, bancos de dados, Express ou SQL.

## Objetivo geral

Construir gradualmente o modelo mental e as habilidades para transformar uma
lista local em uma aplicação web com backend Express, persistência PostgreSQL e
listas isoladas por usuário.

## Objetivos de aprendizagem

Ao concluir o módulo, o aluno deverá conseguir:

- descrever cliente, servidor, backend e banco em uma aplicação web;
- decompor uma requisição e uma resposta HTTP e interpretar status comuns;
- reconhecer rotas e middleware em uma aplicação Express;
- explicar tabelas, linhas, chaves e relações em um banco relacional;
- escrever e compreender SQL básico parametrizado;
- distinguir autenticação de autorização e explicar o isolamento por usuário;
- integrar a interface a uma API e tratar resultados assíncronos;
- identificar segredos e configurações que não podem ser publicados no frontend.

## Metodologia lúdica

Usar a narrativa de uma missão de entrega: o navegador prepara um pedido, HTTP é
o transporte, Express é a central que confere o destino e PostgreSQL é o arquivo
persistente. Após cada metáfora, apresentar o nome técnico e um exemplo real.
Intercalar explicação curta, demonstração visual, desafio individual e
construção guiada.

## Roteiro sugerido — oito encontros de 50 minutos

| Encontro | Roteiro | Produto de aprendizagem |
| --- | --- | --- |
| 1. O servidor | 5 min: missão; 10 min: navegador versus Node; 15 min: processo, porta e localhost; 15 min: mapear componentes; 5 min: saída | Diagrama cliente-servidor anotado |
| 2. HTTP | 5 min: revisão de `fetch`; 15 min: request e response; 15 min: métodos, cabeçalhos, JSON e status; 10 min: detetive HTTP; 5 min: síntese | Requisição e resposta descritas por partes |
| 3. Express | 5 min: missão de entregas; 10 min: servidor e rota; 15 min: middleware; 10 min: validação/erros; 10 min: montar fluxo | Rota GET e POST explicadas |
| 4. Banco relacional | 5 min: o que a memória local não resolve; 15 min: tabela/linha/coluna; 15 min: PK/FK/relacionamento; 10 min: organizar cartões; 5 min: revisão | Modelo `usuarios` e `tarefas` desenhado |
| 5. PostgreSQL e SQL | 5 min: modelo relacional; 15 min: CRUD; 10 min: parâmetros e SQL injection; 10 min: migrações e restrições; 10 min: desafio de consultas | Consultas seguras para listar e criar tarefas |
| 6. Identidade e proteção | 5 min: autenticação x autorização; 15 min: hash e sessão; 15 min: cookies, CSRF, XSS; 10 min: desafio A/B; 5 min: revisão | Regras que impedem acesso cruzado |
| 7. Integração | 5 min: percurso do pedido; 15 min: `fetch` e JSON; 15 min: carregamento/erro; 10 min: migração explícita de dados; 5 min: teste | Interface funcionando contra API local |
| 8. Publicação | 5 min: ambiente local x produção; 15 min: HTTPS e variáveis; 10 min: teste de isolamento; 10 min: backup; 10 min: apresentação da missão | Checklist de publicação e demonstração |

## Avaliação formativa

- Pedir ao aluno que narre o percurso de uma tarefa do clique ao banco e de
  volta.
- Conferir se identifica o dono da tarefa como dado determinado pela sessão,
  não pelo formulário.
- Usar desafios pequenos em vez de uma prova de memorização de sintaxe.
- Avaliar o raciocínio de segurança, inclusive respostas como “não sei; vou
  verificar”, sem incentivar testes contra sistemas alheios.

## Recursos e acessibilidade

- SVG com título, descrição e legenda para o fluxo entre navegador, Express e
  PostgreSQL.
- Mermaid para sequência HTTP, modelo relacional e operação autenticada.
- Cada Mermaid deve ser acompanhado de interpretação que explique os nós, o
  sentido das setas e o principal aprendizado.
- Diagramas e atividades devem ter alternativa textual, funcionar em telas
  estreitas e ser navegáveis por teclado.
- Preservar o estilo visual das aulas 8 e 9: gradiente roxo, cartões claros,
  navegação do curso e leiaute responsivo.
