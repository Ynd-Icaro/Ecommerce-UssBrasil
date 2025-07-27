// ============================================================================
// COMBOBOX DE NAVEGAÇÃO - PRODUTOS E CATEGORIAS
// ============================================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Eye, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// ========== DADOS MOCK PARA NAVEGAÇÃO ==========
const productBrands = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '1',
        name: 'iPhone 16 Pro',
        price: 7999.00,
        originalPrice: 8999.00,
        image: '/Produtos/Iphone 16 Pro.png',
        video: '/Videos/IphoneVideo.mp4',
        category: 'Smartphones'
      },
      {
        id: '2',
        name: 'MacBook Pro M4',
        price: 18999.00,
        originalPrice: 21999.00,
        image: '/Produtos/Macbook Pro.png',
        video: '/Videos/Macs Video.mp4',
        category: 'Laptops'
      },
      {
        id: '3',
        name: 'AirPods Pro 2',
        price: 2199.00,
        originalPrice: 2499.00,
        image: '/Produtos/Air Pods Pro 2.png',
        video: '/Videos/AirPods Video.webm',
        category: 'Acessórios'
      },
      {
        id: '4',
        name: 'Apple Watch Ultra 2',
        price: 7199.00,
        originalPrice: 7999.00,
        image: '/Produtos/Watch Ultra 2.png',
        video: '/Videos/Apple Watch.mp4',
        category: 'Smartwatches'
      }
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '5',
        name: 'Galaxy S24 Ultra',
        price: 6999.00,
        originalPrice: 7999.00,
        image: '/Produtos/Iphone 16 Pro.png',
        video: '/Videos/IphoneVideo.mp4',
        category: 'Smartphones'
      },
      {
        id: '6',
        name: 'Galaxy Tab S9',
        price: 3999.00,
        originalPrice: 4499.00,
        image: '/Produtos/Ipad Pro.png',
        video: '/Videos/IpadVideo.mp4',
        category: 'Tablets'
      }
    ]
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '7',
        name: 'WH-1000XM5',
        price: 1899.00,
        originalPrice: 2199.00,
        image: '/Produtos/Air Pods Pro 2.png',
        video: '/Videos/AirPods Video.webm',
        category: 'Acessórios'
      },
      {
        id: '8',
        name: 'PlayStation 5',
        price: 4499.00,
        originalPrice: 4999.00,
        image: '/Produtos/Mac Pro.png',
        video: '/Videos/Macs Video.mp4',
        category: 'Gaming'
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '9',
        name: 'Surface Pro 9',
        price: 5999.00,
        originalPrice: 6799.00,
        image: '/Produtos/Ipad Pro.png',
        video: '/Videos/IpadVideo.mp4',
        category: 'Tablets'
      },
      {
        id: '10',
        name: 'Surface Studio',
        price: 14999.00,
        originalPrice: 16999.00,
        image: '/Produtos/Imac.png',
        video: '/Videos/Macs Video.mp4',
        category: 'Desktops'
      }
    ]
  },
  {
    id: 'lg',
    name: 'LG',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '11',
        name: 'OLED C3 65"',
        price: 7999.00,
        originalPrice: 9499.00,
        image: '/Produtos/Pro Display.png',
        video: '/Videos/Macs Video.mp4',
        category: 'TVs'
      },
      {
        id: '12',
        name: 'Gram 17"',
        price: 8999.00,
        originalPrice: 9999.00,
        image: '/Produtos/Macbook Pro.png',
        video: '/Videos/Macs Video.mp4',
        category: 'Laptops'
      }
    ]
  },
  {
    id: 'jbl',
    name: 'JBL',
    logo: '/Svg/iMac.svg',
    featured: [
      {
        id: '13',
        name: 'Charge 5',
        price: 699.00,
        originalPrice: 899.00,
        image: '/Produtos/Air Pods Pro 2.png',
        video: '/Videos/AirPods Video.webm',
        category: 'Audio'
      },
      {
        id: '14',
        name: 'Live Pro 2',
        price: 899.00,
        originalPrice: 1199.00,
        image: '/Produtos/Air Pods Pro 2.png',
        video: '/Videos/AirPods Video.webm',
        category: 'Fones'
      }
    ]
  }
]

const productCategories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'iPhone e outros smartphones premium',
    icon: '📱',
    count: 12
  },
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'MacBooks e notebooks profissionais',
    icon: '💻',
    count: 8
  },
  {
    id: 'tablets',
    name: 'Tablets',
    description: 'iPads e tablets para criatividade',
    icon: '📱',
    count: 6
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    description: 'Apple Watch e wearables',
    icon: '⌚',
    count: 4
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    description: 'AirPods, capas e mais',
    icon: '🎧',
    count: 25
  },
  {
    id: 'drones',
    name: 'Drones',
    description: 'Drones profissionais e recreativos',
    icon: '🚁',
    count: 3
  }
]

// ========== COMPONENTE DE VÍDEO PRODUTO ==========
const ProductVideoCard = ({ product }: { product: any }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative group">
      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-3">
        <video
          className="w-full h-full object-cover"
          poster={product.image}
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={product.video} type="video/mp4" />
          <source src={product.video} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 text-black hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              const video = e.currentTarget.closest('.relative')?.querySelector('video')
              if (video) {
                isPlaying ? video.pause() : video.play()
              }
            }}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-sm">{product.name}</h4>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#00CED1]">
            R$ {product.price.toLocaleString('pt-BR')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toLocaleString('pt-BR')}
            </span>
          )}
        </div>
        <Badge variant="secondary" className="text-xs">
          {product.category}
        </Badge>
      </div>
    </div>
  )
}

// ========== COMBOBOX DE PRODUTOS ==========
export const ProductsCombobox = () => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-2 font-medium text-slate-700 hover:text-blue-900 transition-all duration-200 relative group"
        >
          Produtos
          <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[900px] p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl" 
        align="start"
      >
        <div className="flex max-h-[500px]">
          {/* Lista de Marcas com Scroll */}
          <div className="w-64 border-r border-slate-200/50 p-6">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Marcas Premium</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {productBrands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="ghost"
                  className={`w-full justify-start h-auto p-4 rounded-xl transition-all duration-200 ${
                    hoveredBrand === brand.id 
                      ? 'bg-gradient-to-r from-blue-900/10 to-cyan-500/10 text-blue-900 shadow-sm' 
                      : 'hover:bg-slate-50'
                  }`}
                  onMouseEnter={() => setHoveredBrand(brand.id)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={20}
                        height={20}
                        className="object-contain filter invert"
                      />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-sm">{brand.name}</div>
                      <div className="text-xs text-slate-500">{brand.featured.length} produtos</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-blue-900 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-400 rounded-xl">
                  Ver Todos os Produtos
                </Button>
              </Link>
            </div>
          </div>

          {/* Produtos em Destaque */}
          <div className="flex-1 p-6">
            <AnimatePresence mode="wait">
              {hoveredBrand && (
                <motion.div
                  key={hoveredBrand}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {productBrands
                    .find(brand => brand.id === hoveredBrand)
                    ?.featured.map((product) => (
                      <div key={product.id} className="mb-6">
                        <ProductVideoCard product={product} />
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {!hoveredBrand && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Passe o mouse sobre uma marca para ver os produtos</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ========== COMBOBOX DE CATEGORIAS ==========
export const CategoriesCombobox = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-0 font-medium text-gray-700 hover:text-[#00CED1] transition-colors"
        >
          Categorias
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-4 border-0 shadow-2xl bg-white/95 backdrop-blur-xl" 
        align="start"
      >
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Tipos de Produtos</h3>
          <div className="grid gap-2">
            {productCategories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-[#00CED1] transition-colors">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6">
            <Link href="/categories">
              <Button variant="outline" className="w-full">
                Ver Todas as Categorias
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
