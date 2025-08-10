"use client"

import { Suspense } from 'react'
import ProdutosPageContent from './produtos-content'

function LoadingProducts() {
  return (
    <div className="min-h-screen py-8" style={{ background: 'var(--uss-bg)' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: 'var(--uss-primary)' }}
          ></div>
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
