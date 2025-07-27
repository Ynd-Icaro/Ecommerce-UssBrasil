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
  X
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { componentStyles } from '@/lib/design-system'
import { useNavigation } from '@/hooks/use-navigation'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useUI } from '@/contexts/UIContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductsCombobox, CategoriesCombobox } from './navigation-combobox'
import { AuthModal } from '@/components/auth/AuthModal'

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
    setMobileMenuOpen,
    setSearchQuery,
    handleSearch,
    toggleMobileMenu
  } = useNavigation()

  const { cartCount } = useCart()
  const { favoritesCount } = useFavorites()
  const { openCart } = useUI()
  
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Uss Brasil
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ProductsCombobox />
              <CategoriesCombobox />
              
              <Link 
                href="/products" 
                className="font-medium text-gray-700 hover:text-[#00CED1] transition-colors"
              >
                Todos os Produtos
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={onSearchSubmit} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-white/50 border-gray-200 rounded-full focus:bg-white transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Favoritos */}
              <Link href="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {favoritesCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {favoritesCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Carrinho */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#00CED1] text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setAuthMode('login')
                  setIsAuthModalOpen(true)
                }}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={onSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-white/50 border-gray-200 rounded-full focus:bg-white transition-all"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                <Link 
                  href="/products" 
                  className="block py-2 font-medium text-gray-700 hover:text-[#00CED1] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Todos os Produtos
                </Link>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Categorias</h3>
                  <Link 
                    href="/categories/smartphones" 
                    className="block py-1 text-gray-600 hover:text-[#00CED1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📱 Smartphones
                  </Link>
                  <Link 
                    href="/categories/laptops" 
                    className="block py-1 text-gray-600 hover:text-[#00CED1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    💻 Laptops
                  </Link>
                  <Link 
                    href="/categories/tablets" 
                    className="block py-1 text-gray-600 hover:text-[#00CED1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📱 Tablets
                  </Link>
                  <Link 
                    href="/categories/smartwatches" 
                    className="block py-1 text-gray-600 hover:text-[#00CED1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⌚ Smartwatches
                  </Link>
                  <Link 
                    href="/categories/acessorios" 
                    className="block py-1 text-gray-600 hover:text-[#00CED1] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🎧 Acessórios
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authMode}
      />
    </>
  )
}
