'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Play, 
  Star, 
  Truck, 
  Shield, 
  Headphones,
  Heart,
  ChevronRight,
  Eye,
  ShoppingBag,
  Percent,
  Award,
  Clock,
  Users
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Importar dados
import data from '@/db.json'

// Função para formatar preço
function formatPrice(price: number) {
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

// Produtos em destaque
const featuredProducts = products.filter(p => p.featured).slice(0, 8)
const appleProducts = products.filter(p => p.brand === 'Apple').slice(0, 4)
const offers = products.filter(p => p.discountPrice).slice(0, 6)

// Componente de produto em destaque
function FeaturedProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge de desconto */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          </div>
        )}
        
        {/* Ações rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute top-4 right-4 flex flex-col space-y-2"
        >
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </motion.div>
        
        {/* Botão de compra rápida */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <button className="w-full bg-[#1a1a1a] text-white py-2 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Adicionar ao Carrinho</span>
          </button>
        </motion.div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#20b2aa] bg-[#20b2aa]/10 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-[#20b2aa]">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#20b2aa]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <Link
            href={`/produto/${product.id}`}
            className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#20b2aa] transition-colors"
          >
            Ver mais
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Seção hero
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#20b2aa]/5">
      {/* Video de fundo */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/iPhone 16 Pro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-[#20b2aa]/10 text-[#20b2aa] px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Award className="h-4 w-4" />
              <span>Loja Oficial Autorizada</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
            >
              Tecnologia que
              <span className="block bg-gradient-to-r from-[#20b2aa] to-[#1a1a1a] bg-clip-text text-transparent">
                Transforma
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Descubra os últimos lançamentos em Apple, DJI, Xiaomi, JBL e Geonav. 
              Produtos originais com garantia e entrega rápida em todo o Brasil.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                href="/ofertas"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#20b2aa] text-[#20b2aa] rounded-2xl font-semibold hover:bg-[#20b2aa] hover:text-white transition-all duration-300"
              >
                <Percent className="mr-2 h-5 w-5" />
                Ver Ofertas
              </Link>
            </motion.div>
            
            {/* Estatísticas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#20b2aa] mb-1">1000+</div>
                <div className="text-sm text-gray-600">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#20b2aa] mb-1">50k+</div>
                <div className="text-sm text-gray-600">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#20b2aa] mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Avaliação</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 max-w-lg mx-auto">
              <Image
                src="/Produtos/Apple/iPhone 16 Pro.png"
                alt="iPhone 16 Pro"
                width={500}
                height={600}
                className="object-contain"
                priority
              />
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#20b2aa]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Seção de marcas
function BrandsSection() {
  const brands = [
    { name: 'Apple', logo: '/imagens/apple/apple-logo.png', href: '/produtos?marca=apple' },
    { name: 'DJI', logo: '/imagens/dji/dji-logo.png', href: '/produtos?marca=dji' },
    { name: 'Xiaomi', logo: '/imagens/xiaomi/xiaomi-logo.png', href: '/produtos?marca=xiaomi' },
    { name: 'JBL', logo: '/imagens/jbl/jbl-logo.png', href: '/produtos?marca=jbl' },
    { name: 'Geonav', logo: '/imagens/geonav/geonav-logo.png', href: '/produtos?marca=geonav' }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold text-[#20b2aa] uppercase tracking-wide mb-4">
            Marcas Parceiras
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trabalhamos apenas com as melhores marcas do mercado para garantir qualidade e confiabilidade
          </p>
        </motion.div>
        
        <div className="grid grid-cols-5 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link 
                href={brand.href}
                className="block p-6 rounded-2xl border border-gray-100 hover:border-[#20b2aa] hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="relative h-16 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={80}
                    height={40}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Seção de diferenciais
function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Entrega Rápida",
      description: "Entrega em todo Brasil com frete grátis acima de R$ 299",
      color: "bg-blue-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Garantia Oficial",
      description: "Todos os produtos com garantia oficial da marca",
      color: "bg-green-500"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Suporte 24/7",
      description: "Atendimento especializado sempre que precisar",
      color: "bg-purple-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Entrega Expressa",
      description: "Receba em até 24h em São Paulo e região",
      color: "bg-orange-500"
    }
  ]
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BrandsSection />
      <FeaturesSection />
      
      {/* Seção de Produtos em Destaque */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra nossa seleção especial dos produtos mais inovadores e populares
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeaturedProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              href="/produtos"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Seção Apple */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#20b2aa]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 mb-4">
              <Image
                src="/imagens/apple/apple-logo.png"
                alt="Apple"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2 className="text-4xl font-bold text-gray-900">
                Apple
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra o universo Apple com os últimos lançamentos em iPhone, Mac, iPad e muito mais
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeaturedProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/produtos?marca=apple"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Ver Todos os Produtos Apple
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Seção de Ofertas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Percent className="h-4 w-4" />
              <span>Ofertas Especiais</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Promoções Imperdíveis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aproveite descontos exclusivos nos melhores produtos de tecnologia
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeaturedProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/ofertas"
              className="inline-flex items-center px-8 py-4 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-all duration-300"
            >
              Ver Todas as Ofertas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Fique por dentro das novidades
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Receba em primeira mão os lançamentos e ofertas exclusivas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#20b2aa]"
              />
              <button className="px-8 py-4 bg-[#20b2aa] text-white rounded-xl font-semibold hover:bg-[#1a9999] transition-colors">
                Inscrever-se
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              Não enviamos spam. Cancele quando quiser.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
