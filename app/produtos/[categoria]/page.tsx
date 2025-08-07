'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Filter,
  Eye,
  Heart,
  Share2,
  SortAsc
} from 'lucide-react'

import { 
  getProductsByCategory, 
  getAllBrands, 
  type Product, 
  type Brand,
  type Category
} from '@/lib/products-manager'
import ProductImage from '@/components/ProductImage'

// Componente de Card de Produto (Reutilizável)
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

// Componente de Breadcrumb
function Breadcrumb({ category, brand }: { category: Category | null, brand: Brand | null }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link href="/" className="hover:text-[#20b2aa] transition-colors">
        Início
      </Link>
      <span>/</span>
      <Link href="/produtos" className="hover:text-[#20b2aa] transition-colors">
        Produtos
      </Link>
      {brand && (
        <>
          <span>/</span>
          <span className="text-gray-900 font-medium">{brand.name}</span>
        </>
      )}
      {category && (
        <>
          <span>/</span>
          <span className="text-[#20b2aa] font-medium">{category.name}</span>
        </>
      )}
    </nav>
  )
}

// Componente de Hero da Categoria
function CategoryHero({ category, brand, productsCount }: { 
  category: Category | null
  brand: Brand | null
  productsCount: number 
}) {
  if (!category) return null

  return (
    <div className="relative bg-gradient-to-r from-[#20b2aa] to-[#1a9999] rounded-3xl overflow-hidden mb-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 px-8 py-16 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          {brand && (
            <p className="text-xl opacity-90 mb-2">
              da marca {brand.name}
            </p>
          )}
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-6">
            {category.description || `Explore nossa seleção completa de ${category.name.toLowerCase()}`}
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium">
              {productsCount} {productsCount === 1 ? 'produto' : 'produtos'} disponíveis
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoria = params.categoria as string

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados dos filtros
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  // Carregar dados da categoria
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Buscar produtos da categoria
        const categoryProducts = getProductsByCategory(categoria)
        
        if (categoryProducts.length === 0) {
          setError('Categoria não encontrada ou sem produtos')
          return
        }

        setProducts(categoryProducts)
        setFilteredProducts(categoryProducts)

        // Encontrar informações da categoria e marca
        const brands = getAllBrands()
        let foundCategory: Category | null = null
        let foundBrand: Brand | null = null

        for (const brandData of brands) {
          const categoryData = brandData.categories.find(cat => cat.slug === categoria)
          if (categoryData) {
            foundCategory = categoryData
            foundBrand = brandData
            break
          }
        }

        setCategory(foundCategory)
        setBrand(foundBrand)

        // Definir range de preços baseado nos produtos
        const prices = categoryProducts.map(p => p.discountPrice || p.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        setPriceRange([minPrice, maxPrice])

      } catch (err) {
        console.error('Erro ao carregar categoria:', err)
        setError('Erro ao carregar produtos da categoria')
      } finally {
        setLoading(false)
      }
    }

    if (categoria) {
      loadCategoryData()
    }
  }, [categoria])

  // Aplicar filtros e ordenação
  useEffect(() => {
    let filtered = [...products]

    // Filtro por faixa de preço
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price
      return price >= priceRange[0] && price <= priceRange[1]
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
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // newest
        filtered.sort((a, b) => b.featured ? 1 : -1)
    }

    setFilteredProducts(filtered)
  }, [products, sortBy, priceRange])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#20b2aa] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando categoria...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-4xl">😞</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Categoria não encontrada</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/produtos')}
            className="px-6 py-3 bg-[#20b2aa] text-white rounded-xl font-semibold hover:bg-[#1a9999] transition-colors"
          >
            Ver todos os produtos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#20b2aa] transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>

        {/* Breadcrumb */}
        <Breadcrumb category={category} brand={brand} />

        {/* Hero da categoria */}
        <CategoryHero 
          category={category} 
          brand={brand} 
          productsCount={filteredProducts.length} 
        />

        {/* Controles e filtros */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Ordenação */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-transparent"
              >
                <option value="newest">Mais recentes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name">Nome A-Z</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>

            {/* View mode e resultados */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </p>
              
              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#20b2aa] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#20b2aa] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou explore outras categorias
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 bg-[#20b2aa] text-white rounded-xl font-semibold hover:bg-[#1a9999] transition-colors"
            >
              Ver todos os produtos
            </Link>
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
