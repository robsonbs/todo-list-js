import { randomBytes } from 'node:crypto';

// ============================================================
// CONFIG.JS — Configuração do servidor
// ------------------------------------------------------------
// Responsabilidade: validar configurações recebidas do ambiente.
// NÃO faz: não fornece segredos padrão para produção.
// Conceitos ensinados: configuração, ambiente e separação de segredos.
// ============================================================

/**
 * Lê e valida a configuração necessária para conectar a aplicação ao banco.
 * @returns {object} Configuração validada para o processo web.
 */
export function obterConfiguracao() {
  const porta = Number(process.env.PORT ?? 3000);
  const urlBanco = process.env.DATABASE_URL;
  const ambiente = process.env.NODE_ENV ?? 'development';
  const producao = ambiente === 'production';
  const segredoSessao = process.env.SESSION_SECRET;
  const segredoCsrf = process.env.CSRF_SECRET;
  const modoEmail = process.env.EMAIL_MODE ?? (producao ? 'smtp' : 'console');
  const quantidadeProxies = Number(process.env.TRUST_PROXY_HOPS ?? 0);

  if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
    throw new Error('PORT deve ser um número entre 1 e 65535.');
  }

  if (!urlBanco) {
    throw new Error('Defina DATABASE_URL no ambiente ou no arquivo .env local.');
  }

  if (!Number.isInteger(quantidadeProxies) || quantidadeProxies < 0) {
    throw new Error('TRUST_PROXY_HOPS deve ser um inteiro igual ou maior que zero.');
  }

  if (producao && (!segredoSessao || segredoSessao.length < 32)) {
    throw new Error('SESSION_SECRET deve ter ao menos 32 caracteres em produção.');
  }

  if (producao && segredoSessao.includes('dev-only')) {
    throw new Error('Substitua o SESSION_SECRET de exemplo antes de publicar.');
  }

  if (producao && (!segredoCsrf || segredoCsrf.length < 32)) {
    throw new Error('CSRF_SECRET deve ter ao menos 32 caracteres em produção.');
  }

  if (producao && segredoCsrf.includes('dev-only')) {
    throw new Error('Substitua o CSRF_SECRET de exemplo antes de publicar.');
  }

  if (!['console', 'smtp'].includes(modoEmail)) {
    throw new Error('EMAIL_MODE deve ser console ou smtp.');
  }

  if (producao && modoEmail !== 'smtp') {
    throw new Error('Produção exige EMAIL_MODE=smtp.');
  }

  const hostEmail = process.env.SMTP_HOST;
  const portaEmail = Number(process.env.SMTP_PORT ?? 587);
  const remetenteEmail = process.env.EMAIL_FROM;

  if (modoEmail === 'smtp' && (!hostEmail || !remetenteEmail)) {
    throw new Error('SMTP_HOST e EMAIL_FROM são obrigatórios para EMAIL_MODE=smtp.');
  }

  return {
    porta,
    urlBanco,
    ambiente,
    producao,
    segredoSessao: segredoSessao ?? randomBytes(32).toString('hex'),
    segredoCsrf: segredoCsrf ?? randomBytes(32).toString('hex'),
    nomeCookieSessao: producao ? '__Host-tarefas-sessao' : 'tarefas.sid',
    nomeCookieCsrf: producao ? '__Host-tarefas-csrf' : 'tarefas.csrf',
    modoEmail,
    hostEmail,
    portaEmail,
    usuarioEmail: process.env.SMTP_USER,
    senhaEmail: process.env.SMTP_PASSWORD,
    remetenteEmail,
    urlPublica: process.env.PUBLIC_URL ?? `http://localhost:${porta}`,
    quantidadeProxies,
  };
}
