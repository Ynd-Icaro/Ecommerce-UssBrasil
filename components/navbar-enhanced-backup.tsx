'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Heart, 
  User, 
  ShoppingCart, 
  Moon, 
  Sun, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Package,
  Eye,
  Trash2,
  Plus,
  Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getAllProducts } from '@/lib/products-manager'

// Types
interface Brand {
  id: string
  name: string
  slug: string
  image: string
  categories: string[]
  featured_products: Product[]
}

interface Product {
  id: string
  name: string
  image: string
  price: number
  discountPrice?: number
  category: string
  rating?: number
}

interface Category {
  id: string
  name: string
  slug: string
  image: string
}

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
}

const NavbarEnhanced = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // States
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      image: '/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png',
      price: 7999,
      quantity: 1,
      category: 'iPhone'
    },
    {
      id: '2',
      name: 'JBL Charge 5',
      image: '/Produtos/jblcharge5.png',
      price: 799,
      quantity: 2,
      category: 'Caixas de Som'
    }
  ])
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      image: '/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png',
      price: 7999,
      category: 'iPhone',
      rating: 4.8
    }
  ])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showFavoritesModal, setShowFavoritesModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  // Refs
  const searchRef = useRef<HTMLInputElement>(null)
  const productsMenuRef = useRef<HTMLDivElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  
  // Mock data - na prática viria do backend
  const brands: Brand[] = [
    {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      image: '/Produtos/Apple/logo.png',
      categories: ['iPhone', 'MacBook', 'AirPods', 'iPad'],
      featured_products: [
        { 
          id: '1', 
          name: 'iPhone 15 Pro', 
          image: '/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png', 
          price: 7999,
          category: 'iPhone',
          rating: 4.8,
          discountPrice: 7499
        },
        { 
          id: '2', 
          name: 'MacBook Air M3', 
          image: '/Produtos/Apple/MacBook Air M3/macbook-air-m3-chip-13-and-15-inch-hero-202403.png', 
          price: 9999,
          category: 'MacBook',
          rating: 4.9
        },
        { 
          id: '3', 
          name: 'AirPods Pro', 
          image: '/Produtos/Apple/AirPods Pro 2/MQKE3.png', 
          price: 2499,
          category: 'AirPods',
          rating: 4.7
        }
      ]
    },
    {
      id: '2',
      name: 'DJI',
      slug: 'dji',
      image: '/Produtos/DJI/logo.png',
      categories: ['Drones', 'Câmeras', 'Gimbals', 'Acessórios'],
      featured_products: [
        { 
          id: '4', 
          name: 'DJI Mini 4 Pro', 
          image: '/Produtos/DJI/DJI Mini 4 Pro/DJI_Mini_4_Pro_and_DJI_RC_2-removebg-preview.png', 
          price: 4999,
          category: 'Drones',
          rating: 4.8
        },
        { 
          id: '5', 
          name: 'DJI Action 4', 
          image: '/Produtos/DJI/DJI Action 4/DJI-Action-4-Standard-Combo.png', 
          price: 2499,
          category: 'Câmeras',
          rating: 4.6
        }
      ]
    },
    {
      id: '3',
      name: 'JBL',
      slug: 'jbl',
      image: '/Produtos/JBL/logo.png',
      categories: ['Fones de Ouvido', 'Caixas de Som', 'Soundbars', 'Acessórios'],
      featured_products: [
        { 
          id: '6', 
          name: 'JBL Tune 770NC', 
          image: '/Produtos/JBL/JBL Tune 770NC/JBL_TUNE770NC_Product%20Image_Hero_Blue.png', 
          price: 899,
          category: 'Fones de Ouvido',
          rating: 4.5
        },
        { 
          id: '7', 
          name: 'JBL Charge 5', 
          image: '/Produtos/jblcharge5.png', 
          price: 1299,
          category: 'Caixas de Som',
          rating: 4.7
        }
      ]
    },
    {
      id: '4',
      name: 'Xiaomi',
      slug: 'xiaomi',
      image: '/Produtos/Xiaomi/logo.png',
      categories: ['Redmi', 'Mi', 'POCO', 'Acessórios'],
      featured_products: [
        { 
          id: '10', 
          name: 'Xiaomi 14 Ultra', 
          image: '/Produtos/Xiaomi/Xiaomi 14 Ultra/xiaomi-14-ultra.png', 
          price: 5999,
          category: 'Smartphones',
          rating: 4.8
        },
        { 
          id: '11', 
          name: 'Redmi Buds 4', 
          image: '/Produtos/Xiaomi/Redmi Buds 4/redmi-buds-4.png', 
          price: 299,
          category: 'Fones de Ouvido',
          rating: 4.3
        }
      ]
    },
    {
      id: '5',
      name: 'Geonav',
      slug: 'geonav',
      image: '/Produtos/Geonav/logo.png',
      categories: ['GPS', 'Rastreadores', 'Acessórios'],
      featured_products: [
        { 
          id: '12', 
          name: 'GPS Geonav Pro', 
          image: '/Produtos/Geonav/GPS Pro/geonav-gps-pro.png', 
          price: 1299,
          category: 'GPS',
          rating: 4.4
        },
        { 
          id: '13', 
          name: 'Rastreador GT06', 
          image: '/Produtos/Geonav/Rastreador GT06/rastreador-gt06.png', 
          price: 299,
          category: 'Rastreadores',
          rating: 4.2
        }
      ]
    }
  ]

  const categories: Category[] = [
    { id: '1', name: 'Celulares/Smartphones', slug: 'celulares', image: '/images/categories/smartphones.jpg' },
    { id: '2', name: 'Fones de Ouvido', slug: 'fones', image: '/images/categories/headphones.jpg' },
    { id: '3', name: 'Drones', slug: 'drones', image: '/images/categories/drones.jpg' },
    { id: '4', name: 'Gimbals', slug: 'gimbals', image: '/images/categories/gimbals.jpg' },
    { id: '5', name: 'Acessórios', slug: 'acessorios', image: '/images/categories/accessories.jpg' }
  ]

  // Functions
  const buildProductLink = (filters: { brand?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams)
    
    if (filters.brand) {
      params.set('brand', filters.brand)
    }
    if (filters.category) {
      params.set('category', filters.category)
    }
    
    return `/produtos?${params.toString()}`
  }

  const handleProductClick = (product: Product) => {
    router.push(`/produtos/${product.category}/${product.id}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`)
      setIsSearchExpanded(false)
      setSearchTerm('')
      setShowSearchResults(false)
    }
  }

  const performSearch = async (term: string) => {
    if (term.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    try {
      const allProducts = await getAllProducts()
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5)
      
      setSearchResults(filtered)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Erro na busca:', error)
      setSearchResults([])
    }
  }

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems(prev => [...prev, {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        category: product.category
      }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const toggleFavorite = (product: Product) => {
    const isFavorited = favoriteItems.some(item => item.id === product.id)
    if (isFavorited) {
      setFavoriteItems(prev => prev.filter(item => item.id !== product.id))
    } else {
      setFavoriteItems(prev => [...prev, product])
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Aqui você pode adicionar lógica para persistir a preferência
    if (typeof window !== 'undefined') {
      if (!isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  // Effects
  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        performSearch(searchTerm)
      }, 300)
      return () => clearTimeout(debounceTimer)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchTerm])

  const handleBrandClick = (brandSlug: string) => {
    router.push(buildProductLink({ brand: brandSlug }))
    setShowProductsMenu(false)
    setIsMobileMenuOpen(false)
  }

  const handleCategoryClick = (categorySlug: string) => {
    router.push(buildProductLink({ category: categorySlug }))
    setShowProductsMenu(false)
    setIsMobileMenuOpen(false)
  }

  const handleProductNavigation = (productId: string) => {
    // Encontra o produto para obter a categoria
    const allBrandProducts = brands.flatMap(brand => brand.featured_products)
    const product = allBrandProducts.find(p => p.id === productId)
    
    if (product) {
      router.push(`/produtos/${product.category}/${product.id}`)
    } else {
      router.push(`/produtos/${productId}`)
    }
    setShowProductsMenu(false)
    setIsMobileMenuOpen(false)
  }

  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setShowProductsMenu(false)
        setHoveredBrand(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isSearchExpanded && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isSearchExpanded])

  return (
    <>
      {/* Top Info Bar - Hidden on mobile */}
      <div className="hidden md:block bg-uss-primary text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>contato@ussbrasil.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/atendimento" className="hover:underline">Atendimento</Link>
            <Link href="/central-ajuda" className="hover:underline">Central de Ajuda</Link>
            <Link href="/rastreamento" className="hover:underline">Rastreamento</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        
        {/* Layer 1 - Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--uss-primary))] to-[hsl(var(--uss-secondary))] rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                USS
              </div>
              <span className="hidden sm:block text-[hsl(var(--uss-primary))]">Brasil</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className={`relative transition-all duration-300 ${isSearchExpanded ? 'scale-[1.02] shadow-lg' : 'shadow-sm'}`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Search className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                  </div>
                  <Input
                    ref={searchRef}
                    type="text"
                    placeholder="Buscar produtos, marcas, categorias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsSearchExpanded(false)
                        setShowSearchResults(false)
                      }, 200)
                    }}
                    className="pl-12 pr-4 py-3 w-full bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] rounded-xl focus:ring-2 focus:ring-[hsl(var(--uss-primary))] focus:border-[hsl(var(--uss-primary))] transition-all duration-300 hover:bg-[hsl(var(--card))] hover:border-[hsl(var(--uss-primary-light))]"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('')
                        setSearchResults([])
                        setShowSearchResults(false)
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Utility Icons */}
            <div className="flex items-center space-x-2">
              
              {/* Favorites - Only when logged in */}
              {isLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative p-3 hover:bg-[hsl(var(--muted))] transition-colors rounded-xl"
                  onClick={() => setShowFavoritesModal(true)}
                >
                  <Heart className="h-5 w-5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--uss-secondary))]" />
                  {favoriteItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-[hsl(var(--uss-error))] text-white rounded-full border-2 border-white">
                      {favoriteItems.length}
                    </Badge>
                  )}
                </Button>
              )}

              {/* User Profile */}
              <div className="relative group">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-3 hover:bg-[hsl(var(--muted))] transition-colors rounded-xl"
                  onClick={() => setShowLoginModal(true)}
                >
                  <User className="h-5 w-5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--uss-primary))]" />
                </Button>
              </div>

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-3 hover:bg-[hsl(var(--muted))] transition-colors rounded-xl"
                onClick={() => setShowCartModal(true)}
              >
                <ShoppingCart className="h-5 w-5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--uss-primary))]" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-[hsl(var(--uss-error))] text-white rounded-full border-2 border-white">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-3 hover:bg-[hsl(var(--muted))] transition-colors rounded-xl"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--uss-warning))]" />
                ) : (
                  <Moon className="h-5 w-5 text-[hsl(var(--foreground))] hover:text-[hsl(var(--uss-primary))]" />
                )}
              </Button>
                onClick={toggleDarkMode}
                className="p-2"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Layer 2 - Navigation Links - Desktop Only */}
        <div className="hidden md:block border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-3">
              
              {/* Products Mega Menu */}
              <div 
                className="relative"
                ref={productsMenuRef}
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => {
                  setShowProductsMenu(false)
                  setHoveredBrand(null)
                }}
              >
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-uss-primary transition-colors duration-200">
                  <span>Produtos</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {showProductsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-screen max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8"
                    >
                      <div className="grid grid-cols-12 gap-8">
                        
                        {/* Brands Column */}
                        <div className="col-span-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Marcas</h3>
                          <div className="space-y-2">
                            {brands.map((brand) => (
                              <button
                                key={brand.id}
                                onClick={() => handleBrandClick(brand.slug)}
                                onMouseEnter={() => setHoveredBrand(brand.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                                  hoveredBrand === brand.id 
                                    ? 'bg-uss-primary text-white' 
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                {brand.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Brand Details Panel */}
                        <div className="col-span-9">
                          {hoveredBrand && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className="h-full"
                            >
                              {(() => {
                                const brand = brands.find(b => b.id === hoveredBrand)
                                if (!brand) return null

                                return (
                                  <div className="grid grid-cols-2 gap-8 h-full">
                                    {/* Brand Info */}
                                    <div>
                                      <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                          <img 
                                            src={brand.image} 
                                            alt={brand.name}
                                            className="w-12 h-12 object-contain"
                                            loading="lazy"
                                          />
                                        </div>
                                        <div>
                                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">{brand.name}</h4>
                                          <p className="text-gray-600 dark:text-gray-400">Produtos premium</p>
                                        </div>
                                      </div>
                                      
                                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Categorias</h5>
                                      <div className="grid grid-cols-2 gap-2 mb-4">
                                        {brand.categories.map((category, index) => (
                                          <button
                                            key={index}
                                            onClick={() => handleCategoryClick(category.toLowerCase())}
                                            className="text-sm text-uss-primary hover:text-uss-secondary transition-colors text-left"
                                          >
                                            {category}
                                          </button>
                                        ))}
                                      </div>
                                      
                                      <Button 
                                        onClick={() => handleBrandClick(brand.slug)}
                                        className="w-full bg-uss-primary hover:bg-uss-primary/90"
                                      >
                                        Ver Todos os Produtos
                                      </Button>
                                    </div>

                                    {/* Featured Products */}
                                    <div>
                                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Produtos em Destaque</h5>
                                      <div className="space-y-3">
                                        {brand.featured_products.slice(0, 3).map((product) => (
                                          <button
                                            key={product.id}
                                            onClick={() => handleProductClick(product)}
                                            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                          >
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex-shrink-0">
                                              <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="lazy"
                                              />
                                            </div>
                                            <div className="flex-1 text-left">
                                              <h6 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h6>
                                              <p className="text-sm text-uss-primary">R$ {product.price.toLocaleString('pt-BR')}</p>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })()}
                            </motion.div>
                          )}
                          
                          {!hoveredBrand && (
                            <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                              <p>Passe o mouse sobre uma marca para ver detalhes</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ver Todos Button */}
              <Link href="/produtos" className="text-gray-700 dark:text-gray-200 hover:text-uss-primary transition-colors duration-200 font-medium">
                Ver Todos
              </Link>

              {/* Other Navigation Links */}
              <Link href="/categorias" className="text-gray-700 dark:text-gray-200 hover:text-uss-primary transition-colors duration-200">
                Categorias
              </Link>
              <Link href="/ofertas" className="text-gray-700 dark:text-gray-200 hover:text-uss-primary transition-colors duration-200">
                Ofertas
              </Link>
              <Link href="/atendimento" className="text-gray-700 dark:text-gray-200 hover:text-uss-primary transition-colors duration-200">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-4">
                
                {/* Products Accordion */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button 
                    className="w-full flex items-center justify-between p-3 text-left font-medium text-gray-900 dark:text-white"
                    onClick={() => {/* Toggle accordion */}}
                  >
                    <span>Produtos</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  {/* Accordion Content */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-3 space-y-3">
                    {brands.map((brand) => (
                      <div key={brand.id} className="border border-gray-100 dark:border-gray-600 rounded-lg">
                        <button 
                          className="w-full flex items-center justify-between p-3 text-left"
                          onClick={() => handleBrandClick(brand.slug)}
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{brand.name}</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ver Todos Link */}
                <Link 
                  href="/produtos" 
                  className="block py-3 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ver Todos os Produtos
                </Link>

                {/* Other Links */}
                <Link 
                  href="/categorias" 
                  className="block py-3 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categorias
                </Link>
                <Link 
                  href="/ofertas" 
                  className="block py-3 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link 
                  href="/atendimento" 
                  className="block py-3 text-gray-700 dark:text-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results Modal */}
      {showSearchResults && searchResults.length > 0 && (
        <div 
          ref={searchResultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {searchResults.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                <p className="text-sm font-bold text-blue-600">R$ {product.price.toLocaleString('pt-BR')}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {showCartModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCartModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Carrinho ({cartItems.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCartModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          <p className="font-bold text-blue-600">R$ {item.price.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-blue-600">
                      R$ {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Finalizar Compra
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Modal */}
      <AnimatePresence>
        {showFavoritesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFavoritesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Favoritos ({favoriteItems.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFavoritesModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {favoriteItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Nenhum produto favoritado</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          <p className="font-bold text-blue-600">R$ {item.price.toLocaleString('pt-BR')}</p>
                          {item.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-500 ml-1">{item.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(item)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {isLoggedIn ? 'Minha Conta' : 'Entrar'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">João Silva</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">joao@email.com</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Package className="h-4 w-4 mr-2" />
                        Meus Pedidos
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Lista de Desejos
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Sair
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Senha
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="w-full"
                      />
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      Entrar
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Não tem conta? 
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          Cadastre-se
                        </Button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavbarEnhanced
