'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  images?: string[] | string
  image?: string
  mainImage?: string
  categoryId?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  brand?: string
  stock: number
  featured?: boolean
  specifications?: string
  createdAt?: string
  updatedAt?: string
  originalPrice?: number
  rating?: number
  reviews?: number
  isNew?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
  inStock?: boolean
  features?: string[]
  slug?: string
  subcategory?: string
  discountPercentage?: number
  shortDescription?: string
  tags?: string[]
  colors?: any[]
}

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
        
        // Build API URL with query params
        const searchParams = new URLSearchParams()
        
        if (finalOptions.featured) {
          searchParams.append('featured', 'true')
        }
        
        if (finalOptions.limit) {
          searchParams.append('limit', finalOptions.limit.toString())
        }
        
        const apiUrl = `/api/products?${searchParams.toString()}`
        console.log('Fetching products from:', apiUrl)
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const fetchedProducts: Product[] = await response.json()
        console.log('Fetched products:', fetchedProducts)
        
        let filteredProducts = [...fetchedProducts]
        
        // Apply client-side filters that aren't handled by the API
        if (finalOptions.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.category?.slug?.toLowerCase() === finalOptions.category!.toLowerCase() ||
            product.category?.name?.toLowerCase() === finalOptions.category!.toLowerCase()
          )
        }
        
        if (finalOptions.search) {
          const searchTerm = finalOptions.search.toLowerCase()
          filteredProducts = filteredProducts.filter(product =>
            product.name?.toLowerCase().includes(searchTerm) ||
            product.description?.toLowerCase().includes(searchTerm)
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
            (product.stock > 0) === finalOptions.inStock
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
                // Rating would need to be added to the Product model
                aValue = 0
                bValue = 0
                break
              case 'newest':
                aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0
                bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0
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
        
        console.log('Products data:', filteredProducts)
        setProducts(filteredProducts)
      } catch (err) {
        console.error('Error loading products:', err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [finalOptions.featured, finalOptions.limit, finalOptions.category, finalOptions.search, finalOptions.priceRange, finalOptions.inStock, finalOptions.sortBy, finalOptions.sortOrder])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category?.name).filter(Boolean)))
  }, [products])

  const brands = useMemo(() => {
    // Brand is not in our Product model yet, return empty array
    return []
  }, [])

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured).slice(0, 8)
  }, [products])

  const newProducts = useMemo(() => {
    // Sort by creation date and take the newest 6
    return products
      .filter(p => p.createdAt) // Only include products with createdAt
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return bTime - aTime
      })
      .slice(0, 6)
  }, [products])

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
        
        const response = await fetch(`/api/products/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const productData = await response.json()
        setProduct(productData)
      } catch (err) {
        console.error('Error loading product:', err)
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      loadProduct()
    }
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
  // This would need to be implemented with proper API calls
  return []
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // This would need to be implemented with proper API calls
  return []
}
