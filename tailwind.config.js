/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ['"Noto Sans"', 'sans-serif'],
        Geologica: ['"Geologica"', 'sans-serif'],
        DMSans: ['"DM Sans"', 'sans-serif'],
        SpaceGrotesk: ['"Space Grotesk"', 'sans-serif'],
        KumbhSans: ['"Kumbh Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}