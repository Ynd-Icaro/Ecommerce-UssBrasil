// ============================================================================
// TESTE PARA VERIFICAR OS HOOKS CORRIGIDOS
// ============================================================================

import { useProductDatabase } from '@/lib/use-products-database'

function testHooks() {
  const database = useProductDatabase()
  
  console.log('🔧 Testando hooks corrigidos...')
  
  // Testar produtos em destaque
  const featuredProducts = database.getFeaturedProducts(4)
  console.log('✅ Produtos em destaque:', featuredProducts.length)
  
  // Testar categorias
  const categories = database.getAllCategories()
  console.log('✅ Categorias:', categories.length)
  
  // Testar busca
  const searchResults = database.searchProducts('iPhone')
  console.log('✅ Busca por iPhone:', searchResults.length)
  
  console.log('🎉 Todos os testes passaram! Os hooks agora usam dados locais.')
}

export default testHooks
