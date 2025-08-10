import Link from 'next/link'

const demoPosts = [
  { slug:'bem-vindo', title:'Bem-vindo ao Blog USS Brasil', excerpt:'Insights sobre tecnologia, ecommerce e inovação.' , date:'2025-08-01'},
  { slug:'tendencias-ux', title:'Tendências UX 2025', excerpt:'Experiências personalizadas, micro-interações e acessibilidade avançada.' , date:'2025-08-05'}
]

export default function BlogPage(){
  return (
    <div className="pt-28 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Novidades, guias e tendências sobre produtos e tecnologia.</p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {demoPosts.map(p=> (
            <Link href={`/blog/${p.slug}`} key={p.slug} className="group border rounded-2xl bg-white dark:bg-gray-800 p-6 flex flex-col gap-3 hover:shadow-lg transition">
              <span className="text-[11px] uppercase tracking-wider text-uss-primary font-semibold">{new Date(p.date).toLocaleDateString('pt-BR')}</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-uss-primary transition">{p.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{p.excerpt}</p>
              <span className="text-xs text-uss-primary font-medium mt-auto">Ler mais →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
