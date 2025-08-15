'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ShoppingBagIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  categories: string[]
  featured: boolean
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  subcategories: Array<{
    id: string
    name: string
    slug: string
  }>
}

const brands: Brand[] = [
  {
    id: 'apple',
    name: 'Apple',
    slug: 'apple',
    logo: '/Public/Svg/apple-logo.svg',
    description: 'Think Different. A Apple revoluciona a tecnologia.',
    categories: ['smartphones', 'laptops', 'tablets', 'audio'],
    featured: true
  },
  {
    id: 'jbl',
    name: 'JBL',
    slug: 'jbl',
    logo: '/Public/Svg/jbl-logo.svg',
    description: 'Som profissional para todos os momentos.',
    categories: ['speakers', 'headphones', 'soundbars'],
    featured: true
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    slug: 'xiaomi',
    logo: '/Public/Svg/xiaomi-logo.svg',
    description: 'Inovação para todos.',
    categories: ['smartphones', 'tablets', 'smart-home'],
    featured: true
  },
  {
    id: 'dji',
    name: 'DJI',
    slug: 'dji',
    logo: '/Public/Svg/dji-logo.svg',
    description: 'O futuro dos drones.',
    categories: ['drones', 'cameras', 'gimbals'],
    featured: true
  },
  {
    id: 'geonav',
    name: 'Geonav',
    slug: 'geonav',
    logo: '/Public/Svg/geonav-logo.svg',
    description: 'Energia sem limites.',
    categories: ['powerbanks', 'chargers', 'cables'],
    featured: true
  }
]

const categories: Category[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Os melhores celulares premium',
    image: '/Public/Produtos/Apple/iphone-16-pro-Max-Apresentacao.webp',
    subcategories: [
      { id: 'iphone', name: 'iPhone', slug: 'iphone' },
      { id: 'xiaomi-phones', name: 'Xiaomi', slug: 'xiaomi' }
    ]
  },
  {
    id: 'audio',
    name: 'Áudio',
    slug: 'audio',
    description: 'Fones e alto-falantes premium',
    image: '/Public/Produtos/JBL/JBL Boombox 3.webp',
    subcategories: [
      { id: 'headphones', name: 'Fones de Ouvido', slug: 'fones' },
      { id: 'speakers', name: 'Alto-falantes', slug: 'speakers' }
    ]
  },
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'MacBooks e notebooks premium',
    image: '/Public/Produtos/Apple/Macbook Air.png',
    subcategories: [
      { id: 'macbook', name: 'MacBook', slug: 'macbook' },
      { id: 'ultrabooks', name: 'Ultrabooks', slug: 'ultrabooks' }
    ]
  },
  {
    id: 'drones',
    name: 'Drones',
    slug: 'drones',
    description: 'Drones profissionais DJI',
    image: '/Public/Produtos/Dji/Drone Dji Mini Pro Fly More Combo ( Com tela ).webp',
    subcategories: [
      { id: 'consumer', name: 'Consumer', slug: 'consumer' },
      { id: 'professional', name: 'Profissional', slug: 'profissional' }
    ]
  }
]

export default function NavbarPremium() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Top Bar - Informações de contato */}
      <div className="bg-ussbrasil-primary text-white py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-4 w-4" />
              <span>contato@ussbrasil.com.br</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span>Avaliação 4.9/5 no Google</span>
            </span>
            <span>Frete grátis acima de R$ 299</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-ussbrasil-dark/95 backdrop-blur-md shadow-lg' 
            : 'bg-white dark:bg-ussbrasil-dark'
        }`}
      >
        {/* Upper Navbar */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <Link href="/" className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-ussbrasil-primary to-ussbrasil-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">USS</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-ussbrasil-accent rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-ussbrasil-primary dark:text-white">
                      USS Brasil
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Tecnologia Premium
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ussbrasil-primary focus:border-transparent transition-all duration-200"
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-gray-600" />
                  )}
                </motion.button>

                {/* Wishlist */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {wishlistCount > 0 ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    )}
                  </Link>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </motion.div>

                {/* User Profile */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </Link>
                </motion.div>

                {/* Shopping Cart */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <ShoppingBagIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </Link>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-ussbrasil-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>

                {/* Mobile Menu Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Navbar - Navigation Links */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-8 py-4">
              {/* Produtos Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('produtos')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors font-medium">
                  <span>Produtos</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'produtos' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-screen max-w-6xl bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      style={{ left: '-50vw', marginLeft: '50%' }}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-5 gap-6">
                          {/* Brands */}
                          {brands.map((brand) => (
                            <div key={brand.id} className="space-y-3">
                              <Link 
                                href={`/marca/${brand.slug}`}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                              >
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {brand.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {brand.description}
                                  </p>
                                </div>
                              </Link>
                              
                              {/* Categories for this brand */}
                              <div className="ml-3 space-y-1">
                                {brand.categories.slice(0, 3).map((category) => (
                                  <Link
                                    key={category}
                                    href={`/categoria/${category}?marca=${brand.slug}`}
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors capitalize"
                                  >
                                    {category.replace('-', ' ')}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Links */}
              <Link href="/categorias" className="text-gray-700 dark:text-gray-300 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors font-medium">
                Categorias
              </Link>
              
              <Link href="/ofertas" className="text-gray-700 dark:text-gray-300 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors font-medium relative">
                Ofertas
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  HOT
                </span>
              </Link>
              
              <Link href="/lancamentos" className="text-gray-700 dark:text-gray-300 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors font-medium">
                Lançamentos
              </Link>
              
              <Link href="/vip" className="text-transparent bg-gradient-to-r from-ussbrasil-gold to-yellow-600 bg-clip-text font-bold hover:from-yellow-600 hover:to-ussbrasil-gold transition-all duration-300">
                Área VIP
              </Link>
              
              <Link href="/contato" className="text-gray-700 dark:text-gray-300 hover:text-ussbrasil-primary dark:hover:text-ussbrasil-accent transition-colors font-medium">
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            
            {/* Menu Panel */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  <Link href="/produtos" className="block py-3 text-gray-700 dark:text-gray-300 font-medium">
                    Produtos
                  </Link>
                  <Link href="/categorias" className="block py-3 text-gray-700 dark:text-gray-300 font-medium">
                    Categorias
                  </Link>
                  <Link href="/ofertas" className="block py-3 text-gray-700 dark:text-gray-300 font-medium">
                    Ofertas
                  </Link>
                  <Link href="/lancamentos" className="block py-3 text-gray-700 dark:text-gray-300 font-medium">
                    Lançamentos
                  </Link>
                  <Link href="/vip" className="block py-3 text-ussbrasil-gold font-bold">
                    Área VIP
                  </Link>
                  <Link href="/contato" className="block py-3 text-gray-700 dark:text-gray-300 font-medium">
                    Contato
                  </Link>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
