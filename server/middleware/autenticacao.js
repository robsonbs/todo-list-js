// ============================================================
// AUTENTICACAO.JS — Proteção de rotas privadas
// ------------------------------------------------------------
// Responsabilidade: exigir uma sessão autenticada antes de continuar.
// NÃO faz: não confia em identificadores enviados pelo navegador.
// Conceitos ensinados: autenticação, autorização e middleware Express.
// ============================================================

/**
 * Impede o acesso a uma rota quando não há usuário na sessão do servidor.
 * @param {import('express').Request} requisicao Requisição HTTP recebida.
 * @param {import('express').Response} resposta Resposta HTTP a enviar.
 * @param {import('express').NextFunction} proximo Próximo middleware da rota.
 * @returns {void}
 */
export function exigirAutenticacao(requisicao, resposta, proximo) {
  if (!requisicao.session?.usuarioId) {
    resposta.status(401).json({ erro: 'Entre na sua conta para continuar.' });
    return;
  }

  requisicao.usuario = {
    id: requisicao.session.usuarioId,
    email: requisicao.session.email,
  };

  proximo();
}
