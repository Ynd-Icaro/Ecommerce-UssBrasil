'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Headphones,
  User,
  Building2,
  Globe
} from 'lucide-react'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria o envio do formulário
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contatos = [
    {
      icon: <Phone className="h-6 w-6" />,
      titulo: 'Telefone',
      info: '+55 (11) 99999-9999',
      descricao: 'Seg-Sex: 9h às 18h',
      link: 'tel:+5511999999999'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      titulo: 'Email',
      info: 'contato@ussbrasil.com',
      descricao: 'Resposta em até 24h',
      link: 'mailto:contato@ussbrasil.com'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      titulo: 'Endereço',
      info: 'São Paulo, SP',
      descricao: 'Brasil',
      link: '#'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      titulo: 'Horário',
      info: 'Segunda a Sexta',
      descricao: '9:00 - 18:00',
      link: '#'
    }
  ]

  const departamentos = [
    {
      icon: <Headphones className="h-5 w-5" />,
      titulo: 'Suporte Técnico',
      descricao: 'Ajuda com produtos e problemas técnicos'
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      titulo: 'Vendas Corporativas',
      descricao: 'Soluções para empresas e revendedores'
    },
    {
      icon: <User className="h-5 w-5" />,
      titulo: 'Atendimento Geral',
      descricao: 'Informações sobre pedidos e produtos'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      titulo: 'Parcerias',
      descricao: 'Oportunidades de negócio e colaboração'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <Badge variant="outline" className="px-4 py-2 text-lg font-semibold border-blue-200 text-blue-800">
                Contato
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Fale conosco
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Estamos aqui para ajudar! Entre em contato e tire suas dúvidas 
              sobre nossos produtos e serviços.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contatos.map((contato, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
                      {contato.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {contato.titulo}
                    </h3>
                    <a 
                      href={contato.link}
                      className="text-blue-600 hover:text-blue-700 font-medium block mb-1"
                    >
                      {contato.info}
                    </a>
                    <p className="text-sm text-gray-500">
                      {contato.descricao}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Departments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Send className="h-6 w-6 mr-3 text-blue-600" />
                    Envie sua mensagem
                  </CardTitle>
                  <p className="text-gray-600">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome completo *
                        </label>
                        <Input
                          id="nome"
                          name="nome"
                          type="text"
                          required
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <Input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                          Assunto *
                        </label>
                        <Input
                          id="assunto"
                          name="assunto"
                          type="text"
                          required
                          value={formData.assunto}
                          onChange={handleChange}
                          placeholder="Assunto da sua mensagem"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        required
                        value={formData.mensagem}
                        onChange={handleChange}
                        placeholder="Digite sua mensagem aqui..."
                        rows={6}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                      size="lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl border-0 bg-white h-fit">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Departamentos
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    Escolha o departamento mais adequado para sua necessidade
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departamentos.map((dept, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {dept.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {dept.titulo}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {dept.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Precisa de ajuda rápida?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Confira nossas páginas de ajuda para respostas imediatas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Central de Ajuda
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Perguntas Frequentes
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Política de Troca
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
