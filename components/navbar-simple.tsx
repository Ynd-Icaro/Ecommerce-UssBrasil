'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react'
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
    title: 'Smartphones',
    href: '/categories/smartphones',
    items: [
      { name: 'iPhone', href: '/categories/iphone', count: 12 },
      { name: 'Xiaomi', href: '/categories/xiaomi', count: 8 },
      { name: 'Samsung', href: '/categories/samsung', count: 6 },
      { name: 'Motorola', href: '/categories/motorola', count: 4 }
    ]
  },
  mac: {
    title: 'Mac',
    href: '/categories/mac',
    items: [
      { name: 'MacBook Air', href: '/categories/macbook-air', count: 5 },
      { name: 'MacBook Pro', href: '/categories/macbook-pro', count: 6 },
      { name: 'iMac', href: '/categories/imac', count: 4 },
      { name: 'Mac mini', href: '/categories/mac-mini', count: 3 },
      { name: 'Mac Studio', href: '/categories/mac-studio', count: 2 },
      { name: 'Mac Pro', href: '/categories/mac-pro', count: 1 }
    ]
  },
  tablets: {
    title: 'iPad',
    href: '/categories/ipad',
    items: [
      { name: 'iPad', href: '/categories/ipad', count: 4 },
      { name: 'iPad Air', href: '/categories/ipad-air', count: 3 },
      { name: 'iPad Pro', href: '/categories/ipad-pro', count: 2 },
      { name: 'iPad mini', href: '/categories/ipad-mini', count: 2 }
    ]
  },
  watch: {
    title: 'Apple Watch',
    href: '/categories/apple-watch',
    items: [
      { name: 'Apple Watch SE', href: '/categories/apple-watch-se', count: 2 },
      { name: 'Apple Watch Series', href: '/categories/apple-watch-series', count: 3 },
      { name: 'Apple Watch Ultra', href: '/categories/apple-watch-ultra', count: 2 }
    ]
  },
  audio: {
    title: 'AirPods',
    href: '/categories/airpods',
    items: [
      { name: 'AirPods', href: '/categories/airpods', count: 3 },
      { name: 'AirPods Pro', href: '/categories/airpods-pro', count: 2 },
      { name: 'AirPods Max', href: '/categories/airpods-max', count: 1 },
      { name: 'Fones Xiaomi', href: '/categories/xiaomi-audio', count: 5 }
    ]
  },
  accessories: {
    title: 'Acessórios',
    href: '/categories/acessorios',
    items: [
      { name: 'Capas iPhone', href: '/categories/capas-iphone', count: 15 },
      { name: 'Carregadores', href: '/categories/carregadores', count: 12 },
      { name: 'Cabos', href: '/categories/cabos', count: 8 },
      { name: 'Suportes', href: '/categories/suportes', count: 6 }
    ]
  }
}

const featuredProducts = [
  { name: 'iPhone 16 Pro', href: '/product/iphone-16-pro', price: 'R$ 7.499', category: 'iPhone' },
  { name: 'MacBook Pro M3', href: '/product/macbook-pro-m3', price: 'R$ 12.999', category: 'Mac' },
  { name: 'iPad Pro', href: '/product/ipad-pro', price: 'R$ 6.999', category: 'iPad' },
  { name: 'Apple Watch Ultra 2', href: '/product/apple-watch-ultra-2', price: 'R$ 4.999', category: 'Watch' },
  { name: 'AirPods Pro 2', href: '/product/airpods-pro-2', price: 'R$ 1.899', category: 'AirPods' },
  { name: 'Xiaomi 14 Ultra', href: '/product/xiaomi-14-ultra', price: 'R$ 3.299', category: 'Xiaomi' }
]

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Simplified state - remove session dependency for Edge Runtime compatibility
  const isLoggedIn = false // This will be handled by page-level auth
  const totalItems = 0 // This will be handled by client-side cart state

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                USSBRASIL
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Produtos Link */}
                <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium">
                  Produtos
                </Link>

                {/* Smartphones Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                      <span className="font-medium">Smartphones</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          <Link href={categoryStructure.smartphones.href} className="hover:text-blue-600">
                            {categoryStructure.smartphones.title}
                          </Link>
                        </DropdownMenuLabel>
                        <div className="space-y-2">
                          {categoryStructure.smartphones.items.map((item) => (
                            <DropdownMenuItem key={item.name} asChild>
                              <Link href={item.href} className="flex items-center justify-between w-full py-2">
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.count}
                                </Badge>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          Produtos em Destaque
                        </DropdownMenuLabel>
                        <div className="space-y-3">
                          {featuredProducts.filter(p => p.category === 'iPhone' || p.category === 'Xiaomi').map((product) => (
                            <Link key={product.name} href={product.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-blue-600 font-semibold">{product.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mac Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                      <span className="font-medium">Mac</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          <Link href={categoryStructure.mac.href} className="hover:text-blue-600">
                            {categoryStructure.mac.title}
                          </Link>
                        </DropdownMenuLabel>
                        <div className="space-y-2">
                          {categoryStructure.mac.items.map((item) => (
                            <DropdownMenuItem key={item.name} asChild>
                              <Link href={item.href} className="flex items-center justify-between w-full py-2">
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.count}
                                </Badge>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          Produtos em Destaque
                        </DropdownMenuLabel>
                        <div className="space-y-3">
                          {featuredProducts.filter(p => p.category === 'Mac').map((product) => (
                            <Link key={product.name} href={product.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-blue-600 font-semibold">{product.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* iPad Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                      <span className="font-medium">iPad</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          <Link href={categoryStructure.tablets.href} className="hover:text-blue-600">
                            {categoryStructure.tablets.title}
                          </Link>
                        </DropdownMenuLabel>
                        <div className="space-y-2">
                          {categoryStructure.tablets.items.map((item) => (
                            <DropdownMenuItem key={item.name} asChild>
                              <Link href={item.href} className="flex items-center justify-between w-full py-2">
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.count}
                                </Badge>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          Produtos em Destaque
                        </DropdownMenuLabel>
                        <div className="space-y-3">
                          {featuredProducts.filter(p => p.category === 'iPad').map((product) => (
                            <Link key={product.name} href={product.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-blue-600 font-semibold">{product.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Watch Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                      <span className="font-medium">Watch</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          <Link href={categoryStructure.watch.href} className="hover:text-blue-600">
                            {categoryStructure.watch.title}
                          </Link>
                        </DropdownMenuLabel>
                        <div className="space-y-2">
                          {categoryStructure.watch.items.map((item) => (
                            <DropdownMenuItem key={item.name} asChild>
                              <Link href={item.href} className="flex items-center justify-between w-full py-2">
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.count}
                                </Badge>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          Produtos em Destaque
                        </DropdownMenuLabel>
                        <div className="space-y-3">
                          {featuredProducts.filter(p => p.category === 'Watch').map((product) => (
                            <Link key={product.name} href={product.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-blue-600 font-semibold">{product.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* AirPods Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                      <span className="font-medium">AirPods</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          <Link href={categoryStructure.audio.href} className="hover:text-blue-600">
                            {categoryStructure.audio.title}
                          </Link>
                        </DropdownMenuLabel>
                        <div className="space-y-2">
                          {categoryStructure.audio.items.map((item) => (
                            <DropdownMenuItem key={item.name} asChild>
                              <Link href={item.href} className="flex items-center justify-between w-full py-2">
                                <span>{item.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {item.count}
                                </Badge>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                      <div>
                        <DropdownMenuLabel className="text-lg font-semibold mb-3">
                          Produtos em Destaque
                        </DropdownMenuLabel>
                        <div className="space-y-3">
                          {featuredProducts.filter(p => p.category === 'AirPods').map((product) => (
                            <Link key={product.name} href={product.href} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-blue-600 font-semibold">{product.price}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Acessórios Link */}
                <Link href={categoryStructure.accessories.href} className="text-gray-700 hover:text-gray-900 font-medium">
                  Acessórios
                </Link>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 w-64"
                  />
                </div>
              </form>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/orders">Meus Pedidos</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Sair
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Entrar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Criar Conta</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
