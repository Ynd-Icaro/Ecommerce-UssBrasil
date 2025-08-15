'use client'

import React from 'react'
import { Product } from '@/types'

interface ProductImageProps {
  product: Product
  imageIndex?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  priority?: boolean
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  product, 
  imageIndex = 0, 
  size = 'md',
  className = '',
  priority = false
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  }

  const imageUrl = product.images?.[imageIndex] || product.image
  
  if (!imageUrl) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-200 rounded-lg flex items-center justify-center`}>
        <span className="text-gray-400 text-xs">Sem imagem</span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={`${product.name} - Imagem ${imageIndex + 1}`}
      className={`${sizeClasses[size]} ${className} object-cover rounded-lg`}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}

export default ProductImage
