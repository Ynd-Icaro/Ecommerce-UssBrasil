'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Package, Star } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Product { id: string; name: string; image: string; price: number; discountPrice?: number; category: string; rating?: number; reviewCount?: number; isNew?: boolean; isBestSeller?: boolean; stock?: number; brand?: string }
interface Brand { id: string; name: string; slug: string; image: string; logo: string; description: string; categories: string[]; featured_products: Product[]; isNew?: boolean; isTrending?: boolean; bgColor?: string; textColor?: string }

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const slideIn = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }

export const ProductsMegaMenu = ({ brands }: { brands: Brand[] }) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => { setShow(false); setHovered(null) }, [])

  return (
    <div className="relative" ref={ref} onMouseLeave={close} onMouseEnter={() => setShow(true)}>
      <motion.button
        className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
        whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
      >
        <span>Produtos</span>
        <motion.div animate={{ rotate: show ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-screen max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            style={{ transformOrigin: 'top center' }}
          >
            <div className="p-8">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <motion.h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <motion.span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3" animate={{ height: [32, 36, 32] }} transition={{ duration: 2, repeat: Infinity }} />
                    Marcas
                  </motion.h3>
                  <div className="space-y-2">
                    {brands.map((b, i) => (
                      <motion.button key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }} onClick={() => router.push(`/produtos?brand=${b.slug}`)} onMouseEnter={() => setHovered(b.id)} className={cn('w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3', hovered === b.id ? `bg-gradient-to-r ${b.bgColor || 'from-blue-500 to-purple-600'} text-white shadow-lg transform scale-105` : 'text-slate-700 hover:bg-slate-100')} whileHover={{ x: 8, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <motion.div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          {b.logo ? <Image src={b.logo} alt={`${b.name} logo`} width={20} height={20} className="object-contain" /> : <span className="text-sm font-bold">{b.name.charAt(0)}</span>}
                        </motion.div>
                        <div>
                          <div className="font-medium flex items-center space-x-2">
                            <span>{b.name}</span>
                            {b.isNew && <Badge className="text-xs bg-green-500 text-white">Novo</Badge>}
                            {b.isTrending && <Badge className="text-xs bg-orange-500 text-white">🔥</Badge>}
                          </div>
                          <p className="text-xs opacity-80">{b.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="col-span-9">
                  <AnimatePresence mode="wait">
                    {hovered && (
                      <motion.div key={hovered} variants={fadeIn} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.3 }} className="h-full">
                        {(() => { const brand = brands.find(x => x.id === hovered); if (!brand) return null; return (
                          <div className="grid grid-cols-2 gap-8 h-full">
                            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                              <div className="flex items-center space-x-4">
                                <motion.div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden" whileHover={{ scale: 1.1, rotate: 5 }}>
                                  <Image src={brand.image} alt={brand.name} width={48} height={48} className="object-contain" loading="lazy" />
                                </motion.div>
                                <div>
                                  <motion.h4 className="text-2xl font-bold text-slate-900" animate={{ color: ['#1e293b', '#3b82f6', '#1e293b'] }} transition={{ duration: 3, repeat: Infinity }}>{brand.name}</motion.h4>
                                  <p className="text-slate-600">{brand.description}</p>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900 mb-4">Categorias</h5>
                                <div className="grid grid-cols-2 gap-3">
                                  {brand.categories.map((c, i) => (
                                    <motion.button key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} onClick={() => router.push(`/produtos?category=${c.toLowerCase()}`)} className="text-sm text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300" whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>{c}</motion.button>
                                  ))}
                                </div>
                              </div>
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button onClick={() => router.push(`/produtos?brand=${brand.slug}`)} className="w-full text-white rounded-xl py-3" style={{ background: 'var(--uss-gradient-premium)', boxShadow: 'var(--uss-shadow-md)' }}>Ver Todos os Produtos</Button>
                              </motion.div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                              <h5 className="font-bold text-slate-900 mb-4">Produtos em Destaque</h5>
                              <div className="space-y-4">
                                {brand.featured_products.slice(0,3).map((p,i)=>(
                                  <motion.button key={p.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.3 }} onClick={() => router.push(`/produtos/${p.id}`)} className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 group" whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}>
                                    <motion.div className="relative" whileHover={{ scale: 1.1 }}>
                                      <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden">
                                        <Image src={p.image} alt={p.name} width={64} height={64} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                                      </div>
                                      {p.isNew && <Badge className="absolute -top-1 -right-1 text-xs bg-green-500">Novo</Badge>}
                                      {p.isBestSeller && <Badge className="absolute -bottom-1 -right-1 text-xs bg-orange-500">🏆</Badge>}
                                    </motion.div>
                                    <div className="flex-1 text-left">
                                      <h6 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h6>
                                      <div className="flex items-center space-x-2 mt-1">
                                        {p.rating && <div className="flex items-center"><Star className="h-3 w-3 text-yellow-400 fill-current" /><span className="text-xs text-slate-500 ml-1">{p.rating} ({p.reviewCount})</span></div>}
                                        {p.stock && p.stock < 20 && <Badge variant="outline" className="text-xs text-orange-600">Últimas {p.stock} unidades</Badge>}
                                      </div>
                                      <div className="flex items-center space-x-2 mt-2">
                                        {p.discountPrice && <span className="text-sm text-slate-400 line-through">R$ {p.price.toLocaleString('pt-BR')}</span>}
                                        <motion.span className="font-bold text-blue-600" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>R$ {(p.discountPrice || p.price).toLocaleString('pt-BR')}</motion.span>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          </div>) })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!hovered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-slate-400">
                      <motion.div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4" animate={{ scale: [1,1.1,1], rotate: [0,180,360] }} transition={{ duration: 3, repeat: Infinity }}>
                        <Package className="h-8 w-8" />
                      </motion.div>
                      <motion.p animate={{ opacity: [0.5,1,0.5] }} transition={{ duration: 2, repeat: Infinity }}>Passe o mouse sobre uma marca para ver detalhes</motion.p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
