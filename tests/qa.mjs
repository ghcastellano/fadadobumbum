// QA funcional: interações principais do site e da /proposta.
import { chromium } from 'playwright';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });
const ok = []; const fail = [];
const check = (name, cond) => (cond ? ok : fail).push(name);
for (const mobile of [false, true]) {
  const ctx = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem('fx-intro', '1'));
  const p = await ctx.newPage(); const tag = mobile ? '[mobile]' : '[desktop]';
  const errors = []; p.on('pageerror', (e) => errors.push(String(e)));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  check(`${tag} h1`, (await p.locator('h1').getAttribute('aria-label')) === 'Fada do Bumbum');
  const wa = await p.locator('a[href^="https://wa.me/5511918486677"]').count();
  check(`${tag} links WhatsApp (${wa})`, wa >= 8);
  // antes/depois
  await p.locator('#resultados').scrollIntoViewIfNeeded();
  await p.click('button:has-text("Ver resultado")');
  const slider = p.locator('[role="slider"][aria-label="Comparar antes e depois"]');
  await slider.focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
  check(`${tag} slider teclado`, Number(await slider.getAttribute('aria-valuenow')) > 50);
  // mapa do contorno
  await p.locator('#harmonizacao').scrollIntoViewIfNeeded();
  await p.click('button[aria-label^="Região 03"]', { force: true });
  check(`${tag} mapa ponto 03`, await p.locator('text=Depressão lateral').first().isVisible());
  // quiz
  await p.locator('#avaliacao').scrollIntoViewIfNeeded();
  await p.click('button:has-text("Mais projeção")');
  await p.click('button:has-text("Pesquisando opções")');
  const href = await p.locator('#avaliacao a[href^="https://wa.me/"]').getAttribute('href');
  check(`${tag} quiz mensagem`, decodeURIComponent(href).includes('mais projeção'));
  // stories
  await p.locator('#stories').scrollIntoViewIfNeeded();
  await p.locator('#stories button:has-text("Tenho medo de fazer")').click();
  await p.waitForTimeout(800);
  check(`${tag} stories abre`, await p.locator('[role="dialog"][aria-label^="Vídeo"]').isVisible());
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  check(`${tag} stories fecha`, (await p.locator('[role="dialog"][aria-label^="Vídeo"]').count()) === 0);
  // faq
  await p.click('button:has-text("Quanto custa?")');
  check(`${tag} faq`, await p.locator('text=O valor depende do planejamento').isVisible());
  if (mobile) { await p.evaluate(() => scrollTo(0, 0)); await p.click('button[aria-label="Abrir menu"]'); check(`${tag} menu`, await p.locator('#menu-movel').isVisible()); }
  check(`${tag} sem erros JS`, errors.length === 0);
  await ctx.close();
}
// proposta
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base + '/proposta', { waitUntil: 'networkidle' });
await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
check('[proposta] teclado → slide 3', (await p.locator('.of-count').innerText()).startsWith('03'));
await p.click('.of-top-invite'); await p.waitForTimeout(500);
check('[proposta] atalho investimento', (await p.locator('.of-count').innerText()).startsWith('10'));
check('[proposta] preço', await p.locator('text=R$ 9.600').first().isVisible());
await browser.close();
console.log('OK:', ok.length, '\n' + ok.join('\n'));
if (fail.length) { console.log('FALHAS:\n' + fail.join('\n')); process.exit(1); }
