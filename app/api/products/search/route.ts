import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = searchParams.get('limit')
    const categorySlug = searchParams.get('category')

    if (!query) {
      return NextResponse.json(
        { error: 'Parâmetro de busca é obrigatório' },
        { status: 400 }
      )
    }

    // Ler dados do JSON
    const jsonPath = path.join(process.cwd(), 'data', 'db.json')
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    
    let products = data.products

    // Filtrar por busca no nome ou descrição
    products = products.filter((product: any) => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      (product.tags && product.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())))
    )

    // Filtrar por categoria se especificada
    if (categorySlug) {
      products = products.filter((product: any) => product.category === categorySlug)
    }

    // Aplicar limite se especificado
    if (limit) {
      products = products.slice(0, parseInt(limit))
    }

    // Transformar dados para o formato esperado pela API
    const transformedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      images: product.images || [product.image],
      stock: product.stock,
      featured: product.featured,
      brand: product.brand,
      rating: product.rating,
      totalReviews: product.totalReviews,
      colors: product.colors,
      tags: product.tags,
      status: product.status,
      createdAt: product.createdAt,
      specifications: product.specifications,
      paymentOptions: product.paymentOptions,
      category: {
        id: product.category,
        name: data.categories.find((cat: any) => cat.slug === product.category)?.name || product.category,
        slug: product.category
      }
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error searching products from JSON:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}
