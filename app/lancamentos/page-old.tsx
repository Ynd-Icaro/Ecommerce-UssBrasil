'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Calendar, 
  Eye, 
  ShoppingCart, 
  Star,
  Zap,
  Trophy,
  Clock
} from 'lucide-react'

const newProducts = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    category: 'Smartphones',
    price: 9999.99,
    originalPrice: 10999.99,
    image: '/Produtos/Iphone 16 Pro.png',
    launchDate: '2024-12-01',
    isHot: true,
    isNew: true,
    rating: 4.9,
    reviews: 847,
    description: 'O mais avançado iPhone já criado, com chip A18 Pro e câmeras revolucionárias.',
    features: ['Chip A18 Pro', 'Câmera 48MP', 'Tela ProMotion 120Hz', 'Titânio Aerospace'],
    video: '/Videos/IphoneVideo.mp4'
  },
  {
    id: 2,
    name: 'Xiaomi 14 Ultra',
    category: 'Smartphones',
    price: 5999.99,
    originalPrice: 6799.99,
    image: '/Produtos/Xiaomi-14-Ultra.png',
    launchDate: '2024-11-28',
    isHot: true,
    isNew: true,
    rating: 4.8,
    reviews: 523,
    description: 'Fotografia profissional em suas mãos com sensor de 1 polegada.',
    features: ['Snapdragon 8 Gen 3', 'Câmera Leica 50MP', 'Carregamento 90W', 'Tela AMOLED 6.73"']
  },
  {
    id: 3,
    name: 'DJI Mini 4 Pro',
    category: 'Drones',
    price: 4299.99,
    originalPrice: 4799.99,
    image: '/Produtos/DJI-Mini-4-Pro.png',
    launchDate: '2024-11-25',
    isNew: true,
    rating: 4.9,
    reviews: 312,
    description: 'Drone compacto com câmera 4K HDR e recursos profissionais.',
    features: ['Câmera 4K 60fps', 'Omnidirecional', '34min voo', 'ActiveTrack 360°']
  },
  {
    id: 4,
    name: 'Apple Watch Ultra 2',
    category: 'Smartwatches',
    price: 7999.99,
    originalPrice: 8499.99,
    image: '/Produtos/Watch Ultra 2.png',
    launchDate: '2024-11-20',
    isNew: true,
    rating: 4.8,
    reviews: 756,
    description: 'O smartwatch mais robusto da Apple para aventuras extremas.',
    features: ['Caixa Titânio 49mm', 'GPS Dupla Frequência', 'Resistente 100m', 'Bateria 36h']
  },
  {
    id: 5,
    name: 'Segway Ninebot Max G2',
    category: 'Mobilidade',
    price: 3599.99,
    originalPrice: 3999.99,
    image: '/Produtos/Segway-G2.png',
    launchDate: '2024-11-15',
    isNew: true,
    rating: 4.7,
    reviews: 234,
    description: 'Patinete elétrico premium com autonomia estendida.',
    features: ['65km autonomia', 'Suspensão dupla', 'App conectado', 'Freio regenerativo']
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    category: 'Áudio',
    price: 1899.99,
    originalPrice: 2199.99,
    image: '/Produtos/Sony-WH1000XM5.png',
    launchDate: '2024-11-10',
    isNew: true,
    rating: 4.9,
    reviews: 1247,
    description: 'Cancelamento de ruído líder da indústria com qualidade Sony.',
    features: ['30h bateria', 'Cancelamento ativo', 'Hi-Res Audio', 'Chamadas cristalinas']
  }
]

const categories = [
  { id: 'all', name: 'Todos', count: newProducts.length },
  { id: 'smartphones', name: 'Smartphones', count: 2 },
  { id: 'drones', name: 'Drones', count: 1 },
  { id: 'smartwatches', name: 'Smartwatches', count: 1 },
  { id: 'mobilidade', name: 'Mobilidade', count: 1 },
  { id: 'audio', name: 'Áudio', count: 1 }
]

export default function LancamentosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredProducts = newProducts.filter(product => 
    selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white to-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-0 px-6 py-3 text-base font-medium rounded-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Novidades UssBrasil
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6">
                Últimos
                <span className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] bg-clip-text text-transparent"> lançamentos</span>
              </h1>
              
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Descubra os produtos mais recentes e inovadores que chegaram à UssBrasil. 
                Seja o primeiro a ter acesso às últimas tecnologias do mercado mundial.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-[#00CED1]" />
                  Produtos Premium
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-[#00CED1]" />
                  Lançamentos Exclusivos
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#00CED1]" />
                  Atualizações Semanais
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-transparent shadow-md'
                      : 'border-neutral-300 hover:border-[#00CED1] hover:text-[#00CED1]'
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-xl text-sm focus:border-[#00CED1] focus:ring-[#00CED1] bg-white"
              >
                <option value="newest">Mais recentes</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group">
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Novo
                          </Badge>
                        )}
                        {product.isHot && (
                          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md">
                            Hot
                          </Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-0 shadow-md">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs font-medium text-neutral-600 border-neutral-300">
                          {product.category}
                        </Badge>
                        <div className="flex items-center text-xs text-neutral-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(product.launchDate)}
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{product.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-neutral-900 ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          ({product.reviews} avaliações)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold text-neutral-900">
                          {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-neutral-400 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link href={`/product/${product.id}`}>
                        <Button className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ver Produto
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-neutral-600">
                Tente ajustar os filtros ou volte mais tarde para novos lançamentos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Seja o primeiro a saber
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Receba notificações sobre novos lançamentos e ofertas exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-xl text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Button className="bg-white text-[#00CED1] hover:bg-neutral-100 px-6 py-3 rounded-xl font-medium">
                Assinar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
