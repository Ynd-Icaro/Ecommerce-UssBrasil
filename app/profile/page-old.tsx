'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  Star,
  Heart,
  Settings,
  LogOut,
  Edit
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'

// Dados mockados para demonstração
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
  address: {
    street: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567'
  },
  joinDate: '2023-06-15',
  totalOrders: 8,
  totalSpent: 45697,
  favoriteProducts: 12,
  loyaltyPoints: 1250
}

const mockOrders = [
  {
    id: '1001',
    date: '2024-01-15',
    status: 'delivered',
    total: 10499,
    items: [
      { name: 'iPhone 16 Pro', quantity: 1, price: 10499 }
    ]
  },
  {
    id: '1002',
    date: '2024-01-10',
    status: 'shipped',
    total: 7499,
    items: [
      { name: 'iPhone 16', quantity: 1, price: 7499 }
    ]
  }
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [orders] = useState(mockOrders)
  const [isEditing, setIsEditing] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue'
      case 'shipped':
        return 'Enviado'
      case 'processing':
        return 'Processando'
      default:
        return status
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Perfil atualizado com sucesso!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-gray-600 mt-1">Gerencie suas informações pessoais</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/">
                <Button variant="outline">
                  Voltar à Loja
                </Button>
              </Link>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.totalOrders}</div>
                    <div className="text-sm text-gray-500">Pedidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatPrice(user.totalSpent)}</div>
                    <div className="text-sm text-gray-500">Total Gasto</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.favoriteProducts}</div>
                    <div className="text-sm text-gray-500">Favoritos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{user.loyaltyPoints}</div>
                    <div className="text-sm text-gray-500">Pontos</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="orders">Meus Pedidos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={user.name}
                      disabled={!isEditing}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled={!isEditing}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={user.phone}
                      disabled={!isEditing}
                      onChange={(e) => setUser({...user, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={user.address.zipCode}
                      disabled={!isEditing}
                      onChange={(e) => setUser({
                        ...user,
                        address: {...user.address, zipCode: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="street">Endereço</Label>
                    <Input
                      id="street"
                      value={user.address.street}
                      disabled={!isEditing}
                      onChange={(e) => setUser({
                        ...user,
                        address: {...user.address, street: e.target.value}
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={user.address.city}
                      disabled={!isEditing}
                      onChange={(e) => setUser({
                        ...user,
                        address: {...user.address, city: e.target.value}
                      })}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Histórico de Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Pedido #{order.id}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {order.date}
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">{formatPrice(order.total)}</div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/orders/${order.id}`}>
                              Ver Detalhes
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {orders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum pedido encontrado
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Você ainda não fez nenhum pedido.
                    </p>
                    <Button asChild>
                      <Link href="/products">
                        Começar a Comprar
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Produtos Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum favorito ainda
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Adicione produtos aos seus favoritos para vê-los aqui.
                  </p>
                  <Button asChild>
                    <Link href="/products">
                      Explorar Produtos
                    </Link>
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
