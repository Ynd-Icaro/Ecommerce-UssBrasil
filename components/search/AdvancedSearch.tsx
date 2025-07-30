'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, TrendingUp, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  type: 'product' | 'category' | 'brand'
  image?: string
  price?: number
  href: string
}

interface AdvancedSearchProps {
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
}

export function AdvancedSearch({ className, placeholder = "Buscar produtos...", onSearch }: AdvancedSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches] = useState<string[]>([
    'iPhone 16 Pro',
    'MacBook Pro M3',
    'AirPods Pro 2',
    'Apple Watch Series 10',
    'iPad Air'
  ])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Carregar pesquisas recentes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Buscar resultados conforme o usuário digita
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true)
      
      // Simular chamada à API - substituir por chamada real
      const searchProducts = async () => {
        // Mock de resultados de busca
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'iPhone 16 Pro Max',
            type: 'product' as const,
            image: '/Imagens/Iphone-16-Pro.png',
            price: 8999.99,
            href: '/product/iphone-16-pro-max'
          },
          {
            id: '2',
            title: 'MacBook Pro M3',
            type: 'product' as const,
            image: '/Imagens/Macbook-Pro.png',
            price: 12999.99,
            href: '/product/macbook-pro-m3'
          },
          {
            id: '3',
            title: 'Apple',
            type: 'brand' as const,
            href: '/categories/apple'
          },
          {
            id: '4',
            title: 'Smartphones',
            type: 'category' as const,
            href: '/categories/smartphones'
          }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase())
        )

        setTimeout(() => {
          setResults(mockResults)
          setIsLoading(false)
        }, 300)
      }

      searchProducts()
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Salvar no histórico
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecentSearches)
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))
      
      // Executar busca
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      onSearch?.(searchQuery)
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Tag className="h-3 w-3" />
      case 'category':
        return <Search className="h-3 w-3" />
      case 'brand':
        return <TrendingUp className="h-3 w-3" />
      default:
        return <Search className="h-3 w-3" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      product: 'default',
      category: 'secondary',
      brand: 'outline'
    }
    return variants[type] || 'default'
  }

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-lg", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-4 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary-500"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setQuery('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {/* Resultados da busca */}
                {query.length > 1 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Resultados</h3>
                      {isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      )}
                    </div>
                    
                    {results.length > 0 ? (
                      <div className="space-y-2">
                        {results.map((result) => (
                          <motion.button
                            key={result.id}
                            onClick={() => {
                              router.push(result.href)
                              setIsOpen(false)
                              setQuery('')
                            }}
                            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {result.image && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={result.image && result.image.startsWith('/products/') ? result.image : `/products/${result.image?.replace(/^\/+/, '')}`}
                                  alt={result.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 truncate">
                                  {result.title}
                                </span>
                                <Badge variant={getTypeBadge(result.type)} className="text-xs">
                                  {getTypeIcon(result.type)}
                                  <span className="ml-1 capitalize">{result.type}</span>
                                </Badge>
                              </div>
                              {result.price && (
                                <span className="text-sm text-primary-600 font-medium">
                                  {formatPrice(result.price)}
                                </span>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : !isLoading && (
                      <p className="text-sm text-gray-500 py-4 text-center">
                        Nenhum resultado encontrado
                      </p>
                    )}
                  </div>
                )}

                {/* Separador */}
                {query.length > 1 && (recentSearches.length > 0 || trendingSearches.length > 0) && (
                  <Separator />
                )}

                {/* Pesquisas recentes */}
                {query.length <= 1 && recentSearches.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Pesquisas recentes
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs"
                      >
                        Limpar
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Separador */}
                {query.length <= 1 && recentSearches.length > 0 && trendingSearches.length > 0 && (
                  <Separator />
                )}

                {/* Pesquisas em alta */}
                {query.length <= 1 && trendingSearches.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Em alta
                    </h3>
                    <div className="space-y-1">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left text-sm text-gray-700 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estado vazio */}
                {query.length <= 1 && recentSearches.length === 0 && (
                  <div className="p-8 text-center">
                    <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      Digite para buscar produtos, categorias e marcas
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
