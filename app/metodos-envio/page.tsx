export default function ShippingMethodsPage(){
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Métodos de Envio</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm">Opções de entrega disponíveis, prazos estimados e informações detalhadas sobre logística.</p>
        </header>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Opções</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">
              <h3 className="font-semibold mb-1">Padrão</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">Entrega em até 7 dias úteis para capitais e 10 para interior.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">
              <h3 className="font-semibold mb-1">Expresso</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">Entrega em 2-3 dias úteis em regiões cobertas.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">
              <h3 className="font-semibold mb-1">Retirada Parceiro</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">Retire em pontos credenciados após confirmação.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40">
              <h3 className="font-semibold mb-1">Same-Day (Beta)</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">Entrega no mesmo dia para pedidos até 11h em SP capital.</p>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Rastreamento e Processamento</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Assim que o pedido for enviado você receberá um código de rastreio. Atualizações de status ocorrerão automaticamente em sua área de pedidos.</p>
        </section>
      </div>
    </div>
  )
}
