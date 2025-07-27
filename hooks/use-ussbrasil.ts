
'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Product, 
  Category, 
  CompanySettings,
  SearchFilters,
  SearchResult,
  ProductClass,
  ProductCategory
} from '@/types'
import { useProductsDatabase } from '@/lib/use-products-database'

// ========== HOOK PARA PRODUTOS ==========
export function useProducts(filters?: SearchFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const database = useProductsDatabase()

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simular delay de rede para UX
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (filters) {
        const results = database.searchProducts(filters.query || '', filters)
        setProducts(results)
      } else {
        const allProducts = database.getAllProducts()
        setProducts(allProducts)
      }
    } catch (err) {
      console.error('Erro ao carregar produtos:', err)
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }, [filters, database])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  }
}

// ========== HOOK PARA PRODUTO INDIVIDUAL ==========
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getById(id)
        
        if (response.success && response.data) {
          setProduct(response.data)
        } else {
          setError(response.message || 'Produto não encontrado')
        }
      } catch (err) {
        setError('Erro ao carregar produto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return {
    product,
    loading,
    error,
  }
}

// ========== HOOK PARA PRODUTOS EM DESTAQUE ==========
export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const database = useProductsDatabase()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simular delay de rede para UX
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Usar database local em vez de API
        const featuredProducts = database.getFeaturedProducts(8)
        setProducts(featuredProducts)
      } catch (err) {
        console.error('Erro ao carregar produtos em destaque:', err)
        setError('Erro ao carregar produtos em destaque')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return {
    products,
    loading,
    error,
  }
}

// ========== HOOK PARA PRODUTOS POR CATEGORIA ==========
export function useProductsByCategory(categoria: ProductCategory) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const database = useProductsDatabase()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simular delay de rede para UX
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const categoryProducts = database.getProductsByCategory(categoria.toLowerCase())
        setProducts(categoryProducts)
      } catch (err) {
        console.error('Erro ao carregar produtos por categoria:', err)
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoria, database])

  return {
    products,
    loading,
    error,
  }
}

// ========== HOOK PARA BUSCA DE PRODUTOS ==========
export function useProductSearch() {
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const database = useProductsDatabase()

  const search = useCallback(async (query: string, filters?: SearchFilters) => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Simular delay de rede para UX
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const searchResults = database.searchProducts(query, filters)
      
      setResults({
        query,
        products: searchResults,
        total: searchResults.length,
        page: 1,
        totalPages: Math.ceil(searchResults.length / 20)
      })
    } catch (err) {
      console.error('Erro na busca:', err)
      setError('Erro ao buscar produtos')
    } finally {
      setLoading(false)
    }
  }, [database])

  const clearSearch = useCallback(() => {
    setResults(null)
    setError(null)
  }, [])

  return {
    results,
    loading,
    error,
    search,
    clearSearch,
  }
}

// ========== HOOK PARA CATEGORIAS ==========
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const database = useProductsDatabase()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simular delay de rede para UX
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const allCategories = database.getAllCategories()
        setCategories(allCategories)
      } catch (err) {
        console.error('Erro ao carregar categorias:', err)
        setError('Erro ao carregar categorias')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [database])

  return {
    categories,
    loading,
    error,
  }
}

// ========== HOOK PARA CONFIGURAÇÕES DA EMPRESA ==========
export function useCompanySettings() {
  const [settings, setSettings] = useState<CompanySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simular delay de rede para UX
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Configurações padrão da empresa
      const defaultSettings: CompanySettings = {
        id: '1',
        name: 'Uss Brasil',
        email: 'contato@ussbrasil.com.br',
        phone: '(11) 99999-9999',
        whatsapp: '(11) 99999-9999',
        cnpj: '00.000.000/0001-00',
        address: {
          street: 'Rua das Empresas',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000-000',
          country: 'Brasil'
        },
        socialMedia: {
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: '',
          tiktok: ''
        },
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '09:00', close: '17:00', closed: false },
          sunday: { open: '09:00', close: '17:00', closed: true }
        },
        seo: {
          title: 'Uss Brasil - Produtos Apple Premium',
          description: 'Loja oficial de produtos Apple no Brasil',
          keywords: ['Apple', 'iPhone', 'iPad', 'Mac'],
          ogImage: '/og-image.jpg'
        },
        branding: {
          logo: '/logo.png',
          favicon: '/favicon.ico',
          primaryColor: '#20b2aa',
          secondaryColor: '#111111',
          accentColor: '#48d1cc'
        },
        policies: {
          privacy: '/politica-privacidade',
          terms: '/termos-uso',
          returns: '/trocas-devolucoes',
          shipping: '/politica-entrega'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setSettings(defaultSettings)
    } catch (err) {
      console.error('Erro ao carregar configurações:', err)
      setError('Erro ao carregar configurações')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
  }
}
