'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ChevronDown,
  SlidersHorizontal,
  X,
  Star,
  Heart,
  ShoppingCart,
  ArrowUpDown,
  Check,
  Minus,
  Plus,
  RefreshCw,
  Package,
  DollarSign,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react'

// Import dos dados
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
  status: string
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
const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

// Dados dos produtos corrigidos
const products: Product[] = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  status: 'active',
  rating: p.rating || 4.5,
  totalReviews: p.totalReviews || Math.floor(Math.random() * 200) + 10,
  createdAt: p.createdAt || new Date().toISOString()
}))

interface FilterState {
  brands: string[]
  categories: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  featured: boolean
  discount: boolean
  colors: string[]
}

const initialFilterState: FilterState = {
  brands: [],
  categories: [],
  priceRange: [0, 50000],
  rating: 0,
  inStock: false,
  featured: false,
  discount: false,
  colors: []
}

const sortOptions = [
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliação' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'popular', label: 'Mais populares' }
]

const priceRanges = [
  { label: 'Até R$ 500', min: 0, max: 500 },
  { label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
  { label: 'R$ 1.000 - R$ 3.000', min: 1000, max: 3000 },
  { label: 'R$ 3.000 - R$ 5.000', min: 3000, max: 5000 },
  { label: 'R$ 5.000 - R$ 10.000', min: 5000, max: 10000 },
  { label: 'Acima de R$ 10.000', min: 10000, max: 50000 }
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const [isLoading, setIsLoading] = useState(false)

  // Obter dados únicos para filtros
  const uniqueBrands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brand))).sort()
  , [])
  
  const uniqueCategories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort()
  , [])
  
  const uniqueColors = useMemo(() => 
    Array.from(new Set(products.flatMap(p => p.colors || []))).filter(Boolean).sort()
  , [])

  // Aplicar filtros de URL
  useEffect(() => {
    if (searchParams) {
      const category = searchParams.get('category')
      const brand = searchParams.get('brand')
      
      if (category || brand) {
        setFilters(prev => ({
          ...prev,
          categories: category ? [category] : prev.categories,
          brands: brand ? [brand] : prev.brands
        }))
      }
    }
  }, [searchParams])

  // Aplicar filtros e ordenação
  useEffect(() => {
    setIsLoading(true)
    
    setTimeout(() => {
      let filtered = [...products]

      // Filtro de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }

      // Filtro de marcas
      if (filters.brands.length > 0) {
        filtered = filtered.filter(product => 
          filters.brands.includes(product.brand)
        )
      }

      // Filtro de categorias
      if (filters.categories.length > 0) {
        filtered = filtered.filter(product => 
          filters.categories.includes(product.category)
        )
      }

      // Filtro de faixa de preço
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price
        return price >= filters.priceRange[0] && price <= filters.priceRange[1]
      })

      // Filtro de avaliação
      if (filters.rating > 0) {
        filtered = filtered.filter(product => (product.rating || 0) >= filters.rating)
      }

      // Filtro de estoque
      if (filters.inStock) {
        filtered = filtered.filter(product => product.stock > 0)
      }

      // Filtro de produtos em destaque
      if (filters.featured) {
        filtered = filtered.filter(product => product.featured)
      }

      // Filtro de produtos com desconto
      if (filters.discount) {
        filtered = filtered.filter(product => product.discountPrice && product.discountPrice < product.price)
      }

      // Filtro de cores
      if (filters.colors.length > 0) {
        filtered = filtered.filter(product => 
          product.colors?.some(color => filters.colors.includes(color))
        )
      }

      // Ordenação
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-desc':
            return b.name.localeCompare(a.name)
          case 'price-asc':
            return (a.discountPrice || a.price) - (b.discountPrice || b.price)
          case 'price-desc':
            return (b.discountPrice || b.price) - (a.discountPrice || a.price)
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          case 'newest':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          case 'popular':
            return (b.totalReviews || 0) - (a.totalReviews || 0)
          default:
            return a.name.localeCompare(b.name)
        }
      })

      setFilteredProducts(filtered)
      setCurrentPage(1)
      setIsLoading(false)
    }, 300)
  }, [searchTerm, filters, sortBy])

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Handlers
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleArrayToggle = (key: 'brands' | 'categories' | 'colors', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }

  const clearFilters = () => {
    setFilters(initialFilterState)
    setSearchTerm('')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.brands.length > 0) count++
    if (filters.categories.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++
    if (filters.rating > 0) count++
    if (filters.inStock) count++
    if (filters.featured) count++
    if (filters.discount) count++
    if (filters.colors.length > 0) count++
    return count
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Produtos USS Brasil
          </h1>
          <p className="text-gray-600">
            Descobrindo {filteredProducts.length} de {products.length} produtos
          </p>
        </div>

        {/* Search and Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas ou categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-uss-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-uss-primary appearance-none bg-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' 
                  ? 'bg-uss-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' 
                  ? 'bg-uss-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filtros</span>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-uss-primary text-white text-xs rounded-full px-2 py-1">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${
            isFilterOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-80 space-y-6`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                <div className="flex items-center space-x-2">
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-uss-primary hover:text-uss-secondary flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Limpar</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Filters */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Filtros Rápidos</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">Em estoque</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.featured}
                        onChange={(e) => handleFilterChange('featured', e.target.checked)}
                        className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Produtos em destaque
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.discount}
                        onChange={(e) => handleFilterChange('discount', e.target.checked)}
                        className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Com desconto
                      </span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Faixa de Preço</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                          onChange={() => handleFilterChange('priceRange', [range.min, range.max])}
                          className="text-uss-primary focus:ring-uss-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Avaliação Mínima</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          className="text-uss-primary focus:ring-uss-primary"
                        />
                        <span className="ml-2 flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">& acima</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Marcas</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueBrands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleArrayToggle('brands', brand)}
                          className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categorias</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueCategories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleArrayToggle('categories', category)}
                          className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                {uniqueColors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Cores</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {uniqueColors.map((color) => (
                        <label key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.colors.includes(color)}
                            onChange={() => handleArrayToggle('colors', color)}
                            className="rounded border-gray-300 text-uss-primary focus:ring-uss-primary"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary"></div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar os filtros ou buscar por outros termos
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-uss-primary text-white rounded-lg hover:bg-uss-secondary transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <>
                {/* Products */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <Link href={`/product/${product.id}`} className={viewMode === 'list' ? 'flex w-full' : 'block'}>
                        {/* Product Image */}
                        <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'} bg-gray-100 overflow-hidden`}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discountPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                            </div>
                          )}
                          {product.featured && (
                            <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-md">
                              <Sparkles className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-uss-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                          
                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating || 0) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-1">
                                ({product.totalReviews || 0})
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="mb-3">
                            {product.discountPrice ? (
                              <div className="space-y-1">
                                <p className="text-lg font-bold text-uss-primary">
                                  {formatPrice(product.discountPrice)}
                                </p>
                                <p className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-lg font-bold text-uss-primary">
                                {formatPrice(product.price)}
                              </p>
                            )}
                          </div>

                          {/* Stock Status */}
                          <div className="mb-3">
                            {product.stock > 0 ? (
                              <span className="text-sm text-green-600 flex items-center">
                                <Check className="h-4 w-4 mr-1" />
                                Em estoque ({product.stock})
                              </span>
                            ) : (
                              <span className="text-sm text-red-600 flex items-center">
                                <X className="h-4 w-4 mr-1" />
                                Fora de estoque
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      {/* Actions */}
                      <div className="p-4 pt-0 flex space-x-2">
                        <button 
                          className="flex-1 bg-uss-primary text-white py-2 px-4 rounded-lg hover:bg-uss-secondary transition-colors flex items-center justify-center space-x-1"
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Adicionar</span>
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-uss-primary transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border rounded-lg ${
                          currentPage === page
                            ? 'bg-uss-primary text-white border-uss-primary'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
