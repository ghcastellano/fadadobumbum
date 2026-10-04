'use client';

import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { mapPoints, procedureFacts } from '@/lib/content';

type P = [number, number];
type RegionId = 'proj' | 's' | 'lat' | 'inf';
type Levels = Record<RegionId, number>;

// Perfil lateral (de frente para a direita), contorno "de partida" sem ajuste.
const BASE = { c1a: [204, 84], c1b: [186, 140], lum: [188, 182], c2a: [190, 228], c2b: [134, 246], proj: [118, 322], c3a: [106, 396], c3b: [142, 436], fold: [166, 448] } as Record<string, P>;
// Quanto cada região desloca os seus próprios pontos de controle — e só eles.
const DELTA: Record<Exclude<RegionId, 'lat'>, Partial<Record<keyof typeof BASE, P>>> = {
  s: { c1b: [-12, -4], lum: [-10, -4], c2a: [-12, -16], c2b: [-22, -14] },
  proj: { c2b: [-10, 4], proj: [-32, -4], c3a: [-32, 0] },
  inf: { c3b: [-18, 10], fold: [-4, 8] },
};

function pt(key: string, lv: Levels): P {
  let [x, y] = BASE[key];
  for (const r of ['s', 'proj', 'inf'] as const) {
    const d = DELTA[r][key];
    if (d) { x += d[0] * lv[r]; y += d[1] * lv[r]; }
  }
  return [x, y];
}
const f = (p: P) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
function bez(p0: P, p1: P, p2: P, p3: P, t: number): P {
  const u = 1 - t;
  return [0, 1].map((i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]) as P;
}

function geometry(lv: Levels) {
  const g = Object.fromEntries(Object.keys(BASE).map((k) => [k, pt(k, lv)])) as Record<string, P>;
  const posterior = `M 214 18 C ${f(g.c1a)}, ${f(g.c1b)}, ${f(g.lum)} C ${f(g.c2a)}, ${f(g.c2b)}, ${f(g.proj)} C ${f(g.c3a)}, ${f(g.c3b)}, ${f(g.fold)} C 174 500, 168 560, 176 612`;
  const [fx, fy] = g.fold;
  const fold = `M ${f(g.fold)} C ${fx + 26} ${fy + 12}, ${fx + 62} ${fy + 10}, ${fx + 88} ${fy - 4}`;
  const dx = 10 * lv.lat; // depressão lateral: só a linha tracejada perde a concavidade
  const dip = `M 272 286 C ${258 + dx} 322, ${256 + dx} 356, 268 392`;
  const silhouette = `${posterior} L 294 612 C 296 590, 298 560, 306 500 C 318 420, 332 320, 330 236 C 328 160, 312 90, 300 18 Z`;
  // pontos presos à curva
  const anchors: Record<RegionId, P> = {
    s: bez(g.lum, g.c2a, g.c2b, g.proj, .18),
    proj: g.proj,
    inf: bez(g.proj, g.c3a, g.c3b, g.fold, .82),
    lat: bez([272, 286], [258 + dx, 322], [256 + dx, 356], [268, 392], .5),
  };
  return { posterior, fold, dip, silhouette, anchors };
}

const ANTERIOR = 'M 300 18 C 312 90, 328 160, 330 236 C 332 320, 318 420, 306 500 C 298 560, 296 590, 294 612';
const ZERO: Levels = { s: 0, proj: 0, lat: 0, inf: 0 };

function ContourMap() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: .45 });
  const [levels, setLevels] = useState<Levels>(ZERO);
  const [active, setActive] = useState<RegionId>('s');
  const g = geometry(levels);
  const point = mapPoints.find((p) => p.id === active) ?? mapPoints[0];
  const value = Math.round(levels[active] * 100);
  const touched = Object.values(levels).some((v) => v > 0);

  useEffect(() => {
    if (!inView || reduced) return;
    // demonstração: só a região selecionada "respira" uma vez
    const controls = animate(0, 1, {
      duration: 1.6, delay: .9, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setLevels((l) => (l.s === 0 || l.s < v ? { ...l, s: Math.sin(v * Math.PI) * .9 } : l)),
    });
    return () => controls.stop();
  }, [inView, reduced]);

  return (
    <div ref={box} className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-ivory p-5 shadow-[0_30px_80px_rgba(42,27,21,.12)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[.22em] text-gold-deep">Mapa do contorno</p>
        <p className="text-[11px] uppercase tracking-[.18em] text-ink/60">Ilustração educativa</p>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] md:items-center">
        <div className="relative mx-auto w-full max-w-[380px]">
          <svg viewBox="0 0 420 620" className="h-auto w-full" role="img" aria-label="Desenho de perfil do glúteo com quatro regiões do planejamento">
            <defs>
              <radialGradient id="map-glow" cx="35%" cy="52%" r="50%">
                <stop offset="0" stopColor="#f3dedb" stopOpacity=".95" />
                <stop offset="1" stopColor="#f3dedb" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="map-fill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#e3b5b3" stopOpacity=".55" />
                <stop offset=".6" stopColor="#f3dedb" stopOpacity=".35" />
                <stop offset="1" stopColor="#f3dedb" stopOpacity=".15" />
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
                <stop offset=".55" stopColor="#9e5a66" />
                <stop offset="1" stopColor="#83592f" />
              </linearGradient>
            </defs>
            <ellipse cx="170" cy="330" rx="210" ry="250" fill="url(#map-glow)" />
            {[180, 320, 450].map((y) => <line key={y} x1="20" x2="400" y1={y} y2={y} stroke="#2a1b15" strokeOpacity=".08" strokeDasharray="2 6" />)}
            <line x1="60" x2="60" y1="40" y2="600" stroke="#2a1b15" strokeOpacity=".07" />
            {[80, 160, 240, 320, 400, 480, 560].map((y) => <line key={y} x1="54" x2="66" y1={y} y2={y} stroke="#2a1b15" strokeOpacity=".2" />)}

            <path d={g.silhouette} fill="url(#map-fill)" mask="url(#map-mask)" />
            <motion.path d={ANTERIOR} fill="none" stroke="url(#map-stroke)" strokeWidth="2" strokeLinecap="round" initial={reduced ? false : { pathLength: 0 }} animate={inView ? { pathLength: 1 } : undefined} transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }} />
            <path d={g.posterior} fill="none" stroke="url(#map-stroke)" strokeWidth="2.4" strokeLinecap="round" />
            <path d={g.fold} fill="none" stroke="#9e5a66" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
            <path d={g.dip} fill="none" stroke="#9e5a66" strokeOpacity={active === 'lat' ? .9 : .5} strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />

            {mapPoints.map((p) => {
              const on = p.id === active;
              const [x, y] = g.anchors[p.id as RegionId];
              const right = p.id === 'lat';
              return (
                <g key={p.id}>
                  {on && <circle cx={x} cy={y} r="10" fill="#9e5a66" fillOpacity=".25" className="ping-soft" />}
                  <circle cx={x} cy={y} r={on ? 9 : 6.5} fill={on ? '#9e5a66' : '#fbf8f4'} stroke="#9e5a66" strokeWidth="2" />
                  <text x={x + (right ? 16 : -16)} y={y + 4} textAnchor={right ? 'start' : 'end'} fontSize="13" fontFamily="var(--font-sans)" fill="#2a1b15" fillOpacity={on ? 1 : .55} letterSpacing="1.5">{p.label}</text>
                </g>
              );
            })}
          </svg>
          {mapPoints.map((p) => {
            const [x, y] = g.anchors[p.id as RegionId];
            return (
              <button key={p.id} type="button" onClick={() => setActive(p.id as RegionId)} aria-pressed={p.id === active} aria-label={`Região ${p.label}: ${p.title}`}
                className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${(x / 420) * 100}%`, top: `${(y / 620) * 100}%` }} />
            );
          })}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Regiões do planejamento">
            {mapPoints.map((p) => (
              <button key={p.id} type="button" onClick={() => setActive(p.id as RegionId)} aria-pressed={p.id === active}
                className={`min-h-10 rounded-full border px-4 text-[13px] transition-colors duration-300 ${p.id === active ? 'border-rosedeep bg-rosedeep text-ivory' : 'border-ink/20 text-ink/80 hover:border-rosedeep hover:text-rosedeep'}`}>
                {p.label} · {p.title}{levels[p.id as RegionId] > 0 && p.id !== active ? ' ✦' : ''}
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
            <label htmlFor="planejamento" className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[.2em] text-ink/70">
              <span>Ajustar só: {point.title}</span><span className="tabular-nums text-rosedeep">{value}%</span>
            </label>
            <input
              id="planejamento"
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => { const v = Number(e.target.value) / 100; setLevels((l) => ({ ...l, [active]: v })); }}
              aria-valuetext={`${point.title}: ${value}%`}
              className="mt-3 h-11 w-full cursor-pointer appearance-none bg-transparent accent-[#9e5a66] [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blush [&::-webkit-slider-runnable-track]:to-rosedeep [&::-webkit-slider-thumb]:-mt-[10px] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ivory [&::-webkit-slider-thumb]:bg-rosedeep [&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgba(158,90,102,.45)]"
            />
            <div className="mt-2 flex items-start justify-between gap-4">
              <p className="text-[13px] leading-relaxed text-ink/65">Escolha uma região e arraste: só ela muda no desenho. Ilustração educativa — a indicação real é individual e definida na avaliação.</p>
              {touched && <button type="button" onClick={() => setLevels(ZERO)} className="shrink-0 border-b border-ink/30 text-[12px] uppercase tracking-[.14em] text-ink/70 hover:text-rosedeep">Restaurar</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Treatment() {
  return (
    <section id="harmonizacao" aria-labelledby="harmonizacao-titulo" className="relative overflow-hidden bg-nude py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(227,181,179,.45),transparent_65%)]" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            id="harmonizacao-titulo"
            eyebrow="Harmonização glútea"
            title={<>Curvas desenhadas <em className="text-rosedeep">ponto a ponto.</em></>}
            text="Não é encher. É planejar onde um volume sutil muda o contorno — e deixar o resto exatamente como é: seu."
          />
          <ul className="mt-10 grid gap-0 border-t border-ink/15">
            {procedureFacts.map((fact, index) => (
              <li key={fact.title}>
                <Reveal delay={index * .05} className="flex gap-4 border-b border-ink/15 py-5">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rosedeep text-ivory"><Check className="h-4 w-4" /></span>
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
