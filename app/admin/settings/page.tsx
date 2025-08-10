'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Store,
  AlertTriangle
} from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'USSBRASIL',
    storeDescription: 'A melhor loja de produtos importados do Brasil com tecnologia de ponta e entrega rápida',
    storeEmail: 'contato@ussbrasil.com',
    storePhone: '(11) 98765-4321',
    storeAddress: 'Av. Paulista, 1234, São Paulo - SP',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: true,
    passwordExpiry: '90',
    theme: 'dark',
    locale: 'pt-BR',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    autoBackup: true,
    analyticsEnabled: true,
    cookieConsent: true
  })

  const [activeTab, setActiveTab] = useState('store')

  const handleSave = () => {
    console.log('Settings saved:', settings)
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const SettingCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-4 lg:p-6"
    >
      <div className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
        <div className="p-2 rounded-lg bg-[#0E7466]/20 text-[#0E7466]">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  )

  const SettingRow = ({ 
    label, 
    description, 
    children 
  }: { 
    label: string
    description: string
    children: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex-1">
        <label className="text-white font-medium">{label}</label>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  )

  const Switch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-[#0E7466]' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  const tabs = [
    { id: 'store', label: 'Loja', icon: Store },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'system', label: 'Sistema', icon: Settings }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie as configurações do sistema e da loja"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Configurações' }
        ]}
        actions={
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#00CED1] to-[#40E0D0] 
                     text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Alterações</span>
          </motion.button>
        }
      />

      {/* Tabs Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-2"
      >
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0E7466] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'store' && (
          <SettingCard icon={<Store className="w-5 h-5" />} title="Informações da Loja">
            <SettingRow label="Nome da Loja" description="Nome que aparecerá no site e emails">
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              />
            </SettingRow>

            <SettingRow label="Descrição" description="Descrição da loja para SEO">
              <textarea
                value={settings.storeDescription}
                onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                rows={2}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20
                         resize-none min-w-[300px]"
              />
            </SettingRow>

            <SettingRow label="Email" description="Email principal da loja">
              <input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => handleInputChange('storeEmail', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              />
            </SettingRow>

            <SettingRow label="Telefone" description="Telefone de contato">
              <input
                type="tel"
                value={settings.storePhone}
                onChange={(e) => handleInputChange('storePhone', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              />
            </SettingRow>

            <SettingRow label="Endereço" description="Endereço físico da loja">
              <input
                type="text"
                value={settings.storeAddress}
                onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20
                         min-w-[300px]"
              />
            </SettingRow>
          </SettingCard>
        )}

        {activeTab === 'notifications' && (
          <SettingCard icon={<Bell className="w-5 h-5" />} title="Configurações de Notificações">
            <SettingRow 
              label="Notificações por Email" 
              description="Receber alertas e relatórios por email"
            >
              <Switch
                checked={settings.emailNotifications}
                onChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </SettingRow>

            <SettingRow 
              label="Notificações SMS" 
              description="Receber alertas urgentes por SMS"
            >
              <Switch
                checked={settings.smsNotifications}
                onChange={(checked) => handleInputChange('smsNotifications', checked)}
              />
            </SettingRow>

            <SettingRow 
              label="Push Notifications" 
              description="Notificações no navegador"
            >
              <Switch
                checked={settings.pushNotifications}
                onChange={(checked) => handleInputChange('pushNotifications', checked)}
              />
            </SettingRow>
          </SettingCard>
        )}

        {activeTab === 'security' && (
          <SettingCard icon={<Shield className="w-5 h-5" />} title="Configurações de Segurança">
            <SettingRow 
              label="Autenticação de Dois Fatores" 
              description="Camada extra de segurança para login"
            >
              <Switch
                checked={settings.twoFactorAuth}
                onChange={(checked) => handleInputChange('twoFactorAuth', checked)}
              />
            </SettingRow>

            <SettingRow label="Expiração de Senha" description="Dias para expirar senha">
              <select
                value={settings.passwordExpiry}
                onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              >
                <option value="30" className="bg-[#0C1A33]">30 dias</option>
                <option value="60" className="bg-[#0C1A33]">60 dias</option>
                <option value="90" className="bg-[#0C1A33]">90 dias</option>
                <option value="never" className="bg-[#0C1A33]">Nunca</option>
              </select>
            </SettingRow>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Recomendação de Segurança</span>
              </div>
              <p className="text-yellow-300 text-sm">
                Mantenha sempre a autenticação de dois fatores ativada e senhas fortes.
              </p>
            </div>
          </SettingCard>
        )}

        {activeTab === 'appearance' && (
          <SettingCard icon={<Palette className="w-5 h-5" />} title="Aparência e Tema">
            <SettingRow label="Tema" description="Tema visual da interface">
              <select
                value={settings.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              >
                <option value="dark" className="bg-[#0C1A33]">Escuro</option>
                <option value="light" className="bg-[#0C1A33]">Claro</option>
                <option value="auto" className="bg-[#0C1A33]">Automático</option>
              </select>
            </SettingRow>

            <SettingRow label="Idioma" description="Idioma da interface">
              <select
                value={settings.locale}
                onChange={(e) => handleInputChange('locale', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              >
                <option value="pt-BR" className="bg-[#0C1A33]">Português (Brasil)</option>
                <option value="en-US" className="bg-[#0C1A33]">English (US)</option>
                <option value="es-ES" className="bg-[#0C1A33]">Español</option>
              </select>
            </SettingRow>

            <SettingRow label="Moeda" description="Moeda padrão da loja">
              <select
                value={settings.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              >
                <option value="BRL" className="bg-[#0C1A33]">Real (R$)</option>
                <option value="USD" className="bg-[#0C1A33]">Dólar ($)</option>
                <option value="EUR" className="bg-[#0C1A33]">Euro (€)</option>
              </select>
            </SettingRow>
          </SettingCard>
        )}

        {activeTab === 'system' && (
          <SettingCard icon={<Settings className="w-5 h-5" />} title="Configurações do Sistema">
            <SettingRow 
              label="Backup Automático" 
              description="Backup diário dos dados"
            >
              <Switch
                checked={settings.autoBackup}
                onChange={(checked) => handleInputChange('autoBackup', checked)}
              />
            </SettingRow>

            <SettingRow 
              label="Analytics" 
              description="Coleta de dados de uso"
            >
              <Switch
                checked={settings.analyticsEnabled}
                onChange={(checked) => handleInputChange('analyticsEnabled', checked)}
              />
            </SettingRow>

            <SettingRow 
              label="Consentimento de Cookies" 
              description="Mostrar banner de cookies"
            >
              <Switch
                checked={settings.cookieConsent}
                onChange={(checked) => handleInputChange('cookieConsent', checked)}
              />
            </SettingRow>

            <SettingRow label="Fuso Horário" description="Fuso horário do sistema">
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white 
                         focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20"
              >
                <option value="America/Sao_Paulo" className="bg-[#0C1A33]">São Paulo (GMT-3)</option>
                <option value="America/New_York" className="bg-[#0C1A33]">New York (GMT-5)</option>
                <option value="Europe/London" className="bg-[#0C1A33]">London (GMT+0)</option>
              </select>
            </SettingRow>
          </SettingCard>
        )}
      </div>
    </div>
  )
}
