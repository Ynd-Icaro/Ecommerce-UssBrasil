'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  GiftIcon,
  CheckIcon,
  XMarkIcon,
  ShareIcon,
  EyeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { Product } from '@/types'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { useLoading } from '@/hooks/use-loading'
import { useProductProps, useProductPricing, useProductStock, useProductBadges } from '@/hooks/use-product-props'
import RelatedProducts from './related-products'
import Breadcrumb from './breadcrumb'
import ProductImage from './product/product-image'
import { useToast } from './toast-notification'
import LoadingSpinner, { ButtonLoading } from './ui/loading'
import { useFeedback } from './ui/feedback'

interface ProductPageProps {
  product: Product
  allProducts?: Product[]
}

const ProductPage: React.FC<ProductPageProps> = ({ product, allProducts = [] }) => {
  const router = useRouter()
  
  // Hooks organizados para props do produto
  const productProps = useProductProps(product)
  const stockInfo = useProductStock(product)
  const badges = useProductBadges(product)
  
  // Estados locais
  const [selectedStorage, setSelectedStorage] = useState(product.variants?.[0]?.storage || '')
  const [selectedMemory, setSelectedMemory] = useState(product.variants?.[0]?.memory || '')
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  
  // Variante selecionada
  const currentVariant = product.variants?.find(
    variant => variant.storage === selectedStorage && variant.memory === selectedMemory
  )
  
  // Pricing usando o hook
  const pricingInfo = useProductPricing(product, currentVariant)
  
  // Hooks de funcionalidades
  const { addItem } = useCart()
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { success, error, ToastContainer } = useToast()
  const { isLoading: isAddingToCart, withLoading: withCartLoading } = useLoading()
  const { isLoading: isUpdatingWishlist, withLoading: withWishlistLoading } = useLoading()
  const { showSuccess, showError, showCart, showLove, FeedbackComponent } = useFeedback()
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id)
  const currentImages = productProps.images || []

  const handleAddToCart = async () => {
    if (!stockInfo.inStock) {
      showError('Produto fora de estoque')
      return
    }
    
    await withCartLoading(async () => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      addItem(product, quantity, {
        color: selectedStorage,
        variant: { storage: selectedStorage, memory: selectedMemory }
      })
      
      showCart(`${productProps.name} adicionado ao carrinho!`)
    })
  }

  const handleWishlistToggle = async () => {
    await withWishlistLoading(async () => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (isInWishlist) {
        removeFromWishlist(product.id)
        showSuccess(`${productProps.name} removido da lista de desejos`)
      } else {
        addToWishlist(product)
        showLove(`${productProps.name} adicionado aos favoritos!`)
      }
    })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  const tabs = [
    { id: 'description', label: 'Descrição', content: product.description },
    { id: 'specifications', label: 'Especificações', content: product.specifications },
    { id: 'benefits', label: 'Benefícios', content: product.benefits },
    { id: 'warranty', label: 'Garantia', content: product.warranty },
    { id: 'reviews', label: 'Avaliações', content: 'reviews' }
  ]

  const breadcrumbItems = [
    { label: 'Produtos', href: '/produtos' },
    { label: productProps.category, href: `/produtos?categoria=${productProps.category}` },
    { label: productProps.name }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={currentImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsImageModalOpen(true)}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                {/* Zoom Icon */}
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                
                {/* VIP Badge */}
                {product.vipOnly && (
                  <div className="absolute top-4 left-4 px-3 py-1 vip-gradient rounded-full text-white text-sm font-semibold">
                    VIP
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {currentImages.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto">
                  {currentImages.map((image: string, index: number) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-[var(--ussbrasil-primary)]'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Title */}
              <div>
                <p className="text-sm text-[var(--ussbrasil-primary)] font-medium uppercase tracking-wide">
                  {product.marca}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {product.name}
                </h1>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolid
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.rating}) • {product.reviewsCount || 0} avaliações
                </span>
              </div>
              
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-[var(--ussbrasil-primary)]">
                    {pricingInfo.formattedCurrentPrice}
                  </span>
                  {pricingInfo.hasDiscount && (
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                      {pricingInfo.formattedOriginalPrice}
                    </span>
                  )}
                </div>
                {pricingInfo.hasDiscount && (
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Economia de {pricingInfo.formattedSavings} ({pricingInfo.discount}% OFF)
                  </p>
                )}
              </div>
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  {/* Storage */}
                  {product.variants.some(v => v.storage) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Armazenamento: {selectedStorage}
                      </label>
                      <div className="flex space-x-2">
                        {[...new Set(product.variants.map(v => v.storage))].filter(Boolean).map((storage) => (
                          <button
                            key={storage}
                            onClick={() => setSelectedStorage(storage!)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                              selectedStorage === storage
                                ? 'border-[var(--ussbrasil-primary)] bg-[var(--ussbrasil-primary)] text-white'
                                : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                          >
                            {storage}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Memory */}
                  {product.variants.some(v => v.memory) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Memória: {selectedMemory}
                      </label>
                      <div className="flex space-x-2">
                        {[...new Set(product.variants.map(v => v.memory))].filter(Boolean).map((memory) => (
                          <button
                            key={memory}
                            onClick={() => setSelectedMemory(memory!)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                              selectedMemory === memory
                                ? 'border-[var(--ussbrasil-primary)] bg-[var(--ussbrasil-primary)] text-white'
                                : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                          >
                            {memory}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Quantidade
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stockInfo.inStock ? `${stockInfo.stockCount} em estoque` : stockInfo.stockStatus}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!stockInfo.inStock || isAddingToCart}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      stockInfo.inStock && !isAddingToCart
                        ? 'uss-button-primary'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={stockInfo.inStock && !isAddingToCart ? { scale: 1.02 } : {}}
                    whileTap={stockInfo.inStock && !isAddingToCart ? { scale: 0.98 } : {}}
                  >
                    {isAddingToCart ? (
                      <ButtonLoading />
                    ) : (
                      <>
                        <ShoppingCartIcon className="w-5 h-5" />
                        <span>{stockInfo.inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}</span>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleWishlistToggle}
                    disabled={isUpdatingWishlist}
                    className={`p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 transition-colors ${
                      isUpdatingWishlist ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isUpdatingWishlist ? { scale: 1.05 } : {}}
                    whileTap={!isUpdatingWishlist ? { scale: 0.95 } : {}}
                  >
                    {isUpdatingWishlist ? (
                      <LoadingSpinner size="sm" />
                    ) : isInWishlist ? (
                      <HeartSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShareIcon className="w-6 h-6" />
                  </motion.button>
                </div>
                
                {stockInfo.inStock && (
                  <button className="w-full bg-[var(--ussbrasil-gold)] text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors">
                    Comprar Agora
                  </button>
                )}
              </div>
              
              {/* Features */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="w-5 h-5 text-[var(--ussbrasil-primary)]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Frete grátis para todo o Brasil
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-[var(--ussbrasil-primary)]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Garantia de 1 ano
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GiftIcon className="w-5 h-5 text-[var(--ussbrasil-primary)]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Embalagem premium incluída
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[var(--ussbrasil-primary)] text-[var(--ussbrasil-primary)]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'reviews' ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Avaliações dos Clientes
                    </h3>
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      Nenhuma avaliação ainda. Seja o primeiro a avaliar este produto!
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {(() => {
                      const content = tabs.find(t => t.id === activeTab)?.content
                      if (typeof content === 'string') {
                        return <p>{content}</p>
                      } else if (Array.isArray(content)) {
                        return (
                          <ul>
                            {content.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        )
                      } else if (content && typeof content === 'object') {
                        return (
                          <div className="space-y-2">
                            {Object.entries(content).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="font-medium">{key}:</span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return <p>Informação não disponível</p>
                    })()}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <img
                src={currentImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Related Products */}
      {allProducts.length > 0 && (
        <RelatedProducts 
          currentProduct={product} 
          products={allProducts} 
        />
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
      
      {/* Feedback Component */}
      {FeedbackComponent}
    </div>
  )
}

export default ProductPage
