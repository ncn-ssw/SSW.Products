/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./app/*",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
