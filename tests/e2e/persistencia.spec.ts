import { expect, test } from '@playwright/test';
import { criarTarefa, tarefaComTexto } from './helpers';

test.describe('Persistência no navegador', () => {
  test('mantém tarefa criada após recarregar a página', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'Tarefa persistente');
    await page.reload();

    await expect(tarefaComTexto(page, 'Tarefa persistente')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('1');
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 1');
  });

  test('mantém conclusão após recarregar a página', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'Tarefa concluída');
    await tarefaComTexto(page, 'Tarefa concluída').getByRole('checkbox').check();
    await page.reload();

    await expect(tarefaComTexto(page, 'Tarefa concluída').getByRole('checkbox')).toBeChecked();
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 1');
  });

  test('mantém edição após recarregar a página', async ({ page }) => {
    await page.goto('/');
    await criarTarefa(page, 'Antes de recarregar');
    await tarefaComTexto(page, 'Antes de recarregar')
      .getByText('Antes de recarregar', { exact: true })
      .dblclick();
    await page.getByRole('textbox', { name: 'Editar tarefa' }).fill('Depois de recarregar');
    await page.getByRole('textbox', { name: 'Editar tarefa' }).press('Enter');
    await page.reload();

    await expect(tarefaComTexto(page, 'Depois de recarregar')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });

  test('inicia em estado seguro quando o JSON salvo está corrompido', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('tarefas', '{ JSON inválido'));
    await page.goto('/');

    await expect(page.locator('.tarefas-empty')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('0');
    await criarTarefa(page, 'Aplicação continua utilizável');
    await expect(tarefaComTexto(page, 'Aplicação continua utilizável')).toBeVisible();
  });

  test('descarta registros inválidos e IDs duplicados ao carregar', async ({ page }) => {
    const tarefas = [
      { id: 1, atividade: 'Tarefa válida', completa: false },
      { id: 1, atividade: 'ID duplicado', completa: false },
      { id: -1, atividade: 'ID inválido', completa: false },
      { id: 2, atividade: '   ', completa: false },
      { id: 3, atividade: 'Tarefa concluída', completa: true },
    ];
    await page.addInitScript(
      (dados) => localStorage.setItem('tarefas', JSON.stringify(dados)),
      tarefas
    );
    await page.goto('/');

    await expect(page.getByRole('listitem')).toHaveCount(2);
    await expect(tarefaComTexto(page, 'Tarefa válida')).toBeVisible();
    await expect(tarefaComTexto(page, 'Tarefa concluída').getByRole('checkbox')).toBeChecked();
    await expect(page.locator('#contador-criadas')).toHaveText('2');
    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 2');
  });

  test('avisa quando falha a gravação sem quebrar a interface atual', async ({ page }) => {
    await page.addInitScript(() => {
      const gravarOriginal = Storage.prototype.setItem;
      Storage.prototype.setItem = function (chave, valor) {
        if (chave === 'tarefas') {
          throw new DOMException('Armazenamento indisponível', 'QuotaExceededError');
        }
        gravarOriginal.call(this, chave, valor);
      };
    });
    await page.goto('/');
    await criarTarefa(page, 'Visível nesta sessão');

    await expect(tarefaComTexto(page, 'Visível nesta sessão')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(
      'Não foi possível salvar as tarefas no navegador.'
    );
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });
});
