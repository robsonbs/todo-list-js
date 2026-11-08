import { defineConfig, devices } from '@playwright/test';

// No Docker, o serviço "servidor" é acessado por http://servidor:8080.
// Fora do Docker, usamos o servidor local em localhost.
const baseURL = process.env.BASE_URL || 'http://localhost:8080';

const config = {
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // No CI/Docker usamos o reporter "list" porque o HTML abre um
  // servidor local e mantém o processo vivo, travando o `docker compose up`.
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

// O webServer local só é necessário quando não há BASE_URL externa
// (no Docker, quem serve a aplicação é o container "servidor").
if (!process.env.BASE_URL) {
  config.webServer = {
    command: 'python3 -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  };
}

export default defineConfig(config);
