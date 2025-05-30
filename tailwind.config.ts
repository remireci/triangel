import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'sm': '300px',
      'md': '665px',
      'lg': '1366px',
      'md-custom': '667px', 
      'lg-custom': '1023px', 
    }
  },
  // disable hover styles for touch screens
  future: {
    hoverOnlyWhenSupported: true
  },

  plugins: [],

}
export default config
