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
  Building2,
  MapPin,
  Globe,
  Calendar,
  Crown,
  Trophy,
  Medal,
  Target,
  CheckCircle,
  Verified,
  Shield,
  Flame,
  TrendingDown
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

// Interface para as marcas
interface BrandStats {
  totalProducts: number
  averagePrice: number
  highestPrice: number
  lowestPrice: number
  discountedProducts: number
  averageRating: number
  totalReviews: number
  categories: string[]
  established?: string
  origin?: string
  featured: boolean
  trending: boolean
  bestseller: boolean
}

interface EnhancedBrand {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  coverImage: string
  colors: {
    primary: string
    secondary: string
    gradient: string
  }
  products: Product[]
  stats: BrandStats
  tier: 'premium' | 'standard' | 'emerging'
  verified: boolean
  partnership: boolean
}

// Configuração das marcas
const BRAND_CONFIG: Record<string, any> = {
  apple: {
    name: 'Apple',
    description: 'Inovação e design revolucionário em cada produto',
    logo: '/brands/apple-logo.png',
    coverImage: '/brands/apple-cover.jpg',
    colors: {
      primary: '#000000',
      secondary: '#007AFF',
      gradient: 'from-gray-900 via-gray-800 to-black'
    },
    tier: 'premium' as const,
    verified: true,
    partnership: true,
    established: '1976',
    origin: 'Cupertino, CA'
  },
  samsung: {
    name: 'Samsung',
    description: 'Tecnologia de ponta para conectar possibilidades',
    logo: '/brands/samsung-logo.png',
    coverImage: '/brands/samsung-cover.jpg',
    colors: {
      primary: '#1428A0',
      secondary: '#0066CC',
      gradient: 'from-blue-900 via-blue-800 to-indigo-900'
    },
    tier: 'premium' as const,
    verified: true,
    partnership: true,
    established: '1938',
    origin: 'Seoul, Coreia do Sul'
  },
  sony: {
    name: 'Sony',
    description: 'Entretenimento e tecnologia de alta qualidade',
    logo: '/brands/sony-logo.png',
    coverImage: '/brands/sony-cover.jpg',
    colors: {
      primary: '#000000',
      secondary: '#FF6600',
      gradient: 'from-black via-gray-900 to-orange-900'
    },
    tier: 'premium' as const,
    verified: true,
    partnership: false,
    established: '1946',
    origin: 'Tóquio, Japão'
  },
  xiaomi: {
    name: 'Xiaomi',
    description: 'Tecnologia inovadora com preços acessíveis',
    logo: '/brands/xiaomi-logo.png',
    coverImage: '/brands/xiaomi-cover.jpg',
    colors: {
      primary: '#FF6900',
      secondary: '#FFA500',
      gradient: 'from-orange-600 via-orange-700 to-red-600'
    },
    tier: 'standard' as const,
    verified: true,
    partnership: true,
    established: '2010',
    origin: 'Pequim, China'
  },
  huawei: {
    name: 'Huawei',
    description: 'Conectando o mundo com tecnologia inteligente',
    logo: '/brands/huawei-logo.png',
    coverImage: '/brands/huawei-cover.jpg',
    colors: {
      primary: '#FF0000',
      secondary: '#CC0000',
      gradient: 'from-red-600 via-red-700 to-red-800'
    },
    tier: 'standard' as const,
    verified: true,
    partnership: false,
    established: '1987',
    origin: 'Shenzhen, China'
  }
}

// Componente principal
export default function BrandsPage() {
  // Estados
  const [brands, setBrands] = useState<EnhancedBrand[]>([])
  const [featuredBrand, setFeaturedBrand] = useState<EnhancedBrand | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  // Carregamento de dados
  useEffect(() => {
    const loadBrands = async () => {
      try {
        // Agrupar produtos por marca
        const brandMap = new Map<string, Product[]>()
        
        products.forEach(product => {
          const brandSlug = product.brand.toLowerCase()
          if (!brandMap.has(brandSlug)) {
            brandMap.set(brandSlug, [])
          }
          brandMap.get(brandSlug)!.push(product)
        })

        // Criar marcas enriquecidas
        const enhancedBrands: EnhancedBrand[] = []
        
        brandMap.forEach((products, slug) => {
          if (products.length > 0) {
            enhancedBrands.push(createEnhancedBrand(slug, products))
          }
        })

        // Ordenar por número de produtos (maior primeiro)
        enhancedBrands.sort((a, b) => b.stats.totalProducts - a.stats.totalProducts)
        
        setBrands(enhancedBrands)
        
        // Definir marca em destaque (primeira premium ou a com mais produtos)
        const featured = enhancedBrands.find(b => b.tier === 'premium') || enhancedBrands[0]
        setFeaturedBrand(featured)
        
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar marcas:', error)
        setLoading(false)
      }
    }

    loadBrands()
  }, [])

  // Função para criar marca enriquecida
  const createEnhancedBrand = (slug: string, products: Product[]): EnhancedBrand => {
    const config = BRAND_CONFIG[slug] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `Produtos de qualidade da marca ${slug}`,
      logo: '/fallback-brand-logo.png',
      coverImage: '/fallback-brand-cover.jpg',
      colors: {
        primary: '#666666',
        secondary: '#888888',
        gradient: 'from-gray-600 to-gray-800'
      },
      tier: 'emerging' as const,
      verified: false,
      partnership: false,
      established: 'N/A',
      origin: 'N/A'
    }

    // Calcular estatísticas
    const prices = products.map(p => p.discountPrice || p.price).filter(Boolean)
    const discountedProducts = products.filter(p => p.discountPrice && p.discountPrice < p.price).length
    const ratings = products.map(p => p.rating).filter(Boolean) as number[]
    const totalReviews = products.reduce((sum, p) => sum + (p.totalReviews || 0), 0)
    const categories = Array.from(new Set(products.map(p => p.category)))
    
    // Determinar trending e bestseller
    const isNew = products.some(p => {
      if (p.createdAt) {
        const created = new Date(p.createdAt)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return created > thirtyDaysAgo
      }
      return false
    })
    
    const isBestseller = products.length >= 5 && discountedProducts > 0

    return {
      id: slug,
      slug,
      name: config.name,
      description: config.description,
      logo: config.logo,
      coverImage: config.coverImage,
      colors: config.colors,
      products,
      stats: {
        totalProducts: products.length,
        averagePrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
        highestPrice: prices.length > 0 ? Math.max(...prices) : 0,
        lowestPrice: prices.length > 0 ? Math.min(...prices) : 0,
        discountedProducts,
        averageRating: ratings.length > 0 ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)) : 0,
        totalReviews,
        categories,
        established: config.established,
        origin: config.origin,
        featured: products.some(p => p.featured),
        trending: isNew,
        bestseller: isBestseller
      },
      tier: config.tier,
      verified: config.verified,
      partnership: config.partnership
    }
  }

  // Filtros e ordenação
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTier = selectedTier === 'all' || brand.tier === selectedTier
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'trending' && brand.stats.trending) ||
                           (filterBy === 'bestseller' && brand.stats.bestseller) ||
                           (filterBy === 'premium' && brand.tier === 'premium') ||
                           (filterBy === 'verified' && brand.verified) ||
                           (filterBy === 'partnership' && brand.partnership)
      
      return matchesSearch && matchesTier && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'products': return b.stats.totalProducts - a.stats.totalProducts
        case 'price': return b.stats.averagePrice - a.stats.averagePrice
        case 'rating': return b.stats.averageRating - a.stats.averageRating
        case 'established': 
          const yearA = parseInt(a.stats.established || '0')
          const yearB = parseInt(b.stats.established || '0')
          return yearA - yearB
        default: return 0
      }
    })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      case 'standard':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Standard
        </Badge>
      case 'emerging':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <Sparkles className="h-3 w-3 mr-1" />
          Emergente
        </Badge>
      default:
        return null
    }
  }

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
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Principal com Marca em Destaque */}
        {featuredBrand && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${featuredBrand.colors.gradient} p-8 md:p-12`}>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                
                {/* Informações da Marca */}
                <div className="text-white">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTierBadge(featuredBrand.tier)}
                        {featuredBrand.verified && (
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Verified className="h-3 w-3 mr-1" />
                            Verificada
                          </Badge>
                        )}
                        {featuredBrand.partnership && (
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Shield className="h-3 w-3 mr-1" />
                            Parceira
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/80">Marca em Destaque</p>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {featuredBrand.name}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-6">
                    {featuredBrand.description}
                  </p>

                  {/* Informações da Empresa */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <div className="flex items-center space-x-2 text-white/80 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Fundada em</span>
                      </div>
                      <p className="text-lg font-bold">{featuredBrand.stats.established}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-white/80 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Origem</span>
                      </div>
                      <p className="text-lg font-bold">{featuredBrand.stats.origin}</p>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">{featuredBrand.stats.totalProducts}</p>
                      <p className="text-sm text-white/80">Produtos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">
                        {featuredBrand.stats.averageRating > 0 ? featuredBrand.stats.averageRating : '-'}
                      </p>
                      <p className="text-sm text-white/80">Avaliação</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold">{featuredBrand.stats.categories.length}</p>
                      <p className="text-sm text-white/80">Categorias</p>
                    </div>
                  </div>

                  <Link href={`/products?brand=${featuredBrand.slug}`}>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                      Ver Produtos
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Logo e Produtos em Destaque */}
                <div className="relative">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <div className="text-8xl font-bold text-white">
                        {featuredBrand.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {featuredBrand.products.slice(0, 4).map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="w-full h-16 object-contain mb-2"
                          />
                          <p className="text-xs text-white/90 text-center line-clamp-2">
                            {product.name}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Header da Página de Marcas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-uss-primary/10 text-uss-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            <span>Todas as Marcas</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorar Por 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-uss-primary to-uss-secondary ml-3">
              Marca
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra produtos das melhores marcas do mundo. Qualidade, 
            inovação e excelência em cada escolha.
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
                placeholder="Buscar marcas..."
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
                  <option value="premium">Premium</option>
                  <option value="trending">Em Alta</option>
                  <option value="bestseller">Mais Vendidas</option>
                  <option value="verified">Verificadas</option>
                  <option value="partnership">Parceiras</option>
                </select>

                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-uss-primary"
                >
                  <option value="all">Todos os Níveis</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="emerging">Emergente</option>
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
                <option value="rating">Melhor Avaliação</option>
                <option value="established">Mais Antiga</option>
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
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Flame className="h-3 w-3 mr-1" />
                    Em Alta
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Trophy className="h-3 w-3 mr-1" />
                    Mais Vendidas
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Verified className="h-3 w-3 mr-1" />
                    Verificadas
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Parceiras Oficiais
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid de Marcas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {filteredBrands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} viewMode={viewMode} />
          ))}
        </motion.div>

        {/* Mensagem vazia */}
        {filteredBrands.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma marca encontrada
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

// Componente de Card da Marca
function BrandCard({ brand, index, viewMode }: { brand: EnhancedBrand; index: number; viewMode: 'grid' | 'list' }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      case 'standard':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Standard
        </Badge>
      case 'emerging':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <Sparkles className="h-3 w-3 mr-1" />
          Emergente
        </Badge>
      default:
        return null
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="flex">
          {/* Logo e Info */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{brand.name}</h3>
                    {brand.verified && (
                      <Verified className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{brand.description}</p>
                  <div className="flex items-center space-x-2">
                    {getTierBadge(brand.tier)}
                    {brand.partnership && (
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Parceira
                      </Badge>
                    )}
                    {brand.stats.trending && (
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Em Alta
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-uss-primary">{brand.stats.totalProducts}</p>
                <p className="text-xs text-gray-500">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {brand.stats.averageRating > 0 ? brand.stats.averageRating : '-'}
                </p>
                <p className="text-xs text-gray-500">Avaliação</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {brand.stats.averagePrice > 0 ? `R$ ${Math.round(brand.stats.averagePrice/1000)}k` : '-'}
                </p>
                <p className="text-xs text-gray-500">Preço Médio</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{brand.stats.categories.length}</p>
                <p className="text-xs text-gray-500">Categorias</p>
              </div>
            </div>

            <Link href={`/products?brand=${brand.slug}`}>
              <Button className="w-full bg-uss-primary hover:bg-uss-primary/90">
                Ver {brand.stats.totalProducts} Produtos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Produtos Preview */}
          <div className="w-1/3 p-6 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Produtos em Destaque</h4>
            <div className="space-y-3">
              {brand.products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="object-contain bg-white rounded-lg p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-sm text-uss-primary font-semibold">
                      {formatPrice(product.discountPrice || product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header com Gradiente */}
      <div className={`h-32 bg-gradient-to-br ${brand.colors.gradient} p-6 relative`}>
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {brand.name.charAt(0)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {brand.verified && (
              <Verified className="h-5 w-5 text-white" />
            )}
            {brand.partnership && (
              <Shield className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
        <div className="absolute bottom-4 left-6">
          {getTierBadge(brand.tier)}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-uss-primary transition-colors">
            {brand.name}
          </h3>
          <div className="flex items-center space-x-1">
            {brand.stats.trending && (
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                <TrendingUp className="h-3 w-3" />
              </Badge>
            )}
            {brand.stats.bestseller && (
              <Badge variant="outline" className="border-green-200 text-green-700">
                <Trophy className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{brand.description}</p>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-uss-primary">{brand.stats.totalProducts}</p>
            <p className="text-xs text-gray-500">Produtos</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">
              {brand.stats.averageRating > 0 ? brand.stats.averageRating : '-'}
            </p>
            <p className="text-xs text-gray-500">Avaliação</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-900">{brand.stats.categories.length}</p>
            <p className="text-xs text-gray-500">Categorias</p>
          </div>
        </div>

        {/* Faixa de Preços */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Faixa de preços</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {formatPrice(brand.stats.lowestPrice)}
            </span>
            <div className="flex-1 mx-2 h-1 bg-gray-200 rounded">
              <div className="h-1 bg-uss-primary rounded" style={{ width: '60%' }}></div>
            </div>
            <span className="text-sm font-medium">
              {formatPrice(brand.stats.highestPrice)}
            </span>
          </div>
        </div>

        {/* Produtos Preview */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Produtos em Destaque</p>
          <div className="flex space-x-2">
            {brand.products.slice(0, 4).map((product, idx) => (
              <div key={product.id} className="flex-1">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="w-full h-12 object-contain bg-gray-50 rounded-lg p-1"
                />
              </div>
            ))}
          </div>
        </div>

        <Link href={`/products?brand=${brand.slug}`}>
          <Button className="w-full bg-uss-primary hover:bg-uss-primary/90 group-hover:bg-uss-secondary transition-colors">
            Ver Produtos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
