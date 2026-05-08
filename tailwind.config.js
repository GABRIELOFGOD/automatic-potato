/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0A0F2E",
        surface: "#111827",
        accent: "#00D4FF",
        "accent-dim": "#0099BB",
        "text-primary": "#F0F4FF",
        "text-secondary": "#6B7280",
        "text-muted": "#3D4A6B",
        high: "#EF4444",
        medium: "#F59E0B",
        low: "#10B981",
        card: "#1C2337"
      }
    }
  },
  plugins: []
};
