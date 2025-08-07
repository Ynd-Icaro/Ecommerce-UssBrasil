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
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviews?: number
  category?: string
  isNew?: boolean
  inStock?: boolean
  features?: string[]
}

interface ProductCardProps {
  product: Product
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()

  const quantityInCart = getItemQuantity(product.id)
  const favorite = isFavorite(product.id)

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8 sm:p-12 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </Link>
        <div className="absolute top-4 right-4 z-10">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-md hover:bg-white shadow"
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`h-6 w-6 transition-all ${favorite ? "text-red-500 fill-current" : "text-gray-400"}`} />
          </Button>
        </div>
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <Badge className="bg-blue-600 text-white border-none shadow">Novo</Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-red-600 text-white border-none shadow">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
            <span className="text-lg font-semibold text-gray-600">Esgotado</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {product.category && (
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">{product.category}</p>
        )}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex-grow mb-2">
          <Link
            href={`/product/${product.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        {product.features && product.features.length > 0 && (
          <ul className="mb-2 text-xs text-gray-500 space-y-1">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {product.rating && (
          <div className="flex items-center gap-2 mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        )}

        <div className="mt-2 mb-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-base text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="mt-auto">
          {product.inStock === false ? (
            <Button className="w-full" disabled variant="outline">
              Indisponível
            </Button>
          ) : quantityInCart === 0 ? (
            <Button
              className="w-full font-medium text-base py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao carrinho
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="rounded-xl"
                onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="font-bold text-xl w-12 text-center">{quantityInCart}</span>
              <Button
                size="icon"
                variant="outline"
                className="rounded-xl"
                onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
