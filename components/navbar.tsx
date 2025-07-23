'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, ShoppingBag, Search, ChevronDown } from 'lucide-react'
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
import { useCartStore } from '@/store/cart'
import LoginModal from '@/components/login-modal'

const categoryStructure = {
  smartphones: {
    title: 'Smartphones',
    items: [
      { name: 'iPhone', href: '/categories/iphone', count: 12 },
      { name: 'Xiaomi', href: '/categories/xiaomi', count: 8 },
      { name: 'Samsung', href: '/categories/samsung', count: 6 },
      { name: 'Motorola', href: '/categories/motorola', count: 4 }
    ]
  },
  mac: {
    title: 'Mac',
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
    title: 'Tablets',
    items: [
      { name: 'iPad', href: '/categories/ipad', count: 4 },
      { name: 'iPad Air', href: '/categories/ipad-air', count: 3 },
      { name: 'iPad Pro', href: '/categories/ipad-pro', count: 2 },
      { name: 'iPad mini', href: '/categories/ipad-mini', count: 2 }
    ]
  },
  watch: {
    title: 'Smartwatches',
    items: [
      { name: 'Apple Watch SE', href: '/categories/apple-watch-se', count: 2 },
      { name: 'Apple Watch Series', href: '/categories/apple-watch-series', count: 3 },
      { name: 'Apple Watch Ultra', href: '/categories/apple-watch-ultra', count: 2 }
    ]
  },
  audio: {
    title: 'Áudio',
    items: [
      { name: 'AirPods', href: '/categories/airpods', count: 3 },
      { name: 'AirPods Pro', href: '/categories/airpods-pro', count: 2 },
      { name: 'AirPods Max', href: '/categories/airpods-max', count: 1 },
      { name: 'Fones Xiaomi', href: '/categories/xiaomi-audio', count: 5 }
    ]
  },
  accessories: {
    title: 'Acessórios',
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
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { data: session } = useSession()
  const { items } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-[#00CED1] transition-colors">UssBrasil</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium relative group">
                  Produtos
                  <ChevronDown className="ml-1 h-4 w-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00CED1] transition-all group-hover:w-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Produtos em Destaque</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {featuredProducts.map((product) => (
                  <DropdownMenuItem key={product.name} asChild>
                    <Link href={product.href} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <span className="text-[#00CED1] font-medium">{product.price}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/products" className="font-medium text-[#00CED1]">
                    Ver Todos os Produtos →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium relative group">
                  Categorias
                  <ChevronDown className="ml-1 h-4 w-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00CED1] transition-all group-hover:w-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <DropdownMenuLabel>Explorar por Categoria</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Smartphones */}
                <div className="p-2">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                    📱 {categoryStructure.smartphones.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {categoryStructure.smartphones.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Mac */}
                <div className="p-2">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                    💻 {categoryStructure.mac.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {categoryStructure.mac.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Tablets e Watch */}
                <div className="p-2 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                      📱 {categoryStructure.tablets.title}
                    </h4>
                    {categoryStructure.tablets.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                      ⌚ {categoryStructure.watch.title}
                    </h4>
                    {categoryStructure.watch.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Áudio e Acessórios */}
                <div className="p-2 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                      🎧 {categoryStructure.audio.title}
                    </h4>
                    {categoryStructure.audio.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
                      🔧 {categoryStructure.accessories.title}
                    </h4>
                    {categoryStructure.accessories.items.slice(0, 4).map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex justify-between items-center text-xs">
                          <span>{item.name}</span>
                          <Badge variant="secondary" className="text-xs h-4">{item.count}</Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/products" className="font-medium text-[#00CED1] justify-center">
                    Ver Todas as Categorias →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium relative group">
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00CED1] transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#00CED1] transition-colors font-medium relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00CED1] transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right side - Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-[#00CED1] transition-colors" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 w-64 bg-gray-50/80 border-gray-200 focus:bg-white focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {session ? (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="hover:bg-[#00CED1]/10 hover:text-[#00CED1] transition-colors">
                      <User className="h-4 w-4 mr-2" />
                      {session.user.name}
                    </Button>
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="border-[#00CED1] text-[#00CED1] hover:bg-[#00CED1] hover:text-white transition-colors">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => signOut()}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <LoginModal>
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 transition-colors">
                    Entrar
                  </Button>
                </LoginModal>
              )}

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="hover:bg-[#00CED1]/10 hover:text-[#00CED1] transition-colors relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-[#00CED1] text-white text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="hover:bg-[#00CED1]/10 hover:text-[#00CED1] transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-[#00CED1] text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-[#00CED1]/10 hover:text-[#00CED1] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 w-full bg-gray-50/80 border-gray-200 focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <Link 
                href="/products" 
                className="block py-3 px-3 text-gray-700 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                Todos os Produtos
              </Link>
              
              {/* Smartphones */}
              <div className="space-y-2">
                <h4 className="px-3 text-sm font-bold text-gray-900 flex items-center">
                  📱 Smartphones
                </h4>
                <div className="ml-3 space-y-1">
                  {categoryStructure.smartphones.items.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href} 
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mac */}
              <div className="space-y-2">
                <h4 className="px-3 text-sm font-bold text-gray-900 flex items-center">
                  💻 Mac
                </h4>
                <div className="ml-3 space-y-1">
                  {categoryStructure.mac.items.slice(0, 4).map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href} 
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Outras categorias */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="px-3 text-sm font-bold text-gray-900">📱 Tablets</h4>
                  <div className="ml-3 space-y-1">
                    {categoryStructure.tablets.items.slice(0, 2).map((item) => (
                      <Link 
                        key={item.name}
                        href={item.href} 
                        className="block py-2 px-3 text-xs text-gray-600 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="px-3 text-sm font-bold text-gray-900">🎧 Áudio</h4>
                  <div className="ml-3 space-y-1">
                    {categoryStructure.audio.items.slice(0, 2).map((item) => (
                      <Link 
                        key={item.name}
                        href={item.href} 
                        className="block py-2 px-3 text-xs text-gray-600 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile User Actions */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              {session ? (
                <>
                  <Link 
                    href="/profile" 
                    className="block py-3 px-3 text-gray-700 hover:text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 inline" />
                    {session.user.name}
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="block py-3 px-3 text-[#00CED1] hover:bg-[#00CED1]/5 rounded-lg transition-all font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Painel Admin
                    </Link>
                  )}
                  <Button 
                    onClick={() => { signOut(); setIsOpen(false); }}
                    variant="ghost"
                    className="w-full justify-start py-3 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all font-medium"
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <LoginModal>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </LoginModal>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
