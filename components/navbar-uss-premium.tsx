'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronDownIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useUSSTheme } from '@/hooks/use-uss-theme'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  category: string
  marca: string
  image: string
  featured: boolean
}

interface BrandData {
  name: string
  logo: string
  heroVideo?: string
  products: Product[]
  categories: string[]
}

interface SearchResult {
  id: string
  name: string
  categoria: string
  marca: string
  price: number
  image: string
}

export default function USSNavbarPremium() {
  // Estados
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [activeBrand, setActiveBrand] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null)
  const [brandProducts, setBrandProducts] = useState<Record<string, Product[]>>({})
  const [isSearching, setIsSearching] = useState(false)
  
  // Refs
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const megaMenuTimer = useRef<NodeJS.Timeout | null>(null)
  const searchTimer = useRef<NodeJS.Timeout | null>(null)
  
  // Contexts
  const { cartItems, cartCount } = useCart()
  const { favorites } = useFavorites()
  const { theme, toggleTheme, isDark } = useUSSTheme()

  // Brands configuration
  const brands: BrandData[] = [
    {
      name: 'Apple',
      logo: '/public/icons/apple.svg',
      heroVideo: '/public/videos/apple/hero.mp4',
      products: [],
      categories: ['iPhone', 'iPad', 'Mac', 'Watch', 'AirPods']
    },
    {
      name: 'DJI',
      logo: '/public/icons/dji.svg',
      products: [],
      categories: ['Drones', 'Gimbals', 'Câmeras', 'Acessórios']
    },
    {
      name: 'JBL',
      logo: '/public/icons/jbl.svg',
      products: [],
      categories: ['Soundbars', 'Caixas', 'Fones', 'Portáteis']
    },
    {
      name: 'Xiaomi',
      logo: '/public/icons/xiaomi.svg',
      products: [],
      categories: ['Smartphones', 'Smart Home', 'Wearables', 'Acessórios']
    },
    {
      name: 'Geonav',
      logo: '/public/icons/geonav.svg',
      products: [],
      categories: ['GPS', 'Multimidia', 'Acessórios']
    }
  ]

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load products for brands
  useEffect(() => {
    const loadBrandProducts = async () => {
      try {
        const response = await fetch('/data/db.json')
        if (response.ok) {
          const data = await response.json()
          const productsByBrand: Record<string, Product[]> = {}
          
          brands.forEach(brand => {
            productsByBrand[brand.name.toLowerCase()] = data.products?.filter(
              (p: Product) => p.marca.toLowerCase() === brand.name.toLowerCase()
            ).slice(0, 8) || []
          })
          
          setBrandProducts(productsByBrand)
        }
      } catch (error) {
        console.error('Error loading brand products:', error)
      }
    }
    
    loadBrandProducts()
  }, [])

  // Search with debounce
  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    if (searchQuery.trim()) {
      setIsSearching(true)
      searchTimer.current = setTimeout(async () => {
        try {
          const response = await fetch('/data/db.json')
          if (response.ok) {
            const data = await response.json()
            const filtered = data.products?.filter((product: any) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 6) || []
            
            setSearchResults(filtered)
            setShowSearchResults(true)
          }
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      }, 300)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
      setIsSearching(false)
    }

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [searchQuery])

  // Mega menu hover handlers
  const handleMegaMenuEnter = () => {
    if (megaMenuTimer.current) {
      clearTimeout(megaMenuTimer.current)
    }
    megaMenuTimer.current = setTimeout(() => {
      setShowMegaMenu(true)
    }, 120) // 120ms delay to avoid accidental opens
  }

  const handleMegaMenuLeave = () => {
    if (megaMenuTimer.current) {
      clearTimeout(megaMenuTimer.current)
    }
    setShowMegaMenu(false)
    setActiveBrand('')
  }

  const handleBrandHover = (brandName: string) => {
    setActiveBrand(brandName)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-navbar shadow-uss-md' 
          : 'bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm'
        }
        border-b border-light-100 dark:border-dark-700
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center space-x-2 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-uss-blue to-uss-turquoise rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-200">
                  USS
                </div>
                <span className="text-uss-h3 font-bold text-uss-blue dark:text-uss-turquoise">
                  Brasil
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              
              {/* Produtos com Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200 py-2">
                  <span className="font-medium">Produtos</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {showMegaMenu && (
                    <motion.div
                      ref={megaMenuRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl"
                    >
                      <div className="bg-white dark:bg-dark-900 rounded-uss shadow-uss-lg border border-light-100 dark:border-dark-700 overflow-hidden">
                        <div className="grid grid-cols-5 h-96">
                          
                          {/* Brands Sidebar */}
                          <div className="bg-light-50 dark:bg-dark-800 p-4 space-y-2">
                            {brands.map((brand) => (
                              <button
                                key={brand.name}
                                onMouseEnter={() => handleBrandHover(brand.name)}
                                className={`
                                  w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                                  ${activeBrand === brand.name
                                    ? 'bg-uss-blue text-white shadow-uss-md'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-700'
                                  }
                                `}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded" />
                                  <span className="font-medium">{brand.name}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Brand Content */}
                          <div className="col-span-4 p-6">
                            {activeBrand === 'Apple' && (
                              <div className="h-full">
                                {/* Apple Hero Video */}
                                <div className="mb-6">
                                  <div className="relative w-full h-32 bg-gradient-to-r from-gray-900 to-gray-700 rounded-uss overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white text-lg font-semibold">iPhone 16 Pro</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Apple Categories */}
                                <div className="grid grid-cols-5 gap-4">
                                  {['iPhone', 'iPad', 'Mac', 'Watch', 'AirPods'].map((category) => (
                                    <Link
                                      key={category}
                                      href={`/marca/apple/${category.toLowerCase()}`}
                                      className="group text-center"
                                    >
                                      <div className="w-16 h-16 bg-light-100 dark:bg-dark-700 rounded-uss mx-auto mb-2 group-hover:scale-105 transition-transform duration-200" />
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-uss-blue dark:group-hover:text-uss-turquoise">
                                        {category}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {activeBrand && activeBrand !== 'Apple' && brandProducts[activeBrand.toLowerCase()] && (
                              <div className="h-full">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                  {activeBrand} - Produtos em Destaque
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                  {brandProducts[activeBrand.toLowerCase()].slice(0, 8).map((product) => (
                                    <Link
                                      key={product.id}
                                      href={`/product/${product.slug}`}
                                      className="group"
                                    >
                                      <div className="aspect-square bg-light-100 dark:bg-dark-700 rounded-lg mb-2 overflow-hidden">
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          width={120}
                                          height={120}
                                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                          loading="lazy"
                                        />
                                      </div>
                                      <h4 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-uss-blue dark:group-hover:text-uss-turquoise">
                                        {product.name}
                                      </h4>
                                      <p className="text-xs text-uss-blue dark:text-uss-turquoise font-semibold mt-1">
                                        R$ {(product.discountPrice || product.price).toLocaleString('pt-BR')}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Links */}
              <Link 
                href="/categorias" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Categorias
              </Link>
              
              <Link 
                href="/marcas" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Marcas
              </Link>
              
              <Link 
                href="/ofertas" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Ofertas
              </Link>
              
              <Link 
                href="/lancamentos" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Lançamentos
              </Link>
              
              <Link 
                href="/vip" 
                className="relative text-uss-gold hover:text-uss-gold/80 font-medium transition-colors duration-200 border border-uss-gold/30 px-3 py-1 rounded-lg hover:bg-uss-gold/5"
              >
                <SparklesIcon className="w-4 h-4 inline mr-1" />
                VIP
              </Link>
              
              <Link 
                href="/contato" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Contato
              </Link>
              
              <Link 
                href="/sobre" 
                className="text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise font-medium transition-colors duration-200"
              >
                Sobre
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-uss-cyan focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white transition-all duration-200"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin w-4 h-4 border-2 border-uss-cyan border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>
              </form>

              {/* Search Results */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-900 rounded-uss shadow-uss-lg border border-light-100 dark:border-dark-700 max-h-80 overflow-y-auto z-50"
                  >
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={`/product/${result.id}`}
                        className="flex items-center space-x-3 p-3 hover:bg-light-50 dark:hover:bg-dark-800 transition-colors duration-200"
                        onClick={() => {
                          setShowSearchResults(false)
                          setSearchQuery('')
                        }}
                      >
                        <Image
                          src={result.image}
                          alt={result.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain bg-light-100 dark:bg-dark-700 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {result.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {result.marca} • {result.categoria}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-uss-blue dark:text-uss-turquoise">
                          R$ {result.price.toLocaleString('pt-BR')}
                        </p>
                      </Link>
                    ))}
                    <div className="p-3 border-t border-light-100 dark:border-dark-700">
                      <button 
                        onClick={() => window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`}
                        className="text-sm text-uss-blue dark:text-uss-turquoise hover:underline"
                      >
                        Ver todos os resultados para "{searchQuery}"
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Favorites */}
              <Link href="/favoritos" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200">
                <HeartIcon className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-uss-cyan text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/carrinho" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-uss-cyan text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link href="/perfil" className="p-2 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200">
                <UserIcon className="w-6 h-6" />
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200"
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
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-uss-blue dark:hover:text-uss-turquoise transition-colors duration-200"
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-dark-900 border-t border-light-100 dark:border-dark-700"
            >
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
                        className="w-full pl-10 pr-4 py-3 bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 rounded-uss focus:outline-none focus:ring-2 focus:ring-uss-cyan focus:border-transparent"
                      />
                    </div>
                  </form>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  
                  {/* Produtos com acordeão */}
                  <div>
                    <button
                      onClick={() => setExpandedBrand(expandedBrand === 'produtos' ? null : 'produtos')}
                      className="flex items-center justify-between w-full py-3 text-left text-gray-900 dark:text-white font-medium"
                    >
                      <span>Produtos</span>
                      <ChevronRightIcon className={`w-5 h-5 transition-transform duration-200 ${expandedBrand === 'produtos' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedBrand === 'produtos' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 space-y-2"
                        >
                          {brands.map((brand) => (
                            <div key={brand.name}>
                              <button
                                onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
                                className="flex items-center justify-between w-full py-2 text-left text-gray-700 dark:text-gray-300"
                              >
                                <span>{brand.name}</span>
                                <ChevronRightIcon className={`w-4 h-4 transition-transform duration-200 ${expandedBrand === brand.name ? 'rotate-90' : ''}`} />
                              </button>
                              
                              <AnimatePresence>
                                {expandedBrand === brand.name && brandProducts[brand.name.toLowerCase()] && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-4 grid grid-cols-2 gap-3 py-2"
                                  >
                                    {brandProducts[brand.name.toLowerCase()].slice(0, 4).map((product) => (
                                      <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="block"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        <div className="flex items-center space-x-3">
                                          <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 object-contain bg-light-100 dark:bg-dark-700 rounded"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                              {product.name}
                                            </p>
                                            <p className="text-xs text-uss-blue dark:text-uss-turquoise">
                                              R$ {(product.discountPrice || product.price).toLocaleString('pt-BR')}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Links */}
                  {[
                    { href: '/categorias', label: 'Categorias' },
                    { href: '/marcas', label: 'Marcas' },
                    { href: '/ofertas', label: 'Ofertas' },
                    { href: '/lancamentos', label: 'Lançamentos' },
                    { href: '/contato', label: 'Contato' },
                    { href: '/sobre', label: 'Sobre' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-3 text-gray-700 dark:text-gray-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* VIP Link */}
                  <Link
                    href="/vip"
                    className="flex items-center py-3 text-uss-gold font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    VIP
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Overlay for search results */}
      <AnimatePresence>
        {showSearchResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearchResults(false)}
            className="fixed inset-0 z-30"
          />
        )}
      </AnimatePresence>
    </>
  )
}
