'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import { useState } from 'react';
import Reveal from '../ui/Reveal';
import WhatsIcon from '../ui/WhatsIcon';
import { openStory } from './Results';
import { faqs, messages, whatsappUrl } from '@/lib/content';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <Reveal><p className="eyebrow text-gold-deep">Dúvidas frequentes</p></Reveal>
          <Reveal delay={.06}><h2 id="duvidas-titulo" className="display mt-6 text-[clamp(2.5rem,5vw,4.4rem)] leading-[1.03]">Pergunte <em className="text-rosedeep">sem medo.</em></h2></Reveal>
          <Reveal delay={.1}><p className="mt-6 text-base text-ink/80">Se a sua dúvida não estiver aqui, ela responde pessoalmente — no WhatsApp ou na avaliação.</p></Reveal>
          <Reveal delay={.14}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={whatsappUrl(messages.fear)} target="_blank" rel="noopener noreferrer" data-sparkle className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[13px] font-medium uppercase tracking-[.14em] text-cream transition-colors hover:bg-rosedeep">
                <WhatsIcon className="h-4 w-4" /> Perguntar à Dra.
              </a>
              <button type="button" onClick={() => openStory('medo')} className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-ink/25 px-6 text-[13px] font-medium uppercase tracking-[.14em] transition-colors hover:border-rosedeep hover:text-rosedeep">
                <Play className="h-4 w-4" /> Vídeo: medo
              </button>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-ink/15">
            {faqs.map((item, index) => {
              const expanded = open === index;
              return (
                <div key={item.q} className="border-b border-ink/15">
                  <h3>
                    <button type="button" id={`faq-${index}`} aria-expanded={expanded} aria-controls={`faq-painel-${index}`} onClick={() => setOpen(expanded ? -1 : index)} className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7">
                      <span className="font-display text-[1.65rem] leading-tight transition-colors group-hover:text-rosedeep sm:text-[1.9rem]">{item.q}</span>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${expanded ? 'rotate-45 border-rosedeep bg-rosedeep text-ivory' : 'border-ink/25'}`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div id={`faq-painel-${index}`} role="region" aria-labelledby={`faq-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <p className="max-w-2xl pb-7 text-base text-ink/80 sm:text-lg">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
