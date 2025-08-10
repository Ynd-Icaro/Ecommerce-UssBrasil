import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Limpar dados existentes
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.wishlist.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Fones de Ouvido',
        description: 'Fones de ouvido com e sem fio, headsets e earbuds',
        slug: 'fones-de-ouvido',
        brand: 'JBL',
        icon: '🎧',
        seoTitle: 'Fones de Ouvido - JBL, Sony, Samsung',
        seoDescription: 'Os melhores fones de ouvido com tecnologia de ponta',
        sortOrder: 1,
        image: '/images/categories/fones.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Celulares/Smartphones',
        description: 'Smartphones Android e iOS das melhores marcas',
        slug: 'celulares-smartphones',
        brand: 'SAMSUNG',
        icon: '📱',
        seoTitle: 'Celulares e Smartphones - Samsung, Xiaomi, Apple',
        seoDescription: 'Smartphones com as mais recentes tecnologias',
        sortOrder: 2,
        image: '/images/categories/smartphones.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Gimbals',
        description: 'Estabilizadores para câmeras e smartphones',
        slug: 'gimbals',
        brand: 'DJI',
        icon: '📹',
        seoTitle: 'Gimbals DJI - Estabilizadores Profissionais',
        seoDescription: 'Estabilizadores DJI para filmagens profissionais',
        sortOrder: 3,
        image: '/images/categories/gimbals.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Acessórios',
        description: 'Capas, carregadores, cabos e outros acessórios',
        slug: 'acessorios',
        brand: 'OTHER',
        icon: '🔌',
        seoTitle: 'Acessórios para Smartphones e Eletrônicos',
        seoDescription: 'Acessórios originais e compatíveis',
        sortOrder: 4,
        image: '/images/categories/acessorios.jpg'
      }
    })
  ])

  console.log('✅ Categorias criadas:', categories.length)

  // Criar produtos
  const products = []

  // Fones JBL
  products.push(
    await prisma.product.create({
      data: {
        name: 'JBL Tune 770NC',
        description: 'Fone de ouvido sem fio com cancelamento de ruído ativo e até 70h de bateria',
        slug: 'jbl-tune-770nc',
        price: 599.99,
        discountPrice: 449.99,
        stock: 25,
        brand: 'JBL',
        categoryId: categories[0].id,
        images: JSON.stringify([
          '/images/products/jbl-tune-770nc-1.jpg',
          '/images/products/jbl-tune-770nc-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Cancelamento de Ruído': 'Ativo',
          'Bateria': '70 horas',
          'Conectividade': 'Bluetooth 5.3',
          'Drivers': '40mm'
        }),
        tags: JSON.stringify(['wireless', 'noise-cancelling', 'jbl']),
        featured: true,
        rating: 4.5,
        totalReviews: 128
      }
    }),
    await prisma.product.create({
      data: {
        name: 'JBL Wave Beam',
        description: 'Earbuds verdadeiramente sem fio com som JBL Deep Bass',
        slug: 'jbl-wave-beam',
        price: 299.99,
        discountPrice: 229.99,
        stock: 40,
        brand: 'JBL',
        categoryId: categories[0].id,
        images: JSON.stringify([
          '/images/products/jbl-wave-beam-1.jpg',
          '/images/products/jbl-wave-beam-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Bateria': '8h + 24h no case',
          'Resistência': 'IP54',
          'Conectividade': 'Bluetooth 5.2',
          'Deep Bass': 'Sim'
        }),
        tags: JSON.stringify(['earbuds', 'wireless', 'deep-bass']),
        featured: true,
        rating: 4.3,
        totalReviews: 89
      }
    })
  )

  // Smartphones Samsung
  products.push(
    await prisma.product.create({
      data: {
        name: 'Samsung Galaxy S24',
        description: 'Smartphone premium com câmera de 50MP e processador Snapdragon 8 Gen 3',
        slug: 'samsung-galaxy-s24',
        price: 3999.99,
        discountPrice: 3499.99,
        stock: 15,
        brand: 'SAMSUNG',
        categoryId: categories[1].id,
        images: JSON.stringify([
          '/images/products/samsung-s24-1.jpg',
          '/images/products/samsung-s24-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Tela': '6.2" Dynamic AMOLED 2X',
          'Processador': 'Snapdragon 8 Gen 3',
          'Câmera': '50MP + 12MP + 10MP',
          'Memória': '8GB RAM + 256GB',
          'Bateria': '4000mAh'
        }),
        tags: JSON.stringify(['flagship', 'android', 'samsung']),
        featured: true,
        rating: 4.7,
        totalReviews: 156
      }
    })
  )

  // Xiaomi
  products.push(
    await prisma.product.create({
      data: {
        name: 'Xiaomi Redmi Note 13 Pro',
        description: 'Smartphone com excelente custo-benefício, câmera de 200MP',
        slug: 'xiaomi-redmi-note-13-pro',
        price: 1899.99,
        discountPrice: 1649.99,
        stock: 30,
        brand: 'XIAOMI',
        categoryId: categories[1].id,
        images: JSON.stringify([
          '/images/products/xiaomi-note-13-1.jpg',
          '/images/products/xiaomi-note-13-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Tela': '6.67" AMOLED',
          'Processador': 'Snapdragon 7s Gen 2',
          'Câmera': '200MP + 8MP + 2MP',
          'Memória': '8GB RAM + 256GB',
          'Bateria': '5100mAh'
        }),
        tags: JSON.stringify(['custo-beneficio', 'android', 'xiaomi']),
        featured: true,
        rating: 4.4,
        totalReviews: 203
      }
    })
  )

  // Gimbals DJI
  products.push(
    await prisma.product.create({
      data: {
        name: 'DJI OM 6',
        description: 'Estabilizador dobrável para smartphone com ActiveTrack 6.0',
        slug: 'dji-om-6',
        price: 899.99,
        discountPrice: 749.99,
        stock: 12,
        brand: 'DJI',
        categoryId: categories[2].id,
        images: JSON.stringify([
          '/images/products/dji-om-6-1.jpg',
          '/images/products/dji-om-6-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Estabilização': '3 eixos',
          'ActiveTrack': '6.0',
          'Bateria': '6.4 horas',
          'Peso': '309g',
          'Compatibilidade': 'iOS/Android'
        }),
        tags: JSON.stringify(['gimbal', 'estabilizador', 'dji']),
        featured: true,
        rating: 4.6,
        totalReviews: 67
      }
    }),
    await prisma.product.create({
      data: {
        name: 'DJI RS 3 Mini',
        description: 'Estabilizador compacto para câmeras mirrorless',
        slug: 'dji-rs-3-mini',
        price: 1899.99,
        stock: 8,
        brand: 'DJI',
        categoryId: categories[2].id,
        images: JSON.stringify([
          '/images/products/dji-rs3-mini-1.jpg',
          '/images/products/dji-rs3-mini-2.jpg'
        ]),
        specifications: JSON.stringify({
          'Carga útil': '2kg',
          'Estabilização': '3 eixos',
          'Bateria': '10 horas',
          'Peso': '795g'
        }),
        tags: JSON.stringify(['gimbal', 'camera', 'profissional']),
        featured: false,
        rating: 4.8,
        totalReviews: 34
      }
    })
  )

  console.log('✅ Produtos criados:', products.length)

  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin USS Brasil',
      email: 'admin@uss-brasil.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/kJsF2wYg2', // password: admin123
      role: 'ADMIN',
      phone: '(11) 99999-9999',
      isActive: true
    }
  })

  console.log('✅ Usuário admin criado:', adminUser.email)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
