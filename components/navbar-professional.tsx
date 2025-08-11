'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  ShoppingBag, 
  Heart, 
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Package
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Tipos
interface Product {
  id: string
  name: string
  brand: string
  price: number
  discountPrice?: number
  image: string
  category: string
  rating: number
  featured: boolean
}

interface Category {
  id: string
  name: string
  slug: string
  image: string
  count: number
}

interface Brand {
  id: string
  name: string
  logo: string
  count: number
}

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount] = useState(3)
  const [favoriteCount] = useState(5)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Categorias principais
  const mainCategories: Category[] = [
    {
      id: '1',
      name: 'Fones de Ouvido',
      slug: 'fones-de-ouvido',
      image: '/images/categories/fones.jpg',
      count: 48
    },
    {
      id: '2', 
      name: 'Celulares/Smartphones',
      slug: 'celulares-smartphones',
      image: '/images/categories/smartphones.jpg',
      count: 156
    },
    {
      id: '3',
      name: 'Gimbals',
      slug: 'gimbals', 
      image: '/images/categories/gimbals.jpg',
      count: 24
    },
    {
      id: '4',
      name: 'Acessórios',
      slug: 'acessorios',
      image: '/images/categories/acessorios.jpg',
      count: 89
    }
  ]

  // Marcas principais
  const mainBrands: Brand[] = [
    {
      id: '1',
      name: 'JBL',
      logo: '/images/brands/jbl.png',
      count: 34
    },
    {
      id: '2',
      name: 'Xiaomi',
      logo: '/images/brands/xiaomi.png',
      count: 67
    },
    {
      id: '3',
      name: 'Samsung',
      logo: '/images/brands/samsung.png',
      count: 89
    },
    {
      id: '4',
      name: 'DJI',
      logo: '/images/brands/dji.png',
      count: 23
    },
    {
      id: '5',
      name: 'Apple',
      logo: '/images/brands/apple.png',
      count: 45
    },
    {
      id: '6',
      name: 'Sony',
      logo: '/images/brands/sony.png',
      count: 56
    }
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Click outside to close dropdowns
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

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a365d] text-white text-sm py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contato@uss-brasil.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>São Paulo, SP</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/ofertas" className="hover:text-[#48bb78] transition-colors">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              Ofertas do Dia
            </Link>
            <Link href="/rastreamento" className="hover:text-[#48bb78] transition-colors">
              <Package className="h-4 w-4 inline mr-1" />
              Rastrear Pedido
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header 
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg border-b' : 'border-b border-gray-100'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/images/logo-uss-brasil.png"
                  alt="USS Brasil"
                  width={60}
                  height={60}
                  className="h-12 w-auto lg:h-14"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-[#1a365d] font-medium transition-colors"
              >
                Início
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('categories')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#1a365d] font-medium transition-colors"
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
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {mainCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-[#1a365d]" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-500">{category.count} produtos</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brands Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('brands')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#1a365d] font-medium transition-colors"
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
                      className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-100 p-4"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {mainBrands.map((brand) => (
                          <Link
                            key={brand.id}
                            href={`/brands/${brand.name.toLowerCase()}`}
                            className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="font-bold text-[#1a365d]">{brand.name.charAt(0)}</span>
                            </div>
                            <div className="text-center">
                              <h3 className="font-medium text-gray-900 text-sm">{brand.name}</h3>
                              <p className="text-xs text-gray-500">{brand.count} produtos</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/ofertas" 
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Ofertas
              </Link>
              
              <Link 
                href="/contato" 
                className="text-gray-700 hover:text-[#1a365d] font-medium transition-colors"
              >
                Contato
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-200 focus:border-[#1a365d] transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search Mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>

              {/* Favorites */}
              <Link
                href="/favoritos"
                className="hidden lg:flex relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className="h-5 w-5 text-gray-700" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/carrinho"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBag className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1a365d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <Link
                href="/login"
                className="hidden lg:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="h-5 w-5 text-gray-700" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 lg:hidden"
          >
            <div className="flex items-center p-4 border-b">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-gray-200 focus:border-[#1a365d]"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <nav className="p-4 space-y-4">
              <Link
                href="/"
                className="block py-3 text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              
              <div>
                <h3 className="text-gray-900 font-medium mb-2">Categorias</h3>
                <div className="space-y-2 ml-4">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block py-2 text-gray-600 hover:text-[#1a365d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-900 font-medium mb-2">Marcas</h3>
                <div className="space-y-2 ml-4">
                  {mainBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.name.toLowerCase()}`}
                      className="block py-2 text-gray-600 hover:text-[#1a365d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                href="/ofertas"
                className="block py-3 text-red-600 hover:text-red-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
              
              <Link
                href="/favoritos"
                className="block py-3 text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Favoritos ({favoriteCount})
              </Link>
              
              <Link
                href="/login"
                className="block py-3 text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Minha Conta
              </Link>
              
              <Link
                href="/contato"
                className="block py-3 text-gray-700 hover:text-[#1a365d] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ProfessionalNavbar
