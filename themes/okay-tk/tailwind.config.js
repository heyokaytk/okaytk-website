/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "content/**/*.md", 
    "layouts/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
