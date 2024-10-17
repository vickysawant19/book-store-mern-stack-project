/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFCE1A",
        secondary: "#0D0842",
        blackbg: "#F3F3F3",
        favorite: "#FF5841",
      },

      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
