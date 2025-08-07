'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, ShoppingBag, Search, X, Menu, ChevronDown, Home, Package, Percent, Phone, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './login-modal'
import data from '@/db.json'

// Tipos
export type Product = {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountPrice: number | null
  image: string
  images: string[]
  category: string
  stock: number
  status: 'active'
  tags: string[]
  featured: boolean
  rating: number
  totalReviews: number
  colors: string[]
  createdAt: string
  specifications: object
  paymentOptions: number
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

// Função utilitária para formatar preço
function formatPrice(price: number) {
  return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

// Extrair produtos do objeto data
const productsData = data.products as Product[]

// Configuração das categorias principais
const mainCategories: MainCategory[] = [
  {
    name: 'iPhone',
    slug: 'iphone',
    description: 'A experiência iPhone mais avançada',
    image: '/Produtos/Apple/Iphone 16 Pro.png',
    count: 15,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('iphone') || 
      p.category.toLowerCase().includes('iphone')
    )
  },
  {
    name: 'Mac',
    slug: 'mac',
    description: 'Poder computacional sem limites',
    image: '/Produtos/Apple/Macbook Pro.png',
    count: 8,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('mac') || 
      p.name.toLowerCase().includes('imac') ||
      p.category.toLowerCase().includes('mac')
    )
  },
  {
    name: 'Apple Watch',
    slug: 'watch',
    description: 'O futuro da saúde no seu pulso',
    image: '/Produtos/Apple/Watch Series 10.png',
    count: 4,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('watch') || 
      p.category.toLowerCase().includes('watch')
    )
  },
  {
    name: 'AirPods',
    slug: 'airpods',
    description: 'Som mágico em todos os lugares',
    image: '/Produtos/Apple/Air Pods Max.png',
    count: 5,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('airpods') || 
      p.category.toLowerCase().includes('airpods')
    )
  }
]

// Configuração das marcas
const brands: Brand[] = [
  {
    key: 'apple',
    name: 'Apple',
    logo: '/imagens/apple/apple-logo.png',
    description: 'Tecnologia que transforma. iPhone, Mac, iPad, Apple Watch e AirPods.',
    products: productsData
      .filter((p) => p.brand === 'Apple')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'xiaomi',
    name: 'Xiaomi',
    logo: '/imagens/xiaomi/xiaomi-logo.png',
    description: 'Inovação para todos. Smartphones, tablets e muito mais.',
    products: productsData
      .filter((p) => p.brand === 'Xiaomi')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'jbl',
    name: 'JBL',
    logo: '/imagens/jbl/jbl-logo.png',
    description: 'Som JBL Original. Grave poderoso, agudos cristalinos.',
    products: productsData
      .filter((p) => p.brand === 'JBL')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  }
]

// Desktop Search Component
function DesktopSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredProducts = brands.flatMap(b =>
        b.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 6)
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="w-96 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] transition-all"
        />
      </div>

      {/* Search Results */}
      {isSearchFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Produtos</h3>
            <div className="space-y-3">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/fallback-product.png'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-[#20b2aa] font-semibold">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
            {searchResults.length > 0 && (
              <Link
                href={`/produtos?q=${encodeURIComponent(searchQuery)}`}
                className="block mt-4 text-center py-2 text-[#20b2aa] font-medium hover:bg-[#20b2aa]/5 rounded-lg transition-colors"
              >
                Ver todos os resultados
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile Menu Component
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<'main' | 'categories' | 'brands'>('main')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredProducts = brands.flatMap(b =>
        b.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 6)
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute left-0 top-0 h-full w-[75vw] min-w-[280px] bg-white shadow-2xl overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white">
            <Link href="/" className="text-2xl font-bold" onClick={onClose}>
              USSBRASIL
            </Link>
            <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] transition-all text-sm"
              />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produto/${product.id}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white transition-colors"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/fallback-product.png'
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <p className="text-[#20b2aa] font-semibold text-sm">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === 'main' && (
              <div className="p-6">
                <div className="space-y-3">
                  <Link href="/" className="flex items-center space-x-4 text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50" onClick={onClose}>
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Início</span>
                  </Link>
                  
                  <button 
                    onClick={() => setActiveSection('categories')}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <Package className="h-5 w-5" />
                      <span className="font-medium">Categorias</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transform -rotate-90" />
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('brands')}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <Star className="h-5 w-5" />
                      <span className="font-medium">Marcas</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transform -rotate-90" />
                  </button>
                  
                  <Link href="/produtos" className="flex items-center space-x-4 text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50" onClick={onClose}>
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Todos os Produtos</span>
                  </Link>
                  
                  <Link href="/ofertas" className="flex items-center space-x-4 text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50" onClick={onClose}>
                    <Percent className="h-5 w-5" />
                    <span className="font-medium">Ofertas</span>
                  </Link>
                  
                  <Link href="/contato" className="flex items-center space-x-4 text-gray-700 hover:text-[#20b2aa] transition-colors p-4 rounded-lg hover:bg-gray-50" onClick={onClose}>
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Contato</span>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === 'categories' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <button 
                    onClick={() => setActiveSection('main')}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                  </button>
                  <h3 className="font-semibold text-gray-900 text-lg">Categorias</h3>
                </div>
                
                <div className="space-y-3">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categoria/${category.slug}`}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={fixPath(category.image)}
                          alt={category.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/fallback-product.png'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900 group-hover:text-[#20b2aa] transition-colors block">
                          {category.name}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{category.description}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'brands' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <button 
                    onClick={() => setActiveSection('main')}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                  </button>
                  <h3 className="font-semibold text-gray-900 text-lg">Marcas</h3>
                </div>
                
                <div className="space-y-4">
                  {brands.map((brand) => (
                    <Link
                      key={brand.key}
                      href={`/produtos?marca=${brand.key}`}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/fallback-product.png'
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900 group-hover:text-[#20b2aa] transition-colors block">
                          {brand.name}
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{brand.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  onClose()
                  document.dispatchEvent(new CustomEvent('openLoginModal'))
                }}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-[#20b2aa] transition-colors py-3 px-4 rounded-lg hover:bg-white"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Entrar</span>
              </button>
              <button 
                onClick={() => {
                  onClose()
                  document.dispatchEvent(new CustomEvent('openCartModal'))
                }}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-[#20b2aa] transition-colors py-3 px-4 rounded-lg hover:bg-white"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">Carrinho</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Cart Modal Component  
function CartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cartItems] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      price: 8999.99,
      quantity: 1,
      image: '/Produtos/Apple/iphone-15-pro-max.jpg'
    }
  ])

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (!open) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-end bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="bg-white w-full sm:w-[500px] h-full sm:h-[90vh] sm:rounded-l-2xl shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Carrinho de Compras</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
                <p className="text-gray-600">Adicione produtos para começar suas compras</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={fixPath(item.image)}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#20b2aa] font-semibold">{formatPrice(item.price)}</span>
                        <div className="flex items-center space-x-2">
                          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">-</button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#20b2aa]">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-center block"
                onClick={onClose}
              >
                Finalizar Compra
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main Navbar Component
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginOpen(true)
    const handleOpenCart = () => setIsCartOpen(true)
    
    document.addEventListener('openLoginModal', handleOpenLogin)
    document.addEventListener('openCartModal', handleOpenCart)
    
    return () => {
      document.removeEventListener('openLoginModal', handleOpenLogin)
      document.removeEventListener('openCartModal', handleOpenCart)
    }
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Mobile Layout */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
                <Link href="/" className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#20b2aa] bg-clip-text text-transparent hover:scale-105 transition-transform">
                  USSBRASIL
                </Link>
              </div>

              {/* Mobile icons */}
              <div className="flex items-center space-x-1 lg:hidden">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                  aria-label="Entrar"
                >
                  <User className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                  aria-label="Carrinho"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-[#20b2aa] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                    2
                  </span>
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Link>
              
              <Link href="/produtos" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Package className="h-4 w-4" />
                <span>Produtos</span>
              </Link>
              
              <Link href="/ofertas" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Percent className="h-4 w-4" />
                <span>Ofertas</span>
              </Link>
              
              <Link href="/contato" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Phone className="h-4 w-4" />
                <span>Contato</span>
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <DesktopSearch />
              
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                aria-label="Entrar"
              >
                <User className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                aria-label="Carrinho"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#20b2aa] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          console.log('Login successful:', user)
        }}
      />
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
