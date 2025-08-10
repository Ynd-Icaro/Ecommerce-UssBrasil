/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // USS Brasil Brand Colors - Design System Atualizado
        'uss-blue': {
          DEFAULT: '#034A6E',
          50: '#f0f8fc',
          100: '#e1f0f8',
          200: '#c3e1f1',
          300: '#94cce6',
          400: '#5eb0d7',
          500: '#3996c4',
          600: '#2b7ca6',
          700: '#246585',
          800: '#20556e',
          900: '#034A6E',
          950: '#012A3A'
        },
        'uss-cyan': {
          DEFAULT: '#54C4CF',
          50: '#f0fbfc',
          100: '#cdf3f6',
          200: '#9be8ed',
          300: '#54C4CF',
          400: '#35b0bf',
          500: '#2c939f',
          600: '#277684',
          700: '#25606b',
          800: '#244f58',
          900: '#22424b',
          950: '#122a31'
        },
        'uss-success': {
          DEFAULT: '#16A34A',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16A34A',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        'uss-warning': {
          DEFAULT: '#F97316',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        'uss-error': {
          DEFAULT: '#DC2626',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#DC2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        'uss-gray': {
          DEFAULT: '#4B5563',
          50: '#F5F7FA',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#D1D5DB',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        'uss-dark': '#012A3A',
        'uss-light': '#F5F7FA',
      },
      backgroundImage: {
        'gradient-uss': 'linear-gradient(135deg, #034A6E, #54C4CF)',
        'gradient-uss-primary': 'linear-gradient(135deg, #034A6E, #02415c)',
        'gradient-uss-secondary': 'linear-gradient(135deg, #54C4CF, #35b0bf)',
        'gradient-success': 'linear-gradient(135deg, #16A34A, #22c55e)',
        'gradient-warning': 'linear-gradient(135deg, #F97316, #fb923c)',
        'gradient-error': 'linear-gradient(135deg, #DC2626, #f87171)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
