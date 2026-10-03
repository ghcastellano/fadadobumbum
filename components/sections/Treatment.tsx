'use client';

import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { mapPoints, procedureFacts } from '@/lib/content';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type P = [number, number];
const L = (a: P, b: P, t: number): string => `${lerp(a[0], b[0], t).toFixed(1)} ${lerp(a[1], b[1], t).toFixed(1)}`;

// Perfil lateral (de frente para a direita). "antes" = contorno mais reto;
// "depois" = curvinha do S desenhada + projeção. Ilustração educativa.
const A = { c1a: [204, 84] as P, c1b: [184, 138] as P, lum: [186, 180] as P, c2a: [188, 226] as P, c2b: [130, 240] as P, proj: [116, 320] as P, c3a: [104, 394] as P, c3b: [140, 436] as P, fold: [166, 448] as P, dip: [258, 322] as P, dip2: [256, 356] as P };
const B = { c1a: [202, 86] as P, c1b: [172, 134] as P, lum: [176, 176] as P, c2a: [180, 214] as P, c2b: [98, 224] as P, proj: [84, 314] as P, c3a: [70, 398] as P, c3b: [122, 446] as P, fold: [162, 454] as P, dip: [266, 322] as P, dip2: [265, 356] as P };

function posterior(t: number) {
  return `M 214 18 C ${L(A.c1a, B.c1a, t)}, ${L(A.c1b, B.c1b, t)}, ${L(A.lum, B.lum, t)} C ${L(A.c2a, B.c2a, t)}, ${L(A.c2b, B.c2b, t)}, ${L(A.proj, B.proj, t)} C ${L(A.c3a, B.c3a, t)}, ${L(A.c3b, B.c3b, t)}, ${L(A.fold, B.fold, t)} C 174 500, 168 560, 176 612`;
}
function fold(t: number) {
  const fx = lerp(A.fold[0], B.fold[0], t);
  const fy = lerp(A.fold[1], B.fold[1], t);
  return `M ${fx.toFixed(1)} ${fy.toFixed(1)} C ${(fx + 26).toFixed(1)} ${(fy + 12).toFixed(1)}, ${(fx + 62).toFixed(1)} ${(fy + 10).toFixed(1)}, ${(fx + 88).toFixed(1)} ${(fy - 4).toFixed(1)}`;
}
function dip(t: number) {
  return `M 272 286 C ${L(A.dip, B.dip, t)}, ${L(A.dip2, B.dip2, t)}, 268 392`;
}
const ANTERIOR = 'M 300 18 C 312 90, 328 160, 330 236 C 332 320, 318 420, 306 500 C 298 560, 296 590, 294 612';
// silhueta preenchida: contorno posterior + anterior percorrido de volta
const silhouette = (t: number) => `${posterior(t)} L 294 612 C 296 590, 298 560, 306 500 C 318 420, 332 320, 330 236 C 328 160, 312 90, 300 18 Z`;

function ContourMap() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: .45 });
  const t = useMotionValue(reduced ? 1 : 0);
  const [value, setValue] = useState(reduced ? 100 : 0);
  const [active, setActive] = useState(mapPoints[0].id);
  const dPost = useTransform(t, posterior);
  const dFold = useTransform(t, fold);
  const dDip = useTransform(t, dip);
  const dFill = useTransform(t, silhouette);
  useMotionValueEvent(t, 'change', (v) => setValue(Math.round(v * 100)));

  useEffect(() => {
    if (!inView || reduced) return;
    // demonstração automática: desenha e "planeja" o contorno uma vez
    const controls = animate(t, [0, 0, 1], { duration: 3.2, times: [0, .35, 1], ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [inView, reduced, t]);

  const point = mapPoints.find((p) => p.id === active) ?? mapPoints[0];

  return (
    <div ref={box} className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-ivory p-5 shadow-[0_30px_80px_rgba(42,27,21,.12)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[.22em] text-gold-deep">Mapa do contorno</p>
        <p className="text-[11px] uppercase tracking-[.18em] text-ink/60">Ilustração educativa</p>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] md:items-center">
        <div className="relative mx-auto w-full max-w-[380px]">
          <svg viewBox="0 0 420 620" className="h-auto w-full" role="img" aria-label="Desenho de perfil do glúteo com quatro pontos estratégicos do planejamento">
            <defs>
              <radialGradient id="map-glow" cx="35%" cy="52%" r="50%">
                <stop offset="0" stopColor="#ecd3c8" stopOpacity=".95" />
                <stop offset="1" stopColor="#ecd3c8" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="map-fill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#d9a395" stopOpacity=".55" />
                <stop offset=".6" stopColor="#ecd3c8" stopOpacity=".35" />
                <stop offset="1" stopColor="#ecd3c8" stopOpacity=".15" />
              </linearGradient>
              <linearGradient id="map-fade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".18" stopColor="#fff" stopOpacity="1" />
                <stop offset=".82" stopColor="#fff" stopOpacity="1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="map-mask"><rect width="420" height="620" fill="url(#map-fade)" /></mask>
              <linearGradient id="map-stroke" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#c9a27a" />
                <stop offset=".55" stopColor="#b06b58" />
                <stop offset="1" stopColor="#83592f" />
              </linearGradient>
            </defs>
            <ellipse cx="170" cy="330" rx="210" ry="250" fill="url(#map-glow)" />
            {/* guias de planejamento */}
            {[176, 316, 452].map((y) => (
              <line key={y} x1="20" x2="400" y1={y} y2={y} stroke="#2a1b15" strokeOpacity=".08" strokeDasharray="2 6" />
            ))}
            <line x1="60" x2="60" y1="40" y2="600" stroke="#2a1b15" strokeOpacity=".07" />
            {[80, 160, 240, 320, 400, 480, 560].map((y) => (
              <line key={y} x1="54" x2="66" y1={y} y2={y} stroke="#2a1b15" strokeOpacity=".2" />
            ))}

            <motion.path d={dFill} fill="url(#map-fill)" mask="url(#map-mask)" initial={reduced ? false : { opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ duration: 1.2, delay: .8 }} />
            <motion.path d={ANTERIOR} fill="none" stroke="url(#map-stroke)" strokeWidth="2" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }} />
            <motion.path d={dPost} fill="none" stroke="url(#map-stroke)" strokeWidth="2.4" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }} />
            <motion.path d={dFold} fill="none" stroke="#b06b58" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
            <motion.path d={dDip} fill="none" stroke="#b06b58" strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="3 5" strokeLinecap="round" />

            {mapPoints.map((p) => {
              const on = p.id === active;
              return (
                <g key={p.id}>
                  <circle cx={p.x} cy={p.y} r="9" fill="#b06b58" fillOpacity=".25" className="ping-soft" />
                  <circle cx={p.x} cy={p.y} r={on ? 9 : 7} fill={on ? '#b06b58' : '#fbf8f4'} stroke="#b06b58" strokeWidth="2" style={{ transition: 'all .3s ease' }} />
                  <text x={p.x + (p.id === 'lat' ? 16 : -16)} y={p.y + 4} textAnchor={p.id === 'lat' ? 'start' : 'end'} fontSize="13" fontFamily="var(--font-sans)" fill="#2a1b15" fillOpacity={on ? 1 : .55} letterSpacing="1.5">{p.label}</text>
                </g>
              );
            })}
          </svg>
          {/* alvos de toque acessíveis por cima dos pontos */}
          {mapPoints.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-pressed={p.id === active}
              aria-label={`Ponto ${p.label}: ${p.title}`}
              className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${(p.x / 420) * 100}%`, top: `${(p.y / 620) * 100}%` }}
            />
          ))}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pontos estratégicos">
            {mapPoints.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                aria-pressed={p.id === active}
                className={`min-h-10 rounded-full border px-4 text-[13px] transition-colors duration-300 ${p.id === active ? 'border-terracotta bg-terracotta text-ivory' : 'border-ink/20 text-ink/80 hover:border-terracotta hover:text-terracotta'}`}
              >
                {p.label} · {p.title}
              </button>
            ))}
          </div>
          <div className="relative mt-6 min-h-[170px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={point.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .35 }}>
                <p className="font-display text-[2rem] leading-tight text-ink">{point.title}</p>
                <p className="mt-3 text-base text-ink/80">{point.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 border-t border-ink/10 pt-5">
            <label htmlFor="planejamento" className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[.2em] text-ink/70">
              <span>Contorno reto</span><span>Contorno planejado</span>
            </label>
            <input
              id="planejamento"
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => t.set(Number(e.target.value) / 100)}
              aria-valuetext={`${value}% do planejamento`}
              className="mt-3 h-11 w-full cursor-pointer appearance-none bg-transparent accent-[#b06b58] [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blush [&::-webkit-slider-runnable-track]:to-terracotta [&::-webkit-slider-thumb]:-mt-[10px] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ivory [&::-webkit-slider-thumb]:bg-terracotta [&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgba(176,107,88,.45)]"
            />
            <p className="mt-2 text-[13px] leading-relaxed text-ink/65">Arraste para ver como pequenos ajustes em pontos estratégicos mudam o desenho. A indicação real é individual e definida na avaliação.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Treatment() {
  return (
    <section id="harmonizacao" aria-labelledby="harmonizacao-titulo" className="relative overflow-hidden bg-nude py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,163,149,.45),transparent_65%)]" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            id="harmonizacao-titulo"
            eyebrow="Harmonização glútea"
            title={<>Curvas desenhadas <em className="text-terracotta">ponto a ponto.</em></>}
            text="Não é encher. É planejar onde um volume sutil muda o contorno — e deixar o resto exatamente como é: seu."
          />
          <ul className="mt-10 grid gap-0 border-t border-ink/15">
            {procedureFacts.map((fact, index) => (
              <li key={fact.title}>
                <Reveal delay={index * .05} className="flex gap-4 border-b border-ink/15 py-5">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-terracotta text-ivory"><Check className="h-4 w-4" /></span>
                  <span>
                    <span className="block font-display text-2xl leading-tight">{fact.title}</span>
                    <span className="mt-1 block text-base text-ink/75">{fact.text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-7" delay={.1}>
          <ContourMap />
        </Reveal>
      </div>
    </section>
  );
}
