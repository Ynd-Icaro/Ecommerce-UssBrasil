'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug?: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  description?: string
  shortDescription?: string
  mainImage: string
  images?: string[]
  colors?: Array<{
    name: string
    code: string
    image: string
  }>
  rating?: number
  reviews?: number
  isNew?: boolean
  isTrending?: boolean
  inStock?: boolean
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickView?: boolean
  className?: string
}

export function ProductCard({ 
  product, 
  variant = 'default', 
  showQuickView = true,
  className 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : product.discountPercentage || 0

  const currentImage = product.colors?.length 
    ? product.colors[selectedColorIndex]?.image || product.mainImage
    : product.mainImage

  const productUrl = `/product/${product.slug || product.id}`

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100",
        variant === 'compact' && "max-w-xs",
        variant === 'featured' && "md:col-span-2 lg:col-span-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-lg">
            Novo
          </Badge>
        )}
        {product.isTrending && (
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-gradient-to-r from-green-600 to-emerald-500 text-white border-0 shadow-lg">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsFavorite(!isFavorite)
        }}
        className={cn(
          "absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-lg",
          "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0",
          isFavorite && "opacity-100 translate-y-0"
        )}
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-colors duration-200",
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
          )}
        />
      </button>

      {/* Product Image */}
      <Link href={productUrl} className="block relative">
        <div className={cn(
          "relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100",
          variant === 'compact' ? "aspect-square" : "aspect-[4/3]"
        )}>
          <Image
            src={currentImage}
            alt={product.name}
            fill
            className={cn(
              "object-contain p-4 transition-all duration-500",
              "group-hover:scale-105"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Hover Overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
          />

          {/* Quick Actions */}
          {showQuickView && (
            <div 
              className={cn(
                "absolute inset-x-0 bottom-0 p-4 transform translate-y-full transition-transform duration-300",
                isHovered && "translate-y-0"
              )}
            >
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-medium">
            {product.brand}
          </Badge>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-gray-500">({product.reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={productUrl}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColorIndex(index)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all duration-200",
                  selectedColorIndex === index 
                    ? "border-blue-500 scale-110" 
                    : "border-gray-300 hover:border-gray-400"
                )}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              ou 12x de {formatPrice(product.price / 12)} sem juros
            </p>
          </div>

          {/* Add to Cart */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        {/* Stock Status */}
        {product.inStock !== undefined && (
          <div className="pt-2">
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">✓ Em estoque</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">⚠ Fora de estoque</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
