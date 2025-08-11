'use client'

import { useState, useEffect, useRef, FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowRight,
  Star,
  ShoppingCart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  Shield,
  Truck,
  Award,
  Users,
  Package,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Sparkles,
  TrendingUp
} from 'lucide-react'

import data from '@/db.json'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useModal } from '@/contexts/ModalContext'

// Helpers
const formatPrice = (price: number) =>
  `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

// Data
const products = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  rating: p.rating || 4.5,
  reviews: p.totalReviews || 50,
  originalPrice: p.discountPrice ? p.price : undefined
})).slice(0, 20) // Limitando a 20 produtos

// Videos para hero section
const heroVideos = [
  {
    src: '/Videos/IphoneVideo.mp4',
    title: 'iPhone 15 Pro',
    subtitle: 'Titânio. Tão forte. Tão leve. Tão Pro.',
    cta: 'Descubra Agora',
    link: '/products'
  },
  {
    src: '/Videos/IpadVideo.mp4',
    title: 'iPad Pro',
    subtitle: 'Poder para os profissionais.',
    cta: 'Explore Agora',
    link: '/products'
  },
  {
    src: '/Videos/Apple Watch.mp4',
    title: 'Apple Watch',
    subtitle: 'Seu assistente de saúde mais inteligente.',
    cta: 'Conheça Agora',
    link: '/products'
  }
]

// Marcas especializadas
const specializedBrands = [
  {
    name: 'Apple',
    logo: '/icons/Apple.png',
    description: 'Think Different',
    count: products.filter(p => p.brand.toLowerCase().includes('apple')).length
  },
  {
    name: 'JBL',
    logo: '/icons/JBL Logo.png',
    description: 'Dare to Listen',
    count: products.filter(p => p.brand.toLowerCase().includes('jbl')).length
  },
  {
    name: 'DJI',
    logo: '/icons/Dji Logo.jpg',
    description: 'The Future of Possible',
    count: products.filter(p => p.brand.toLowerCase().includes('dji')).length
  },
  {
    name: 'Xiaomi',
    logo: '/icons/Xiomi Logo.png',
    description: 'Just for You',
    count: products.filter(p => p.brand.toLowerCase().includes('xiaomi')).length
  },
  {
    name: 'GeoNav',
    logo: '/icons/GeoNav.jpg',
    description: 'Navigate Your World',
    count: products.filter(p => p.brand.toLowerCase().includes('geonav')).length
  }
]

// Stats de excelência
const excellenceStats = [
  {
    icon: Users,
    number: '50K+',
    label: 'Clientes Satisfeitos',
    description: 'Experiências transformadoras'
  },
  {
    icon: Package,
    number: '10K+',
    label: 'Produtos Entregues',
    description: 'Tecnologia em suas mãos'
  },
  {
    icon: Award,
    number: '99.8%',
    label: 'Satisfação',
    description: 'Excelência comprovada'
  },
  {
    icon: Shield,
    number: '24/7',
    label: 'Suporte Premium',
    description: 'Cuidado especializado'
  }
]

// Video Hero Section
const VideoHeroSection: FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  const currentVideo = heroVideos[currentVideoIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(console.error)
      } else {
        videoRef.current.pause()
      }
    }
  }, [isVideoPlaying, currentVideoIndex])

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          ref={videoRef}
          src={currentVideo.src}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
            >
              {currentVideo.title}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl font-light mb-12 text-gray-200 max-w-3xl mx-auto"
            >
              {currentVideo.subtitle}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href={currentVideo.link}
                className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-uss-secondary hover:text-white transition-all duration-300 group"
              >
                <span>{currentVideo.cta}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button className="inline-flex items-center space-x-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <Eye className="h-5 w-5" />
                <span>Ver Demonstração</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-xl rounded-2xl px-6 py-4">
          <button
            onClick={() => setCurrentVideoIndex(prev => prev === 0 ? heroVideos.length - 1 : prev - 1)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>

          <div className="flex space-x-2">
            {heroVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentVideoIndex(prev => prev === heroVideos.length - 1 ? 0 : prev + 1)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>

          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
          >
            {isVideoPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
          </button>

          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300"
          >
            {isVideoMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
          </button>
        </div>
      </div>
    </section>
  )
}

// Brands Section
const BrandsSection: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            Marcas{' '}
            <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
              Especializadas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Parcerias estratégicas com as maiores marcas de tecnologia do mundo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {specializedBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group"
            >
              <Link href={`/products?brand=${brand.name.toLowerCase()}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{brand.name}</h3>
                  <p className="text-sm text-uss-primary mb-3">{brand.description}</p>
                  <div className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                    <span className="text-gray-700">{brand.count} produtos</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Products Carousel
const ProductsCarousel: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  // Context hooks
  const { addToCart } = useCart()
  const { favorites, toggleFavorite, user } = useAuth()
  const { openAuthModal } = useModal()

  const productsPerSlide = 4
  const totalSlides = Math.ceil(products.length / productsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleToggleFavorite = (productId: string) => {
    if (!user) {
      openAuthModal()
      return
    }
    toggleFavorite(productId)
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand
    })
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentProducts = products.slice(
    currentSlide * productsPerSlide,
    (currentSlide + 1) * productsPerSlide
  )

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
            Nossos{' '}
            <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
              Produtos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curadoria especial dos produtos mais inovadores e desejados do mercado.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50 p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.featured && (
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          DESTAQUE
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleToggleFavorite(product.id)
                        }}
                        className={`p-2 rounded-full backdrop-blur-lg transition-all duration-300 ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <Link href={`/produtos/${product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${product.id}`}>
                        <button className="p-2 bg-white/90 backdrop-blur-lg text-gray-600 hover:bg-uss-primary hover:text-white rounded-full transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="text-sm text-uss-primary font-medium mb-2">{product.brand}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-uss-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-uss-primary text-white hover:bg-uss-secondary"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className="p-2 bg-white shadow-lg rounded-full hover:bg-uss-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-uss-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 bg-white shadow-lg rounded-full hover:bg-uss-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Ver Todos os Produtos</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Excellence Section
const ExcellenceSection: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-uss-primary to-uss-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Excelência{' '}
            <span className="font-semibold">
              Comprovada
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Números que refletem nosso compromisso com a excelência e a satisfação dos nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {excellenceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              <h4 className="text-lg font-semibold mb-1">{stat.label}</h4>
              <p className="text-sm text-white/80">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Technology Inspiration Section
const TechnologySection: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-uss-primary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Tecnologia que{' '}
              <span className="bg-gradient-to-r from-uss-secondary to-white bg-clip-text text-transparent font-semibold">
                Inspira
              </span>
            </h2>

            <p className="text-xl text-gray-300 font-light leading-relaxed mb-12">
              Cada produto em nossa curadoria é escolhido para proporcionar uma experiência 
              que transcende o comum. Inovação, design e performance se unem para criar 
              momentos únicos em sua vida digital.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: Shield,
                  title: 'Garantia Premium',
                  description: 'Cobertura estendida e suporte especializado'
                },
                {
                  icon: Truck,
                  title: 'Entrega Express',
                  description: 'Receba em casa com instalação gratuita'
                },
                {
                  icon: Users,
                  title: 'Consultoria Personalizada',
                  description: 'Especialistas dedicados ao seu sucesso'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-uss-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Explorar Produtos</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/contato"
                className="inline-flex items-center space-x-3 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                <span>Falar com Especialista</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              <div className="relative z-20 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="aspect-square relative mb-6">
                  <Image
                    src="/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png"
                    alt="iPhone 15 Pro"
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">iPhone 15 Pro</h3>
                  <p className="text-gray-300 mb-4">Titânio. Revolucionário.</p>
                  <div className="text-3xl font-bold text-uss-secondary mb-4">
                    {formatPrice(8999)}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-uss-secondary hover:text-white transition-all duration-300">
                      Comprar
                    </button>
                    <button className="p-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-300">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-uss-primary/20 to-uss-secondary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-uss-secondary/20 to-uss-primary/20 rounded-full blur-xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Newsletter Section
const NewsletterSection: FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-uss-primary to-uss-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            Fique por dentro das{' '}
            <span className="font-semibold">Novidades</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Seja o primeiro a saber sobre lançamentos, ofertas exclusivas e tecnologias revolucionárias.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-uss-primary rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Assinar
              </button>
            </div>
          </motion.form>

          <AnimatePresence>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 flex items-center justify-center gap-2 text-white"
              >
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Obrigado! Você foi inscrito com sucesso.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/Empresa/02.png"
                  alt="USS Brasil"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">
                USS Brasil
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Especialistas em tecnologia premium. Oferecemos os produtos mais inovadores 
              com atendimento personalizado e garantia de excelência.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-white/10 rounded-lg hover:bg-uss-primary hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Produtos', href: '/products' },
                { name: 'Categorias', href: '/categories' },
                { name: 'Ofertas', href: '/ofertas' },
                { name: 'Novidades', href: '/novidades' },
                { name: 'Sobre Nós', href: '/sobre' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-uss-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-uss-secondary" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-uss-secondary" />
                <span className="text-gray-300">contato@ussbrasil.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-uss-secondary mt-1" />
                <span className="text-gray-300">
                  São Paulo, SP<br />
                  Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 USS Brasil. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidade" className="text-gray-400 hover:text-uss-secondary text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-400 hover:text-uss-secondary text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Homepage Component
export default function ImprovedHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <VideoHeroSection />
      <BrandsSection />
      <ProductsCarousel />
      <ExcellenceSection />
      <TechnologySection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
