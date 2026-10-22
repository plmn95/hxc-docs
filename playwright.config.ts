import { defineConfig } from '@playwright/test';
const port = Number(process.env.PLAYWRIGHT_PORT || 4322);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PLAYWRIGHT_PORT must be a valid TCP port.');
const origin = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests', workers: 1, timeout: 120000,
  outputDir: '/tmp/vizard-editor-test-results',
  use: { baseURL: `${origin}/hxc-docs/`, browserName: 'chromium',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined } },
  webServer: { command: `npm run dev -- --host 127.0.0.1 --port ${port}`, url: `${origin}/hxc-docs/`, reuseExistingServer: !process.env.CI,
    env: { ASTRO_DEV_BACKGROUND: '1', VIZARD_DOCS_BASE: '/hxc-docs', VIZARD_SUGGESTIONS_API: 'http://127.0.0.1:8787', VIZARD_TURNSTILE_SITE_KEY: '1x00000000000000000000AA' } },
});
