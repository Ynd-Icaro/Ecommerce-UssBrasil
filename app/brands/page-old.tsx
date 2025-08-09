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
  Target
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useProductsDatabase } from '@/lib/use-products-database'
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

// Interfaces para as marcas
interface BrandStats {
  totalProducts: number
  averagePrice: number
  categories: string[]
  newProducts: number
  onSale: number
  averageRating: number
  totalReviews: number
}

interface EnhancedBrand {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  banner: string
  website: string
  founded: string
  country: string
  bannerGradient: string
  products: any[]
  stats: BrandStats
  trending: boolean
  featured: boolean
  premium: boolean
}

// Configuração das marcas principais
const BRAND_CONFIG = {
  apple: {
    name: 'Apple',
    description: 'Inovação e design em tecnologia premium',
    logo: '/Produtos/Apple/logo.png',
    banner: '/brands/apple-banner.jpg',
    website: 'https://www.apple.com',
    founded: '1976',
    country: 'Estados Unidos',
    bannerGradient: 'from-gray-800 via-gray-900 to-black',
    premium: true
  },
  jbl: {
    name: 'JBL',
    description: 'Excelência em equipamentos de áudio profissional',
    logo: '/Produtos/JBL/logo.png',
    banner: '/brands/jbl-banner.jpg',
    website: 'https://www.jbl.com',
    founded: '1946',
    country: 'Estados Unidos',
    bannerGradient: 'from-orange-600 via-red-600 to-red-800',
    premium: false
  },
  dji: {
    name: 'DJI',
    description: 'Líder mundial em tecnologia de drones',
    logo: '/Produtos/DJI/logo.png',
    banner: '/brands/dji-banner.jpg',
    website: 'https://www.dji.com',
    founded: '2006',
    country: 'China',
    bannerGradient: 'from-blue-600 via-indigo-700 to-purple-800',
    premium: true
  },
  xiaomi: {
    name: 'Xiaomi',
    description: 'Tecnologia inteligente para todos',
    logo: '/Produtos/Xiaomi/logo.png',
    banner: '/brands/xiaomi-banner.jpg',
    website: 'https://www.mi.com',
    founded: '2010',
    country: 'China',
    bannerGradient: 'from-orange-500 via-orange-600 to-red-600',
    premium: false
  },
  geonav: {
    name: 'GeoNav',
    description: 'Soluções em navegação e tecnologia GPS',
    logo: '/Produtos/GeoNav/logo.png',
    banner: '/brands/geonav-banner.jpg',
    website: 'https://www.geonav.com.br',
    founded: '2005',
    country: 'Brasil',
    bannerGradient: 'from-green-600 via-emerald-700 to-teal-800',
    premium: false
  }
}

// Componente principal
export default function BrandsPage() {
  // Estados
  const [brands, setBrands] = useState<EnhancedBrand[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  // Carregamento de dados
  useEffect(() => {
    const loadBrands = async () => {
      try {
        // Buscar produtos do db.json
        const allProducts: Product[] = data.products.map(p => ({
          ...p,
          status: 'active' as const
        }))
        
        // Agrupar produtos por marca
        const brandMap = new Map<string, Product[]>()
        
        allProducts.forEach(product => {
          const brandSlug = product.brand.toLowerCase()
          if (!brandMap.has(brandSlug)) {
            brandMap.set(brandSlug, [])
          }
          brandMap.get(brandSlug)!.push(product)
        })

        // Criar marcas enriquecidas
        const enhancedBrands: EnhancedBrand[] = []
        
        brandMap.forEach((products, slug) => {
          enhancedBrands.push(createEnhancedBrand(slug, products))
        })

        setBrands(enhancedBrands)
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
    const config = BRAND_CONFIG[slug as keyof typeof BRAND_CONFIG] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `Produtos de qualidade da marca ${slug}`,
      logo: '/fallback-brand.png',
      banner: '/fallback-brand-banner.jpg',
      website: '#',
      founded: 'N/A',
      country: 'N/A',
      bannerGradient: 'from-gray-600 to-gray-800',
      premium: false
    }

    // Calcular estatísticas
    const prices = products.map(p => p.discountPrice || p.price).filter(Boolean)
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
    const ratings = products.map(p => p.rating).filter(rating => rating !== undefined) as number[]
    const reviews = products.map(p => p.totalReviews || 0).filter(Boolean)
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
      logo: config.logo,
      banner: config.banner,
      website: config.website,
      founded: config.founded,
      country: config.country,
      bannerGradient: config.bannerGradient,
      premium: config.premium,
      products,
      stats: {
        totalProducts: products.length,
        averagePrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
        categories,
        newProducts,
        onSale,
        averageRating: ratings.length > 0 ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)) : 0,
        totalReviews: reviews.reduce((a, b) => a + b, 0)
      },
      trending: newProducts > 0 || onSale > products.length * 0.3,
      featured: products.length > 5
    }
  }

  // Filtros e ordenação
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.country.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'trending' && brand.trending) ||
                           (filterBy === 'featured' && brand.featured) ||
                           (filterBy === 'premium' && brand.premium) ||
                           (filterBy === 'new' && brand.stats.newProducts > 0)
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'products': return b.stats.totalProducts - a.stats.totalProducts
        case 'price': return b.stats.averagePrice - a.stats.averagePrice
        case 'rating': return b.stats.averageRating - a.stats.averageRating
        case 'trending': return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        default: return 0
      }
    })

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
        {/* Header da Página */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-uss-primary/10 text-uss-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            <span>Explorar Marcas</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Marcas de 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-uss-primary to-uss-secondary ml-3">
              Excelência
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra produtos das marcas mais renomadas do mundo, selecionadas 
            pela qualidade, inovação e confiabilidade.
          </p>
        </motion.div>

        {/* Estatísticas Gerais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center p-4 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-12 h-12 bg-uss-primary/10 rounded-xl mx-auto mb-3">
                <Building2 className="h-6 w-6 text-uss-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
              <p className="text-sm text-gray-600">Marcas</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {brands.reduce((acc, brand) => acc + brand.stats.totalProducts, 0)}
              </p>
              <p className="text-sm text-gray-600">Produtos</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mx-auto mb-3">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {brands.filter(b => b.premium).length}
              </p>
              <p className="text-sm text-gray-600">Premium</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4 border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {[...new Set(brands.map(b => b.country))].length}
              </p>
              <p className="text-sm text-gray-600">Países</p>
            </CardContent>
          </Card>
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
                  <option value="trending">Em Alta</option>
                  <option value="featured">Populares</option>
                  <option value="premium">Premium</option>
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
                <option value="rating">Melhor Avaliação</option>
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
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Em Alta
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Melhor Avaliadas
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-uss-primary hover:text-white">
                    <Globe className="h-3 w-3 mr-1" />
                    Internacional
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid/Lista de Marcas */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BrandCard brand={brand} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BrandListItem brand={brand} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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

// Componente do Card de Marca
function BrandCard({ brand }: { brand: EnhancedBrand }) {
  return (
    <Link href={`/products?brand=${brand.slug}`}>
      <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Header com gradiente */}
        <div className={`relative h-32 bg-gradient-to-br ${brand.bannerGradient} p-6`}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                {brand.premium && (
                  <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30 mb-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                {brand.trending && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Em Alta
                  </Badge>
                )}
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-white/80 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-uss-primary transition-colors">
              {brand.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {brand.description}
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-uss-primary">{brand.stats.totalProducts}</p>
              <p className="text-xs text-gray-500">Produtos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500 flex items-center justify-center">
                <Star className="h-4 w-4 mr-1" />
                {brand.stats.averageRating || '-'}
              </p>
              <p className="text-xs text-gray-500">Avaliação</p>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {brand.country}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {brand.founded}
            </div>
          </div>

          {/* Badges de informação */}
          <div className="flex flex-wrap gap-2">
            {brand.stats.newProducts > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {brand.stats.newProducts} Novos
              </Badge>
            )}
            {brand.stats.onSale > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {brand.stats.onSale} Promoções
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              <Package className="h-3 w-3 mr-1" />
              {brand.stats.categories.length} Categorias
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Componente de Item da Lista
function BrandListItem({ brand }: { brand: EnhancedBrand }) {
  return (
    <Link href={`/products?brand=${brand.slug}`}>
      <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            {/* Logo e gradiente */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${brand.bannerGradient} flex items-center justify-center shrink-0`}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            {/* Informações principais */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-uss-primary transition-colors">
                  {brand.name}
                </h3>
                {brand.premium && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                {brand.trending && (
                  <Badge className="bg-uss-primary/10 text-uss-primary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Em Alta
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">
                {brand.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {brand.country}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Desde {brand.founded}
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  {brand.stats.totalProducts} produtos
                </div>
              </div>
            </div>

            {/* Estatísticas e ação */}
            <div className="text-right">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-uss-primary">{brand.stats.totalProducts}</p>
                  <p className="text-xs text-gray-500">Produtos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-500 flex items-center justify-center">
                    <Star className="h-4 w-4 mr-1" />
                    {brand.stats.averageRating || '-'}
                  </p>
                  <p className="text-xs text-gray-500">Avaliação</p>
                </div>
              </div>
              
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-uss-primary group-hover:translate-x-1 transition-all mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
