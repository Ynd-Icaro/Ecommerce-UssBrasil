'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
    ChevronRight, 
    Sparkles, 
    ArrowRight, 
    Grid3X3, 
    List, 
    Star, 
    Play,
    Search,
    Filter,
    TrendingUp,
    Award,
    Shield,
    Zap,
    Heart,
    Eye,
    ShoppingBag,
    Timer,
    Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

// Enhanced Types for Premium Experience
interface Category {
    id: string
    name: string
    slug: string
    title: string
    description: string
    shortDescription: string
    image: string
    video?: string
    thumbnail: string
    productCount: number
    featured: boolean
    trending: boolean
    newArrivals: number
    avgRating: number
    tags: string[]
    icon: string
    gradient: {
        from: string
        to: string
    }
    bgColor: string
    textColor: string
    discount?: number
    popularity: 'high' | 'medium' | 'low'
}

// Premium Categories Data with USS Brasil Aesthetic
const premiumCategories: Category[] = [
    {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        title: 'Smartphones Premium',
        description: 'Descubra os smartphones mais avançados do mercado com tecnologia de ponta e design excepcional.',
        shortDescription: 'Tecnologia e inovação na palma da mão',
        image: '/categories/smartphones-hero.jpg',
        video: '/categories/smartphones-preview.mp4',
        thumbnail: '/images/placeholder-category.jpg',
        productCount: 142,
        featured: true,
        trending: true,
        newArrivals: 23,
        avgRating: 4.8,
        tags: ['Premium', 'Tecnologia', 'Inovação'],
        icon: '📱',
        gradient: {
            from: '#034a6e',
            to: '#065a84'
        },
        bgColor: 'bg-gradient-to-br from-primary to-secondary',
        textColor: 'text-white',
        discount: 15,
        popularity: 'high'
    },
    {
        id: 'laptops',
        name: 'Laptops',
        slug: 'laptops',
        title: 'Laptops de Alto Desempenho',
        description: 'Notebooks profissionais e gaming para quem busca performance e qualidade incomparáveis.',
        shortDescription: 'Potência e elegância para profissionais',
        image: '/categories/laptops-hero.jpg',
        video: '/categories/laptops-preview.mp4',
        thumbnail: '/images/placeholder-category.jpg',
        productCount: 89,
        featured: true,
        trending: false,
        newArrivals: 12,
        avgRating: 4.7,
        tags: ['Profissional', 'Gaming', 'Performance'],
        icon: '💻',
        gradient: {
            from: '#065a84',
            to: '#54c4cf'
        },
        bgColor: 'bg-gradient-to-br from-secondary to-accent',
        textColor: 'text-white',
        discount: 20,
        popularity: 'high'
    },
    {
        id: 'tablets',
        name: 'Tablets',
        slug: 'tablets',
        title: 'Tablets Versáteis',
        description: 'Tablets premium para trabalho, estudo e entretenimento com design moderno e funcionalidade avançada.',
        shortDescription: 'Versatilidade e mobilidade premium',
        image: '/categories/tablets-hero.jpg',
        thumbnail: '/images/placeholder-category.jpg',
        productCount: 67,
        featured: false,
        trending: true,
        newArrivals: 8,
        avgRating: 4.6,
        tags: ['Versatilidade', 'Mobilidade', 'Design'],
        icon: '📱',
        gradient: {
            from: '#54c4cf',
            to: '#034a6e'
        },
        bgColor: 'bg-gradient-to-br from-accent to-primary',
        textColor: 'text-white',
        popularity: 'medium'
    },
    {
        id: 'smartwatches',
        name: 'Smartwatches',
        slug: 'smartwatches',
        title: 'Smartwatches Inteligentes',
        description: 'Relógios inteligentes com recursos avançados de saúde, fitness e conectividade premium.',
        shortDescription: 'Tecnologia vestível de última geração',
        image: '/categories/smartwatches-hero.jpg',
        thumbnail: '/images/placeholder-category.jpg',
        productCount: 45,
        featured: false,
        trending: true,
        newArrivals: 15,
        avgRating: 4.5,
        tags: ['Saúde', 'Fitness', 'Conectividade'],
        icon: '⌚',
        gradient: {
            from: '#034a6e',
            to: '#54c4cf'
        },
        bgColor: 'bg-gradient-to-br from-primary to-accent',
        textColor: 'text-white',
        discount: 10,
        popularity: 'medium'
    }
]

export default function CategoriasPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [filterBy, setFilterBy] = useState<'all' | 'trending' | 'featured'>('all')
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const headerRef = useRef(null)
    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

    // Enhanced filtering with search and category filters
    const filteredCategories = premiumCategories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesFilter = filterBy === 'all' || 
                            (filterBy === 'trending' && category.trending) ||
                            (filterBy === 'featured' && category.featured)
        
        return matchesSearch && matchesFilter
    })

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pt-24 lg:pt-28 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                >
                    <motion.div
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
                    />
                    <div className="space-y-2">
                        <p className="text-gray-600 font-medium text-lg">Carregando experiência premium...</p>
                        <p className="text-gray-500 text-sm">Preparando as melhores categorias para você</p>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 pt-24 lg:pt-28 relative overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(3,74,110,0.15) 0%, rgba(6,90,132,0.08) 35%, transparent 70%)'
                    }}
                    animate={{
                        x: [0, 150, -50, 0],
                        y: [0, -80, 40, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Hero Section */}
            <motion.section
                ref={headerRef}
                initial={{ opacity: 0, y: -50 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative py-32 px-4 text-center overflow-hidden"
            >
                <div className="relative max-w-6xl mx-auto space-y-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/80 via-blue-50/60 to-cyan-50/40 backdrop-blur-lg rounded-full text-primary font-medium border border-white/30 shadow-2xl shadow-primary/10"
                    >
                        <motion.div
                            animate={{ 
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative"
                        >
                            <Sparkles className="w-5 h-5 text-accent" />
                        </motion.div>
                        <span className="text-sm lg:text-base font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Experiência Premium USSBRASIL
                        </span>
                        <Badge variant="secondary" className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 text-xs font-bold shadow-lg">
                            Novo
                        </Badge>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                            <span className="block bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
                                Explore Nossas
                            </span>
                            <span className="block bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent mt-2">
                                Categorias Premium
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                            Descubra uma seleção cuidadosamente curada de produtos premium, 
                            organizados em categorias que atendem às suas necessidades mais exigentes.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Search Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Buscar categorias..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 py-4 w-full rounded-xl border-2 border-gray-200 focus:border-primary transition-colors duration-200 bg-white/80 backdrop-blur-sm"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-12 px-4 pb-32">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredCategories.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} />
                        ))}
                    </motion.div>

                    {filteredCategories.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Nenhuma categoria encontrada
                            </h3>
                            <p className="text-gray-600">
                                Tente ajustar seus filtros ou termo de busca
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    )
}

// Category Card Component
interface CategoryCardProps {
    category: Category
    index: number
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
        >
            {/* Background Image */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={category.thumbnail}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${category.bgColor} opacity-80`} />
                
                {/* Trending Badge */}
                {category.trending && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    >
                        <Flame className="w-3 h-3" />
                        Trending
                    </motion.div>
                )}

                {/* Discount Badge */}
                {category.discount && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{category.discount}%
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {category.shortDescription}
                        </p>
                    </div>
                    <div className="text-2xl">
                        {category.icon}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        {category.productCount} produtos
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {category.avgRating}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {category.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/categorias/${category.slug}`)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                >
                    Explorar Categoria
                    <motion.div
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </motion.div>
                </motion.button>
            </div>
        </motion.div>
    )
}
