'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Settings,
  Store,
  Palette,
  Mail,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Globe,
  Save,
  Upload,
  Eye,
  EyeOff,
  Monitor,
  Sun,
  Moon,
  Zap,
  Database,
  Key
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AdminLayout from '@/components/admin-layout'

interface StoreSettings {
  storeName: string
  storeDescription: string
  storeEmail: string
  storePhone: string
  storeAddress: string
  currency: string
  language: string
  timezone: string
  logo: string
}

interface DesignSettings {
  primaryColor: string
  accentColor: string
  theme: 'light' | 'dark' | 'auto'
  customCSS: string
  favicon: string
}

interface EmailSettings {
  smtpHost: string
  smtpPort: string
  smtpUser: string
  smtpPassword: string
  emailFrom: string
  emailName: string
}

interface PaymentSettings {
  pixEnabled: boolean
  pixKey: string
  creditCardEnabled: boolean
  stripePublicKey: string
  stripeSecretKey: string
  mercadoPagoEnabled: boolean
  mercadoPagoToken: string
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})
  
  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/login')
      return
    }
  }, [session, status, router])
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'UssBrasil Store',
    storeDescription: 'Loja oficial de produtos Apple no Brasil',
    storeEmail: 'contato@ussbrasil.com',
    storePhone: '+55 11 99999-9999',
    storeAddress: 'São Paulo, SP - Brasil',
    currency: 'BRL',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    logo: ''
  })

  const [designSettings, setDesignSettings] = useState<DesignSettings>({
    primaryColor: '#00CED1',
    accentColor: '#20B2AA',
    theme: 'light',
    customCSS: '',
    favicon: ''
  })

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: 'noreply@ussbrasil.com',
    emailName: 'UssBrasil Store'
  })

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    pixEnabled: true,
    pixKey: '',
    creditCardEnabled: true,
    stripePublicKey: '',
    stripeSecretKey: '',
    mercadoPagoEnabled: false,
    mercadoPagoToken: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newOrderEmail: true,
    lowStockEmail: true,
    customerRegistration: true,
    orderStatusUpdate: true,
    reviewNotifications: true
  })

  const saveSettings = async () => {
    setLoading(true)
    try {
      // Simular salvamento das configurações
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configurações salvas:', {
        store: storeSettings,
        design: designSettings,
        email: emailSettings,
        payment: paymentSettings,
        notifications: notificationSettings
      })
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'auto', label: 'Automático', icon: Monitor }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">Gerencie as configurações da sua loja</p>
          </div>
          <Button 
            onClick={saveSettings}
            disabled={loading}
            className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1]"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar Configurações
          </Button>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="store" className="flex items-center space-x-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Loja</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamento</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Store className="h-5 w-5 text-[#00CED1]" />
                    <span>Informações da Loja</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Nome da Loja</Label>
                      <Input
                        id="storeName"
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                        placeholder="Nome da sua loja"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Email da Loja</Label>
                      <Input
                        id="storeEmail"
                        type="email"
                        value={storeSettings.storeEmail}
                        onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                        placeholder="contato@minhaloja.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Telefone</Label>
                      <Input
                        id="storePhone"
                        value={storeSettings.storePhone}
                        onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                        placeholder="+55 11 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Moeda</Label>
                      <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                          <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Descrição da Loja</Label>
                    <Textarea
                      id="storeDescription"
                      value={storeSettings.storeDescription}
                      onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                      placeholder="Descreva sua loja..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Endereço</Label>
                    <Textarea
                      id="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                      placeholder="Endereço completo da loja"
                      rows={2}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select value={storeSettings.language} onValueChange={(value) => setStoreSettings({...storeSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es-ES">Español (España)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select value={storeSettings.timezone} onValueChange={(value) => setStoreSettings({...storeSettings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                          <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Design Settings */}
          <TabsContent value="design" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-[#00CED1]" />
                    <span>Personalização Visual</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                      <div className="flex items-center space-x-3">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={designSettings.primaryColor}
                          onChange={(e) => setDesignSettings({...designSettings, primaryColor: e.target.value})}
                          className="w-16 h-10 p-1 rounded-lg"
                        />
                        <Input
                          value={designSettings.primaryColor}
                          onChange={(e) => setDesignSettings({...designSettings, primaryColor: e.target.value})}
                          placeholder="#00CED1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Cor de Destaque</Label>
                      <div className="flex items-center space-x-3">
                        <Input
                          id="accentColor"
                          type="color"
                          value={designSettings.accentColor}
                          onChange={(e) => setDesignSettings({...designSettings, accentColor: e.target.value})}
                          className="w-16 h-10 p-1 rounded-lg"
                        />
                        <Input
                          value={designSettings.accentColor}
                          onChange={(e) => setDesignSettings({...designSettings, accentColor: e.target.value})}
                          placeholder="#20B2AA"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {themeOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <Card
                            key={option.value}
                            className={`cursor-pointer transition-all duration-200 ${
                              designSettings.theme === option.value 
                                ? 'ring-2 ring-[#00CED1] bg-[#00CED1]/5' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setDesignSettings({...designSettings, theme: option.value as any})}
                          >
                            <CardContent className="p-4 text-center">
                              <Icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                              <p className="text-sm font-medium">{option.label}</p>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="customCSS">CSS Personalizado</Label>
                    <Textarea
                      id="customCSS"
                      value={designSettings.customCSS}
                      onChange={(e) => setDesignSettings({...designSettings, customCSS: e.target.value})}
                      placeholder="/* Adicione seu CSS personalizado aqui */"
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-[#00CED1]" />
                    <span>Configurações de Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">Servidor SMTP</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Porta SMTP</Label>
                      <Input
                        id="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                        placeholder="587"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">Usuário SMTP</Label>
                      <Input
                        id="smtpUser"
                        value={emailSettings.smtpUser}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                        placeholder="seu-email@gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">Senha SMTP</Label>
                      <div className="relative">
                        <Input
                          id="smtpPassword"
                          type={showPasswords.smtp ? "text" : "password"}
                          value={emailSettings.smtpPassword}
                          onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                          placeholder="Senha do email"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => togglePasswordVisibility('smtp')}
                        >
                          {showPasswords.smtp ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emailFrom">Email Remetente</Label>
                      <Input
                        id="emailFrom"
                        value={emailSettings.emailFrom}
                        onChange={(e) => setEmailSettings({...emailSettings, emailFrom: e.target.value})}
                        placeholder="noreply@minhaloja.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailName">Nome do Remetente</Label>
                      <Input
                        id="emailName"
                        value={emailSettings.emailName}
                        onChange={(e) => setEmailSettings({...emailSettings, emailName: e.target.value})}
                        placeholder="Minha Loja"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                {/* PIX Settings */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-[#00CED1]" />
                        <span>PIX</span>
                      </div>
                      <Switch
                        checked={paymentSettings.pixEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, pixEnabled: checked})}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pixKey">Chave PIX</Label>
                      <Input
                        id="pixKey"
                        value={paymentSettings.pixKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, pixKey: e.target.value})}
                        placeholder="Sua chave PIX (CPF, email, telefone ou chave aleatória)"
                        disabled={!paymentSettings.pixEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Card Settings */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-[#00CED1]" />
                        <span>Cartão de Crédito (Stripe)</span>
                      </div>
                      <Switch
                        checked={paymentSettings.creditCardEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, creditCardEnabled: checked})}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stripePublicKey">Chave Pública Stripe</Label>
                        <Input
                          id="stripePublicKey"
                          value={paymentSettings.stripePublicKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripePublicKey: e.target.value})}
                          placeholder="pk_test_..."
                          disabled={!paymentSettings.creditCardEnabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripeSecretKey">Chave Secreta Stripe</Label>
                        <div className="relative">
                          <Input
                            id="stripeSecretKey"
                            type={showPasswords.stripe ? "text" : "password"}
                            value={paymentSettings.stripeSecretKey}
                            onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                            placeholder="sk_test_..."
                            disabled={!paymentSettings.creditCardEnabled}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                            onClick={() => togglePasswordVisibility('stripe')}
                          >
                            {showPasswords.stripe ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* MercadoPago Settings */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-[#00CED1]" />
                        <span>Mercado Pago</span>
                      </div>
                      <Switch
                        checked={paymentSettings.mercadoPagoEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, mercadoPagoEnabled: checked})}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mercadoPagoToken">Access Token</Label>
                      <div className="relative">
                        <Input
                          id="mercadoPagoToken"
                          type={showPasswords.mercadopago ? "text" : "password"}
                          value={paymentSettings.mercadoPagoToken}
                          onChange={(e) => setPaymentSettings({...paymentSettings, mercadoPagoToken: e.target.value})}
                          placeholder="Seu Access Token do Mercado Pago"
                          disabled={!paymentSettings.mercadoPagoEnabled}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                          onClick={() => togglePasswordVisibility('mercadopago')}
                        >
                          {showPasswords.mercadopago ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-[#00CED1]" />
                    <span>Notificações por Email</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: 'newOrderEmail', label: 'Novos Pedidos', description: 'Receber notificação quando um novo pedido for criado' },
                    { key: 'lowStockEmail', label: 'Estoque Baixo', description: 'Ser avisado quando produtos estiverem com estoque baixo' },
                    { key: 'customerRegistration', label: 'Novos Clientes', description: 'Notificação de novos cadastros de clientes' },
                    { key: 'orderStatusUpdate', label: 'Status de Pedidos', description: 'Atualizações de status dos pedidos' },
                    { key: 'reviewNotifications', label: 'Avaliações', description: 'Novas avaliações de produtos' }
                  ].map((notification) => (
                    <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">{notification.label}</h4>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <Switch
                        checked={notificationSettings[notification.key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) => setNotificationSettings({
                          ...notificationSettings,
                          [notification.key]: checked
                        })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#00CED1]" />
                    <span>Configurações de Segurança</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Key className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Configurações de Segurança</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          As configurações de segurança avançadas estão em desenvolvimento. 
                          Em breve teremos autenticação de dois fatores, logs de acesso e mais recursos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">Autenticação de Dois Fatores</h4>
                        <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                      </div>
                      <Badge variant="secondary">Em Breve</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">Logs de Acesso</h4>
                        <p className="text-sm text-gray-600">Monitore acessos ao painel admin</p>
                      </div>
                      <Badge variant="secondary">Em Breve</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium text-gray-900">Backup Automático</h4>
                        <p className="text-sm text-gray-600">Backup automático dos dados da loja</p>
                      </div>
                      <Badge variant="secondary">Em Breve</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
