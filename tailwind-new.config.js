/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // USS Brasil Premium Color System
      colors: {
        // Cores institucionais USS Brasil
        'uss-blue': '#034a6e',      // Azul institucional
        'uss-turquoise': '#54c4cf',  // Turquesa/ícone
        'uss-petrol': '#0d1b22',     // Azul petróleo profundo
        'uss-gold': '#d4af37',       // Dourado VIP
        'uss-cyan': '#20b2aa',       // Ciano de realce
        
        // Dark theme calibrado
        'dark-900': '#0f172a',
        'dark-800': '#111827', 
        'dark-700': '#1f2937',
        
        // Light theme calibrado
        'light-50': '#f5f7fa',
        'light-100': '#e5e7eb',
        'light-200': '#d1d5db',
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#034a6e",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#54c4cf",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#20b2aa",
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
      },
      
      // Typography USS Brasil
      fontFamily: {
        'inter': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'sans': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      fontSize: {
        'uss-h1': ['32px', { lineHeight: '1.25', fontWeight: '700' }],
        'uss-h2': ['28px', { lineHeight: '1.25', fontWeight: '600' }], 
        'uss-h3': ['24px', { lineHeight: '1.25', fontWeight: '600' }],
        'uss-body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'uss-micro': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      
      // Spacing USS Brasil
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border Radius
      borderRadius: {
        'uss': '16px',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // Shadows suaves
      boxShadow: {
        'uss-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'uss-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'uss-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'uss-hover': '0 8px 25px -8px rgb(0 0 0 / 0.2)',
      },
      
      // Animations USS Brasil
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      // Grid responsivo USS Brasil
      gridTemplateColumns: {
        'products-xs': 'repeat(1, 1fr)',
        'products-sm': 'repeat(2, 1fr)', 
        'products-md': 'repeat(3, 1fr)',
        'products-lg': 'repeat(4, 1fr)',
        'products-xl': 'repeat(5, 1fr)',
      },
      
      // Backdrop blur
      backdropBlur: {
        'navbar': '12px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
