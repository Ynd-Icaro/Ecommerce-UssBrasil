// ============================================================================
// CARD DE PRODUTO UNIVERSAL - VERSÃO PREMIUM PARA PRODUÇÃO
// ============================================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Eye, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { toast } from 'sonner'
import { Product } from '@/types'
import { FadeIn, HoverScale, ScaleIn } from '@/components/animated-components'

// ========== TIPOS ==========
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickView?: boolean
  className?: string
  viewMode?: 'grid' | 'list'
}

// ========== COMPONENTE PRINCIPAL ==========
export function ProductCard({ 
  product, 
  variant = 'default', 
  showQuickView = true,
  className = '',
  viewMode = 'grid'
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false)
  
  const { addToCart } = useCart()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  
  // Garantir que sempre seja string para compatibilidade
  const productId = String(product.id)
  const isFavorite = favorites.some(fav => fav.id === productId)
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // ========== HANDLERS ==========
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartProduct = {
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images.main
    }
    
    addToCart(cartProduct)
    
    toast.success('Produto adicionado ao carrinho!', {
      description: product.name,
      action: {
        label: 'Ver carrinho',
        onClick: () => window.location.href = '/cart'
      }
    })
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartProduct = {
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images.main
    }
    
    addToCart(cartProduct)
    window.location.href = '/cart'
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsFavoriteAnimating(true)
    
    if (isFavorite) {
      removeFromFavorites(productId)
      toast.success('Removido dos favoritos')
    } else {
      const favoriteProduct = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images.main
      }
      
      addToFavorites(favoriteProduct)
      toast.success('Adicionado aos favoritos!', {
        description: product.name
      })
    }
    
    setTimeout(() => setIsFavoriteAnimating(false), 300)
  }

  // ========== VARIANTES DE LAYOUT ==========
  const getCardSize = () => {
    switch (variant) {
      case 'compact':
        return 'w-full max-w-[280px]'
      case 'featured':
        return 'w-full max-w-[400px]'
      default:
        return 'w-full max-w-[320px]'
    }
  }

  const getImageSize = () => {
    switch (variant) {
      case 'compact':
        return 'h-48'
      case 'featured':
        return 'h-80'
      default:
        return 'h-64'
    }
  }

  // Layout para modo lista
  if (viewMode === 'list') {
    return (
      <FadeIn duration={0.5}>
        <HoverScale scale={1.02}>
          <div className={`w-full ${className} group`}>
            <div className="glass rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Imagem */}
                <Link href={`/product/${productId}`} className="md:w-48 flex-shrink-0">
                  <div className="relative h-48 md:h-full bg-gradient-to-br from-slate-50/80 to-slate-200/60 dark:from-zinc-900 dark:to-zinc-800">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      className={`object-contain p-4 group-hover:scale-105 transition-transform duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setIsImageLoaded(true)}
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                    )}
                  </div>
                </Link>
                
                {/* Conteúdo */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Link href={`/product/${productId}`}>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground capitalize mt-1">{product.categoria}</p>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`ml-4 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                        onClick={handleToggleFavorite}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    
                    {/* Rating */}
                    {product.rating && product.rating > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews || 0})
                        </span>
                      </div>
                    )}
                    
                    {/* Preços */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        R$ {product.price.toLocaleString('pt-BR')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          R$ {product.originalPrice.toLocaleString('pt-BR')}
                        </span>
                      )}
                      {discount > 0 && (
                        <Badge className="gradient-primary text-white">
                          -{discount}%
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')} sem juros
                    </p>
                  </div>
                  
                  {/* Ações */}
                  <div className="flex gap-3 mt-4">
                    <Button
                      onClick={handleAddToCart}
                      variant="outline"
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao carrinho
                    </Button>
                    
                    <Button
                      onClick={handleBuyNow}
                      className="flex-1 gradient-primary hover:scale-105 transition-transform"
                    >
                      Comprar agora
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HoverScale>
      </FadeIn>
    )
  }

  // Layout padrão (grid)
  return (
    <FadeIn duration={0.5}>
      <HoverScale scale={1.03}>
        <div className={`${getCardSize()} ${className} group`}> 
          <div className="glass rounded-3xl shadow-2xl hover:shadow-primary transition-all duration-500 overflow-hidden relative">
            {/* Imagem do Produto */}
            <Link href={`/product/${productId}`}> 
              <div className={`relative ${getImageSize()} bg-gradient-to-br from-slate-50/80 to-slate-200/60 dark:from-zinc-900 dark:to-zinc-800 overflow-hidden`}>
                <ScaleIn>
                  <Image
                    src={product.images.main}
                    alt={product.name}
                    fill
                    className={`object-contain p-4 group-hover:scale-110 transition-transform duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </ScaleIn>
                
                {/* Loading skeleton */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {product.isFeatured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg">
                      ⭐ Destaque
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg">
                      -{discount}%
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg">
                      🆕 Novo
                    </Badge>
                  )}
                  {product.stock && product.stock <= 5 && (
                    <Badge variant="destructive" className="shadow-lg font-semibold">
                      🔥 Últimas {product.stock}
                    </Badge>
                  )}
                </div>
                
                {/* Ação Favoritos */}
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border-0 ${isFavorite ? 'text-red-500' : 'text-gray-600'} ${isFavoriteAnimating ? 'scale-125' : ''} transition-all duration-200`}
                    onClick={handleToggleFavorite}
                  >
                    <ScaleIn>
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </ScaleIn>
                  </Button>
                </div>
                
                {/* Quick View */}
                {showQuickView && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                    <Link href={`/product/${productId}`}>
                      <Button
                        size="sm"
                        className="bg-white/95 text-black hover:bg-white shadow-xl border border-white/20 backdrop-blur-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Link>
            
            {/* Conteúdo do Card */}
            <div className="p-5 space-y-3">
              {/* Rating */}
              {product.rating && product.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {product.rating.toFixed(1)} ({product.reviews || 0})
                  </span>
                </div>
              )}
              
              {/* Nome do Produto */}
              <Link href={`/product/${productId}`}>
                <h3 className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2 text-lg leading-tight">
                  {product.name}
                </h3>
              </Link>
              
              {/* Categoria */}
              <p className="text-sm text-muted-foreground capitalize font-medium">{product.categoria}</p>
              
              {/* Preços */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {product.originalPrice.toLocaleString('pt-BR')}
                    </span>
                  )}
                </div>
                
                {/* Parcelamento */}
                <p className="text-sm text-muted-foreground">
                  ou 12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>
              
              {/* Ações */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-md"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrinho
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  size="sm"
                  className="flex-1 gradient-primary hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Comprar
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            {/* Glassmorphism highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 shadow-primary" />
          </div>
        </div>
      </HoverScale>
    </FadeIn>
  )
}
