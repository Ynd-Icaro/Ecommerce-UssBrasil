'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Menu,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Tablet
} from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'

// Seção 1: Barra Superior (Utilitários)
const TopBar = () => {
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="bg-ussbrasil-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 text-sm">
          {/* Informações de Contato */}
          <div className="hidden md:flex items-center space-x-6">
            <span>📞 (11) 9999-9999</span>
            <span>📧 contato@ussbrasil.com</span>
            <span>🚚 Frete grátis acima de R$ 500</span>
          </div>
          
          {/* Ações Rápidas */}
          <div className="flex items-center space-x-4">
            <Link href="/ofertas" className="hover:text-ussbrasil-secondary transition-colors">
              🔥 Ofertas
            </Link>
            <Link href="/vip" className="hover:text-ussbrasil-secondary transition-colors">
              ⭐ Área VIP
            </Link>
            <Link href="/suporte" className="hover:text-ussbrasil-secondary transition-colors">
              💬 Suporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Seção 2: Navbar Principal (Navegação e Logo)
const MainNav = () => {
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = [
    {
      name: 'Apple',
      icon: <Smartphone className="w-4 h-4" />,
      href: '/categories/apple',
      subcategories: [
        { name: 'iPhone', href: '/categories/iphone' },
        { name: 'MacBook', href: '/categories/macbook' },
        { name: 'iPad', href: '/categories/ipad' },
        { name: 'Apple Watch', href: '/categories/apple-watch' },
        { name: 'AirPods', href: '/categories/airpods' }
      ]
    },
    {
      name: 'Smartphones',
      icon: <Smartphone className="w-4 h-4" />,
      href: '/categories/smartphones',
      subcategories: [
        { name: 'iPhone', href: '/categories/iphone' },
        { name: 'Samsung', href: '/categories/samsung' },
        { name: 'Xiaomi', href: '/categories/xiaomi' },
        { name: 'Motorola', href: '/categories/motorola' }
      ]
    },
    {
      name: 'Notebooks',
      icon: <Laptop className="w-4 h-4" />,
      href: '/categories/notebooks',
      subcategories: [
        { name: 'MacBook', href: '/categories/macbook' },
        { name: 'Gaming', href: '/categories/gaming-notebooks' },
        { name: 'Ultrabooks', href: '/categories/ultrabooks' },
        { name: 'Workstation', href: '/categories/workstation' }
      ]
    },
    {
      name: 'Áudio',
      icon: <Headphones className="w-4 h-4" />,
      href: '/categories/audio',
      subcategories: [
        { name: 'AirPods', href: '/categories/airpods' },
        { name: 'JBL', href: '/categories/jbl' },
        { name: 'Fones Premium', href: '/categories/fones-premium' },
        { name: 'Caixas de Som', href: '/categories/caixas-som' }
      ]
    },
    {
      name: 'Acessórios',
      icon: <Camera className="w-4 h-4" />,
      href: '/categories/acessorios',
      subcategories: [
        { name: 'Capas e Cases', href: '/categories/capas' },
        { name: 'Carregadores', href: '/categories/carregadores' },
        { name: 'Cabos', href: '/categories/cabos' },
        { name: 'Suportes', href: '/categories/suportes' }
      ]
    }
  ]

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 uss-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold uss-text-gradient">USS Brasil</h1>
                <p className="text-xs text-gray-500">Tecnologia Premium</p>
              </div>
            </Link>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <CategoryDropdown key={category.name} category={category} />
            ))}
          </nav>

          {/* Barra de Pesquisa */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ussbrasil-primary focus:border-transparent transition-all"
                />
              </motion.div>
            </div>
          </div>

          {/* Ações do Usuário */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Carrinho */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-ussbrasil-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Login/Perfil */}
            <Link href="/login" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Menu Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Pesquisa Mobile */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              {/* Categorias Mobile */}
              {categories.map((category) => (
                <div key={category.name} className="border-b border-gray-100 pb-2">
                  <Link 
                    href={category.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-ussbrasil-primary py-2"
                  >
                    {category.icon}
                    <span>{category.name}</span>
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

// Componente de Dropdown para Categorias
const CategoryDropdown = ({ category }: { category: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={category.href}
        className="flex items-center space-x-1 text-gray-700 hover:text-ussbrasil-primary py-2 transition-colors"
      >
        {category.icon}
        <span>{category.name}</span>
        <ChevronDown className="w-3 h-3" />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            {category.subcategories.map((sub: any) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-ussbrasil-primary transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente Principal da Navbar Organizada
const OrganizedNavbar = () => {
  return (
    <header className="w-full">
      <TopBar />
      <MainNav />
    </header>
  )
}

export default OrganizedNavbar
