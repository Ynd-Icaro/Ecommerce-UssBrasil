'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animated-components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/ui/product-card'
import { BrandSidebar } from '@/components/products/brand-sidebar'
import { darkTheme } from '@/lib/design-system'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Loader2
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
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Pegar parâmetros da URL
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const brand = searchParams.get('brand')
    
    if (category) setSelectedCategory(category)
    if (search) setSearchTerm(search)
    if (brand) setSelectedBrand(brand)
  }, [searchParams])

  // Filtrar e ordenar produtos
  const filteredProducts = (products || [])
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesBrand = !selectedBrand || product.brand?.toLowerCase() === selectedBrand.toLowerCase()
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesBrand && matchesSearch
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Produtos Premium
          </motion.h1>
          <p className="text-lg text-muted-foreground">
            Encontre os melhores produtos Apple com qualidade garantida
          </p>
        </div>

        {/* Layout com sidebar e conteúdo */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de marcas */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <BrandSidebar 
              onBrandFilter={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
          </aside>

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Filtros */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 shadow-lg border bg-card mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Busca */}
                <div className="relative flex-1 w-full lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Filtros de categoria */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Ordenação e visualização */}
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-background border border-border text-foreground rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="newest">Mais recentes</option>
                    <option value="price-low">Menor preço</option>
                    <option value="price-high">Maior preço</option>
                    <option value="name">Nome A-Z</option>
                  </select>

                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`${viewMode === 'grid' ? 'bg-muted' : ''} text-muted-foreground hover:text-foreground`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`${viewMode === 'list' ? 'bg-muted' : ''} text-muted-foreground hover:text-foreground`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Carregando produtos...</p>
                </div>
              </div>
            )}

            {/* Grid de Produtos */}
            {!loading && (
              <FadeIn duration={0.5}>
                <StaggerContainer staggerDelay={0.08}>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredProducts.map((product) => (
                      <StaggerItem key={product.id}>
                        <ProductCard
                          product={product}
                          viewMode={viewMode}
                        />
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </FadeIn>
            )}

            {/* Estado vazio */}
            {!loading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="mb-4">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou buscar por outros termos
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedBrand(null)
                  }}
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </motion.div>
            )}

            {/* Informações dos resultados */}
            {!loading && filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center"
              >
                <p className="text-muted-foreground">
                  Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} 
                  {selectedBrand && ` da marca ${selectedBrand}`}
                  {selectedCategory !== 'all' && ` na categoria ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
