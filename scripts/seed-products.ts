import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Get categories first
  const categories = await prisma.category.findMany()
  const iphoneCategory = categories.find(c => c.slug === 'iphone')
  const ipadCategory = categories.find(c => c.slug === 'ipad')
  const macCategory = categories.find(c => c.slug === 'mac')
  const watchCategory = categories.find(c => c.slug === 'watch')
  const airpodsCategory = categories.find(c => c.slug === 'airpods')

  // Sample products data
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'O iPhone mais avançado da Apple com chip A17 Pro e sistema de câmera profissional.',
      price: 8999.99,
      images: ['/Produtos/iphone-15-pro.jpg'],
      categoryId: iphoneCategory?.id,
      stock: 25,
      featured: true,
      specifications: JSON.stringify({
        "Tela": "6.1 polegadas Super Retina XDR",
        "Chip": "A17 Pro",
        "Câmera": "Sistema de câmera Pro de 48MP",
        "Armazenamento": "128GB, 256GB, 512GB, 1TB",
        "Bateria": "Até 23 horas de reprodução de vídeo"
      })
    },
    {
      name: 'iPhone 15',
      description: 'iPhone 15 com Dynamic Island e câmera principal de 48MP.',
      price: 7299.99,
      images: ['/Produtos/iphone-15.jpg'],
      categoryId: iphoneCategory?.id,
      stock: 30,
      featured: true,
      specifications: JSON.stringify({
        "Tela": "6.1 polegadas Super Retina XDR",
        "Chip": "A16 Bionic",
        "Câmera": "Câmera principal de 48MP",
        "Armazenamento": "128GB, 256GB, 512GB",
        "Bateria": "Até 20 horas de reprodução de vídeo"
      })
    },
    {
      name: 'iPad Pro 12.9"',
      description: 'iPad Pro com chip M2 e tela Liquid Retina XDR de 12.9 polegadas.',
      price: 12999.99,
      images: ['/Produtos/ipad-pro-12.jpg'],
      categoryId: ipadCategory?.id,
      stock: 15,
      featured: true,
      specifications: JSON.stringify({
        "Tela": "12.9 polegadas Liquid Retina XDR",
        "Chip": "Apple M2",
        "Câmera": "Sistema de câmera Pro de 12MP",
        "Armazenamento": "128GB, 256GB, 512GB, 1TB, 2TB",
        "Conectividade": "Wi-Fi 6E, Bluetooth 5.3"
      })
    },
    {
      name: 'MacBook Air M2',
      description: 'MacBook Air redesenhado com chip M2 e tela Liquid Retina de 13.6 polegadas.',
      price: 11499.99,
      images: ['/Produtos/macbook-air-m2.jpg'],
      categoryId: macCategory?.id,
      stock: 10,
      featured: true,
      specifications: JSON.stringify({
        "Tela": "13.6 polegadas Liquid Retina",
        "Chip": "Apple M2",
        "Memória": "8GB, 16GB, 24GB",
        "Armazenamento": "256GB, 512GB, 1TB, 2TB SSD",
        "Bateria": "Até 18 horas de navegação"
      })
    },
    {
      name: 'Apple Watch Series 9',
      description: 'Apple Watch Series 9 com chip S9 e novos recursos de saúde.',
      price: 4299.99,
      images: ['/Produtos/watch-series-9.jpg'],
      categoryId: watchCategory?.id,
      stock: 20,
      featured: false,
      specifications: JSON.stringify({
        "Tela": "Always-On Retina",
        "Chip": "S9 SiP",
        "Sensores": "ECG, Oxigênio no sangue, Temperatura",
        "Resistência": "Água até 50 metros",
        "Bateria": "Até 18 horas"
      })
    },
    {
      name: 'AirPods Pro (2ª geração)',
      description: 'AirPods Pro com cancelamento ativo de ruído e áudio espacial personalizado.',
      price: 2799.99,
      images: ['/Produtos/airpods-pro-2.jpg'],
      categoryId: airpodsCategory?.id,
      stock: 35,
      featured: false,
      specifications: JSON.stringify({
        "Audio": "Cancelamento ativo de ruído",
        "Chip": "H2",
        "Bateria": "Até 6 horas com uma carga",
        "Estojo": "Até 30 horas de reprodução total",
        "Recursos": "Áudio espacial personalizado, Transparência adaptável"
      })
    },
    {
      name: 'iPhone 14',
      description: 'iPhone 14 com recursos de segurança avançados e sistema de câmera dupla.',
      price: 6499.99,
      images: ['/Produtos/iphone-14.jpg'],
      categoryId: iphoneCategory?.id,
      stock: 40,
      featured: false,
      specifications: JSON.stringify({
        "Tela": "6.1 polegadas Super Retina XDR",
        "Chip": "A15 Bionic",
        "Câmera": "Sistema de câmera dupla de 12MP",
        "Armazenamento": "128GB, 256GB, 512GB",
        "Recursos": "Detecção de acidente, SOS de emergência via satélite"
      })
    },
    {
      name: 'iPad Air',
      description: 'iPad Air com chip M1 e tela Liquid Retina de 10.9 polegadas.',
      price: 6999.99,
      images: ['/Produtos/ipad-air.jpg'],
      categoryId: ipadCategory?.id,
      stock: 25,
      featured: false,
      specifications: JSON.stringify({
        "Tela": "10.9 polegadas Liquid Retina",
        "Chip": "Apple M1",
        "Câmera": "Câmera traseira de 12MP",
        "Armazenamento": "64GB, 256GB",
        "Conectividade": "Wi-Fi 6, Bluetooth 5.0"
      })
    }
  ]

  // Insert products
  for (const productData of products) {
    if (productData.categoryId) {
      // Check if product already exists
      const existingProduct = await prisma.product.findFirst({
        where: { name: productData.name }
      })
      
      if (!existingProduct) {
        const product = await prisma.product.create({
          data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            images: productData.images.join(','), // Convert array to string
            categoryId: productData.categoryId,
            stock: productData.stock,
            featured: productData.featured,
            specifications: productData.specifications
          },
          include: {
            category: true
          }
        })
        
        console.log(`Product created: ${product.name}`)
      } else {
        console.log(`Product already exists: ${productData.name}`)
      }
    }
  }

  console.log('All products have been created successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
