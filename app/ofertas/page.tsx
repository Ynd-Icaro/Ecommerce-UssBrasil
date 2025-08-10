'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Flame, Zap, ShoppingCart, Heart, Tag, Percent, Filter, Grid, List, Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import data from '@/db.json'

interface Product {
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

interface Offer extends Product {
  discount: number
  timeLeft: string
  isFlashSale: boolean
  isLimitedStock: boolean
  stockCount?: number
  badge?: string
}

// Função para calcular desconto
const calculateDiscount = (original: number, discounted: number | null) => {
  if (!discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}

// Função para ajustar caminhos das imagens
const fixImagePath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

// Converter produtos reais em ofertas
const createOffersFromProducts = (products: Product[]): Offer[] => {
  return products
    .filter(product => product.discountPrice && product.discountPrice < product.price)
    .map((product, index) => ({
      ...product,
      discount: calculateDiscount(product.price, product.discountPrice || null),
      timeLeft: index % 2 === 0 ? '2d 14h 32m' : '1d 8h 45m',
      isFlashSale: index % 3 === 0,
      isLimitedStock: (product.stock || 0) < 15,
      stockCount: (product.stock || 0) < 15 ? product.stock : undefined,
      badge: product.featured ? 'Mais Vendido' : undefined
    }))
    .sort((a, b) => b.discount - a.discount)
}

const offers: Offer[] = createOffersFromProducts(data.products as Product[])

export default function OffersPage() {
  const [filter, setFilter] = useState<'all' | 'flash' | 'limited' | 'category'>('all')
  const [sortBy, setSortBy] = useState<'discount' | 'price' | 'rating'>('discount')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [showFilters, setShowFilters] = useState(false)

  // Categorias únicas
  const categories = [...new Set(offers.map(offer => offer.category))]

  // Timer para ofertas relâmpago
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const filteredOffers = offers
    .filter(offer => {
      // Filtro por tipo
      if (filter === 'flash' && !offer.isFlashSale) return false
      if (filter === 'limited' && !offer.isLimitedStock) return false
      
      // Filtro por categoria
      if (selectedCategory && offer.category !== selectedCategory) return false
      
      // Filtro por busca
      if (searchQuery && !offer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !offer.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false
      
      // Filtro por preço
      const price = offer.discountPrice || offer.price
      if (price < priceRange[0] || price > priceRange[1]) return false
      
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount
      if (sortBy === 'price') return (a.discountPrice || a.price) - (b.discountPrice || b.price)
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen pt-24" style={{ background: 'var(--uss-bg)' }}>
      {/* Hero Section */}
      <div 
        className="text-white py-16"
        style={{ background: 'var(--uss-gradient-primary)' }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Flame className="h-10 w-10 mr-3" style={{ color: 'var(--uss-warning)' }} />
              <h1 className="text-5xl lg:text-7xl font-bold">
                Super Ofertas
              </h1>
              <Percent className="h-10 w-10 ml-3" style={{ color: 'var(--uss-success)' }} />
            </div>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              Descontos de até 70% em produtos selecionados. Aproveite antes que acabem!
            </p>
            
            {/* Contador de tempo */}
            <div 
              className="backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
                <Clock className="h-5 w-5 mr-2" />
                Ofertas terminam em:
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div 
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                  <div className="text-xs opacity-75">DIAS</div>
                </div>
                <div 
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs opacity-75">HORAS</div>
                </div>
                <div 
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs opacity-75">MIN</div>
                </div>
                <div 
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs opacity-75">SEG</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros e Controles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl shadow-lg p-6 mb-8"
          style={{ background: 'var(--uss-bg-light)' }}
        >
          {/* Barra de busca e controles principais */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" 
                style={{ color: 'var(--uss-text-secondary)' }}
              />
              <input
                type="text"
                placeholder="Buscar ofertas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  background: 'var(--uss-bg)',
                  borderColor: 'var(--uss-border)',
                  color: 'var(--uss-text-light)',
                  '--tw-ring-color': 'var(--uss-primary-alpha)'
                } as React.CSSProperties}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--uss-text-secondary)' }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = 'var(--uss-text-light)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = 'var(--uss-text-secondary)';
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all hover:shadow-md"
                style={{ 
                  background: 'var(--uss-surface)',
                  color: 'var(--uss-text-light)'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'var(--uss-bg)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'var(--uss-surface)';
                }}
              >
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>

              <div 
                className="flex items-center rounded-xl p-1"
                style={{ background: 'var(--uss-surface)' }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors`}
                  style={{
                    background: viewMode === 'grid' ? 'var(--uss-bg-light)' : 'transparent',
                    boxShadow: viewMode === 'grid' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <Grid className="h-4 w-4" style={{ color: 'var(--uss-text-light)' }} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors`}
                  style={{
                    background: viewMode === 'list' ? 'var(--uss-bg-light)' : 'transparent',
                    boxShadow: viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <List className="h-4 w-4" style={{ color: 'var(--uss-text-light)' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all hover:shadow-md`}
              style={{
                background: filter === 'all' ? 'var(--uss-primary)' : 'var(--uss-surface)',
                color: filter === 'all' ? 'var(--uss-text)' : 'var(--uss-text-secondary)',
                boxShadow: filter === 'all' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Todas ({offers.length})
            </button>
            <button
              onClick={() => setFilter('flash')}
              className={`px-4 py-2 rounded-full font-medium transition-all hover:shadow-md`}
              style={{
                background: filter === 'flash' ? 'var(--uss-error)' : 'var(--uss-surface)',
                color: filter === 'flash' ? 'white' : 'var(--uss-text-secondary)',
                boxShadow: filter === 'flash' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Zap className="w-4 h-4 inline mr-1" />
              Flash Sale ({offers.filter(o => o.isFlashSale).length})
            </button>
            <button
              onClick={() => setFilter('limited')}
              className={`px-4 py-2 rounded-full font-medium transition-all hover:shadow-md`}
              style={{
                background: filter === 'limited' ? 'var(--uss-warning)' : 'var(--uss-surface)',
                color: filter === 'limited' ? 'white' : 'var(--uss-text-secondary)',
                boxShadow: filter === 'limited' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Estoque Limitado ({offers.filter(o => o.isLimitedStock).length})
            </button>
          </div>

          {/* Filtros avançados */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              style={{ borderColor: 'var(--uss-border)' }}
            >
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'var(--uss-bg)',
                    borderColor: 'var(--uss-border)',
                    color: 'var(--uss-text-light)',
                    '--tw-ring-color': 'var(--uss-primary-alpha)'
                  } as React.CSSProperties}
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'discount' | 'price' | 'rating')}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'var(--uss-bg)',
                    borderColor: 'var(--uss-border)',
                    color: 'var(--uss-text-light)',
                    '--tw-ring-color': 'var(--uss-primary-alpha)'
                  } as React.CSSProperties}
                >
                  <option value="discount">Maior Desconto</option>
                  <option value="price">Menor Preço</option>
                  <option value="rating">Melhor Avaliação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                  Faixa de Preço: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1 accent-uss-primary"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1 accent-uss-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Produtos */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}
            >
              {/* Badge de desconto */}
              {offer.discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{offer.discount}%
                </div>
              )}

              {/* Flash Sale Badge */}
              {offer.isFlashSale && (
                <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  FLASH
                </div>
              )}

              {/* Imagem */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'} overflow-hidden`}>
                <Image
                  src={fixImagePath(offer.image)}
                  alt={offer.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Conteúdo */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-gray-500 font-medium">{offer.brand}</span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{offer.name}</h3>

                {/* Rating */}
                {offer.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < offer.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({offer.totalReviews || 0})
                    </span>
                  </div>
                )}

                {/* Preços */}
                <div className="mb-4">
                  {offer.discountPrice ? (
                    <div>
                      <span className="text-2xl font-bold text-uss-primary">
                        {formatCurrency(offer.discountPrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatCurrency(offer.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(offer.price)}
                    </span>
                  )}
                </div>

                {/* Estoque limitado */}
                {offer.isLimitedStock && offer.stockCount && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-orange-600 mb-1">
                      <span>Restam apenas {offer.stockCount}</span>
                      <span>{Math.round((offer.stockCount / 20) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${Math.round((offer.stockCount / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-2">
                  <Link
                    href={`/product/${offer.id}`}
                    className="flex-1 bg-uss-primary hover:bg-uss-primary/90 text-white px-4 py-3 rounded-xl font-medium transition-colors text-center"
                  >
                    Ver Detalhes
                  </Link>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resultado vazio */}
        {filteredOffers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma oferta encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <button
              onClick={() => {
                setFilter('all')
                setSearchQuery('')
                setSelectedCategory('')
                setPriceRange([0, 10000])
              }}
              className="bg-uss-primary text-white px-6 py-3 rounded-xl hover:bg-uss-primary/90 transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
