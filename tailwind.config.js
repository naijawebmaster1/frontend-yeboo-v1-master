/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orangeYellow": "#FFA500",
        "yellow": "#FFD101",
        "primary": "#FCCF14",
        "wine": '#800020',
        "textPrimary": '#949699',
        'charleston': '#696C70',
        "burgundy": " #800020"
      }
    },
  },
  plugins: [],
}
