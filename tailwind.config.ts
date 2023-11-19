import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c9553e',
          hover: '#A6422E',
          outlinedHover: '#F1D9D4',
          focus: '#7E3223',
        },
        primary2: '#F9F1E7',
        secondary: {
          DEFAULT: '#393939',
          lighter: '#9e9e9e',
          focus: '#CCCCCC',
          darker: '#7a7a7a',
        },
        gray: {
          25: '#e3e3e3',
          50: '#E6E6E6',
          100: '#f8f8f8',
          200: '#B0B0B0',
          300: '#999999',
          400: '#898989',
          500: '#727272',
          600: '#666666',
          700: '#3A3A3A',
          800: '#333333',
        },
        success: {
          DEFAULT: '#e5eee2',
          darker: '#3a5633',
        },
        info: {
          DEFAULT: '#e6e9f9',
          darker: '#3047d0',
        },
        error: '#E97171',
      },
    },
  },
  plugins: [],
};
export default config;
