/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  purge: ["index.html", "./src/**/*.jsx"],
  darkMode: false,
  theme: {
    extend: {
      //for gradient hover effect
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }
})
