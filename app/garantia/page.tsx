'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Settings,
  FileText,
  Phone,
  MessageCircle,
  ArrowRight,
  AlertTriangle,
  Info,
  Star,
  Package,
  Wrench,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const GarantiaPage = () => {
  const warrantyTypes = [
    {
      title: 'Garantia Legal',
      period: '30-90 dias',
      description: 'Garantia prevista pelo Código de Defesa do Consumidor',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
      details: [
        'Aplicável a todos os produtos',
        'Cobre vícios aparentes e ocultos',
        '30 dias para produtos não duráveis',
        '90 dias para produtos duráveis'
      ]
    },
    {
      title: 'Garantia do Fabricante',
      period: '12-24 meses',
      description: 'Garantia oferecida pelo fabricante do produto',
      icon: Settings,
      color: 'text-green-600 bg-green-50',
      details: [
        'Varia conforme fabricante',
        'Pode ser estendida',
        'Cobre defeitos de fabricação',
        'Procedimentos específicos por marca'
      ]
    },
    {
      title: 'Garantia USS Brasil',
      period: '30 dias extras',
      description: 'Nossa garantia adicional para sua tranquilidade',
      icon: Shield,
      color: 'text-purple-600 bg-purple-50',
      details: [
        'Garantia adicional da loja',
        'Atendimento especializado',
        'Suporte técnico direto',
        'Troca rápida quando aplicável'
      ]
    }
  ]

  const warrantyProcess = [
    {
      step: 1,
      title: 'Identifique o Problema',
      description: 'Verifique se o defeito está coberto pela garantia',
      icon: AlertTriangle
    },
    {
      step: 2,
      title: 'Entre em Contato',
      description: 'Fale conosco informando o problema e número do pedido',
      icon: MessageCircle
    },
    {
      step: 3,
      title: 'Avaliação Técnica',
      description: 'Nossa equipe avalia o produto e o tipo de garantia',
      icon: Settings
    },
    {
      step: 4,
      title: 'Solução',
      description: 'Reparo, troca ou encaminhamento para assistência',
      icon: Wrench
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-uss-primary">Garantia</span> USS Brasil
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proteção completa para suas compras. Conheça nossos tipos de garantia e como utilizá-las
          </p>
        </motion.div>

        {/* Warranty Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {warrantyTypes.map((warranty, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className={`w-16 h-16 ${warranty.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <warranty.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{warranty.title}</h3>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    {warranty.period}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-6">{warranty.description}</p>
                <ul className="space-y-2">
                  {warranty.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Como Usar a Garantia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyProcess.map((step, index) => (
              <Card key={step.step} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Passo {step.step}
                  </h3>
                  <h4 className="font-medium text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <Shield className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precisa Usar a Garantia?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe especializada está pronta para ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atendimento">
                <Button size="lg" className="bg-white text-uss-primary hover:bg-gray-100">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Solicitar Garantia
                </Button>
              </Link>
              <Link href="/central-ajuda">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-uss-primary">
                  <Info className="h-5 w-5 mr-2" />
                  Saber Mais
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GarantiaPage
