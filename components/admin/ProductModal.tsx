'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Package, Image as ImageIcon, Tag, Palette, HardDrive } from 'lucide-react';
import { Product } from '@/hooks/use-admin-crud';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> | Partial<Product>) => Promise<void>;
  mode: 'create' | 'edit' | 'view';
}

const categories = [
  'Smartphones',
  'Tablets',
  'Laptops',
  'Desktops',
  'Watches',
  'Audio',
  'Acessórios'
];

const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'LG',
  'Dell',
  'HP',
  'Asus'
];

const statusOptions = [
  { value: 'active', label: 'Ativo', color: 'bg-green-500' },
  { value: 'inactive', label: 'Inativo', color: 'bg-gray-500' },
  { value: 'out_of_stock', label: 'Sem Estoque', color: 'bg-red-500' },
];

export function ProductModal({ isOpen, onClose, product, onSave, mode }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    subcategory: '',
    brand: '',
    sku: '',
    stock: 0,
    images: {
      main: '',
      gallery: ['']
    },
    status: 'active' as Product['status'],
    isNew: false,
    isFeatured: false,
    colors: [{ name: '', code: '' }],
    storage: [''],
    specifications: {} as Record<string, string>
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
        category: product.category,
        subcategory: product.subcategory || '',
        brand: product.brand,
        sku: product.sku,
        stock: product.stock,
        images: product.images,
        status: product.status,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        colors: product.colors || [{ name: '', code: '' }],
        storage: product.storage || [''],
        specifications: product.specifications
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: '',
        subcategory: '',
        brand: '',
        sku: '',
        stock: 0,
        images: {
          main: '',
          gallery: ['']
        },
        status: 'active',
        isNew: false,
        isFeatured: false,
        colors: [{ name: '', code: '' }],
        storage: [''],
        specifications: {}
      });
    }
  }, [product, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Limpar arrays vazios
      const cleanedData = {
        ...formData,
        colors: formData.colors.filter(color => color.name && color.code),
        storage: formData.storage.filter(storage => storage.trim()),
        images: {
          ...formData.images,
          gallery: formData.images.gallery.filter(img => img.trim())
        }
      };
      
      await onSave(cleanedData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', code: '' }]
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

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {mode === 'create' && 'Criar Novo Produto'}
            {mode === 'edit' && 'Editar Produto'}
            {mode === 'view' && 'Detalhes do Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="variants">Variações</TabsTrigger>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              {/* Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    disabled={mode === 'view'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Select
                    value={formData.brand}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
                    disabled={mode === 'view'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Product['status'] }))}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Preço Original (opcional)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
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
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Galeria de Imagens</Label>
                  {mode !== 'view' && (
                    <Button type="button" variant="outline" size="sm" onClick={addGalleryImage}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Adicionar Imagem
                    </Button>
                  )}
                </div>
                
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
                      placeholder={`URL da imagem ${index + 1}`}
                    />
                    {mode !== 'view' && formData.images.gallery.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              {/* Cores */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Cores Disponíveis</Label>
                  {mode !== 'view' && (
                    <Button type="button" variant="outline" size="sm" onClick={addColor}>
                      <Palette className="h-4 w-4 mr-2" />
                      Adicionar Cor
                    </Button>
                  )}
                </div>
                
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={color.name}
                      onChange={(e) => {
                        const newColors = [...formData.colors];
                        newColors[index] = { ...newColors[index], name: e.target.value };
                        setFormData(prev => ({ ...prev, colors: newColors }));
                      }}
                      disabled={mode === 'view'}
                      placeholder="Nome da cor"
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={color.code}
                      onChange={(e) => {
                        const newColors = [...formData.colors];
                        newColors[index] = { ...newColors[index], code: e.target.value };
                        setFormData(prev => ({ ...prev, colors: newColors }));
                      }}
                      disabled={mode === 'view'}
                      className="w-20"
                    />
                    {mode !== 'view' && formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeColor(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Armazenamento */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Opções de Armazenamento</Label>
                  {mode !== 'view' && (
                    <Button type="button" variant="outline" size="sm" onClick={addStorage}>
                      <HardDrive className="h-4 w-4 mr-2" />
                      Adicionar Opção
                    </Button>
                  )}
                </div>
                
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
                      placeholder="Ex: 256GB, 512GB, 1TB"
                    />
                    {mode !== 'view' && formData.storage.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeStorage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              {mode !== 'view' && (
                <div className="flex gap-2">
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
                  <Button type="button" onClick={addSpecification}>
                    Adicionar
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex gap-2 items-center p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                    {mode !== 'view' && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpecification(key)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
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
  );
}
