'use client';

import Image from 'next/image';
import { useDesktopFx } from '@/lib/fx';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plane } from 'lucide-react';
import { useRef, useState } from 'react';
import Marquee from '../fx/Marquee';
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
      <Image src="/assets/brand/monograma.png" alt="" width={640} height={621} sizes="60px" className="h-12 w-auto sm:h-14" />
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const base = useIntroDelay();
  const fx = useDesktopFx();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const copyOpacity = useTransform(scrollYProgress, [0, .75], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

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

      <div className="container-shell grid min-h-[100svh] content-start gap-7 pb-24 pt-[calc(var(--header-h)+18px)] lg:min-h-[max(100svh,760px)] lg:grid-cols-12 lg:content-normal lg:items-center lg:gap-10 lg:pb-24 lg:pt-[calc(var(--header-h)+24px)]">
        {/* Foto em arco: no topo no celular (rosto livre, sem texto por cima); à direita no desktop */}
        <div className="lg:relative lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div className="relative mx-2 h-[min(31svh,430px)] [@media(min-height:740px)]:h-[min(38svh,430px)] sm:mx-auto sm:w-full sm:max-w-[440px] lg:h-auto lg:aspect-[2/3] lg:max-w-[460px]">
            <span aria-hidden="true" className="arch absolute -inset-2 border border-gold/45 lg:-inset-3" />
            <span aria-hidden="true" className="arch absolute -inset-6 hidden border border-gold/15 lg:block" />
            <motion.div style={fx ? { scale: imageScale } : undefined} className="arch absolute inset-0 overflow-hidden">
              <Image
                src="/assets/img/enyla-hero.webp"
                alt="Dra. Enyla Cerqueira sorrindo, de blusa nude drapeada, sentada em poltrona rosé diante do ripado de madeira"
                fill
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 1023px) 100vw, 500px"
                className="kenburns object-cover object-[60%_22%] lg:object-[50%_30%]"
              />
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

        <motion.div style={fx ? { y: copyY, opacity: copyOpacity } : undefined} className="relative z-10 max-w-[760px] lg:col-span-7 lg:row-start-1">
          <p className="hero-fade eyebrow text-gold" style={{ ['--d' as string]: '.05s' }}>
            <span className="lg:hidden">Dra. Enyla Cerqueira · Biomédica</span>
            <span className="hidden lg:inline">Biomédica esteta · Harmonização glútea · SP</span>
          </p>

          <h1 aria-label="Fada do Bumbum" className="display mt-3 text-[clamp(3.1rem,14vw,5.2rem)] leading-[.86] sm:text-[clamp(4.6rem,11vw,7rem)] lg:mt-7 lg:text-[clamp(4.6rem,14vw,11rem)] lg:leading-[.84]">
            <Letters text="Fada do" delay={.1} />
            <Line text="Bumbum" delay={.35} className="shimmer pr-[.06em] italic" />
          </h1>

          <div className="hero-fade mt-4 lg:mt-8" style={{ ['--d' as string]: '.6s' }}>
            <Image src="/assets/brand/logotipo.png" alt="Dra. Enyla Cerqueira, biomédica" width={1200} height={168} sizes="320px" className="hidden h-auto w-[320px] lg:block" />
            <p className="flex items-center gap-2.5 text-[12px] lg:mt-4 font-medium uppercase tracking-[.2em] text-gold">
              <Plane aria-hidden="true" className="h-3.5 w-3.5" /> Pós-graduação internacional · Madrid
            </p>
          </div>

          <div className="hero-fade" style={{ ['--d' as string]: '.75s' }}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 lg:mt-8 lg:text-lg">
              <span className="lg:hidden">Harmonização glútea com ácido hialurônico: natural, planejada ponto a ponto e sem PMMA.</span>
              <span className="hidden lg:inline">Harmonização glútea com ácido hialurônico, planejada ponto a ponto para valorizar o formato que já é seu — com naturalidade e sem PMMA.</span>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-8">
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

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-cream/10 bg-espresso/40 backdrop-blur-[2px]">
        <Marquee items={marqueeWords} duration={40} className="py-4 text-[12px] font-medium uppercase tracking-[.26em] text-cream/80" />
      </div>
    </section>
  );
}
