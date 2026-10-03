'use client';

import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Marquee from '../fx/Marquee';
import Signature from '../fx/Signature';
import WhatsIcon from '../ui/WhatsIcon';
import { marqueeWords, messages, whatsappUrl } from '@/lib/content';

/** Atraso para as animações do hero começarem depois da cortina de abertura. */
function useIntroDelay() {
  const [delay] = useState(() => (typeof window === 'undefined' ? 0 : ((window as unknown as { __fxDelay?: number }).__fxDelay ?? 0)));
  return delay;
}

/**
 * Título com animação só de CSS: pinta direto do HTML (sem esperar o JS
 * hidratar), o que mantém o LCP baixo. Na 1ª visita espera a cortina.
 */
function Letters({ text, className = '', delay }: { text: string; className?: string; delay: number }) {
  return (
    <span className="line-mask">
      <span className={className} aria-hidden="true">
        {text.split('').map((char, index) => (
          <span key={`${char}-${index}`} className="hero-rise inline-block" style={{ ['--d' as string]: `${delay + index * .035}s` }}>
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

function Line({ text, className = '', delay }: { text: string; className?: string; delay: number }) {
  return (
    <span className="line-mask">
      <span aria-hidden="true" className={`hero-rise inline-block ${className}`} style={{ ['--d' as string]: `${delay}s` }}>{text}</span>
    </span>
  );
}

function Seal() {
  return (
    <div className="relative grid h-[118px] w-[118px] place-items-center rounded-full bg-espresso/70 text-gold shadow-[0_18px_40px_rgba(0,0,0,.35)] backdrop-blur-md sm:h-[132px] sm:w-[132px]">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs><path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text fill="currentColor" fontSize="8.6" letterSpacing="2.2" fontFamily="var(--font-sans)" textLength="286" lengthAdjust="spacing">
          <textPath href="#seal-circle">FADA DO BUMBUM ✦ HARMONIZAÇÃO GLÚTEA ✦</textPath>
        </text>
      </svg>
      <span className="font-signature text-[2.6rem] leading-none text-cream">E</span>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const base = useIntroDelay();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const copyOpacity = useTransform(scrollYProgress, [0, .75], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // parallax de mouse nos cartões flutuantes
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const cardAX = useTransform(sx, (v) => v * -18);
  const cardAY = useTransform(sy, (v) => v * -14);
  const cardBX = useTransform(sx, (v) => v * 22);
  const cardBY = useTransform(sy, (v) => v * 16);

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth - .5);
      my.set(event.clientY / window.innerHeight - .5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduced]);

  return (
    <section id="inicio" ref={root} className="slats noise relative isolate min-h-[100svh] overflow-hidden text-cream lg:min-h-[max(100svh,760px)]">
      {/* vinheta e profundidade sobre o ripado */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_75%_40%,transparent_0%,rgba(29,19,16,.55)_60%,rgba(29,19,16,.92)_100%)]" />

      {/* linha em S: a "curvinha" como assinatura gráfica */}
      <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
        <motion.path
          d="M -40 872 C 260 856 460 800 640 826 S 930 846 1060 640 S 1290 150 1500 190"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="1.2"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: base + .2, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M -40 892 C 280 880 480 840 660 860 S 960 880 1100 690 S 1330 230 1500 260"
          fill="none"
          stroke="rgba(201,162,122,.22)"
          strokeWidth="1"
          strokeDasharray="3 9"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: base + .5, ease: [0.65, 0, 0.35, 1] }}
        />
        <defs>
          <linearGradient id="hero-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#c9a27a" stopOpacity="0" />
            <stop offset=".35" stopColor="#e8cfa8" stopOpacity=".8" />
            <stop offset=".7" stopColor="#e3b5b3" stopOpacity=".7" />
            <stop offset="1" stopColor="#c9a27a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-shell grid min-h-[100svh] items-end gap-10 pb-28 pt-[calc(var(--header-h)+24px)] lg:min-h-[max(100svh,760px)] lg:grid-cols-12 lg:items-center lg:pb-24">
        {/* Foto: fundo de tela cheia no celular; arco emoldurado no desktop */}
        <div className="lg:relative lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:mx-auto lg:aspect-[4/5] lg:w-full lg:max-w-[500px]">
            <span aria-hidden="true" className="arch absolute -inset-3 hidden border border-gold/45 lg:block" />
            <span aria-hidden="true" className="arch absolute -inset-6 hidden border border-gold/15 lg:block" />
            <motion.div style={reduced ? undefined : { scale: imageScale }} className="absolute inset-0 overflow-hidden lg:arch">
              <Image
                src="/assets/img/enyla-consultorio-poltrona.webp"
                alt="Dra. Enyla Cerqueira sentada em poltrona de veludo terracota, em frente ao ripado de madeira do consultório"
                fill
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 1023px) 100vw, 500px"
                className="kenburns object-cover object-[50%_18%]"
              />
            </motion.div>
            {/* scrims só no celular: contraste do texto sobre a foto */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/75 to-espresso/10 lg:hidden" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/70 to-transparent lg:hidden" />

            <motion.div style={reduced ? undefined : { x: cardAX, y: cardAY }} className="absolute -left-14 top-[16%] hidden lg:block xl:-left-20">
              <motion.div
                initial={reduced ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: base + 1.1, duration: .8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-cream/15 bg-espresso/55 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,.35)] backdrop-blur-md"
              >
                <p className="text-[11px] font-medium uppercase tracking-[.22em] text-gold">Pós-graduação internacional</p>
                <p className="mt-1 font-display text-2xl italic leading-none">Madrid, Espanha</p>
              </motion.div>
            </motion.div>

            <motion.div style={reduced ? undefined : { x: cardBX, y: cardBY }} className="absolute -right-8 bottom-[14%] hidden lg:block xl:-right-12">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: base + 1.3, duration: .8, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-1.5 rounded-2xl border border-cream/15 bg-cream/10 px-5 py-4 text-sm shadow-[0_20px_50px_rgba(0,0,0,.35)] backdrop-blur-md"
              >
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Ácido hialurônico</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Não é PMMA</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Anestesia local</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, scale: .6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: base + 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 left-6 hidden lg:block"
            >
              <Seal />
            </motion.div>
          </div>
        </div>

        <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }} className="relative z-10 max-w-[760px] lg:col-span-7 lg:row-start-1">
          <p className="hero-fade eyebrow text-gold" style={{ ['--d' as string]: '.05s' }}>
            <span className="sm:hidden">Biomédica esteta · São Paulo</span>
            <span className="hidden sm:inline">Biomédica esteta · Harmonização glútea · SP</span>
          </p>

          <h1 aria-label="Fada do Bumbum" className="display mt-5 text-[clamp(4.6rem,14vw,11rem)] leading-[.84] sm:mt-7">
            <Letters text="Fada do" delay={.1} />
            <Line text="Bumbum" delay={.35} className="shimmer pr-[.06em] italic" />
          </h1>

          <div className="hero-fade mt-5 flex items-end gap-3 text-gold sm:mt-6" style={{ ['--d' as string]: '.6s' }}>
            <span className="pb-2 text-[11px] font-medium uppercase tracking-[.3em] text-cream/70">por Dra.</span>
            <Signature trigger="mount" delay={base + .7} duration={1.6} className="h-12 w-auto sm:h-14" />
          </div>

          <div className="hero-fade" style={{ ['--d' as string]: '.75s' }}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:mt-8">
              Harmonização glútea com ácido hialurônico, planejada ponto a ponto para valorizar o formato que já é seu — com naturalidade e sem PMMA.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappUrl(messages.hero)}
                target="_blank"
                rel="noopener noreferrer"
                data-sparkle
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 text-sm font-medium uppercase tracking-[.14em] text-espresso shadow-[0_14px_40px_rgba(201,162,122,.28)] transition-all duration-500 hover:bg-cream hover:shadow-[0_18px_50px_rgba(232,207,168,.4)]"
              >
                <WhatsIcon className="h-5 w-5" /> <span className="sm:hidden">Agendar avaliação</span><span className="hidden sm:inline">Agendar minha avaliação</span>
              </a>
              <a href="#resultados" className="group inline-flex min-h-12 items-center justify-center gap-3 border-b border-gold/60 pb-1 text-sm font-medium uppercase tracking-[.14em] text-cream sm:justify-start">
                Ver resultado real
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#filosofia" aria-label="Rolar para conhecer a filosofia" className="absolute bottom-20 right-6 z-10 hidden items-center gap-3 lg:flex xl:right-10">
        <span className="text-[11px] uppercase tracking-[.22em] text-cream/70">Role</span>
        <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-cream/25">
          <motion.span aria-hidden="true" animate={reduced ? undefined : { y: ['-130%', '130%'] }} transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-x-0 top-1/2 grid place-items-center">
            <ArrowDown className="h-4 w-4 -translate-y-1/2" />
          </motion.span>
        </span>
      </a>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-cream/10 bg-espresso/40 backdrop-blur-[2px]">
        <Marquee items={marqueeWords} duration={40} className="py-4 text-[12px] font-medium uppercase tracking-[.26em] text-cream/80" />
      </div>
    </section>
  );
}
