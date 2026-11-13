import { expect, test } from '@playwright/test';

test('Aula 10 apresenta SVG, Mermaid e interpretação dos diagramas', async ({ page }) => {
  await page.goto('/curso/aula-10/index.html');

  await expect(page.getByRole('heading', { name: '🚀 Missão: Lista na Nuvem' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Caminho de uma tarefa até o banco' })).toBeVisible();
  await expect(page.locator('.mermaid')).toHaveCount(3);
  await expect(page.locator('.mermaid svg')).toHaveCount(3, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: '🗺️ Como interpretar o Mermaid' })).toHaveCount(3);
  await expect(page.locator('.unit-number')).toHaveCount(10);

  await page.getByRole('button', { name: '✉️ Criar tarefa (POST)' }).click();
  await expect(page.locator('#resultado-http')).toContainText('201 Created');

  await page.locator('#quiz-status-criacao').selectOption('201');
  await page.getByRole('button', { name: 'Conferir' }).click();
  await expect(page.locator('#resposta-quiz-status')).toContainText('Correto');

  const contrasteDoCodigoInline = await page
    .locator('p code')
    .first()
    .evaluate((elemento) => {
      const converterParaLuminancia = (cor) => {
        const canais = cor
          .match(/[\d.]+/g)
          .slice(0, 3)
          .map(Number)
          .map((canal) => canal / 255);
        const linearizados = canais.map((canal) =>
          canal <= 0.04045 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4
        );
        return 0.2126 * linearizados[0] + 0.7152 * linearizados[1] + 0.0722 * linearizados[2];
      };
      const estilo = getComputedStyle(elemento);
      const luminanciaTexto = converterParaLuminancia(estilo.color);
      const luminanciaFundo = converterParaLuminancia(estilo.backgroundColor);
      const maisClaro = Math.max(luminanciaTexto, luminanciaFundo);
      const maisEscuro = Math.min(luminanciaTexto, luminanciaFundo);
      return (maisClaro + 0.05) / (maisEscuro + 0.05);
    });

  expect(contrasteDoCodigoInline).toBeGreaterThanOrEqual(4.5);

  const tamanhoDoTexto = await page
    .locator('.unit-card > p')
    .first()
    .evaluate((elemento) => Number.parseFloat(getComputedStyle(elemento).fontSize));
  expect(tamanhoDoTexto).toBeGreaterThanOrEqual(16);

  await page.setViewportSize({ width: 320, height: 800 });
  const semRolagemHorizontal = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth
  );
  expect(semRolagemHorizontal).toBe(true);
});
