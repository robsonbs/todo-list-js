import { expect, test } from '@playwright/test';
import { criarTarefa, tarefaComTexto } from './helpers';

test.describe('Jornadas principais da aplicação', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('cria uma tarefa pelo botão e limpa o campo', async ({ page }) => {
    const campo = page.getByLabel('Nova tarefa', { exact: true });

    await criarTarefa(page, 'Estudar JavaScript');

    await expect(tarefaComTexto(page, 'Estudar JavaScript')).toBeVisible();
    await expect(campo).toHaveValue('');
    await expect(page.locator('#contador-criadas')).toHaveText('1');
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 1');
  });

  test('cria exatamente uma tarefa ao pressionar Enter', async ({ page }) => {
    const campo = page.getByLabel('Nova tarefa', { exact: true });
    await campo.fill('Tarefa pelo teclado');
    await campo.press('Enter');

    await expect(tarefaComTexto(page, 'Tarefa pelo teclado')).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(campo).toHaveValue('');
  });

  test('remove espaços externos ao criar uma tarefa', async ({ page }) => {
    await criarTarefa(page, '   Organizar estudos   ');

    await expect(tarefaComTexto(page, 'Organizar estudos')).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(1);
  });

  test('marca e desmarca uma tarefa atualizando o contador', async ({ page }) => {
    await criarTarefa(page, 'Tarefa alternável');
    const tarefa = tarefaComTexto(page, 'Tarefa alternável');
    const checkbox = tarefa.getByRole('checkbox');

    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 1');

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 1');
  });

  test('altera apenas a tarefa marcada em uma lista com várias tarefas', async ({ page }) => {
    await criarTarefa(page, 'Primeira tarefa');
    await criarTarefa(page, 'Segunda tarefa');

    await tarefaComTexto(page, 'Segunda tarefa').getByRole('checkbox').check();

    await expect(tarefaComTexto(page, 'Primeira tarefa').getByRole('checkbox')).not.toBeChecked();
    await expect(tarefaComTexto(page, 'Segunda tarefa').getByRole('checkbox')).toBeChecked();
    await expect(page.locator('#contador-criadas')).toHaveText('2');
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 2');
  });

  test('remove somente a tarefa escolhida e atualiza os contadores', async ({ page }) => {
    await criarTarefa(page, 'Manter');
    await criarTarefa(page, 'Remover');
    await tarefaComTexto(page, 'Manter').getByRole('checkbox').check();

    await tarefaComTexto(page, 'Remover')
      .getByRole('button', { name: 'Deletar tarefa: Remover' })
      .click();

    await expect(tarefaComTexto(page, 'Remover')).toHaveCount(0);
    await expect(tarefaComTexto(page, 'Manter')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('1');
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 1');
  });

  test('remove a tarefa quando o clique atinge o SVG interno', async ({ page }) => {
    await criarTarefa(page, 'Remover pelo ícone');
    const tarefa = tarefaComTexto(page, 'Remover pelo ícone');

    await tarefa.locator('.remove-btn svg').click();

    await expect(tarefa).toHaveCount(0);
    await expect(page.locator('.tarefas-empty')).toBeVisible();
  });

  test('volta ao estado vazio ao remover a última tarefa', async ({ page }) => {
    await criarTarefa(page, 'Única tarefa');
    await tarefaComTexto(page, 'Única tarefa')
      .getByRole('button', { name: 'Deletar tarefa: Única tarefa' })
      .click();

    await expect(page.locator('.tarefas-empty')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('0');
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 0');
  });

  test('abre a edição focada e permite cancelar com Escape', async ({ page }) => {
    await criarTarefa(page, 'Texto original');
    const tarefa = tarefaComTexto(page, 'Texto original');
    await tarefa.getByText('Texto original', { exact: true }).dblclick();

    const campoEdicao = page.getByRole('textbox', { name: 'Editar tarefa' });
    await expect(campoEdicao).toBeFocused();
    await expect(campoEdicao).toHaveValue('Texto original');
    await campoEdicao.fill('Alteração descartada');
    await campoEdicao.press('Escape');

    await expect(tarefaComTexto(page, 'Texto original')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Editar tarefa' })).toHaveCount(0);
  });

  test('salva a edição ao pressionar Enter e normaliza espaços', async ({ page }) => {
    await criarTarefa(page, 'Antes');
    await tarefaComTexto(page, 'Antes').getByText('Antes', { exact: true }).dblclick();

    const campoEdicao = page.getByRole('textbox', { name: 'Editar tarefa' });
    await campoEdicao.fill('   Depois   ');
    await campoEdicao.press('Enter');

    await expect(tarefaComTexto(page, 'Depois')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('1');
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 1');
  });

  test('salva a edição ao perder o foco', async ({ page }) => {
    await criarTarefa(page, 'Editar ao sair');
    await tarefaComTexto(page, 'Editar ao sair')
      .getByText('Editar ao sair', { exact: true })
      .dblclick();

    const campoEdicao = page.getByRole('textbox', { name: 'Editar tarefa' });
    await campoEdicao.fill('Salvo no blur');
    await page.getByLabel('Nova tarefa', { exact: true }).focus();

    await expect(tarefaComTexto(page, 'Salvo no blur')).toBeVisible({ timeout: 2000 });
    await expect(page.getByRole('textbox', { name: 'Editar tarefa' })).toHaveCount(0);
  });

  test('fecha edição vazia sem apagar o texto original', async ({ page }) => {
    await criarTarefa(page, 'Preservar texto');
    await tarefaComTexto(page, 'Preservar texto')
      .getByText('Preservar texto', { exact: true })
      .dblclick();

    const campoEdicao = page.getByRole('textbox', { name: 'Editar tarefa' });
    await campoEdicao.fill('   ');
    await campoEdicao.press('Enter');

    await expect(tarefaComTexto(page, 'Preservar texto')).toBeVisible();
    await expect(page.locator('.mensagem-flash')).toHaveCount(0);
  });
});
