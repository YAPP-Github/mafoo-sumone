import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      ggbatang: ["ggbatang", "sans-serif"],
    },
    colors: {
      pink: "#FF9092",
      brown: "#C5B698",
      pastelpink: "#FFDCD2",
      pastelblue: "#FFDCD2",
      pastelpurple: "#EADAFF",
      pastelyellow: "#F3D78B",
      pastelbeige: "#FBF3EE",
      white: "#ffffff",
      gray: {
        "100": "#F0F2F4",
        "300": "#CBD0D6",
        "500": "#7F8A96",
        "600": "#606A78",
        "700": "#444E5C",
        "800": "#2D3541",
      },
    },
  },
  plugins: [],
} satisfies Config;
