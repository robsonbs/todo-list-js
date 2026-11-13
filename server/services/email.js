// ============================================================
// EMAIL.JS — Envio de links de autenticação
// ------------------------------------------------------------
// Responsabilidade: entregar links de confirmação e recuperação de senha.
// NÃO faz: não cria tokens nem armazena credenciais de e-mail no código.
// Conceitos ensinados: serviço externo, SMTP e configuração por ambiente.
// ============================================================

import nodemailer from 'nodemailer';

/**
 * Cria uma função de entrega de e-mail para o ambiente atual.
 * @param {object} configuracao Configuração validada pelo servidor.
 * @returns {(mensagem: {destinatario: string, tipo: string, link: string}) => Promise<void>} Serviço de entrega.
 */
export function criarServicoEmail(configuracao) {
  if (configuracao.modoEmail === 'console') {
    if (configuracao.producao) {
      throw new Error('O modo de e-mail console não pode ser usado em produção.');
    }

    return async ({ destinatario, tipo, link }) => {
      console.info(`[e-mail local: ${tipo}] ${destinatario} → ${link}`);
    };
  }

  let autenticacao;

  if (configuracao.usuarioEmail && configuracao.senhaEmail) {
    autenticacao = {
      user: configuracao.usuarioEmail,
      pass: configuracao.senhaEmail,
    };
  }

  const transporte = nodemailer.createTransport({
    host: configuracao.hostEmail,
    port: configuracao.portaEmail,
    secure: configuracao.portaEmail === 465,
    auth: autenticacao,
  });

  return async ({ destinatario, tipo, link }) => {
    const confirmarEmail = tipo === 'confirmar_email';

    await transporte.sendMail({
      from: configuracao.remetenteEmail,
      to: destinatario,
      subject: confirmarEmail
        ? 'Confirme seu e-mail — Lista de Tarefas'
        : 'Redefina sua senha — Lista de Tarefas',
      text: `${confirmarEmail ? 'Confirme seu e-mail' : 'Redefina sua senha'} usando este link, válido por tempo limitado:\n\n${link}`,
    });
  };
}
