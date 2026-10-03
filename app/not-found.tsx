import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="slats noise grid min-h-[100svh] place-items-center px-6 text-center text-cream">
      <div className="relative">
        <p className="eyebrow text-gold">Erro 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,7rem)] leading-none">Essa página <em className="shimmer">sumiu.</em></h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-cream/80">Até a fada se perde às vezes. Volte para o início e continue de onde parou.</p>
        <Link href="/" className="mt-10 inline-flex min-h-14 items-center rounded-full bg-gold px-8 text-sm font-medium uppercase tracking-[.16em] text-espresso">Voltar ao início</Link>
      </div>
    </main>
  );
}
