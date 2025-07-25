'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Plus,
  Upload,
  X,
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Save,
  Eye,
  Palette,
  HardDrive
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProductForm {
  name: string
  description: string
  shortDescription: string
  category: string
  brand: string
  sku: string
  barcode: string
  price: string
  promotionalPrice: string
  promotionalStart: string
  promotionalEnd: string
  stock: string
  minStock: string
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  status: string
  visibility: string
  featured: boolean
  seo: {
    title: string
    description: string
    keywords: string
  }
  images: File[]
  variants: Array<{
    type: string
    name: string
    price: string
    stock: string
    sku: string
  }>
}

interface NewProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewProductModal({ open, onOpenChange }: NewProductModalProps) {
  const [activeTab, setActiveTab] = useState('basic')
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    brand: '',
    sku: '',
    barcode: '',
    price: '',
    promotionalPrice: '',
    promotionalStart: '',
    promotionalEnd: '',
    stock: '',
    minStock: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    status: 'active',
    visibility: 'published',
    featured: false,
    seo: {
      title: '',
      description: '',
      keywords: ''
    },
    images: [],
    variants: []
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ProductForm] as any),
          [child]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, {
        type: '',
        name: '',
        price: '',
        stock: '',
        sku: ''
      }]
    }))
  }

  const removeVariant = (index: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
  }

  const updateVariant = (index: number, field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }))
  }

  const handleSave = (isDraft = false) => {
    if (!form.name || !form.category || !form.price) {
      toast.error('Preencha os campos obrigatórios!')
      return
    }

    toast.success(`Produto ${isDraft ? 'salvo como rascunho' : 'cadastrado'} com sucesso!`)
    onOpenChange(false)
    // Reset form
    setForm({
      name: '',
      description: '',
      shortDescription: '',
      category: '',
      brand: '',
      sku: '',
      barcode: '',
      price: '',
      promotionalPrice: '',
      promotionalStart: '',
      promotionalEnd: '',
      stock: '',
      minStock: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      status: 'active',
      visibility: 'published',
      featured: false,
      seo: { title: '', description: '', keywords: '' },
      images: [],
      variants: []
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Cadastrar Novo Produto
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do produto. Campos com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="pricing">Preços</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="variants">Variações</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: iPhone 16 Pro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={form.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iphone">iPhone</SelectItem>
                      <SelectItem value="mac">Mac</SelectItem>
                      <SelectItem value="ipad">iPad</SelectItem>
                      <SelectItem value="watch">Watch</SelectItem>
                      <SelectItem value="airpods">AirPods</SelectItem>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={form.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    placeholder="Ex: Apple"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={form.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    placeholder="Ex: IP16PRO-128-NAT"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras</Label>
                  <Input
                    id="barcode"
                    value={form.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                    placeholder="Ex: 7891234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.001"
                    value={form.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Ex: 0.199"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Descrição Curta</Label>
                <Input
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Descrição breve para listagens"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Completa</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descrição detalhada do produto"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Comprimento (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={form.dimensions.length}
                    onChange={(e) => handleInputChange('dimensions.length', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Largura (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={form.dimensions.width}
                    onChange={(e) => handleInputChange('dimensions.width', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={form.dimensions.height}
                    onChange={(e) => handleInputChange('dimensions.height', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibilidade</Label>
                  <Select value={form.visibility} onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="hidden">Oculto</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-8">
                  <Switch
                    id="featured"
                    checked={form.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Produto em Destaque</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço Regular *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      className="pl-10"
                      value={form.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promotionalPrice">Preço Promocional</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="promotionalPrice"
                      type="number"
                      step="0.01"
                      className="pl-10"
                      value={form.promotionalPrice}
                      onChange={(e) => handleInputChange('promotionalPrice', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promotionalStart">Início da Promoção</Label>
                  <Input
                    id="promotionalStart"
                    type="datetime-local"
                    value={form.promotionalStart}
                    onChange={(e) => handleInputChange('promotionalStart', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promotionalEnd">Fim da Promoção</Label>
                  <Input
                    id="promotionalEnd"
                    type="datetime-local"
                    value={form.promotionalEnd}
                    onChange={(e) => handleInputChange('promotionalEnd', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque Atual</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={form.minStock}
                    onChange={(e) => handleInputChange('minStock', e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <div>
                <Label>Imagens do Produto</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="images" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Arraste imagens aqui ou clique para selecionar
                        </span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, WEBP até 10MB cada
                    </p>
                  </div>
                </div>
              </div>

              {form.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {form.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Variações do Produto</h3>
                  <p className="text-sm text-gray-500">Adicione cores, tamanhos ou outras variações</p>
                </div>
                <Button type="button" onClick={addVariant}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Variação
                </Button>
              </div>

              {form.variants.map((variant, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Variação {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                          value={variant.type}
                          onValueChange={(value) => updateVariant(index, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="color">Cor</SelectItem>
                            <SelectItem value="size">Tamanho</SelectItem>
                            <SelectItem value="storage">Armazenamento</SelectItem>
                            <SelectItem value="material">Material</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                          value={variant.name}
                          onChange={(e) => updateVariant(index, 'name', e.target.value)}
                          placeholder="Ex: 256GB, Azul, G"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Preço</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Estoque</Label>
                        <Input
                          type="number"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>SKU da Variação</Label>
                        <Input
                          value={variant.sku}
                          onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                          placeholder="Ex: IP16PRO-256-BLUE"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">Título SEO</Label>
                  <Input
                    id="seoTitle"
                    value={form.seo.title}
                    onChange={(e) => handleInputChange('seo.title', e.target.value)}
                    placeholder="Título otimizado para motores de busca"
                  />
                  <p className="text-xs text-gray-500">Máximo 60 caracteres recomendado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta Descrição</Label>
                  <Textarea
                    id="seoDescription"
                    value={form.seo.description}
                    onChange={(e) => handleInputChange('seo.description', e.target.value)}
                    placeholder="Descrição que aparecerá nos resultados de busca"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">Máximo 160 caracteres recomendado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoKeywords">Palavras-chave</Label>
                  <Input
                    id="seoKeywords"
                    value={form.seo.keywords}
                    onChange={(e) => handleInputChange('seo.keywords', e.target.value)}
                    placeholder="palavra1, palavra2, palavra3"
                  />
                  <p className="text-xs text-gray-500">Separe as palavras-chave por vírgula</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="outline" onClick={() => handleSave(true)}>
            <Save className="h-4 w-4 mr-2" />
            Salvar como Rascunho
          </Button>
          <Button type="button" onClick={() => handleSave(false)}>
            <Package className="h-4 w-4 mr-2" />
            Cadastrar Produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Componente para usar na página de produtos
export function NewProductButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Produto
      </Button>
      <NewProductModal open={open} onOpenChange={setOpen} />
    </>
  )
}
