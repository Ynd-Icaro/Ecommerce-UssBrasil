'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart, 
  Search, 
  X, 
  ChevronDown,
  SlidersHorizontal,
  Package
} from 'lucide-react'
import data from '@/db.json'
import EnhancedProductCard from '@/components/product/enhanced-product-card'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Tipos
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

// Função para ajustar caminhos das imagens
const fixImagePath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

// Mapeamento de categorias para títulos e descrições
const categoryData: Record<string, {
  title: string
  description: string
  image: string
  keywords: string[]
}> = {
  'iphone': {
    title: 'iPhone',
    description: 'A revolução em suas mãos. Explore toda a linha iPhone com as últimas tecnologias da Apple.',
    image: '/categories/smartphones.jpg',
    keywords: ['iphone', 'smartphone', 'apple', 'ios']
  },
  'macbook': {
    title: 'MacBook',
    description: 'Poder e portabilidade em perfeita harmonia. Descubra os MacBooks para profissionais.',
    image: '/categories/computadores.jpg', 
    keywords: ['macbook', 'laptop', 'mac', 'apple', 'computador']
  },
  'ipad': {
    title: 'iPad',
    description: 'Criatividade sem limites. O iPad redefine o que é possível fazer com um tablet.',
    image: '/categories/tablets.jpg',
    keywords: ['ipad', 'tablet', 'apple', 'ipados']
  },
  'apple-watch': {
    title: 'Apple Watch',
    description: 'Seu parceiro de saúde e fitness. Monitore sua vida com estilo e precisão.',
    image: '/categories/wearables.jpg',
    keywords: ['apple watch', 'smartwatch', 'wearable', 'saude']
  },
  'airpods': {
    title: 'AirPods',
    description: 'Áudio premium sem fios. Experimente a liberdade do som perfeito.',
    image: '/categories/audio.jpg',
    keywords: ['airpods', 'fone', 'audio', 'wireless']
  },
  'acessorios': {
    title: 'Acessórios',
    description: 'Complete sua experiência Apple. Acessórios originais e de qualidade premium.',
    image: '/categories/acessorios.jpg',
    keywords: ['acessorio', 'case', 'carregador', 'cabo']
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ category: string } | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Estados dos filtros
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [minRating, setMinRating] = useState(0)

  // Resolver params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  // Carregar produtos
  useEffect(() => {
    if (!resolvedParams?.category) return

    const category = resolvedParams.category
    const categoryInfo = categoryData[category]
    
    if (!categoryInfo) {
      notFound()
      return
    }

    // Filtrar produtos por categoria
    const categoryProducts = data.products
      .filter(product => {
        const productCategory = product.category.toLowerCase()
        const productName = product.name.toLowerCase()
        
        return categoryInfo.keywords.some(keyword => 
          productCategory.includes(keyword) || productName.includes(keyword)
        )
      })
      .map(p => ({
        ...p,
        image: fixImagePath(p.image),
        images: p.images?.map(fixImagePath) || [fixImagePath(p.image)],
        discountPrice: p.discountPrice || null,
        status: 'active' as const
      }))

    setProducts(categoryProducts)
    setLoading(false)
  }, [resolvedParams])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products]

    // Busca por texto
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por preço
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Filtro por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      )
    }

    // Filtro por rating
    if (minRating > 0) {
      filtered = filtered.filter(product => (product.rating || 0) >= minRating)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price)
        case 'price-high':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        case 'featured':
        default:
          return b.featured === a.featured ? 0 : b.featured ? 1 : -1
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, priceRange, selectedBrands, minRating, sortBy])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading || !resolvedParams) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  const category = resolvedParams.category
  const categoryInfo = categoryData[category]

  if (!categoryInfo) {
    notFound()
  }

  const uniqueBrands = [...new Set(products.map(p => p.brand))]

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-uss-primary via-uss-secondary to-purple-600 text-white py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Package className="h-8 w-8 lg:h-10 lg:w-10 mr-3" />
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold">
                {categoryInfo.title}
              </h1>
            </div>
            <p className="text-lg lg:text-xl xl:text-2xl opacity-90 mb-8 leading-relaxed">
              {categoryInfo.description}
            </p>
            <div className="flex items-center justify-center gap-8 text-sm lg:text-base">
              <div>
                <span className="block text-2xl lg:text-3xl font-bold">{products.length}</span>
                <span className="opacity-75">Produtos</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold">{uniqueBrands.length}</span>
                <span className="opacity-75">Marcas</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold">
                  {products.filter(p => p.discountPrice && p.discountPrice < p.price).length}
                </span>
                <span className="opacity-75">Ofertas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controles e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          {/* Barra superior */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-uss-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Controles */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filtros</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-uss-primary/20"
              >
                <option value="featured">Destaques</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
                <option value="newest">Mais Recentes</option>
              </select>

              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros avançados */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Filtro por preço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de Preço
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Filtro por marca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marcas
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand])
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand))
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por avaliação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação Mínima
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm ml-1">ou mais</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Limpar filtros */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setPriceRange([0, 10000])
                    setSelectedBrands([])
                    setMinRating(0)
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} de {products.length} produtos
          </p>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EnhancedProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setPriceRange([0, 10000])
                setSelectedBrands([])
                setMinRating(0)
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
