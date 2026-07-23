import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class', ''],
  theme: {
    extend: {
      colors: {
        beadLoop: {
          light05: '#F8F8F8',
          light20: '#F3F7FF',
          light50: '#EAEFFD',
          light70: '#DFE8FF',
          blueLight: '#C6D7ED',
          rose: '#EF86E7',
          lilac05: '#a287e4',
          lilac: '#967BD7',
          purple: '#211581',
          alert: '#FF0202',
          dark: '#0F0732',
          dark20: '#181427',
          black: '#1E1E1E',
          gray: '#5E5E71',
          gray20: '#2C2C3C',
          green: '#6DC861'
        },
        accent: {
          '50': '#FFEDFC',
          '100': '#F9E2F5',
          '200': '#F1D8ED',
          '300': '#E3B7DC',
          '400': '#F0ABDF',
          '500': '#E67ECC',
          '600': '#DE5ABD',
          '700': '#D83EB2',
          '800': '#BF2298',
          '900': '#960C77'
        },
        secondary: {
          '50': '#efedfc',
          '100': '#dad7f3',
          '200': '#b2aaea',
          '300': '#887be2',
          '400': '#6554da',
          '500': '#4f3bd6',
          '600': '#442ed5',
          '700': '#3722bd',
          '800': '#2f1ea9',
          '900': '#261895',
          '950': '#211581'
        },
        support: {
          '50': '#fefefe',
          '100': '#fafafa',
          '200': '#F0EFEF',
          '300': '#9a9a9a',
          '400': '#8b8b8b',
          '500': '#848484',
          '600': '#717171',
          '700': '#656565',
          '800': '#575757',
          '900': '#1e1e1e',
          '950': '#000000'
        }
      }
    }
  },
  plugins: []
} satisfies Config
