'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Percent, 
  Clock, 
  Flame, 
  ShoppingCart, 
  Star,
  Timer,
  TrendingUp,
  Zap,
  Gift,
  AlertTriangle
} from 'lucide-react'

const flashOffers = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    price: 6999.99,
    originalPrice: 9999.99,
    image: '/Produtos/Iphone 15/Normal x Plus/iphone-15-finish-select-202309-6-1inch-naturaltitanium.jpg',
    discount: 30,
    timeLeft: 2 * 60 * 60 * 1000, // 2 horas em ms
    stock: 12,
    totalStock: 50,
    isFlash: true,
    rating: 4.8,
    reviews: 1234,
    description: 'iPhone 15 Pro com chip A17 Pro e câmeras profissionais'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    category: 'Notebooks',
    price: 8999.99,
    originalPrice: 11999.99,
    image: '/Produtos/Macbook Air.png',
    discount: 25,
    timeLeft: 5 * 60 * 60 * 1000, // 5 horas
    stock: 8,
    totalStock: 30,
    isFlash: true,
    rating: 4.9,
    reviews: 856,
    description: 'MacBook Air com chip M2 e tela Liquid Retina'
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    category: 'Áudio',
    price: 1899.99,
    originalPrice: 2599.99,
    image: '/Produtos/Air Pods Pro 2/airpods-pro-2nd-gen-hero-202209.jpg',
    discount: 27,
    timeLeft: 1 * 60 * 60 * 1000, // 1 hora
    stock: 25,
    totalStock: 100,
    isFlash: true,
    rating: 4.7,
    reviews: 2341,
    description: 'AirPods Pro de 2ª geração com cancelamento ativo'
  }
]

const regularOffers = [
  {
    id: 4,
    name: 'iPad Air',
    category: 'Tablets',
    price: 4299.99,
    originalPrice: 5599.99,
    image: '/Produtos/IpadAir.png',
    discount: 23,
    rating: 4.6,
    reviews: 678,
    description: 'iPad Air com chip M1 e tela Liquid Retina de 10.9"',
    features: ['Chip M1', 'Tela 10.9"', 'Camera 12MP', '256GB']
  },
  {
    id: 5,
    name: 'Apple Watch SE',
    category: 'Smartwatches',
    price: 2299.99,
    originalPrice: 2899.99,
    image: '/Produtos/Watch SE.png',
    discount: 21,
    rating: 4.5,
    reviews: 1523,
    description: 'Apple Watch SE com GPS e resistência à água',
    features: ['GPS', 'Resistente água', 'Saúde', 'Fitness']
  },
  {
    id: 6,
    name: 'iMac 24"',
    category: 'Desktops',
    price: 12999.99,
    originalPrice: 15999.99,
    image: '/Produtos/Imac.png',
    discount: 19,
    rating: 4.8,
    reviews: 432,
    description: 'iMac 24" com chip M1 e tela Retina 4.5K',
    features: ['Chip M1', 'Tela 4.5K', '8GB RAM', '256GB SSD']
  },
  {
    id: 7,
    name: 'AirPods 4',
    category: 'Áudio',
    price: 899.99,
    originalPrice: 1199.99,
    image: '/Produtos/Air Pods 4/airpods-4-anc-select-202409.png',
    discount: 25,
    rating: 4.4,
    reviews: 567,
    description: 'AirPods 4 com áudio espacial personalizado',
    features: ['Áudio Espacial', 'H2 Chip', '30h bateria', 'USB-C']
  },
  {
    id: 8,
    name: 'Mac Mini M2',
    category: 'Desktops',
    price: 4999.99,
    originalPrice: 6299.99,
    image: '/Produtos/MacMini.png',
    discount: 21,
    rating: 4.7,
    reviews: 234,
    description: 'Mac Mini compacto com poder do chip M2',
    features: ['Chip M2', '8GB RAM', '256GB SSD', 'Thunderbolt 4']
  },
  {
    id: 9,
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    price: 8999.99,
    originalPrice: 11299.99,
    image: '/Produtos/Ipad Pro.png',
    discount: 20,
    rating: 4.9,
    reviews: 891,
    description: 'iPad Pro 12.9" com chip M2 e tela Liquid Retina XDR',
    features: ['Chip M2', 'Tela XDR', 'ProMotion', 'Thunderbolt']
  }
]

export default function OfertasPage() {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTimes = { ...prev }
        flashOffers.forEach(offer => {
          if (newTimes[offer.id] === undefined) {
            newTimes[offer.id] = offer.timeLeft
          } else {
            newTimes[offer.id] = Math.max(0, newTimes[offer.id] - 1000)
          }
        })
        return newTimes
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStockPercentage = (stock: number, total: number) => {
    return ((total - stock) / total) * 100
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section with Video Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Videos/IphoneVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-base font-medium rounded-full">
                <Flame className="h-4 w-4 mr-2" />
                Ofertas Especiais
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-6">
                Ofertas
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Imperdíveis
                </span>
              </h1>
              
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
                Aproveite descontos exclusivos em produtos premium. Ofertas por tempo limitado 
                com os melhores preços do mercado nacional.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Timer className="h-4 w-4 mr-2" />
                  Ofertas Relâmpago
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Até 30% OFF
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Gift className="h-4 w-4 mr-2" />
                  Frete Grátis
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flash Offers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900">
                Ofertas Relâmpago
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Promoções por tempo limitado com descontos incríveis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {flashOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group relative h-[480px]">
                  {/* Flash Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md animate-pulse text-xs px-2 py-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Flash
                    </Badge>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md text-sm px-2 py-1">
                      -{offer.discount}%
                    </Badge>
                  </div>

                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.name}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Timer */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-red-700">Termina em:</span>
                          <Clock className="h-3 w-3 text-red-500" />
                        </div>
                        <div className="text-lg font-bold text-red-600 font-mono">
                          {formatTime(timeLeft[offer.id] || offer.timeLeft)}
                        </div>
                      </div>

                      {/* Stock Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-neutral-600">Estoque:</span>
                          <span className="text-xs font-medium text-red-600">
                            {offer.stock} restantes
                          </span>
                        </div>
                        <Progress 
                          value={getStockPercentage(offer.stock, offer.totalStock)} 
                          className="h-1.5 bg-neutral-200"
                        />
                      </div>

                      {/* Product Info */}
                      <Badge variant="outline" className="mb-2 text-xs w-fit">
                        {offer.category}
                      </Badge>
                      
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-1">
                        {offer.name}
                      </h3>
                      
                      <p className="text-neutral-600 text-xs mb-3 line-clamp-2 flex-1">
                        {offer.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-neutral-900 ml-1">
                            {offer.rating}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          ({offer.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-red-600">
                          {formatCurrency(offer.price)}
                        </span>
                        <span className="text-sm text-neutral-400 line-through">
                          {formatCurrency(offer.originalPrice)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Link href={`/product/${offer.id}`}>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm py-2">
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          Comprar Agora
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Offers */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Percent className="h-8 w-8 text-[#00CED1] mr-3" />
              <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900">
                Ofertas Especiais
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Descontos permanentes em produtos selecionados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group h-[420px]">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.name}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-0 shadow-md text-sm px-2 py-1">
                          -{offer.discount}%
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <Badge variant="outline" className="mb-2 text-xs w-fit">
                        {offer.category}
                      </Badge>
                      
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-1">
                        {offer.name}
                      </h3>
                      
                      <p className="text-neutral-600 text-xs mb-3 line-clamp-2 flex-1">
                        {offer.description}
                      </p>

                      {/* Features */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {offer.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-neutral-900 ml-1">
                            {offer.rating}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          ({offer.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-neutral-900">
                          {formatCurrency(offer.price)}
                        </span>
                        <span className="text-sm text-neutral-400 line-through">
                          {formatCurrency(offer.originalPrice)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Link href={`/product/${offer.id}`}>
                        <Button className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm py-2">
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          Ver Oferta
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Últimas Horas!
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Não perca essas ofertas incríveis. Algumas promoções terminam hoje à meia-noite.
            </p>
            <Button className="bg-white text-red-600 hover:bg-neutral-100 px-8 py-4 text-lg font-medium rounded-xl shadow-lg">
              Ver Todas as Ofertas
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
