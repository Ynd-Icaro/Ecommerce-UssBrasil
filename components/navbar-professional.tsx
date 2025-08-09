'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  User, 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  ChevronDown, 
  Package, 
  Percent, 
  Phone, 
  Star,
  Heart,
  Bell,
  Settings,
  MapPin,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfessionalLoginModal from './login-modal-professional'
import CartModal from './cart-modal-new'
import data from '@/db.json'

// Tipos
export type Product = {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountPrice?: number | null
  image: string
  images?: string[]
  category: string
  stock: number
  status: 'active'
  tags?: string[]
  featured: boolean
  rating?: number
  totalReviews?: number
  colors?: string[]
  createdAt?: string
  specifications?: object
  paymentOptions?: number
}

type Brand = {
  key: string
  name: string
  logo: string
  products: Product[]
  description: string
}

type MainCategory = {
  name: string
  slug: string
  description: string
  image: string
  count: number
  products: Product[]
}

// Função para corrigir caminhos de imagem
const fixPath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

// Dados processados
const products: Product[] = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  status: 'active' as const
}))

const brandGroups: Brand[] = [
  {
    key: 'apple',
    name: 'Apple',
    logo: '/icons/apple-logo.svg',
    description: 'Inovação e design premium',
    products: products.filter(p => p.brand.toLowerCase().includes('apple'))
  },
  {
    key: 'jbl',
    name: 'JBL',
    logo: '/icons/jbl-logo.svg',
    description: 'Som profissional',
    products: products.filter(p => p.brand.toLowerCase().includes('jbl'))
  },
  {
    key: 'xiaomi',
    name: 'Xiaomi',
    logo: '/icons/xiaomi-logo.svg',
    description: 'Tecnologia acessível',
    products: products.filter(p => p.brand.toLowerCase().includes('xiaomi'))
  },
  {
    key: 'dji',
    name: 'DJI',
    logo: '/icons/dji-logo.svg',
    description: 'Drones e câmeras',
    products: products.filter(p => p.brand.toLowerCase().includes('dji'))
  }
]

const mainCategories: MainCategory[] = [
  {
    name: 'iPhone',
    slug: 'iphone',
    description: 'A revolução em suas mãos',
    image: '/categories/smartphones.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('iphone')).length,
    products: products.filter(p => p.category.toLowerCase().includes('iphone'))
  },
  {
    name: 'MacBook',
    slug: 'macbook',
    description: 'Poder e portabilidade',
    image: '/categories/computadores.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('macbook')).length,
    products: products.filter(p => p.category.toLowerCase().includes('macbook'))
  },
  {
    name: 'iPad',
    slug: 'ipad',
    description: 'Criatividade sem limites',
    image: '/categories/tablets.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('ipad')).length,
    products: products.filter(p => p.category.toLowerCase().includes('ipad'))
  },
  {
    name: 'Apple Watch',
    slug: 'apple-watch',
    description: 'Saúde e fitness',
    image: '/categories/wearables.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('watch')).length,
    products: products.filter(p => p.category.toLowerCase().includes('watch'))
  },
  {
    name: 'AirPods',
    slug: 'airpods',
    description: 'Áudio premium',
    image: '/categories/audio.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('airpods')).length,
    products: products.filter(p => p.category.toLowerCase().includes('airpods'))
  },
  {
    name: 'Acessórios',
    slug: 'acessorios',
    description: 'Complete sua experiência',
    image: '/categories/acessorios.jpg',
    count: products.filter(p => p.category.toLowerCase().includes('acessorio')).length,
    products: products.filter(p => p.category.toLowerCase().includes('acessorio'))
  }
]

export default function ProfessionalNavbar() {
  const pathname = usePathname()
  
  // Ocultar navbar em páginas admin - DEVE ser verificado ANTES dos hooks
  const isAdminPage = pathname?.startsWith('/admin')
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  // Funções temporárias para carrinho e favoritos
  const addToCart = (productId: string) => {
    setCartCount(prev => prev + 1)
    // Aqui você adicionaria ao contexto do carrinho
  }

  const toggleFavorite = (productId: string) => {
    setFavoritesCount(prev => prev + 1)
    // Aqui você adicionaria ao contexto dos favoritos
  }

  // Retorno condicional APÓS todos os hooks
  if (isAdminPage) {
    return null
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
            : 'bg-white/95 backdrop-blur-lg'
        }`}
      >
        {/* Top Bar - Logo, Busca e Ações */}
        <div className="border-b border-gray-100/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <Image
                      src="/Empresa/02.png"
                      alt="USS Brasil"
                      width={45}
                      height={45}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                  </div>
                  <div className="hidden lg:block">
                    <span className="text-xl font-bold bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">
                      USS Brasil
                    </span>
                    <div className="text-xs text-gray-500 font-medium">Tecnologia Premium</div>
                  </div>
                </Link>
              </motion.div>

              {/* Search Bar - Central */}
              <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative hidden md:block">
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas ou categorias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full pl-14 pr-12 py-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-uss-primary/20 focus:border-uss-primary focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </motion.div>

                {/* Search Results */}
                <AnimatePresence>
                  {isSearchFocused && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="text-sm text-gray-500 mb-3 font-medium">
                        {searchResults.length} resultados encontrados
                      </div>
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="group"
                          >
                            <Link
                              href={`/product/${product.id}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 truncate group-hover:text-uss-primary transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-gray-500">{product.brand}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-lg font-bold text-uss-primary">
                                    {formatPrice(product.discountPrice || product.price)}
                                  </span>
                                  {product.discountPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                      {formatPrice(product.price)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toggleFavorite(product.id)
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Heart className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    addToCart(product.id)
                                  }}
                                  className="p-2 text-gray-400 hover:text-uss-primary transition-colors"
                                >
                                  <ShoppingBag className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions - Direita */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Localização */}
                <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>

                {/* Notificações */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 group hidden lg:block"
                >
                  <Bell className="h-5 w-5 text-gray-600 group-hover:text-uss-primary transition-colors" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>

                {/* Favoritos */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 group"
                >
                  <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                  {favoritesCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Perfil */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginModalOpen(true)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 group"
                >
                  <User className="h-5 w-5 text-gray-600 group-hover:text-uss-primary transition-colors" />
                </motion.button>

                {/* Carrinho */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartModalOpen(true)}
                  className="relative p-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-white text-uss-primary text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-600" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Navegação Principal */}
        <div className="hidden lg:block bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 h-14">
              {/* Produtos */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('produtos')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button 
                  whileHover={{ y: -1 }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-uss-primary transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-gray-50"
                >
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </motion.button>
                
                <AnimatePresence>
                  {activeDropdown === 'produtos' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[400px] z-50"
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {products.slice(0, 5).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                              <p className="text-sm text-gray-500">{product.brand}</p>
                              <span className="text-sm font-bold text-uss-primary">
                                {formatPrice(product.discountPrice || product.price)}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href="/products"
                          className="text-center py-3 text-uss-primary font-medium hover:text-uss-secondary transition-colors"
                        >
                          Ver todos os produtos →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Categorias */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('categorias')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button 
                  whileHover={{ y: -1 }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-uss-primary transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-gray-50"
                >
                  <span>Categorias</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </motion.button>
                
                <AnimatePresence>
                  {activeDropdown === 'categorias' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[600px] z-50"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {mainCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-14 h-14 bg-gradient-to-br from-uss-primary/10 to-uss-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Package className="h-7 w-7 text-uss-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{category.name}</h4>
                              <p className="text-sm text-gray-500">{category.description}</p>
                              <span className="text-xs text-uss-primary font-medium">{category.count} produtos</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Marcas */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('marcas')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button 
                  whileHover={{ y: -1 }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-uss-primary transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-gray-50"
                >
                  <span>Marcas</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </motion.button>
                
                <AnimatePresence>
                  {activeDropdown === 'marcas' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[500px] z-50"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {brandGroups.map((brand) => (
                          <Link
                            key={brand.key}
                            href={`/products?brand=${brand.key}`}
                            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                              <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={32}
                                height={32}
                                className="object-contain group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{brand.name}</h4>
                              <p className="text-sm text-gray-500">{brand.description}</p>
                              <span className="text-xs text-uss-primary font-medium">{brand.products.length} produtos</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Links diretos */}
              <motion.div whileHover={{ y: -1 }}>
                <Link 
                  href="/ofertas" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-red-50"
                >
                  <Percent className="h-4 w-4" />
                  <span>Ofertas</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -1 }}>
                <Link 
                  href="/novidades" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-uss-primary transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-uss-primary/5"
                >
                  <Star className="h-4 w-4" />
                  <span>Novidades</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -1 }}>
                <Link 
                  href="/contato" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-uss-primary transition-all duration-300 font-medium py-2 px-4 rounded-xl hover:bg-uss-primary/5"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contato</span>
                </Link>
              </motion.div>
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
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-uss-primary/20"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  <Link
                    href="/products"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Produtos</span>
                  </Link>

                  <Link
                    href="/categories"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Categorias</span>
                  </Link>

                  <Link
                    href="/ofertas"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Percent className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Ofertas</span>
                  </Link>

                  <Link
                    href="/novidades"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Star className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Novidades</span>
                  </Link>

                  <Link
                    href="/contato"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Contato</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals */}
      <ProfessionalLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
    </>
  )
}
