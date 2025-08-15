'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Product } from '@/types'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'

interface RelatedProductsProps {
  currentProduct: Product
  products: Product[]
  title?: string
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProduct, 
  products, 
  title = "Produtos Relacionados" 
}) => {
  const { addItem } = useCart()
  const { addItem: addToWishlist, items: wishlistItems } = useWishlist()
  
  // Filter related products based on category, brand, or tags
  const relatedProducts = products
    .filter(product => 
      product.id !== currentProduct.id && (
        product.category === currentProduct.category ||
        product.marca === currentProduct.marca ||
        product.tags.some(tag => currentProduct.tags.includes(tag))
      )
    )
    .slice(0, 4)

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product)
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId)
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Produtos que você também pode gostar
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="uss-card hover:shadow-lg transition-all duration-300 product-card-hover">
                {/* Product Image */}
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Link href={`/produto/${product.slug || product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-2">
                    {product.isNew && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                        NOVO
                      </span>
                    )}
                    {product.bestSeller && (
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                        MAIS VENDIDO
                      </span>
                    )}
                    {product.vipOnly && (
                      <span className="px-2 py-1 vip-gradient text-white text-xs font-semibold rounded">
                        VIP
                      </span>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-2 rounded-full shadow-lg transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HeartIcon className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 rounded-full bg-[var(--ussbrasil-primary)] text-white shadow-lg hover:bg-[var(--ussbrasil-secondary)] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="space-y-2">
                  {/* Brand */}
                  <p className="text-sm text-[var(--ussbrasil-primary)] font-medium">
                    {product.marca}
                  </p>
                  
                  {/* Title */}
                  <Link href={`/produto/${product.slug || product.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white hover:text-[var(--ussbrasil-primary)] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviewsCount})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-[var(--ussbrasil-primary)]">
                        R$ {(product.discountPrice || product.price).toLocaleString('pt-BR')}
                      </span>
                      {product.discountPrice && product.discountPrice < product.price && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          R$ {product.price.toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock */}
                    <p className={`text-xs ${
                      product.stock > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href={`/produtos?categoria=${currentProduct.category}`}
            className="uss-button-primary inline-flex items-center"
          >
            Ver Mais Produtos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
