'use client'

export default function PrivacidadePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent" style={{ background: 'var(--uss-gradient-premium)' }}>Política de Privacidade</h1>
        <p className="text-slate-600 mt-3 text-sm max-w-2xl mx-auto">Transparência sobre como coletamos, utilizamos e protegemos seus dados pessoais conforme a LGPD.</p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">1. Dados Coletados</h2>
          <p>Coletamos informações fornecidas diretamente pelo usuário (cadastro, pedidos, suporte) e dados técnicos de navegação (cookies, IP, device) para segurança e experiência.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">2. Finalidade</h2>
          <p>Usamos dados para: processamento de pedidos, prevenção a fraudes, personalização de ofertas, comunicação transacional e cumprimento de obrigações legais.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">3. Cookies</h2>
          <p>Empregamos cookies essenciais, analíticos e de marketing. Você pode gerenciar preferências no navegador, ciente de impactos funcionais.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">4. Compartilhamento</h2>
          <p>Compartilhamos dados apenas com provedores necessários (pagamentos, logística, antifraude, analytics) mediante contratos e cláusulas de proteção.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">5. Segurança</h2>
          <p>Adotamos criptografia, controle de acesso, monitoramento e segregação de ambientes para proteção contínua das informações.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">6. Direitos do Titular</h2>
          <p>Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão conforme procedimento em Central de Ajuda.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">7. Retenção</h2>
          <p>Dados são mantidos pelo período necessário às finalidades declaradas e requisitos legais (fiscais, garantia, auditoria).</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">8. Atualizações</h2>
          <p>Esta política pode ser revisada. A versão vigente estará sempre disponível nesta URL com data de revisão.</p>
        </section>
        <section>
          <h2 className="font-semibold text-slate-800 mb-2">9. Contato do Encarregado (DPO)</h2>
          <p>Envie solicitações relacionadas à privacidade através da página de Atendimento ou e-mail institucional.</p>
        </section>
      </div>

      <footer className="mt-12 text-xs text-slate-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</footer>
    </main>
  )
}
