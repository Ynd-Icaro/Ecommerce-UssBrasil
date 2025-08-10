'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Filter,
  SortAsc,
  Heart,
  Eye,
  X,
  ChevronDown,
  Sliders,
  Tag
} from 'lucide-react'

import { getAllProducts, getAllBrands, searchProducts, type Product, type Brand } from '@/lib/products-manager'
import ProductImage from '@/components/ProductImage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Componente de Card de Produto Refatorado
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const router = useRouter()

  const handleViewProduct = () => {
    router.push(`/produtos/${product.category}/${product.id}`)
  }

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group relative bg-[hsl(var(--card))] rounded-2xl shadow-sm border border-[hsl(var(--border))] overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-[hsl(var(--uss-primary))]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--muted))]">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {product.discountPrice && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-[hsl(var(--uss-error))] text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </Badge>
          </div>
        )}

        {product.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-[hsl(var(--uss-warning))] text-[hsl(var(--foreground))] text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
              ⭐ Destaque
            </Badge>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute inset-x-4 bottom-4 flex gap-2 z-10"
        >
          <Button
            onClick={handleViewProduct}
            className="flex-1 bg-[hsl(var(--uss-primary))] hover:bg-[hsl(var(--uss-primary-dark))] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Ver
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
            className={`p-2 rounded-lg transition-colors shadow-md ${
              isFavorited 
                ? 'bg-[hsl(var(--uss-error))] text-white border-[hsl(var(--uss-error))]' 
                : 'bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] border-[hsl(var(--border))]'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] p-2 rounded-lg transition-colors shadow-md border-[hsl(var(--border))]"
          >
            <ShoppingCart className="h-4 w-4 text-[hsl(var(--uss-primary))]" />
          </Button>
        </motion.div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs font-medium bg-[hsl(var(--uss-primary))] text-white px-2 py-1 rounded-full">
                {product.marca}
              </Badge>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{product.category}</span>
            </div>
            <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2 line-clamp-2 text-sm leading-5">
              {product.name}
            </h3>
          </div>
        </div>

        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'text-[hsl(var(--uss-warning))] fill-current'
                      : 'text-[hsl(var(--muted-foreground))]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {product.rating?.toFixed(1)}
            </span>
          </div>
        )}

        <div className="space-y-1 mb-4">
          {product.discountPrice ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[hsl(var(--uss-success))]">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-[hsl(var(--muted-foreground))] line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-xs text-[hsl(var(--uss-success))] font-medium">
                Economize {formatPrice(product.price - product.discountPrice)}
              </div>
            </>
          ) : (
            <span className="text-lg font-bold text-[hsl(var(--foreground))]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <Button
          onClick={handleViewProduct}
          className="w-full bg-gradient-to-r from-[hsl(var(--uss-primary))] to-[hsl(var(--uss-primary-light))] hover:from-[hsl(var(--uss-primary-dark))] hover:to-[hsl(var(--uss-primary))] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          Ver Produto
        </Button>
      </div>
    </motion.div>
  )
}

// Componente de Filtros Aprimorado
function ProductFilters({ 
  brands, 
  categories, 
  selectedBrands, 
  selectedCategories, 
  priceRange, 
  onBrandChange, 
  onCategoryChange, 
  onPriceChange,
  onClearFilters,
  activeFiltersCount 
}: {
  brands: string[]
  categories: string[]
  selectedBrands: string[]
  selectedCategories: string[]
  priceRange: [number, number]
  onBrandChange: (brand: string) => void
  onCategoryChange: (category: string) => void
  onPriceChange: (range: [number, number]) => void
  onClearFilters: () => void
  activeFiltersCount: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[hsl(var(--uss-primary))]" />
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Filtros</h3>
            {activeFiltersCount > 0 && (
              <Badge className="bg-[hsl(var(--uss-primary))] text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-[hsl(var(--uss-error))] hover:text-[hsl(var(--uss-error))] hover:bg-[hsl(var(--uss-error))]/10 text-sm"
              >
                Limpar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
          {/* Faixa de Preço */}
          <div>
            <h4 className="font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4 text-[hsl(var(--uss-primary))]" />
              Faixa de Preço
            </h4>
            <div className="space-y-3">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceChange(value as [number, number])}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-[hsl(var(--muted-foreground))]">
                <span>R$ {priceRange[0].toLocaleString('pt-BR')}</span>
                <span>R$ {priceRange[1].toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Marcas */}
          <div>
            <h4 className="font-medium text-[hsl(var(--foreground))] mb-3">Marcas</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => onBrandChange(brand)}
                    className="border-[hsl(var(--border))] data-[state=checked]:bg-[hsl(var(--uss-primary))] data-[state=checked]:border-[hsl(var(--uss-primary))]"
                  />
                  <label 
                    htmlFor={`brand-${brand}`} 
                    className="text-sm text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--uss-primary))]"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-medium text-[hsl(var(--foreground))] mb-3">Categorias</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryChange(category)}
                    className="border-[hsl(var(--border))] data-[state=checked]:bg-[hsl(var(--uss-primary))] data-[state=checked]:border-[hsl(var(--uss-primary))]"
                  />
                  <label 
                    htmlFor={`category-${category}`} 
                    className="text-sm text-[hsl(var(--foreground))] cursor-pointer hover:text-[hsl(var(--uss-primary))]"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente Principal
function ProdutosPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Estados
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [brands, setBrands] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [productsData, brandsData] = await Promise.all([
          getAllProducts(),
          getAllBrands()
        ])
        
        setProducts(productsData)
        setBrands(brandsData.map(b => b.name))
        
        // Extrair categorias únicas
        const uniqueCategories = [...new Set(productsData.map(p => p.category))]
        setCategories(uniqueCategories)
        
        // Aplicar filtros da URL
        const urlBrand = searchParams.get('brand')
        const urlCategory = searchParams.get('category')
        const urlSearch = searchParams.get('search')
        
        if (urlBrand) setSelectedBrands([urlBrand])
        if (urlCategory) setSelectedCategories([urlCategory])
        if (urlSearch) setSearchTerm(urlSearch)
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  // Aplicar filtros
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Filtro de busca
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.marca.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Filtro de marcas
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.marca)) {
        return false
      }

      // Filtro de categorias
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Filtro de preço
      const price = product.discountPrice || product.price
      if (price < priceRange[0] || price > priceRange[1]) {
        return false
      }

      return true
    })

    // Ordenação
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-desc':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // Relevância (produtos em destaque primeiro)
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
    }

    return filtered
  }, [products, searchTerm, selectedBrands, selectedCategories, priceRange, sortBy])

  // Handlers
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setPriceRange([0, 10000])
    setSearchTerm('')
    router.push('/produtos')
  }

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + 
    (searchTerm ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--uss-primary))] mx-auto mb-4"></div>
            <p className="text-[hsl(var(--muted-foreground))]">Carregando produtos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
          Nossos Produtos
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Encontre os melhores produtos de tecnologia com qualidade USS Brasil
        </p>
      </div>

      {/* Busca e Controles */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[hsl(var(--muted))] border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--uss-primary))]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            {/* Ordenação */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
                <SelectItem value="rating">Melhor avaliados</SelectItem>
              </SelectContent>
            </Select>

            {/* Modo de visualização */}
            <div className="flex items-center border border-[hsl(var(--border))] rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[hsl(var(--uss-primary))] text-white' : ''}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[hsl(var(--uss-primary))] text-white' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <div className="lg:col-span-1">
          <ProductFilters
            brands={brands}
            categories={categories}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            onBrandChange={handleBrandChange}
            onCategoryChange={handleCategoryChange}
            onPriceChange={setPriceRange}
            onClearFilters={handleClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Produtos */}
        <div className="lg:col-span-3">
          {/* Filtros Ativos */}
          {activeFiltersCount > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Filtros ativos:</span>
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="bg-[hsl(var(--uss-primary))] text-white">
                    {brand}
                    <button 
                      onClick={() => handleBrandChange(brand)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedCategories.map(category => (
                  <Badge key={category} variant="secondary" className="bg-[hsl(var(--uss-secondary))] text-white">
                    {category}
                    <button 
                      onClick={() => handleCategoryChange(category)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="mb-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {filteredAndSortedProducts.length} produtos encontrados
            </p>
          </div>

          {/* Grid de Produtos */}
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div 
              layout
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              <AnimatePresence>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-[hsl(var(--muted-foreground))]" />
              </div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-4">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Página principal com Suspense
export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--uss-primary))]"></div>
        </div>
      </div>
    }>
      <ProdutosPageContent />
    </Suspense>
  )
}
