"use client"

import { redirect } from 'next/navigation'

export default function LoginPage() {
  // Redirecionar para a home page já que o login é modal
  redirect('/')
}