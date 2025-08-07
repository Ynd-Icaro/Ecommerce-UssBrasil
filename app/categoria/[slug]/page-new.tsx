'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Grid, List, SlidersHorizontal, Star, ShoppingCart, Heart, Eye, Filter, X, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import RotatingBanner from '@/components/rotating-banner'
import ProductImage from '@/components/ProductImage'

// Importar dados
import data from '@/db.json'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  images?: string[]
  rating?: number
  description?: string
  specifications?: Record<string, string>
  inStock?: boolean
  originalPrice?: number
  discount?: number
  isNew?: boolean
  isSale?: boolean
  reviews?: number
}

interface CategoryVideo {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  description?: string
}

interface MainCategory {
  name: string
  slug: string
  description: string
  video: string
  image: string
  count: number
  products: Product[]
  videos?: CategoryVideo[]
}

interface CategoryPageProps {
  params: { slug: string }
}

const productsData = data.products as Product[]

// Configuração das categorias principais com vídeos
const mainCategories: MainCategory[] = [
  {
    name: 'iPhone',
    slug: 'iphone',
    description: 'A experiência iPhone mais avançada',
    video: '/Videos/IphoneVideo.mp4',
    image: '/Produtos/Apple/Iphone 16 Pro.png',
    count: productsData.filter(p => p.name.toLowerCase().includes('iphone')).length,
    products: productsData.filter(p => p.name.toLowerCase().includes('iphone')),
    videos: [
      {
        id: '1',
        title: 'iPhone 16 Pro - Revolucionário',
        thumbnail: '/Produtos/Apple/Iphone 16 Pro.png',
        videoUrl: '/Videos/IphoneVideo.mp4',
        description: 'Descubra a nova geração de iPhones com tecnologia de ponta'
      },
      {
        id: '2',
        title: 'iPhone 15 - Inovação',
        thumbnail: '/Produtos/Apple/Iphone 15.png',
        videoUrl: '/Videos/IphoneVideo.mp4',
        description: 'Design premium e performance excepcional'
      }
    ]
  },
  {
    name: 'Mac',
    slug: 'mac',
    description: 'Poder e elegância em cada detalhe',
    video: '/Videos/MacVideo.mp4',
    image: '/Produtos/Apple/Macbook Pro.png',
    count: productsData.filter(p => p.name.toLowerCase().includes('mac')).length,
    products: productsData.filter(p => p.name.toLowerCase().includes('mac')),
    videos: [
      {
        id: '1',
        title: 'MacBook Pro M3 - Performance',
        thumbnail: '/Produtos/Apple/Macbook Pro.png',
        videoUrl: '/Videos/MacVideo.mp4',
        description: 'O MacBook mais poderoso já criado'
      }
    ]
  },
  {
    name: 'iPad',
    slug: 'ipad',
    description: 'Criatividade sem limites',
    video: '/Videos/IpadVideo.mp4',
    image: '/Produtos/Apple/Ipad Pro.png',
    count: productsData.filter(p => p.name.toLowerCase().includes('ipad')).length,
    products: productsData.filter(p => p.name.toLowerCase().includes('ipad')),
    videos: [
      {
        id: '1',
        title: 'iPad Pro - Criatividade',
        thumbnail: '/Produtos/Apple/Ipad Pro.png',
        videoUrl: '/Videos/IpadVideo.mp4',
        description: 'Transforme suas ideias em realidade'
      }
    ]
  },
  {
    name: 'AirPods',
    slug: 'airpods',
    description: 'Som excepcional, liberdade total',
    video: '/Videos/AirpodsVideo.mp4',
    image: '/Produtos/Apple/Airpods Pro.png',
    count: productsData.filter(p => p.name.toLowerCase().includes('airpods')).length,
    products: productsData.filter(p => p.name.toLowerCase().includes('airpods')),
    videos: [
      {
        id: '1',
        title: 'AirPods Pro - Áudio Imersivo',
        thumbnail: '/Produtos/Apple/Airpods Pro.png',
        videoUrl: '/Videos/AirpodsVideo.mp4',
        description: 'Experiência sonora revolucionária'
      }
    ]
  }
]

// Função para ordenação
const sortProducts = (products: Product[], sortBy: string): Product[] => {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-high':
      return [...products].sort((a, b) => b.price - a.price)
    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name))
    case 'rating':
      return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    default:
      return products
  }
}

// Função para filtros
const filterProducts = (products: Product[], filters: any): Product[] => {
  return products.filter(product => {
    // Filtro por marca
    if (filters.brand && !product.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
      return false
    }
    
    // Filtro por faixa de preço
    if (filters.minPrice && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false
    }
    
    // Filtro por disponibilidade
    if (filters.inStock && !product.inStock) {
      return false
    }
    
    // Filtro por avaliação
    if (filters.minRating && (product.rating || 0) < filters.minRating) {
      return false
    }
    
    return true
  })
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    minRating: 0
  })

  // Encontrar categoria
  const category = mainCategories.find(cat => cat.slug === slug)

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <Link href="/" className="text-[#20b2aa] hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  // Aplicar filtros e ordenação
  const filteredProducts = filterProducts(category.products, filters)
  const sortedProducts = sortProducts(filteredProducts, sortBy)

  // Obter marcas únicas
  const uniqueBrands = Array.from(new Set(category.products.map(p => p.brand)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Rotativo */}
      <div className="container mx-auto px-4 pt-6">
        <RotatingBanner 
          categorySlug={slug} 
          videos={category.videos || []} 
        />
      </div>

      {/* Filtros */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar de Filtros */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filtro por Marca */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
                >
                  <option value="">Todas as marcas</option>
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Preço */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de Preço
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
                  />
                </div>
              </div>

              {/* Filtro por Disponibilidade */}
              <div className="mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                    className="rounded border-gray-300 text-[#20b2aa] focus:ring-[#20b2aa]"
                  />
                  <span className="text-sm text-gray-700">Apenas em estoque</span>
                </label>
              </div>

              {/* Filtro por Avaliação */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação Mínima
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
                >
                  <option value={0}>Todas</option>
                  <option value={1}>1+ estrelas</option>
                  <option value={2}>2+ estrelas</option>
                  <option value={3}>3+ estrelas</option>
                  <option value={4}>4+ estrelas</option>
                  <option value={5}>5 estrelas</option>
                </select>
              </div>

              {/* Limpar Filtros */}
              <button
                onClick={() => setFilters({
                  brand: '',
                  minPrice: '',
                  maxPrice: '',
                  inStock: false,
                  minRating: 0
                })}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Cabeçalho */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white rounded-lg shadow p-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-gray-500">
                  {sortedProducts.length} produto{sortedProducts.length !== 1 ? 's' : ''} encontrado{sortedProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* Botão Filtros Mobile */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtros</span>
                </button>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa]"
                >
                  <option value="featured">Relevância</option>
                  <option value="name">Nome</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="rating">Melhor Avaliado</option>
                </select>

                {/* Modo de Visualização */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#20b2aa] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#20b2aa] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid de Produtos */}
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={
                    viewMode === 'grid'
                      ? 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                      : 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex'
                  }
                >
                  <div className={viewMode === 'grid' ? '' : 'w-48 flex-shrink-0'}>
                    <div className="relative aspect-square overflow-hidden">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Novo
                        </div>
                      )}
                      {product.isSale && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Oferta
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white rounded-full text-gray-700 hover:text-[#20b2aa] transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                      {viewMode === 'list' && (
                        <div className="ml-4 text-right">
                          <p className="text-2xl font-bold text-[#20b2aa]">
                            R$ {product.price.toLocaleString('pt-BR')}
                          </p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              R$ {product.originalPrice.toLocaleString('pt-BR')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    
                    {product.rating && (
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {product.reviews && (
                          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        )}
                      </div>
                    )}
                    
                    {viewMode === 'grid' && (
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-[#20b2aa]">
                          R$ {product.price.toLocaleString('pt-BR')}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toLocaleString('pt-BR')}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {viewMode === 'list' && product.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'Em estoque' : 'Indisponível'}
                      </span>
                      
                      <button
                        disabled={!product.inStock}
                        className="flex items-center space-x-2 bg-[#20b2aa] text-white px-4 py-2 rounded-lg hover:bg-[#1a9999] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mensagem quando não há produtos */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros para ver mais produtos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
