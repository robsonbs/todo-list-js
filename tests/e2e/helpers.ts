// ============================================================
// HELPERS.TS — Ações reutilizáveis nos testes E2E
// ------------------------------------------------------------
// Mantém as interações comuns legíveis e próximas da experiência
// do usuário, sem esconder as asserções de cada cenário.
// ============================================================

import { type Locator, type Page } from '@playwright/test';

/**
 * Cria uma tarefa pelo formulário acessível da aplicação.
 * @param pagina Página aberta pelo Playwright
 * @param texto Texto que será enviado pelo usuário
 */
export async function criarTarefa(pagina: Page, texto: string): Promise<void> {
  await pagina.getByLabel('Nova tarefa', { exact: true }).fill(texto);
  await pagina.getByRole('button', { name: 'Criar nova tarefa' }).click();
}

/**
 * Localiza uma tarefa pelo texto exibido, sem depender de sua posição.
 * @param pagina Página aberta pelo Playwright
 * @param texto Texto visível da tarefa
 * @returns Elemento semântico da tarefa
 */
export function tarefaComTexto(pagina: Page, texto: string): Locator {
  return pagina.getByRole('listitem').filter({
    has: pagina.getByText(texto, { exact: true }),
  });
}
