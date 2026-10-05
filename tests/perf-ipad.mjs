// Mede fluidez da rolagem emulando iPad Air (toque, 820x1180, DPR 2) com CPU 4x mais lenta.
import { chromium } from 'playwright';
const url = process.argv[2] ?? 'http://localhost:3000/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext({
  viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
});
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
const info = await p.evaluate(() => ({ lenis: document.documentElement.classList.contains('lenis'), cursor: document.documentElement.classList.contains('fx-cursor'), touch: navigator.maxTouchPoints }));
const heroBefore = await p.evaluate(() => getComputedStyle(document.querySelector('#inicio .relative.z-10')).transform);
const r = await p.evaluate(async () => {
  const frames = []; let last = performance.now(), run = true;
  const loop = (t) => { frames.push(t - last); last = t; if (run) requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  const total = document.documentElement.scrollHeight - innerHeight;
  for (let y = 0; y < Math.min(total, 9000); y += 40) { window.scrollTo(0, y); await new Promise(r => requestAnimationFrame(r)); }
  run = false;
  const s = frames.slice(2).sort((a, b) => a - b);
  return { frames: s.length, p50: s[Math.floor(s.length * .5)].toFixed(1), p95: s[Math.floor(s.length * .95)].toFixed(1), long: s.filter(x => x > 50).length };
});
await p.evaluate(() => window.scrollTo(0, 500)); await p.waitForTimeout(400);
const heroAfter = await p.evaluate(() => getComputedStyle(document.querySelector('#inicio .relative.z-10')).transform);
console.log(JSON.stringify({ ...info, ...r, heroBefore, heroAfter }));
await b.close();
