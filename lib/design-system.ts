// Design System - Uss Brasil
// Cores, espaçamentos, tipografia e componentes padronizados

export const designSystem = {
  colors: {
    primary: {
      50: '#f0fdff',
      100: '#ccf7fe', 
      200: '#99eefd',
      300: '#66e5fc',
      400: '#22d3ee', // Cor principal #00CED1
      500: '#00CED1',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  
  spacing: {
    xs: '0.5rem',     // 8px
    sm: '0.75rem',    // 12px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },
  
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  
  typography: {
    fontFamily: 'font-sans',
    sizes: {
      xs: 'text-xs',      // 12px
      sm: 'text-sm',      // 14px
      base: 'text-base',  // 16px
      lg: 'text-lg',      // 18px
      xl: 'text-xl',      // 20px
      '2xl': 'text-2xl',  // 24px
      '3xl': 'text-3xl',  // 30px
      '4xl': 'text-4xl',  // 36px
    },
    weights: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    }
  },
  
  glassmorphism: {
    light: 'bg-white/70 backdrop-blur-xl border border-white/20',
    dark: 'bg-gray-900/70 backdrop-blur-xl border border-gray-800/20',
    card: 'bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20',
  },
  
  animations: {
    transition: 'transition-all duration-300 ease-in-out',
    hover: 'hover:scale-105 transition-transform duration-200',
    button: 'hover:shadow-lg transition-all duration-200',
  }
}

// Utilitários para aplicar o design system
export const applyGlass = (variant: 'light' | 'dark' | 'card' = 'card') => designSystem.glassmorphism[variant]
export const applyTransition = () => designSystem.animations.transition
export const applyHover = () => designSystem.animations.hover
