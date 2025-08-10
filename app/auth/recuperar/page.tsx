'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSent(true); setLoading(false) }, 700)
  }

  return (
    <main className="container mx-auto max-w-md px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-1 bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-premium)' }}>Recuperar Acesso</h1>
        <p className="text-sm text-slate-600 mb-6">Informe o e-mail cadastrado para enviarmos o link de redefinição.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">E-mail</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border-slate-300 focus:border-[var(--uss-primary)] focus:ring-[var(--uss-primary)] text-sm" />
          </div>
          {sent && <p className="text-xs text-green-600">Se existir conta para este e-mail, enviaremos instruções de redefinição.</p>}
          <button disabled={loading} className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:opacity-50" style={{ background: 'var(--uss-gradient-premium)' }}>{loading ? 'Enviando...' : 'Enviar Link'}</button>
        </form>
        <div className="mt-6 text-xs text-slate-600">
          <Link href="/auth/login" className="text-[var(--uss-primary)] hover:underline">Voltar ao login</Link>
        </div>
      </motion.div>
    </main>
  )
}
