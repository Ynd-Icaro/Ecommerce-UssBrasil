"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  ShoppingCart,
  Star,
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react"
import { useVideoCategories } from "@/hooks/use-video-categories"
import { ProductCard } from "@/components/ProductCard"

const categoryData = {
  iphone: {
    title: "iPhone",
    subtitle: "A experiência iPhone mais avançada",
    description: "Descubra a linha completa de iPhones com tecnologia de ponta, design premium e performance excepcional.",
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    videoKeywords: ["iphone", "ios", "smartphone"]
  },
  mac: {
    title: "Mac",
    subtitle: "Poder surpreendente. Portabilidade extraordinária", 
    description: "MacBooks e iMacs com chips Apple Silicon para performance revolucionária e eficiência energética incomparável.",
    gradient: "from-gray-700 via-gray-800 to-black",
    videoKeywords: ["mac", "macbook", "imac", "laptop"]
  },
  ipad: {
    title: "iPad",
    subtitle: "Versatilidade que vai além da imaginação",
    description: "iPads com tela líquida Retina, performance profissional e suporte ao Apple Pencil para máxima criatividade.",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    videoKeywords: ["ipad", "tablet"]
  },
  watch: {
    title: "Apple Watch",
    subtitle: "Seu companheiro de saúde no pulso",
    description: "Relógios inteligentes que combinam tecnologia avançada com design elegante para cuidar da sua saúde.",
    gradient: "from-red-500 via-pink-500 to-rose-600",
    videoKeywords: ["watch", "apple watch", "smartwatch"]
  },
  airpods: {
    title: "AirPods",
    subtitle: "Áudio mágico ao alcance dos seus ouvidos",
    description: "Fones de ouvido sem fio com cancelamento de ruído ativo, áudio espacial e qualidade de som excepcional.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    videoKeywords: ["airpods", "headphones", "audio"]
  },
  "xiomi-ultra": {
    title: "Xiaomi Ultra",
    subtitle: "Tecnologia avançada ao seu alcance",
    description: "Smartphones Xiaomi com design premium, performance excepcional e tecnologia de ponta a preços acessíveis.",
    gradient: "from-orange-500 via-red-500 to-pink-600", 
    videoKeywords: ["xiaomi", "android", "smartphone"]
  },
  dji: {
    title: "DJI",
    subtitle: "Capture momentos únicos do alto",
    description: "Drones e equipamentos de filmagem DJI com tecnologia de estabilização avançada e qualidade cinematográfica.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    videoKeywords: ["dji", "drone", "camera"]
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isNew: boolean;
  inStock: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max", 
    price: 9999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 2847,
    image: "/Produtos/Iphone 16 Pro.png",
    category: "iphone",
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 8999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 1892,
    image: "/Produtos/Iphone 16.png",
    category: "iphone",
    isNew: true,
    inStock: true
  },
  {
    id: 3,
    name: "iPhone 15",
    price: 6999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 3241,
    image: "/Produtos/Iphone 16e.png",
    category: "iphone",
    isNew: false,
    inStock: true
  },
  {
    id: 4,
    name: "MacBook Pro 16\"",
    price: 19999,
    originalPrice: 21999,
    rating: 4.8,
    reviews: 1542,
    image: "/Produtos/Macbook Pro.png",
    category: "mac",
    isNew: true,
    inStock: true
  },
  {
    id: 5,
    name: "MacBook Air 15\"",
    price: 12999,
    originalPrice: 13999,
    rating: 4.7,
    reviews: 2156,
    image: "/Produtos/Macbook Air.png",
    category: "mac",
    isNew: false,
    inStock: true
  },
  {
    id: 6,
    name: "iMac 24\"",
    price: 15999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 892,
    image: "/Produtos/Imac.png",
    category: "mac",
    isNew: false,
    inStock: true
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    price: 6999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 892,
    image: "/Produtos/Watch Ultra 2.png",
    category: "watch",
    isNew: false,
    inStock: true
  },
  {
    id: 8,
    name: "Apple Watch Series 10",
    price: 3999,
    originalPrice: 4299,
    rating: 4.6,
    reviews: 1654,
    image: "/Produtos/Watch Series 10.png",
    category: "watch",
    isNew: true,
    inStock: true
  },
  {
    id: 9,
    name: "Apple Watch SE",
    price: 2499,
    originalPrice: 2799,
    rating: 4.5,
    reviews: 2341,
    image: "/Produtos/Watch SE.png",
    category: "watch",
    isNew: false,
    inStock: true
  },
  {
    id: 10,
    name: "iPad Pro 12.9\"",
    price: 11999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 1456,
    image: "/Produtos/Ipad Pro.png",
    category: "ipad",
    isNew: true,
    inStock: true
  },
  {
    id: 11,
    name: "iPad Air",
    price: 5999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 2134,
    image: "/Produtos/IpadAir.png",
    category: "ipad",
    isNew: false,
    inStock: true
  },
  {
    id: 12,
    name: "iPad",
    price: 3499,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 3287,
    image: "/Produtos/Ipad.png",
    category: "ipad",
    isNew: false,
    inStock: true
  },
  {
    id: 13,
    name: "iPad Mini",
    price: 4999,
    originalPrice: 5299,
    rating: 4.5,
    reviews: 1876,
    image: "/Produtos/IpadMini.png",
    category: "ipad",
    isNew: false,
    inStock: true
  },
  {
    id: 14,
    name: "AirPods Pro 2",
    price: 2499,
    originalPrice: 2799,
    rating: 4.8,
    reviews: 4521,
    image: "/Produtos/Air Pods Pro 2",
    category: "airpods",
    isNew: true,
    inStock: true
  },
  {
    id: 15,
    name: "AirPods Max",
    price: 4999,
    originalPrice: 5299,
    rating: 4.7,
    reviews: 2134,
    image: "/Produtos/Air Pods Max.png",
    category: "airpods",
    isNew: false,
    inStock: true
  },
  {
    id: 16,
    name: "AirPods 4",
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 3876,
    image: "/Produtos/Air Pods 4",
    category: "airpods",
    isNew: true,
    inStock: true
  },
  {
    id: 17,
    name: "Xiaomi 14 Ultra",
    price: 4999,
    originalPrice: 5499,
    rating: 4.6,
    reviews: 1247,
    image: "/Produtos/acessorios/airpods-4-anc-select-202409.png",
    category: "xiomi-ultra",
    isNew: true,
    inStock: true
  },
  {
    id: 18,
    name: "DJI Mini 4 Pro",
    price: 8999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 567,
    image: "/Produtos/acessorios/airpods-4-anc-select-202409.png",
    category: "dji",
    isNew: true,
    inStock: true
  }
]

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const { videoCategories } = useVideoCategories()
  
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  
  const categoryInfo = categoryData[category as keyof typeof categoryData]
  
  const categoryVideo = categoryInfo ? 
    videoCategories.find((vc: any) => 
      categoryInfo.videoKeywords.some(keyword => 
        vc.keywords.includes(keyword)
      )
    )?.videoPath : null
  
  const filteredProducts = mockProducts.filter(product => 
    product.category === category &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <Link href="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero/Video Section */}
      {categoryVideo && (
        <section className="relative h-[60vh] overflow-hidden rounded-b-3xl shadow-xl mb-8">
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.gradient}`}></div>
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            autoPlay={isVideoPlaying}
            muted={isVideoMuted}
            loop
            playsInline
          >
            <source src={categoryVideo} type="video/mp4" />
          </video>
          <div className="absolute top-6 right-6 flex gap-2 z-20">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            >
              {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setIsVideoMuted(!isVideoMuted)}
            >
              {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <motion.div
                className="max-w-2xl text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-5xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {categoryInfo.title}
                </motion.h1>
                <motion.p
                  className="text-xl lg:text-2xl mb-4 text-white/90"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {categoryInfo.subtitle}
                </motion.p>
                <motion.p
                  className="text-lg text-white/80 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {categoryInfo.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    Explorar Produtos
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
      {/* Filtros Modernos */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-44 bg-gray-50 border-gray-300">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
                <SelectItem value="newest">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Preço:</span>
              <div className="w-32">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  step={500}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                R$ {priceRange[0]} - R$ {priceRange[1]}
              </span>
            </div>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
              <TabsList className="grid w-fit grid-cols-2 bg-gray-100 border-gray-300">
                <TabsTrigger value="grid">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <span className="text-sm text-gray-600">{sortedProducts.length} produtos encontrados</span>
        </div>
      </section>
      {/* Produtos */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 max-w-4xl mx-auto'}`}
            layout
          >
            <AnimatePresence>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {sortedProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros para ver mais opções
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 50000])
                  setSortBy('relevance')
                }}
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
