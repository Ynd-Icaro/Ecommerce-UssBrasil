"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useModal } from '@/contexts/ModalContext'
import { getAllProducts, type Product } from '@/lib/products-manager'
import { ExtendedProduct, extendProduct } from '@/types/product-extended'

interface ReviewEntry { id: string; user: string; rating: number; text: string; createdAt: string }

const formatPrice = (price: number) => `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { favorites, toggleFavorite, user } = useAuth()
  const { openAuthModal } = useModal()
  
  const [product, setProduct] = useState<ExtendedProduct | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<ExtendedProduct[]>([])
  const [reviews, setReviews] = useState<ReviewEntry[]>([])
  const [newReview, setNewReview] = useState({ rating: 5, text: '' })
  const [submitting, setSubmitting] = useState(false)

  const productId = params.id as string

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const allProducts = await getAllProducts()
        const foundProduct = allProducts.find(p => p.id === productId)
        
        if (foundProduct) {
          // Convert to ExtendedProduct
          const extendedProduct = extendProduct({
            ...foundProduct,
            image: fixPath(foundProduct.image),
            images: foundProduct.images?.map(fixPath) || [fixPath(foundProduct.image)],
          })
          
          setProduct(extendedProduct)
          
          // Load related products from same brand
          const related = allProducts
            .filter(p => extendProduct(p).brand === extendedProduct.brand && p.id !== productId)
            .slice(0, 4)
            .map(p => extendProduct({
              ...p,
              image: fixPath(p.image),
            }))
          
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  useEffect(()=>{
    // Load reviews from API
    const load = async () => {
      try {
        if(!productId) return
        const res = await fetch(`/api/reviews?productId=${productId}`)
        if(res.ok){
          const data = await res.json()
          setReviews(data.map((d:any)=>({ id:d.id, user:d.author || d.user || 'Cliente', rating:d.rating, text:d.text, createdAt:d.createdAt })))
        }
      } catch(e){
        console.warn('reviews load fail', e)
      }
    }
    load()
  },[productId])

  const submitReview = async () => {
    if (!user || !product || !newReview.text.trim() || submitting) return
    setSubmitting(true)
    try {
      const payload = { productId: product.id, author: user.name, rating: newReview.rating, text: newReview.text.trim() }
      const res = await fetch('/api/reviews', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      if(res.ok){
        const saved = await res.json()
        setReviews(prev => [ { id:saved.id, user:saved.author, rating:saved.rating, text:saved.text, createdAt:saved.createdAt }, ...prev ])
        setNewReview({ rating:5, text:'' })
      }
    } catch(e){
      console.error('submit review', e)
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand || 'USS Brasil'
      })
    }
  }

  const handleToggleFavorite = () => {
    if (!user) {
      openAuthModal()
      return
    }
    if (product) {
      toggleFavorite(product.id)
    }
  }

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images!.length)
    }
  }

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images!.length) % product.images!.length)
    }
  }

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Link href="/produtos" className="text-uss-primary hover:underline">
            Voltar para produtos
          </Link>
        </div>
      </div>
    )
  }

  const currentImages = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-uss-primary">Home</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-uss-primary">Produtos</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link 
          href="/produtos" 
          className="inline-flex items-center gap-2 text-uss-primary hover:text-uss-secondary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para produtos
        </Link>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    DESTAQUE
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'border-uss-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-2 bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="text-uss-primary font-semibold text-lg">{product.brand}</div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} avaliações)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-sm text-gray-600">ou 12x de {formatPrice(product.price / 12)} sem juros</p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || `${product.name} da marca ${product.brand}. Produto de alta qualidade com excelente custo-benefício. Garantia de satisfação e entrega rápida em todo o Brasil.`}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Quantidade</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-uss-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-uss-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  favorites.includes(product.id)
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
              </button>

              <button className="p-4 border-2 border-gray-300 text-gray-600 rounded-xl hover:border-uss-primary hover:text-uss-primary transition-all duration-300">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-4 p-6 bg-white rounded-xl border">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-uss-primary" />
                <span className="text-gray-700">Frete grátis para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-uss-primary" />
                <span className="text-gray-700">Garantia de 12 meses</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-uss-primary" />
                <span className="text-gray-700">Troca grátis em 30 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/produtos/${relatedProduct.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${relatedProduct.id}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative aspect-square bg-gray-50 p-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-uss-primary font-medium mb-1">{relatedProduct.brand}</div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-uss-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(relatedProduct.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">({relatedProduct.reviews})</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{formatPrice(relatedProduct.price)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações de Clientes</h2>
          {user ? (
            <div className="mb-10 bg-white rounded-xl border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sua Nota:</span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setNewReview(n => ({ ...n, rating: r }))} className={`p-1 rounded ${newReview.rating >= r ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition`}> 
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Compartilhe sua experiência com este produto"
                value={newReview.text}
                onChange={e => setNewReview(n => ({ ...n, text: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 focus:border-uss-primary focus:ring-uss-primary text-sm min-h-[120px] p-3"
              />
              <button disabled={submitting || !newReview.text.trim()} onClick={submitReview} className="px-5 py-3 rounded-lg bg-uss-primary text-white text-sm font-medium disabled:opacity-50 hover:bg-uss-secondary transition">
                {submitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </div>
          ) : (
            <div className="mb-10 bg-white rounded-xl border p-6 text-sm text-gray-600">
              Faça login para escrever uma avaliação.
            </div>
          )}
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-600">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
            )}
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded-xl border p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">{r.user}</span>
                  <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_,i)=>(<Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
