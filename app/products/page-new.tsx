'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/ui/product-card'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List
} from 'lucide-react'
import { useAPI } from '@/hooks/use-api'

// Dados mock de categorias
const categories = [
  { id: 'all', name: 'Todos', icon: '🛍️' },
  { id: 'smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'laptops', name: 'Laptops', icon: '💻' },
  { id: 'tablets', name: 'Tablets', icon: '📱' },
  { id: 'smartwatches', name: 'Smartwatches', icon: '⌚' },
  { id: 'acessorios', name: 'Acessórios', icon: '🎧' }
]

// Componente que usa useSearchParams
function ProductsContent() {
  const searchParams = useSearchParams()
  const { data: products, loading } = useAPI<any>('products')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Pegar parâmetros da URL
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) setSelectedCategory(category)
    if (search) setSearchTerm(search)
  }, [searchParams])

  // Filtrar e ordenar produtos
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Produtos Premium
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Encontre os melhores produtos Apple com qualidade garantida
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-gray-200 rounded-lg"
              />
            </div>

            {/* Categorias */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 
                    "bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white" : 
                    "hover:bg-gray-100"
                  }
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Ordenação e View Mode */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <option value="newest">Mais Recentes</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="name">Nome A-Z</option>
              </select>

              <div className="flex border border-gray-200 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gray-100' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CED1] mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando produtos...</p>
            </div>
          </div>
        )}

        {/* Grid de Produtos */}
        {!loading && (
          <motion.div
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  variant={viewMode === 'list' ? 'featured' : 'default'}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Nenhum produto encontrado */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou termo de busca
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente principal com Suspense
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CED1] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando página...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
