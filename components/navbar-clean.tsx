'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/hooks/use-favorites'
import LoginModal from './login-modal'
import FavoritesModal from './favorites-modal'
import CartModal from './cart-modal'
import BrandDropdown from './brand-dropdown'
import MobileBrandMenu from './mobile-brand-menu'
import { DEFAULT_NAVBAR_CONFIG, type NavbarConfig } from './navbar-config'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface NavbarProps {
  config?: NavbarConfig
  showBrandDropdown?: boolean
}

export default function ModernNavbar({ 
  config = DEFAULT_NAVBAR_CONFIG,
  showBrandDropdown = true
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileBrandMenuOpen, setIsMobileBrandMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { favorites } = useFavorites()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `${config.searchConfig.searchUrl}?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <div className="bg-white shadow-sm">
      <nav className="relative">
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href={config.logo.href} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-lg flex items-center justify-center overflow-hidden">
                {config.logo.image ? (
                  <Image
                    src={config.logo.image}
                    alt={config.logo.text}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.setAttribute('style', 'display: flex');
                    }}
                  />
                ) : null}
                <span className="text-white font-bold text-lg" style={{ display: config.logo.image ? 'none' : 'flex' }}>
                  {config.logo.text.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00CED1] to-[#20B2AA] bg-clip-text text-transparent">
                  {config.logo.text}
                </h1>
                {config.logo.subtitle && (
                  <p className="text-xs text-gray-600">{config.logo.subtitle}</p>
                )}
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <Input
                  type="text"
                  placeholder={config.searchConfig.placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00CED1] focus:border-transparent"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 bg-[#00CED1] hover:bg-[#20B2AA] text-white"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* User Menu */}
              {user ? (
                <div className="relative group hidden md:block">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#00CED1]"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg">
                      Meu Perfil
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Meus Pedidos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-lg flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-[#00CED1]"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Login</span>
                </Button>
              )}

              {/* Favorites Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsFavoritesModalOpen(true)}
                className="relative text-gray-700 hover:text-[#00CED1] p-2"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 border-0 flex items-center justify-center">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              {/* Cart Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-gray-700 hover:text-[#00CED1] p-2"
                onClick={() => setIsCartModalOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-blue-500 hover:bg-blue-500 border-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:block bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 h-14">
              {config.mainNavigation.map((link, index) => (
                index === 1 && showBrandDropdown ? (
                  <div key="brand-dropdown" className="flex items-center space-x-8">
                    <Link 
                      href={link.href}
                      className="px-3 py-2 text-gray-700 hover:text-[#00CED1] transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                    {/* Brand Dropdown */}
                    <BrandDropdown />
                  </div>
                ) : (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-gray-700 hover:text-[#00CED1] transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder={config.searchConfig.placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 bg-[#00CED1] hover:bg-[#20B2AA] text-white"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </form>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {config.mainNavigation.map((link, index) => (
                    index === 1 && showBrandDropdown ? (
                      <div key="mobile-brand-nav" className="space-y-2">
                        <Link 
                          href={link.href}
                          className="block py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => {
                            setIsMobileBrandMenuOpen(true)
                            setIsMenuOpen(false)
                          }}
                          className="block w-full text-left py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                        >
                          Marcas
                        </button>
                      </div>
                    ) : (
                      <Link 
                        key={link.href}
                        href={link.href}
                        className="block py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </div>

                {/* Mobile User Actions */}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  {user ? (
                    <>
                      <div className="text-sm text-gray-600">
                        Olá, {user.name}
                      </div>
                      <Link 
                        href="/profile" 
                        className="block py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Meu Perfil
                      </Link>
                      <Link 
                        href="/orders" 
                        className="block py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Meus Pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left py-2 text-gray-700 hover:text-[#00CED1] transition-colors"
                    >
                      Fazer Login
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <FavoritesModal 
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
      <CartModal 
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
      
      {/* Mobile Brand Menu */}
      <MobileBrandMenu 
        isOpen={isMobileBrandMenuOpen}
        onClose={() => setIsMobileBrandMenuOpen(false)}
      />
    </div>
  )
}
