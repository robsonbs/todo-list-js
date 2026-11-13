// ============================================================
// MIGRATE.JS — Aplicação de mudanças versionadas no banco
// ------------------------------------------------------------
// Responsabilidade: executar cada arquivo SQL uma única vez e em transação.
// NÃO faz: não cria usuários de exemplo nem altera dados manualmente.
// Conceitos ensinados: migrações, transações e evolução de esquema.
// ============================================================

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';

const diretorioMigracoes = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');

/**
 * Aplica os arquivos de migração ainda não registrados no banco.
 * @returns {Promise<string[]>} Nomes das migrações executadas nesta chamada.
 */
export async function aplicarMigracoes() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      versao text PRIMARY KEY,
      aplicada_em timestamptz NOT NULL DEFAULT now()
    )
  `);

  const arquivos = (await readdir(diretorioMigracoes))
    .filter((arquivo) => /^\d+_[a-z0-9_-]+\.sql$/i.test(arquivo))
    .sort();
  const aplicadas = [];

  for (const arquivo of arquivos) {
    const existente = await pool.query('SELECT 1 FROM schema_migrations WHERE versao = $1', [
      arquivo,
    ]);

    if (existente.rowCount > 0) {
      continue;
    }

    const sql = await readFile(path.join(diretorioMigracoes, arquivo), 'utf8');
    const cliente = await pool.connect();

    try {
      await cliente.query('BEGIN');
      await cliente.query(sql);
      await cliente.query('INSERT INTO schema_migrations (versao) VALUES ($1)', [arquivo]);
      await cliente.query('COMMIT');
      aplicadas.push(arquivo);
    } catch (erro) {
      await cliente.query('ROLLBACK');
      throw erro;
    } finally {
      cliente.release();
    }
  }

  return aplicadas;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const aplicadas = await aplicarMigracoes();
    console.log(
      aplicadas.length > 0
        ? `Migrações aplicadas: ${aplicadas.join(', ')}`
        : 'Banco já está atualizado.'
    );
  } catch (erro) {
    console.error('Não foi possível aplicar as migrações:', erro);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
