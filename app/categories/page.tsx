"use client"
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
  // Estado para controle de produtos visíveis por categoria
  const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>({})

  // Função para mostrar mais produtos de uma categoria
  const handleShowMore = (categoriaNome: string, total: number) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [categoriaNome]: Math.min((prev[categoriaNome] || 8) + 8, total)
    }))
  }
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
    allProducts.forEach((product: any) => {
      const brand = (product as any).brand ?? (product as any).marca
      if (typeof brand === 'string' && brand.trim() !== '') brands.add(brand)
    })
    return Array.from(brands).filter(b => typeof b === 'string' && b.trim() !== '').sort()
  }, [allProducts])

  const allOrigins = useMemo(() => {
    const origins = new Set<string>()
    allProducts.forEach((product: any) => {
      const origin = (product as any).origin ?? (product as any).origem
      if (typeof origin === 'string' && origin.trim() !== '') origins.add(origin)
    })
    return Array.from(origins).filter(o => typeof o === 'string' && o.trim() !== '').sort()
  }, [allProducts])

  // Produtos filtrados
  const filteredProducts = useMemo(() => {
    // Normaliza todos os produtos para garantir propriedades consistentes conforme types/index.ts
    const normalized = allProducts.map((product: any) => ({
      id: String(product.id ?? product.ID ?? product.codigo ?? product.sku ?? ''),
      name: product.name ?? product.nome ?? '',
      slug: product.slug ?? '',
      classe: product.classe ?? product.class ?? '',
      categoria: product.categoria ?? product.category ?? '',
      price: typeof product.price === 'number' ? product.price : (typeof product.preco === 'number' ? product.preco : 0),
      originalPrice: typeof product.originalPrice === 'number' ? product.originalPrice : (typeof product.precoOriginal === 'number' ? product.precoOriginal : undefined),
      discountPrice: typeof product.discountPrice === 'number' ? product.discountPrice : undefined,
      rating: typeof product.rating === 'number' ? product.rating : 0,
      reviews: typeof product.reviews === 'number' ? product.reviews : 0,
      totalReviews: typeof product.totalReviews === 'number' ? product.totalReviews : 0,
      isNew: product.isNew ?? false,
      isFeatured: product.isFeatured ?? false,
      isOnSale: product.isOnSale ?? false,
      discount: typeof product.discount === 'number' ? product.discount : 0,
      description: product.description ?? product.descricao ?? '',
      features: Array.isArray(product.features) ? product.features : [],
      images: product.images ?? { main: product.image ?? product.imagem ?? '' },
      videos: Array.isArray(product.videos) ? product.videos : undefined,
      colors: Array.isArray(product.colors) ? product.colors : [],
      storage: Array.isArray(product.storage) ? product.storage : [],
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      specifications: product.specifications ?? {},
      stock: typeof product.stock === 'number' ? product.stock : (typeof product.estoque === 'number' ? product.estoque : 0),
      status: product.status ?? 'ACTIVE',
      tags: Array.isArray(product.tags) ? product.tags : [],
      sku: product.sku ?? '',
      barcode: product.barcode ?? '',
      paymentOptions: typeof product.paymentOptions === 'number' ? product.paymentOptions : undefined,
      createdAt: product.createdAt ?? '',
      updatedAt: product.updatedAt ?? '',
      brand: product.brand ?? product.marca ?? '',
      origin: product.origin ?? product.origem ?? '',
      badge: product.badge,
      isExclusive: product.isExclusive ?? false,
      flag: product.flag ?? '',
      subcategory: product.subcategory ?? ''
    }))

    let filtered = normalized

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
        selectedBrands.includes(product.brand)
      )
    }

    // Filtro por origem
    if (selectedOrigins.length > 0) {
      filtered = filtered.filter(product =>
        selectedOrigins.includes(product.origin)
      )
    }

    // Filtro por preço
    filtered = filtered.filter(product =>
      typeof product.price === 'number' &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )

    // Ordenação
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // relevance - manter ordem original
        break
    }

    return filtered
  }, [searchTerm, selectedCategories, selectedBrands, selectedOrigins, priceRange, sortBy, allProducts])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(productId)
        ? prev.filter((id: string) => id !== productId)
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
      <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={320}
            height={240}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="mb-2 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
              <span className="text-xs text-gray-500 font-medium">{product.origin}</span>
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
            <span className="text-xs text-gray-500 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>
          {/* Features */}
          <div className="mb-4 flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature: any) => (
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
          {/* Price & Stock */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </Badge>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className={`text-xs font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
              </div>
            </div>
          </div>
          <Button 
            className="w-full mt-auto" 
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
          {premiumCategories
            .filter(category => typeof category.id === 'string' && category.id.trim() !== '')
            .map((category: { id: string; icon: React.ReactNode; name: string }) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked: any) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category.id])
                    } else {
                      setSelectedCategories(selectedCategories.filter((id: string) => id !== category.id))
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
          {allBrands
            .filter(brand => typeof brand === 'string' && brand.trim() !== '')
            .map((brand: string) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked: any) => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brand])
                    } else {
                      setSelectedBrands(selectedBrands.filter((b: string) => b !== brand))
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
          {allOrigins
            .filter(origin => typeof origin === 'string' && origin.trim() !== '')
            .map((origin: string) => (
              <div key={origin} className="flex items-center space-x-2">
                <Checkbox
                  id={origin}
                  checked={selectedOrigins.includes(origin)}
                  onCheckedChange={(checked: any) => {
                    if (checked) {
                      setSelectedOrigins([...selectedOrigins, origin])
                    } else {
                      setSelectedOrigins(selectedOrigins.filter((o: string) => o !== origin))
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
    { nome: 'Apple', produtos: produtosApple, video: '/videos/iphone.mp4', gradient: 'from-blue-600 via-purple-600 to-indigo-700' },
    { nome: 'JBL', produtos: produtosJBL, video: '/videos/jbl.mp4', gradient: 'from-orange-500 via-yellow-500 to-red-600' },
    { nome: 'Dji', produtos: produtosDji, video: '/videos/dji.mp4', gradient: 'from-emerald-500 via-teal-500 to-cyan-600' },
    { nome: 'Xiomi', produtos: produtosXiomi, video: '/videos/xiomi.mp4', gradient: 'from-orange-500 via-red-500 to-pink-600' }
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

        {/* Search and Filters Modernos */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar produtos, marcas ou categorias..."
                value={searchTerm}
                onChange={(e: { target: { value: any } }) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-44 bg-gray-50 border-gray-300">
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Preço:</span>
              <div className="w-32">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                R$ {priceRange[0]} - R$ {priceRange[1]}
              </span>
            </div>
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
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length} produtos encontrados
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}> 
                {filteredProducts.map((product: { id: any }, idx: number) => {
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
                    <ProductCard key={mappedProduct.id + '-' + idx} product={mappedProduct} />
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
        {/* Renderização dos produtos por categoria com vídeo quando disponível */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Produtos por Categoria</h2>
            {categorias.map(categoria => (
              <div key={categoria.nome} className="mb-16">
                {/* Video da categoria se existir */}
                {categoria.video && (
                  <div className={`relative h-64 mb-8 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r ${categoria.gradient}`}>
                    <video
                      src={categoria.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 flex items-center h-full px-8">
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg">{categoria.nome}</h3>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-6 justify-center">
                  {(categoria.produtos
                    .map((produto: any) => ({
                      id: String(produto.id ?? produto.ID ?? produto.codigo ?? produto.sku ?? ''),
                      name: produto.name ?? produto.nome ?? '',
                      description: produto.description ?? produto.descricao ?? '',
                      price: typeof produto.price === 'number' ? produto.price : (typeof produto.preco === 'number' ? produto.preco : 0),
                      originalPrice: typeof produto.originalPrice === 'number' ? produto.originalPrice : (typeof produto.precoOriginal === 'number' ? produto.precoOriginal : undefined),
                      image: produto.image ?? produto.imagem ?? (produto.images?.main ?? ''),
                      category: produto.category ?? produto.categoria ?? '',
                      brand: produto.brand ?? produto.marca ?? '',
                      origin: produto.origin ?? produto.origem ?? '',
                      badge: produto.badge,
                      isNew: produto.isNew ?? false,
                      isExclusive: produto.isExclusive ?? false,
                      flag: produto.flag ?? '',
                      rating: produto.rating ?? 0,
                      reviews: produto.reviews ?? 0,
                      features: produto.features ?? [],
                      stock: typeof produto.stock === 'number' ? produto.stock : (typeof produto.estoque === 'number' ? produto.estoque : 0),
                      subcategory: produto.subcategory ?? ''
                    }))
                    .slice(0, visibleCounts[categoria.nome] || 8)
                  ).map((produto, idx) => (
                    <SimpleProductCard
                      key={produto.id + '-' + idx}
                      id={produto.id}
                      name={produto.name}
                      price={`R$ ${(produto.price ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                      originalPrice={typeof produto.originalPrice === 'number' ? `R$ ${produto.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : undefined}
                      image={produto.image}
                      isNew={produto.isNew}
                      category={produto.category}
                    />
                  ))}
                  {categoria.produtos.length > (visibleCounts[categoria.nome] || 8) && (
                    <div className="w-full flex justify-center mt-6">
                      <Button variant="outline" onClick={() => handleShowMore(categoria.nome, categoria.produtos.length)}>
                        Mostrar mais
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
