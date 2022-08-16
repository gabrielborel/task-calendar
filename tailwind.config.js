/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0,0,0,0.3)',
        cream: '#feebb8',
        babyblue: '#abdbe3',
        greatorange: '#d9471f',
        gold: '#Ffd600',
        eletricviolet: '#9900ff',
        torchred: '#Ff004c'
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