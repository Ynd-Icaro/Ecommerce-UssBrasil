'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Expand,
  Play,
  Pause,
  ZoomIn,
  Share2,
  Info
} from 'lucide-react'
import { useProductsDatabase } from '@/lib/use-products-database'
import { toast } from 'sonner'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { getAllProducts } = useProductsDatabase()
  
  // Local price formatting function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [id, setId] = useState<string>('')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [imageLoadError, setImageLoadError] = useState(false)

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  // Encontrar produto usando o sistema de banco de dados
  const product = useMemo(() => {
    if (!id) return null
    const allProducts = getAllProducts()
    return allProducts.find(p => p.slug === id || p.id === id)
  }, [id, getAllProducts])

  // Imagens do produto baseadas na cor selecionada - Sistema completo de gestão por cores
  const currentImages = useMemo(() => {
    if (!product || !product.colors || !product.colors[selectedColorIndex]) {
      return product?.images ? [product.images.main, ...product.images.gallery] : []
    }
    
    const selectedColor = product.colors[selectedColorIndex]
    // Prioriza a imagem específica da cor selecionada
    const colorSpecificImages = [selectedColor.image]
    
    // Adiciona imagens da galeria geral, mas filtra duplicatas
    const galleryImages = product.images.gallery.filter(
      img => img !== selectedColor.image
    )
    
    return [...colorSpecificImages, ...galleryImages]
  }, [product, selectedColorIndex])

  // Preço dinâmico baseado no armazenamento selecionado
  const currentPrice = useMemo(() => {
    if (!product) return 0
    
    let basePrice = product.price
    
    // Aplicar multiplicador baseado no armazenamento (simulação de tiers de preço)
    if (product.storage && product.storage.length > 0) {
      const storageMultipliers = [1, 1.25, 1.5, 1.75, 2.0] // Para 128GB, 256GB, 512GB, 1TB, 2TB
      const multiplier = storageMultipliers[selectedStorageIndex] || 1
      basePrice = product.price * multiplier
    }
    
    return basePrice
  }, [product, selectedStorageIndex])

  useEffect(() => {
    if (id && !product) {
      router.push('/products')
    }
  }, [product, router, id])

  // Loading state
  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-gray-600 font-medium">Carregando produto...</p>
        </motion.div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Info className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Button 
            onClick={() => router.push('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Voltar aos produtos
          </Button>
        </motion.div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const selectedColor = product.colors[selectedColorIndex]
    const selectedStorage = product.storage?.[selectedStorageIndex]
    
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: `Cor: ${selectedColor.name}${selectedStorage ? ` • ${selectedStorage}` : ''} • Quantidade: ${quantity}`
    })
  }

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index)
    setSelectedImageIndex(0) // Reset para primeira imagem da nova cor
    setImageLoadError(false) // Reset error state
  }

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === 0 ? currentImages.length - 1 : prev - 1
      )
    } else {
      setSelectedImageIndex(prev => 
        prev === currentImages.length - 1 ? 0 : prev + 1
      )
    }
  }

  const handleImageError = () => {
    setImageLoadError(true)
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header aprimorado com glassmorphism */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-white/60 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              
              {/* Breadcrumb melhorado */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Início
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/products" className="hover:text-blue-600 transition-colors">
                  Produtos
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {product.name}
                </span>
              </nav>
            </div>

            {/* Ações do header */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={shareProduct}
                className="hidden sm:flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Galeria de Imagens - Sistema completo de alta resolução */}
          <div className="space-y-6">
            {/* Imagem Principal com resolução absoluta */}
            <motion.div 
              className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden group cursor-zoom-in"
              layoutId="product-image"
              onClick={() => setIsImageZoomed(!isImageZoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedColorIndex}-${selectedImageIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="w-full h-full relative"
                >
                  {!imageLoadError ? (
                    <Image
                      src={currentImages[selectedImageIndex] || product.images.main}
                      alt={`${product.name} - ${product.colors[selectedColorIndex]?.name || 'Padrão'}`}
                      fill
                      className={`object-contain transition-transform duration-500 ${
                        isImageZoomed ? 'scale-150' : 'scale-100'
                      } p-8`}
                      quality={100}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto flex items-center justify-center">
                          <Info className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Imagem não disponível</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navegação de Imagens aprimorada */}
              {currentImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNavigation('prev')
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNavigation('next')
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Indicadores de imagem melhorados */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {currentImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImageIndex(index)
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === selectedImageIndex
                          ? 'bg-white shadow-lg scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Badges aprimorados */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1">
                    Novo
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive" className="bg-red-600 hover:bg-red-700 font-medium px-3 py-1">
                    -{product.discount}%
                  </Badge>
                )}
              </div>

              {/* Zoom indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                  <ZoomIn className="h-4 w-4 text-white" />
                  <span className="text-white text-sm font-medium">Clique para ampliar</span>
                </div>
              </div>
            </motion.div>

            {/* Thumbnails com preview aprimorado */}
            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {currentImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden relative border-2 transition-all duration-300 ${
                      index === selectedImageIndex
                        ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Preview ${index + 1}`}
                      fill
                      className="object-contain p-3"
                      quality={90}
                      sizes="(max-width: 768px) 25vw, 120px"
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Vídeo do Produto com controles aprimorados */}
            {product.videos && product.videos.length > 0 && (
              <motion.div 
                className="relative w-full h-80 bg-black rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  src={product.videos[0]}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={isVideoPlaying}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black font-medium px-6 py-3 shadow-lg backdrop-blur-sm"
                  >
                    {isVideoPlaying ? (
                      <Pause className="h-6 w-6 mr-2" />
                    ) : (
                      <Play className="h-6 w-6 mr-2" />
                    )}
                    {isVideoPlaying ? 'Pausar' : 'Reproduzir'} Vídeo
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Informações do Produto - Hierarquia visual aprimorada */}
          <div className="space-y-8">
            <div>
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {product.description}
              </motion.p>

              {/* Rating aprimorado */}
              <motion.div 
                className="flex items-center space-x-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-colors duration-200 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-600">
                  ({product.reviews.toLocaleString()} avaliações)
                </span>
              </motion.div>
            </div>

            {/* Preço com destaque premium */}
            <motion.div 
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > currentPrice && (
                    <span className="text-xl text-gray-500 line-through ml-3">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <Badge variant="destructive" className="text-lg px-4 py-2 bg-red-600 hover:bg-red-700">
                    Economize {formatPrice(product.originalPrice! - currentPrice)}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Seleção de Cores - Sistema completo com swatches */}
            {product.colors && product.colors.length > 0 && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Cor: <span className="font-medium text-gray-700">{product.colors[selectedColorIndex].name}</span>
                  </h3>
                  <div className="flex space-x-4">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorChange(index)}
                        className={`relative w-16 h-16 rounded-2xl border-3 transition-all duration-300 ${
                          index === selectedColorIndex
                            ? 'border-blue-600 ring-4 ring-blue-600/20 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      >
                        {index === selectedColorIndex && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Check className="w-6 h-6 text-white drop-shadow-lg" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Seleção de Armazenamento */}
            {product.storage && product.storage.length > 0 && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Armazenamento: <span className="font-medium text-gray-700">{product.storage[selectedStorageIndex]}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.storage.map((storage, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStorageIndex(index)}
                        className={`p-5 text-center border-2 rounded-2xl transition-all duration-300 ${
                          index === selectedStorageIndex
                            ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-bold text-lg">{storage}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {formatPrice(product.price * (1 + index * 0.25))}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quantidade e Ações aprimoradas */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Quantidade */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quantidade</h3>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="rounded-l-2xl px-4 py-3 hover:bg-gray-50"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="px-6 py-3 font-bold text-xl min-w-[80px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-r-2xl px-4 py-3 hover:bg-gray-50"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="text-lg text-gray-600">
                    Total: <span className="font-bold text-gray-900 text-xl">{formatPrice(currentPrice * quantity)}</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação premium */}
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-4 px-6 rounded-2xl border-2 transition-all duration-300 ${
                    isWishlisted 
                      ? 'text-red-600 border-red-600 bg-red-50 hover:bg-red-100' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Informações de Entrega premium */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 space-y-4 border border-gray-200/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Entrega grátis</div>
                    <div className="text-gray-600">Em pedidos acima de R$ 500</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
                    <RotateCcw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Troca grátis</div>
                    <div className="text-gray-600">30 dias para trocas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Garantia estendida</div>
                    <div className="text-gray-600">1 ano de garantia Apple</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs com Informações Detalhadas */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-2">
              <TabsTrigger 
                value="features" 
                className="rounded-xl py-3 px-6 font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                Características
              </TabsTrigger>
              <TabsTrigger 
                value="specs" 
                className="rounded-xl py-3 px-6 font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                Especificações
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-xl py-3 px-6 font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                Avaliações
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Principais Características</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-400 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="p-4 bg-white/50 rounded-2xl">
                          <h4 className="font-bold text-gray-900 mb-2">Categoria</h4>
                          <p className="text-gray-700">{product.category}</p>
                        </div>
                        {product.storage && (
                          <div className="p-4 bg-white/50 rounded-2xl">
                            <h4 className="font-bold text-gray-900 mb-2">Opções de Armazenamento</h4>
                            <p className="text-gray-700">{product.storage.join(', ')}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/50 rounded-2xl">
                          <h4 className="font-bold text-gray-900 mb-2">Cores Disponíveis</h4>
                          <div className="flex space-x-2 mt-2">
                            {product.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 rounded-lg border-2 border-gray-300"
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-white/50 rounded-2xl">
                          <h4 className="font-bold text-gray-900 mb-2">Avaliação</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-700">{product.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h3>
                  <div className="flex items-center space-x-8 mb-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                      {product.rating}
                    </div>
                    <div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-gray-600 text-lg">
                        Baseado em {product.reviews.toLocaleString()} avaliações
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-12 bg-white/50 rounded-2xl">
                    <p className="text-gray-500 text-lg">Sistema de avaliações em desenvolvimento...</p>
                    <p className="text-gray-400 mt-2">Em breve você poderá ver e deixar avaliações detalhadas</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
