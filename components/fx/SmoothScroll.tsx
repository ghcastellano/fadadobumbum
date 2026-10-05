'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';
import { isDesktopFx } from '@/lib/fx';

/**
 * Scroll suave (Lenis) só com mouse/trackpad, sem toque e sem prefers-reduced-motion;
 * no toque (celular, iPad) o scroll nativo é mantido. Âncoras internas passam pelo Lenis.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (!isDesktopFx()) return;

    let lenis: Lenis | null = null;
    let frame = 0;
    let disposed = false;
    let observer: MutationObserver | null = null;

    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (document.body.style.overflow === 'hidden') return;
      const anchor = (event.target as HTMLElement).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      event.preventDefault();
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const destination = window.scrollY + target.getBoundingClientRect().top - padding;
      lenis.scrollTo(Math.max(0, destination), { duration: 1.2 });
      history.pushState(null, '', url.hash);
    };

    import('lenis').then(({ default: LenisCtor }) => {
      if (disposed) return;
      lenis = new LenisCtor({ duration: 1.1 });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      // Modais (menu, stories) travam o body: pausa o smooth scroll junto.
      observer = new MutationObserver(() => {
        if (document.body.style.overflow === 'hidden') lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
      document.addEventListener('click', onClick, true);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener('click', onClick, true);
      lenis?.destroy();
    };
  }, []);

  return null;
}
