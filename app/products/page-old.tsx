'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star,
  ShoppingCart,
  Play,
  ArrowRight,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Gamepad2,
  Bike,
  Plane,
  TabletSmartphone
} from 'lucide-react'
import { useProductsDatabase, type Product, type Category } from '@/lib/use-products-database'

export default function ProdutosPage() {
  const searchParams = useSearchParams()
  const { 
    getAllProducts, 
    getAllCategories, 
    searchProducts, 
    formatCurrency,
    getDiscountPercentage
  } = useProductsDatabase()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setAllProducts(getAllProducts())
    setCategories(getAllCategories())
    
    // Verificar se há parâmetro de busca na URL
    const urlSearchTerm = searchParams.get('search')
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm)
    }
  }, [searchParams])

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchTerm === '' || searchProducts(searchTerm).some(p => p.id === product.id)
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'discount':
        return b.discount - a.discount
      default:
        return b.isNew ? 1 : -1
    }
  })

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Smartphone,
      Laptop,
      Watch,
      Headphones,
      TabletSmartphone,
      Bike,
      Plane,
      Gamepad2
    }
    return icons[iconName] || Smartphone
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-white to-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6">
                Todos os
                <span className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] bg-clip-text text-transparent"> Produtos</span>
              </h1>
              
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Explore nossa coleção completa de produtos premium. Tecnologia de ponta, 
                design excepcional e qualidade incomparável.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4">
              Explore por Categoria
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Encontre exatamente o que você procura em nossas categorias especializadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon)
              const categoryProducts = allProducts.filter(p => p.category.toLowerCase() === category.slug.toLowerCase())
              
              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/categories/${category.slug}`}>
                    <Card className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden h-[320px] cursor-pointer">
                      <CardContent className="p-0 h-full relative">
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.bannerGradient} opacity-90`}></div>
                        
                        {/* Video/Image Background */}
                        <div className="absolute inset-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-contain p-8 opacity-20 group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                          <div>
                            <IconComponent className="h-8 w-8 mb-4 opacity-80" />
                            <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-white/30">
                              {categoryProducts.length} produtos
                            </Badge>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              {category.name}
                            </h3>
                            <p className="text-white/80 text-sm mb-4">
                              {category.description}
                            </p>
                            
                            <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                              Ver categoria
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-xl text-sm focus:border-[#00CED1] focus:ring-[#00CED1] bg-white"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-xl text-sm focus:border-[#00CED1] focus:ring-[#00CED1] bg-white"
            >
              <option value="newest">Mais recentes</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliados</option>
              <option value="discount">Maior desconto</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-xl"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-xl"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6">
            <p className="text-sm text-neutral-600">
              Mostrando {sortedProducts.length} de {allProducts.length} produtos
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {viewMode === 'grid' ? (
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
                        <Image
                          src={product.images.main}
                          alt={product.name}
                          fill
                          className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md text-xs">
                              Novo
                            </Badge>
                          )}
                          {product.originalPrice && product.originalPrice > product.price && (
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md text-xs">
                              -{getDiscountPercentage(product.originalPrice, product.price)}%
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {product.category}
                        </Badge>
                        
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-neutral-900 ml-1">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-500">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-neutral-900">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-neutral-400 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Action Button */}
                        <Link href={`/products/${product.id}`}>
                          <Button className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm">
                            <ShoppingCart className="h-3 w-3 mr-2" />
                            Ver Produto
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl bg-white overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        {/* Image */}
                        <div className="relative w-24 h-20 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images.main}
                            alt={product.name}
                            fill
                            className="object-contain p-3"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="outline" className="mb-1 text-xs">
                                {product.category}
                              </Badge>
                              <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium text-neutral-900 ml-1">
                                    {product.rating}
                                  </span>
                                </div>
                                <span className="text-xs text-neutral-500">
                                  ({product.reviews} avaliações)
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-neutral-900">
                                  {formatCurrency(product.price)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-neutral-400 line-through">
                                    {formatCurrency(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                              <Link href={`/products/${product.id}`}>
                                <Button size="sm" className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white rounded-xl">
                                  Ver Produto
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-neutral-600">
                Tente ajustar os filtros ou termos de busca.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
