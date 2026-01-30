import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["var(--font-jetbrains-mono)"],
        baloo: ["var(--font-baloo-2)"],
        jakarta: ["var(--font-plus-jakarta-sans)"],
        outfit: ["var(--font-outfit)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        // === SYNCHRONIZED PRISMATIC SHIMMER ===
        // Used for unified border + title + icon animation
        // Scan line effect: left-to-right with built-in pause
        'shimmer-sync': {
          '0%': { backgroundPosition: '200% center' },
          '18%': { backgroundPosition: '120% center' },
          '37%': { backgroundPosition: '-40% center' },
          '55%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '-200% center' }, // pause panjang
        },

        
      },
      animation: {
        // === SYNCHRONIZED PRISMATIC ===
        // 6s total: ~2.1s scan + ~3.9s pause. Use on ALL synced elements.
        "shimmer-sync": "shimmer-sync 7.3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",

        
      },

    },
    // GRADIENT PRESETS - Premium combinations
    backgroundImage: {
      // === SYNCHRONIZED PRISMATIC GRADIENT ===
      // Teal -> Cyan -> White (shine) -> Purple -> Cyan -> Teal
      // Use with animate-shimmer-sync for unified border/title/icon
      'shimmer-prismatic-sync':
        'linear-gradient(90deg, \
        #0d9488 0%, \
        #14b8a6 15%, \
        #06b6d4 30%, \
        rgba(255,255,255,0.95) 50%, \
        #22d3ee 70%, \
        #38bdf8 85%, \
        #0d9488 100%)',


      

    }
  },
  plugins: [],
} satisfies Config;
