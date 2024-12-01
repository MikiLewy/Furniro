import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				hover: '#A6422E',
  				outlinedHover: '#F1D9D4',
  				focus: '#7E3223',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			primary2: '#F9F1E7',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				lighter: '#9e9e9e',
  				focus: '#CCCCCC',
  				darker: '#7a7a7a',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			gray: {
  				'25': '#e3e3e3',
  				'50': '#E6E6E6',
  				'100': '#f8f8f8',
  				'200': '#B0B0B0',
  				'300': '#999999',
  				'400': '#898989',
  				'500': '#727272',
  				'600': '#666666',
  				'700': '#3A3A3A',
  				'800': '#333333'
  			},
  			success: {
  				DEFAULT: '#e5eee2',
  				darker: '#3a5633'
  			},
  			info: {
  				DEFAULT: '#e6e9f9',
  				darker: '#3047d0'
  			},
  			error: '#E97171',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
