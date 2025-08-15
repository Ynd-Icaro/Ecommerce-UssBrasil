const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔄 Sincronizando banco de dados com o arquivo JSON...')
    
    // Ler dados do JSON
    const jsonPath = path.join(__dirname, '../data/db.json')
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    
    console.log(`📊 Encontrados ${data.products.length} produtos no JSON`)
    console.log(`📊 Encontradas ${data.categories.length} categorias no JSON`)
    
    // Limpar dados existentes
    console.log('🗑️ Limpando produtos e categorias existentes...')
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    
    // Criar categorias
    console.log('📁 Criando categorias...')
    const categoryMap = new Map()
    
    for (const category of data.categories) {
      const created = await prisma.category.create({
        data: {
          name: category.name,
          slug: category.slug,
          description: category.description || null,
          image: category.image || null
        }
      })
      categoryMap.set(category.slug, created.id)
      console.log(`✅ Categoria criada: ${category.name}`)
    }
    
    // Criar produtos
    console.log('📦 Criando produtos...')
    let successCount = 0
    
    for (const product of data.products) {
      try {
        const categoryId = categoryMap.get(product.category)
        
        if (!categoryId) {
          console.log(`⚠️ Categoria não encontrada para produto: ${product.name} (categoria: ${product.category})`)
          continue
        }
        
        await prisma.product.create({
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice || null,
            image: product.image,
            images: product.images || [product.image],
            categoryId: categoryId,
            stock: product.stock || 0,
            status: product.status === 'active' ? 'ACTIVE' : 'INACTIVE',
            featured: product.featured || false,
            brand: product.brand || null,
            sku: product.id || null,
            tags: product.tags || [],
            rating: product.rating || null,
            totalReviews: product.totalReviews || 0,
            colors: product.colors || [],
            createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
            specifications: product.specifications ? JSON.stringify(product.specifications) : null,
            paymentOptions: product.paymentOptions ? JSON.stringify(product.paymentOptions) : null
          }
        })
        
        successCount++
        console.log(`✅ Produto criado: ${product.name}`)
        
      } catch (error) {
        console.error(`❌ Erro ao criar produto ${product.name}:`, error.message)
      }
    }
    
    console.log(`\n🎉 Sincronização concluída!`)
    console.log(`📊 ${successCount} produtos criados com sucesso`)
    console.log(`📁 ${data.categories.length} categorias criadas`)
    
  } catch (error) {
    console.error('❌ Erro na sincronização:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
