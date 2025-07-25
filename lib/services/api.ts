// ============================================================================
// SERVIÇOS DE API - INTEGRAÇÃO COM JSON SERVER
// ============================================================================

import { 
  Product, 
  Category, 
  Order, 
  User, 
  CompanySettings,
  APIResponse,
  SearchFilters,
  SearchResult,
  ProductClass,
  ProductCategory
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  typeof window !== 'undefined' 
    ? `${window.location.origin}/api`
    : 'http://localhost:3000/api'
)

// ========== CONFIGURAÇÕES BASE ==========
const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Helper para requisições
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...apiConfig,
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('API Request Error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    }
  }
}

// ========== SERVIÇOS DE PRODUTOS ==========
export const productService = {
  // Buscar todos os produtos
  async getAll(filters?: SearchFilters): Promise<APIResponse<Product[]>> {
    let endpoint = '/products'
    const params = new URLSearchParams()

    if (filters) {
      if (filters.query) {
        params.append('q', filters.query)
      }
      if (filters.classe && filters.classe.length > 0) {
        filters.classe.forEach(c => params.append('classe', c))
      }
      if (filters.categoria && filters.categoria.length > 0) {
        filters.categoria.forEach(c => params.append('categoria', c))
      }
      if (filters.minPrice) {
        params.append('price_gte', filters.minPrice.toString())
      }
      if (filters.maxPrice) {
        params.append('price_lte', filters.maxPrice.toString())
      }
      if (filters.isNew !== undefined) {
        params.append('isNew', filters.isNew.toString())
      }
      if (filters.isOnSale !== undefined) {
        params.append('isOnSale', filters.isOnSale.toString())
      }
      if (filters.inStock !== undefined) {
        params.append('stock_gt', '0')
      }
    }

    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }

    return apiRequest<Product[]>(endpoint)
  },

  // Buscar produto por ID
  async getById(id: string): Promise<APIResponse<Product>> {
    return apiRequest<Product>(`/products/${id}`)
  },

  // Buscar produtos por categoria
  async getByCategory(categoria: ProductCategory): Promise<APIResponse<Product[]>> {
    return apiRequest<Product[]>(`/products?categoria=${categoria}`)
  },

  // Buscar produtos por classe
  async getByClass(classe: ProductClass): Promise<APIResponse<Product[]>> {
    return apiRequest<Product[]>(`/products?classe=${classe}`)
  },

  // Buscar produtos em destaque
  async getFeatured(): Promise<APIResponse<Product[]>> {
    return apiRequest<Product[]>('/products?isFeatured=true')
  },

  // Buscar produtos novos
  async getNew(): Promise<APIResponse<Product[]>> {
    return apiRequest<Product[]>('/products?isNew=true')
  },

  // Buscar produtos em promoção
  async getOnSale(): Promise<APIResponse<Product[]>> {
    return apiRequest<Product[]>('/products?isOnSale=true')
  },

  // Buscar produtos relacionados
  async getRelated(productId: string, limit: number = 4): Promise<APIResponse<Product[]>> {
    const productResponse = await this.getById(productId)
    if (!productResponse.success || !productResponse.data) {
      return { success: false, message: 'Produto não encontrado' }
    }

    const product = productResponse.data
    return apiRequest<Product[]>(
      `/products?categoria=${product.categoria}&id_ne=${productId}&_limit=${limit}`
    )
  },

  // Criar produto
  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<Product>> {
    const now = new Date().toISOString()
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    return apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })
  },

  // Atualizar produto
  async update(id: string, product: Partial<Product>): Promise<APIResponse<Product>> {
    const updatedProduct = {
      ...product,
      updatedAt: new Date().toISOString(),
    }

    return apiRequest<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedProduct),
    })
  },

  // Deletar produto
  async delete(id: string): Promise<APIResponse<void>> {
    return apiRequest<void>(`/products/${id}`, {
      method: 'DELETE',
    })
  },

  // Busca avançada
  async search(query: string, filters?: SearchFilters): Promise<APIResponse<SearchResult>> {
    const searchFilters = { ...filters, query }
    const response = await this.getAll(searchFilters)
    
    if (!response.success) {
      return {
        success: false,
        message: response.message,
      }
    }

    const products = response.data || []
    
    return {
      success: true,
      data: {
        products,
        total: products.length,
        page: 1,
        pageSize: products.length,
        filters: searchFilters,
      },
    }
  },
}

// ========== SERVIÇOS DE CATEGORIAS ==========
export const categoryService = {
  // Buscar todas as categorias
  async getAll(): Promise<APIResponse<Category[]>> {
    return apiRequest<Category[]>('/categories')
  },

  // Buscar categoria por ID
  async getById(id: string): Promise<APIResponse<Category>> {
    return apiRequest<Category>(`/categories/${id}`)
  },

  // Buscar categoria por slug
  async getBySlug(slug: string): Promise<APIResponse<Category>> {
    return apiRequest<Category>(`/categories?slug=${slug}`)
  },

  // Criar categoria
  async create(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<Category>> {
    const now = new Date().toISOString()
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    return apiRequest<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(newCategory),
    })
  },

  // Atualizar categoria
  async update(id: string, category: Partial<Category>): Promise<APIResponse<Category>> {
    const updatedCategory = {
      ...category,
      updatedAt: new Date().toISOString(),
    }

    return apiRequest<Category>(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedCategory),
    })
  },

  // Deletar categoria
  async delete(id: string): Promise<APIResponse<void>> {
    return apiRequest<void>(`/categories/${id}`, {
      method: 'DELETE',
    })
  },
}

// ========== SERVIÇOS DE CONFIGURAÇÕES ==========
export const settingsService = {
  // Buscar configurações da empresa
  async getCompanySettings(): Promise<APIResponse<CompanySettings>> {
    return apiRequest<CompanySettings>('/companySettings')
  },

  // Atualizar configurações da empresa
  async updateCompanySettings(settings: Partial<CompanySettings>): Promise<APIResponse<CompanySettings>> {
    const updatedSettings = {
      ...settings,
      updatedAt: new Date().toISOString(),
    }

    return apiRequest<CompanySettings>('/companySettings', {
      method: 'PATCH',
      body: JSON.stringify(updatedSettings),
    })
  },
}

// ========== SERVIÇOS DE USUÁRIOS ==========
export const userService = {
  // Buscar todos os usuários
  async getAll(): Promise<APIResponse<User[]>> {
    return apiRequest<User[]>('/users')
  },

  // Buscar usuário por ID
  async getById(id: string): Promise<APIResponse<User>> {
    return apiRequest<User>(`/users/${id}`)
  },

  // Criar usuário
  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<User>> {
    const now = new Date().toISOString()
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    return apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })
  },

  // Atualizar usuário
  async update(id: string, user: Partial<User>): Promise<APIResponse<User>> {
    const updatedUser = {
      ...user,
      updatedAt: new Date().toISOString(),
    }

    return apiRequest<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
    })
  },

  // Deletar usuário
  async delete(id: string): Promise<APIResponse<void>> {
    return apiRequest<void>(`/users/${id}`, {
      method: 'DELETE',
    })
  },
}

// ========== SERVIÇOS DE PEDIDOS ==========
export const orderService = {
  // Buscar todos os pedidos
  async getAll(): Promise<APIResponse<Order[]>> {
    return apiRequest<Order[]>('/orders')
  },

  // Buscar pedido por ID
  async getById(id: string): Promise<APIResponse<Order>> {
    return apiRequest<Order>(`/orders/${id}`)
  },

  // Criar pedido
  async create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<Order>> {
    const now = new Date().toISOString()
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    }

    return apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
    })
  },

  // Atualizar pedido
  async update(id: string, order: Partial<Order>): Promise<APIResponse<Order>> {
    const updatedOrder = {
      ...order,
      updatedAt: new Date().toISOString(),
    }

    return apiRequest<Order>(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedOrder),
    })
  },

  // Deletar pedido
  async delete(id: string): Promise<APIResponse<void>> {
    return apiRequest<void>(`/orders/${id}`, {
      method: 'DELETE',
    })
  },
}

// ========== UTILITÁRIOS ==========
export const apiUtils = {
  // Verificar se a API está funcionando
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/products?_limit=1`)
      return response.ok
    } catch {
      return false
    }
  },

  // Obter estatísticas do dashboard
  async getDashboardStats(): Promise<APIResponse<any>> {
    return apiRequest<any>('/dashboard')
  },
}

// Exportação padrão com todos os serviços
export default {
  products: productService,
  categories: categoryService,
  settings: settingsService,
  users: userService,
  orders: orderService,
  utils: apiUtils,
}
