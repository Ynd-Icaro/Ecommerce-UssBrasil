'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronDown,
  SlidersHorizontal,
  Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { premiumCategories, formatPrice, calculateDiscount, type Product } from '@/lib/premium-categories'
import { toast } from 'react-hot-toast'

// Exemplo de importação dos produtos reais
import { produtosApple } from '@/lib/Products/Apple/page'
import { produtosJBL } from '@/lib/Products/JBL/page'
import { produtosDji } from '@/lib/Products/Dji/page'
import { produtosGeonav } from '@/lib/Products/Geonav/page'
import { produtosXiomi } from '@/lib/Products/Xiomi/page'
import { SimpleProductCard } from '@/components/product/SimpleProductCard'

type ViewMode = 'grid' | 'list'
type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'

export default function PremiumCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [favorites, setFavorites] = useState<string[]>([])

  // Agregação de dados para filtros
  // Filtra apenas produtos realmente disponíveis no sistema
  const allProducts = useMemo(() => {
    return [
      ...produtosApple,
      ...produtosJBL,
      ...produtosDji,
      ...produtosGeonav,
      ...produtosXiomi
    ];
  }, []);

  const allBrands = useMemo(() => {
    const brands = new Set<string>()
    allProducts.forEach(product => brands.add((product as any).brand ?? (product as any).marca))
    return Array.from(brands).sort()
  }, [allProducts])

  const allOrigins = useMemo(() => {
    const origins = new Set<string>()
    allProducts.forEach(product => {
      const origin = (product as any).origin ?? (product as any).origem
      if (origin) origins.add(origin)
    })
    return Array.from(origins).sort()
  }, [allProducts])

  // Produtos filtrados
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.nome ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.descricao ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.marca ?? '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por categorias
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.categoria)
      )
    }

    // Filtro por marcas
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes((product as any).brand ?? (product as any).marca)
      )
    }

    // Filtro por origem
    if (selectedOrigins.length > 0) {
      filtered = filtered.filter(product =>
        selectedOrigins.includes((product as any).origin ?? (product as any).origem)
      )
    }

    // Filtro por preço
    filtered = filtered.filter(product =>
      typeof product.preco === 'number' &&
      product.preco >= priceRange[0] &&
      product.preco <= priceRange[1]
    )

    // Ordenação
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.preco ?? 0) - (b.preco ?? 0))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.preco ?? 0) - (a.preco ?? 0))
        break
      case 'rating':
        filtered.sort((a, b) => ((b as any).rating ?? 0) - ((a as any).rating ?? 0))
        break
      case 'newest':
        filtered.sort((a, b) => ((b as any)?.isNew ? 1 : 0) - ((a as any)?.isNew ? 1 : 0))
        break
      default:
        // relevance - manter ordem original
        break
    }

    return filtered
  }, [searchTerm, selectedCategories, selectedBrands, selectedOrigins, priceRange, sortBy, allProducts])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Original USA': return 'bg-blue-500'
      case 'Original Apple': return 'bg-gray-800'
      case 'Global Edition': return 'bg-green-500'
      case 'Best Seller': return 'bg-yellow-500'
      case 'Pro Series': return 'bg-purple-500'
      case 'M4 Chip': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <Badge className={`${getBadgeColor(product.badge)} text-white text-xs`}>
                {product.badge}
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-red-500 text-white text-xs">
                Novo
              </Badge>
            )}
            {product.isExclusive && (
              <Badge className="bg-purple-500 text-white text-xs">
                Exclusivo
              </Badge>
            )}
          </div>

          {/* Flag */}
          <div className="absolute top-3 right-3">
            <span className="text-2xl">{product.flag}</span>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/90 hover:bg-white"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
            <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">{product.brand}</span>
              <span className="text-sm text-gray-500">{product.origin}</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </Badge>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            disabled={product.stock === 0}
            onClick={() => toast.success(`${product.name} adicionado ao carrinho!`)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categorias */}
      <div>
        <h3 className="font-semibold mb-3">Categorias</h3>
        <div className="space-y-2">
          {premiumCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id])
                  } else {
                    setSelectedCategories(selectedCategories.filter(id => id !== category.id))
                  }
                }}
              />
              <label htmlFor={category.id} className="text-sm flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Marcas */}
      <div>
        <h3 className="font-semibold mb-3">Marcas</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter(b => b !== brand))
                  }
                }}
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Origem */}
      <div>
        <h3 className="font-semibold mb-3">Origem</h3>
        <div className="space-y-2">
          {allOrigins.map((origin) => (
            <div key={origin} className="flex items-center space-x-2">
              <Checkbox
                id={origin}
                checked={selectedOrigins.includes(origin)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedOrigins([...selectedOrigins, origin])
                  } else {
                    setSelectedOrigins(selectedOrigins.filter(o => o !== origin))
                  }
                }}
              />
              <label htmlFor={origin} className="text-sm">
                {origin}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Faixa de Preço */}
      <div>
        <h3 className="font-semibold mb-3">Faixa de Preço</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Exemplo de renderização dos produtos por categoria
  const categorias = [
    { nome: 'Apple', produtos: produtosApple },
    { nome: 'JBL', produtos: produtosJBL },
    { nome: 'Dji', produtos: produtosDji },
    { nome: 'Xiomi', produtos: produtosXiomi }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Produtos Premium Importados
          </h1>
          <p className="text-lg text-gray-600">
            Tecnologia de ponta direto dos EUA, China e outros países
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas ou categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="rating">Melhor avaliado</SelectItem>
                <SelectItem value="newest">Lançamentos</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filtros</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedBrands([])
                    setSelectedOrigins([])
                    setPriceRange([0, 10000])
                  }}
                >
                  Limpar
                </Button>
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length} produtos encontrados
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => {
                  // Map product to Product type
                  const mappedProduct: Product = {
                    id: String(product.id),
                    name: (product as any).name ?? (product as any).nome ?? '',
                    description: (product as any).description ?? (product as any).descricao ?? '',
                    price: (product as any).price ?? (product as any).preco ?? 0,
                    originalPrice: (product as any).originalPrice ?? (product as any).precoOriginal,
                    image: (product as any).image ?? (product as any).imagem ?? '',
                    category: (product as any).category ?? (product as any).categoria ?? '',
                    brand: (product as any).brand ?? (product as any).marca ?? '',
                    origin: (product as any).origin ?? (product as any).origem ?? '',
                    badge: (product as any).badge,
                    isNew: (product as any).isNew ?? false,
                    isExclusive: (product as any).isExclusive ?? false,
                    flag: (product as any).flag ?? '',
                    rating: (product as any).rating ?? 0,
                    reviews: (product as any).reviews ?? 0,
                    features: (product as any).features ?? [],
                    stock: (product as any).stock ?? (product as any).estoque ?? 0,
                    subcategory: ''
                  };
                  return (
                    <ProductCard key={mappedProduct.id} product={mappedProduct} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Package className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou termo de busca
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Exemplo de renderização dos produtos por categoria */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Produtos por Categoria</h2>
            {categorias.map(categoria => (
              <div key={categoria.nome} className="mb-12">
                <h3 className="text-2xl font-semibold mb-4">{categoria.nome}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoria.produtos.map(produto => (
                    <SimpleProductCard
                      key={produto.id}
                      id={produto.id}
                      name={produto.nome ?? ''}
                      price={`R$ ${(produto.preco ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                      originalPrice={typeof (produto as any).precoOriginal === 'number' ? `R$ ${(produto as any).precoOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : undefined}
                      image={(produto as any).imagem ?? (produto as any).image ?? '' }
                      category={produto.categoria}
                      isNew={(produto as any)?.isNew}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
