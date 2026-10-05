'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useDesktopFx } from '@/lib/fx';

export default function ParallaxImage({
  src, alt, sizes, className = '', imageClassName = 'object-cover', priority = false, quality = 85, strength = 5,
}: { src: string; alt: string; sizes: string; className?: string; imageClassName?: string; priority?: boolean; quality?: number; strength?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fx = useDesktopFx();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={root}
      className={`relative overflow-hidden ${className}`}
      initial={reduced ? false : { clipPath: 'inset(12% 0 12% 0)' }}
      whileInView={reduced ? undefined : { clipPath: 'inset(0% 0 0% 0)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-x-0 -inset-y-[8%] will-change-transform" style={fx ? { y } : undefined}>
        <Image src={src} alt={alt} fill priority={priority} quality={quality} sizes={sizes} className={imageClassName} />
      </motion.div>
    </motion.div>
  );
}
