/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {

        primary: '#7A9360',
        secondary: '#E2E8D8',
        tertiary: '#000000',

      }
    },
    // fontFamily: {
    //   sans: ['Inter', 'sans-serif'],
    //   mon: ['Montserrat']
    // }
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      mon: ['Montserrat']

    }
  },
  plugins: [],
}

