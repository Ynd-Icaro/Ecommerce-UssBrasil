'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Mail,
  Smartphone,
  Save
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Configurações da loja
    storeName: 'EcoMuss',
    storeDescription: 'A melhor loja Apple do Brasil',
    storeEmail: 'contato@ecomuss.com.br',
    storePhone: '(11) 99999-9999',
    storeAddress: 'São Paulo, SP',
    
    // Notificações
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderNotifications: true,
    
    // Segurança
    twoFactorAuth: false,
    passwordExpiry: '90',
    sessionTimeout: '60',
    
    // Aparência
    theme: 'light',
    primaryColor: '#3B82F6',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  })

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!')
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-1">Gerencie as configurações do sistema</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/admin">
                <Button variant="outline">
                  Voltar ao Dashboard
                </Button>
              </Link>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configurações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input
                      id="storeName"
                      value={settings.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email da Loja</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={settings.storeEmail}
                      onChange={(e) => handleInputChange('storeEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Telefone</Label>
                    <Input
                      id="storePhone"
                      value={settings.storePhone}
                      onChange={(e) => handleInputChange('storePhone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Endereço</Label>
                    <Input
                      id="storeAddress"
                      value={settings.storeAddress}
                      onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Descrição da Loja</Label>
                  <Input
                    id="storeDescription"
                    value={settings.storeDescription}
                    onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Configurações de Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-gray-500">Receber notificações importantes por email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label>Notificações SMS</Label>
                        <p className="text-sm text-gray-500">Receber notificações por SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-gray-500">Notificações push no navegador</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <Label>Notificações de Pedidos</Label>
                        <p className="text-sm text-gray-500">Notificar sobre novos pedidos</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.orderNotifications}
                      onCheckedChange={(checked) => handleInputChange('orderNotifications', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Configurações de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                    <Select
                      value={settings.passwordExpiry}
                      onValueChange={(value) => handleInputChange('passwordExpiry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleInputChange('sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="120">120 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Configurações de Aparência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => handleInputChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select
                      value={settings.locale}
                      onValueChange={(value) => handleInputChange('locale', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => handleInputChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (BRT)</SelectItem>
                        <SelectItem value="America/New_York">New York (EST)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
