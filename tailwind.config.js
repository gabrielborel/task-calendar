/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0,0,0,0.3)'
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif']
      },
      screens: {
        'custom': '900px'
      }
    },
  },
  plugins: [],
}