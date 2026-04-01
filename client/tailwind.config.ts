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
        background: "hsl(210, 40%, 98%)", // Light Slate-50
        foreground: "hsl(222, 47%, 11%)", // Deep Navy Text
        primary: {
          DEFAULT: "hsl(217, 91%, 60%)", // Light Navy Blue (Vibrant)
          foreground: "hsl(210, 40%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(215, 25% , 27%)", // Professional Navy (Sub-headers)
          foreground: "hsl(210, 40%, 98%)",
        },
        accent: {
          DEFAULT: "hsl(199, 89%, 48%)", // Cerulean/Cyan Accent
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(214, 32%, 91%)",
          foreground: "hsl(215, 16%, 47%)",
        },
        border: "hsl(214, 32%, 91%)", // Clean silver borders
        panel: "rgba(255, 255, 255, 0.98)",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
