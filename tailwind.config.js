/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#ededed',
          200: '#d8d8d8',
          300: '#b3b3b3',
          400: '#8a8a8a',
          500: '#5c5c5c',
          600: '#2d2d2d',
          700: '#1f1f1f',
          800: '#121212',
          900: '#090909',
        },
        accent: '#ffffff',
        success: '#16a34a',
        warning: '#facc15',
        charcoal: '#0f0f0f',
      },
      boxShadow: {
        card: '0 20px 50px -20px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};

