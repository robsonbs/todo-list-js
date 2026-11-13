// ============================================================
// APP.JS — Primeira conversa da interface com a API
// ------------------------------------------------------------
// Responsabilidade: mostrar o resultado da rota de saúde.
// NÃO faz: não guarda credenciais nem envia tarefas ainda.
// Conceitos ensinados: fetch, JSON, resposta HTTP e estado de carregamento.
// ============================================================

const estadoServidor = document.querySelector('#estado-servidor');

try {
  const resposta = await fetch('/api/health', {
    headers: { Accept: 'application/json' },
  });

  if (!resposta.ok) {
    throw new Error('A API respondeu com um erro.');
  }

  const dados = await resposta.json();
  estadoServidor.textContent = `✅ Servidor ${dados.status}: ${dados.servico}`;
} catch {
  estadoServidor.textContent =
    'Não foi possível conversar com o servidor. Tente novamente mais tarde.';
}
