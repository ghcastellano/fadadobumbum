import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta tirada do próprio Instagram da Dra. Enyla: ripado de madeira,
        // poltronas de veludo terracota, cards creme e detalhes dourados.
        espresso: '#1d1310',
        cacao: '#2e1f19',
        wood: '#6f4130',
        terracotta: '#b06b58',
        rose: '#d9a395',
        blush: '#ecd3c8',
        nude: '#f1e4da',
        cream: '#f7f0e8',
        ivory: '#fbf8f4',
        gold: '#c9a27a',
        // dourado escurecido: único tom de dourado com contraste AA sobre o creme
        'gold-deep': '#83592f',
        ink: '#2a1b15',
        // paleta do espaço físico (Haddock Lobo, 578): frigobar bordô,
        // pendentes de cobre e balcão de quartzito verde
        bordo: '#4a2130',
        copper: '#b8734a',
        jade: '#6f9a8f',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Avenir Next', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Instrument Serif', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        // 16px é o piso de tudo que se lê; overlines usam text-[11px]/[12px].
        sm: ['1rem', { lineHeight: '1.7', letterSpacing: '.01em' }],
        base: ['1.0625rem', { lineHeight: '1.72', letterSpacing: '.01em' }],
        lg: ['1.1875rem', { lineHeight: '1.65', letterSpacing: '.005em' }],
        xl: ['1.375rem', { lineHeight: '1.3' }],
        '2xl': ['1.625rem', { lineHeight: '1.22' }],
        '3xl': ['2rem', { lineHeight: '1.15' }],
        '4xl': ['2.5rem', { lineHeight: '1.1' }],
        '5xl': ['3.25rem', { lineHeight: '1.05' }],
        '6xl': ['4rem', { lineHeight: '1.02' }],
        '7xl': ['5rem', { lineHeight: '1' }],
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
