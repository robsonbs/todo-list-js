import { afterEach, describe, expect, it } from 'vitest';
import { get } from 'node:http';
import { criarAplicacao } from '../../server/app.js';

function requisitar(porta, caminho) {
  return new Promise((resolver, rejeitar) => {
    const requisicao = get({ hostname: '127.0.0.1', port: porta, path: caminho }, (resposta) => {
      const pedacos = [];
      resposta.on('data', (pedaco) => pedacos.push(pedaco));
      resposta.on('end', () => {
        resolver({
          status: resposta.statusCode,
          cabecalhos: resposta.headers,
          corpo: Buffer.concat(pedacos).toString('utf8'),
        });
      });
    });

    requisicao.on('error', rejeitar);
  });
}

describe('servidor web — estrutura inicial', () => {
  let servidor;

  afterEach(async () => {
    if (servidor) {
      await new Promise((resolver) => servidor.close(resolver));
      servidor = undefined;
    }
  });

  it('expõe uma rota de saúde sem revelar configurações', async () => {
    servidor = criarAplicacao().listen(0);
    await new Promise((resolver) => servidor.once('listening', resolver));

    const endereco = servidor.address();
    const resposta = await requisitar(endereco.port, '/api/health');

    expect(resposta.status).toBe(200);
    expect(JSON.parse(resposta.corpo)).toEqual({
      status: 'ok',
      servico: 'lista-tarefas-web',
    });
    expect(resposta.cabecalhos['x-powered-by']).toBeUndefined();
    expect(resposta.cabecalhos['content-security-policy']).toContain("default-src 'self'");
    expect(resposta.cabecalhos['strict-transport-security']).toBeUndefined();
    expect(resposta.cabecalhos['content-security-policy']).not.toContain(
      'upgrade-insecure-requests'
    );
  });

  it('serve a interface online em uma rota separada da API', async () => {
    servidor = criarAplicacao().listen(0);
    await new Promise((resolver) => servidor.once('listening', resolver));

    const endereco = servidor.address();
    const resposta = await requisitar(endereco.port, '/');

    expect(resposta.status).toBe(200);
    expect(resposta.cabecalhos['content-type']).toContain('text/html');
    expect(resposta.corpo).toContain('Minha Lista Online');
  });

  it('responde com JSON para caminhos de API desconhecidos', async () => {
    servidor = criarAplicacao().listen(0);
    await new Promise((resolver) => servidor.once('listening', resolver));

    const endereco = servidor.address();
    const resposta = await requisitar(endereco.port, '/api/inexistente');

    expect(resposta.status).toBe(404);
    expect(JSON.parse(resposta.corpo)).toEqual({ erro: 'Rota da API não encontrada.' });
  });
});
