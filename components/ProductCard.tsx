"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Plus, Minus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoritesContext"

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[] | string;
  image?: string;
  mainImage?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  stock: number;
  featured?: boolean;
  specifications?: string;
  createdAt?: string;
  updatedAt?: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  inStock?: boolean;
  features?: string[];
}

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  // Verificação de segurança para o produto
  if (!product || typeof product !== 'object') {
    return null
  }

  const quantityInCart = getItemQuantity(product.id)
  const favorite = isFavorite(product.id)
  
  // Get the first image from various possible sources
  let productImage = ''
  
  // Try mainImage first
  if (product.mainImage) {
    productImage = product.mainImage
  }
  // Then try image field
  else if (product.image) {
    productImage = product.image
  }
  // Then try images array or string
  else if (product.images) {
    if (Array.isArray(product.images)) {
      productImage = product.images[0] || ''
    } else if (typeof product.images === 'string') {
      const imageArray = product.images.split(',')
      productImage = imageArray[0] || ''
    }
  }
  
  // Fallback to favicon if no image found
  const safeImageSrc = productImage && productImage.trim() !== '' ? productImage : '/favicon.ico'

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-gray-200/80 hover:shadow-xl transition-all duration-300 ease-in-out"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={safeImageSrc}
            alt={product.name}
            fill
            className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-9 w-9 bg-white/70 backdrop-blur-sm hover:bg-white"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-5 w-5 transition-all ${favorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </Button>
          {onQuickView && (
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full h-9 w-9 bg-white/70 backdrop-blur-sm hover:bg-white"
              onClick={(e) => {
                e.preventDefault()
                onQuickView()
              }}
            >
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          )}
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-blue-500 text-white border-none">Novo</Badge>}
            {product.originalPrice && (
                <Badge variant="destructive">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
            )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {product.category?.name && (
          <p className="text-xs text-gray-500 mb-1">{product.category.name}</p>
        )}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 flex-grow">
          <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
            {typeof product.name === 'string' ? product.name : 'Produto sem nome'}
          </Link>
        </h3>

        {product.rating && typeof product.rating === 'number' && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
            {product.reviews && typeof product.reviews === 'number' && (
              <span className="text-xs text-gray-500">({product.reviews})</span>
            )}
          </div>
        )}

        <div className="mt-3">
            {typeof product.price === 'number' && (
              <span className="text-lg sm:text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
            {product.originalPrice && typeof product.originalPrice === 'number' && (
                <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
        </div>
        
        <div className="mt-4 space-y-2">
            {quantityInCart === 0 ? (
                <Button className="w-full" onClick={() => addToCart({ 
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: safeImageSrc 
                })}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
                </Button>
            ) : (
                <div className="flex items-center justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, quantityInCart - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg w-10 text-center">{quantityInCart}</span>
                    <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, quantityInCart + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            )}
            
            {onQuickView && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={(e) => {
                  e.preventDefault()
                  onQuickView()
                }}
              >
                <Search className="mr-1 h-3 w-3" />
                Visualização Rápida
              </Button>
            )}
        </div>
      </div>
    </motion.div>
  )
}
