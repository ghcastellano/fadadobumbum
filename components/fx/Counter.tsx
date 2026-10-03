'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Counter({ value, decimals = 0, className = '', duration = 1.8 }: { value: number; decimals?: number; className?: string; duration?: number }) {
  const node = useRef<HTMLSpanElement>(null);
  const inView = useInView(node, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const format = (n: number) => n.toFixed(decimals).replace('.', ',');

  useEffect(() => {
    if (!node.current || !inView) return;
    if (reduced) { node.current.textContent = format(value); return; }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => { if (node.current) node.current.textContent = format(latest); },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration]);

  return <span ref={node} className={`tabular-nums ${className}`}>{format(value)}</span>;
}
