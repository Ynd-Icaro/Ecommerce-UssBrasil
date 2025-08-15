'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  GiftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import ProductCard from '@/components/product-card-premium'

// Mock data - seria carregado do db.json
const featuredProducts = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro 128GB",
    slug: "iphone-16-pro-128gb",
    price: 8999.00,
    discountPrice: 8499.00,
    category: "apple",
    marca: "Apple",
    image: "/Public/Produtos/Apple/Iphone 16 Pro.png",
    images: [
      "/Public/Produtos/Apple/iphone-16-pro-Max-Apresentacao.webp",
      "/Public/Produtos/Apple/iphone-16-pro-Max-Titanio-natural.webp"
    ],
    description: "iPhone 16 Pro com chip A18 Pro revolucionário",
    shortDescription: "iPhone 16 Pro com chip A18 Pro, sistema de câmeras Pro avançado e tela Super Retina XDR.",
    stock: 15,
    rating: 4.9,
    reviewsCount: 127,
    featured: true,
    isNew: true,
    bestSeller: true,
    vipOnly: false,
    colors: [
      { name: "Titânio Natural", hex: "#F5F5DC", image: "/Public/Produtos/Apple/iphone-16-pro-titanio-natural.webp" }
    ],
    tags: ["smartphone", "premium", "pro", "camera-avancada"]
  }
]

const banners = [
  {
    id: 1,
    title: "USS Brasil",
    subtitle: "Tecnologia Premium que Transforma Vidas",
    description: "Descubra produtos Apple, JBL, DJI, Xiaomi e Geonav com qualidade excepcional",
    image: "/Public/banners/hero-banner.webp",
    video: "/Public/Videos/uss-brasil-hero.mp4",
    cta: "Explorar Produtos",
    link: "/produtos"
  },
  {
    id: 2,
    title: "Black Friday USS Brasil",
    subtitle: "Até 40% OFF em Produtos Selecionados",
    description: "Ofertas exclusivas por tempo limitado",
    image: "/Public/banners/black-friday.webp",
    cta: "Ver Ofertas",
    link: "/ofertas"
  }
]

const benefits = [
  {
    icon: TruckIcon,
    title: "Frete Grátis",
    description: "Para todo o Brasil acima de R$ 299"
  },
  {
    icon: ShieldCheckIcon,
    title: "Garantia Oficial",
    description: "Produtos com garantia das marcas"
  },
  {
    icon: GiftIcon,
    title: "Parcelamento",
    description: "Até 12x sem juros no cartão"
  },
  {
    icon: SparklesIcon,
    title: "Área VIP",
    description: "Benefícios exclusivos para membros"
  }
]

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-ussbrasil-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {showVideo && banners[currentBanner].video ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src={banners[currentBanner].video} type="video/mp4" />
              </video>
              {!videoLoaded && (
                <Image
                  src={banners[currentBanner].image}
                  alt={banners[currentBanner].title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          ) : (
            <Image
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              fill
              className="object-cover"
              priority
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          {/* Opaque Mirror Effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-ussbrasil-primary to-ussbrasil-secondary rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-3xl">USS</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-ussbrasil-accent rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="text-left">
                  <h1 className="text-5xl md:text-7xl font-bold text-white">
                    {banners[currentBanner].title}
                  </h1>
                  <p className="text-xl text-gray-200 font-light">
                    Tecnologia Premium
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {banners[currentBanner].subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
            >
              {banners[currentBanner].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href={banners[currentBanner].link}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-ussbrasil-primary to-ussbrasil-secondary text-white font-semibold rounded-full shadow-2xl hover:shadow-ussbrasil-primary/50 transition-all duration-300 flex items-center gap-2"
                >
                  {banners[currentBanner].cta}
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.button>
              </Link>

              <Link href="/vip">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  <SparklesIcon className="h-5 w-5" />
                  Área VIP
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Banner Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevBanner}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          
          <div className="flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextBanner}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Video Play Button */}
        {!showVideo && banners[currentBanner].video && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center z-5"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <PlayIcon className="h-10 w-10 text-white ml-1" />
            </div>
          </motion.button>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm font-medium">Explore</span>
            <div className="w-1 h-8 bg-white/50 rounded-full">
              <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-ussbrasil-primary to-ussbrasil-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-20 bg-white dark:bg-ussbrasil-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Descubra nossa seleção exclusiva de produtos premium das melhores marcas do mundo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                  onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
                  onQuickView={(id) => console.log('Quick view:', id)}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/produtos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-ussbrasil-primary to-ussbrasil-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ver Todos os Produtos
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="py-20 bg-gradient-to-r from-ussbrasil-premium via-gray-900 to-ussbrasil-premium text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #d4af37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d4af37 0%, transparent 50%)',
            backgroundSize: '100px 100px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <SparklesIcon className="h-8 w-8 text-ussbrasil-gold" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Área VIP
              </h2>
              <SparklesIcon className="h-8 w-8 text-ussbrasil-gold" />
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experiência exclusiva com produtos limitados, ofertas especiais e benefícios únicos para nossos membros VIP
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Produtos Exclusivos</h3>
                <p className="text-gray-400">Acesso antecipado a lançamentos e edições limitadas</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GiftIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Descontos Especiais</h3>
                <p className="text-gray-400">Até 50% OFF em produtos selecionados</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Suporte Premium</h3>
                <p className="text-gray-400">Atendimento prioritário 24/7</p>
              </div>
            </div>

            <Link href="/vip">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
              >
                Tornar-se VIP
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
