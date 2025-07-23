'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, EyeOff, User, Mail, Lock, Chrome } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface LoginModalProps {
  children: React.ReactNode
}

export default function LoginModal({ children }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false)
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
        setIsOpen(false)
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin')
        } else {
          router.refresh()
        }
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

    if (registerForm.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
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
        const data = await response.json()
        toast.error(data.message || 'Erro ao criar conta')
      }
    } catch (error) {
      toast.error('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      toast.error('Erro ao fazer login com Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                Bem-vindo à UssBrasil
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Faça login ou crie sua conta para continuar
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {/* Custom Tab Navigation */}
            <div className="flex w-full mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'text-[#00CED1] border-b-2 border-[#00CED1]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'text-[#00CED1] border-b-2 border-[#00CED1]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {/* Animated Content Container */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* Login Form */}
                {activeTab === 'login' && (
                  <motion.div
                    key="login"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <form onSubmit={handleLogin} className="space-y-4">
                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <Label htmlFor="login-password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha"
                            className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <motion.div
                              initial={false}
                              animate={{ rotate: showPassword ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </motion.div>
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-[#00CED1] hover:bg-[#20B2AA] transition-all duration-200 transform hover:scale-[1.02]" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center"
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Entrando...
                            </motion.span>
                          ) : (
                            'Entrar'
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou continue com
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full transition-all duration-200 hover:bg-gray-50 transform hover:scale-[1.02]"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <motion.div
                    key="register"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    <form onSubmit={handleRegister} className="space-y-4">
                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <Label htmlFor="register-name">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Seu nome completo"
                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <Label htmlFor="register-password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Crie uma senha"
                            className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <motion.div
                              initial={false}
                              animate={{ rotate: showPassword ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </motion.div>
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="register-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#00CED1]/20"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <motion.div
                              initial={false}
                              animate={{ rotate: showConfirmPassword ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </motion.div>
                          </Button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-[#00CED1] hover:bg-[#20B2AA] transition-all duration-200 transform hover:scale-[1.02]" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center"
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Criando conta...
                            </motion.span>
                          ) : (
                            'Criar Conta'
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou continue com
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full transition-all duration-200 hover:bg-gray-50 transform hover:scale-[1.02]"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
