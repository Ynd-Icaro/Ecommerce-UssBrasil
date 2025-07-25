'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, Package, Image as ImageIcon, Tag, Palette, HardDrive, Plus, Trash2 } from 'lucide-react'
import { Product, ProductClass, ProductCategory, ProductStatus, ProductSpecifications } from '@/types'
import { productService } from '@/lib/services/api'
import { toast } from 'sonner'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
  onSave: () => void
  mode: 'create' | 'edit' | 'view'
}

const productClasses: ProductClass[] = ['Smartphones', 'Smartwatchs', 'Fones', 'Acessórios', 'Outros']
const productCategories: ProductCategory[] = ['Apple', 'Geonav', 'JBL', 'AIWA', 'DJI', 'Playstation', 'Redmi']

const statusOptions = [
  { value: 'active', label: 'Ativo', color: 'bg-green-500' },
  { value: 'inactive', label: 'Inativo', color: 'bg-gray-500' },
  { value: 'out_of_stock', label: 'Sem Estoque', color: 'bg-red-500' },
  { value: 'draft', label: 'Rascunho', color: 'bg-yellow-500' },
];

export function ProductModal({ isOpen, onClose, product, onSave, mode }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    classe: '' as ProductClass,
    categoria: '' as ProductCategory,
    sku: '',
    stock: 0,
    images: {
      main: '',
      gallery: ['']
    },
    status: 'active' as ProductStatus,
    isNew: false,
    isFeatured: false,
    colors: [{ name: '', code: '', image: '' }],
    storage: [''],
    specifications: {} as ProductSpecifications,
    features: ['']
  });

  const [loading, setLoading] = useState(false);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  useEffect(() => {
    if (product && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        classe: product.classe,
        categoria: product.categoria,
        sku: product.sku || '',
        stock: product.stock,
        images: product.images,
        status: product.status,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        colors: product.colors || [{ name: '', code: '', image: '' }],
        storage: product.storage || [''],
        specifications: product.specifications || {} as ProductSpecifications,
        features: product.features || ['']
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        classe: '' as ProductClass,
        categoria: '' as ProductCategory,
        sku: '',
        stock: 0,
        images: {
          main: '',
          gallery: ['']
        },
        status: 'active' as ProductStatus,
        isNew: false,
        isFeatured: false,
        colors: [{ name: '', code: '', image: '' }],
        storage: [''],
        specifications: {} as ProductSpecifications,
        features: ['']
      });
    }
  }, [product, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;

    setLoading(true);
    try {
      // Gerar slug baseado no nome
      const slug = formData.name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const productData = {
        ...formData,
        slug,
        rating: product?.rating || 0,
        reviews: product?.reviews || 0,
        totalReviews: product?.totalReviews || 0,
        discount: formData.originalPrice > formData.price ? 
          Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0,
        tags: [formData.classe, formData.categoria],
        createdAt: product?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (mode === 'create') {
        await productService.create(productData);
        toast.success('Produto criado com sucesso!');
      } else if (mode === 'edit' && product) {
        await productService.update(product.id, productData);
        toast.success('Produto atualizado com sucesso!');
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast.error('Erro ao salvar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        } as ProductSpecifications
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs as ProductSpecifications };
    });
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', code: '', image: '' }]
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addStorage = () => {
    setFormData(prev => ({
      ...prev,
      storage: [...prev.storage, '']
    }));
  };

  const removeStorage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      storage: prev.storage.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: [...prev.images.gallery, '']
      }
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: prev.images.gallery.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {mode === 'create' && 'Criar Novo Produto'}
                {mode === 'edit' && 'Editar Produto'}
                {mode === 'view' && 'Visualizar Produto'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="images">Imagens</TabsTrigger>
                  <TabsTrigger value="variants">Variações</TabsTrigger>
                  <TabsTrigger value="specs">Especificações</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={mode === 'view'}
                      required
                      placeholder="Ex: iPhone 15 Pro Max"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={mode === 'view'}
                      rows={3}
                      required
                      placeholder="Descreva o produto..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="classe">Classe do Produto</Label>
                      <Select
                        value={formData.classe}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, classe: value as ProductClass }))}
                        disabled={mode === 'view'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {productClasses.map(classe => (
                            <SelectItem key={classe} value={classe}>
                              {classe}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria (Marca)</Label>
                      <Select
                        value={formData.categoria}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value as ProductCategory }))}
                        disabled={mode === 'view'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map(categoria => (
                            <SelectItem key={categoria} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        disabled={mode === 'view'}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                        disabled={mode === 'view'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">Estoque</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                        disabled={mode === 'view'}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        disabled={mode === 'view'}
                        placeholder="Ex: SKU001"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as ProductStatus }))}
                        disabled={mode === 'view'}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isNew"
                        checked={formData.isNew}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked }))}
                        disabled={mode === 'view'}
                      />
                      <Label htmlFor="isNew">Produto Novo</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                        disabled={mode === 'view'}
                      />
                      <Label htmlFor="isFeatured">Produto em Destaque</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Características Principais</Label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...formData.features];
                            newFeatures[index] = e.target.value;
                            setFormData(prev => ({ ...prev, features: newFeatures }));
                          }}
                          disabled={mode === 'view'}
                          placeholder="Ex: Tela de 6.7 polegadas"
                        />
                        {mode !== 'view' && formData.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {mode !== 'view' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFeature}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Característica
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mainImage">Imagem Principal</Label>
                    <Input
                      id="mainImage"
                      value={formData.images.main}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        images: { ...prev.images, main: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                      placeholder="URL da imagem principal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Galeria de Imagens</Label>
                    {formData.images.gallery.map((image, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={image}
                          onChange={(e) => {
                            const newGallery = [...formData.images.gallery];
                            newGallery[index] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              images: { ...prev.images, gallery: newGallery }
                            }));
                          }}
                          disabled={mode === 'view'}
                          placeholder="URL da imagem"
                        />
                        {mode !== 'view' && formData.images.gallery.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {mode !== 'view' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addGalleryImage}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Imagem
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="variants" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Cores Disponíveis</Label>
                    {formData.colors.map((color, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Nome da Cor</Label>
                              <Input
                                value={color.name}
                                onChange={(e) => {
                                  const newColors = [...formData.colors];
                                  newColors[index] = { ...newColors[index], name: e.target.value };
                                  setFormData(prev => ({ ...prev, colors: newColors }));
                                }}
                                disabled={mode === 'view'}
                                placeholder="Ex: Azul"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Código da Cor</Label>
                              <Input
                                type="color"
                                value={color.code}
                                onChange={(e) => {
                                  const newColors = [...formData.colors];
                                  newColors[index] = { ...newColors[index], code: e.target.value };
                                  setFormData(prev => ({ ...prev, colors: newColors }));
                                }}
                                disabled={mode === 'view'}
                              />
                            </div>
                            <div className="flex items-end gap-2">
                              <div className="flex-1 space-y-2">
                                <Label>Imagem da Cor</Label>
                                <Input
                                  value={color.image}
                                  onChange={(e) => {
                                    const newColors = [...formData.colors];
                                    newColors[index] = { ...newColors[index], image: e.target.value };
                                    setFormData(prev => ({ ...prev, colors: newColors }));
                                  }}
                                  disabled={mode === 'view'}
                                  placeholder="URL da imagem"
                                />
                              </div>
                              {mode !== 'view' && formData.colors.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeColor(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {mode !== 'view' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addColor}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Cor
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Opções de Armazenamento</Label>
                    {formData.storage.map((storage, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={storage}
                          onChange={(e) => {
                            const newStorage = [...formData.storage];
                            newStorage[index] = e.target.value;
                            setFormData(prev => ({ ...prev, storage: newStorage }));
                          }}
                          disabled={mode === 'view'}
                          placeholder="Ex: 128GB"
                        />
                        {mode !== 'view' && formData.storage.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeStorage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {mode !== 'view' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addStorage}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Opção de Armazenamento
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="space-y-4">
                  <div className="space-y-4">
                    <Label>Especificações Técnicas</Label>
                    
                    {mode !== 'view' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          placeholder="Nome da especificação"
                        />
                        <Input
                          value={newSpecValue}
                          onChange={(e) => setNewSpecValue(e.target.value)}
                          placeholder="Valor"
                        />
                        <Button
                          type="button"
                          onClick={addSpecification}
                          disabled={!newSpecKey || !newSpecValue}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      {Object.entries(formData.specifications).map(([key, value]) => (
                        <Card key={key}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">{key}</Label>
                                </div>
                                <div>
                                  <span className="text-sm">{value}</span>
                                </div>
                              </div>
                              {mode !== 'view' && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeSpecification(key)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {Object.keys(formData.specifications).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Nenhuma especificação adicionada
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                {mode !== 'view' && (
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : mode === 'create' ? 'Criar Produto' : 'Salvar Alterações'}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
