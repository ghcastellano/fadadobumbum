'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Word({ word, progress, range, floor, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; floor: number; accent: boolean }) {
  const opacity = useTransform(progress, range, [floor, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? 'italic text-gold-deep' : ''}>
      {word}{' '}
    </motion.span>
  );
}

/**
 * Texto que acende palavra a palavra com o scroll. Palavras entre *asteriscos*
 * viram itálico dourado. O texto integral fica num span sr-only.
 */
export default function WordReveal({ text, className = '', as: Tag = 'p', dark = false }: { text: string; className?: string; as?: 'p' | 'h2' | 'h3'; dark?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start 0.9', 'start 0.3'] });
  const words = text.split(' ');
  const plain = text.replace(/\*/g, '');
  const floor = dark ? .28 : .22;

  if (reduced) return <Tag ref={root as never} className={className}>{plain}</Tag>;

  return (
    <Tag ref={root as never} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {words.map((raw, index) => {
          const accent = raw.startsWith('*');
          const word = raw.replace(/\*/g, '');
          return (
            <Word
              key={`${word}-${index}`}
              word={word}
              accent={accent}
              progress={scrollYProgress}
              range={[index / words.length, Math.min(1, (index + 1) / words.length + .06)]}
              floor={floor}
            />
          );
        })}
      </span>
    </Tag>
  );
}
