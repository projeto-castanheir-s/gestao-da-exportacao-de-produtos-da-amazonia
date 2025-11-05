/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        menuGreen: {
          DEFAULT: 'var(--menuGreen)',
          light: 'var(--menuGreenLight)',
          dark: 'var(--menuGreenDark)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primaryLight)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accentLight)',
        },
      },
    },
  },
  plugins: [],
};
