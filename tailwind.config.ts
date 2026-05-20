import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FAFBF7',
          soft: '#F5F9F6',
          warm: '#E8F0EA',
        },
        brand: {
          start: '#1D9E75',
          mid: '#5DCAA5',
          end: '#378ADD',
          deep: '#185FA5',
        },
        text: {
          primary: '#2C2C2A',
          secondary: '#5F5E5A',
          tertiary: '#888780',
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #1D9E75 0%, #5DCAA5 40%, #378ADD 75%, #185FA5 100%)',
      },
      borderRadius: {
        sm: '8px',
        md: '10px',
        lg: '16px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(29,158,117,0.08)',
        'card-hover': '0 12px 48px rgba(29,158,117,0.15)',
        glow: '0 0 32px rgba(93,202,165,0.35)',
      },
      backdropBlur: {
        glass: '20px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-cjk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
