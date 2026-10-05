// Capturas de dispositivos (iPhone, iPad retrato/paisagem, desktop) e checagem de overflow horizontal.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const out = new URL('./screens/', import.meta.url).pathname; mkdirSync(out, { recursive: true });
const devices = [
  { name: 'iphone-se', viewport: { width: 320, height: 640 }, mobile: true },
  { name: 'iphone', viewport: { width: 390, height: 844 }, mobile: true },
  { name: 'ipad', viewport: { width: 768, height: 1024 }, mobile: true },
  { name: 'ipad-land', viewport: { width: 1180, height: 820 }, mobile: true },
  { name: 'desktop', viewport: { width: 1440, height: 900 }, mobile: false },
  { name: 'wide', viewport: { width: 1920, height: 1080 }, mobile: false },
];
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });
let fail = 0;
for (const d of devices) {
  for (const path of ['/', '/proposta']) {
    const ctx = await browser.newContext({ viewport: d.viewport, isMobile: d.mobile, hasTouch: d.mobile });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('fx-intro', '1'); } catch {} });
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1200);
    // percorre a página para disparar animações e mede overflow
    const overflow = await p.evaluate(async () => {
      const step = innerHeight * .8; let bad = [];
      for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); if (r.width && r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('.overflow-hidden,.overflow-x-auto,[aria-hidden="true"],.marquee-track,.of-slide,svg')) bad.push(el.tagName + '.' + String(el.className).slice(0, 40)); }
      return { sw: document.documentElement.scrollWidth, iw: innerWidth, bad: bad.slice(0, 5) };
    });
    if (overflow.sw > overflow.iw || errs.length) fail++;
    console.log(d.name, path, 'scrollWidth', overflow.sw, '/', overflow.iw, overflow.bad.length ? overflow.bad : '', errs.length ? errs : '');
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
    await p.screenshot({ path: `${out}dev-${d.name}${path === '/' ? '' : '-proposta'}.png` });
    await ctx.close();
  }
}
await browser.close();
process.exit(fail ? 1 : 0);
