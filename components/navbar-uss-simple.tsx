'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useUSSTheme } from '@/hooks/use-uss-theme'

export default function USSNavbarSimple() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Safe context usage with fallbacks
  let cartCount = 0
  let favorites: any[] = []
  let toggleTheme = () => {}
  let isDark = false

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

  try {
    const theme = useUSSTheme()
    toggleTheme = theme?.toggleTheme || (() => {})
    isDark = theme?.isDark || false
  } catch (e) {
    console.log('Theme context not available')
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg' 
          : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm'
        }
        border-b border-gray-200 dark:border-gray-700
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-200">
                  USS
                </div>
                <span className="text-xl font-bold text-blue-600 dark:text-cyan-400">
                  Brasil
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/produtos" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors duration-200">
                Produtos
              </Link>
              <Link href="/categorias" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors duration-200">
                Categorias
              </Link>
              <Link href="/marcas" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors duration-200">
                Marcas
              </Link>
              <Link href="/ofertas" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors duration-200">
                Ofertas
              </Link>
              <Link href="/contato" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 font-medium transition-colors duration-200">
                Contato
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Favorites */}
              <Link href="/favoritos" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200">
                <HeartIcon className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link href="/profile" className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200">
                <UserIcon className="w-6 h-6" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              
              {/* Mobile Search */}
              <div className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {[
                  { href: '/produtos', label: 'Produtos' },
                  { href: '/categorias', label: 'Categorias' },
                  { href: '/marcas', label: 'Marcas' },
                  { href: '/ofertas', label: 'Ofertas' },
                  { href: '/contato', label: 'Contato' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
    </>
  )
}
