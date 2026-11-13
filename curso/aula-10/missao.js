// ============================================================
// MISSAO.JS — Interações simples da aula 10
// ------------------------------------------------------------
// Responsabilidade: demonstrar exemplos HTTP e desenhar Mermaid.
// NÃO faz: não envia requisições reais nem acessa dados de alunos.
// Conceitos ensinados: eventos, objetos, JSON e ciclo request/response.
// ============================================================

const exemplosHttp = {
  get: {
    titulo: 'Consulta de tarefas',
    requisicao: 'GET /api/tarefas HTTP/1.1\nAccept: application/json\nCookie: sessao=…',
    resposta: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"tarefas":[{"texto":"Estudar HTTP","completa":false}]}',
    leitura: 'GET consulta; 200 informa que a consulta deu certo.',
  },
  post: {
    titulo: 'Criação de tarefa',
    requisicao: 'POST /api/tarefas HTTP/1.1\nContent-Type: application/json\n\n{"texto":"Estudar PostgreSQL"}',
    resposta: 'HTTP/1.1 201 Created\nContent-Type: application/json\n\n{"id":"...","texto":"Estudar PostgreSQL","completa":false}',
    leitura: 'POST solicita criação; 201 informa que um novo recurso foi criado.',
  },
};

// ========== DEMONSTRACAO DE HTTP ==========

document.querySelectorAll('[data-exemplo-http]').forEach((botao) => {
  botao.addEventListener('click', () => {
    const exemplo = exemplosHttp[botao.dataset.exemploHttp];
    const saida = document.querySelector('#resultado-http');

    if (!exemplo || !saida) {
      return;
    }

    // Usamos textContent: o exemplo aparece como texto, nunca é interpretado como HTML.
    saida.textContent = `${exemplo.titulo}\n\nREQUISICAO\n${exemplo.requisicao}\n\nRESPOSTA\n${exemplo.resposta}\n\nLEITURA\n${exemplo.leitura}`;
  });
});

// ========== DIAGRAMAS MERMAID ==========

if (window.mermaid) {
  window.mermaid.initialize({
    startOnLoad: true,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: {
      primaryColor: '#e0e7ff',
      primaryTextColor: '#1f2937',
      primaryBorderColor: '#6366f1',
      lineColor: '#6366f1',
      secondaryColor: '#d1fae5',
      tertiaryColor: '#f8fafc',
    },
  });
}
