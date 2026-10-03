import type { Metadata } from 'next';
import Link from 'next/link';
import { contact } from '@/lib/content';

export const metadata: Metadata = { title: 'Política de privacidade' };

export default function Privacidade() {
  return (
    <main className="min-h-[100svh] bg-ivory py-20 text-ink">
      <article className="container-shell max-w-3xl">
        <Link href="/" className="text-[12px] font-medium uppercase tracking-[.2em] text-gold-deep">← Voltar ao site</Link>
        <h1 className="display mt-8 text-[clamp(2.6rem,6vw,4.4rem)] leading-none">Política de privacidade</h1>
        <div className="mt-10 grid gap-6 text-base leading-relaxed text-ink/85">
          <p>Este site pertence a {contact.name} ({contact.role}, {contact.registry}) e foi feito para apresentar o trabalho de harmonização glútea e facilitar o agendamento de avaliações.</p>
          <h2 className="font-display text-3xl">Quais dados coletamos</h2>
          <p>O site não tem formulários que armazenem dados. O “mapa do seu objetivo” monta uma mensagem no seu próprio navegador e a envia ao WhatsApp somente quando você toca no botão. Nada é gravado em servidores deste site.</p>
          <h2 className="font-display text-3xl">Serviços de terceiros</h2>
          <p>Ao abrir o WhatsApp, o Instagram ou o mapa, você passa a usar serviços da Meta e do Google, sujeitos às políticas de privacidade deles. O mapa só é carregado se você tocar para ativá-lo.</p>
          <h2 className="font-display text-3xl">Imagens de pacientes</h2>
          <p>Fotos e vídeos de resultados são publicados apenas com autorização expressa das pacientes, por meio de termo de consentimento, conforme o Código de Ética da Biomedicina e a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
          <h2 className="font-display text-3xl">Seus direitos</h2>
          <p>Você pode pedir informações, correção ou exclusão de dados tratados no atendimento pelo WhatsApp {contact.whatsappLabel}.</p>
        </div>
      </article>
    </main>
  );
}
