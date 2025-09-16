/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#7A9360',
        secondary: '#E2E8D8',
        tertiary: '#000000',
        brandDark: '#4D5E3B',
      }
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      seasons: ['"Crimson Text"', '"Libre Baskerville"', '"Playfair Display"', 'serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      serif: ['"Playfair Display"', 'Georgia', 'serif']
    }
  },
  plugins: [],
}

