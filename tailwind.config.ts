import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        birch: {
          light:   "#EED9B1",
          DEFAULT: "#E3C899",
          shadow:  "#D2B48C",
          deep:    "#B8956A",
        },
        pine: {
          50:  "#E8EFDF",
          100: "#C9D8B4",
          300: "#7A9A5A",
          500: "#4C7438",
          600: "#395B28",
          DEFAULT: "#2D4F1E",
          700: "#223D16",
          900: "#12210B",
        },
        mahogany: {
          300: "#8A5754",
          500: "#6A3C39",
          DEFAULT: "#4A2C2A",
          700: "#3A2120",
          900: "#1F110F",
        },
        lantern: {
          soft:    "#FFD89A",
          DEFAULT: "#FFB347",
          hot:     "#F59324",
          ember:   "#C86A10",
        },
        bark: {
          50:  "#F6EAD1",
          100: "#E9D3A8",
          300: "#B8956A",
          500: "#8C6A44",
          700: "#5A4229",
          900: "#2E1F13",
        },
        parchment: {
          DEFAULT: "#EFE6CC",
          dim:     "#E2D4A9",
          cool:    "#E3DCC4",
          edge:    "#C9BC95",
        },
        blueprint: {
          ink: "#2E4A5C",
          dim: "#6B8B96",
        },
        moss: {
          0: "#E5DEC2",
          1: "#B5C99A",
          2: "#7FA876",
          3: "#4F7E4F",
          4: "#2F5735",
        },
        sage: {
          DEFAULT: "#8AA581",
          dim:     "#6F8B6A",
        },
        terracotta: {
          DEFAULT: "#C17B5E",
          dim:     "#A86A4F",
          hot:     "#D9854A",
        },
        moon: {
          navy:   "#1B2A3A",
          deep:   "#0F1824",
          dusk:   "#2B3B47",
          silver: "#CBD5D1",
          glow:   "#E2E8DF",
        },
      },

      fontFamily: {
        sans:  ["var(--font-inter)",     "ui-sans-serif", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["var(--font-fraunces)",  "ui-serif", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },

      backgroundImage: {
        "birch-grain": [
          "repeating-linear-gradient(90deg, rgba(139,94,52,0.06) 0px, rgba(139,94,52,0.06) 1px, transparent 1px, transparent 6px)",
          "repeating-linear-gradient(90deg, rgba(74,44,42,0.05) 0px, rgba(74,44,42,0.05) 2px, transparent 2px, transparent 37px)",
          "linear-gradient(180deg, #EED9B1 0%, #E3C899 45%, #D2B48C 100%)",
        ].join(", "),

        "lantern-glow":
          "radial-gradient(ellipse at center, rgba(255,179,71,0.55) 0%, rgba(255,179,71,0.18) 35%, rgba(255,179,71,0) 70%)",

        "knot-radial":
          "radial-gradient(ellipse at 30% 20%, rgba(74,44,42,0.18) 0%, rgba(74,44,42,0) 55%)",

        "blueprint-grid": [
          "linear-gradient(to right,  rgba(58,33,32,0.10) 1px, transparent 1px)",
          "linear-gradient(to bottom, rgba(58,33,32,0.10) 1px, transparent 1px)",
        ].join(", "),
      },

      backgroundSize: {
        blueprint: "24px 24px",
      },

      boxShadow: {
        lantern:
          "0 0 0 1px rgba(255,179,71,0.35), 0 8px 24px -6px rgba(255,179,71,0.55), 0 0 48px rgba(255,179,71,0.25)",
        carved:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 4px rgba(74,44,42,0.25)",
        plank:
          "0 1px 0 rgba(255,255,255,0.4) inset, 0 10px 20px -12px rgba(46,31,19,0.45)",
      },

      dropShadow: {
        lantern: "0 0 14px rgba(255,179,71,0.65)",
      },

      borderRadius: {
        plank: "14px",
      },

      letterSpacing: {
        carved: "0.08em",
      },

      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1",    filter: "drop-shadow(0 0 10px rgba(255,179,71,0.55))" },
          "45%":      { opacity: "0.94", filter: "drop-shadow(0 0 14px rgba(255,179,71,0.75))" },
          "70%":      { opacity: "0.9",  filter: "drop-shadow(0 0 8px  rgba(255,179,71,0.45))" },
        },
        sway: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-3px)" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        sway:    "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
