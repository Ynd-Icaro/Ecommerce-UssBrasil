'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  Edit,
  Camera,
  Phone,
  Mail,
  Calendar,
  Package,
  Star,
  Gift,
  HelpCircle,
  MessageCircle,
  Eye,
  Download,
  FileText,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Home,
  Building,
  Save,
  X,
  Crown,
  Trophy,
  Target,
  TrendingUp,
  Wallet,
  CreditCard as CreditCardIcon,
  Smartphone,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useModal } from '@/contexts/ModalContext'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { closeAllModals } = useModal()

  // Dados mockados do usuário (em produção viria de um contexto de auth)
  const [user, setUser] = useState({
    id: '1',
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    avatar: '/avatars/user-avatar.jpg',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20T10:30:00',
    level: 'Premium',
    points: 2450,
    nextLevelPoints: 3000,
    birthday: '1990-05-15',
    gender: 'M',
    document: '123.456.789-00',
    isEmailVerified: true,
    isPhoneVerified: false,
    preferences: {
      newsletter: true,
      promotions: true,
      orderUpdates: true,
      recommendations: true
    }
  })

  const stats = {
    totalOrders: 12,
    totalSpent: 8450.90,
    savedMoney: 1250.30,
    favoriteItems: 18,
    reviewsWritten: 8,
    averageRating: 4.8,
    loyaltyPoints: 2450,
    addressesCount: 3,
    paymentMethodsCount: 2,
    wishlistItems: 12
  }

  const recentOrders = [
    {
      id: '#USS2024001',
      date: '2024-01-20',
      total: 1299.99,
      status: 'Entregue',
      items: 2,
      image: '/produtos/iphone-15.jpg',
      productName: 'iPhone 15 Pro Max'
    },
    {
      id: '#USS2024002',
      date: '2024-01-18',
      total: 899.50,
      status: 'Em trânsito',
      items: 1,
      image: '/produtos/macbook-air.jpg',
      productName: 'MacBook Air M2'
    },
    {
      id: '#USS2024003',
      date: '2024-01-15',
      total: 599.90,
      status: 'Processando',
      items: 3,
      image: '/produtos/airpods-pro.jpg',
      productName: 'AirPods Pro'
    }
  ]

  const favoriteProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 8999.99,
      discountPrice: 7999.99,
      image: '/produtos/iphone-15.jpg',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: 7499.99,
      image: '/produtos/galaxy-s24.jpg',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      price: 1999.99,
      discountPrice: 1599.99,
      image: '/produtos/sony-headphones.jpg',
      rating: 4.7
    }
  ]

  const addresses = [
    {
      id: '1',
      type: 'home',
      label: 'Casa',
      name: 'João Silva Santos',
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      label: 'Trabalho',
      name: 'João Silva Santos',
      street: 'Av. Paulista, 1000 - Sala 405',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      isDefault: false
    }
  ]

  const paymentMethods = [
    {
      id: '1',
      type: 'credit',
      brand: 'visa',
      lastFour: '1234',
      expiryMonth: '12',
      expiryYear: '2026',
      isDefault: true
    },
    {
      id: '2',
      type: 'credit',
      brand: 'mastercard',
      lastFour: '5678',
      expiryMonth: '08',
      expiryYear: '2025',
      isDefault: false
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'bg-green-100 text-green-800'
      case 'Em trânsito': return 'bg-blue-100 text-blue-800'
      case 'Processando': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelProgress = () => {
    return (user.points / user.nextLevelPoints) * 100
  }

  useEffect(() => {
    closeAllModals()
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header do Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-uss-primary to-uss-secondary p-8 text-white relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar e Info Básica */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-white text-uss-primary text-2xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-uss-primary hover:bg-gray-100 transition-colors shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Membro desde {formatDate(user.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nível e Pontos */}
              <div className="flex-1 md:ml-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-yellow-300" />
                      <span className="font-semibold">{user.level}</span>
                    </div>
                    <span className="text-sm">{user.points} / {user.nextLevelPoints} pontos</span>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${getLevelProgress()}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-white/80">
                    Faltam {user.nextLevelPoints - user.points} pontos para o próximo nível
                  </p>
                </div>
              </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <p className="text-sm text-white/80">Pedidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatPrice(stats.totalSpent)}</p>
                <p className="text-sm text-white/80">Gasto Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.favoriteItems}</p>
                <p className="text-sm text-white/80">Favoritos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.reviewsWritten}</p>
                <p className="text-sm text-white/80">Avaliações</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs de Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200 rounded-xl p-1">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favoritos</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Endereços</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Pagamentos</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurações</span>
              </TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pedidos Recentes */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Package className="h-5 w-5" />
                        <span>Pedidos Recentes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          <Image
                            src={order.image}
                            alt={order.productName}
                            width={60}
                            height={60}
                            className="object-contain rounded-lg bg-white"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-900">{order.id}</span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{order.productName}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{formatDate(order.date)}</span>
                              <span className="font-semibold text-uss-primary">
                                {formatPrice(order.total)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Link href="/orders">
                        <Button variant="outline" className="w-full mt-4">
                          Ver Todos os Pedidos
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Estatísticas e Achievements */}
                <div className="space-y-6">
                  
                  {/* Estatísticas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Estatísticas</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Economia Total</span>
                        <span className="font-semibold text-green-600">
                          {formatPrice(stats.savedMoney)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Avaliação Média</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{stats.averageRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Pontos de Fidelidade</span>
                        <span className="font-semibold text-uss-primary">
                          {stats.loyaltyPoints.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5" />
                        <span>Conquistas</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Crown className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Cliente Premium</p>
                          <p className="text-sm text-gray-600">Membro há mais de 1 ano</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Super Avaliador</p>
                          <p className="text-sm text-gray-600">8+ avaliações escritas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Comprador Frequente</p>
                          <p className="text-sm text-gray-600">10+ pedidos realizados</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Pedidos */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Histórico de Pedidos</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-gray-600">Pedido realizado em {formatDate(order.date)}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <Image
                            src={order.image}
                            alt={order.productName}
                            width={80}
                            height={80}
                            className="object-contain rounded-lg bg-gray-50"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{order.productName}</p>
                            <p className="text-gray-600">Quantidade: {order.items}</p>
                            <p className="font-semibold text-uss-primary text-lg">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Rastrear
                          </Button>
                          {order.status === 'Entregue' && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              Avaliar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favoritos */}
            <TabsContent value="favorites" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Produtos Favoritos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="relative mb-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-40 object-contain rounded-lg bg-gray-50"
                          />
                          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                          </button>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-uss-primary">
                              {formatPrice(product.discountPrice || product.price)}
                            </span>
                            {product.discountPrice && (
                              <span className="block text-sm text-gray-400 line-through">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Adicionar ao Carrinho
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Endereços */}
            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Endereços de Entrega</span>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Endereço
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-uss-primary/10 rounded-full flex items-center justify-center">
                              {address.type === 'home' ? (
                                <Home className="h-5 w-5 text-uss-primary" />
                              ) : (
                                <Building className="h-5 w-5 text-uss-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-gray-900">{address.label}</h3>
                                {address.isDefault && (
                                  <Badge variant="secondary">Padrão</Badge>
                                )}
                              </div>
                              <p className="text-gray-600">{address.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-gray-700">
                          <p>{address.street}</p>
                          <p>{address.neighborhood} - {address.city}, {address.state}</p>
                          <p>CEP: {address.zipCode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pagamentos */}
            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Métodos de Pagamento</span>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Cartão
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                              <CreditCardIcon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">
                                  •••• •••• •••• {method.lastFour}
                                </span>
                                {method.isDefault && (
                                  <Badge variant="secondary">Padrão</Badge>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm">
                                {method.brand.toUpperCase()} • Expira em {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Informações Pessoais */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Informações Pessoais</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="document">CPF</Label>
                        <Input
                          id="document"
                          value={user.document}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="flex">
                          <Input
                            id="email"
                            value={user.email}
                            disabled={!isEditing}
                            className={`${isEditing ? '' : 'bg-gray-50'} rounded-r-none`}
                          />
                          <div className="px-3 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md flex items-center">
                            {user.isEmailVerified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <div className="flex">
                          <Input
                            id="phone"
                            value={user.phone}
                            disabled={!isEditing}
                            className={`${isEditing ? '' : 'bg-gray-50'} rounded-r-none`}
                          />
                          <div className="px-3 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md flex items-center">
                            {user.isPhoneVerified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthday">Data de Nascimento</Label>
                        <Input
                          id="birthday"
                          type="date"
                          value={user.birthday}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gênero</Label>
                        <select
                          id="gender"
                          value={user.gender}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border border-gray-200 rounded-md ${isEditing ? '' : 'bg-gray-50'}`}
                        >
                          <option value="M">Masculino</option>
                          <option value="F">Feminino</option>
                          <option value="O">Outro</option>
                          <option value="N">Prefiro não informar</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferências */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Preferências de Notificação</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-600">Receber novidades e promoções</p>
                        </div>
                        <input type="checkbox" checked={user.preferences.newsletter} className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações de Pedidos</p>
                          <p className="text-sm text-gray-600">Status de entrega e processamento</p>
                        </div>
                        <input type="checkbox" checked={user.preferences.orderUpdates} className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promoções</p>
                          <p className="text-sm text-gray-600">Ofertas especiais e descontos</p>
                        </div>
                        <input type="checkbox" checked={user.preferences.promotions} className="rounded" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Recomendações</p>
                          <p className="text-sm text-gray-600">Produtos baseados no seu perfil</p>
                        </div>
                        <input type="checkbox" checked={user.preferences.recommendations} className="rounded" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Segurança</h4>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Alterar Senha
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Autenticação em Duas Etapas
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir Conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
