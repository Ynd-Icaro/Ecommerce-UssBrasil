'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useProductsDatabase } from '@/lib/use-products-database'

interface SearchResult {
  id: string
  name: string
  price: string
  image: string
  category: string
  href: string
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { getAllProducts } = useProductsDatabase()

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        performSearch(query)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const allProducts = getAllProducts()
    const filteredProducts = allProducts.filter((product: any) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)

    const searchResults: SearchResult[] = filteredProducts.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'Produto',
      href: `/product/${product.id}`
    }))

    setResults(searchResults)
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Buscar produtos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 bg-gray-50/80 backdrop-blur-sm border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <Card className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-500">Buscando...</span>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          href={result.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
                            <Image
                              src={result.image && result.image.startsWith('/products/') ? result.image : `/products/${result.image?.replace(/^\/+/, '')}`}
                              alt={result.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500">{result.category}</p>
                          </div>
                          <div className="ml-4 text-sm font-semibold text-gray-900">
                            {result.price}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    {results.length === 6 && (
                      <div className="p-4 text-center border-t border-gray-100">
                        <Link 
                          href={`/products?search=${encodeURIComponent(query)}`}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Ver todos os resultados →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : query.length > 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500 mb-2">Nenhum produto encontrado</p>
                    <p className="text-sm text-gray-400">
                      Tente buscar por "{query.toLowerCase() === 'iphone' ? 'iPhone' : 'MacBook'}" ou "Apple Watch"
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
