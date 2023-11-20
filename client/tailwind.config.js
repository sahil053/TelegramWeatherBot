/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#fffafb',
        primaryColor: '#a61119',
        secondaryColor: '#3c0609',
        accent: '#e22f38',
        background: '#250406'
      }
    },
  },
  plugins: [],
}

