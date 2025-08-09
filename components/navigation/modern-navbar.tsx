'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  User, 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  ChevronDown, 
  Home, 
  Package, 
  Percent, 
  Phone, 
  Star,
  Heart,
  Moon,
  Sun,
  Monitor
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import data from '@/db.json'

// Tipos
export type Product = {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountPrice?: number | null
  image: string
  images: string[]
  category: string
  stock: number
  status: string
  tags: string[]
  featured: boolean
  rating: number
  totalReviews: number
  colors: string[]
  createdAt: string
  specifications: object
  paymentOptions: number
}

type Brand = {
  key: string
  name: string
  logo: string
  products: Product[]
  description: string
}

type MainCategory = {
  name: string
  slug: string
  description: string
  image: string
  count: number
  products: Product[]
}

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(3)
  const [favoriteCount, setFavoriteCount] = useState(2)
  
  const { theme, setTheme } = useTheme()
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Função para ajustar caminhos das imagens
  const fixPath = (path: string) => {
    if (!path) return ''
    if (path.startsWith('Ecommerce-UssBrasil/public/')) {
      return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
    }
    return path
  }

  // Processar produtos
  const products = data.products.map(p => ({
    ...p,
    image: fixPath(p.image),
    images: p.images?.map(fixPath) || [fixPath(p.image)]
  }))

  // Organizar produtos por marca
  const brandProducts: Record<string, Product[]> = {}
  products.forEach(product => {
    if (!brandProducts[product.brand]) {
      brandProducts[product.brand] = []
    }
    brandProducts[product.brand].push(product)
  })

  // Definir marcas principais
  const mainBrands = [
    { 
      name: 'Apple', 
      key: 'apple',
      logo: '/Empresa/02.png',
      description: 'Tecnologia que transforma vidas',
      categories: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods']
    },
    { 
      name: 'JBL', 
      key: 'jbl',
      logo: '/icons/jbl-logo.png',
      description: 'Som que emociona',
      categories: ['Caixas de Som', 'Fones de Ouvido', 'Soundbars']
    },
    { 
      name: 'DJI', 
      key: 'dji',
      logo: '/icons/dji-logo.png',
      description: 'Capturando o impossível',
      categories: ['Drones', 'Câmeras', 'Estabilizadores', 'Acessórios']
    },
    { 
      name: 'Xiaomi', 
      key: 'xiaomi',
      logo: '/icons/xiaomi-logo.png',
      description: 'Inovação para todos',
      categories: ['Smartphones', 'Wearables', 'Smart Home', 'Acessórios']
    },
    { 
      name: 'Geonav', 
      key: 'geonav',
      logo: '/icons/geonav-logo.png',
      description: 'Navegação de precisão',
      categories: ['GPS', 'Multimídia', 'Acessórios Automotivos']
    }
  ]

  // Categorias principais
  const mainCategories = [
    { name: 'Smartphones', slug: 'smartphones', icon: '📱' },
    { name: 'Computadores', slug: 'computadores', icon: '💻' },
    { name: 'Áudio', slug: 'audio', icon: '🎧' },
    { name: 'Drones', slug: 'drones', icon: '🛸' },
    { name: 'Acessórios', slug: 'acessorios', icon: '🔌' },
  ]

  // Buscar produtos
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const formatPrice = (price: number, discountPrice?: number | null) => {
    const finalPrice = discountPrice || price
    return `R$ ${finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      {/* Primeira camada: Logo, Busca, Ícones */}
      <div className="bg-uss-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/Empresa/02.png"
                alt="USS Brasil"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold hidden sm:block">USS Brasil</span>
            </Link>

            {/* Barra de Pesquisa - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
              <div className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-uss-gray-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full h-10 pl-10 pr-4 bg-white text-uss-gray-900 rounded-md border-0 focus:ring-2 focus:ring-uss-secondary placeholder:text-uss-gray-500"
                  />
                </div>

                {/* Resultados da Busca */}
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-border overflow-hidden z-50"
                    >
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="flex items-center p-3 hover:bg-uss-off-white transition-colors"
                          onClick={() => {
                            setIsSearchOpen(false)
                            setSearchTerm('')
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover rounded-md"
                          />
                          <div className="ml-3 flex-1">
                            <h4 className="text-sm font-medium text-uss-gray-900">{product.name}</h4>
                            <p className="text-xs text-uss-gray-500">{product.brand}</p>
                            <p className="text-sm font-semibold text-uss-primary">
                              {formatPrice(product.price, product.discountPrice)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Ícones da Direita */}
            <div className="flex items-center space-x-4">
              {/* Busca Mobile */}
              <button
                className="md:hidden p-2 hover:bg-uss-primary-light rounded-md transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Favoritos - Apenas quando logado */}
              {isLoggedIn && (
                <Link
                  href="/favorites"
                  className="relative p-2 hover:bg-uss-primary-light rounded-md transition-colors hidden sm:block"
                >
                  <Heart className="h-5 w-5" />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-uss-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Perfil/Login */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="p-2 hover:bg-uss-primary-light rounded-md transition-colors"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-border py-2 z-50"
                    >
                      {isLoggedIn ? (
                        <>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-uss-gray-900 hover:bg-uss-off-white"
                          >
                            Meu Perfil
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-uss-gray-900 hover:bg-uss-off-white"
                          >
                            Meus Pedidos
                          </Link>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-uss-error hover:bg-uss-off-white"
                            onClick={() => setIsLoggedIn(false)}
                          >
                            Sair
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-uss-gray-900 hover:bg-uss-off-white"
                          >
                            Entrar
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-2 text-sm text-uss-gray-900 hover:bg-uss-off-white"
                          >
                            Criar Conta
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Carrinho */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-uss-primary-light rounded-md transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-uss-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-uss-primary-light rounded-md transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Menu Mobile */}
              <button
                className="md:hidden p-2 hover:bg-uss-primary-light rounded-md transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Busca Mobile */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-uss-gray-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, marcas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 bg-white text-uss-gray-900 rounded-md border-0 focus:ring-2 focus:ring-uss-secondary placeholder:text-uss-gray-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Segunda camada: Navegação Principal */}
      <div className="bg-white dark:bg-uss-gray-900">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center justify-center space-x-8 h-12">
            {/* Produtos */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('produtos')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/products"
                className="flex items-center space-x-1 text-uss-gray-700 dark:text-uss-gray-300 hover:text-uss-primary dark:hover:text-uss-secondary transition-colors font-medium"
              >
                <Package className="h-4 w-4" />
                <span>Produtos</span>
                <ChevronDown className="h-3 w-3" />
              </Link>

              <AnimatePresence>
                {activeDropdown === 'produtos' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white dark:bg-uss-gray-800 rounded-lg shadow-xl border border-border z-50"
                  >
                    <div className="grid grid-cols-5 gap-6 p-6">
                      {mainBrands.map((brand) => (
                        <div key={brand.key} className="space-y-3">
                          <div className="flex items-center space-x-2 mb-3">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                            <h3 className="font-semibold text-uss-gray-900 dark:text-white">
                              {brand.name}
                            </h3>
                          </div>
                          <p className="text-xs text-uss-gray-500 mb-2">{brand.description}</p>
                          {brand.categories.map((category) => (
                            <Link
                              key={category}
                              href={`/products?brand=${brand.key}&category=${category.toLowerCase()}`}
                              className="block text-sm text-uss-gray-600 dark:text-uss-gray-400 hover:text-uss-primary dark:hover:text-uss-secondary transition-colors"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categorias */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('categorias')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/categories"
                className="flex items-center space-x-1 text-uss-gray-700 dark:text-uss-gray-300 hover:text-uss-primary dark:hover:text-uss-secondary transition-colors font-medium"
              >
                <Package className="h-4 w-4" />
                <span>Categorias</span>
                <ChevronDown className="h-3 w-3" />
              </Link>

              <AnimatePresence>
                {activeDropdown === 'categorias' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-uss-gray-800 rounded-lg shadow-xl border border-border z-50"
                  >
                    <div className="p-4 space-y-2">
                      {mainCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-uss-off-white dark:hover:bg-uss-gray-700 transition-colors"
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-uss-gray-700 dark:text-uss-gray-300">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ofertas */}
            <Link
              href="/ofertas"
              className="flex items-center space-x-1 text-uss-gray-700 dark:text-uss-gray-300 hover:text-uss-primary dark:hover:text-uss-secondary transition-colors font-medium"
            >
              <Percent className="h-4 w-4" />
              <span>Ofertas</span>
            </Link>

            {/* Contato */}
            <Link
              href="/contato"
              className="flex items-center space-x-1 text-uss-gray-700 dark:text-uss-gray-300 hover:text-uss-primary dark:hover:text-uss-secondary transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              <span>Contato</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-uss-gray-900 border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/products"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-uss-off-white dark:hover:bg-uss-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-5 w-5 text-uss-primary" />
                <span className="text-uss-gray-700 dark:text-uss-gray-300 font-medium">Produtos</span>
              </Link>
              <Link
                href="/categories"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-uss-off-white dark:hover:bg-uss-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-5 w-5 text-uss-primary" />
                <span className="text-uss-gray-700 dark:text-uss-gray-300 font-medium">Categorias</span>
              </Link>
              <Link
                href="/ofertas"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-uss-off-white dark:hover:bg-uss-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Percent className="h-5 w-5 text-uss-primary" />
                <span className="text-uss-gray-700 dark:text-uss-gray-300 font-medium">Ofertas</span>
              </Link>
              <Link
                href="/contato"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-uss-off-white dark:hover:bg-uss-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 text-uss-primary" />
                <span className="text-uss-gray-700 dark:text-uss-gray-300 font-medium">Contato</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default ModernNavbar
