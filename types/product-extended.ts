// Tipo estendido para produtos com propriedades adicionais
export interface ExtendedProduct {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  brand?: string
  description?: string
  rating?: number
  reviews?: number
  totalReviews?: number
  originalPrice?: number
  discountPrice?: number
  featured?: boolean
  category?: string
  stock?: number
}

// Função para converter Product para ExtendedProduct
export function extendProduct(product: any): ExtendedProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    images: product.images,
    brand: product.brand || 'USS Brasil',
    description: product.description,
    rating: product.rating || 4.5,
    reviews: product.totalReviews || product.reviews || 50,
    totalReviews: product.totalReviews || product.reviews || 50,
    originalPrice: product.originalPrice,
    discountPrice: product.discountPrice,
    featured: product.featured,
    category: product.category,
    stock: product.stock
  }
}
