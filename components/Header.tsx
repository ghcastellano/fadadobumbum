'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { contact, messages, navLinks, whatsappUrl } from '@/lib/content';
import WhatsIcon from './ui/WhatsIcon';
import InstagramIcon from './ui/InstagramIcon';

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-signature ${compact ? 'text-[1.75rem]' : 'text-[2rem] sm:text-[2.2rem]'} leading-[.9] transition-colors duration-500 ${light ? 'text-cream' : 'text-ink'}`}>Enyla Cerqueira</span>
      <span className={`mt-1 pl-1 text-[10px] font-medium uppercase tracking-[.34em] transition-colors duration-500 ${light ? 'text-gold' : 'text-gold-deep'}`}>Fada do Bumbum</span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { scrollY, scrollYProgress } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40));
  useEffect(() => { setScrolled(window.scrollY > 40); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const nodes = navLinks.map((l) => document.getElementById(l.section)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, .1, .3] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const light = open || !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          open
            ? 'bg-transparent text-cream'
            : scrolled
              ? 'border-b border-ink/10 bg-cream/85 text-ink backdrop-blur-md'
              : 'border-b border-cream/10 bg-gradient-to-b from-espresso/70 to-transparent text-cream'
        }`}
      >
        <div className="container-shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#inicio" aria-label="Dra. Enyla Cerqueira — Fada do Bumbum, início" className="relative z-10 shrink-0">
            <Logo light={light} />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-[13px] font-medium uppercase tracking-[.16em] xl:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} aria-current={active === link.section ? 'location' : undefined} className="group relative py-3">
                {link.label}
                <span className={`absolute bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${active === link.section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-sparkle
              className={`ml-1 inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 transition-colors duration-300 ${
                light ? 'border-cream/50 hover:border-gold hover:bg-gold hover:text-espresso' : 'border-ink bg-ink text-cream hover:border-terracotta hover:bg-terracotta'
              }`}
            >
              Agendar avaliação <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
            className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border transition-colors xl:hidden ${light ? 'border-cream/40 text-cream' : 'border-ink/25 text-ink'}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-copper via-gold to-rose" style={{ scaleX: scrollYProgress }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="menu-movel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: .6, ease: [0.76, 0, 0.24, 1] }}
            className="slats noise fixed inset-0 z-[45] overflow-y-auto pb-[max(28px,calc(env(safe-area-inset-bottom)+16px))] pt-[calc(var(--header-h)+12px)] text-cream"
          >
            <div className="container-shell relative flex min-h-full flex-col gap-8">
              <nav aria-label="Menu móvel" className="border-t border-cream/15">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 + .05 * index, duration: .5, ease: [0.22, 1, 0.36, 1] }}>
                    <a href={link.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-cream/15 py-3 font-display text-[clamp(2rem,8vw,2.8rem)] leading-tight hover:text-gold">
                      {link.label}
                      <span className="font-sans text-[11px] tabular-nums text-cream/50">0{index + 1}</span>
                    </a>
                  </motion.div>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-auto grid gap-3">
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5 text-sm text-cream/80"><InstagramIcon className="h-4 w-4 text-gold" />{contact.instagramHandle}</a>
                <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" data-sparkle className="flex min-h-14 items-center justify-between rounded-full bg-gold px-6 text-sm font-medium uppercase tracking-[.16em] text-espresso">
                  <span className="flex items-center gap-3"><WhatsIcon /> Agendar avaliação</span> <ArrowUpRight className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
