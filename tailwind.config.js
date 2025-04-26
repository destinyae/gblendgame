/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
        blue: {
          400: '#60A5FA',
          600: '#2563EB',
          900: '#1E3A8A',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};