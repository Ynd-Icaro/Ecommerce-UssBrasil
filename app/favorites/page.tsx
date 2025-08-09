'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  ShoppingCart, 
  X, 
  Filter, 
  Grid, 
  List,
  Share2,
  Star,
  Eye,
  Package
} from 'lucide-react'

interface FavoriteItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  category: string
  addedAt: string
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 8999.00,
      originalPrice: 9999.00,
      image: '/Produtos/iphone15promax.png',
      rating: 4.8,
      reviews: 1247,
      inStock: true,
      category: 'Smartphones',
      addedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'MacBook Pro M3',
      brand: 'Apple',
      price: 12999.00,
      image: '/Produtos/macbookpro.png',
      rating: 4.9,
      reviews: 856,
      inStock: true,
      category: 'Notebooks',
      addedAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'JBL Charge 5',
      brand: 'JBL',
      price: 699.00,
      originalPrice: 799.00,
      image: '/Produtos/jblcharge5.png',
      rating: 4.6,
      reviews: 432,
      inStock: false,
      category: 'Audio',
      addedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'DJI Mini 4 Pro',
      brand: 'DJI',
      price: 4299.00,
      image: '/Produtos/djimini4pro.png',
      rating: 4.7,
      reviews: 298,
      inStock: true,
      category: 'Drones',
      addedAt: '2024-01-05'
    }
  ])

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('recent')
  const [filterCategory, setFilterCategory] = useState('all')

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const addToCart = (item: FavoriteItem) => {
    // Implementar lógica do carrinho
    console.log('Adicionado ao carrinho:', item.name)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const filteredFavorites = favorites
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'recent':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })

  const categories = Array.from(new Set(favorites.map(item => item.category)))

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-uss-gray-50 to-white pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="bg-gradient-uss-primary p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-uss-gray-900 mb-4">
              Sua lista está vazia
            </h1>
            <p className="text-uss-gray-600 mb-8">
              Adicione produtos aos seus favoritos para encontrá-los facilmente depois
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-uss-primary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <span>Explorar Produtos</span>
              <Package className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-uss-gray-50 to-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-uss-gray-900 mb-2">
                Meus Favoritos
              </h1>
              <p className="text-uss-gray-600">
                {filteredFavorites.length} {filteredFavorites.length === 1 ? 'produto' : 'produtos'} na sua lista
              </p>
            </div>
            
            <button className="flex items-center space-x-2 text-uss-primary hover:text-uss-secondary transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Compartilhar Lista</span>
            </button>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-uss-gray-300 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-uss-gray-300 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent"
              >
                <option value="recent">Mais recentes</option>
                <option value="name">Nome A-Z</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-uss-primary text-white' 
                    : 'bg-uss-gray-200 text-uss-gray-600 hover:bg-uss-gray-300'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-uss-primary text-white' 
                    : 'bg-uss-gray-200 text-uss-gray-600 hover:bg-uss-gray-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFavorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-uss-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-uss-gray-50 to-uss-gray-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/fallback-product.png'
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {item.originalPrice && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </span>
                      )}
                      {!item.inStock && (
                        <span className="bg-uss-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Indisponível
                        </span>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/product/${item.id}`}
                        className="bg-white/80 hover:bg-white text-uss-gray-600 p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-uss-gray-900 line-clamp-2 group-hover:text-uss-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-uss-gray-600">{item.brand}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-uss-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-uss-gray-500">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-uss-primary">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-uss-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-uss-gray-500">
                        Adicionado em {formatDate(item.addedAt)}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className="w-full bg-gradient-uss-primary text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{item.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFavorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-uss-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-uss-gray-50 to-uss-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.src = '/fallback-product.png'
                        }}
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-uss-gray-500/20 flex items-center justify-center">
                          <span className="text-uss-gray-600 text-xs font-medium bg-white px-2 py-1 rounded">
                            Indisponível
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-uss-gray-900 hover:text-uss-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-uss-gray-600">{item.brand} • {item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromFavorites(item.id)}
                          className="text-uss-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-uss-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-uss-gray-500">
                          {item.rating} ({item.reviews} avaliações)
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        {/* Price and Date */}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xl font-bold text-uss-primary">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-uss-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-uss-gray-500">
                            Adicionado em {formatDate(item.addedAt)}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/product/${item.id}`}
                            className="flex items-center space-x-2 text-uss-primary hover:text-uss-secondary transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Ver Produto</span>
                          </Link>
                          <button
                            onClick={() => addToCart(item)}
                            disabled={!item.inStock}
                            className="bg-gradient-uss-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>{item.inStock ? 'Adicionar' : 'Indisponível'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Empty State for Filtered Results */}
        {filteredFavorites.length === 0 && favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="h-16 w-16 text-uss-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-uss-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-uss-gray-600 mb-6">
              Tente ajustar os filtros ou categorias
            </p>
            <button
              onClick={() => {
                setFilterCategory('all')
                setSortBy('recent')
              }}
              className="text-uss-primary hover:text-uss-secondary transition-colors"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
