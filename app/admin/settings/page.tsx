'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Store,
  Mail,
  Phone,
  MapPin,
  FileText,
  ToggleLeft,
  ToggleRight,
  Lock,
  Clock,
  Languages,
  Sun,
  Moon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import AdminLayout from '@/components/admin-layout'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Ecomuss',
    storeDescription: 'A melhor loja de produtos Apple do Brasil.',
    storeEmail: 'contato@ecomuss.com',
    storePhone: '(11) 98765-4321',
    storeAddress: 'Av. Paulista, 1234, São Paulo - SP',
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    passwordExpiry: '90',
    theme: 'light',
    locale: 'pt-BR',
  })

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!', {
      description: 'As alterações foram aplicadas em todo o sistema.',
      icon: <Save className="h-5 w-5 text-emerald-500" />,
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
  }

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <motion.div variants={itemVariants}>
      <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <CardHeader className="border-b border-black/5 p-6">
          <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderSettingRow = (label: string, description: string, control: React.ReactNode) => (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/50 transition-colors">
      <div>
        <Label className="font-semibold text-slate-700">{label}</Label>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      {control}
    </div>
  )

  return (
    <AdminLayout>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header variants={itemVariants} className="mb-10">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Configurações
                </h1>
                <p className="text-gray-600 mt-1">
                  Ajuste as preferências gerais do sistema e da loja.
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                onClick={handleSave}
              >
                <Save className="mr-2 h-5 w-5" />
                Salvar Alterações
              </Button>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
              {renderSection("Informações da Loja", <Store className="mr-3 h-6 w-6 text-[#00CED1]" />, (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input id="storeName" value={settings.storeName} onChange={e => handleInputChange('storeName', e.target.value)} className="bg-white/80"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email de Contato</Label>
                    <Input id="storeEmail" type="email" value={settings.storeEmail} onChange={e => handleInputChange('storeEmail', e.target.value)} className="bg-white/80"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Telefone</Label>
                    <Input id="storePhone" value={settings.storePhone} onChange={e => handleInputChange('storePhone', e.target.value)} className="bg-white/80"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Endereço</Label>
                    <Input id="storeAddress" value={settings.storeAddress} onChange={e => handleInputChange('storeAddress', e.target.value)} className="bg-white/80"/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="storeDescription">Descrição Curta</Label>
                    <Input id="storeDescription" value={settings.storeDescription} onChange={e => handleInputChange('storeDescription', e.target.value)} className="bg-white/80"/>
                  </div>
                </div>
              ))}

              {renderSection("Segurança", <Shield className="mr-3 h-6 w-6 text-[#00CED1]" />, (
                <>
                  {renderSettingRow(
                    "Autenticação de Dois Fatores (2FA)",
                    "Adiciona uma camada extra de segurança ao fazer login.",
                    <Switch checked={settings.twoFactorAuth} onCheckedChange={v => handleInputChange('twoFactorAuth', v)} />
                  )}
                  <div className="border-t border-black/5"></div>
                  {renderSettingRow(
                    "Expiração de Senha",
                    "Força a redefinição de senha após um período.",
                    <Select value={settings.passwordExpiry} onValueChange={v => handleInputChange('passwordExpiry', v)}>
                      <SelectTrigger className="w-[180px] bg-white/80">
                        <SelectValue placeholder="Selecionar período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </>
              ))}
            </motion.div>

            {/* Right Column */}
            <motion.div className="space-y-8" variants={containerVariants}>
              {renderSection("Notificações", <Bell className="mr-3 h-6 w-6 text-[#00CED1]" />, (
                <>
                  {renderSettingRow(
                    "Notificações por Email",
                    "Receber alertas sobre pedidos e atividades.",
                    <Switch checked={settings.emailNotifications} onCheckedChange={v => handleInputChange('emailNotifications', v)} />
                  )}
                  <div className="border-t border-black/5"></div>
                  {renderSettingRow(
                    "Notificações por SMS",
                    "Receber alertas críticos por mensagem de texto.",
                    <Switch checked={settings.smsNotifications} onCheckedChange={v => handleInputChange('smsNotifications', v)} />
                  )}
                </>
              ))}

              {renderSection("Aparência e Idioma", <Palette className="mr-3 h-6 w-6 text-[#00CED1]" />, (
                <>
                  {renderSettingRow(
                    "Tema Visual",
                    "Escolha entre o modo claro ou escuro.",
                    <Select value={settings.theme} onValueChange={v => handleInputChange('theme', v)}>
                      <SelectTrigger className="w-[180px] bg-white/80">
                        <SelectValue placeholder="Selecionar tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light"><Sun className="inline mr-2 h-4 w-4"/> Claro</SelectItem>
                        <SelectItem value="dark"><Moon className="inline mr-2 h-4 w-4"/> Escuro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <div className="border-t border-black/5"></div>
                  {renderSettingRow(
                    "Idioma",
                    "Define o idioma padrão da interface.",
                    <Select value={settings.locale} onValueChange={v => handleInputChange('locale', v)}>
                      <SelectTrigger className="w-[180px] bg-white/80">
                        <SelectValue placeholder="Selecionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (BR)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
