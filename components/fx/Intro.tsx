import { signaturePaths, signatureViewBox } from './signature-paths';

/**
 * Cortina de abertura só com CSS (não espera o JS hidratar): a assinatura se
 * escreve e a cortina sobe em ~2,5s. Um script no <head> marca a sessão para
 * não repetir; movimento reduzido nunca vê a intro.
 */
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-5">
        <svg viewBox={signatureViewBox} fill="none">
          {signaturePaths.map((d, i) => (
            <path key={i} d={d} pathLength={1} stroke="currentColor" strokeWidth={1.2} fill="currentColor" style={{ ['--i' as string]: i }} />
          ))}
        </svg>
        <p className="text-[11px] font-medium uppercase tracking-[.42em] text-cream/70">Fada do Bumbum</p>
      </div>
    </div>
  );
}
