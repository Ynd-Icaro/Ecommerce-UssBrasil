// ...existing code...
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'

const marcas = [
  {
    nome: 'Apple',
    pasta: 'Apple',
    categorias: [
      { nome: 'iPhones', imagem: '/products/Apple/Iphone 16 Pro.png', categoria: 'iphone' },
      { nome: 'iPads', imagem: '/products/Apple/Ipad Pro.png', categoria: 'ipad' },
      { nome: 'Mac', imagem: '/products/Apple/Macbook Pro.png', categoria: 'mac' },
      { nome: 'Watch', imagem: '/products/Apple/Watch Ultra 2.png', categoria: 'watch' },
      { nome: 'Acessórios', imagem: '/products/Apple/Magic-Mouse.png', categoria: 'acessorios' }
    ]
  },
  { nome: 'JBL', pasta: 'JBL', categorias: [] },
  { nome: 'Geonav', pasta: 'Geonav', categorias: [] },
  { nome: 'Dji', pasta: 'Dji', categorias: [] },
  { nome: 'Xiomi', pasta: 'Xiomi', categorias: [] }
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/90 backdrop-blur border-b border-gray-900 shadow-lg text-white">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight text-white">USS Brasil</span>
          </Link>
          <Link href="/categories" className="hidden md:inline-block font-medium px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">Categorias</Link>
          <Link href="/lancamentos" className="hidden md:inline-block font-medium px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">Lançamentos</Link>
          <Link href="/" className="hidden md:inline-block font-medium px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">Sobre</Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 font-medium px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 shadow-sm"
            onMouseEnter={() => setSidebarOpen(true)}
            onClick={() => setSidebarOpen(true)}
          >
            Produtos
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Sidebar lateral direita */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-gray-950 shadow-2xl z-50 flex flex-col border-l border-gray-800 animate-slidein">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
            <span className="text-lg font-bold">Marcas</span>
            <button className="text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 py-4 overflow-y-auto">
            {marcas.map((marca) => (
              <div key={marca.nome} className="group relative">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-left text-white font-semibold transition-all"
                  onMouseEnter={() => setHoveredBrand(marca.nome)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  onClick={() => setHoveredBrand(marca.nome)}
                >
                  <Image src={`/Logo/${marca.pasta}.png`} alt={marca.nome} width={32} height={32} className="rounded" />
                  {marca.nome}
                </button>
                {/* Subpainel lateral de categorias */}
                {hoveredBrand === marca.nome && marca.categorias.length > 0 && (
                  <div className="absolute right-full md:right-96 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-xl z-50 flex flex-col animate-slidein">
                    <div className="px-4 py-4 border-b border-gray-800 text-lg font-bold">Categorias</div>
                    <div className="flex flex-col gap-2 px-4 py-4">
                      {marca.categorias.map((cat) => (
                        <Link
                          key={cat.nome}
                          href={`/produtos?categoria=${cat.categoria}&marca=${marca.nome.toLowerCase()}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all"
                        >
                          <Image src={cat.imagem.startsWith('/Logo/') ? cat.imagem : `/Logo/${cat.imagem.replace(/^\/+/, '')}`} alt={cat.nome} width={28} height={28} className="rounded" />
                          <span>{cat.nome}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Mobile nav */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-950/95 border-t border-gray-900">
        <Link href="/categories" className="font-medium px-2 py-1 rounded hover:bg-gray-900 transition-colors">Categorias</Link>
        <Link href="/lancamentos" className="font-medium px-2 py-1 rounded hover:bg-gray-900 transition-colors">Lançamentos</Link>
        <Link href="/" className="font-medium px-2 py-1 rounded hover:bg-gray-900 transition-colors">Sobre</Link>
        <button
          className="font-medium px-2 py-1 rounded hover:bg-gray-900 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >Produtos</button>
      </div>
    </nav>
  );
}
