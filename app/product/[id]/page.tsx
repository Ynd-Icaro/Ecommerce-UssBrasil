'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck,
  Shield,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useProducts, type Product } from '@/hooks/use-products'
import { useCart } from '@/contexts/CartContext'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productId, setProductId] = useState<string | null>(null)
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  const { products } = useProducts()
  const { addToCart } = useCart()

  // Resolve params on client side
  useEffect(() => {
    params.then(resolvedParams => {
      setProductId(resolvedParams.id)
    })
  }, [params])

  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find(p => p.id === productId)
      if (product) {
        setSelectedProduct(product)
      }
      setLoading(false)
    }
  }, [productId, products])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Link href="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos produtos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleAddToCart = () => {
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: getProductImage(),
      quantity
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  const getProductImage = () => {
    if (Array.isArray(selectedProduct.images)) {
      return selectedProduct.images[selectedImage] || selectedProduct.images[0]
    }
    return selectedProduct.image || selectedProduct.mainImage || '/placeholder-product.jpg'
  }

  const categoryName = typeof selectedProduct.category === 'string' 
    ? selectedProduct.category 
    : selectedProduct.category?.name || 'Categoria'

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Início
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              Produtos
            </Link>
            <span className="text-gray-300">/</span>
            <Link href={`/categories/${categoryName.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
              {categoryName}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{selectedProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <motion.div
              key={getProductImage()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden"
            >
              <Image
                src={getProductImage()}
                alt={selectedProduct.name}
                fill
                className="object-contain p-8"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {selectedProduct.isNew && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                    Novo
                  </Badge>
                )}
                {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 && (
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                    -{selectedProduct.discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Favorite Button */}
              <div className="absolute top-6 right-6">
                <Button
                  size="icon"
                  variant={isFavorite ? "default" : "secondary"}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="rounded-full h-12 w-12"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </motion.div>

            {/* Additional Images */}
            {Array.isArray(selectedProduct.images) && selectedProduct.images.length > 1 && (
              <div className="flex space-x-3">
                {selectedProduct.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProduct.name} - ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {selectedProduct.brand || categoryName}
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({selectedProduct.reviews || 0} avaliações)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
              
              {selectedProduct.shortDescription && (
                <p className="text-lg text-gray-600 mb-6">{selectedProduct.shortDescription}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
              </div>
              
              {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 && (
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  Economize {selectedProduct.discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Description */}
            {selectedProduct.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
              </div>
            )}

            {/* Features */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedProduct.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantidade:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>

            {/* Shipping & Guarantees */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Frete grátis para compras acima de R$ 299</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Garantia de 1 ano</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}