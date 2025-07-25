'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X, Heart, Smartphone, Monitor, Watch, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { applyGlass, applyTransition } from '@/lib/design-system'
import { useAPI } from '@/hooks/use-api'

const appleCategories = [
  { name: 'iPhone', href: '/products?category=iphone', icon: Smartphone },
  { name: 'Mac', href: '/products?category=mac', icon: Monitor },
  { name: 'Apple Watch', href: '/products?category=watch', icon: Watch },
  { name: 'Acessórios', href: '/products?category=acessorios', icon: Headphones },
]

const mainNavItems = [
  { name: 'Início', href: '/' },
  { name: 'Produtos', href: '/products' },
  { name: 'Categorias', href: '/categories' },
  { name: 'Sobre', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [cartItemsCount, setCartItemsCount] = useState(0)
  
  const { data: products } = useAPI<any>('products')

  // Busca em tempo real com debounce
  useEffect(() => {
    if (searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        const results = products.filter((product: any) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        setSearchResults(results)
      }, 300)
      
      return () => clearTimeout(timeoutId)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, products])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 ${applyGlass('light')} ${applyTransition()}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UB</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Uss Brasil
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-[#00CED1]/10 text-[#00CED1]'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Apple Categories (Desktop) */}
            <div className="hidden xl:flex items-center space-x-6">
              {appleCategories.map((category) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={category.href}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
                >
                  <Search className="h-5 w-5" />
                </motion.button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-12 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 z-50"
                    >
                      <Input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-3 rounded-lg border-gray-200 focus:border-[#00CED1] focus:ring-[#00CED1]"
                        autoFocus
                      />
                      
                      {searchResults.length > 0 && (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {searchResults.map((product: any) => (
                            <motion.div
                              key={product.id}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={`/product/${product.id}`}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 transition-all duration-200"
                                onClick={() => setIsSearchOpen(false)}
                              >
                                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                  <img
                                    src={product.image || '/placeholder.png'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                  <p className="text-xs text-gray-500">{formatPrice(product.price)}</p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                      {searchQuery.length > 2 && searchResults.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          Nenhum produto encontrado
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Favorites */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
              </motion.button>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link href="/cart" className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 flex items-center">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#00CED1] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Link>
              </motion.div>

              {/* Profile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              >
                <User className="h-5 w-5" />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Main Navigation */}
                <div className="space-y-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-[#00CED1]/10 text-[#00CED1]'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Apple Categories */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Produtos Apple
                  </p>
                  <div className="space-y-2">
                    {appleCategories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
