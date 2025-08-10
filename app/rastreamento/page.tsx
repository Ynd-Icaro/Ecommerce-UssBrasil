'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  MapPin, 
  Clock, 
  Search,
  Truck,
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  MessageCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const RastreamentoPage = () => {
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackingSearch = async () => {
    if (!trackingCode.trim()) return
    
    setIsLoading(true)
    // Simular consulta
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setTrackingResult({
      code: trackingCode,
      status: 'Em trânsito',
      lastUpdate: '2024-01-15 14:30',
      destination: 'São Paulo - SP',
      events: [
        {
          date: '2024-01-15 14:30',
          status: 'Objeto saiu para entrega',
          location: 'São Paulo - SP',
          description: 'Objeto saiu para entrega ao destinatário'
        },
        {
          date: '2024-01-15 08:15',
          status: 'Objeto em trânsito',
          location: 'São Paulo - SP',
          description: 'Objeto em trânsito - por favor aguarde'
        },
        {
          date: '2024-01-14 16:45',
          status: 'Objeto postado',
          location: 'São Paulo - SP',
          description: 'Objeto postado após o horário limite da unidade'
        }
      ]
    })
    
    setIsLoading(false)
  }

  const shippingStatuses = [
    {
      status: 'Pedido Confirmado',
      description: 'Pagamento aprovado e pedido em preparação',
      icon: CheckCircle,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      status: 'Preparando Envio',
      description: 'Produto sendo separado e embalado',
      icon: Package,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      status: 'Enviado',
      description: 'Produto despachado para transportadora',
      icon: Truck,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      status: 'Em Trânsito',
      description: 'Produto a caminho do destino',
      icon: MapPin,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      status: 'Saiu para Entrega',
      description: 'Produto saiu para entrega final',
      icon: Truck,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      status: 'Entregue',
      description: 'Produto entregue com sucesso',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
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
            <span className="text-uss-primary">Rastreamento</span> de Pedidos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe seu pedido em tempo real e saiba exatamente onde ele está
          </p>
        </motion.div>

        {/* Tracking Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 max-w-2xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-6 w-6" />
                <span>Rastrear Pedido</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código de Rastreamento
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite o código do pedido ou código dos Correios"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ex: USB123456 ou BR123456789BR
                  </p>
                </div>
                <Button
                  onClick={handleTrackingSearch}
                  disabled={isLoading || !trackingCode.trim()}
                  className="w-full bg-gradient-to-r from-uss-primary to-uss-secondary hover:from-uss-primary/90 hover:to-uss-secondary/90"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Rastreando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Rastrear
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tracking Result */}
        {trackingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-6 w-6" />
                    <span>Código: {trackingResult.code}</span>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {trackingResult.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Status atual */}
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-800">Status Atual</h3>
                        <p className="text-green-700">{trackingResult.status}</p>
                        <p className="text-sm text-green-600">
                          Última atualização: {trackingResult.lastUpdate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Histórico */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Rastreamento</h3>
                    <div className="space-y-4">
                      {trackingResult.events.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-3 h-3 bg-uss-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900">{event.status}</h4>
                              <span className="text-sm text-gray-500">{event.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                            <p className="text-xs text-gray-500">{event.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(trackingResult.code)
                        alert('Código copiado!')
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Código
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://correios.com.br', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Rastrear nos Correios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Shipping Status Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Status de Entrega
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shippingStatuses.map((status, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${status.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <status.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{status.status}</h3>
                  <p className="text-sm text-gray-600">{status.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-uss-primary" />
                <span>Dúvidas sobre Entrega?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Precisa de ajuda com seu pedido? Nossa equipe está pronta para esclarecer qualquer dúvida.
              </p>
              <div className="space-y-3">
                <Link href="/atendimento">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </Link>
                <Link href="/atendimento">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Telefone
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-uss-primary" />
                <span>Prazos de Entrega</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">São Paulo Capital:</span>
                  <span className="font-medium">1-2 dias úteis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Região Metropolitana:</span>
                  <span className="font-medium">2-3 dias úteis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interior SP:</span>
                  <span className="font-medium">3-5 dias úteis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outros Estados:</span>
                  <span className="font-medium">5-7 dias úteis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <Package className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Não Conseguiu Rastrear?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato conosco para ajuda personalizada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atendimento">
                <Button size="lg" className="bg-white text-uss-primary hover:bg-gray-100">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Falar Conosco
                </Button>
              </Link>
              <Link href="/central-ajuda">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-uss-primary">
                  <Info className="h-5 w-5 mr-2" />
                  Central de Ajuda
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RastreamentoPage
