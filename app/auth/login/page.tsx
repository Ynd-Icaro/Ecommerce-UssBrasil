'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  const { login, signIn, status } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Placeholder: decide NextAuth or local login
      if (email.endsWith('@oauth.test')) {
        await signIn('credentials', { email, redirect: false })
      } else {
        login(email, name || undefined)
      }
    } catch (err: any) {
      setError('Falha ao autenticar, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-1 bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-premium)' }}>Entrar</h1>
        <p className="text-sm text-slate-600 mb-6">Acesse sua conta para acompanhar pedidos e favoritos.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">E-mail</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Nome (opcional)</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:opacity-50" style={{ background: 'var(--uss-gradient-premium)' }}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <div className="mt-6 text-xs text-slate-600 flex flex-col space-y-2">
          <span>Esqueceu a senha? <Link href="/auth/recuperar" className="text-[var(--uss-primary)] hover:underline">Recuperar acesso</Link></span>
          <span>Não tem conta? <Link href="/auth/registrar" className="text-[var(--uss-accent)] hover:underline">Criar conta</Link></span>
        </div>
      </motion.div>
    </main>
  )
}
