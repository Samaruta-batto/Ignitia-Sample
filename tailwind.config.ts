import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
        headline: ['Oswald', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        first: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          },
          "20%": {
            transform: "translate(73px, -1px) rotate(36deg)"
          },
          "40%": {
            transform: "translate(141px, 72px) rotate(72deg)"
          },
          "60%": {
            transform: "translate(83px, 122px) rotate(108deg)"
          },
          "80%": {
            transform: "translate(-40px, 72px) rotate(144deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          }
        },
        second: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          },
          "20%": {
            transform: "translate(-73px, 1px) rotate(-36deg)"
          },
          "40%": {
            transform: "translate(-141px, -72px) rotate(-72deg)"
          },
          "60%": {
            transform: "translate(-83px, -122px) rotate(-108deg)"
          },
          "80%": {
            transform: "translate(40px, -72px) rotate(-144deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          }
        },
        third: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          },
          "20%": {
            transform: "translate(73px, -1px) rotate(36deg)"
          },
          "40%": {
            transform: "translate(141px, 72px) rotate(72deg)"
          },
          "60%": {
            transform: "translate(83px, 122px) rotate(108deg)"
          },
          "80%": {
            transform: "translate(-40px, 72px) rotate(144deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          }
        },
        fourth: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          },
          "20%": {
            transform: "translate(73px, -1px) rotate(36deg)"
          },
          "40%": {
            transform: "translate(141px, 72px) rotate(72deg)"
          },
          "60%": {
            transform: "translate(83px, 122px) rotate(108deg)"
          },
          "80%": {
            transform: "translate(-40px, 72px) rotate(144deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          }
        },
        fifth: {
          "0%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          },
          "20%": {
            transform: "translate(73px, -1px) rotate(36deg)"
          },
          "40%": {
            transform: "translate(141px, 72px) rotate(72deg)"
          },
          "60%": {
            transform: "translate(83px, 122px) rotate(108deg)"
          },
          "80%": {
            transform: "translate(-40px, 72px) rotate(144deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) rotate(0deg)"
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        first: "first 15s linear infinite",
        second: "second 15s linear infinite",
        third: "third 15s linear infinite",
        fourth: "fourth 15s linear infinite",
        fifth: "fifth 15s linear infinite",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
