// ============================================================================
// SISTEMA DE DESIGN - DESIGN TOKENS E UTILITÁRIOS
// ============================================================================

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ========== UTILITY FUNCTION ==========
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ========== DESIGN TOKENS ==========
export const designTokens = {
  // Cores principais
  colors: {
    primary: {
      50: '#f0f2f9',
      100: '#e0e6f3', 
      200: '#c1cde7',
      300: '#a2b4db',
      400: '#839bcf',
      500: '#6482c3',
      600: '#4569b7',
      700: '#2650ab',
      800: '#1e3f85',
      900: '#0f1a3c', // Cor da marca USSBrasil
      DEFAULT: '#0f1a3c'
    },
    secondary: {
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
      DEFAULT: '#64748b'
    }
  },

  // Espaçamentos
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  }
} as const

// ========== ANIMAÇÕES ==========
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    }
  }
} as const

// ========== COMPONENTES ==========
export const componentStyles = {
  button: {
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none",
    variants: {
      primary: "bg-primary-900 text-white hover:bg-primary-800",
      secondary: "bg-secondary-200 text-secondary-900 hover:bg-secondary-300", 
      outline: "border border-primary-300 hover:bg-primary-50",
      ghost: "hover:bg-primary-50 hover:text-primary-900"
    },
    sizes: {
      sm: "h-9 px-3 text-sm",
      md: "h-10 py-2 px-4",
      lg: "h-11 px-8 text-base"
    }
  },

  navigation: {
    base: "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    variants: {
      transparent: "bg-transparent",
      glass: "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm",
      solid: "bg-white border-b shadow-sm"
    }
  }
} as const

// ========== UTILIDADES ==========
export const styleUtils = {
  applyGlass: (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    const intensities = {
      light: 'bg-white/50 backdrop-blur-sm',
      medium: 'bg-white/70 backdrop-blur-md',
      heavy: 'bg-white/80 backdrop-blur-xl'
    }
    return intensities[intensity]
  },

  applyHover: (scale: boolean = true) => {
    let classes = 'transition-all duration-200'
    if (scale) classes += ' hover:scale-105'
    return classes
  },

  applyFocus: () => {
    return 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
  }
}