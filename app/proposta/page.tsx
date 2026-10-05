import type { CSSProperties, ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import OfferDeck from './OfferDeck';
import { brl, installmentValue, market, nameCheck, pixPrice, plans, pricing, seller, sellerWhatsapp } from '@/lib/offer';
import './proposta.css';

export const metadata: Metadata = {
  title: 'Proposta — site oficial da Fada do Bumbum',
  description: 'Proposta do site oficial da Dra. Enyla Cerqueira: o que foi construído, como funciona, investimento e planos de suporte e evolução.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/proposta' },
  openGraph: {
    title: 'Dra. Enyla, a Fada do Bumbum merece um endereço à altura',
    description: 'Site autoral já no ar, feito a partir do seu Instagram, da sua formação em Madrid e da clínica da Haddock Lobo.',
    url: '/proposta',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Fada do Bumbum' }],
  },
};
export const viewport: Viewport = { themeColor: '#1d1310' };

const d = (n: number) => ({ ['--d' as string]: n }) as CSSProperties;

function Heading({ eyebrow, children, lead, n = 0 }: { eyebrow: string; children: ReactNode; lead?: string; n?: number }) {
  return (
    <header className="grid gap-5">
      <p className="of-eyebrow of-reveal" style={d(n)}>{eyebrow}</p>
      <h2 className="of-reveal" style={d(n + 1)}>{children}</h2>
      {lead && <p className="of-lead of-reveal" style={d(n + 2)}>{lead}</p>}
    </header>
  );
}

function Shot({ src, alt, label, className = '', n = 0 }: { src: string; alt: string; label?: string; className?: string; n?: number }) {
  return (
    <figure className={`of-reveal m-0 ${className}`} style={d(n)}>
      <div className="of-browser">
        <div className="of-browser-bar"><i /><i /><i /><span>fadadobumbum.vercel.app</span></div>
        <Image src={src} alt={alt} width={1440} height={900} sizes="(max-width: 900px) 92vw, 640px" className="block h-auto w-full" />
      </div>
      {label && <figcaption className="mt-3 text-[12px] uppercase tracking-[.18em] opacity-70">{label}</figcaption>}
    </figure>
  );
}

const live = (
  <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-60 motion-reduce:hidden" />
    <span className="relative h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
  </span>
);

const check = <span aria-hidden="true" className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rosedeep text-[11px] text-ivory">✓</span>;

export default function Oferta() {
  return (
    <>
    <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('of-js')" }} />
    <OfferDeck jump={{ label: 'Investimento', slide: 10 }}>
      {/* 01 — capa */}
      <section className="of-slide of-dark slats noise" data-title="A proposta" aria-labelledby="of-t1">
        <div className="of-orbs" aria-hidden="true"><i /><i /></div>
        <div className="of-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div className="grid gap-6">
              <p className="of-eyebrow of-reveal" style={d(0)}>Proposta · Site oficial · Outubro de 2026</p>
              <h1 id="of-t1" className="of-reveal text-[clamp(3rem,6.4vw,6.4rem)] leading-[.95]" style={d(1)}>
                Dra. Enyla, a <em className="shimmer">Fada do Bumbum</em> merece um endereço à altura.
              </h1>
              <p className="of-lead of-reveal" style={d(2)}>
                Um site autoral, <strong className="font-medium text-cream">já construído e no ar</strong>, feito a partir do seu Instagram, da sua formação em Madrid e da clínica da Haddock Lobo. Esta apresentação mostra o que ele faz, por que ele vende e quanto custa mantê-lo evoluindo.
              </p>
              <p className="of-reveal inline-flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-gold/40 bg-cream/5 px-5 py-2.5 text-[14px]" style={d(3)}>
                {live}<span><b className="font-medium text-cream">fadadobumbum.com.br</b> <span className="text-cream/75">está disponível hoje</span></span>
              </p>
              <div className="of-reveal flex flex-wrap items-center gap-4" style={d(4)}>
                <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-7 text-[13px] font-medium uppercase tracking-[.14em] text-espresso">Abrir o site ↗</a>
                <span className="text-[13px] text-cream/65">13 capítulos · cerca de 6 minutos</span>
              </div>
              <div className="of-reveal mt-4 flex items-center gap-3" style={d(5)}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 font-display text-lg text-gold ring-1 ring-gold/40">{seller.initials}</span>
                <span className="leading-tight"><b className="block font-medium">{seller.name}</b><small className="text-cream/65">{seller.role}</small></span>
              </div>
            </div>
            <div className="of-reveal relative" style={d(3)}>
              <div className="of-browser">
                <div className="of-browser-bar"><i /><i /><i /><span>fadadobumbum.vercel.app</span></div>
                <Image src="/assets/oferta/tour-hero.webp" alt="Página inicial do site Fada do Bumbum" width={1440} height={900} priority sizes="(max-width: 900px) 92vw, 620px" className="block h-auto w-full" />
              </div>
              <div className="of-phone absolute -bottom-10 -left-6 hidden w-[30%] sm:block">
                <Image src="/assets/oferta/mobile-hero.webp" alt="Site no celular" width={390} height={844} sizes="200px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — hoje */}
      <section className="of-slide" data-title="Onde você está hoje">
        <div className="of-wrap">
          <Heading eyebrow="01 / Onde você está hoje" lead="Seu Instagram tem o que muita clínica não tem: conteúdo bom, autêntico e com resultado real. O problema é onde ele mora.">
            Seu conteúdo é de alto nível. <em>Mas ainda não tem casa própria.</em>
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['10,4 mil', 'seguidoras acompanham a rotina do consultório'],
              ['188', 'publicações — reels com até 30 mil visualizações'],
              ['2 botões', 'é tudo o que o link da bio oferece hoje'],
              ['0', 'páginas suas aparecendo no Google'],
            ].map(([big, small], i) => (
              <div key={big} className="of-card of-reveal" style={d(3 + i)}>
                <p className="font-display text-[3.2rem] leading-none text-gold-deep">{big}</p>
                <p>{small}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="of-card of-reveal" style={d(7)}><span className="of-num">a</span><h3>O algoritmo decide quem vê</h3><p>Um reel bom some do feed em dias. O que você construiu fica preso à vitrine de outra empresa.</p></article>
            <article className="of-card of-reveal" style={d(8)}><span className="of-num">b</span><h3>Quem pesquisa, não te acha</h3><p>A paciente que busca “harmonização glútea São Paulo” encontra quem tem site — não quem tem o melhor conteúdo.</p></article>
            <article className="of-card of-reveal" style={d(9)}><span className="of-num">c</span><h3>A primeira conversa começa fria</h3><p>Sem um lugar para entender o procedimento, cada mensagem no WhatsApp recomeça do zero.</p></article>
          </div>
        </div>
      </section>

      {/* 03 — domínio */}
      <section className="of-slide of-dark" data-title="O nome Fada do Bumbum">
        <div className="of-orbs" aria-hidden="true"><i /><i /></div>
        <div className="of-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid gap-6">
              <Heading eyebrow="02 / O nome Fada do Bumbum" lead="É um nome que se guarda de primeira, fácil de buscar e de indicar — o tipo de nome que vira referência. Na consulta de hoje, ele continua livre. Mas no Registro.br não existe reserva: o domínio fica com quem registrar primeiro.">
                Fada do Bumbum é a sua marca. <em>Hoje, o nome ainda está disponível.</em>
              </Heading>
              <div className="of-reveal grid gap-3" style={d(4)}>
                <p className="text-[11px] uppercase tracking-[.22em] text-gold">Se outra pessoa registrar antes</p>
                <ul className="grid gap-2.5 text-[15px] leading-snug text-cream/85">
                  <li className="flex gap-3"><span className="text-gold">✕</span>quem digitar “Fada do Bumbum” cai no site de outra pessoa;</li>
                  <li className="flex gap-3"><span className="text-gold">✕</span>recuperar um domínio ocupado custa muito mais — quando o dono aceita vender;</li>
                  <li className="flex gap-3"><span className="text-gold">✕</span>todo o conteúdo que você cria passa a fortalecer um endereço que não é seu.</li>
                </ul>
              </div>
            </div>
            <div className="of-reveal grid gap-4" style={d(3)}>
              <div className="grid gap-5 rounded-[22px] border border-gold/40 bg-cream/5 p-7">
                <p className="text-[11px] uppercase tracking-[.22em] text-gold">Consulta no Registro.br e na Verisign · {nameCheck.date}</p>
                {nameCheck.domains.map((domain, i) => (
                  <div key={domain.tld} className={i ? 'border-t border-cream/10 pt-5' : ''}>
                    <p className={`break-all font-display leading-none ${i ? 'text-[clamp(1.5rem,2.4vw,2.1rem)] text-cream/85' : 'text-[clamp(2rem,3.6vw,3.2rem)]'}`}>{domain.name}<span className="text-gold">{domain.tld}</span></p>
                    <p className="mt-3 flex items-center gap-2.5 text-sm text-cream/85">{live} Disponível · {domain.note}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[22px] bg-gold px-7 py-5 text-espresso">
                <p className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">{brl(pricing.domainYear)} por ano.</p>
                <p className="mt-1 text-[15px]">Menos de R$ 4 por mês para o nome ser seu — em qualquer cenário.</p>
              </div>
              <p className="of-note">O registro é feito no CPF ou CNPJ da Dra. Enyla: o endereço é dela, independentemente de quem cuida do site. Para proteger o nome também fora da internet, o passo seguinte é o registro da marca no INPI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — pilares */}
      <section className="of-slide of-blush" data-title="O que o site resolve">
        <div className="of-wrap">
          <Heading eyebrow="03 / O que o site resolve" lead="Cada seção foi desenhada para uma etapa da decisão da paciente — da curiosidade ao agendamento.">
            Um site que trabalha <em>enquanto você atende.</em>
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Autoridade', 'Madrid, CRBM, formação e filosofia de trabalho apresentadas com a elegância do seu consultório.'],
              ['Confiança', 'Resultado real com antes e depois, medos respondidos em vídeo e a jornada explicada passo a passo.'],
              ['Conversão', 'O “mapa do objetivo” entrega no seu WhatsApp uma mensagem já com a queixa e o momento da paciente.'],
              ['Conformidade', 'Textos e imagens seguindo o Código de Ética da Biomedicina: legendas obrigatórias e sem promessas.'],
            ].map(([title, text], i) => (
              <article key={title} className="of-card of-reveal" style={d(3 + i)}>
                <span className="of-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — tour */}
      <section className="of-slide of-dark" data-title="Tour pelas experiências">
        <div className="of-wrap">
          <Heading eyebrow="04 / Tour pelas experiências" lead="Nada de template: cada efeito foi pensado para o universo da harmonização glútea e para o público dela.">
            Efeitos que surpreendem <em>— e explicam.</em>
          </Heading>
          <div className="grid gap-6 lg:grid-cols-3">
            <Shot src="/assets/oferta/tour-mapa.webp" alt="Mapa do contorno interativo" label="Mapa do contorno · os 4 pontos estratégicos" n={3} />
            <Shot src="/assets/oferta/tour-resultado.webp" alt="Antes e depois com slider" label="Antes e depois com véu de privacidade" n={4} />
            <Shot src="/assets/oferta/tour-stories.webp" alt="Stories com vídeos da Dra." label="“A Dra. responde” · stories com som" n={5} />
          </div>
          <div className="grid gap-3 text-sm text-cream/80 sm:grid-cols-2 lg:grid-cols-4">
            {['Assinatura “Enyla Cerqueira” que se escreve sozinha', 'Pó de fada dourado seguindo o cursor', 'Ripado de madeira do consultório desenhado em código', 'Cartão de embarque GRU → MAD contando a formação'].map((t, i) => (
              <p key={t} className="of-reveal flex gap-3 border-t border-cream/15 pt-3" style={d(6 + i)}><span className="text-gold">✦</span>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — conversão */}
      <section className="of-slide" data-title="Do site ao WhatsApp">
        <div className="of-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
            <div className="grid gap-6">
              <Heading eyebrow="05 / Do site ao WhatsApp" lead="A paciente marca o que a incomoda e como se sente. O site monta a mensagem e abre o seu WhatsApp. Você recebe o contato já qualificado — sem formulário, sem dado guardado.">
                A paciente chega <em>com a queixa pronta.</em>
              </Heading>
              <ul className="of-reveal grid gap-3 text-[15px]" style={d(3)}>
                {['Mensagens prontas em cada botão (resultado, Madrid, medo, Grupo VIP)', 'Botão fixo de agendamento no celular', 'Mapa e endereço com Google Maps, Waze e “copiar endereço”', 'Nada fica salvo no site: LGPD tranquila'].map((t) => <li key={t} className="flex gap-3">{check}{t}</li>)}
              </ul>
            </div>
            <Shot src="/assets/oferta/tour-quiz.webp" alt="Mapa do objetivo gerando mensagem de WhatsApp" n={4} />
          </div>
        </div>
      </section>

      {/* 07 — celular */}
      <section className="of-slide of-dark slats noise" data-title="Feito para o celular">
        <div className="of-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Heading eyebrow="06 / Feito para o celular" lead="É no celular que a paciente vê o reel e clica no link da bio. O site foi desenhado primeiro para a palma da mão — e depois ampliado para o computador.">
              Leve como um app. <em>Bonito em qualquer tela.</em>
            </Heading>
            <div className="of-reveal grid grid-cols-3 items-end gap-4" style={d(3)}>
              <div className="of-phone translate-y-6"><Image src="/assets/oferta/mobile-mapa.webp" alt="Mapa do contorno no celular" width={390} height={844} sizes="180px" /></div>
              <div className="of-phone"><Image src="/assets/oferta/mobile-hero.webp" alt="Início do site no celular" width={390} height={844} sizes="180px" /></div>
              <div className="of-phone translate-y-6"><Image src="/assets/oferta/mobile-quiz.webp" alt="Mapa do objetivo no celular" width={390} height={844} sizes="180px" /></div>
            </div>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {[['Next.js + Vercel', 'a mesma tecnologia de grandes marcas'], ['320 px a 4K', 'testado em celular, tablet e desktop'], ['Acessível', 'teclado, leitor de tela e movimento reduzido'], ['Imagens otimizadas', 'AVIF/WebP sob medida para cada tela']].map(([a, b], i) => (
              <p key={a} className="of-reveal border-t border-cream/15 pt-3" style={d(4 + i)}><b className="block font-display text-2xl font-normal text-gold">{a}</b><span className="text-cream/75">{b}</span></p>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — conformidade */}
      <section className="of-slide" data-title="Dentro das regras">
        <div className="of-wrap">
          <Heading eyebrow="07 / Bonito e dentro das regras" lead="Publicidade de biomedicina tem regras próprias (Código de Ética, Res. CFBM nº 330/2020). O site já nasce seguindo o que elas pedem.">
            Marketing que <em>não vira problema.</em>
          </Heading>
          <div className="grid gap-4 lg:grid-cols-2">
            <ul className="of-card of-reveal grid gap-3 text-[15px]" style={d(3)}>
              {['Antes e depois com “divulgação autorizada pelo usuário” e o aviso de que não há garantia de resultado', 'Nome, CRBM-SP 69172 e habilitação em todas as páginas', 'Sem preços, promoções, sorteios ou “a melhor”', '“Especialista” só com título registrado — até lá, “foco em harmonização glútea”', 'Fotos sem retoque no corpo; imagens de pacientes só com TCLE'].map((t) => <li key={t} className="flex gap-3">{check}<span>{t}</span></li>)}
            </ul>
            <div className="of-card of-reveal grid content-start gap-4" style={d(4)}>
              <span className="of-num">Recomendação</span>
              <h3>Validar antes de indexar no Google</h3>
              <p>O cenário regulatório da estética mudou em 2026, com decisões judiciais e novas regras para preenchedores. Antes de liberar o site nos buscadores, vale uma leitura da sua assessoria jurídica ou do CRBM-1. Enquanto isso, ele fica no ar sem aparecer no Google.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — mercado */}
      <section className="of-slide of-dark" data-title="Quanto custa no mercado">
        <div className="of-orbs" aria-hidden="true"><i /><i /></div>
        <div className="of-wrap">
          <Heading eyebrow="08 / Referência de mercado" lead="Faixas praticadas no Brasil em 2025–2026, por escopo de projeto.">
            O que um site assim <em>custa por aí.</em>
          </Heading>
          <div className="grid gap-3">
            {market.map((m, i) => (
              <div key={m.tier} className="of-reveal grid items-center gap-x-6 gap-y-1 border-t border-cream/15 pt-3 md:grid-cols-[230px_1fr_200px]" style={d(3 + i)}>
                <p className="font-display text-2xl">{m.tier}</p>
                <div className="h-3 overflow-hidden rounded-full bg-cream/10"><div className="of-bar-fill h-full rounded-full bg-gradient-to-r from-rosedeep to-gold" style={{ width: `${m.level * 100}%` }} /></div>
                <p className="text-right font-display text-2xl text-gold">{m.range}</p>
                <p className="text-[13px] text-cream/60 md:col-start-2">{m.note}</p>
              </div>
            ))}
          </div>
          <p className="of-reveal rounded-2xl border border-gold/40 bg-gold/10 px-6 py-4 text-cream/90" style={d(8)}>
            <b className="font-medium text-gold">Esta proposta:</b> escopo de estúdio boutique (design autoral, animações, SEO local, vídeos, conformidade), com preço de estúdio enxuto, e o site já pronto para você ver antes de decidir.
          </p>
        </div>
      </section>

      {/* 10 — investimento */}
      <section className="of-slide of-blush" data-title="Investimento">
        <div className="of-wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-6">
              <Heading eyebrow="09 / Investimento" lead="Pagamento único pela implantação. Sem fidelidade obrigatória: o código e o domínio ficam no seu nome.">
                Um procedimento <em>paga o site.</em>
              </Heading>
              <ul className="of-reveal grid gap-3 text-[15px]" style={d(3)}>
                {['Site completo (o que você está vendo), com seus textos e fotos finais', '2 rodadas de ajustes e 30 dias de garantia', 'Domínio fadadobumbum.com.br registrado no seu nome e configurado', 'Publicação, SSL, Google Search Console e analytics', 'Treinamento rápido: como pedir alterações e acompanhar os cliques'].map((t) => <li key={t} className="flex gap-3">{check}<span>{t}</span></li>)}
              </ul>
            </div>
            <div className="of-reveal rounded-[28px] bg-espresso p-8 text-cream shadow-[0_40px_90px_rgba(29,19,16,.35)] sm:p-10" style={d(2)}>
              <p className="text-[11px] uppercase tracking-[.24em] text-gold">Implantação</p>
              <p className="mt-4 font-display text-[clamp(3.6rem,7vw,6rem)] leading-none">{brl(pricing.setup)}</p>
              <p className="mt-3 text-lg text-cream/85">ou <b className="font-medium text-cream">{pricing.installments}x de {brl(installmentValue)}</b> sem juros</p>
              <div className="mt-6 grid gap-3 border-t border-cream/15 pt-6 text-sm text-cream/80">
                <p className="flex justify-between gap-4"><span>Pix à vista (5% off)</span><b className="font-display text-2xl font-normal text-gold">{brl(pixPrice)}</b></p>
                <p className="flex justify-between gap-4"><span>Ou por etapas</span><span>40% · 30% · 30%</span></p>
                <p className="flex justify-between gap-4"><span>Cartão</span><span>até 12x (taxa da maquininha)</span></p>
              </div>
              <a href={sellerWhatsapp('Gustavo, vi a proposta do site da Fada do Bumbum e quero fechar a implantação.')} target="_blank" rel="noopener noreferrer" data-sparkle className="mt-8 flex min-h-14 items-center justify-center rounded-full bg-gold text-[13px] font-medium uppercase tracking-[.16em] text-espresso">Quero o meu site ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — planos */}
      <section className="of-slide" data-title="Suporte e evolução">
        <div className="of-wrap">
          <Heading eyebrow="10 / Suporte e evolução" lead={`Hospedagem profissional, segurança e evolução contínua. Hora avulsa fora do plano: ${brl(pricing.hourly)}.`}>
            Escolha o ritmo <em>de crescimento.</em>
          </Heading>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((p, i) => (
              <article key={p.name} className={`of-card of-reveal relative grid content-start gap-3 !p-6 ${p.featured ? 'ring-2 ring-rosedeep' : ''}`} style={d(3 + i)}>
                {p.featured && <span className="absolute -top-3 right-6 rounded-full bg-rosedeep px-3 py-1 text-[10.5px] font-medium uppercase tracking-[.18em] text-ivory">Recomendado</span>}
                <div>
                  <h3>{p.name}</h3>
                  <p className="!mt-1">{p.tagline}</p>
                </div>
                <p className="!mt-1 font-display text-[2.8rem] leading-none text-ink">{brl(p.price)}<span className="font-sans text-base text-ink/60">/mês</span></p>
                {p.minimum && <p className="!mt-0 text-[12px] uppercase tracking-[.16em] text-rosedeep">{p.minimum}</p>}
                <ul className="grid gap-2 border-t border-ink/10 pt-3 text-[14px] leading-snug text-ink/80">
                  {p.items.map((t) => <li key={t} className="flex gap-3">{check}<span>{t}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — próximos passos */}
      <section className="of-slide of-dark slats noise" data-title="Como seguimos">
        <div className="of-wrap">
          <Heading eyebrow="11 / Como seguimos" lead="Como o site já existe, o caminho até o seu domínio é curto.">
            Do “sim” ao ar <em>em até 7 dias.</em>
          </Heading>
          <ol className="grid gap-4 md:grid-cols-5">
            {[
              ['Você aprova', 'Esta conversa: escopo, plano e forma de pagamento.'],
              ['Seus materiais', 'Fotos e vídeos autorizados (TCLE), horários e confirmação do registro RS 9243.'],
              ['Ajustes finos', 'Textos com a sua voz e revisão de conformidade.'],
              ['Domínio no seu nome', 'fadadobumbum.com.br registrado e apontado.'],
              ['No ar e no Google', 'Liberação para buscadores e primeiro relatório.'],
            ].map(([title, text], i) => (
              <li key={title} className="of-card of-reveal" style={d(3 + i)}>
                <span className="of-num">{i + 1}</span>
                <h3 className="!text-[1.45rem]">{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 13 — convite */}
      <section className="of-slide of-dark" data-title="O convite">
        <div className="of-orbs" aria-hidden="true"><i /><i /></div>
        <div className="of-wrap items-start">
          <p className="of-eyebrow of-reveal" style={d(0)}>12 / O convite</p>
          <h2 className="of-reveal max-w-5xl text-[clamp(3rem,6.6vw,6.6rem)] leading-[.98]" style={d(1)}>Vamos colocar a Fada <em className="shimmer">no mapa?</em></h2>
          <p className="of-lead of-reveal" style={d(2)}>O site está pronto para receber as suas pacientes. Falta só ele ganhar o seu nome, os seus textos finais e o endereço que é seu.</p>
          <div className="of-reveal grid max-w-3xl gap-2 rounded-[22px] border border-gold/40 bg-cream/5 p-6 sm:p-7" style={d(3)}>
            <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-[.22em] text-gold">{live} Primeiro passo · ainda esta semana</p>
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight">Garantir <span className="text-gold">fadadobumbum.com.br</span> no seu nome.</p>
            <p className="text-[15px] text-cream/80">Leva cerca de 10 minutos, custa {brl(pricing.domainYear)} por ano e já protege a marca — mesmo antes de decidirmos o resto.</p>
          </div>
          <div className="of-reveal flex flex-wrap items-center gap-4" style={d(4)}>
            <a href={sellerWhatsapp('Gustavo, quero garantir o domínio fadadobumbum.com.br no meu nome.')} target="_blank" rel="noopener noreferrer" data-sparkle className="inline-flex min-h-14 items-center gap-3 rounded-full bg-gold px-8 text-[13px] font-medium uppercase tracking-[.16em] text-espresso">Garantir o nome ↗</a>
            <a href={sellerWhatsapp('Gustavo, vi a proposta do site da Fada do Bumbum e quero conversar.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border-b border-gold/60 text-[13px] font-medium uppercase tracking-[.16em]">Conversar sobre o site</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border-b border-cream/30 text-[13px] font-medium uppercase tracking-[.16em] text-cream/75">Rever o site</a>
          </div>
          <p className="of-note of-reveal" style={d(5)}>{seller.name} · {seller.role}. Valores válidos por 15 dias a partir de 03/10/2026.</p>
        </div>
      </section>
    </OfferDeck>
    </>
  );
}
