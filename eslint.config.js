// ============================================================
// ESLINT.CONFIG.JS — Regras de estilo e qualidade do JavaScript
// ------------------------------------------------------------
// Usamos o "flat config" (formato atual do ESLint). Cada bloco
// abaixo aplica regras a um conjunto de arquivos.
// ============================================================

import js from '@eslint/js';
import globals from 'globals';

export default [
  // Regras recomendadas pelo próprio ESLint (base para tudo).
  js.configs.recommended,

  // Código da aplicação principal (js/).
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // Testes unitários (Vitest + happy-dom).
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        document: 'readonly',
        window: 'readonly',
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // Arquivos de configuração rodam no Node (process, etc.).
  {
    files: ['*.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  // Pastas ignoradas.
  // - curso/ e iniciante/: material didático legado, mantido como
  //   exemplo e fora do escopo das regras atuais.
  // - tests/e2e/: arquivos TypeScript do Playwright (outra ferramenta).
  // - artefatos gerados por testes e cobertura.
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'playwright-report/',
      'test-results/',
      'tests/e2e/',
      'curso/',
      'iniciante/',
    ],
  },
];
