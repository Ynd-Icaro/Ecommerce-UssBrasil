'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { useSearch } from '@/hooks/use-search'
import SearchDropdown from '@/components/search/SearchDropdown'

// Seção 1: Barra Superior - Logo, Pesquisa, Ações
const TopNavbar = () => {
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    executeSearch,
    hasResults
  } = useSearch()
  
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Gerenciar clique fora da busca
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false)
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mostrar/esconder dropdown baseado no foco e query
  useEffect(() => {
    setShowSearchDropdown(isSearchFocused && searchQuery.trim().length > 0)
  }, [isSearchFocused, searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      executeSearch()
      setShowSearchDropdown(false)
      setIsSearchFocused(false)
    }
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
    if (searchQuery.trim().length > 0) {
      setShowSearchDropdown(true)
    }
  }

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-ussbrasil-primary to-ussbrasil-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-ussbrasil-primary to-ussbrasil-accent bg-clip-text text-transparent">
                  USS Brasil
                </h1>
                <p className="text-xs text-gray-500 font-medium">Tecnologia Premium</p>
              </div>
            </Link>
          </div>

          {/* Barra de Pesquisa */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <motion.div
                  animate={{
                    scale: isSearchFocused ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas ou categorias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="w-full pl-12 pr-6 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-ussbrasil-primary focus:border-transparent transition-all text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('')
                        setShowSearchDropdown(false)
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              </form>
              
              {/* Search Dropdown */}
              <SearchDropdown
                isOpen={showSearchDropdown}
                searchQuery={searchQuery}
                products={searchResults.products}
                categories={searchResults.categories}
                brands={searchResults.brands}
                isSearching={isSearching}
                onClose={() => setShowSearchDropdown(false)}
                onSearch={(query) => {
                  setSearchQuery(query)
                  executeSearch(query)
                  setShowSearchDropdown(false)
                }}
              />
            </div>
          </div>

          {/* Ações do Usuário */}
          <div className="flex items-center space-x-2">
            {/* Favoritos */}
            <Link href="/favoritos" className="relative p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-ussbrasil-primary transition-colors" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Carrinho */}
            <Link href="/carrinho" className="relative p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-ussbrasil-primary transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-ussbrasil-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Perfil */}
            <Link href="/perfil" className="p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <User className="w-5 h-5 text-gray-600 group-hover:text-ussbrasil-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Seção 2: Menu de Marcas
const BrandNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const brands = [
    {
      name: 'Apple',
      href: '/marca/apple',
      logo: '/Produtos/Apple/Apresentação Home.jpg',
      categories: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Acessórios']
    },
    {
      name: 'DJI',
      href: '/marca/dji',
      logo: '/Produtos/Dji/Drone Dji Neo Standard.webp',
      categories: ['Drones', 'Câmeras', 'Estabilizadores', 'Microfones', 'Acessórios']
    },
    {
      name: 'Geonav',
      href: '/marca/geonav',
      logo: '/Produtos/Geonav/SuperPower 25W – Carregador Ultrarrápido para Smartphones.jpg',
      categories: ['Carregadores', 'Cabos', 'Power Banks', 'Suportes', 'Acessórios']
    },
    {
      name: 'JBL',
      href: '/marca/jbl',
      logo: '/Produtos/JBL/JBL Boombox 3.webp',
      categories: ['Caixas de Som', 'Fones de Ouvido', 'Earbuds', 'Soundbars', 'Party Speakers']
    },
    {
      name: 'Xiaomi',
      href: '/marca/xiaomi',
      logo: '/Produtos/Xiomi/redmi-note-14-pro-5g.webp',
      categories: ['Smartphones', 'Tablets', 'Smartwatches', 'Laptops', 'Acessórios']
    }
  ]

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {brands.map((brand) => (
              <BrandDropdown key={brand.name} brand={brand} />
            ))}
          </nav>

          {/* Ofertas e Links Especiais */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <Link href="/ofertas" className="text-red-600 font-medium hover:text-red-700 transition-colors">
              Ofertas
            </Link>
            <Link href="/lancamentos" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Lançamentos
            </Link>
            <Link href="/vip" className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors">
              Área VIP
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>

              {/* Mobile Brands */}
              {brands.map((brand) => (
                <div key={brand.name} className="border-b border-gray-100 pb-2">
                  <Link 
                    href={brand.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-ussbrasil-primary py-2 font-medium"
                  >
                    <span>{brand.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente de Dropdown para Marcas
const BrandDropdown = ({ brand }: { brand: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={brand.href}
        className="flex items-center space-x-1 text-gray-700 hover:text-ussbrasil-primary py-2 transition-colors font-medium"
      >
        <span>{brand.name}</span>
        <ChevronDown className="w-3 h-3" />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Categorias {brand.name}
              </span>
            </div>
            {brand.categories.map((category: string) => (
              <Link
                key={category}
                href={`${brand.href}/${category.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ussbrasil-primary transition-colors"
              >
                {category}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link
                href={brand.href}
                className="block px-4 py-2 text-sm font-medium text-ussbrasil-primary hover:bg-gray-50"
              >
                Ver todos os produtos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente Principal da Navbar
const ProfessionalNavbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      <TopNavbar />
      <BrandNavbar />
    </header>
  )
}

export default ProfessionalNavbar
