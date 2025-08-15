'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useCart } from '@/contexts/CartContext'

// Função para formatar preço
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  marca: string
  slug?: string
  rating?: number
  reviewsCount?: number
}

export default function FavoritosPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()
        const products = data.products.filter((product: any) => 
          favorites.includes(parseInt(product.id.replace(/\D/g, '')))
        )
        setFavoriteProducts(products)
      } catch (error) {
        console.error('Erro ao carregar produtos favoritos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteProducts()
  }, [favorites])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      quantity: 1
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#1ea7ff] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando favoritos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <HeartIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sua lista de favoritos está vazia
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore nossos produtos e adicione seus favoritos para acessá-los rapidamente aqui.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Descobrir Produtos
              <ShoppingBagIcon className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] rounded-lg flex items-center justify-center">
                <HeartSolidIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
                <p className="text-gray-600">
                  {favoriteProducts.length} {favoriteProducts.length === 1 ? 'produto favorito' : 'produtos favoritos'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {product.discountPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </div>
                )}

                {/* Actions */}
                <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(parseInt(product.id.replace(/\D/g, '')))}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  </button>
                  
                  <Link
                    href={`/produto/${product.slug || product.id}`}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.marca}</p>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviewsCount || 0})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-4">
                  {product.discountPrice ? (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.discountPrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-[#1ea7ff] font-semibold transition-colors"
          >
            Continuar Comprando
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
