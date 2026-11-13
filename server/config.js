// ============================================================
// CONFIG.JS — Configuração do servidor
// ------------------------------------------------------------
// Responsabilidade: validar configurações recebidas do ambiente.
// NÃO faz: não fornece segredos padrão para produção.
// Conceitos ensinados: configuração, ambiente e separação de segredos.
// ============================================================

/**
 * Lê e valida a configuração necessária para conectar a aplicação ao banco.
 * @returns {{ porta: number, urlBanco: string, ambiente: string }} Configuração validada.
 */
export function obterConfiguracao() {
  const porta = Number(process.env.PORT ?? 3000);
  const urlBanco = process.env.DATABASE_URL;
  const ambiente = process.env.NODE_ENV ?? 'development';

  if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
    throw new Error('PORT deve ser um número entre 1 e 65535.');
  }

  if (!urlBanco) {
    throw new Error('Defina DATABASE_URL no ambiente ou no arquivo .env local.');
  }

  return { porta, urlBanco, ambiente };
}
