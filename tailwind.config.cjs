/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Gamefont: ['"Press Start 2P"', "cursive"]
      }
    },
  },
  plugins: [],
}
