'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  Search, Heart, User, ShoppingCart, Moon, Sun, Menu, X,
  ChevronRight, Star, Plus, Minus, MapPin, Award, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TopBar } from '@/components/navbar/TopBar'
import { ProductsMegaMenu } from '@/components/navbar/ProductsMegaMenu'
import { getAllProducts } from '@/lib/products-manager'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useModal } from '@/contexts/ModalContext'
import { slugifyCategory } from '@/lib/slugify'
import { cn } from '@/lib/utils'

// Enhanced Types
interface Brand {
  id: string
  name: string
  slug: string
  image: string
  logo: string
  description: string
  categories: string[]
  featured_products: Product[]
  isNew?: boolean
  isTrending?: boolean
  bgColor?: string
  textColor?: string
}

interface Product {
  id: string
  name: string
  image: string
  price: number
  discountPrice?: number
  category: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isBestSeller?: boolean
  stock?: number
  brand?: string
}

interface NavbarProps {
  transparent?: boolean
  fixed?: boolean
  className?: string
}

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

const NavbarEnhanced = ({ transparent = false, fixed = true, className }: NavbarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { scrollY } = useScroll()
  
  // Enhanced scroll animations
  const scrollYSpring = useSpring(scrollY, { stiffness: 300, damping: 30 })
  
  // Advanced States
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Contexts
  const { cartItems, addToCart, removeFromCart, updateQuantity, cartCount } = useCart()
  const { user, favorites, toggleFavorite } = useAuth()
  const { setAuthModalOpen, setCartModalOpen } = useModal()
  
  // Refs
  const searchRef = useRef<HTMLInputElement>(null)
  const productsMenuRef = useRef<HTMLDivElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement>(null)
  
  // Enhanced animations with spring physics
  const navbarBg = useTransform(
    scrollYSpring,
    [0, 100],
    [transparent ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  )
  
  const navbarBlur = useTransform(scrollYSpring, [0, 100], [0, 20])
  const navbarScale = useTransform(scrollYSpring, [0, 100], [1, 0.98])

  // Enhanced mock data with proper image props
  const brands: Brand[] = useMemo(() => [
    {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      image: '/Produtos/Apple/Iphone-16-Banner.webp',
      logo: '/brands/apple-logo.svg',
      description: 'Inovação que inspira',
      categories: ['iPhone', 'MacBook', 'AirPods', 'iPad', 'Apple Watch'],
      isNew: false,
      isTrending: true,
      bgColor: 'from-slate-900 to-slate-700',
      textColor: 'text-white',
      featured_products: [
        { 
          id: '1', 
          name: 'iPhone 15 Pro Max', 
          image: '/Produtos/Apple/Iphone-16-Pro.png', 
          price: 9999,
          category: 'iPhone',
          rating: 4.9,
          reviewCount: 1247,
          discountPrice: 8999,
          isNew: true,
          isBestSeller: true,
          stock: 15,
          brand: 'Apple'
        },
        { 
          id: '2', 
          name: 'MacBook Pro M3', 
          image: '/Produtos/Apple/Macbook Air.png', 
          price: 15999,
          category: 'MacBook',
          rating: 4.8,
          reviewCount: 892,
          isBestSeller: true,
          stock: 8,
          brand: 'Apple'
        },
        { 
          id: '3', 
          name: 'AirPods Pro 2', 
          image: '/Produtos/Apple/airpods-max.png', 
          price: 2899,
          category: 'AirPods',
          rating: 4.7,
          reviewCount: 2156,
          isNew: true,
          stock: 32,
          brand: 'Apple'
        }
      ]
    },
    {
      id: '2',
      name: 'DJI',
      slug: 'dji',
      image: '/Produtos/Dji/Drone Dji Neo Standard.webp',
      logo: '/brands/dji-logo.svg',
      description: 'O futuro está no ar',
      categories: ['Drones', 'Câmeras', 'Gimbals', 'Acessórios'],
      isNew: false,
      isTrending: true,
      bgColor: 'from-blue-600 to-blue-800',
      textColor: 'text-white',
      featured_products: [
        { 
          id: '4', 
          name: 'DJI Air 3', 
          image: '/Produtos/Dji/Drone Dji Mini Pro Fly More Combo ( Com tela ).webp', 
          price: 6999,
          category: 'Drones',
          rating: 4.9,
          reviewCount: 543,
          isNew: true,
          isBestSeller: true,
          stock: 12,
          brand: 'DJI'
        },
        { 
          id: '5', 
          name: 'DJI Action 4', 
          image: '/Produtos/Dji/Câmera DJI Osmo Action 4 Standard Combo BR.webp', 
          price: 3499,
          category: 'Câmeras',
          rating: 4.7,
          reviewCount: 298,
          stock: 25,
          brand: 'DJI'
        }
      ]
    },
    {
      id: '3',
      name: 'JBL',
      slug: 'jbl',
      image: '/Produtos/JBL/JBL PartyBox Club 120.webp',
      logo: '/brands/jbl-logo.svg',
      description: 'Som que emociona',
      categories: ['Fones', 'Caixas de Som', 'Soundbars', 'Acessórios'],
      bgColor: 'from-orange-500 to-red-600',
      textColor: 'text-white',
      featured_products: [
        { 
          id: '6', 
          name: 'JBL Tune 760NC', 
          image: '/Produtos/JBL/JBL Tune 670NC.webp', 
          price: 1299,
          category: 'Fones',
          rating: 4.6,
          reviewCount: 1834,
          discountPrice: 999,
          stock: 45,
          brand: 'JBL'
        },
        { 
          id: '7', 
          name: 'JBL Go 4', 
          image: '/Produtos/JBL/JBL Go 4.webp', 
          price: 2999,
          category: 'Caixas de Som',
          rating: 4.8,
          reviewCount: 967,
          isBestSeller: true,
          stock: 18,
          brand: 'JBL'
        }
      ]
    },
    {
      id: '4',
      name: 'Xiaomi',
      slug: 'xiaomi',
      image: '/Produtos/Xiomi/Xiaomi 13 Lite Banner.webp',
      logo: '/brands/xiaomi-logo.svg',
      description: 'Tecnologia para todos',
      categories: ['Redmi', 'Mi', 'POCO', 'Acessórios'],
      isNew: true,
      bgColor: 'from-orange-600 to-orange-800',
      textColor: 'text-white',
      featured_products: [
        { 
          id: '10', 
          name: 'Redmi Note 14 Pro', 
          image: '/Produtos/Xiomi/Redmi Note 14 Pro 5G Combo.webp', 
          price: 4999,
          category: 'Smartphones',
          rating: 4.7,
          reviewCount: 2341,
          isNew: true,
          stock: 28,
          brand: 'Xiaomi'
        },
        { 
          id: '11', 
          name: 'Xiaomi 13 Lite', 
          image: '/Produtos/Xiomi/Xiaomi 13 Lite Combo.webp', 
          price: 399,
          category: 'Smartphones',
          rating: 4.4,
          reviewCount: 567,
          stock: 52,
          brand: 'Xiaomi'
        }
      ]
    }
  ], [])

  // Enhanced functions
  const performSearch = useCallback(async (term: string) => {
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
      ).slice(0, 6)
      
      setSearchResults(filtered)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Erro na busca:', error)
      setSearchResults([])
    }
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`)
      setIsSearchExpanded(false)
      setSearchTerm('')
      setShowSearchResults(false)
    }
  }, [searchTerm, router])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', newMode)
        localStorage.setItem('theme', newMode ? 'dark' : 'light')
      }
      return newMode
    })
  }, [])

  // Enhanced Effects
  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        performSearch(searchTerm)
      }, 200)
      return () => clearTimeout(debounceTimer)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchTerm, performSearch])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setShowProductsMenu(false)
        setHoveredBrand(null)
      }
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
  <TopBar />

      {/* Enhanced Main Navbar with smooth morphing */}
      <motion.nav 
        ref={navbarRef}
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          fixed && "fixed",
          transparent && !isScrolled && "bg-transparent",
          className
        )}
        style={{
          background: isScrolled || !transparent ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled || !transparent ? 'blur(20px)' : 'none',
          borderBottom: isScrolled || !transparent ? '1px solid rgba(0,0,0,0.1)' : 'none',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.12)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Navigation Layer */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Enhanced Logo with magnetic effect */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-sm lg:text-base font-bold shadow-lg relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}
                  whileHover={{
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  }}
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(255,255,255,0)',
                        '0 0 10px rgba(255,255,255,0.5)',
                        '0 0 0px rgba(255,255,255,0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    USS
                  </motion.span>
                </motion.div>
                <motion.div 
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                />
              </motion.div>
              <motion.div 
                className="hidden sm:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent"
                  style={{ background: 'var(--uss-gradient-premium)', WebkitBackgroundClip: 'text' }}
                  whileHover={{ scale: 1.05 }}
                >
                  Brasil
                </motion.span>
                <motion.p 
                  className="text-xs text-slate-500 leading-none"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Tech Store
                </motion.p>
              </motion.div>
            </Link>

            {/* Enhanced Search Bar with morphing animations */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <motion.form 
                onSubmit={handleSearch} 
                className="relative w-full group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="relative"
                  animate={{
                    scale: isSearchFocused ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    animate={{
                      color: isSearchFocused ? '#3b82f6' : '#94a3b8',
                      scale: isSearchFocused ? 1.1 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                  <Input
                    ref={searchRef}
                    type="text"
                    placeholder="Buscar produtos, marcas, categorias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      setIsSearchExpanded(true)
                    }}
                    onBlur={() => {
                      setIsSearchFocused(false)
                      setTimeout(() => setIsSearchExpanded(false), 200)
                    }}
                    className="pl-12 pr-4 py-3 w-full rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
                  />
                  <motion.div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-4 transition-colors"
                    >
                      Buscar
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Enhanced Search Results with staggered animations */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      ref={searchResultsRef}
                      variants={scaleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden"
                    >
                      <div className="p-2">
                        {searchResults.map((product, index) => (
                          <motion.button
                            key={product.id}
                            variants={slideInVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(`/produtos/${product.id}`)}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-colors"
                            whileHover={{ x: 5, scale: 1.02 }}
                          >
                            <motion.div 
                              className="relative"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="rounded-lg object-cover"
                                loading="lazy"
                                quality={75}
                              />
                              {product.isNew && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <Badge className="absolute -top-1 -right-1 text-xs bg-green-500">
                                    Novo
                                  </Badge>
                                </motion.div>
                              )}
                            </motion.div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-slate-900">{product.name}</p>
                              <p className="text-sm text-slate-500">{product.category}</p>
                              <div className="flex items-center space-x-2">
                                {product.rating && (
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-slate-500 ml-1">
                                      {product.rating} ({product.reviewCount})
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {product.discountPrice && (
                                  <span className="text-sm text-slate-400 line-through">
                                    R$ {product.price.toLocaleString('pt-BR')}
                                  </span>
                                )}
                                <span className="font-bold text-blue-600">
                                  R$ {(product.discountPrice || product.price).toLocaleString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>

            {/* Enhanced Action Icons with magnetic hover effects */}
            <motion.div 
              className="flex items-center space-x-2 lg:space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              
              {/* Favorites with pulse animation */}
              {user && (
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative p-2 lg:p-3 rounded-xl hover:bg-slate-100 transition-colors"
                    onClick={() => router.push('/favoritos')}
                  >
                    <motion.div
                      animate={favorites.length > 0 ? {
                        scale: [1, 1.2, 1],
                        color: ['#ef4444', '#f87171', '#ef4444']
                      } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" />
                    </motion.div>
                    {favorites.length > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                      >
                        {favorites.length}
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* User Account with bounce animation */}
              <motion.div 
                whileHover={{ scale: 1.1, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 lg:p-3 rounded-xl hover:bg-slate-100 transition-colors"
                  onClick={() => user ? router.push('/perfil') : setAuthModalOpen(true)}
                >
                  <User className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" />
                </Button>
              </motion.div>

              {/* Shopping Cart with shake animation */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                animate={cartCount > 0 ? {
                  x: [0, -2, 2, 0],
                } : {}}
                transition={{ duration: 0.5, repeat: cartCount > 0 ? Infinity : 0, repeatDelay: 3 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative p-2 lg:p-3 rounded-xl hover:bg-slate-100 transition-colors"
                  onClick={() => setCartModalOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              {/* Dark Mode Toggle with rotation */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="p-2 lg:p-3 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: isDarkMode ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isDarkMode ? 
                      <Sun className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" /> : 
                      <Moon className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" />
                    }
                  </motion.div>
                </Button>
              </motion.div>

              {/* Mobile Menu with morphing icon */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                className="lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Navigation Links with smooth reveal */}
        <motion.div 
          className="hidden lg:block border-t border-slate-200/50 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.8)'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-4">
              
              <ProductsMegaMenu brands={brands} />

              {/* Other Enhanced Navigation Links */}
              {[
                { label: 'Ver Todos', href: '/produtos' },
                { label: 'Categorias', href: '/categorias' },
                { label: 'Ofertas', href: '/ofertas' },
                { label: 'Contato', href: '/atendimento' }
              ].map((link, index) => (
                <motion.div 
                  key={link.href} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={link.href} 
                    aria-label={link.label}
                    className="relative font-medium group transition-all duration-300 text-[var(--uss-text-light)] dark:text-[var(--uss-text)] hover:text-[var(--uss-primary-dark)] dark:hover:text-[var(--uss-primary-light)]"
                  >
                    {link.label}
                    <span
                      className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-0 rounded-full bg-gradient-to-r from-[var(--uss-primary)] via-[var(--uss-accent)] to-[var(--uss-secondary)] transition-all duration-500 group-hover:w-full"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Enhanced Mobile Menu with sophisticated animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              
              {/* Mobile Search */}
              <motion.form 
                onSubmit={handleSearch} 
                className="mb-6"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 w-full rounded-xl border-2 border-slate-200 focus:border-blue-500"
                  />
                </div>
              </motion.form>

              {/* Mobile Navigation */}
              <motion.div 
                className="space-y-3"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                {brands.map((brand, index) => (
                  <motion.button
                    key={brand.id}
                    variants={slideInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * index + 0.3 }}
                    onClick={() => {
                      router.push(`/produtos?brand=${brand.slug}`)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      {brand.logo && (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span>{brand.name}</span>
                      {brand.isNew && (
                        <Badge className="text-xs bg-green-500">Novo</Badge>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </motion.button>
                ))}

                <Separator className="my-4" />

                {/* Quick Links */}
                {[
                  { label: 'Ver Todos os Produtos', href: '/produtos' },
                  { label: 'Categorias', href: '/categorias' },
                  { label: 'Ofertas', href: '/ofertas' },
                  { label: 'Contato', href: '/atendimento' }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={slideInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 + (0.1 * index) }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={link.href} 
                      className="block py-4 text-slate-700 border-b border-slate-200 font-medium hover:text-blue-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavbarEnhanced
