import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const categoryId = searchParams.get('categoryId')

    const where: any = {}
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (categoryId) {
      where.categoryId = categoryId
    }

    const products = await prisma.product.findMany({
      where,
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

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      price,
      image,
      categoryId,
      stock,
      featured,
      specifications
    } = await request.json()

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images: image,
        categoryId,
        stock: parseInt(stock),
        featured: featured || false,
        specifications: specifications || ''
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
}
