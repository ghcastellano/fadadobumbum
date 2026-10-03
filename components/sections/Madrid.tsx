'use client';

import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plane } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Counter from '../fx/Counter';
import Signature from '../fx/Signature';
import Reveal from '../ui/Reveal';
import { messages, whatsappUrl } from '@/lib/content';

function LoopVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: .3 });
  const near = useInView(ref, { once: true, margin: '600px 0px' });
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduced]);
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src="/assets/video/madrid-loop.mp4"
      poster={near ? '/assets/video/madrid-loop-poster.jpg' : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label="Dra. Enyla caminhando em direção à Facultad de Medicina, em Madrid"
    />
  );
}

const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1];

/** Cartão de embarque GRU → MAD: a formação em Madrid contada como viagem. */
function BoardingPass() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40, rotate: 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -5 }}
      viewport={{ once: true, amount: .5 }}
      transition={{ duration: 1, delay: .3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -bottom-24 -right-1 w-[min(76%,270px)] sm:-right-10 lg:-bottom-28 lg:-right-16"
    >
      <div className="relative overflow-hidden rounded-2xl bg-ivory text-ink shadow-[0_30px_70px_rgba(42,27,21,.28)] ring-1 ring-ink/10">
        <div className="flex items-center justify-between bg-rosedeep px-4 py-2.5 text-[10px] font-medium uppercase tracking-[.26em] text-ivory">
          <span>Cartão de embarque</span><Plane className="h-3.5 w-3.5" />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 px-4 pt-4">
          <div><p className="font-display text-[2.6rem] leading-none">GRU</p><p className="mt-1 text-[10px] uppercase tracking-[.2em] text-ink/60">São Paulo</p></div>
          <span className="mb-5 flex items-center gap-1 text-gold-deep"><span className="h-px w-6 border-t border-dashed border-gold-deep/60" /><Plane className="h-4 w-4" /></span>
          <div className="text-right"><p className="font-display text-[2.6rem] leading-none">MAD</p><p className="mt-1 text-[10px] uppercase tracking-[.2em] text-ink/60">Madrid</p></div>
        </div>
        <dl className="grid grid-cols-2 gap-3 px-4 pb-4 pt-3">
          <div><dt className="text-[9.5px] uppercase tracking-[.2em] text-ink/55">Passageira</dt><dd className="mt-0.5 text-[13px] leading-tight">Dra. Enyla Cerqueira</dd></div>
          <div><dt className="text-[9.5px] uppercase tracking-[.2em] text-ink/55">Destino</dt><dd className="mt-0.5 text-[13px] leading-tight">Next Level Harmonização</dd></div>
        </dl>
        <div className="relative border-t border-dashed border-ink/25">
          <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-cream" />
          <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-cream" />
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex h-8 items-stretch gap-[2px]" aria-hidden="true">
            {BARS.map((w, i) => <span key={i} className="bg-ink/80" style={{ width: w }} />)}
          </div>
          <span className="font-display text-xl italic text-rosedeep">2026</span>
        </div>
      </div>
    </motion.div>
  );
}

function FlightPath() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: .6 });
  return (
    <div className="relative">
      <svg ref={ref} viewBox="0 0 520 170" className="h-auto w-full overflow-visible" aria-hidden="true">
        <motion.path
          id="rota"
          d="M 24 140 C 150 10, 370 10, 496 104"
          fill="none"
          stroke="#83592f"
          strokeWidth="1.4"
          strokeDasharray="5 7"
          initial={reduced ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        />
        <circle cx="24" cy="140" r="6" fill="#9e5a66" />
        <circle cx="24" cy="140" r="12" fill="none" stroke="#9e5a66" strokeOpacity=".35" />
        <motion.g initial={reduced ? false : { opacity: 0, scale: .4 }} animate={inView ? { opacity: 1, scale: 1 } : undefined} transition={{ delay: 2.2, duration: .5 }} style={{ transformOrigin: '496px 104px' }}>
          <circle cx="496" cy="104" r="6" fill="#83592f" />
          <circle cx="496" cy="104" r="12" fill="none" stroke="#83592f" strokeOpacity=".35" />
        </motion.g>
      </svg>
      <motion.span
        className="absolute left-[46%] top-[2%] text-gold-deep"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.2, duration: .6 }}
      >
        <Plane className="h-5 w-5 rotate-[20deg]" />
      </motion.span>
      <div className="mt-1 flex items-start justify-between text-[11px] font-medium uppercase tracking-[.2em] text-ink/70">
        <span>São Paulo<br /><span className="font-normal normal-case tracking-normal text-ink/55">23°33′S · 46°38′O</span></span>
        <span className="text-right">Madrid<br /><span className="font-normal normal-case tracking-normal text-ink/55">40°25′N · 3°42′O</span></span>
      </div>
    </div>
  );
}

export default function Madrid() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-28%']);

  return (
    <section id="madrid" ref={root} aria-labelledby="madrid-titulo" className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-36">
      <motion.p
        aria-hidden="true"
        style={reduced ? undefined : { x }}
        className="text-outline pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[clamp(8rem,24vw,22rem)] italic leading-none text-rosedeep/25"
      >
        Madrid · España · Madrid
      </motion.p>

      <div className="container-shell relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="relative pb-24 lg:col-span-5 lg:pb-0">
          <Reveal>
            <div className="relative mx-auto max-w-[460px]">
              <span aria-hidden="true" className="arch absolute -inset-3 border border-gold/50" />
              <div className="arch relative aspect-[4/5] overflow-hidden bg-cacao">
                <LoopVideo />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/75 to-transparent p-6 pb-16 pt-24 text-cream sm:pb-20">
                  <p className="text-[11px] font-medium uppercase tracking-[.22em] text-gold">Madrid · setembro de 2026</p>
                  <p className="mt-1 font-display text-2xl italic">Um novo nível começa aqui.</p>
                </div>
              </div>
              <BoardingPass />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><p className="eyebrow text-gold-deep">Pós-graduação internacional</p></Reveal>
          <Reveal delay={.06}>
            <h2 id="madrid-titulo" className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)] leading-[1.02]">
              De São Paulo a <em className="text-rosedeep">Madrid</em> — e de volta para você.
            </h2>
          </Reveal>
          <Reveal delay={.1}>
            <p className="mt-6 max-w-xl text-lg text-ink/85">
              Em 2026, a Dra. Enyla cruzou o oceano para o <strong className="font-medium text-ink">Next Level Harmonização</strong>, uma formação internacional que une especialização, atualização e imersão profissional.
            </p>
          </Reveal>

          <Reveal delay={.14}>
            <div className="mt-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-end">
              <FlightPath />
              <p className="border-l border-ink/15 pl-5">
                <span className="block font-display text-5xl text-gold-deep"><Counter value={8385} /></span>
                <span className="text-[11px] font-medium uppercase tracking-[.2em] text-ink/70">km de estudo</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={.18}>
            <figure className="mt-12 border-t border-ink/15 pt-8">
              <blockquote className="font-display text-[1.75rem] italic leading-snug text-ink/90 sm:text-[2rem]">
                “Para mim, estudar nunca foi apenas sobre ter mais um certificado. É sobre continuar evoluindo e me tornar uma profissional cada vez mais preparada para entregar o meu melhor às minhas pacientes.”
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-4 text-gold-deep">
                <Signature className="h-12 w-auto" />
                <a href={whatsappUrl(messages.madrid)} target="_blank" rel="noopener noreferrer" data-sparkle className="group ml-auto inline-flex min-h-11 items-center gap-2 border-b border-gold-deep/50 text-sm font-medium uppercase tracking-[.14em] text-ink">
                  Agendar com a Dra. <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
