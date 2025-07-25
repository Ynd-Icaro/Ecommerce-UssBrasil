'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface SimpleProductCardProps {
  id: string | number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating?: number
  isNew?: boolean
}

export function SimpleProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 0,
  isNew = false
}: SimpleProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${name} to cart`)
  }

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Product Image */}
          <Link href={`/product/${id}`}>
            {image && image.trim() !== '' ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 text-sm">Sem imagem</span>
              </div>
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-blue-600 text-white shadow-lg">
                Novo
              </Badge>
            )}
            {originalPrice && (
              <Badge variant="destructive" className="shadow-lg">
                Oferta
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Quick Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-3 left-3 right-3 flex gap-2"
              >
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="flex-1 bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Link href={`/product/${id}`}>
                    Ver mais
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category */}
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {category}
          </div>

          {/* Product Name */}
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({rating})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
