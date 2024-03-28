/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {}
  },
  plugins: []
}
