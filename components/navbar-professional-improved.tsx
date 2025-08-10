'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Package,
  Headphones,
  Smartphone,
  Camera,
  Gamepad2,
  Laptop,
  Watch,
  Truck,
  CreditCard,
  Shield,
  HelpCircle,
  Users,
  FileText
} from 'lucide-react'

// Tipos para tipagem
interface Category {
  id: string
  name: string
  slug: string
  icon: any
  count: number
}

interface Brand {
  id: string
  name: string
  slug: string
  count: number
}

interface FilterParams {
  category?: string
  brand?: string
  search?: string
  minPrice?: string
  maxPrice?: string
  rating?: string
  inStock?: string
  featured?: string
  discount?: string
}

const ProfessionalNavbar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount] = useState(3)
  const [favoriteCount] = useState(5)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Categorias principais
  const categories: Category[] = [
    {
      id: '1',
      name: 'Fones de Ouvido',
      slug: 'fones-de-ouvido',
      icon: Headphones,
      count: 48
    },
    {
      id: '2', 
      name: 'Celulares/Smartphones',
      slug: 'celulares-smartphones',
      icon: Smartphone,
      count: 156
    },
    {
      id: '3',
      name: 'Gimbals',
      slug: 'gimbals',
      icon: Camera,
      count: 24
    },
    {
      id: '4',
      name: 'Acessórios',
      slug: 'acessorios',
      icon: Package,
      count: 89
    }
  ]

  // Marcas principais
  const brands: Brand[] = [
    { id: '1', name: 'JBL', slug: 'jbl', count: 34 },
    { id: '2', name: 'Xiaomi', slug: 'xiaomi', count: 67 },
    { id: '3', name: 'Samsung', slug: 'samsung', count: 89 },
    { id: '4', name: 'Apple', slug: 'apple', count: 45 },
    { id: '5', name: 'DJI', slug: 'dji', count: 23 },
    { id: '6', name: 'Sony', slug: 'sony', count: 41 }
  ]

  // Links de suporte/atendimento
  const supportLinks = [
    { name: 'Atendimento', href: '/atendimento', icon: HelpCircle },
    { name: 'Central de Ajuda', href: '/central-ajuda', icon: HelpCircle },
    { name: 'Como Comprar', href: '/como-comprar', icon: CreditCard },
    { name: 'Política de Troca', href: '/politica-troca', icon: Package },
    { name: 'Garantia', href: '/garantia', icon: Shield },
    { name: 'Rastreamento', href: '/rastreamento', icon: Truck }
  ]

  // Links da empresa
  const companyLinks = [
    { name: 'Trabalhe Conosco', href: '/trabalhe-conosco', icon: Users },
    { name: 'Imprensa', href: '/imprensa', icon: FileText }
  ]

  // Função para preservar filtros na navegação
  const buildProductLink = (filters: FilterParams) => {
    const params = new URLSearchParams()
    
    // Preservar filtros existentes
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (!filters.hasOwnProperty(key)) {
          params.set(key, value)
        }
      })
    }
    
    // Adicionar novos filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })
    
    return `/products?${params.toString()}`
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const link = buildProductLink({ search: searchTerm.trim() })
      router.push(link)
    }
  }

  const handleCategoryClick = (slug: string) => {
    const link = buildProductLink({ category: slug })
    router.push(link)
  }

  const handleBrandClick = (slug: string) => {
    const link = buildProductLink({ brand: slug })
    router.push(link)
  }

  return (
    <>
      {/* TOP BAR - Primeira Parte (Menor e mais compacta) */}
      <div 
        className="text-white py-1.5 hidden lg:block"
        style={{ background: 'var(--uss-gradient-premium)' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            {/* Informações de Contato */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>contato@ussbrasil.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="h-3 w-3" />
                <span>Frete Grátis acima de R$ 299</span>
              </div>
            </div>

            {/* Links de Suporte e Empresa */}
            <div className="flex items-center space-x-3">
              {/* Links Principais */}
              {supportLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-yellow-200 transition-colors flex items-center space-x-1"
                >
                  <link.icon className="h-3 w-3" />
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {/* Dropdown com mais links */}
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-yellow-200 transition-colors">
                  <span>Mais</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-50">
                  <div className="py-2">
                    {/* Restante dos links de suporte */}
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Suporte
                    </div>
                    {supportLinks.slice(3).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-uss-primary transition-colors"
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </Link>
                    ))}
                    
                    {/* Links da empresa */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Empresa
                      </div>
                      {companyLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-uss-primary transition-colors"
                        >
                          <link.icon className="h-4 w-4" />
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR - Segunda Parte (Maior e principal) */}
      <motion.header 
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg border-b' : 'border-b border-gray-100'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">USS</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-900">USS Brasil</h1>
                <p className="text-sm text-gray-500">Tecnologia Premium</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              
              {/* Categorias Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('categories')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-uss-primary transition-colors font-medium"
                >
                  <span>Categorias</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === 'categories' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'categories' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
                    >
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Nossas Categorias</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                handleCategoryClick(category.slug)
                                setActiveDropdown(null)
                              }}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-uss-primary/10 to-uss-secondary/10 rounded-lg flex items-center justify-center group-hover:from-uss-primary/20 group-hover:to-uss-secondary/20 transition-colors">
                                <category.icon className="h-5 w-5 text-uss-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                                <p className="text-xs text-gray-500">{category.count} produtos</p>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link 
                            href="/categories"
                            className="text-uss-primary hover:text-uss-secondary text-sm font-medium"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Ver todas as categorias →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Marcas Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('brands')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-uss-primary transition-colors font-medium"
                >
                  <span>Marcas</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === 'brands' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'brands' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
                    >
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Marcas Premium</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {brands.map((brand) => (
                            <button
                              key={brand.id}
                              onClick={() => {
                                handleBrandClick(brand.slug)
                                setActiveDropdown(null)
                              }}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm group-hover:from-uss-primary/10 group-hover:to-uss-secondary/10 group-hover:text-uss-primary transition-colors">
                                {brand.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{brand.name}</h4>
                                <p className="text-xs text-gray-500">{brand.count} produtos</p>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link 
                            href="/brands"
                            className="text-uss-primary hover:text-uss-secondary text-sm font-medium"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Ver todas as marcas →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Links diretos */}
              <Link 
                href={buildProductLink({})}
                className="text-gray-700 hover:text-uss-primary transition-colors font-medium"
              >
                Produtos
              </Link>
              
              <Link 
                href="/contact"
                className="text-gray-700 hover:text-uss-primary transition-colors font-medium"
              >
                Contato
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uss-primary focus:border-transparent transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              
              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-uss-primary transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* User Account */}
              <Link
                href="/account"
                className="hidden sm:flex items-center space-x-2 p-2 text-gray-600 hover:text-uss-primary transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="hidden lg:block text-sm font-medium">Conta</span>
              </Link>

              {/* Favorites */}
              <Link
                href="/favorites"
                className="relative p-2 text-gray-600 hover:text-uss-primary transition-colors"
              >
                <Heart className="h-6 w-6" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-uss-primary transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-uss-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-uss-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 md:hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="O que você está procurando?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uss-primary focus:border-transparent"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 lg:hidden bg-white"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-6">
                  
                  {/* Mobile Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Categorias</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            handleCategoryClick(category.slug)
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <category.icon className="h-5 w-5 text-uss-primary" />
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">{category.count} produtos</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Brands */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Marcas</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {brands.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => {
                            handleBrandClick(brand.slug)
                            setIsMenuOpen(false)
                          }}
                          className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">{brand.count} produtos</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Links */}
                  <div className="space-y-2">
                    <Link 
                      href={buildProductLink({})}
                      className="block p-3 text-gray-700 hover:text-uss-primary transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Todos os Produtos
                    </Link>
                    <Link 
                      href="/contact"
                      className="block p-3 text-gray-700 hover:text-uss-primary transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contato
                    </Link>
                  </div>

                  {/* Mobile Support Links */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Suporte</h3>
                    <div className="space-y-2">
                      {supportLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center space-x-3 p-3 text-gray-700 hover:text-uss-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <link.icon className="h-5 w-5" />
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default ProfessionalNavbar
