/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "bg-dark": "#0f172a",
        "card-dark": "#1e293b",
      }
    },
  },
  plugins: [],
}
