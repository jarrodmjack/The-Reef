/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './views/*.ejs',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["aqua"],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  
}
