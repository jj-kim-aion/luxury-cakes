import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm luxury palette
        cream: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f2e8d5',
          300: '#e8d7b5',
          400: '#dcc293',
          500: '#cda971',
        },
        champagne: {
          500: '#c9a66b',
          600: '#b08d4f',
          700: '#8a6d3c',
        },
        bordeaux: {
          500: '#8b2e3f',
          600: '#6f2432',
          700: '#561b27',
          800: '#3c131b',
        },
        noir: {
          900: '#17120e',
          800: '#221a14',
          700: '#2e241c',
          600: '#3d3026',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
      },
      boxShadow: {
        luxe: '0 30px 80px -30px rgba(80, 50, 20, 0.35)',
        'luxe-sm': '0 12px 32px -12px rgba(80, 50, 20, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        shimmer: 'shimmer 3.2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
