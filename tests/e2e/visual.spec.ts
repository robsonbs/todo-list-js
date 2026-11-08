import { expect, test } from '@playwright/test';
import { criarTarefa } from './helpers';

test.describe('Estados visuais', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('página apresenta os elementos visuais principais', async ({ page }) => {
    await expect(page).toHaveTitle(/Lista de Tarefas/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByLabel('Nova tarefa', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Criar nova tarefa' })).toBeVisible();
    await expect(page.locator('.tarefas-box')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toBeVisible();
    await expect(page.locator('#contador-concluidas')).toBeVisible();
    await expect(page.locator('.tarefas-empty__titulo')).toHaveText(
      'Você ainda não tem tarefas cadastradas'
    );
  });

  test('tarefa criada tem checkbox, texto e botão de remoção', async ({ page }) => {
    await criarTarefa(page, 'Estudar JavaScript');
    const tarefa = page.locator('.tarefa');

    await expect(tarefa).toHaveCount(1);
    await expect(tarefa.locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(tarefa.locator('.texto-tarefa')).toHaveText('Estudar JavaScript');
    await expect(tarefa.locator('.remove-btn svg')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });

  test('tarefa concluída recebe estilo riscado e cor correspondente', async ({ page }) => {
    await criarTarefa(page, 'Tarefa para completar');
    const tarefa = page.locator('.tarefa');
    const checkbox = tarefa.locator('input[type="checkbox"]');
    const texto = tarefa.locator('.texto-tarefa');

    await expect(texto).toHaveCSS('text-decoration-line', 'none');
    await checkbox.check();
    await page.mouse.move(0, 0);

    await expect(checkbox).toBeChecked();
    await expect(texto).toHaveCSS('text-decoration-line', 'line-through');
    await expect(texto).toHaveCSS('color', /rgb\(128, 128, 128\)/);
    await expect(checkbox).toHaveCSS('background-color', /rgb\(94, 96, 206\)/);
  });

  test('hover no botão de exclusão destaca o ícone em vermelho', async ({ page }) => {
    await criarTarefa(page, 'Tarefa para excluir');
    const botao = page.locator('.remove-btn');
    const icone = botao.locator('svg');

    await expect(icone).toHaveCSS('color', /rgb\(128, 128, 128\)/);
    await botao.hover();
    await expect(icone).toHaveCSS('color', /rgb\(226, 88, 88\)/);
  });
});
