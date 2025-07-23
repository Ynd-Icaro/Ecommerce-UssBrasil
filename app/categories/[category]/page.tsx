"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react"

// Dados mockados para diferentes categorias
const categoryData = {
  iphone: {
    title: "iPhone",
    subtitle: "A experiência iPhone mais avançada",
    description:
      "Descubra a linha completa de iPhones com tecnologia de ponta, design premium e performance excepcional.",
    bannerImage: "/Produtos/Iphone 16 Pro.png",
    bannerVideo: "/Videos/IphoneVideo.mp4",
    bannerGradient: "from-blue-600 to-purple-700",
    filters: {
      brands: ["Apple"],
      colors: ["Preto", "Branco", "Azul", "Verde", "Roxo"],
      storage: ["128GB", "256GB", "512GB", "1TB"],
    },
  },
  mac: {
    title: "Mac",
    subtitle: "Poder surpreendente. Portabilidade extraordinária",
    description:
      "MacBooks e iMacs com chips Apple Silicon para performance revolucionária e eficiência energética incomparável.",
    bannerImage: "/Produtos/Macbook Pro.png",
    bannerVideo: "/Videos/Macs Video.mp4",
    bannerGradient: "from-gray-800 to-gray-600",
    filters: {
      brands: ["Apple"],
      colors: ["Cinza Espacial", "Prateado", "Azul"],
      storage: ["256GB", "512GB", "1TB", "2TB"],
    },
  },
  headphones: {
    title: "AirPods",
    subtitle: "Som espacial. Experiência mágica",
    description: "Áudio imersivo com cancelamento de ruído adaptativo e qualidade sonora excepcional.",
    bannerImage: "/Produtos/Air Pods Pro 2",
    bannerVideo: "/Videos/AirPods Video.webm",
    bannerGradient: "from-indigo-600 to-blue-600",
    filters: {
      brands: ["Apple"],
      colors: ["Branco", "Preto"],
      features: ["Bluetooth", "Cancelamento de Ruído", "Resistente à Água"],
    },
  },
  watch: {
    title: "Apple Watch",
    subtitle: "Seu companheiro de saúde no pulso",
    description: "Relógios inteligentes que combinam tecnologia avançada com design elegante para cuidar da sua saúde.",
    bannerImage: "/Produtos/Watch Ultra 2.png",
    bannerVideo: "/Videos/Apple Watch.mp4",
    bannerGradient: "from-red-600 to-pink-600",
    filters: {
      brands: ["Apple"],
      colors: ["Preto", "Branco", "Azul", "Verde", "Vermelho"],
      features: ["GPS", "Monitoramento de Saúde", "Resistente à Água"],
    },
  },
  ipad: {
    title: "iPad",
    subtitle: "Versátil. Poderoso. Mágico.",
    description: "iPads para criatividade, produtividade e entretenimento com tela Liquid Retina.",
    bannerImage: "/Produtos/Ipad Pro.png",
    bannerVideo: "/Videos/IpadVideo.mp4",
    bannerGradient: "from-purple-600 to-indigo-600",
    filters: {
      brands: ["Apple"],
      colors: ["Cinza Espacial", "Prateado"],
      storage: ["64GB", "256GB", "512GB", "1TB"],
    },
  },
}

// Lista de produtos mockados
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    brand: "Apple",
    basePrice: 9999,
    category: "smartphones",
    rating: 4.9,
    reviewCount: 2847,
    description: "O iPhone mais avançado já criado com design em titânio.",
    isNew: true,
    badge: "Lançamento",
    discount: 9,
    variations: [
      { color: "Titânio Natural", colorCode: "#E3D0BA", storage: "256GB", price: 9999, inStock: true },
      { color: "Titânio Natural", colorCode: "#E3D0BA", storage: "512GB", price: 11999, inStock: true },
      { color: "Titânio Natural", colorCode: "#E3D0BA", storage: "1TB", price: 13999, inStock: true },
      { color: "Titânio Preto", colorCode: "#2C2C2C", storage: "256GB", price: 9999, inStock: true },
      { color: "Titânio Preto", colorCode: "#2C2C2C", storage: "512GB", price: 11999, inStock: false },
      { color: "Titânio Azul", colorCode: "#4169E1", storage: "256GB", price: 9999, inStock: true },
      { color: "Titânio Branco", colorCode: "#F5F5F5", storage: "256GB", price: 9999, inStock: true },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Chip A17 Pro", "Câmera 48MP", "Até 29h de bateria", "Titânio de qualidade aeroespacial"],
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    slug: "macbook-pro-16",
    brand: "Apple",
    basePrice: 19999,
    category: "laptops",
    rating: 4.8,
    reviewCount: 1542,
    description: "Impressionante chip M3 Max para performance extraordinária.",
    isNew: true,
    badge: "Pro",
    discount: 5,
    variations: [
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "512GB", price: 19999, inStock: true },
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "1TB", price: 22999, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "512GB", price: 19999, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "1TB", price: 22999, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Chip M3 Max", "Tela Liquid Retina XDR", "Até 22h de bateria", "Ventilação avançada"],
  },
  {
    id: 3,
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    brand: "Apple",
    basePrice: 7999,
    category: "smartphones",
    rating: 4.7,
    reviewCount: 3254,
    description: "Dynamic Island. Câmera Pro. Chip A16 Bionic.",
    isNew: false,
    badge: null,
    discount: 15,
    variations: [
      { color: "Roxo Profundo", colorCode: "#5E2C5F", storage: "128GB", price: 7999, inStock: true },
      { color: "Roxo Profundo", colorCode: "#5E2C5F", storage: "256GB", price: 8999, inStock: true },
      { color: "Dourado", colorCode: "#FAD5A5", storage: "128GB", price: 7999, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "128GB", price: 7999, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Dynamic Island", "Câmera 48MP", "A16 Bionic", "Tela Always-On"],
  },
  {
    id: 4,
    name: "AirPods Pro (2ª geração)",
    slug: "airpods-pro-2",
    brand: "Apple",
    basePrice: 2499,
    category: "headphones",
    rating: 4.8,
    reviewCount: 3254,
    description: "Áudio imersivo com cancelamento de ruído adaptativo.",
    isNew: false,
    badge: null,
    discount: 0,
    variations: [{ color: "Branco", colorCode: "#FFFFFF", storage: "N/A", price: 2499, inStock: true }],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Cancelamento de ruído adaptativo", "Áudio espacial", "Até 6h de bateria", "Resistente ao suor"],
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    brand: "Apple",
    basePrice: 4999,
    category: "watches",
    rating: 4.7,
    reviewCount: 1876,
    description: "Poderoso relógio com recursos avançados de saúde.",
    isNew: true,
    badge: "Novo",
    discount: 0,
    variations: [
      { color: "Meia-noite", colorCode: "#1D1D1F", storage: "45mm", price: 4999, inStock: true },
      { color: "Meia-noite", colorCode: "#1D1D1F", storage: "41mm", price: 4499, inStock: true },
      { color: "Estelar", colorCode: "#F5F5DC", storage: "45mm", price: 4999, inStock: true },
      { color: "Product RED", colorCode: "#FF0000", storage: "45mm", price: 4999, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Tela Always-On", "ECG", "GPS", "Resistente à água até 50m"],
  },
  {
    id: 6,
    name: "MacBook Air M2",
    slug: "macbook-air-m2",
    brand: "Apple",
    basePrice: 11699,
    category: "laptops",
    rating: 4.6,
    reviewCount: 2156,
    description: "Incrivelmente fino. Extraordinariamente capaz.",
    isNew: false,
    badge: null,
    discount: 10,
    variations: [
      { color: "Meia-noite", colorCode: "#2C2C2C", storage: "256GB", price: 11699, inStock: true },
      { color: "Meia-noite", colorCode: "#2C2C2C", storage: "512GB", price: 13699, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "256GB", price: 11699, inStock: true },
      { color: "Dourado", colorCode: "#FAD5A5", storage: "256GB", price: 11699, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Chip M2", "Tela Liquid Retina", "Até 18h de bateria", "Design ultrafino"],
  },
  {
    id: 7,
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    brand: "Xiaomi",
    basePrice: 6999,
    category: "smartphones",
    rating: 4.5,
    reviewCount: 1234,
    description: "Fotografia profissional no seu bolso.",
    isNew: true,
    badge: "Novo",
    discount: 0,
    variations: [
      { color: "Preto", colorCode: "#000000", storage: "512GB", price: 6999, inStock: true },
      { color: "Branco", colorCode: "#FFFFFF", storage: "512GB", price: 6999, inStock: true },
      { color: "Verde", colorCode: "#2E8B57", storage: "512GB", price: 6999, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Câmera Leica", "Snapdragon 8 Gen 3", "Carregamento 120W", "Tela AMOLED 120Hz"],
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    basePrice: 8499,
    category: "smartphones",
    rating: 4.6,
    reviewCount: 2843,
    description: "O smartphone mais avançado da Samsung com S Pen integrada.",
    isNew: true,
    badge: "Lançamento",
    discount: 0,
    variations: [
      { color: "Titânio Preto", colorCode: "#2C2C2C", storage: "256GB", price: 8499, inStock: true },
      { color: "Titânio Violeta", colorCode: "#9966CC", storage: "256GB", price: 8499, inStock: true },
      { color: "Titânio Amarelo", colorCode: "#FFD700", storage: "512GB", price: 9499, inStock: true },
      { color: "Titânio Cinza", colorCode: "#708090", storage: "1TB", price: 11499, inStock: false },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["S Pen integrada", "Câmera 200MP", "Zoom 100x", "Galaxy AI"],
  },
  {
    id: 9,
    name: "AirPods Pro 2",
    slug: "airpods-pro-2",
    brand: "Apple",
    basePrice: 1899,
    category: "headphones",
    rating: 4.8,
    reviewCount: 3456,
    description: "Som espacial personalizado com cancelamento ativo de ruído.",
    isNew: false,
    badge: null,
    discount: 15,
    variations: [
      { color: "Branco", colorCode: "#FFFFFF", storage: "USB-C", price: 1899, inStock: true },
    ],
    images: [
      "/Produtos/Air Pods Pro 2",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Cancelamento ativo de ruído", "Som espacial", "Transparência adaptativa", "Até 6h de bateria"],
  },
  {
    id: 10,
    name: "iPad Air M2",
    slug: "ipad-air-m2",
    brand: "Apple",
    basePrice: 5499,
    category: "ipad",
    rating: 4.7,
    reviewCount: 1876,
    description: "Incrivelmente versátil. Surpreendentemente acessível.",
    isNew: true,
    badge: "Novo",
    discount: 0,
    variations: [
      { color: "Azul", colorCode: "#4682B4", storage: "128GB", price: 5499, inStock: true },
      { color: "Roxo", colorCode: "#9966CC", storage: "256GB", price: 6499, inStock: true },
      { color: "Estelar", colorCode: "#F5F5DC", storage: "128GB", price: 5499, inStock: true },
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "512GB", price: 7499, inStock: false },
    ],
    images: [
      "/Produtos/IpadAir.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Chip M2", "Tela Liquid Retina 10.9\"", "Compatível com Apple Pencil", "Touch ID"],
  },
  {
    id: 11,
    name: "MacBook Pro 14\" M3",
    slug: "macbook-pro-14-m3",
    brand: "Apple",
    basePrice: 16999,
    category: "mac",
    rating: 4.9,
    reviewCount: 1234,
    description: "Performance profissional com eficiência extraordinária.",
    isNew: true,
    badge: "Pro",
    discount: 0,
    variations: [
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "512GB", price: 16999, inStock: true },
      { color: "Prateado", colorCode: "#E8E8E8", storage: "512GB", price: 16999, inStock: true },
      { color: "Cinza Espacial", colorCode: "#2C2C2C", storage: "1TB", price: 19999, inStock: true },
    ],
    images: [
      "/Produtos/Macbook Pro.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Chip M3 Pro", "Tela Liquid Retina XDR", "Até 18h de bateria", "Magic Keyboard"],
  },
  {
    id: 12,
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    brand: "Apple",
    basePrice: 7999,
    category: "watch",
    rating: 4.8,
    reviewCount: 987,
    description: "O Apple Watch mais robusto e capaz de todos.",
    isNew: true,
    badge: "Ultra",
    discount: 0,
    variations: [
      { color: "Titânio Natural", colorCode: "#C0C0C0", storage: "49mm", price: 7999, inStock: true },
    ],
    images: [
      "/Produtos/Watch Ultra 2.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: ["Caixa de titânio", "Resistente até 100m", "GPS dupla frequência", "Botão de ação"],
  },
]

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [viewLayout, setViewLayout] = useState<"grid" | "large">("large")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 25000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products.filter(p => p.category === 'iphone'))
  const [category, setCategory] = useState<string>('iphone')

  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setCategory(resolvedParams.category)
    }
    getParams()
  }, [params])

  const categoryInfo = categoryData[category as keyof typeof categoryData]

  useEffect(() => {
    let filtered = products.filter((product) => product.category === category)

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.variations.some((variation) => selectedColors.includes(variation.color)),
      )
    }

    filtered = filtered.filter((product) => product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1])

    if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.basePrice - b.basePrice)
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.basePrice - a.basePrice)
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "newest") {
      filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    setFilteredProducts(filtered)
  }, [category, selectedBrands, selectedColors, priceRange, sortBy])

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleColorFilter = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedColors([])
    setPriceRange([0, 25000])
  }

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      if (productsRef.current) {
        gsap.fromTo(
          productsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: productsRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }

    loadGSAP()
  }, [filteredProducts])

  if (!categoryInfo) {
    return <div>Categoria não encontrada</div>
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Banner with Video Background */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={categoryInfo.bannerVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {categoryInfo.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-6 max-w-2xl"
          >
            {categoryInfo.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl"
          >
            {categoryInfo.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Button className="bg-[#00CED1] hover:bg-[#20B2AA] text-white px-8 py-3 text-lg">
              Explorar Produtos
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center h-12 px-6 rounded-xl border-gray-200 bg-transparent"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            <Tabs
              value={viewLayout}
              onValueChange={(v) => setViewLayout(v as "grid" | "large")}
              className="hidden sm:flex"
            >
              <TabsList className="bg-gray-100 border-0 rounded-xl">
                <TabsTrigger value="large" className="data-[state=active]:bg-white rounded-lg">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="grid" className="data-[state=active]:bg-white rounded-lg">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center h-12 px-6 rounded-xl border-gray-200 bg-transparent"
                >
                  Ordenar por
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("relevance")}>Mais relevantes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>Menor preço</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>Maior preço</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("rating")}>Mais avaliados</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>Lançamentos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 text-right">
            <p className="text-gray-600 text-lg">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-900">Faixa de Preço</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={25000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {priceRange[0].toLocaleString()}</span>
                      <span>R$ {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-900">Marcas</h3>
                  <div className="space-y-2">
                    {categoryInfo.filters.brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrandFilter(brand)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-900">Cores</h3>
                  <div className="space-y-2">
                    {categoryInfo.filters.colors.map((color) => (
                      <label key={color} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColorFilter(color)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid - IMPROVED CARDS */}
        {filteredProducts.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-16 bg-gray-50">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Não encontramos produtos que correspondam aos filtros selecionados.
              </p>
              <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl">
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div
            className={`grid gap-8 ${
              viewLayout === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            }`}
            ref={productsRef}
          >
            {filteredProducts.map((product) => {
              const availableVariations = product.variations.filter((v) => v.inStock)
              const lowestPrice = Math.min(...product.variations.map((v) => v.price))
              const originalPrice = product.discount > 0 ? Math.round(lowestPrice / (1 - product.discount / 100)) : null

              return (
                <div key={product.id} className="group cursor-pointer">
                  <Card
                    className={`relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-3 border-0 ${
                      viewLayout === "large" ? "flex flex-col" : ""
                    }`}
                  >
                    {/* Product Image Container */}
                    <div
                      className={`relative ${
                        viewLayout === "large" ? "aspect-[4/3]" : "aspect-square"
                      } bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 overflow-hidden`}
                    >
                      <div className="absolute inset-0 p-8">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {product.badge && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 px-3 py-1.5 text-xs font-semibold shadow-lg">
                            {product.badge}
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 px-3 py-1.5 text-xs font-semibold shadow-lg">
                            -{product.discount}% OFF
                          </Badge>
                        )}
                        {availableVariations.length === 0 && (
                          <Badge className="bg-gray-500 text-white border-0 px-3 py-1.5 text-xs font-semibold shadow-lg">
                            Esgotado
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:scale-110 transition-all duration-200"
                        >
                          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:scale-110 transition-all duration-200"
                        >
                          <Eye className="h-5 w-5 text-gray-600 hover:text-blue-500 transition-colors" />
                        </Button>
                      </div>

                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <Link href={`/product/${product.slug}`}>
                            <Button
                              size="sm"
                              className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white px-6 py-2.5 rounded-full shadow-lg font-semibold"
                            >
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {/* Brand and Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {product.brand}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                          <span className="text-xs text-gray-400">({product.reviewCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2 flex-1">
                        {product.description}
                      </p>

                      {/* Features */}
                      {product.features && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs px-2 py-1 bg-gray-50 border-gray-200 text-gray-600"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Color Options */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-medium text-gray-500">Cores:</span>
                        <div className="flex gap-1.5">
                          {product.variations.slice(0, 4).map((variation, colorIndex) => (
                            <div
                              key={colorIndex}
                              className={`w-5 h-5 rounded-full border-2 transition-colors cursor-pointer hover:scale-110 transform duration-200 ${
                                variation.inStock
                                  ? "border-gray-200 hover:border-gray-400"
                                  : "border-gray-300 opacity-50"
                              }`}
                              style={{ backgroundColor: variation.colorCode }}
                              title={variation.color}
                            />
                          ))}
                          {product.variations.length > 4 && (
                            <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
                              +{product.variations.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-gray-900">
                            A partir de R$ {lowestPrice.toLocaleString()}
                          </span>
                          {originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              R$ {originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-green-600 font-medium">Em até 12x sem juros</span>
                      </div>

                      {/* Action Button */}
                      <Link href={`/product/${product.slug}`} className="mt-auto">
                        <Button
                          className={`w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                            availableVariations.length > 0
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={availableVariations.length === 0}
                        >
                          {availableVariations.length > 0 ? (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Ver Opções
                            </>
                          ) : (
                            "Produto Esgotado"
                          )}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
