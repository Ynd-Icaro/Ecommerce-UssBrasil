"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Calendar, CreditCard } from "lucide-react"

const orders = [
  {
    id: "TS-2024-001",
    date: "2024-11-15",
    status: "delivered",
    total: 9999,
    items: [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        price: 9999,
        quantity: 1,
        color: "Titânio Natural",
        storage: "256GB",
        image: "/Produtos/Iphone 16 Pro.png",
      },
    ],
    shipping: {
      method: "Entrega Padrão",
      address: "Rua das Flores, 123 - Centro, São Paulo - SP",
      trackingCode: "BR123456789",
    },
    payment: {
      method: "Cartão de Crédito",
      installments: "12x de R$ 833,25",
    },
  },
  {
    id: "TS-2024-002",
    date: "2024-11-10",
    status: "shipped",
    total: 19999,
    items: [
      {
        id: 2,
        name: 'MacBook Pro 16" M3 Max',
        brand: "Apple",
        price: 19999,
        quantity: 1,
        color: "Cinza Espacial",
        storage: "512GB",
        image: "/Produtos/Macbook Pro.png",
      },
    ],
    shipping: {
      method: "Entrega Expressa",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      trackingCode: "BR987654321",
    },
    payment: {
      method: "PIX",
      installments: "À vista",
    },
  },
  {
    id: "TS-2024-003",
    date: "2024-11-08",
    status: "processing",
    total: 6999,
    items: [
      {
        id: 3,
        name: "Xiaomi 14 Ultra",
        brand: "Xiaomi",
        price: 6999,
        quantity: 1,
        color: "Preto",
        storage: "512GB",
        image: "/Produtos/Iphone 16.png",
      },
    ],
    shipping: {
      method: "Entrega Padrão",
      address: "Rua Augusta, 456 - Consolação, São Paulo - SP",
      trackingCode: null,
    },
    payment: {
      method: "Cartão de Crédito",
      installments: "6x de R$ 1.166,50",
    },
  },
]

const getStatusInfo = (status: string) => {
  switch (status) {
    case "processing":
      return {
        label: "Processando",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        description: "Seu pedido está sendo preparado",
      }
    case "shipped":
      return {
        label: "Enviado",
        color: "bg-blue-100 text-blue-800",
        icon: Truck,
        description: "Seu pedido está a caminho",
      }
    case "delivered":
      return {
        label: "Entregue",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        description: "Pedido entregue com sucesso",
      }
    default:
      return {
        label: "Desconhecido",
        color: "bg-gray-100 text-gray-800",
        icon: Package,
        description: "Status não identificado",
      }
  }
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedOrder ? (
          // Detalhes do pedido específico
          <div>
            <Button variant="ghost" onClick={() => setSelectedOrder(null)} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos pedidos
            </Button>

            {(() => {
              const order = orders.find((o) => o.id === selectedOrder)
              if (!order) return null

              const statusInfo = getStatusInfo(order.status)

              return (
                <div className="space-y-6">
                  {/* Order Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Pedido {order.id}</span>
                            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                          </CardTitle>
                          <p className="text-gray-600 mt-1">Realizado em {formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-light">R$ {order.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{order.payment.installments}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Order Status */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${statusInfo.color}`}>
                          <statusInfo.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{statusInfo.label}</h3>
                          <p className="text-gray-600">{statusInfo.description}</p>
                          {order.shipping.trackingCode && (
                            <p className="text-sm text-blue-600 mt-1">
                              Código de rastreamento: {order.shipping.trackingCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Items */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Itens do Pedido</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.brand}</p>
                              <p className="text-sm text-gray-600">
                                {item.color} • {item.storage}
                              </p>
                              <p className="font-medium">R$ {item.price.toLocaleString()}</p>
                            </div>
                            <span className="text-gray-600">x{item.quantity}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Shipping & Payment */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />
                            <span>Endereço de Entrega</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{order.shipping.address}</p>
                          <p className="text-sm text-gray-600 mt-2">Método: {order.shipping.method}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5" />
                            <span>Pagamento</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{order.payment.method}</p>
                          <p className="text-sm text-gray-600 mt-1">{order.payment.installments}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    {order.status === "delivered" && <Button variant="outline">Avaliar Produto</Button>}
                    {order.shipping.trackingCode && <Button variant="outline">Rastrear Pedido</Button>}
                    <Button variant="outline">Suporte</Button>
                  </div>
                </div>
              )
            })()}
          </div>
        ) : (
          // Lista de pedidos
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-light mb-2">Meus Pedidos</h1>
              <p className="text-gray-600">Acompanhe o status dos seus pedidos</p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="processing">Processando</TabsTrigger>
                <TabsTrigger value="shipped">Enviados</TabsTrigger>
                <TabsTrigger value="delivered">Entregues</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status)

                  return (
                    <Card
                      key={order.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">Pedido {order.id}</h3>
                              <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(order.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Package className="h-4 w-4" />
                                <span>{order.items.length} item(s)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-light">R$ {order.total.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{order.payment.method}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {order.items.slice(0, 3).map((item) => (
                            <Image
                              key={item.id}
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                {orders
                  .filter((order) => order.status === "processing")
                  .map((order) => {
                    const statusInfo = getStatusInfo(order.status)

                    return (
                      <Card
                        key={order.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold">Pedido {order.id}</h3>
                                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(order.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Package className="h-4 w-4" />
                                  <span>{order.items.length} item(s)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-light">R$ {order.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{order.payment.method}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {order.items.slice(0, 3).map((item) => (
                              <Image
                                key={item.id}
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </TabsContent>

              <TabsContent value="shipped" className="space-y-4">
                {orders
                  .filter((order) => order.status === "shipped")
                  .map((order) => {
                    const statusInfo = getStatusInfo(order.status)

                    return (
                      <Card
                        key={order.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold">Pedido {order.id}</h3>
                                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(order.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Package className="h-4 w-4" />
                                  <span>{order.items.length} item(s)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-light">R$ {order.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{order.payment.method}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {order.items.slice(0, 3).map((item) => (
                              <Image
                                key={item.id}
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4">
                {orders
                  .filter((order) => order.status === "delivered")
                  .map((order) => {
                    const statusInfo = getStatusInfo(order.status)

                    return (
                      <Card
                        key={order.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold">Pedido {order.id}</h3>
                                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(order.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Package className="h-4 w-4" />
                                  <span>{order.items.length} item(s)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-light">R$ {order.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{order.payment.method}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {order.items.slice(0, 3).map((item) => (
                              <Image
                                key={item.id}
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </TabsContent>
            </Tabs>

            {orders.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-24 w-24 mx-auto text-gray-300 mb-6" />
                <h2 className="text-2xl font-light mb-4">Nenhum pedido encontrado</h2>
                <p className="text-gray-600 mb-8">Você ainda não fez nenhum pedido em nossa loja</p>
                <Link href="/products">
                  <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
