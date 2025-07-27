'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Camera,
  Save,
  X,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
  Settings,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  preferences: {
    notifications: boolean
    marketing: boolean
    recommendations: boolean
  }
  memberSince: string
  totalOrders: number
  totalSpent: number
  favoriteCategories: string[]
}

const mockUser: UserProfile = {
  id: '1',
  name: 'João Silva Santos',
  email: 'joao.silva@email.com',
  phone: '+55 (11) 99999-9999',
  avatar: '/avatars/user.jpg',
  address: {
    street: 'Rua das Flores, 123 - Jardim Europa',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  preferences: {
    notifications: true,
    marketing: false,
    recommendations: true
  },
  memberSince: '2022-03-15',
  totalOrders: 28,
  totalSpent: 45670,
  favoriteCategories: ['Smartphones', 'Laptops', 'Acessórios']
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<UserProfile>(mockUser)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  const stats = [
    {
      label: 'Pedidos Realizados',
      value: user.totalOrders,
      icon: Package,
      color: 'from-blue-900 to-cyan-500'
    },
    {
      label: 'Total Investido',
      value: `R$ ${user.totalSpent.toLocaleString('pt-BR')}`,
      icon: CreditCard,
      color: 'from-green-600 to-emerald-500'
    },
    {
      label: 'Itens Favoritos',
      value: 12,
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      label: 'Membro desde',
      value: new Date(user.memberSince).getFullYear(),
      icon: Calendar,
      color: 'from-purple-600 to-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header com Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-900 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{user.name}</h1>
          <p className="text-slate-600 text-lg">Membro desde {new Date(user.memberSince).toLocaleDateString('pt-BR')}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-xl p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Heart className="h-4 w-4 mr-2" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-900" />
                    Informações Pessoais
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-slate-900 font-medium">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-slate-900 font-medium">{user.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-slate-900 font-medium">{user.phone}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-gradient-to-r from-blue-900 to-cyan-500">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-900" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-medium">{user.address.street}</p>
                    <p className="text-slate-600">{user.address.city}, {user.address.state}</p>
                    <p className="text-slate-600">CEP: {user.address.zipCode}</p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar Endereço
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {user.totalOrders} pedidos realizados
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Seu histórico completo de compras aparecerá aqui
                  </p>
                  <Button className="bg-gradient-to-r from-blue-900 to-cyan-500">
                    Ver Todos os Pedidos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle>Lista de Desejos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {user.favoriteCategories.map((category) => (
                      <Badge key={category} className="bg-gradient-to-r from-blue-900 to-cyan-500">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Seus produtos favoritos
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Seus itens salvos e listas de desejos aparecerão aqui
                    </p>
                    <Button className="bg-gradient-to-r from-blue-900 to-cyan-500">
                      Explorar Produtos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-900" />
                  Segurança da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Configurar Autenticação de Dois Fatores
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Gerenciar Sessões Ativas
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Zona de Perigo</h4>
                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Excluir Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-900" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications">Notificações de Pedidos</Label>
                      <p className="text-sm text-slate-600">Receba updates sobre seus pedidos</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={user.preferences.notifications}
                      onCheckedChange={(checked) => 
                        setUser({
                          ...user, 
                          preferences: {...user.preferences, notifications: checked}
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Email Marketing</Label>
                      <p className="text-sm text-slate-600">Ofertas e promoções exclusivas</p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={user.preferences.marketing}
                      onCheckedChange={(checked) => 
                        setUser({
                          ...user, 
                          preferences: {...user.preferences, marketing: checked}
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="recommendations">Recomendações</Label>
                      <p className="text-sm text-slate-600">Produtos baseados no seu interesse</p>
                    </div>
                    <Switch
                      id="recommendations"
                      checked={user.preferences.recommendations}
                      onCheckedChange={(checked) => 
                        setUser({
                          ...user, 
                          preferences: {...user.preferences, recommendations: checked}
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-900" />
                  Configurações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Exportar Dados Pessoais
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Política de Privacidade
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Termos de Uso
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Suporte ao Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
