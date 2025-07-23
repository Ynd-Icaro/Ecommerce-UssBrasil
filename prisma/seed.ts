import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/password'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = hashPassword('admin123')
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ussbrasil.com' },
    update: {},
    create: {
      email: 'admin@ussbrasil.com',
      name: 'Admin USS Brasil',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('Admin user created:', admin)

  // Create some sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'iphone' },
      update: {},
      create: {
        name: 'iPhone',
        slug: 'iphone',
        description: 'iPhones da Apple'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'ipad' },
      update: {},
      create: {
        name: 'iPad',
        slug: 'ipad', 
        description: 'iPads da Apple'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'mac' },
      update: {},
      create: {
        name: 'Mac',
        slug: 'mac',
        description: 'Computadores Mac da Apple'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'watch' },
      update: {},
      create: {
        name: 'Apple Watch',
        slug: 'watch',
        description: 'Apple Watch e acessórios'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'airpods' },
      update: {},
      create: {
        name: 'AirPods',
        slug: 'airpods',
        description: 'AirPods e acessórios de áudio'
      }
    })
  ])

  console.log('Categories created:', categories)
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
