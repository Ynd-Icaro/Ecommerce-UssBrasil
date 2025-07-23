import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      )
    }

    const [
      totalUsers,
      totalProducts,
      totalOrders,
      orders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.findMany({
        select: {
          total: true
        }
      })
    ])

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}
