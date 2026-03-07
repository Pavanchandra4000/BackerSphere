/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00d4aa',
          dark: '#00a886',
          light: '#33ddb8',
        },
        dark: {
          DEFAULT: '#0a0d1a',
          card: '#111827',
          border: '#1f2937',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
