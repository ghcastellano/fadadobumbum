import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Header';
import InstagramIcon from './ui/InstagramIcon';
import WhatsIcon from './ui/WhatsIcon';
import { compliance, contact, mapsUrl, messages, navLinks, whatsappUrl } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="slats noise relative overflow-hidden text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/92 to-espresso" />
      <div className="container-shell relative py-20 lg:py-28">
        <div className="grid gap-10 border-b border-cream/15 pb-14 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:pb-20">
          <div>
            <p className="eyebrow text-gold">O próximo passo</p>
            <h2 className="display mt-6 max-w-4xl text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[1.02]">
              Quem sabe o próximo verão não encontra <em className="shimmer">uma versão sua muito mais confiante?</em>
            </h2>
          </div>
          <div className="lg:flex lg:justify-end">
            <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" data-sparkle className="group flex min-h-16 w-full items-center justify-between gap-4 rounded-full bg-gold px-7 text-sm font-medium uppercase tracking-[.16em] text-espresso transition-colors hover:bg-cream lg:max-w-sm">
              <span className="flex items-center gap-3"><WhatsIcon /> Agendar avaliação</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm text-cream/75">Harmonização glútea com ácido hialurônico, planejamento por pontos estratégicos e naturalidade que respeita a sua anatomia.</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-[11px] uppercase tracking-[.22em] text-gold">Navegação</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-cream/80">
              {navLinks.map((link) => <a key={link.href} href={link.href} className="flex min-h-9 w-fit items-center border-b border-transparent transition-colors hover:border-gold hover:text-cream">{link.label}</a>)}
            </div>
          </nav>
          <div>
            <p className="text-[11px] uppercase tracking-[.22em] text-gold">Contato</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-cream/80">
              <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-2"><WhatsIcon className="h-4 w-4 text-gold" /> {contact.whatsappLabel}</a>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center gap-2"><InstagramIcon className="h-4 w-4 text-gold" /> {contact.instagramHandle}</a>
              <a href={whatsappUrl(messages.vip)} target="_blank" rel="noopener noreferrer" className="flex min-h-9 items-center">Grupo VIP</a>
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[.22em] text-gold">Endereço</p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm leading-relaxed text-cream/80 hover:text-cream">
              {contact.street}<br />{contact.unit}<br />{contact.district} · {contact.city}<br />CEP {contact.cep}
            </a>
            <p className="mt-3 text-sm text-cream/60">Atendimento com hora marcada.</p>
          </div>
        </div>

        {/* Identificação exigida em toda divulgação (Res. CFBM 330/2020, art. 9º) */}
        <div className="mt-14 grid gap-3 border-t border-cream/15 pt-6 text-[12px] leading-relaxed text-cream/60 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p><strong className="font-medium text-cream/85">{contact.name}</strong> · Biomédica · {contact.habilitation} · {contact.registry} · {contact.registryExtra}</p>
            <p className="mt-1">{compliance.professional} Imagens de resultados não representam, em hipótese alguma, garantia de resultado: cada ser humano tem características anatômicas e fisiológicas únicas.</p>
          </div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 uppercase tracking-[.14em]">
            <Link href="/politica-de-privacidade" className="flex min-h-9 items-center border-b border-transparent hover:border-gold hover:text-cream">Privacidade</Link>
            <span>© {new Date().getFullYear()} Fada do Bumbum</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
