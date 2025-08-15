'use client'

import { Product } from '@/types'
import { useMemo } from 'react'

export interface ProductProps {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  category: string
  subcategory: string
  marca: string
  image: string
  images: string[]
  description: string
  shortDescription: string
  stock: number
  rating: number
  reviewsCount: number
  featured: boolean
  isNew: boolean
  bestSeller: boolean
  vipOnly: boolean
  specifications: Record<string, string>
  colors?: Array<{
    name: string
    hex: string
    image: string
  }>
  variants?: Array<{
    storage?: string
    memory?: string
    price: number
    discountPrice?: number
  }>
  tags: string[]
  benefits: string[]
  warranty: string
  deliveryTime: string
}

export function useProductProps(product: Product): ProductProps {
  return useMemo(() => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    discountPrice: product.discountPrice,
    category: product.category,
    subcategory: product.subcategory,
    marca: product.marca,
    image: product.image,
    images: product.images || [],
    description: product.description,
    shortDescription: product.shortDescription,
    stock: product.stock,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    featured: product.featured,
    isNew: product.isNew,
    bestSeller: product.bestSeller,
    vipOnly: product.vipOnly,
    specifications: product.specifications,
    colors: product.colors,
    variants: product.variants,
    tags: product.tags,
    benefits: product.benefits,
    warranty: product.warranty,
    deliveryTime: product.deliveryTime
  }), [product])
}

// Hook para cálculos de preço
export function useProductPricing(product: Product, selectedVariant?: any) {
  return useMemo(() => {
    const basePrice = selectedVariant?.price || product.price
    const baseDiscountPrice = selectedVariant?.discountPrice || product.discountPrice
    
    const hasDiscount = baseDiscountPrice && baseDiscountPrice < basePrice
    const discount = hasDiscount 
      ? Math.round(((basePrice - baseDiscountPrice!) / basePrice) * 100)
      : 0
    
    const savings = hasDiscount ? basePrice - baseDiscountPrice! : 0

    return {
      currentPrice: hasDiscount ? baseDiscountPrice! : basePrice,
      originalPrice: basePrice,
      hasDiscount,
      discount,
      savings,
      formattedCurrentPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(hasDiscount ? baseDiscountPrice! : basePrice),
      formattedOriginalPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(basePrice),
      formattedSavings: savings > 0 ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(savings) : null
    }
  }, [product, selectedVariant])
}

// Hook para informações de estoque
export function useProductStock(product: Product) {
  return useMemo(() => {
    const inStock = product.stock > 0
    const lowStock = product.stock <= 5 && product.stock > 0
    const outOfStock = product.stock === 0
    
    let stockStatus = 'Em estoque'
    let stockColor = 'text-green-600'
    
    if (outOfStock) {
      stockStatus = 'Fora de estoque'
      stockColor = 'text-red-600'
    } else if (lowStock) {
      stockStatus = `Apenas ${product.stock} restantes`
      stockColor = 'text-yellow-600'
    }

    return {
      inStock,
      lowStock,
      outOfStock,
      stockCount: product.stock,
      stockStatus,
      stockColor
    }
  }, [product.stock])
}

// Hook para badges do produto
export function useProductBadges(product: Product) {
  return useMemo(() => {
    const badges = []
    
    if (product.isNew) {
      badges.push({
        text: 'Novo',
        className: 'bg-blue-500 text-white'
      })
    }
    
    if (product.bestSeller) {
      badges.push({
        text: 'Mais Vendido',
        className: 'bg-orange-500 text-white'
      })
    }
    
    if (product.featured) {
      badges.push({
        text: 'Destaque',
        className: 'bg-purple-500 text-white'
      })
    }
    
    if (product.vipOnly) {
      badges.push({
        text: 'VIP',
        className: 'bg-gold-500 text-black'
      })
    }
    
    if (product.limitedEdition) {
      badges.push({
        text: 'Edição Limitada',
        className: 'bg-red-500 text-white'
      })
    }

    return badges
  }, [product])
}
