// ============================================================
// POOL.JS — Conexões compartilhadas com PostgreSQL
// ------------------------------------------------------------
// Responsabilidade: disponibilizar um pool limitado de conexões.
// NÃO faz: não monta SQL nem decide regras de acesso às tarefas.
// Conceitos ensinados: driver, pool de conexões e configuração externa.
// ============================================================

import pg from 'pg';
import { obterConfiguracao } from '../config.js';

const { Pool } = pg;
const { urlBanco } = obterConfiguracao();

export const pool = new Pool({
  connectionString: urlBanco,
  max: 10,
  connectionTimeoutMillis: 5000,
});

// Uma falha em conexão ociosa não encerra silenciosamente o processo.
pool.on('error', (erro) => {
  console.error('Erro inesperado em uma conexão ociosa do PostgreSQL:', erro);
});
