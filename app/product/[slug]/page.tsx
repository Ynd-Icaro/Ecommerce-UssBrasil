'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Truck,
  Shield,
  Award,
  ArrowLeft,
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react'

// Import dos dados
import data from '@/db.json'
import EnhancedProductCard from '@/components/product/enhanced-product-card'

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
  if (!path) return ''
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

const products = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)]
}))

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const productId = resolvedParams.slug

  const [product, setProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)

  // Buscar produto
  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0])
      }
    }
  }, [productId])

  if (!product) {
    return (
      <div className="min-h-screen bg-uss-off-white dark:bg-uss-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary mx-auto mb-4"></div>
          <p className="text-uss-gray-600 dark:text-uss-gray-400">Carregando produto...</p>
        </div>
      </div>
    )
  }

  // Produtos relacionados
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4)

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  const finalPrice = product.discountPrice || product.price
  const installmentPrice = finalPrice / 12

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    // Lógica para adicionar ao carrinho
    console.log('Adicionado ao carrinho:', {
      product: product.id,
      quantity,
      color: selectedColor
    })
  }

  const benefits = [
    { icon: <Truck className="h-5 w-5" />, text: 'Frete grátis para todo o Brasil' },
    { icon: <Shield className="h-5 w-5" />, text: 'Garantia oficial de fábrica' },
    { icon: <Award className="h-5 w-5" />, text: 'Produto 100% original' },
  ]

  return (
    <div className="min-h-screen bg-uss-off-white dark:bg-uss-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-uss-gray-800 border-b border-uss-gray-300 dark:border-uss-gray-600">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-uss-gray-500 hover:text-uss-primary dark:hover:text-uss-secondary">
              Início
            </Link>
            <span className="text-uss-gray-400">/</span>
            <Link href="/products" className="text-uss-gray-500 hover:text-uss-primary dark:hover:text-uss-secondary">
              Produtos
            </Link>
            <span className="text-uss-gray-400">/</span>
            <Link href={`/products?brand=${product.brand.toLowerCase()}`} className="text-uss-gray-500 hover:text-uss-primary dark:hover:text-uss-secondary">
              {product.brand}
            </Link>
            <span className="text-uss-gray-400">/</span>
            <span className="text-uss-gray-900 dark:text-white font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-uss-gray-600 dark:text-uss-gray-400 hover:text-uss-primary dark:hover:text-uss-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar aos produtos</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="relative aspect-square bg-white dark:bg-uss-gray-800 rounded-xl overflow-hidden border border-uss-gray-300 dark:border-uss-gray-600">
              {/* Badge de Desconto */}
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10 bg-uss-error text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  -{discountPercentage}% OFF
                </div>
              )}

              {/* Botões de Navegação */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-uss-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-uss-gray-700" />
                  </button>
                </>
              )}

              {/* Botão de Zoom */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <ZoomIn className="h-5 w-5 text-uss-gray-700" />
              </button>

              {/* Imagem */}
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain p-8 transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-uss-primary dark:border-uss-secondary'
                        : 'border-uss-gray-300 dark:border-uss-gray-600'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain bg-white p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Cabeçalho */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-uss-primary dark:text-uss-secondary uppercase tracking-wide">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite 
                        ? 'bg-uss-error text-white' 
                        : 'bg-uss-gray-200 dark:bg-uss-gray-700 text-uss-gray-600 dark:text-uss-gray-400 hover:bg-uss-error hover:text-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-uss-gray-200 dark:bg-uss-gray-700 text-uss-gray-600 dark:text-uss-gray-400 rounded-full hover:bg-uss-primary hover:text-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-uss-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Avaliação */}
              {product.rating > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-uss-warning text-uss-warning'
                            : 'text-uss-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-uss-gray-600 dark:text-uss-gray-400">
                    {product.rating} ({product.totalReviews} avaliações)
                  </span>
                </div>
              )}
            </div>

            {/* Preços */}
            <div className="space-y-2">
              {hasDiscount ? (
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-uss-primary dark:text-uss-secondary">
                      {formatPrice(product.discountPrice)}
                    </span>
                    <span className="text-xl text-uss-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-uss-success font-medium">
                    Você economiza {formatPrice(product.price - product.discountPrice)}
                  </p>
                </div>
              ) : (
                <span className="text-3xl font-bold text-uss-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
              
              <p className="text-sm text-uss-gray-600 dark:text-uss-gray-400">
                ou 12x de {formatPrice(installmentPrice)} sem juros
              </p>
            </div>

            {/* Cores (se disponível) */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-uss-gray-900 dark:text-white mb-3">
                  Cor: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                        selectedColor === color
                          ? 'border-uss-primary bg-uss-primary text-white'
                          : 'border-uss-gray-300 dark:border-uss-gray-600 text-uss-gray-700 dark:text-uss-gray-300 hover:border-uss-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantidade */}
            <div>
              <h3 className="text-sm font-medium text-uss-gray-900 dark:text-white mb-3">
                Quantidade
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-uss-gray-300 dark:border-uss-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-uss-gray-100 dark:hover:bg-uss-gray-700 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-uss-gray-100 dark:hover:bg-uss-gray-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-sm text-uss-gray-600 dark:text-uss-gray-400">
                  {product.stock > 0 ? (
                    <span className="flex items-center space-x-1 text-uss-success">
                      <Check className="h-4 w-4" />
                      <span>{product.stock} em estoque</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-uss-error">
                      <X className="h-4 w-4" />
                      <span>Fora de estoque</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-uss-gray-600 dark:text-uss-gray-400">
                  <div className="text-uss-success">
                    {benefit.icon}
                  </div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-uss-primary hover:bg-gradient-uss-secondary disabled:bg-uss-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
                </span>
              </motion.button>
              
              <button className="w-full border-2 border-uss-primary dark:border-uss-secondary text-uss-primary dark:text-uss-secondary font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-uss-primary dark:hover:bg-uss-secondary hover:text-white">
                Comprar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de Informações */}
        <div className="mt-16">
          <div className="border-b border-uss-gray-300 dark:border-uss-gray-600">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Descrição' },
                { id: 'specifications', label: 'Especificações' },
                { id: 'reviews', label: 'Avaliações' },
                { id: 'shipping', label: 'Entrega' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-uss-primary dark:border-uss-secondary text-uss-primary dark:text-uss-secondary'
                      : 'border-transparent text-uss-gray-500 hover:text-uss-gray-700 dark:hover:text-uss-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-uss-gray-700 dark:text-uss-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-uss-gray-200 dark:border-uss-gray-700">
                    <span className="font-medium text-uss-gray-900 dark:text-white">{key}</span>
                    <span className="text-uss-gray-600 dark:text-uss-gray-400">{value as string}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-uss-gray-500 dark:text-uss-gray-400">
                  Seja o primeiro a avaliar este produto
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="bg-uss-off-white dark:bg-uss-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold text-uss-gray-900 dark:text-white mb-4">
                    Informações de Entrega
                  </h3>
                  <ul className="space-y-2 text-uss-gray-600 dark:text-uss-gray-400">
                    <li>• Frete grátis para todo o Brasil</li>
                    <li>• Entrega expressa em 2-5 dias úteis</li>
                    <li>• Rastreamento em tempo real</li>
                    <li>• Embalagem premium e segura</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-uss-gray-900 dark:text-white mb-8">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EnhancedProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal de Zoom da Imagem */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
