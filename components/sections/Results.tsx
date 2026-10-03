'use client';

import Image from 'next/image';
import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Eye, MoveHorizontal, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from '../ui/Reveal';
import WhatsIcon from '../ui/WhatsIcon';
import { compliance, contact, messages, whatsappUrl } from '@/lib/content';

export function openStory(id: string) {
  window.dispatchEvent(new CustomEvent('open-story', { detail: { id } }));
}

function BeforeAfter() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: .5 });
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const [veiled, setVeiled] = useState(true);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);
  useMotionValueEvent(pos, 'change', (v) => setValue(v));

  useEffect(() => {
    if (veiled || touched || !inView || reduced) return;
    // dica de interação: a divisória "respira" uma vez para os lados
    const controls = animate(pos, [50, 22, 78, 50], { duration: 2.6, ease: 'easeInOut' });
    return () => controls.stop();
  }, [veiled, touched, inView, reduced, pos]);

  const setFromClient = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, [pos]);

  return (
    <div
      ref={box}
      data-cursor={veiled ? undefined : 'Arraste'}
      className="relative mx-auto aspect-[4/5] w-full max-w-[560px] select-none overflow-hidden rounded-[28px] bg-cacao shadow-[0_40px_90px_rgba(0,0,0,.45)] [touch-action:pan-y]"
      onPointerDown={(e) => {
        if (veiled) return;
        dragging.current = true;
        setTouched(true);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromClient(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging.current) setFromClient(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      <Image src="/assets/img/caso-dressa-depois.webp" alt="Depois: glúteo da paciente Dressa com contorno superior mais desenhado e projeção" fill sizes="(max-width: 640px) 92vw, 560px" quality={88} className="pointer-events-none object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image src="/assets/img/caso-dressa-antes.webp" alt="Antes: glúteo da paciente Dressa, com falta de volume na parte superior" fill sizes="(max-width: 640px) 92vw, 560px" quality={88} className="pointer-events-none object-cover" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-espresso/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.2em] text-cream backdrop-blur">Antes</span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold/90 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.2em] text-espresso backdrop-blur">Depois</span>
      {/* legenda exigida na própria imagem (Res. CFBM 330/2020, art. 10, §1º, V) */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent px-4 pb-3 pt-8 text-center text-[11px] tracking-[.08em] text-cream/90">
        {compliance.authorized} · {contact.registry}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${value}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l border-cream/90 shadow-[0_0_12px_rgba(0,0,0,.35)]" />
        <button
          type="button"
          role="slider"
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          aria-valuetext={`${Math.round(value)}% da imagem de antes visível`}
          tabIndex={veiled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              e.preventDefault();
              setTouched(true);
              pos.set(Math.min(100, Math.max(0, value + (e.key === 'ArrowRight' ? 5 : -5))));
            }
          }}
          className="pointer-events-auto absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/80 bg-espresso/55 text-cream backdrop-blur-md"
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>

      {veiled && (
        <div className="absolute inset-0 grid place-items-center bg-espresso/40 backdrop-blur-2xl">
          <div className="max-w-[300px] px-6 text-center text-cream">
            <p className="text-[11px] font-medium uppercase tracking-[.24em] text-gold">Resultado real · divulgação autorizada</p>
            <p className="mt-3 font-display text-3xl leading-tight">Antes e depois do caso da Dressa</p>
            <button
              type="button"
              onClick={() => setVeiled(false)}
              data-sparkle
              className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-cream px-6 text-sm font-medium uppercase tracking-[.14em] text-espresso transition-colors hover:bg-gold"
            >
              <Eye className="h-4 w-4" /> Ver resultado
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Results() {
  return (
    <section id="resultados" aria-labelledby="resultados-titulo" className="noise relative overflow-hidden bg-espresso py-24 text-cream sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,33,48,.55),transparent_65%)]" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal><BeforeAfter /></Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal><p className="eyebrow text-gold">Resultado real</p></Reveal>
          <Reveal delay={.06}>
            <h2 id="resultados-titulo" className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)] leading-[1.02]">
              O caso da <em className="shimmer">Dressa</em>.
            </h2>
          </Reveal>
          <Reveal delay={.1}>
            <p className="mt-6 text-lg text-cream/85">
              Não era sobre simplesmente adicionar volume. Era entender onde ele faria diferença para o contorno que ela buscava.
            </p>
          </Reveal>
          <Reveal delay={.14}>
            <dl className="mt-8 grid gap-0 border-t border-cream/15">
              {[
                ['Queixa', 'Falta de volume na parte superior do glúteo.'],
                ['Planejamento', 'Pontos estratégicos para contornar a parte superior — a curvinha do S —, respeitando a anatomia dela.'],
                ['Resultado', 'Mais contorno e projeção, valorizando o formato que já existia.'],
              ].map(([dt, dd]) => (
                <div key={dt} className="grid gap-1 border-b border-cream/15 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-[11px] font-medium uppercase tracking-[.22em] text-gold">{dt}</dt>
                  <dd className="text-base text-cream/85">{dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => openStory('caso-dressa')}
                className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-cream/30 px-6 text-[13px] font-medium uppercase tracking-[.12em] transition-colors hover:border-gold hover:text-gold"
              >
                <Play className="h-4 w-4" /> Análise em vídeo
              </button>
              <a
                href={whatsappUrl(messages.result)}
                target="_blank"
                rel="noopener noreferrer"
                data-sparkle
                className="inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gold px-6 text-[13px] font-medium uppercase tracking-[.12em] text-espresso transition-colors hover:bg-cream"
              >
                <WhatsIcon /> Avaliar o meu caso
              </a>
            </div>
          </Reveal>
          <Reveal delay={.22}>
            <div className="mt-8 grid gap-2 border-l-2 border-gold/50 pl-4 text-[13px] leading-relaxed text-cream/70">
              <p>{compliance.authorized} {compliance.noGuarantee}</p>
              <p>Fotos reais, sem retoque no corpo: apenas alinhadas em escala e posição para a comparação.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
