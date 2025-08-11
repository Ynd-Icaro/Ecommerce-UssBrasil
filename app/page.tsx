'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { 
    ShoppingCart, Heart, Star, Play, Pause, ChevronRight, ChevronLeft,
    Zap, Eye, Truck, Shield, HeadphonesIcon, Award, TrendingUp,
    Sparkles, ArrowRight, Filter, Search, Grid, List, Monitor,
    Smartphone, Headphones, Camera, Watch, Gamepad2, Laptop, Tag,
    Clock, Users, Globe, CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useModal } from '@/contexts/ModalContext'
import { toast } from 'sonner'
import data from '@/db.json'

// Interfaces
interface Product {
    id: string
    name: string
    price: number
    discountPrice?: number
    image: string
    images?: string[]
    category: string
    marca: string
    rating?: number
    stock: number
    featured?: boolean
    description?: string
    isNew?: boolean
    isBestSeller?: boolean
}

// Função para ajustar caminhos das imagens
const fixPath = (path: string) => {
    if (!path) return '/fallback-product.png'
    if (path.startsWith('Ecommerce-UssBrasil/public/')) {
        return `/${path.replace('Ecommerce-UssBrasil/public/', '')}`
    }
    return path.startsWith('/') ? path : `/${path}`
}

// Data
const products: Product[] = (data.products as any[]).map((p: any, index: number) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    discountPrice: p.discountPrice || undefined,
    category: p.category,
    marca: p.brand || p.marca || 'Marca',
    stock: p.stock || 100,
    featured: p.featured || false,
    description: p.description || '',
    rating: p.rating || (4 + Math.random()),
    image: fixPath(p.image),
    images: p.images?.map(fixPath) || [fixPath(p.image)],
    isNew: index < 6,
    isBestSeller: index % 3 === 0,
})).slice(0, 24)

// Videos para hero section
const heroVideos = [
    {
        src: '/Videos/IphoneVideo.mp4',
        title: 'iPhone 16 Pro',
        subtitle: 'Titânio. Tão forte. Tão leve. Tão Pro.',
        description: 'Experimente o futuro da tecnologia móvel',
        cta: 'Descubra Agora',
        link: '/produtos'
    },
    {
        src: '/Videos/IpadVideo.mp4', 
        title: 'iPad Pro M4',
        subtitle: 'Poder infinito para profissionais.',
        description: 'Criatividade sem limites em suas mãos',
        cta: 'Explore Agora',
        link: '/produtos'
    },
    {
        src: '/Videos/Apple Watch.mp4',
        title: 'Apple Watch Ultra',
        subtitle: 'Seu assistente de saúde mais inteligente.',
        description: 'Monitore, conecte-se e supere seus limites',
        cta: 'Conheça Agora',
        link: '/produtos'
    }
]

// Categorias
const categories = [
    { icon: Smartphone, name: 'Smartphones', count: 8 },
    { icon: Laptop, name: 'Laptops', count: 5 },
    { icon: Headphones, name: 'Audio', count: 12 },
    { icon: Watch, name: 'Wearables', count: 6 },
    { icon: Camera, name: 'Câmeras', count: 7 },
    { icon: Gamepad2, name: 'Gaming', count: 9 }
]

// Features
const features = [
    {
        icon: Truck,
        title: 'Entrega Grátis',
        description: 'Em compras acima de R$ 199'
    },
    {
        icon: Shield,
        title: 'Garantia Estendida',
        description: 'Até 24 meses de proteção'
    },
    {
        icon: HeadphonesIcon,
        title: 'Suporte 24/7',
        description: 'Atendimento especializado'
    },
    {
        icon: Award,
        title: 'Qualidade Premium',
        description: 'Produtos certificados'
    }
]

// Stats
const stats = [
    { icon: Users, value: '50K+', label: 'Clientes Satisfeitos' },
    { icon: CheckCircle, value: '100%', label: 'Produtos Originais' },
    { icon: Globe, value: '24/7', label: 'Suporte Online' },
    { icon: Clock, value: '48h', label: 'Entrega Rápida' }
]

// Animations
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Component: Video Hero Section
function VideoHeroSection() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])

    const currentVideo = heroVideos[currentVideoIndex]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsVideoPlaying(!isVideoPlaying)
        }
    }

    return (
        <section className="relative h-screen overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.video
                        key={currentVideoIndex}
                        ref={videoRef}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop={false}
                        playsInline
                        onEnded={() => setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)}
                    >
                        <source src={currentVideo.src} type="video/mp4" />
                    </motion.video>
                </AnimatePresence>
            </motion.div>
            
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="relative h-full flex items-center pt-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        key={currentVideoIndex}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span className="text-sm uppercase tracking-wider font-medium">
                                Lançamento Exclusivo
                            </span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
                        >
                            {currentVideo.title}
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl md:text-3xl mb-4 font-light"
                        >
                            {currentVideo.subtitle}
                        </motion.p>

                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl"
                        >
                            {currentVideo.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href={currentVideo.link}>
                                <Button 
                                    size="lg" 
                                    className="px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group"
                                >
                                    {currentVideo.cta}
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            
                            <Button 
                                size="lg"
                                variant="outline"
                                onClick={togglePlayPause}
                                className="border-white/30 text-white hover:bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm"
                            >
                                {isVideoPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                                {isVideoPlaying ? 'Pausar' : 'Reproduzir'}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <button
                    onClick={() => setCurrentVideoIndex(prev => prev === 0 ? heroVideos.length - 1 : prev - 1)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                >
                    <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                
                <div className="flex gap-2">
                    {heroVideos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentVideoIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentVideoIndex 
                                    ? 'w-8 bg-white' 
                                    : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>
                
                <button
                    onClick={() => setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                >
                    <ChevronRight className="h-5 w-5 text-white" />
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/60">
                <span className="text-xs uppercase tracking-wider">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-px h-12 bg-white/60"
                />
            </div>
        </section>
    )
}

// Component: Product Card
function ProductCard({ product, index }: { product: Product; index: number }) {
    const { addToCart } = useCart()
    const { favorites, toggleFavorite, user } = useAuth()
    const { openAuthModal } = useModal()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const isFavorite = favorites.includes(product.id)
    const discountPercentage = product.discountPrice 
        ? Math.round((1 - product.discountPrice / product.price) * 100)
        : 0

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        addToCart({
            id: Number(product.id),
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.image,
            category: product.category
        })
        toast.success(`${product.name} adicionado ao carrinho!`, {
            description: 'Produto disponível no seu carrinho',
        })
    }

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!user) {
            openAuthModal()
            return
        }
        toggleFavorite(product.id)
        toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative card-uss hover-lift overflow-hidden"
        >
            <Link href={`/produtos/${product.category?.toLowerCase().replace(/\s+/g, '-') || 'geral'}/${product.id}`} className="block">
                <div className="aspect-square relative overflow-hidden bg-[var(--bg-secondary)]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                            <Badge className="bg-uss-accent text-white border-0 px-3 py-1 rounded-full shadow-sm">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Novo
                            </Badge>
                        )}
                        {product.isBestSeller && (
                            <Badge variant="secondary" className="bg-uss-primary text-white border-0 px-3 py-1 rounded-full shadow-sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Best Seller
                            </Badge>
                        )}
                        {product.featured && (
                            <Badge variant="outline" className="border-uss-primary text-uss-primary bg-[var(--bg-primary)] px-3 py-1 rounded-full shadow-sm">
                                <Zap className="h-3 w-3 mr-1" />
                                Destaque
                            </Badge>
                        )}
                        {discountPercentage > 0 && (
                            <Badge variant="destructive" className="bg-uss-error text-white border-0 px-3 py-1 rounded-full shadow-sm font-bold">
                                -{discountPercentage}%
                            </Badge>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleToggleFavorite}
                            className="h-10 w-10 p-0 shadow-sm rounded-full bg-[var(--bg-primary)]/95 hover:bg-[var(--bg-primary)] border-0"
                        >
                            <Heart 
                                className={`h-4 w-4 transition-colors ${
                                    isFavorite ? 'fill-current text-uss-error' : 'text-[var(--text-secondary)] hover:text-uss-error'
                                }`}
                            />
                        </Button>
                        
                        <Button
                            size="sm"
                            variant="secondary"
                            className="h-10 w-10 p-0 shadow-sm rounded-full bg-[var(--bg-primary)]/95 hover:bg-[var(--bg-primary)] border-0"
                        >
                            <Eye className="h-4 w-4 text-[var(--text-secondary)]" />
                        </Button>
                    </div>

                    {/* Stock Warning */}
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute bottom-4 left-4">
                            <Badge variant="destructive" className="bg-uss-warning text-white px-3 py-1 rounded-full shadow-sm">
                                Últimas {product.stock} unidades
                            </Badge>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                    i < Math.floor(product.rating || 4.5) 
                                        ? 'fill-current text-uss-warning' 
                                        : 'text-[var(--text-tertiary)]'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-[var(--text-primary)] font-medium">
                        {product.rating?.toFixed(1) || '4.5'}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                        (127 avaliações)
                    </span>
                </div>

                {/* Brand & Category */}
                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-medium border-uss-primary text-uss-primary">
                        {product.marca}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
                        {product.category}
                    </Badge>
                </div>

                {/* Product Name */}
                <h3 className="font-bold text-lg line-clamp-2 mb-4 group-hover:text-uss-primary transition-colors duration-300 text-[var(--text-primary)]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                    {product.discountPrice ? (
                        <div className="flex flex-col">
                            <span className="text-sm line-through text-[var(--text-secondary)]">
                                R$ {product.price.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-2xl font-bold text-uss-primary">
                                R$ {product.discountPrice.toLocaleString('pt-BR')}
                            </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-bold text-uss-primary">
                            R$ {product.price.toLocaleString('pt-BR')}
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <Button 
                    onClick={handleAddToCart}
                    className="btn-uss-primary w-full py-3 px-4 rounded-lg group/btn"
                    disabled={product.stock === 0}
                >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                </Button>
            </div>
        </motion.div>
    )
}

// Component: Categories Grid
function CategoriesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 bg-[var(--bg-secondary)]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                        Explore por Categoria
                    </h2>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Encontre exatamente o que você procura em nossas categorias especializadas
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                >
                    {categories.map((category, _index) => (
                        <motion.div
                            key={category.name}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group card-uss p-8 cursor-pointer hover-lift"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-uss-accent/10 flex items-center justify-center text-uss-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <category.icon className="h-8 w-8" />
                                </div>
                                
                                <h3 className="font-bold text-lg mb-2 group-hover:text-uss-primary transition-colors text-[var(--text-primary)]">
                                    {category.name}
                                </h3>
                                
                                <p className="text-sm text-[var(--text-secondary)]">
                                    {category.count} produtos
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// Component: Stats Section
function StatsSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 bg-uss-primary text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, _index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 mx-auto rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300">
                                <stat.icon className="h-10 w-10 text-white" />
                            </div>
                            
                            <h3 className="text-3xl font-bold mb-2 text-white">
                                {stat.value}
                            </h3>
                            
                            <p className="text-white/80">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// Component: Features Section
function FeaturesSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, _index) => (
                        <Card key={feature.title} className="card-uss text-center group hover-lift">
                            <CardContent className="p-8">
                                <div className="w-20 h-20 mx-auto rounded-lg bg-uss-primary/10 flex items-center justify-center mb-4 group-hover:bg-uss-primary/20 transition-all duration-300">
                                    <feature.icon className="h-10 w-10 text-uss-primary" />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-[var(--text-secondary)]">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// Component: Brands Section
function BrandsSection() {
    const brands = [
        { name: 'Apple', logo: '/Empresa/02.png', url: '/marcas/apple' },
        { name: 'JBL', logo: '/icons/jbl-logo.png', url: '/marcas/jbl' },
        { name: 'DJI', logo: '/icons/dji-logo.png', url: '/marcas/dji' },
        { name: 'Xiaomi', logo: '/icons/xiaomi-logo.png', url: '/marcas/xiaomi' }
    ]

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-20 bg-[var(--bg-secondary)]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                        Marcas de Confiança
                    </h2>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Parceiros premium para experiências excepcionais
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {brands.map((brand, _index) => (
                        <Link key={brand.name} href={brand.url}>
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card-uss p-8 text-center group hover-lift"
                            >
                                <div className="relative h-20 mb-6">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="font-bold text-lg group-hover:text-uss-primary transition-colors text-[var(--text-primary)]">
                                    {brand.name}
                                </h3>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// Main Component
export default function HomePage() {
    const featuredProducts = products.filter(p => p.featured).slice(0, 8)
    const newProducts = products.filter(p => p.isNew).slice(0, 8)
    const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8)

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
            <VideoHeroSection />
            <CategoriesSection />
            <StatsSection />
            <FeaturesSection />
            
            {/* Featured Products Section */}
            <section className="py-20 bg-[var(--bg-primary)]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                                Produtos em Destaque
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Selecionados especialmente para você com as melhores ofertas e novidades
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link href="/produtos">
                            <Button 
                                size="lg" 
                                className="btn-uss-primary font-semibold px-10 py-4 text-lg rounded-lg hover-lift group"
                            >
                                Ver Todos os Produtos
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <BrandsSection />

            {/* Best Sellers Section */}
            <section className="py-20 bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                                Mais Vendidos
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Os produtos preferidos pelos nossos clientes
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestSellers.map((product, index) => (
                            <ProductCard key={`bestseller-${product.id}`} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Products Section */}
            <section className="py-20 bg-[var(--bg-primary)]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                                Lançamentos
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                                As últimas novidades em tecnologia acabaram de chegar
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newProducts.map((product, index) => (
                            <ProductCard key={`new-${product.id}`} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
