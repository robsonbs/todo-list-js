import { describe, expect, it } from 'vitest';
import {
  estadoDeConclusaoValido,
  identificadorTarefaValido,
  validarTextoTarefa,
} from '../../server/domain/tarefa.js';

describe('validação de tarefas da API', () => {
  it('remove espaços nas pontas e aceita texto dentro do limite', () => {
    expect(validarTextoTarefa('  Estudar HTTP  ')).toEqual({
      valido: true,
      texto: 'Estudar HTTP',
    });
  });

  it('conta caracteres Unicode e rejeita texto vazio ou longo', () => {
    expect(validarTextoTarefa('   ')).toEqual({ valido: false });
    expect(validarTextoTarefa('🧠'.repeat(100)).valido).toBe(true);
    expect(validarTextoTarefa('🧠'.repeat(101))).toEqual({ valido: false });
  });

  it('aceita apenas booleanos para conclusão', () => {
    expect(estadoDeConclusaoValido(false)).toBe(true);
    expect(estadoDeConclusaoValido(true)).toBe(true);
    expect(estadoDeConclusaoValido('false')).toBe(false);
  });

  it('reconhece UUIDs e rejeita identificadores arbitrários', () => {
    expect(identificadorTarefaValido('93c5e7b3-2b62-4c88-a8dd-55a7ce8d9305')).toBe(true);
    expect(identificadorTarefaValido('1 OR 1=1')).toBe(false);
  });
});
