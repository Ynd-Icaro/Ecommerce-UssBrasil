'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notFound, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Grid, 
  List, 
  Filter, 
  Star, 
  ShoppingBag,
  TrendingUp,
  Package,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Heart,
  Eye,
  Tag,
  Award
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useProductsDatabase } from '@/lib/use-products-database'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Configuração das categorias
const CATEGORY_CONFIG = {
  smartphones: {
    name: 'Smartphones',
    icon: '📱',
    description: 'Descubra os smartphones mais avançados do mercado',
    bannerGradient: 'from-blue-600 via-purple-600 to-indigo-800',
    image: '/categories/smartphones.jpg'
  },
  notebooks: {
    name: 'Notebooks',
    icon: '💻', 
    description: 'Notebooks profissionais para todas as necessidades',
    bannerGradient: 'from-gray-600 via-gray-700 to-gray-900',
    image: '/categories/notebooks.jpg'
  },
  tablets: {
    name: 'Tablets',
    icon: '📱',
    description: 'Tablets versáteis para trabalho e entretenimento',
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    image: '/categories/tablets.jpg'
  },
  smartwatch: {
    name: 'Smartwatches',
    icon: '⌚',
    description: 'Smartwatches inteligentes que complementam seu estilo',
    bannerGradient: 'from-rose-600 via-pink-600 to-purple-800',
    image: '/categories/smartwatches.jpg'
  },
  headphones: {
    name: 'Headphones',
    icon: '🎧',
    description: 'Fones de ouvido com qualidade de áudio superior',
    bannerGradient: 'from-orange-600 via-red-600 to-pink-800',
    image: '/categories/headphones.jpg'
  },
  audio: {
    name: 'Áudio',
    icon: '🔊',
    description: 'Equipamentos de áudio profissionais e de alta qualidade',
    bannerGradient: 'from-violet-600 via-purple-600 to-indigo-800',
    image: '/categories/audio.jpg'
  },
  drone: {
    name: 'Drones',
    icon: '🚁',
    description: 'Drones para fotografia, recreação e uso profissional',
    bannerGradient: 'from-green-600 via-emerald-600 to-teal-800',
    image: '/categories/drones.jpg'
  },
  camera: {
    name: 'Câmeras',
    icon: '📷',
    description: 'Câmeras digitais para capturar momentos perfeitos',
    bannerGradient: 'from-amber-600 via-orange-600 to-red-800',
    image: '/categories/cameras.jpg'
  }
}

// Interfaces para filtros
interface ProductFilters {
  brands: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  featured: boolean
  onSale: boolean
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()
  const { getProductsByCategory, getAllProducts } = useProductsDatabase()
  
  // Estados
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    brands: [],
    priceRange: [0, 50000],
    rating: 0,
    inStock: false,
    featured: false,
    onSale: false
  })

  // Carregar dados da categoria
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const resolvedParams = await params
        const categorySlug = resolvedParams.category
        
        if (!categorySlug) {
          notFound()
          return
        }

        setCategory(categorySlug)
        
        // Buscar produtos da categoria específica
        const allProducts = getAllProducts()
        const categoryProducts = allProducts.filter(product => 
          product.category.toLowerCase() === categorySlug.toLowerCase()
        )
        
        if (categoryProducts.length === 0) {
          notFound()
          return
        }

        setProducts(categoryProducts)
        setFilteredProducts(categoryProducts)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar dados da categoria:', error)
        setLoading(false)
      }
    }

    loadCategoryData()
  }, [params])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products]

    // Filtro de busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.features && product.features.some((feature: string) => 
          feature.toLowerCase().includes(searchLower)
        ))
      )
    }

    // Filtro de marcas
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.some(brand => 
          product.name.toLowerCase().includes(brand.toLowerCase())
        )
      )
    }

    // Filtro de faixa de preço
    filtered = filtered.filter(product => {
      const price = product.price || 0
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
      filtered = filtered.filter(product => product.isNew)
    }

    // Filtro de produtos em promoção
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount > 0)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return b.isNew ? 1 : 0 - (a.isNew ? 1 : 0)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, filters, sortBy])

  // Obter configuração da categoria
  const categoryConfig = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] || {
    name: category.charAt(0).toUpperCase() + category.slice(1),
    icon: '📦',
    description: `Produtos da categoria ${category}`,
    bannerGradient: 'from-gray-600 to-gray-800',
    image: '/fallback-category.jpg'
  }

  // Obter marcas únicas
  const uniqueBrands = Array.from(new Set(
    products.map(p => {
      // Extrair marca do nome do produto (primeira palavra)
      return p.name.split(' ')[0]
    }).filter(Boolean)
  )).sort()

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumb e navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-gray-200 hover:border-uss-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-uss-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-uss-primary transition-colors">Categorias</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{categoryConfig.name}</span>
          </div>
        </motion.div>

        {/* Header da Categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`relative rounded-3xl bg-gradient-to-br ${categoryConfig.bannerGradient} p-8 md:p-12 mb-8 overflow-hidden`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{categoryConfig.icon}</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {categoryConfig.name}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  {categoryConfig.description}
                </p>
              </div>
            </div>
            
            {/* Estatísticas */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <Package className="h-5 w-5 text-white" />
                <span className="text-white font-medium">{products.length} produtos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-white font-medium">{uniqueBrands.length} marcas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <Award className="h-5 w-5 text-white" />
                <span className="text-white font-medium">{products.filter(p => p.isNew).length} novidades</span>
              </div>
            </div>
          </div>
          
          {/* Padrão decorativo */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>

        {/* Controles de Filtro e Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={`Buscar em ${categoryConfig.name}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-uss-primary"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filtros */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-200 hover:border-uss-primary"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {(filters.brands.length > 0 || filters.rating > 0 || filters.inStock || filters.featured || filters.onSale) && (
                  <Badge className="ml-2 bg-uss-primary">
                    {filters.brands.length + (filters.rating > 0 ? 1 : 0) + 
                     (filters.inStock ? 1 : 0) + (filters.featured ? 1 : 0) + (filters.onSale ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-uss-primary"
              >
                <option value="name">Nome</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="rating">Melhor Avaliado</option>
                <option value="newest">Mais Recentes</option>
              </select>

              {/* Visualização */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Painel de Filtros Expandido */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Marcas */}
                  {uniqueBrands.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Marcas</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {uniqueBrands.map(brand => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.brands.includes(brand)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters(prev => ({
                                    ...prev,
                                    brands: [...prev.brands, brand]
                                  }))
                                } else {
                                  setFilters(prev => ({
                                    ...prev,
                                    brands: prev.brands.filter(b => b !== brand)
                                  }))
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Avaliação */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Avaliação</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => setFilters(prev => ({ ...prev, rating }))}
                            className="mr-2"
                          />
                          <div className="flex items-center">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-700 ml-1">& acima</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filtros Rápidos */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Filtros Rápidos</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Em estoque</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.featured}
                          onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Novidades</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.onSale}
                          onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Em promoção</span>
                      </label>
                    </div>
                  </div>

                  {/* Faixa de Preço */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Faixa de Preço</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [Number(e.target.value), prev.priceRange[1]]
                          }))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], Number(e.target.value)]
                          }))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão para limpar filtros */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({
                      brands: [],
                      priceRange: [0, 50000],
                      rating: 0,
                      inStock: false,
                      featured: false,
                      onSale: false
                    })}
                    className="border-gray-200 hover:border-uss-primary"
                  >
                    Limpar todos os filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Resultados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Mostrando <span className="font-semibold">{filteredProducts.length}</span> de{' '}
              <span className="font-semibold">{products.length}</span> produtos
            </p>
            
            {/* Tags de filtros ativos */}
            <div className="flex items-center gap-2 flex-wrap">
              {filters.brands.map(brand => (
                <Badge key={brand} variant="secondary" className="text-xs">
                  {brand}
                  <button
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      brands: prev.brands.filter(b => b !== brand)
                    }))}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {filters.rating}+ estrelas
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Grid de Produtos */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    <ProductCard product={product} />
                  ) : (
                    <ProductListItem product={product} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 mb-6">
                Tente ajustar seus filtros ou termo de busca
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setFilters({
                    brands: [],
                    priceRange: [0, 50000],
                    rating: 0,
                    inStock: false,
                    featured: false,
                    onSale: false
                  })
                }}
              >
                Limpar filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Componente do Card do Produto
function ProductCard({ product }: { product: any }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Imagem do produto */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <Image
            src={product.images?.main || product.image || '/fallback-product.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-500 text-white">Novo</Badge>
            )}
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
            )}
          </div>

          {/* Ações */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-uss-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {product.description}
            </p>
          </div>

          {/* Avaliação */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews || 0})</span>
            </div>
          )}

          {/* Preço */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-uss-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Botão de ação */}
          <Button className="w-full mt-4" size="sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

// Componente do Item da Lista
function ProductListItem({ product }: { product: any }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Imagem */}
          <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
            <Image
              src={product.images?.main || product.image || '/fallback-product.png'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-uss-primary transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              {/* Badges */}
              <div className="flex flex-col gap-1 ml-4">
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">Novo</Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                )}
              </div>
            </div>

            {/* Avaliação */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews || 0} avaliações)
                </span>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features.slice(0, 3).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {product.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.features.length - 3} mais
                  </Badge>
                )}
              </div>
            )}

            {/* Preço e ações */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-uss-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}