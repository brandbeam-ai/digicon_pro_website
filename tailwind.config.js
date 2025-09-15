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
        'pink-accent': '#ec4899',
        'pink-light': '#f9a8d4',
        'pink-dark': '#be185d'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'pink-accent': '#ec4899',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'pink-accent': '#ec4899',
      }),
    },
  },
  safelist: [
    'bg-pink-accent',
    'text-pink-accent',
  ],
  plugins: [],
}
