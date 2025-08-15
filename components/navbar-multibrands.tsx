'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, 
  User, 
  ShoppingBag, 
  ChevronDown, 
  X, 
  Play, 
  Star, 
  Heart, 
  Eye,
  Menu,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Speaker,
  Tablet,
  Gamepad2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { VideoPlayer } from '@/components/video/VideoPlayer'
import { cn } from '@/lib/utils'

const brands = {
  apple: {
    name: 'Apple',
    logo: '/Logos empresas/Apple.png',
    color: '#000000',
    categories: {
      iphone: {
        title: 'iPhone',
        href: '/categories/iphone',
        video: '/Videos/iphone-16-pro-video.mp4',
        description: 'Forjado em Titânio',
        icon: Smartphone,
        items: [
          { 
            name: 'iPhone 16 Pro', 
            href: '/product/iphone-16-pro', 
            price: 'A partir de R$ 10.499', 
            image: '/Produtos/Apple/Iphone 16 Pro.png',
            description: 'Camera Control. Chip A18 Pro.',
            isNew: true
          },
          { 
            name: 'iPhone 16', 
            href: '/product/iphone-16', 
            price: 'A partir de R$ 7.999', 
            image: '/Produtos/Apple/Iphone 16.png',
            description: 'Colorido. Versátil. Divertido.',
            isNew: true
          },
          { 
            name: 'iPhone 15', 
            href: '/product/iphone-15', 
            price: 'A partir de R$ 6.499', 
            image: '/Produtos/Apple/Iphone 15.png',
            description: 'Novo. Mais novo que nunca.'
          }
        ]
      },
      mac: {
        title: 'Mac',
        href: '/categories/mac',
        video: '/Videos/macbook-video.mp4',
        description: 'Supercharged by M3',
        icon: Laptop,
        items: [
          { 
            name: 'MacBook Pro', 
            href: '/product/macbook-pro', 
            price: 'A partir de R$ 19.999', 
            image: '/Produtos/Apple/Macbook Pro.png',
            description: 'Performance de nível profissional.',
            isNew: true
          },
          { 
            name: 'MacBook Air', 
            href: '/product/macbook-air', 
            price: 'A partir de R$ 10.499', 
            image: '/Produtos/Apple/Macbook Air.png',
            description: 'Extraordinariamente fino.'
          },
          { 
            name: 'Mac Pro', 
            href: '/product/mac-pro', 
            price: 'A partir de R$ 59.999', 
            image: '/Produtos/Apple/Mac Pro.png',
            description: 'Performance extrema.'
          }
        ]
      },
      watch: {
        title: 'Apple Watch',
        href: '/categories/apple-watch',
        video: '/Videos/apple-watch-video.mp4',
        description: 'Seu companheiro mais inteligente',
        icon: Watch,
        items: [
          { 
            name: 'Apple Watch Ultra 2', 
            href: '/product/watch-ultra-2', 
            price: 'A partir de R$ 9.499', 
            image: '/Produtos/Apple/Watch Ultra 2.png',
            description: 'A aventura te espera.',
            isNew: true
          },
          { 
            name: 'Apple Watch Series 10', 
            href: '/product/watch-series-10', 
            price: 'A partir de R$ 4.299', 
            image: '/Produtos/Apple/Watch Series 10.png',
            description: 'Fino como nunca.',
            isNew: true
          }
        ]
      },
      ipad: {
        title: 'iPad',
        href: '/categories/ipad',
        video: '/Videos/ipad-video.mp4',
        description: 'Versátil. Mágico. Portátil.',
        icon: Tablet,
        items: [
          { 
            name: 'iPad Pro', 
            href: '/product/ipad-pro', 
            price: 'A partir de R$ 10.499', 
            image: '/Produtos/Apple/Ipad Pro.png',
            description: 'Incrivelmente avançado.'
          },
          { 
            name: 'iPad Air', 
            href: '/product/ipad-air', 
            price: 'A partir de R$ 6.999', 
            image: '/Produtos/Apple/IpadAir.png',
            description: 'Sério desempenho. Leveza surreal.'
          }
        ]
      },
      airpods: {
        title: 'AirPods',
        href: '/categories/airpods',
        video: '/Videos/airpods-video.mp4',
        description: 'Conecte-se ao extraordinário',
        icon: Headphones,
        items: [
          { 
            name: 'AirPods Pro 2', 
            href: '/product/airpods-pro-2', 
            price: 'A partir de R$ 2.899', 
            image: '/Produtos/Apple/Air Pods Pro 2.png',
            description: 'Cancelamento de ruído adaptativo.'
          },
          { 
            name: 'AirPods Max', 
            href: '/product/airpods-max', 
            price: 'A partir de R$ 6.999', 
            image: '/Produtos/Apple/Air Pods Max.png',
            description: 'Um som espetacular.'
          }
        ]
      }
    }
  },
  dji: {
    name: 'DJI',
    logo: '/Logos empresas/Dji Logo.jpg',
    color: '#000000',
    categories: {
      drones: {
        title: 'Drones',
        href: '/categories/drones',
        video: '/Videos/dji-drone-video.mp4',
        description: 'Capture o impossível',
        icon: Camera,
        items: [
          { 
            name: 'DJI Mini 4 Pro', 
            href: '/product/dji-mini-4-pro', 
            price: 'A partir de R$ 4.999', 
            image: '/Produtos/DJI/DJI-Mini-4-Pro.png',
            description: 'Mini. Mas nem tanto.',
            isNew: true
          },
          { 
            name: 'DJI Air 3', 
            href: '/product/dji-air-3', 
            price: 'A partir de R$ 7.999', 
            image: '/Produtos/DJI/DJI-Air-3.png',
            description: 'Duas câmeras. Infinitas possibilidades.'
          }
        ]
      }
    }
  },
  jbl: {
    name: 'JBL',
    logo: '/Logos empresas/JBL Logo.png',
    color: '#FF6900',
    categories: {
      speakers: {
        title: 'Caixas de Som',
        href: '/categories/speakers',
        video: '/Videos/jbl-speaker-video.mp4',
        description: 'Som que emociona',
        icon: Speaker,
        items: [
          { 
            name: 'JBL Charge 5', 
            href: '/product/jbl-charge-5', 
            price: 'A partir de R$ 899', 
            image: '/Produtos/JBL/Caixa de Som JBL Charge 5.webp',
            description: 'Som poderoso e portátil.'
          },
          { 
            name: 'JBL PartyBox 110', 
            href: '/product/jbl-partybox-110', 
            price: 'A partir de R$ 1.999', 
            image: '/Produtos/JBL/Caixa de Som JBL PartyBox 110.webp',
            description: 'A festa onde você estiver.'
          }
        ]
      },
      headphones: {
        title: 'Fones de Ouvido',
        href: '/categories/headphones',
        video: '/Videos/jbl-headphones-video.mp4',
        description: 'Mergulhe na música',
        icon: Headphones,
        items: [
          { 
            name: 'JBL Tune 760NC', 
            href: '/product/jbl-tune-760nc', 
            price: 'A partir de R$ 599', 
            image: '/Produtos/JBL/Fones JBL Tune 760NC.webp',
            description: 'Cancelamento de ruído ativo.'
          }
        ]
      }
    }
  },
  xiaomi: {
    name: 'Xiaomi',
    logo: '/Logos empresas/Xiomi Logo.png',
    color: '#FF6900',
    categories: {
      smartphones: {
        title: 'Smartphones',
        href: '/categories/xiaomi-phones',
        video: '/Videos/xiaomi-phone-video.mp4',
        description: 'Inovação acessível',
        icon: Smartphone,
        items: [
          { 
            name: 'Xiaomi 14 Ultra', 
            href: '/product/xiaomi-14-ultra', 
            price: 'A partir de R$ 5.999', 
            image: '/Produtos/Xiaomi/Xiaomi-14-Ultra.png',
            description: 'Fotografia profissional.',
            isNew: true
          },
          { 
            name: 'Redmi Note 13 Pro 5G', 
            href: '/product/redmi-note-13-pro', 
            price: 'A partir de R$ 1.999', 
            image: '/Produtos/Xiaomi/Xiaomi Redmi Note 13 Pro 5G.webp',
            description: 'Performance excepcional.'
          }
        ]
      },
      tablets: {
        title: 'Tablets',
        href: '/categories/xiaomi-tablets',
        video: '/Videos/xiaomi-tablet-video.mp4',
        description: 'Produtividade sem limites',
        icon: Tablet,
        items: [
          { 
            name: 'Xiaomi Pad 6', 
            href: '/product/xiaomi-pad-6', 
            price: 'A partir de R$ 2.499', 
            image: '/Produtos/Xiaomi/Xiaomi Pad 6.webp',
            description: 'Tela imersiva de 11 polegadas.'
          }
        ]
      },
      smartwatch: {
        title: 'Smartwatches',
        href: '/categories/xiaomi-smartwatch',
        video: '/Videos/xiaomi-watch-video.mp4',
        description: 'Saúde e estilo',
        icon: Watch,
        items: [
          { 
            name: 'Xiaomi Watch S3', 
            href: '/product/xiaomi-watch-s3', 
            price: 'A partir de R$ 899', 
            image: '/Produtos/Xiaomi/Xiaomi Watch S3.webp',
            description: 'Monitoramento completo de saúde.'
          }
        ]
      }
    }
  },
  geonav: {
    name: 'Geonav',
    logo: '/Logos empresas/GeoNav.jpg',
    color: '#007ACC',
    categories: {
      accessories: {
        title: 'Acessórios',
        href: '/categories/geonav-accessories',
        video: '/Videos/geonav-accessories-video.mp4',
        description: 'Conecte com qualidade',
        icon: Gamepad2,
        items: [
          { 
            name: 'Carregador Turbo GaN 65W', 
            href: '/product/carregador-turbo-gan-65w', 
            price: 'A partir de R$ 149', 
            image: '/Produtos/Geonav/Carregador Turbo Gan 65w Geonav.webp',
            description: 'Carregamento rápido e eficiente.'
          },
          { 
            name: 'Power Bank 20.000mAh', 
            href: '/product/power-bank-20000', 
            price: 'A partir de R$ 199', 
            image: '/Produtos/Geonav/Power Bank Geonav 20.000mah.webp',
            description: 'Energia para dias inteiros.'
          }
        ]
      }
    }
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setHoveredBrand(null)
        setHoveredCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentBrand = hoveredBrand ? brands[hoveredBrand as keyof typeof brands] : null
  const currentCategory = hoveredCategory && currentBrand 
    ? currentBrand.categories[hoveredCategory as keyof typeof currentBrand.categories] 
    : null

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Section - Brand Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                USS Brasil
              </span>
            </Link>

            {/* Brand Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {Object.entries(brands).map(([key, brand]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setHoveredBrand(key)}
                  onMouseLeave={() => setTimeout(() => setHoveredBrand(null), 100)}
                >
                  <Link
                    href={`/brands/${key}`}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                      hoveredBrand === key 
                        ? "bg-gray-100 text-gray-900" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span className="font-medium">{brand.name}</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 text-xs bg-blue-600">
                  3
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Category Navigation */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6">
              <Link href="/ofertas" className="text-sm font-medium text-red-600 hover:text-red-700">
                Ofertas
              </Link>
              <Link href="/lancamentos" className="text-sm font-medium text-green-600 hover:text-green-700">
                Lançamentos
              </Link>
              <Link href="/contato" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {hoveredBrand && currentBrand && (
        <div 
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl"
          onMouseEnter={() => setHoveredBrand(hoveredBrand)}
          onMouseLeave={() => setHoveredBrand(null)}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Categories */}
              <div className="col-span-3">
                <h3 className="text-lg font-semibold mb-4" style={{ color: currentBrand.color }}>
                  Categorias {currentBrand.name}
                </h3>
                <div className="space-y-2">
                  {Object.entries(currentBrand.categories).map(([key, category]) => {
                    const Icon = category.icon
                    return (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
                          hoveredCategory === key 
                            ? "bg-gray-100" 
                            : "hover:bg-gray-50"
                        )}
                        onMouseEnter={() => setHoveredCategory(key)}
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{category.title}</h4>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Products */}
              <div className="col-span-6">
                {currentCategory && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{(currentCategory as any).title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {(currentCategory as any).items.map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="group flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2 group-hover:scale-110 transition-transform duration-200"
                            />
                            {item.isNew && (
                              <Badge className="absolute -top-1 -right-1 text-xs bg-blue-600">
                                Novo
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                            <p className="text-sm font-medium text-gray-700">{item.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video/Image */}
              <div className="col-span-3">
                {(currentCategory as any)?.video && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <VideoPlayer
                      src={(currentCategory as any).video}
                      poster={(currentCategory as any).items[0]?.image}
                      autoplay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            
            {Object.entries(brands).map(([key, brand]) => (
              <div key={key} className="border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <div className="space-y-2">
                  {Object.entries(brand.categories).map(([catKey, category]) => (
                    <Link
                      key={catKey}
                      href={category.href}
                      className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
