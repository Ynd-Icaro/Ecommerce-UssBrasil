const fs = require('fs');
const path = require('path');

// Ler o arquivo JSON
const data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

// Lista de imagens referenciadas
const referencedImages = new Set();

data.products.forEach(product => {
  if (product.image) {
    referencedImages.add(product.image);
  }
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => referencedImages.add(img));
  }
});

console.log(`📊 Total de imagens referenciadas: ${referencedImages.size}`);

// Verificar quais imagens existem no sistema de arquivos
const missingImages = [];
const existingImages = [];

referencedImages.forEach(imagePath => {
  // Remover o "/Produtos/" do início para obter o caminho relativo
  const relativePath = imagePath.replace('/Produtos/', '');
  const fullPath = path.join('public', 'Produtos', relativePath);
  
  if (fs.existsSync(fullPath)) {
    existingImages.push(imagePath);
  } else {
    missingImages.push(imagePath);
  }
});

console.log(`\n✅ Imagens existentes: ${existingImages.length}`);
console.log(`❌ Imagens faltando: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log('\n🔍 Imagens faltando:');
  missingImages.forEach(img => console.log(`  - ${img}`));
}

// Verificar arquivos de imagem que não estão sendo usados
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (/\.(png|jpg|jpeg|webp|gif)$/i.test(file)) {
      // Converter para o formato usado no JSON
      const relativePath = filePath.replace(path.join('public', 'Produtos'), '').replace(/\\/g, '/');
      const jsonPath = '/Produtos' + relativePath;
      fileList.push(jsonPath);
    }
  });
  
  return fileList;
}

const allImageFiles = getAllImageFiles(path.join('public', 'Produtos'));
const unusedImages = allImageFiles.filter(img => !referencedImages.has(img));

console.log(`\n📁 Total de arquivos de imagem: ${allImageFiles.length}`);
console.log(`🗂️ Imagens não utilizadas: ${unusedImages.length}`);

if (unusedImages.length > 0 && unusedImages.length <= 20) {
  console.log('\n📋 Algumas imagens não utilizadas:');
  unusedImages.slice(0, 10).forEach(img => console.log(`  - ${img}`));
  if (unusedImages.length > 10) {
    console.log(`  ... e mais ${unusedImages.length - 10} imagens`);
  }
}
