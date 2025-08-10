'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage(){
  const search = useSearchParams()
  const orderId = search.get('order')
  return (
    <main className="pt-28 pb-24 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-10 shadow-xl text-center">
          <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Pedido Confirmado</h1>
          <p className="text-slate-600 mb-6">Obrigado pela sua compra! {orderId && (<><br/>Seu código de referência é <span className="font-semibold text-uss-primary">#{orderId.slice(0,8)}</span>.</>)} Você receberá um e-mail com todos os detalhes em instantes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos" className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-medium transition">Continuar Comprando</Link>
            <Link href="/perfil?tab=orders" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--uss-primary)] to-[var(--uss-accent)] text-white text-sm font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2">Acompanhar Pedido <ArrowRight className="h-4 w-4"/></Link>
          </div>
          <div className="mt-10 text-xs text-slate-500 space-y-1">
            <p>Pagamento 100% seguro • Envio Express disponível nas principais regiões</p>
            <p>Precisa de ajuda? Acesse a <Link href="/central-ajuda" className="text-[var(--uss-primary)] hover:underline">Central de Ajuda</Link>.</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
