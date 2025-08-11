'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ChevronRight, 
  Star, 
  Heart, 
  ShoppingCart, 
  Filter, 
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Search,
  Sparkles,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

// Enhanced Types
interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  video?: string
  rating: number
  reviews: number
  stock: number
  isNew: boolean
  isFavorite: boolean
  isTrending: boolean
  isAward: boolean
  tags: string[]
  description: string
  specifications: Record<string, string>
  colors: string[]
  discount?: number
}

interface Category {
  id: string
  name: string
  slug: string
  title: string
  description: string
  image: string
  video?: string
  heroImages: string[]
  heroVideos: string[]
  icon: string
  productCount: number
  tags: string[]
  featured: boolean
}

interface FilterState {
  priceRange: [number, number]
  brands: string[]
  rating: number
  isNew: boolean
  isOnSale: boolean
  inStock: boolean
  colors: string[]
}

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 7999,
    originalPrice: 8999,
    image: '/products/iphone-15-pro-max.jpg',
    images: [
      '/products/iphone-15-pro-max.jpg',
      '/products/iphone-15-pro-max-back.jpg',
      '/products/iphone-15-pro-max-side.jpg'
    ],
    video: '/products/iphone-15-pro-max-video.mp4',
    rating: 4.8,
    reviews: 245,
    stock: 15,
    isNew: true,
    isFavorite: false,
    isTrending: true,
    isAward: true,
    tags: ['Premium', 'Pro', '5G', 'AI'],
    description: 'O iPhone mais avançado já criado com chip A17 Pro e câmera revolucionária.',
    specifications: {
      'Tela': '6.7" Super Retina XDR',
      'Chip': 'A17 Pro',
      'Câmera': 'Sistema Pro de câmeras de 48MP',
      'Bateria': 'Até 29 horas de reprodução de vídeo'
    },
    colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto'],
    discount: 11
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    price: 6899,
    originalPrice: 7299,
    image: '/products/galaxy-s24-ultra.jpg',
    images: [
      '/products/galaxy-s24-ultra.jpg',
      '/products/galaxy-s24-ultra-back.jpg'
    ],
    rating: 4.7,
    reviews: 189,
    stock: 8,
    isNew: true,
    isFavorite: false,
    isTrending: true,
    isAward: false,
    tags: ['Android', 'S Pen', 'AI', '200MP'],
    description: 'Galaxy S24 Ultra com S Pen integrada e câmera de 200MP.',
    specifications: {
      'Tela': '6.8" Dynamic AMOLED 2X',
      'Processador': 'Snapdragon 8 Gen 3',
      'Câmera': '200MP + 50MP + 12MP + 10MP',
      'Bateria': '5000mAh'
    },
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    discount: 5
  },
  // Add more products...
]

const mockCategory: Category = {
  id: 'smartphones',
  name: 'Smartphones',
  slug: 'smartphones',
  title: 'Smartphones Premium',
  description: 'Descubra os smartphones mais avançados do mercado com tecnologia de ponta e design excepcional.',
  image: '/categories/smartphones-hero.jpg',
  video: '/categories/smartphones-hero-video.mp4',
  heroImages: [
    '/categories/smartphones-hero-1.jpg',
    '/categories/smartphones-hero-2.jpg',
    '/categories/smartphones-hero-3.jpg'
  ],
  heroVideos: [
    '/categories/smartphones-video-1.mp4',
    '/categories/smartphones-video-2.mp4'
  ],
  icon: '📱',
  productCount: 142,
  tags: ['Premium', 'Tecnologia', 'Inovação'],
  featured: true
}

// Component for Individual Product Card
const ProductCard = ({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) => {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(product.isFavorite)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as any }
    },
    hover: {
      y: -8,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        className="group"
      >
        <Link href={`/produtos/${category.slug}/${product.id}`}>
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900">
            <div className="flex">
              {/* Image Section */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-product.jpg'
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">Novo</Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                  )}
                  {product.isTrending && (
                    <Badge className="bg-orange-500 text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white"
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                    {product.isAward && (
                      <Award className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} avaliações)
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
                    </p>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produtos/${category.slug}/${product.id}`}>
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900">
          <div className="relative h-64 overflow-hidden">
            {/* Product Image with Hover Effect */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[currentImageIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-product.jpg'
                }}
              />
            </motion.div>

            {/* Image Navigation Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                  />
                ))}
              </div>
            )}

            {/* Video Play Button */}
            {product.video && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-green-500 text-white">Novo</Badge>
              )}
              {product.discount && (
                <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
              )}
              {product.isTrending && (
                <Badge className="bg-orange-500 text-white flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-2 right-2 flex flex-col gap-2"
            >
              <Button
                variant="ghost"
                size="sm"
                className="p-2 bg-white/80 hover:bg-white"
                onClick={toggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 bg-white/80 hover:bg-white"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 text-gray-600" />
              </Button>
            </motion.div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Brand and Awards */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{product.brand}</span>
              {product.isAward && (
                <Award className="w-4 h-4 text-yellow-500" />
              )}
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviews})
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    R$ {product.originalPrice.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
              </p>
            </div>

            {/* Color Options */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 mr-2">Cores:</span>
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

// Main Category Page Component
const CategoryPageContent = () => {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  // State Management
  const [category, setCategory] = useState<Category>(mockCategory)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popularity')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    brands: [],
    rating: 0,
    isNew: false,
    isOnSale: false,
    inStock: true,
    colors: []
  })

  // References
  const heroRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-advance hero carousel
    if (category.heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => 
          prev === category.heroImages.length - 1 ? 0 : prev + 1
        )
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [category.heroImages.length])

  useEffect(() => {
    // Apply filters and sorting
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const matchesRating = product.rating >= filters.rating
      const matchesNew = !filters.isNew || product.isNew
      const matchesOnSale = !filters.isOnSale || product.discount && product.discount > 0
      const matchesStock = !filters.inStock || product.stock > 0

      return matchesSearch && matchesPrice && matchesBrand && matchesRating && 
             matchesNew && matchesOnSale && matchesStock
    })

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default: // popularity
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(filtered)
  }, [products, filters, sortBy, searchQuery])

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] as any }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Carregando produtos premium...
            </p>
            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pt-24 lg:pt-28 relative overflow-hidden">
      {/* Background decorativo premium */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(84,196,207,0.12) 0%, rgba(6,90,132,0.06) 40%, transparent 80%)'
          }}
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        variants={heroVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        {/* Background Image/Video Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {category.video && currentHeroIndex === 0 ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                >
                  <source src={category.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={category.heroImages[currentHeroIndex] || category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-category.jpg'
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl space-y-6">
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/categorias" className="hover:text-white transition-colors">
                  Categorias
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{category.name}</span>
              </motion.nav>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium"
              >
                <span className="text-2xl">{category.icon}</span>
                Categoria Premium
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-white leading-tight"
              >
                {category.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-white/90 leading-relaxed"
              >
                {category.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8"
              >
                <motion.div variants={statsVariants} className="text-center">
                  <div className="text-3xl font-bold text-white">{filteredProducts.length}</div>
                  <div className="text-sm text-white/80">Produtos</div>
                </motion.div>
                <motion.div variants={statsVariants} className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {[...new Set(products.map(p => p.brand))].length}
                  </div>
                  <div className="text-sm text-white/80">Marcas</div>
                </motion.div>
                <motion.div variants={statsVariants} className="text-center">
                  <div className="text-3xl font-bold text-white">4.8</div>
                  <div className="text-sm text-white/80">Avaliação</div>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    const productsSection = document.getElementById('products-section')
                    productsSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Explorar Produtos
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        {category.video && currentHeroIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 right-6 flex gap-2"
          >
            <Button
              variant="ghost"
              size="sm"
              className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={toggleVideoPlay}
            >
              {isVideoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </motion.div>
        )}

        {/* Hero Navigation Dots */}
        {category.heroImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {category.heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHeroIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentHeroIndex(index)}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Filters and Search Section */}
      <section className="py-8 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Mais Popular</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                  <SelectItem value="newest">Mais Recente</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 space-y-6">
                  <SheetHeader>
                    <SheetTitle>Filtros Avançados</SheetTitle>
                  </SheetHeader>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Faixa de Preço</label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))
                      }
                      max={10000}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>R$ {filters.priceRange[0].toLocaleString('pt-BR')}</span>
                      <span>R$ {filters.priceRange[1].toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Marcas</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {[...new Set(products.map(p => p.brand))].map(brand => (
                        <label key={brand} className="flex items-center space-x-2">
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
                            className="rounded"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Avaliação Mínima</label>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => setFilters(prev => ({ ...prev, rating }))}
                          />
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm">& acima</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Outros Filtros</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.isNew}
                          onChange={(e) => 
                            setFilters(prev => ({ ...prev, isNew: e.target.checked }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Apenas produtos novos</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.isOnSale}
                          onChange={(e) => 
                            setFilters(prev => ({ ...prev, isOnSale: e.target.checked }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Em promoção</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.inStock}
                          onChange={(e) => 
                            setFilters(prev => ({ ...prev, inStock: e.target.checked }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Em estoque</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFilters({
                      priceRange: [0, 10000],
                      brands: [],
                      rating: 0,
                      isNew: false,
                      isOnSale: false,
                      inStock: true,
                      colors: []
                    })}
                  >
                    Limpar Filtros
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.brands.length > 0 || filters.rating > 0 || filters.isNew || filters.isOnSale || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Busca: "{searchQuery}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchQuery('')}
                  />
                </Badge>
              )}
              {filters.brands.map(brand => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                  {brand}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      brands: prev.brands.filter(b => b !== brand)
                    }))}
                  />
                </Badge>
              ))}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.rating}+ estrelas
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                  />
                </Badge>
              )}
              {filters.isNew && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Produtos novos
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setFilters(prev => ({ ...prev, isNew: false }))}
                  />
                </Badge>
              )}
              {filters.isOnSale && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Em promoção
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setFilters(prev => ({ ...prev, isOnSale: false }))}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {filteredProducts.length} produtos encontrados
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {searchQuery 
                ? `Resultados para "${searchQuery}" em ${category.name}`
                : `Todos os produtos da categoria ${category.name}`
              }
            </p>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setFilters({
                    priceRange: [0, 10000],
                    brands: [],
                    rating: 0,
                    isNew: false,
                    isOnSale: false,
                    inStock: true,
                    colors: []
                  })
                }}
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Load More / Pagination could go here */}
      
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Não encontrou o que procura?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Nossa equipe de especialistas pode ajudar você a encontrar o produto perfeito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Falar com Especialista
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Ver Todas as Categorias
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

// Wrapper with Suspense
const CategoryPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando categoria...</p>
        </div>
      </div>
    }>
      <CategoryPageContent />
    </Suspense>
  )
}

export default CategoryPage
