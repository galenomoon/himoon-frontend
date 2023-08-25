import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
    },
    extend: {
      colors: {
        typography: {
          primary: '#8B46A2',
          secondary: '#FFFFFF',
        },
        background: {
          primary: '#FBF8C9',
          secondary: '#D9B2C7',
          light: '#EFEAFF'
        }
      }, keyframes: {
        "fade-in": {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' },
        },
        "slide-in": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
        "slide-in": "slide-in 0.8s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
      }
    },
  },
  plugins: [],
}
export default config
