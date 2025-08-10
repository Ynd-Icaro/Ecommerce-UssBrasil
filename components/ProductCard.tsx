"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { slugifyCategory } from '@/lib/slugify'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  images?: string[]
  category: string
  marca: string
  rating?: number
  stock: number
  featured?: boolean
  description?: string
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickView?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  variant = 'default', 
  showQuickView = false,
  className = '' 
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useAuth()
  const [imageLoading, setImageLoading] = useState(true)
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  const isFavorite = favorites.includes(product.id)
  const discountPercentage = product.discountPrice 
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0

  const productLink = `/produtos/${slugifyCategory(product.category)}/${product.id}`

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      category: product.category
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={`group relative bg-white rounded-lg border border-uss-gray-300 hover:border-uss-primary/30 hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <Link href={productLink} className="block p-3">
          <div className="aspect-square relative mb-2 rounded-md overflow-hidden bg-uss-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setImageLoading(false)}
            />
            {product.featured && (
              <Badge className="absolute top-1 left-1 bg-uss-secondary text-white text-xs">
                Destaque
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="absolute top-1 right-1 bg-uss-danger text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          
          <h3 className="font-medium text-sm text-uss-gray-800 line-clamp-2 mb-1">{product.name}</h3>
          
          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex flex-col">
                  <span className="text-xs text-uss-gray-500 line-through">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-sm font-bold text-uss-primary">
                    R$ {product.discountPrice.toLocaleString('pt-BR')}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-bold text-uss-gray-800">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleToggleFavorite}
                className="h-6 w-6 p-0"
              >
                <Heart 
                  className={`h-3 w-3 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="h-6 px-2 bg-uss-primary hover:bg-uss-secondary text-white text-xs"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className={`group relative bg-white rounded-xl border border-uss-gray-300 hover:border-uss-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
      >
        <Link href={productLink} className="block">
          <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-uss-gray-50 to-uss-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              onLoad={() => setImageLoading(false)}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.featured && (
                <Badge className="bg-gradient-to-r from-uss-secondary to-uss-secondary-light text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  Destaque
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-gradient-to-r from-uss-danger to-uss-danger-light text-white border-0">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleToggleFavorite}
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md"
              >
                <Heart 
                  className={`h-4 w-4 ${isFavorite ? 'fill-uss-danger text-uss-danger' : 'text-uss-gray-600'}`} 
                />
              </Button>
              {showQuickView && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                >
                  <Eye className="h-4 w-4 text-uss-gray-600" />
                </Button>
              )}
            </div>

            {/* Stock status */}
            {product.stock <= 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-white text-gray-900">
                  Esgotado
                </Badge>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs mb-2">
                {product.marca}
              </Badge>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-uss-primary transition-colors">
                {product.name}
              </h3>
            </div>
            
            {product.rating && (
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= product.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <div>
                {product.discountPrice ? (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 line-through">
                      R$ {product.price.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xl font-bold text-uss-primary">
                      R$ {product.discountPrice.toLocaleString('pt-BR')}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-gray-900">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                )}
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500">Estoque</div>
                <div className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {product.stock} unidades
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="w-full bg-uss-primary hover:bg-uss-secondary text-white"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock <= 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
            </Button>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setShowQuickAdd(true)}
      onHoverEnd={() => setShowQuickAdd(false)}
      className={`group relative bg-white rounded-lg border border-gray-200 hover:border-uss-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      <Link href={productLink} className="block">
        <div className="aspect-square relative overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
          />
          
          {/* Badges */}
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white text-xs">
              Destaque
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          
          {/* Favorite button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleFavorite}
            className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs mb-1">
              {product.marca}
            </Badge>
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-uss-primary transition-colors">
              {product.name}
            </h3>
          </div>
          
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3 w-3 ${
                      star <= product.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-3">
            <div>
              {product.discountPrice ? (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 line-through">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-lg font-bold text-uss-primary">
                    R$ {product.discountPrice.toLocaleString('pt-BR')}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
              )}
            </div>
            
            <div className="text-right">
              <div className={`text-xs ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showQuickAdd ? 1 : 0, y: showQuickAdd ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-uss-primary hover:bg-uss-secondary text-white"
              disabled={product.stock <= 0}
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock <= 0 ? 'Indisponível' : 'Adicionar'}
            </Button>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
