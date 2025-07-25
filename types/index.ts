// ============================================================================
// SISTEMA DE TIPOS CENTRALIZADOS - ECOMMERCE USSBRASIL
// ============================================================================

// ========== TIPOS DE PRODUTOS ==========
export interface Product {
  id: string
  name: string
  slug: string
  classe: ProductClass // Tipo principal (ex: Smartphones, Smartwatchs)
  categoria: ProductCategory // Marca (ex: Apple, JBL)
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

// Sistema de Classificação de Produtos
export type ProductClass = 
  | 'Smartphones' 
  | 'Smartwatchs' 
  | 'Fones' 
  | 'Acessórios' 
  | 'Outros'

// Sistema de Categorias (Marcas)
export type ProductCategory = 
  | 'Apple' 
  | 'Geonav' 
  | 'JBL' 
  | 'AIWA' 
  | 'DJI' 
  | 'Playstation' 
  | 'Redmi'

export interface ProductImages {
  main: string
  gallery: string[]
  thumbnail?: string
}

export interface ProductColor {
  name: string
  code: string
  image: string
}

export interface ProductSpecifications {
  dimensions?: string
  weight?: string
  material?: string
  warranty?: string
  compatibility?: string[]
  [key: string]: string | string[] | undefined
}

export type ProductStatus = 'active' | 'inactive' | 'draft' | 'out_of_stock'

// ========== TIPOS DE CATEGORIAS ==========
export interface Category {
  id: string
  name: ProductCategory // Agora usa as marcas como categorias
  slug: string
  description: string
  image: string
  bannerImage?: string
  icon: string
  parentId?: string
  subcategories?: Category[]
  productCount: number
  isActive: boolean
  order: number
  seo: SEOMetadata
  customPageContent?: string
  createdAt: string
  updatedAt?: string
}

export interface CategoryStructure {
  smartphones: CategoryGroup
  smartwatchs: CategoryGroup
  fones: CategoryGroup
  acessorios: CategoryGroup
  outros: CategoryGroup
}

export interface CategoryGroup {
  title: string
  href: string
  items: CategoryItem[]
  featured?: Product[]
}

export interface CategoryItem {
  name: string
  href: string
  count: number
  icon?: string
}

// ========== TIPOS DE USUÁRIO ==========
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  preferences: UserPreferences
  addresses: Address[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type UserRole = 'customer' | 'admin' | 'moderator'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  currency: string
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// ========== TIPOS DE CARRINHO ==========
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedColor?: string
  selectedStorage?: string
  selectedSize?: string
  price: number
  total: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  couponCode?: string
}

// ========== TIPOS DE PEDIDOS ==========
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  shippingAddress: Address
  billingAddress?: Address
  subtotal: number
  shipping: number
  discount: number
  total: number
  trackingCode?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
  selectedVariants: ProductVariants
}

export interface ProductVariants {
  color?: string
  storage?: string
  size?: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'paypal'

// ========== TIPOS DE NAVEGAÇÃO ==========
export interface NavItem {
  name: string
  href: string
  icon?: string
  badge?: string | number
  external?: boolean
  children?: NavItem[]
}

export interface ComboboxOption {
  value: string
  label: string
  icon?: string
  category?: string
  count?: number
}

// ========== TIPOS DE BUSCA ==========
export interface SearchFilters {
  query?: string
  category?: string
  brand?: string
  priceRange?: [number, number]
  rating?: number
  isNew?: boolean
  inStock?: boolean
  sortBy?: SortOption
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popularity'

export interface SearchSuggestion {
  id: string
  type: 'product' | 'category' | 'brand'
  name: string
  category?: string
  image?: string
  href: string
}

// ========== TIPOS DE SEO ==========
export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  image?: string
  canonicalUrl?: string
}

// ========== TIPOS DE ADMIN ==========
export interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  recentOrders: Order[]
  topProducts: Product[]
  monthlyRevenue: number[]
  dailyOrders: number[]
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: AdminPermission[]
  lastLogin: string
  isActive: boolean
}

export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'viewer'
export type AdminPermission = 'manage_products' | 'manage_orders' | 'manage_users' | 'view_analytics' | 'manage_settings'

// ========== TIPOS DE CONFIGURAÇÕES ==========
export interface SiteSettings {
  general: GeneralSettings
  appearance: AppearanceSettings
  ecommerce: EcommerceSettings
  seo: SEOSettings
  integrations: IntegrationSettings
}

export interface GeneralSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  contactEmail: string
  supportEmail: string
  phone: string
  address: Address
  socialMedia: SocialMediaLinks
}

export interface SocialMediaLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  whatsapp?: string
}

export interface AppearanceSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  borderRadius: string
  defaultTheme: 'light' | 'dark'
}

export interface EcommerceSettings {
  currency: string
  taxRate: number
  shippingMethods: ShippingMethod[]
  paymentMethods: PaymentMethodConfig[]
  inventory: InventorySettings
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  isActive: boolean
}

export interface PaymentMethodConfig {
  id: string
  name: string
  description: string
  isActive: boolean
  fees: number
  config: Record<string, any>
}

export interface InventorySettings {
  lowStockThreshold: number
  trackInventory: boolean
  allowBackorders: boolean
  showStockCount: boolean
}

export interface SEOSettings {
  defaultTitle: string
  defaultDescription: string
  defaultKeywords: string[]
  googleAnalyticsId?: string
  googleTagManagerId?: string
  facebookPixelId?: string
}

export interface IntegrationSettings {
  email: EmailIntegration
  analytics: AnalyticsIntegration
  payment: PaymentIntegration
  shipping: ShippingIntegration
}

export interface EmailIntegration {
  provider: string
  apiKey: string
  fromEmail: string
  fromName: string
}

export interface AnalyticsIntegration {
  googleAnalytics?: string
  googleTagManager?: string
  facebookPixel?: string
  hotjar?: string
}

export interface PaymentIntegration {
  stripe?: StripeConfig
  paypal?: PayPalConfig
  mercadoPago?: MercadoPagoConfig
}

export interface StripeConfig {
  publicKey: string
  secretKey: string
  webhookSecret: string
}

export interface PayPalConfig {
  clientId: string
  clientSecret: string
  environment: 'sandbox' | 'live'
}

export interface MercadoPagoConfig {
  publicKey: string
  accessToken: string
  environment: 'sandbox' | 'live'
}

export interface ShippingIntegration {
  correios?: CorreiosConfig
  jadlog?: JadlogConfig
  customCarriers?: CustomCarrier[]
}

export interface CorreiosConfig {
  contractCode?: string
  password?: string
  services: string[]
}

export interface JadlogConfig {
  token: string
  contract: string
}

export interface CustomCarrier {
  id: string
  name: string
  apiUrl: string
  apiKey?: string
  methods: ShippingMethod[]
}

// ========== TIPOS DE API ==========
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: APIError[]
  pagination?: Pagination
}

export interface APIError {
  field?: string
  message: string
  code?: string
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface APIFilter {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith'
  value: any
}

// ========== TIPOS DE COMPONENTES ==========
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

export interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  help?: string
  value?: any
  onChange?: (value: any) => void
}

// ========== TIPOS DE EVENTOS ==========
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  properties?: Record<string, any>
}

export interface ProductEvent {
  type: 'view' | 'add_to_cart' | 'remove_from_cart' | 'purchase' | 'favorite'
  productId: string
  quantity?: number
  value?: number
  currency?: string
}

export interface UserEvent {
  type: 'login' | 'logout' | 'register' | 'profile_update' | 'password_change'
  userId: string
  metadata?: Record<string, any>
}

// ========== TIPOS DE HOOKS ==========
export interface UseProductPageState {
  selectedImage: number
  selectedColor: number
  selectedStorage: number
  quantity: number
  activeTab: string
  zoomedImage: boolean
  isFavorite: boolean
  isAddedToCart: boolean
  isShared: boolean
}

export interface UseCartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
}

export interface UseAuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// ========== TIPOS DE FORMULÁRIOS ==========
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterForm {
  email: string
  name?: string
  interests?: string[]
}

export interface ReviewForm {
  productId: string
  rating: number
  title: string
  comment: string
  pros?: string[]
  cons?: string[]
  recommend: boolean
}

// ========== CONFIGURAÇÕES DA EMPRESA USSBRASIL ==========
export interface CompanySettings {
  id: string
  name: string // "UssBrasil"
  email: string
  phone: string
  whatsapp: string
  cnpj: string
  address: CompanyAddress
  socialMedia: SocialMediaLinks
  businessHours: BusinessHours
  seo: CompanySEO
  branding: CompanyBranding
  policies: CompanyPolicies
  createdAt: string
  updatedAt: string
}

export interface CompanyAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface SocialMediaLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
  tiktok?: string
}

export interface BusinessHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

export interface CompanySEO {
  title: string
  description: string
  keywords: string[]
  favicon: string
  logo: string
  ogImage?: string
}

export interface CompanyBranding {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  logo: string
  logoAlt: string
  favicon: string
}

export interface CompanyPolicies {
  privacyPolicy: string
  termsOfService: string
  returnPolicy: string
  shippingPolicy: string
}

// ========== BUSCA E FILTROS ==========
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
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  pageSize: number
  filters: SearchFilters
}

// ========== EXPORTAÇÕES ==========
export type {
  // Re-export dos tipos mais utilizados para facilitar importação
  Product as IProduct,
  Category as ICategory,
  User as IUser,
  Order as IOrder,
  Cart as ICart,
  CartItem as ICartItem,
  CompanySettings as ICompanySettings
}
