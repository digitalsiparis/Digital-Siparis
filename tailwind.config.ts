import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      // markaya Ã¶zel renk/typography geniÅŸletmelerini buraya ekleriz
    }
  },
  plugins: [],
} satisfies Config;

