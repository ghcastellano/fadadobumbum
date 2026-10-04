'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import Reveal from '../ui/Reveal';
import WhatsIcon from '../ui/WhatsIcon';
import { quizGoals, quizMoods, whatsappUrl } from '@/lib/content';

export default function Quiz() {
  const [goals, setGoals] = useState<string[]>([]);
  const [mood, setMood] = useState<string>('');
  const [name, setName] = useState('');

  const message = useMemo(() => {
    const first = name.trim().split(' ')[0];
    const hello = first ? `Oi, Dra. Enyla! Sou a ${first}.` : 'Oi, Dra. Enyla!';
    const goalText = goals.length ? goals.map((g) => g.toLowerCase()).join(', ') : 'ainda estou entendendo o meu objetivo';
    const moodPhrase = quizMoods.find((m) => m.id === mood)?.phrase;
    return `${hello} Fiz o mapa do meu objetivo no site ✨\n\nO que mais me incomoda: ${goalText}.${moodPhrase ? `\n${moodPhrase}.` : ''}\n\nGostaria de agendar uma avaliação 🍑`;
  }, [goals, mood, name]);

  const toggle = (goal: string) => setGoals((list) => (list.includes(goal) ? list.filter((g) => g !== goal) : [...list, goal]));
  const ready = goals.length > 0 && mood;

  return (
    <section id="avaliacao" aria-labelledby="avaliacao-titulo" className="relative overflow-hidden bg-blush py-24 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(251,248,244,.7),transparent_65%)]" />
      <div className="container-shell relative grid gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow text-gold-deep">Mapa do seu objetivo</p></Reveal>
          <Reveal delay={.06}>
            <h2 id="avaliacao-titulo" className="display mt-6 text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.03]">Conte o que te incomoda. <em className="text-rosedeep">A mensagem sai pronta.</em></h2>
          </Reveal>

          <Reveal delay={.1}>
            <fieldset className="mt-10">
              <legend className="text-[11px] font-medium uppercase tracking-[.22em] text-ink/75">1 · O que mais te incomoda hoje? <span className="normal-case tracking-normal text-ink/60">(pode marcar mais de um)</span></legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {quizGoals.map((goal) => {
                  const on = goals.includes(goal);
                  return (
                    <button key={goal} type="button" aria-pressed={on} onClick={() => toggle(goal)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[15px] transition-all duration-300 ${on ? 'border-rosedeep bg-rosedeep text-ivory shadow-[0_8px_24px_rgba(158,90,102,.3)]' : 'border-ink/20 bg-ivory/60 text-ink hover:border-rosedeep'}`}>
                      {on && <Check className="h-4 w-4" />} {goal}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={.12}>
            <fieldset className="mt-9">
              <legend className="text-[11px] font-medium uppercase tracking-[.22em] text-ink/75">2 · Como você se sente sobre o procedimento?</legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {quizMoods.map((m) => (
                  <button key={m.id} type="button" aria-pressed={mood === m.id} onClick={() => setMood(m.id)} className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-[15px] leading-snug transition-all duration-300 ${mood === m.id ? 'border-ink bg-ink text-cream' : 'border-ink/20 bg-ivory/60 hover:border-ink'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={.14}>
            <label className="mt-9 block max-w-sm">
              <span className="text-[11px] font-medium uppercase tracking-[.22em] text-ink/75">3 · Seu primeiro nome <span className="normal-case tracking-normal text-ink/60">(opcional)</span></span>
              <input value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} autoComplete="given-name" placeholder="Como você gosta de ser chamada" className="mt-3 h-12 w-full rounded-full border border-ink/20 bg-ivory/70 px-5 text-base outline-none transition-colors placeholder:text-ink/45 focus:border-rosedeep" />
            </label>
          </Reveal>
        </div>

        <Reveal delay={.1} className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+40px)]">
          <div className="overflow-hidden rounded-[28px] bg-[#efe6dc] shadow-[0_30px_80px_rgba(42,27,21,.18)] ring-1 ring-ink/5">
            <div className="flex items-center gap-3 bg-[#2b1d17] px-5 py-4 text-cream">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso ring-1 ring-gold/50"><img src="/assets/brand/monograma.png" alt="" className="h-6 w-auto" /></span>
              <span className="leading-tight">
                <span className="block text-sm font-medium">Dra. Enyla Cerqueira</span>
                <span className="block text-[12px] text-cream/65">Agendamentos · WhatsApp</span>
              </span>
            </div>
            <div className="min-h-[300px] bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,122,.12),transparent_40%)] p-5">
              <p className="mx-auto w-fit rounded-full bg-ivory/80 px-3 py-1 text-[11px] uppercase tracking-[.16em] text-ink/60">Prévia da sua mensagem</p>
              <AnimatePresence mode="popLayout">
                <motion.div key={message} initial={{ opacity: 0, y: 10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .3 }} className="relative ml-auto mt-5 max-w-[92%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#e3f3d8] px-4 py-3 text-[15px] leading-relaxed text-[#1f2a1a] shadow-sm">
                  {message}
                  <span className="mt-1 block text-right text-[11px] text-[#1f2a1a]/55">agora ✓✓</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="border-t border-ink/10 bg-ivory p-5">
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                data-sparkle
                aria-disabled={!ready}
                className={`flex min-h-14 items-center justify-center gap-3 rounded-full px-6 text-sm font-medium uppercase tracking-[.14em] transition-all duration-300 ${ready ? 'bg-[#1f9d55] text-white shadow-[0_14px_34px_rgba(31,157,85,.35)] hover:bg-[#178a49]' : 'bg-ink/80 text-cream hover:bg-ink'}`}
              >
                <WhatsIcon /> {ready ? 'Enviar no WhatsApp' : 'Enviar mesmo assim'} <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-[12px] text-ink/60">Nada fica salvo aqui: a mensagem vai direto para o WhatsApp da Dra.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
