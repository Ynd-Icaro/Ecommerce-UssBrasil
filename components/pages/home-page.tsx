// ============================================================================
// PÁGINA INICIAL - APPLE-STYLE DESIGN
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Star, Truck, Shield, Headphones } from 'lucide-react'

import { cn } from '@/lib/utils'
import { animations, styleUtils } from '@/lib/design-system'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// ========== TIPOS ==========
interface FeaturedProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  href: string
  featured?: boolean
  isNew?: boolean
}

interface CategoryShowcase {
  id: string
  name: string
  description: string
  image: string
  href: string
  color: string
}

// ========== DADOS MOCK ==========
const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    description: 'Titânio. Tão forte. Tão leve. Tão Pro.',
    price: 7999,
    originalPrice: 8999,
    image: '/Imagens/Iphone 16 Pro.png',
    href: '/product/iphone-16-pro',
    featured: true,
    isNew: true
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    description: 'Performance descomunal. Bateria o dia todo.',
    price: 15999,
    image: '/Imagens/Macbook Pro.png',
    href: '/product/macbook-pro-m3',
    featured: true
  },
  {
    id: '3',
    name: 'Apple Watch Series 10',
    description: 'O maior display. O carregamento mais rápido.',
    price: 2999,
    image: '/Imagens/Watch Series 10.png',
    href: '/product/watch-series-10'
  }
]

const categories: CategoryShowcase[] = [
  {
    id: 'iphones',
    name: 'iPhone',
    description: 'A experiência iPhone mais avançada',
    image: '/Imagens/Iphone 16.png',
    href: '/categories/iphones',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'macs',
    name: 'Mac',
    description: 'Performance superpotente',
    image: '/Imagens/Imac.png',
    href: '/categories/macs',
    color: 'from-gray-800 to-gray-600'
  },
  {
    id: 'ipads',
    name: 'iPad',
    description: 'Versátil. Criativo. Poderoso.',
    image: '/Imagens/Ipad Pro.png',
    href: '/categories/ipads',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'watches',
    name: 'Apple Watch',
    description: 'O futuro da saúde no seu pulso',
    image: '/Imagens/Watch Ultra 2.png',
    href: '/categories/watches',
    color: 'from-orange-600 to-red-600'
  }
]

// ========== COMPONENTE PRINCIPAL ==========
export function HomePage() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Background Video/Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-primary-600/10"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(15, 26, 60, 0.05) 0%, rgba(30, 63, 133, 0.1) 100%)',
                'linear-gradient(225deg, rgba(15, 26, 60, 0.1) 0%, rgba(30, 63, 133, 0.05) 100%)',
                'linear-gradient(45deg, rgba(15, 26, 60, 0.05) 0%, rgba(30, 63, 133, 0.1) 100%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary-900/10 text-primary-900 border-primary-900/20">
              Novidades da Apple disponíveis agora
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Tecnologia que
              <br />
              <span className="bg-gradient-to-r from-primary-900 to-primary-600 bg-clip-text text-transparent">
                transforma vidas
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Descubra a última geração de produtos Apple com entrega rápida e garantia total. 
              A tecnologia mais avançada do mundo, agora ao seu alcance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg font-semibold bg-primary-900 hover:bg-primary-800 transition-all duration-300"
                asChild
              >
                <Link href="/products">
                  Explorar Produtos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg font-semibold border-2 border-primary-900 text-primary-900 hover:bg-primary-50 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Apresentação
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hero Product Image */}
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-96 h-96">
            <Image
              src="/products/Iphone 16 Pro.png"
              alt="iPhone 16 Pro"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os lançamentos mais esperados da Apple, agora disponíveis com preços especiais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative",
                  product.featured && "lg:col-span-2 lg:row-span-2"
                )}
              >
                <Card className={cn(
                  "overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500",
                  styleUtils.applyHover(true),
                  product.featured && "h-full"
                )}>
                  <CardContent className="p-0">
                    <div className={cn(
                      "relative bg-gradient-to-br from-gray-50 to-gray-100",
                      product.featured ? "h-96" : "h-72"
                    )}>
                      {/* Product Badge */}
                      {product.isNew && (
                        <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white">
                          Novo
                        </Badge>
                      )}
                      
                      {/* Product Image */}
                      <div className="relative w-full h-full flex items-center justify-center p-8">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={product.featured ? 300 : 200}
                          height={product.featured ? 300 : 200}
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={cn(
                        "font-bold text-gray-900 mb-2",
                        product.featured ? "text-2xl" : "text-xl"
                      )}>
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary-900">
                            R$ {product.price.toLocaleString('pt-BR')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              R$ {product.originalPrice.toLocaleString('pt-BR')}
                            </span>
                          )}
                        </div>
                        
                        <Button asChild size="sm">
                          <Link href={product.href}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore por Categoria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre exatamente o que você procura em nossa seleção cuidadosa de produtos Apple
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href} className="group block">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                    <CardContent className="p-0">
                      <div className={cn(
                        "relative h-64 bg-gradient-to-br",
                        category.color
                      )}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative w-full h-full flex items-center justify-center p-6">
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={150}
                            height={150}
                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Por que Escolher a USS Brasil?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sua experiência de compra merece o melhor atendimento e garantia total
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Entrega Rápida',
                description: 'Receba seus produtos em até 24h na região metropolitana'
              },
              {
                icon: Shield,
                title: 'Garantia Total',
                description: 'Todos os produtos com garantia oficial Apple de 1 ano'
              },
              {
                icon: Headphones,
                title: 'Suporte Especializado',
                description: 'Atendimento técnico especializado em produtos Apple'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para a próxima geração?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Junte-se a milhões de pessoas que já escolheram a qualidade Apple. 
              Descubra o futuro da tecnologia hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="h-14 px-8 text-lg font-semibold bg-white text-primary-900 hover:bg-gray-100"
                asChild
              >
                <Link href="/products">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-900"
                asChild
              >
                <Link href="/contact">
                  Falar com Especialista
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
