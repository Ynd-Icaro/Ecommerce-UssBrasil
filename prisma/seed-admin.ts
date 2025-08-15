import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/password';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin (sem senha por enquanto, só para teste)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ussbrasil.com' },
    update: {},
    create: {
      email: 'admin@ussbrasil.com',
      name: 'Administrador',
      role: 'ADMIN',
      emailVerified: new Date(),
    }
  });

  console.log('Admin user created:', admin.email);

  // Criar categorias
  const categories = [
    {
      name: 'Eletrônicos',
      slug: 'eletronicos',
      description: 'Produtos eletrônicos diversos',
      image: '/produtos/eletronicos.jpg'
    },
    {
      name: 'Roupas',
      slug: 'roupas',
      description: 'Vestuário masculino e feminino',
      image: '/produtos/roupas.jpg'
    },
    {
      name: 'Casa e Jardim',
      slug: 'casa-jardim',
      description: 'Itens para casa e jardim',
      image: '/produtos/casa.jpg'
    },
    {
      name: 'Esportes',
      slug: 'esportes',
      description: 'Artigos esportivos',
      image: '/produtos/esportes.jpg'
    },
    {
      name: 'Livros',
      slug: 'livros',
      description: 'Livros diversos',
      image: '/produtos/livros.jpg'
    }
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
    createdCategories.push(created);
    console.log('Category created:', created.name);
  }

  // Criar produtos de exemplo
  const products = [
    {
      name: 'Smartphone Samsung Galaxy A54',
      description: 'Smartphone com tela de 6.4 polegadas, câmera tripla de 50MP e bateria de 5000mAh',
      price: 1299.99,
      discountPrice: 1199.99,
      stock: 50,
      featured: true,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: JSON.stringify(['/produtos/smartphone-samsung.jpg']),
      specifications: JSON.stringify({
        tela: '6.4 polegadas',
        camera: '50MP + 12MP + 5MP',
        bateria: '5000mAh',
        memoria: '128GB',
        ram: '6GB'
      })
    },
    {
      name: 'Notebook Lenovo IdeaPad 3',
      description: 'Notebook com processador Intel Core i5, 8GB RAM e SSD 256GB',
      price: 2499.99,
      stock: 25,
      featured: true,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: JSON.stringify(['/produtos/notebook-lenovo.jpg']),
      specifications: JSON.stringify({
        processador: 'Intel Core i5',
        memoria: '8GB RAM',
        armazenamento: '256GB SSD',
        tela: '15.6 polegadas'
      })
    },
    {
      name: 'Camiseta Polo Masculina',
      description: 'Camiseta polo de algodão 100%, disponível em várias cores',
      price: 89.99,
      discountPrice: 69.99,
      stock: 100,
      categoryId: createdCategories[1].id, // Roupas
      images: JSON.stringify(['/produtos/polo-masculina.jpg']),
      specifications: JSON.stringify({
        material: '100% Algodão',
        tamanhos: 'P, M, G, GG',
        cores: 'Azul, Branco, Preto, Vermelho'
      })
    },
    {
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo Nike Air Max para corrida e atividades físicas',
      price: 299.99,
      stock: 75,
      featured: true,
      categoryId: createdCategories[3].id, // Esportes
      images: JSON.stringify(['/produtos/tenis-nike.jpg']),
      specifications: JSON.stringify({
        marca: 'Nike',
        tipo: 'Running',
        material: 'Mesh + Sintético',
        numeracao: '35 ao 44'
      })
    },
    {
      name: 'Livro "O Poder do Agora"',
      description: 'Livro de autoajuda sobre mindfulness e presença mental',
      price: 39.99,
      stock: 200,
      categoryId: createdCategories[4].id, // Livros
      images: JSON.stringify(['/produtos/livro-poder-agora.jpg']),
      specifications: JSON.stringify({
        autor: 'Eckhart Tolle',
        paginas: '236',
        editora: 'Sextante',
        ano: '2002'
      })
    },
    {
      name: 'Aspirador de Pó Electrolux',
      description: 'Aspirador de pó com filtro HEPA e potência de 1400W',
      price: 199.99,
      stock: 30,
      categoryId: createdCategories[2].id, // Casa e Jardim
      images: JSON.stringify(['/produtos/aspirador-electrolux.jpg']),
      specifications: JSON.stringify({
        potencia: '1400W',
        capacidade: '1.5L',
        filtro: 'HEPA',
        peso: '3.2kg'
      })
    },
    {
      name: 'Fone de Ouvido Bluetooth JBL',
      description: 'Fone de ouvido sem fio com cancelamento de ruído e autonomia de 30h',
      price: 149.99,
      stock: 80,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: JSON.stringify(['/produtos/fone-jbl.jpg']),
      specifications: JSON.stringify({
        conectividade: 'Bluetooth 5.0',
        autonomia: '30 horas',
        cancelamento: 'Ruído ativo',
        peso: '280g'
      })
    },
    {
      name: 'Jaqueta Jeans Feminina',
      description: 'Jaqueta jeans clássica feminina, modelo oversized',
      price: 129.99,
      stock: 60,
      categoryId: createdCategories[1].id, // Roupas
      images: JSON.stringify(['/produtos/jaqueta-jeans.jpg']),
      specifications: JSON.stringify({
        material: '98% Algodão, 2% Elastano',
        modelo: 'Oversized',
        tamanhos: 'P, M, G, GG',
        lavagem: 'Stone washed'
      })
    }
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: product
    });
    console.log('Product created:', created.name);
  }

  // Criar usuário de teste
  const testUser = await prisma.user.upsert({
    where: { email: 'teste@ussbrasil.com' },
    update: {},
    create: {
      email: 'teste@ussbrasil.com',
      name: 'Usuário Teste',
      role: 'USER',
      emailVerified: new Date(),
      phone: '(11) 99999-9999',
      address: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
      country: 'Brasil'
    }
  });

  console.log('Test user created:', testUser.email);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
