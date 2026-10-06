import { NextResponse } from 'next/server';

// Projeto encerrado (a cliente não seguiu com a proposta): todo o site e a
// /proposta respondem 410 "Gone". O código continua no repositório; para
// reativar, basta apagar este arquivo.
export function proxy() {
  return new NextResponse('Página indisponível.', {
    status: 410,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store' },
  });
}

export const config = { matcher: '/:path*' };
