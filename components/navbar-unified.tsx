'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, ShoppingCart, User, Heart, Package, Menu, X, 
  Sun, Moon, Star, ChevronRight, ChevronDown 
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useModal } from '@/contexts/ModalContext'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/hooks/use-theme'

// Types
interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  brand: string
  category: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isBestSeller?: boolean
  stock?: number
}

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  image: string
  description: string
  categories: string[]
  featured_products: Product[]
  isNew?: boolean
  isTrending?: boolean
  bgColor?: string
  textColor?: string
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15 }
}

// Mock data - você pode importar de um arquivo separado
const categories = [
  { name: 'Smartphones', href: '/categoria/smartphones', count: 142 },
  { name: 'Laptops', href: '/categoria/laptops', count: 89 },
  { name: 'Tablets', href: '/categoria/tablets', count: 67 },
  { name: 'Smartwatches', href: '/categoria/smartwatches', count: 45 },
  { name: 'Headphones', href: '/categoria/headphones', count: 156 },
  { name: 'Câmeras', href: '/categoria/cameras', count: 78 },
  { name: 'Gaming', href: '/categoria/gaming', count: 234 },
  { name: 'Acessórios', href: '/categoria/acessorios', count: 567 }
]

const brands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    slug: 'apple',
    logo: '/icons/Apple.png',
    image: '/brands/apple-banner.jpg',
    description: 'Inovação e design premium',
    categories: ['Smartphones', 'Tablets', 'Laptops', 'Smartwatches'],
    featured_products: [],
    isNew: false,
    isTrending: true,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-900'
  },
  {
    id: '2', 
    name: 'Xiaomi',
    slug: 'xiaomi',
    logo: '/icons/xiaomi-logo.png',
    image: '/brands/xiaomi-banner.jpg',
    description: 'Tecnologia acessível e inovadora',
    categories: ['Smartphones', 'Tablets', 'Acessórios'],
    featured_products: [],
    isNew: true,
    isTrending: true,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900'
  },
  {
    id: '3',
    name: 'JBL',
    slug: 'jbl',
    logo: '/icons/jbl-logo.png',
    image: '/brands/jbl-banner.jpg',
    description: 'Som profissional para todos',
    categories: ['Headphones', 'Audio'],
    featured_products: [],
    isNew: false,
    isTrending: false,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-900'
  }
]

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 8999.99,
    discountPrice: 7999.99,
    image: '/produtos/iphone-15-pro.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.9,
    reviewCount: 1247,
    isNew: true,
    isBestSeller: true,
    stock: 45
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 12999.99,
    image: '/produtos/macbook-pro-m3.jpg', 
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.8,
    reviewCount: 892,
    isNew: true,
    stock: 23
  },
  {
    id: '3',
    name: 'Apple Watch Ultra 2',
    price: 5999.99,
    image: '/produtos/apple-watch-ultra.jpg',
    brand: 'Apple', 
    category: 'Smartwatches',
    rating: 4.7,
    reviewCount: 634,
    stock: 67
  }
]

export default function NavbarEnhancedContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const router = useRouter()
  const { openModal } = useModal()
  const { user, logout } = useAuth()
  const { items, itemCount } = useCart()
  const { theme, setTheme } = useTheme()
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      // Simular busca - substituir por API real
      const results = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <motion.nav 
      ref={navRef}
      className="navbar navbar-glass fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="uss-container">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-brand hover-scale">
            <Image
              src="/Empresa/USSBrasil_LOGO.png"
              alt="USS Brasil"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Categories Dropdown */}
            <div 
              className="dropdown"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-link flex items-center gap-2">
                Categorias
                <ChevronDown size={16} className={cn(
                  "transition-transform duration-200",
                  activeDropdown === 'categories' && "rotate-180"
                )} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div
                    {...fadeInUp}
                    className="dropdown-menu w-80"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-4 text-primary">
                        Todas as Categorias
                      </h3>
                      <motion.div 
                        {...staggerChildren}
                        className="grid grid-cols-2 gap-2"
                      >
                        {categories.map((category) => (
                          <motion.div key={category.name} {...fadeInUp}>
                            <Link
                              href={category.href}
                              className="dropdown-item flex justify-between items-center"
                            >
                              <span>{category.name}</span>
                              <Badge className="badge badge-secondary">
                                {category.count}
                              </Badge>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                      <div className="mt-4 pt-4 border-t border-primary">
                        <Link 
                          href="/categorias"
                          className="btn btn-primary btn-sm w-full"
                        >
                          Ver Todas as Categorias
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Brands Dropdown */}
            <div 
              className="dropdown"
              onMouseEnter={() => setActiveDropdown('brands')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-link flex items-center gap-2">
                Marcas
                <ChevronDown size={16} className={cn(
                  "transition-transform duration-200",
                  activeDropdown === 'brands' && "rotate-180"
                )} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'brands' && (
                  <motion.div
                    {...fadeInUp}
                    className="dropdown-menu w-96"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-4 text-primary">
                        Marcas em Destaque
                      </h3>
                      <motion.div {...staggerChildren} className="space-y-3">
                        {brands.map((brand) => (
                          <motion.div key={brand.id} {...fadeInUp}>
                            <Link
                              href={`/marca/${brand.slug}`}
                              className={cn(
                                "flex items-center gap-4 p-3 rounded-lg transition-all duration-200",
                                "hover:bg-tertiary hover:scale-[1.02]",
                                brand.bgColor
                              )}
                            >
                              <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={40}
                                height={40}
                                className="rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className={cn("font-semibold", brand.textColor)}>
                                    {brand.name}
                                  </h4>
                                  {brand.isNew && (
                                    <Badge className="badge badge-success">Novo</Badge>
                                  )}
                                  {brand.isTrending && (
                                    <Badge className="badge badge-warning">Trending</Badge>
                                  )}
                                </div>
                                <p className={cn("text-sm opacity-70", brand.textColor)}>
                                  {brand.description}
                                </p>
                              </div>
                              <ChevronRight size={16} className="opacity-50" />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                      <div className="mt-4 pt-4 border-t border-primary">
                        <Link 
                          href="/marcas"
                          className="btn btn-secondary btn-sm w-full"
                        >
                          Ver Todas as Marcas
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Links */}
            <Link href="/ofertas" className="navbar-link">Ofertas</Link>
            <Link href="/novidades" className="navbar-link">Novidades</Link>
            <Link href="/atendimento" className="navbar-link">Suporte</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="input-group w-full">
              <Search className="input-group-icon" size={18} />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="input pl-10"
              />
            </div>
            
            {/* Search Results */}
            <AnimatePresence>
              {isSearchOpen && (searchResults.length > 0 || searchQuery.length > 2) && (
                <motion.div
                  {...fadeInUp}
                  className="absolute top-full left-0 right-0 mt-2 card card-glass max-h-80 overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-4 border-b border-primary">
                        <h4 className="font-semibold">
                          Resultados para "{searchQuery}"
                        </h4>
                      </div>
                      <div className="py-2">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/produto/${product.id}`}
                            className="flex items-center gap-4 p-3 hover:bg-tertiary transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false)
                              setSearchQuery('')
                            }}
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium">{product.name}</h5>
                              <p className="text-sm text-secondary">{product.brand}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-semibold text-primary">
                                  {formatPrice(product.discountPrice || product.price)}
                                </span>
                                {product.discountPrice && (
                                  <span className="text-sm text-tertiary line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="mx-auto mb-4 text-tertiary" size={48} />
                      <p className="text-secondary">
                        Nenhum resultado encontrado para "{searchQuery}"
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover-scale"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openModal('favorites')}
              className="hover-scale relative"
            >
              <Heart size={18} />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openModal('cart')}
              className="hover-scale relative"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <Badge className="badge badge-primary absolute -top-2 -right-2 text-xs min-w-[20px] h-5">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <div 
                className="dropdown"
                onMouseEnter={() => setActiveDropdown('user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Button variant="ghost" size="sm" className="hover-scale">
                  <User size={18} />
                </Button>
                
                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      {...fadeInUp}
                      className="dropdown-menu right-0"
                    >
                      <div className="p-4 border-b border-primary">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-secondary">{user.email}</p>
                      </div>
                      <Link href="/perfil" className="dropdown-item">
                        Meu Perfil
                      </Link>
                      <Link href="/meus-pedidos" className="dropdown-item">
                        Meus Pedidos
                      </Link>
                      <Link href="/favoritos" className="dropdown-item">
                        Favoritos
                      </Link>
                      <div className="dropdown-divider" />
                      <button
                        onClick={logout}
                        className="dropdown-item text-error w-full text-left"
                      >
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => openModal('auth')}
                className="btn btn-primary"
              >
                Entrar
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover-scale"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-primary bg-secondary"
            >
              <div className="p-4 space-y-4">
                {/* Mobile Search */}
                <div className="input-group">
                  <Search className="input-group-icon" size={18} />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    className="input pl-10"
                  />
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-2">
                  <Link href="/categorias" className="block py-3 px-4 hover:bg-tertiary rounded-lg transition-colors">
                    Categorias
                  </Link>
                  <Link href="/marcas" className="block py-3 px-4 hover:bg-tertiary rounded-lg transition-colors">
                    Marcas
                  </Link>
                  <Link href="/ofertas" className="block py-3 px-4 hover:bg-tertiary rounded-lg transition-colors">
                    Ofertas
                  </Link>
                  <Link href="/novidades" className="block py-3 px-4 hover:bg-tertiary rounded-lg transition-colors">
                    Novidades
                  </Link>
                  <Link href="/atendimento" className="block py-3 px-4 hover:bg-tertiary rounded-lg transition-colors">
                    Suporte
                  </Link>
                </div>

                {/* Mobile Actions */}
                {!user && (
                  <div className="pt-4 border-t border-primary">
                    <Button
                      onClick={() => {
                        openModal('auth')
                        setIsMobileMenuOpen(false)
                      }}
                      className="btn btn-primary w-full"
                    >
                      Entrar / Cadastrar
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
