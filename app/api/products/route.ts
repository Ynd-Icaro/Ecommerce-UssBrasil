import { NextRequest, NextResponse } from 'next/server'

// Mock data para produtos
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'O iPhone mais avançado da Apple',
    slug: 'iphone-15-pro',
    price: 8999.99,
    discountPrice: 7999.99,
    stock: 10,
    featured: true,
    brand: 'Apple',
    category: 'iPhone',
    images: ['/Produtos/Apple/iPhone 15 Pro/iPhone-15-pro-finish-select-202309-6-7inch-naturaltitanium.png'],
    rating: 4.8,
    totalReviews: 156
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    description: 'MacBook Pro com chip M3',
    slug: 'macbook-pro-14',
    price: 12999.99,
    discountPrice: 11999.99,
    stock: 5,
    featured: true,
    brand: 'Apple',
    category: 'MacBook',
    images: ['/Produtos/macbookpro.png'],
    rating: 4.9,
    totalReviews: 89
  },
  {
    id: '3',
    name: 'JBL Charge 5',
    description: 'Caixa de som portátil com bluetooth',
    slug: 'jbl-charge-5',
    price: 899.99,
    discountPrice: 799.99,
    stock: 25,
    featured: true,
    brand: 'JBL',
    category: 'Caixas de Som',
    images: ['/Produtos/jblcharge5.png'],
    rating: 4.7,
    totalReviews: 234
  },
  {
    id: '4',
    name: 'DJI Mini 4 Pro',
    description: 'Drone compacto com câmera 4K',
    slug: 'dji-mini-4-pro',
    price: 4999.99,
    discountPrice: 4599.99,
    stock: 8,
    featured: true,
    brand: 'DJI',
    category: 'Drones',
    images: ['/Produtos/djimini4pro.png'],
    rating: 4.6,
    totalReviews: 78
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description: 'iPad Pro com tela Liquid Retina XDR',
    slug: 'ipad-pro-12-9',
    price: 7999.99,
    discountPrice: 7299.99,
    stock: 12,
    featured: false,
    brand: 'Apple',
    category: 'iPad',
    images: ['/Produtos/Apple/iPad/ipad-pro-12-9.png'],
    rating: 4.8,
    totalReviews: 92
  },
  {
    id: '6',
    name: 'Xiaomi Redmi Buds 4',
    description: 'Fones de ouvido sem fio com qualidade Xiaomi',
    slug: 'xiaomi-redmi-buds-4',
    price: 299.99,
    discountPrice: 249.99,
    stock: 30,
    featured: false,
    brand: 'Xiaomi',
    category: 'Fones de Ouvido',
    images: ['/Produtos/Xiaomi/redmi-buds-4.png'],
    rating: 4.3,
    totalReviews: 67
  },
  {
    id: '7',
    name: 'Geonav GPS Pro',
    description: 'GPS automotivo com mapas atualizados',
    slug: 'geonav-gps-pro',
    price: 1299.99,
    discountPrice: 1099.99,
    stock: 15,
    featured: false,
    brand: 'Geonav',
    category: 'GPS',
    images: ['/Produtos/Geonav/gps-pro.png'],
    rating: 4.4,
    totalReviews: 23
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parâmetros de filtro
    const brand = searchParams.get('brand')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const featured = searchParams.get('featured')
    const sortBy = searchParams.get('sortBy') || 'name'
    const order = searchParams.get('order') || 'asc'
    
    // Parâmetros de paginação
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    let filteredProducts = [...MOCK_PRODUCTS]

    // Aplicar filtros
    if (brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase() === brand.toLowerCase()
      )
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }

    if (minPrice) {
      const min = parseFloat(minPrice)
      filteredProducts = filteredProducts.filter(product => 
        (product.discountPrice || product.price) >= min
      )
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice)
      filteredProducts = filteredProducts.filter(product => 
        (product.discountPrice || product.price) <= max
      )
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured)
    }

    // Aplicar ordenação
    filteredProducts.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'price':
          aValue = a.discountPrice || a.price
          bValue = b.discountPrice || b.price
          break
        case 'rating':
          aValue = a.rating || 0
          bValue = b.rating || 0
          break
        case 'reviews':
          aValue = a.totalReviews
          bValue = b.totalReviews
          break
        case 'name':
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
      }

      if (order === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
    })

    // Aplicar paginação
    const total = filteredProducts.length
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    // Calcular estatísticas dos filtros
    const brands = [...new Set(MOCK_PRODUCTS.map(p => p.brand))].sort()
    const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))].sort()
    const priceRange = {
      min: Math.min(...MOCK_PRODUCTS.map(p => p.discountPrice || p.price)),
      max: Math.max(...MOCK_PRODUCTS.map(p => p.discountPrice || p.price))
    }

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        },
        filters: {
          brands,
          categories,
          priceRange,
          appliedFilters: {
            brand,
            category,
            search,
            minPrice,
            maxPrice,
            featured,
            sortBy,
            order
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Aqui você implementaria a criação de um novo produto
    // Por enquanto, apenas retornamos sucesso
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      data: { id: Date.now().toString(), ...body }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
