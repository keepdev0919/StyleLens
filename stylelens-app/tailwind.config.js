/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF4DB8",
        "primary-dark": "#e6359d",
        "accent-pink": "#fff0f9",
        "background-light": "#ffffff",
        "text-main": "#000000",
        "border-pink": "#ffdef2",
      },
      fontFamily: {
        "sans": ["Plus Jakarta Sans", "sans-serif"],
        "serif": ["Playfair Display", "serif"],
        "display": ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
