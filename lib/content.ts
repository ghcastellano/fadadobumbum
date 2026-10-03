// Conteúdo do site. Tudo que é fato (registro, endereço, formação, frases)
// vem do Instagram/bio da Dra. Enyla; o que depende dela está marcado como
// "a confirmar" no relatório de entrega, não aqui.

export const siteUrl = 'https://fadadobumbum.vercel.app';

export const contact = {
  name: 'Dra. Enyla Cerqueira',
  brand: 'Fada do Bumbum',
  role: 'Biomédica esteta',
  // "Especialista" só com título registrado (Res. CFBM 330/2020, art. 11, o):
  // até confirmar que o RS 9243 é registro de especialidade, usamos "foco".
  specialty: 'Foco em harmonização glútea',
  habilitation: 'Habilitação em Biomedicina Estética',
  registry: 'CRBM-SP 69172',
  registryExtra: 'RS 9243',
  whatsappDigits: '5511918486677',
  whatsappLabel: '(11) 91848-6677',
  instagram: 'https://www.instagram.com/dra.enyla.cerqueira/',
  instagramHandle: '@dra.enyla.cerqueira',
  street: 'Rua Haddock Lobo, 578',
  unit: '4º andar · conjunto 42',
  district: 'Cerqueira César',
  city: 'São Paulo · SP',
  cep: '01414-000',
  mapsQuery: 'Rua Haddock Lobo, 578 - Cerqueira César, São Paulo - SP, 01414-000',
};

export const messages = {
  general: 'Oi, Dra. Enyla! Vim pelo site e gostaria de agendar minha avaliação de harmonização glútea ✨',
  hero: 'Oi, Dra. Enyla! Vi o seu site e quero agendar uma avaliação 🍑✨',
  result: 'Oi, Dra. Enyla! Vi o resultado da Dressa no site e quero entender o que dá pra fazer no meu caso ✨',
  madrid: 'Oi, Dra. Enyla! Vi sua formação em Madrid no site e quero agendar uma avaliação ✨',
  fear: 'Oi, Dra. Enyla! Tenho algumas dúvidas (e um pouco de medo 😅) sobre a harmonização glútea. Podemos conversar?',
  vip: 'Oie! Gostaria de entrar no grupo vip',
  location: 'Oi, Dra. Enyla! Quero agendar uma avaliação na clínica da Haddock Lobo ✨',
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;
export const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(contact.mapsQuery)}&navigate=yes`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&z=17&output=embed`;

// Textos obrigatórios em antes/depois (Res. CFBM 330/2020, art. 10, §1º, IV e V).
export const compliance = {
  authorized: 'Divulgação autorizada pelo usuário.',
  noGuarantee: 'Esta imagem não representa, em hipótese alguma, garantia de resultado. Cada ser humano tem características anatômicas e fisiológicas únicas.',
  professional: 'Procedimentos realizados exclusivamente por profissional habilitado.',
};

export const navLinks = [
  { label: 'A Dra.', href: '#sobre', section: 'sobre' },
  { label: 'Harmonização', href: '#harmonizacao', section: 'harmonizacao' },
  { label: 'Resultados', href: '#resultados', section: 'resultados' },
  { label: 'Madrid', href: '#madrid', section: 'madrid' },
  { label: 'A clínica', href: '#clinica', section: 'clinica' },
  { label: 'Dúvidas', href: '#duvidas', section: 'duvidas' },
];

export const marqueeWords = [
  'Harmonização glútea',
  'Ácido hialurônico',
  'Sem PMMA',
  'Contorno',
  'Projeção',
  'Curvinha do S',
  'Volume sutil',
  'Autoestima',
];

export const statement =
  'Não é sobre simplesmente adicionar volume. É entender onde ele faz diferença para o contorno que você busca.';

export const principles = [
  {
    title: 'Escuta antes da agulha',
    text: 'Você não precisa chegar sem dúvidas. Pode perguntar, questionar e contar tudo o que está te deixando insegura — é assim que o planejamento começa.',
  },
  {
    title: 'Pontos estratégicos',
    text: 'O volume vai para onde faz diferença: contorno superior, projeção, depressões laterais. Nada de “mais do mesmo” espalhado.',
  },
  {
    title: 'O formato que já é seu',
    text: 'Respeitar a anatomia e valorizar o que já existe. O objetivo é um bumbum harmônico com o seu corpo — não um molde.',
  },
];

export const procedureFacts = [
  { title: 'Ácido hialurônico', text: 'Substância absorvível pelo organismo, aplicada de forma planejada.' },
  { title: 'Não é PMMA', text: 'Nada de produto definitivo: segurança vem antes de volume.' },
  { title: 'Anestesia local', text: 'Conforto durante o procedimento, feito no consultório.' },
  { title: 'Planejamento individual', text: 'Quantidade e pontos definidos na avaliação, para o seu objetivo.' },
];

export type MapPoint = {
  id: string;
  label: string;
  title: string;
  text: string;
  x: number;
  y: number;
};

// Coordenadas no viewBox 0 0 420 620 do desenho de perfil (ContourMap).
export const mapPoints: MapPoint[] = [
  {
    id: 's',
    label: '01',
    title: 'A curvinha do S',
    text: 'A transição entre a lombar e o glúteo. Quando falta volume na parte superior, o contorno fica “reto”. Desenhar essa região devolve a famosa curvinha do S.',
    x: 186,
    y: 196,
  },
  {
    id: 'proj',
    label: '02',
    title: 'Projeção',
    text: 'O ponto de maior projeção do glúteo. Aqui o planejamento decide quanto — e principalmente onde — um volume sutil faz o bumbum parecer mais empinado.',
    x: 92,
    y: 318,
  },
  {
    id: 'lat',
    label: '03',
    title: 'Depressão lateral',
    text: 'As “covinhas” laterais do quadril, que muitas vezes não mudam só com treino. Suavizá-las deixa a silhueta mais contínua.',
    x: 262,
    y: 352,
  },
  {
    id: 'inf',
    label: '04',
    title: 'Contorno inferior',
    text: 'A transição entre glúteo e coxa. Um contorno bem definido valoriza o formato e equilibra as proporções.',
    x: 166,
    y: 452,
  },
];

export const journey = [
  {
    title: 'Conversa e avaliação',
    text: 'Você conta o que te incomoda e tira todas as dúvidas — inclusive os medos. Medo de agulha, de dor, de exagerar: é muito mais comum do que parece.',
    tag: 'Escuta',
  },
  {
    title: 'Planejamento ponto a ponto',
    text: 'Anatomia, proporções e o resultado que você busca definem onde o volume faz diferença. Cada ponto é pensado para o seu corpo.',
    tag: 'Estratégia',
  },
  {
    title: 'Procedimento',
    text: 'Ácido hialurônico aplicado em pontos estratégicos, com anestesia local, no consultório da Haddock Lobo.',
    tag: 'Cuidado',
  },
  {
    title: 'Acompanhamento',
    text: 'Orientações de cuidados e acompanhamento da evolução, com canal direto para qualquer dúvida no pós.',
    tag: 'Presença',
  },
  {
    title: 'Manutenção',
    text: 'A gente aceita manutenção para quase tudo no autocuidado. Com o procedimento estético é igual: ela é planejada junto com você.',
    tag: 'Constância',
  },
];

export type Story = {
  id: string;
  title: string;
  kicker: string;
  video: string;
  poster: string;
  reel: string;
};

export const stories: Story[] = [
  { id: 'medo', title: 'Tenho medo de fazer', kicker: 'Medo e dor', video: '/assets/stories/medo.mp4', poster: '/assets/stories/medo.jpg', reel: 'https://www.instagram.com/reel/DdPeihShaFe/' },
  { id: 'caso-dressa', title: 'Análise de caso: Dressa', kicker: 'Antes e depois', video: '/assets/stories/caso-dressa.mp4', poster: '/assets/stories/caso-dressa.jpg', reel: 'https://www.instagram.com/reel/DdrzRizxL3S/' },
  { id: 'treino', title: 'Só o treino resolve?', kicker: 'Treino × harmonização', video: '/assets/stories/treino.mp4', poster: '/assets/stories/treino.jpg', reel: 'https://www.instagram.com/reel/DdkE28UBaMN/' },
  { id: 'durabilidade', title: '“Não dura pra sempre”', kicker: 'Manutenção', video: '/assets/stories/durabilidade.mp4', poster: '/assets/stories/durabilidade.jpg', reel: 'https://www.instagram.com/reel/DdFLUnUhQpH/' },
  { id: 'sinal', title: 'Esse é o sinal', kicker: 'Autoestima', video: '/assets/stories/sinal.mp4', poster: '/assets/stories/sinal.jpg', reel: 'https://www.instagram.com/reel/DdXM4IOBhik/' },
  { id: 'praia', title: 'Idealize você na praia', kicker: 'Confiança', video: '/assets/stories/praia.mp4', poster: '/assets/stories/praia.jpg', reel: 'https://www.instagram.com/reel/DdhgGEjBGFS/' },
  { id: 'madrid', title: 'Madrid', kicker: 'Formação', video: '/assets/stories/madrid.mp4', poster: '/assets/stories/madrid.jpg', reel: 'https://www.instagram.com/reel/DdhLBdqsY6O/' },
];

export const faqs = [
  {
    q: 'Harmonização glútea é a mesma coisa que PMMA?',
    a: 'Não. A Dra. Enyla trabalha com ácido hialurônico, uma substância absorvível pelo organismo. PMMA é um produto definitivo e não faz parte dos procedimentos dela.',
  },
  {
    q: 'Dói? Eu tenho muito medo.',
    a: 'Ter medo antes do primeiro procedimento é muito mais comum do que parece. O procedimento é feito com anestesia local e, antes de tudo, existe uma conversa para você entender cada etapa e chegar tranquila.',
  },
  {
    q: 'Quanto tempo dura o resultado?',
    a: 'Não é para sempre — e tudo bem. Assim como unha, cabelo e skincare, o resultado pede manutenção. A durabilidade varia de organismo para organismo e é explicada na avaliação, junto com o plano de manutenção.',
  },
  {
    q: 'Eu treino. A harmonização substitui o treino?',
    a: 'Não substitui: treinar faz diferença. Mas nem tudo que incomoda no formato muda só com exercício — contorno, projeção e algumas depressões dependem da estrutura. A harmonização complementa o que o treino constrói.',
  },
  {
    q: 'Vai ficar exagerado?',
    a: 'O planejamento é feito a partir da sua queixa e da sua anatomia, em pontos estratégicos. A proposta é valorizar o formato que você já tem, com naturalidade.',
  },
  {
    q: 'Quanto custa?',
    a: 'O valor depende do planejamento — principalmente da quantidade de produto e dos pontos tratados. Tudo é apresentado com transparência na avaliação, antes de qualquer decisão.',
  },
  {
    q: 'Onde é o atendimento?',
    a: 'Na Rua Haddock Lobo, 578 — 4º andar, conjunto 42, em Cerqueira César (Jardins), São Paulo. Atendimento com hora marcada pelo WhatsApp.',
  },
  {
    q: 'Quem faz o procedimento?',
    a: 'A própria Dra. Enyla Cerqueira, biomédica esteta (CRBM-SP 69172), do planejamento ao acompanhamento — sem terceirizar nenhuma etapa.',
  },
];

export const quizGoals = [
  'Mais projeção',
  'Contorno superior (curvinha do S)',
  'Suavizar depressões laterais',
  'Melhorar o formato',
  'Um volume sutil',
  'Ainda não sei — quero orientação',
];

export const quizMoods = [
  { id: 'decidida', label: 'Decidida — quero agendar', phrase: 'Já estou decidida e quero agendar' },
  { id: 'pesquisando', label: 'Pesquisando opções', phrase: 'Estou pesquisando e quero entender melhor' },
  { id: 'medo', label: 'Com medo — quero conversar antes', phrase: 'Tenho um pouco de medo e quero conversar antes' },
];
