/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        draw: {
          "0%": { transform: "translateY(-400px) translateX(180px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
        popup: {
          "0%,100%": { transform: "scale(1.8)" },
          "50%": { transform: "scale(1)" },
        },
        rotateFront: {
          "0%": { transform: "rotateY(-180deg)" },
          "100%": { transform: "rotateY(0)" },
        },
        rotateCover: {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        draw: "draw 800ms ease-in",
        popup: "popup 780ms ease-in-out infinite",
        rotateFront: "rotateFront 300ms",
        rotateCover: "rotateCover 300ms",
      },
    },
  },
  plugins: [],
};
