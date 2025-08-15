import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || '1' // Usuário padrão

    // Para demonstração, vou criar dados realistas baseados no sistema atual
    // Em um sistema real, isso viria do banco de dados de usuários
    const userData = {
      id: userId,
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
      avatar: null
    }

    // Buscar pedidos (simulados baseados nos produtos do JSON)
    const jsonPath = path.join(process.cwd(), 'data', 'db.json')
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    
    // Simular alguns pedidos com produtos reais
    const orders = [
      {
        id: 'ORDER_001',
        date: '2024-01-15T10:30:00Z',
        status: 'delivered',
        total: 8999,
        shippingAddress: userData.address,
        items: [
          {
            id: 'apple-iphone-16-pro',
            name: 'iPhone 16 Pro',
            quantity: 1,
            price: 8999,
            image: '/Produtos/Apple/Iphone 16 Pro.png'
          }
        ]
      },
      {
        id: 'ORDER_002',
        date: '2024-01-10T14:20:00Z',
        status: 'shipped',
        total: 2399,
        shippingAddress: userData.address,
        items: [
          {
            id: 'apple-airpods-4',
            name: 'AirPods 4',
            quantity: 1,
            price: 1299,
            image: '/Produtos/Apple/airpods-4.png'
          },
          {
            id: 'apple-watch-se',
            name: 'Apple Watch SE',
            quantity: 1,
            price: 1100,
            image: '/Produtos/Apple/Watch SE.png'
          }
        ]
      },
      {
        id: 'ORDER_003',
        date: '2024-01-05T09:15:00Z',
        status: 'processing',
        total: 3299,
        shippingAddress: userData.address,
        items: [
          {
            id: 'apple-ipad',
            name: 'iPad',
            quantity: 1,
            price: 3299,
            image: '/Produtos/Apple/Ipad.png'
          }
        ]
      }
    ]

    // Calcular estatísticas
    const totalOrders = orders.length
    const totalSpent = orders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0)
    
    // Produtos favoritos (simulados)
    const favoriteProducts = data.products
      .filter((product: any) => product.featured || product.rating > 4.5)
      .slice(0, 8)
      .map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.image,
        rating: product.rating || 4.5,
        category: product.category
      }))

    const loyaltyPoints = Math.floor(totalSpent / 10) // 1 ponto a cada R$ 10 gastos

    return NextResponse.json({
      user: userData,
      orders,
      statistics: {
        totalOrders,
        totalSpent,
        favoriteProducts: favoriteProducts.length,
        loyaltyPoints
      },
      favoriteProducts
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados do perfil' },
      { status: 500 }
    )
  }
}
