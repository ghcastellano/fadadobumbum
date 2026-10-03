'use client';

import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { journey } from '@/lib/content';

export default function Journey() {
  const list = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.75', 'end 0.6'] });

  return (
    <section id="jornada" aria-labelledby="jornada-titulo" className="editorial-grid relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <SectionHeading
            id="jornada-titulo"
            eyebrow="A jornada"
            title={<>Da primeira conversa <em className="text-terracotta">à manutenção.</em></>}
            text="Cinco etapas, sem pressa e sem surpresa. Você sabe exatamente o que acontece antes, durante e depois."
          />
        </div>
        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-ink/12" />
          <motion.span aria-hidden="true" style={reduced ? undefined : { scaleY: scrollYProgress }} className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-gold via-terracotta to-gold-deep" />
          {journey.map((step, index) => (
            <li key={step.title} className="relative pb-12 pl-20 last:pb-0">
              <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-ivory font-display text-2xl italic text-gold-deep shadow-[0_8px_24px_rgba(42,27,21,.08)]">
                {index + 1}
              </span>
              <Reveal>
                <p className="pt-1 text-[11px] font-medium uppercase tracking-[.24em] text-terracotta">{step.tag}</p>
                <h3 className="mt-2 font-display text-[2.1rem] leading-tight">{step.title}</h3>
                <p className="mt-3 max-w-lg text-base text-ink/80">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
