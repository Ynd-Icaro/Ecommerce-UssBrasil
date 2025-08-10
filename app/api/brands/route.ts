import { NextRequest, NextResponse } from 'next/server'

// Mock data - substituir por consulta real ao banco de dados
const brands = [
  {
    id: '1',
    name: 'Apple',
    slug: 'apple',
    image: '/images/brands/apple-hero.jpg',
    logo: '/images/brands/apple-logo.png',
    description: 'Inovação e design premium',
    productCount: 156,
    featured: true,
    categories: ['iPhone', 'MacBook', 'AirPods', 'iPad']
  },
  {
    id: '2',
    name: 'DJI',
    slug: 'dji',
    image: '/images/brands/dji-hero.jpg',
    logo: '/images/brands/dji-logo.png',
    description: 'Tecnologia de voo e imagem',
    productCount: 89,
    featured: true,
    categories: ['Drones', 'Câmeras', 'Gimbals', 'Acessórios']
  },
  {
    id: '3',
    name: 'JBL',
    slug: 'jbl',
    image: '/images/brands/jbl-hero.jpg',
    logo: '/images/brands/jbl-logo.png',
    description: 'Som profissional e qualidade',
    productCount: 134,
    featured: true,
    categories: ['Fones de Ouvido', 'Caixas de Som', 'Soundbars', 'Fones Gaming']
  },
  {
    id: '4',
    name: 'Samsung',
    slug: 'samsung',
    image: '/images/brands/samsung-hero.jpg',
    logo: '/images/brands/samsung-logo.png',
    description: 'Inovação em cada produto',
    productCount: 198,
    featured: true,
    categories: ['Galaxy S', 'Galaxy Note', 'Galaxy Watch', 'Tablets Galaxy']
  },
  {
    id: '5',
    name: 'Xiaomi',
    slug: 'xiaomi',
    image: '/images/brands/xiaomi-hero.jpg',
    logo: '/images/brands/xiaomi-logo.png',
    description: 'Tecnologia acessível e moderna',
    productCount: 267,
    featured: true,
    categories: ['Redmi', 'Mi Series', 'POCO', 'Acessórios Mi']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let filteredBrands = brands

    // Filtrar por marcas em destaque
    if (featured === 'true') {
      filteredBrands = filteredBrands.filter(brand => brand.featured)
    }

    // Limitar resultados
    if (limit) {
      const limitNum = parseInt(limit)
      filteredBrands = filteredBrands.slice(0, limitNum)
    }

    return NextResponse.json({
      success: true,
      data: filteredBrands,
      total: filteredBrands.length
    })
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}

// Endpoint para buscar uma marca específica
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    const brand = brands.find(b => b.slug === slug)
    
    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Buscar produtos em destaque para esta marca (mock)
    const featuredProducts = [
      {
        id: '1',
        name: `${brand.name} Product 1`,
        image: `/images/products/${brand.slug}-1.jpg`,
        price: 1999,
        rating: 4.8,
        reviews: 324
      },
      {
        id: '2',
        name: `${brand.name} Product 2`,
        image: `/images/products/${brand.slug}-2.jpg`,
        price: 2999,
        rating: 4.9,
        reviews: 156
      },
      {
        id: '3',
        name: `${brand.name} Product 3`,
        image: `/images/products/${brand.slug}-3.jpg`,
        price: 3999,
        rating: 4.7,
        reviews: 89
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        ...brand,
        featuredProducts
      }
    })
  } catch (error) {
    console.error('Error fetching brand details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brand details' },
      { status: 500 }
    )
  }
}
