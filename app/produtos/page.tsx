'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Filter,
  SortAsc,
  Heart,
  Eye
} from 'lucide-react'

import { getAllProducts, getAllBrands, searchProducts, type Product, type Brand } from '@/lib/products-manager'
import ProductImage from '@/components/ProductImage'

// Componente de Card de Produto
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleViewProduct = () => {
    router.push(`/produtos/${product.category}/${product.id}`)
  }

  const formatPrice = (price: number) => {
    return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Badge de desconto */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          </div>
        )}
        
        {/* Badge de destaque */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
              Destaque
            </span>
          </div>
        )}
        
        {/* Ações rápidas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4 flex gap-2"
        >
          <button
            onClick={handleViewProduct}
            className="flex-1 bg-[#1a1a1a] text-white py-2 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Ver Produto</span>
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition-colors">
            <ShoppingCart className="h-4 w-4 text-gray-600 hover:text-[#20b2aa]" />
          </button>
        </motion.div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#20b2aa] bg-[#20b2aa]/10 px-2 py-1 rounded-full">
            {product.marca}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-[#20b2aa]">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#20b2aa]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <span className="text-xs text-gray-500">
            {product.stock} em estoque
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Componente de Filtros
function ProductFilters({ 
  brands, 
  selectedBrand, 
  onBrandChange, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange 
}: {
  brands: Brand[]
  selectedBrand: string
  onBrandChange: (brand: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}) {
  const categories = useMemo(() => {
    if (selectedBrand === 'all') {
      return brands.flatMap(brand => brand.categories)
    }
    const brand = brands.find(b => b.slug === selectedBrand)
    return brand?.categories || []
  }, [brands, selectedBrand])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filtro por Marca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent"
          >
            <option value="all">Todas as marcas</option>
            {brands.map(brand => (
              <option key={brand.slug} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent"
          >
            <option value="all">Todas as categorias</option>
            {categories.map(category => (
              <option key={`${category.marca}-${category.slug}`} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent"
          >
            <option value="newest">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name">Nome A-Z</option>
            <option value="rating">Melhor avaliação</option>
          </select>
        </div>

        {/* Busca rápida */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Busca rápida</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProdutosPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Estados dos filtros
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 Carregando produtos...')
        const productsData = getAllProducts()
        const brandsData = getAllBrands()
        
        console.log('📦 Produtos carregados:', productsData.length)
        console.log('🏷️ Marcas carregadas:', brandsData.length)
        
        setAllProducts(productsData)
        setBrands(brandsData)
        setFilteredProducts(productsData)
        
        // Aplicar filtros da URL
        const brandParam = searchParams.get('marca')
        const categoryParam = searchParams.get('categoria')
        
        if (brandParam) setSelectedBrand(brandParam)
        if (categoryParam) setSelectedCategory(categoryParam)
        
      } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...allProducts]

    // Filtro por marca
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.marca.toLowerCase() === selectedBrand)
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Busca
    if (searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery)
      filtered = filtered.filter(product => 
        searchResults.some(searchProduct => searchProduct.id === product.id)
      )
    }

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
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // newest
        filtered.sort((a, b) => b.featured ? 1 : -1)
    }

    setFilteredProducts(filtered)

    // Atualizar URL
    const params = new URLSearchParams()
    if (selectedBrand !== 'all') params.set('marca', selectedBrand)
    if (selectedCategory !== 'all') params.set('categoria', selectedCategory)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/produtos?${queryString}` : '/produtos'
    window.history.replaceState({}, '', newUrl)

  }, [allProducts, selectedBrand, selectedCategory, sortBy, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20b2aa] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nossa seleção completa de produtos das melhores marcas de tecnologia
          </p>
        </div>

        {/* Filtros */}
        <ProductFilters
          brands={brands}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Barra de resultados e view mode */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#20b2aa] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#20b2aa] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Grid de produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <button
              onClick={() => {
                setSelectedBrand('all')
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="px-6 py-3 bg-[#20b2aa] text-white rounded-xl font-semibold hover:bg-[#1a9999] transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20b2aa] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    }>
      <ProdutosPageContent />
    </Suspense>
  )
}
