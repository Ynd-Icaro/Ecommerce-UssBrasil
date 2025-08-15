'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  category: string
  subcategory: string
  marca: string
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
}

interface FilterState {
  marca: string[]
  categoria: string[]
  priceRange: [number, number]
  inStock: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState<FilterState>({
    marca: [],
    categoria: [],
    priceRange: [0, 10000],
    inStock: false
  })

  const { addToCart } = useCart()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  // Carregar produtos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()
        setProducts(data.products || [])
        setFilteredProducts(data.products || [])
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Aplicar filtros e busca
  useEffect(() => {
    let result = products

    // Filtro por busca
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por marca
    if (filters.marca.length > 0) {
      result = result.filter(product => filters.marca.includes(product.marca))
    }

    // Filtro por categoria
    if (filters.categoria.length > 0) {
      result = result.filter(product => filters.categoria.includes(product.category))
    }

    // Filtro por preço
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    // Filtro por estoque
    if (filters.inStock) {
      result = result.filter(product => product.inStock)
    }

    // Ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price
        case 'price_desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(result)
  }, [products, searchQuery, filters, sortBy])

  // Obter marcas e categorias únicas
  const uniqueBrands = [...new Set(products.map(p => p.marca))]
  const uniqueCategories = [...new Set(products.map(p => p.category))]

  const handleFilterChange = (type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-uss-primary via-uss-secondary to-cyan-400 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="text-cyan-200">Produtos</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore nossa seleção premium de tecnologia importada
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Barra de Busca e Controles */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-uss-primary focus:border-transparent"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center space-x-4">
              {/* Filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-uss-primary transition-colors"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filtros</span>
              </button>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-uss-primary focus:border-transparent"
              >
                <option value="name">Nome A-Z</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="rating">Melhor Avaliado</option>
              </select>

              {/* Modo de Visualização */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-uss-primary text-white' : 'bg-white text-gray-500'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-uss-primary text-white' : 'bg-white text-gray-500'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar de Filtros */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit"
            >
              <h3 className="text-lg font-bold mb-6">Filtros</h3>

              {/* Filtro por Marca */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Marca</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.marca.includes(brand)}
                        onChange={(e) => {
                          const newMarcas = e.target.checked
                            ? [...filters.marca, brand]
                            : filters.marca.filter(m => m !== brand)
                          handleFilterChange('marca', newMarcas)
                        }}
                        className="mr-2 rounded text-uss-primary focus:ring-uss-primary"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Categoria */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Categoria</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categoria.includes(category)}
                        onChange={(e) => {
                          const newCategorias = e.target.checked
                            ? [...filters.categoria, category]
                            : filters.categoria.filter(c => c !== category)
                          handleFilterChange('categoria', newCategorias)
                        }}
                        className="mr-2 rounded text-uss-primary focus:ring-uss-primary"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Estoque */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="mr-2 rounded text-uss-primary focus:ring-uss-primary"
                  />
                  <span className="text-sm">Apenas em estoque</span>
                </label>
              </div>

              {/* Limpar Filtros */}
              <button
                onClick={() => setFilters({
                  marca: [],
                  categoria: [],
                  priceRange: [0, 10000],
                  inStock: false
                })}
                className="w-full text-center text-uss-primary hover:text-uss-secondary font-medium transition-colors"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}

          {/* Grid/Lista de Produtos */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Imagem do Produto */}
                  <div className={`relative bg-gray-50 ${
                    viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                  }`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badge de Desconto */}
                    {product.discountPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </div>
                    )}

                    {/* Botão de Favorito */}
                    <button
                      onClick={() => toggleFavorite(parseInt(product.id))}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      {isFavorite(parseInt(product.id)) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Informações do Produto */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-uss-primary bg-uss-primary/10 px-2 py-1 rounded-lg">
                        {product.marca}
                      </span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Preço */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-uss-primary">
                        R$ {(product.discountPrice || product.price).toFixed(2)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex space-x-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg text-center transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mensagem quando não há produtos */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MagnifyingGlassIcon className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou busca para encontrar o que procura
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({
                      marca: [],
                      categoria: [],
                      priceRange: [0, 10000],
                      inStock: false
                    })
                  }}
                  className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
