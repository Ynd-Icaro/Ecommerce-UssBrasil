import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addSampleProducts() {
  // Get categories
  const iphoneCategory = await prisma.category.findFirst({ where: { slug: 'iphone' } })
  const macCategory = await prisma.category.findFirst({ where: { slug: 'mac' } })
  
  if (!iphoneCategory || !macCategory) {
    console.error('Categories not found')
    return
  }

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 16 Pro',
        description: 'O iPhone mais avançado da Apple com chip A18 Pro e sistema de câmeras profissional.',
        price: 7999.99,
        discountPrice: 7499.99,
        stock: 10,
        featured: true,
        images: '/Imagens/Iphone 16 Pro.png',
        categoryId: iphoneCategory.id,
        specifications: JSON.stringify({
          screen: '6.3" Super Retina XDR',
          chip: 'A18 Pro',
          cameras: 'Sistema triplo 48MP',
          storage: '256GB',
          colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto']
        })
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Pro 14"',
        description: 'MacBook Pro com chip M3 Pro para performance profissional.',
        price: 12999.99,
        stock: 5,
        featured: true,
        images: '/Imagens/Macbook Pro.png',
        categoryId: macCategory.id,
        specifications: JSON.stringify({
          screen: '14.2" Liquid Retina XDR',
          chip: 'Apple M3 Pro',
          memory: '18GB RAM',
          storage: '512GB SSD',
          colors: ['Cinza Espacial', 'Prateado']
        })
      }
    }),
    prisma.product.create({
      data: {
        name: 'iPhone 16',
        description: 'iPhone 16 com chip A18 e nova Action Button.',
        price: 5999.99,
        stock: 15,
        featured: true,
        images: '/Imagens/Iphone 16.png',
        categoryId: iphoneCategory.id,
        specifications: JSON.stringify({
          screen: '6.1" Super Retina XDR',
          chip: 'A18',
          cameras: 'Sistema duplo 48MP',
          storage: '128GB',
          colors: ['Azul', 'Verde', 'Rosa', 'Branco', 'Preto']
        })
      }
    })
  ])

  console.log('Sample products created:', products)
}

addSampleProducts()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
