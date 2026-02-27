import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'DM Serif Display'", "serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Custom medical colors
        medical: {
          blue: "oklch(0.42 0.18 250)",
          "blue-dark": "oklch(0.32 0.18 250)",
          "blue-light": "oklch(0.90 0.06 240)",
          teal: "oklch(0.58 0.13 192)",
          "teal-light": "oklch(0.92 0.06 192)",
          green: "oklch(0.55 0.16 150)",
          orange: "oklch(0.72 0.19 55)",
          red: "oklch(0.55 0.22 28)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        teal: "0 8px 32px oklch(0.58 0.13 192 / 0.35)",
        blue: "0 8px 32px oklch(0.42 0.18 250 / 0.3)",
        orange: "0 8px 24px oklch(0.72 0.19 55 / 0.4)",
        card: "0 4px 24px oklch(0.42 0.18 250 / 0.12)",
        "card-hover": "0 12px 40px oklch(0.58 0.13 192 / 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-4deg)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" },
        },
        "pulse-scale": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.2)" },
          "70%": { transform: "scale(1)" },
        },
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "ecg-loop": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "delivery-drive": {
          "0%": { transform: "translateX(-150px)" },
          "100%": { transform: "translateX(calc(100vw + 150px))" },
        },
        "us-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "map-bounce": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "blood-fall": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.8" },
          "100%": { transform: "translateY(80px)", opacity: "0" },
        },
        "tube-sway": {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 4s ease-in-out infinite",
        "float-fast": "float-fast 3s ease-in-out infinite",
        "pulse-scale": "pulse-scale 3s ease-in-out infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
        "slide-in-up": "slide-in-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "ecg-loop": "ecg-loop 4s linear infinite",
        "delivery-drive": "delivery-drive 10s linear infinite",
        "us-pulse": "us-pulse 2s ease-out infinite",
        "map-bounce": "map-bounce 2s ease-in-out infinite",
        "blood-fall": "blood-fall 2.5s ease-in infinite",
        "tube-sway": "tube-sway 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "wiggle": "wiggle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
