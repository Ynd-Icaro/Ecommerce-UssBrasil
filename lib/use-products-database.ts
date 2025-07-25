import { useState, useEffect } from 'react'
import productsData from './products-database.json'

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  isNew: boolean
  discount: number
  description: string
  features: string[]
  images: {
    main: string
    gallery: string[]
  }
  videos: string[]
  colors: Array<{
    name: string
    code: string
    image: string
  }>
  storage?: string[]
  sizes?: string[]
}

export interface Category {
  name: string
  slug: string
  description: string
  image: string
  video: string
  bannerGradient: string
  icon: string
}

export interface ProductsDatabase {
  products: {
    [key: string]: Product[]
  }
  categories: {
    [key: string]: Category
  }
}

export const useProductsDatabase = () => {
  const [database] = useState<ProductsDatabase>(productsData as ProductsDatabase)

  const getAllProducts = (): Product[] => {
    return Object.values(database.products).flat()
  }

  const getProductsByCategory = (categorySlug: string): Product[] => {
    return database.products[categorySlug] || []
  }

  const getProductById = (id: string): Product | undefined => {
    const allProducts = getAllProducts()
    return allProducts.find(product => product.id === id)
  }

  const getProductBySlug = (slug: string): Product | undefined => {
    const allProducts = getAllProducts()
    return allProducts.find(product => product.slug === slug)
  }

  const getCategoryBySlug = (slug: string): Category | undefined => {
    return database.categories[slug]
  }

  const getAllCategories = (): Category[] => {
    return Object.values(database.categories)
  }

  const searchProducts = (query: string): Product[] => {
    const allProducts = getAllProducts()
    const lowercaseQuery = query.toLowerCase()
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    )
  }

  const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
    const categoryProducts = getProductsByCategory(product.category.toLowerCase())
    return categoryProducts
      .filter(p => p.id !== product.id)
      .slice(0, limit)
  }

  const getFeaturedProducts = (limit: number = 8): Product[] => {
    const allProducts = getAllProducts()
    return allProducts
      .filter(product => product.isNew || product.discount > 15)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  const getDiscountedProducts = (limit: number = 6): Product[] => {
    const allProducts = getAllProducts()
    return allProducts
      .filter(product => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit)
  }

  const getNewProducts = (limit: number = 6): Product[] => {
    const allProducts = getAllProducts()
    return allProducts
      .filter(product => product.isNew)
      .slice(0, limit)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const calculateSavings = (originalPrice: number, currentPrice: number): number => {
    return originalPrice - currentPrice
  }

  const getDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
    if (!originalPrice || originalPrice <= currentPrice) return 0
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  return {
    database,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    getProductBySlug,
    getCategoryBySlug,
    getAllCategories,
    searchProducts,
    getRelatedProducts,
    getFeaturedProducts,
    getDiscountedProducts,
    getNewProducts,
    formatCurrency,
    calculateSavings,
    getDiscountPercentage
  }
}

export default useProductsDatabase
