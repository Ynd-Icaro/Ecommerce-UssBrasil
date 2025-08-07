'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  Award
} from 'lucide-react'

// Import dos dados
import data from '@/db.json'

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

// Função para formatar preço
const formatPrice = (price: number) => {
  return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

const products = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)]
}))

const featuredProducts = products.filter(product => product.featured).slice(0, 8)

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const brands = [
    { name: 'Apple', logo: '/logos/apple.png', description: 'Inovação que transforma' },
    { name: 'Samsung', logo: '/logos/samsung.png', description: 'Tecnologia inteligente' },
    { name: 'DJI', logo: '/logos/dji.png', description: 'Capturando o impossível' },
    { name: 'JBL', logo: '/logos/jbl.png', description: 'Som que emociona' },
    { name: 'Xiaomi', logo: '/logos/xiaomi.png', description: 'Inovação para todos' },
    { name: 'Geonav', logo: '/logos/geonav.png', description: 'Navegação precisa' }
  ]

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isVideoPlaying) {
        video.play()
      } else {
        video.pause()
      }
    }
  }, [isVideoPlaying])

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Hero Section com Vídeo */}
      <section className="relative h-screen overflow-hidden">
        {/* Vídeo de Fundo */}
        <motion.div style={{ y }} className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={isVideoMuted}
            loop
            playsInline
          >
            <source src="/videos/tech-hero.mp4" type="video/mp4" />
            {/* Fallback para gradiente caso o vídeo não carregue */}
          </video>
          {/* Gradiente de fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C1A33] via-[#1a2b4a] to-[#0E7466]"></div>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Controles do Vídeo */}
        <div className="absolute top-6 right-6 flex space-x-3 z-10">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            {isVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Logo */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-12 flex flex-col justify-center space-y-1 mb-4">
                  <div className="h-2 bg-[#0E7466] rounded-full"></div>
                  <div className="h-2 bg-[#0E7466] rounded-full w-3/4"></div>
                  <div className="h-2 bg-[#0E7466] rounded-full w-1/2"></div>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wide mb-2">
                  USSBRASIL
                </h1>
              </div>

              {/* Slogan */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-3xl md:text-5xl font-light mb-6"
                style={{ color: '#0E7466' }}
              >
                Conectando você ao futuro.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Descubra as tecnologias mais avançadas que transformarão sua experiência digital.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/produtos"
                  className="group bg-[#0E7466] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0C6157] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Explorar Produtos</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/categories"
                  className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#0C1A33] transition-all duration-300 flex items-center justify-center"
                >
                  Ver Categorias
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Indicador de Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Descubra mais</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Seção de Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Zap, title: 'Tecnologia Avançada', description: 'Produtos de última geração' },
              { icon: Shield, title: 'Garantia Estendida', description: 'Proteção completa' },
              { icon: Truck, title: 'Entrega Rápida', description: 'Receba em casa rapidamente' },
              { icon: Award, title: 'Qualidade Premium', description: 'Apenas produtos originais' }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0E7466] to-[#0C6157] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C1A33] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Marcas */}
      <section className="py-20 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#0C1A33] mb-4">
              Loja especializada
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trabalhamos com as melhores marcas do mercado para oferecer qualidade excepcional
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <span className="text-2xl font-bold text-[#0C1A33]">{brand.name}</span>
                </div>
                <h3 className="font-semibold text-[#0C1A33] mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#0C1A33] mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os produtos mais procurados e as últimas novidades tecnológicas
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.discountPrice && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0E7466] text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0E7466] bg-[#0E7466]/10 px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#0C1A33] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-[#0E7466]">
                            {formatPrice(product.discountPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-[#0E7466]">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    
                    <Link
                      href={`/products/${product.id}`}
                      className="w-10 h-10 bg-[#0E7466] text-white rounded-full flex items-center justify-center hover:bg-[#0C6157] transition-colors duration-300"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <Link
              href="/produtos"
              className="inline-flex items-center space-x-2 bg-[#0E7466] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0C6157] transition-colors duration-300"
            >
              <span>Ver Todos os Produtos</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0C1A33] to-[#1a2b4a] text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6">
              Pronto para o futuro?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes que já escolheram a USSBRASIL para suas necessidades tecnológicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produtos"
                className="bg-[#0E7466] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0C6157] transition-colors duration-300"
              >
                Explorar Catálogo
              </Link>
              <Link
                href="/contato"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0C1A33] transition-all duration-300"
              >
                Falar Conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
