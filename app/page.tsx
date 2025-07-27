'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { featuredProducts as featuredProductsData } from '@/lib/product-data'
import { 
  ArrowRight, 
  Play, 
  Truck, 
  Shield, 
  Headphones,
  Smartphone,
  Laptop,
  Watch,
  Monitor,
  Tablet
} from 'lucide-react'

// ========== CONFIGURAÇÕES DE CATEGORIAS ==========
const categories = [
  {
    name: 'iPhone',
    icon: Smartphone,
    description: 'iPhone 16 Pro - Forjado em titânio',
    href: '/categories/iphone',
    video: '/Videos/IphoneVideo.mp4',
    image: '/Imagens/Iphone-16-Pro.png',
    gradient: 'from-blue-600 to-purple-600',
    price: 'A partir de R$ 10.499'
  },
  {
    name: 'Mac',
    icon: Laptop,
    description: 'Performance que supera expectativas',
    href: '/categories/mac',
    video: '/Videos/Macs Video.mp4',
    image: '/Imagens/Macbook-Pro.png',
    gradient: 'from-gray-600 to-gray-800',
    price: 'A partir de R$ 12.999'
  },
  {
    name: 'iPad',
    icon: Tablet,
    description: 'Sua criatividade, sem limites',
    href: '/categories/ipad',
    video: '/Videos/IpadVideo.mp4',
    image: '/Imagens/Ipad-Pro.png',
    gradient: 'from-purple-600 to-pink-600',
    price: 'A partir de R$ 4.999'
  },
  {
    name: 'Apple Watch',
    icon: Watch,
    description: 'Sua saúde. Sua vida.',
    href: '/categories/watch',
    video: '/Videos/Apple Watch.mp4',
    image: '/Imagens/Watch-Series-10.png',
    gradient: 'from-red-600 to-orange-600',
    price: 'A partir de R$ 3.499'
  },
  {
    name: 'AirPods',
    icon: Headphones,
    description: 'Som que envolve você',
    href: '/categories/airpods',
    video: '/Videos/AirPods Video.webm',
    image: '/Imagens/Air-Pods-Max.png',
    gradient: 'from-indigo-600 to-blue-600',
    price: 'A partir de R$ 1.799'
  },
  {
    name: 'Acessórios',
    icon: Monitor,
    description: 'Complete sua experiência Apple',
    href: '/categories/acessorios',
    video: '/Videos/Macs Video.mp4',
    image: '/Imagens/Studio-Display.png',
    gradient: 'from-green-600 to-teal-600',
    price: 'A partir de R$ 299'
  }
]

// ========== COMPONENTE VIDEOPLAYERPRIMIUM ==========
const VideoPlayer = ({ src, autoplay = false, muted = true, loop = true, className = '' }: {
  src: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}) => (
  <video
    src={src}
    autoPlay={autoplay}
    muted={muted}
    loop={loop}
    playsInline
    className={className}
  />
)

// ========== COMPONENTE SIMPLEPRODUCTCARD ==========
const SimpleProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  rating, 
  isNew 
}: {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating: number
  isNew: boolean
}) => (
  <Link href={`/product/${id}`} className="group">
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square bg-gray-50 p-8">
        {isNew && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
            Novo
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  </Link>
)

// ========== COMPONENTE PRINCIPAL ==========
export default function HomePage() {
  const companyName = 'USS Brasil'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <VideoPlayer
            src="/Videos/IphoneVideo.mp4"
            autoplay
            muted
            loop
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <Badge className="glass text-white border-glass-border backdrop-blur-xl px-6 py-2 text-sm font-medium tracking-wide">
              iPhone 16 Pro • Novo
            </Badge>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
              Forjado em
              <span className="block gradient-text-animated bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                titânio
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              O iPhone mais poderoso de todos os tempos. Camera Control. Chip A18 Pro. E muito mais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="glass-strong text-gray-900 hover:bg-white hover:scale-105 px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover-lift"
              >
                Comprar a partir de R$ 10.499
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 glass px-10 py-6 text-lg font-medium rounded-2xl transition-all duration-300 hover-lift"
              >
                <Play className="mr-3 h-6 w-6" />
                Assistir o filme
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-4 bg-white/70 rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Por que escolher a{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {companyName}
              </span>
              ?
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              A experiência Apple completa com o melhor atendimento do Brasil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Truck,
                title: 'Entrega em todo Brasil',
                description: 'Frete grátis em compras acima de R$ 250. Entrega expressa em capitais.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Garantia Apple',
                description: 'Produtos originais com garantia oficial Apple e suporte técnico especializado.',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                icon: Headphones,
                title: 'Suporte 24/7',
                description: 'Atendimento especializado sempre que você precisar, por chat, telefone ou email.',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-premium text-center p-8 lg:p-10 rounded-3xl hover-lift hover:border-primary/20 transition-all duration-500">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Explore todas as{" "}
              <span className="gradient-text bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                categorias
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Descubra a tecnologia completa na {companyName}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link href={category.href} className="block">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500">
                    <VideoPlayer
                      src={category.video}
                      autoplay
                      muted
                      loop
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-500`}></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <div className="glass rounded-2xl p-4 mb-6 group-hover:scale-110 transition-transform duration-500">
                        <category.icon className="h-12 w-12 opacity-90" />
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-3 text-center group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm opacity-90 text-center mb-4 font-medium leading-relaxed">
                        {category.description}
                      </p>
                      
                      <span className="text-lg font-semibold glass rounded-full px-6 py-3 group-hover:bg-white/30 transition-all duration-300">
                        {category.price}
                      </span>
                    </div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 blur-xl`}></div>
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
              Os lançamentos mais recentes com preços especiais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProductsData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SimpleProductCard 
                  id={product.id}
                  name={product.name}
                  price={`R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  originalPrice={product.originalPrice ? `R$ ${product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : undefined}
                  image={product.images.main}
                  category={product.categoria}
                  rating={product.rating}
                  isNew={product.isNew}
                />
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
              Seja o primeiro a saber sobre lançamentos, ofertas especiais e eventos exclusivos
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
