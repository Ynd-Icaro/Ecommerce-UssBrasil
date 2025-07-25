'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ProductCardProps {
  id: string
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating?: number
  reviews?: number
  isNew?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: (id: string) => void
  onAddToCart?: (id: string) => void
  className?: string
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 0,
  reviews = 0,
  isNew = false,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  className = ''
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = originalPrice 
    ? Math.round(((parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.')) - 
        parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'))) / 
        parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.'))) * 100)
    : 0

  return (
    <motion.div
      className={`group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
              {isNew && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
                  Novo
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            <motion.div
              className="absolute top-3 right-3 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.7, 
                scale: isHovered ? 1 : 0.8 
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={() => onFavoriteToggle?.(id)}
                size="sm"
                variant="ghost"
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </Button>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image}
                alt={name}
                fill
                className={`object-contain p-4 transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </motion.div>

            {/* Quick Actions Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex space-x-2">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ delay: 0.1 }}
                >
                  <Link href={`/product/${id}`}>
                    <Button
                      size="sm"
                      className="rounded-full bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => onAddToCart?.(id)}
                    size="sm"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Comprar
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {category}
            </p>

            {/* Product Name */}
            <Link href={`/product/${id}`}>
              <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                {name}
              </h3>
            </Link>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${
                        star <= rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({reviews})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">{price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
