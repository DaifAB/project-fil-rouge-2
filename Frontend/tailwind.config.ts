import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-gray',
    'bg-blue',
    'bg-warning',
    'bg-danger',
    'bg-primary',
    'bg-success',
    'text-gray',
    'text-blue',
    'text-warning',
    'text-danger',
    'text-success',
    'text-primary',
    'bg-opacity-30',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#E2B041',
        secondary: '#4F4F4F',
        warning: '#f5a623',
        danger: '#d0021b',
        success: '#28a745',
        lightgray: '#ECECEC',
        gray: '#4F4F4F',
        'heavy-gray': '#A5A5A5',
        blue: '#2750E3',
      },
      spacing: {
        'header-height': '60px',
        'sidebar-width': '300px',
      },
      fontFamily: {
        // 👇 Add CSS variables
        sans: ['var(--font-opensans)'],
        mono: ['var(--font-ubuntu)'],
      },
    },
  },
  plugins: [],
};
export default config;
