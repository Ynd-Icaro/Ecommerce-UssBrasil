'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Menu,
  X,
  ChevronDown,
  Home,
  Grid3X3,
  Star,
  Tag,
  Gift,
  Crown
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useSearch } from '@/hooks/use-search'
import SearchDropdown from '@/components/search/SearchDropdown'

// Interface para props da navbar
interface NavbarProps {
  currentPage?: string
  brandSlug?: string
  brandName?: string
  categorySlug?: string
  categoryName?: string
  hideSearch?: boolean
  hideBrands?: boolean
  customTitle?: string
  customSubtitle?: string
}

// Dados das marcas
const brandsData = [
  {
    name: 'USS Brasil',
    slug: 'uss-brasil',
    href: '/marcas/uss-brasil',
    categories: ['Camisetas', 'Polos', 'Bermudas', 'Jaquetas', 'Acessórios']
  },
  {
    name: 'Apple',
    slug: 'apple',
    href: '/marcas/apple',
    categories: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods', 'Acessórios']
  },
  {
    name: 'Nike',
    slug: 'nike',
    href: '/marcas/nike',
    categories: ['Tênis', 'Roupas', 'Acessórios', 'Equipamentos']
  },
  {
    name: 'Adidas',
    slug: 'adidas',
    href: '/marcas/adidas',
    categories: ['Tênis', 'Roupas', 'Acessórios', 'Equipamentos']
  },
  {
    name: 'DJI',
    slug: 'dji',
    href: '/marcas/dji',
    categories: ['Drones', 'Câmeras', 'Estabilizadores', 'Microfones', 'Acessórios']
  },
  {
    name: 'JBL',
    slug: 'jbl',
    href: '/marcas/jbl',
    categories: ['Caixas de Som', 'Fones de Ouvido', 'Earbuds', 'Soundbars', 'Party Speakers']
  }
]

// Seção 1: Barra Superior - Logo, Pesquisa, Ações
const TopNavbar = ({ 
  hideSearch = false, 
  customTitle, 
  customSubtitle,
  currentPage,
  brandName,
  categoryName 
}: Partial<NavbarProps>) => {
  const { cartItems, cartCount } = useCart()
  const { favorites } = useFavorites()
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    executeSearch
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

  // Determinar título e subtítulo baseado no contexto
  const getTitle = () => {
    if (customTitle) return customTitle
    if (brandName) return brandName
    if (categoryName) return categoryName
    return 'USS Brasil'
  }

  const getSubtitle = () => {
    if (customSubtitle) return customSubtitle
    if (currentPage === 'brand') return 'Produtos da Marca'
    if (currentPage === 'category') return 'Categoria'
    return 'Tecnologia Premium'
  }

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] bg-clip-text text-transparent">
                  {getTitle()}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  {getSubtitle()}
                </p>
              </div>
            </Link>
          </div>

          {/* Barra de Pesquisa */}
          {!hideSearch && (
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
                      placeholder={currentPage === 'brand' ? `Buscar em ${brandName || 'marca'}...` : "Buscar produtos, marcas ou categorias..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      className="w-full pl-12 pr-6 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent transition-all text-sm"
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
          )}

          {/* Ações do Usuário */}
          <div className="flex items-center space-x-2">
            {/* Favoritos */}
            <Link href="/favoritos" className="relative p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-[#1ea7ff] transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Carrinho */}
            <Link href="/carrinho" className="relative p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-[#1ea7ff] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1ea7ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Perfil */}
            <Link href="/perfil" className="p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <User className="w-5 h-5 text-gray-600 group-hover:text-[#1ea7ff] transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Seção 2: Menu de Navegação Principal
const MainNavbar = ({ hideBrands = false, currentPage }: Partial<NavbarProps>) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      name: 'Início',
      href: '/',
      icon: Home,
      active: pathname === '/'
    },
    {
      name: 'Produtos',
      href: '/produtos',
      icon: Grid3X3,
      active: pathname.startsWith('/produtos')
    },
    {
      name: 'Categorias',
      href: '/categories',
      icon: Tag,
      active: pathname.startsWith('/categories')
    },
    {
      name: 'Marcas',
      href: '/marcas',
      icon: Star,
      active: pathname.startsWith('/marcas')
    },
    {
      name: 'Ofertas',
      href: '/ofertas',
      icon: Gift,
      active: pathname.startsWith('/ofertas')
    },
    {
      name: 'VIP',
      href: '/vip',
      icon: Crown,
      active: pathname.startsWith('/vip')
    }
  ]

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-[#1ea7ff] text-white shadow-sm'
                    : 'text-gray-700 hover:text-[#1ea7ff] hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Brand Dropdown - Desktop */}
          {!hideBrands && currentPage !== 'brand' && (
            <div className="hidden lg:flex items-center space-x-6">
              {brandsData.slice(0, 4).map((brand) => (
                <BrandDropdown key={brand.slug} brand={brand} />
              ))}
              <Link 
                href="/marcas" 
                className="text-sm text-gray-500 hover:text-[#1ea7ff] transition-colors"
              >
                Ver todas →
              </Link>
            </div>
          )}

          {/* Links Especiais - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <Link href="/lancamentos" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              Lançamentos
            </Link>
            <Link href="/novidades" className="text-green-600 font-medium hover:text-green-700 transition-colors">
              Novidades
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    item.active
                      ? 'bg-[#1ea7ff] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile Brands */}
              {!hideBrands && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                    Marcas
                  </p>
                  {brandsData.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={brand.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1ea7ff] rounded-lg transition-colors"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
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
        className="flex items-center space-x-1 text-gray-700 hover:text-[#1ea7ff] py-2 transition-colors font-medium text-sm"
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
                href={`${brand.href}?category=${category.toLowerCase().replace(' ', '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1ea7ff] transition-colors"
              >
                {category}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link
                href={brand.href}
                className="block px-4 py-2 text-sm font-medium text-[#1ea7ff] hover:bg-gray-50"
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
const RefactoredNavbar: React.FC<NavbarProps> = (props) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      <TopNavbar {...props} />
      <MainNavbar {...props} />
    </header>
  )
}

export default RefactoredNavbar
