/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.{html,md}',
    './assets/**/*.{js,css}',
  ],
  theme: {
    extend: {
      colors: {
        shasec: {
          bg: '#05070A',
          'bg-elevated': '#0A0F12',
          'bg-card': '#0B1210',
          'bg-card-hover': '#0F1814',
          'bg-input': '#0C1114',
          surface: '#10181C',
          border: '#1A2A24',
          'border-strong': '#243830',
          muted: '#7A8F86',
          'muted-soft': '#6E867C',
          text: '#E8F0EC',
          'text-bright': '#F5FBF7',
          primary: '#3FC466',
          'primary-dim': '#2FA352',
          'primary-soft': 'rgba(63, 196, 102, 0.12)',
          'primary-glow': 'rgba(63, 196, 102, 0.35)',
          danger: '#FF5C5C',
          warning: '#F0C14A',
          info: '#4DB8FF',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
        display: [
          'Share Tech Mono',
          'JetBrains Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        glow: '0 0 24px rgba(63, 196, 102, 0.25)',
        'glow-sm': '0 0 12px rgba(63, 196, 102, 0.2)',
        card: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        card: '0.75rem',
        btn: '0.5rem',
      },
      maxWidth: {
        site: '72rem',
      },
      backgroundImage: {
        'grid-matrix':
          'radial-gradient(ellipse at 50% 0%, rgba(63,196,102,0.08), transparent 55%), linear-gradient(rgba(63,196,102,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(63,196,102,0.03) 1px, transparent 1px)',
        'hero-fade':
          'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(63,196,102,0.12), transparent 60%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
