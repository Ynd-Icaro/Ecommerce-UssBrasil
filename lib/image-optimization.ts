// utils/image-optimization.ts
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = [`w=${width}`]
  
  if (quality) {
    params.push(`q=${quality}`)
  }
  
  // If using a CDN, you can modify this to use your CDN's URL structure
  return `${src}?${params.join('&')}`
}

export const optimizedImageProps = (src: string, alt: string, priority = false) => ({
  src,
  alt,
  priority,
  quality: priority ? 95 : 85,
  placeholder: 'blur' as const,
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
})

export const categoryImageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
export const productImageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
export const heroImageSizes = '100vw'

// Lazy loading configuration
export const lazyLoadConfig = {
  threshold: 0.1,
  rootMargin: '50px 0px'
}

// WebP support detection
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false
  
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  return canvas.toDataURL('image/webp').startsWith('data:image/webp')
}

// Generate srcSet for responsive images
export const generateSrcSet = (baseSrc: string, sizes: number[]) => {
  return sizes
    .map(size => `${imageLoader({ src: baseSrc, width: size })} ${size}w`)
    .join(', ')
}
