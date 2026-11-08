// ============================================================
// VALIDACAO.TEST.JS — Regra única de validação do texto
// ------------------------------------------------------------
// Como validarTexto é uma função pura, cada teste chama a função
// e confere apenas o objeto retornado (sem DOM e sem estado).
// ============================================================

import { describe, it, expect } from 'vitest';
import { CONFIG } from '../js/constants.js';
import { validarTexto } from '../js/validacao.js';

describe('validarTexto', () => {
  it('aceita um texto normal e devolve a versão sem espaços nas pontas', () => {
    expect(validarTexto('  Estudar JavaScript  ')).toEqual({
      valido: true,
      texto: 'Estudar JavaScript',
    });
  });

  it('recusa texto vazio ou só com espaços', () => {
    expect(validarTexto('')).toEqual({ valido: false, motivo: 'textoVazio' });
    expect(validarTexto('   ')).toEqual({ valido: false, motivo: 'textoVazio' });
  });

  it('trata tabulações e quebras de linha como espaços em branco', () => {
    expect(validarTexto('\t \n')).toEqual({ valido: false, motivo: 'textoVazio' });
    expect(validarTexto('\t tarefa \n')).toEqual({ valido: true, texto: 'tarefa' });
  });

  it('trata valores ausentes como texto vazio', () => {
    expect(validarTexto(undefined)).toEqual({ valido: false, motivo: 'textoVazio' });
    expect(validarTexto(null)).toEqual({ valido: false, motivo: 'textoVazio' });
  });

  it('converte números e booleanos para texto antes de validar', () => {
    expect(validarTexto(42)).toEqual({ valido: true, texto: '42' });
    expect(validarTexto(false)).toEqual({ valido: true, texto: 'false' });
  });

  it(`aceita exatamente ${CONFIG.MAX_CARACTERES_TAREFA} caracteres`, () => {
    const resultado = validarTexto('a'.repeat(CONFIG.MAX_CARACTERES_TAREFA));
    expect(resultado.valido).toBe(true);
    expect(resultado.texto).toHaveLength(CONFIG.MAX_CARACTERES_TAREFA);
  });

  it('recusa um caractere acima do limite', () => {
    const resultado = validarTexto('a'.repeat(CONFIG.MAX_CARACTERES_TAREFA + 1));
    expect(resultado).toEqual({ valido: false, motivo: 'textoMuitoLongo' });
  });

  it('mede o limite depois de remover os espaços das pontas', () => {
    const texto = `  ${'a'.repeat(CONFIG.MAX_CARACTERES_TAREFA)}  `;
    expect(validarTexto(texto).valido).toBe(true);
  });

  it('conta emoji suplementar como duas unidades UTF-16 no limite', () => {
    const noLimite = `${'a'.repeat(CONFIG.MAX_CARACTERES_TAREFA - 2)}😀`;
    const acimaDoLimite = `${'a'.repeat(CONFIG.MAX_CARACTERES_TAREFA - 1)}😀`;

    expect(noLimite.length).toBe(CONFIG.MAX_CARACTERES_TAREFA);
    expect(validarTexto(noLimite)).toEqual({ valido: true, texto: noLimite });
    expect(validarTexto(acimaDoLimite)).toEqual({ valido: false, motivo: 'textoMuitoLongo' });
  });
});
