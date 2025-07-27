// Teste rápido das importações
console.log('Testando importações...')

// Verificar se os arquivos existem
const fs = require('fs')
const path = require('path')

const hookFile = path.join(__dirname, 'hooks', 'use-ussbrasil.ts')
const dbFile = path.join(__dirname, 'lib', 'use-products-database.ts')

console.log('Hook file exists:', fs.existsSync(hookFile))
console.log('DB file exists:', fs.existsSync(dbFile))

if (fs.existsSync(hookFile)) {
  const hookContent = fs.readFileSync(hookFile, 'utf8')
  console.log('Hook imports useProductsDatabase:', hookContent.includes('useProductsDatabase'))
}

if (fs.existsSync(dbFile)) {
  const dbContent = fs.readFileSync(dbFile, 'utf8')
  console.log('DB exports useProductsDatabase:', dbContent.includes('export const useProductsDatabase'))
}

console.log('Teste concluído!')
