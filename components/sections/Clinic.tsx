'use client';

import Image from 'next/image';
import { ArrowUpRight, Car, Check, Copy, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import WhatsIcon from '../ui/WhatsIcon';
import { contact, mapsEmbed, mapsUrl, messages, wazeUrl, whatsappUrl } from '@/lib/content';

const cap = 'absolute bottom-3 left-3 rounded-full bg-espresso/70 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[.18em] text-cream backdrop-blur sm:bottom-4 sm:left-4';
const img = 'object-cover transition-transform duration-[1.2s] ease-silk hover:scale-105';

function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: .25 });
  const near = useInView(ref, { once: true, margin: '600px 0px' });
  const reduced = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView, reduced]);
  return <video ref={ref} src={src} poster={near ? poster : undefined} muted loop playsInline preload="none" aria-label={label} className="absolute inset-0 h-full w-full object-cover" />;
}

const address = `${contact.street} — ${contact.unit}, ${contact.district}, ${contact.city}, ${contact.cep}`;

export default function Clinic() {
  const [copied, setCopied] = useState(false);
  const [mapOn, setMapOn] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* sem permissão de clipboard: o endereço segue visível */ }
  };

  return (
    <section id="clinica" aria-labelledby="clinica-titulo" className="relative bg-cream py-24 sm:py-28 lg:py-36">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="clinica-titulo"
              eyebrow="A clínica"
              title={<>Nos Jardins, <em className="text-copper">perto da Paulista.</em></>}
              text="Ripado de nogueira, quartzito verde, cobre e poltronas rosé: um espaço pensado para você chegar com calma e sair confiante."
            />
          </div>
          <Reveal delay={.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-base text-ink/80">Atendimento com hora marcada, no 4º andar do Edifício Paranapanema — conjunto 42.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4 lg:grid-rows-[300px_300px] lg:gap-5">
          <Reveal className="row-span-2">
            <figure className="relative h-[460px] overflow-hidden rounded-[24px] bg-cacao sm:h-[560px] lg:h-full">
              <LoopVideo src="/assets/video/clinica-loop.mp4" poster="/assets/video/clinica-loop-poster.jpg" label="Passeio pela recepção: balcão de quartzito verde, ripado de madeira e poltronas rosé" />
              <figcaption className={cap}>Recepção</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={.05} className="row-span-2">
            <figure className="relative h-[460px] overflow-hidden rounded-[24px] sm:h-[560px] lg:h-full">
              <Image src="/assets/img/clinica-recepcao-marmore.webp" alt="Balcão de quartzito verde iluminado, pendentes de vidro com acabamento em cobre e parede ripada" fill sizes="(max-width: 1023px) 50vw, 25vw" className={img} />
              <figcaption className={cap}>Quartzito & cobre</figcaption>
            </figure>
          </Reveal>
          {[
            ['/assets/img/clinica-cafe.webp', 'Copa com ripado de madeira, prateleiras com luz quente e frigobar bordô', 'Copa', .08],
            ['/assets/img/clinica-consultorio-ripado.webp', 'Consultório com parede ripada, nicho iluminado e maca', 'Consultório', .11],
            ['/assets/img/clinica-mesa-orquideas.webp', 'Mesa de madeira com orquídeas, luminária creme e livros na sala de espera', 'Sala de espera', .14],
          ].map(([src, alt, label, delay]) => (
            <Reveal key={src as string} delay={delay as number}>
              <figure className="relative h-[220px] overflow-hidden rounded-[24px] sm:h-[280px] lg:h-full">
                <Image src={src as string} alt={alt as string} fill sizes="(max-width: 1023px) 50vw, 25vw" className={img} />
                <figcaption className={cap}>{label}</figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal delay={.17}>
            <figure className="relative h-[220px] overflow-hidden rounded-[24px] bg-cacao sm:h-[280px] lg:h-full">
              <LoopVideo src="/assets/video/clinica-detalhe.mp4" poster="/assets/video/clinica-detalhe-poster.jpg" label="Detalhe da cuba de pedra verde com arranjo de flores secas" />
              <figcaption className={cap}>Detalhes</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[24px] bg-bordo p-7 text-cream sm:p-9">
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[.22em] text-gold"><MapPin className="h-4 w-4" /> Endereço</p>
              <address className="mt-5 not-italic">
                <span className="block font-display text-[2.1rem] leading-tight">{contact.street}</span>
                <span className="mt-1 block text-lg text-cream/85">{contact.unit}</span>
                <span className="mt-1 block text-base text-cream/70">{contact.district} · {contact.city} · CEP {contact.cep}</span>
              </address>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-4 text-[13px] font-medium uppercase tracking-[.12em] transition-colors hover:border-gold hover:text-gold">
                  Google Maps <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-4 text-[13px] font-medium uppercase tracking-[.12em] transition-colors hover:border-gold hover:text-gold">
                  <Car className="h-4 w-4" /> Waze
                </a>
                <button type="button" onClick={copy} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-4 text-[13px] font-medium uppercase tracking-[.12em] transition-colors hover:border-gold hover:text-gold" aria-live="polite">
                  {copied ? <><Check className="h-4 w-4 text-gold" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar endereço</>}
                </button>
                <a href={whatsappUrl(messages.location)} target="_blank" rel="noopener noreferrer" data-sparkle className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-4 text-[13px] font-medium uppercase tracking-[.12em] text-espresso transition-colors hover:bg-cream">
                  <WhatsIcon className="h-4 w-4" /> Agendar
                </a>
              </div>
              <p className="mt-auto pt-8 text-[12px] leading-relaxed text-cream/55">Espaço do Instituto Médico Montserrat (Haddock Lobo, 578 · cj. 42).</p>
            </div>
          </Reveal>
          <Reveal delay={.08} className="lg:col-span-7">
            <div className="relative h-[340px] overflow-hidden rounded-[24px] bg-nude lg:h-full lg:min-h-[380px]">
              {mapOn ? (
                <iframe title="Mapa da clínica na Rua Haddock Lobo, 578" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0 [filter:sepia(.25)_saturate(.85)]" allowFullScreen />
              ) : (
                <button type="button" onClick={() => setMapOn(true)} className="group grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_45%,rgba(158,90,102,.2),transparent_55%)] text-ink">
                  <span aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(42,27,21,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(42,27,21,.07)_1px,transparent_1px)] [background-size:44px_44px]" />
                  <span className="relative flex flex-col items-center gap-4">
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-jade text-ivory shadow-[0_14px_40px_rgba(111,154,143,.45)]">
                      <span className="ping-soft absolute inset-0 rounded-full bg-jade/40" />
                      <MapPin className="relative h-7 w-7" />
                    </span>
                    <span className="text-sm font-medium uppercase tracking-[.16em] transition-colors group-hover:text-rosedeep">Carregar mapa interativo</span>
                    <span className="text-[13px] text-ink/60">O Google Maps só carrega se você tocar aqui.</span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
