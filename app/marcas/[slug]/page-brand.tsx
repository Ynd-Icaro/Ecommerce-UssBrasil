'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { 
  ArrowLeftIcon,
  ShoppingCartIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  HeartIcon
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
  sku: string
  image: string
  images: string[]
  description: string
  shortDescription: string
  stock: number
  rating: number
  reviewsCount: number
  featured: boolean
  isNew: boolean
  bestSeller: boolean
  vipOnly: boolean
  tags: string[]
}

interface Brand {
  name: string
  slug: string
  description: string
  logo: string
  totalProducts: number
  products: Product[]
}

interface BrandPageProps {
  params: {
    slug: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const [brand, setBrand] = useState<Brand | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  const router = useRouter()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()
        
        // Procurar produtos da marca
        const brandName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        const brandProducts = data.products.filter((product: Product) => 
          product.marca.toLowerCase() === brandName.toLowerCase() ||
          product.marca.toLowerCase().replace(/\s+/g, '-') === params.slug
        )

        if (brandProducts.length === 0) {
          notFound()
        }

        // Criar objeto da marca
        const brandData: Brand = {
          name: brandProducts[0].marca,
          slug: params.slug,
          description: getBrandDescription(brandProducts[0].marca),
          logo: getBrandLogo(brandProducts[0].marca),
          totalProducts: brandProducts.length,
          products: brandProducts
        }

        setBrand(brandData)
        setProducts(brandProducts)
        setFilteredProducts(brandProducts)
      } catch (error) {
        console.error('Error fetching brand data:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchBrandData()
  }, [params.slug])

  // Funções para obter informações específicas da marca
  const getBrandDescription = (brandName: string): string => {
    const descriptions: Record<string, string> = {
      'Apple': 'Tecnologia que inspira. Produtos revolucionários que mudam a forma como vivemos, trabalhamos e nos conectamos com o mundo.',
      'JBL': 'Som que emociona. Áudio profissional com qualidade superior para música, entretenimento e comunicação em qualquer ambiente.',
      'DJI': 'Voe mais alto. Drones e equipamentos de filmagem aérea líderes mundiais em inovação e tecnologia de ponta.',
      'Xiaomi': 'Inovação para todos. Tecnologia avançada com o melhor custo-benefício do mercado, democratizando o acesso à tecnologia.',
      'Geonav': 'Navegação inteligente. Soluções GPS e sistemas de navegação para terra, mar e ar com precisão e confiabilidade.'
    }
    return descriptions[brandName] || `Descubra os melhores produtos ${brandName} com qualidade superior e tecnologia avançada.`
  }

  const getBrandLogo = (brandName: string): string => {
    const logos: Record<string, string> = {
      'Apple': '/Produtos/Apple/apple-logo.png',
      'JBL': '/Produtos/JBL/jbl-logo.png',
      'DJI': '/Produtos/DJI/dji-logo.png',
      'Xiaomi': '/Produtos/Xiaomi/xiaomi-logo.png',
      'Geonav': '/Produtos/Geonav/geonav-logo.png'
    }
    return logos[brandName] || '/Produtos/placeholder-logo.png'
  }

  // Filtros e ordenação
  useEffect(() => {
    let filtered = [...products]

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtro por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.subcategory === categoryFilter)
    }

    // Ordenação
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      default: // featured
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, sortBy, categoryFilter])

  const categories = [...new Set(products.map(p => p.subcategory))]

  const handleAddToCart = (product: Product) => {
    const productIdNumber = parseInt(product.id.replace(/\D/g, '')) || Math.abs(product.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0))
    addToCart({
      id: productIdNumber,
      name: product.name,
      price: product.discountPrice || product.price,
      originalPrice: product.price,
      image: product.image,
      quantity: 1
    })
  }

  const handleToggleFavorite = (product: Product) => {
    const productIdNumber = parseInt(product.id.replace(/\D/g, '')) || Math.abs(product.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0))
    toggleFavorite(productIdNumber)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-uss-primary"></div>
      </div>
    )
  }

  if (!brand) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header da Marca */}
      <div className="bg-gradient-to-r from-uss-primary via-uss-secondary to-cyan-400 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Voltar</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo da Marca */}
            <div className="w-32 h-32 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={`${brand.name} Logo`}
                width={100}
                height={100}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = brand.products[0]?.image || '/Produtos/placeholder.png'
                }}
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {brand.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {brand.description}
            </p>

            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold">{brand.totalProducts}</div>
                <div className="text-sm">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : '0'}
                </div>
                <div className="text-sm">Avaliação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {products.filter(p => p.stock > 0).length}
                </div>
                <div className="text-sm">Disponíveis</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Busca */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-uss-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-4">
              {/* Categoria */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-uss-primary focus:border-transparent transition-all"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:ring-2 focus:ring-uss-primary focus:border-transparent transition-all"
              >
                <option value="featured">Destaque</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="name">Nome A-Z</option>
                <option value="rating">Melhor avaliação</option>
                <option value="newest">Mais recentes</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length === products.length 
              ? `${products.length} produtos encontrados`
              : `${filteredProducts.length} de ${products.length} produtos`
            }
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                  {/* Imagem do Produto */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NOVO
                        </span>
                      )}
                      {product.discountPrice && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                        </span>
                      )}
                      {product.featured && (
                        <span className="bg-uss-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          DESTAQUE
                        </span>
                      )}
                    </div>

                    {/* Botão de Favorito */}
                    <button
                      onClick={() => handleToggleFavorite(product)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      {isFavorite(parseInt(product.id.replace(/\D/g, '')) || Math.abs(product.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0))) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Informações do Produto */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-uss-primary font-semibold text-sm">
                        {product.marca}
                      </span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 hover:text-uss-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Preço */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-uss-primary">
                          R$ {(product.discountPrice || product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        {product.discountPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        )}
                      </div>
                      <div className={`text-sm ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? 'Em estoque' : 'Esgotado'}
                      </div>
                    </div>

                    {/* Botão de Adicionar ao Carrinho */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        product.stock > 0
                          ? 'bg-gradient-to-r from-uss-primary to-uss-secondary text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>
                        {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <AdjustmentsHorizontalIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-8">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setCategoryFilter('all')
                setSortBy('featured')
              }}
              className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
