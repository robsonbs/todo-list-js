// ============================================================
// TAREFAS.JS — API de tarefas com isolamento por usuário
// ------------------------------------------------------------
// Responsabilidade: executar CRUD e importação autenticada de tarefas.
// NÃO faz: não aceita do cliente o identificador do proprietário.
// Conceitos ensinados: REST, autorização, SQL parametrizado e transações.
// ============================================================

import express from 'express';
import { exigirAutenticacao } from '../middleware/autenticacao.js';
import {
  estadoDeConclusaoValido,
  identificadorTarefaValido,
  validarTextoTarefa,
} from '../domain/tarefa.js';

function validarTarefaImportada(tarefa) {
  if (!tarefa || typeof tarefa !== 'object' || Array.isArray(tarefa)) {
    return null;
  }

  const texto = validarTextoTarefa(tarefa.texto);
  const completa = tarefa.completa ?? false;

  if (!texto.valido || !estadoDeConclusaoValido(completa)) {
    return null;
  }

  return { texto: texto.texto, completa };
}

/**
 * Cria as rotas privadas da lista e limita cada consulta à sessão autenticada.
 * @param {object} dependencias Recursos de banco de dados.
 * @returns {import('express').Router} Rotas de tarefas.
 */
export function criarRotasTarefas({ poolBanco }) {
  const roteador = express.Router();

  roteador.use(exigirAutenticacao);

  roteador.get('/', async (requisicao, resposta) => {
    const resultado = await poolBanco.query(
      `SELECT id, texto, completa, criada_em
       FROM tarefas
       WHERE usuario_id = $1
       ORDER BY criada_em DESC, id`,
      [requisicao.usuario.id]
    );

    resposta.status(200).json({ tarefas: resultado.rows });
  });

  roteador.post('/', async (requisicao, resposta) => {
    const texto = validarTextoTarefa(requisicao.body?.texto);

    if (!texto.valido) {
      resposta.status(400).json({ erro: 'A tarefa deve ter entre 1 e 100 caracteres.' });
      return;
    }

    const resultado = await poolBanco.query(
      `INSERT INTO tarefas (usuario_id, texto)
       VALUES ($1, $2)
       RETURNING id, texto, completa, criada_em`,
      [requisicao.usuario.id, texto.texto]
    );

    resposta.status(201).json({ tarefa: resultado.rows[0] });
  });

  roteador.post('/importar', async (requisicao, resposta) => {
    const tarefasRecebidas = requisicao.body?.tarefas;

    if (!Array.isArray(tarefasRecebidas) || tarefasRecebidas.length > 100) {
      resposta.status(400).json({ erro: 'Envie uma lista de até 100 tarefas.' });
      return;
    }

    const tarefas = tarefasRecebidas.map(validarTarefaImportada);
    if (tarefas.some((tarefa) => tarefa === null)) {
      resposta.status(400).json({ erro: 'Uma ou mais tarefas locais são inválidas.' });
      return;
    }

    const cliente = await poolBanco.connect();

    try {
      await cliente.query('BEGIN');
      const importacao = await cliente.query(
        `INSERT INTO importacoes_locais (usuario_id)
         VALUES ($1)
         ON CONFLICT (usuario_id) DO NOTHING
         RETURNING usuario_id`,
        [requisicao.usuario.id]
      );

      if (importacao.rowCount === 0) {
        await cliente.query('ROLLBACK');
        resposta.status(409).json({ erro: 'As tarefas deste navegador já foram importadas.' });
        return;
      }

      for (const tarefa of tarefas) {
        await cliente.query(
          'INSERT INTO tarefas (usuario_id, texto, completa) VALUES ($1, $2, $3)',
          [requisicao.usuario.id, tarefa.texto, tarefa.completa]
        );
      }

      await cliente.query('COMMIT');
      resposta.status(201).json({ importadas: tarefas.length });
    } catch (erro) {
      await cliente.query('ROLLBACK');
      throw erro;
    } finally {
      cliente.release();
    }
  });

  roteador.get('/importacao', async (requisicao, resposta) => {
    const resultado = await poolBanco.query(
      'SELECT 1 FROM importacoes_locais WHERE usuario_id = $1',
      [requisicao.usuario.id]
    );
    resposta.status(200).json({ importada: resultado.rowCount > 0 });
  });

  roteador.patch('/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params;
    const corpo = requisicao.body;

    if (!identificadorTarefaValido(id)) {
      resposta.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    if (
      !corpo ||
      typeof corpo !== 'object' ||
      Array.isArray(corpo) ||
      Object.keys(corpo).some((chave) => !['texto', 'completa'].includes(chave))
    ) {
      resposta.status(400).json({ erro: 'Envie somente texto e/ou completa.' });
      return;
    }

    const temTexto = Object.hasOwn(corpo, 'texto');
    const temConclusao = Object.hasOwn(corpo, 'completa');
    const texto = temTexto ? validarTextoTarefa(corpo.texto) : null;

    if (
      (!temTexto && !temConclusao) ||
      (temTexto && !texto.valido) ||
      (temConclusao && !estadoDeConclusaoValido(corpo.completa))
    ) {
      resposta.status(400).json({ erro: 'Os campos da tarefa são inválidos.' });
      return;
    }

    const resultado = await poolBanco.query(
      `UPDATE tarefas
       SET texto = COALESCE($1, texto),
           completa = COALESCE($2, completa),
           atualizada_em = now()
       WHERE id = $3 AND usuario_id = $4
       RETURNING id, texto, completa, criada_em`,
      [texto?.texto ?? null, temConclusao ? corpo.completa : null, id, requisicao.usuario.id]
    );

    if (resultado.rowCount === 0) {
      resposta.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    resposta.status(200).json({ tarefa: resultado.rows[0] });
  });

  roteador.delete('/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params;

    if (!identificadorTarefaValido(id)) {
      resposta.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    const resultado = await poolBanco.query(
      'DELETE FROM tarefas WHERE id = $1 AND usuario_id = $2 RETURNING id',
      [id, requisicao.usuario.id]
    );

    if (resultado.rowCount === 0) {
      resposta.status(404).json({ erro: 'Tarefa não encontrada.' });
      return;
    }

    resposta.status(204).end();
  });

  return roteador;
}
