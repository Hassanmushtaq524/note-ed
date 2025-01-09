/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}", 
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ], 
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'primary': "#931939",
        'black': "#1D1D1D",
        'dark-gray': '#9E9D9E',
        'light-gray': '#9E9D9E',
      },
      fontFamily: {
        'black': ['Montserrat-Black', 'Helvetica'],
        'regular': ['Montserrat-Regular', 'Helvetica'],
        'medium': ['Montserrat-Medium', 'Helvetica']
      }
    }
  },
  plugins: [],
}

