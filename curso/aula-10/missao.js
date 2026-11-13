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
    resposta:
      'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"tarefas":[{"texto":"Estudar HTTP","completa":false}]}',
    leitura: 'GET consulta; 200 informa que a consulta deu certo.',
  },
  post: {
    titulo: 'Criação de tarefa',
    requisicao:
      'POST /api/tarefas HTTP/1.1\nContent-Type: application/json\n\n{"texto":"Estudar PostgreSQL"}',
    resposta:
      'HTTP/1.1 201 Created\nContent-Type: application/json\n\n{"id":"...","texto":"Estudar PostgreSQL","completa":false}',
    leitura: 'POST solicita criação; 201 informa que um novo recurso foi criado.',
  },
  validacao: {
    titulo: 'Texto de tarefa inválido',
    requisicao: 'POST /api/tarefas HTTP/1.1\nContent-Type: application/json\n\n{"texto":"   "}',
    resposta:
      'HTTP/1.1 400 Bad Request\nContent-Type: application/json\n\n{"erro":"A tarefa deve ter entre 1 e 100 caracteres."}',
    leitura:
      '400 indica que o servidor entendeu o pedido, mas os dados não passaram pela validação.',
  },
  sessao: {
    titulo: 'Pedido sem sessão válida',
    requisicao: 'GET /api/tarefas HTTP/1.1\nAccept: application/json\nCookie: (nenhum)',
    resposta:
      'HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n{"erro":"Entre na sua conta para continuar."}',
    leitura: '401 indica que é preciso autenticar. Não significa que o servidor esteja offline.',
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

// ========== CHECKPOINT DE STATUS HTTP ==========

document.querySelector('#conferir-status')?.addEventListener('click', () => {
  const resposta = document.querySelector('#resposta-quiz-status');
  const escolha = document.querySelector('#quiz-status-criacao').value;

  if (!resposta) {
    return;
  }

  if (escolha === '201') {
    resposta.textContent = '✅ Correto! 201 Created informa que o recurso foi criado.';
  } else if (escolha) {
    resposta.textContent =
      '🧭 Ainda não. Pense no status usado quando o servidor cria um recurso novo.';
  } else {
    resposta.textContent = 'Escolha um status antes de conferir.';
  }
});

// ========== DIAGRAMAS MERMAID ==========

if (window.mermaid) {
  window.mermaid.initialize({
    startOnLoad: true,
    securityLevel: 'strict',
    theme: 'base',
    fontSize: 18,
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
