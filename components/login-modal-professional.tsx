'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Calendar,
  MapPin,
  Shield,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: any) => void
}

interface FormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  birthDate: string
  city: string
  acceptTerms: boolean
}

export default function ProfessionalLoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthDate: '',
    city: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      // Reset form when modal closes
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        birthDate: '',
        city: '',
        acceptTerms: false
      })
      setActiveTab('login')
      setStep(1)
      setIsSuccess(false)
      setErrors({})
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const validateLogin = () => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato: (11) 99999-9999'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter ao menos: 1 maiúscula, 1 minúscula e 1 número'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação é obrigatória'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
    }
    return value.slice(0, -1)
  }

  const handleLogin = async () => {
    if (!validateLogin()) return

    setLoading(true)
    
    // Simular login (substitua pela sua API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockUser = {
      id: '1',
      name: 'Usuário Teste',
      email: formData.email,
      avatar: '/default-avatar.png'
    }
    
    setIsSuccess(true)
    setTimeout(() => {
      onLoginSuccess?.(mockUser)
      onClose()
    }, 1500)
    
    setLoading(false)
  }

  const handleRegister = async () => {
    if (step === 1) {
      if (validateRegisterStep1()) {
        setStep(2)
      }
      return
    }

    if (!validateRegisterStep2()) return

    setLoading(true)
    
    // Simular registro (substitua pela sua API)
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: '/default-avatar.png'
    }
    
    setIsSuccess(true)
    setTimeout(() => {
      onLoginSuccess?.(newUser)
      onClose()
    }, 1500)
    
    setLoading(false)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 60 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 24, stiffness: 340 } },
    exit: { opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.18 } }
  } satisfies Variants

  const successVariants = {
    hidden: { scale: 0.8, rotate: -8 },
    visible: { scale: 1, rotate: 0, transition: { type: 'spring', damping: 18, stiffness: 260 } }
  } satisfies Variants

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
          >
          {/* Success State */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center z-10"
            >
              <div className="text-center">
                <motion.div
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeTab === 'login' ? 'Login realizado!' : 'Conta criada!'}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'login' 
                    ? 'Bem-vindo de volta!' 
                    : 'Bem-vindo à USS Brasil!'
                  }
                </p>
              </div>
            </motion.div>
          )}

          {/* Header */}
          <div className="relative bg-gradient-to-r from-uss-primary to-uss-secondary text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/Empresa/02.png"
                  alt="USS Brasil"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">USS Brasil</h2>
              <p className="text-white/80">
                {activeTab === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-50">
            <button
              onClick={() => {
                setActiveTab('login')
                setStep(1)
                setErrors({})
              }}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-uss-primary border-b-2 border-uss-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setActiveTab('register')
                setStep(1)
                setErrors({})
              }}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-uss-primary border-b-2 border-uss-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registrar
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                        }`}
                        placeholder="seu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.password
                            ? 'border-red-300 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <button className="text-sm text-uss-primary hover:text-uss-secondary transition-colors">
                      Esqueci minha senha
                    </button>
                  </div>

                  {/* Login Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-uss-primary to-uss-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Entrar'
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Passo {step} de 2</span>
                      <span>{step === 1 ? 'Dados pessoais' : 'Segurança'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: '50%' }}
                        animate={{ width: step === 1 ? '50%' : '100%' }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-uss-primary to-uss-secondary h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome completo
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                errors.name
                                  ? 'border-red-300 focus:ring-red-200'
                                  : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                              }`}
                              placeholder="João Silva"
                            />
                          </div>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.name}
                            </motion.p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                errors.email
                                  ? 'border-red-300 focus:ring-red-200'
                                  : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                              }`}
                              placeholder="joao@email.com"
                            />
                          </div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                errors.phone
                                  ? 'border-red-300 focus:ring-red-200'
                                  : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                              }`}
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>

                        {/* Next Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRegister}
                          className="w-full bg-gradient-to-r from-uss-primary to-uss-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                          Continuar
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        {/* Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                errors.password
                                  ? 'border-red-300 focus:ring-red-200'
                                  : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                              }`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {errors.password && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.password}
                            </motion.p>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar senha
                          </label>
                          <div className="relative">
                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                errors.confirmPassword
                                  ? 'border-red-300 focus:ring-red-200'
                                  : 'border-gray-300 focus:ring-uss-primary/20 focus:border-uss-primary'
                              }`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.confirmPassword}
                            </motion.p>
                          )}
                        </div>

                        {/* Terms */}
                        <div>
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.acceptTerms}
                              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                              className="mt-1 h-4 w-4 text-uss-primary border-gray-300 rounded focus:ring-uss-primary/20"
                            />
                            <span className="text-sm text-gray-600">
                              Aceito os{' '}
                              <button className="text-uss-primary hover:text-uss-secondary transition-colors underline">
                                termos de uso
                              </button>{' '}
                              e{' '}
                              <button className="text-uss-primary hover:text-uss-secondary transition-colors underline">
                                política de privacidade
                              </button>
                            </span>
                          </label>
                          {errors.acceptTerms && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-1 flex items-center"
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.acceptTerms}
                            </motion.p>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(1)}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
                          >
                            Voltar
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRegister}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-uss-primary to-uss-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
                          >
                            {loading ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              'Criar conta'
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Login */}
          <div className="p-6 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </motion.button>
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
