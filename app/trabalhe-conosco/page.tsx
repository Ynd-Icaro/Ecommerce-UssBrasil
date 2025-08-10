'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MapPin, 
  Clock, 
  Heart,
  Star,
  Send,
  Upload,
  CheckCircle,
  Coffee,
  TrendingUp,
  Award,
  Target,
  Briefcase,
  GraduationCap,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const TrabalheConoscoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  })

  const benefits = [
    {
      title: 'Plano de Saúde',
      description: 'Plano médico e odontológico completo',
      icon: Heart,
      color: 'text-red-600 bg-red-50'
    },
    {
      title: 'Vale Refeição',
      description: 'Auxílio alimentação generoso',
      icon: Coffee,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Crescimento',
      description: 'Plano de carreira estruturado',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Premiações',
      description: 'Reconhecimento por performance',
      icon: Award,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Flexibilidade',
      description: 'Horários flexíveis e home office',
      icon: Clock,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Treinamentos',
      description: 'Cursos e capacitações constantes',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50'
    }
  ]

  const openPositions = [
    {
      title: 'Desenvolvedor Full Stack',
      department: 'Tecnologia',
      type: 'CLT',
      location: 'São Paulo - SP',
      description: 'Desenvolvimento de soluções web completas',
      requirements: ['React', 'Node.js', 'TypeScript', '3+ anos de experiência']
    },
    {
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      type: 'CLT',
      location: 'São Paulo - SP',
      description: 'Gestão de campanhas e estratégias digitais',
      requirements: ['Google Ads', 'Facebook Ads', 'Analytics', '2+ anos de experiência']
    },
    {
      title: 'Assistente de Vendas',
      department: 'Comercial',
      type: 'CLT',
      location: 'São Paulo - SP',
      description: 'Atendimento ao cliente e suporte às vendas',
      requirements: ['Experiência em vendas', 'Boa comunicação', 'Proatividade']
    }
  ]

  const companyValues = [
    {
      title: 'Inovação',
      description: 'Sempre buscamos as melhores soluções tecnológicas',
      icon: Target
    },
    {
      title: 'Qualidade',
      description: 'Excelência em tudo que fazemos',
      icon: Star
    },
    {
      title: 'Transparência',
      description: 'Comunicação clara e honesta sempre',
      icon: CheckCircle
    },
    {
      title: 'Crescimento',
      description: 'Desenvolvimento contínuo de nossa equipe',
      icon: TrendingUp
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Currículo enviado com sucesso! Entraremos em contato em breve.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
            <span style={{ color: 'var(--uss-primary)' }}>Trabalhe</span> Conosco
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--uss-text-secondary)' }}>
            Faça parte de uma equipe inovadora e em constante crescimento. Venha construir o futuro da tecnologia conosco!
          </p>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {companyValues.map((value, index) => (
            <Card 
              key={index} 
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: 'var(--uss-bg-light)' }}
            >
              <CardContent className="p-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--uss-gradient-primary)' }}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--uss-text-light)' }}>{value.title}</h3>
                <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--uss-text-light)' }}>
            Benefícios e Vantagens
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                style={{ background: 'var(--uss-bg-light)' }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mb-4`}>
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--uss-text-light)' }}>{benefit.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--uss-text-light)' }}>
            Vagas Abertas
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card 
                key={index} 
                className="shadow-lg border-0"
                style={{ background: 'var(--uss-bg-light)' }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--uss-text-light)' }}>{position.title}</h3>
                      <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--uss-text-secondary)' }}>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <Badge variant="secondary">{position.type}</Badge>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                      style={{ 
                        background: 'var(--uss-primary)',
                        color: 'var(--uss-text)'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.background = 'var(--uss-primary-hover)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.background = 'var(--uss-primary)';
                      }}
                    >
                      Candidatar-se
                    </Button>
                  </div>
                  <p className="mb-4" style={{ color: 'var(--uss-text-secondary)' }}>{position.description}</p>
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>Requisitos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0 max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-6 w-6" />
                <span>Envie seu Currículo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                      Nome Completo *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome completo"
                      style={{
                        background: 'var(--uss-bg)',
                        color: 'var(--uss-text-light)',
                        borderColor: 'var(--uss-border)'
                      }}
                      className="focus:border-uss-primary transition-colors"
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
                      placeholder="seu@email.com"
                      style={{
                        background: 'var(--uss-bg)',
                        color: 'var(--uss-text-light)',
                        borderColor: 'var(--uss-border)'
                      }}
                      className="focus:border-uss-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      style={{
                        background: 'var(--uss-bg)',
                        color: 'var(--uss-text-light)',
                        borderColor: 'var(--uss-border)'
                      }}
                      className="focus:border-uss-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                      Vaga de Interesse
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-uss-primary focus:border-transparent transition-colors"
                      style={{
                        background: 'var(--uss-bg)',
                        color: 'var(--uss-text-light)',
                        borderColor: 'var(--uss-border)'
                      }}
                    >
                      <option value="">Selecione uma vaga</option>
                      {openPositions.map((pos, index) => (
                        <option key={index} value={pos.title}>{pos.title}</option>
                      ))}
                      <option value="outro">Cadastro geral</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                    Experiência Profissional
                  </label>
                  <Textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Descreva sua experiência profissional relevante..."
                    style={{
                      background: 'var(--uss-bg)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)'
                    }}
                    className="focus:border-uss-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--uss-text-light)' }}>
                    Mensagem Adicional
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Conte-nos por que quer trabalhar conosco..."
                    style={{
                      background: 'var(--uss-bg)',
                      color: 'var(--uss-text-light)',
                      borderColor: 'var(--uss-border)'
                    }}
                    className="focus:border-uss-primary transition-colors"
                  />
                </div>

                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:border-uss-primary"
                  style={{ borderColor: 'var(--uss-border)' }}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--uss-text-secondary)' }} />
                  <p className="mb-2" style={{ color: 'var(--uss-text-light)' }}>Anexe seu currículo</p>
                  <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>PDF, DOC ou DOCX - até 5MB</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mt-4 transition-all"
                    style={{
                      borderColor: 'var(--uss-primary)',
                      color: 'var(--uss-primary)'
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
                    Escolher Arquivo
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ 
                    background: 'var(--uss-gradient-primary)',
                    color: 'var(--uss-text)'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 10px 25px rgba(10, 132, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Candidatura
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div 
            className="rounded-3xl p-8 md:p-12"
            style={{
              background: 'var(--uss-gradient-primary)',
              color: 'var(--uss-text)'
            }}
          >
            <Users className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Fazer Parte do Time?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a nós e ajude a construir o futuro da tecnologia no Brasil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                style={{
                  background: 'var(--uss-bg)',
                  color: 'var(--uss-primary)'
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = 'none';
                }}
              >
                <Send className="h-5 w-5 mr-2" />
                Enviar Currículo
              </Button>
              <Link href="/atendimento">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    borderColor: 'var(--uss-bg)',
                    color: 'var(--uss-bg)',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'var(--uss-bg)';
                    target.style.color = 'var(--uss-primary)';
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.background = 'transparent';
                    target.style.color = 'var(--uss-bg)';
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                  }}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Falar com RH
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TrabalheConoscoPage
