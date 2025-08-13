'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Heart, Eye, Star, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, calculateDiscount, type Product } from '@/hooks/use-products'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'

interface ProductCardProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
  showQuickActions?: boolean
  showColors?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  size = 'md',
  showQuickActions = true,
  showColors = true,
  className = ''
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const currentImage = selectedColor?.image || product.mainImage
  const discount = product.originalPrice ? calculateDiscount(product.price, product.originalPrice) : 0
  const isFavorited = isFavorite(product.id)

  const sizeClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: currentImage,
      color: selectedColor?.name,
      quantity: 1
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorited) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <motion.div
      className={`group relative ${sizeClasses[size]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                Novo
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg">
                -{discount}%
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
                Destaque
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-gray-200 shadow-md"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 p-0 bg-white/90 hover:bg-white border-gray-200 shadow-md"
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          )}

          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className={`object-contain transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${isHovered ? 'scale-105' : 'scale-100'}`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
            </div>

            {/* Quick Add to Cart - appears on hover */}
            <motion.div
              className="absolute inset-x-4 bottom-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Brand */}
            <p className="text-sm font-medium text-blue-600 mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Colors */}
            {showColors && product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Cores:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 4).map((color, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedColor(color)
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-gray-500 ml-1">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Stock indicator */}
              <div className="flex items-center gap-1 text-sm">
                {product.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-600">Em estoque</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-600">Indisponível</span>
                  </>
                )}
              </div>
            </div>

            {/* Shipping info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4" />
              <span>Entrega grátis</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
