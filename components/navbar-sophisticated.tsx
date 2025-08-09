'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { User, ShoppingBag, Search, X, Menu, ChevronDown, Home, Package, Percent, Phone, Star, Shield, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './login-modal'
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
    logo: '/Empresa/02.png',
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

export default function SophisticatedNavbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Ocultar navbar e footer em páginas admin
  const isAdminPage = pathname?.startsWith('/admin')
  
  if (isAdminPage) {
    return null
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
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
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-lg'
        }`}
      >
        {/* Top Bar - Informações importantes */}
        <div className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white text-sm py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Frete grátis em compras acima de R$ 299</span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Garantia oficial Apple</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <Link href="/vip" className="flex items-center space-x-1 hover:text-uss-off-white transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Clube VIP</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/Empresa/02.png"
                  alt="USS Brasil"
                  width={50}
                  height={50}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  priority
                />
                {/* Remove o span USS Brasil conforme solicitado */}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('categorias')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-uss-primary transition-colors font-medium">
                  <span>Categorias</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'categorias' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[600px] z-50"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {mainCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-uss-primary/10 to-uss-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Package className="h-6 w-6 text-uss-primary" />
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

              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('marcas')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-uss-primary transition-colors font-medium">
                  <span>Marcas</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'marcas' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[400px] z-50"
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {brandGroups.map((brand) => (
                          <Link
                            key={brand.key}
                            href={`/products?brand=${brand.key}`}
                            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
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

              <Link href="/ofertas" className="text-gray-700 hover:text-uss-primary transition-colors font-medium flex items-center space-x-1">
                <Percent className="h-4 w-4" />
                <span>Ofertas</span>
              </Link>

              <Link href="/novidades" className="text-gray-700 hover:text-uss-primary transition-colors font-medium">
                Novidades
              </Link>

              <Link href="/contato" className="text-gray-700 hover:text-uss-primary transition-colors font-medium">
                Contato
              </Link>
            </div>

            {/* Search Bar */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-uss-primary/20 focus:border-uss-primary transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {isSearchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50"
                  >
                    <div className="space-y-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
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
                            <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                            <span className="text-sm font-bold text-uss-primary">
                              {formatPrice(product.discountPrice || product.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group"
              >
                <User className="h-5 w-5 text-gray-600 group-hover:text-uss-primary transition-colors" />
              </button>

              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-uss-primary transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-uss-primary text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
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
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-uss-primary/20"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Início</span>
                  </Link>

                  <Link
                    href="/categories"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Categorias</span>
                  </Link>

                  <Link
                    href="/ofertas"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Percent className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Ofertas</span>
                  </Link>

                  <Link
                    href="/novidades"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Star className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Novidades</span>
                  </Link>

                  <Link
                    href="/contato"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5 text-uss-primary" />
                    <span className="font-medium">Contato</span>
                  </Link>

                  <Link
                    href="/vip"
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-uss-primary to-uss-secondary text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Star className="h-5 w-5" />
                    <span className="font-medium">Clube VIP</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals */}
      <LoginModal 
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
