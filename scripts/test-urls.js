#!/usr/bin/env node

// Script para testar URLs importantes do site
const urls = [
  'http://localhost:3002',
  'http://localhost:3002/products',
  'http://localhost:3002/products/iphone-16-pro',
  'http://localhost:3002/products/macbook-pro-16',
  'http://localhost:3002/categories/iphones',
  'http://localhost:3002/categories/macs',
  'http://localhost:3002/cart',
  'http://localhost:3002/checkout',
  'http://localhost:3002/admin',
];

async function testUrls() {
  console.log('🧪 Testando URLs importantes...\n');
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const status = response.status;
      const statusText = response.statusText;
      
      if (status === 200) {
        console.log(`✅ ${url} - ${status} ${statusText}`);
      } else {
        console.log(`❌ ${url} - ${status} ${statusText}`);
      }
    } catch (error) {
      console.log(`💥 ${url} - Error: ${error.message}`);
    }
  }
  
  console.log('\n🏁 Teste completo!');
}

testUrls();
