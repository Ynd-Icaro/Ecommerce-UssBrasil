'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BellIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface NotificationSetting {
  id: string
  category: string
  title: string
  description: string
  icon: any
  enabled: boolean
  channels: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: '1',
    category: 'pedidos',
    title: 'Atualizações de Pedidos',
    description: 'Receba notificações sobre o status dos seus pedidos',
    icon: TruckIcon,
    enabled: true,
    channels: { email: true, push: true, sms: false }
  },
  {
    id: '2',
    category: 'ofertas',
    title: 'Ofertas e Promoções',
    description: 'Seja o primeiro a saber sobre descontos e ofertas especiais',
    icon: GiftIcon,
    enabled: true,
    channels: { email: true, push: false, sms: false }
  },
  {
    id: '3',
    category: 'seguranca',
    title: 'Segurança da Conta',
    description: 'Alertas sobre login e mudanças na sua conta',
    icon: ShieldCheckIcon,
    enabled: true,
    channels: { email: true, push: true, sms: true }
  },
  {
    id: '4',
    category: 'vip',
    title: 'Benefícios VIP',
    description: 'Notificações sobre benefícios e produtos exclusivos VIP',
    icon: StarIcon,
    enabled: false,
    channels: { email: false, push: false, sms: false }
  },
  {
    id: '5',
    category: 'newsletter',
    title: 'Newsletter USS Brasil',
    description: 'Novidades, lançamentos e conteúdo exclusivo',
    icon: EnvelopeIcon,
    enabled: true,
    channels: { email: true, push: false, sms: false }
  },
  {
    id: '6',
    category: 'suporte',
    title: 'Suporte ao Cliente',
    description: 'Respostas e atualizações do atendimento',
    icon: ChatBubbleLeftRightIcon,
    enabled: true,
    channels: { email: true, push: true, sms: false }
  }
]

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>(mockNotificationSettings)

  const toggleNotification = (settingId: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === settingId 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    )
  }

  const toggleChannel = (settingId: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === settingId 
          ? { 
              ...setting, 
              channels: { 
                ...setting.channels, 
                [channel]: !setting.channels[channel] 
              }
            }
          : setting
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/perfil"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] rounded-lg flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
                <p className="text-gray-600">Configurações de notificações</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {settings.filter(s => s.enabled).length}
              </div>
              <div className="text-sm text-gray-600">Ativas</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {settings.filter(s => s.channels.email).length}
              </div>
              <div className="text-sm text-gray-600">Por Email</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {settings.filter(s => s.channels.push).length}
              </div>
              <div className="text-sm text-gray-600">Push</div>
            </div>
          </div>
        </motion.div>

        {/* Channel Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Canais de Notificação
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-600">joao@email.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-gray-900">Push</h3>
                <p className="text-sm text-gray-600">Navegador/App</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-medium text-gray-900">SMS</h3>
                <p className="text-sm text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <div className="space-y-4">
          {settings.map((setting, index) => {
            const IconComponent = setting.icon

            return (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        setting.enabled 
                          ? 'bg-[#1ea7ff] text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {setting.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                    </div>

                    {/* Main Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.enabled}
                        onChange={() => toggleNotification(setting.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1ea7ff]"></div>
                    </label>
                  </div>

                  {/* Channel Toggles */}
                  {setting.enabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-4 border-t border-gray-100"
                    >
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Receber via:
                      </h4>
                      <div className="flex space-x-6">
                        {/* Email */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.channels.email}
                            onChange={() => toggleChannel(setting.id, 'email')}
                            className="w-4 h-4 text-[#1ea7ff] bg-gray-100 border-gray-300 rounded focus:ring-[#1ea7ff] focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>

                        {/* Push */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.channels.push}
                            onChange={() => toggleChannel(setting.id, 'push')}
                            className="w-4 h-4 text-[#1ea7ff] bg-gray-100 border-gray-300 rounded focus:ring-[#1ea7ff] focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">Push</span>
                        </label>

                        {/* SMS */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.channels.sms}
                            onChange={() => toggleChannel(setting.id, 'sms')}
                            className="w-4 h-4 text-[#1ea7ff] bg-gray-100 border-gray-300 rounded focus:ring-[#1ea7ff] focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">SMS</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
            Salvar Configurações
          </button>
        </motion.div>
      </div>
    </div>
  )
}
