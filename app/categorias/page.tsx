'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'

// Interfaces
interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
  rating: number
  reviews: number
  description: string
}

interface Category {
  title: string
  description: string
  color: string
  hero: string
  products: Product[]
}

// Produtos organizados por categoria
const categoriesData: Record<string, Category> = {
  mac: {
    title: 'Mac',
    description: 'Linha completa de computadores Apple',
    color: 'from-blue-600 to-purple-600',
    hero: '/Videos/Macs Video.mp4',
    products: [
      {
        id: 1,
        name: 'MacBook Air M3',
        price: 'R$ 10.499',
        originalPrice: 'R$ 12.499',
        image: '/Produtos/Macbook Air.png',
        category: 'MacBook',
        isNew: true,
        isSale: true,
        rating: 4.9,
        reviews: 2847,
        description: 'Chip M3, 13 polegadas, 8GB RAM, 256GB SSD'
      },
      {
        id: 2,
        name: 'MacBook Pro M3',
        price: 'R$ 19.999',
        image: '/Produtos/Macbook Pro.png',
        category: 'MacBook',
        isNew: true,
        rating: 4.8,
        reviews: 1923,
        description: 'Chip M3 Pro, 14 polegadas, 18GB RAM, 512GB SSD'
      },
      {
        id: 3,
        name: 'iMac M3',
        price: 'R$ 14.999',
        image: '/Produtos/Imac.png',
        category: 'iMac',
        rating: 4.7,
        reviews: 1245,
        description: 'Chip M3, 24 polegadas, 8GB RAM, 256GB SSD'
      },
      {
        id: 4,
        name: 'Mac mini M3',
        price: 'R$ 5.999',
        image: '/Produtos/MacMini.png',
        category: 'Mac mini',
        rating: 4.6,
        reviews: 892,
        description: 'Chip M3, 8GB RAM, 256GB SSD'
      },
      {
        id: 5,
        name: 'Mac Studio M3',
        price: 'R$ 18.999',
        image: '/Produtos/MacStudio.png',
        category: 'Mac Studio',
        rating: 4.8,
        reviews: 634,
        description: 'Chip M3 Max, 32GB RAM, 512GB SSD'
      },
      {
        id: 6,
        name: 'Mac Pro',
        price: 'R$ 62.999',
        image: '/Produtos/Mac Pro.png',
        category: 'Mac Pro',
        rating: 4.9,
        reviews: 234,
        description: 'Chip M2 Ultra, 64GB RAM, 1TB SSD'
      }
    ]
  },
  iphone: {
    title: 'iPhone',
    description: 'A linha mais avançada de smartphones',
    color: 'from-purple-600 to-pink-600',
    hero: '/Videos/IphoneVideo.mp4',
    products: [
      {
        id: 7,
        name: 'iPhone 16 Pro',
        price: 'R$ 10.499',
        image: '/Produtos/Iphone 16 Pro.png',
        category: 'iPhone Pro',
        isNew: true,
        rating: 4.9,
        reviews: 5432,
        description: 'Titânio, câmera 48MP, A18 Pro, 128GB'
      },
      {
        id: 8,
        name: 'iPhone 16',
        price: 'R$ 7.999',
        image: '/Produtos/Iphone 16.png',
        category: 'iPhone',
        isNew: true,
        rating: 4.8,
        reviews: 4123,
        description: 'Alumínio, câmera 48MP, A18, 128GB'
      },
      {
        id: 9,
        name: 'iPhone 15',
        price: 'R$ 6.499',
        originalPrice: 'R$ 7.999',
        image: '/Produtos/Iphone 15.png',
        category: 'iPhone',
        isSale: true,
        rating: 4.7,
        reviews: 7890,
        description: 'Alumínio, câmera 48MP, A16, 128GB'
      }
    ]
  },
  watch: {
    title: 'Apple Watch',
    description: 'O relógio mais avançado do mundo',
    color: 'from-green-600 to-blue-600',
    hero: '/Videos/Apple Watch.mp4',
    products: [
      {
        id: 10,
        name: 'Apple Watch Series 10',
        price: 'R$ 4.699',
        image: '/Produtos/Watch Series 10.png',
        category: 'Series',
        isNew: true,
        rating: 4.8,
        reviews: 2341,
        description: '45mm, GPS, caixa de alumínio'
      },
      {
        id: 11,
        name: 'Apple Watch Ultra 2',
        price: 'R$ 8.299',
        image: '/Produtos/Watch Ultra 2.png',
        category: 'Ultra',
        rating: 4.9,
        reviews: 1567,
        description: '49mm, GPS + Cellular, titânio'
      },
      {
        id: 12,
        name: 'Apple Watch SE',
        price: 'R$ 2.799',
        image: '/Produtos/Watch SE.png',
        category: 'SE',
        rating: 4.6,
        reviews: 3456,
        description: '44mm, GPS, caixa de alumínio'
      }
    ]
  },
  ipad: {
    title: 'iPad',
    description: 'O tablet mais versátil do mundo',
    color: 'from-orange-600 to-red-600',
    hero: '/Videos/IpadVideo.mp4',
    products: [
      {
        id: 13,
        name: 'iPad Pro M4',
        price: 'R$ 10.499',
        image: '/Produtos/Ipad Pro.png',
        category: 'iPad Pro',
        isNew: true,
        rating: 4.9,
        reviews: 1890,
        description: '11 polegadas, M4, 256GB, Wi-Fi'
      },
      {
        id: 14,
        name: 'iPad Air M2',
        price: 'R$ 6.499',
        image: '/Produtos/IpadAir.png',
        category: 'iPad Air',
        rating: 4.7,
        reviews: 2134,
        description: '11 polegadas, M2, 128GB, Wi-Fi'
      },
      {
        id: 15,
        name: 'iPad',
        price: 'R$ 3.499',
        image: '/Produtos/Ipad.png',
        category: 'iPad',
        rating: 4.5,
        reviews: 4567,
        description: '10.9 polegadas, A14, 64GB, Wi-Fi'
      },
      {
        id: 16,
        name: 'iPad mini',
        price: 'R$ 4.299',
        image: '/Produtos/IpadMini.png',
        category: 'iPad mini',
        rating: 4.6,
        reviews: 1678,
        description: '8.3 polegadas, A15, 64GB, Wi-Fi'
      }
    ]
  },
  airpods: {
    title: 'AirPods',
    description: 'Experiência de áudio sem fio revolucionária',
    color: 'from-cyan-600 to-blue-600',
    hero: '/Videos/AirPods Video.webm',
    products: [
      {
        id: 17,
        name: 'AirPods 4',
        price: 'R$ 1.299',
        image: '/Produtos/Air Pods 4',
        category: 'AirPods',
        isNew: true,
        rating: 4.7,
        reviews: 2890,
        description: 'Nova arquitetura acústica, case USB-C'
      },
      {
        id: 18,
        name: 'AirPods Pro 2',
        price: 'R$ 2.499',
        image: '/Produtos/Air Pods Pro 2',
        category: 'AirPods Pro',
        rating: 4.8,
        reviews: 4123,
        description: 'Cancelamento ativo de ruído, case MagSafe'
      },
      {
        id: 19,
        name: 'AirPods Max',
        price: 'R$ 4.999',
        image: '/Produtos/Air Pods Max.png',
        category: 'AirPods Max',
        rating: 4.6,
        reviews: 876,
        description: 'Over-ear, cancelamento ativo de ruído'
      }
    ]
  }
}

export default function CategoriasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('mac')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const currentCategory = categoriesData[selectedCategory as keyof typeof categoriesData]
  
  const filteredProducts = currentCategory.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('R$ ', '').replace('.', '')) - parseFloat(b.price.replace('R$ ', '').replace('.', ''))
      case 'price-high':
        return parseFloat(b.price.replace('R$ ', '').replace('.', '')) - parseFloat(a.price.replace('R$ ', '').replace('.', ''))
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header com categorias */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Explore Nossas Categorias
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra os melhores produtos Apple com tecnologia de ponta e design inovador
            </p>
          </div>

          {/* Navegação de categorias */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.entries(categoriesData).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero da categoria selecionada */}
      <div className={`relative bg-gradient-to-r ${currentCategory.color} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h2 
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              {currentCategory.title}
            </motion.h2>
            <motion.p 
              key={`${selectedCategory}-desc`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8"
            >
              {currentCategory.description}
            </motion.p>
            <motion.div
              key={`${selectedCategory}-count`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-white/30">
                {currentCategory.products.length} produtos disponíveis
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controles e filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          {/* Busca */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder={`Buscar em ${currentCategory.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Mais relevantes</SelectItem>
                <SelectItem value="newest">Lançamentos</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="rating">Mais avaliados</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de produtos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${
                  viewMode === 'list' 
                    ? 'flex items-center space-x-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300'
                    : 'bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
                }`}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-blue-600 text-white">Novo</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-red-600 text-white">Oferta</Badge>
                  )}
                </div>

                {/* Favorito */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Imagem */}
                <div className={`relative ${
                  viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square p-6'
                } bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${
                  viewMode === 'grid' ? 'rounded-t-2xl' : 'rounded-xl'
                }`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Conteúdo */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
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
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Ações */}
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-gray-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Ver detalhes
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1">
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Estado vazio */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Tente ajustar sua busca ou filtros para encontrar o que você procura.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fique por dentro das novidades
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Receba em primeira mão informações sobre lançamentos, ofertas exclusivas e dicas dos produtos Apple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Seu e-mail"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              Inscrever-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
