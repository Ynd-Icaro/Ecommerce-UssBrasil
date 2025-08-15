'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FireIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon,
  BoltIcon,
  GiftIcon,
  ShoppingBagIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import USSProductCard, { USSProductCardSkeleton } from '@/components/USSProductCard'
import USSFooter from '@/components/USSFooter'

interface Offer {
  id: string
  title: string
  description: string
  discountPercentage: number
  validUntil: string
  type: 'flash' | 'promotion' | 'clearance' | 'bundle'
  featured: boolean
  bannerColor: string
  icon: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  image: string
  category: string
  marca: string
  rating?: number
  reviews?: number
  badge?: string
  isNew?: boolean
  isFeatured?: boolean
  inStock?: boolean
  originalPrice?: number
  offerType?: string
  timeLeft?: string
}

export default function OfertasPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('discount')
  const [isLoading, setIsLoading] = useState(true)

  const currentOffers: Offer[] = [
    {
      id: 'black-friday',
      title: 'Black Friday USS Brasil',
      description: 'Até 50% OFF em produtos selecionados + Frete Grátis',
      discountPercentage: 50,
      validUntil: '2024-11-30',
      type: 'flash',
      featured: true,
      bannerColor: 'from-red-600 to-red-800',
      icon: 'fire'
    },
    {
      id: 'cyber-monday',
      title: 'Cyber Monday Tech',
      description: 'Smartphones e Notebooks com descontos imperdíveis',
      discountPercentage: 40,
      validUntil: '2024-12-02',
      type: 'flash',
      featured: true,
      bannerColor: 'from-blue-600 to-purple-700',
      icon: 'bolt'
    },
    {
      id: 'natal-premium',
      title: 'Natal Premium 2024',
      description: 'Produtos Premium com até 35% OFF para presentear',
      discountPercentage: 35,
      validUntil: '2024-12-25',
      type: 'promotion',
      featured: false,
      bannerColor: 'from-green-600 to-red-600',
      icon: 'gift'
    },
    {
      id: 'clearance-sale',
      title: 'Liquidação de Estoque',
      description: 'Últimas unidades com preços especiais',
      discountPercentage: 60,
      validUntil: '2024-12-15',
      type: 'clearance',
      featured: false,
      bannerColor: 'from-orange-500 to-red-500',
      icon: 'tag'
    }
  ]

  const offerProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 16 Pro 128GB',
      slug: 'iphone-16-pro-128gb',
      price: 8999,
      discountPrice: 6999,
      originalPrice: 8999,
      image: '/Produtos/Apple/Iphone 16 Pro.png',
      category: 'smartphones',
      marca: 'Apple',
      rating: 4.8,
      reviews: 245,
      badge: 'BLACK FRIDAY',
      isNew: true,
      isFeatured: true,
      inStock: true,
      offerType: 'Black Friday',
      timeLeft: '2 dias'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      price: 7999,
      discountPrice: 5599,
      originalPrice: 7999,
      image: '/Produtos/Samsung/galaxy-s24-ultra.jpg',
      category: 'smartphones',
      marca: 'Samsung',
      rating: 4.6,
      reviews: 198,
      badge: 'CYBER MONDAY',
      isFeatured: true,
      inStock: true,
      offerType: 'Cyber Monday',
      timeLeft: '4 dias'
    },
    {
      id: '3',
      name: 'MacBook Air M3 13"',
      slug: 'macbook-air-m3-13',
      price: 9999,
      discountPrice: 7499,
      originalPrice: 9999,
      image: '/Produtos/Apple/Macbook-Air-13-M3-Prateado.webp',
      category: 'notebooks',
      marca: 'Apple',
      rating: 4.9,
      reviews: 156,
      badge: 'OFERTA LIMITADA',
      isFeatured: true,
      inStock: true,
      offerType: 'Promoção',
      timeLeft: '1 semana'
    },
    {
      id: '4',
      name: 'iPad Pro 11" M4',
      slug: 'ipad-pro-11-m4',
      price: 7999,
      discountPrice: 5999,
      originalPrice: 7999,
      image: '/Produtos/Apple/iPad-Pro-11-M4.webp',
      category: 'tablets',
      marca: 'Apple',
      rating: 4.8,
      reviews: 134,
      badge: 'NATAL PREMIUM',
      isNew: true,
      isFeatured: true,
      inStock: true,
      offerType: 'Natal',
      timeLeft: '3 semanas'
    },
    {
      id: '5',
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      price: 1899,
      discountPrice: 1199,
      originalPrice: 1899,
      image: '/Produtos/Sony/wh-1000xm5.jpg',
      category: 'audio',
      marca: 'Sony',
      rating: 4.8,
      reviews: 312,
      badge: 'LIQUIDAÇÃO',
      isFeatured: true,
      inStock: true,
      offerType: 'Clearance',
      timeLeft: '2 semanas'
    },
    {
      id: '6',
      name: 'DJI Mini 4 Pro',
      slug: 'dji-mini-4-pro',
      price: 4999,
      discountPrice: 3499,
      originalPrice: 4999,
      image: '/Produtos/Dji/dji-mini-4-pro.jpg',
      category: 'drones',
      marca: 'DJI',
      rating: 4.9,
      reviews: 67,
      badge: 'FLASH SALE',
      isFeatured: true,
      inStock: true,
      offerType: 'Flash',
      timeLeft: '6 horas'
    },
    {
      id: '7',
      name: 'Apple Watch Series 10',
      slug: 'apple-watch-series-10',
      price: 3999,
      discountPrice: 2999,
      originalPrice: 3999,
      image: '/Produtos/Apple/Apple-Watch-Series-10.webp',
      category: 'wearables',
      marca: 'Apple',
      rating: 4.7,
      reviews: 189,
      badge: 'PRESENTE PERFEITO',
      isFeatured: true,
      inStock: true,
      offerType: 'Natal',
      timeLeft: '3 semanas'
    },
    {
      id: '8',
      name: 'JBL Charge 5',
      slug: 'jbl-charge-5',
      price: 899,
      discountPrice: 599,
      originalPrice: 899,
      image: '/Produtos/JBL/jbl-charge-5.jpg',
      category: 'audio',
      marca: 'JBL',
      rating: 4.5,
      reviews: 423,
      badge: 'MEGA DESCONTO',
      isFeatured: true,
      inStock: true,
      offerType: 'Promoção',
      timeLeft: '5 dias'
    }
  ]

  const categories = [
    { id: 'all', name: 'Todas as Ofertas' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'notebooks', name: 'Notebooks' },
    { id: 'tablets', name: 'Tablets' },
    { id: 'audio', name: 'Áudio' },
    { id: 'drones', name: 'Drones' },
    { id: 'wearables', name: 'Wearables' }
  ]

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOffers(currentOffers)
      setProducts(offerProducts)
      setIsLoading(false)
    }
    
    loadData()
  }, [])

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true
    return product.category === selectedCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        const discountA = a.originalPrice && a.discountPrice 
          ? ((a.originalPrice - a.discountPrice) / a.originalPrice) * 100 
          : 0
        const discountB = b.originalPrice && b.discountPrice 
          ? ((b.originalPrice - b.discountPrice) / b.originalPrice) * 100 
          : 0
        return discountB - discountA
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price)
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price)
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  const featuredOffers = offers.filter(offer => offer.featured)

  const getDiscountPercentage = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100)
  }

  return (
    <div className="min-h-screen bg-light-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FireIcon className="w-12 h-12 text-yellow-300 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Ofertas Imperdíveis
              </h1>
              <FireIcon className="w-12 h-12 text-yellow-300 ml-3" />
            </div>
            <p className="text-xl text-red-100 max-w-2xl mx-auto mb-6">
              Descontos de até 60% em produtos premium selecionados
            </p>
            <div className="flex items-center justify-center text-yellow-300">
              <ClockIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold">Ofertas por tempo limitado!</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offer Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-uss shadow-uss-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TagIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">50%</h3>
              <p className="text-gray-600">Desconto Máximo</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-uss shadow-uss-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">200+</h3>
              <p className="text-gray-600">Produtos em Oferta</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-uss shadow-uss-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">12x</h3>
              <p className="text-gray-600">Sem Juros</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-uss shadow-uss-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-uss-blue mb-2">Grátis</h3>
              <p className="text-gray-600">Frete Nacional</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Offers Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-uss-blue mb-8 text-center">
            Campanhas Ativas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${offer.bannerColor} rounded-uss p-8 text-white relative overflow-hidden`}
              >
                <div className="absolute top-4 right-4">
                  {offer.icon === 'fire' && <FireIcon className="w-8 h-8 text-yellow-300" />}
                  {offer.icon === 'bolt' && <BoltIcon className="w-8 h-8 text-yellow-300" />}
                  {offer.icon === 'gift' && <GiftIcon className="w-8 h-8 text-yellow-300" />}
                  {offer.icon === 'tag' && <TagIcon className="w-8 h-8 text-yellow-300" />}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-lg mb-4 opacity-90">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-2">
                      {offer.discountPercentage}%
                    </span>
                    <span className="text-lg">OFF</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm opacity-75">Válido até:</p>
                    <p className="font-semibold">
                      {new Date(offer.validUntil).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-light-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-uss-blue mb-8 text-center">
            Produtos em Promoção
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-uss font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-uss-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-uss-blue hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {sortedProducts.length} ofertas encontradas
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-light-200 rounded-uss focus:outline-none focus:border-uss-blue"
              >
                <option value="discount">Maior desconto</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="rating">Melhor avaliado</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <USSProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Discount Badge */}
                  {product.originalPrice && product.discountPrice && (
                    <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-uss text-sm font-bold">
                      -{getDiscountPercentage(product.originalPrice, product.discountPrice)}%
                    </div>
                  )}
                  
                  {/* Time Left Badge */}
                  {product.timeLeft && (
                    <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white px-2 py-1 rounded-uss text-xs font-medium flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {product.timeLeft}
                    </div>
                  )}
                  
                  <USSProductCard 
                    product={product} 
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {sortedProducts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma oferta encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Tente selecionar uma categoria diferente
              </p>
              <Button onClick={() => setSelectedCategory('all')}>
                Ver Todas as Ofertas
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-uss-blue to-uss-turquoise">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Não Perca Nenhuma Oferta!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Cadastre-se e receba alertas das melhores promoções em primeira mão
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-uss border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-uss-blue hover:bg-gray-100 font-semibold">
                Cadastrar
              </Button>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              Promoções exclusivas, frete grátis e desconto especial no primeiro pedido
            </p>
          </motion.div>
        </div>
      </section>

      <USSFooter />
    </div>
  )
}
