'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  marca: string
  rating?: number
  reviews?: number
  badge?: string
  isNew?: boolean
  isFeatured?: boolean
  inStock?: boolean
}

interface USSProductCardProps {
  product: Product
  index?: number
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
  className?: string
}

export default function USSProductCard({ 
  product, 
  index = 0, 
  variant = 'default',
  showQuickActions = true,
  className = ''
}: USSProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const discountPercentage = product.discountPrice && product.price 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const finalPrice = product.discountPrice || product.price

  const handleAddToCart = () => {
    setIsInCart(true)
    // TODO: Implementar adicionar ao carrinho
    console.log('Produto adicionado ao carrinho:', product.id)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implementar adicionar aos favoritos
    console.log('Produto favorito toggled:', product.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group bg-white dark:bg-dark-800 rounded-uss shadow-uss-md hover:shadow-uss-lg transition-all duration-300 overflow-hidden ${
        variant === 'featured' ? 'border-2 border-uss-gold/20' : ''
      } ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-light-50 dark:bg-dark-700 p-4">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-1 bg-uss-turquoise text-white text-xs font-medium rounded">
              NOVO
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              -{discountPercentage}%
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-1 bg-uss-gold text-white text-xs font-medium rounded">
              {product.badge}
            </span>
          )}
          {variant === 'featured' && (
            <span className="px-2 py-1 bg-gradient-to-r from-uss-blue to-uss-turquoise text-white text-xs font-medium rounded">
              DESTAQUE
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
        >
          <HeartIcon 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'
            }`} 
          />
        </button>

        {/* Stock Badge */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Indisponível
            </span>
          </div>
        )}

        {/* Product Image */}
        <Link href={`/product/${product.slug || product.id}`} className="block h-full">
          <div className="w-full h-full bg-gradient-to-br from-light-100 to-light-200 dark:from-dark-600 dark:to-dark-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <div className="text-4xl font-bold text-uss-blue dark:text-uss-turquoise">
                {product.name.charAt(0)}
              </div>
            )}
          </div>
        </Link>

        {/* Quick Actions */}
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 right-2 flex gap-1"
          >
            <button 
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className="w-8 h-8 bg-uss-blue text-white rounded-full flex items-center justify-center hover:bg-uss-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-4 h-4" />
            </button>
            <Link 
              href={`/product/${product.slug || product.id}`}
              className="w-8 h-8 bg-uss-turquoise text-white rounded-full flex items-center justify-center hover:bg-uss-turquoise/90 transition-colors"
            >
              <EyeIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-medium text-uss-blue dark:text-uss-turquoise">{product.marca}</span>
          <span className="bg-light-100 dark:bg-dark-700 px-2 py-1 rounded text-xs">{product.category}</span>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-uss-blue dark:group-hover:text-uss-turquoise transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating!) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-uss-blue dark:text-uss-turquoise">
            R$ {finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          {product.discountPrice && product.price !== product.discountPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={product.inStock === false || isInCart}
            className={`flex-1 text-xs transition-colors ${
              isInCart 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-uss-blue hover:bg-uss-blue/90 text-white'
            }`}
          >
            {isInCart ? 'Adicionado' : 'Comprar'}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            asChild
            className="border-uss-turquoise text-uss-turquoise hover:bg-uss-turquoise hover:text-white text-xs px-3"
          >
            <Link href={`/product/${product.slug || product.id}`}>
              Ver
            </Link>
          </Button>
        </div>

        {/* Stock Status */}
        <div className="mt-2 text-center">
          <span className={`text-xs font-medium ${
            product.inStock !== false 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-500 dark:text-red-400'
          }`}>
            {product.inStock !== false ? '✓ Em estoque' : '✗ Indisponível'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Componente de loading skeleton
export function USSProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-uss shadow-uss-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-light-200 dark:bg-dark-600" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-light-200 dark:bg-dark-600 rounded w-16" />
          <div className="h-3 bg-light-200 dark:bg-dark-600 rounded w-12" />
        </div>
        <div className="h-4 bg-light-200 dark:bg-dark-600 rounded w-3/4" />
        <div className="h-3 bg-light-200 dark:bg-dark-600 rounded w-1/2" />
        <div className="h-6 bg-light-200 dark:bg-dark-600 rounded w-24" />
        <div className="h-8 bg-light-200 dark:bg-dark-600 rounded" />
      </div>
    </div>
  )
}
