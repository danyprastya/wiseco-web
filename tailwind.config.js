/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#333333',
        primary: '#1e3a8a',
        'primary-dark': '#1e40af',
        secondary: '#0ea5e9',
        accent: '#D79C60',
        'button-bg': '#2D2D2D',
      },
    },
  },
  plugins: [],
}

