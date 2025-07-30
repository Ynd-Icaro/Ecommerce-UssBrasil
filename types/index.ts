// ... (código anterior)

import { ProductStatus } from "@prisma/client";

// Definição do tipo ProductColor
export type ProductColor = 'Preto' | 'Branco' | 'Azul' | 'Vermelho' | 'Verde' | 'Amarelo' | 'Rosa' | 'Cinza' | 'Prata' | 'Dourado';

// Especificações do produto
export interface ProductSpecifications {
  [key: string]: string | number | boolean;
}

// Classe do produto (exemplo de definição)
export type ProductClass = 'Smartphone' | 'Tablet' | 'Notebook' | 'Acessorio';

// Sistema de Categorias (Marcas)
export type ProductCategory = 
  | 'Apple' 
  | 'Geonav' 
  | 'JBL' 
  | 'AIWA' 
  | 'DJI' 
  | 'Playstation' 
  | 'Redmi'
  | 'Samsung'
  | 'Motorola'

// Produto pode ter múltiplas categorias/marcas
export interface Product {
  id: string
  name: string
  slug: string
  classe: ProductClass
  categoria: ProductCategory | ProductCategory[]
  price: number
  originalPrice?: number
  discountPrice?: number
  rating: number
  reviews: number
  totalReviews: number
  isNew: boolean
  isFeatured: boolean
  isOnSale?: boolean
  discount: number
  description: string
  features: string[]
  images: ProductImages
  videos?: string[]
  colors: ProductColor[]
  storage?: string[]
  sizes?: string[]
  specifications: ProductSpecifications
  stock: number
  status: ProductStatus
  tags: string[]
  sku?: string
  barcode?: string
  paymentOptions?: number
  createdAt: string
  updatedAt: string
}

export interface ProductImages {
  main: string
  gallery?: string[]
  thumbnail?: string
}

// ... (demais tipos)

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedColor?: ProductColor
  selectedStorage?: string
  selectedSize?: string
  price: number
  total: number
}

// ... (demais tipos)

// Definição do tipo ProductVariants
export interface ProductVariants {
  color?: ProductColor
  storage?: string
  size?: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
  selectedVariants?: ProductVariants
}

// ... (demais tipos)

// ========== BUSCA E FILTROS ==========

// Opções de ordenação para busca de produtos
export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'featured';

// Remover duplicidade e unificar SearchFilters
export interface SearchFilters {
  query?: string
  classe?: ProductClass[]
  categoria?: ProductCategory[]
  minPrice?: number
  maxPrice?: number
  rating?: number
  isNew?: boolean
  isOnSale?: boolean
  inStock?: boolean
  sortBy?: SortOption
}

// ========== OUTROS TIPOS ==========

// Definição de tipos adicionais para o sistema
export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: ProductStatus
  createdAt: string
  updatedAt: string
}
export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  addedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  createdAt: string
  updatedAt: string
}
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}
export interface Notification {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: string
}
export interface PaymentMethod {
  id: string
  userId: string
  type: 'credit-card' | 'paypal' | 'bank-transfer'
  details: string
  createdAt: string
  updatedAt: string
}

// ... (demais tipos)
