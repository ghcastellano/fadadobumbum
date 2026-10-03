import Signature from '../fx/Signature';
import ParallaxImage from '../ui/ParallaxImage';
import Reveal from '../ui/Reveal';
import { contact, principles } from '@/lib/content';

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative bg-ivory py-24 sm:py-28 lg:py-36">
      <div className="container-shell grid gap-14 lg:grid-cols-[minmax(0,500px)_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[minmax(0,560px)_minmax(0,1fr)] xl:gap-28">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <Reveal>
            <div className="relative mx-auto max-w-[560px]">
              <span aria-hidden="true" className="arch absolute -inset-3 border border-gold/40" />
              <ParallaxImage
                src="/assets/img/enyla-poltrona-terracota.webp"
                alt="Dra. Enyla Cerqueira de uniforme preto, sentada na poltrona terracota do consultório"
                sizes="(max-width: 1023px) 92vw, 560px"
                className="arch aspect-[4/5] w-full"
                imageClassName="object-cover object-[50%_20%]"
              />
              <div className="absolute -bottom-6 right-4 rounded-2xl border border-ink/10 bg-ivory/90 px-5 py-4 shadow-[0_20px_50px_rgba(42,27,21,.15)] backdrop-blur sm:right-8">
                <p className="text-[11px] font-medium uppercase tracking-[.2em] text-gold-deep">{contact.registry}</p>
                <p className="mt-1 text-sm text-ink/80">{contact.role} · {contact.registryExtra}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="min-w-0 pt-4 lg:pt-10">
          <Reveal><p className="eyebrow text-gold-deep">A Dra.</p></Reveal>
          <Reveal delay={.06}>
            <h2 id="sobre-titulo" className="display mt-7 text-[clamp(2.8rem,5.6vw,5.4rem)] leading-[1]">
              Prazer, <em className="text-terracotta">Enyla</em>.
            </h2>
          </Reveal>
          <Reveal delay={.1}>
            <p className="mt-8 max-w-xl text-lg text-ink/85">
              Biomédica esteta com foco em harmonização glútea, a Dra. Enyla Cerqueira virou a <strong className="font-medium text-ink">Fada do Bumbum</strong> por um jeito muito próprio de trabalhar: escutar primeiro, planejar com precisão e devolver confiança — sem exageros.
            </p>
          </Reveal>
          <Reveal delay={.14}>
            <p className="mt-5 max-w-xl text-base text-ink/80">
              Atende em São Paulo, nos Jardins, e acaba de viver mais um capítulo da sua formação em Madrid, na Espanha. Para ela, estudar nunca foi sobre ter mais um certificado: é sobre continuar evoluindo para entregar o melhor a cada paciente.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-0 border-t border-ink/15">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * .06}>
                <div className="group grid gap-3 border-b border-ink/15 py-7 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-6">
                  <span aria-hidden="true" className="text-outline font-display text-5xl text-ink/35 transition-colors duration-500 group-hover:text-terracotta">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                    <p className="mt-2 text-base text-ink/80">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={.1}>
            <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-2 text-gold-deep">
              <Signature className="h-16 w-auto sm:h-[4.5rem]" />
              <p className="pb-3 text-[11px] font-medium uppercase tracking-[.22em] text-ink/70">{contact.role} · {contact.registry}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
