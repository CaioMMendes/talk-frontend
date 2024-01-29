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
        "primary-1": "#343e3d",
        "primary-2": "#607466",
        "primary-2-dark": "#516156",
        "primary-3": "#aedcc0",
        "primary-3-dark": "#7f9f8b",
        "primary-4": "#7bd389",
        "primary-5": "#38e4ae",
        "primary-6": "#3f4b3b",
        "primary-7": "#44633f",
        "primary-8": "#5a9367",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
