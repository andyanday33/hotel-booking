/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "776px",
        md: "985px",
        lg: "1170px",
        // => @media (min-width: 1200px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
