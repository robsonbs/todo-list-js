import { expect, test } from './fixtures';
import { criarTarefa } from './helpers';

test.describe('Acessibilidade básica e responsividade', () => {
  test('formulário pode ser preenchido e enviado pelo teclado', async ({ page }) => {
    await page.goto('/');
    const campo = page.getByLabel('Nova tarefa', { exact: true });

    await page.keyboard.press('Tab');
    await expect(campo).toBeFocused();
    await campo.fill('Criada acessivelmente');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Criar nova tarefa' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('listitem')).toContainText('Criada acessivelmente');
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });

  test('checkbox e botão de remoção têm nomes acessíveis por tarefa', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'Nome acessível');

    await expect(
      page.getByRole('checkbox', { name: 'Marcar "Nome acessível" como concluída' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Deletar tarefa: Nome acessível' })
    ).toBeVisible();
  });

  test('checkbox e exclusão podem ser ativados por teclado', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'Ações por teclado');
    const checkbox = page.getByRole('checkbox', {
      name: 'Marcar "Ações por teclado" como concluída',
    });
    await checkbox.focus();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 1');

    const botaoRemover = page.getByRole('button', {
      name: 'Deletar tarefa: Ações por teclado',
    });
    await botaoRemover.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.tarefas-empty')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('0');
  });

  test('não apresenta rolagem horizontal em telas móveis, tablet e desktop', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'x'.repeat(100));

    for (const largura of [320, 375, 768, 1280]) {
      await page.setViewportSize({ width: largura, height: 900 });
      await expect(page.getByLabel('Nova tarefa', { exact: true })).toBeVisible();
      await expect(page.getByRole('listitem')).toBeVisible();
      const larguraDaPagina = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(larguraDaPagina, `overflow horizontal na viewport de ${largura}px`).toBe(true);
    }
  });

  test('reduz animações quando o usuário prefere movimento reduzido', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await criarTarefa(page, 'Mensagem com movimento reduzido');
    await page.getByLabel('Nova tarefa', { exact: true }).fill('');
    await page.getByRole('button', { name: 'Criar nova tarefa' }).click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCSS('animation-name', 'none');
  });
});
