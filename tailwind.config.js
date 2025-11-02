/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: "#FFFFFF",
        sec: "#000000",
        tri: "#918578 ",
        light: "#F7E7CE",
        acc: "#DDA9B8",
        acc1: "#C59A9C",
        pale: "#FCFBEE",
        frth: "#CDE2CA",
        gray: "#DADADA",
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.2s ease-in forwards',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
        'lobster': ['Lobster', 'cursive'],
        'dm-serif-display': ['DM Serif Display', 'serif'],
        'gravitas-one': ['Gravitas One', 'cursive'],
        'kranky': ['Kranky', 'cursive'],
        'pt-serif': ['PT Serif', 'serif'],
        'savate': ['Savate', 'sans-serif'],
        'vast-shadow': ['Vast Shadow', 'cursive'],
        // New fonts
        'montserrat': ['Montserrat', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'libre-baskerville': ['Libre Baskerville', 'serif'],
        'archivo-extra': ['Archivo Extra Condensed', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.img-no-right-click': {
          'pointer-events': 'none',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          '-khtml-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}