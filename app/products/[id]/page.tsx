'use client'

import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          Produto ID: {id}
        </h1>
        <p className="text-uss-gray-600">
          Esta página está em desenvolvimento. Em breve você encontrará detalhes do produto aqui.
        </p>
      </div>
    </div>
  )
}