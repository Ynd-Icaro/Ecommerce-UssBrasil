export default function SimpleFooter() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              USS
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-cyan-400">Brasil</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Premium e-commerce com design system USS Brasil implementado
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 USS Brasil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
