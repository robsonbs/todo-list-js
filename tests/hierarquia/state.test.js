import { beforeEach, describe, expect, it } from 'vitest';
import {
  adicionarTarefa,
  alternarConcluida,
  editarTarefa,
  obterContadores,
  obterTarefaPorId,
  obterTarefas,
  removerTarefa,
  substituirTarefas,
} from '../../js/hierarquia/state.js';

beforeEach(() => {
  substituirTarefas([]);
});

describe('state hierárquico', () => {
  it('cria tarefas em três níveis e recusa um quarto nível', () => {
    const principal = adicionarTarefa('Preparar viagem');
    const filha = adicionarTarefa('Organizar mala', principal.id);
    const neta = adicionarTarefa('Separar roupas', filha.id);

    expect(principal).not.toBeNull();
    expect(filha).not.toBeNull();
    expect(neta).not.toBeNull();
    expect(adicionarTarefa('Escolher camisetas', neta.id)).toBeNull();
    expect(obterContadores().total).toBe(3);
  });

  it('gera IDs únicos em ramos diferentes', () => {
    const primeira = adicionarTarefa('Primeira');
    const segunda = adicionarTarefa('Segunda');
    const filha = adicionarTarefa('Filha', primeira.id);

    expect(new Set([primeira.id, segunda.id, filha.id]).size).toBe(3);
  });

  it('calcula pai parcial e concluído a partir das folhas', () => {
    const principal = adicionarTarefa('Projeto');
    const primeira = adicionarTarefa('Etapa A', principal.id);
    const segunda = adicionarTarefa('Etapa B', principal.id);

    expect(alternarConcluida(principal.id)).toBe(false);
    expect(alternarConcluida(primeira.id)).toBe(true);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: false, parcial: true });
    expect(alternarConcluida(segunda.id)).toBe(true);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: true, parcial: false });
    expect(obterContadores()).toEqual({ total: 3, completas: 3 });
  });

  it('recalcula todos os ancestrais quando uma folha volta a ficar aberta', () => {
    const principal = adicionarTarefa('Projeto');
    const filha = adicionarTarefa('Etapa', principal.id);
    const neta = adicionarTarefa('Detalhe', filha.id);

    alternarConcluida(neta.id);
    expect(obterTarefaPorId(principal.id).completa).toBe(true);
    alternarConcluida(neta.id);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: false, parcial: false });
    expect(obterTarefaPorId(filha.id)).toMatchObject({ completa: false, parcial: false });
  });

  it('propaga o estado parcial por mais de um nível', () => {
    const principal = adicionarTarefa('Projeto');
    const etapa = adicionarTarefa('Etapa', principal.id);
    const primeira = adicionarTarefa('Parte A', etapa.id);
    const segunda = adicionarTarefa('Parte B', etapa.id);

    alternarConcluida(primeira.id);

    expect(obterTarefaPorId(etapa.id)).toMatchObject({ completa: false, parcial: true });
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: false, parcial: true });
    expect(obterContadores()).toEqual({ total: 4, completas: 1 });

    alternarConcluida(segunda.id);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: true, parcial: false });
  });

  it('reabre uma folha concluída ao transformá-la em pai', () => {
    const principal = adicionarTarefa('Plano');
    alternarConcluida(principal.id);

    expect(obterTarefaPorId(principal.id).completa).toBe(true);
    adicionarTarefa('Nova etapa', principal.id);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: false, parcial: false });
  });

  it('remove a subárvore inteira sem apagar outros ramos', () => {
    const principal = adicionarTarefa('Manter projeto');
    const ramo = adicionarTarefa('Remover ramo', principal.id);
    const neta = adicionarTarefa('Remover também', ramo.id);
    adicionarTarefa('Outro projeto');

    expect(removerTarefa(ramo.id)).toBe(true);
    expect(obterTarefaPorId(ramo.id)).toBeNull();
    expect(obterTarefaPorId(neta.id)).toBeNull();
    expect(obterTarefaPorId(principal.id).filhos).toHaveLength(0);
    expect(obterContadores().total).toBe(2);
  });

  it('transforma um pai sem filhos em folha não concluída após remoção', () => {
    const principal = adicionarTarefa('Plano');
    const filha = adicionarTarefa('Parte concluída', principal.id);
    alternarConcluida(filha.id);

    expect(obterTarefaPorId(principal.id).completa).toBe(true);
    removerTarefa(filha.id);
    expect(obterTarefaPorId(principal.id)).toMatchObject({ completa: false, parcial: false });
  });

  it('valida texto ao adicionar e editar em qualquer nível', () => {
    const principal = adicionarTarefa('Plano');
    expect(adicionarTarefa('   ')).toBeNull();
    expect(editarTarefa(principal.id, 'Plano atualizado')).toBe(true);
    expect(editarTarefa(principal.id, 'x'.repeat(101))).toBe(false);
    expect(obterTarefaPorId(principal.id).atividade).toBe('Plano atualizado');
  });

  it('retorna cópias profundas do estado', () => {
    const principal = adicionarTarefa('Plano');
    adicionarTarefa('Filha', principal.id);
    const copia = obterTarefas();
    copia[0].filhos[0].atividade = 'Alteração externa';

    expect(obterTarefaPorId(principal.id).filhos[0].atividade).toBe('Filha');
  });

  it('descarta dados inválidos, IDs duplicados e níveis acima do limite', () => {
    substituirTarefas([
      {
        id: 10,
        atividade: 'Principal',
        completa: false,
        filhos: [
          {
            id: 11,
            atividade: 'Filha',
            completa: false,
            filhos: [
              {
                id: 12,
                atividade: 'Neta',
                completa: false,
                filhos: [{ id: 13, atividade: 'Nível proibido', completa: false, filhos: [] }],
              },
              { id: 11, atividade: 'ID repetido', completa: false, filhos: [] },
            ],
          },
        ],
      },
      { id: 0, atividade: 'ID inválido', completa: false, filhos: [] },
    ]);

    const tarefas = obterTarefas();
    expect(tarefas).toHaveLength(1);
    expect(tarefas[0].filhos[0].filhos).toHaveLength(1);
    expect(tarefas[0].filhos[0].filhos[0].filhos).toHaveLength(0);
    expect(adicionarTarefa('Próxima')).toMatchObject({ id: 13 });
  });

  it('recalcula a conclusão dos pais ao carregar mesmo que o valor salvo esteja desatualizado', () => {
    substituirTarefas([
      {
        id: 1,
        atividade: 'Plano',
        completa: false,
        filhos: [{ id: 2, atividade: 'Parte', completa: true, filhos: [] }],
      },
    ]);

    expect(obterTarefaPorId(1)).toMatchObject({ completa: true, parcial: false });
  });
});
