"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { QuickViewModal } from "@/components/quick-view-modal"
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  FilterTransition,
  CounterAnimation,
  LoadingSpinner,
} from "@/components/animated-components"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  Eye,
  ShoppingCart,
  ChevronDown,
  X,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  SlidersHorizontal,
  Grid,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 9999,
    originalPrice: 10999,
    description: "Titânio. Tão forte. Tão leve. Tão Pro.",
    category: "smartphone",
    brand: "Apple",
    badge: "Novo",
    rating: 4.9,
    reviewCount: 2847,
    colors: ["#E3D0BA", "#2C2C2C", "#4169E1", "#F5F5F5"],
    discount: 9,
    features: ["Chip A17 Pro", "Câmera Pro 48MP", "Tela Super Retina XDR", "Titânio aeroespacial"],
    inStock: true,
    storage: ["128GB", "256GB", "512GB", "1TB"],
    image: "/Produtos/Iphone 16 Pro.png",
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 19999,
    originalPrice: null,
    description: "Chip M3 Max. Performance extraordinária.",
    category: "laptop",
    brand: "Apple",
    badge: "Pro",
    rating: 4.8,
    reviewCount: 1542,
    colors: ["#2C2C2C", "#E8E8E8"],
    discount: 0,
    features: ["Chip M3 Max", "Tela Liquid Retina XDR", "Até 22h de bateria", "Ventilação avançada"],
    inStock: true,
    storage: ["512GB", "1TB", "2TB"],
    image: "/Produtos/Macbook Pro.png",
  },
  {
    id: 3,
    name: "AirPods Pro (2ª geração)",
    price: 2499,
    originalPrice: null,
    description: "Som espacial personalizado. Cancelamento de ruído adaptativo.",
    category: "headphones",
    brand: "Apple",
    badge: null,
    rating: 4.8,
    reviewCount: 3421,
    colors: ["#FFFFFF"],
    discount: 0,
    features: ["Chip H2", "Cancelamento de ruído", "Áudio espacial", "Resistente ao suor"],
    inStock: true,
    storage: [],
    image: "/Produtos/Air Pods Pro 2",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 4299,
    originalPrice: 4799,
    description: "Seu companheiro de saúde mais avançado.",
    category: "watch",
    brand: "Apple",
    badge: "Novo",
    rating: 4.7,
    reviewCount: 1876,
    colors: ["#FF69B4", "#000000", "#FFFFFF", "#FF0000"],
    discount: 10,
    features: ["Chip S9", "Tela Always-On", "Resistente à água", "GPS + Cellular"],
    inStock: true,
    storage: ["41mm", "45mm"], 
    image: "/Produtos/Watch Series 10.png",
  },
  {
    id: 5,
    name: "MacBook Air M2",
    price: 12999,
    originalPrice: 13999,
    description: "Incrivelmente fino. Extraordinariamente poderoso.",
    category: "laptop",
    brand: "Apple",
    badge: null,
    rating: 4.6,
    reviewCount: 2134,
    colors: ["#2C2C2C", "#E8E8E8", "#F5F5DC", "#4169E1"],
    discount: 7,
    features: ["Chip M2", "Tela Liquid Retina", "Até 18h de bateria", "Design ultrafino"],
    inStock: true,
    storage: ["256GB", "512GB", "1TB"], 
    image: "/Produtos/Macbook Air.png",
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    price: 8999,
    originalPrice: null,
    description: "O iPad mais avançado de todos os tempos.",
    category: "tablet",
    brand: "Apple",
    badge: "Pro",
    rating: 4.5,
    reviewCount: 987,
    colors: ["#2C2C2C", "#E8E8E8"],
    discount: 0,
    features: ["Chip M2", "Tela Liquid Retina XDR", "Compatível com Apple Pencil", "Thunderbolt"],
    inStock: true,
    storage: ["128GB", "256GB", "512GB", "1TB"], 
    image: "/Produtos/Ipad Pro.png",
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    price: 8499,
    originalPrice: 9499,
    description: "O smartphone mais avançado da Samsung com S Pen integrada.",
    category: "smartphones",
    brand: "Samsung",
    badge: "Lançamento",
    rating: 4.6,
    reviewCount: 2843,
    colors: ["#2C2C2C", "#9966CC", "#FFD700", "#708090"],
    discount: 11,
    features: ["S Pen integrada", "Câmera 200MP", "Zoom 100x", "Galaxy AI"],
    inStock: true,
    storage: ["256GB", "512GB", "1TB"],
    image: "/Produtos/Iphone 16.png",
  },
  {
    id: 8,
    name: "AirPods Pro 2",
    price: 1899,
    originalPrice: 2199,
    description: "Som espacial personalizado com cancelamento ativo de ruído.",
    category: "headphones",
    brand: "Apple",
    badge: null,
    rating: 4.8,
    reviewCount: 3456,
    colors: ["#FFFFFF"],
    discount: 14,
    features: ["Cancelamento ativo de ruído", "Som espacial", "Transparência adaptativa", "Até 6h de bateria"],
    inStock: true,
    storage: ["USB-C"],
    image: "/Produtos/Air Pods Pro 2",
  },
  {
    id: 9,
    name: "iPad Air M2",
    price: 5499,
    originalPrice: 6199,
    description: "Incrivelmente versátil. Surpreendentemente acessível.",
    category: "ipad",
    brand: "Apple",
    badge: "Novo",
    rating: 4.7,
    reviewCount: 1876,
    colors: ["#4682B4", "#9966CC", "#F5F5DC", "#2C2C2C"],
    discount: 11,
    features: ["Chip M2", "Tela Liquid Retina 10.9\"", "Compatível com Apple Pencil", "Touch ID"],
    inStock: true,
    storage: ["128GB", "256GB", "512GB"],
    image: "/Produtos/IpadAir.png",
  },
  {
    id: 10,
    name: "MacBook Pro 14\" M3",
    price: 16999,
    originalPrice: 18999,
    description: "Performance profissional com eficiência extraordinária.",
    category: "mac",
    brand: "Apple",
    badge: "Pro",
    rating: 4.9,
    reviewCount: 1234,
    colors: ["#2C2C2C", "#E8E8E8"],
    discount: 11,
    features: ["Chip M3 Pro", "Tela Liquid Retina XDR", "Até 18h de bateria", "Magic Keyboard"],
    inStock: true,
    storage: ["512GB", "1TB"],
    image: "/Produtos/Macbook Pro.png",
  },
  {
    id: 11,
    name: "Apple Watch Ultra 2",
    price: 7999,
    originalPrice: 8999,
    description: "O Apple Watch mais robusto e capaz de todos.",
    category: "watch",
    brand: "Apple",
    badge: "Ultra",
    rating: 4.8,
    reviewCount: 987,
    colors: ["#C0C0C0"],
    discount: 11,
    features: ["Caixa de titânio", "Resistente até 100m", "GPS dupla frequência", "Botão de ação"],
    inStock: true,
    storage: ["49mm"],
    image: "/Produtos/Watch Ultra 2.png",
  },
]

const categories = [
  { id: "all", name: "Todos os Produtos", count: 11 },
  { id: "smartphone", name: "iPhone", count: products.filter((p) => p.category === "smartphone" || p.category === "smartphones").length },
  { id: "laptop", name: "Mac", count: products.filter((p) => p.category === "laptop" || p.category === "mac").length },
  { id: "headphones", name: "AirPods", count: products.filter((p) => p.category === "headphones").length },
  { id: "watch", name: "Apple Watch", count: products.filter((p) => p.category === "watch").length },
  { id: "tablet", name: "iPad", count: products.filter((p) => p.category === "tablet" || p.category === "ipad").length },
]

const brands = ["Apple"]
const sortOptions = [
  { value: "relevance", label: "Mais Relevantes" },
  { value: "price-low", label: "Menor Preço" },
  { value: "price-high", label: "Maior Preço" },
  { value: "rating", label: "Melhor Avaliação" },
  { value: "newest", label: "Mais Recentes" },
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 25000])
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[0] | null>(null)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlyOnSale, setOnlyOnSale] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  // Check for search query in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get('search')
    if (searchQuery) {
      setSearchTerm(searchQuery)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)

    // Simular delay de busca para mostrar animação
    const timer = setTimeout(() => {
      let filtered = products

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
        )
      }

      // Category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter((product) => product.category === selectedCategory)
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
      }

      // Price range filter
      filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

      // Stock filter
      if (onlyInStock) {
        filtered = filtered.filter((product) => product.inStock)
      }

      // Sale filter
      if (onlyOnSale) {
        filtered = filtered.filter((product) => product.discount > 0)
      }

      // Sort
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          filtered.sort((a, b) => (b.badge === "Novo" ? 1 : 0) - (a.badge === "Novo" ? 1 : 0))
          break
        default:
          break
      }

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, selectedBrands, priceRange, sortBy, onlyInStock, onlyOnSale])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedBrands([])
    setPriceRange([0, 25000])
    setOnlyInStock(false)
    setOnlyOnSale(false)
    setSortBy("relevance")
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 25000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyOnSale ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Nossa <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Coleção</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubra produtos excepcionais com tecnologia de ponta, design premium e qualidade incomparável
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span><CounterAnimation value={filteredProducts.length} /> produtos disponíveis</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Entrega em todo Brasil</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative -mt-8 z-10"
        >
          <div className="bg-white/95 rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="Buscar produtos incríveis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base rounded-2xl border-gray-200 bg-gray-50/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-56 h-12 rounded-2xl border-gray-200 bg-gray-50/50 transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-200 shadow-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="rounded-xl">
                      <div className="flex items-center justify-between w-full">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          <CounterAnimation value={category.count} />
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 rounded-2xl border-gray-200 bg-gray-50/50 transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-gray-200 shadow-xl">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-xl">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full lg:w-auto h-12 px-6 rounded-2xl border-gray-200 bg-gray-50/50 transition-all duration-300 hover:bg-white hover:border-blue-300 hover:text-blue-600"
                >
                  <motion.div 
                    animate={{ rotate: showFilters ? 180 : 0 }} 
                    transition={{ duration: 0.3 }}
                    className="mr-2"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </motion.div>
                  Filtros Avançados
                  {activeFiltersCount > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="ml-3"
                    >
                      <Badge className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full">
                        <CounterAnimation value={activeFiltersCount} />
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl px-4 py-2 transition-all duration-300 ${
                      viewMode === "grid" 
                        ? "bg-white shadow-sm text-gray-900" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Grade
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl px-4 py-2 transition-all duration-300 ${
                      viewMode === "list" 
                        ? "bg-white shadow-sm text-gray-900" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Lista
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Advanced Filters */}
            <FilterTransition isVisible={showFilters}>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Faixa de Preço
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-3">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={25000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Marca</label>
                    <div className="space-y-3">
                      {brands.map((brand) => (
                        <motion.div
                          key={brand}
                          className="flex items-center p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Checkbox
                            id={brand}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand])
                              } else {
                                setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                              }
                            }}
                            className="rounded-lg"
                          />
                          <label htmlFor={brand} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                            {brand}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stock Filter */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Disponibilidade</label>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors" 
                        whileHover={{ x: 2 }} 
                        transition={{ duration: 0.2 }}
                      >
                        <Checkbox 
                          id="inStock" 
                          checked={onlyInStock} 
                          onCheckedChange={(checked) => setOnlyInStock(checked === true)}
                          className="rounded-lg"
                        />
                        <label htmlFor="inStock" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                          Apenas em estoque
                        </label>
                      </motion.div>
                      <motion.div 
                        className="flex items-center p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors" 
                        whileHover={{ x: 2 }} 
                        transition={{ duration: 0.2 }}
                      >
                        <Checkbox 
                          id="onSale" 
                          checked={onlyOnSale} 
                          onCheckedChange={(checked) => setOnlyOnSale(checked === true)}
                          className="rounded-lg"
                        />
                        <label htmlFor="onSale" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                          Apenas em promoção
                        </label>
                      </motion.div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full h-12 rounded-2xl border-red-200 bg-red-50/50 text-red-600 transition-all duration-300 hover:bg-red-100 hover:border-red-300 disabled:opacity-50"
                        disabled={activeFiltersCount === 0}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Limpar Filtros
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </FilterTransition>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <CounterAnimation value={filteredProducts.length} />{" "}
              {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                Resultados para <span className="font-semibold text-gray-900">&ldquo;{searchTerm}&rdquo;</span>
              </p>
            )}
          </div>
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
              <LoadingSpinner />
              <span className="text-sm font-medium text-blue-700">Atualizando resultados...</span>
            </div>
          )}
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <LoadingSpinner />
              <p className="mt-4 text-gray-600 font-medium">Carregando produtos incríveis...</p>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Não encontramos produtos que correspondam aos seus critérios. Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Limpar Todos os Filtros
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Group products by category */}
              {categories.map((category) => {
                let categoryProducts;
                
                if (category.id === "all") {
                  categoryProducts = filteredProducts;
                } else {
                  // Handle category variations
                  const categoryFilter = (product: typeof products[0]) => {
                    switch (category.id) {
                      case "smartphone":
                        return product.category === "smartphone" || product.category === "smartphones";
                      case "laptop":
                        return product.category === "laptop" || product.category === "mac";
                      case "tablet":
                        return product.category === "tablet" || product.category === "ipad";
                      default:
                        return product.category === category.id;
                    }
                  };
                  categoryProducts = filteredProducts.filter(categoryFilter);
                }
                
                if (categoryProducts.length === 0) return null;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Category Header */}
                    {selectedCategory === "all" && (
                      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                              {category.id === "smartphone" ? (
                                <Smartphone className="h-6 w-6 text-white" />
                              ) : category.id === "laptop" ? (
                                <Laptop className="h-6 w-6 text-white" />
                              ) : category.id === "headphones" ? (
                                <Headphones className="h-6 w-6 text-white" />
                              ) : category.id === "watch" ? (
                                <Watch className="h-6 w-6 text-white" />
                              ) : category.id === "tablet" ? (
                                <Tablet className="h-6 w-6 text-white" />
                              ) : (
                                <span className="text-lg font-bold text-white">
                                  {category.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                <CounterAnimation value={categoryProducts.length} />
                              </span>
                            </div>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                              {category.name}
                            </h2>
                            <p className="text-gray-600 font-medium text-sm">
                              <CounterAnimation value={categoryProducts.length} />{" "}
                              {categoryProducts.length === 1 ? "produto disponível" : "produtos disponíveis"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="rounded-xl border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 px-4 py-2 font-medium transition-all duration-300"
                        >
                          Ver Todos
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Products Grid/List for this category */}
                    <div className={viewMode === "grid" ? "grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : "space-y-6"}>
                      <StaggerContainer>
                        {categoryProducts.map((product, index) => (
                          <StaggerItem key={product.id}>
                            <div className="group h-full">
                              {viewMode === "grid" ? (
                                // Grid View - Compact & Redesigned
                                <HoverScale scale={1.03}>
                                  <Card className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border-0 h-full flex flex-col group">
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 overflow-hidden">
                                      <motion.div
                                        whileHover={{ scale: 1.08, rotate: 1 }}
                                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="relative w-full h-full"
                                      >
                                        <Image
                                          src={product.image || "/placeholder.svg"}
                                          alt={product.name}
                                          fill
                                          className="object-contain"
                                        />
                                      </motion.div>

                                      {/* Badges */}
                                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                                        <AnimatePresence>
                                          {product.badge && (
                                            <motion.div
                                              key={`badge-${product.id}`}
                                              initial={{ scale: 0, opacity: 0, x: -15 }}
                                              animate={{ scale: 1, opacity: 1, x: 0 }}
                                              exit={{ scale: 0, opacity: 0, x: -15 }}
                                              transition={{ duration: 0.3, type: "spring" }}
                                            >
                                              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-2 py-1 text-xs font-bold shadow-md">
                                                {product.badge}
                                              </Badge>
                                            </motion.div>
                                          )}
                                          {product.discount > 0 && (
                                            <motion.div
                                              key={`discount-${product.id}`}
                                              initial={{ scale: 0, opacity: 0, x: -15 }}
                                              animate={{ scale: 1, opacity: 1, x: 0 }}
                                              exit={{ scale: 0, opacity: 0, x: -15 }}
                                              transition={{ duration: 0.3, delay: 0.1, type: "spring" }}
                                            >
                                              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-2 py-1 text-xs font-bold shadow-md">
                                                -<CounterAnimation value={product.discount} />%
                                              </Badge>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <motion.div
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 border border-gray-100 p-0"
                                            onClick={() => setQuickViewProduct(product)}
                                          >
                                            <Eye className="h-4 w-4 text-gray-700" />
                                          </Button>
                                        </motion.div>
                                        <motion.div
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 border border-gray-100 p-0"
                                            onClick={() => toggleFavorite(product.id)}
                                          >
                                            <motion.div
                                              animate={{
                                                scale: favorites.includes(product.id) ? [1, 1.2, 1] : 1,
                                                color: favorites.includes(product.id) ? "#ef4444" : "#6b7280",
                                              }}
                                              transition={{ duration: 0.3 }}
                                            >
                                              <Heart
                                                className={`h-4 w-4 transition-all duration-300 ${favorites.includes(product.id) ? "fill-current" : ""}`}
                                              />
                                            </motion.div>
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>

                                    {/* Product Info */}
                                    <CardContent className="p-4 flex-1 flex flex-col">
                                      {/* Brand & Rating */}
                                      <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary" className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600">
                                          {product.brand}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                          <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                                        </div>
                                      </div>

                                      {/* Product Name */}
                                      <Link href={`/product/${product.id}`}>
                                        <motion.h3
                                          className="text-sm font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300 cursor-pointer line-clamp-2 min-h-[2.5rem]"
                                          whileHover={{ x: 1 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          {product.name}
                                        </motion.h3>
                                      </Link>

                                      {/* Description */}
                                      <p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-2 flex-1">
                                        {product.description}
                                      </p>

                                      {/* Price */}
                                      <div className="mb-3">
                                        <div className="flex items-center gap-1 mb-1">
                                          <span className="text-lg font-bold text-gray-900">
                                            {formatPrice(product.price)}
                                          </span>
                                          {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                              {formatPrice(product.originalPrice)}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md">
                                          12x sem juros
                                        </span>
                                      </div>

                                      {/* CTA Button */}
                                      <Link href={`/product/${product.id}`} className="block">
                                        <motion.div whileTap={{ scale: 0.98 }}>
                                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                                            <ShoppingCart className="h-4 w-4 mr-1" />
                                            Ver Produto
                                          </Button>
                                        </motion.div>
                                      </Link>
                                    </CardContent>
                                  </Card>
                                </HoverScale>
                              ) : (
                                // List View - Compact & Redesigned
                                <HoverScale scale={1.01}>
                                  <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-400 border-0 overflow-hidden">
                                    <CardContent className="p-6">
                                      <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Product Image */}
                                        <div className="relative w-full lg:w-48 h-48 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                          <motion.div 
                                            whileHover={{ scale: 1.05 }} 
                                            transition={{ duration: 0.3 }}
                                            className="relative w-full h-full p-4"
                                          >
                                            <Image
                                              src={product.image || "/placeholder.svg"}
                                              alt={product.name}
                                              fill
                                              className="object-contain"
                                            />
                                          </motion.div>
                                          
                                          {/* Badges */}
                                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                                            <AnimatePresence>
                                              {product.badge && (
                                                <motion.div
                                                  key={`badge-${product.id}`}
                                                  initial={{ scale: 0, opacity: 0 }}
                                                  animate={{ scale: 1, opacity: 1 }}
                                                  exit={{ scale: 0, opacity: 0 }}
                                                  transition={{ duration: 0.3 }}
                                                >
                                                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-2 py-1 text-xs font-bold shadow-md">
                                                    {product.badge}
                                                  </Badge>
                                                </motion.div>
                                              )}
                                              {product.discount > 0 && (
                                                <motion.div
                                                  key={`discount-${product.id}`}
                                                  initial={{ scale: 0, opacity: 0 }}
                                                  animate={{ scale: 1, opacity: 1 }}
                                                  exit={{ scale: 0, opacity: 0 }}
                                                  transition={{ duration: 0.3, delay: 0.1 }}
                                                >
                                                  <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-2 py-1 text-xs font-bold shadow-md">
                                                    -<CounterAnimation value={product.discount} />%
                                                  </Badge>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                          <div>
                                            {/* Header */}
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                  <Badge variant="secondary" className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600">
                                                    {product.brand}
                                                  </Badge>
                                                  <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                                                    <span className="text-sm text-gray-500">
                                                      (<CounterAnimation value={product.reviewCount} />)
                                                    </span>
                                                  </div>
                                                </div>

                                                <Link href={`/product/${product.id}`}>
                                                  <motion.h3
                                                    className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer leading-tight"
                                                    whileHover={{ x: 2 }}
                                                    transition={{ duration: 0.2 }}
                                                  >
                                                    {product.name}
                                                  </motion.h3>
                                                </Link>

                                                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                                  {product.description}
                                                </p>

                                                {/* Features */}
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                  {product.features.slice(0, 3).map((feature, featureIndex) => (
                                                    <motion.div
                                                      key={`${product.id}-feature-${featureIndex}`}
                                                      initial={{ opacity: 0, scale: 0.8 }}
                                                      animate={{ opacity: 1, scale: 1 }}
                                                      transition={{ delay: featureIndex * 0.1 }}
                                                    >
                                                      <Badge
                                                        variant="outline"
                                                        className="text-xs px-2 py-1 bg-gray-50 border-gray-200 text-gray-600 font-medium rounded-lg"
                                                      >
                                                        {feature}
                                                      </Badge>
                                                    </motion.div>
                                                  ))}
                                                </div>
                                              </div>

                                              {/* Price & Actions */}
                                              <div className="flex flex-col items-end gap-4 lg:min-w-[240px]">
                                                <div className="text-right">
                                                  <div className="flex items-center gap-2 justify-end mb-1">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                      {formatPrice(product.price)}
                                                    </span>
                                                    {product.originalPrice && (
                                                      <span className="text-lg text-gray-400 line-through">
                                                        {formatPrice(product.originalPrice)}
                                                      </span>
                                                    )}
                                                  </div>
                                                  <div className="flex justify-end">
                                                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">
                                                      12x sem juros
                                                    </span>
                                                  </div>
                                                </div>

                                                <div className="flex gap-2 w-full">
                                                  <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => setQuickViewProduct(product)}
                                                      className="rounded-xl border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 transition-all duration-300"
                                                    >
                                                      <Eye className="h-4 w-4" />
                                                    </Button>
                                                  </motion.div>
                                                  <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => toggleFavorite(product.id)}
                                                      className="rounded-xl border-gray-200 bg-gray-50 hover:bg-red-50 px-3 py-2 transition-all duration-300"
                                                    >
                                                      <motion.div
                                                        animate={{
                                                          scale: favorites.includes(product.id) ? [1, 1.2, 1] : 1,
                                                          color: favorites.includes(product.id) ? "#ef4444" : "#6b7280",
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                      >
                                                        <Heart
                                                          className={`h-4 w-4 transition-all duration-300 ${favorites.includes(product.id) ? "fill-current" : ""}`}
                                                        />
                                                      </motion.div>
                                                    </Button>
                                                  </motion.div>
                                                  <Link href={`/product/${product.id}`} className="flex-1">
                                                    <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                                                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        Ver Produto
                                                      </Button>
                                                    </motion.div>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </HoverScale>
                              )}
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Section */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-100">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Encontrou o que procurava?
                </h3>
                <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Explore nossa coleção completa com mais de 500 produtos Apple autênticos
                  e encontre a tecnologia perfeita para você.
                </p>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Ver Mais Produtos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="rounded-xl border-gray-200 bg-white hover:bg-gray-50 px-6 py-3 font-medium transition-all duration-300"
                  >
                    Falar com Especialista
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* No Results State */}
        {filteredProducts.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-16 border border-gray-200">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Search className="mx-auto h-20 w-20 text-gray-400 mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Não encontramos produtos que correspondam aos seus critérios de busca.
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("todos")
                      setPriceRange([0, 50000])
                      setSelectedBrands([])
                      setSortBy("relevancia")
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Limpar Filtros
                    <RotateCcw className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  )
}
