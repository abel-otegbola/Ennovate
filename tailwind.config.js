/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#5938DD',
        'green': '#18DD96',
        'black': '#101016',
      },
      animation: {
        'zoom-in': 'zoom 0.7s ease-in-out'
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(0.1, 0.1)' },
          '100%': { transform: 'scale(1, 1)' }
        }
      }
    },
  },
  plugins: [],
}
