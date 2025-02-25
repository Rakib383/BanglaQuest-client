/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      oswald: "Oswald, serif",
      fresh: "Fresh,serif",
    },
    extend: {
      colors: {
        PrimaryColor: "#FFB116",
        SecondaryColor: "#59815B",
        ThirdColor: "#0F1325",
      },
    },
  },
  plugins: [daisyui],
};
