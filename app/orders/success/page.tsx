'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MessageCircle,
  ArrowLeft,
  Download,
  Star
} from 'lucide-react'

export default function OrderSuccessPage() {
  const orderNumber = `USS${Date.now().toString().slice(-6)}`
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pedido realizado com sucesso!
          </h1>
          <p className="text-lg text-gray-600">
            Seu pedido #{orderNumber} foi confirmado e está sendo processado.
          </p>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Acompanhe seu pedido
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pedido confirmado</p>
                    <p className="text-sm text-gray-500">Agora mesmo</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Preparando pedido</p>
                    <p className="text-sm text-gray-500">Em até 1 dia útil</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-300 rounded-full p-2">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-500">Produto enviado</p>
                    <p className="text-sm text-gray-500">Em até 3 dias úteis</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-300 rounded-full p-2">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-500">Produto entregue</p>
                    <p className="text-sm text-gray-500">Em até 7 dias úteis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Link href="/orders">
            <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1">
              <Package className="h-5 w-5" />
              <span className="text-sm">Meus Pedidos</span>
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1">
            <Download className="h-5 w-5" />
            <span className="text-sm">Baixar Nota</span>
          </Button>
          
          <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">Suporte</span>
          </Button>
          
          <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1">
            <Star className="h-5 w-5" />
            <span className="text-sm">Avaliar</span>
          </Button>
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center space-y-4"
        >
          <p className="text-gray-600">
            Obrigado por comprar conosco! Que tal continuar explorando nossos produtos?
          </p>
          <div className="space-x-4">
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Continuar Comprando
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-gray-600 mb-4">
                Receba ofertas exclusivas e seja o primeiro a saber sobre novos produtos.
              </p>
              <div className="flex max-w-md mx-auto space-x-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Assinar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
