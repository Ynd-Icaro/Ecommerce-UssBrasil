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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Package, User, MapPin, Truck } from 'lucide-react';
import { Order } from '@/hooks/use-admin-crud';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order;
  onSave: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> | Partial<Order>) => Promise<void>;
  mode: 'create' | 'edit' | 'view';
}

const statusOptions = [
  { value: 'pending', label: 'Pendente', color: 'bg-yellow-500' },
  { value: 'processing', label: 'Processando', color: 'bg-blue-500' },
  { value: 'shipped', label: 'Enviado', color: 'bg-purple-500' },
  { value: 'delivered', label: 'Entregue', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-red-500' },
];

export function OrderModal({ isOpen, onClose, order, onSave, mode }: OrderModalProps) {
  const [formData, setFormData] = useState({
    number: '',
    customer: {
      id: '',
      name: '',
      email: '',
      avatar: ''
    },
    status: 'pending' as Order['status'],
    items: [] as Order['items'],
    total: 0,
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order && (mode === 'edit' || mode === 'view')) {
      setFormData({
        number: order.number,
        customer: {
          ...order.customer,
          avatar: order.customer.avatar || ''
        },
        status: order.status,
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress
      });
    } else if (mode === 'create') {
      setFormData({
        number: `ORD-${Date.now()}`,
        customer: {
          id: '',
          name: '',
          email: '',
          avatar: ''
        },
        status: 'pending',
        items: [],
        total: 0,
        shippingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      });
    }
  }, [order, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    return (
      <Badge className={`${statusConfig?.color} text-white`}>
        {statusConfig?.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {mode === 'create' && 'Criar Novo Pedido'}
            {mode === 'edit' && 'Editar Pedido'}
            {mode === 'view' && 'Detalhes do Pedido'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Número do Pedido</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                disabled={mode === 'view'}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Order['status'] }))}
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

          {/* Informações do cliente */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5" />
                <h3 className="font-semibold">Informações do Cliente</h3>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={formData.customer.avatar} />
                  <AvatarFallback>
                    {formData.customer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nome</Label>
                    <Input
                      id="customerName"
                      value={formData.customer.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, name: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customer.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, email: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço de entrega */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">Endereço de Entrega</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Endereço</Label>
                  <Input
                    id="street"
                    value={formData.shippingAddress.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shippingAddress: { ...prev.shippingAddress, street: e.target.value }
                    }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.shippingAddress.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shippingAddress: { ...prev.shippingAddress, city: e.target.value }
                    }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.shippingAddress.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shippingAddress: { ...prev.shippingAddress, state: e.target.value }
                    }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.shippingAddress.zipCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      shippingAddress: { ...prev.shippingAddress, zipCode: e.target.value }
                    }))}
                    disabled={mode === 'view'}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itens do pedido */}
          {formData.items.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-5 w-5" />
                  <h3 className="font-semibold">Itens do Pedido</h3>
                </div>
                
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qtd: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Total:</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(formData.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {mode !== 'view' && (
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : mode === 'create' ? 'Criar Pedido' : 'Salvar Alterações'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
