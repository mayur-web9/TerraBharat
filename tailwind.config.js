/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        offwhite: '#fafaf9',
        forest: {
          50: '#f0f7f4',
          100: '#dceee6',
          200: '#b9dccf',
          300: '#8ec4af',
          400: '#62a58c',
          500: '#438871',
          600: '#316d5a',
          700: '#285849',
          800: '#22463c',
          900: '#1B4332',
        },
        saffron: {
          50: '#fef8f0',
          100: '#fdefd9',
          200: '#fbdcb2',
          300: '#f8c381',
          400: '#F4A261',
          500: '#ef7e32',
          600: '#df5f1d',
          700: '#b94618',
          800: '#93391a',
          900: '#763118',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
