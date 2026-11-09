// ============================================================
// FIXTURES.TS — Ambiente comum dos testes E2E
// ------------------------------------------------------------
// Cada teste mantém seu próprio contexto do navegador. A aplicação não
// carrega recursos externos (a fonte Inter é servida localmente), então a
// suíte não depende da rede além do próprio servidor.
// ============================================================

import { expect, test as testeBase } from '@playwright/test';

export { expect };

export const test = testeBase.extend({
  page: async ({ page }, usarPagina) => {
    await usarPagina(page);
  },
});
