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
          focus: '#CCCCCC',
        },
        gray: {
          50: '#E6E6E6',
          100: '#D8D8D8',
          200: '#B0B0B0',
          300: '#9F9F9F',
          400: '#898989',
          500: '#727272',
          600: '#616161',
          700: '#3A3A3A',
          800: '#333333',
        },
        success: '#2EC1AC',
        error: '#E97171',
      },
    },
  },
  plugins: [],
};
export default config;
