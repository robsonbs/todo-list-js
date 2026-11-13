// ============================================================
// INDEX.JS — Inicialização do servidor web
// ------------------------------------------------------------
// Responsabilidade: iniciar o processo HTTP Express.
// NÃO faz: não contém rotas nem regras de negócio.
// Conceitos ensinados: processo Node.js, porta e encerramento gracioso.
// ============================================================

import { criarAplicacao } from './app.js';

const porta = Number(process.env.PORT ?? 3000);
const app = criarAplicacao();
const servidor = app.listen(porta, () => {
  console.log(`Lista Web disponível em http://localhost:${porta}`);
});

// Encerrar o servidor com segurança permite que o runtime finalize requisições.
for (const sinal of ['SIGINT', 'SIGTERM']) {
  process.on(sinal, () => {
    servidor.close(() => {
      process.exit(0);
    });
  });
}
