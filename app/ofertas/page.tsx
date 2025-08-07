'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, Flame, Zap, ShoppingCart, Heart, ArrowRight, Tag, Percent } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import data from '@/db.json'

interface Product {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountPrice: number | null
  image: string
  images: string[]
  category: string
  stock: number
  status: 'active'
  tags: string[]
  featured: boolean
  rating: number
  totalReviews: number
  colors: string[]
  createdAt: string
  specifications: object
  paymentOptions: number
}

interface Offer extends Product {
  discount: number
  timeLeft: string
  isFlashSale: boolean
  isLimitedStock: boolean
  stockCount?: number
  badge?: string
}

// Função para calcular desconto
const calculateDiscount = (original: number, discounted: number | null) => {
  if (!discounted) return 0
  return Math.round(((original - discounted) / original) * 100)
}

// Função para ajustar caminhos das imagens
const fixImagePath = (path: string) => {
  if (!path) return '/fallback-product.png'
  // Remove o prefixo se existe e garante que começa com /
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path.startsWith('/') ? path : `/${path}`
}

// Converter produtos reais em ofertas
const createOffersFromProducts = (products: Product[]): Offer[] => {
  return products
    .filter(product => product.discountPrice && product.discountPrice < product.price)
    .map((product, index) => ({
      ...product,
      discount: calculateDiscount(product.price, product.discountPrice),
      timeLeft: index % 2 === 0 ? '2d 14h 32m' : '1d 8h 45m',
      isFlashSale: index % 3 === 0,
      isLimitedStock: product.stock < 15,
      stockCount: product.stock < 15 ? product.stock : undefined,
      badge: product.featured ? 'Mais Vendido' : undefined
    }))
    .sort((a, b) => b.discount - a.discount)
}

const offers: Offer[] = createOffersFromProducts(data.products as Product[])

export default function OffersPage() {
  const [filter, setFilter] = useState<'all' | 'flash' | 'limited'>('all')
  const [sortBy, setSortBy] = useState<'discount' | 'price' | 'rating'>('discount')

  const filteredOffers = offers
    .filter(offer => {
      if (filter === 'flash') return offer.isFlashSale
      if (filter === 'limited') return offer.isLimitedStock
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount
      if (sortBy === 'price') return (a.discountPrice || a.price) - (b.discountPrice || b.price)
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f0f0] via-white to-[#f8f9fa] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Tag className="h-8 w-8 text-[#0E7466] mr-3" />
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#0C1A33] to-[#0E7466] bg-clip-text text-transparent">
              Ofertas Especiais
            </h1>
            <Flame className="h-8 w-8 text-orange-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aproveite nossos descontos exclusivos e produtos com preços incríveis!
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#0E7466] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Todas as Ofertas
            </button>
            <button
              onClick={() => setFilter('flash')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === 'flash'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Zap className="w-4 h-4 inline mr-1" />
              Flash Sale
            </button>
            <button
              onClick={() => setFilter('limited')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === 'limited'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Estoque Limitado
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'discount' | 'price' | 'rating')}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0E7466]"
            >
              <option value="discount">Maior Desconto</option>
              <option value="price">Menor Preço</option>
              <option value="rating">Melhor Avaliação</option>
            </select>
          </div>
        </motion.div>

        {/* Flash Sale Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 mr-2" />
              <h2 className="text-3xl font-bold">OFERTAS RELÂMPAGO</h2>
              <Zap className="h-8 w-8 ml-2" />
            </div>
            <p className="text-xl mb-6">Descontos de até 50% por tempo limitado!</p>
            <div className="flex items-center justify-center space-x-8 text-lg font-bold">
              <div className="text-center">
                <div className="text-3xl">02</div>
                <div className="text-sm opacity-75">DIAS</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl">14</div>
                <div className="text-sm opacity-75">HORAS</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="text-center">
                <div className="text-3xl">32</div>
                <div className="text-sm opacity-75">MIN</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={fixImagePath(offer.image)}
                      alt={offer.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/fallback-product.png'
                      }}
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {offer.isFlashSale && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        FLASH
                      </div>
                    )}
                    {offer.badge && (
                      <div className="bg-[#0E7466] text-white px-3 py-1 rounded-full text-xs font-bold">
                        {offer.badge}
                      </div>
                    )}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      -{offer.discount}%
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#0E7466] text-sm font-medium bg-[#0E7466]/10 px-3 py-1 rounded-full">
                      {offer.category}
                    </span>
                    {offer.isLimitedStock && offer.stockCount && (
                      <span className="text-red-500 text-xs font-bold">
                        Apenas {offer.stockCount} restantes
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0C1A33] mb-3 line-clamp-2">
                    {offer.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(offer.rating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      {offer.rating} ({offer.totalReviews} avaliações)
                    </span>
                  </div>

                  {/* Prices */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-gray-400 line-through text-lg">
                        {formatCurrency(offer.price)}
                      </span>
                      <span className="text-red-500 font-bold text-sm">
                        -{offer.discount}%
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-[#0C1A33]">
                      {formatCurrency(offer.discountPrice || offer.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Economia de {formatCurrency(offer.price - (offer.discountPrice || offer.price))}
                    </div>
                  </div>

                  {/* Time Left */}
                  {offer.isFlashSale && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4">
                      <div className="flex items-center text-red-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Termina em: {offer.timeLeft}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white py-4 rounded-2xl font-semibold hover:from-[#0C6157] hover:to-[#0A5449] transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Adicionar ao Carrinho
                    </button>

                    <Link
                      href={`/produto/${offer.id}`}
                      className="w-full text-center border-2 border-[#0E7466] text-[#0E7466] py-3 rounded-2xl font-semibold hover:bg-[#0E7466] hover:text-white transition-all duration-300 flex items-center justify-center"
                    >
                      Ver Detalhes
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Percent className="h-24 w-24 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nenhuma oferta encontrada
            </h3>
            <p className="text-gray-600 mb-8">
              Não há ofertas disponíveis no momento para os filtros selecionados.
            </p>
            <button
              onClick={() => {
                setFilter('all')
                setSortBy('discount')
              }}
              className="bg-[#0E7466] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#0C6157] transition-colors"
            >
              Ver Todas as Ofertas
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-[#0C1A33] to-[#0E2142] rounded-3xl p-12 text-center text-white"
        >
          <Percent className="h-16 w-16 mx-auto mb-6 text-[#0E7466]" />
          <h2 className="text-3xl font-bold mb-4">
            Não Perca Nenhuma Oferta!
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Cadastre-se em nossa newsletter e seja o primeiro a saber sobre ofertas exclusivas
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-[#0E7466]"
            />
            <button className="bg-[#0E7466] hover:bg-[#0C6157] px-8 py-4 rounded-2xl font-semibold transition-colors">
              Cadastrar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}