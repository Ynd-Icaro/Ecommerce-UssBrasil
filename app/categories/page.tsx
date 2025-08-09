'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  TrendingUp, 
  ShoppingBag,
  ChevronRight,
  Package,
  Tag,
  Users,
  Eye,
  Heart,
  ArrowUpDown,
  SlidersHorizontal,
  Zap,
  Award,
  Clock,
  Sparkles,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Volume2,
  Plane,
  Camera,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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

// Helper para corrigir caminhos
const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

// Dados dos produtos
const products: Product[] = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  status: 'active' as const
}))

// Interfaces para as categorias
interface CategoryStats {
  totalProducts: number
  averagePrice: number
  topBrand: string
  newProducts: number
  onSale: number
}

interface EnhancedCategory {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  bannerGradient: string
  products: Product[]
  stats: CategoryStats
  trending: boolean
  featured: boolean
}

// Função para renderizar ícones
const renderIcon = (iconName: string, size: string = "h-6 w-6") => {
  const icons: Record<string, any> = {
    Smartphone,
    Laptop,
    Tablet,
    Watch,
    Headphones,
    Volume2,
    Plane,
    Camera,
    Package
  }
  
  const IconComponent = icons[iconName] || Package
  return <IconComponent className={size} />
}

// Configuração das categorias principais
const CATEGORY_CONFIG = {
  smartphones: {
    name: 'Smartphones',
    icon: 'Smartphone',
    description: 'Os mais avançados smartphones do mercado',
    bannerGradient: 'from-blue-600 via-purple-600 to-indigo-800',
    image: '/categories/smartphones.jpg'
  },
  notebooks: {
    name: 'Notebooks',
    icon: 'Laptop', 
    description: 'Notebooks profissionais e para jogos',
    bannerGradient: 'from-gray-600 via-gray-700 to-gray-900',
    image: '/categories/notebooks.jpg'
  },
  tablets: {
    name: 'Tablets',
    icon: 'Tablet',
    description: 'Tablets para trabalho e entretenimento',
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    image: '/categories/tablets.jpg'
  },
  smartwatch: {
    name: 'Smartwatches',
    icon: 'Watch',
    description: 'Smartwatches inteligentes e elegantes',
    bannerGradient: 'from-rose-600 via-pink-600 to-purple-800',
    image: '/categories/smartwatches.jpg'
  },
  headphones: {
    name: 'Headphones',
    icon: 'Headphones',
    description: 'Fones de ouvido premium',
    bannerGradient: 'from-orange-600 via-red-600 to-pink-800',
    image: '/categories/headphones.jpg'
  },
  audio: {
    name: 'Áudio',
    icon: 'Volume2',
    description: 'Equipamentos de áudio profissionais',
    bannerGradient: 'from-violet-600 via-purple-600 to-indigo-800',
    image: '/categories/audio.jpg'
  },
  drone: {
    name: 'Drones',
    icon: 'Plane',
    description: 'Drones profissionais e recreativos',
    bannerGradient: 'from-green-600 via-emerald-600 to-teal-800',
    image: '/categories/drones.jpg'
  },
  camera: {
    name: 'Câmeras',
    icon: 'Camera',
    description: 'Câmeras digitais profissionais',
    bannerGradient: 'from-amber-600 via-orange-600 to-red-800',
    image: '/categories/cameras.jpg'
  }
}

// Componente principal
export default function CategoriesPage() {
  // Estados
  const [categories, setCategories] = useState<EnhancedCategory[]>([])
  const [featuredCategory, setFeaturedCategory] = useState<EnhancedCategory | null>(null)
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  // Carregamento de dados
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Agrupar produtos por categoria
        const categoryMap = new Map<string, Product[]>()
        
        products.forEach(product => {
          const categorySlug = product.category.toLowerCase()
          if (!categoryMap.has(categorySlug)) {
            categoryMap.set(categorySlug, [])
          }
          categoryMap.get(categorySlug)!.push(product)
        })

        // Criar categorias enriquecidas
        const enhancedCategories: EnhancedCategory[] = []
        
        categoryMap.forEach((products, slug) => {
          if (products.length > 0) {
            enhancedCategories.push(createEnhancedCategory(slug, products))
          }
        })

        setCategories(enhancedCategories)
        
        // Definir categoria em destaque (a com mais produtos)
        const featured = enhancedCategories.reduce((prev, current) => 
          prev.stats.totalProducts > current.stats.totalProducts ? prev : current
        )
        setFeaturedCategory(featured)
        
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Função para criar categoria enriquecida
  const createEnhancedCategory = (slug: string, products: Product[]): EnhancedCategory => {
    const config = CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: 'Package',
      description: `Produtos da categoria ${slug}`,
      bannerGradient: 'from-gray-600 to-gray-800',
      image: '/fallback-category.jpg'
    }

    // Calcular estatísticas
    const prices = products.map(p => p.discountPrice || p.price).filter(Boolean)
    const brands = products.map(p => p.brand).filter(Boolean)
    const brandCounts = brands.reduce((acc, brand) => {
      acc[brand] = (acc[brand] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const topBrand = Object.entries(brandCounts).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'N/A'
    const newProducts = products.filter(p => {
      if (p.createdAt) {
        const created = new Date(p.createdAt)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return created > thirtyDaysAgo
      }
      return false
    }).length
    const onSale = products.filter(p => p.discountPrice && p.discountPrice < p.price).length

    return {
      id: slug,
      slug,
      name: config.name,
      description: config.description,
      image: config.image,
      icon: config.icon,
      bannerGradient: config.bannerGradient,
      products,
      stats: {
        totalProducts: products.length,
        averagePrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
        topBrand,
        newProducts,
        onSale
      },
      trending: newProducts > 0 || onSale > products.length * 0.3,
      featured: products.length > 5
    }
  }

  // Filtros e ordenação
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'trending' && category.trending) ||
                           (filterBy === 'featured' && category.featured) ||
                           (filterBy === 'new' && category.stats.newProducts > 0)
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'products': return b.stats.totalProducts - a.stats.totalProducts
        case 'price': return b.stats.averagePrice - a.stats.averagePrice
        case 'trending': return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        default: return 0
      }
    })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  // Carrossel automático
  useEffect(() => {
    if (featuredCategory && featuredCategory.products.length > 1) {
      const timer = setInterval(() => {
        setCurrentCarouselIndex((prev) => 
          (prev + 1) % Math.min(featuredCategory.products.length, 5)
        )
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [featuredCategory])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Header Principal com Categoria em Destaque */}
        {featuredCategory && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${featuredCategory.bannerGradient} p-8 md:p-12`}>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                
                {/* Informações da Categoria */}
                <div className="text-white">
                  <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {renderIcon(featuredCategory.icon, "h-4 w-4")}
                    <span>Categoria em Destaque</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {featuredCategory.name}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-6">
                    {featuredCategory.description}
                  </p>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">{featuredCategory.stats.totalProducts}</p>
                      <p className="text-sm text-white/80">Produtos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">
                        {featuredCategory.stats.averagePrice > 0 ? `R$ ${Math.round(featuredCategory.stats.averagePrice/1000)}k` : '-'}
                      </p>
                      <p className="text-sm text-white/80">Preço Médio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">{featuredCategory.stats.onSale}</p>
                      <p className="text-sm text-white/80">Em Oferta</p>
                    </div>
                  </div>

                  <Link href={`/products?category=${featuredCategory.slug}`}>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                      Ver Produtos
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Carrossel de Produtos */}
                <div className="relative">
                  <div className="relative h-80 rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentCarouselIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center items-center"
                      >
                        {featuredCategory.products[currentCarouselIndex] && (
                          <>
                            <Image
                              src={featuredCategory.products[currentCarouselIndex].image}
                              alt={featuredCategory.products[currentCarouselIndex].name}
                              width={200}
                              height={200}
                              className="object-contain mb-4 drop-shadow-2xl"
                            />
                            <h3 className="text-white text-xl font-bold text-center mb-2">
                              {featuredCategory.products[currentCarouselIndex].name}
                            </h3>
                            <p className="text-white/80 text-center mb-4">
                              {featuredCategory.products[currentCarouselIndex].brand}
                            </p>
                            <div className="text-center">
                              <span className="text-2xl font-bold text-white">
                                {formatPrice(featuredCategory.products[currentCarouselIndex].discountPrice || featuredCategory.products[currentCarouselIndex].price)}
                              </span>
                              {featuredCategory.products[currentCarouselIndex].discountPrice && (
                                <span className="block text-sm text-white/60 line-through">
                                  {formatPrice(featuredCategory.products[currentCarouselIndex].price)}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Controles do Carrossel */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {featuredCategory.products.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCarouselIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentCarouselIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Header da Página de Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-uss-primary/10 text-uss-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Package className="h-4 w-4" />
            <span>Todas as Categorias</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorar Por 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-uss-primary to-uss-secondary ml-3">
              Categoria
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navegue por nossas categorias organizadas e encontre exatamente 
            o que você precisa com facilidade e precisão.
          </p>
        </motion.div>

        {/* Barra de Navegação e Filtros */}
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
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-uss-primary"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3">
              {/* Filtros */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-gray-200 hover:border-uss-primary"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-uss-primary"
                >
                  <option value="all">Todas</option>
                  <option value="trending">Em Alta</option>
                  <option value="featured">Populares</option>
                  <option value="new">Com Novidades</option>
                </select>
              </div>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-uss-primary"
              >
                <option value="name">Nome</option>
                <option value="products">Mais Produtos</option>
                <option value="price">Maior Preço</option>
                <option value="trending">Tendência</option>
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

          {/* Filtros Expandidos */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Em Alta
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Mais Vendidas
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Recentes
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Seções de Categorias com Produtos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-12"
        >
          {filteredCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </motion.div>

        {/* Mensagem vazia */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Componente de Seção de Categoria com Produtos
function CategorySection({ category, index }: { category: EnhancedCategory; index: number }) {
  const [showAllProducts, setShowAllProducts] = useState(false)
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const displayProducts = showAllProducts ? category.products : category.products.slice(0, 8)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header da Categoria */}
      <div className={`relative bg-gradient-to-br ${category.bannerGradient} p-8`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
              {renderIcon(category.icon, "h-8 w-8")}
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {category.name}
              </h3>
              <p className="text-white/90 text-lg">
                {category.description}
              </p>
            </div>
          </div>
          
          <div className="text-right text-white">
            <p className="text-3xl font-bold">{category.stats.totalProducts}</p>
            <p className="text-white/80">Produtos</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center text-white">
            <p className="text-xl font-bold">
              {category.stats.averagePrice > 0 ? `R$ ${Math.round(category.stats.averagePrice/1000)}k` : '-'}
            </p>
            <p className="text-sm text-white/80">Preço Médio</p>
          </div>
          <div className="text-center text-white">
            <p className="text-xl font-bold">{category.stats.onSale}</p>
            <p className="text-sm text-white/80">Em Oferta</p>
          </div>
          <div className="text-center text-white">
            <p className="text-xl font-bold">{category.stats.newProducts}</p>
            <p className="text-sm text-white/80">Novos</p>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link href={`/product/${product.id}`}>
                <div className="bg-gray-50 rounded-2xl p-4 group-hover:bg-gray-100 transition-colors">
                  <div className="relative mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-contain rounded-xl"
                    />
                    {product.discountPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-uss-primary transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-uss-primary">
                        {formatPrice(product.discountPrice || product.price)}
                      </span>
                      {product.discountPrice && (
                        <span className="block text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        {category.products.length > 8 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white"
            >
              {showAllProducts ? 'Ver Menos' : `Ver Mais (+${category.products.length - 8})`}
              <ChevronRight className={`ml-2 h-4 w-4 transform transition-transform ${showAllProducts ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        )}

        {/* Link para Ver Todos da Categoria */}
        <div className="text-center mt-6">
          <Link
            href={`/products?category=${category.slug}`}
            className="inline-flex items-center text-uss-primary font-medium hover:text-uss-secondary transition-colors"
          >
            Ver todos os produtos de {category.name}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
