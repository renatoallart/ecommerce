/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "2.75rem  min(1fr) 44px",
      },
    },
  },

  plugins: [
    require("tailwindcss-debug-screens"),
    // ...
  ],
};
