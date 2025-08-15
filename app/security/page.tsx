'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  ArrowLeftIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ComputerDesktopIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface LoginSession {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
  browser: string
  ip: string
}

const mockSessions: LoginSession[] = [
  {
    id: '1',
    device: 'Windows PC',
    location: 'São Paulo, SP',
    lastActive: '2024-12-13 14:30',
    current: true,
    browser: 'Chrome 120',
    ip: '192.168.1.100'
  },
  {
    id: '2',
    device: 'iPhone 15 Pro',
    location: 'São Paulo, SP',
    lastActive: '2024-12-12 18:45',
    current: false,
    browser: 'Safari Mobile',
    ip: '192.168.1.101'
  }
]

export default function SecurityPage() {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [sessions] = useState<LoginSession[]>(mockSessions)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  }

  const passwordValidation = validatePassword(passwordForm.newPassword)
  const isPasswordValid = Object.values(passwordValidation).every(Boolean)

  const handleTerminateSession = (sessionId: string) => {
    if (confirm('Tem certeza que deseja encerrar esta sessão?')) {
      // Logic to terminate session
      console.log('Terminating session:', sessionId)
    }
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
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Segurança</h1>
                <p className="text-gray-600">Senha e autenticação</p>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Conta Protegida</h3>
                <p className="text-sm text-green-700">
                  Sua conta está segura. Última atualização de senha há 3 meses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Password Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <KeyIcon className="w-6 h-6 text-[#1ea7ff]" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Senha</h2>
                <p className="text-sm text-gray-600">Última alteração há 3 meses</p>
              </div>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="px-4 py-2 text-[#1ea7ff] hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              {showChangePassword ? 'Cancelar' : 'Alterar Senha'}
            </button>
          </div>

          {showChangePassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-gray-100 pt-4"
            >
              <form className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                      placeholder="Digite uma nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {passwordForm.newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className={`flex items-center space-x-2 text-xs ${
                        passwordValidation.length ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {passwordValidation.length ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                        <span>Pelo menos 8 caracteres</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {passwordValidation.uppercase ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                        <span>Pelo menos uma letra maiúscula</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        passwordValidation.number ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {passwordValidation.number ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                        <span>Pelo menos um número</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${
                        passwordValidation.special ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {passwordValidation.special ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                        <span>Pelo menos um caractere especial</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                    placeholder="Confirme a nova senha"
                  />
                  {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">As senhas não coincidem</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isPasswordValid || passwordForm.newPassword !== passwordForm.confirmPassword}
                  className="w-full py-2 bg-[#1ea7ff] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Alterar Senha
                </button>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Two-Factor Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DevicePhoneMobileIcon className="w-6 h-6 text-[#1ea7ff]" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Autenticação em Duas Etapas
                </h2>
                <p className="text-sm text-gray-600">
                  {twoFactorEnabled 
                    ? 'Proteção adicional ativada' 
                    : 'Adicione uma camada extra de segurança'
                  }
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1ea7ff]"></div>
            </label>
          </div>
          
          {twoFactorEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  📱 Autenticação por SMS configurada para (11) 99999-9999
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ComputerDesktopIcon className="w-6 h-6 text-[#1ea7ff] mr-2" />
            Sessões Ativas
          </h2>
          
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {session.device.includes('iPhone') ? (
                      <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ComputerDesktopIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{session.device}</h3>
                      {session.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Atual
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>Último acesso: {session.lastActive}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.browser} • {session.ip}
                      </div>
                    </div>
                  </div>
                </div>
                
                {!session.current && (
                  <button
                    onClick={() => handleTerminateSession(session.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    Encerrar
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
              Encerrar Todas as Outras Sessões
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
