/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': '#003F52',
      'green': '#32C5A3',
      'white-dark': '#F5F9FF',
      'gray-dark': '#7898BA',
      'gray-light': '#DDE5EE',
      'black': '#18232F',
    },
    fontFamily: {
      'sans': ['Ubuntu', 'sans-serif'],
    },
  },
  plugins: [],
}