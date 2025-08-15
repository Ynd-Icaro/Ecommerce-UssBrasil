'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimationProps } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  Home,
  Smartphone,
  Monitor,
  Tablet,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  Star,
  Gift,
  Phone,
  Info,
  Crown,
  LogOut,
  Settings,
  Package,
  MapPin,
  CreditCard,
  Bell
} from 'lucide-react';

interface NavbarPremiumProps {
  variant?: 'default' | 'minimal' | 'transparent';
  showTopBar?: boolean;
  showSearchBar?: boolean;
  showCategories?: boolean;
  className?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: 'vip' | 'regular' | 'new';
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const NavbarPremium: React.FC<NavbarPremiumProps> = ({
  variant = 'default',
  showTopBar = true,
  showSearchBar = true,
  showCategories = true,
  className = ''
}) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Animation variants
  const slideDown: AnimationProps['variants'] = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const fadeIn: AnimationProps['variants'] = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleTheme = () => {
      const theme = localStorage.getItem('theme');
      setIsDarkMode(theme === 'dark');
    };

    window.addEventListener('scroll', handleScroll);
    handleTheme();
    
    // Mock user data - replace with actual auth
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }

    // Mock cart data - replace with actual cart context
    const mockCart = localStorage.getItem('cart');
    if (mockCart) {
      setCartItems(JSON.parse(mockCart));
    }

    // Mock favorites - replace with actual favorites context
    const mockFavorites = localStorage.getItem('favorites');
    if (mockFavorites) {
      setFavorites(JSON.parse(mockFavorites));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation categories
  const categories = [
    { 
      id: 'home', 
      name: 'Início', 
      href: '/', 
      icon: Home,
      active: pathname === '/'
    },
    { 
      id: 'smartphones', 
      name: 'iPhone', 
      href: '/categories/smartphones', 
      icon: Smartphone,
      active: pathname.includes('/categories/smartphones')
    },
    { 
      id: 'computers', 
      name: 'Mac', 
      href: '/categories/computers', 
      icon: Monitor,
      active: pathname.includes('/categories/computers')
    },
    { 
      id: 'tablets', 
      name: 'iPad', 
      href: '/categories/tablets', 
      icon: Tablet,
      active: pathname.includes('/categories/tablets')
    },
    { 
      id: 'wearables', 
      name: 'Watch', 
      href: '/categories/wearables', 
      icon: Watch,
      active: pathname.includes('/categories/wearables')
    },
    { 
      id: 'audio', 
      name: 'Audio', 
      href: '/categories/audio', 
      icon: Headphones,
      active: pathname.includes('/categories/audio')
    },
    { 
      id: 'cameras', 
      name: 'Câmeras', 
      href: '/categories/cameras', 
      icon: Camera,
      active: pathname.includes('/categories/cameras')
    },
    { 
      id: 'accessories', 
      name: 'Acessórios', 
      href: '/categories/accessories', 
      icon: Gamepad2,
      active: pathname.includes('/categories/accessories')
    }
  ];

  // Special pages
  const specialPages = [
    { 
      id: 'vip', 
      name: 'VIP', 
      href: '/vip', 
      icon: Crown,
      className: 'text-[#d4af37] hover:text-[#f4d03f]',
      active: pathname.includes('/vip')
    },
    { 
      id: 'offers', 
      name: 'Ofertas', 
      href: '/ofertas', 
      icon: Star,
      className: 'text-[#54c4cf] hover:text-[#7dd3db]',
      active: pathname.includes('/ofertas')
    },
    { 
      id: 'releases', 
      name: 'Lançamentos', 
      href: '/lancamentos', 
      icon: Gift,
      active: pathname.includes('/lancamentos')
    }
  ];

  // Utility functions
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    setUser(null);
    setCartItems([]);
    setFavorites([]);
    router.push('/');
  };

  // Logo component
  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-12 h-12">
        <Image
          src={isDarkMode ? "/UssBrasil/01.png" : "/UssBrasil/02.png"}
          alt="UssBrasil"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
      </div>
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-[#034a6e] dark:text-white">
          UssBrasil
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Premium Technology
        </p>
      </div>
    </Link>
  );

  // Top functionality bar
  const TopBar = () => (
    <motion.div 
      className="bg-[#034a6e] text-white py-3"
      initial="hidden"
      animate="visible"
      variants={slideDown}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Logo />
          </div>

          {/* Search Bar */}
          {showSearchBar && (
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#54c4cf] focus:bg-white/20 transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#54c4cf] hover:bg-[#7dd3db] p-1 rounded-full transition-colors duration-150"
                  >
                    <Search className="w-3 h-3 text-white" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-150"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <button 
              onClick={() => user ? router.push('/favorites') : router.push('/login')}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-150"
            >
              <Heart className="w-5 h-5" />
              {user && favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button 
              onClick={() => router.push('/cart')}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-150"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#54c4cf] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors duration-150">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#54c4cf] rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {user.name}
                    </span>
                    {user.type === 'vip' && (
                      <Crown className="w-4 h-4 text-[#d4af37]" />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="hidden md:block text-sm">Entrar</span>
                  </div>
                )}
              </button>

              {/* User Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {user ? (
                  <div className="p-4">
                    <div className="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-10 h-10 bg-[#54c4cf] rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                        {user.type === 'vip' && (
                          <span className="inline-flex items-center text-xs bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 rounded-full mt-1">
                            <Crown className="w-3 h-3 mr-1" />
                            VIP Member
                          </span>
                        )}
                      </div>
                    </div>
                    <nav className="mt-3 space-y-1">
                      <Link href="/profile" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <User className="w-4 h-4" />
                        <span>Meu Perfil</span>
                      </Link>
                      <Link href="/orders" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Package className="w-4 h-4" />
                        <span>Meus Pedidos</span>
                      </Link>
                      <Link href="/profile/addresses" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MapPin className="w-4 h-4" />
                        <span>Endereços</span>
                      </Link>
                      <Link href="/profile/payments" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <CreditCard className="w-4 h-4" />
                        <span>Pagamentos</span>
                      </Link>
                      <Link href="/profile/notifications" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Bell className="w-4 h-4" />
                        <span>Notificações</span>
                      </Link>
                      <Link href="/profile/settings" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </nav>
                  </div>
                ) : (
                  <div className="p-4">
                    <Link href="/login" className="block w-full bg-[#034a6e] hover:bg-[#056291] text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150">
                      Fazer Login
                    </Link>
                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Novo por aqui?{' '}
                      <Link href="/register" className="text-[#54c4cf] hover:underline">
                        Criar conta
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-150"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Navigation bar
  const NavigationBar = () => (
    <motion.div 
      className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${
        isScrolled ? 'shadow-md' : ''
      } transition-shadow duration-200`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Categories */}
          {showCategories && (
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      category.active
                        ? 'bg-[#034a6e] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Special Pages */}
          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            {specialPages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Link
                  key={page.id}
                  href={page.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    page.className || ''
                  } ${
                    page.active
                      ? 'bg-[#034a6e] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{page.name}</span>
                </Link>
              );
            })}
            
            <Link
              href="/contato"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === '/contato'
                  ? 'bg-[#034a6e] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Contato</span>
            </Link>
            
            <Link
              href="/sobre"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === '/sobre'
                  ? 'bg-[#034a6e] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Sobre</span>
            </Link>
          </div>
        </nav>
      </div>
    </motion.div>
  );

  // Mobile search overlay
  const MobileSearchOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
      onClick={() => setIsSearchOpen(false)}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="bg-white dark:bg-gray-900 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#54c4cf] focus:border-transparent"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );

  // Mobile menu
  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Categorias
            </h3>
            <nav className="space-y-1">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      category.active
                        ? 'bg-[#034a6e] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Special Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Especiais
            </h3>
            <nav className="space-y-1">
              {specialPages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <Link
                    key={page.id}
                    href={page.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      page.className || ''
                    } ${
                      page.active
                        ? 'bg-[#034a6e] text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{page.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Other Pages */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Informações
            </h3>
            <nav className="space-y-1">
              <Link
                href="/contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === '/contato'
                    ? 'bg-[#034a6e] text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Contato</span>
              </Link>
              <Link
                href="/sobre"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === '/sobre'
                    ? 'bg-[#034a6e] text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Sobre</span>
              </Link>
            </nav>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <header className={`sticky top-0 z-40 ${className}`}>
        {/* Top Bar - Functionality */}
        {showTopBar && <TopBar />}
        
        {/* Navigation Bar - Routes */}
        <NavigationBar />
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && <MobileSearchOverlay />}

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </>
  );
};

export default NavbarPremium;
