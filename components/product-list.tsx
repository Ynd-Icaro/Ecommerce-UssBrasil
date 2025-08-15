'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    price: 7999.99,
    discountPrice: 7499.99,
    image: '/Produtos/Apple/Iphone 16 Pro.png',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 1245,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 12999.99,
    discountPrice: 11999.99,
    image: '/Produtos/Apple/Macbook Pro.png',
    category: 'Notebooks',
    rating: 4.8,
    reviews: 892,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    price: 1899.99,
    discountPrice: 1699.99,
    image: '/Produtos/Apple/Airpods Pro 2.png',
    category: 'Audio',
    rating: 4.7,
    reviews: 2156,
    inStock: true
  },
  {
    id: '4',
    name: 'Apple Watch Ultra 2',
    price: 4999.99,
    image: '/Produtos/Apple/Apple Watch Ultra 2.png',
    category: 'Wearables',
    rating: 4.6,
    reviews: 567,
    inStock: true
  },
  {
    id: '5',
    name: 'iPad Pro',
    price: 6999.99,
    discountPrice: 6299.99,
    image: '/Produtos/Apple/Ipad Pro.png',
    category: 'Tablets',
    rating: 4.8,
    reviews: 1034,
    inStock: true
  },
  {
    id: '6',
    name: 'Studio Display',
    price: 8999.99,
    image: '/Produtos/Apple/Studio Display.png',
    category: 'Monitores',
    rating: 4.5,
    reviews: 234,
    inStock: false
  }
]

interface ProductListProps {
  showFeatured?: boolean
  limit?: number
  category?: string
}

export default function ProductList({ showFeatured = false, limit = 6, category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simular carregamento de produtos
    setTimeout(() => {
      let filteredProducts = sampleProducts

      if (showFeatured) {
        filteredProducts = filteredProducts.filter(p => p.featured)
      }

      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
      }

      setProducts(filteredProducts.slice(0, limit))
      setLoading(false)
    }, 500)
  }, [showFeatured, limit, category])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    })
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 p-6">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {showFeatured ? 'Produtos em Destaque' : 'Nossos Produtos'}
          </h2>
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.discountPrice && (
                      <Badge className="bg-red-500 text-white text-xs">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="bg-yellow-500 text-white text-xs">
                        Destaque
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="bg-gray-500 text-white text-xs">
                        Esgotado
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button 
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      toast.info('Favoritos em desenvolvimento')
                    }}
                  >
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Adicionar' : 'Esgotado'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
