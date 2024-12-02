import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        body: 'Poppins, sans-serif',
      },
      colors: {},
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1240px',
          '2xl': '1400px',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
