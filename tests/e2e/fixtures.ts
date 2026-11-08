// ============================================================
// FIXTURES.TS — Ambiente comum dos testes E2E
// ------------------------------------------------------------
// Cada teste mantém seu próprio contexto do navegador. Fontes externas
// não fazem parte do contrato visual testado e são bloqueadas para que
// a suíte não dependa da rede nem espere pelo Google Fonts.
// ============================================================

import { expect, test as testeBase } from '@playwright/test';

export { expect };

export const test = testeBase.extend({
  page: async ({ page }, usarPagina) => {
    await page.route('https://fonts.googleapis.com/**', (rota) => rota.abort());
    await page.route('https://fonts.gstatic.com/**', (rota) => rota.abort());
    await usarPagina(page);
  },
});
