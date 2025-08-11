'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, User, Heart, Package, Menu, X, Sun, Moon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductsMegaMenu } from './navbar/ProductsMegaMenu'

// Animation variants
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const slideInVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
}

interface Brand {
    id: string
    name: string
    slug: string
    logo: string
    description: string
    isNew?: boolean
    isTrending?: boolean
    image: string
    categories: string[]
    featured_products: any[]
}

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
}

interface NavbarEnhancedProps {
    isScrolled: boolean
    user?: any
    favorites: any[]
    orders: any[]
    cartCount: number
    isDarkMode: boolean
    toggleDarkMode: () => void
    setAuthModalOpen: (open: boolean) => void
    setCartModalOpen: (open: boolean) => void
}

const NavbarEnhanced: React.FC<NavbarEnhancedProps> = ({
    isScrolled,
    user,
    favorites = [],
    orders = [],
    cartCount = 0,
    isDarkMode,
    toggleDarkMode,
    setAuthModalOpen,
    setCartModalOpen
}) => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    // Add missing refs
    const searchRef = useRef<HTMLInputElement>(null)
    const searchResultsRef = useRef<HTMLDivElement>(null)

    // Sample brands data
    const brands: Brand[] = [
        {
            id: '1',
            name: 'Garmin',
            slug: 'garmin',
            logo: '/brands/garmin.png',
            description: 'GPS e Smartwatches',
            isNew: false,
            isTrending: true,
            image: '/brands/garmin.png',
            categories: ['GPS', 'Smartwatches', 'Wearables'],
            featured_products: []
        },
        {
            id: '2',
            name: 'DJI',
            slug: 'dji',
            logo: '/brands/dji.png',
            description: 'Drones e Estabilizadores',
            isNew: false,
            isTrending: true,
            image: '/brands/dji.png',
            categories: ['Drones', 'Câmeras', 'Estabilizadores'],
            featured_products: []
        },
        {
            id: '3',
            name: 'Samsung',
            slug: 'samsung',
            logo: '/brands/samsung.png',
            description: 'Smartphones e Eletrônicos',
            isNew: false,
            isTrending: false,
            image: '/brands/samsung.png',
            categories: ['Smartphones', 'Tablets', 'Eletrônicos'],
            featured_products: []
        },
        {
            id: '4',
            name: 'Apple',
            slug: 'apple',
            logo: '/brands/apple.png',
            description: 'iPhone, iPad, MacBook',
            isNew: false,
            isTrending: true,
            image: '/brands/apple.png',
            categories: ['iPhone', 'iPad', 'MacBook', 'Apple Watch'],
            featured_products: []
        },
        {
            id: '5',
            name: 'Xiaomi',
            slug: 'xiaomi',
            logo: '/brands/xiaomi.png',
            description: 'Smartphones e Acessórios',
            isNew: true,
            isTrending: true,
            image: '/brands/xiaomi.png',
            categories: ['Smartphones', 'Acessórios', 'Casa Inteligente'],
            featured_products: []
        }
    ]

    // Mock products for search
    const mockProducts: Product[] = [
        {
            id: '1',
            name: 'iPhone 15 Pro Max',
            price: 7999.00,
            image: '/products/iphone-15-pro.jpg',
            brand: 'Apple',
            category: 'Smartphones',
            rating: 4.8,
            reviewCount: 124,
            isNew: true,
            isBestSeller: true
        },
        {
            id: '2',
            name: 'Samsung Galaxy S24 Ultra',
            price: 6999.00,
            discountPrice: 6299.00,
            image: '/products/galaxy-s24.jpg',
            brand: 'Samsung',
            category: 'Smartphones',
            rating: 4.7,
            reviewCount: 98,
            isNew: false,
            isBestSeller: true
        },
        {
            id: '3',
            name: 'DJI Mini 4 Pro',
            price: 3299.00,
            image: '/products/dji-mini-4.jpg',
            brand: 'DJI',
            category: 'Drones',
            rating: 4.9,
            reviewCount: 67,
            isNew: true,
            isBestSeller: false
        }
    ]

    // Search functionality
    const handleSearch = (term: string = searchTerm) => {
        if (!term.trim()) {
            setSearchResults([])
            setShowSearchResults(false)
            return
        }

        const results = mockProducts.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase()) ||
            product.brand.toLowerCase().includes(term.toLowerCase()) ||
            product.category.toLowerCase().includes(term.toLowerCase())
        )

        setSearchResults(results)
        setShowSearchResults(true)
    }

    const handleProductClick = (product: Product) => {
        const categorySlug = product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'
        router.push(`/produtos/${categorySlug}/${product.id}`)
        setShowSearchResults(false)
        setSearchTerm('')
    }

    const handleBrandClick = (slug: string) => {
        router.push(`/marca/${slug}`)
        setIsMobileMenuOpen(false)
    }

    const clearSearch = () => {
        setSearchTerm('')
        setSearchResults([])
        setShowSearchResults(false)
    }

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchResultsRef.current && 
                !searchResultsRef.current.contains(event.target as Node) &&
                searchRef.current && 
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSearchResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled 
                        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-uss-border/20" 
                        : "bg-gradient-to-r from-uss-primary via-uss-secondary to-uss-accent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Superior Bar - Logo, Search, Actions */}
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        
                        {/* Logo Section */}
                        <motion.div 
                            className="flex items-center space-x-4 flex-shrink-0"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href="/" className="flex items-center space-x-3 group">
                                <motion.div 
                                    className={cn(
                                        "w-10 h-10 lg:w-12 lg:h-12 rounded-xl p-2 transition-all duration-300",
                                        isScrolled ? "bg-uss-primary shadow-lg" : "bg-white/20 backdrop-blur-sm"
                                    )}
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Image
                                        src="/Empresa/02.png"
                                        alt="USS Brasil"
                                        width={40}
                                        height={40}
                                        className="object-contain w-full h-full"
                                        priority
                                    />
                                </motion.div>
                                <div className="hidden sm:block">
                                    <motion.h1 
                                        className={cn(
                                            "text-xl lg:text-2xl font-bold transition-colors duration-300",
                                            isScrolled ? "text-uss-primary" : "text-white"
                                        )}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        USS Brasil
                                    </motion.h1>
                                    <motion.p 
                                        className={cn(
                                            "text-xs transition-colors duration-300",
                                            isScrolled ? "text-uss-secondary" : "text-white/80"
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Premium Tech Store
                                    </motion.p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Enhanced Search Section */}
                        <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
                            <motion.form 
                                onSubmit={(e) => { e.preventDefault(); handleSearch() }}
                                className="relative w-full group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="relative">
                                    <Search className={cn(
                                        "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300",
                                        isScrolled ? "text-gray-500" : "text-white/70"
                                    )} />
                                    <Input
                                        ref={searchRef}
                                        type="text"
                                        placeholder="Buscar produtos, marcas, categorias..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                            handleSearch(e.target.value)
                                        }}
                                        onFocus={() => { 
                                            setIsSearchFocused(true)
                                            if (searchTerm) setShowSearchResults(true)
                                        }}
                                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                        className={cn(
                                            "w-full h-12 pl-12 pr-4 rounded-full border-2 transition-all duration-300 text-gray-900 placeholder:text-gray-500",
                                            isScrolled 
                                                ? "bg-white border-gray-200 focus:border-uss-primary shadow-sm hover:shadow-md" 
                                                : "bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm focus:bg-white/90 focus:text-gray-900 focus:placeholder:text-gray-500 focus:border-white",
                                            isSearchFocused && "shadow-xl scale-105",
                                            "focus:ring-4 focus:ring-uss-primary/20"
                                        )}
                                    />
                                    <AnimatePresence>
                                        {(searchTerm || isSearchFocused) && (
                                            <motion.button
                                                type="button"
                                                onClick={clearSearch}
                                                className={cn(
                                                    "absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors",
                                                    isScrolled ? "text-gray-400 hover:text-gray-600" : "text-white/70 hover:text-white"
                                                )}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X className="h-4 w-4" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Search Results Dropdown */}
                                <AnimatePresence>
                                    {showSearchResults && searchResults.length > 0 && (
                                        <motion.div
                                            ref={searchResultsRef}
                                            className="absolute top-full left-0 right-0 bg-white dark:bg-uss-surface-dark border border-uss-border dark:border-uss-border-dark rounded-xl shadow-2xl mt-2 z-50 overflow-hidden backdrop-blur-lg"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="p-4">
                                                <h3 className="text-sm font-semibold text-uss-text-secondary dark:text-uss-text-secondary-dark mb-3">
                                                    Resultados da busca ({searchResults.length})
                                                </h3>
                                                <div className="space-y-2">
                                                    {searchResults.map((product, index) => (
                                                        <motion.div
                                                            key={product.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-uss-surface-light dark:hover:bg-uss-surface-dark cursor-pointer transition-colors"
                                                            onClick={() => handleProductClick(product)}
                                                        >
                                                            <div className="w-12 h-12 bg-uss-surface-light dark:bg-uss-surface-dark rounded-lg overflow-hidden flex-shrink-0">
                                                                <Image
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    width={48}
                                                                    height={48}
                                                                    className="object-contain w-full h-full"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-medium text-sm text-uss-text dark:text-uss-text-dark truncate">
                                                                    {product.name}
                                                                </h4>
                                                                <p className="text-xs text-uss-primary dark:text-uss-accent font-semibold">
                                                                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                                </p>
                                                                <div className="flex gap-1 mt-1">
                                                                    {product.isNew && (
                                                                        <Badge className="text-xs bg-uss-success text-white">Novo</Badge>
                                                                    )}
                                                                    {product.isBestSeller && (
                                                                        <Badge className="text-xs bg-uss-focus text-white">Best Seller</Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.form>
                        </div>

                        {/* Action Icons */}
                        <motion.div 
                            className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            
                            {/* Favorites */}
                            {user && (
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className={cn(
                                            "relative p-2 lg:p-3 rounded-xl transition-colors",
                                            isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                        )}
                                        onClick={() => router.push('/favoritos')}
                                    >
                                        <Heart className="h-5 w-5 lg:h-6 lg:w-6" />
                                        {favorites.length > 0 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 h-5 w-5 bg-uss-accent text-white text-xs rounded-full flex items-center justify-center"
                                            >
                                                {favorites.length}
                                            </motion.div>
                                        )}
                                    </Button>
                                </motion.div>
                            )}

                            {/* Orders */}
                            {user && (
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className={cn(
                                            "relative p-2 lg:p-3 rounded-xl transition-colors",
                                            isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                        )}
                                        onClick={() => router.push('/meus-pedidos')}
                                    >
                                        <Package className="h-5 w-5 lg:h-6 lg:w-6" />
                                        {orders.length > 0 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 h-5 w-5 bg-uss-primary text-white text-xs rounded-full flex items-center justify-center"
                                            >
                                                {orders.length}
                                            </motion.div>
                                        )}
                                    </Button>
                                </motion.div>
                            )}

                            {/* User Account */}
                            <motion.div 
                                whileHover={{ scale: 1.1, y: -2 }} 
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "p-2 lg:p-3 rounded-xl transition-colors",
                                        isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                    )}
                                    onClick={() => user ? router.push('/perfil') : setAuthModalOpen(true)}
                                >
                                    <User className="h-5 w-5 lg:h-6 lg:w-6" />
                                </Button>
                            </motion.div>

                            {/* Shopping Cart */}
                            <motion.div 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={cn(
                                        "relative p-2 lg:p-3 rounded-xl transition-colors",
                                        isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                    )}
                                    onClick={() => setCartModalOpen(true)}
                                >
                                    <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                                    {cartCount > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-uss-primary text-white text-xs rounded-full flex items-center justify-center"
                                        >
                                            {cartCount}
                                        </motion.div>
                                    )}
                                </Button>
                            </motion.div>

                            {/* Dark Mode Toggle */}
                            <motion.div 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleDarkMode}
                                    className={cn(
                                        "p-2 lg:p-3 rounded-xl transition-colors",
                                        isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                    )}
                                >
                                    <motion.div
                                        animate={{ rotate: isDarkMode ? 180 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {isDarkMode ? 
                                            <Sun className="h-5 w-5 lg:h-6 lg:w-6" /> : 
                                            <Moon className="h-5 w-5 lg:h-6 lg:w-6" />
                                        }
                                    </motion.div>
                                </Button>
                            </motion.div>

                            {/* Mobile Menu */}
                            <motion.div 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }} 
                                className="lg:hidden"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "p-2 rounded-xl transition-colors",
                                        isScrolled ? "hover:bg-uss-primary/10 text-uss-secondary hover:text-uss-primary" : "hover:bg-white/10 text-white/80 hover:text-white"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    <motion.div
                                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isMobileMenuOpen ? 
                                            <X className="h-5 w-5" /> : 
                                            <Menu className="h-5 w-5" />
                                        }
                                    </motion.div>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Navigation Links */}
                <motion.div 
                    className="hidden lg:block w-full border-t border-uss-primary/20 backdrop-blur-sm bg-white/80"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center space-x-8 py-4">
                            
                            <ProductsMegaMenu brands={brands} />

                            {[
                                { label: 'Ver Todos', href: '/produtos' },
                                { label: 'Categorias', href: '/categorias' },
                                { label: 'Ofertas', href: '/ofertas' },
                                { label: 'Contato', href: '/atendimento' }
                            ].map((link, index) => (
                                <motion.div 
                                    key={link.href} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        className="relative font-medium group transition-all duration-300 text-uss-secondary hover:text-uss-primary"
                                    >
                                        {link.label}
                                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 rounded-full bg-gradient-to-r from-uss-primary via-uss-accent to-uss-secondary transition-all duration-500 group-hover:w-full" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-x-0 top-20 bg-white dark:bg-uss-surface-dark shadow-xl border-t border-uss-border dark:border-uss-border-dark z-40"
                    >
                        <div className="w-full px-4 sm:px-6 py-6">
                            
                            {/* Mobile Search */}
                            <motion.form 
                                onSubmit={(e) => { e.preventDefault(); handleSearch() }}
                                className="mb-6"
                                variants={fadeInVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1 }}
                            >
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-uss-text-secondary dark:text-uss-text-secondary-dark h-5 w-5" />
                                    <Input
                                        type="text"
                                        placeholder="Buscar produtos..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                            handleSearch(e.target.value)
                                        }}
                                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-uss-border dark:border-uss-border-dark bg-uss-surface-light dark:bg-uss-surface-dark"
                                    />
                                </div>
                            </motion.form>

                            {/* Mobile Navigation */}
                            <motion.div 
                                className="space-y-3"
                                variants={fadeInVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2 }}
                            >
                                {/* Brands Section */}
                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-uss-text-secondary dark:text-uss-text-secondary-dark mb-3 px-2">
                                        Marcas
                                    </h3>
                                    <div className="space-y-2">
                                        {brands.map((brand, index) => (
                                            <motion.button
                                                key={brand.id}
                                                variants={slideInVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: 0.1 * index + 0.3 }}
                                                onClick={() => handleBrandClick(brand.slug)}
                                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-uss-surface-light dark:bg-uss-surface-dark hover:bg-uss-border dark:hover:bg-uss-border-dark transition-colors text-left"
                                                whileHover={{ x: 5, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Image
                                                    src={brand.logo}
                                                    alt={`${brand.name} logo`}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain flex-shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <span className="font-medium text-uss-text dark:text-uss-text-dark block">
                                                        {brand.name}
                                                    </span>
                                                    <p className="text-xs text-uss-text-secondary dark:text-uss-text-secondary-dark truncate">
                                                        {brand.description}
                                                    </p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Quick Links */}
                                <div className="space-y-2">
                                    {[
                                        { label: 'Categorias', href: '/categorias' },
                                        { label: 'Ofertas', href: '/ofertas' },
                                        { label: 'Contato', href: '/atendimento' }
                                    ].map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 px-4 text-uss-text dark:text-uss-text-dark hover:text-uss-primary dark:hover:text-uss-accent hover:bg-uss-surface-light dark:hover:bg-uss-surface-dark rounded-lg transition-colors font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default NavbarEnhanced
