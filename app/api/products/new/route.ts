import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    // Buscar produtos mais recentes (criados nos últimos 30 dias)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const newProducts = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        },
        status: 'ACTIVE'
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    })

    return NextResponse.json(newProducts)
  } catch (error) {
    console.error('Error fetching new products:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar novos produtos' },
      { status: 500 }
    )
  }
}
