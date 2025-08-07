'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

export default function ProductImage({ 
  src, 
  alt, 
  className = '', 
  fill,
  width,
  height,
  sizes,
  priority = false
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // Lista de imagens de placeholder baseadas no nome do produto
  const getPlaceholderImage = (productName: string) => {
    const name = productName.toLowerCase()
    
    if (name.includes('iphone')) {
      return '/images/products/iphone-placeholder.svg'
    } else if (name.includes('macbook') || name.includes('mac')) {
      return '/images/products/macbook-placeholder.svg'
    } else if (name.includes('airpods')) {
      return '/images/products/airpods-placeholder.svg'
    } else if (name.includes('watch')) {
      return '/images/products/watch-placeholder.svg'
    } else if (name.includes('ipad')) {
      return '/images/products/ipad-placeholder.svg'
    } else if (name.includes('homepod')) {
      return '/images/products/homepod-placeholder.svg'
    } else if (name.includes('imac')) {
      return '/images/products/macbook-placeholder.svg'
    }
    
    return '/images/products/accessory-placeholder.svg'
  }

  // Determinar a source final
  let finalSrc = src
  
  // Se houve erro ou não tem src, usar placeholder
  if (imageError || !src) {
    finalSrc = getPlaceholderImage(alt)
  }

  // Codificar URL para lidar com espaços e caracteres especiais
  const encodedSrc = finalSrc ? encodeURI(finalSrc) : finalSrc

  if (!encodedSrc) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <Package className="w-8 h-8 text-gray-400" />
      </div>
    )
  }

  const imageProps = {
    src: encodedSrc,
    alt,
    className: `${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onLoad: () => setImageLoading(false),
    onError: () => {
      if (!imageError) {
        setImageError(true)
        setImageLoading(false)
      }
    },
    priority,
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes })
  }

  return (
    <div className="relative w-full h-full">
      {imageLoading && !imageError && (
        <div className={`absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center ${className}`}>
          <Package className="w-8 h-8 text-gray-300" />
        </div>
      )}
      <Image {...imageProps} />
    </div>
  )
}
