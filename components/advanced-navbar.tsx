'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Globe,
  Heart,
  Package,
  Settings,
  LogOut,
  MessageCircle,
  Shield,
  Truck,
  Award,
  Mic,
  Moon,
  Sun,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'react-hot-toast'

import { premiumCategories } from '@/lib/premium-categories'

interface SearchSuggestion {
  id: string
  name: string
  category: string
  image: string
  price: number
}

interface Category {
  id: string
  name: string
  icon: string
  subcategories: Array<{
    id: string
    name: string
    items: string[]
  }>
}

const mockSearchSuggestions: SearchSuggestion[] = [
  { id: '1', name: 'iPhone 16 Pro', category: 'Smartphones', image: '/products/Iphone 16 Pro.png', price: 7999 },
  { id: '2', name: 'MacBook Pro', category: 'Computadores', image: '/products/Macbook Pro.png', price: 15999 },
  { id: '3', name: 'AirPods Pro 2', category: 'Áudio', image: '/products/Air Pods Pro 2', price: 1899 },
  { id: '4', name: 'Apple Watch Ultra', category: 'Wearables', image: '/products/Watch Ultra 2.png', price: 5999 },
  { id: '5', name: 'iPad Pro', category: 'Tablets', image: '/products/Ipad Pro.png', price: 8999 }
]

const categories = premiumCategories.map(cat => ({
  id: cat.id,
  name: cat.name,
  icon: cat.icon,
  subcategories: cat.subcategories.map(sub => ({
    id: sub.id,
    name: sub.name,
    items: sub.products.map(product => product.name)
  }))
}))

const currencies = [
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Real Brasileiro' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'Dólar Americano' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Yen Japonês' }
]

export function AdvancedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cartItems, setCartItems] = useState(3)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('João Silva')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const filteredSuggestions = mockSearchSuggestions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: selectedCurrency.code
    }).format(price)
  }

  const handleCategoryHover = (categoryId: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current)
    }
    setActiveCategory(categoryId)
  }

  const handleCategoryLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveCategory(null)
    }, 300)
  }

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsVoiceSearchActive(true)
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = 'pt-BR'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        setIsVoiceSearchActive(false)
        toast.success(`Busca por voz: "${transcript}"`)
      }
      recognition.onerror = () => {
        setIsVoiceSearchActive(false)
        toast.error('Erro na busca por voz')
      }
      recognition.start()
    } else {
      toast.error('Busca por voz não suportada neste navegador')
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      {/* Top Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              <span>Frete grátis para todo o Brasil acima de R$300</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/30" />
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Produtos 100% Originais</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <span>Lançamentos do Japão com -20%</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/20"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/icons/smartphone.svg"
                    alt="EcoMuss"
                    width={32}
                    height={32}
                    className="text-blue-600"
                  />
                  <div className="absolute -top-1 -right-1 flex space-x-1">
                    <span className="text-xs">🇺🇸</span>
                    <span className="text-xs">🇯🇵</span>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EcoMuss
                </span>
              </Link>
            </div>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                {subcategory.name}
                              </h3>
                              <div className="space-y-1">
                                {subcategory.items.map((item) => (
                                  <Link
                                    key={item}
                                    href={`/categories/${category.id}/${subcategory.id}`}
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por marca, categoria ou produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="pl-10 pr-20 py-3 w-full rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startVoiceSearch}
                    className={`p-1 ${isVoiceSearchActive ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {(isSearchFocused || searchQuery) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50"
                  >
                    {searchQuery === '' ? (
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Produtos em Alta</h3>
                        <div className="space-y-2">
                          {mockSearchSuggestions.slice(0, 3).map((item) => (
                            <Link
                              key={item.id}
                              href={`/product/${item.id}`}
                              className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Image
                                src={item.image && item.image.startsWith('/products/') ? item.image : `/products/${item.image?.replace(/^\/+/, '')}`}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                              </div>
                              <p className="font-semibold text-blue-600 dark:text-blue-400">
                                {formatPrice(item.price)}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4">
                        {filteredSuggestions.length > 0 ? (
                          <div className="space-y-2">
                            {filteredSuggestions.map((item) => (
                              <Link
                                key={item.id}
                                href={`/product/${item.id}`}
                                className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                                onClick={() => setIsSearchFocused(false)}
                              >
                                <Image
                                  src={item.image && item.image.startsWith('/products/') ? item.image : `/products/${item.image?.replace(/^\/+/, '')}`}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                                </div>
                                <p className="font-semibold text-blue-600 dark:text-blue-400">
                                  {formatPrice(item.price)}
                                </p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">Nenhum produto encontrado</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              
              {/* Currency Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <span className="text-lg">{selectedCurrency.flag}</span>
                    <span className="hidden md:inline">{selectedCurrency.code}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-2">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedCurrency.code === currency.code ? 'bg-blue-50 dark:bg-blue-900' : ''
                        }`}
                      >
                        <span className="text-lg">{currency.flag}</span>
                        <div className="flex-1 text-left">
                          <p className="font-medium">{currency.code}</p>
                          <p className="text-sm text-gray-500">{currency.name}</p>
                        </div>
                        <span className="font-mono">{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Account */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">
                      {isLoggedIn ? `Olá, ${userName.split(' ')[0]}` : 'Entrar'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="p-3 border-b">
                        <p className="font-semibold">{userName}</p>
                        <p className="text-sm text-gray-500">joao@email.com</p>
                      </div>
                      <Link href="/orders" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Package className="h-4 w-4" />
                        <span>Meus Pedidos</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Heart className="h-4 w-4" />
                        <span>Favoritos</span>
                      </Link>
                      <Link href="/profile" className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Settings className="h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                      <Separator />
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full text-left text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/login">
                        <Button className="w-full">Entrar</Button>
                      </Link>
                      <Link href="/register">
                        <Button variant="outline" className="w-full">Cadastre-se e ganhe 10%</Button>
                      </Link>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <button className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 font-medium">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                    <div className="pl-8 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.id}/${subcategory.id}`}
                          className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-xl"
          onClick={() => toast.success('Chat iniciado! Atendimento em Português 🇧🇷')}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}
