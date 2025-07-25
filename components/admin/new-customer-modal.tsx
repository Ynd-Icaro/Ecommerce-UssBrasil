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
} from '@/components/ui/dialog'
import {
  Plus,
  User,
  MapPin,
  Phone,
  Mail,
  Tag,
  FileText,
  Search,
  MessageCircle,
  Download,
  ShoppingCart
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CustomerForm {
  personal: {
    name: string
    email: string
    phone: string
    cpfCnpj: string
    birthDate: string
    gender: string
  }
  address: {
    zipCode: string
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
  }
  preferences: {
    contactEmail: boolean
    contactWhatsApp: boolean
    contactPhone: boolean
    newsletter: boolean
    promotions: boolean
  }
  tags: string[]
  notes: string
  source: string
  status: string
  salesPerson: string
}

interface NewCustomerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Dados mockados
const salesPersons = [
  { id: '1', name: 'Ana Silva' },
  { id: '2', name: 'Carlos Santos' },
  { id: '3', name: 'Maria Costa' }
]

const availableTags = [
  'VIP', 'Atacado', 'Varejo', 'Corporate', 'Influencer', 'Fidelizado',
  'Novo Cliente', 'Revendedor', 'Premium', 'Inadimplente'
]

export function NewCustomerModal({ open, onOpenChange }: NewCustomerModalProps) {
  const [activeTab, setActiveTab] = useState('personal')
  const [form, setForm] = useState<CustomerForm>({
    personal: {
      name: '',
      email: '',
      phone: '',
      cpfCnpj: '',
      birthDate: '',
      gender: ''
    },
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    preferences: {
      contactEmail: true,
      contactWhatsApp: true,
      contactPhone: false,
      newsletter: false,
      promotions: true
    },
    tags: [],
    notes: '',
    source: '',
    status: 'active',
    salesPerson: ''
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CustomerForm] as any),
          [child]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [field]: value }))
    }
  }

  const addTag = (tag: string) => {
    if (!form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const fetchAddressFromCEP = async () => {
    if (form.address.zipCode.length === 8) {
      // Simular busca de endereço por CEP
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          street: 'Rua das Flores',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP'
        }
      }))
      toast.success('Endereço preenchido automaticamente!')
    }
  }

  const fetchDataFromDocument = () => {
    if (form.personal.cpfCnpj.length >= 11) {
      // Simular busca de dados por CPF/CNPJ
      if (form.personal.cpfCnpj.length === 11) {
        // CPF
        setForm(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            name: 'João Silva Santos'
          }
        }))
      } else {
        // CNPJ
        setForm(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            name: 'Empresa ABC Ltda'
          }
        }))
      }
      toast.success('Dados preenchidos automaticamente!')
    }
  }

  const handleSave = () => {
    if (!form.personal.name || !form.personal.email) {
      toast.error('Preencha os campos obrigatórios!')
      return
    }

    toast.success('Cliente cadastrado com sucesso!')
    onOpenChange(false)
    // Reset form
    setForm({
      personal: {
        name: '',
        email: '',
        phone: '',
        cpfCnpj: '',
        birthDate: '',
        gender: ''
      },
      address: {
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      preferences: {
        contactEmail: true,
        contactWhatsApp: true,
        contactPhone: false,
        newsletter: false,
        promotions: true
      },
      tags: [],
      notes: '',
      source: '',
      status: 'active',
      salesPerson: ''
    })
  }

  const sendWhatsApp = () => {
    if (form.personal.phone) {
      const message = `Olá ${form.personal.name}, seja bem-vindo à EcoMuss!`
      const whatsappUrl = `https://wa.me/55${form.personal.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const sendEmail = () => {
    if (form.personal.email) {
      const subject = 'Bem-vindo à EcoMuss!'
      const body = `Olá ${form.personal.name},\n\nSeja bem-vindo à nossa loja!`
      const mailtoUrl = `mailto:${form.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoUrl, '_blank')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Cadastrar Novo Cliente
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do cliente. Campos com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
            <TabsTrigger value="additional">Adicional</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={form.personal.name}
                    onChange={(e) => handleInputChange('personal.name', e.target.value)}
                    placeholder="Nome completo do cliente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.personal.email}
                    onChange={(e) => handleInputChange('personal.email', e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    value={form.personal.phone}
                    onChange={(e) => handleInputChange('personal.phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="cpfCnpj"
                      value={form.personal.cpfCnpj}
                      onChange={(e) => handleInputChange('personal.cpfCnpj', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                    <Button type="button" onClick={fetchDataFromDocument}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={form.personal.birthDate}
                    onChange={(e) => handleInputChange('personal.birthDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select value={form.personal.gender} onValueChange={(value) => handleInputChange('personal.gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                      <SelectItem value="not_informed">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Endereço Principal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="zipCode"
                          value={form.address.zipCode}
                          onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                          placeholder="00000-000"
                          maxLength={8}
                        />
                        <Button type="button" onClick={fetchAddressFromCEP}>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Endereço</Label>
                      <Input
                        id="street"
                        value={form.address.street}
                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        value={form.address.number}
                        onChange={(e) => handleInputChange('address.number', e.target.value)}
                        placeholder="123"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={form.address.complement}
                        onChange={(e) => handleInputChange('address.complement', e.target.value)}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        value={form.address.neighborhood}
                        onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={form.address.city}
                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                        placeholder="Nome da cidade"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Select value={form.address.state} onValueChange={(value) => handleInputChange('address.state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label>Email</Label>
                          <p className="text-sm text-gray-500">Receber contatos por email</p>
                        </div>
                      </div>
                      <Switch
                        checked={form.preferences.contactEmail}
                        onCheckedChange={(checked) => handleInputChange('preferences.contactEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label>WhatsApp</Label>
                          <p className="text-sm text-gray-500">Receber mensagens no WhatsApp</p>
                        </div>
                      </div>
                      <Switch
                        checked={form.preferences.contactWhatsApp}
                        onCheckedChange={(checked) => handleInputChange('preferences.contactWhatsApp', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label>Telefone</Label>
                          <p className="text-sm text-gray-500">Receber ligações telefônicas</p>
                        </div>
                      </div>
                      <Switch
                        checked={form.preferences.contactPhone}
                        onCheckedChange={(checked) => handleInputChange('preferences.contactPhone', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label>Newsletter</Label>
                          <p className="text-sm text-gray-500">Receber newsletter semanal</p>
                        </div>
                      </div>
                      <Switch
                        checked={form.preferences.newsletter}
                        onCheckedChange={(checked) => handleInputChange('preferences.newsletter', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Tag className="h-5 w-5 text-gray-500" />
                        <div>
                          <Label>Promoções</Label>
                          <p className="text-sm text-gray-500">Receber ofertas e promoções</p>
                        </div>
                      </div>
                      <Switch
                        checked={form.preferences.promotions}
                        onCheckedChange={(checked) => handleInputChange('preferences.promotions', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      Tags do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <Button
                            key={tag}
                            type="button"
                            variant={form.tags.includes(tag) ? "default" : "outline"}
                            size="sm"
                            onClick={() => form.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      
                      {form.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                          <span className="text-sm font-medium">Tags selecionadas:</span>
                          {form.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">Fonte de Cadastro</Label>
                      <Select value={form.source} onValueChange={(value) => handleInputChange('source', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Como conheceu a loja?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site">Site</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                          <SelectItem value="store">Loja Física</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="social">Redes Sociais</SelectItem>
                          <SelectItem value="referral">Indicação</SelectItem>
                          <SelectItem value="ads">Publicidade</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={form.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="blocked">Bloqueado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salesPerson">Vendedor Responsável</Label>
                      <Select value={form.salesPerson} onValueChange={(value) => handleInputChange('salesPerson', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um vendedor" />
                        </SelectTrigger>
                        <SelectContent>
                          {salesPersons.map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Observações Internas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Anotações internas sobre o cliente, preferências, histórico de atendimento, etc."
                    rows={4}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          
          {form.personal.phone && (
            <Button type="button" variant="outline" onClick={sendWhatsApp}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Enviar WhatsApp
            </Button>
          )}
          
          {form.personal.email && (
            <Button type="button" variant="outline" onClick={sendEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Enviar Email
            </Button>
          )}
          
          <Button type="button" onClick={handleSave}>
            <User className="h-4 w-4 mr-2" />
            Cadastrar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Componente para usar na página de clientes
export function NewCustomerButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Cliente
      </Button>
      <NewCustomerModal open={open} onOpenChange={setOpen} />
    </>
  )
}
