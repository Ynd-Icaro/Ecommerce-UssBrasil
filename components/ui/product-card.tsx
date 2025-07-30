// ============================================================================
// CARD DE PRODUTO UNIVERSAL - VERSÃO PREMIUM PARA PRODUÇÃO
// ============================================================================

'use client'

import { useState, useMemo, useCallback } from 'react'
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
  imagePriority?: boolean
  fallbackImage?: string
}

// ========== COMPONENTE PRINCIPAL ==========
export function ProductCard({ 
  product,
  variant = 'default',
  showQuickView = true,
  className = '',
  viewMode = 'grid',
  imagePriority = false,
  fallbackImage = '/products/fallback-product.png'
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const { addToCart } = useCart()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

  // Garantir que sempre seja string para compatibilidade
  const productId = String(product.id)
  const isFavorite = useMemo(() => favorites.some(fav => String(fav.id) === productId), [favorites, productId])
  const discount = useMemo(() => (
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  ), [product.originalPrice, product.price])

  // ========== HANDLERS ==========
  const handleAddToCart = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Map Product to CartProduct
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.main || '/products/fallback-product.png',
    };
    addToCart(cartProduct);
    toast.success('Produto adicionado ao carrinho!', { description: product.name })
  }, [addToCart, product])

  const handleBuyNow = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    window.location.href = `/checkout?product=${productId}`
  }, [productId])

  const handleNavigate = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    window.location.href = `/product/${productId}`
  }, [productId])

  // Função para normalizar o caminho da imagem (usada em ambos modos)
  const getImageSrc = useCallback(() => {
    if (imageError || !product.images?.main) return fallbackImage;
    let src = product.images.main;
    src = src.replace(/^https?:\/\/[^/]+\//, '').replace(/^\/+/, '');
    if (!src.startsWith('products/')) src = 'products/' + src;
    src = src
      .split('/')
      .map(part => part
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      )
      .join('/');
    return '/' + src;
  }, [product.images?.main, imageError, fallbackImage]);
  // ...existing code...
  // ========== VARIANTES DE LAYOUT ==========
  // Standardized card and image size
  // Allow content to flow freely, set min size and padding
  // Responsive card size
  const getCardSize = () => 'w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] p-6 rounded-2xl';
  const getImageSize = () => 'w-full h-auto aspect-[4/5]';

  // Layout para modo lista
  // ...existing code...

  // Layout para modo grid (default)
  if (viewMode === 'list') {
    // ...existing code for list layout (already above)...
    // (You may want to further clean up the list layout as needed)
  }
  // Default grid layout
  return (
    <FadeIn duration={0.5}>
      <HoverScale scale={1.02}>
        <div className={`block w-full ${className} group cursor-pointer`} onClick={handleNavigate} tabIndex={0} aria-label={`Ver detalhes de ${product.name}`}>
          <div className="glass rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="relative w-full h-auto aspect-[4/5] bg-gradient-to-br from-slate-50/80 to-slate-200/60 dark:from-zinc-900 dark:to-zinc-800 overflow-hidden">
              <ScaleIn>
                <Image
                  src={getImageSrc()}
                  alt={product.name}
                  fill
                  className={`object-contain p-4 group-hover:scale-110 transition-transform duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} bg-transparent`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={imagePriority}
                />
              </ScaleIn>
              {/* Loading skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                  <span className="text-xs text-gray-400">Carregando imagem...</span>
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {product.isFeatured && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">Destaque</Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-blue-600 text-white shadow-lg">Novo</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive" className="shadow-lg">Oferta</Badge>
                )}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="absolute bottom-3 right-3 flex gap-2 z-10">
              <Button size="sm" className="bg-white/95 text-black hover:bg-white shadow-xl border border-white/20 backdrop-blur-sm" onClick={e => { e.stopPropagation(); handleNavigate(e); }}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg" onClick={e => { e.stopPropagation(); handleAddToCart(e); }}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </HoverScale>
    </FadeIn>
  );
}
