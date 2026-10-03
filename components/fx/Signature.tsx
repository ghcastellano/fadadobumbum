'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { signaturePaths, signatureViewBox } from './signature-paths';

/**
 * Assinatura "Enyla Cerqueira" que se escreve sozinha: cada glifo tem o
 * contorno desenhado em sequência e depois ganha preenchimento.
 * `trigger="view"` espera entrar na tela; `"mount"` começa ao montar.
 */
export default function Signature({
  className = '',
  delay = 0,
  duration = 1.9,
  trigger = 'view',
  title = 'Assinatura de Enyla Cerqueira',
}: {
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: 'view' | 'mount';
  title?: string;
}) {
  const reduced = useReducedMotion();
  const step = duration / signaturePaths.length;
  const target = { pathLength: 1, fillOpacity: 1 };

  return (
    <svg viewBox={signatureViewBox} role="img" aria-label={title} className={className} fill="none">
      {signaturePaths.map((d, index) => (
        <motion.path
          key={index}
          d={d}
          stroke="currentColor"
          strokeWidth={1.1}
          fill="currentColor"
          initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
          {...(trigger === 'mount' ? { animate: target } : { whileInView: target, viewport: { once: true, amount: .6 } })}
          transition={{
            pathLength: { duration: step * 2.2, delay: delay + index * step, ease: [0.45, 0, 0.2, 1] },
            fillOpacity: { duration: .5, delay: delay + index * step + step * 1.4, ease: 'easeOut' },
          }}
        />
      ))}
    </svg>
  );
}
