/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manga: {
          gold: '#facc15',
          cyan: '#22d3ee',
          red: '#ef4444',
          dark: '#020617'
        }
      }
    },
  },
  plugins: [],
}
