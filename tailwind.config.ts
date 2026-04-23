import type { Config } from 'tailwindcss';

/**
 * Tailwind config — mirrors tokens.css from DESIGN.md §1–§6.
 * All colors/typography/spacing/shadows pull through CSS variables.
 * Hex values ONLY appear in tokens.css. Do not add raw hex here.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        'ink-muted': 'var(--color-ink-muted)',
        cream: 'var(--color-cream)',
        porcelain: 'var(--color-porcelain)',
        champagne: 'var(--color-champagne)',
        rose: 'var(--color-rose)',
        'rose-deep': 'var(--color-rose-deep)',
        gold: 'var(--color-gold)',
        'gold-deep': 'var(--color-gold-deep)',
        cocoa: 'var(--color-cocoa)',
        berry: 'var(--color-berry)',
        mint: 'var(--color-mint)',

        // Semantic tokens
        'bg-primary':   'var(--bg-primary)',
        'bg-surface':   'var(--bg-surface)',
        'bg-elevated':  'var(--bg-elevated)',
        'bg-inverse':   'var(--bg-inverse)',
        'fg-primary':   'var(--fg-primary)',
        'fg-secondary': 'var(--fg-secondary)',
        'fg-muted':     'var(--fg-muted)',
        'fg-on-dark':   'var(--fg-on-dark)',
        brand:          'var(--brand)',
        accent:         'var(--accent)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Cormorant', 'Playfair Display', 'Georgia', 'serif'],
        body:    ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif:   ['Cormorant Garamond', 'Cormorant', 'Playfair Display', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display:  'var(--text-display)',
        h1:       'var(--text-h1)',
        h2:       'var(--text-h2)',
        h3:       'var(--text-h3)',
        eyebrow:  'var(--text-eyebrow)',
        lead:     'var(--text-lead)',
        price:    'var(--text-price)',
        micro:    'var(--text-micro)',
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter:  '-0.02em',
        tight:    '-0.015em',
        luxe:     '0.22em',
        wide:     '0.18em',
        wider:    '0.12em',
        widest:   '0.28em',
      },
      spacing: {
        '0.5': '0.125rem',
        '1':   'var(--space-1)',
        '2':   'var(--space-2)',
        '3':   'var(--space-3)',
        '4':   'var(--space-4)',
        '5':   'var(--space-5)',
        '6':   'var(--space-6)',
        '7':   'var(--space-7)',
        '8':   'var(--space-8)',
        '9':   'var(--space-9)',
        '10':  'var(--space-10)',
        '11':  'var(--space-11)',
        'section-y': 'var(--section-y)',
        'section-x': 'var(--section-x)',
      },
      borderRadius: {
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl':'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        hair:  'var(--shadow-hair)',
        soft:  'var(--shadow-soft)',
        card:  'var(--shadow-card)',
        float: 'var(--shadow-float)',
        hero:  'var(--shadow-hero)',
      },
      transitionTimingFunction: {
        'out-soft':    'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-luxe': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'liquid':      'cubic-bezier(0.4, 0, 0.2, 1)',
        'overshoot':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        instant: '120ms',
        fast:    '200ms',
        base:    '300ms',
        slow:    '500ms',
        liquid:  '600ms',
        hero:    '900ms',
      },
      maxWidth: {
        prose:  '65ch',
        lead:   '55ch',
      },
      animation: {
        'fade-up':   'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in':   'fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer:     'shimmer 3.2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
