'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { MainNavigation } from './navigation/main-navigation'

// ========== TIPOS PREMIUM ==========
type NavigationVariant = 'transparent' | 'glass' | 'solid' | 'floating'
type ScrollBehavior = 'hide' | 'shrink' | 'fade' | 'static'

interface AdvancedPageConfig {
  variant: NavigationVariant
  scrollBehavior: ScrollBehavior
  showBorder?: boolean
  customStyles?: string
  blurIntensity?: number
  shadowLevel?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: string
  transition?: string
}

// ========== CONFIGURAÇÕES AVANÇADAS POR PÁGINA ==========
const advancedPageConfigs: Record<string, AdvancedPageConfig> = {
  '/': {
    variant: 'transparent',
    scrollBehavior: 'fade',
    blurIntensity: 0,
    shadowLevel: 'none',
    showBorder: false,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  '/products': {
    variant: 'glass',
    scrollBehavior: 'shrink',
    blurIntensity: 20,
    shadowLevel: 'lg',
    showBorder: true,
    background: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease-out'
  },
  '/categories': {
    variant: 'glass',
    scrollBehavior: 'shrink',
    blurIntensity: 16,
    shadowLevel: 'md',
    showBorder: true,
    customStyles: 'border-primary/20'
  },
  '/cart': {
    variant: 'solid',
    scrollBehavior: 'static',
    shadowLevel: 'xl',
    showBorder: true,
    background: 'hsl(var(--background))',
    customStyles: 'border-b border-border/50'
  },
  '/checkout': {
    variant: 'solid',
    scrollBehavior: 'static',
    shadowLevel: 'xl',
    showBorder: true,
    background: 'hsl(var(--background))',
    customStyles: 'border-b-2 border-primary/30'
  },
  '/profile': {
    variant: 'floating',
    scrollBehavior: 'shrink',
    blurIntensity: 24,
    shadowLevel: 'lg',
    showBorder: true,
    customStyles: 'rounded-2xl mx-4 mt-4 border border-primary/20'
  },
  '/orders': {
    variant: 'glass',
    scrollBehavior: 'shrink',
    blurIntensity: 18,
    shadowLevel: 'md'
  },
  '/login': {
    variant: 'glass',
    scrollBehavior: 'fade',
    blurIntensity: 28,
    shadowLevel: 'lg',
    showBorder: true,
    customStyles: 'border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5'
  }
}

// ========== HOOK AVANÇADO DE SCROLL ==========
function useAdvancedScroll() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'top'>('top')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    let lastScrollY = 0
    
    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(currentScrollY / maxScroll, 1)
      
      setScrollProgress(progress)
      setIsScrolled(currentScrollY > 10)
      
      if (currentScrollY === 0) {
        setScrollDirection('top')
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }
      
      lastScrollY = currentScrollY
    }

    const throttledUpdate = throttle(updateScrollState, 16) // 60fps
    
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    updateScrollState() // Initial call
    
    return () => window.removeEventListener('scroll', throttledUpdate)
  }, [])

  return { scrollDirection, scrollProgress, isScrolled, scrollY }
}

// ========== UTILITY: THROTTLE OTIMIZADO ==========
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return ((...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }) as T
}

// ========== ESTILOS DINÂMICOS ==========
const getVariantStyles = (variant: NavigationVariant, config: AdvancedPageConfig, isScrolled: boolean) => {
  const baseStyles = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300'
  
  switch (variant) {
    case 'transparent':
      return `${baseStyles} ${isScrolled ? 
        'navbar-glass bg-background/80 backdrop-blur-md shadow-lg border-b border-border/20' : 
        'navbar-transparent bg-transparent'
      }`
    
    case 'glass':
      return `${baseStyles} 
        navbar-glass
        bg-gradient-to-r from-background/60 via-background/80 to-background/60
        backdrop-blur-[${config.blurIntensity}px]
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-primary/5 before:via-transparent before:to-secondary/5
        before:pointer-events-none
        ${config.showBorder ? 'border-b border-white/10' : ''}
        shadow-${config.shadowLevel}
      `
    
    case 'solid':
      return `${baseStyles} 
        navbar-solid
        bg-background
        shadow-${config.shadowLevel}
        ${config.showBorder ? 'border-b border-border' : ''}
      `
    
    case 'floating':
      return `${baseStyles}
        navbar-floating
        mx-4 mt-4 rounded-2xl
        bg-background/90 backdrop-blur-lg
        shadow-2xl border border-primary/20
        ring-1 ring-white/10
      `
    
    default:
      return baseStyles
  }
}

// ========== ANIMAÇÕES PERSONALIZADAS ==========
const navbarVariants = {
  hidden: { 
    y: -100, 
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.95
  },
  visible: { 
    y: 0, 
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8
    }
  },
  exit: { 
    y: -100, 
    opacity: 0,
    filter: 'blur(5px)',
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const
    }
  }
}

const shrinkVariants = {
  normal: { height: 80, paddingY: 16 },
  shrunk: { height: 64, paddingY: 8 }
}

// ========== COMPONENTE PRINCIPAL PREMIUM ==========
export default function ConditionalNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { scrollDirection, scrollProgress, isScrolled, scrollY } = useAdvancedScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [shouldShrink, setShouldShrink] = useState(false)

  // ========== CONFIGURAÇÃO DINÂMICA ==========
  const getPageConfig = useCallback((path: string | null): AdvancedPageConfig => {
    if (!path) return advancedPageConfigs['/products'] // fallback
    
    // Correspondências exatas
    if (advancedPageConfigs[path]) {
      return advancedPageConfigs[path]
    }
    
    // Correspondências por padrão
    if (path.startsWith('/categories/')) {
      return advancedPageConfigs['/categories']
    }
    
    if (path.startsWith('/product/')) {
      return {
        variant: 'glass',
        scrollBehavior: 'shrink',
        blurIntensity: 20,
        shadowLevel: 'lg',
        showBorder: true,
        customStyles: 'border-primary/20 bg-gradient-to-r from-background/80 to-background/95'
      }
    }
    
    if (path.startsWith('/orders/')) {
      return advancedPageConfigs['/orders']
    }
    
    // Padrão
    return advancedPageConfigs['/products']
  }, [])

  const config = getPageConfig(pathname)

  // ========== LÓGICA DE COMPORTAMENTO ==========
  useEffect(() => {
    // Sempre ocultar em admin
    if (pathname?.startsWith('/admin')) {
      setIsVisible(false)
      return
    }

    // Aplicar comportamento de scroll
    switch (config.scrollBehavior) {
      case 'hide':
        setIsVisible(scrollDirection === 'up' || scrollDirection === 'top')
        break
      case 'shrink':
        setShouldShrink(isScrolled)
        setIsVisible(true)
        break
      case 'fade':
        setIsVisible(scrollDirection !== 'down' || !isScrolled)
        break
      case 'static':
      default:
        setIsVisible(true)
        setShouldShrink(false)
        break
    }
  }, [pathname, scrollDirection, isScrolled, config.scrollBehavior])

  // ========== TRANSFORMAÇÕES DE SCROLL ==========
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const scale = useTransform(scrollY, [0, 100], [1, 0.98])

  // ========== ESTILOS COMBINADOS ==========
  const combinedStyles = `
    ${getVariantStyles(config.variant, config, isScrolled)}
    ${config.customStyles || ''}
    ${config.transition ? `transition-[${config.transition}]` : ''}
  `.trim()

  // ========== RENDERIZAÇÃO ==========
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={combinedStyles}
          style={{
            background: config.variant === 'transparent' && !isScrolled ? 
              'transparent' : undefined
          }}
        >
          {/* Gradient overlay para glass */}
          {config.variant === 'glass' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"
              style={{ opacity: backgroundOpacity }}
            />
          )}

          {/* Border dinâmica */}
          {config.showBorder && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
              style={{ opacity: borderOpacity }}
            />
          )}

          {/* Navigation content */}
          <motion.div
            variants={shrinkVariants}
            animate={shouldShrink ? 'shrunk' : 'normal'}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <MainNavigation 
              variant={config.variant === 'transparent' && !isScrolled ? 'transparent' : 'glass'}
              className="h-full"
            />
          </motion.div>

          {/* Progress indicator */}
          {config.scrollBehavior === 'shrink' && isScrolled && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
              style={{
                scaleX: scrollProgress,
                transformOrigin: '0 50%'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scrollProgress }}
              transition={{ duration: 0.1 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
