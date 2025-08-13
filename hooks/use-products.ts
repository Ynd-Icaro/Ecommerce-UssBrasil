'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import dbData from '@/data/db.json'

export type Product = any

export interface UseProductsOptions {
  category?: string
  brand?: string
  featured?: boolean
  limit?: number
  sortBy?: 'name' | 'price' | 'rating' | 'newest'
  sortOrder?: 'asc' | 'desc'
  search?: string
  priceRange?: [number, number]
  inStock?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  
  // Merge options with URL search params
  const finalOptions = useMemo(() => {
    const urlCategory = searchParams.get('category')
    const urlBrand = searchParams.get('brand')
    const urlSearch = searchParams.get('search')
    
    return {
      ...options,
      category: urlCategory || options.category,
      brand: urlBrand || options.brand,
      search: urlSearch || options.search,
    }
  }, [options, searchParams])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100))
        
        let filteredProducts = [...dbData.products]
        
        // Apply filters
        if (finalOptions.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.category?.toLowerCase() === finalOptions.category!.toLowerCase()
          )
        }
        
        if (finalOptions.brand) {
          filteredProducts = filteredProducts.filter(product => 
            product.brand?.toLowerCase() === finalOptions.brand!.toLowerCase()
          )
        }
        
        if (finalOptions.featured) {
          filteredProducts = filteredProducts.filter(product => product.isFeatured)
        }
        
        if (finalOptions.search) {
          const searchTerm = finalOptions.search.toLowerCase()
          filteredProducts = filteredProducts.filter(product =>
            product.name?.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm) ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
          )
        }
        
        if (finalOptions.priceRange) {
          const [min, max] = finalOptions.priceRange
          filteredProducts = filteredProducts.filter(product =>
            product.price >= min && product.price <= max
          )
        }
        
        if (finalOptions.inStock !== undefined) {
          filteredProducts = filteredProducts.filter(product =>
            product.stock > 0 === finalOptions.inStock
          )
        }
        
        // Apply sorting
        if (finalOptions.sortBy) {
          filteredProducts.sort((a, b) => {
            let aValue: any, bValue: any
            
            switch (finalOptions.sortBy) {
              case 'name':
                aValue = a.name?.toLowerCase() || ''
                bValue = b.name?.toLowerCase() || ''
                break
              case 'price':
                aValue = a.price || 0
                bValue = b.price || 0
                break
              case 'rating':
                aValue = a.rating || 0
                bValue = b.rating || 0
                break
              case 'newest':
                aValue = new Date().getTime() // Usar data atual como fallback
                bValue = new Date().getTime()
                break
              default:
                return 0
            }
            
            if (finalOptions.sortOrder === 'desc') {
              return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
            } else {
              return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
            }
          })
        }
        
        // Apply limit
        if (finalOptions.limit) {
          filteredProducts = filteredProducts.slice(0, finalOptions.limit)
        }
        
        setProducts(filteredProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [finalOptions])

  const categories = useMemo(() => {
    return Array.from(new Set(dbData.products.map(p => p.category).filter(Boolean)))
  }, [])

  const brands = useMemo(() => {
    return Array.from(new Set(dbData.products.map(p => p.brand).filter(Boolean)))
  }, [])

  const featuredProducts = useMemo(() => {
    return dbData.products.filter(p => p.isFeatured).slice(0, 8)
  }, [])

  const newProducts = useMemo(() => {
    return dbData.products.filter(p => p.isNew).slice(0, 6)
  }, [])

  return {
    products,
    loading,
    error,
    categories,
    brands,
    featuredProducts,
    newProducts,
    totalProducts: products.length,
    hasProducts: products.length > 0
  }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const foundProduct = dbData.products.find(p => p.id === id)
        
        if (!foundProduct) {
          throw new Error('Product not found')
        }
        
        setProduct(foundProduct)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    
    loadProduct()
  }, [id])

  return { product, loading, error }
}

export function useProductsByBrand(brandName: string) {
  return useProducts({ brand: brandName, limit: 20 })
}

export function useProductsByCategory(categoryName: string) {
  return useProducts({ category: categoryName, limit: 20 })
}

export function useSearchProducts(query: string) {
  return useProducts({ search: query, limit: 50 })
}

// Utility functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return dbData.products.filter(p => p.price >= min && p.price <= max)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return dbData.products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, limit)
}
