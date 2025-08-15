'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/hooks/use-favorites'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface SimpleProduct {
  id: string
  name: string
  price: number
  image: string
  description?: string
  originalPrice?: number
  rating?: number
  featured?: boolean
}

interface SimpleProductCardProps {
  product: SimpleProduct
  className?: string
}

export function SimpleProductCard({ product, className = '' }: SimpleProductCardProps) {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { user } = useAuth()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Faça login para adicionar aos favoritos')
      return
    }
    
    await toggleFavorite(product.id)
  }

  const isProductFavorite = isFavorite(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || '/placeholder-image.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && (
            <Badge className="bg-[#00CED1] hover:bg-[#20B2AA] text-white">
              Destaque
            </Badge>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <Badge variant="destructive">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleFavorite}
            className={`h-8 w-8 p-0 bg-white/90 hover:bg-white ${isProductFavorite ? 'text-red-500 bg-red-50' : ''}`}
          >
            <Heart className={`h-4 w-4 ${isProductFavorite ? 'fill-current' : ''}`} />
          </Button>
          
          <Link href={`/product/${product.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-[#00CED1] transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[#00CED1]">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SimpleProductCard
