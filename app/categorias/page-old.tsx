'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Sparkles, ArrowRight, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllBrands, getAllProducts } from '@/lib/products-manager'
import { slugifyCategory } from '@/lib/slugify'

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
  tags: string[]
  icon: string
  gradient: {
    from: string
    to: string
  }
  bgColor: string
  textColor: string
}

interface Brand {
  id: string
  name: string
  slug: string
  image: string
  logo: string
  description: string
  productCount: number
  categories: CategoryProduct[]
}

interface CategoryProduct {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
  featured: boolean
}

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew: boolean
  isFavorite: boolean
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
    thumbnail: '/categories/smartphones-thumb.jpg',
    productCount: 142,
    featured: true,
    tags: ['Premium', 'Tecnologia', 'Inovação'],
    icon: '📱',
    gradient: {
      from: '#034a6e',
      to: '#065a84'
    },
    bgColor: 'bg-gradient-to-br from-primary to-secondary',
    textColor: 'text-white'
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
    thumbnail: '/categories/laptops-thumb.jpg',
    productCount: 89,
    featured: true,
    tags: ['Profissional', 'Gaming', 'Performance'],
    icon: '💻',
    gradient: {
      from: '#065a84',
      to: '#54c4cf'
    },
    bgColor: 'bg-gradient-to-br from-secondary to-accent',
    textColor: 'text-white'
  },
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    title: 'Áudio Premium',
    description: 'Experimente a qualidade sonora excepcional com nossa seleção de dispositivos de áudio premium.',
    shortDescription: 'Qualidade sonora incomparável',
    image: '/categories/audio-hero.jpg',
    video: '/categories/audio-preview.mp4',
    thumbnail: '/categories/audio-thumb.jpg',
    productCount: 67,
    featured: true,
    tags: ['Premium', 'Som', 'Qualidade'],
    icon: '🎧',
    gradient: {
      from: '#54c4cf',
      to: '#034a6e'
    },
    bgColor: 'bg-gradient-to-br from-accent to-primary',
    textColor: 'text-white'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    title: 'Gaming Elite',
    description: 'Equipamentos gaming de última geração para uma experiência de jogo incomparável.',
    shortDescription: 'Equipamentos para gamers exigentes',
    image: '/categories/gaming-hero.jpg',
    video: '/categories/gaming-preview.mp4',
    thumbnail: '/categories/gaming-thumb.jpg',
    productCount: 156,
    featured: true,
    tags: ['Gaming', 'Performance', 'Elite'],
    icon: '🎮',
    gradient: {
      from: '#1f2937',
      to: '#065a84'
    },
    bgColor: 'bg-gradient-to-br from-gray-900 to-secondary',
    textColor: 'text-white'
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    slug: 'smart-home',
    title: 'Casa Inteligente',
    description: 'Transforme sua casa em um ambiente inteligente e conectado com nossa linha de dispositivos IoT.',
    shortDescription: 'Automação residencial avançada',
    image: '/categories/smart-home-hero.jpg',
    video: '/categories/smart-home-preview.mp4',
    thumbnail: '/categories/smart-home-thumb.jpg',
    productCount: 94,
    featured: false,
    tags: ['IoT', 'Automação', 'Conectividade'],
    icon: '🏠',
    gradient: {
      from: '#065a84',
      to: '#1f2937'
    },
    bgColor: 'bg-gradient-to-br from-secondary to-gray-900',
    textColor: 'text-white'
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    slug: 'acessorios',
    title: 'Acessórios Premium',
    description: 'Complemente seus dispositivos com acessórios premium de design exclusivo e qualidade superior.',
    shortDescription: 'Design exclusivo e funcionalidade',
    image: '/categories/accessories-hero.jpg',
    video: '/categories/accessories-preview.mp4',
    thumbnail: '/categories/accessories-thumb.jpg',
    productCount: 203,
    featured: false,
    tags: ['Design', 'Qualidade', 'Exclusivo'],
    icon: '⚡',
    gradient: {
      from: '#54c4cf',
      to: '#065a84'
    },
    bgColor: 'bg-gradient-to-br from-accent to-secondary',
    textColor: 'text-white'
  }
]

const CategoriesPage = () => {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/categorias/${categorySlug}`)
  }

  const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-100px" })

    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        className="group cursor-pointer"
        onClick={() => handleCategoryClick(category.slug)}
        style={{ 
          animationDelay: `${index * 0.1}s` 
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg group-hover:shadow-2xl transition-all duration-500">
          {/* Background Image with Parallax Effect */}
          <div className="relative h-80 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={category.thumbnail}
                alt={category.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-category.jpg'
                }}
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              whileHover="hover"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            />
            
            {/* Category Icon */}
            <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <span className="text-2xl">{category.icon}</span>
            </div>
            
            {/* Product Count Badge */}
            <div className="absolute top-4 right-4">
              <Badge 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/20"
              >
                {category.productCount} produtos
              </Badge>
            </div>
            
            {/* Featured Badge */}
            {category.featured && (
              <div className="absolute top-16 right-4">
                <Badge 
                  variant="default" 
                  className="bg-accent text-white border-none flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Destaque
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Category Name and Tags */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <motion.p
              variants={textVariants}
              initial="hidden"
              whileHover="hover"
              className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
            >
              {category.shortDescription}
            </motion.p>
            
            {/* Action Button */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileHover="hover"
              className="pt-2"
            >
              <Button
                variant="ghost"
                className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary group/btn"
              >
                <span>Explorar categoria</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Carregando categorias premium...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <motion.section
        ref={headerRef}
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(3,74,110,0.1),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Experiência Premium
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Nossas Categorias
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Descubra nossa seleção curada de produtos premium organizados por categoria. 
            Cada seção oferece o melhor em tecnologia, design e inovação.
          </motion.p>
          
          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Lista
            </Button>
          </motion.div>
        </div>
      </motion.section>
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(()=>{
    const b = getAllBrands()
    const products = getAllProducts()
    // Enriquecer com contagens reais
    const enriched:Brand[] = b.map((br,i)=>{
      const brandProducts = products.filter(p=>p.marca===br.slug)
      const categories = br.categories.map((cat,j)=>{
        const catProducts = brandProducts.filter(p=>p.category===cat.slug)
        return {
          id: `${i}-${j}`,
          name: cat.name,
          slug: cat.slug,
          image: brandProducts.find(p=>p.category===cat.slug)?.image || '/placeholder.png',
          productCount: catProducts.length,
          featured: catProducts.some(p=>p.featured)
        } as CategoryProduct
      })
      return {
        id: String(i),
        name: br.name,
        slug: br.slug,
        image: brandProducts[0]?.image || '/placeholder.png',
        logo: brandProducts[0]?.image || '/placeholder.png',
        description: `Produtos da marca ${br.name}`,
        productCount: brandProducts.length,
        categories
      }
    })
    setBrands(enriched)
  },[])

  // Helper function to build product links with filters
  const handleBrandClick = (brandSlug: string) => router.push(`/produtos?brand=${brandSlug}`)
  const handleCategoryClick = (brandSlug: string, categorySlug: string) => router.push(`/produtos?brand=${brandSlug}&category=${categorySlug}`)

  return (
    <div className="min-h-screen pt-32 pb-12" style={{ background: 'var(--uss-gradient-bg)' }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
            Explore por <span style={{ color: 'var(--uss-primary)' }}>Categorias</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--uss-text-secondary)' }}>
            Descubra produtos organizados por marca e categoria para encontrar exatamente o que você procura
          </p>
        </motion.div>

        {/* Brand Categories Grid */}
        <div className="space-y-16">
          {brands.map((brand, brandIndex) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: brandIndex * 0.1 }}
              className="relative"
            >
              
              {/* Brand Section */}
              <div className="mb-8">
                
                {/* 5-Card Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* Card 1 - Brand Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="md:col-span-1"
                  >
                    <Card 
                      className="h-full cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                      onClick={() => handleBrandClick(brand.slug)}
                      style={{ background: 'var(--uss-bg-light)' }}
                    >
                      <div 
                        className="relative h-48 md:h-64"
                        style={{ background: 'var(--uss-gradient-surface)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Brand Logo Overlay */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'var(--uss-bg-light-alpha)' }}>
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>

                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge 
                            className="border-0 text-white font-semibold"
                            style={{ background: 'var(--uss-primary)' }}
                          >
                            {brand.productCount} produtos
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-2 transition-colors" style={{ color: 'var(--uss-text-light)' }}>
                          {brand.name}
                        </h3>
                        <p className="mb-4" style={{ color: 'var(--uss-text-secondary)' }}>{brand.description}</p>
                        <div className="flex items-center space-x-2" style={{ color: 'var(--uss-primary)' }}>
                          <span className="text-sm font-medium">Ver todos os produtos</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Cards 2-5 - Category Products */}
                  {brand.categories.slice(0, 4).map((category, categoryIndex) => (
                    <motion.div
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="md:col-span-1"
                    >
                      <Card 
                        className="h-full cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                        onClick={() => handleCategoryClick(brand.slug, category.slug)}
                        style={{ background: 'var(--uss-bg-light)' }}
                      >
                        <div className="relative h-48 md:h-64">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4 z-20">
                            <Badge 
                              variant="secondary" 
                              className="font-semibold"
                              style={{ 
                                background: 'var(--uss-bg-light-alpha)',
                                color: 'var(--uss-text-light)'
                              }}
                            >
                              {category.productCount} itens
                            </Badge>
                          </div>

                          {/* Featured Badge */}
                          {category.featured && (
                            <div className="absolute top-4 left-4 z-20">
                              <Badge 
                                className="border-0 text-white font-semibold"
                                style={{ background: 'var(--uss-warning)' }}
                              >
                                <Star className="h-3 w-3 mr-1" />
                                Destaque
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <h4 className="text-xl font-semibold mb-2 transition-colors" style={{ color: 'var(--uss-text-light)' }}>
                            {category.name}
                          </h4>
                          <p className="text-sm mb-4" style={{ color: 'var(--uss-text-secondary)' }}>
                            Linha {brand.name} {category.name}
                          </p>
                          <div className="flex items-center space-x-2" style={{ color: 'var(--uss-primary)' }}>
                            <span className="text-sm font-medium">Explorar categoria</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Slider Alternative */}
                <div className="md:hidden mt-8">
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {brand.categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex-shrink-0 w-64"
                        onClick={() => handleCategoryClick(brand.slug, category.slug)}
                      >
                        <Card 
                          className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-shadow"
                          style={{ background: 'var(--uss-bg-light)' }}
                        >
                          <div className="relative h-40">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge 
                                variant="secondary" 
                                className="text-xs font-semibold"
                                style={{ 
                                  background: 'var(--uss-bg-light-alpha)',
                                  color: 'var(--uss-text-light)'
                                }}
                              >
                                {category.productCount}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h5 className="font-semibold" style={{ color: 'var(--uss-text-light)' }}>{category.name}</h5>
                            <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>Linha {brand.name}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div 
            className="rounded-3xl p-8 md:p-12 text-white"
            style={{ background: 'var(--uss-gradient-primary)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Não Encontrou o que Procurava?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Use nossa busca avançada ou entre em contato conosco
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produtos">
                <Button
                  size="lg"
                  className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    background: 'var(--uss-text)',
                    color: 'var(--uss-primary)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-bg-light)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-text)';
                  }}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Busca Avançada
                </Button>
              </Link>
              <Link href="/atendimento">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'white';
                    target.style.color = 'var(--uss-primary)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.color = 'white';
                  }}
                >
                  <ChevronRight className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoriesPage
