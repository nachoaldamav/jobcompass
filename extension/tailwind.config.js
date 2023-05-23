/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        swing: 'swing 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
