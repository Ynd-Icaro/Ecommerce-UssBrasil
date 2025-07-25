'use client'

import { useState } from 'react'

import { X, User, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simular login
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Login realizado com sucesso!')
      onClose()
    } catch (error) {
      toast.error('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Conta criada com sucesso!')
      onClose()
    } catch (error) {
      toast.error('Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl m-4 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#00CED1] to-[#20B2AA] p-6 text-white">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">
                  {activeTab === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                </h2>
                <p className="text-white/80 mt-1">
                  {activeTab === 'login' 
                    ? 'Entre na sua conta UssBrasil' 
                    : 'Junte-se à família UssBrasil'
                  }
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Registrar</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="login-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#00B8CC] to-[#1A9B9E] transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-sm text-gray-600">
                        Esqueceu sua senha?
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Seu nome completo"
                          className="pl-10"
                          value={registerData.name}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-confirm-password">Confirmar senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#00B8CC] to-[#1A9B9E] transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? 'Criando conta...' : 'Criar conta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 text-center text-sm text-gray-500">
              <p>
                Ao continuar, você concorda com nossos{' '}
                <Button variant="link" className="p-0 h-auto text-[#00CED1]">
                  Termos de Uso
                </Button>
                {' '}e{' '}
                <Button variant="link" className="p-0 h-auto text-[#00CED1]">
                  Política de Privacidade
                </Button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
