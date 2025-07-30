'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// ========== DADOS DE PRODUTOS PREMIUM ==========
const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    price: 7999.00,
    originalPrice: 8999.00,
    image: '/Imagens/Iphone-16-Pro.png',
    video: '/Videos/IphoneVideo.mp4',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 2847,
    isNew: true
  },
  {
    id: '2',
    name: 'MacBook Pro M4',
    price: 18999.00,
    originalPrice: 21999.00,
    image: '/Imagens/Macbook-Pro.png',
    video: '/Videos/Macs Video.mp4',
    category: 'Laptops',
    rating: 4.8,
    reviews: 1923,
    isFeatured: true
  },
  {
    id: '3',
    name: 'iPad Pro',
    price: 8999.00,
    originalPrice: 9999.00,
    image: '/Imagens/Ipad-Pro.png',
    video: '/Videos/IpadVideo.mp4',
    category: 'Tablets',
    rating: 4.7,
    reviews: 1456,
    isNew: true
  },
  {
    id: '4',
    name: 'Apple Watch Ultra 2',
    price: 7199.00,
    originalPrice: 7999.00,
    image: '/Imagens/Watch-Ultra-2.png',
    video: '/Videos/Apple Watch.mp4',
    category: 'Smartwatches',
    rating: 4.8,
    reviews: 892,
    isFeatured: true
  }
]

const productBrands = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/Svg/iMac.svg',
    description: 'Inovação em cada detalhe',
    count: 24,
    color: 'from-slate-900 to-slate-700'
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '/Svg/iMac.svg',
    description: 'Tecnologia que conecta',
    count: 18,
    color: 'from-blue-900 to-blue-700'
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '/Svg/iMac.svg',
    description: 'Áudio e imagem premium',
    count: 15,
    color: 'from-indigo-900 to-indigo-700'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '/Svg/iMac.svg',
    description: 'Produtividade profissional',
    count: 12,
    color: 'from-cyan-900 to-cyan-700'
  },
  {
    id: 'lg',
    name: 'LG',
    logo: '/Svg/iMac.svg',
    description: 'Vida inteligente',
    count: 10,
    color: 'from-emerald-900 to-emerald-700'
  },
  {
    id: 'jbl',
    name: 'JBL',
    logo: '/Svg/iMac.svg',
    description: 'Som que emociona',
    count: 8,
    color: 'from-orange-900 to-orange-700'
  }
]

const productCategories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'iPhone e Android premium',
    icon: '📱',
    count: 35,
    image: '/Imagens/Iphone-16-Pro.png'
  },
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'MacBooks e notebooks',
    icon: '💻',
    count: 28,
    image: '/Imagens/Macbook-Pro.png'
  },
  {
    id: 'tablets',
    name: 'Tablets',
    description: 'iPads e tablets Android',
    icon: '📱',
    count: 16,
    image: '/Imagens/Ipad-Pro.png'
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    description: 'Apple Watch e wearables',
    icon: '⌚',
    count: 12,
    image: '/Imagens/Watch-Ultra-2.png'
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    description: 'AirPods, capas e mais',
    icon: '🎧',
    count: 45,
    image: '/Imagens/Air-Pods-Max.png'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Consoles e periféricos',
    icon: '🎮',
    count: 22,
    image: '/Imagens/Mac-Pro.png'
  }
]

// ========== COMPONENTE DE VIDEO CARD ==========
const VideoProductCard = ({ product, index }: { product: any, index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => {
        setIsHovered(true)
        setIsPlaying(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPlaying(false)
      }}
    >
      <Card className="overflow-hidden bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
        {/* Video/Image Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.video
                ref={videoRef}
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
              >
                <source src={product.video} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={product.image && product.image.startsWith('/products/') ? product.image : `/products/${product.image?.replace(/^\/+/, '')}`}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-blue-900 to-cyan-500 text-white font-semibold">
                Novo
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                Destaque
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Play Button Overlay */}
          <AnimatePresence>
            {!isPlaying && isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="h-6 w-6 text-slate-900 ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <CardContent className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-600">({product.reviews})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-900 transition-colors">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-slate-600 mb-3">{product.category}</p>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-blue-900">
              R$ {product.price.toLocaleString('pt-BR')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                R$ {product.originalPrice.toLocaleString('pt-BR')}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-900 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-400">
                <Eye className="h-3 w-3 mr-1" />
                Ver
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="px-3">
              <Heart className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ========== COMBOBOX DE PRODUTOS ==========
export const ProductsCombobox = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-2 font-medium text-slate-700 hover:text-blue-900 transition-all duration-200 relative group"
        >
          Produtos
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[1000px] p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden" 
        align="start"
        sideOffset={10}
      >
        <div className="relative">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Produtos Premium</h2>
            <p className="text-slate-600">Descubra nossa seleção exclusiva de tecnologia</p>
          </div>

          {/* Featured Videos Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Destaques em Vídeo</h3>
              <Link href="/products">
                <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Ver Todos
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {featuredProducts.map((product, index) => (
                <VideoProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>

          {/* Brands Section */}
          <div className="px-6 pb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Marcas Premium</h3>
            <div className="grid grid-cols-6 gap-3">
              {productBrands.map((brand) => (
                <Link key={brand.id} href={`/brands/${brand.id}`}>
                  <Card className="group cursor-pointer bg-white/60 hover:bg-white border-slate-200/50 hover:border-blue-900/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${brand.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        <Image
                          src={brand.logo.startsWith('/Logo/') ? brand.logo : `/Logo/${brand.logo.replace(/^\/+/, '')}`}
                          alt={brand.name}
                          width={24}
                          height={24}
                          className="object-contain filter invert"
                        />
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-1">{brand.name}</h4>
                      <p className="text-xs text-slate-600">{brand.count} produtos</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ========== COMBOBOX DE CATEGORIAS ==========
export const CategoriesCombobox = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-2 font-medium text-slate-700 hover:text-blue-900 transition-all duration-200 relative group"
        >
          Categorias
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[600px] p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden" 
        align="start"
        sideOffset={10}
      >
        <div className="relative">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Categorias</h2>
            <p className="text-slate-600">Explore por tipo de produto</p>
          </div>

          {/* Categories Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {productCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <Card className="group cursor-pointer bg-white/60 hover:bg-white border-slate-200/50 hover:border-blue-900/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={category.image && category.image.startsWith('/products/') ? category.image : `/products/${category.image?.replace(/^\/+/, '')}`}
                          alt={category.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{category.name}</h4>
                        <p className="text-sm text-slate-600 mb-1">{category.description}</p>
                        <p className="text-xs text-blue-900 font-medium">{category.count} produtos</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/categories">
                <Button className="bg-gradient-to-r from-blue-900 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-400">
                  Ver Todas as Categorias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
