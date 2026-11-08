import { expect, test } from './fixtures';
import { criarTarefa } from './helpers';

test.describe('Validação e conteúdo seguro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('exibe aviso acessível ao enviar o formulário vazio', async ({ page }) => {
    await page.getByRole('button', { name: 'Criar nova tarefa' }).click();

    const aviso = page.getByRole('alert');
    await expect(aviso).toHaveText('Digite uma tarefa antes de criar.');
    await expect(page.getByRole('listitem')).toHaveCount(0);
    await expect(page.locator('#contador-criadas')).toHaveText('0');
  });

  test('rejeita texto composto somente por espaços', async ({ page }) => {
    await criarTarefa(page, '     ');

    await expect(page.getByRole('alert')).toHaveText('Digite uma tarefa antes de criar.');
    await expect(page.getByRole('listitem')).toHaveCount(0);
  });

  test('aceita tarefa no limite de 100 caracteres', async ({ page }) => {
    const texto = 'x'.repeat(100);
    const campo = page.getByLabel('Nova tarefa', { exact: true });

    await expect(campo).toHaveAttribute('maxlength', '100');
    await criarTarefa(page, texto);

    await expect(page.getByRole('listitem')).toHaveCount(1);
    await expect(page.getByText(texto, { exact: true })).toBeVisible();
  });

  test('exibe conteúdo parecido com HTML como texto literal', async ({ page }) => {
    await page.evaluate(() => {
      (window as Window & { scriptDaTarefaExecutado?: boolean }).scriptDaTarefaExecutado = false;
    });
    const texto = '<img src=x onerror="window.scriptDaTarefaExecutado=true">';
    await criarTarefa(page, texto);

    await expect(page.getByText(texto, { exact: true })).toBeVisible();
    await expect(page.locator('.tarefas-box img')).toHaveCount(0);
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as Window & { scriptDaTarefaExecutado?: boolean }).scriptDaTarefaExecutado
        )
      )
      .toBe(false);
  });

  test('substitui o aviso anterior e remove o aviso temporário', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-11-08T00:00:00Z') });
    await page.clock.pauseAt(new Date('2026-11-08T00:00:00Z'));
    await page.evaluate(() => {
      const gravarOriginal = Storage.prototype.setItem;
      let falharProximaGravacao = true;
      Storage.prototype.setItem = function (chave, valor) {
        if (chave === 'tarefas' && falharProximaGravacao) {
          falharProximaGravacao = false;
          throw new DOMException('Armazenamento indisponível', 'QuotaExceededError');
        }
        gravarOriginal.call(this, chave, valor);
      };
    });
    await criarTarefa(page, 'Primeira mensagem de falha');
    await expect(page.getByRole('alert')).toHaveText(
      'Não foi possível salvar as tarefas no navegador.'
    );
    await page.clock.runFor(1000);

    const botaoCriar = page.getByRole('button', { name: 'Criar nova tarefa' });
    await page.getByLabel('Nova tarefa', { exact: true }).fill('');
    await botaoCriar.click();

    await expect(page.getByRole('alert')).toHaveCount(1);
    await expect(page.getByRole('alert')).toHaveText('Digite uma tarefa antes de criar.');
    await page.clock.runFor(2000);
    await expect(page.getByRole('alert')).toHaveText('Digite uma tarefa antes de criar.');
    await page.clock.runFor(1000);
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
