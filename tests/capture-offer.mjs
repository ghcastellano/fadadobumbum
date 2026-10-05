// Gera as capturas do site usadas na apresentação /proposta e a imagem OG.
import { chromium } from 'playwright';
import sharp from 'sharp';

const base = process.env.BASE_URL ?? 'http://localhost:3000';
const out = new URL('../public/assets/oferta/', import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });

async function page(viewport, mobile = false) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: 'no-preference' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('fx-intro', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(3200);
  return p;
}
const toWebp = (buf, file, width) => sharp(buf).resize({ width }).webp({ quality: 82 }).toFile(out + file);
const scrollTo = async (p, sel, offset = 0) => { await p.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]); await p.waitForTimeout(2600); };

// desktop
const d = await page({ width: 1440, height: 900 });
await toWebp(await d.screenshot(), 'tour-hero.webp', 1440);
await scrollTo(d, '#harmonizacao', 110);
await d.click('button:has-text("02 · Projeção")');
await d.waitForTimeout(800);
await toWebp(await d.screenshot(), 'tour-mapa.webp', 1440);
await scrollTo(d, '#resultados', 40);
await d.click('button:has-text("Ver resultado")');
await d.waitForTimeout(3400);
await toWebp(await d.screenshot(), 'tour-resultado.webp', 1440);
await scrollTo(d, '#stories', 0);
await toWebp(await d.screenshot(), 'tour-stories.webp', 1440);
await scrollTo(d, '#avaliacao', 40);
await d.click('button:has-text("Contorno superior")');
await d.click('button:has-text("Mais projeção")');
await d.click('button:has-text("Com medo")');
await d.fill('input[autocomplete="given-name"]', 'Mariana');
await d.waitForTimeout(900);
await toWebp(await d.screenshot(), 'tour-quiz.webp', 1440);

// OG 1200x630 a partir do hero
const og = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await og.addInitScript(() => { try { sessionStorage.setItem('fx-intro', '1'); } catch {} });
const o = await og.newPage();
await o.goto(base + '/', { waitUntil: 'networkidle' });
await o.addStyleTag({ content: 'header, .marquee-track, [aria-label="Rolar para conhecer a filosofia"] { visibility: hidden !important; } section#inicio > div:nth-of-type(2) { padding-top: 24px !important; } section#inicio a[href*="wa.me"], section#inicio a[href="#resultados"] { visibility: hidden !important; }' });
await o.waitForTimeout(3600);
await sharp(await o.screenshot()).jpeg({ quality: 84 }).toFile(new URL('../public/og.jpg', import.meta.url).pathname);

// celular
const m = await page({ width: 390, height: 844 }, true);
await toWebp(await m.screenshot(), 'mobile-hero.webp', 390 * 2);
await scrollTo(m, '#harmonizacao [aria-label^="Desenho"]', -150);
await toWebp(await m.screenshot(), 'mobile-mapa.webp', 390 * 2);
await scrollTo(m, '#avaliacao', 120);
await m.click('button:has-text("Mais projeção")');
await m.click('button:has-text("Um volume sutil")');
await m.waitForTimeout(600);
await toWebp(await m.screenshot(), 'mobile-quiz.webp', 390 * 2);

await browser.close();
console.log('ok');
