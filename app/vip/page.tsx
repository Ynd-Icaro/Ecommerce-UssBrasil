'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SparklesIcon,
  UserIcon,
  GiftIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import ProductCard from '@/components/product-card-premium'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'

// Interface para usuário VIP
interface VipUser {
  id: string
  name: string
  isVip: boolean
  vipSince?: string
  vipLevel: 'basic' | 'premium' | 'elite'
  totalSavings: number
  vipPurchases: number
  nextRenewal: string
}

// Mock VIP User Data
const mockVipUser: VipUser = {
  id: '1',
  name: 'João Silva',
  isVip: false, // Altere para true para ver a versão VIP
  vipSince: '2024-01-15',
  vipLevel: 'premium',
  totalSavings: 2450.50,
  vipPurchases: 12,
  nextRenewal: '2024-12-15'
}

// Mock VIP Products
const vipProducts = [
  {
    id: "airpods-max-vip",
    name: "AirPods Max Edição VIP",
    slug: "airpods-max-edicao-vip",
    price: 5999.00,
    discountPrice: 4999.00,
    category: "apple",
    subcategory: "audio",
    marca: "Apple",
    sku: "APM-VIP-SG",
    image: "/Public/Produtos/Apple/airpods-max-vip.png",
    images: [
      "/Public/Produtos/Apple/airpods-max-vip-space-gray.webp",
      "/Public/Produtos/Apple/airpods-max-vip-silver.webp"
    ],
    description: "AirPods Max Edição VIP com cancelamento ativo de ruído premium e case exclusivo em couro.",
    shortDescription: "AirPods Max VIP com cancelamento ativo de ruído e áudio espacial.",
    longDescription: "A Edição VIP dos AirPods Max oferece a experiência de áudio mais sofisticada da Apple.",
    stock: 5,
    rating: 4.8,
    reviewsCount: 34,
    featured: true,
    isNew: false,
    bestSeller: false,
    vipOnly: true,
    limitedEdition: true,
    specifications: {
      driver: "Driver dinâmico personalizado de 40mm",
      connectivity: "Bluetooth 5.0 com chip H1",
      battery: "Até 20 horas com ANC e áudio espacial",
      weight: "384.8g"
    },
    colors: [
      { name: "Cinza Espacial VIP", hex: "#2F2F2F", image: "/Public/Produtos/Apple/airpods-max-vip-space-gray.webp" },
      { name: "Prateado VIP", hex: "#E8E8E8", image: "/Public/Produtos/Apple/airpods-max-vip-silver.webp" }
    ],
    tags: ["headphones", "premium", "vip", "cancelamento-ruido", "audio-espacial", "edicao-limitada"],
    benefits: [
      "Entrega VIP prioritária",
      "Setup personalizado gratuito",
      "Suporte VIP 24/7",
      "Garantia estendida de 2 anos"
    ],
    warranty: "24 meses de garantia VIP",
    deliveryTime: "Entrega VIP em até 24 horas",
    seo: {
      metaTitle: "AirPods Max Edição VIP | Headphones Premium Apple | USS Brasil",
      metaDescription: "AirPods Max Edição VIP com case em couro e gravação personalizada."
    }
  }
]

const vipBenefits = [
  {
    icon: SparklesIcon,
    title: "Acesso Antecipado",
    description: "Seja o primeiro a conhecer nossos lançamentos e produtos exclusivos",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: GiftIcon,
    title: "Descontos Especiais",
    description: "Até 50% OFF em produtos selecionados exclusivamente para membros VIP",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: TruckIcon,
    title: "Entrega Express VIP",
    description: "Entrega prioritária em até 24 horas para grandes centros urbanos",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: ShieldCheckIcon,
    title: "Garantia Estendida",
    description: "Garantia estendida de até 3 anos em produtos selecionados",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: ClockIcon,
    title: "Suporte 24/7",
    description: "Atendimento prioritário com especialistas disponíveis 24 horas",
    color: "from-red-400 to-rose-500"
  },
  {
    icon: StarIcon,
    title: "Experiências Exclusivas",
    description: "Eventos privados, workshops e experiências únicas com as marcas",
    color: "from-indigo-400 to-purple-500"
  }
]

const vipPlans = [
  {
    id: "vip-bronze",
    name: "VIP Bronze",
    price: 29.90,
    originalPrice: 49.90,
    period: "mensal",
    color: "from-amber-600 to-yellow-700",
    popular: false,
    benefits: [
      "10% desconto em todos os produtos",
      "Frete grátis ilimitado",
      "Suporte prioritário",
      "Acesso a ofertas especiais"
    ]
  },
  {
    id: "vip-gold",
    name: "VIP Gold",
    price: 79.90,
    originalPrice: 129.90,
    period: "mensal",
    color: "from-yellow-400 to-yellow-600",
    popular: true,
    benefits: [
      "25% desconto em todos os produtos",
      "Entrega express grátis",
      "Garantia estendida",
      "Produtos exclusivos",
      "Suporte 24/7",
      "Eventos VIP"
    ]
  },
  {
    id: "vip-platinum",
    name: "VIP Platinum",
    price: 149.90,
    originalPrice: 249.90,
    period: "mensal",
    color: "from-gray-400 to-gray-600",
    popular: false,
    benefits: [
      "40% desconto em todos os produtos",
      "Entrega same-day",
      "Garantia premium 3 anos",
      "Acesso total exclusivos",
      "Concierge pessoal",
      "Experiências únicas"
    ]
  }
]

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Empresário",
    avatar: "/public/avatars/carlos.jpg",
    rating: 5,
    comment: "O atendimento VIP da USS Brasil é incomparável. Recebi meu iPhone 16 Pro em menos de 12 horas, com setup completo incluso!",
    memberSince: "2023"
  },
  {
    id: 2,
    name: "Ana Maria",
    role: "Arquiteta",
    avatar: "/public/avatars/ana.jpg",
    rating: 5,
    comment: "Os descontos exclusivos me permitem ter sempre a tecnologia mais atual. Já economizei mais de R$ 5.000 este ano!",
    memberSince: "2022"
  },
  {
    id: 3,
    name: "Rafael Costa",
    role: "Designer",
    avatar: "/public/avatars/rafael.jpg",
    rating: 5,
    comment: "As experiências VIP são incríveis. Participei do lançamento do MacBook Pro M3 em evento exclusivo da Apple.",
    memberSince: "2023"
  }
]

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState('vip-gold')
  const [isScrolled, setIsScrolled] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  // Simular estado do usuário VIP
  const [currentUser] = useState<VipUser>(mockVipUser)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [plansRef, plansInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [productsRef, productsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  // Se o usuário é VIP, mostrar dashboard
  if (currentUser.isVip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* VIP Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta, {currentUser.name}!</h1>
                    <p className="text-white/80">
                      Membro VIP {currentUser.vipLevel.toUpperCase()} desde {new Date(currentUser.vipSince!).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm">Próxima renovação</p>
                  <p className="text-xl font-semibold">{new Date(currentUser.nextRenewal).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VIP Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                label: 'Total Economizado', 
                value: formatCurrency(currentUser.totalSavings), 
                icon: GiftIcon, 
                color: 'green',
                gradient: 'from-green-400 to-green-600'
              },
              { 
                label: 'Compras VIP', 
                value: currentUser.vipPurchases.toString(), 
                icon: ShieldCheckIcon, 
                color: 'blue',
                gradient: 'from-blue-400 to-blue-600'
              },
              { 
                label: 'Desconto Ativo', 
                value: currentUser.vipLevel === 'elite' ? '25%' : currentUser.vipLevel === 'premium' ? '15%' : '5%', 
                icon: StarIcon, 
                color: 'yellow',
                gradient: 'from-yellow-400 to-yellow-600'
              },
              { 
                label: 'Status VIP', 
                value: currentUser.vipLevel.toUpperCase(), 
                icon: SparklesIcon, 
                color: 'purple',
                gradient: 'from-purple-400 to-purple-600'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
              Ações Rápidas VIP
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: 'Produtos Exclusivos', description: 'Ver itens VIP', href: '/products?vip=true', icon: LockClosedIcon },
                { title: 'Ofertas Especiais', description: 'Descontos extras', href: '/ofertas', icon: GiftIcon },
                { title: 'Suporte Premium', description: 'Atendimento VIP', href: '/contato', icon: UserIcon },
                { title: 'Histórico VIP', description: 'Suas compras', href: '/orders', icon: ClockIcon }
              ].map((action, index) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                      <p className="text-gray-600 text-xs">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* VIP Exclusive Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <SparklesIcon className="w-6 h-6 text-yellow-500 mr-2" />
                Produtos Exclusivos VIP
              </h2>
              <Link
                href="/products?vip=true"
                className="text-yellow-600 hover:text-yellow-700 flex items-center font-medium"
              >
                Ver todos <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {vipProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-3">
                    EXCLUSIVO VIP
                  </div>
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-yellow-600">{formatCurrency(product.discountPrice!)}</span>
                    <span className="text-sm text-gray-500 line-through">{formatCurrency(product.price)}</span>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round((1 - product.discountPrice! / product.price) * 100)}% OFF
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Adicionar ao Carrinho
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* VIP Benefits Active */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ShieldCheckIcon className="w-6 h-6 text-yellow-500 mr-2" />
              Seus Benefícios Ativos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: GiftIcon, title: 'Desconto Exclusivo', description: '15% em todos os produtos', active: true },
                { icon: TruckIcon, title: 'Frete Grátis', description: 'Entrega gratuita em todas as compras', active: true },
                { icon: UserIcon, title: 'Suporte Prioritário', description: 'Atendimento 24/7 especializado', active: true },
                { icon: SparklesIcon, title: 'Produtos Exclusivos', description: 'Acesso a itens limitados', active: true },
                { icon: ClockIcon, title: 'Acesso Antecipado', description: 'Pré-vendas e lançamentos', active: true },
                { icon: ShieldCheckIcon, title: 'Garantia Estendida', description: 'Proteção extra para compras', active: true }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {benefit.title}
                      <CheckCircleIcon className="w-4 h-4 text-green-500 ml-2" />
                    </h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Se não é VIP, mostrar página de adesão
  return (
    <div className="min-h-screen bg-gradient-to-br from-ussbrasil-premium via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #d4af37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d4af37 0%, transparent 50%)',
            backgroundSize: '100px 100px',
            animation: 'float 6s ease-in-out infinite'
          }} />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-15"
          />
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-10"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* VIP Crown Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.5, delay: 0.2, type: "spring" }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full shadow-2xl mb-6 relative">
                <SparklesIcon className="h-16 w-16 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ussbrasil-gold/20 to-yellow-600/20 border border-ussbrasil-gold/30 rounded-full text-ussbrasil-gold font-semibold">
                <SparklesIcon className="h-5 w-5" />
                Experiência Exclusiva
                <SparklesIcon className="h-5 w-5" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-ussbrasil-gold via-yellow-400 to-ussbrasil-gold bg-clip-text text-transparent">
                Área VIP
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Desfrute de uma experiência premium com produtos exclusivos, descontos especiais e benefícios únicos que só os membros VIP têm acesso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2"
              >
                <SparklesIcon className="h-5 w-5" />
                Tornar-se VIP Agora
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Saiba Mais
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ussbrasil-gold mb-2">+5.000</div>
                <div className="text-gray-400">Membros VIP Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ussbrasil-gold mb-2">50%</div>
                <div className="text-gray-400">Desconto Máximo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-ussbrasil-gold mb-2">24h</div>
                <div className="text-gray-400">Entrega Express</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm font-medium text-gray-400">Explore os benefícios</span>
            <div className="w-1 h-8 bg-gradient-to-b from-ussbrasil-gold to-transparent rounded-full">
              <div className="w-1 h-4 bg-ussbrasil-gold rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Benefícios Exclusivos
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Desfrute de vantagens premium que transformam sua experiência de compra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-ussbrasil-gold/30 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Plans Section */}
      <section ref={plansRef} className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={plansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Planos VIP
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a economizar hoje mesmo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vipPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={plansInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-ussbrasil-gold shadow-2xl shadow-ussbrasil-gold/20 scale-105' 
                    : 'border-gray-700/50 hover:border-ussbrasil-gold/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <SparklesIcon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-ussbrasil-gold">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Plano Selecionado' : 'Escolher Plano'}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={plansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              Garantia de 30 dias • Cancele a qualquer momento • Sem taxas ocultas
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
            >
              Ativar Plano VIP
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* VIP Products Section */}
      <section ref={productsRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ussbrasil-gold/20 to-yellow-600/20 border border-ussbrasil-gold/30 rounded-full text-ussbrasil-gold font-semibold mb-6">
              <LockClosedIcon className="h-5 w-5" />
              Exclusivo para Membros VIP
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Produtos Exclusivos
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Acesso antecipado a lançamentos e edições limitadas disponíveis apenas para membros VIP
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {vipProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(id) => addToCart(product)}
                  onToggleWishlist={(id) => toggleWishlist(product)}
                  isInWishlist={isInWishlist(product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O que nossos VIPs dizem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Depoimentos reais de quem já faz parte da nossa comunidade exclusiva
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-ussbrasil-gold to-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4">
                  "{testimonial.comment}"
                </p>
                <div className="text-sm text-gray-500">
                  Membro VIP desde {testimonial.memberSince}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-ussbrasil-gold/10 to-yellow-600/10 border border-ussbrasil-gold/20 rounded-3xl p-12"
          >
            <SparklesIcon className="h-16 w-16 text-ussbrasil-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para ser VIP?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 5.000 membros VIP e tenha acesso aos melhores produtos e benefícios exclusivos
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-ussbrasil-gold to-yellow-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300"
            >
              Tornar-se VIP Agora
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
