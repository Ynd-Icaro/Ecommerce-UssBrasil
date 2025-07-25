'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X,
  Smartphone,
  Tablet,
  Monitor,
  Watch,
  Headphones
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { componentStyles, styleUtils } from '@/lib/design-system'
import { useNavigation, useNavigationCategories } from '@/hooks/use-navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { AdvancedSearch } from '@/components/search/AdvancedSearch'
import { AuthModal } from '@/components/auth/AuthModal'

// ========== MAPEAMENTO DE ÍCONES ==========
const iconMap = {
  Smartphone,
  Tablet,
  Monitor,
  Watch,
  Headphones
}

// ========== TIPOS ==========
interface NavigationProps {
  variant?: 'transparent' | 'glass' | 'solid'
  className?: string
}

// ========== COMPONENTE PRINCIPAL ==========
export function MainNavigation({ variant = 'glass', className }: NavigationProps) {
  const {
    isScrolled,
    isMobileMenuOpen,
    searchQuery,
    cartItemsCount,
    setMobileMenuOpen,
    setSearchQuery,
    handleSearch,
    toggleMobileMenu
  } = useNavigation()

  const { categories, quickLinks } = useNavigationCategories()
  
  // Estado do modal de autenticação
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  // Determinar estilo da navbar
  const getNavbarStyle = () => {
    if (variant === 'solid') return componentStyles.navigation.variants.solid
    if (variant === 'transparent' && !isScrolled) return componentStyles.navigation.variants.transparent
    return componentStyles.navigation.variants.glass
  }

  // Handler para busca
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  return (
    <>
      <motion.header
        className={cn(
          componentStyles.navigation.base,
          getNavbarStyle(),
          className
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">USS</span>
                </div>
                <span className="hidden sm:block font-semibold text-lg text-gray-900">
                  Brasil
                </span>
              </Link>
            </motion.div>

            {/* Navegação Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              
              {/* Menu de Categorias */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 focus:bg-gray-100">
                      <span className="font-medium">Produtos</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
                            <div className="space-y-3">
                              {categories.map((category) => {
                                const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                                return (
                                  <NavigationMenuLink key={category.id} asChild>
                                    <Link
                                      href={category.href}
                                      className={cn(
                                        "flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors",
                                        styleUtils.applyFocus()
                                      )}
                                    >
                                      <div className="flex-shrink-0">
                                        <IconComponent className="w-5 h-5 text-primary-900" />
                                      </div>
                                      <div>
                                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                                          <span>{category.name}</span>
                                          {category.featured && (
                                            <Badge variant="secondary" className="text-xs">
                                              Featured
                                            </Badge>
                                          )}
                                        </div>
                                        {category.description && (
                                          <p className="text-sm text-gray-500">
                                            {category.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                )
                              })}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Destacados</h3>
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-xl p-4 text-white">
                                <h4 className="font-semibold mb-2">iPhone 16 Pro</h4>
                                <p className="text-sm text-primary-100 mb-3">
                                  Titânio. Tão forte. Tão leve. Tão Pro.
                                </p>
                                <Button size="sm" variant="secondary">
                                  Saiba mais
                                </Button>
                              </div>
                              
                              <div className="bg-gray-100 rounded-xl p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Apple Watch Series 10</h4>
                                <p className="text-sm text-gray-600 mb-3">
                                  O maior display. O carregamento mais rápido.
                                </p>
                                <Button size="sm" variant="outline">
                                  Ver ofertas
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Links Rápidos */}
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative font-medium text-gray-900 hover:text-primary-900 transition-colors",
                    styleUtils.applyFocus()
                  )}
                >
                  {link.name}
                  {link.badge && (
                    <Badge 
                      variant={link.badge === 'Sale' ? 'destructive' : 'default'}
                      className="absolute -top-2 -right-8 text-xs"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            {/* Barra de Busca */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <AdvancedSearch 
                className="w-full"
                placeholder="Buscar produtos..."
                onSearch={handleSearch}
              />
            </div>

            {/* Ações do Usuário */}
            <div className="flex items-center space-x-4">
              
              {/* Favoritos */}
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Heart className="w-5 h-5" />
              </Button>

              {/* Carrinho */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <Badge 
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center p-0"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Carrinho de Compras</h3>
                    <div className="text-sm text-gray-500">
                      {cartItemsCount} itens no carrinho
                    </div>
                    <Button className="w-full">Ver Carrinho</Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Usuário */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex"
                onClick={() => {
                  setAuthMode('login')
                  setIsAuthModalOpen(true)
                }}
              >
                <User className="w-5 h-5" />
              </Button>

              {/* Menu Mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Busca Mobile */}
                <div className="mb-6">
                  <form onSubmit={onSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </form>
                </div>

                {/* Categorias */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Categorias</h3>
                  {categories.map((category) => {
                    const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                    return (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 text-primary-900" />
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    )
                  })}

                  <hr className="my-6" />

                  {/* Quick Links */}
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{link.name}</span>
                      {link.badge && (
                        <Badge variant={link.badge === 'Sale' ? 'destructive' : 'default'}>
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authMode}
      />

      {/* Spacer para compensar navbar fixa */}
      <div className="h-16" />
    </>
  )
}

export default MainNavigation
