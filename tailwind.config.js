/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
        poppin: ["Poppins", 'sans-serif']
      },
      lineClamp: {
        7: '7',
      },
    },
  },
  plugins: [],
}

