// Capturas por seção (desktop e celular) para revisão visual.
// Uso: BASE_URL=http://localhost:3000 node tests/shoot.mjs [desktop|mobile] [ids...]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE_URL ?? 'http://localhost:3000';
const mode = process.argv[2] ?? 'desktop';
const only = process.argv.slice(3);
const out = new URL('./screens/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const sections = ['inicio', 'filosofia', 'sobre', 'harmonizacao', 'resultados', 'madrid', 'stories', 'jornada', 'avaliacao', 'clinica', 'duvidas', 'footer'];
const viewport = mode === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 };

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });
const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mode === 'mobile', hasTouch: mode === 'mobile' });
await context.addInitScript(() => { try { sessionStorage.setItem('fx-intro', '1'); } catch {} });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
for (const id of sections) {
  if (only.length && !only.includes(id)) continue;
  if (id === 'footer') await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  else await page.evaluate((s) => { const el = document.getElementById(s); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - (s === 'inicio' ? 0 : 0)); }, id);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}${mode}-${id}.png` });
}
console.log(errors.length ? 'ERROS:\n' + errors.join('\n') : 'sem erros de console');
await browser.close();
