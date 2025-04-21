/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        card: '#151A2B',
        accent: '#00E1FF',
        accent2: '#2F80ED',
        text: '#E6EFFF',
        muted: '#8CA3C7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
