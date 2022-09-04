/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "650px",
      sm: "776px",
      md: "970px",
      lg: "1170px",
      xl: "1400px",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
