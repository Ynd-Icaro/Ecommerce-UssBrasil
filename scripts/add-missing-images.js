const fs = require('fs');
const path = require('path');

// Ler o arquivo JSON
const data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

console.log('🔄 Verificando produtos sem imagens...');

// Função para obter todas as imagens disponíveis
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (/\.(png|jpg|jpeg|webp|gif)$/i.test(file)) {
      const relativePath = filePath.replace(path.join('public', 'Produtos'), '').replace(/\\/g, '/');
      const jsonPath = '/Produtos' + relativePath;
      fileList.push(jsonPath);
    }
  });
  
  return fileList;
}

const allImages = getAllImageFiles(path.join('public', 'Produtos'));

// Mapear imagens por categoria/marca
const imagesByCategory = {
  apple: allImages.filter(img => img.toLowerCase().includes('apple')),
  dji: allImages.filter(img => img.toLowerCase().includes('dji')),
  geonav: allImages.filter(img => img.toLowerCase().includes('geonav')),
  other: allImages.filter(img => !img.toLowerCase().includes('apple') && !img.toLowerCase().includes('dji') && !img.toLowerCase().includes('geonav'))
};

let updatedCount = 0;
let totalProducts = data.products.length;

// Verificar e atualizar produtos
data.products.forEach(product => {
  let needsUpdate = false;
  
  // Se não tem imagem principal
  if (!product.image || product.image === '/favicon.ico') {
    const brand = product.brand?.toLowerCase() || 'other';
    let availableImages = [];
    
    if (brand.includes('apple')) {
      availableImages = imagesByCategory.apple;
    } else if (brand.includes('dji')) {
      availableImages = imagesByCategory.dji;
    } else if (brand.includes('geonav')) {
      availableImages = imagesByCategory.geonav;
    } else {
      availableImages = imagesByCategory.other;
    }
    
    // Tentar encontrar uma imagem que corresponda ao nome do produto
    const productName = product.name.toLowerCase();
    const matchingImage = availableImages.find(img => {
      const imgName = path.basename(img, path.extname(img)).toLowerCase();
      return productName.includes(imgName.replace(/[-_]/g, ' ')) || 
             imgName.includes(productName.replace(/\s+/g, ''));
    });
    
    if (matchingImage) {
      product.image = matchingImage;
      needsUpdate = true;
    } else if (availableImages.length > 0) {
      // Se não encontrar correspondência exata, usar a primeira imagem disponível da categoria
      product.image = availableImages[0];
      needsUpdate = true;
    }
  }
  
  // Se não tem array de imagens, criar com base na imagem principal
  if (!product.images || !Array.isArray(product.images)) {
    if (product.image) {
      product.images = [product.image];
      needsUpdate = true;
    }
  }
  
  if (needsUpdate) {
    updatedCount++;
    console.log(`✅ Atualizado: ${product.name} -> ${product.image}`);
  }
});

console.log(`\n📊 Relatório:`);
console.log(`   Total de produtos: ${totalProducts}`);
console.log(`   Produtos atualizados: ${updatedCount}`);
console.log(`   Produtos sem alteração: ${totalProducts - updatedCount}`);

if (updatedCount > 0) {
  // Salvar o arquivo atualizado
  fs.writeFileSync('data/db.json', JSON.stringify(data, null, 2));
  console.log('\n💾 Arquivo db.json atualizado com sucesso!');
} else {
  console.log('\n✅ Todos os produtos já possuem imagens!');
}
