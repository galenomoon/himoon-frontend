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
          secondary: '#D9B2C7'
        }
      },
    },
  },
  plugins: [],
}
export default config
