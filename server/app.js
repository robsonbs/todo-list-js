// ============================================================
// APP.JS — Configuração da aplicação HTTP
// ------------------------------------------------------------
// Responsabilidade: montar middleware, rotas públicas e arquivos da interface.
// NÃO faz: não abre a porta do servidor nem consulta o banco de dados.
// Conceitos ensinados: middleware Express, HTTP e política de segurança.
// ============================================================

import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
const diretorioWeb = path.resolve(diretorioAtual, '../web');

/**
 * Monta a aplicação Express sem iniciar um servidor de rede.
 * @returns {import('express').Express} Aplicação pronta para receber requisições.
 */
export function criarAplicacao() {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          connectSrc: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
        },
      },
    })
  );
  app.use(express.json({ limit: '10kb' }));

  // A rota de saúde permite verificar o processo sem expor configuração interna.
  app.get('/api/health', (_requisicao, resposta) => {
    resposta.status(200).json({ status: 'ok', servico: 'lista-tarefas-web' });
  });

  app.use('/api', (_requisicao, resposta) => {
    resposta.status(404).json({ erro: 'Rota da API não encontrada.' });
  });

  app.use(express.static(diretorioWeb, { index: 'index.html' }));

  app.use((_requisicao, resposta) => {
    resposta.status(404).send('Página não encontrada.');
  });

  // O cliente recebe mensagem genérica; detalhes ficam somente no log do servidor.
  app.use((erro, _requisicao, resposta, proximo) => {
    if (resposta.headersSent) {
      return proximo(erro);
    }

    console.error('Erro não tratado na aplicação:', erro);
    resposta.status(500).json({ erro: 'Ocorreu um erro inesperado.' });
  });

  return app;
}
