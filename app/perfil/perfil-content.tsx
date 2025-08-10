"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  User, Heart, ShoppingBag, Package, Settings, LogOut, 
  Edit, Camera, Mail, Phone, MapPin, Calendar,
  ArrowRight, CreditCard, Shield, Bell, Home, Plus, Trash2, CheckCircle, Truck, Box, CheckSquare, Clock
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PerfilPage() {
  const searchParams = useSearchParams()
  const { user, logout, favorites, orders, addresses, paymentMethods,
    addAddress, removeAddress, setDefaultAddress,
    addPaymentMethod, removePaymentMethod, setDefaultPayment,
    updateOrderStatus } = useAuth()
  const { cartItems, cartTotal } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [addressForm, setAddressForm] = useState({ label: '', street: '', number: '', city: '', state: '', zip: '' })
  const [paymentForm, setPaymentForm] = useState({ brand: 'VISA', last4: '', holder: '', exp: '' })
  const [addingAddress, setAddingAddress] = useState(false)
  const [addingPayment, setAddingPayment] = useState(false)

  // Ler parâmetro da URL para definir aba ativa
  useEffect(() => {
    const tab = searchParams.get('tab')
  if (tab && ['overview', 'orders', 'favorites', 'settings', 'addresses', 'payments'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-uss-primary-50 to-uss-secondary-50 dark:from-uss-gray-800 dark:to-uss-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
            >
              <User className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-uss-gray-800 dark:text-white mb-4">
                Acesso necessário
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Faça login para acessar seu perfil
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-uss-primary to-uss-secondary text-white px-8 py-3 rounded-lg font-semibold hover:from-uss-primary-dark hover:to-uss-secondary-dark transition-all"
              >
                Explorar Produtos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    toast.success('Logout realizado com sucesso')
    router.push('/')
  }

  const stats = [
    {
      title: 'Favoritos',
      value: favorites.length,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      href: '/favoritos'
    },
    {
      title: 'Carrinho',
      value: cartItems.length,
      icon: ShoppingBag,
      color: 'text-uss-primary',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      href: '/carrinho'
    },
    {
      title: 'Pedidos',
      value: orders.length,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      href: '/pedidos'
    }
  ]

  const menuItems = [
    { id: 'overview', title: 'Visão Geral', icon: User },
    { id: 'orders', title: 'Pedidos', icon: Package },
    { id: 'favorites', title: 'Favoritos', icon: Heart },
    { id: 'addresses', title: 'Endereços', icon: Home },
    { id: 'payments', title: 'Pagamentos', icon: CreditCard },
    { id: 'settings', title: 'Configurações', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-uss-primary-50 to-uss-secondary-50 dark:from-uss-gray-800 dark:to-uss-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-uss-primary to-uss-secondary p-6 text-white">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                  <button className="absolute top-0 right-0 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-center mb-1">{user.name}</h2>
                <p className="text-blue-100 text-center text-sm">{user.email}</p>
              </div>

              {/* Navigation */}
              <div className="p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </button>
                  ))}
                </nav>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-6"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Bem-vindo de volta, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Aqui está um resumo da sua conta USS Brasil
                  </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  {stats.map((stat) => (
                    <Link
                      key={stat.title}
                      href={stat.href}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Ações Rápidas
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      href="/carrinho"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Finalizar Compra</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cartItems.length > 0 ? `R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Carrinho vazio'}
                        </p>
                      </div>
                    </Link>
                    <Link
                      href="/favoritos"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-pink-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Meus Favoritos</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Informações da Conta
                    </h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Editar
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Membro desde</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pedidos</h2>
                  <p className="text-xs text-gray-500">Simulação de fluxo: pendente → confirmado → enviado → entregue</p>
                </div>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Você ainda não fez nenhum pedido</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => {
                      const steps = [
                        { id: 'pending', label: 'Pendente', icon: Clock },
                        { id: 'confirmed', label: 'Confirmado', icon: CheckCircle },
                        { id: 'shipped', label: 'Enviado', icon: Truck },
                        { id: 'delivered', label: 'Entregue', icon: Box }
                      ] as const
                      const currentIndex = steps.findIndex(s => s.id === order.status)
                      return (
                        <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Pedido #{order.id.slice(0,8)}</h3>
                            <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            {steps.map((step, idx) => (
                              <div key={step.id} className="flex-1 flex flex-col items-center">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-bold mb-1 ${idx <= currentIndex ? 'bg-uss-primary' : 'bg-gray-300 dark:bg-gray-600'}`}> 
                                  <step.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-[10px] tracking-wide ${idx <= currentIndex ? 'text-uss-primary' : 'text-gray-400'}`}>{step.label}</span>
                                {idx < steps.length -1 && (
                                  <div className={`h-0.5 w-full -mt-4 ${idx < currentIndex ? 'bg-uss-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-blue-600">R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            {order.status !== 'delivered' && (
                              <button onClick={() => {
                                const next = steps[currentIndex + 1]
                                if (next) updateOrderStatus(order.id, next.id)
                              }} className="text-xs px-3 py-2 rounded-lg bg-uss-primary text-white hover:bg-uss-secondary transition">
                                Avançar Status
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Endereços</h2>
                    <button onClick={() => setAddingAddress(a => !a)} className="text-sm flex items-center gap-2 text-uss-primary hover:text-uss-secondary">
                      <Plus className="w-4 h-4"/> {addingAddress ? 'Cancelar' : 'Adicionar'}
                    </button>
                  </div>
                  {addingAddress && (
                    <div className="mb-6 border border-dashed rounded-xl p-4 space-y-3 bg-gray-50 dark:bg-gray-700/30">
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Etiqueta (Casa)" className="input" value={addressForm.label} onChange={e=>setAddressForm(f=>({...f,label:e.target.value}))}/>
                        <input placeholder="Rua" className="input" value={addressForm.street} onChange={e=>setAddressForm(f=>({...f,street:e.target.value}))}/>
                        <input placeholder="Número" className="input" value={addressForm.number} onChange={e=>setAddressForm(f=>({...f,number:e.target.value}))}/>
                        <input placeholder="Cidade" className="input" value={addressForm.city} onChange={e=>setAddressForm(f=>({...f,city:e.target.value}))}/>
                        <input placeholder="Estado" className="input" value={addressForm.state} onChange={e=>setAddressForm(f=>({...f,state:e.target.value}))}/>
                        <input placeholder="CEP" className="input" value={addressForm.zip} onChange={e=>setAddressForm(f=>({...f,zip:e.target.value}))}/>
                      </div>
                      <button onClick={()=>{
                        if(!addressForm.street || !addressForm.city) return
                        addAddress({ ...addressForm, city: addressForm.city, state: addressForm.state, zip: addressForm.zip, label: addressForm.label || 'Endereço', street: addressForm.street })
                        setAddressForm({ label:'', street:'', number:'', city:'', state:'', zip:'' })
                        setAddingAddress(false)
                      }} className="px-4 py-2 rounded-lg bg-uss-primary text-white text-xs font-medium">Salvar Endereço</button>
                    </div>
                  )}
                  {addresses.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum endereço cadastrado.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map(addr => (
                        <div key={addr.id} className={`rounded-xl border p-4 text-sm relative ${addr.default ? 'border-uss-primary' : 'border-gray-200 dark:border-gray-700'}`}> 
                          {addr.default && <span className="absolute top-2 right-2 text-[10px] bg-uss-primary text-white px-2 py-0.5 rounded-full">Padrão</span>}
                          <p className="font-semibold text-gray-800 dark:text-white mb-1">{addr.label}</p>
                          <p className="text-gray-600 dark:text-gray-400 leading-snug">{addr.street}, {addr.number} <br/> {addr.city} - {addr.state} <br/> CEP: {addr.zip}</p>
                          <div className="flex items-center gap-2 mt-3">
                            {!addr.default && (
                              <button onClick={()=>setDefaultAddress(addr.id)} className="text-[10px] px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-uss-primary hover:text-white transition">Padrão</button>
                            )}
                            <button onClick={()=>removeAddress(addr.id)} className="text-[10px] px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1"><Trash2 className="w-3 h-3"/>Excluir</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Formas de Pagamento</h2>
                    <button onClick={() => setAddingPayment(p => !p)} className="text-sm flex items-center gap-2 text-uss-primary hover:text-uss-secondary"><Plus className="w-4 h-4"/> {addingPayment ? 'Cancelar' : 'Adicionar'}</button>
                  </div>
                  {addingPayment && (
                    <div className="mb-6 border border-dashed rounded-xl p-4 space-y-3 bg-gray-50 dark:bg-gray-700/30">
                      <div className="grid grid-cols-2 gap-3">
                        <select className="input" value={paymentForm.brand} onChange={e=>setPaymentForm(f=>({...f, brand:e.target.value}))}>
                          <option>VISA</option><option>MASTERCARD</option><option>AMEX</option><option>PIX</option><option>BOLETO</option>
                        </select>
                        <input placeholder="Últimos 4" maxLength={4} className="input" value={paymentForm.last4} onChange={e=>setPaymentForm(f=>({...f,last4:e.target.value.replace(/[^0-9]/g,'')}))}/>
                        <input placeholder="Titular" className="input col-span-2" value={paymentForm.holder} onChange={e=>setPaymentForm(f=>({...f,holder:e.target.value}))}/>
                        <input placeholder="Validade (MM/AA)" className="input" value={paymentForm.exp} onChange={e=>setPaymentForm(f=>({...f,exp:e.target.value}))}/>
                      </div>
                      <button onClick={()=>{
                        if(!paymentForm.last4 || paymentForm.last4.length<3) return
                        addPaymentMethod({ ...paymentForm, type: paymentForm.brand === 'PIX' ? 'pix' : paymentForm.brand === 'BOLETO' ? 'boleto' : 'card' })
                        setPaymentForm({ brand:'VISA', last4:'', holder:'', exp:'' })
                        setAddingPayment(false)
                      }} className="px-4 py-2 rounded-lg bg-uss-primary text-white text-xs font-medium">Salvar Método</button>
                    </div>
                  )}
                  {paymentMethods.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum método de pagamento cadastrado.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {paymentMethods.map(pm => (
                        <div key={pm.id} className={`rounded-xl border p-4 text-sm relative ${pm.default ? 'border-uss-primary' : 'border-gray-200 dark:border-gray-700'}`}>
                          {pm.default && <span className="absolute top-2 right-2 text-[10px] bg-uss-primary text-white px-2 py-0.5 rounded-full">Padrão</span>}
                          <p className="font-semibold text-gray-800 dark:text-white mb-1">{pm.type === 'card' ? `${pm.brand} •••• ${pm.last4}` : pm.type === 'pix' ? 'Chave PIX' : 'Boleto'}</p>
                          <p className="text-gray-600 dark:text-gray-400 leading-snug">Titular: {pm.holder || '—'}<br/>Exp: {pm.exp || '—'}</p>
                          <div className="flex items-center gap-2 mt-3">
                            {!pm.default && (
                              <button onClick={()=>setDefaultPayment(pm.id)} className="text-[10px] px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-uss-primary hover:text-white transition">Padrão</button>
                            )}
                            <button onClick={()=>removePaymentMethod(pm.id)} className="text-[10px] px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1"><Trash2 className="w-3 h-3"/>Excluir</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Meus Favoritos
                  </h2>
                  <Link
                    href="/favoritos"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ver todos
                  </Link>
                </div>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Você ainda não tem produtos favoritos
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Você tem {favorites.length} {favorites.length === 1 ? 'produto' : 'produtos'} favoritos.
                    <Link href="/favoritos" className="text-blue-600 hover:text-blue-700 ml-1">
                      Ver lista completa →
                    </Link>
                  </p>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Configurações da Conta
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Notificações</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações por email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Autenticação de dois fatores</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Adicionar uma camada extra de segurança</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
