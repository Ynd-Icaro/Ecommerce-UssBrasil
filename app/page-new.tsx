'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VideoPlayer } from '@/components/video/VideoPlayer'
import { ProductCard } from '@/components/product/ProductCard'
import { 
  ArrowRight, 
  Play, 
  Star, 
  Truck, 
  Shield, 
  Headphones,
  Apple,
  Smartphone,
  Laptop,
  Watch,
  Tablet
} from 'lucide-react'

const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    price: 'R$ 10.499',
    originalPrice: 'R$ 11.999',
    image: '/Produtos/Iphone 16 Pro.png',
    category: 'iPhone',
    rating: 4.9,
    isNew: true,
    description: 'Forjado em titânio. Camera Control. Chip A18 Pro.'
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 'R$ 19.999',
    image: '/Produtos/Macbook Pro.png',
    category: 'Mac',
    rating: 4.8,
    isNew: true,
    description: 'Supercharged for pros. Com chip M3 revolucionário.'
  },
  {
    id: '3',
    name: 'iPad Pro M4',
    price: 'R$ 10.499',
    image: '/Produtos/Ipad Pro.png',
    category: 'iPad',
    rating: 4.7,
    isNew: true,
    description: 'O iPad mais fino de todos os tempos.'
  },
  {
    id: '4',
    name: 'Apple Watch Series 10',
    price: 'R$ 4.699',
    image: '/Produtos/Watch Series 10.png',
    category: 'Apple Watch',
    rating: 4.8,
    isNew: true,
    description: 'Mais fino. Mais inteligente. Mais brilhante.'
  }
]

const categories = [
  {
    name: 'iPhone',
    icon: Smartphone,
    description: 'Forjado em titânio',
    href: '/categories/iphone',
    video: '/Videos/IphoneVideo.mp4',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    name: 'Mac',
    icon: Laptop,
    description: 'Supercharged by M3',
    href: '/categories/mac',
    video: '/Videos/Macs Video.mp4',
    gradient: 'from-gray-600 to-gray-800'
  },
  {
    name: 'iPad',
    icon: Tablet,
    description: 'Sua próxima ideia',
    href: '/categories/ipad',
    video: '/Videos/IpadVideo.mp4',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Watch',
    icon: Watch,
    description: 'Sua saúde. Sua vida.',
    href: '/categories/watch',
    video: '/Videos/Apple Watch.mp4',
    gradient: 'from-red-600 to-orange-600'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="absolute inset-0">
          <VideoPlayer
            src="/Videos/IphoneVideo.mp4"
            autoplay
            muted
            loop
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              iPhone 16 Pro
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              Forjado em
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                titânio
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              O iPhone mais poderoso de todos os tempos. Camera Control. Chip A18 Pro. E muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg">
                Comprar a partir de R$ 10.499
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Assistir o filme
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Por que escolher a USS Brasil?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A experiência Apple completa com o melhor atendimento do Brasil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Entrega em todo Brasil',
                description: 'Frete grátis em compras acima de R$ 250. Entrega expressa em capitais.'
              },
              {
                icon: Shield,
                title: 'Garantia Apple',
                description: 'Produtos originais com garantia oficial Apple e suporte técnico especializado.'
              },
              {
                icon: Headphones,
                title: 'Suporte 24/7',
                description: 'Atendimento especializado sempre que você precisar, por chat, telefone ou email.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Explore todos os produtos Apple
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra o ecossistema Apple completo na USS Brasil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={category.href} className="block">
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <VideoPlayer
                      src={category.video}
                      autoplay
                      muted
                      loop
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <category.icon className="h-12 w-12 mb-4 opacity-90" />
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 text-center">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Produtos em destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os lançamentos mais recentes da Apple com preços especiais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild>
              <Link href="/products">
                Ver todos os produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Fique por dentro das novidades
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Seja o primeiro a saber sobre lançamentos, ofertas especiais e eventos Apple
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                Assinar
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
