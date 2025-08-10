'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Send,
  HelpCircle,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const AtendimentoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert('Mensagem enviada com sucesso! Retornaremos em breve.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      priority: 'normal'
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefone',
      value: '(11) 99999-9999',
      description: 'Seg à Sex: 8h às 18h | Sáb: 8h às 14h',
      action: 'tel:+5511999999999',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '(11) 99999-9999',
      description: 'Atendimento rápido e direto',
      action: 'https://wa.me/5511999999999',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: 'atendimento@ussbrasil.com',
      description: 'Resposta em até 24h',
      action: 'mailto:atendimento@ussbrasil.com',
      color: 'text-blue-600 bg-blue-50'
    }
  ]

  const faqItems = [
    {
      question: 'Qual o prazo de entrega?',
      answer: 'Entregamos em todo o Brasil. Para São Paulo capital, o prazo é de 1-2 dias úteis. Para outras regiões, de 3-7 dias úteis.'
    },
    {
      question: 'Como acompanhar meu pedido?',
      answer: 'Você pode acompanhar seu pedido pela página de rastreamento usando o código enviado por e-mail ou pelo nosso WhatsApp.'
    },
    {
      question: 'Posso trocar ou devolver um produto?',
      answer: 'Sim! Você tem até 30 dias para trocar ou devolver produtos sem uso, conforme nossa política de trocas.'
    },
    {
      question: 'Quais formas de pagamento aceitas?',
      answer: 'Aceitamos cartão de crédito (até 12x), cartão de débito, PIX, boleto bancário e transferência bancária.'
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-12" style={{ background: 'var(--uss-gradient-bg)' }}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'var(--uss-text-light)' }}>
            <span style={{ color: 'var(--uss-primary)' }}>Atendimento</span> USS Brasil
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--uss-text-secondary)' }}>
            Estamos aqui para ajudar! Entre em contato conosco pelos canais abaixo ou envie sua mensagem
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Formulário de Contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-0" style={{ background: 'var(--uss-bg-light)' }}>
              <CardHeader 
                className="text-white rounded-t-lg"
                style={{ background: 'var(--uss-gradient-primary)' }}
              >
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6" />
                  <span>Envie sua Mensagem</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Dados Pessoais */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                        Nome Completo *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                        E-mail *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                        Telefone/WhatsApp
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                        Prioridade
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{
                          borderColor: 'var(--uss-border)',
                          background: 'var(--uss-bg)',
                          color: 'var(--uss-text-light)',
                          '--tw-ring-color': 'var(--uss-primary)'
                        } as React.CSSProperties}
                      >
                        <option value="low">Baixa</option>
                        <option value="normal">Normal</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                      Assunto *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Resumo do seu contato"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                      Mensagem *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full"
                      placeholder="Descreva detalhadamente sua solicitação..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white py-3 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    style={{ background: 'var(--uss-gradient-primary)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar com informações */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            
            {/* Canais de Atendimento */}
            <Card className="shadow-lg border-0" style={{ background: 'var(--uss-bg-light)' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" style={{ color: 'var(--uss-primary)' }} />
                  <span style={{ color: 'var(--uss-text-light)' }}>Canais de Atendimento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    className="block p-4 rounded-lg border transition-all group hover:shadow-md"
                    style={{ 
                      borderColor: 'var(--uss-border)',
                      background: 'var(--uss-bg)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.borderColor = 'var(--uss-primary)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.borderColor = 'var(--uss-border)';
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${method.color}`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="font-semibold transition-colors"
                          style={{ color: 'var(--uss-text-light)' }}
                        >
                          {method.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: 'var(--uss-text-light)' }}>{method.value}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--uss-text-secondary)' }}>{method.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Horário de Funcionamento */}
            <Card className="shadow-lg border-0" style={{ background: 'var(--uss-bg-light)' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" style={{ color: 'var(--uss-primary)' }} />
                  <span style={{ color: 'var(--uss-text-light)' }}>Horário de Funcionamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--uss-text-secondary)' }}>Segunda à Sexta:</span>
                    <span className="font-medium" style={{ color: 'var(--uss-text-light)' }}>8h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--uss-text-secondary)' }}>Sábado:</span>
                    <span className="font-medium" style={{ color: 'var(--uss-text-light)' }}>8h às 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--uss-text-secondary)' }}>Domingo:</span>
                    <Badge variant="secondary">Fechado</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--uss-success-bg)' }}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" style={{ color: 'var(--uss-success)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--uss-success)' }}>
                      Atendimento Online 24h
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--uss-success)' }}>
                    WhatsApp e e-mail funcionam 24h por dia
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card className="shadow-lg border-0" style={{ background: 'var(--uss-bg-light)' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" style={{ color: 'var(--uss-primary)' }} />
                  <span style={{ color: 'var(--uss-text-light)' }}>Nossa Localização</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium" style={{ color: 'var(--uss-text-light)' }}>USS Brasil Tecnologia</p>
                  <p style={{ color: 'var(--uss-text-secondary)' }}>
                    Rua das Tecnologias, 123<br />
                    Vila Olimpia - São Paulo/SP<br />
                    CEP: 04552-000
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    borderColor: 'var(--uss-primary)',
                    color: 'var(--uss-primary)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-primary)';
                    target.style.color = 'var(--uss-text)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.color = 'var(--uss-primary)';
                  }}
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Ver no Mapa
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0" style={{ background: 'var(--uss-bg-light)' }}>
            <CardHeader style={{ background: 'var(--uss-surface)' }}>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-6 w-6" style={{ color: 'var(--uss-primary)' }} />
                <span style={{ color: 'var(--uss-text-light)' }}>Perguntas Frequentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border transition-colors hover:shadow-md"
                    style={{ 
                      borderColor: 'var(--uss-border)',
                      background: 'var(--uss-bg)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.borderColor = 'var(--uss-primary-alpha)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.borderColor = 'var(--uss-border)';
                    }}
                  >
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--uss-text-light)' }}>{item.question}</h3>
                    <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>{item.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    borderColor: 'var(--uss-primary)',
                    color: 'var(--uss-primary)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-primary)';
                    target.style.color = 'var(--uss-text)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.color = 'var(--uss-primary)';
                  }}
                >
                  Ver Todas as Perguntas
                </Button>
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
          <div 
            className="rounded-3xl p-8 md:p-12 text-white"
            style={{ background: 'var(--uss-gradient-primary)' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precisando de Ajuda Imediata?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe está pronta para atender você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                style={{
                  background: 'var(--uss-text)',
                  color: 'var(--uss-primary)'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'var(--uss-bg-light)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'var(--uss-text)';
                }}
                onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'white';
                  target.style.color = 'var(--uss-primary)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'transparent';
                  target.style.color = 'white';
                }}
                onClick={() => window.open('tel:+5511999999999')}
              >
                <Phone className="h-5 w-5 mr-2" />
                Ligar Agora
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AtendimentoPage
