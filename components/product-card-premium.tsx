'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  ShoppingBagIcon,
  EyeIcon,
  StarIcon,
  SparklesIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  category: string
  marca: string
  image: string
  images: string[]
  description: string
  shortDescription: string
  stock: number
  rating: number
  reviewsCount: number
  featured: boolean
  isNew: boolean
  bestSeller: boolean
  vipOnly: boolean
  limitedEdition?: boolean
  colors?: Array<{
    name: string
    hex: string
    image: string
  }>
  tags: string[]
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  onQuickView?: (productId: string) => void
  isInWishlist?: boolean
  className?: string
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isInWishlist = false,
  className = ''
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const finalPrice = product.discountPrice || product.price

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const badges = []
  if (product.isNew) badges.push({ text: 'Novo', color: 'bg-green-500' })
  if (product.bestSeller) badges.push({ text: 'Mais Vendido', color: 'bg-orange-500' })
  if (product.vipOnly) badges.push({ text: 'VIP', color: 'bg-gradient-to-r from-ussbrasil-gold to-yellow-600' })
  if (product.limitedEdition) badges.push({ text: 'Edição Limitada', color: 'bg-purple-500' })
  if (discount > 0) badges.push({ text: `-${discount}%`, color: 'bg-red-500' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${className}`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {badges.slice(0, 2).map((badge, index) => (
          <motion.span
            key={badge.text}
            initial={{ scale: 0, x: -20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${badge.color} shadow-lg`}
          >
            {badge.text}
          </motion.span>
        ))}
      </div>

      {/* VIP Glow Effect */}
      {product.vipOnly && (
        <div className="absolute inset-0 bg-gradient-to-r from-ussbrasil-gold/20 to-yellow-600/20 animate-pulse pointer-events-none" />
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
        <Link href={`/produto/${product.slug}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={product.colors && product.colors[selectedColorIndex] 
                ? product.colors[selectedColorIndex].image 
                : product.image
              }
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover Image */}
            {isHovered && product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </motion.div>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleWishlist?.(product.id)}
            className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isInWishlist ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </motion.button>

          {/* Quick View */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView?.(product.id)}
            className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <EyeIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>

        {/* Quick Add to Cart (appears on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => onAddToCart?.(product.id)}
              className="absolute bottom-3 left-3 right-3 bg-ussbrasil-primary hover:bg-ussbrasil-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="h-4 w-4" />
              Adicionar ao Carrinho
            </motion.button>
          )}
        </AnimatePresence>

        {/* Stock Warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Últimas {product.stock} unidades
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-500 px-4 py-2 rounded-lg">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
            {product.marca}
          </span>
          {product.vipOnly && (
            <SparklesIcon className="h-4 w-4 text-ussbrasil-gold" />
          )}
        </div>

        {/* Product Name */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Cores:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedColorIndex === index
                      ? 'border-ussbrasil-primary scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 flex items-center ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-ussbrasil-primary dark:text-ussbrasil-accent">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(finalPrice)}
          </span>
          {product.discountPrice && (
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)}
            </span>
          )}
        </div>

        {/* Payment Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          ou 12x de{' '}
          <span className="font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(finalPrice / 12)}
          </span>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
              >
                #{tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  )
}
