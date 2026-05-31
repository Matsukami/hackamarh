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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'cerrado-profundo': '#0B3D2E',
        'mata-alta': '#1A6B4A',
        'buriti-vivo': '#C8E063',
        'areia-jalapao': '#F5F0E8',
        'ouro-tocantins': '#E8A020',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        'focus-ring': '0 0 0 3px rgba(26,107,74,0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
