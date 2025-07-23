"use client"

import { redirect } from 'next/navigation'

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Redirecionar para a página de orders principal
  redirect('/orders')
}
