"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, MapPin, Package, Settings, Camera, Edit, Trash2, Plus, Eye } from "lucide-react"

const mockUser = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(11) 99999-9999",
  avatar: "/icons/mac.svg",
  joinDate: "Janeiro 2024",
}

const mockAddresses = [
  {
    id: 1,
    type: "Casa",
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    isDefault: true,
  },
  {
    id: 2,
    type: "Trabalho",
    street: "Av. Paulista, 1000",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    isDefault: false,
  },
]

const mockOrders = [
  {
    id: "USS001",
    date: "15/12/2024",
    status: "Entregue",
    total: "R$ 9.999,00",
    items: 1,
    product: "iPhone 15 Pro Max",
  },
  {
    id: "USS002",
    date: "10/12/2024",
    status: "Em trânsito",
    total: "R$ 2.499,00",
    items: 1,
    product: "AirPods Pro",
  },
  {
    id: "USS003",
    date: "05/12/2024",
    status: "Processando",
    total: "R$ 19.999,00",
    items: 1,
    product: 'MacBook Pro 16"',
  },
]

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(mockUser)

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || "Usuário",
        email: session.user.email || "usuario@email.com",
        phone: "(11) 99999-9999", // Placeholder
        avatar: session.user.image || "/icons/mac.svg",
        joinDate: "Janeiro 2024", // Placeholder
      })
    }
  }, [session])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
          <Link href="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800"
      case "Em trânsito":
        return "bg-blue-100 text-blue-800"
      case "Processando":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback className="text-2xl font-semibold">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-white shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                <p className="text-gray-600 mb-1">{userData.email}</p>
                <p className="text-gray-600 mb-4">{userData.phone}</p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Cliente desde {userData.joinDate}
                </Badge>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-xl border-gray-200 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-xl p-1">
            <TabsTrigger value="profile" className="rounded-lg">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-lg">
              <MapPin className="h-4 w-4 mr-2" />
              Endereços
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg">
              <Package className="h-4 w-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Gerencie suas informações pessoais e de contato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      defaultValue="João"
                      disabled={!isEditing}
                      className="h-12 rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      defaultValue="Silva"
                      disabled={!isEditing}
                      className="h-12 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userData.email}
                    disabled={!isEditing}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={userData.phone}
                    disabled={!isEditing}
                    className="h-12 rounded-xl border-gray-200"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      disabled={!isEditing}
                      className="h-12 rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      disabled={!isEditing}
                      className="h-12 rounded-xl border-gray-200"
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">Salvar alterações</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl">
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Endereços</h2>
                  <p className="text-gray-600">Gerencie seus endereços de entrega</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo endereço
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockAddresses.map((address) => (
                  <Card key={address.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={address.isDefault ? "default" : "outline"} className="rounded-lg">
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="bg-green-100 text-green-800 rounded-lg">Padrão</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-600">
                        <p className="font-medium text-gray-900">{address.street}</p>
                        <p>{address.neighborhood}</p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                        <p>CEP: {address.zipCode}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
                <CardDescription>Acompanhe o status dos seus pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold text-gray-900">Pedido #{order.id}</h3>
                            <Badge className={`rounded-lg ${getStatusColor(order.status)}`}>{order.status}</Badge>
                          </div>
                          <p className="text-gray-600 mb-1">{order.product}</p>
                          <p className="text-sm text-gray-500">
                            {order.date} • {order.items} item{order.items > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{order.total}</p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Preferências de Conta</CardTitle>
                  <CardDescription>Gerencie suas preferências e configurações de segurança</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Notificações por e-mail</h4>
                        <p className="text-sm text-gray-600">Receba atualizações sobre pedidos e ofertas</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Notificações SMS</h4>
                        <p className="text-sm text-gray-600">Receba SMS sobre status de entrega</p>
                      </div>
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Newsletter</h4>
                        <p className="text-sm text-gray-600">Receba novidades e promoções exclusivas</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Mantenha sua conta segura</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Alterar senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Ativar autenticação de dois fatores
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Gerenciar sessões ativas
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                  <CardDescription>Ações irreversíveis da conta</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl bg-transparent"
                  >
                    Excluir conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
