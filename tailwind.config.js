/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'azul-oscuro': 'rgb(19, 27, 48)',
        'azul-marino-oscuro': 'rgb(2, 27, 81)',        
        'azul-marino': 'rgb(38, 65, 108)',
        'azul-medio': 'rgb(58, 114, 197)',
        'azul-claro': 'rgb(165, 209, 254)',
        'gris-azulado': 'rgb(213, 225, 240)',        
        'blanco-gris': 'rgb(233, 233, 233)',
        'melocoton': 'rgb(255, 203, 164)',
        'gris-oscuro': 'rgb(5, 15, 45)',
      },
      backgroundImage: {
          'fondo': "url('./src/static/img/FondoPrincipal.jpg')",
          'fondoBusqueda': "url('./src/static/img/FondoBusqueda.jpg')",
          'fondoLocal': "url('./src/static/img/FondoLocal.jpg')",
        },
      fontFamily: {
        'permanentMarker': ['"Permanent Marker"', 'cursive'], // Titulo lugares PaginaPrincipal
        'luckiestGuy': ['"Luckiest Guy"', 'curisve'], // Resto titulos Pagina Principal
        'acme': ['"Acme"', 'sans'], // Resto titulos Pagina Principal
        'rancho': ['"Rancho"', 'cursive'], // Resto titulos Pagina Principal
        'pacifico': ['"Pacifico"', 'cursive'], // Resto titulos Pagina Principal
        'raleway': ['"Raleway"', 'sans'], // Resto titulos Pagina Principal
        'dancingScript': ['"Dacing Script"', 'cursive'], // Resto titulos Pagina Principal
        'roboto': ['"Roboto"', 'sans'], // Resto titulos Pagina Principal
        'fredoka': ['"Fredoka"', 'sans'], // Resto titulos Pagina Principal
      },
    },
    screens: {
      'sm': '300px',
      // => @media (min-width: 640px) { ... }

      'md': '750px',
      // => @media (min-width: 768px) { ... }

      'lg': '1020px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
}
