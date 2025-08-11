'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
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
  Play,
  Pause,
  Camera
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

// Interface para marcas melhoradas
interface BrandItem {
  id: string
  name: string
  slug: string
  description: string
  image: string
  video?: string
  logo: string
  bannerGradient: string
  products: Product[]
  stats: {
    totalProducts: number
    averagePrice: number
    highestPrice: number
    lowestPrice: number
    discountedProducts: number
    averageRating: number
    categories: string[]
    established?: string
    origin?: string
  }
  featured: boolean
  trending: boolean
  verified: boolean
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

// Configuração das marcas com vídeos/fotos
const BRAND_CONFIG = {
  'jbl': {
    name: 'JBL',
    description: 'Líder mundial em sistemas de áudio profissionais e consumo',
    bannerGradient: 'from-orange-600 via-red-600 to-pink-600',
    image: '/brands/jbl-hero.jpg',
    video: '/brands/jbl-demo.mp4',
    logo: '/brands/jbl-logo.png',
    established: '1946',
    origin: 'Estados Unidos'
  },
  'xiaomi': {
    name: 'Xiaomi',
    description: 'Inovação e qualidade em tecnologia acessível para todos',
    bannerGradient: 'from-orange-500 via-orange-600 to-red-600',
    image: '/brands/xiaomi-hero.jpg',
    video: '/brands/xiaomi-demo.mp4',
    logo: '/brands/xiaomi-logo.png',
    established: '2010',
    origin: 'China'
  },
  'samsung': {
    name: 'Samsung',
    description: 'Tecnologia avançada que conecta o mundo',
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    image: '/brands/samsung-hero.jpg',
    video: '/brands/samsung-demo.mp4',
    logo: '/brands/samsung-logo.png',
    established: '1938',
    origin: 'Coreia do Sul'
  },
  'apple': {
    name: 'Apple',
    description: 'Design icônico e inovação que transforma a tecnologia',
    bannerGradient: 'from-gray-700 via-gray-800 to-black',
    image: '/brands/apple-hero.jpg',
    video: '/brands/apple-demo.mp4',
    logo: '/brands/apple-logo.png',
    established: '1976',
    origin: 'Estados Unidos'
  },
  'dji': {
    name: 'DJI',
    description: 'Pioneira em drones e tecnologia de estabilização',
    bannerGradient: 'from-green-600 via-emerald-600 to-teal-600',
    image: '/brands/dji-hero.jpg',
    video: '/brands/dji-demo.mp4',
    logo: '/brands/dji-logo.png',
    established: '2006',
    origin: 'China'
  },
  'sony': {
    name: 'Sony',
    description: 'Entretenimento e tecnologia de alta qualidade',
    bannerGradient: 'from-blue-800 via-indigo-800 to-purple-800',
    image: '/brands/sony-hero.jpg',
    video: '/brands/sony-demo.mp4',
    logo: '/brands/sony-logo.png',
    established: '1946',
    origin: 'Japão'
  }
}

// Componente para Carrossel de Produtos
interface ProductCarouselProps {
  products: Product[]
  brandName: string
}

const ProductCarousel = ({ products, brandName }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxVisible = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= products.length - maxVisible ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? Math.max(0, products.length - maxVisible) : prev - 1
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  if (products.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl p-8 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum produto disponível</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {products.length > maxVisible && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8">
        {products.slice(currentIndex, currentIndex + maxVisible).map((product, index) => (
          <motion.div
            key={`${product.id}-${currentIndex}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/produtos/${product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${product.id}`}>
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    {product.discountPrice && product.discountPrice < product.price && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white font-bold">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </Badge>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-2">
                        <button className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-uss-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="space-y-1">
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-uss-primary">
                              {formatPrice(product.discountPrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          product.stock > 10 ? 'bg-green-500' : 
                          product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-xs text-gray-500">
                          {product.stock > 10 ? 'Em estoque' : 
                           product.stock > 0 ? 'Últimas unidades' : 'Esgotado'}
                        </span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={product.stock === 0}
                      >
                        Comprar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Carousel Indicators */}
      {products.length > maxVisible && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.max(0, products.length - maxVisible + 1) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-uss-primary w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Componente para Card de Marca com Vídeo/Foto
interface BrandMediaCardProps {
  brand: BrandItem
}

const BrandMediaCard = ({ brand }: BrandMediaCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="relative">
      <Card className="overflow-hidden border-0 shadow-xl">
        <CardContent className="p-0">
          {/* Media Container */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Background Image */}
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover"
            />

            {/* Video Overlay (if available) */}
            {brand.video && showVideo && (
              <div className="absolute inset-0 bg-black">
                <video
                  className="w-full h-full object-cover"
                  autoPlay={isPlaying}
                  muted
                  loop
                  controls={isPlaying}
                >
                  <source src={brand.video} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${brand.bannerGradient} opacity-80`} />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              {/* Brand Logo */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm p-2">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Brand Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold">{brand.name}</h2>
                  {brand.verified && (
                    <Verified className="h-6 w-6 text-blue-400" />
                  )}
                  {brand.featured && (
                    <Crown className="h-6 w-6 text-yellow-400" />
                  )}
                </div>
                <p className="text-white/90 text-sm line-clamp-2">
                  {brand.description}
                </p>
              </div>

              {/* Brand Details */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-xs text-white/70 mb-1">Fundada em</p>
                  <p className="text-sm font-semibold">{brand.stats.established || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-1">Origem</p>
                  <p className="text-sm font-semibold">{brand.stats.origin || 'N/A'}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-lg font-bold">{brand.stats.totalProducts}</p>
                  <p className="text-xs text-white/80">Produtos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{brand.stats.discountedProducts}</p>
                  <p className="text-xs text-white/80">Em Oferta</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{brand.stats.categories.length}</p>
                  <p className="text-xs text-white/80">Categorias</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <Link href={`/products?brand=${brand.slug}`}>
                  <Button 
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                  >
                    Ver Todos os Produtos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Play Button */}
            {brand.video && !showVideo && (
              <button
                onClick={() => {
                  setShowVideo(true)
                  setIsPlaying(true)
                }}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
              >
                <Play className="h-5 w-5" />
              </button>
            )}

            {/* Video Controls */}
            {brand.video && showVideo && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => {
                    setShowVideo(false)
                    setIsPlaying(false)
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {brand.trending && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
              {brand.featured && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                  <Crown className="h-3 w-3 mr-1" />
                  Destaque
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente Principal
export default function BrandsListPage() {
  const [brands, setBrands] = useState<BrandItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [loading, setLoading] = useState(true)

  // Carregamento de dados
  useEffect(() => {
    const loadBrands = async () => {
      try {
        // Agrupar produtos por marca
        const brandMap = new Map<string, Product[]>()
        
        products.forEach(product => {
          const brandKey = product.brand.toLowerCase().trim()
          
          if (!brandMap.has(brandKey)) {
            brandMap.set(brandKey, [])
          }
          brandMap.get(brandKey)!.push(product)
        })

        // Criar marcas enriquecidas
        const enhancedBrands: BrandItem[] = []
        
        brandMap.forEach((products, slug) => {
          if (products.length > 0) {
            enhancedBrands.push(createEnhancedBrand(slug, products))
          }
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
  const createEnhancedBrand = (slug: string, products: Product[]): BrandItem => {
    const config = BRAND_CONFIG[slug as keyof typeof BRAND_CONFIG] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      description: `Produtos da marca ${slug}`,
      bannerGradient: 'from-gray-600 to-gray-800',
      image: '/fallback-brand.jpg',
      logo: '/fallback-logo.png',
      established: undefined,
      origin: undefined
    }

    // Calcular estatísticas
    const prices = products.map(p => p.discountPrice || p.price).filter(Boolean)
    const categories = [...new Set(products.map(p => p.category))]
    const discountedProducts = products.filter(p => p.discountPrice && p.discountPrice < p.price).length
    const ratings = products.map(p => p.rating).filter((rating): rating is number => rating !== undefined)
    
    const newProducts = products.filter(p => {
      if (p.createdAt) {
        const created = new Date(p.createdAt)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return created > thirtyDaysAgo
      }
      return false
    }).length

    return {
      id: slug,
      slug,
      name: config.name,
      description: config.description,
      image: config.image,
      video: config.video,
      logo: config.logo,
      bannerGradient: config.bannerGradient,
      products,
      stats: {
        totalProducts: products.length,
        averagePrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
        highestPrice: prices.length > 0 ? Math.max(...prices) : 0,
        lowestPrice: prices.length > 0 ? Math.min(...prices) : 0,
        discountedProducts,
        averageRating: ratings.length > 0 ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)) : 0,
        categories,
        established: config.established,
        origin: config.origin
      },
      featured: products.length > 3,
      trending: newProducts > 0 || discountedProducts > products.length * 0.3,
      verified: ['jbl', 'samsung', 'apple', 'xiaomi', 'dji', 'sony'].includes(slug)
    }
  }

  // Filtros e ordenação
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'trending' && brand.trending) ||
                           (filterBy === 'featured' && brand.featured) ||
                           (filterBy === 'verified' && brand.verified)
      
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
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Nossas <span className="text-uss-primary">Marcas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra produtos das marcas mais renomadas e confiáveis do mercado
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar marcas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-uss-primary"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:border-uss-primary focus:outline-none"
                >
                  <option value="all">Todas</option>
                  <option value="trending">Em Alta</option>
                  <option value="featured">Destacadas</option>
                  <option value="verified">Verificadas</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:border-uss-primary focus:outline-none"
                >
                  <option value="name">Nome</option>
                  <option value="products">Nº Produtos</option>
                  <option value="trending">Popularidade</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Brands List */}
        <div className="space-y-16">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border overflow-hidden"
            >
              <div className="grid lg:grid-cols-5 gap-8 p-8">
                
                {/* Brand Media Card - Fixed (1 card) */}
                <div className="lg:col-span-2">
                  <BrandMediaCard brand={brand} />
                </div>

                {/* Products Carousel - 3 cards */}
                <div className="lg:col-span-3">
                  <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Produtos em Destaque
                        </h3>
                        <Link
                          href={`/products?brand=${brand.slug}`}
                          className="text-uss-primary hover:text-uss-secondary font-medium text-sm flex items-center"
                        >
                          Ver todos
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{brand.stats.totalProducts} produtos</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="h-4 w-4" />
                          <span>{brand.stats.discountedProducts} em oferta</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{brand.stats.categories.length} categorias</span>
                        </div>
                      </div>
                    </div>

                    {/* Products Carousel */}
                    <div className="flex-1">
                      <ProductCarousel 
                        products={brand.products}
                        brandName={brand.name}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBrands.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma marca encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sua marca favorita não está aqui?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato conosco ou explore todos os nossos produtos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-uss-primary hover:bg-gray-100">
                  Ver Todos os Produtos
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-uss-primary">
                  Fale Conosco
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
