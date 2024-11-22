/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius)'
      },
      colors: {
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
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
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
        },
        // Bitcredit Design System colors
        divider: {
          50: '#ECE8DE',
					75: '#D9D5CC',
          100: '#D1CCC1',
          200: '#BAB4A9',
          300: '#A39D91',
        },
        elevation: {
          50: '#FEFBF1',
          100: '#FAF7EF',
          200: '#F6F2E7',
          300: '#D1CCC1',
        },
        text: {
          50: '#D6D2CA',
          100: '#C5C1B9',
          200: '#8D8579',
          300: '#1B0F00',
        },
        signal: {
          success: '#006F29',
          alert: '#AE5F00',
          error: '#A32B16',
        },
        brand: {
          50: '#FFF2E2',
          100: '#FBDBB0',
          200: '#F7931A',
        },
        base: {
          hover: '#331C00',
          active: '#000000',
        },
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
