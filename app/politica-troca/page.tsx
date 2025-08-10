'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  RefreshCw, 
  Clock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Package,
  Truck,
  CreditCard,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  MapPin,
  User,
  Mail,
  Camera,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PoliticaTrocaPage = () => {
  const [activeTab, setActiveTab] = useState('policy')

  const exchangeReasons = [
    {
      title: 'Produto com Defeito',
      description: 'Defeito de fabricação ou produto danificado',
      period: '90 dias',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50'
    },
    {
      title: 'Produto Errado',
      description: 'Recebeu produto diferente do pedido',
      period: '30 dias',
      icon: Package,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Não Gostou',
      description: 'Mudou de ideia ou não atendeu expectativas',
      period: '7 dias',
      icon: RefreshCw,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Incompatibilidade',
      description: 'Produto não é compatível com seu equipamento',
      period: '15 dias',
      icon: Shield,
      color: 'text-purple-600 bg-purple-50'
    }
  ]

  const stepsByStep = [
    {
      step: 1,
      title: 'Entre em Contato',
      description: 'Informe o motivo da troca e envie fotos do produto',
      details: [
        'Acesse nossa página de atendimento',
        'Informe o número do pedido',
        'Descreva o motivo da troca',
        'Envie fotos do produto e embalagem'
      ]
    },
    {
      step: 2,
      title: 'Autorização',
      description: 'Aguarde nossa análise e autorização',
      details: [
        'Analisamos sua solicitação em até 24h',
        'Enviamos autorização por e-mail',
        'Fornecemos código de postagem',
        'Orientamos sobre a embalagem'
      ]
    },
    {
      step: 3,
      title: 'Envio do Produto',
      description: 'Embale o produto e envie para nosso centro de distribuição',
      details: [
        'Use a embalagem original sempre que possível',
        'Inclua todos os acessórios e manuais',
        'Cole a etiqueta de postagem fornecida',
        'Poste nos Correios ou agende coleta'
      ]
    },
    {
      step: 4,
      title: 'Processamento',
      description: 'Recebemos e analisamos o produto',
      details: [
        'Confirmamos o recebimento por e-mail',
        'Analisamos o estado do produto',
        'Processamos a troca ou reembolso',
        'Enviamos confirmação do processamento'
      ]
    },
    {
      step: 5,
      title: 'Finalização',
      description: 'Receba o novo produto ou reembolso',
      details: [
        'Novo produto enviado em até 2 dias úteis',
        'Reembolso processado em até 5 dias úteis',
        'Código de rastreamento enviado por e-mail',
        'Acompanhe o status na sua conta'
      ]
    }
  ]

  const conditions = [
    {
      title: 'Produto em Estado Original',
      description: 'Sem sinais de uso, riscos ou danos causados pelo cliente',
      icon: CheckCircle,
      valid: true
    },
    {
      title: 'Embalagem Original',
      description: 'Na embalagem original ou embalagem adequada para proteção',
      icon: Package,
      valid: true
    },
    {
      title: 'Acessórios Completos',
      description: 'Todos os acessórios, manuais e brindes inclusos',
      icon: Shield,
      valid: true
    },
    {
      title: 'Dentro do Prazo',
      description: 'Solicitação feita dentro do prazo específico para cada caso',
      icon: Clock,
      valid: true
    }
  ]

  const invalidConditions = [
    {
      title: 'Produtos Personalizados',
      description: 'Itens feitos sob medida ou personalizados especialmente',
      icon: User,
      valid: false
    },
    {
      title: 'Produtos Consumidos',
      description: 'Itens que foram utilizados completamente ou consumidos',
      icon: Package,
      valid: false
    },
    {
      title: 'Danos pelo Cliente',
      description: 'Produtos danificados por mau uso ou acidentes',
      icon: AlertTriangle,
      valid: false
    },
    {
      title: 'Fora do Prazo',
      description: 'Solicitações feitas após o prazo estabelecido',
      icon: Clock,
      valid: false
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
            <span className="text-uss-primary">Política</span> de Trocas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sua tranquilidade é nossa prioridade. Conheça nossos prazos e condições para trocas e devoluções
          </p>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {exchangeReasons.map((reason, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${reason.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <reason.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{reason.description}</p>
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  Até {reason.period}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="policy" className="p-3">
                <Shield className="h-4 w-4 mr-2" />
                Política Geral
              </TabsTrigger>
              <TabsTrigger value="process" className="p-3">
                <RefreshCw className="h-4 w-4 mr-2" />
                Processo de Troca
              </TabsTrigger>
              <TabsTrigger value="conditions" className="p-3">
                <CheckCircle className="h-4 w-4 mr-2" />
                Condições
              </TabsTrigger>
              <TabsTrigger value="contact" className="p-3">
                <MessageCircle className="h-4 w-4 mr-2" />
                Como Solicitar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="policy">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-6 w-6" />
                    <span>Política Geral de Trocas e Devoluções</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Nosso Compromisso</h3>
                        <p className="text-gray-600 mb-4">
                          Na USS Brasil, acreditamos que você deve ficar completamente satisfeito com sua compra. 
                          Por isso, oferecemos uma política flexível de trocas e devoluções.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Entendemos que às vezes um produto pode não atender suas expectativas ou pode apresentar 
                          defeitos. Nossa equipe está sempre pronta para resolver essas situações de forma rápida e justa.
                        </p>
                        
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Direitos do Consumidor</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>7 dias para desistência da compra (CDC)</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>30 dias para vícios aparentes</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>90 dias para vícios ocultos</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Garantia legal + garantia do fabricante</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Prazos de Troca</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                            <h4 className="font-semibold text-green-800 mb-1">Produto com Defeito</h4>
                            <p className="text-sm text-green-700">Até 90 dias da compra</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <h4 className="font-semibold text-blue-800 mb-1">Produto Errado/Incompatível</h4>
                            <p className="text-sm text-blue-700">Até 30 dias da compra</p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                            <h4 className="font-semibold text-purple-800 mb-1">Desistência da Compra</h4>
                            <p className="text-sm text-purple-700">Até 7 dias da compra</p>
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Formas de Resolução</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start space-x-2">
                            <Package className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>Troca por produto igual</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <RefreshCw className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Troca por produto similar</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CreditCard className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Reembolso integral</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Shield className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>Reparo ou assistência técnica</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <RefreshCw className="h-6 w-6" />
                    <span>Processo de Troca Passo a Passo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {stepsByStep.map((step, index) => (
                      <div key={step.step} className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-full flex items-center justify-center text-white font-bold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-uss-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800">Processo Simplificado</h3>
                    </div>
                    <p className="text-green-700">
                      Todo o processo é acompanhado por nossa equipe especializada. Você receberá atualizações 
                      por e-mail e SMS a cada etapa, garantindo total transparência.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conditions">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span>Condições para Troca e Devolução</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Condições Válidas */}
                    <div>
                      <h3 className="text-xl font-semibold text-green-800 mb-6 flex items-center">
                        <CheckCircle className="h-6 w-6 mr-2" />
                        Condições Aceitas
                      </h3>
                      <div className="space-y-4">
                        {conditions.map((condition, index) => (
                          <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start space-x-3">
                              <condition.icon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-green-800 mb-1">{condition.title}</h4>
                                <p className="text-sm text-green-700">{condition.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Condições Inválidas */}
                    <div>
                      <h3 className="text-xl font-semibold text-red-800 mb-6 flex items-center">
                        <AlertTriangle className="h-6 w-6 mr-2" />
                        Condições Não Aceitas
                      </h3>
                      <div className="space-y-4">
                        {invalidConditions.map((condition, index) => (
                          <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-start space-x-3">
                              <condition.icon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-red-800 mb-1">{condition.title}</h4>
                                <p className="text-sm text-red-700">{condition.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Info className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-800">Importante</h3>
                    </div>
                    <p className="text-blue-700">
                      Cada caso é analisado individualmente por nossa equipe. Em situações específicas, 
                      podemos aceitar trocas mesmo fora das condições padrão. Entre em contato conosco 
                      para discutir seu caso particular.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-6 w-6" />
                    <span>Como Solicitar uma Troca</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Canais de Contato */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Canais Disponíveis</h3>
                      <div className="space-y-4">
                        <Link href="/atendimento">
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-uss-primary hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                <MessageCircle className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-uss-primary transition-colors">WhatsApp</h4>
                                <p className="text-sm text-gray-600">Resposta em poucos minutos</p>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link href="/atendimento">
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-uss-primary hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <Phone className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-uss-primary transition-colors">Telefone</h4>
                                <p className="text-sm text-gray-600">Seg à Sex: 8h às 18h</p>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <Link href="/atendimento">
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-uss-primary hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <Mail className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-uss-primary transition-colors">E-mail</h4>
                                <p className="text-sm text-gray-600">Resposta em até 24h</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Documentos Necessários */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Informações Necessárias</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-600" />
                            Dados do Pedido
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Número do pedido</li>
                            <li>• Data da compra</li>
                            <li>• Produto(s) para troca</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Camera className="h-5 w-5 mr-2 text-gray-600" />
                            Fotos do Produto
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Produto completo</li>
                            <li>• Embalagem original</li>
                            <li>• Defeito (se aplicável)</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <User className="h-5 w-5 mr-2 text-gray-600" />
                            Seus Dados
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Nome completo</li>
                            <li>• E-mail de contato</li>
                            <li>• Telefone/WhatsApp</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/atendimento">
                      <Button size="lg" className="bg-gradient-to-r from-uss-primary to-uss-secondary hover:from-uss-primary/90 hover:to-uss-secondary/90">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Solicitar Troca Agora
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <RefreshCw className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precisa Fazer uma Troca?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está pronta para ajudar você de forma rápida e eficiente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atendimento">
                <Button
                  size="lg"
                  className="bg-white text-uss-primary hover:bg-gray-100"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Falar Conosco
                </Button>
              </Link>
              <Link href="/central-ajuda">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-uss-primary"
                >
                  <Info className="h-5 w-5 mr-2" />
                  Ver Mais Dúvidas
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PoliticaTrocaPage
