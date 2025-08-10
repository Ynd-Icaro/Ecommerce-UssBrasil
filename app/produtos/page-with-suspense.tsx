"use client"

import { Suspense } from 'react'
import ProdutosPageContent from './produtos-content'

function LoadingProducts() {
  return (
    <div className="min-h-screen bg-uss-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<LoadingProducts />}>
      <ProdutosPageContent />
    </Suspense>
  )
}
