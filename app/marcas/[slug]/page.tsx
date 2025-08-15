'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
    ArrowLeftIcon,
    ShoppingCartIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { ProductCard } from '@/components/ProductCard'

// Types
interface Brand {
    id: string
    name: string
    description: string
    logo: string
    banner: string
    colors: [string, string]
    founded: string
    location: string
    website: string
    totalProducts: number
}

interface Product {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    reviews: number
    category: string
    marca: string
    isNew: boolean
    inStock: boolean
    features: string[]
}

// Mock data
const brands: Record<string, Brand> = {
    'uss-brasil': {
        id: 'uss-brasil',
        name: 'USS Brasil',
        description: 'Moda masculina premium com qualidade superior e design moderno',
        logo: '/api/placeholder/120/60',
        banner: '/api/placeholder/1200/400',
        colors: ['#1ea7ff', '#00CED1'],
        founded: '2020',
        location: 'São Paulo, Brasil',
        website: 'www.ussbrasil.com.br',
        totalProducts: 156
    },
    'nike': {
        id: 'nike',
        name: 'Nike',
        description: 'Just Do It - Produtos esportivos de alta performance',
        logo: '/api/placeholder/120/60',
        banner: '/api/placeholder/1200/400',
        colors: ['#000000', '#FF6900'],
        founded: '1964',
        location: 'Oregon, EUA',
        website: 'www.nike.com',
        totalProducts: 342
    },
    'adidas': {
        id: 'adidas',
        name: 'Adidas',
        description: 'Impossible is Nothing - Inovação em esportes e lifestyle',
        logo: '/api/placeholder/120/60',
        banner: '/api/placeholder/1200/400',
        colors: ['#000000', '#FFFFFF'],
        founded: '1949',
        location: 'Alemanha',
        website: 'www.adidas.com',
        totalProducts: 298
    }
}

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Camiseta Premium USS Brasil',
        price: 89.90,
        originalPrice: 129.90,
        image: '/api/placeholder/300/400',
        rating: 4.8,
        reviews: 127,
        category: 'Camisetas',
        marca: 'USS Brasil',
        isNew: false,
        inStock: true,
        features: ['premium', 'algodão', 'confortável']
    },
    {
        id: 2,
        name: 'Polo Clássica USS Brasil',
        price: 119.90,
        originalPrice: 159.90,
        image: '/api/placeholder/300/400',
        rating: 4.9,
        reviews: 89,
        category: 'Polos',
        marca: 'USS Brasil',
        isNew: true,
        inStock: true,
        features: ['elegante', 'versátil', 'qualidade']
    },
    {
        id: 3,
        name: 'Bermuda Sport USS Brasil',
        price: 79.90,
        originalPrice: 99.90,
        image: '/api/placeholder/300/400',
        rating: 4.7,
        reviews: 156,
        category: 'Bermudas',
        marca: 'USS Brasil',
        isNew: false,
        inStock: true,
        features: ['esportiva', 'dry-fit', 'confortável']
    }
]

// Components
const BrandNotFound = () => (
    <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Marca não encontrada</h1>
                <Link
                    href="/produtos"
                    className="inline-flex items-center px-6 py-3 bg-[#1ea7ff] text-white font-semibold rounded-lg hover:bg-[#0ea5e9] transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Voltar aos Produtos
                </Link>
            </div>
        </div>
    </div>
)

const BrandHeader = ({ brand }: { brand: Brand }) => (
    <div className="relative">
        <div 
            className="h-64 bg-gradient-to-r"
            style={{ 
                background: `linear-gradient(135deg, ${brand.colors[0]}, ${brand.colors[1]})` 
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white"
                >
                    <Link
                        href="/produtos"
                        className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Voltar aos Produtos
                    </Link>
                    
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-white rounded-lg p-2">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{brand.name}</h1>
                            <p className="text-white/90 text-lg mb-2">{brand.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-white/80">
                                <span>Fundada em {brand.founded}</span>
                                <span>•</span>
                                <span>{brand.location}</span>
                                <span>•</span>
                                <span>{brand.totalProducts} produtos</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
)

const ProductsSection = ({ 
    brand, 
    products, 
    sortBy, 
    setSortBy, 
    setShowFilters 
}: {
    brand: Brand
    products: Product[]
    sortBy: string
    setSortBy: (value: string) => void
    setShowFilters: (value: boolean) => void
}) => (
    <>
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Produtos {brand.name}
                </h2>
                <p className="text-gray-600">
                    {products.length} produtos encontrados
                </p>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setShowFilters(!setShowFilters)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-[#1ea7ff] hover:text-[#1ea7ff] transition-colors"
                >
                    <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                    Filtros
                </button>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                >
                    <option value="relevance">Mais Relevantes</option>
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                    <option value="name-asc">Nome A-Z</option>
                    <option value="rating">Melhor Avaliação</option>
                    <option value="newest">Mais Recentes</option>
                </select>
            </div>
        </div>

        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                    Não encontramos produtos desta marca no momento.
                </p>
                <Link
                    href="/produtos"
                    className="inline-flex items-center px-6 py-3 bg-[#1ea7ff] text-white font-semibold rounded-lg hover:bg-[#0ea5e9] transition-colors"
                >
                    Ver Todos os Produtos
                </Link>
            </div>
        )}
    </>
)

const BrandInfo = ({ brand }: { brand: Brand }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 bg-white rounded-xl shadow-sm p-8"
    >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sobre a {brand.name}</h3>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <p className="text-gray-600 mb-6">{brand.description}</p>
                
                <div className="space-y-3">
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-900 w-24">Fundada:</span>
                        <span className="text-gray-600">{brand.founded}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-900 w-24">Origem:</span>
                        <span className="text-gray-600">{brand.location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-900 w-24">Website:</span>
                        <a 
                            href={`https://${brand.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#1ea7ff] hover:underline"
                        >
                            {brand.website}
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-[#1ea7ff] mb-2">
                        {brand.totalProducts}
                    </p>
                    <p className="text-gray-600">Produtos</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-[#1ea7ff] mb-2">4.8</p>
                    <p className="text-gray-600">Avaliação</p>
                </div>
            </div>
        </div>
    </motion.div>
)

// Main component
export default function BrandPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const slug = params.slug as string

    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance')
    const [showFilters, setShowFilters] = useState<boolean>(false)

    const brand = brands[slug]

    useEffect(() => {
        if (!brand) {
            router.push('/produtos')
        }
    }, [brand, router])

    const brandProducts = mockProducts.filter(product => 
        product.marca.toLowerCase().replace(/\s+/g, '-') === slug
    )

    if (!brand) {
        return <BrandNotFound />
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <BrandHeader brand={brand} />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <ProductsSection
                    brand={brand}
                    products={brandProducts}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    setShowFilters={setShowFilters}
                />
                
                <BrandInfo brand={brand} />
            </div>
        </div>
    )
}
