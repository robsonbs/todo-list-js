// ============================================================
// COMMITLINT.CONFIG.JS — Padrão de mensagens de commit
// ------------------------------------------------------------
// Mantém o histórico legível e permite identificar o tipo de
// mudança sem abrir cada diff.
// ============================================================

export default {
  extends: ['@commitlint/config-conventional'],
  // O histórico existente contém um revert gerado automaticamente com
  // capitalização própria; mantemos esse formato sem relaxar outros commits.
  ignores: [(mensagem) => /^revert: Revert ".+"$/.test(mensagem)],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
  },
};
