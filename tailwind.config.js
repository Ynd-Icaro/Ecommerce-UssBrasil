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
      /* === SISTEMA DE CORES PREMIUM === */
      colors: {
        border: "hsl(var(--border))",
        "border-soft": "hsl(var(--border-soft))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          soft: "hsl(var(--background-soft))",
          muted: "hsl(var(--background-muted))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          soft: "hsl(var(--foreground-soft))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
          glass: "var(--surface-glass)",
          border: "hsl(var(--surface-border))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          soft: "hsl(var(--destructive-soft))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          soft: "hsl(var(--success-soft))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          soft: "hsl(var(--warning-soft))",
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
          elevated: "hsl(var(--card-elevated))",
          foreground: "hsl(var(--card-foreground))",
        },
        glass: {
          bg: "var(--glass-bg)",
          "bg-strong": "var(--glass-bg-strong)",
          border: "var(--glass-border)",
        },
      },
      
      /* === TIPOGRAFIA PREMIUM === */
      fontFamily: {
        sans: "var(--font-primary)",
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        mono: "var(--font-mono)",
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.015em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      
      /* === ESPACAMENTO E DIMENSÕES === */
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      
      /* === ANIMAÇÕES PREMIUM === */
      transitionDuration: {
        fast: "var(--animation-fast)",
        normal: "var(--animation-normal)",
        slow: "var(--animation-slow)",
      },
      
      transitionTimingFunction: {
        smooth: "var(--easing-smooth)",
        bounce: "var(--easing-bounce)",
        gentle: "var(--easing-gentle)",
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s var(--easing-smooth) forwards',
        'fade-in-up': 'fadeInUp 0.8s var(--easing-smooth) forwards',
        'fade-in-down': 'fadeInDown 0.8s var(--easing-smooth) forwards',
        'slide-in-left': 'slideInLeft 0.6s var(--easing-smooth) forwards',
        'slide-in-right': 'slideInRight 0.6s var(--easing-smooth) forwards',
        'scale-in': 'scaleIn 0.4s var(--easing-bounce) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 3s ease infinite',
        'bounce-gentle': 'bounce 2s infinite',
      },
      
      /* === SOMBRAS PREMIUM === */
      boxShadow: {
        'card': 'var(--card-shadow)',
        'card-hover': 'var(--card-shadow-hover)',
        'glass': 'var(--glass-shadow)',
        'glass-strong': 'var(--glass-shadow-strong)',
        'navbar': 'var(--navbar-shadow)',
        'navbar-floating': 'var(--navbar-shadow-floating)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(0, 179, 230, 0.3)',
      },
      
      /* === BACKDROP BLUR === */
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
          400: "#839bcf",
          500: "#6482c3",
          600: "#4569b7",
          700: "#2650ab",
          800: "#1e3f85",
          900: "#0f1a3c",
        },
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
