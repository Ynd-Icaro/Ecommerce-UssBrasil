"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoritesContext"

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    category?: string;
    isNew?: boolean;
    inStock?: boolean;
    features?: string[];
}

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const quantityInCart = getItemQuantity(product.id)
  const favorite = isFavorite(product.id)

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md border border-gray-200/80 hover:shadow-xl transition-all duration-300 ease-in-out"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </Link>
        <div className="absolute top-3 right-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-9 w-9 bg-white/70 backdrop-blur-sm hover:bg-white"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-5 w-5 transition-all ${favorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </Button>
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
        {product.category && <p className="text-xs text-gray-500 mb-1">{product.category}</p>}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 flex-grow">
          <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
            {product.name}
          </Link>
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        )}

        <div className="mt-3">
            <span className="text-lg sm:text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
        </div>
        
        <div className="mt-4">
            {quantityInCart === 0 ? (
                <Button className="w-full" onClick={() => addToCart(product)}>
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
        </div>
      </div>
    </motion.div>
  )
}
