export default function PaymentSecurityPage(){
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Segurança de Pagamentos</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm">Entenda como protegemos suas transações e mantemos seus dados seguros em nossa plataforma.</p>
        </header>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Proteção e Criptografia</h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">Todas as transações são processadas em ambiente seguro com criptografia TLS 1.3 e conformidade PCI-DSS. Não armazenamos dados sensíveis completos do cartão, somente identificadores mascarados.</p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm">
            <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">Tokenização de cartões</li>
            <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">Monitoramento antifraude</li>
            <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">3D Secure quando aplicável</li>
            <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">Conformidade LGPD</li>
          </ul>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Boas Práticas</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Recomendamos nunca compartilhar senhas ou códigos de verificação. Sempre confira o cadeado de segurança do navegador e evite redes Wi-Fi públicas para pagamentos.</p>
        </section>
      </div>
    </div>
  )
}
