// Sistema de gerenciamento de produtos
// Trabalha com dados do db.json em ambiente cliente

import productsData from '@/db.json'

// Interfaces
export interface ProductNew {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  image: string
  images?: string[]
  video?: string
  marca: string
  category: string
  stock: number
  featured: boolean
  rating: number
  specifications?: Record<string, any>
}

export interface CategoryNew {
  slug: string
  name: string
  description?: string
  marca: string
}

export interface BrandNew {
  slug: string
  name: string
  description?: string
  categories: CategoryNew[]
}

// Cache para melhor performance
let cachedProducts: ProductNew[] | null = null
let cachedBrands: BrandNew[] | null = null

// Função para obter todos os produtos
export function getAllProductsNew(): ProductNew[] {
  if (cachedProducts) return cachedProducts

  try {
    // Converter dados do db.json para o formato esperado
    const products: ProductNew[] = productsData.products.map((produto: any) => ({
      id: produto.id,
      name: produto.name,
      description: produto.description,
      price: produto.price,
      discountPrice: produto.discountPrice,
      image: produto.image,
      images: produto.images,
      video: produto.video,
      marca: produto.brand.toLowerCase(),
      category: produto.category,
      stock: produto.stock || 10,
      featured: produto.featured || false,
      rating: produto.rating || 4.5,
      specifications: produto.specifications || {}
    }))

    cachedProducts = products
    return products
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
    return []
  }
}

// Função para obter todas as marcas e categorias
export function getAllBrandsNew(): BrandNew[] {
  if (cachedBrands) return cachedBrands

  try {
    const products = getAllProductsNew()
    const brandsMap = new Map<string, BrandNew>()

    // Agrupar produtos por marca
    products.forEach(product => {
      const brandSlug = product.marca
      const brandName = product.marca.charAt(0).toUpperCase() + product.marca.slice(1)

      if (!brandsMap.has(brandSlug)) {
        brandsMap.set(brandSlug, {
          slug: brandSlug,
          name: brandName,
          categories: []
        })
      }

      const brand = brandsMap.get(brandSlug)!
      const existingCategory = brand.categories.find(cat => cat.slug === product.category)

      if (!existingCategory) {
        brand.categories.push({
          slug: product.category,
          name: product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/[-_]/g, ' '),
          marca: brandSlug
        })
      }
    })

    cachedBrands = Array.from(brandsMap.values())
    return cachedBrands
  } catch (error) {
    console.error('Erro ao carregar marcas:', error)
    return []
  }
}

// Função para obter produtos por categoria
export function getProductsByCategoryNew(categorySlug: string): ProductNew[] {
  const products = getAllProductsNew()
  return products.filter(product => product.category === categorySlug)
}

// Função para obter produtos por marca
export function getProductsByBrandNew(brandSlug: string): ProductNew[] {
  const products = getAllProductsNew()
  return products.filter(product => product.marca === brandSlug)
}

// Função para obter um produto específico
export function getProductByIdNew(productId: string): ProductNew | null {
  const products = getAllProductsNew()
  return products.find(product => product.id === productId) || null
}

// Função para buscar produtos
export function searchProductsNew(query: string): ProductNew[] {
  const products = getAllProductsNew()
  const searchTerm = query.toLowerCase()

  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.marca.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

// Função para obter produtos em destaque
export function getFeaturedProductsNew(): ProductNew[] {
  const products = getAllProductsNew()
  return products.filter(product => product.featured)
}

// Função para obter produtos relacionados (mesmo marca ou categoria)
export function getRelatedProductsNew(productId: string, categorySlug: string): ProductNew[] {
  const products = getAllProductsNew()
  const currentProduct = getProductByIdNew(productId)
  
  if (!currentProduct) return []

  return products
    .filter(product => 
      product.id !== productId && 
      (product.marca === currentProduct.marca || product.category === categorySlug)
    )
    .slice(0, 8)
}

// Função para obter estatísticas dos produtos
export function getProductStatsNew() {
  const products = getAllProductsNew()
  const brands = getAllBrandsNew()

  return {
    totalProducts: products.length,
    totalBrands: brands.length,
    totalCategories: brands.reduce((acc, brand) => acc + brand.categories.length, 0),
    featuredProducts: products.filter(p => p.featured).length,
    averagePrice: products.reduce((acc, p) => acc + (p.discountPrice || p.price), 0) / products.length
  }
}
