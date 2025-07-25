#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificação Pré-Deploy - USS Brasil E-commerce\n');

const checks = [
  {
    name: 'Package.json existe',
    check: () => fs.existsSync('package.json'),
  },
  {
    name: 'Next.config.ts configurado',
    check: () => fs.existsSync('next.config.ts'),
  },
  {
    name: 'Netlify.toml configurado',
    check: () => fs.existsSync('netlify.toml'),
  },
  {
    name: 'Redirects configurado',
    check: () => fs.existsSync('public/_redirects'),
  },
  {
    name: 'Database de produtos existe',
    check: () => fs.existsSync('lib/products-database.json'),
  },
  {
    name: 'Imagens dos produtos existem',
    check: () => fs.existsSync('public/Produtos') && fs.readdirSync('public/Produtos').length > 0,
  },
  {
    name: 'Build folder existe',
    check: () => fs.existsSync('.next'),
  },
  {
    name: 'Node modules instalados',
    check: () => fs.existsSync('node_modules'),
  }
];

let passedChecks = 0;
const totalChecks = checks.length;

checks.forEach(({ name, check }) => {
  try {
    const passed = check();
    if (passed) {
      console.log(`✅ ${name}`);
      passedChecks++;
    } else {
      console.log(`❌ ${name}`);
    }
  } catch (error) {
    console.log(`💥 ${name} - Error: ${error.message}`);
  }
});

console.log(`\n📊 Resultado: ${passedChecks}/${totalChecks} verificações passaram`);

if (passedChecks === totalChecks) {
  console.log('🎉 Projeto pronto para deploy!');
  process.exit(0);
} else {
  console.log('⚠️  Algumas verificações falharam. Verifique antes do deploy.');
  process.exit(1);
}
