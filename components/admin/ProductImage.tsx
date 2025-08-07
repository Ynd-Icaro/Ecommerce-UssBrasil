'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  fallbackIcon?: React.ReactNode
}

export default function ProductImage({ 
  src, 
  alt, 
  className = '', 
  size = 'md',
  fallbackIcon 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  // Lista de imagens de placeholder baseadas no nome do produto
  const getPlaceholderImage = (productName: string) => {
    const name = productName.toLowerCase()
    
    if (name.includes('iphone')) {
      return '/images/products/iphone-placeholder.svg'
    } else if (name.includes('macbook')) {
      return '/images/products/macbook-placeholder.svg'
    } else if (name.includes('airpods')) {
      return '/images/products/airpods-placeholder.svg'
    } else if (name.includes('watch')) {
      return '/images/products/watch-placeholder.svg'
    } else if (name.includes('ipad')) {
      return '/images/products/ipad-placeholder.svg'
    } else if (name.includes('homepod')) {
      return '/images/products/homepod-placeholder.svg'
    }
    
    return '/images/products/accessory-placeholder.svg'
  }

  const placeholderSrc = src || getPlaceholderImage(alt)

  if (!placeholderSrc || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-white/10 border border-white/20 
                      rounded-lg flex items-center justify-center`}>
        {fallbackIcon || <Package className={`${iconSizes[size]} text-gray-400`} />}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg 
                    bg-white/10 border border-white/20`}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#0E7466] 
                        border-t-transparent"></div>
        </div>
      )}
      
      <Image
        src={placeholderSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true)
          setImageLoading(false)
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
