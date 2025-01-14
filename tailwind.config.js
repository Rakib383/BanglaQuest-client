/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      oswald: "Oswald, serif",
      fresh:"Fresh,serif",
    },
    extend: {},
  },
  plugins: [daisyui],
};
