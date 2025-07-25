'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MobileNav } from '@/components/mobile-nav'

const categoryStructure = {
  smartphones: {
    title: 'iPhone',
    href: '/categories/smartphones',
    items: [
      { name: 'iPhone 16 Pro', href: '/categories/iphone-16-pro', count: 3 },
      { name: 'iPhone 16', href: '/categories/iphone-16', count: 4 },
      { name: 'iPhone 15', href: '/categories/iphone-15', count: 8 },
      { name: 'Acessórios iPhone', href: '/categories/acessorios-iphone', count: 15 }
    ]
  },
  mac: {
    title: 'Mac',
    href: '/categories/mac',
    items: [
      { name: 'MacBook Air', href: '/categories/macbook-air', count: 3 },
      { name: 'MacBook Pro', href: '/categories/macbook-pro', count: 4 },
      { name: 'iMac', href: '/categories/imac', count: 2 },
      { name: 'Mac mini', href: '/categories/mac-mini', count: 2 },
      { name: 'Mac Studio', href: '/categories/mac-studio', count: 1 },
      { name: 'Mac Pro', href: '/categories/mac-pro', count: 1 }
    ]
  },
  tablets: {
    title: 'iPad',
    href: '/categories/ipad',
    items: [
      { name: 'iPad Pro', href: '/categories/ipad-pro', count: 2 },
      { name: 'iPad Air', href: '/categories/ipad-air', count: 2 },
      { name: 'iPad', href: '/categories/ipad', count: 3 },
      { name: 'iPad mini', href: '/categories/ipad-mini', count: 1 }
    ]
  },
  watch: {
    title: 'Watch',
    href: '/categories/apple-watch',
    items: [
      { name: 'Apple Watch Series 10', href: '/categories/apple-watch-series-10', count: 2 },
      { name: 'Apple Watch Ultra 2', href: '/categories/apple-watch-ultra-2', count: 2 },
      { name: 'Apple Watch SE', href: '/categories/apple-watch-se', count: 2 }
    ]
  },
  audio: {
    title: 'AirPods',
    href: '/categories/airpods',
    items: [
      { name: 'AirPods 4', href: '/categories/airpods-4', count: 2 },
      { name: 'AirPods Pro 2', href: '/categories/airpods-pro-2', count: 2 },
      { name: 'AirPods Max', href: '/categories/airpods-max', count: 1 }
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
  const searchRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
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

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight transition-all duration-300">
                USSBRASIL
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {/* iPhone Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                      <span>iPhone</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-4">
                      <DropdownMenuLabel className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                        <Link href={categoryStructure.smartphones.href} className="hover:text-ussbrasil-900 transition-colors">
                          {categoryStructure.smartphones.title}
                        </Link>
                      </DropdownMenuLabel>
                      <div className="grid gap-2">
                        {categoryStructure.smartphones.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                {item.count}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mac Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                      <span>Mac</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-4">
                      <DropdownMenuLabel className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                        <Link href={categoryStructure.mac.href} className="hover:text-ussbrasil-900 transition-colors">
                          {categoryStructure.mac.title}
                        </Link>
                      </DropdownMenuLabel>
                      <div className="grid gap-2">
                        {categoryStructure.mac.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                {item.count}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* iPad Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                      <span>iPad</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-4">
                      <DropdownMenuLabel className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                        <Link href={categoryStructure.tablets.href} className="hover:text-ussbrasil-900 transition-colors">
                          {categoryStructure.tablets.title}
                        </Link>
                      </DropdownMenuLabel>
                      <div className="grid gap-2">
                        {categoryStructure.tablets.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                {item.count}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Watch Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                      <span>Watch</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-4">
                      <DropdownMenuLabel className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                        <Link href={categoryStructure.watch.href} className="hover:text-ussbrasil-900 transition-colors">
                          {categoryStructure.watch.title}
                        </Link>
                      </DropdownMenuLabel>
                      <div className="grid gap-2">
                        {categoryStructure.watch.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                {item.count}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* AirPods Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                      <span>AirPods</span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                    <div className="space-y-4">
                      <DropdownMenuLabel className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
                        <Link href={categoryStructure.audio.href} className="hover:text-ussbrasil-900 transition-colors">
                          {categoryStructure.audio.title}
                        </Link>
                      </DropdownMenuLabel>
                      <div className="grid gap-2">
                        {categoryStructure.audio.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                              <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.name}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                {item.count}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Acessórios Link */}
                <Link href="/categories/acessorios" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">
                  Acessórios
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
                            <div className="font-semibold text-ussbrasil-900">{product.price}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-2xl">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="font-medium">Entrar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Criar Conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Meus Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors duration-200">
                  <ShoppingBag className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-ussbrasil-900 hover:bg-ussbrasil-800">
                    0
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  )
}
