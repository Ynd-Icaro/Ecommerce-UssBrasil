'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'

import { 
  FileText,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Tag,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  X,
  UploadCloud,
  Video,
  Type,
  Palette,
  Save,
  GripVertical
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin-layout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useAPI } from '@/hooks/use-api'

interface CategoryPage {
  id: string
  name: string
  slug: string
  products: number
  visible: boolean
  bannerType: string
  bannerValue: string
}

const mockCategories = [
  { id: 'cat-1', name: 'iPhones', slug: 'iphones', products: 15, visible: true, bannerType: 'image', bannerValue: '/public/Produtos/Iphone 16 Pro.png' },
  { id: 'cat-2', name: 'MacBooks', slug: 'macbooks', products: 10, visible: true, bannerType: 'video', bannerValue: '/public/Videos/Macs Video.mp4' },
  { id: 'cat-3', name: 'iPads', slug: 'ipads', products: 8, visible: false, bannerType: 'color', bannerValue: '#f0f0f0' },
  { id: 'cat-4', name: 'Apple Watches', slug: 'watches', products: 12, visible: true, bannerType: 'image', bannerValue: '/public/Produtos/Watch Ultra 2.png' },
  { id: 'cat-5', name: 'Acessórios', slug: 'acessorios', products: 35, visible: true, bannerType: 'none', bannerValue: '' },
]

const availableFilters = [
  { id: 'visible', label: 'Visibilidade' },
  { id: 'bannerType', label: 'Tipo de Banner' },
  { id: 'hasProducts', label: 'Com Produtos' },
]

export default function AdminPagesPage() {
  const { data: categories, loading, update } = useAPI<CategoryPage>('pages')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryPage | null>(null)
  const [activeFilters, setActiveFilters] = useState(['visible', 'bannerType'])

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [categories, searchTerm])

  const handleSelectCategory = (category: typeof mockCategories[0]) => {
    setSelectedCategory(JSON.parse(JSON.stringify(category))) // Deep copy to avoid direct mutation
  }

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return
    await update(selectedCategory.id, selectedCategory)
  }
  
  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
  }

  const renderFilterPill = (filterId: string) => {
    const filter = availableFilters.find(f => f.id === filterId)
    if (!filter) return null
    return (
      <motion.div layout key={filter.id} className="flex items-center bg-white/80 border border-gray-300/50 rounded-full px-3 py-1 text-sm text-slate-700 shadow-sm">
        <span>{filter.label}</span>
        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 rounded-full" onClick={() => setActiveFilters(prev => prev.filter(f => f !== filterId))}>
          <X className="h-3 w-3" />
        </Button>
      </motion.div>
    )
  }

  return (
    <AdminLayout>
      <div className="flex h-full">
        <motion.div 
          className="flex-1 p-4 sm:p-6 lg:p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-8xl mx-auto">
            {/* Header */}
            <motion.header variants={itemVariants} className="mb-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                    Gerenciar Páginas
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Crie e edite as páginas de categoria da sua loja.
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                  onClick={() => toast.info('Funcionalidade de criar nova página em breve!')}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Nova Página
                </Button>
              </div>
            </motion.header>

            {/* Filters and Search */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/20 flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    placeholder="Buscar por nome da página..."
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border-gray-300/50 rounded-xl focus:ring-2 focus:ring-[#00CED1]/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <AnimatePresence>
                    {activeFilters.map(renderFilterPill)}
                  </AnimatePresence>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center space-x-2 rounded-xl border-gray-300/80 hover:bg-white/80">
                        <Filter className="h-4 w-4" />
                        <span>Filtros</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg">
                      {availableFilters.map(filter => (
                        <DropdownMenuCheckboxItem
                          key={filter.id}
                          checked={activeFilters.includes(filter.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setActiveFilters(prev => [...prev, filter.id])
                            } else {
                              setActiveFilters(prev => prev.filter(f => f !== filter.id))
                            }
                          }}
                        >
                          {filter.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>

            {/* Categories Table */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-200/50">
                        <tr>
                          <th className="p-6 font-semibold text-gray-600 w-10"></th>
                          <th className="p-6 font-semibold text-gray-600">Nome da Página</th>
                          <th className="p-6 font-semibold text-gray-600">Slug</th>
                          <th className="p-6 font-semibold text-gray-600 text-center">Produtos</th>
                          <th className="p-6 font-semibold text-gray-600">Visibilidade</th>
                          <th className="p-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategories.map(cat => (
                          <motion.tr 
                            key={cat.id} 
                            className="border-b border-gray-200/50 hover:bg-white/50 transition-colors cursor-pointer"
                            onClick={() => handleSelectCategory(cat)}
                            variants={itemVariants}
                            layout
                          >
                            <td className="p-6 text-center text-gray-400 cursor-grab"><GripVertical /></td>
                            <td className="p-6 font-semibold text-gray-800">{cat.name}</td>
                            <td className="p-6 text-gray-500 font-mono text-sm">/{cat.slug}</td>
                            <td className="p-6 text-center text-gray-600">{cat.products}</td>
                            <td className="p-6">
                              <Badge variant={cat.visible ? 'default' : 'outline'} className={cat.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {cat.visible ? 'Visível' : 'Oculta'}
                              </Badge>
                            </td>
                            <td className="p-6">
                              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200/50" onClick={(e) => {e.stopPropagation(); handleSelectCategory(cat)}}>
                                <Edit className="h-5 w-5" />
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Editor Panel */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 500, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="h-full bg-white/80 backdrop-blur-2xl border-l border-white/20 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between h-[88px]">
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                  Editar Página
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)} className="rounded-full">
                  <X />
                </Button>
              </div>
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="pageName">Nome da Página</Label>
                  <Input id="pageName" value={selectedCategory.name} onChange={e => setSelectedCategory(p => p && {...p, name: e.target.value})} className="bg-white/80"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pageSlug">Slug</Label>
                  <Input id="pageSlug" value={selectedCategory.slug} onChange={e => setSelectedCategory(p => p && {...p, slug: e.target.value})} className="bg-white/80"/>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Visível no site</Label>
                  <Switch checked={selectedCategory.visible} onCheckedChange={c => setSelectedCategory(p => p && {...p, visible: c})} />
                </div>
                
                <Card className="bg-white/60">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center"><Eye className="mr-2"/> Banner da Página</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Label>Tipo de Banner</Label>
                      <Select value={selectedCategory.bannerType} onValueChange={v => setSelectedCategory(p => p && {...p, bannerType: v})}>
                        <SelectTrigger className="bg-white/80"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          <SelectItem value="image">Imagem</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                          <SelectItem value="color">Cor Sólida</SelectItem>
                        </SelectContent>
                      </Select>

                      {selectedCategory.bannerType === 'image' && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
                          <UploadCloud className="h-8 w-8 mb-2" />
                          <span>Arraste uma imagem ou clique</span>
                          {selectedCategory.bannerValue && <p className="text-xs mt-1">Atual: {selectedCategory.bannerValue.split('/').pop()}</p>}
                        </div>
                      )}
                      {selectedCategory.bannerType === 'video' && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
                          <Video className="h-8 w-8 mb-2" />
                          <span>Arraste um vídeo ou clique</span>
                          {selectedCategory.bannerValue && <p className="text-xs mt-1">Atual: {selectedCategory.bannerValue.split('/').pop()}</p>}
                        </div>
                      )}
                      {selectedCategory.bannerType === 'color' && (
                        <div className="flex items-center space-x-2">
                          <Label>Cor</Label>
                          <Input type="color" value={selectedCategory.bannerValue} onChange={e => setSelectedCategory(p => p && {...p, bannerValue: e.target.value})} className="w-24 h-10 p-1 bg-white/80"/>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="p-6 border-t border-black/5">
                <Button className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 rounded-xl shadow-lg hover:scale-102 transition-transform" onClick={handleUpdateCategory}>
                  <Save className="mr-2 h-5 w-5" />
                  Salvar Alterações
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}
