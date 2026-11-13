import { expect, test } from '@playwright/test';

test.describe('aplicação online — telas públicas', () => {
  test('mostra os formulários de login, cadastro e recuperação', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Minha Lista Online' })).toBeVisible();
    await expect(page.getByLabel('E-mail', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    await expect(page.getByText('Esqueci minha senha')).toBeVisible();

    await page.getByRole('button', { name: 'Criar uma conta' }).click();
    await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible();
    await expect(page.getByLabel('Senha (mínimo de 12 caracteres)', { exact: true })).toBeVisible();
  });

  test('mostra erro genérico ao tentar entrar com credenciais inválidas', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('E-mail', { exact: true }).fill('inexistente@example.test');
    await page.getByLabel('Senha', { exact: true }).fill('senha-invalida-de-teste');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByRole('status')).toContainText(
      'E-mail ou senha inválidos, ou e-mail não confirmado.'
    );
    await expect(page.locator('#painel-tarefas')).toBeHidden();
  });

  test('mantém o cartão utilizável em uma tela estreita', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    const semRolagemHorizontal = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(semRolagemHorizontal).toBe(true);
  });
});
