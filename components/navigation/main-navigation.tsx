'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Search,
  Heart,
  MapPin,
  Bell,
  Crown,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'

// ========== TIPOS ==========
type NavigationVariant = 'transparent' | 'glass' | 'solid' | 'floating'

interface MainNavigationProps {
  variant?: NavigationVariant
  className?: string
}

// ========== CONFIGURAÇÕES ==========
const navigationItems = [
  { href: '/', label: 'Início', icon: null },
  { href: '/products', label: 'Produtos', icon: null },
  { href: '/categories/mac', label: 'Mac', icon: null },
  { href: '/categories/iphone', label: 'iPhone', icon: null },
  { href: '/categories/ipad', label: 'iPad', icon: null },
  { href: '/categories/watch', label: 'Watch', icon: null },
  { href: '/categories/airpods', label: 'AirPods', icon: null }
]

const userMenuItems = [
  { href: '/profile', label: 'Perfil', icon: User },
  { href: '/orders', label: 'Pedidos', icon: ShoppingBag },
  { href: '/wishlist', label: 'Favoritos', icon: Heart },
  { href: '/notifications', label: 'Notificações', icon: Bell }
]

// ========== ANIMAÇÕES ==========
const logoVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.05, 
    rotate: [0, -5, 5, 0],
    transition: { 
      duration: 0.4,
      ease: 'easeInOut' as const
    }
  }
}

const itemVariants = {
  initial: { opacity: 0.7, y: 0 },
  hover: { 
    opacity: 1, 
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' as const }
  }
}

const badgeVariants = {
  initial: { scale: 1 },
  pulse: { 
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
}

// ========== ESTILOS DINÂMICOS ==========
const getVariantStyles = (variant: NavigationVariant) => {
  const baseStyles = 'w-full border-b transition-all duration-300'
  
  switch (variant) {
    case 'transparent':
      return `${baseStyles} navbar-transparent`
    
    case 'glass':
      return `${baseStyles} navbar-glass`
    
    case 'solid':
      return `${baseStyles} navbar-solid`
    
    case 'floating':
      return `${baseStyles} navbar-floating`
    
    default:
      return baseStyles
  }
}

// ========== COMPONENTE PRINCIPAL ==========
export function MainNavigation({ variant = 'glass', className }: MainNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(3) // Mock data
  const [notificationCount, setNotificationCount] = useState(2) // Mock data
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ========== EFEITOS ==========
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ========== HELPERS ==========
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleSearch = () => {
    // Implementar busca
    router.push('/search')
  }

  // ========== COMPONENTES INTERNOS ==========
  const Logo = () => (
    <motion.div
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
      className="flex items-center space-x-2"
    >
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full premium-badge"
            variants={badgeVariants}
            initial="initial"
            animate="pulse"
          >
            <Sparkles className="w-2 h-2 text-yellow-800 absolute top-0.5 left-0.5" />
          </motion.div>
        </div>
        <span className={`font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
          ${variant === 'transparent' && !isScrolled ? 'text-white' : ''}
        `}>
          USS Brasil
        </span>
      </Link>
    </motion.div>
  )

  const DesktopNavigation = () => (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <motion.div
          key={item.href}
          variants={itemVariants}
          initial="initial"
          whileHover="hover"
        >
          <Link
            href={item.href}
            className={`
              nav-link relative text-sm font-medium transition-colors duration-200
              hover:text-primary group
              ${isActiveLink(item.href) 
                ? 'text-primary active' 
                : variant === 'transparent' && !isScrolled 
                  ? 'text-white/90' 
                  : 'text-muted-foreground'
              }
            `}
          >
            {item.label}
            
            {/* Active indicator */}
            {isActiveLink(item.href) && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Hover effect */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      ))}
    </nav>
  )

  const ActionButtons = () => (
    <div className="flex items-center space-x-2">
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        className={`
          relative hover:bg-primary/10
          ${variant === 'transparent' && !isScrolled ? 'text-white hover:bg-white/10' : ''}
        `}
      >
        <Search className="w-5 h-5" />
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={`
          relative hover:bg-primary/10
          ${variant === 'transparent' && !isScrolled ? 'text-white hover:bg-white/10' : ''}
        `}
      >
        <Link href="/notifications">
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Link>
      </Button>

      {/* Cart */}
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={`
          relative hover:bg-primary/10
          ${variant === 'transparent' && !isScrolled ? 'text-white hover:bg-white/10' : ''}
        `}
      >
        <Link href="/cart">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-primary"
            >
              {cartCount}
            </Badge>
          )}
        </Link>
      </Button>

      {/* User Menu */}
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={`
          hover:bg-primary/10
          ${variant === 'transparent' && !isScrolled ? 'text-white hover:bg-white/10' : ''}
        `}
      >
        <Link href="/profile">
          <User className="w-5 h-5" />
        </Link>
      </Button>

      {/* Mobile Menu */}
      {isMobile && (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`
                lg:hidden hover:bg-primary/10
                ${variant === 'transparent' && !isScrolled ? 'text-white hover:bg-white/10' : ''}
              `}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )

  const MobileMenu = ({ onClose }: { onClose: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Logo />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`
              block px-4 py-3 rounded-lg transition-colors duration-200
              hover:bg-primary/10
              ${isActiveLink(item.href) 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t space-y-2">
        {userMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors duration-200"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )

  // ========== RENDERIZAÇÃO ==========
  return (
    <header className={`${getVariantStyles(variant)} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopNavigation />
          <ActionButtons />
        </div>
      </div>
    </header>
  )
}

