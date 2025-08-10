export default function ReturnsPage(){
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Trocas & Devoluções</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm">Políticas, prazos e como iniciar um processo de devolução ou troca.</p>
        </header>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Política</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Aceitamos devoluções em até 7 dias corridos após o recebimento conforme CDC, e trocas em até 30 dias para produtos elegíveis sem sinais de uso indevido.</p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>Produto deve estar em perfeitas condições</li>
            <li>Enviar nota ou comprovante de compra</li>
            <li>Itens personalizados não possuem troca</li>
          </ul>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Iniciar Solicitação</h2>
          <form className="space-y-4 max-w-md">
            <input className="input" placeholder="ID do Pedido" />
            <select className="input text-sm">
              <option>Motivo</option>
              <option>Defeito</option>
              <option>Tamanho incorreto</option>
              <option>Arrependimento</option>
            </select>
            <textarea className="input h-32 resize-none" placeholder="Detalhes"></textarea>
            <button type="button" className="w-full py-3 rounded-lg bg-uss-primary text-white text-sm font-medium hover:bg-uss-secondary transition">Enviar Solicitação</button>
            <p className="text-[11px] text-gray-500">Ainda não envia. Endpoint /api/returns (TODO).</p>
          </form>
        </section>
      </div>
    </div>
  )
}
