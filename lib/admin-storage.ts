// Local Storage Manager for Admin Panel
// This provides temporary storage for admin operations

export interface AdminProduct {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  category: string
  brand: string
  stock: number
  images: string[]
  featured: boolean
  status: 'active' | 'inactive' | 'draft'
  sku: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  specifications?: Record<string, string>
  seoTitle?: string
  seoDescription?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface AdminCategory {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
  status: 'active' | 'inactive'
  productCount: number
  seoTitle?: string
  seoDescription?: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface AdminOrder {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  trackingCode?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AdminCustomer {
  id: string
  name: string
  email: string
  phone?: string
  cpf?: string
  birthDate?: string
  gender?: string
  status: 'active' | 'inactive' | 'blocked'
  vipStatus: boolean
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
  addresses: Array<{
    id: string
    type: 'home' | 'work' | 'other'
    street: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
  }>
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    emailNotifications: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface AdminPromotion {
  id: string
  name: string
  description: string
  type: 'percentage' | 'fixed' | 'freeShipping'
  value: number
  code?: string
  minOrderValue?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  startDate: string
  endDate: string
  status: 'active' | 'inactive' | 'expired'
  applicableProducts?: string[]
  applicableCategories?: string[]
  createdAt: string
  updatedAt: string
}

export interface AdminReview {
  id: string
  productId: string
  productName: string
  customerId: string
  customerName: string
  rating: number
  title: string
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  helpful: number
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  pendingOrders: number
  lowStockProducts: number
  pendingReviews: number
  activePromotions: number
  conversionRate: number
  averageOrderValue: number
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  recentOrders: AdminOrder[]
  salesByDay: Array<{
    date: string
    sales: number
    revenue: number
  }>
}

class AdminStorageManager {
  private storageKey = 'uss-brasil-admin'

  // Generic storage methods
  public getStorageData(): Record<string, any> {
    if (typeof window === 'undefined') return {}
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return {}
    }
  }

  public setStorageData(data: Record<string, any>): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  // Products Management
  getProducts(): AdminProduct[] {
    const data = this.getStorageData()
    return data.products || []
  }

  saveProduct(product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): AdminProduct {
    const data = this.getStorageData()
    const products = data.products || []
    
    const newProduct: AdminProduct = {
      ...product,
      id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    this.setStorageData({ ...data, products })
    return newProduct
  }

  updateProduct(id: string, updates: Partial<AdminProduct>): AdminProduct | null {
    const data = this.getStorageData()
    const products = data.products || []
    const index = products.findIndex((p: AdminProduct) => p.id === id)
    
    if (index === -1) return null
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, products })
    return products[index]
  }

  deleteProduct(id: string): boolean {
    const data = this.getStorageData()
    const products = data.products || []
    const filteredProducts = products.filter((p: AdminProduct) => p.id !== id)
    
    if (filteredProducts.length === products.length) return false
    
    this.setStorageData({ ...data, products: filteredProducts })
    return true
  }

  // Categories Management
  getCategories(): AdminCategory[] {
    const data = this.getStorageData()
    return data.categories || []
  }

  saveCategory(category: Omit<AdminCategory, 'id' | 'createdAt' | 'updatedAt'>): AdminCategory {
    const data = this.getStorageData()
    const categories = data.categories || []
    
    const newCategory: AdminCategory = {
      ...category,
      id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    categories.push(newCategory)
    this.setStorageData({ ...data, categories })
    return newCategory
  }

  updateCategory(id: string, updates: Partial<AdminCategory>): AdminCategory | null {
    const data = this.getStorageData()
    const categories = data.categories || []
    const index = categories.findIndex((c: AdminCategory) => c.id === id)
    
    if (index === -1) return null
    
    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, categories })
    return categories[index]
  }

  deleteCategory(id: string): boolean {
    const data = this.getStorageData()
    const categories = data.categories || []
    const filteredCategories = categories.filter((c: AdminCategory) => c.id !== id)
    
    if (filteredCategories.length === categories.length) return false
    
    this.setStorageData({ ...data, categories: filteredCategories })
    return true
  }

  // Orders Management
  getOrders(): AdminOrder[] {
    const data = this.getStorageData()
    return data.orders || []
  }

  saveOrder(order: Omit<AdminOrder, 'id' | 'createdAt' | 'updatedAt'>): AdminOrder {
    const data = this.getStorageData()
    const orders = data.orders || []
    
    const newOrder: AdminOrder = {
      ...order,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    orders.push(newOrder)
    this.setStorageData({ ...data, orders })
    return newOrder
  }

  updateOrder(id: string, updates: Partial<AdminOrder>): AdminOrder | null {
    const data = this.getStorageData()
    const orders = data.orders || []
    const index = orders.findIndex((o: AdminOrder) => o.id === id)
    
    if (index === -1) return null
    
    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, orders })
    return orders[index]
  }

  // Customers Management
  getCustomers(): AdminCustomer[] {
    const data = this.getStorageData()
    return data.customers || []
  }

  saveCustomer(customer: Omit<AdminCustomer, 'id' | 'createdAt' | 'updatedAt'>): AdminCustomer {
    const data = this.getStorageData()
    const customers = data.customers || []
    
    const newCustomer: AdminCustomer = {
      ...customer,
      id: `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    customers.push(newCustomer)
    this.setStorageData({ ...data, customers })
    return newCustomer
  }

  updateCustomer(id: string, updates: Partial<AdminCustomer>): AdminCustomer | null {
    const data = this.getStorageData()
    const customers = data.customers || []
    const index = customers.findIndex((c: AdminCustomer) => c.id === id)
    
    if (index === -1) return null
    
    customers[index] = {
      ...customers[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, customers })
    return customers[index]
  }

  // Promotions Management
  getPromotions(): AdminPromotion[] {
    const data = this.getStorageData()
    return data.promotions || []
  }

  savePromotion(promotion: Omit<AdminPromotion, 'id' | 'createdAt' | 'updatedAt'>): AdminPromotion {
    const data = this.getStorageData()
    const promotions = data.promotions || []
    
    const newPromotion: AdminPromotion = {
      ...promotion,
      id: `promotion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    promotions.push(newPromotion)
    this.setStorageData({ ...data, promotions })
    return newPromotion
  }

  updatePromotion(id: string, updates: Partial<AdminPromotion>): AdminPromotion | null {
    const data = this.getStorageData()
    const promotions = data.promotions || []
    const index = promotions.findIndex((p: AdminPromotion) => p.id === id)
    
    if (index === -1) return null
    
    promotions[index] = {
      ...promotions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, promotions })
    return promotions[index]
  }

  // Reviews Management
  getReviews(): AdminReview[] {
    const data = this.getStorageData()
    return data.reviews || []
  }

  saveReview(review: Omit<AdminReview, 'id' | 'createdAt' | 'updatedAt'>): AdminReview {
    const data = this.getStorageData()
    const reviews = data.reviews || []
    
    const newReview: AdminReview = {
      ...review,
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    reviews.push(newReview)
    this.setStorageData({ ...data, reviews })
    return newReview
  }

  updateReview(id: string, updates: Partial<AdminReview>): AdminReview | null {
    const data = this.getStorageData()
    const reviews = data.reviews || []
    const index = reviews.findIndex((r: AdminReview) => r.id === id)
    
    if (index === -1) return null
    
    reviews[index] = {
      ...reviews[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.setStorageData({ ...data, reviews })
    return reviews[index]
  }

  // Statistics and Analytics
  getStats(): AdminStats {
    const products = this.getProducts()
    const orders = this.getOrders()
    const customers = this.getCustomers()
    const reviews = this.getReviews()
    const promotions = this.getPromotions()

    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0)

    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const lowStockProducts = products.filter(p => p.stock < 10).length
    const pendingReviews = reviews.filter(r => r.status === 'pending').length
    const activePromotions = promotions.filter(p => 
      p.status === 'active' && 
      new Date(p.endDate) > new Date()
    ).length

    // Calculate sales by day for the last 7 days
    const salesByDay = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayOrders = orders.filter(o => 
        o.createdAt.startsWith(dateStr) && o.status !== 'cancelled'
      )
      
      return {
        date: dateStr,
        sales: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + order.total, 0)
      }
    }).reverse()

    // Top products by sales
    const productSales = products.map(product => {
      const sales = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((count, order) => {
          const item = order.items.find(i => i.productId === product.id)
          return count + (item ? item.quantity : 0)
        }, 0)
      
      const revenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, order) => {
          const item = order.items.find(i => i.productId === product.id)
          return sum + (item ? item.total : 0)
        }, 0)

      return {
        id: product.id,
        name: product.name,
        sales,
        revenue
      }
    }).sort((a, b) => b.sales - a.sales).slice(0, 5)

    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      pendingReviews,
      activePromotions,
      conversionRate: customers.length > 0 ? (orders.length / customers.length) * 100 : 0,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      topProducts: productSales,
      recentOrders,
      salesByDay
    }
  }

  // Initialize with sample data
  initializeSampleData(): void {
    const data = this.getStorageData()
    
    if (!data.initialized) {
      // Add sample products
      const sampleProducts: AdminProduct[] = [
        {
          id: 'product_1',
          name: 'iPhone 15 Pro Max',
          description: 'O mais avançado iPhone com chip A17 Pro e câmera de 48MP',
          price: 8999,
          discountPrice: 8499,
          category: 'Smartphones',
          brand: 'Apple',
          stock: 25,
          images: ['/Produtos/Apple/Iphone-16-Pro.png'],
          featured: true,
          status: 'active',
          sku: 'APL-IP15PM-256',
          specifications: {
            'Tela': '6.7" Super Retina XDR',
            'Processador': 'A17 Pro',
            'Memória': '256GB',
            'Câmera': '48MP Principal'
          },
          tags: ['iPhone', 'Apple', 'Premium'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      // Add sample categories
      const sampleCategories: AdminCategory[] = [
        {
          id: 'category_1',
          name: 'Smartphones',
          slug: 'smartphones',
          description: 'Os melhores smartphones do mercado',
          image: '/categories/smartphones.jpg',
          status: 'active',
          productCount: 15,
          sortOrder: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'category_2',
          name: 'Notebooks',
          slug: 'notebooks',
          description: 'Notebooks para trabalho e jogos',
          image: '/categories/notebooks.jpg',
          status: 'active',
          productCount: 8,
          sortOrder: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'category_3',
          name: 'Áudio',
          slug: 'audio',
          description: 'Fones de ouvido e equipamentos de áudio',
          image: '/categories/audio.jpg',
          status: 'active',
          productCount: 12,
          sortOrder: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      this.setStorageData({
        ...data,
        products: sampleProducts,
        categories: sampleCategories,
        orders: [],
        customers: [],
        promotions: [],
        reviews: [],
        initialized: true
      })
    }
  }

  // Clear all data
  clearAllData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
    }
  }

  // Export data
  exportData(): string {
    return JSON.stringify(this.getStorageData(), null, 2)
  }

  // Import data
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      this.setStorageData(data)
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }
}

export const adminStorage = new AdminStorageManager()

// Specific storage managers for each data type
export const productStorage = {
  getAll: () => adminStorage.getProducts(),
  getById: (id: string) => adminStorage.getProducts().find(p => p.id === id),
  create: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: AdminProduct = {
      ...product,
      id: `product_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const products = adminStorage.getProducts()
    products.push(newProduct)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, products })
    return newProduct
  },
  update: (id: string, updates: Partial<AdminProduct>) => {
    const products = adminStorage.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() }
      const data = adminStorage.getStorageData()
      adminStorage.setStorageData({ ...data, products })
      return products[index]
    }
    return null
  },
  delete: (id: string) => {
    const products = adminStorage.getProducts()
    const filtered = products.filter(p => p.id !== id)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, products: filtered })
    return true
  }
}

export const categoryStorage = {
  getAll: () => adminStorage.getCategories(),
  getById: (id: string) => adminStorage.getCategories().find(c => c.id === id),
  create: (category: Omit<AdminCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: AdminCategory = {
      ...category,
      id: `category_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const categories = adminStorage.getCategories()
    categories.push(newCategory)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, categories })
    return newCategory
  },
  update: (id: string, updates: Partial<AdminCategory>) => {
    const categories = adminStorage.getCategories()
    const index = categories.findIndex(c => c.id === id)
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates, updatedAt: new Date().toISOString() }
      const data = adminStorage.getStorageData()
      adminStorage.setStorageData({ ...data, categories })
      return categories[index]
    }
    return null
  },
  delete: (id: string) => {
    const categories = adminStorage.getCategories()
    const filtered = categories.filter(c => c.id !== id)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, categories: filtered })
    return true
  }
}

export const orderStorage = {
  getAll: () => adminStorage.getOrders(),
  getById: (id: string) => adminStorage.getOrders().find(o => o.id === id),
  create: (order: Omit<AdminOrder, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: AdminOrder = {
      ...order,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const orders = adminStorage.getOrders()
    orders.push(newOrder)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, orders })
    return newOrder
  },
  update: (id: string, updates: Partial<AdminOrder>) => {
    const orders = adminStorage.getOrders()
    const index = orders.findIndex(o => o.id === id)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() }
      const data = adminStorage.getStorageData()
      adminStorage.setStorageData({ ...data, orders })
      return orders[index]
    }
    return null
  },
  delete: (id: string) => {
    const orders = adminStorage.getOrders()
    const filtered = orders.filter(o => o.id !== id)
    const data = adminStorage.getStorageData()
    adminStorage.setStorageData({ ...data, orders: filtered })
    return true
  }
}
