import { expect, test } from './fixtures';
import type { Page } from '@playwright/test';

async function abrirPagina(page: Page) {
  await page.goto('/lista-hierarquica.html');
}

async function criarPrincipal(page: Page, texto: string) {
  await page.getByLabel('Nova tarefa principal').fill(texto);
  await page.getByRole('button', { name: 'Criar tarefa principal' }).click();
}

async function adicionarFilha(page: Page, pai: string, texto: string) {
  await page.getByRole('button', { name: `Adicionar subtarefa a: ${pai}` }).click();
  await page.getByLabel(`Nova subtarefa de: ${pai}`).fill(texto);
  await page.getByRole('button', { name: `Adicionar subtarefa de: ${pai}` }).click();
}

test.describe('Lista em até três níveis', () => {
  test.beforeEach(async ({ page }) => {
    await abrirPagina(page);
  });

  test('renderiza os SVGs do cabeçalho, estado vazio, criação e remoção', async ({ page }) => {
    await expect(page.locator('.logo-icon svg')).toBeVisible();
    await expect(page.locator('.tarefas-empty__icone svg')).toBeVisible();
    await expect(page.locator('#btn-criar .icone-adicionar svg')).toBeVisible();

    await criarPrincipal(page, 'Com ícones');
    await expect(page.locator('.botao-subtarefa .icone-adicionar svg')).toBeVisible();
    await expect(page.locator('.remove-btn .icone-exclusao svg')).toBeVisible();
    await expect(page.locator('.botao-editar-tarefa .icone-editar svg')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Editar tarefa: Com ícones' })).toHaveAttribute(
      'title',
      'Editar tarefa: Com ícones'
    );
  });

  test('a página simples e a variante têm links para alternar entre elas', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: 'Experimente organizar tarefas em até três níveis' })
      .click();
    await expect(page).toHaveURL(/lista-hierarquica\.html$/);
    await page.getByRole('link', { name: 'Voltar à lista simples' }).click();
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('reordena entre irmãos, indenta e promove mantendo a subárvore', async ({ page }) => {
    await criarPrincipal(page, 'Projeto A');
    await criarPrincipal(page, 'Projeto B');
    await adicionarFilha(page, 'Projeto B', 'Detalhe de B');

    const principais = () =>
      page.locator(
        '#lista-hierarquica > .lista-hierarquica > li > .tarefa-hierarquica__linha > .texto-tarefa'
      );
    const filhasPrincipais = () =>
      page.locator(
        '#lista-hierarquica > .lista-hierarquica > li > .lista-hierarquica__filhos > li > .tarefa-hierarquica__linha > .texto-tarefa'
      );

    const abrirReordenacao = page.getByRole('button', {
      name: 'Reordenar tarefa: Projeto B',
    });
    await abrirReordenacao.focus();
    await abrirReordenacao.press('Enter');
    await expect(abrirReordenacao).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('button', { name: 'Mover para cima: Projeto B' })).toBeFocused();
    await page.getByRole('button', { name: 'Mover para cima: Projeto B' }).click();
    await expect(principais()).toHaveText(['Projeto B', 'Projeto A']);

    await page.getByRole('button', { name: 'Mover para baixo: Projeto B' }).click();
    await page.getByRole('button', { name: 'Indentar sob o irmão anterior: Projeto B' }).click();
    await expect(principais()).toHaveText(['Projeto A']);
    await expect(filhasPrincipais()).toHaveText(['Projeto B']);

    await page.getByRole('button', { name: 'Promover um nível: Projeto B' }).click();
    await expect(principais()).toHaveText(['Projeto A', 'Projeto B']);
    await expect(page.getByText('Detalhe de B', { exact: true })).toBeVisible();

    await page.reload();
    await expect(principais()).toHaveText(['Projeto A', 'Projeto B']);
    await expect(page.getByText('Detalhe de B', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Reordenar tarefa: Projeto B' }).click();
    await page.getByRole('button', { name: 'Mover para cima: Projeto B' }).press('Escape');
    await expect(page.getByRole('button', { name: 'Reordenar tarefa: Projeto B' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  test('cria tarefa principal, subtarefa e sub-subtarefa, mas não um quarto nível', async ({
    page,
  }) => {
    await criarPrincipal(page, 'Preparar viagem');
    await adicionarFilha(page, 'Preparar viagem', 'Organizar mala');
    await adicionarFilha(page, 'Organizar mala', 'Separar roupas');

    await expect(page.getByRole('listitem')).toHaveCount(3);
    await expect(
      page.getByRole('button', { name: 'Adicionar subtarefa a: Separar roupas' })
    ).toHaveCount(0);
    await expect(page.locator('#contador-criadas')).toHaveText('3');
  });

  test('mostra pai parcial e conclui o pai quando todas as folhas terminam', async ({ page }) => {
    await criarPrincipal(page, 'Projeto');
    await adicionarFilha(page, 'Projeto', 'Etapa A');
    await adicionarFilha(page, 'Projeto', 'Etapa B');

    const pai = page.getByRole('checkbox', { name: 'Conclusão automática de: Projeto' });
    await page.getByRole('checkbox', { name: 'Marcar como concluída: Etapa A' }).check();
    await expect(pai).toBeDisabled();
    expect(await pai.evaluate((checkbox: HTMLInputElement) => checkbox.indeterminate)).toBe(true);

    await page.getByRole('checkbox', { name: 'Marcar como concluída: Etapa B' }).check();
    await expect(pai).toBeChecked();
    await expect(page.locator('#contador-concluidas')).toHaveText('3 de 3');

    await page.getByRole('checkbox', { name: 'Marcar como concluída: Etapa A' }).uncheck();
    expect(await pai.evaluate((checkbox: HTMLInputElement) => checkbox.indeterminate)).toBe(true);
  });

  test('remover um ramo apaga seus descendentes e preserva outros ramos', async ({ page }) => {
    await criarPrincipal(page, 'Projeto A');
    await adicionarFilha(page, 'Projeto A', 'Ramo descartável');
    await adicionarFilha(page, 'Ramo descartável', 'Descendente descartável');
    await criarPrincipal(page, 'Projeto B');

    await page.getByRole('button', { name: 'Remover tarefa: Ramo descartável' }).click();

    await expect(page.getByText('Ramo descartável', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Descendente descartável', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Projeto A', { exact: true })).toBeVisible();
    await expect(page.getByText('Projeto B', { exact: true })).toBeVisible();
    await expect(page.locator('#contador-criadas')).toHaveText('2');
    await expect(
      page.getByRole('button', { name: 'Editar pelo teclado: Projeto A' })
    ).toBeFocused();
  });

  test('edita uma tarefa pelo teclado', async ({ page }) => {
    await criarPrincipal(page, 'Plano antigo');
    const texto = page.getByRole('button', { name: 'Editar pelo teclado: Plano antigo' });
    await texto.focus();
    await texto.press('Enter');

    const editor = page.getByRole('textbox', { name: 'Editar tarefa: Plano antigo' });
    await expect(page.locator('.formulario-item .icone-salvar svg')).toBeVisible();
    await expect(page.locator('.formulario-item .icone-cancelar svg')).toBeVisible();
    await editor.fill('Plano novo');
    await page.getByRole('button', { name: 'Salvar edição de: Plano antigo' }).click();
    await expect(page.getByText('Plano novo', { exact: true })).toBeVisible();
  });

  test('persiste a árvore sem alterar a lista plana', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('tarefas', 'dados da lista simples'));
    await criarPrincipal(page, 'Curso');
    await adicionarFilha(page, 'Curso', 'Estudar');
    await page.reload();

    await expect(page.getByText('Estudar', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('tarefas'))).toBe(
      'dados da lista simples'
    );
    expect(await page.evaluate(() => localStorage.getItem('tarefas-hierarquicas'))).not.toBeNull();
  });

  test('não cria subtarefa inválida e permite cancelar o formulário', async ({ page }) => {
    await criarPrincipal(page, 'Plano');
    await page.getByRole('button', { name: 'Adicionar subtarefa a: Plano' }).click();
    await expect(page.locator('.formulario-item .icone-salvar svg')).toBeVisible();
    await expect(page.locator('.formulario-item .icone-cancelar svg')).toBeVisible();
    await page.getByRole('button', { name: 'Adicionar subtarefa de: Plano' }).click();

    await expect(page.locator('#mensagem-hierarquia')).toContainText('Digite uma tarefa');
    await expect(page.getByRole('listitem')).toHaveCount(1);
    await page.getByRole('button', { name: 'Cancelar adição de subtarefa de: Plano' }).click();
    await expect(page.getByLabel('Nova subtarefa de: Plano')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Editar pelo teclado: Plano' })).toBeFocused();
  });

  test('mantém a tarefa visível e avisa se o navegador recusar a gravação', async ({ page }) => {
    await page.addInitScript(() => {
      const salvarOriginal = Storage.prototype.setItem;
      Storage.prototype.setItem = function (chave, valor) {
        if (chave === 'tarefas-hierarquicas') {
          throw new Error('Gravação bloqueada no teste');
        }
        salvarOriginal.call(this, chave, valor);
      };
    });
    await page.reload();
    await criarPrincipal(page, 'Ainda está na tela');

    await expect(page.getByText('Ainda está na tela', { exact: true })).toBeVisible();
    await expect(page.locator('#mensagem-hierarquia')).toContainText('Não foi possível salvar');
  });

  test('não apresenta rolagem horizontal em viewport móvel', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await criarPrincipal(page, 'Uma tarefa com texto que precisa caber no celular');
    await adicionarFilha(page, 'Uma tarefa com texto que precisa caber no celular', 'Subtarefa');

    const larguraDocumento = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(larguraDocumento).toBeLessThanOrEqual(375);
    const larguraBotaoCriar = await page
      .locator('#btn-criar')
      .evaluate((botao) => botao.getBoundingClientRect().width);
    expect(larguraBotaoCriar).toBeGreaterThan(300);

    const largurasDosTextos = await page
      .locator('.texto-tarefa')
      .evaluateAll((elementos) =>
        elementos.map((elemento) => elemento.getBoundingClientRect().width)
      );
    expect(Math.min(...largurasDosTextos)).toBeGreaterThan(150);

    await page
      .getByRole('button', {
        name: 'Reordenar tarefa: Uma tarefa com texto que precisa caber no celular',
      })
      .click();
    const larguraComMenuAberto = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(larguraComMenuAberto).toBeLessThanOrEqual(375);
  });
});
