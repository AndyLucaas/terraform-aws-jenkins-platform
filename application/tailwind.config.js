/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          dark: '#181818',
          card: '#2f2f2f',
          red: '#E50914',
          redHover: '#B9090B',
          gray: '#808080',
          lightGray: '#e5e5e5',
        },
        brand: {
          500: '#E50914',
          600: '#B9090B',
          glow: 'rgba(229, 9, 20, 0.6)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'netflix-hero': 'linear-gradient(77deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
        'netflix-vignette': 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.5) 60%, rgba(20,20,20,1) 100%)',
      },
      boxShadow: {
        'netflix-card': '0 8px 24px rgba(0,0,0,0.7)',
        'netflix-red': '0 0 20px rgba(229, 9, 20, 0.5)',
      }
    },
  },
  plugins: [],
}
