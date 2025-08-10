'use client'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function RegistrarPage() {
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (form.password.length < 6) { setError('Senha mínima de 6 caracteres.'); return }
    if (form.password !== form.confirm) { setError('Confirmação de senha não confere.'); return }
    setLoading(true)
    setTimeout(() => {
      login(form.email, form.name)
      setSuccess(true)
      setLoading(false)
    }, 600)
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-1 bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-premium)' }}>Criar Conta</h1>
        <p className="text-sm text-slate-600 mb-6">Registre-se para acompanhar pedidos e ter ofertas exclusivas.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Nome</label>
            <input name="name" required value={form.name} onChange={handleChange} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">E-mail</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Senha</label>
              <input type="password" name="password" required value={form.password} onChange={handleChange} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Confirmar</label>
              <input type="password" name="confirm" required value={form.confirm} onChange={handleChange} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
            </div>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          {success && <p className="text-xs text-green-600">Conta criada! Você já está autenticado.</p>}
          <button disabled={loading} className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:opacity-50" style={{ background: 'var(--uss-gradient-premium)' }}>{loading ? 'Criando...' : 'Registrar'}</button>
        </form>
        <div className="mt-6 text-xs text-slate-600">
          Já possui conta? <Link href="/auth/login" className="text-[var(--uss-primary)] hover:underline">Entrar</Link>
        </div>
      </motion.div>
    </main>
  )
}
