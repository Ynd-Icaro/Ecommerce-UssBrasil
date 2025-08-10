'use client'

import { Metadata } from 'next'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'FAQ | USS Brasil',
  description: 'Perguntas frequentes sobre compras, pedidos, garantias e suporte na USS Brasil.',
}

const faqs = [
  {
    category: 'Pedidos e Pagamentos',
    items: [
      { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos Pix, Boleto, e principais cartões de crédito em até 12x sem juros (parcela mínima pode ser aplicada).' },
      { q: 'Meu pedido foi aprovado?', a: 'Você recebe e-mail automático após a aprovação. Em alguns casos o pagamento pode levar até 2 horas para confirmação.' },
    ]
  },
  {
    category: 'Envio e Entrega',
    items: [
      { q: 'Quais são os prazos de entrega?', a: 'O prazo aparece no checkout conforme CEP. Pedidos com Entrega Expressa exibem selo especial no acompanhamento.' },
      { q: 'Posso alterar o endereço após comprar?', a: 'Alterações só são possíveis antes da nota fiscal ser emitida. Contate o suporte imediatamente.' },
    ]
  },
  {
    category: 'Garantia e Trocas',
    items: [
      { q: 'Como funciona a garantia?', a: 'Todos os produtos possuem garantia legal e de fabricante. Detalhes completos na página de Garantia.' },
      { q: 'Quero solicitar troca ou devolução', a: 'Acesse Política de Troca e siga as instruções. Solicitações devem ser abertas dentro do prazo previsto no CDC.' },
    ]
  },
]

export default function FAQPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-premium)' }}>Perguntas Frequentes</h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Reunimos respostas rápidas para as dúvidas mais comuns. Conte com nossa Central de Ajuda para suporte completo.
        </p>
      </motion.header>

      <div className="space-y-10">
        {faqs.map((section, idx) => (
          <section key={section.category} className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-6 shadow-sm">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-slate-800 mb-4 flex items-center"
            >
              <span className="w-2 h-6 rounded-full mr-3 bg-gradient-to-b from-[var(--uss-primary)] to-[var(--uss-accent)]" />
              {section.category}
            </motion.h2>
            <ul className="divide-y divide-slate-200">
              {section.items.map((item, qidx) => (
                <motion.li
                  key={item.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * qidx }}
                  className="py-4"
                >
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-start justify-between">
                      <span className="font-medium text-slate-700 group-open:text-[var(--uss-primary-dark)] pr-4">
                        {item.q}
                      </span>
                      <span className="mt-1 text-slate-400 text-sm transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </details>
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-16 text-center">
        <p className="text-sm text-slate-500">Não encontrou o que procurava? Acesse <a href="/central-ajuda" className="text-[var(--uss-primary)] hover:underline">Central de Ajuda</a> ou contate nosso suporte em <a href="/atendimento" className="text-[var(--uss-accent)] hover:underline">Atendimento</a>.</p>
      </section>
    </main>
  )
}
