import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Cursor from '@/components/fx/Cursor';
import FairyDust from '@/components/fx/FairyDust';
import SmoothScroll from '@/components/fx/SmoothScroll';
import { siteUrl } from '@/lib/content';
import './globals.css';

// Instrument Serif: serifa condensada de alto contraste, a mesma família
// visual dos cards do Instagram dela (títulos com palavra-chave em itálico).
const display = localFont({
  src: [
    { path: './fonts/instrument-serif.woff2', style: 'normal', weight: '400' },
    { path: './fonts/instrument-serif-italic.woff2', style: 'italic', weight: '400' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const sans = localFont({
  src: './fonts/jost-var.woff2',
  variable: '--font-sans',
  weight: '300 600',
  display: 'swap',
});

const script = localFont({
  src: './fonts/great-vibes.woff2',
  variable: '--font-script',
  weight: '400',
  display: 'swap',
});

const description =
  'Dra. Enyla Cerqueira, a Fada do Bumbum: biomédica esteta com foco em harmonização glútea com ácido hialurônico, sem PMMA, planejada ponto a ponto. Pós-graduação internacional em Madrid. Rua Haddock Lobo, 578 — Jardins, São Paulo.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fada do Bumbum · Dra. Enyla Cerqueira — Harmonização glútea em São Paulo',
    template: '%s · Fada do Bumbum',
  },
  description,
  // Demonstração em aprovação: fora dos buscadores até a venda fechar.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Fada do Bumbum · Dra. Enyla Cerqueira',
    description: 'Harmonização glútea com ácido hialurônico, planejada ponto a ponto. Jardins, São Paulo.',
    url: siteUrl,
    siteName: 'Fada do Bumbum',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Fada do Bumbum — Dra. Enyla Cerqueira' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#1d1310',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <FairyDust />
        <Cursor />
      </body>
    </html>
  );
}
