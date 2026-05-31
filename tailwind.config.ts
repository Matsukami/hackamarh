import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Cerrado Tocantinense
        cerrado: {
          DEFAULT: "#0B3D2E",
          light: "#0D4A37",
          dark: "#082E22",
        },
        mata: {
          DEFAULT: "#1A6B4A",
          light: "#1F7D56",
          dark: "#155A3E",
        },
        buriti: {
          DEFAULT: "#C8E063",
          light: "#D4E87F",
          dark: "#B5CC4E",
        },
        areia: {
          DEFAULT: "#F5F0E8",
          light: "#FAF8F4",
          dark: "#EDE5D8",
        },
        ouro: {
          DEFAULT: "#E8A020",
          light: "#F0B444",
          dark: "#D08E15",
        },
        perigo: {
          bg: "#FDECEA",
          text: "#A32D2D",
          DEFAULT: "#A32D2D",
        },
        ghost: {
          bg: "#EAF3DE",
          text: "#3B6D11",
          DEFAULT: "#3B6D11",
        },
        // Cores neutras do sistema
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        // Design system tipográfico
        hero: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],     // 40px — Sora Bold
        h1: ["1.625rem", { lineHeight: "1.3", fontWeight: "600" }],     // 26px — Sora SemiBold
        h2: ["1.1875rem", { lineHeight: "1.4", fontWeight: "600" }],    // 19px — Sora SemiBold
        body: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],  // 15px — DM Sans Regular
        caption: ["0.6875rem", { lineHeight: "1.4", fontWeight: "600" }], // 11px — DM Sans SemiBold
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      boxShadow: {
        // Flat design — sem sombras. Apenas focus ring.
        "focus-ring": "0 0 0 3px rgba(26, 107, 74, 0.25)",
      },
      spacing: {
        "touch": "44px", // Área mínima de toque (acessibilidade)
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
