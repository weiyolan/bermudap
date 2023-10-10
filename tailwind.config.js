const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/atoms/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bel: ["var(--font-bel)", ...fontFamily.sans],
        raj: ["var(--font-raj)", ...fontFamily.sans],
        // pop: ['var(--font-poppins)', ...fontFamily.sans],
        // lora: ['var(--font-lora)', ...fontFamily.serif],
        // work: ['var(--font-workSans)', ...fontFamily.sans],
      },
      letterSpacing: {
        max: ".25em",
      },
      screens: {
        xs: "480px",
        mobl: "420px",
        mobm: "350px",
      },
      colors: {
        white: "#FFFFFF",
        white2: "#FFF9F2",
        brown: "#BD9159",
        browndark: "#6E4221",
        brownlight: "#A8947F",
        green: "#667D61",
        light: "#E3E1D9",
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
      },
      backgroundImage: {
        blackWhite: "linear-gradient(to right, black 50%, #FFF5EA 50%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "top-xl":
          "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
        "top-2xl": "0 -25px 50px -12px rgb(0 0 0 / 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "inner-3xl": "inset 0 0px 50px 10px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        outlinePulse: {
          "50%": { "outline-color": "rgba(255,255,255,0.05)" },
        },
        borderPulse: {
          "50%": { "border-color": "rgba(255,255,255,0.05)" },
        },
      },
    },
    animation: {
      wiggle: "wiggle 1s ease infinite",
      outlinePulse: "outlinePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      borderPulse: "borderPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    variants: {
      animation: ["motion-safe"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
