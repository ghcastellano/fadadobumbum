import { ArrowUpRight } from 'lucide-react';
import Marquee from '../fx/Marquee';
import Reveal from '../ui/Reveal';
import { messages, whatsappUrl } from '@/lib/content';

export default function VipBand() {
  return (
    <section aria-labelledby="vip-titulo" className="relative overflow-hidden bg-bordo text-ivory">
      <Marquee items={['Grupo VIP', 'Novidades em primeira mão', 'Conteúdo exclusivo', 'Bastidores do consultório']} duration={34} className="border-b border-ivory/20 py-4 font-display text-2xl italic sm:text-3xl" separator="✦" />
      <div className="container-shell grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <Reveal className="lg:col-span-7">
          <h2 id="vip-titulo" className="display text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1.04]">Entre para o <em>Grupo VIP</em> da Fada.</h2>
          <p className="mt-4 max-w-xl text-lg text-ivory/85">Novidades da agenda, bastidores e conteúdos que não vão para o feed. Basta mandar uma mensagem.</p>
        </Reveal>
        <Reveal delay={.08} className="lg:col-span-4 lg:col-start-9">
          <a href={whatsappUrl(messages.vip)} target="_blank" rel="noopener noreferrer" data-sparkle className="group flex min-h-16 items-center justify-between rounded-full bg-ivory px-7 text-sm font-medium uppercase tracking-[.16em] text-espresso transition-colors hover:bg-copper hover:text-ivory">
            Quero participar <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
