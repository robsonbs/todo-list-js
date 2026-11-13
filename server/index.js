// ============================================================
// INDEX.JS — Inicialização do servidor web
// ------------------------------------------------------------
// Responsabilidade: iniciar o processo HTTP Express.
// NÃO faz: não contém rotas nem regras de negócio.
// Conceitos ensinados: processo Node.js, porta e encerramento gracioso.
// ============================================================

import { criarAplicacao } from './app.js';
import { obterConfiguracao } from './config.js';
import { pool } from './db/pool.js';

const { porta } = obterConfiguracao();
const app = criarAplicacao();

await pool.query('SELECT 1');

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
