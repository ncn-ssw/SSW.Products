/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./tina/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1.5rem",
        "2xl": "10rem",
      },
    },
    extend: {
      width: {
        "offset-8": "calc(100vw - 2rem)",
      },
      maxWidth: {
        "offset-container-8": "calc(100% - 2rem)",
        "offset-16": "calc(100vw - 4rem)",
      },
      maxHeight: {
        "offset-64": "calc(100vh - 20rem)",
      },
      backgroundImage: {
        "pink-gradient": "linear-gradient(to right, #CC4141,#d699fb,#ff778e)",
        "gray-gradient": "linear-gradient(to right, #141414,#1f1f1f,#2b2a2a)",
        "black-gradient": "linear-gradient(to right, #0e0e0e,#131313,#141414)",
      },
      screens: {
        small: "43.75rem",
        medium: "75rem",
      },
      spacing: {
        37: "9.25rem",
        navBarHeight: "6rem",
        "navBarHeight-mobile": "9.5rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        ssw: {
          red: "#CC4141",
          charcoal: "#333333",
        },
        gray: {
          darkest: "#131313",
          dark: "#1F1F1F",
          neutral: "#333333",
          lighter: "#363636",
          light: "#727272",
        },
        primaryFrom: "#FF9D3F",
        primaryVia: "#F46772",
        primaryTo: "#AF33E4",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        shine: "shine var(--duration, 14s) linear infinite",
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    function ({ addComponents }) {
      addComponents({
        // Variant styles
        ".solidRed": {
          backgroundColor: "#CC4141",
          color: "#FFFFFF",
        },
        ".solidWhite": {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          border: "1px solid #000000",
        },
        ".outlinedWhite": {
          color: "#FFFFFF",
          border: "1px solid #FFFFFF",
        },
        ".shinyRed": {
          backgroundColor: "#CC4141",
          color: "#FFFFFF",
          border: "1px solid #FFFFFF",
        },
        ".charcoalNoBorder": {
          backgroundColor: "#333333",
          color: "#FFFFFF",
          border: "none",
        },
        ".charcoalWithBorder": {
          backgroundColor: "#333333",
          color: "#FFFFFF",
          border: "1px solid #FFFFFF",
        },
        // Size styles
        ".small": {
          padding: "0.25rem 0.5rem",
          fontSize: "0.875rem",
        },
        ".medium": {
          padding: "0.5rem 1rem",
          fontSize: "1rem",
        },
        ".large": {
          padding: "0.75rem 1.5rem",
          fontSize: "1.125rem",
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};
