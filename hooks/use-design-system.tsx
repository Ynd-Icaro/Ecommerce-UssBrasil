'use client'

import { useState, useEffect, useCallback } from 'react'

// Design System Configuration
interface DesignSystemConfig {
  spacing: Record<string, string>
  colors: Record<string, string>
  typography: Record<string, string>
  animations: Record<string, string>
  breakpoints: Record<string, string>
}

interface UseDesignSystemReturn {
  config: DesignSystemConfig
  spacing: (key: string) => string
  color: (key: string) => string
  typography: (key: string) => string
  animation: (key: string) => string
  breakpoint: (key: string) => string
  utils: {
    cn: (...classes: string[]) => string
    formatCurrency: (value: number) => string
    formatDate: (date: Date) => string
    debounce: <T extends (...args: any[]) => any>(func: T, delay: number) => T
    throttle: <T extends (...args: any[]) => any>(func: T, delay: number) => T
  }
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const designSystemConfig: DesignSystemConfig = {
  spacing: {
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
    '2xl': 'var(--space-12)',
    '3xl': 'var(--space-16)',
    '4xl': 'var(--space-20)',
    '5xl': 'var(--space-24)',
    '6xl': 'var(--space-32)'
  },
  colors: {
    primary: 'var(--uss-primary-500)',
    'primary-light': 'var(--uss-primary-300)',
    'primary-dark': 'var(--uss-primary-700)',
    accent: 'var(--uss-accent-300)',
    'accent-light': 'var(--uss-accent-200)',
    'accent-dark': 'var(--uss-accent-500)',
    success: 'var(--uss-success)',
    warning: 'var(--uss-warning)',
    error: 'var(--uss-error)',
    info: 'var(--uss-info)',
    'text-primary': 'var(--text-primary)',
    'text-secondary': 'var(--text-secondary)',
    'text-tertiary': 'var(--text-tertiary)',
    'bg-primary': 'var(--bg-primary)',
    'bg-secondary': 'var(--bg-secondary)',
    'bg-tertiary': 'var(--bg-tertiary)',
    'border-primary': 'var(--border-primary)',
    'border-secondary': 'var(--border-secondary)'
  },
  typography: {
    'heading-1': 'var(--text-6xl)',
    'heading-2': 'var(--text-5xl)',
    'heading-3': 'var(--text-4xl)',
    'heading-4': 'var(--text-3xl)',
    'heading-5': 'var(--text-2xl)',
    'heading-6': 'var(--text-xl)',
    'body-lg': 'var(--text-lg)',
    'body-base': 'var(--text-base)',
    'body-sm': 'var(--text-sm)',
    'caption': 'var(--text-xs)'
  },
  animations: {
    fast: 'var(--duration-150)',
    normal: 'var(--duration-300)',
    slow: 'var(--duration-500)',
    'extra-slow': 'var(--duration-700)',
    'ease-in': 'var(--ease-in)',
    'ease-out': 'var(--ease-out)',
    'ease-in-out': 'var(--ease-in-out)',
    spring: 'var(--ease-spring)',
    bounce: 'var(--ease-bounce)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}

// Utility Functions
const cn = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }) as T
}

const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let inThrottle = false
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), delay)
    }
  }) as T
}

export const useDesignSystem = (): UseDesignSystemReturn => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('uss-theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    const initialTheme = savedTheme || systemTheme
    setThemeState(initialTheme)
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  // Theme setter with persistence
  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    localStorage.setItem('uss-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, [])

  // Getters for design tokens
  const spacing = useCallback((key: string): string => {
    return designSystemConfig.spacing[key] || key
  }, [])

  const color = useCallback((key: string): string => {
    return designSystemConfig.colors[key] || key
  }, [])

  const typography = useCallback((key: string): string => {
    return designSystemConfig.typography[key] || key
  }, [])

  const animation = useCallback((key: string): string => {
    return designSystemConfig.animations[key] || key
  }, [])

  const breakpoint = useCallback((key: string): string => {
    return designSystemConfig.breakpoints[key] || key
  }, [])

  return {
    config: designSystemConfig,
    spacing,
    color,
    typography,
    animation,
    breakpoint,
    utils: {
      cn,
      formatCurrency,
      formatDate,
      debounce,
      throttle
    },
    theme,
    setTheme
  }
}

// Component-specific hooks
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg')

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      
      if (width < 640) setScreenSize('sm')
      else if (width < 768) setScreenSize('md')
      else if (width < 1024) setScreenSize('lg')
      else if (width < 1280) setScreenSize('xl')
      else setScreenSize('2xl')
    }

    checkScreenSize()
    
    const debouncedResize = debounce(checkScreenSize, 100)
    window.addEventListener('resize', debouncedResize)
    
    return () => window.removeEventListener('resize', debouncedResize)
  }, [])

  return {
    screenSize,
    isMobile: screenSize === 'sm',
    isTablet: screenSize === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(screenSize),
    isLargeDesktop: ['xl', '2xl'].includes(screenSize)
  }
}

export const useAnimation = () => {
  const { animation } = useDesignSystem()

  const createTransition = useCallback((
    property: string = 'all',
    duration: string = 'normal',
    easing: string = 'ease-in-out'
  ) => {
    return {
      transition: `${property} ${animation(duration)} ${animation(easing)}`
    }
  }, [animation])

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const slideDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }

  const slideLeft = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  const slideRight = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  const staggerChildren = (delay: number = 0.1) => ({
    animate: {
      transition: {
        staggerChildren: delay
      }
    }
  })

  return {
    createTransition,
    variants: {
      fadeIn,
      slideUp,
      slideDown,
      slideLeft,
      slideRight,
      scaleIn,
      staggerChildren
    }
  }
}

export const useNotification = () => {
  const showNotification = useCallback((
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'info',
    duration: number = 5000
  ) => {
    // Implementar sistema de notificações
    console.log(`[${type.toUpperCase()}] ${message}`)
    
    // Aqui você integraria com react-hot-toast, sonner ou sistema próprio
    // toast[type](message, { duration })
  }, [])

  return { showNotification }
}

// Export main hook as default
export default useDesignSystem
