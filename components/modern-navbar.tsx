'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Zap
} from 'lucide-react'

// Configuração das marcas
const brands = [
  {
    id: 'apple',
    name: 'Apple',
    logo: '/Logos empresas/Apple.png',
    color: 'text-gray-700 hover:text-black',
    bgColor: 'hover:bg-gray-50',
    categories: [
      { name: 'iPhone', href: '/products?category=iphone' },
      { name: 'MacBook', href: '/products?category=macbook' },
      { name: 'iPad', href: '/products?category=ipad' },
      { name: 'Apple Watch', href: '/products?category=watch' },
      { name: 'AirPods', href: '/products?category=airpods' }
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/Logos empresas/Xiomi Logo.png',
    color: 'text-orange-600 hover:text-orange-700',
    bgColor: 'hover:bg-orange-50',
    categories: [
      { name: 'Smartphones', href: '/products?brand=xiaomi&category=smartphone' },
      { name: 'Fones', href: '/products?brand=xiaomi&category=headphones' },
      { name: 'Acessórios', href: '/products?brand=xiaomi&category=accessories' }
    ]
  },
  {
    id: 'jbl',
    name: 'JBL',
    logo: '/Logos empresas/JBL Logo.png',
    color: 'text-blue-600 hover:text-blue-700',
    bgColor: 'hover:bg-blue-50',
    categories: [
      { name: 'Speakers', href: '/products?brand=jbl&category=speakers' },
      { name: 'Fones', href: '/products?brand=jbl&category=headphones' },
      { name: 'Soundbars', href: '/products?brand=jbl&category=soundbar' }
    ]
  },
  {
    id: 'dji',
    name: 'DJI',
    logo: '/Logos empresas/Dji Logo.jpg',
    color: 'text-gray-800 hover:text-black',
    bgColor: 'hover:bg-gray-50',
    categories: [
      { name: 'Drones', href: '/products?brand=dji&category=drone' },
      { name: 'Câmeras', href: '/products?brand=dji&category=camera' },
      { name: 'Acessórios', href: '/products?brand=dji&category=accessories' }
    ]
  },
  {
    id: 'geonav',
    name: 'Geonav',
    logo: '/Logos empresas/GeoNav.jpg',
    color: 'text-green-600 hover:text-green-700',
    bgColor: 'hover:bg-green-50',
    categories: [
      { name: 'GPS', href: '/products?brand=geonav&category=gps' },
      { name: 'Rastreadores', href: '/products?brand=geonav&category=tracker' }
    ]
  }
]

export default function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const router = useRouter()
  const { cartItems } = useCart()
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()

  // Controle do scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const cartItemsCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      {/* Top Bar - Brands */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                USS Brasil
              </span>
            </Link>

            {/* Brands Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {brands.map((brand) => {
                return (
                  <div
                    key={brand.id}
                    className="relative"
                    onMouseEnter={() => setActiveBrand(brand.id)}
                    onMouseLeave={() => setActiveBrand(null)}
                  >
                    <Link
                      href={`/products?brand=${brand.id}`}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${brand.color} ${brand.bgColor}`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <Image 
                          src={brand.logo} 
                          alt={`${brand.name} logo`}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{brand.name}</span>
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </Link>

                    {/* Dropdown Menu */}
                    {activeBrand === brand.id && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                        {brand.categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                    <Link href="/profile">
                      <User className="w-4 h-4" />
                      <span className="ml-2">{user.name.split(' ')[0]}</span>
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:flex text-red-500 hover:text-red-600"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                  <Link href="/login">
                    <User className="w-4 h-4" />
                    <span className="ml-2">Login</span>
                  </Link>
                </Button>
              )}
              
              <Button variant="ghost" size="sm" asChild className="relative">
                <Link href="/favorites">
                  <Heart className="w-4 h-4" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 hover:bg-red-500">
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-blue-500 hover:bg-blue-500">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Search & Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Todos os Produtos
              </Link>
              <Link href="/lancamentos" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Lançamentos
              </Link>
              <Link href="/ofertas" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Ofertas
              </Link>
              <Link href="/contato" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-colors"
                />
              </div>
            </form>

            {/* Support Info */}
            <div className="hidden lg:flex items-center space-x-4 text-xs text-gray-600">
              <span>📞 (11) 99999-9999</span>
              <span>🚚 Entrega Grátis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {/* Mobile Brands */}
              {brands.map((brand) => {
                return (
                  <div key={brand.id} className="space-y-2">
                    <Link
                      href={`/products?brand=${brand.id}`}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${brand.bgColor}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Image 
                          src={brand.logo} 
                          alt={`${brand.name} logo`}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{brand.name}</span>
                    </Link>
                    <div className="ml-8 space-y-1">
                      {brand.categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Mobile Navigation */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/products"
                  className="block text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Todos os Produtos
                </Link>
                <Link
                  href="/lancamentos"
                  className="block text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lançamentos
                </Link>
                <Link
                  href="/ofertas"
                  className="block text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link
                  href="/contato"
                  className="block text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
