import Counter from '../fx/Counter';
import WordReveal from '../fx/WordReveal';
import Reveal from '../ui/Reveal';
import { statement } from '@/lib/content';

export default function Philosophy() {
  return (
    <section id="filosofia" aria-label="Filosofia de trabalho" className="editorial-grid relative bg-cream py-24 sm:py-28 lg:py-36">
      <div className="container-shell grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal><p className="eyebrow text-gold-deep">A filosofia da Fada</p></Reveal>
          <WordReveal
            as="h2"
            text={statement.replace('contorno', '*contorno*').replace('volume.', '*volume.*')}
            className="display mt-7 text-[clamp(2.3rem,4.9vw,4.6rem)] leading-[1.06] text-ink"
          />
        </div>
        <div className="grid gap-0 border-t border-ink/15 lg:col-span-4 lg:col-start-9">
          <Reveal className="border-b border-ink/15 py-6">
            <p className="flex items-baseline gap-2 font-display text-6xl text-gold-deep"><Counter value={10.4} decimals={1} /><span className="text-2xl text-ink/80">mil</span></p>
            <p className="mt-2 text-sm text-ink/80">mulheres acompanham a rotina do consultório no Instagram.</p>
          </Reveal>
          <Reveal delay={.06} className="border-b border-ink/15 py-6">
            <p className="font-display text-5xl italic text-gold-deep">Madrid</p>
            <p className="mt-2 text-sm text-ink/80">pós-graduação internacional e imersão em harmonização.</p>
          </Reveal>
          <Reveal delay={.12} className="py-6">
            <p className="flex items-baseline gap-2 font-display text-6xl text-gold-deep"><Counter value={0} /><span className="text-2xl text-ink/80">PMMA</span></p>
            <p className="mt-2 text-sm text-ink/80">apenas ácido hialurônico, absorvível pelo organismo.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
