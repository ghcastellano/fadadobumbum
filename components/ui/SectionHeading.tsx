import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, text, dark = false, align = 'left', id }: { eyebrow: string; title: ReactNode; text?: string; dark?: boolean; align?: 'left' | 'center'; id?: string }) {
  return (
    <div className={align === 'center' ? 'mx-auto min-w-0 max-w-4xl text-center' : 'min-w-0 max-w-4xl'}>
      <Reveal><p className={`eyebrow ${dark ? 'text-gold' : 'text-gold-deep'}`}>{eyebrow}</p></Reveal>
      <Reveal delay={.06}>
        <h2 id={id} className={`display mt-6 text-[clamp(2.5rem,5.4vw,4.9rem)] leading-[1.02] ${dark ? 'text-cream' : 'text-ink'}`}>{title}</h2>
      </Reveal>
      {text && <Reveal delay={.12}><p className={`mt-6 max-w-2xl text-base sm:text-lg ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-cream/80' : 'text-ink/80'}`}>{text}</p></Reveal>}
    </div>
  );
}
