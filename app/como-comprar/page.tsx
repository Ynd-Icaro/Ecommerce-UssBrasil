'use client'

import { useState } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Users,
  Package,
  Heart,
  Eye,
  Filter,
  Plus,
  Minus,
  MapPin,
  Lock,
  Smartphone,
  Monitor,
  MousePointer,
  RefreshCw,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ComoComprarPage = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 1,
      title: 'Escolha seus Produtos',
      description: 'Navegue pelo nosso catálogo e encontre os melhores produtos',
      icon: Search,
      details: [
        'Use a barra de busca para encontrar produtos específicos',
        'Navegue pelas categorias organizadas por marca e tipo',
        'Utilize os filtros para refinar sua busca por preço, marca e características',
        'Veja as avaliações e fotos de outros clientes',
        'Confira as especificações técnicas detalhadas'
      ],
      tips: [
        'Use palavras-chave específicas na busca para resultados mais precisos',
        'Aproveite as promoções destacadas na página inicial',
        'Adicione produtos à lista de desejos para comprar depois'
      ]
    },
    {
      id: 2,
      title: 'Adicione ao Carrinho',
      description: 'Selecione quantidade e adicione os produtos desejados',
      icon: ShoppingCart,
      details: [
        'Escolha a quantidade desejada de cada produto',
        'Verifique se o produto está disponível em estoque',
        'Confira as opções de cor e modelo disponíveis',
        'Veja o resumo do carrinho com valores atualizados',
        'Calcule o frete para sua região antes de finalizar'
      ],
      tips: [
        'Aproveite para comprar mais itens e conseguir frete grátis',
        'Verifique se há cupons de desconto disponíveis',
        'Confira produtos relacionados que podem interessar'
      ]
    },
    {
      id: 3,
      title: 'Faça seu Cadastro',
      description: 'Crie sua conta ou faça login para continuar',
      icon: Users,
      details: [
        'Preencha seus dados pessoais completos',
        'Adicione seu endereço de entrega principal',
        'Confirme seu e-mail e telefone para contato',
        'Escolha uma senha segura para sua conta',
        'Aceite os termos de uso e política de privacidade'
      ],
      tips: [
        'Use um e-mail que você acessa frequentemente',
        'Mantenha seus dados sempre atualizados',
        'Salve endereços alternativos para facilitar futuras compras'
      ]
    },
    {
      id: 4,
      title: 'Escolha o Pagamento',
      description: 'Selecione a forma de pagamento que preferir',
      icon: CreditCard,
      details: [
        'Cartão de crédito (Visa, Mastercard, Elo) em até 12x sem juros',
        'Cartão de débito com desconto à vista',
        'PIX com desconto especial e aprovação instantânea',
        'Boleto bancário com prazo de até 3 dias para pagamento',
        'Transferência bancária para pedidos corporativos'
      ],
      tips: [
        'PIX oferece desconto e liberação imediata do pedido',
        'Cartão de crédito permite parcelamento sem juros',
        'Verifique se há promoções para pagamento à vista'
      ]
    },
    {
      id: 5,
      title: 'Confirme seu Pedido',
      description: 'Revise todos os dados antes de finalizar',
      icon: CheckCircle,
      details: [
        'Confira todos os produtos no carrinho',
        'Verifique o endereço de entrega selecionado',
        'Confirme a forma de pagamento escolhida',
        'Revise o valor total incluindo frete',
        'Clique em "Finalizar Pedido" para confirmar'
      ],
      tips: [
        'Anote o número do pedido para acompanhamento',
        'Salve o comprovante que será enviado por e-mail',
        'Acompanhe o status do pedido na sua conta'
      ]
    },
    {
      id: 6,
      title: 'Acompanhe a Entrega',
      description: 'Receba atualizações e acompanhe seu pedido',
      icon: Truck,
      details: [
        'Receba confirmação por e-mail e SMS',
        'Acompanhe o status em tempo real no site',
        'Use o código de rastreamento dos Correios',
        'Receba notificação quando sair para entrega',
        'Confirme o recebimento após a entrega'
      ],
      tips: [
        'Mantenha seu telefone disponível no dia da entrega',
        'Confira se há alguém no endereço para receber',
        'Guarde a nota fiscal que acompanha o produto'
      ]
    }
  ]

  const paymentMethods = [
    {
      name: 'PIX',
      description: 'Desconto especial e aprovação instantânea',
      discount: '5%',
      icon: Smartphone,
      color: 'text-green-600 bg-green-50'
    },
    {
      name: 'Cartão de Crédito',
      description: 'Parcelamento em até 12x sem juros',
      discount: '12x',
      icon: CreditCard,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      name: 'Cartão de Débito',
      description: 'Desconto à vista no débito',
      discount: '3%',
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      name: 'Boleto',
      description: 'Prazo de 3 dias úteis para pagamento',
      discount: '2%',
      icon: FileText,
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Compra 100% Segura',
      description: 'Site protegido com certificado SSL e criptografia avançada'
    },
    {
      icon: RefreshCw,
      title: 'Troca Garantida',
      description: 'Até 30 dias para trocar produtos sem uso'
    },
    {
      icon: Truck,
      title: 'Frete Grátis',
      description: 'Para pedidos acima de R$ 299 em todo o Brasil'
    },
    {
      icon: Clock,
      title: 'Entrega Rápida',
      description: 'Produtos em estoque enviados em até 24h'
    }
  ]

  const faqs = [
    {
      question: 'Posso alterar meu pedido após a compra?',
      answer: 'Sim, você pode alterar seu pedido em até 2 horas após a confirmação, desde que ainda não tenha sido enviado. Entre em contato conosco o quanto antes.'
    },
    {
      question: 'Como funciona o parcelamento?',
      answer: 'Oferecemos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 100. O valor mínimo da parcela é R$ 30.'
    },
    {
      question: 'Quanto tempo demora para processar o pedido?',
      answer: 'Pedidos pagos via PIX são processados instantaneamente. Cartão de crédito em até 2 horas. Boleto após confirmação do pagamento.'
    },
    {
      question: 'Posso retirar na loja?',
      answer: 'Sim! Você pode escolher retirar na nossa loja em São Paulo. O produto fica disponível em até 24h após a confirmação do pagamento.'
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
            <span className="text-uss-primary">Como Comprar</span> na USS Brasil
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seu guia completo para uma experiência de compra simples e segura
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Step by Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Passo a Passo para Comprar
          </h2>
          
          {/* Steps Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {steps.map((step, index) => (
              <Button
                key={step.id}
                variant={activeStep === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveStep(index)}
                className={`transition-all ${
                  activeStep === index 
                    ? 'bg-uss-primary text-white' 
                    : 'hover:border-uss-primary hover:text-uss-primary'
                }`}
              >
                <step.icon className="h-4 w-4 mr-2" />
                Passo {step.id}
              </Button>
            ))}
          </div>

          {/* Active Step Content */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {React.createElement(steps[activeStep].icon, { className: "h-6 w-6" })}
                </div>
                <div>
                  <div className="text-sm opacity-90">Passo {steps[activeStep].id}</div>
                  <div className="text-xl font-bold">{steps[activeStep].title}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-600 mb-6">{steps[activeStep].description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    O que fazer:
                  </h4>
                  <ul className="space-y-3">
                    {steps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-uss-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-uss-primary rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    Dicas importantes:
                  </h4>
                  <div className="space-y-3">
                    {steps[activeStep].tips.map((tip, index) => (
                      <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                >
                  Passo Anterior
                </Button>
                <Button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="bg-uss-primary hover:bg-uss-primary/90"
                >
                  Próximo Passo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Formas de Pagamento
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{method.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    {method.discount.includes('%') ? `${method.discount} desconto` : `${method.discount} sem juros`}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Demo/Tutorial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-6 w-6" />
                <span>Veja Como é Fácil Comprar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Busque</h3>
                  <p className="text-sm text-gray-600">
                    Use nossa busca inteligente ou navegue pelas categorias
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MousePointer className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Clique</h3>
                  <p className="text-sm text-gray-600">
                    Adicione ao carrinho e prossiga para o checkout
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Receba</h3>
                  <p className="text-sm text-gray-600">
                    Acompanhe a entrega e receba em casa com segurança
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/produtos">
                  <Button size="lg" className="bg-gradient-to-r from-uss-primary to-uss-secondary hover:from-uss-primary/90 hover:to-uss-secondary/90">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Começar a Comprar Agora
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-start">
                    <div className="w-6 h-6 bg-uss-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-uss-primary rounded-full"></div>
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-9">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/central-ajuda">
              <Button variant="outline" className="border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white">
                Ver Mais Perguntas
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Fazer sua Primeira Compra?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Navegue por nosso catálogo e descubra as melhores ofertas em tecnologia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produtos">
                <Button
                  size="lg"
                  className="bg-white text-uss-primary hover:bg-gray-100"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/atendimento">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-uss-primary"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComoComprarPage
