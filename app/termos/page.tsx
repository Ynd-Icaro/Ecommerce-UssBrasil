'use client'

import { motion } from 'framer-motion'

export default function TermosPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-dark)' }}>Termos de Uso</h1>
        <p className="text-slate-600 mt-3 text-sm max-w-2xl mx-auto">Leia atentamente nossos termos. Ao utilizar a plataforma você concorda integralmente com as condições descritas abaixo.</p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">1. Aceitação</h2>
          <p>Ao acessar ou usar o site USS Brasil você declara ter lido, compreendido e aceitado estes Termos de Uso e nossa Política de Privacidade.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">2. Cadastro e Conta</h2>
          <p>O usuário se compromete a fornecer informações verdadeiras, completas e atualizadas. Reservamo-nos o direito de suspender contas com indícios de fraude ou uso indevido.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">3. Compras e Pagamentos</h2>
          <p>Os preços e condições comerciais podem ser alterados sem aviso prévio. A aprovação do pedido depende da confirmação do pagamento e análise antifraude quando aplicável.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">4. Entregas</h2>
          <p>Prazos exibidos no checkout são estimativas fornecidas pelas transportadoras. Atrasos decorrentes de fatores externos (greves, condições climáticas, fiscalizações) podem ocorrer.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">5. Garantia e Trocas</h2>
          <p>Produtos possuem garantia legal e de fabricante. Procedimentos detalhados estão disponíveis na seção de Garantia e Política de Troca.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">6. Propriedade Intelectual</h2>
          <p>Todo o conteúdo (marcas, layout, código, imagens) é protegido por direitos autorais e não pode ser reproduzido sem autorização.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">7. Privacidade e Dados</h2>
          <p>Tratamos dados pessoais conforme legislação (LGPD). Consulte a Política de Privacidade para detalhes sobre coleta, uso e retenção.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">8. Limitação de Responsabilidade</h2>
          <p>Não somos responsáveis por danos indiretos, lucros cessantes ou prejuízos decorrentes do uso indevido da plataforma.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">9. Alterações dos Termos</h2>
          <p>Podemos atualizar estes Termos a qualquer momento. A versão vigente estará sempre disponível nesta página.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">10. Contato</h2>
          <p>Dúvidas sobre os Termos: envie mensagem via página de Atendimento ou e-mail oficial informado no rodapé.</p>
        </section>
      </div>

      <footer className="mt-12 text-xs text-slate-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</footer>
    </main>
  )
}
