/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)", // ✅ 追加
        "primary-foreground": "var(--primary-foreground)", // ✅ 追加
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
      },
    },
  },
  plugins: [],
}