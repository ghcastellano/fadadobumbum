// Capturas de cada slide da /proposta (desktop) para revisão.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const out = new URL('./screens/', import.meta.url).pathname; mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = []; page.on('pageerror', (e) => errors.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(base + '/proposta', { waitUntil: 'networkidle' });
const total = await page.locator('.of-slide').count();
for (let i = 1; i <= total; i++) {
  await page.evaluate((n) => { location.hash = '#' + n; }, i);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}proposta-${String(i).padStart(2, '0')}.png` });
}
console.log('slides', total, errors.length ? 'ERROS:\n' + errors.join('\n') : 'sem erros');
await browser.close();
