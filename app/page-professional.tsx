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
  Zap,
  Shield,
  Truck,
  Award,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
  Globe,
  Clock,
  CheckCircle,
  Package,
  Eye,
  Sparkles
} from 'lucide-react'

import data from '@/db.json'
import EnhancedProductCard from '@/components/product/enhanced-product-card'

// Animation configs
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

// Helpers
const formatPrice = (price: number) =>
  `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

const fixPath = (path: string) => {
  if (!path) return ''
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
}))

const featuredProducts = products.filter(product => product.featured).slice(0, 12)
const premiumProducts = products.filter(product => product.price > 5000).slice(0, 8)
const newProducts = products.slice(0, 8)

// Videos premium para hero
const heroVideos = [
  {
    src: '/Videos/IphoneVideo.mp4',
    title: 'iPhone 15 Pro',
    subtitle: 'Titânio. Tão forte. Tão leve. Tão Pro.',
    description: 'O iPhone mais avançado já criado, com chip A17 Pro revolucionário.',
    cta: 'Descubra o iPhone 15 Pro',
    link: '/categories/iphone',
    color: 'from-slate-900 via-gray-900 to-black'
  },
  {
    src: '/Videos/IpadVideo.mp4',
    title: 'iPad Pro',
    subtitle: 'Poder para os profissionais.',
    description: 'Performance de MacBook em um iPad incrivelmente versátil.',
    cta: 'Explore o iPad Pro',
    link: '/categories/ipad',
    color: 'from-blue-900 via-indigo-900 to-purple-900'
  },
  {
    src: '/Videos/Apple Watch.mp4',
    title: 'Apple Watch Series 9',
    subtitle: 'Seu assistente de saúde mais inteligente.',
    description: 'Monitore sua saúde com precisão científica.',
    cta: 'Conheça o Apple Watch',
    link: '/categories/apple-watch',
    color: 'from-emerald-900 via-teal-900 to-cyan-900'
  },
  {
    src: '/Videos/Macs Video.mp4',
    title: 'MacBook Pro M3',
    subtitle: 'Performance sem precedentes.',
    description: 'Poder do chip M3 para profissionais exigentes.',
    cta: 'Descubra o MacBook Pro',
    link: '/categories/macbook',
    color: 'from-gray-900 via-neutral-900 to-black'
  }
]

const brands = [
  {
    name: 'Apple',
    logo: '/Empresa/02.png',
    description: 'Think Different',
    tagline: 'Inovação que transforma o mundo',
    products: products.filter(p => p.brand.toLowerCase().includes('apple')).length,
    color: 'from-gray-800 to-black',
    category: 'premium'
  },
  {
    name: 'JBL',
    logo: '/icons/jbl-logo.svg',
    description: 'Dare to Listen',
    tagline: 'Som premium para sua vida',
    products: products.filter(p => p.brand.toLowerCase().includes('jbl')).length,
    color: 'from-orange-500 to-red-600',
    category: 'audio'
  },
  {
    name: 'DJI',
    logo: '/icons/dji-logo.svg',
    description: 'The Future of Possible',
    tagline: 'Tecnologia de voo avançada',
    products: products.filter(p => p.brand.toLowerCase().includes('dji')).length,
    color: 'from-blue-600 to-indigo-700',
    category: 'innovation'
  },
  {
    name: 'Xiaomi',
    logo: '/icons/xiaomi-logo.svg',
    description: 'Just for You',
    tagline: 'Inovação acessível para todos',
    products: products.filter(p => p.brand.toLowerCase().includes('xiaomi')).length,
    color: 'from-orange-400 to-orange-600',
    category: 'value'
  }
]

// Stats para mostrar credibilidade
const companyStats = [
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

// Enhanced Video Hero Component
type VideoHeroProps = {
  videos: typeof heroVideos
  currentVideoIndex: number
  setCurrentVideoIndex: (value: number | ((prev: number) => number)) => void
  isVideoPlaying: boolean
  setIsVideoPlaying: (fn: (prev: boolean) => boolean | boolean) => void
  isVideoMuted: boolean
  setIsVideoMuted: (fn: (prev: boolean) => boolean | boolean) => void
  showControls: boolean
  setShowControls: (show: boolean) => void
  videoRef: React.RefObject<HTMLVideoElement | null>
  y: any
}

const ProfessionalVideoHero: FC<VideoHeroProps> = ({
  videos,
  currentVideoIndex,
  setCurrentVideoIndex,
  isVideoPlaying,
  setIsVideoPlaying,
  isVideoMuted,
  setIsVideoMuted,
  showControls,
  setShowControls,
  videoRef,
  y
}) => {
  const currentVideo = videos[currentVideoIndex]
  
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          src={currentVideo.src}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          onCanPlay={() => {
            try {
              if (isVideoPlaying && videoRef.current) {
                videoRef.current.play().catch(console.error)
              }
            } catch (error) {
              console.error('Video play error:', error)
            }
          }}
          preload="metadata"
        />
        
        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentVideo.color} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </motion.div>

      {/* Floating USS Brasil Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-1/2 right-12 transform -translate-y-1/2 z-30 hidden lg:block"
      >
        <div className="relative">
          <div className="w-44 h-44 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
            <Image
              src="/Empresa/02.png"
              alt="USS Brasil"
              width={120}
              height={120}
              className="object-contain filter drop-shadow-2xl"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-uss-primary/20 to-uss-secondary/20 rounded-full animate-pulse" />
          <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 mb-8"
              >
                <Sparkles className="h-5 w-5 text-uss-secondary" />
                <span className="text-sm font-medium">Novo Lançamento</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
              >
                {currentVideo.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-uss-secondary"
              >
                {currentVideo.subtitle}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-light"
              >
                {currentVideo.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={currentVideo.link}
                    className="group inline-flex items-center space-x-3 bg-white text-black px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-uss-secondary hover:text-white transition-all duration-500 shadow-2xl"
                  >
                    <span>{currentVideo.cta}</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button className="group inline-flex items-center space-x-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                    <Eye className="h-6 w-6" />
                    <span>Ver Demonstração</span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentVideoIndex(prev => prev === 0 ? videos.length - 1 : prev - 1)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </motion.button>

          {/* Video Indicators */}
          <div className="flex space-x-2">
            {videos.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex
                    ? 'bg-white shadow-lg scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentVideoIndex(prev => prev === videos.length - 1 ? 0 : prev + 1)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoPlaying(prev => !prev)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            {isVideoPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </motion.button>

          {/* Mute */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoMuted(prev => !prev)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
          >
            {isVideoMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-30 hidden lg:block"
      >
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium rotate-90 origin-center whitespace-nowrap">
            Scroll para explorar
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

// Company Stats Section
const CompanyStatsSection: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-uss-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-uss-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-light text-gray-900 mb-6"
          >
            Excelência{' '}
            <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
              Comprovada
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Números que refletem nosso compromisso com a excelência e a satisfação dos nossos clientes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-uss-primary/5 to-uss-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-uss-primary/10 to-uss-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-uss-primary group-hover:text-uss-secondary transition-colors duration-300" />
                  </div>
                </div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-uss-primary transition-colors duration-300"
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-uss-secondary transition-colors duration-300">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-uss-primary to-uss-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Premium Experience Section
const PremiumExperienceSection: FC = () => {
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section 
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-uss-primary/20"
    >
      {/* Background Elements */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[url('/images/tech-pattern.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-uss-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-uss-secondary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 mb-8"
            >
              <Award className="h-5 w-5 text-uss-secondary" />
              <span className="text-sm font-medium">Experiência Premium</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl lg:text-6xl font-light leading-tight mb-8"
            >
              Tecnologia que{' '}
              <span className="bg-gradient-to-r from-uss-secondary to-white bg-clip-text text-transparent font-semibold">
                Inspira
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-300 font-light leading-relaxed mb-12"
            >
              Cada produto em nossa curadoria é escolhido para proporcionar uma experiência 
              que transcende o comum. Inovação, design e performance se unem para criar 
              momentos únicos em sua vida digital.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6 mb-12"
            >
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
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-uss-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/products"
                  className="group inline-flex items-center space-x-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-500"
                >
                  <span>Explorar Produtos</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contato"
                  className="group inline-flex items-center space-x-3 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <span>Falar com Especialista</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            {/* Featured Product */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1, 1.02, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-20 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              >
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-uss-secondary hover:text-white transition-all duration-300"
                    >
                      Comprar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-uss-primary/20 to-uss-secondary/20 rounded-full blur-xl"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-uss-secondary/20 to-uss-primary/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Main Component
export default function ProfessionalHomePage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Auto-rotate videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)
    }, 15000) // Change video every 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Control video playback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isVideoPlaying) {
      video.play().catch(console.error)
    } else {
      video.pause()
    }
  }, [isVideoPlaying, currentVideoIndex])

  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero */}
      <ProfessionalVideoHero
        videos={heroVideos}
        currentVideoIndex={currentVideoIndex}
        setCurrentVideoIndex={setCurrentVideoIndex}
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
        isVideoMuted={isVideoMuted}
        setIsVideoMuted={setIsVideoMuted}
        showControls={showControls}
        setShowControls={setShowControls}
        videoRef={videoRef}
        y={y}
      />

      {/* Company Stats */}
      <CompanyStatsSection />

      {/* Premium Experience */}
      <PremiumExperienceSection />

      {/* Featured Products Section - Enhanced */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-light text-gray-900 mb-6"
            >
              Produtos{' '}
              <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
                Destacados
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Curadoria especial dos produtos mais inovadores e desejados do mercado.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <EnhancedProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Ver Todos os Produtos</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brands Section - Enhanced */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-uss-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-uss-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-light text-gray-900 mb-6"
            >
              Marcas{' '}
              <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
                Parceiras
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Parcerias estratégicas com as maiores marcas de tecnologia do mundo.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <Link href={`/products?brand=${brand.name.toLowerCase()}`}>
                  <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Logo Container */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                        <div className="relative w-14 h-14">
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="text-center relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-uss-primary transition-colors duration-300">
                        {brand.name}
                      </h3>
                      <p className="text-sm font-medium text-uss-primary mb-2 opacity-80">
                        {brand.description}
                      </p>
                      <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                        {brand.tagline}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium group-hover:bg-uss-primary/10 transition-colors duration-300">
                        <div className="w-2 h-2 bg-uss-primary rounded-full" />
                        <span className="text-gray-700">
                          {brand.products} produtos
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-uss-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
