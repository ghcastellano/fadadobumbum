# Fada do Bumbum — Dra. Enyla Cerqueira

Site oficial (demonstração em aprovação) da Dra. Enyla Cerqueira, biomédica esteta com foco em harmonização glútea, e proposta comercial em `/oferta`.

## Rotas

- `/` — site: hero, filosofia, a Dra., mapa do contorno interativo, antes/depois, Madrid, stories "A Dra. responde", jornada, mapa do objetivo (WhatsApp), clínica, dúvidas, Grupo VIP
- `/oferta` — apresentação de venda (teclado ← →, roda do mouse, toque, capítulos, `#número`, tela cheia com F)
- `/politica-de-privacidade`

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build && npm start
node tests/qa.mjs            # interações (desktop + celular + /oferta)
node tests/shoot-devices.mjs # iPhone SE, iPhone, iPad, desktop, 1920 — sem overflow
```

## Antes de liberar no Google

O site está com `noindex` (metadata, `robots.ts` e header `X-Robots-Tag` em `next.config.mjs`). Para publicar de verdade, remova os três.

Textos e valores: `lib/content.ts` (site) e `lib/offer.ts` (proposta).
