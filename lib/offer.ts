// Proposta comercial do site (rota /oferta). Valores e textos num só lugar
// para ajustar a negociação sem mexer no layout dos slides.

export const seller = {
  name: 'Gustavo Castellano',
  role: 'Design & desenvolvimento',
  initials: 'GC',
  // mesmo WhatsApp usado na apresentação do At Gangway
  whatsappDigits: '5511970561448',
};

export function sellerWhatsapp(message: string) {
  return `https://wa.me/${seller.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const brl = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const pricing = {
  setup: 9600,
  installments: 6,
  pixDiscount: 0.05,
  hourly: 130,
  domainYear: 40,
};

export const pixPrice = Math.round(pricing.setup * (1 - pricing.pixDiscount));
export const installmentValue = Math.round(pricing.setup / pricing.installments);

export const market = [
  { tier: 'Template / Wix', range: 'R$ 500 – 2.500', note: '+ mensalidade da plataforma; layout genérico', level: 0.12 },
  { tier: 'Freelancer institucional', range: 'R$ 1.500 – 6.000', note: '5 a 10 páginas, tema pronto, pouca animação', level: 0.3 },
  { tier: 'Estúdio boutique', range: 'R$ 8.000 – 25.000', note: 'design autoral, animações, SEO local', level: 0.62 },
  { tier: 'Agência', range: 'R$ 15.000 – 50.000+', note: 'equipe, gestão, processos longos', level: 1 },
];

export const plans = [
  {
    name: 'Essencial',
    price: 250,
    tagline: 'O site sempre no ar, seguro e atualizado.',
    items: [
      'Hospedagem profissional (Vercel Pro) inclusa',
      'SSL, DNS e renovação do domínio',
      'Monitoramento e atualizações de segurança',
      'Até 1 h/mês de ajustes de texto e foto',
      'Suporte por WhatsApp em até 2 dias úteis',
    ],
  },
  {
    name: 'Evolução',
    price: 550,
    tagline: 'O site cresce junto com a agenda.',
    featured: true,
    items: [
      'Tudo do Essencial',
      'Até 3 h/mês para novas seções e páginas',
      'Novos casos de antes/depois (com TCLE e legendas conferidos)',
      'Relatório mensal: visitas, cliques no WhatsApp, Google',
      'Suporte em 1 dia útil',
    ],
  },
  {
    name: 'Autoridade Local',
    price: 1390,
    tagline: 'Para ser encontrada no Google por quem procura.',
    minimum: 'mínimo de 6 meses',
    items: [
      'Tudo do Evolução, com até 4 h de desenvolvimento',
      'SEO local contínuo e Perfil da Empresa no Google',
      '2 conteúdos educativos por mês, com base científica',
      'Acompanhamento de buscas como “harmonização glútea SP”',
      'Reunião mensal de 30 minutos',
    ],
  },
];
