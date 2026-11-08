import { test, expect } from '@playwright/test';

test.use({ screenshot: 'only-on-failure' });

test.describe('Validação visual - Todo List', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Página carrega com todos os elementos visuais', async ({ page }) => {
    // Título da página
    await expect(page).toHaveTitle(/Lista de Tarefas/);

    // Elementos principais visíveis
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#todo-input')).toBeVisible();
    await expect(page.locator('#btn-criar')).toBeVisible();
    await expect(page.locator('.tarefas-box')).toBeVisible();
    await expect(page.locator('#contador-criadas')).toBeVisible();
    await expect(page.locator('#contador-concluidas')).toBeVisible();
  });

  test('Adicionar tarefa exibe na lista com estrutura visual correta', async ({ page }) => {
    await page.fill('#todo-input', 'Estudar JavaScript');
    await page.click('#btn-criar');

    const tarefa = page.locator('.tarefa').first();
    await expect(tarefa).toBeVisible();

    // Checkbox presente
    const checkbox = tarefa.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    // Texto da tarefa
    const texto = tarefa.locator('span.texto-tarefa');
    await expect(texto).toHaveText('Estudar JavaScript');

    // Botão de exclusão com ícone
    const btnExcluir = tarefa.locator('.remove-btn');
    await expect(btnExcluir).toBeVisible();
    await expect(btnExcluir.locator('svg')).toBeVisible();

    // Contador atualizado
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });

  test('Checkbox concluído: texto riscado e cor cinza', async ({ page }) => {
    await page.fill('#todo-input', 'Tarefa para completar');
    await page.click('#btn-criar');

    const tarefa = page.locator('.tarefa').first();
    const checkbox = tarefa.locator('input[type="checkbox"]');
    const texto = tarefa.locator('span.texto-tarefa');

    // Antes de marcar
    await expect(texto).toHaveCSS('text-decoration', 'none');

    // Marcar como concluído
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Depois de marcar: texto deve ficar riscado
    await expect(texto).toHaveCSS('text-decoration', /line-through/);
    await expect(texto).toHaveCSS('color', /rgb\(128, 128, 128\)/); // --gray-300 = #808080

    // Checkbox deve ficar roxo (--purple-dark = #5E60CE)
    await expect(checkbox).toHaveCSS('background-color', /rgb\(94, 96, 206\)/);
  });

  test('Hover no botão de exclusão: ícone fica vermelho', async ({ page }) => {
    await page.fill('#todo-input', 'Tarefa para excluir');
    await page.click('#btn-criar');

    const btnExcluir = page.locator('.remove-btn').first();
    const svg = btnExcluir.locator('svg');

    // Cor padrão do ícone (cinza)
    await expect(svg).toHaveCSS('color', /rgb\(128, 128, 128\)/); // --gray-300

    // Hover: ícone deve ficar vermelho (--red = #E25858 = rgb(226, 88, 88))
    await btnExcluir.hover();
    await expect(svg).toHaveCSS('color', /rgb\(226, 88, 88\)/);

    // Screenshot para comparação visual
    await page.screenshot({ path: 'tests/e2e/screenshots/hover-exclusao-vermelho.png' });
  });

  test('Modo de edição: duplo clique exibe campo de edição', async ({ page }) => {
    await page.fill('#todo-input', 'Tarefa para editar');
    await page.click('#btn-criar');

    const tarefa = page.locator('.tarefa').first();
    const texto = tarefa.locator('span.texto-tarefa');

    // Duplo clique no texto
    await texto.dblclick();

    // Campo de edição deve aparecer
    const campoEdicao = page.locator('.campo-edicao');
    await expect(campoEdicao).toBeVisible();
    await expect(campoEdicao).toHaveValue('Tarefa para editar');
    await expect(campoEdicao).toBeFocused();

    // O span original deve estar escondido
    await expect(texto).toHaveCSS('display', 'none');

    // Cancelar com Esc
    await campoEdicao.press('Escape');
    await expect(campoEdicao).not.toBeVisible();
    await expect(texto).toHaveCSS('display', '');
    await expect(texto).toHaveText('Tarefa para editar');
  });

  test('Mensagem flash aparece quando tenta adicionar tarefa vazia', async ({ page }) => {
    await page.click('#btn-criar');

    const mensagem = page.locator('.mensagem-flash');
    await expect(mensagem).toBeVisible();
    await expect(mensagem).toHaveText('Digite uma tarefa antes de criar.');
    await expect(mensagem).toHaveAttribute('role', 'alert');
    await expect(mensagem).toHaveAttribute('aria-live', 'polite');

    // Mensagem deve sumir após 3 segundos
    await page.waitForTimeout(3500);
    await expect(mensagem).not.toBeVisible();
  });

  test('Persistência: tarefa sobrevive ao recarregar página', async ({ page }) => {
    await page.fill('#todo-input', 'Tarefa persistente');
    await page.click('#btn-criar');

    await expect(page.locator('.tarefa')).toHaveCount(1);
    await expect(page.locator('.texto-tarefa')).toHaveText('Tarefa persistente');

    // Recarregar página
    await page.reload();

    // Tarefa deve continuar lá
    await expect(page.locator('.tarefa')).toHaveCount(1);
    await expect(page.locator('.texto-tarefa')).toHaveText('Tarefa persistente');
    await expect(page.locator('#contador-criadas')).toHaveText('1');
  });

  test('Estado vazio quando não há tarefas', async ({ page }) => {
    await expect(page.locator('.tarefas-empty')).toBeVisible();
    await expect(page.locator('.tarefas-empty span')).toHaveText(
      'Você ainda não tem tarefas cadastradas'
    );
  });

  test('Contador de concluídas atualiza corretamente', async ({ page }) => {
    await page.fill('#todo-input', 'Tarefa 1');
    await page.click('#btn-criar');
    await page.fill('#todo-input', 'Tarefa 2');
    await page.click('#btn-criar');

    await expect(page.locator('#contador-criadas')).toHaveText('2');
    await expect(page.locator('#contador-concluidas')).toHaveText('0 de 2');

    // Marcar primeira como concluída
    const primeiroCheckbox = page.locator('.tarefa').first().locator('input[type="checkbox"]');
    await primeiroCheckbox.check();

    await expect(page.locator('#contador-concluidas')).toHaveText('1 de 2');
  });

});
