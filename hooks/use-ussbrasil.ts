// ============================================================================
// HOOKS PERSONALIZADOS - INTEGRAÇÃO COM API USSBRASIL
// ============================================================================

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
import { 
  productService, 
  categoryService, 
  settingsService 
} from '@/lib/services/api'

// ========== HOOK PARA PRODUTOS ==========
export function useProducts(filters?: SearchFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.getAll(filters)
      
      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        setError(response.message || 'Erro ao carregar produtos')
      }
    } catch (err) {
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }, [filters])

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

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getFeatured()
        
        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setError(response.message || 'Erro ao carregar produtos em destaque')
        }
      } catch (err) {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productService.getByCategory(categoria)
        
        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setError(response.message || 'Erro ao carregar produtos')
        }
      } catch (err) {
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoria])

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

  const search = useCallback(async (query: string, filters?: SearchFilters) => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await productService.search(query, filters)
      
      if (response.success && response.data) {
        setResults(response.data)
      } else {
        setError(response.message || 'Erro na busca')
      }
    } catch (err) {
      setError('Erro na busca')
    } finally {
      setLoading(false)
    }
  }, [])

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await categoryService.getAll()
        
        if (response.success && response.data) {
          setCategories(response.data)
        } else {
          setError(response.message || 'Erro ao carregar categorias')
        }
      } catch (err) {
        setError('Erro ao carregar categorias')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

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
      const response = await settingsService.getCompanySettings()
      
      if (response.success && response.data) {
        setSettings(response.data)
      } else {
        setError(response.message || 'Erro ao carregar configurações')
      }
    } catch (err) {
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
