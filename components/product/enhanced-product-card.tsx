'use client'

import { useState, FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Share2,
  Zap,
  Shield,
  Truck,
  Badge,
  Sparkles,
  TrendingUp,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  images?: string[]
  brand: string
  category: string
  description: string
  featured?: boolean
  discount?: number
  isNew?: boolean
  stock?: number
  vip?: boolean
}

interface EnhancedProductCardProps {
  product: Product
  layout?: 'grid' | 'list'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onProductClick?: (product: Product) => void
}

const formatPrice = (price: number) =>
  `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

const EnhancedProductCard: FC<EnhancedProductCardProps> = ({ product }) => {
  const [isInFavorites, setIsInFavorites] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsInFavorites(!isInFavorites)
    
    // Toast notification would go here
    console.log(`${isInFavorites ? 'Removed from' : 'Added to'} favorites:`, product.name)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsInCart(!isInCart)
    
    // Cart logic would go here
    console.log(`${isInCart ? 'Removed from' : 'Added to'} cart:`, product.name)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick view modal would open here
    console.log('Quick view:', product.name)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Share functionality would go here
    console.log('Share product:', product.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <Link href={`/produtos/${product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${product.id}`}>
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-3xl">
          {/* Image */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image || '/fallback-product.png'}
              alt={product.name}
              fill
              className="object-contain group-hover:object-cover transition-all duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <AnimatePresence>
              {product.isNew && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                >
                  <Sparkles className="h-3 w-3" />
                  NOVO
                </motion.div>
              )}
              
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                >
                  <TrendingUp className="h-3 w-3" />
                  -{discountPercentage}%
                </motion.div>
              )}

              {product.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                >
                  <Badge className="h-3 w-3" />
                  DESTAQUE
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex flex-col gap-2 z-10"
          >
            {/* Favorites */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToFavorites}
              className={`p-3 rounded-full backdrop-blur-lg border transition-all duration-300 ${
                isInFavorites
                  ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/25'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInFavorites ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Quick View */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              className="p-3 bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30 rounded-full transition-all duration-300"
            >
              <Eye className="h-4 w-4" />
            </motion.button>

            {/* Share */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-3 bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30 rounded-full transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Bottom Overlay with Add to Cart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 40 
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isInCart
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : `bg-white text-gray-900 shadow-lg transition-all duration-300 ${isHovered ? 'hover:text-white' : ''}`
              }}
              style={!isInCart && isHovered ? { background: 'var(--uss-gradient-premium)' } : {}}
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{isInCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}</span>
            </motion.button>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--uss-primary)' }}
          >
            {product.brand}
          </motion.div>

          {/* Name */}
          <motion.h3
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
            className="font-semibold text-gray-900 mb-3 line-clamp-2 text-lg leading-tight transition-colors duration-300"
            style={{ color: isHovered ? 'var(--uss-primary)' : '#111827' }}
          >
            {product.name}
          </motion.h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-500" />
                <span>Garantia</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3 text-blue-500" />
                <span>Entrega</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span>Express</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
          style={{
            background: 'var(--uss-gradient-premium)',
            opacity: 0.05
          }}
        />

        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-b-3xl"
          style={{ background: 'var(--uss-gradient-premium)' }}
        />
      </Link>
    </motion.div>
  )
}

export default EnhancedProductCard
