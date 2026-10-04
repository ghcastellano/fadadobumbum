import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import Intro from '@/components/fx/Intro';
import Hero from '@/components/sections/Hero';
import Philosophy from '@/components/sections/Philosophy';
import About from '@/components/sections/About';
import Treatment from '@/components/sections/Treatment';
import Results from '@/components/sections/Results';
import Madrid from '@/components/sections/Madrid';
import Stories from '@/components/sections/Stories';
import Journey from '@/components/sections/Journey';
import Quiz from '@/components/sections/Quiz';
import Clinic from '@/components/sections/Clinic';
import Faq from '@/components/sections/Faq';
import VipBand from '@/components/sections/VipBand';
import { contact, siteUrl } from '@/lib/content';

// Roda antes de pintar a cortina: na 1ª visita da sessão (desktop/tablet) a
// intro aparece e o hero espera por ela; no celular, em visitas seguintes ou
// com movimento reduzido, tudo é imediato (prioridade para o LCP).
const introScript = `try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches||matchMedia('(max-width: 767px)').matches,s=sessionStorage.getItem('fx-intro');if(s||r){document.documentElement.classList.add('intro-seen');window.__fxDelay=0}else{sessionStorage.setItem('fx-intro','1');window.__fxDelay=1.75}}catch(e){window.__fxDelay=0}`;

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'Fada do Bumbum · Dra. Enyla Cerqueira',
    url: siteUrl,
    image: `${siteUrl}/assets/img/enyla-hero-ensaio.webp`,
    telephone: '+55 11 91848-6677',
    sameAs: [contact.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Haddock Lobo, 578, 4º andar, conjunto 42',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01414-000',
      addressCountry: 'BR',
    },
    areaServed: ['São Paulo', 'Jardins', 'Cerqueira César'],
    founder: {
      '@type': 'Person',
      name: 'Enyla Cerqueira',
      jobTitle: 'Biomédica esteta',
      identifier: 'CRBM-SP 69172',
    },
    knowsAbout: ['Harmonização glútea', 'Ácido hialurônico', 'Biomedicina estética'],
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <Intro />
      <a href="#main" className="skip-link">Ir para o conteúdo</a>
      <Header />
      <main id="main">
        <Hero />
        <Philosophy />
        <About />
        <Treatment />
        <Results />
        <Madrid />
        <Stories />
        <Journey />
        <Quiz />
        <Clinic />
        <Faq />
        <VipBand />
      </main>
      <Footer />
      <StickyCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
