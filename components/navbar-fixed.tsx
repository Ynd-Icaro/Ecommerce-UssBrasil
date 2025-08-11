'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  User, 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  ChevronDown, 
  Heart,
  LogIn,
  UserPlus,
  LogOut,
  UserCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useModal } from '@/contexts/ModalContext'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/hooks/use-theme'
import data from '@/db.json'

// Types
export type Product = {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountPrice?: number | null
  image: string
  images?: string[]
  category: string
  stock: number
  status: 'active'
  tags?: string[]
  featured: boolean
  rating?: number
  totalReviews?: number
  colors?: string[]
  createdAt?: string
  specifications?: object
  paymentOptions?: number
}

// Utils
const fixPath = (path: string) => {
  if (!path) return '/fallback-product.png'
  if (path.startsWith('Ecommerce-UssBrasil/public/')) {
    return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
  }
  return path
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

// Data
const products: Product[] = data.products.map(p => ({
  ...p,
  image: fixPath(p.image),
  images: p.images?.map(fixPath) || [fixPath(p.image)],
  status: 'active' as const
}))

const brands = Array.from(new Set(products.map(p => p.brand))).map(brand => ({
  name: brand,
  href: `/products?brand=${brand.toLowerCase()}`,
  count: products.filter(p => p.brand === brand).length
}))

const primaryMenuItems = [
  { name: 'Produtos', href: '/products' },
  { name: 'Categorias', href: '/categories' },
  { name: 'Marcas', href: '/brands' },
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Novidades', href: '/novidades' },
  { name: 'Contato', href: '/contato' }
]

const categoryItems = [
  { name: 'Smartphones', href: '/products?category=smartphone' },
  { name: 'Tablets', href: '/products?category=tablet' },
  { name: 'Notebooks', href: '/products?category=notebook' },
  { name: 'Smartwatches', href: '/products?category=smartwatch' },
  { name: 'Headphones', href: '/products?category=headphones' },
  { name: 'Câmeras', href: '/products?category=camera' },
  { name: 'Áudio', href: '/products?category=audio' },
  { name: 'Drones', href: '/products?category=drone' }
]

// Components
const Logo = () => (
  <Link href="/" className="flex items-center space-x-3 z-50 group">
    <div className="relative">
      <Image
        src="/Empresa/02.png"
        alt="USS Brasil"
        width={140}
        height={45}
        className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </div>
  </Link>
)

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearchFocused, 
  setIsSearchFocused, 
  searchRef 
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Product[]
  isSearchFocused: boolean
  setIsSearchFocused: (focused: boolean) => void
  searchRef: React.RefObject<HTMLDivElement>
}) => (
  <div className="hidden md:block flex-1 max-w-lg mx-6" ref={searchRef}>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-uss-primary bg-white/80 backdrop-blur-sm dark:bg-uss-dark/80 dark:border-uss-gray dark:text-white"
      />
    </div>

    <AnimatePresence>
      {isSearchFocused && searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-uss-dark rounded-xl shadow-xl border border-gray-100 dark:border-uss-gray py-2 z-50"
        >
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-uss-gray/20 transition-colors"
              onClick={() => setIsSearchFocused(false)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{product.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                <span className="text-sm font-bold text-uss-primary">
                  {formatPrice(product.discountPrice || product.price)}
                </span>
              </div>
            </Link>
          ))}
          <Link
            href="/products"
            className="block text-center py-3 text-uss-primary font-medium hover:text-uss-secondary transition-colors border-t border-gray-100 dark:border-uss-gray mt-2"
            onClick={() => setIsSearchFocused(false)}
          >
            Ver todos os produtos
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const UserActions = ({ 
  openFavorites, 
  openCart, 
  favoritesCount, 
  cartCount, 
  showUserMenu, 
  setShowUserMenu, 
  userMenuRef, 
  isLoggedIn, 
  setIsLoggedIn, 
  openProfile, 
  setIsMobileMenuOpen, 
  isMobileMenuOpen 
}: {
  openFavorites: () => void
  openCart: () => void
  favoritesCount: number
  cartCount: number
  showUserMenu: boolean
  setShowUserMenu: (show: boolean) => void
  userMenuRef: React.RefObject<HTMLDivElement>
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  openProfile: () => void
  setIsMobileMenuOpen: (open: boolean) => void
  isMobileMenuOpen: boolean
}) => (
  <div className="flex items-center space-x-3">
    {/* Favoritos */}
    <button 
      onClick={openFavorites}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-uss-primary transition-colors"
    >
      <Heart className="h-6 w-6" />
      {favoritesCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-uss-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {favoritesCount}
        </span>
      )}
    </button>

    {/* Carrinho */}
    <button 
      onClick={openCart}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-uss-primary transition-colors"
    >
      <ShoppingBag className="h-6 w-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-uss-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>

    {/* Menu do Usuário */}
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-uss-primary transition-colors"
      >
        <User className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-uss-dark rounded-xl shadow-xl border border-gray-100 dark:border-uss-gray py-2 z-50"
          >
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => {
                    openProfile()
                    setShowUserMenu(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors w-full text-left"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Meu Perfil</span>
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-red-500 transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/register" 
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Registro</span>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Menu Mobile Toggle */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-uss-primary transition-colors"
    >
      {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  </div>
)

const DropdownMenu = ({ 
  activeDropdown, 
  setActiveDropdown, 
  pathname 
}: {
  activeDropdown: string | null
  setActiveDropdown: (dropdown: string | null) => void
  pathname: string
}) => (
  <nav className="hidden lg:block container mx-auto px-4">
    <div className="flex items-center justify-center h-12">
      <div className="flex items-center space-x-8">
        
        {/* Produtos Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setActiveDropdown('produtos')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            href="/products"
            className={`flex items-center space-x-1 font-medium transition-colors hover:text-uss-primary ${
              pathname === '/products' ? 'text-uss-primary' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>Produtos</span>
            <ChevronDown className="h-4 w-4" />
          </Link>

          <AnimatePresence>
            {activeDropdown === 'produtos' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-uss-dark rounded-xl shadow-xl border border-gray-100 dark:border-uss-gray py-2 z-50"
              >
                <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Por Marca
                </div>
                {brands.slice(0, 8).map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors"
                  >
                    <span className="font-medium">{brand.name}</span>
                    <span className="text-xs text-gray-400">({brand.count})</span>
                  </Link>
                ))}
                <Link
                  href="/brands"
                  className="block text-center py-3 text-uss-primary font-medium hover:text-uss-secondary transition-colors border-t border-gray-100 dark:border-uss-gray mt-2"
                >
                  Ver todas as marcas
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categorias Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setActiveDropdown('categorias')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            href="/categories"
            className={`flex items-center space-x-1 font-medium transition-colors hover:text-uss-primary ${
              pathname === '/categories' ? 'text-uss-primary' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>Categorias</span>
            <ChevronDown className="h-4 w-4" />
          </Link>

          <AnimatePresence>
            {activeDropdown === 'categorias' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-uss-dark rounded-xl shadow-xl border border-gray-100 dark:border-uss-gray py-2 z-50"
              >
                {categoryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Marcas Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setActiveDropdown('marcas')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            href="/brands"
            className={`flex items-center space-x-1 font-medium transition-colors hover:text-uss-primary ${
              pathname === '/brands' ? 'text-uss-primary' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>Marcas</span>
            <ChevronDown className="h-4 w-4" />
          </Link>

          <AnimatePresence>
            {activeDropdown === 'marcas' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-uss-dark rounded-xl shadow-xl border border-gray-100 dark:border-uss-gray py-2 z-50 grid grid-cols-2 gap-1"
              >
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors rounded-lg mx-1"
                  >
                    <span className="font-medium text-sm">{brand.name}</span>
                    <span className="text-xs text-gray-400">({brand.count})</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Links diretos */}
        {['Ofertas', 'Novidades', 'Contato'].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className={`font-medium transition-colors hover:text-uss-primary ${
              pathname === `/${item.toLowerCase()}` ? 'text-uss-primary' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  </nav>
)

const MobileMenu = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  searchQuery, 
  setSearchQuery, 
  openFavorites, 
  openCart, 
  openProfile 
}: {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  openFavorites: () => void
  openCart: () => void
  openProfile: () => void
}) => (
  <AnimatePresence>
    {isMobileMenuOpen && (
      <>
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="lg:hidden fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-uss-dark shadow-2xl z-50"
        >
          <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-uss-gray">
              <Image
                src="/Empresa/02.png"
                alt="Logo"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Busca Mobile */}
            <div className="p-4 border-b border-gray-200 dark:border-uss-gray">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-uss-gray rounded-xl focus:outline-none focus:border-uss-primary bg-white dark:bg-uss-dark dark:text-white"
                />
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              {primaryMenuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 dark:border-uss-gray">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-4 font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-uss-gray/20 hover:text-uss-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-uss-gray p-4">
              <div className="flex items-center justify-around">
                <button 
                  onClick={() => {
                    openFavorites()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-400"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs">Favoritos</span>
                </button>
                <button 
                  onClick={() => {
                    openCart()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-400"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="text-xs">Carrinho</span>
                </button>
                <button 
                  onClick={() => {
                    openProfile()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-400"
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Conta</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </>
    )}
  </AnimatePresence>
)

// Main Component
export default function FixedNavbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Hooks
  const { openCart, openFavorites, openProfile } = useModal()
  const { cartCount } = useCart()
  const { favorites } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const favoritesCount = favorites.length

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-uss-dark/95 backdrop-blur-xl shadow-xl border-b border-uss-gray-light/20 dark:border-uss-gray/30' 
        : 'bg-white/90 dark:bg-uss-dark/90 backdrop-blur-lg border-b border-uss-gray-light/10 dark:border-uss-gray/20'
    }`}>
      
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            searchRef={searchRef}
          />

          <UserActions
            openFavorites={openFavorites}
            openCart={openCart}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
            showUserMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
            userMenuRef={userMenuRef}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            openProfile={openProfile}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>
      </nav>

      {/* Main Navigation */}
      <DropdownMenu
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        pathname={pathname}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFavorites={openFavorites}
        openCart={openCart}
        openProfile={openProfile}
      />
    </header>
  )
}

