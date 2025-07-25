'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProdutosRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/products')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando para produtos...</p>
      </div>
    </div>
  )
}
