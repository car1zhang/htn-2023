import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif'],
      'title': ['"Playfair Display"', 'serif'],
      'logo': ['"Playfair Display"', 'serif', '700'], 
      'serif': ['Georgia', 'serif']
    }
  },
  plugins: [],
}
export default config
