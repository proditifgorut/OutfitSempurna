/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mood-romantic': '#FFF1F2', // pink-50
        'mood-casual': '#F0F9FF',   // sky-50
        'mood-confident': '#FEFCE8',// yellow-50
        'mood-cheerful': '#FFF7ED', // orange-50
        'mood-calm': '#F0FDF4',     // green-50
      },
      fontFamily: {
        'sans': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
