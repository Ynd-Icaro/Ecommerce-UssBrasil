'use client'

import { useState, useEffect, useRef, FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  Phone
} from 'lucide-react'

import data from '@/db.json'
import EnhancedProductCard from '@/components/product/enhanced-product-card'

// Animation configs
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
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
  images: p.images?.map(fixPath) || [fixPath(p.image)]
}))

const featuredProducts = products.filter(product => product.featured).slice(0, 8)

// Videos para rotação na homepage
const heroVideos = [
  {
    src: '/Videos/IphoneVideo.mp4',
    title: 'iPhone',
    subtitle: 'A revolução em suas mãos',
    cta: 'Conheça a linha iPhone',
    link: '/categories/iphone'
  },
  {
    src: '/Videos/IpadVideo.mp4',
    title: 'iPad',
    subtitle: 'Poder e versatilidade',
    cta: 'Explore o iPad',
    link: '/categories/ipad'
  },
  {
    src: '/Videos/Apple Watch.mp4',
    title: 'Apple Watch',
    subtitle: 'Seu parceiro de saúde',
    cta: 'Veja os modelos',
    link: '/categories/apple-watch'
  },
  {
    src: '/Videos/Macs Video.mp4',
    title: 'MacBook',
    subtitle: 'Performance profissional',
    cta: 'Descubra o Mac',
    link: '/categories/mac'
  },
  {
    src: '/Videos/AirPods Video.webm',
    title: 'AirPods',
    subtitle: 'Áudio sem limites',
    cta: 'Ouça a diferença',
    link: '/categories/airpods'
  }
]

const promotionalVideos = [
  {
    src: '/Videos/apple-ecosystem.mp4',
    title: 'Ecossistema Apple',
    subtitle: 'Conecte todos os seus dispositivos',
    cta: 'Explorar Apple',
    link: '/products?brand=apple'
  },
  {
    src: '/Videos/audio-experience.mp4',
    title: 'Experiência de Áudio Premium',
    subtitle: 'Som que transforma cada momento',
    cta: 'Ver Áudio',
    link: '/categories/audio'
  },
  {
    src: '/Videos/drone-innovation.mp4',
    title: 'Inovação que Voa Alto',
    subtitle: 'Capture o mundo de uma nova perspectiva',
    cta: 'Descobrir Drones',
    link: '/categories/drones'
  }
]

const brands = [
  {
    name: 'Apple',
    logo: '/Empresa/02.png',
    description: 'Think Different',
    tagline: 'Inovação que transforma o mundo',
    products: products.filter(p => p.brand.toLowerCase().includes('apple')).length,
    color: 'from-gray-800 to-black'
  },
  {
    name: 'JBL',
    logo: '/icons/jbl-logo.svg',
    description: 'Dare to Listen',
    tagline: 'Som premium para sua vida',
    products: products.filter(p => p.brand.toLowerCase().includes('jbl')).length,
    color: 'from-orange-500 to-red-600'
  },
  {
    name: 'DJI',
    logo: '/icons/dji-logo.svg',
    description: 'The Future of Possible',
    tagline: 'Tecnologia de voo avançada',
    products: products.filter(p => p.brand.toLowerCase().includes('dji')).length,
    color: 'from-blue-600 to-indigo-700'
  },
  {
    name: 'Xiaomi',
    logo: '/icons/xiaomi-logo.svg',
    description: 'Just for You',
    tagline: 'Inovação acessível para todos',
    products: products.filter(p => p.brand.toLowerCase().includes('xiaomi')).length,
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'Geonav',
    logo: '/icons/geonav-logo.svg',
    description: 'Navigate Your World',
    tagline: 'Precisão em navegação GPS',
    products: products.filter(p => p.brand.toLowerCase().includes('geonav')).length,
    color: 'from-green-500 to-emerald-600'
  }
]

// VideoHero
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

const VideoHero: FC<VideoHeroProps> = ({
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
}) => (
  <section className="relative h-screen overflow-hidden">
    {/* Video */}
    <motion.div style={{ y }} className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideoIndex}
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <source src={videos[currentVideoIndex].src} type="video/mp4" />
        </motion.video>
      </AnimatePresence>
    </motion.div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-uss-gray-900/70 via-uss-gray-900/50 to-transparent" />

    {/* Floating Logo */}
    <motion.div
      className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Image
        src="/Empresa/02.png"
        alt="USS Brasil"
        width={120}
        height={120}
        className="object-contain filter drop-shadow-2xl"
      />
    </motion.div>

    {/* Controls */}
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 left-8 z-20 flex items-center space-x-4"
        >
          <button
            onClick={() => setIsVideoPlaying((v: boolean) => !v)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsVideoMuted((v: boolean) => !v)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
          >
            {isVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Video Navigation */}
    <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-2">
      <button
        onClick={() => setCurrentVideoIndex((prev: number) => (prev - 1 + videos.length) % videos.length)}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex items-center space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videos.length)}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>

    {/* Hero Content */}
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="text-center text-white max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient-uss bg-clip-text"
        >
          {videos[currentVideoIndex].title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-uss-off-white"
        >
          {videos[currentVideoIndex].subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            href={videos[currentVideoIndex].link}
            className="bg-gradient-uss-primary hover:bg-gradient-uss-secondary text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
          >
            <span>{videos[currentVideoIndex].cta}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/categories"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-white/20"
          >
            Ver Todas as Categorias
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
)

// QuickCaptureSection - Seção para captar clientes rapidamente (estilo Apple)
const QuickCaptureSection: FC = () => {
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Background Video/Image com Parallax */}
      <motion.div
        style={{ y: parallaxY, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-uss-primary/20">
          <div className="absolute inset-0 bg-[url('/images/tech-pattern.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl lg:text-7xl font-light leading-tight mb-6">
                  Think
                  <br />
                  <span className="bg-gradient-to-r from-uss-secondary to-white bg-clip-text text-transparent font-bold">
                    Different
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed">
                  Descubra produtos que redefinirão sua experiência tecnológica.
                  Inovação, design e performance em perfeita harmonia.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { number: "50+", label: "Produtos Premium" },
                  { number: "10K+", label: "Clientes Satisfeitos" },
                  { number: "99.8%", label: "Satisfação" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-uss-secondary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 font-light">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(83, 196, 207, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white text-black px-8 py-4 rounded-full font-medium text-lg transition-all duration-500 flex items-center justify-center gap-3 hover:bg-uss-secondary hover:text-white"
                >
                  Explorar Produtos
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"  
                >
                  <Phone className="h-5 w-5" />
                  Falar com Especialista
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Product */}
              <motion.div
                whileHover={{ rotateY: 15, rotateX: 5 }}
                transition={{ duration: 0.5 }}
                className="relative transform-gpu perspective-1000"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <motion.div
                    animate={{
                      rotateY: [0, 5, 0, -5, 0],
                      rotateX: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Image
                      src="/Produtos/Apple/Iphone 16 Pro.png"
                      alt="iPhone 16 Pro"
                      width={300}
                      height={300}
                      className="w-full max-w-xs mx-auto drop-shadow-2xl"
                    />

                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-uss-secondary/20 to-transparent rounded-3xl blur-xl"></div>
                  </motion.div>

                  {/* Product Info Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-2xl p-4"
                  >
                    <h4 className="text-white font-semibold text-lg">iPhone 16 Pro</h4>
                    <p className="text-gray-300 text-sm">A partir de R$ 9.999</p>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-gray-300 text-sm ml-2">(4.9)</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Mini Products */}
              {[
                { src: "/Produtos/Apple/airpods-4.png", name: "AirPods Pro", x: -20, y: -10 },
                { src: "/Produtos/Apple/Watch Series 10.png", name: "Apple Watch", x: 20, y: 10 },
                { src: "/Produtos/Apple/Macbook Pro.png", name: "MacBook Pro", x: -30, y: 30 }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20"
                  style={{
                    transform: `translate(${product.x}%, ${product.y}%)`,
                    top: `${20 + index * 25}%`,
                    right: index % 2 === 0 ? '10%' : 'auto',
                    left: index % 2 === 1 ? '10%' : 'auto'
                  }}
                >
                  <Image
                    src={product.src}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-white/20"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { icon: "🚚", title: "Entrega Expressa", subtitle: "24h em SP e região" },
                { icon: "🛡️", title: "Garantia Estendida", subtitle: "Até 3 anos de proteção" },
                { icon: "💳", title: "12x Sem Juros", subtitle: "Nos melhores cartões" },
                { icon: "🎯", title: "Suporte Premium", subtitle: "Atendimento especializado" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// BenefitsSection
const benefits = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Entrega Expressa',
    description: 'Frete grátis em todo o Brasil'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Garantia Oficial',
    description: 'Produtos com garantia de fábrica'
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Qualidade Premium',
    description: 'Apenas produtos originais'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado'
  }
]

const BenefitsSection: FC = () => (
  <section className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-uss-primary to-uss-secondary rounded-full text-white mb-4">
              {benefit.icon}
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
)

// SpecializedBrandsSection (anteriormente BrandsSection)
type BrandsSectionProps = { brands: typeof brands }
const SpecializedBrandsSection: FC<BrandsSectionProps> = ({ brands }) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-72 h-72 bg-uss-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-uss-secondary/5 rounded-full blur-3xl"></div>
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
          className="text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Marcas{' '}
          <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent font-semibold">
            Especializadas
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Parcerias estratégicas com as principais marcas tecnológicas do mercado mundial.
          Qualidade, inovação e excelência em cada produto.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
      >
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            <Link href={`/products?brand=${brand.name.toLowerCase()}`}>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Logo Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-300">
                    <div className="relative w-14 h-14">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback para texto se a imagem não carregar
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-lg font-bold text-gray-700 dark:text-gray-300">${brand.name}</span>`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Floating Icon */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-uss-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ArrowRight className="h-3 w-3 text-white" />
                  </motion.div>
                </div>

                {/* Brand Info */}
                <div className="text-center relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-uss-primary dark:group-hover:text-uss-secondary transition-colors duration-300">
                    {brand.name}
                  </h3>

                  <p className="text-sm font-medium text-uss-primary dark:text-uss-secondary mb-2 opacity-80">
                    {brand.description}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {brand.tagline}
                  </p>

                  {/* Product Count */}
                  <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full text-xs font-medium group-hover:bg-uss-primary/10 dark:group-hover:bg-uss-secondary/10 transition-colors duration-300">
                    <div className="w-2 h-2 bg-uss-primary dark:bg-uss-secondary rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {brand.products} produtos
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-uss-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link
          href="/brands"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          Explorar Todas as Marcas
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </div>
  </section>
)

// RotatingProductsSection - Produtos em rotação
const RotatingProductsSection: FC = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const rotatingProducts = featuredProducts.slice(0, 6) // Pega os 6 primeiros produtos em destaque

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % rotatingProducts.length)
    }, 4000) // Muda a cada 4 segundos
    return () => clearInterval(interval)
  }, [rotatingProducts.length])

  return (
    <section className="py-16 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-uss-primary/5 to-uss-secondary/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Produto <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">em Destaque</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Produtos selecionados especialmente para você, com as melhores ofertas
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProductIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Produto Image */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-8">
                  <Image
                    src={rotatingProducts[currentProductIndex]?.image || '/fallback-product.png'}
                    alt={rotatingProducts[currentProductIndex]?.name || ''}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Badge de desconto */}
                {rotatingProducts[currentProductIndex]?.discountPrice &&
                rotatingProducts[currentProductIndex]?.discountPrice < rotatingProducts[currentProductIndex]?.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{Math.round(((rotatingProducts[currentProductIndex].price - rotatingProducts[currentProductIndex].discountPrice) / rotatingProducts[currentProductIndex].price) * 100)}%
                  </div>
                )}
              </motion.div>

              {/* Produto Info */}
              <div className="space-y-6">
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-uss-primary font-semibold text-lg mb-2"
                  >
                    {rotatingProducts[currentProductIndex]?.brand}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {rotatingProducts[currentProductIndex]?.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-400 text-lg"
                  >
                    {rotatingProducts[currentProductIndex]?.description}
                  </motion.p>
                </div>

                {/* Preço */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  {rotatingProducts[currentProductIndex]?.discountPrice &&
                  rotatingProducts[currentProductIndex]?.discountPrice < rotatingProducts[currentProductIndex]?.price && (
                    <div className="text-gray-500 dark:text-gray-400 line-through text-lg">
                      {formatPrice(rotatingProducts[currentProductIndex].price)}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-uss-primary">
                    {formatPrice(rotatingProducts[currentProductIndex]?.discountPrice || rotatingProducts[currentProductIndex]?.price || 0)}
                  </div>
                  <div className="text-green-600 font-semibold text-lg">
                    🔥 Em até 12x sem juros
                  </div>
                </motion.div>

                {/* Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < (rotatingProducts[currentProductIndex]?.rating || 5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({rotatingProducts[currentProductIndex]?.rating || 5}/5)
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="flex-1 bg-uss-primary hover:bg-uss-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 group">
                    <ShoppingCart className="h-6 w-6" />
                    Comprar Agora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-center gap-3 border-2 border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
                    <Heart className="h-6 w-6" />
                    Favoritar
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center items-center mt-12 gap-3">
            {rotatingProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProductIndex
                    ? 'bg-uss-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-uss-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// FeaturedProductsSection
type FeaturedProductsSectionProps = { featuredProducts: typeof featuredProducts }
const FeaturedProductsSection: FC<FeaturedProductsSectionProps> = ({ featuredProducts }) => (
  <section className="py-16 bg-white dark:bg-uss-gray-800">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Produtos em <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">Destaque</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubra os produtos mais populares e inovadores da nossa coleção
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <EnhancedProductCard product={product} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 bg-gradient-uss-primary hover:bg-gradient-uss-secondary text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"   
        >
          <span>Ver Todos os Produtos</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  </section>
)

// NewsletterSection
const NewsletterSection: FC = () => (
  <section className="py-16 bg-gradient-uss-primary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-white max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4">
          Fique por Dentro das Novidades
        </h2>
        <p className="text-xl mb-8 text-uss-off-white">
          Receba ofertas exclusivas, lançamentos e conteúdo premium diretamente no seu e-mail
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="w-full px-4 py-3 rounded-lg border-0 text-uss-gray-900 placeholder-uss-gray-500 focus:ring-2 focus:ring-uss-secondary"
          />
          <button className="w-full sm:w-auto bg-uss-secondary hover:bg-uss-secondary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
            Inscrever-se
          </button>
        </div>
        <p className="text-sm text-uss-off-white mt-4">
          Não enviamos spam. Seus dados estão seguros conosco.
        </p>
      </motion.div>
    </div>
  </section>
)

// Main Page
const HomePage: FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Auto-rotate videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Video play/pause control
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isVideoPlaying) {
        video.play()
      } else {
        video.pause()
      }
    }
  }, [isVideoPlaying, currentVideoIndex])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <VideoHero
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
      <QuickCaptureSection />
      <BenefitsSection />
      <SpecializedBrandsSection brands={brands} />
      <FeaturedProductsSection featuredProducts={featuredProducts} />
      <RotatingProductsSection />
      <NewsletterSection />
    </div>
  )
}

export default HomePage
