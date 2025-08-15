'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  StarIcon,
  ShieldCheckIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'

interface PaymentMethod {
  id: string
  type: 'credit' | 'debit' | 'pix' | 'bank'
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  brand?: 'visa' | 'mastercard' | 'amex' | 'elo'
  isDefault: boolean
  nickname: string
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'João Silva',
    expiryDate: '12/26',
    brand: 'visa',
    isDefault: true,
    nickname: 'Cartão Principal'
  },
  {
    id: '2',
    type: 'credit',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'João Silva',
    expiryDate: '08/25',
    brand: 'mastercard',
    isDefault: false,
    nickname: 'Cartão Secundário'
  },
  {
    id: '3',
    type: 'pix',
    isDefault: false,
    nickname: 'PIX'
  }
]

const cardBrands = {
  visa: {
    name: 'Visa',
    color: 'bg-blue-600',
    textColor: 'text-white'
  },
  mastercard: {
    name: 'Mastercard',
    color: 'bg-red-600',
    textColor: 'text-white'
  },
  amex: {
    name: 'American Express',
    color: 'bg-green-600',
    textColor: 'text-white'
  },
  elo: {
    name: 'Elo',
    color: 'bg-yellow-600',
    textColor: 'text-white'
  }
}

const paymentTypes = {
  credit: {
    label: 'Cartão de Crédito',
    icon: CreditCardIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  debit: {
    label: 'Cartão de Débito',
    icon: CreditCardIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  pix: {
    label: 'PIX',
    icon: BanknotesIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  bank: {
    label: 'Transferência Bancária',
    icon: BanknotesIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    )
  }

  const handleDelete = (methodId: string) => {
    if (confirm('Tem certeza que deseja excluir este método de pagamento?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== methodId))
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/perfil"
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1ea7ff] to-[#00CED1] rounded-lg flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Cartões e Pagamento</h1>
                  <p className="text-gray-600">Métodos de pagamento salvos</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#1ea7ff] text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Novo Método</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Seus dados estão seguros</h3>
                <p className="text-sm text-green-700">
                  Todas as informações de pagamento são criptografadas e protegidas por SSL.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method, index) => {
            const typeInfo = paymentTypes[method.type]
            const TypeIcon = typeInfo.icon

            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {method.type === 'credit' || method.type === 'debit' ? (
                  // Credit/Debit Card Layout
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-10 ${method.brand ? cardBrands[method.brand].color : 'bg-gray-400'} rounded-lg flex items-center justify-center`}>
                          <span className={`text-xs font-bold ${method.brand ? cardBrands[method.brand].textColor : 'text-white'}`}>
                            {method.brand ? cardBrands[method.brand].name.toUpperCase() : 'CARD'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{method.nickname}</span>
                            {method.isDefault && (
                              <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                <StarIcon className="w-3 h-3" />
                                <span>Padrão</span>
                              </div>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method.cardNumber} • {method.expiryDate}
                          </p>
                          <p className="text-xs text-gray-500">
                            {method.cardHolder}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#1ea7ff] hover:bg-blue-50 rounded-lg transition-colors">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeInfo.bgColor} ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="px-4 py-2 text-[#1ea7ff] hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                        >
                          Definir como Padrão
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  // PIX/Bank Layout
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${typeInfo.bgColor} rounded-lg flex items-center justify-center`}>
                          <TypeIcon className={`w-6 h-6 ${typeInfo.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{method.nickname}</span>
                            {method.isDefault && (
                              <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                <StarIcon className="w-3 h-3" />
                                <span>Padrão</span>
                              </div>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{typeInfo.label}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeInfo.bgColor} ${typeInfo.color}`}>
                        Pagamento Instantâneo
                      </span>
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="px-4 py-2 text-[#1ea7ff] hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                        >
                          Definir como Padrão
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {paymentMethods.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <CreditCardIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum método de pagamento
            </h3>
            <p className="text-gray-600 mb-6">
              Adicione um cartão ou método de pagamento para facilitar suas compras.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-6 py-3 bg-[#1ea7ff] text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Adicionar Método de Pagamento
            </button>
          </motion.div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Novo Método de Pagamento
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Pagamento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent">
                    <option value="credit">Cartão de Crédito</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ea7ff] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#1ea7ff] text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
