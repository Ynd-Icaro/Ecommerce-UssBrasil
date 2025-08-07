'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, ShoppingBag, Search, X, Menu, ChevronDown, Home, Package, Percent, Phone, Star, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './login-modal'

// Importar produtos do db.json
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
  video?: string
}

type Brand = {
  key: string
  name: string
  logo: string
  video: string
  categories: Category[]
  products: Product[]
  description: string
}

type Category = {
  name: string
  slug: string
  image: string
  count: number
  description: string
}

type MainCategory = {
  name: string
  slug: string
  description: string
  video: string
  image: string
  count: number
  products: Product[]
}

// Função utilitária para formatar preço
function formatPrice(price: number) {
  return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

// Função para ajustar caminhos das imagens e vídeos
const fixPath = (path: string) => {
  if (!path) return ''
  // Remove o prefixo "Ecommerce-UssBrasil/public/" e adiciona apenas "/"
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

// Extrair produtos do objeto data
const productsData = data.products as Product[]

// Configuração das categorias principais com vídeos

const mainCategories: MainCategory[] = [
  {
    name: 'iPhone',
    slug: 'iphone',
    description: 'A experiência iPhone mais avançada',
    video: '/Videos/IphoneVideo.mp4',
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
    video: '/Videos/Macs Video.mp4',
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
    video: '/Videos/Apple Watch.mp4',
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
    video: '/Videos/AirPods Video.webm',
    image: '/Produtos/Apple/Air Pods Max.png',
    count: 5,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('airpods') || 
      p.category.toLowerCase().includes('airpods')
    )
  },
  {
    name: 'Redmi Pro',
    slug: 'redmi-pro',
    description: 'Performance excepcional para todos',
    video: '/Videos/Redmi.mp4',
    image: '/Produtos/Xiomi/redmi-pro.png',
    count: 6,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('redmi') && 
      p.name.toLowerCase().includes('pro')
    )
  },
  {
    name: 'Poco',
    slug: 'poco',
    description: 'Velocidade e potência redefinidas',
    video: '/Videos/Poco.mp4', 
    image: '/Produtos/Xiomi/poco-x6.png',
    count: 4,
    products: productsData.filter(p => 
      p.name.toLowerCase().includes('poco') || 
      p.category.toLowerCase().includes('poco')
    )
  }
]

// Configuração das marcas com categorias completas
const brands: Brand[] = [
  {
    key: 'apple',
    name: 'Apple',
    logo: '/imagens/apple/apple-logo.png',
    video: '/videos/iPhone 16 Pro.mp4',
    description: 'Tecnologia que transforma. iPhone, Mac, iPad, Apple Watch e AirPods.',
    categories: [
      { name: 'iPhone', slug: 'iphone', image: '/imagens/apple/iphone-category.png', count: 15, description: 'A experiência iPhone mais avançada' },
      { name: 'Mac', slug: 'mac', image: '/imagens/apple/mac-category.png', count: 8, description: 'Poder computacional sem limites' },
      { name: 'iPad', slug: 'ipad', image: '/imagens/apple/ipad-category.png', count: 6, description: 'Versátil, poderoso e pessoal' },
      { name: 'Apple Watch', slug: 'watch', image: '/imagens/apple/watch-category.png', count: 4, description: 'O futuro da saúde no seu pulso' },
      { name: 'AirPods', slug: 'airpods', image: '/imagens/apple/airpods-category.png', count: 5, description: 'Som mágico em todos os lugares' },
      { name: 'Acessórios', slug: 'acessorios', image: '/imagens/apple/accessories-category.png', count: 12, description: 'Complete sua experiência Apple' }
    ],
    products: productsData
      .filter((p) => p.brand === 'Apple')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'dji',
    name: 'DJI',
    logo: '/imagens/dji/dji-logo.png',
    video: '/videos/DJI.mp4',
    description: 'O futuro dos drones. Capture perspectivas impossíveis.',
    categories: [
      { name: 'Drones', slug: 'drones', image: '/imagens/dji/drone-category.png', count: 8, description: 'Voe mais alto, capture mais' },
      { name: 'Câmeras', slug: 'cameras', image: '/imagens/dji/camera-category.png', count: 6, description: 'Estabilização profissional' },
      { name: 'Estabilizadores', slug: 'estabilizadores', image: '/imagens/dji/gimbal-category.png', count: 5, description: 'Movimentos suaves e precisos' },
      { name: 'Acessórios', slug: 'acessorios', image: '/imagens/dji/accessories-category.png', count: 10, description: 'Potencialize suas filmagens' }
    ],
    products: productsData
      .filter((p) => p.brand === 'DJI')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'jbl',
    name: 'JBL',
    logo: '/imagens/jbl/jbl-logo.png',
    video: '/videos/JBL.mp4',
    description: 'Som JBL Original. Grave poderoso, agudos cristalinos.',
    categories: [
      { name: 'Caixas de Som', slug: 'caixas', image: '/imagens/jbl/speaker-category.png', count: 12, description: 'Som potente onde você estiver' },
      { name: 'Fones de Ouvido', slug: 'fones', image: '/imagens/jbl/headphone-category.png', count: 8, description: 'Imersão total no seu som' },
      { name: 'Earbuds', slug: 'earbuds', image: '/imagens/jbl/earbud-category.png', count: 6, description: 'Liberdade sem fio' }
    ],
    products: productsData
      .filter((p) => p.brand === 'JBL')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'xiaomi',
    name: 'Xiaomi',
    logo: '/imagens/xiaomi/xiaomi-logo.png',
    video: '/videos/Xiaomi.mp4',
    description: 'Inovação para todos. Smartphones, tablets e muito mais.',
    categories: [
      { name: 'Smartphones', slug: 'smartphones', image: '/imagens/xiaomi/phone-category.png', count: 10, description: 'Tecnologia avançada acessível' },
      { name: 'Tablets', slug: 'tablets', image: '/imagens/xiaomi/tablet-category.png', count: 4, description: 'Produtividade e entretenimento' },
      { name: 'Smartwatch', slug: 'smartwatch', image: '/imagens/xiaomi/watch-category.png', count: 3, description: 'Saúde e fitness inteligente' },
      { name: 'Acessórios', slug: 'acessorios', image: '/imagens/xiaomi/accessories-category.png', count: 8, description: 'Ecossistema completo' }
    ],
    products: productsData
      .filter((p) => p.brand === 'Xiaomi')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  },
  {
    key: 'geonav',
    name: 'Geonav',
    logo: '/imagens/geonav/geonav-logo.png',
    video: '/videos/Geonav.mp4',
    description: 'Conecte-se ao futuro. Carregadores, cabos e acessórios.',
    categories: [
      { name: 'Carregadores', slug: 'carregadores', image: '/imagens/geonav/charger-category.png', count: 15, description: 'Carregamento rápido e seguro' },
      { name: 'Cabos', slug: 'cabos', image: '/imagens/geonav/cable-category.png', count: 20, description: 'Conectividade premium' },
      { name: 'Power Banks', slug: 'powerbanks', image: '/imagens/geonav/powerbank-category.png', count: 8, description: 'Energia portátil' },
      { name: 'Suportes', slug: 'suportes', image: '/imagens/geonav/support-category.png', count: 6, description: 'Estabilidade e praticidade' }
    ],
    products: productsData
      .filter((p) => p.brand === 'Geonav')
      .map((p) => ({ ...p, image: fixPath(p.image), images: p.images?.map(fixPath) || [fixPath(p.image)] }))
  }
]

// ProductsDropdown component
function ProductsDropdownContent({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl p-8 min-w-[400px] relative mx-4"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrar na sua conta</h2>
            <p className="text-gray-600">Acesse sua conta para continuar suas compras</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#20b2aa] focus:ring-[#20b2aa]" />
                <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#20b2aa] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              Entrar
            </button>
            
            <div className="text-center">
              <span className="text-gray-600">Não tem conta? </span>
              <Link href="/register" className="text-[#20b2aa] font-semibold hover:underline">
                Criar conta
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Modal do Carrinho sofisticado
function CartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [cartItems] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      price: 8999.99,
      quantity: 1,
      image: '/Produtos/Apple/iphone-15-pro-max.jpg'
    },
    {
      id: '2', 
      name: 'AirPods Pro 2ª Geração',
      brand: 'Apple',
      price: 2299.99,
      quantity: 2,
      image: '/Produtos/Apple/airpods-pro-2.jpg'
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
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
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
                        <span className="text-[#20b2aa] font-semibold">
                          {formatPrice(item.price)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                            +
                          </button>
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
              <Link
                href="/cart"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-center block"
                onClick={onClose}
              >
                Ver Carrinho Completo
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Menu Mobile elegante
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<'main' | 'categories' | 'brands'>('main')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  // Pesquisa em tempo real
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

          {/* Search Bar Mobile */}
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearchResults([])
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Mobile */}
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
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <p className="text-[#20b2aa] font-semibold text-sm">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/produtos?q=${encodeURIComponent(searchQuery)}`}
                  className="block text-center py-2 text-[#20b2aa] font-medium text-sm hover:bg-[#20b2aa]/5 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Ver todos os resultados ({searchResults.length}+)
                </Link>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === 'main' && (
              <div className="p-6">
                {/* Menu Principal */}
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
                  
                  <Link href="/ofertas" className="flex items-center space-x-3 text-gray-700 hover:text-[#20b2aa] transition-colors p-3 rounded-lg hover:bg-gray-50" onClick={onClose}>
                    <Percent className="h-5 w-5" />
                    <span className="font-medium">Ofertas</span>
                  </Link>
                  
                  <Link href="/contato" className="flex items-center space-x-3 text-gray-700 hover:text-[#20b2aa] transition-colors p-3 rounded-lg hover:bg-gray-50" onClick={onClose}>
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
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={category.image}
                          alt={category.name}
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
                    <div key={brand.key} className="space-y-3">
                      <Link
                        href={`/produtos?marca=${brand.key}`}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                        onClick={onClose}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            width={32}
                            height={32}
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
                      
                      <div className="ml-13 space-y-1">
                        {brand.categories.slice(0, 3).map((category) => (
                          <Link
                            key={category.slug}
                            href={`/produtos?marca=${brand.key}&categoria=${category.slug}`}
                            className="block text-sm text-gray-500 hover:text-[#20b2aa] transition-colors py-1 px-3 rounded"
                            onClick={onClose}
                          >
                            {category.name} ({category.count})
                          </Link>
                        ))}
                      </div>
                    </div>
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
                  // Trigger login modal from parent
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
                  // Trigger cart modal from parent
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

// Modal de Busca Mobile
function MobileSearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [categoryResults, setCategoryResults] = useState<MainCategory[]>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredProducts = brands.flatMap(b =>
        b.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 8)

      const filteredCategories = mainCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)

      setSearchResults(filteredProducts)
      setCategoryResults(filteredCategories)
    } else {
      setSearchResults([])
      setCategoryResults([])
    }
  }, [searchQuery])

  if (!open) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-white shadow-2xl h-full overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white">
            <h2 className="text-xl font-bold">Buscar Produtos</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b bg-gray-50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Digite o nome do produto, marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] transition-all text-base shadow-sm"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearchResults([])
                    setCategoryResults([])
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery && (searchResults.length > 0 || categoryResults.length > 0) ? (
              <>
                {/* Category Results */}
                {categoryResults.length > 0 && (
                  <div className="p-6 border-b">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">Categorias</h3>
                    <div className="space-y-3">
                      {categoryResults.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categoria/${category.slug}`}
                          className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={onClose}
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={category.image}
                              alt={category.name}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/fallback-product.png'
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-base group-hover:text-[#20b2aa] transition-colors">{category.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                            <ChevronDown className="h-4 w-4 text-gray-400 transform -rotate-90 mt-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Results */}
                {searchResults.length > 0 && (
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">Produtos</h3>
                    <div className="space-y-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/produto/${product.id}`}
                          className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={onClose}
                        >
                          <div className="w-18 h-18 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={72}
                              height={72}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/fallback-product.png'
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 line-clamp-2 leading-tight text-base group-hover:text-[#20b2aa] transition-colors">{product.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{product.brand}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-[#20b2aa] font-bold text-lg">
                                {formatPrice(product.price)}
                              </span>
                              <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {searchResults.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                          href={`/produtos?q=${encodeURIComponent(searchQuery)}`}
                          className="block text-center py-4 bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02]"
                          onClick={onClose}
                        >
                          Ver todos os resultados
                          <ChevronDown className="inline h-4 w-4 ml-2 transform -rotate-90" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : searchQuery ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-gray-500 mb-4">Não encontramos produtos com "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSearchResults([])
                      setCategoryResults([])
                    }}
                    className="text-[#20b2aa] font-medium hover:underline"
                  >
                    Limpar busca
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#20b2aa] to-[#1a9999] flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">O que você está procurando?</h3>
                  <p className="text-gray-500">Digite acima para encontrar produtos, marcas e categorias</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Dropdown de Produtos sofisticado
function ProductsDropdown({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-100 shadow-2xl z-[80]"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Coluna da marca com vídeo */}
          <div className="col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden group mb-4">
              <video
                src={brand.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <p className="text-gray-600 mb-4">{brand.description}</p>
            
            <Link
              href={`/produtos?marca=${brand.key}`}
              className="inline-flex items-center text-[#20b2aa] font-semibold hover:underline"
            >
              Ver todos os produtos {brand.name}
              <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
            </Link>
          </div>
          
          {/* Grid de categorias */}
          <div className="col-span-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Categorias</h4>
            <div className="grid grid-cols-3 gap-6">
              {brand.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/produtos?marca=${brand.key}&categoria=${category.slug}`}
                  className="group block p-4 rounded-xl border border-gray-100 hover:border-[#20b2aa] hover:bg-[#20b2aa]/5 transition-all duration-300"
                >
                  <div className="relative w-full h-16 rounded-lg overflow-hidden bg-gray-50 mb-3">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h5 className="font-semibold text-gray-900 group-hover:text-[#20b2aa] transition-colors">
                    {category.name}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    {category.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    {category.count} produtos
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [categoryResults, setCategoryResults] = useState<MainCategory[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  useEffect(() => {
    if (searchQuery.trim()) {
      // Buscar produtos
      const filteredProducts = brands.flatMap(b =>
        b.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 4)

      // Buscar categorias
      const filteredCategories = mainCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 2)

      // Combinar resultados
      setSearchResults([...filteredProducts])
      setCategoryResults(filteredCategories)
    } else {
      setSearchResults([])
      setCategoryResults([])
    }
  }, [searchQuery])

  const handleDropdownEnter = (brandKey: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(brandKey)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100)
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-100'
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile layout */}
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

              {/* Logo - Centered on mobile */}
              <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
                <Link href="/" className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#1a1a1a] to-[#20b2aa] bg-clip-text text-transparent hover:scale-105 transition-transform">
                  USSBRASIL
                </Link>
              </div>

              {/* Mobile icons */}
              <div className="flex items-center space-x-1 lg:hidden">
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all hover:shadow-md"
                  aria-label="Buscar"
                >
                  <Search className="h-5 w-5" />
                </button>
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
              
              {/* Dropdown Produtos com Mega Menu */}
              <div className="relative group">
                <Link href="/produtos" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>
                
                {/* Mega Menu */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-white shadow-2xl border border-gray-100 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-2">
                  <div className="p-8">
                    <div className="grid grid-cols-5 gap-6">
                      {/* Categorias Principais */}
                      <div className="col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Categorias</h3>
                        <div className="space-y-3">
                          {mainCategories.map((category) => (
                            <Link 
                              key={category.slug}
                              href={`/categoria/${category.slug}`} 
                              className="block group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-[#20b2aa]/10 rounded-lg flex items-center justify-center">
                                  <Package className="w-3 h-3 text-[#20b2aa]" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#20b2aa] transition-colors">
                                    {category.name}
                                  </span>
                                  <div className="text-xs text-gray-500">
                                    {category.count} produtos
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                          <Link href="/produtos" className="block text-gray-600 hover:text-[#20b2aa] transition-colors mt-3 pt-3 border-t border-gray-100">
                            Ver todos os produtos
                          </Link>
                        </div>
                      </div>
                      
                      {/* Marcas em Cards */}
                      {brands.slice(0, 4).map((brand) => (
                        <div key={brand.key} className="col-span-1">
                          <div className="mb-4">
                            <Link href={`/produtos?marca=${brand.key}`} className="flex items-center space-x-2 group/brand">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-700">{brand.name.charAt(0)}</span>
                              </div>
                              <span className="text-lg font-bold text-gray-900 group-hover/brand:text-[#20b2aa] transition-colors">
                                {brand.name}
                              </span>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{brand.description}</p>
                          </div>
                          
                          <div className="space-y-2">
                            {brand.categories.slice(0, 4).map((category) => (
                              <Link
                                key={category.slug}
                                href={`/produtos?marca=${brand.key}&categoria=${category.slug}`}
                                className="block p-2 rounded-lg hover:bg-gray-50 group/cat"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 group-hover/cat:text-[#20b2aa] transition-colors">
                                    {category.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {category.count}
                                  </span>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={`/produtos?marca=${brand.key}`}
                              className="block text-sm text-[#20b2aa] hover:text-[#1a8f8a] font-medium mt-2"
                            >
                              Ver todos →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Produtos em Destaque */}
                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Produtos em Destaque</h3>
                      <div className="grid grid-cols-4 gap-4">
                        {brands.flatMap(b => b.products.filter(p => p.featured)).slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/produto/${product.id}`}
                            className="group/product border border-gray-100 rounded-lg p-3 hover:border-[#20b2aa] hover:shadow-md transition-all"
                          >
                            <div className="aspect-square bg-gray-50 rounded-lg mb-2 overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={120}
                                height={120}
                                className="w-full h-full object-cover group-hover/product:scale-105 transition-transform"
                              />
                            </div>
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[#20b2aa] font-bold text-sm">
                                {formatPrice(product.price)}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{product.rating}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dropdown Categorias */}
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Categorias</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Categorias Dropdown */}
                <div className="absolute top-full left-0 w-80 bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-2">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Categorias Principais</h3>
                    <div className="space-y-2">
                      {mainCategories.map((category) => (
                        <Link 
                          key={category.slug}
                          href={`/categoria/${category.slug}`} 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 group/cat transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#20b2aa] to-[#1a9999] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{category.name[0]}</span>
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-gray-900 group-hover/cat:text-[#20b2aa] transition-colors">
                              {category.name}
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5">{category.description}</p>
                          </div>
                          <span className="text-xs text-gray-400">{category.count}</span>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Ver Todas as Categorias */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        href="/categorias" 
                        className="flex items-center justify-center px-4 py-2 bg-[#20b2aa] text-white rounded-lg hover:bg-[#1a9999] transition-colors font-medium"
                      >
                        Ver Todas as Categorias
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link href="/ofertas" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Percent className="h-4 w-4" />
                <span>Ofertas</span>
              </Link>
              <Link href="/contato" className="flex items-center space-x-2 text-gray-700 hover:text-[#20b2aa] font-semibold transition-colors">
                <Phone className="h-4 w-4" />
                <span>Contato</span>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <AnimatePresence>
                  {isSearchExpanded ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <div className="relative">
                        <input
                          id="search-input"
                          type="text"
                          placeholder="Buscar produtos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                          className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] text-white placeholder-gray-400 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#20b2aa]"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <button
                          onClick={() => {
                            setIsSearchExpanded(false)
                            setSearchQuery('')
                            setSearchResults([])
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Search Results */}
                      {isSearchFocused && (searchResults.length > 0 || categoryResults.length > 0) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[70]">
                          {/* Category Results */}
                          {categoryResults.length > 0 && (
                            <>
                              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Categorias</span>
                              </div>
                              {categoryResults.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/categoria/${category.slug}`}
                                  className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
                                >
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                      src={category.image}
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
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                                    <p className="text-sm text-gray-500">{category.description}</p>
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {category.count} produtos
                                  </div>
                                </Link>
                              ))}
                            </>
                          )}
                          
                          {/* Product Results */}
                          {searchResults.length > 0 && (
                            <>
                              {categoryResults.length > 0 && (
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Produtos</span>
                                </div>
                              )}
                              {searchResults.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/produto/${product.id}`}
                                  className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                >
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
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
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.brand}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-400">{product.rating}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-[#20b2aa] font-semibold">
                                      {formatPrice(product.price)}
                                    </div>
                                    {product.discountPrice && (
                                      <div className="text-xs text-gray-400 line-through">
                                        {formatPrice(product.discountPrice)}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              ))}
                              <Link
                                href={`/produtos?q=${encodeURIComponent(searchQuery)}`}
                                className="block text-center py-3 text-[#20b2aa] font-medium hover:bg-[#20b2aa]/5 transition-colors"
                              >
                                Ver todos os resultados
                              </Link>
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <button
                      onClick={handleSearchToggle}
                      className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  )}
                </AnimatePresence>
              </div>

              {/* User */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#20b2aa] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Dropdowns */}
        <AnimatePresence>
          {activeDropdown && brands.find(b => b.key === activeDropdown) && (
            <ProductsDropdown
              brand={brands.find(b => b.key === activeDropdown)!}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          console.log('Login successful:', user)
          // Aqui você pode adicionar lógica para salvar o usuário logado
        }}
      />
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <MobileSearchModal open={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} />
    </>
  )
}
