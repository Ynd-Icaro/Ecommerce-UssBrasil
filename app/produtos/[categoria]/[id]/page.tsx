'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { 
  getProductById, 
  getFeaturedProducts,
  getAllBrands,
  type Product, 
  type Brand,
  type Category
} from '@/lib/products-manager'
import ProductImage from '@/components/ProductImage'

// Componente de Galeria de Imagens/Vídeos
function ProductGallery({ product }: { product: Product }) {
  const [currentMedia, setCurrentMedia] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)

  const mediaItems = [
    { type: 'image', src: product.image, alt: product.name },
    ...(product.images || []).map((img: string, index: number) => ({
      type: 'image' as const,
      src: img,
      alt: `${product.name} - Imagem ${index + 2}`
    })),
    ...(product.video ? [{
      type: 'video' as const,
      src: product.video,
      alt: `${product.name} - Vídeo`
    }] : [])
  ]

  return (
    <div className="space-y-4">
      {/* Imagem/Vídeo principal */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        {mediaItems[currentMedia]?.type === 'image' ? (
          <ProductImage
            src={mediaItems[currentMedia].src}
            alt={mediaItems[currentMedia].alt}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              src={mediaItems[currentMedia]?.src}
              loop
              muted={isVideoMuted}
              autoPlay={isVideoPlaying}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isVideoPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </button>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isVideoMuted ? (
                  <VolumeX className="h-5 w-5 text-white" />
                ) : (
                  <Volume2 className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Navegação */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={() => setCurrentMedia(prev => prev === 0 ? mediaItems.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={() => setCurrentMedia(prev => prev === mediaItems.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Indicadores */}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMedia(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentMedia ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {mediaItems.slice(0, 4).map((media, index) => (
            <button
              key={index}
              onClick={() => setCurrentMedia(index)}
              className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                index === currentMedia ? 'ring-2 ring-[#20b2aa]' : ''
              }`}
            >
              {media.type === 'image' ? (
                <ProductImage
                  src={media.src}
                  alt={media.alt}
                  fill
                  className="object-cover w-full h-full"
                  sizes="150px"
                />
              ) : (
                <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                  <Play className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Componente de Especificações
function ProductSpecs({ product }: { product: Product }) {
  const specs = product.specifications || {}
  
  if (Object.keys(specs).length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Especificações Técnicas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
            <span className="text-sm text-gray-900 font-medium">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente de Produtos Relacionados
function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Buscar produtos em destaque da mesma marca como produtos relacionados
    const featured = getFeaturedProducts()
    const related = featured
      .filter(p => p.marca === currentProduct.marca && p.id !== currentProduct.id)
      .slice(0, 4)
    setRelatedProducts(related)
  }, [currentProduct])

  if (relatedProducts.length === 0) return null

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Produtos Relacionados
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.category}/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="200px"
              />
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h4>
            <p className="text-sm font-semibold text-[#20b2aa]">
              {formatPrice(product.discountPrice || product.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar produto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const productData = getProductById(productId)
        
        if (!productData) {
          setError('Produto não encontrado')
          return
        }

        setProduct(productData)

        // Encontrar categoria e marca
        const brands = getAllBrands()
        for (const brandData of brands) {
          const categoryData = brandData.categories.find(cat => cat.slug === productData.category)
          if (categoryData) {
            setCategory(categoryData)
            setBrand(brandData)
            break
          }
        }

      } catch (err) {
        console.error('Erro ao carregar produto:', err)
        setError('Erro ao carregar produto')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  const handleAddToCart = () => {
    // TODO: Implementar lógica do carrinho
    console.log('Adicionar ao carrinho:', { product, quantity })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20b2aa] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-4xl">😞</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/produtos')}
            className="px-6 py-3 bg-[#20b2aa] text-white rounded-xl font-semibold hover:bg-[#1a9999] transition-colors"
          >
            Ver todos os produtos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#20b2aa] transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#20b2aa] transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-[#20b2aa] transition-colors">
            Produtos
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link 
                href={`/produtos/${category.slug}`} 
                className="hover:text-[#20b2aa] transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Galeria */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-[#20b2aa]/10 text-[#20b2aa] text-sm font-medium px-3 py-1 rounded-full">
                  {brand?.name}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.rating}) avaliações
                  </span>
                </div>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-end space-x-4 mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-bold text-[#20b2aa]">
                      {formatPrice(product.discountPrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-[#20b2aa]">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                ou 10x de {formatPrice((product.discountPrice || product.price) / 10)} sem juros
              </p>
            </div>

            {/* Quantidade e ações */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-500">
                    ({product.stock} disponíveis)
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-[#20b2aa] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#1a9999] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {product.stock === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
                </span>
              </button>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Frete Grátis</p>
                  <p className="text-xs text-green-600">Acima de R$ 199</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Garantia</p>
                  <p className="text-xs text-blue-600">12 meses</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900">Troca Fácil</p>
                  <p className="text-xs text-purple-600">30 dias</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-900">Qualidade</p>
                  <p className="text-xs text-yellow-600">Produto original</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Descrição do Produto
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Especificações */}
        <div className="mb-8">
          <ProductSpecs product={product} />
        </div>

        {/* Produtos relacionados - TODO: Implementar componente */}
        {/* <RelatedProducts currentProduct={product} /> */}
      </div>
    </div>
  )
}
