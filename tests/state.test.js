import { describe, it, expect, beforeEach } from 'vitest';
import { criarTarefaFixture } from './helpers/fixtures.js';
import { CONFIG } from '../js/constants.js';
import {
  obterTarefas,
  adicionarTarefa,
  removerTarefa,
  editarTarefa,
  alternarConcluida,
  obterContadores,
  substituirTarefas,
  obterTarefaPorId,
} from '../js/state.js';

beforeEach(() => {
  substituirTarefas([]);
});

describe('state.js', () => {
  describe('adicionarTarefa', () => {
    it('deve adicionar uma tarefa com ID único', () => {
      const tarefa = adicionarTarefa('Estudar JavaScript');
      expect(tarefa).not.toBeNull();
      expect(tarefa.atividade).toBe('Estudar JavaScript');
      expect(tarefa.completa).toBe(false);
      expect(typeof tarefa.id).toBe('number');
    });

    it('deve gerar IDs únicos para cada tarefa', () => {
      const t1 = adicionarTarefa('Tarefa 1');
      const t2 = adicionarTarefa('Tarefa 2');
      expect(t1.id).not.toBe(t2.id);
    });

    it('deve retornar null para texto vazio', () => {
      const resultado = adicionarTarefa('');
      expect(resultado).toBeNull();
    });

    it('deve retornar null para texto apenas com espaços', () => {
      const resultado = adicionarTarefa('   ');
      expect(resultado).toBeNull();
    });

    it('deve fazer trim no texto da tarefa', () => {
      const tarefa = adicionarTarefa('  Estudar  ');
      expect(tarefa.atividade).toBe('Estudar');
    });

    it('deve aceitar exatamente o limite de caracteres', () => {
      const texto = 'a'.repeat(100);
      const tarefa = adicionarTarefa(texto);
      expect(tarefa).not.toBeNull();
      expect(tarefa.atividade.length).toBe(100);
    });

    it('deve retornar null quando excede o limite de caracteres', () => {
      expect(adicionarTarefa('a'.repeat(101))).toBeNull();
      expect(obterTarefas().length).toBe(0);
    });
  });

  describe('obterTarefas', () => {
    it('deve retornar array vazio inicialmente', () => {
      expect(obterTarefas()).toEqual([]);
    });

    it('deve retornar cópia do array (não a referência original)', () => {
      adicionarTarefa('Tarefa 1');
      const tarefas = obterTarefas();
      tarefas.push('não é um objeto');
      expect(obterTarefas().length).toBe(1);
    });
  });

  describe('obterTarefaPorId', () => {
    it('deve retornar a tarefa correta pelo ID', () => {
      const tarefa = adicionarTarefa('Minha tarefa');
      const encontrada = obterTarefaPorId(tarefa.id);
      expect(encontrada).not.toBeNull();
      expect(encontrada.atividade).toBe('Minha tarefa');
    });

    it('deve retornar null para ID inexistente', () => {
      expect(obterTarefaPorId(9999)).toBeNull();
    });
  });

  describe('removerTarefa', () => {
    it('deve remover uma tarefa pelo ID', () => {
      const tarefa = adicionarTarefa('Para remover');
      const resultado = removerTarefa(tarefa.id);
      expect(resultado).toBe(true);
      expect(obterTarefaPorId(tarefa.id)).toBeNull();
      expect(obterContadores().total).toBe(0);
    });

    it('deve retornar false para ID inexistente', () => {
      expect(removerTarefa(9999)).toBe(false);
    });
  });

  describe('editarTarefa', () => {
    it('deve editar o texto de uma tarefa existente', () => {
      const tarefa = adicionarTarefa('Texto original');
      const resultado = editarTarefa(tarefa.id, 'Texto editado');
      expect(resultado).toBe(true);
      expect(obterTarefaPorId(tarefa.id).atividade).toBe('Texto editado');
    });

    it('deve retornar false para ID inexistente', () => {
      expect(editarTarefa(9999, 'Novo texto')).toBe(false);
    });

    it('deve retornar false para texto vazio', () => {
      const tarefa = adicionarTarefa('Valida');
      expect(editarTarefa(tarefa.id, '')).toBe(false);
      expect(obterTarefaPorId(tarefa.id).atividade).toBe('Valida');
    });

    it('deve retornar false quando o novo texto excede o limite', () => {
      const tarefa = adicionarTarefa('Valida');
      expect(editarTarefa(tarefa.id, 'a'.repeat(101))).toBe(false);
      expect(obterTarefaPorId(tarefa.id).atividade).toBe('Valida');
    });

    it('deve aceitar o limite exato e normalizar espaços ao editar', () => {
      const tarefa = adicionarTarefa('Original');
      const texto = 'a'.repeat(CONFIG.MAX_CARACTERES_TAREFA);

      expect(editarTarefa(tarefa.id, `  ${texto}  `)).toBe(true);
      expect(obterTarefaPorId(tarefa.id).atividade).toBe(texto);
    });

    it('deve preservar o texto existente quando a edição contém só espaços', () => {
      const tarefa = adicionarTarefa('Original');

      expect(editarTarefa(tarefa.id, ' \t\n ')).toBe(false);
      expect(obterTarefaPorId(tarefa.id).atividade).toBe('Original');
    });
  });

  describe('alternarConcluida', () => {
    it('deve alternar o status de concluída', () => {
      const tarefa = adicionarTarefa('Para completar');
      expect(tarefa.completa).toBe(false);

      alternarConcluida(tarefa.id);
      expect(obterTarefaPorId(tarefa.id).completa).toBe(true);

      alternarConcluida(tarefa.id);
      expect(obterTarefaPorId(tarefa.id).completa).toBe(false);
    });

    it('deve retornar false para ID inexistente', () => {
      expect(alternarConcluida(9999)).toBe(false);
    });
  });

  describe('obterContadores', () => {
    it('deve retornar total e completas corretos', () => {
      adicionarTarefa('Tarefa 1');
      adicionarTarefa('Tarefa 2');
      const t3 = adicionarTarefa('Tarefa 3');
      alternarConcluida(t3.id);

      const contadores = obterContadores();
      expect(contadores.total).toBe(3);
      expect(contadores.completas).toBe(1);
    });

    it('deve retornar zeros quando não há tarefas', () => {
      const contadores = obterContadores();
      expect(contadores.total).toBe(0);
      expect(contadores.completas).toBe(0);
    });
  });

  describe('substituirTarefas', () => {
    it('deve substituir todas as tarefas', () => {
      adicionarTarefa('Antiga');
      substituirTarefas([criarTarefaFixture({ id: 100, atividade: 'Nova' })]);
      expect(obterTarefas().length).toBe(1);
      expect(obterTarefaPorId(100).atividade).toBe('Nova');
    });

    it('deve limpar quando passado undefined ou null', () => {
      adicionarTarefa('Temporária');
      substituirTarefas(null);
      expect(obterTarefas().length).toBe(0);
    });

    it('deve ignorar valores que não são array', () => {
      adicionarTarefa('Temporária');
      substituirTarefas({ id: 1, atividade: 'Não é array' });
      expect(obterTarefas().length).toBe(0);
    });

    it('deve descartar entradas inválidas e normalizar as válidas', () => {
      substituirTarefas([
        { id: 1, atividade: '  Válida  ', completa: 1 },
        null,
        { id: '2', atividade: 'ID inválido', completa: false },
        { id: 3, atividade: '   ', completa: false },
        { id: 4, atividade: 'Sem flag' },
      ]);

      const tarefas = obterTarefas();
      expect(tarefas).toHaveLength(2);
      expect(tarefas[0]).toEqual({ id: 1, atividade: 'Válida', completa: true });
      expect(tarefas[1]).toEqual({ id: 4, atividade: 'Sem flag', completa: false });
    });

    it('deve descartar IDs repetidos ao carregar dados corrompidos', () => {
      substituirTarefas([
        criarTarefaFixture({ id: 7, atividade: 'Primeira' }),
        criarTarefaFixture({ id: 7, atividade: 'Duplicada' }),
      ]);

      expect(obterTarefas()).toHaveLength(1);
      expect(obterTarefas()[0].atividade).toBe('Primeira');
    });

    it('deve descartar IDs que não sejam inteiros positivos', () => {
      substituirTarefas([
        criarTarefaFixture({ id: 0 }),
        criarTarefaFixture({ id: -1 }),
        criarTarefaFixture({ id: 1.5 }),
      ]);

      expect(obterTarefas()).toHaveLength(0);
    });

    it('deve recalcular o próximo ID a partir do maior existente', () => {
      substituirTarefas([criarTarefaFixture({ id: 42, atividade: 'Existente' })]);
      const nova = adicionarTarefa('Nova');
      expect(nova.id).toBe(43);
    });

    it('não reutiliza ID removido e continua após o maior ID carregado', () => {
      const removida = adicionarTarefa('Removida');
      removerTarefa(removida.id);
      const depoisDaRemocao = adicionarTarefa('Depois da remoção');
      expect(depoisDaRemocao.id).toBeGreaterThan(removida.id);

      substituirTarefas([
        criarTarefaFixture({ id: 12, atividade: 'Maior ID' }),
        criarTarefaFixture({ id: 4, atividade: 'Outro ID' }),
      ]);
      expect(adicionarTarefa('Depois da carga').id).toBe(13);
    });
  });
});
