'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from '../ui/Reveal';
import InstagramIcon from '../ui/InstagramIcon';
import WhatsIcon from '../ui/WhatsIcon';
import { compliance, contact, messages, stories, whatsappUrl } from '@/lib/content';

function StoryPlayer({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const story = stories[index];

  const next = useCallback(() => { if (index < stories.length - 1) onIndex(index + 1); else onClose(); }, [index, onIndex, onClose]);
  const prev = useCallback(() => { if (index > 0) onIndex(index - 1); else if (video.current) video.current.currentTime = 0; }, [index, onIndex]);

  useEffect(() => {
    setProgress(0);
    setPaused(false);
    const v = video.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {
      // autoplay com som bloqueado: segue mudo e deixa a pessoa ativar
      setMuted(true);
      v.muted = true;
      v.play().catch(() => setPaused(true));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') next();
      else if (event.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [next, prev, onClose]);

  const togglePause = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); } else { v.pause(); setPaused(true); }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Vídeo: ${story.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
      className="fixed inset-0 z-[90] grid place-items-center bg-espresso/92 backdrop-blur-xl"
    >
      <button type="button" aria-label="Fechar vídeos" onClick={onClose} className="absolute inset-0 cursor-default" tabIndex={-1} />

      <button type="button" onClick={prev} aria-label="Vídeo anterior" className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold md:grid lg:left-10">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={next} aria-label="Próximo vídeo" className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold md:grid lg:right-10">
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={story.id}
        initial={{ scale: .96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[100svh] w-full overflow-hidden bg-black md:h-[min(90svh,860px)] md:w-auto md:aspect-[9/16] md:rounded-[26px] md:shadow-[0_40px_120px_rgba(0,0,0,.6)]"
      >
        <video
          ref={video}
          key={story.video}
          src={story.video}
          poster={story.poster}
          playsInline
          muted={muted}
          className="absolute inset-0 h-full w-full object-cover"
          onTimeUpdate={(e) => { const v = e.currentTarget; if (v.duration) setProgress(v.currentTime / v.duration); }}
          onEnded={next}
        />

        {/* zonas de toque estilo stories: 1/3 volta, 2/3 avança */}
        <button type="button" aria-label="Vídeo anterior" onClick={prev} className="absolute inset-y-20 left-0 w-1/3" />
        <button type="button" aria-label="Próximo vídeo" onClick={next} className="absolute inset-y-20 right-0 w-2/3" />

        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/65 to-transparent px-4 pb-10 pt-[max(14px,env(safe-area-inset-top))]">
          <div className="flex gap-1">
            {stories.map((s, i) => (
              <span key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/30">
                <span className="block h-full origin-left bg-cream" style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }} />
              </span>
            ))}
          </div>
          <div className="pointer-events-auto mt-3 flex items-center gap-3 text-cream">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-gold">
              <Image src="/assets/img/enyla-retrato-close.webp" alt="" fill sizes="36px" className="object-cover object-[50%_30%]" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-medium">dra.enyla.cerqueira</span>
              <span className="block truncate text-[12px] text-cream/75">{story.kicker} · {story.title}</span>
            </span>
            <button type="button" onClick={togglePause} aria-label={paused ? 'Reproduzir' : 'Pausar'} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream/10">
              {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </button>
            <button type="button" onClick={() => { setMuted((m) => { if (video.current) video.current.muted = !m; return !m; }); }} aria-label={muted ? 'Ativar som' : 'Desativar som'} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream/10">
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Fechar" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream/10">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-16 text-cream">
          <div className="flex items-center gap-3">
            <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" data-sparkle className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 text-[13px] font-medium uppercase tracking-[.12em] text-espresso">
              <WhatsIcon className="h-4 w-4" /> Agendar avaliação
            </a>
            <a href={story.reel} target="_blank" rel="noopener noreferrer" aria-label="Ver este vídeo no Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-cream/30">
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-3 text-center text-[10.5px] leading-snug text-cream/65">
            {contact.name} · {contact.role} · {contact.registry}. {compliance.professional}
            {story.id === 'caso-dressa' && ` ${compliance.authorized}`}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StoryCard({ index, onOpen }: { index: number; onOpen: (i: number) => void }) {
  const story = stories[index];
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      onMouseEnter={() => { const v = ref.current; if (v && window.matchMedia('(pointer: fine)').matches) { v.currentTime = 0; v.play().catch(() => {}); } }}
      onMouseLeave={() => ref.current?.pause()}
      data-cursor="Assistir"
      className="group relative aspect-[9/16] w-[64vw] max-w-[270px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-cacao text-left shadow-[0_24px_60px_rgba(0,0,0,.35)] ring-1 ring-cream/10 transition-transform duration-500 hover:-translate-y-2 sm:w-[240px] lg:w-[260px]"
    >
      <Image src={story.poster} alt="" fill sizes="270px" quality={75} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <video ref={ref} src={story.video} muted playsInline loop preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-3 top-3 flex gap-1">
        <span className="h-[3px] flex-1 rounded-full bg-cream/70" />
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-20 text-cream">
        <span className="block text-[11px] font-medium uppercase tracking-[.2em] text-gold">{story.kicker}</span>
        <span className="mt-1 block font-display text-[1.6rem] leading-tight">{story.title}</span>
      </span>
      <span className="absolute right-3 top-6 grid h-10 w-10 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-espresso">
        <Play className="h-4 w-4 translate-x-[1px]" />
      </span>
    </button>
  );
}

export default function Stories() {
  const [open, setOpen] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      const i = stories.findIndex((s) => s.id === id);
      if (i >= 0) setOpen(i);
    };
    window.addEventListener('open-story', onOpen);
    return () => window.removeEventListener('open-story', onOpen);
  }, []);

  const scrollBy = (dir: number) => rail.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <section id="stories" aria-labelledby="stories-titulo" className="slats noise relative overflow-hidden py-24 text-cream sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-espresso/90 via-espresso/60 to-espresso/90" />
      <div className="container-shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow text-gold">Direto do consultório</p></Reveal>
            <Reveal delay={.06}>
              <h2 id="stories-titulo" className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)] leading-[1.02]">A Dra. <em className="shimmer">responde.</em></h2>
            </Reveal>
            <Reveal delay={.1}>
              <p className="mt-6 max-w-xl text-lg text-cream/80">Medo, durabilidade, treino, resultado: as dúvidas que mais chegam ao consultório, respondidas por ela em vídeos curtos — com som.</p>
            </Reveal>
          </div>
          <div className="flex gap-3 lg:col-span-5 lg:justify-end">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Vídeos anteriores" className="grid h-12 w-12 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Mais vídeos" className="grid h-12 w-12 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
      <div ref={rail} className="scrollbar-none relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 sm:scroll-px-[max(20px,calc((100vw-1440px)/2))] sm:px-[max(20px,calc((100vw-1440px)/2))]">
        {stories.map((s, i) => <StoryCard key={s.id} index={i} onOpen={setOpen} />)}
      </div>
      <AnimatePresence>
        {open !== null && <StoryPlayer index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
