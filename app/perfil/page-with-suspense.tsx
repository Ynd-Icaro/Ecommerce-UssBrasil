"use client"

import { Suspense } from 'react'
import PerfilPageContent from './perfil-content'

function LoadingPerfil() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-uss-primary-50 to-uss-secondary-50 dark:from-uss-gray-800 dark:to-uss-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uss-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<LoadingPerfil />}>
      <PerfilPageContent />
    </Suspense>
  )
}
