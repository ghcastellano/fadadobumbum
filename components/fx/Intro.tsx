/**
 * Cortina de abertura só com CSS (não espera o JS hidratar): o monograma EC
 * se revela, o logotipo aparece e a cortina sobe. Um script no <head> marca a
 * sessão para não repetir; celular e movimento reduzido nunca veem a intro.
 */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/monograma.png" alt="" width={640} height={621} loading="lazy" decoding="async" className="intro-mono h-auto w-[min(34vw,180px)]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/logotipo.png" alt="" width={1200} height={168} loading="lazy" decoding="async" className="intro-word h-auto w-[min(70vw,380px)]" />
      </div>
    </div>
  );
}
