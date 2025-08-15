'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function USSNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  
  // Safe context usage with fallbacks
  let cartCount = 0
  let favorites: any[] = []

  try {
    const cart = useCart()
    cartCount = cart?.cartCount || 0
  } catch (e) {
    console.log('Cart context not available')
  }

  try {
    const favs = useFavorites()
    favorites = favs?.favorites || []
  } catch (e) {
    console.log('Favorites context not available')
  }

  const favoriteCount = favorites.length

  // Categories for combobox
  const productCategories = [
    { name: 'Smartphones', href: '/categorias/smartphones', icon: '📱' },
    { name: 'Notebooks', href: '/categorias/notebooks', icon: '💻' },
    { name: 'Tablets', href: '/categorias/tablets', icon: '📱' },
    { name: 'Áudio', href: '/categorias/audio', icon: '🎧' },
    { name: 'Drones', href: '/categorias/drones', icon: '🚁' },
    { name: 'Smart Home', href: '/categorias/smart-home', icon: '🏠' },
    { name: 'Wearables', href: '/categorias/wearables', icon: '⌚' },
    { name: 'Gaming', href: '/categorias/gaming', icon: '🎮' }
  ]

  const mainBrands = [
    { name: 'Apple', href: '/marcas/apple' },
    { name: 'Samsung', href: '/marcas/samsung' },
    { name: 'DJI', href: '/marcas/dji' },
    { name: 'JBL', href: '/marcas/jbl' },
    { name: 'Sony', href: '/marcas/sony' },
    { name: 'Xiaomi', href: '/marcas/xiaomi' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-uss-md' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-uss-blue to-uss-turquoise rounded-uss flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-uss-blue">USS Brasil</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            
            {/* Products Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-uss-blue transition-colors font-medium">
                <span>Produtos</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              {showProductsMenu && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-uss shadow-uss-lg border border-light-200 py-4">
                  <div className="px-4 pb-2 border-b border-light-200">
                    <h3 className="font-semibold text-uss-blue text-sm">Categorias</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-light-50 transition-colors"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm text-gray-700 hover:text-uss-blue">
                          {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-light-200 mt-2">
                    <Link 
                      href="/produtos"
                      className="text-sm font-medium text-uss-turquoise hover:text-uss-blue"
                    >
                      Ver todos os produtos →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/marcas" className="text-gray-700 hover:text-uss-blue transition-colors font-medium">
              Marcas
            </Link>
            
            <Link href="/ofertas" className="text-gray-700 hover:text-uss-blue transition-colors font-medium">
              Ofertas
            </Link>
            
            <Link href="/lancamentos" className="text-gray-700 hover:text-uss-blue transition-colors font-medium">
              Lançamentos
            </Link>
            
            <Link href="/contato" className="text-gray-700 hover:text-uss-blue transition-colors font-medium">
              Contato
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-light-50 border border-light-200 rounded-uss focus:outline-none focus:border-uss-blue focus:bg-white transition-colors"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 text-gray-600 hover:text-uss-blue transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <Link href="/favoritos" className="relative p-2 text-gray-600 hover:text-uss-blue transition-colors">
              <HeartIcon className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-uss-turquoise text-white text-xs rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-uss-blue transition-colors">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-uss-blue text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link href="/login" className="p-2 text-gray-600 hover:text-uss-blue transition-colors">
              <UserIcon className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-uss-blue transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-light-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-light-50 border border-light-200 rounded-uss focus:outline-none focus:border-uss-blue"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/produtos" 
                  className="block py-2 text-gray-700 hover:text-uss-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produtos
                </Link>
                
                {/* Mobile Categories */}
                <div className="pl-4 space-y-1">
                  {productCategories.slice(0, 6).map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block py-1 text-sm text-gray-600 hover:text-uss-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.icon} {category.name}
                    </Link>
                  ))}
                </div>

                <Link 
                  href="/marcas" 
                  className="block py-2 text-gray-700 hover:text-uss-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marcas
                </Link>
                
                <Link 
                  href="/ofertas" 
                  className="block py-2 text-gray-700 hover:text-uss-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ofertas
                </Link>
                
                <Link 
                  href="/lancamentos" 
                  className="block py-2 text-gray-700 hover:text-uss-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Lançamentos
                </Link>
                
                <Link 
                  href="/contato" 
                  className="block py-2 text-gray-700 hover:text-uss-blue font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
