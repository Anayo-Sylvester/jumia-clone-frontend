/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'min-947': '947px',
        'min-847':'847px',
        'min-768':'768px',
      },
      colors: {
        orange: {
          DEFAULT: '#F68B1E',
          dark: '#E6821C',
        },
        gray: {
          DEFAULT: "#F1F1F2",
        }
      }
    },
  },
  plugins: [],
};
