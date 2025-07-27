// ============================================================================
// SISTEMA DE DESIGN - DESIGN TOKENS E UTILITÁRIOS
// ============================================================================

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ========== UTILITY FUNCTION ==========
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ========== DARK THEME DESIGN SYSTEM ==========
export const darkTheme = {
  // Tons escuros principais
  background: {
    primary: '#1a1a1a',
    secondary: '#111111',
    card: '#1a1a1a',
    admin: '#111',
    adminCard: '#1a1a1a'
  },
  
  // Cor de destaque suavizada
  accent: {
    primary: '#20b2aa',
    soft: 'rgba(32, 178, 170, 0.8)',
    hover: 'rgba(32, 178, 170, 0.6)'
  },
  
  // Textos
  text: {
    primary: '#f9f9f9',
    title: '#ffffff',
    icon: '#ffffff',
    iconHover: 'rgba(255, 255, 255, 0.8)'
  },
  
  // Bordas
  border: {
    primary: '#262626',
    secondary: '#1a1a1a'
  },
  
  // Específicos para páginas
  login: {
    background: '#ffffff',
    button: '#000000',
    buttonText: '#ffffff'
  },
  
  navbar: {
    background: 'rgba(255, 255, 255, 0.8)',
    icon: '#000000'
  },
  
  // Bordas e divisores
  border: {
    primary: '#333333',
    light: 'rgba(51, 51, 51, 0.5)'
  }
} as const;

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
      glass: "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-sm",
      solid: "bg-gray-900 border-b border-gray-800 shadow-sm"
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

// ========== ANIMAÇÕES ESPECÍFICAS ==========
export const darkAnimations = {
  // Transições padrão
  transition: 'all 0.3s ease',
  hover: {
    scale: 'scale-105',
    brightness: 'brightness-110',
    translateY: 'translate-y-[-1px]'
  },
  
  // Animações com framer-motion
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.3 }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2 }
  }
} as const;

// ========== COMPONENTES DARK THEME ==========
export const darkComponents = {
  // Botões padrão
  button: {
    primary: 'bg-black text-white hover:brightness-110 hover:translate-y-[-1px] transition-all duration-300 rounded-lg px-6 py-3 font-semibold flex items-center gap-2',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 rounded-lg px-6 py-3 font-semibold',
    accent: 'bg-[#20b2aa] text-white hover:bg-opacity-80 transition-all duration-300 rounded-lg px-6 py-3 font-semibold'
  },
  
  // Cards
  card: {
    dark: 'bg-[#1a1a1a] border border-[#333] rounded-lg shadow-lg',
    admin: 'bg-[#111] border border-[#333] rounded-lg shadow-lg',
    light: 'bg-white border border-gray-200 rounded-lg shadow-lg'
  },
  
  // Modal/Dialog
  modal: {
    overlay: 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50',
    content: 'fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300'
  }
} as const;

// ========== MARCAS PARA SIDEBAR ==========
export const brands = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/icons/apple-logo.svg',
    products: [
      { name: 'iPhone 16 Pro', image: '/Imagens/Iphone 16 Pro.png' },
      { name: 'MacBook Pro', image: '/Imagens/Macbook Pro.png' },
      { name: 'iPad Pro', image: '/Imagens/Ipad Pro.png' },
      { name: 'Apple Watch', image: '/Imagens/Watch Series 10.png' }
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '/icons/samsung-logo.svg',
    products: [
      { name: 'Galaxy S24 Ultra', image: '/icons/smartphone.svg' },
      { name: 'Galaxy Tab S9', image: '/icons/tablet.svg' }
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/icons/xiaomi-logo.svg',
    products: [
      { name: 'Mi 14 Ultra', image: '/icons/smartphone.svg' },
      { name: 'Mi Scooter Pro 2', image: '/icons/scooter.svg' }
    ]
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '/icons/sony-logo.svg',
    products: [
      { name: 'WH-1000XM5', image: '/icons/headphones.svg' },
      { name: 'PlayStation 5', image: '/icons/gaming.svg' }
    ]
  }
] as const;