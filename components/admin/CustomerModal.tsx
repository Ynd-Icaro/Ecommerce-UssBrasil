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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Star, Calendar } from 'lucide-react';
import { Customer } from '@/hooks/use-admin-crud';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer;
  onSave: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> | Partial<Customer>) => Promise<void>;
  mode: 'create' | 'edit' | 'view';
}

export function CustomerModal({ isOpen, onClose, customer, onSave, mode }: CustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Brasil'
    },
    totalOrders: 0,
    totalSpent: 0,
    isVip: false,
    lastOrderDate: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        avatar: customer.avatar || '',
        address: customer.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Brasil'
        },
        totalOrders: customer.totalOrders,
        totalSpent: customer.totalSpent,
        isVip: customer.isVip,
        lastOrderDate: customer.lastOrderDate || ''
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Brasil'
        },
        totalOrders: 0,
        totalSpent: 0,
        isVip: false,
        lastOrderDate: ''
      });
    }
  }, [customer, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
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

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {mode === 'create' && 'Criar Novo Cliente'}
            {mode === 'edit' && 'Editar Cliente'}
            {mode === 'view' && 'Detalhes do Cliente'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={mode === 'view'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={mode === 'view'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={mode === 'view'}
                        placeholder="+55 11 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">URL do Avatar</Label>
                      <Input
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                        disabled={mode === 'view'}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status VIP */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className={`h-5 w-5 ${formData.isVip ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-medium">Cliente VIP</p>
                    <p className="text-sm text-gray-500">
                      Acesso a benefícios exclusivos
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.isVip}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVip: checked }))}
                  disabled={mode === 'view'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold">Endereço</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Endereço</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    disabled={mode === 'view'}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, state: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                      placeholder="SP"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, zipCode: e.target.value }
                      }))}
                      disabled={mode === 'view'}
                      placeholder="01234-567"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas (apenas visualização) */}
          {mode === 'view' && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Estatísticas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formData.totalOrders}
                    </div>
                    <p className="text-sm text-gray-500">Total de Pedidos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(formData.totalSpent)}
                    </div>
                    <p className="text-sm text-gray-500">Total Gasto</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatDate(formData.lastOrderDate)}
                    </div>
                    <p className="text-sm text-gray-500">Último Pedido</p>
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
                {loading ? 'Salvando...' : mode === 'create' ? 'Criar Cliente' : 'Salvar Alterações'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
