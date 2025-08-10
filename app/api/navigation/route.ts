import { NextRequest, NextResponse } from 'next/server'

// Mock data simplificado para teste
const MOCK_DATA = {
  brands: [
    {
      id: 'apple',
      name: 'Apple',
      slug: 'apple',
      categories: ['iPhone', 'MacBook', 'iPad', 'Apple Watch'],
      featured_products: [
        {
          id: '1',
          name: 'iPhone 15 Pro',
          price: 8999.99,
          discountPrice: 7999.99,
          image: '/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png',
          category: 'iPhone',
          slug: 'iphone-15-pro'
        }
      ]
    },
    {
      id: 'jbl',
      name: 'JBL',
      slug: 'jbl',
      categories: ['Caixas de Som', 'Fones de Ouvido', 'Soundbars'],
      featured_products: [
        {
          id: '2',
          name: 'JBL Charge 5',
          price: 899.99,
          discountPrice: 799.99,
          image: '/Produtos/jblcharge5.png',
          category: 'Caixas de Som',
          slug: 'jbl-charge-5'
        }
      ]
    },
    {
      id: 'dji',
      name: 'DJI',
      slug: 'dji',
      categories: ['Drones', 'Câmeras', 'Gimbal'],
      featured_products: [
        {
          id: '3',
          name: 'DJI Mini 4 Pro',
          price: 4999.99,
          discountPrice: 4599.99,
          image: '/Produtos/djimini4pro.png',
          category: 'Drones',
          slug: 'dji-mini-4-pro'
        }
      ]
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      slug: 'xiaomi',
      categories: ['Smartphones', 'Fones de Ouvido', 'Acessórios'],
      featured_products: []
    },
    {
      id: 'geonav',
      name: 'Geonav',
      slug: 'geonav',
      categories: ['GPS', 'Rastreadores', 'Acessórios'],
      featured_products: []
    }
  ],
  categories: [
    { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
    { id: 'audio', name: 'Áudio', slug: 'audio' },
    { id: 'drones', name: 'Drones', slug: 'drones' },
    { id: 'acessorios', name: 'Acessórios', slug: 'acessorios' },
    { id: 'computadores', name: 'Computadores', slug: 'computadores' }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProducts = searchParams.get('includeProducts') === 'true'

    let responseData = { ...MOCK_DATA }

    // Se não incluir produtos, remover produtos em destaque
    if (!includeProducts) {
      responseData.brands = responseData.brands.map(brand => ({
        ...brand,
        featured_products: []
      }))
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })
  } catch (error) {
    console.error('Error fetching navigation data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navigation data' },
      { status: 500 }
    )
  }
}
