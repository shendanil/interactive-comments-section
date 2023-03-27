/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 2rem rgba(0 0 0 / .25)',
      }
    },
    screens: {
      'sm': {'min': '0px', 'max': '576px'},
      'md': {'min': '768px', 'max': '991px'},
      'lg': {'min': '992px', 'max': '1199px'},
      'xl': {'min': '1200px'},
      'other': {'min': '576px'},
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
