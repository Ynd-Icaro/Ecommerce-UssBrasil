"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react"
import { useVideoCategories } from "@/hooks/use-video-categories"
import { ProductCard } from '@/components/product/ProductCard'

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
  watch: {
    title: "Apple Watch",
    subtitle: "Seu companheiro de saúde no pulso",
    description: "Relógios inteligentes que combinam tecnologia avançada com design elegante para cuidar da sua saúde.",
    gradient: "from-red-500 via-pink-500 to-rose-600",
    videoKeywords: ["watch", "apple watch", "smartwatch"]
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

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max", 
    price: 9999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 2847,
    image: "/produtos/Iphone 16 Pro.png",
    category: "iphone",
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Pro 16\"",
    price: 19999,
    originalPrice: 21999,
    rating: 4.8,
    reviews: 1542,
    image: "/produtos/Macbook Pro.png",
    category: "mac",
    isNew: true,
    inStock: true
  },
  {
    id: 3,
    name: "Apple Watch Ultra 2",
    price: 6999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 892,
    image: "/produtos/Watch Ultra 2.png",
    category: "watch",
    isNew: false,
    inStock: true
  }
]

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'

export default function PremiumCategoriesPage() {
  const params = useParams();
  const category = typeof params?.category === "string" ? params.category : Array.isArray(params?.category) ? params.category[0] : "";
  const categoryInfo = categoryData[category as keyof typeof categoryData];

  // Video logic (mocked for now)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  // Mock video url based on category
  const categoryVideo = categoryInfo
    ? `/videos/${category}.mp4`
    : undefined;

  // Filter and sort products
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.category === category &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return 0;
    }
  });

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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="relative h-[60vh] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryInfo.gradient}`}>
          {categoryVideo && (
            <div className="absolute inset-0">
              <video
                className="w-full h-full object-cover opacity-30"
                autoPlay={isVideoPlaying}
                muted={isVideoMuted}
                loop
                playsInline
              >
                <source src={categoryVideo} type="video/mp4" />
              </video>
            </div>
          )}

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
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48">
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
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    max={50000}
                    step={500}
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  R$ {priceRange[0]} - R$ {priceRange[1]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{sortedProducts.length} produtos</span>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="grid">
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <LayoutGrid className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
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
                  <ProductCard
                    id={String(product.id)}
                    name={product.name}
                    price={String(product.price)}
                    originalPrice={product.originalPrice ? String(product.originalPrice) : undefined}
                    image={product.image}
                    category={product.category}
                    rating={product.rating}
                    reviews={product.reviews}
                    isNew={product.isNew}
                  />
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
                  setPriceRange([0, 50000]);
                  setSortBy('relevance');
                }}
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
