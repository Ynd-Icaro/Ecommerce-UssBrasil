'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, EyeOff, User, Mail, Lock, Chrome, X, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppleLoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const router = useRouter()

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Credenciais inválidas')
      } else {
        toast.success('Login realizado com sucesso!')
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
        onClose()
      }
    } catch (error) {
      toast.error('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      })

      if (response.ok) {
        toast.success('Conta criada com sucesso!')
        setActiveTab('login')
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' })
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao criar conta')
      }
    } catch (error) {
      toast.error('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      toast.error('Erro ao fazer login com Google')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative px-8 pt-8 pb-6 text-center border-b border-neutral-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 hover:bg-neutral-100 rounded-xl transition-all duration-200"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5 text-neutral-500" />
                  </Button>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-2xl">U</span>
                  </div>
                  
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-2">
                    Bem-vindo à UssBrasil
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Faça login ou crie sua conta para continuar
                  </p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-100 rounded-xl p-1">
                      <TabsTrigger 
                        value="login" 
                        className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        Entrar
                      </TabsTrigger>
                      <TabsTrigger 
                        value="register"
                        className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        Criar Conta
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-6">
                      <motion.form
                        onSubmit={handleLogin}
                        className="space-y-5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                              className="pl-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
                            Senha
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={loginForm.password}
                              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                              className="pl-11 pr-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-10 w-10 hover:bg-neutral-100 rounded-lg"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-neutral-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-neutral-400" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Entrando...
                            </>
                          ) : (
                            'Entrar'
                          )}
                        </Button>
                      </motion.form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-neutral-500">ou</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        className="w-full h-12 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all duration-200"
                      >
                        <Chrome className="h-5 w-5 mr-2" />
                        Continuar com Google
                      </Button>

                      <div className="text-center">
                        <Button variant="ghost" className="text-sm text-neutral-500 hover:text-neutral-700">
                          Esqueceu sua senha?
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-6">
                      <motion.form
                        onSubmit={handleRegister}
                        className="space-y-5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-neutral-700">
                            Nome Completo
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Seu nome completo"
                              value={registerForm.name}
                              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                              className="pl-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email" className="text-sm font-medium text-neutral-700">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="register-email"
                              type="email"
                              placeholder="seu@email.com"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className="pl-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password" className="text-sm font-medium text-neutral-700">
                            Senha
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="register-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                              className="pl-11 pr-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-10 w-10 hover:bg-neutral-100 rounded-lg"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-neutral-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-neutral-400" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-sm font-medium text-neutral-700">
                            Confirmar Senha
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={registerForm.confirmPassword}
                              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                              className="pl-11 pr-11 h-12 border border-neutral-300 rounded-xl focus:border-[#00CED1] focus:ring-[#00CED1] transition-all duration-200"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-10 w-10 hover:bg-neutral-100 rounded-lg"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-neutral-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-neutral-400" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] hover:from-[#20B2AA] hover:to-[#00CED1] text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Criando conta...
                            </>
                          ) : (
                            'Criar Conta'
                          )}
                        </Button>
                      </motion.form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-neutral-500">ou</span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        className="w-full h-12 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all duration-200"
                      >
                        <Chrome className="h-5 w-5 mr-2" />
                        Continuar com Google
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Footer */}
                <div className="px-8 pb-8 text-center border-t border-neutral-100 pt-6">
                  <p className="text-xs text-neutral-500">
                    Ao continuar, você concorda com nossos{' '}
                    <Button variant="link" className="text-xs p-0 h-auto text-[#00CED1] hover:text-[#20B2AA]">
                      Termos de Uso
                    </Button>{' '}
                    e{' '}
                    <Button variant="link" className="text-xs p-0 h-auto text-[#00CED1] hover:text-[#20B2AA]">
                      Política de Privacidade
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
