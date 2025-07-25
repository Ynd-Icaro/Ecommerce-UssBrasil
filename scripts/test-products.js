#!/usr/bin/env node

// Script para testar as páginas de produtos específicos
const productUrls = [
  'http://localhost:3002/products/iphone-16-pro',
  'http://localhost:3002/products/iphone-15-pro', 
  'http://localhost:3002/products/macbook-pro-16',
  'http://localhost:3002/products/macbook-air-m2',
  'http://localhost:3002/products/imac-24',
  'http://localhost:3002/products/apple-watch-ultra-2',
  'http://localhost:3002/products/apple-watch-se',
  'http://localhost:3002/products/apple-watch-series-10',
  'http://localhost:3002/products/airpods-pro-2',
  'http://localhost:3002/products/airpods-4',
  'http://localhost:3002/products/airpods-max',
  'http://localhost:3002/products/ipad-pro-12',
  'http://localhost:3002/products/ipad-air',
  'http://localhost:3002/products/ipad',
];

async function testProductPages() {
  console.log('🧪 Testando páginas de produtos...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const url of productUrls) {
    try {
      const response = await fetch(url);
      const status = response.status;
      
      if (status === 200) {
        console.log(`✅ ${url.split('/').pop()} - OK`);
        successCount++;
      } else {
        console.log(`❌ ${url.split('/').pop()} - ${status}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`💥 ${url.split('/').pop()} - Error: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Resultado: ${successCount} sucessos, ${errorCount} erros`);
  console.log('🏁 Teste completo!');
}

// Aguarda um pouco para o servidor estar pronto
setTimeout(testProductPages, 3000);
