// Tipos base do sistema USS Brasil
export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  subcategory?: string
  description?: string
  specifications?: Record<string, string>
  colors?: string[]
  storage?: string[]
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
  warranty?: string
  slug?: string
  tags?: string[]
  status?: 'active' | 'inactive' | 'out-of-stock'
  createdAt?: string
  updatedAt?: string
}

export interface CartItem extends Pick<Product, 'id' | 'name' | 'brand' | 'price' | 'image'> {
  quantity: number
  selectedColor?: string
  selectedStorage?: string
  originalPrice?: number
  warranty: string
  inStock: boolean
}

export interface FavoriteItem extends Pick<Product, 'id' | 'name' | 'brand' | 'price' | 'image' | 'rating' | 'reviews' | 'inStock' | 'category'> {
  originalPrice?: number
  addedAt: string
}

export interface VideoCategory {
  id: string
  name: string
  description?: string
  videoPath: string
  thumbnail?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  description?: string
  featured?: boolean
  productsCount?: number
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  slug: string
  parent?: string
  featured?: boolean
  productsCount?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isVip?: boolean
  joinedAt?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
  shipping: {
    address: string
    method: string
    cost: number
  }
  payment: {
    method: string
    status: 'pending' | 'paid' | 'failed'
  }
}

// Tipos para componentes específicos
export interface EnhancedProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToFavorites?: (product: Product) => void
  className?: string
}

export interface SearchFilters {
  query: string
  category: string
  brand: string
  priceRange: [number, number]
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  inStock: boolean
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
}

// Tipos de eventos
export interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'CLEAR_CART'
  payload?: any
}

export interface FavoritesAction {
  type: 'ADD_FAVORITE' | 'REMOVE_FAVORITE' | 'CLEAR_FAVORITES'
  payload?: any
}

// Tipos de API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface ProductsResponse extends ApiResponse<Product[]> {
  pagination?: PaginationInfo
}

// Tipos de configuração
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    instagram: string
    facebook: string
  }
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system'
  enableSystemTheme: boolean
}

// Tipos para analytics
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
}

export interface ConversionEvent extends AnalyticsEvent {
  event: 'purchase' | 'add_to_cart' | 'view_product' | 'signup'
  value?: number
  currency?: string
}
