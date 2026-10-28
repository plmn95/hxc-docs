#!/usr/bin/env node
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = fileURLToPath(new URL('../', import.meta.url));
const logo = await readFile(path.join(root, 'public/hexcomposer-lockup.svg'), 'utf8');
const font = await readFile(path.join(root, 'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: DocsMono; src: url(data:font/woff2;base64,${font.toString('base64')}); font-weight: 100 800; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #0f0f10; }
    main { position: relative; width: 1200px; height: 630px; padding: 92px 100px; }
    .brand { width: 586px; height: 68px; }
    .brand svg { width: 100%; height: 100%; }
    .label { position: absolute; left: 89px; bottom: 68px; color: #e8912a; font: 600 240px/1 DocsMono, monospace; letter-spacing: -16px; }
  </style></head><body><main aria-label="Hex Composer docs"><div class="brand">${logo}</div><div class="label">docs</div></main></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await mkdir(path.join(root, 'public'), { recursive: true });
  await page.screenshot({ path: path.join(root, 'public/social-docs-v1.png') });
} finally {
  await browser.close();
}
console.log('Rendered public/social-docs-v1.png (1200×630)');
