const fs = require('fs');

// Ler o arquivo JSON
const data = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));

// Mapear IDs duplicados e corrigi-los
const seenIds = new Set();
const correctedProducts = data.products.map((product, index) => {
  let newId = product.id;
  
  // Se já vimos este ID, criar um novo único
  if (seenIds.has(product.id)) {
    let counter = 2;
    while (seenIds.has(`${product.id}-v${counter}`)) {
      counter++;
    }
    newId = `${product.id}-v${counter}`;
    console.log(`Corrigindo ID duplicado: ${product.id} -> ${newId}`);
  }
  
  seenIds.add(newId);
  
  return {
    ...product,
    id: newId
  };
});

// Atualizar os dados
data.products = correctedProducts;

// Salvar o arquivo corrigido
fs.writeFileSync('data/db.json', JSON.stringify(data, null, 2));

console.log('✅ Todos os IDs duplicados foram corrigidos!');
console.log(`📊 Total de produtos: ${data.products.length}`);
