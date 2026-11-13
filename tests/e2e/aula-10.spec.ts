import { expect, test } from '@playwright/test';

test('Aula 10 apresenta SVG, Mermaid e interpretação dos diagramas', async ({ page }) => {
  await page.goto('/curso/aula-10/index.html');

  await expect(page.getByRole('heading', { name: '🚀 Missão: Lista na Nuvem' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Caminho de uma tarefa até o banco' })).toBeVisible();
  await expect(page.locator('.mermaid')).toHaveCount(3);
  await expect(page.locator('.mermaid svg')).toHaveCount(3, { timeout: 15000 });
  await expect(page.getByRole('heading', { name: '🗺️ Como interpretar o Mermaid' })).toHaveCount(3);
});
