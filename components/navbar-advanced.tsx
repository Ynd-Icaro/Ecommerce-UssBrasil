'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useTheme } from '@/hooks/use-theme-simple'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  image: string
  price: number
}

interface BrandData {
  name: string
  categories: string[]
  featured: boolean
}

export default function NavbarNew() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [activeBrand, setActiveBrand] = useState('Apple')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<BrandData[]>([])
  
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const { cartItems, cartCount } = useCart()
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()

  // Carregar dados dos produtos
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()
        setProducts(data.products || [])
        
        // Extrair marcas e categorias dos produtos
        const brandMap = new Map<string, Set<string>>()
        
        data.products?.forEach((product: Product) => {
          if (!brandMap.has(product.brand)) {
            brandMap.set(product.brand, new Set())
          }
          brandMap.get(product.brand)?.add(product.category)
        })

        const extractedBrands: BrandData[] = Array.from(brandMap.entries()).map(([name, categories]) => ({
          name,
          categories: Array.from(categories),
          featured: ['Apple', 'DJI', 'JBL', 'Xiaomi', 'Geonav'].includes(name)
        }))

        setBrands(extractedBrands)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    loadData()
  }, [])

  // Filtrar categorias por marca ativa
  const getActiveCategories = () => {
    const brand = brands.find(b => b.name === activeBrand)
    return brand?.categories || []
  }

  // Fechar mega menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Produtos', href: '/products', hasMegaMenu: true },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Ofertas', href: '/ofertas' },
    { name: 'Contato', href: '/contato' }
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-neutral-900/90 text-white' 
        : 'bg-white/90 text-gray-900'
    } backdrop-blur-md border-b border-gray-200/20`}>
      
      {/* Navbar Superior */}
      <div className="h-18 px-4">
        <div className="container mx-auto flex items-center justify-between h-full">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-uss-primary to-uss-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">
              USS Brasil
            </span>
          </Link>

          {/* Busca Central (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl border transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-neutral-800 border-neutral-700 text-white placeholder-gray-400 focus:border-uss-primary'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-uss-primary'
                } focus:ring-2 focus:ring-uss-primary/20 focus:outline-none`}
              />
            </div>
          </div>

          {/* Ícones de Ação */}
          <div className="flex items-center space-x-2">
            
            {/* Favoritos */}
            <Link href="/profile" className="relative p-2 rounded-lg hover:bg-gray-100/50 transition-colors group">
              <HeartIcon className="h-6 w-6 group-hover:text-uss-primary transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link href="/login" className="p-2 rounded-lg hover:bg-gray-100/50 transition-colors group">
              <UserIcon className="h-6 w-6 group-hover:text-uss-primary transition-colors" />
            </Link>

            {/* Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100/50 transition-colors group"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6 group-hover:text-yellow-400 transition-colors" />
              ) : (
                <MoonIcon className="h-6 w-6 group-hover:text-blue-600 transition-colors" />
              )}
            </button>

            {/* Carrinho */}
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100/50 transition-colors group">
              <ShoppingCartIcon className="h-6 w-6 group-hover:text-uss-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-uss-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Inferior (Desktop) */}
      <div className="hidden md:block border-t border-gray-200/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12 space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasMegaMenu ? (
                  <button
                    onMouseEnter={() => setShowMegaMenu(true)}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-uss-primary transition-all duration-200 group"
                  >
                    <span className="font-medium">{link.name}</span>
                    <ChevronDownIcon className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 rounded-lg font-medium hover:bg-gray-100/50 hover:text-uss-primary transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mega Menu Desktop */}
      <AnimatePresence>
        {showMegaMenu && (
          <motion.div
            ref={megaMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setShowMegaMenu(false)}
            className={`absolute left-0 right-0 shadow-2xl border-t ${
              theme === 'dark' 
                ? 'bg-neutral-900 border-neutral-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-12 gap-8">
                
                {/* Coluna 1 - Marcas */}
                <div className="col-span-3">
                  <h3 className="text-lg font-bold mb-4 text-uss-primary">Marcas</h3>
                  <div className="space-y-2">
                    {brands.filter(brand => brand.featured).map((brand) => (
                      <button
                        key={brand.name}
                        onMouseEnter={() => setActiveBrand(brand.name)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeBrand === brand.name
                            ? 'bg-uss-primary/10 text-uss-primary border border-uss-primary/20'
                            : 'hover:bg-gray-100/50 hover:text-uss-primary'
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coluna 2 - Categorias */}
                <div className="col-span-9">
                  <h3 className="text-lg font-bold mb-4">
                    Categorias - <span className="text-uss-primary">{activeBrand}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {getActiveCategories().map((category) => (
                      <Link
                        key={category}
                        href={`/products?brand=${activeBrand}&category=${category}`}
                        className="group p-4 rounded-lg border border-gray-200/50 hover:border-uss-primary/50 hover:scale-105 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-uss-primary/10 to-uss-secondary/10 rounded-lg flex items-center justify-center">
                            <span className="text-uss-primary font-bold text-lg">
                              {category.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-uss-primary transition-colors">
                              {category}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Ver produtos
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-y-0 right-0 w-80 z-50 ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
            } shadow-2xl overflow-y-auto`}
          >
            <div className="p-6">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100/50"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Busca Mobile */}
              <div className="mb-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar produtos..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-900'
                    } focus:border-uss-primary focus:ring-2 focus:ring-uss-primary/20 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Links de Navegação */}
              <div className="space-y-2 mb-8">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.hasMegaMenu ? (
                      <div>
                        <button
                          onClick={() => setExpandedBrand(expandedBrand === 'produtos' ? null : 'produtos')}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100/50 transition-colors"
                        >
                          <span className="font-medium">{link.name}</span>
                          <ChevronRightIcon 
                            className={`h-5 w-5 transition-transform duration-200 ${
                              expandedBrand === 'produtos' ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {expandedBrand === 'produtos' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-2">
                                {brands.filter(brand => brand.featured).map((brand) => (
                                  <div key={brand.name}>
                                    <button
                                      onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
                                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                                    >
                                      <span>{brand.name}</span>
                                      <ChevronRightIcon 
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                          expandedBrand === brand.name ? 'rotate-90' : ''
                                        }`} 
                                      />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {expandedBrand === brand.name && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                                          className="overflow-hidden"
                                        >
                                          <div className="pl-4 py-2 space-y-1">
                                            {brand.categories.map((category) => (
                                              <Link
                                                key={category}
                                                href={`/products?brand=${brand.name}&category=${category}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-2 rounded-lg text-sm hover:bg-gray-100/50 hover:text-uss-primary transition-colors"
                                              >
                                                {category}
                                              </Link>
                                            ))}
                                            <Link
                                              href={`/marcas/${brand.name.toLowerCase()}`}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className="block p-2 rounded-lg text-sm font-medium text-uss-primary hover:bg-uss-primary/10 transition-colors"
                                            >
                                              Ver todos
                                            </Link>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-3 rounded-lg font-medium hover:bg-gray-100/50 hover:text-uss-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </nav>
  )
}
