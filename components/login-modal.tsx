'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: any) => void
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório'
      }
      if (!formData.phone) {
        newErrors.phone = 'Telefone é obrigatório'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Simular login/cadastro
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone
      }

      onLoginSuccess?.(userData)
      onClose()
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
      })
      setErrors({})

    } catch (error) {
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setErrors({})
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0C1A33]/95 backdrop-blur-xl border border-[#0E7466]/30 rounded-2xl 
                       w-full max-w-md p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 -right-4 w-72 h-72 bg-[#0E7466] rounded-full mix-blend-multiply filter blur-xl"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-2xl font-bold text-white">USS BRASIL</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLoginMode ? 'Bem-vindo de volta!' : 'Criar conta'}
              </h2>
              <p className="text-gray-400">
                {isLoginMode 
                  ? 'Faça login para continuar suas compras' 
                  : 'Junte-se à nossa comunidade'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {errors.general}
                </div>
              )}

              {!isLoginMode && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                      placeholder="Seu nome completo"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                             focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                             focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}

              {isLoginMode && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#0E7466] bg-white/10 border-white/20 rounded focus:ring-[#0E7466] focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Lembrar de mim</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[#0E7466] hover:text-[#0C6157] transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#0E7466] to-[#0C6157] text-white py-3 px-6 
                         rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  isLoginMode ? 'Entrar' : 'Criar conta'
                )}
              </motion.button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-[#0E7466] hover:text-[#0C6157] font-medium transition-colors"
                >
                  {isLoginMode ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}