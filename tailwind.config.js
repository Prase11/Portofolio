/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        primary: '#3b82f6',
        surface: {
          dark: '#1e293b',
          light: '#ffffff'
        },
        ink: {
          dark: '#f8fafc',
          light: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
