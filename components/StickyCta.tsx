'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import WhatsIcon from './ui/WhatsIcon';
import { messages, whatsappUrl } from '@/lib/content';

/** CTA fixo: aparece depois do hero; barra no celular, pílula no desktop. */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('footer');
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight * .9 : false;
      setVisible(window.scrollY > window.innerHeight * .85 && !nearFooter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 90, opacity: 0 }}
          transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:inset-x-auto lg:bottom-7 lg:right-7 lg:p-0"
        >
          <a
            href={whatsappUrl(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-sparkle
            aria-label="Agendar avaliação com a Dra. Enyla pelo WhatsApp"
            className="flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-espresso px-7 text-sm font-medium uppercase tracking-[.12em] text-cream shadow-[0_14px_40px_rgba(29,19,16,.35)] ring-1 ring-gold/40 transition-colors duration-300 hover:bg-terracotta"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white"><WhatsIcon className="h-4 w-4" /></span>
            Agendar avaliação
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
