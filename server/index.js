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
import { criarServicoEmail } from './services/email.js';

const configuracao = obterConfiguracao();
const app = criarAplicacao({
  poolBanco: pool,
  configuracao,
  enviarEmail: criarServicoEmail(configuracao),
});

await pool.query('SELECT 1');

const servidor = app.listen(configuracao.porta, '0.0.0.0', () => {
  console.log(`Lista Web disponível em http://localhost:${configuracao.porta}`);
});

// Encerrar o servidor com segurança permite que o runtime finalize requisições.
for (const sinal of ['SIGINT', 'SIGTERM']) {
  process.on(sinal, () => {
    servidor.close(() => {
      pool
        .end()
        .then(() => process.exit(0))
        .catch((erro) => {
          console.error('Erro ao fechar conexões do PostgreSQL:', erro);
          process.exit(1);
        });
    });
  });
}
