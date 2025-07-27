// ============================================================================
// RESPONSIVE DESIGN CONFIGURATION - BREAKPOINTS E UTILITIES
// ============================================================================

// Breakpoints baseados no Tailwind CSS
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Media queries para uso em styled-components ou CSS-in-JS
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  // Max-width queries
  maxXs: `@media (max-width: ${breakpoints.sm})`,
  maxSm: `@media (max-width: ${breakpoints.md})`,
  maxMd: `@media (max-width: ${breakpoints.lg})`,
  maxLg: `@media (max-width: ${breakpoints.xl})`,
  maxXl: `@media (max-width: ${breakpoints['2xl']})`,
  
  // Specific ranges
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  
  // Touch devices
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
  
  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  
  // High DPI
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
} as const

// Hook para detectar breakpoint atual
import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints>('sm')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      
      if (width < parseInt(breakpoints.sm)) {
        setBreakpoint('xs')
      } else if (width < parseInt(breakpoints.md)) {
        setBreakpoint('sm')
      } else if (width < parseInt(breakpoints.lg)) {
        setBreakpoint('md')
      } else if (width < parseInt(breakpoints.xl)) {
        setBreakpoint('lg')
      } else if (width < parseInt(breakpoints['2xl'])) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Hook para detectar se é mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < parseInt(breakpoints.md))
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// Hook para detectar se é tablet
export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkIsTablet = () => {
      const width = window.innerWidth
      setIsTablet(
        width >= parseInt(breakpoints.md) && 
        width < parseInt(breakpoints.lg)
      )
    }

    checkIsTablet()
    window.addEventListener('resize', checkIsTablet)
    
    return () => window.removeEventListener('resize', checkIsTablet)
  }, [])

  return isTablet
}

// Hook para detectar touch device
export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouchDevice
}

// Utility para classes condicionais baseadas em breakpoint
export const responsiveClass = (base: string, breakpointClasses: Partial<Record<keyof typeof breakpoints, string>>) => {
  const classes = [base]
  
  Object.entries(breakpointClasses).forEach(([bp, className]) => {
    if (className) {
      classes.push(`${bp}:${className}`)
    }
  })
  
  return classes.join(' ')
}

// Grid system responsivo
export const gridCols = {
  mobile: 'grid-cols-1',
  tablet: 'grid-cols-2',
  desktop: 'grid-cols-3',
  wide: 'grid-cols-4',
} as const

// Container sizes
export const containerSizes = {
  xs: 'max-w-screen-xs',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
} as const

// Typography scales para diferentes dispositivos
export const typographyScale = {
  mobile: {
    h1: 'text-3xl md:text-4xl',
    h2: 'text-2xl md:text-3xl',
    h3: 'text-xl md:text-2xl',
    h4: 'text-lg md:text-xl',
    body: 'text-base',
    small: 'text-sm',
    xs: 'text-xs',
  },
  desktop: {
    h1: 'text-5xl lg:text-6xl',
    h2: 'text-4xl lg:text-5xl',
    h3: 'text-3xl lg:text-4xl',
    h4: 'text-2xl lg:text-3xl',
    body: 'text-lg',
    small: 'text-base',
    xs: 'text-sm',
  },
} as const

// Spacing scale responsivo
export const spacing = {
  section: 'py-12 md:py-16 lg:py-20',
  container: 'px-4 sm:px-6 lg:px-8',
  gap: 'gap-4 md:gap-6 lg:gap-8',
} as const
