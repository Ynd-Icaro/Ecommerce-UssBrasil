'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discountPrice?: number
  image: string
  category: string
}

interface Category {
  id: number
  name: string
  displayName: string
  image: string
  productCount: number
  tagline: string
}

const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 16 Pro',
    tagline: 'Titanium. Tão forte. Tão leve. Tão Pro.',
    price: 7999.99,
    discountPrice: 7499.99,
    image: '/Produtos/Iphone 16 Pro.png',
    video: '/Videos/IphoneVideo.mp4',
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
  },
  {
    id: 2,
    name: 'MacBook Pro',
    tagline: 'Superpowered by M3 Pro',
    price: 12999.99,
    image: '/Produtos/Macbook Pro.png',
    video: '/Videos/Macs Video.mp4',
    colors: ['Space Gray', 'Silver']
  },
  {
    id: 3,
    name: 'iPad Pro',
    tagline: 'Lovable. Drawable. Magical.',
    price: 5999.99,
    discountPrice: 5499.99,
    image: '/Produtos/Ipad Pro.png',
    video: '/Videos/IpadVideo.mp4',
    colors: ['Space Gray', 'Silver']
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Badge className="bg-[#00CED1] text-white mb-4">
                      Novo
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                      {featuredProducts[currentSlide].name}
                    </h1>
                    <p className="text-xl text-gray-600 mt-4">
                      {featuredProducts[currentSlide].tagline}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-4">
                      {featuredProducts[currentSlide].discountPrice ? (
                        <>
                          <span className="text-3xl font-bold text-[#00CED1]">
                            {formatCurrency(featuredProducts[currentSlide].discountPrice!)}
                          </span>
                          <span className="text-xl text-gray-500 line-through">
                            {formatCurrency(featuredProducts[currentSlide].price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900">
                          {formatCurrency(featuredProducts[currentSlide].price)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button className="bg-[#00CED1] hover:bg-[#20B2AA] text-white px-8 py-3 rounded-full">
                        Comprar Agora
                      </Button>
                      <Button variant="outline" className="px-8 py-3 rounded-full">
                        Saiba Mais
                      </Button>
                    </div>

                    {/* Color Options */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Cores:</span>
                      {featuredProducts[currentSlide].colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{
                            backgroundColor: color.includes('Gray') ? '#6B7280' :
                                           color.includes('Blue') ? '#3B82F6' :
                                           color.includes('White') || color.includes('Silver') ? '#F3F4F6' :
                                           '#1F2937'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative h-96 lg:h-full"
                >
                  <Image
                    src={featuredProducts[currentSlide].image}
                    alt={featuredProducts[currentSlide].name}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#00CED1] scale-125' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Company Info Banner */}
      <section className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                UssBrasil - Shopping Della
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Especializada em produtos Apple Premium
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Localizada no Shopping Della em Criciúma, SC, oferecemos a melhor experiência 
                em tecnologia Apple com atendimento especializado e produtos autênticos.
              </p>
              <div className="mt-8 flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">+5</div>
                  <div className="opacity-80">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="opacity-80">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="opacity-80">Produtos Originais</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Nossas Categorias
            </h2>
            <p className="text-xl text-gray-600">
              Descubra toda a linha Apple disponível
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'iPhone', image: '/Produtos/Iphone 16 Pro.png', count: 12 },
              { name: 'Mac', image: '/Produtos/Macbook Pro.png', count: 8 },
              { name: 'iPad', image: '/Produtos/Ipad Pro.png', count: 6 },
              { name: 'Watch', image: '/Produtos/Watch Series 10.png', count: 4 },
              { name: 'AirPods', image: '/Produtos/Air Pods Pro 2', count: 5 }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/categories/${category.name.toLowerCase()}`}>
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="relative h-32 mb-4">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.count} produtos</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a UssBrasil?
            </h2>
            <p className="text-xl text-gray-600">
              Experiência premium em produtos Apple
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Produtos Originais',
                description: '100% autênticos direto da Apple'
              },
              {
                icon: '🚚',
                title: 'Entrega Rápida',
                description: 'Receba em casa ou retire na loja'
              },
              {
                icon: '🛡️',
                title: 'Garantia Apple',
                description: 'Cobertura completa e suporte técnico'
              },
              {
                icon: '💬',
                title: 'Atendimento Expert',
                description: 'Consultoria especializada em Apple'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fique por dentro das novidades Apple
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Receba primeiro as informações sobre lançamentos e ofertas exclusivas
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Seu melhor email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-[#00CED1] hover:bg-[#20B2AA] text-white px-8">
                Inscrever-se
              </Button>
            </div>
            <p className="text-sm opacity-70 mt-4">
              Não enviamos spam. Cancele a qualquer momento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visite Nossa Loja
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Experimente os produtos Apple de perto no Shopping Della, em Criciúma. 
                Nossa equipe especializada está pronta para ajudar você a encontrar o produto perfeito.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#00CED1] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <span className="text-gray-700">Shopping Della - Loja 123, Criciúma - SC</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#00CED1] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🕒</span>
                  </div>
                  <span className="text-gray-700">Segunda a Sábado: 10h às 22h | Domingo: 14h às 20h</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#00CED1] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <span className="text-gray-700">(48) 3431-0000</span>
                </div>
              </div>
              <Button className="mt-6 bg-[#00CED1] hover:bg-[#20B2AA] text-white">
                Como Chegar
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-200 rounded-lg h-64 lg:h-80 flex items-center justify-center"
            >
              <span className="text-gray-500">Mapa da Localização</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="text-xl font-bold">UssBrasil</span>
              </div>
              <p className="text-gray-400 text-sm">
                Especializada em produtos Apple Premium no Shopping Della, Criciúma - SC.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/categories/iphone">iPhone</Link></li>
                <li><Link href="/categories/mac">Mac</Link></li>
                <li><Link href="/categories/ipad">iPad</Link></li>
                <li><Link href="/categories/watch">Apple Watch</Link></li>
                <li><Link href="/categories/airpods">AirPods</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/support">Central de Ajuda</Link></li>
                <li><Link href="/warranty">Garantia</Link></li>
                <li><Link href="/shipping">Envios</Link></li>
                <li><Link href="/returns">Devoluções</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Shopping Della - Criciúma, SC</li>
                <li>(48) 3431-0000</li>
                <li>contato@ussbrasil.com.br</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 UssBrasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
