'use client';

import { useEffect, useRef } from 'react';

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number; spin: number; rot: number };

/**
 * "Pó de fada": brilhos dourados que nascem do cursor e de cliques em CTAs.
 * Canvas único, sem dependências; desligado em toque e em movimento reduzido.
 * Disparo manual: window.dispatchEvent(new CustomEvent('fairy-burst', { detail: { x, y } })).
 */
export default function FairyDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0, running = false;
    const sparks: Spark[] = [];
    let lastX = -1, lastY = -1, budget = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (x: number, y: number, burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.2 + Math.random() * 3.2 : .15 + Math.random() * .5;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? .6 : .25),
        life: 0,
        max: burst ? 55 + Math.random() * 35 : 38 + Math.random() * 30,
        size: burst ? 2.2 + Math.random() * 3.2 : 1.2 + Math.random() * 2.4,
        hue: Math.random(),
        spin: (Math.random() - .5) * .2,
        rot: Math.random() * Math.PI,
      });
      if (sparks.length > 220) sparks.splice(0, sparks.length - 220);
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    const star = (s: Spark, alpha: number) => {
      const r = s.size * (1 - s.life / s.max * .4);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      const color = s.hue < .6 ? `rgba(233, 205, 160, ${alpha})` : s.hue < .85 ? `rgba(201, 162, 122, ${alpha})` : `rgba(240, 196, 182, ${alpha})`;
      ctx.fillStyle = color;
      ctx.shadowColor = 'rgba(243, 214, 170, .9)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // estrela de 4 pontas (brilho de fada)
      ctx.moveTo(0, -r * 2.2);
      ctx.quadraticCurveTo(r * .28, -r * .28, r * 2.2, 0);
      ctx.quadraticCurveTo(r * .28, r * .28, 0, r * 2.2);
      ctx.quadraticCurveTo(-r * .28, r * .28, -r * 2.2, 0);
      ctx.quadraticCurveTo(-r * .28, -r * .28, 0, -r * 2.2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life++;
        s.x += s.vx; s.y += s.vy;
        s.vx *= .97; s.vy = s.vy * .97 + .018;
        s.rot += s.spin;
        const t = s.life / s.max;
        if (t >= 1) { sparks.splice(i, 1); continue; }
        const alpha = t < .15 ? t / .15 : 1 - (t - .15) / .85;
        star(s, Math.max(0, alpha) * .95);
      }
      if (sparks.length) raf = requestAnimationFrame(tick);
      else { running = false; ctx.clearRect(0, 0, w, h); }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = event;
      if (lastX < 0) { lastX = x; lastY = y; return; }
      const dist = Math.hypot(x - lastX, y - lastY);
      budget += dist;
      lastX = x; lastY = y;
      // ~1 brilho a cada 26px percorridos: rastro discreto, nunca "chuva".
      while (budget > 26) { budget -= 26; spawn(x + (Math.random() - .5) * 10, y + (Math.random() - .5) * 10); }
    };
    const burst = (x: number, y: number, n = 22) => { for (let i = 0; i < n; i++) spawn(x, y, true); };
    const onBurst = (event: Event) => {
      const detail = (event as CustomEvent<{ x: number; y: number }>).detail;
      if (detail) burst(detail.x, detail.y);
    };
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement).closest?.('[data-sparkle]');
      if (el) burst(event.clientX, event.clientY, 26);
    };

    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('fairy-burst', onBurst);
    window.addEventListener('click', onClick, true);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('fairy-burst', onBurst);
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]" />;
}
