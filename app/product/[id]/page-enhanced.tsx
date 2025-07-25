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
  Pause
} from 'lucide-react'
import { useProductsDatabase } from '@/lib/use-products-database'
import { toast } from 'sonner'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const { getAllProducts, getProductById } = useProductsDatabase()
  
  // Format price function
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

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  // Encontrar produto usando o novo sistema de banco de dados
  const product = useMemo(() => {
    if (!id) return null
    const allProducts = getAllProducts()
    return allProducts.find(p => p.slug === id || p.id === id)
  }, [id, getAllProducts])

  // Imagens do produto baseadas na cor selecionada
  const currentImages = useMemo(() => {
    if (!product || !product.colors || !product.colors[selectedColorIndex]) {
      return product?.images ? [product.images.main, ...product.images.gallery] : []
    }
    
    const selectedColor = product.colors[selectedColorIndex]
    const images = [selectedColor.image, ...product.images.gallery]
    
    return images
  }, [product, selectedColorIndex])

  // Preço atual baseado no armazenamento selecionado
  const currentPrice = useMemo(() => {
    if (!product) return 0
    
    // Se há variações de armazenamento com preços diferentes
    if (product.storage && product.storage.length > 0) {
      // Para simplicidade, vamos usar um cálculo baseado no armazenamento
      const basePrice = product.price
      const storageMultiplier = selectedStorageIndex * 0.3 // 30% a mais por tier de armazenamento
      return basePrice + (basePrice * storageMultiplier)
    }
    
    return product.price
  }, [product, selectedStorageIndex])

  useEffect(() => {
    if (id && !product) {
      router.push('/products')
    }
  }, [product, router, id])

  // Loading state
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
          <Button onClick={() => router.push('/products')}>
            Voltar aos produtos
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const selectedColor = product.colors[selectedColorIndex]
    const selectedStorage = product.storage?.[selectedStorageIndex]
    
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: `Cor: ${selectedColor.name}${selectedStorage ? ` • ${selectedStorage}` : ''}`
    })
  }

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index)
    setSelectedImageIndex(0) // Reset para primeira imagem da nova cor
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Produtos
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão Voltar */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-8 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <motion.div 
              className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group"
              layoutId="product-image"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={currentImages[selectedImageIndex] || product.images.main}
                    alt={`${product.name} - ${product.colors[selectedColorIndex]?.name || 'Padrão'}`}
                    fill
                    className="object-contain p-8"
                    quality={100}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navegação de Imagens */}
              {currentImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleImageNavigation('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleImageNavigation('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Indicadores */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {currentImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === selectedImageIndex
                          ? 'bg-white shadow-lg scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    Novo
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive" className="bg-red-600 hover:bg-red-700">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {currentImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden relative ${
                      index === selectedImageIndex
                        ? 'ring-2 ring-blue-600 ring-offset-2'
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                    } transition-all duration-300`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      quality={90}
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Vídeo do Produto (se disponível) */}
            {product.videos && product.videos.length > 0 && (
              <motion.div 
                className="relative w-full h-64 bg-black rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <video
                  src={product.videos[0]}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={isVideoPlaying}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black"
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

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {product.description}
              </motion.p>

              {/* Rating */}
              <motion.div 
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} avaliações)
                </span>
              </motion.div>
            </div>

            {/* Preço */}
            <motion.div 
              className="border-t border-b border-gray-200 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    Economize {formatPrice(product.originalPrice! - currentPrice)}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Seleção de Cores */}
            {product.colors && product.colors.length > 0 && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Cor: <span className="font-normal">{product.colors[selectedColorIndex].name}</span>
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorChange(index)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          index === selectedColorIndex
                            ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Seleção de Armazenamento */}
            {product.storage && product.storage.length > 0 && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Armazenamento: <span className="font-normal">{product.storage[selectedStorageIndex]}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.storage.map((storage, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStorageIndex(index)}
                        className={`p-4 text-center border-2 rounded-lg transition-all duration-300 ${
                          index === selectedStorageIndex
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">{storage}</div>
                        <div className="text-sm text-gray-600">
                          {formatPrice(currentPrice + (currentPrice * index * 0.3))}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quantidade e Ações */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Quantidade */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantidade</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Total: <span className="font-semibold">{formatPrice(currentPrice * quantity)}</span>
                  </span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-6 ${isWishlisted ? 'text-red-600 border-red-600' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Informações de Entrega */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">Entrega grátis</div>
                    <div className="text-xs text-gray-600">Em pedidos acima de R$ 500</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm">Troca grátis</div>
                    <div className="text-xs text-gray-600">30 dias para trocas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-sm">Garantia estendida</div>
                    <div className="text-xs text-gray-600">1 ano de garantia Apple</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs com Informações Detalhadas */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Principais Características</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Categoria</h4>
                        <p className="text-gray-700">{product.category}</p>
                      </div>
                      {product.storage && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Opções de Armazenamento</h4>
                          <p className="text-gray-700">{product.storage.join(', ')}</p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cores Disponíveis</h4>
                        <p className="text-gray-700">{product.colors.map(c => c.name).join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Avaliações dos Clientes</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        Baseado em {product.reviews.toLocaleString()} avaliações
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <p>Sistema de avaliações em desenvolvimento...</p>
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
