'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import FavoriteButton from '@/components/favorite-button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
  category?: {
    name: string
  }
}

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Erro na busca:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      // Atualizar URL
      const url = new URL(window.location.href)
      url.searchParams.set('q', searchQuery)
      window.history.pushState({}, '', url)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header de Busca */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Buscar Produtos</h1>
        
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Busque por produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </Button>
        </form>
      </div>

      {/* Resultados */}
      {searchParams.get('q') && (
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Resultados para "{searchParams.get('q')}"
            </h2>
            <Badge variant="secondary">
              {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </Badge>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CED1]"></div>
        </div>
      )}

      {/* Produtos */}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={product.image || '/placeholder-image.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <FavoriteButton productId={product.id} size="sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {product.category && (
                        <Badge variant="secondary" className="text-xs">
                          {product.category.name}
                        </Badge>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-[#00CED1]">
                          R$ {product.price.toFixed(2)}
                        </span>
                        
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white"
                        >
                          Ver Produto
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Nenhum resultado */}
      {!isLoading && searchParams.get('q') && products.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Tente buscar com outras palavras-chave ou verifique a ortografia
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setProducts([])
              window.history.pushState({}, '', '/search')
            }}
          >
            Limpar busca
          </Button>
        </div>
      )}

      {/* Estado inicial */}
      {!searchParams.get('q') && !isLoading && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Digite algo para buscar
          </h3>
          <p className="text-gray-600">
            Use a barra de busca acima para encontrar produtos
          </p>
        </div>
      )}
    </div>
  )
}
