# Fada do Bumbum — Dra. Enyla Cerqueira

Site oficial (demonstração em aprovação) da Dra. Enyla Cerqueira, biomédica esteta com foco em harmonização glútea, e proposta comercial em `/proposta`.

## Rotas

- `/` — site: hero, filosofia, a Dra., mapa do contorno interativo, antes/depois, Madrid, stories "A Dra. responde", jornada, mapa do objetivo (WhatsApp), clínica, dúvidas, Grupo VIP
- `/proposta` — apresentação de venda; o antigo `/oferta` redireciona para cá (teclado ← →, roda do mouse, toque, capítulos, `#número`, tela cheia com F)
- `/politica-de-privacidade`

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build && npm start
node tests/qa.mjs            # interações (desktop + celular + /proposta)
node tests/shoot-devices.mjs # iPhone SE, iPhone, iPad, desktop, 1920 — sem overflow
```

## Antes de liberar no Google

O site está com `noindex` (metadata, `robots.ts` e header `X-Robots-Tag` em `next.config.mjs`). Para publicar de verdade, remova os três.

Textos e valores: `lib/content.ts` (site) e `lib/offer.ts` (proposta).

## Testar no iPad / celular (mesma rede Wi-Fi)

1. No computador (Mac/PC) com Node 22: `npm ci` e depois `npm run rede`.
2. Descubra o IP local do computador (Mac: `ipconfig getifaddr en0`; Windows: `ipconfig`).
3. No Safari do iPad, abra `http://<IP>:3000` (ex.: `http://192.168.0.12:3000`).

Use a versão de produção (`npm run rede`), não `npm run dev`: o modo dev é bem mais lento e não representa a fluidez real.
Para inspecionar no iPad: Ajustes › Apps › Safari › Avançado › Web Inspector, e no Mac Safari › Desenvolvedor › [iPad].

`npm run perf:ipad` (com o servidor rodando) mede a fluidez da rolagem emulando um iPad com CPU mais lenta.
