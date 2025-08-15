import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  category: string
  brand?: string
  image: string
  description?: string
  tags?: string[]
}

interface SearchResult {
  products: Product[]
  categories: string[]
  brands: string[]
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult>({
    products: [],
    categories: [],
    brands: []
  })
  const [isSearching, setIsSearching] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const router = useRouter()

  // Carregar produtos na inicialização
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const products = await response.json()
          setAllProducts(products)
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      }
    }

    loadProducts()
  }, [])

  // Função de busca
  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        products: [],
        categories: [],
        brands: []
      }
    }

    const query = searchQuery.toLowerCase()
    
    // Filtrar produtos
    const filteredProducts = allProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })

    // Extrair categorias únicas dos resultados
    const uniqueCategories = [...new Set(
      filteredProducts.map(p => p.category)
    )]

    // Extrair marcas únicas dos resultados
    const uniqueBrands = [...new Set(
      filteredProducts
        .map(p => p.brand)
        .filter(Boolean)
    )] as string[]

    return {
      products: filteredProducts,
      categories: uniqueCategories,
      brands: uniqueBrands
    }
  }, [searchQuery, allProducts])

  // Atualizar resultados quando a busca mudar
  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setSearchResults(performSearch)
      setIsSearching(false)
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timer)
  }, [performSearch])

  // Função para executar busca e navegar
  const executeSearch = (query?: string) => {
    const finalQuery = query || searchQuery
    if (finalQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(finalQuery)}`)
    }
  }

  // Sugestões rápidas baseadas nos produtos mais populares
  const getQuickSuggestions = () => {
    if (!searchQuery.trim()) {
      return []
    }
    
    return searchResults.products.slice(0, 5)
  }

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    executeSearch,
    getQuickSuggestions: getQuickSuggestions(),
    hasResults: searchResults.products.length > 0 || 
                 searchResults.categories.length > 0 || 
                 searchResults.brands.length > 0
  }
}
