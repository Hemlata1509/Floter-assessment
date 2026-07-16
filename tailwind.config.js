/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12151B",
        paper: "#FAF8F4",
        slate: "#5B6270",
        line: "#E4E0D8",
        plan: {
          DEFAULT: "#3E7C63",
          soft: "#E6EFE9",
          deep: "#26493B",
        },
        design: {
          DEFAULT: "#B5473B",
          soft: "#F5E5E1",
          deep: "#6E2A22",
        },
        implement: {
          DEFAULT: "#33507E",
          soft: "#E4E9F2",
          deep: "#1C2E4C",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.96) translateY(8px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out",
        scaleIn: "scaleIn 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
        slideDown: "slideDown 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-pan": "gradientPan 8s ease infinite",
      },
    },
  },
  plugins: [],
};