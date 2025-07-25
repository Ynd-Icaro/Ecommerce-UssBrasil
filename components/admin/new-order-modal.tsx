'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
} from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Plus,
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Search,
  Check,
  Minus,
  Calculator,
  Send,
  FileText
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface OrderForm {
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    stock: number
  }>
  shipping: {
    address: string
    city: string
    state: string
    zipCode: string
    method: string
    cost: number
  }
  payment: {
    method: string
    status: string
    installments: number
  }
  discount: {
    type: string
    value: number
    coupon: string
  }
  notes: string
  origin: string
  notifyCustomer: boolean
}

interface NewOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Dados mockados
const mockCustomers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(21) 88888-8888' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(31) 77777-7777' }
]

const mockProducts = [
  { id: '1', name: 'iPhone 16 Pro', price: 10499, stock: 15 },
  { id: '2', name: 'iPhone 16', price: 7499, stock: 25 },
  { id: '3', name: 'MacBook Pro', price: 15999, stock: 8 },
  { id: '4', name: 'iPad Pro', price: 8999, stock: 12 },
  { id: '5', name: 'Apple Watch', price: 3499, stock: 20 }
]

export function NewOrderModal({ open, onOpenChange }: NewOrderModalProps) {
  const [activeTab, setActiveTab] = useState('customer')
  const [customerOpen, setCustomerOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  
  const [form, setForm] = useState<OrderForm>({
    customer: { id: '', name: '', email: '', phone: '' },
    items: [],
    shipping: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      method: '',
      cost: 0
    },
    payment: {
      method: '',
      status: 'pending',
      installments: 1
    },
    discount: {
      type: 'none',
      value: 0,
      coupon: ''
    },
    notes: '',
    origin: 'manual',
    notifyCustomer: true
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof OrderForm] as any),
          [child]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const selectCustomer = (customer: typeof mockCustomers[0]) => {
    setForm(prev => ({ ...prev, customer }))
    setCustomerOpen(false)
  }

  const addProduct = (product: typeof mockProducts[0]) => {
    const existingItem = form.items.find(item => item.id === product.id)
    
    if (existingItem) {
      setForm(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }))
    } else {
      setForm(prev => ({
        ...prev,
        items: [...prev.items, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock
        }]
      }))
    }
    setProductOpen(false)
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setForm(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }))
  }

  const removeItem = (id: string) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const calculateSubtotal = () => {
    return form.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    if (form.discount.type === 'percentage') {
      return subtotal * (form.discount.value / 100)
    } else if (form.discount.type === 'fixed') {
      return form.discount.value
    }
    return 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + form.shipping.cost - calculateDiscount()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleSave = () => {
    if (!form.customer.id) {
      toast.error('Selecione um cliente!')
      return
    }
    
    if (form.items.length === 0) {
      toast.error('Adicione pelo menos um produto!')
      return
    }

    toast.success('Pedido criado com sucesso!')
    onOpenChange(false)
    // Reset form
    setForm({
      customer: { id: '', name: '', email: '', phone: '' },
      items: [],
      shipping: { address: '', city: '', state: '', zipCode: '', method: '', cost: 0 },
      payment: { method: '', status: 'pending', installments: 1 },
      discount: { type: 'none', value: 0, coupon: '' },
      notes: '',
      origin: 'manual',
      notifyCustomer: true
    })
  }

  const calculateShipping = () => {
    if (form.shipping.zipCode.length === 8) {
      // Simular cálculo de frete
      const randomShipping = Math.floor(Math.random() * 50) + 10
      handleInputChange('shipping.cost', randomShipping)
      toast.success(`Frete calculado: ${formatPrice(randomShipping)}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Criar Novo Pedido
          </DialogTitle>
          <DialogDescription>
            Cadastre um pedido manualmente. Todos os campos são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customer">Cliente</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="shipping">Entrega</TabsTrigger>
            <TabsTrigger value="payment">Pagamento</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="customer" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Selecionar Cliente</Label>
                  <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={customerOpen}
                        className="w-full justify-between"
                      >
                        {form.customer.name || "Selecione um cliente..."}
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar cliente..." />
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {mockCustomers.map((customer) => (
                            <CommandItem
                              key={customer.id}
                              onSelect={() => selectCustomer(customer)}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  form.customer.id === customer.id ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-gray-500">{customer.email}</div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {form.customer.id && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Nome</Label>
                          <Input value={form.customer.name} disabled />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input value={form.customer.email} disabled />
                        </div>
                        <div>
                          <Label>Telefone</Label>
                          <Input value={form.customer.phone} disabled />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Produtos do Pedido</Label>
                <Popover open={productOpen} onOpenChange={setProductOpen}>
                  <PopoverTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Produto
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Buscar produto..." />
                      <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                      <CommandGroup>
                        {mockProducts.map((product) => (
                          <CommandItem
                            key={product.id}
                            onSelect={() => addProduct(product)}
                          >
                            <div className="flex justify-between w-full">
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">
                                  {formatPrice(product.price)} • Estoque: {product.stock}
                                </div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {form.items.length > 0 && (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {form.items.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{formatPrice(item.price)} cada</p>
                            {item.quantity > item.stock && (
                              <Badge variant="destructive" className="mt-1">
                                Estoque insuficiente ({item.stock} disponível)
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {form.items.length > 0 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Desconto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Tipo de Desconto</Label>
                          <Select
                            value={form.discount.type}
                            onValueChange={(value) => handleInputChange('discount.type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Nenhum</SelectItem>
                              <SelectItem value="percentage">Porcentagem</SelectItem>
                              <SelectItem value="fixed">Valor Fixo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {form.discount.type !== 'none' && (
                          <>
                            <div>
                              <Label>Valor</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={form.discount.value}
                                onChange={(e) => handleInputChange('discount.value', parseFloat(e.target.value) || 0)}
                                placeholder={form.discount.type === 'percentage' ? 'Ex: 10' : 'Ex: 50.00'}
                              />
                            </div>
                            <div>
                              <Label>Cupom (opcional)</Label>
                              <Input
                                value={form.discount.coupon}
                                onChange={(e) => handleInputChange('discount.coupon', e.target.value)}
                                placeholder="Ex: DESC10"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calculator className="h-5 w-5 mr-2" />
                        Resumo do Pedido
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatPrice(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frete:</span>
                          <span>{formatPrice(form.shipping.cost)}</span>
                        </div>
                        {form.discount.type !== 'none' && (
                          <div className="flex justify-between text-green-600">
                            <span>Desconto:</span>
                            <span>-{formatPrice(calculateDiscount())}</span>
                          </div>
                        )}
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>{formatPrice(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Endereço Completo</Label>
                      <Input
                        value={form.shipping.address}
                        onChange={(e) => handleInputChange('shipping.address', e.target.value)}
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    <div>
                      <Label>CEP</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={form.shipping.zipCode}
                          onChange={(e) => handleInputChange('shipping.zipCode', e.target.value)}
                          placeholder="00000-000"
                          maxLength={8}
                        />
                        <Button type="button" onClick={calculateShipping}>
                          <Calculator className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Cidade</Label>
                      <Input
                        value={form.shipping.city}
                        onChange={(e) => handleInputChange('shipping.city', e.target.value)}
                        placeholder="Nome da cidade"
                      />
                    </div>
                    <div>
                      <Label>Estado</Label>
                      <Select
                        value={form.shipping.state}
                        onValueChange={(value) => handleInputChange('shipping.state', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Método de Entrega</Label>
                      <Select
                        value={form.shipping.method}
                        onValueChange={(value) => handleInputChange('shipping.method', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="correios">Correios</SelectItem>
                          <SelectItem value="transportadora">Transportadora</SelectItem>
                          <SelectItem value="motoboy">Motoboy</SelectItem>
                          <SelectItem value="retirada">Retirada na Loja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Método</Label>
                      <Select
                        value={form.payment.method}
                        onValueChange={(value) => handleInputChange('payment.method', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">Cartão de Crédito</SelectItem>
                          <SelectItem value="debit">Cartão de Débito</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="boleto">Boleto</SelectItem>
                          <SelectItem value="money">Dinheiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={form.payment.status}
                        onValueChange={(value) => handleInputChange('payment.status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="paid">Pago</SelectItem>
                          <SelectItem value="failed">Falhou</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {form.payment.method === 'credit' && (
                      <div>
                        <Label>Parcelas</Label>
                        <Select
                          value={form.payment.installments.toString()}
                          onValueChange={(value) => handleInputChange('payment.installments', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}x de {formatPrice(calculateTotal() / num)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações Adicionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Origem do Pedido</Label>
                    <Select
                      value={form.origin}
                      onValueChange={(value) => handleInputChange('origin', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual (Admin)</SelectItem>
                        <SelectItem value="site">Site</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                        <SelectItem value="store">Loja Física</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Observações</Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Observações adicionais sobre o pedido"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notifyCustomer"
                      checked={form.notifyCustomer}
                      onChange={(e) => handleInputChange('notifyCustomer', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="notifyCustomer">
                      Notificar cliente por email/WhatsApp
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Enviar Link de Pagamento
          </Button>
          <Button type="button" onClick={handleSave}>
            <Package className="h-4 w-4 mr-2" />
            Criar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Componente para usar na página de pedidos
export function NewOrderButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Pedido
      </Button>
      <NewOrderModal open={open} onOpenChange={setOpen} />
    </>
  )
}
