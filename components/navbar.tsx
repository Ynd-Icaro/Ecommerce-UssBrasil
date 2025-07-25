'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, ChevronDown, X, Play, Star, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MobileNav } from '@/components/mobile-nav'
import { VideoPlayer } from '@/components/video/VideoPlayer'
import Image from 'next/image'

const appleCategories = {
  mac: {
    title: 'Mac',
    href: '/categories/mac',
    video: '/Videos/Macs Video.mp4',
    description: 'Supercharged by M3',
    items: [
      { 
        name: 'MacBook Air', 
        href: '/categories/macbook-air', 
        price: 'A partir de R$ 10.499', 
        image: '/Produtos/Macbook Air.png',
        description: 'Extraordinariamente fino. Incrivelmente poderoso.',
        isNew: false
      },
      { 
        name: 'MacBook Pro', 
        href: '/categories/macbook-pro', 
        price: 'A partir de R$ 19.999', 
        image: '/Produtos/Macbook Pro.png',
        description: 'Performance de nível profissional.',
        isNew: true
      },
      { 
        name: 'iMac', 
        href: '/categories/imac', 
        price: 'A partir de R$ 14.999', 
        image: '/Produtos/Imac.png',
        description: 'Diz olá para o iMac.',
        isNew: false
      },
      { 
        name: 'Mac mini', 
        href: '/categories/mac-mini', 
        price: 'A partir de R$ 5.999', 
        image: '/Produtos/MacMini.png',
        description: 'Pequeno no tamanho. Grande no desempenho.',
        isNew: false
      },
      { 
        name: 'Mac Studio', 
        href: '/categories/mac-studio', 
        price: 'A partir de R$ 18.999', 
        image: '/Produtos/MacStudio.png',
        description: 'Supercharged for pros.',
        isNew: false
      },
      { 
        name: 'Mac Pro', 
        href: '/categories/mac-pro', 
        price: 'A partir de R$ 62.999', 
        image: '/Produtos/Mac Pro.png',
        description: 'The ultimate Mac.',
        isNew: false
      }
    ]
  },
  iphone: {
    title: 'iPhone',
    href: '/categories/iphone',
    video: '/Videos/IphoneVideo.mp4',
    description: 'Forjado em titânio',
    items: [
      { 
        name: 'iPhone 16 Pro', 
        href: '/categories/iphone-16-pro', 
        price: 'A partir de R$ 10.499', 
        image: '/Produtos/Iphone 16 Pro.png',
        description: 'iPhone Pro. Forjado em titânio.',
        isNew: true
      },
      { 
        name: 'iPhone 16', 
        href: '/categories/iphone-16', 
        price: 'A partir de R$ 7.999', 
        image: '/Produtos/Iphone 16.png',
        description: 'Um salto colorido.',
        isNew: true
      },
      { 
        name: 'iPhone 15', 
        href: '/categories/iphone-15', 
        price: 'A partir de R$ 6.499', 
        image: '/Produtos/Iphone 15.png',
        description: 'Novo. Mais novo. Azul.',
        isNew: false
      }
    ]
  },
  watch: {
    title: 'Apple Watch',
    href: '/categories/watch',
    video: '/Videos/Apple Watch.mp4',
    description: 'Sua saúde. Sua vida.',
    items: [
      { 
        name: 'Apple Watch Series 10', 
        href: '/categories/watch-series-10', 
        price: 'A partir de R$ 4.699', 
        image: '/Produtos/Watch Series 10.png',
        description: 'Mais fino. Mais inteligente. Mais brilhante.',
        isNew: true
      },
      { 
        name: 'Apple Watch Ultra 2', 
        href: '/categories/watch-ultra-2', 
        price: 'A partir de R$ 8.299', 
        image: '/Produtos/Watch Ultra 2.png',
        description: 'A aventura te chama.',
        isNew: false
      },
      { 
        name: 'Apple Watch SE', 
        href: '/categories/watch-se', 
        price: 'A partir de R$ 2.799', 
        image: '/Produtos/Watch SE.png',
        description: 'Recursos poderosos. Preço acessível.',
        isNew: false
      }
    ]
  },
  ipad: {
    title: 'iPad',
    href: '/categories/ipad',
    video: '/Videos/IpadVideo.mp4',
    description: 'Sua próxima ideia',
    items: [
      { 
        name: 'iPad Pro', 
        href: '/categories/ipad-pro', 
        price: 'A partir de R$ 10.499', 
        image: '/Produtos/Ipad Pro.png',
        description: 'Supercharged by M4.',
        isNew: true
      },
      { 
        name: 'iPad Air', 
        href: '/categories/ipad-air', 
        price: 'A partir de R$ 6.499', 
        image: '/Produtos/IpadAir.png',
        description: 'Sério. Divertido. Completo.',
        isNew: false
      },
      { 
        name: 'iPad', 
        href: '/categories/ipad', 
        price: 'A partir de R$ 3.499', 
        image: '/Produtos/Ipad.png',
        description: 'O iPad colorido para tudo.',
        isNew: false
      },
      { 
        name: 'iPad mini', 
        href: '/categories/ipad-mini', 
        price: 'A partir de R$ 4.299', 
        image: '/Produtos/IpadMini.png',
        description: 'Mega potência. Mini formato.',
        isNew: false
      }
    ]
  },
  airpods: {
    title: 'AirPods',
    href: '/categories/airpods',
    video: '/Videos/AirPods Video.webm',
    description: 'Som mágico',
    items: [
      { 
        name: 'AirPods 4', 
        href: '/categories/airpods-4', 
        price: 'A partir de R$ 1.299', 
        image: '/Produtos/Air Pods 4',
        description: 'Redesenhados. Reengenhados.',
        isNew: true
      },
      { 
        name: 'AirPods Pro 2', 
        href: '/categories/airpods-pro-2', 
        price: 'A partir de R$ 2.499', 
        image: '/Produtos/Air Pods Pro 2',
        description: 'Adaptativo. Intuitivo. Icônico.',
        isNew: false
      },
      { 
        name: 'AirPods Max', 
        href: '/categories/airpods-max', 
        price: 'A partir de R$ 4.999', 
        image: '/Produtos/Air Pods Max.png',
        description: 'Cancelamento de ruído sem igual.',
        isNew: false
      }
    ]
  }
}

const mockProducts = [
  { id: 1, name: 'iPhone 16 Pro', price: 'R$ 10.499', image: '/Produtos/Iphone 16 Pro.png', category: 'iPhone' },
  { id: 2, name: 'iPhone 16', price: 'R$ 7.499', image: '/Produtos/Iphone 16.png', category: 'iPhone' },
  { id: 3, name: 'MacBook Pro', price: 'R$ 19.999', image: '/Produtos/Macbook Pro.png', category: 'Mac' },
  { id: 4, name: 'MacBook Air', price: 'R$ 11.999', image: '/Produtos/Macbook Air.png', category: 'Mac' },
  { id: 5, name: 'iPad Pro', price: 'R$ 10.999', image: '/Produtos/Ipad Pro.png', category: 'iPad' },
  { id: 6, name: 'Apple Watch Ultra 2', price: 'R$ 6.999', image: '/Produtos/Watch Ultra 2.png', category: 'Watch' },
  { id: 7, name: 'AirPods Pro 2', price: 'R$ 2.499', image: '/Produtos/Air Pods Pro 2', category: 'AirPods' },
  { id: 8, name: 'AirPods Max', price: 'R$ 4.999', image: '/Produtos/Air Pods Max.png', category: 'AirPods' }
]

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filtered)
      }, 300)
    } else {
      setSearchResults([])
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
      setIsSearchFocused(false)
    }
  }

  // Handle dropdown interactions
  const handleCategoryHover = (categoryKey: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveCategory(categoryKey)
    setIsDropdownVisible(true)
  }

  const handleCategoryLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false)
      setActiveCategory(null)
    }, 150)
  }

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleDropdownLeave = () => {
    setIsDropdownVisible(false)
    setActiveCategory(null)
  }

  const CategoryDropdown = ({ category }: { category: typeof appleCategories.mac }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl"
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Video Section */}
          <div className="col-span-5">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
              <VideoPlayer
                src={category.video}
                autoplay
                muted
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                <p className="text-lg text-white/90">{category.description}</p>
                <Link 
                  href={category.href}
                  className="inline-flex items-center mt-4 text-white/90 hover:text-white font-medium transition-colors group"
                >
                  Ver todos os {category.title.toLowerCase()}
                  <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-6">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="group block p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.isNew && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                              Novo
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-white/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                USSBRASIL
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block relative">
              <div className="flex items-center space-x-8">
                {Object.entries(appleCategories).map(([key, category]) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleCategoryHover(key)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <Link 
                      href={category.href}
                      className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200 py-2"
                    >
                      {category.title}
                    </Link>
                  </div>
                ))}
                <Link 
                  href="/sobre" 
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                >
                  Sobre
                </Link>
                <Link 
                  href="/contato" 
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                >
                  Contato
                </Link>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Advanced Search */}
              <div ref={searchRef} className="relative hidden lg:block">
                <form onSubmit={handleSearch}>
                  <div className={`relative transition-all duration-300 ease-in-out ${
                    isSearchFocused ? 'w-80' : 'w-64'
                  }`}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Buscar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      className={`pl-10 pr-4 transition-all duration-300 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                        isSearchFocused ? 'bg-white shadow-lg' : 'bg-gray-50'
                      }`}
                    />
                    {isSearchFocused && searchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery('')
                          setSearchResults([])
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </form>

                {/* Search Results Dropdown */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                        Produtos encontrados ({searchResults.length})
                      </div>
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </div>
                            <div className="font-semibold text-blue-600">{product.price}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Entrar na sua conta</DialogTitle>
                    <DialogDescription>
                      Faça login para acessar sua conta e histórico de pedidos
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">Senha</label>
                      <Input id="password" type="password" placeholder="********" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button className="w-full" onClick={() => setIsLoginOpen(false)}>
                        Entrar
                      </Button>
                      <Button variant="outline" className="w-full">
                        Criar conta
                      </Button>
                    </div>
                    <div className="text-center">
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors duration-200">
                  <ShoppingBag className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600 hover:bg-blue-700">
                    0
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Category Dropdown */}
        <AnimatePresence>
          {isDropdownVisible && activeCategory && (
            <CategoryDropdown category={appleCategories[activeCategory as keyof typeof appleCategories]} />
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  )
}
