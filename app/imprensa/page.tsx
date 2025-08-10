'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Newspaper, 
  Camera, 
  Download, 
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Target,
  ExternalLink,
  FileText,
  Image,
  Video,
  Mic
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ImprensaPage = () => {
  const pressReleases = [
    {
      date: '15 de Janeiro, 2024',
      title: 'USS Brasil anuncia expansão para o mercado de acessórios mobile',
      summary: 'Empresa amplia catálogo com linha completa de produtos para smartphones e tablets, consolidando posição no mercado tech.',
      category: 'Expansão',
      downloadUrl: '#'
    },
    {
      date: '22 de Dezembro, 2023',
      title: 'USS Brasil encerra 2023 com crescimento de 150% nas vendas online',
      summary: 'Plataforma de e-commerce registra números recordes e projeta nova expansão para 2024.',
      category: 'Resultados',
      downloadUrl: '#'
    },
    {
      date: '10 de Novembro, 2023',
      title: 'Nova linha de drones DJI disponível com exclusividade na USS Brasil',
      summary: 'Parceria estratégica traz os mais recentes lançamentos da DJI com preços competitivos.',
      category: 'Produtos',
      downloadUrl: '#'
    }
  ]

  const mediaKit = [
    {
      title: 'Logo USS Brasil',
      description: 'Versões em alta resolução do nosso logotipo',
      type: 'Imagem',
      icon: Image,
      files: ['Logo_USS_Brasil_Principal.png', 'Logo_USS_Brasil_Branco.png', 'Logo_USS_Brasil_Preto.png']
    },
    {
      title: 'Fotos Corporativas',
      description: 'Imagens da empresa, equipe e produtos',
      type: 'Imagem',
      icon: Camera,
      files: ['Equipe_USS_Brasil_2024.jpg', 'Escritorio_USS_Brasil.jpg', 'Produtos_Destaque.jpg']
    },
    {
      title: 'Fact Sheet',
      description: 'Dados e informações sobre a empresa',
      type: 'Documento',
      icon: FileText,
      files: ['USS_Brasil_Fact_Sheet_2024.pdf']
    },
    {
      title: 'Vídeos Institucionais',
      description: 'Conteúdo audiovisual da empresa',
      type: 'Vídeo',
      icon: Video,
      files: ['USS_Brasil_Institucional_2024.mp4', 'Depoimentos_Clientes.mp4']
    }
  ]

  const companyStats = [
    {
      title: 'Anos de Mercado',
      value: '8+',
      description: 'Experiência consolidada',
      icon: Calendar
    },
    {
      title: 'Produtos no Catálogo',
      value: '2.500+',
      description: 'Variedade em tecnologia',
      icon: Target
    },
    {
      title: 'Clientes Atendidos',
      value: '15k+',
      description: 'Satisfação garantida',
      icon: Users
    },
    {
      title: 'Crescimento Anual',
      value: '150%',
      description: 'Expansão contínua',
      icon: TrendingUp
    }
  ]

  const awards = [
    {
      year: '2023',
      title: 'Melhor E-commerce de Tecnologia',
      organization: 'Prêmio E-commerce Brasil',
      description: 'Reconhecimento pela excelência em vendas online'
    },
    {
      year: '2023',
      title: 'Empresa Destaque em Inovação',
      organization: 'Tech Awards São Paulo',
      description: 'Premiação por soluções inovadoras no varejo'
    },
    {
      year: '2022',
      title: 'Top 100 Startups Brasil',
      organization: 'StartupBrasil',
      description: 'Listagem entre as empresas mais promissoras'
    }
  ]

  const pressContact = {
    name: 'Ana Paula Silva',
    position: 'Assessoria de Imprensa',
    email: 'imprensa@ussbrasil.com',
    phone: '(11) 99999-9999',
    whatsapp: '(11) 99999-9999'
  }

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
            <span className="text-uss-primary">Sala</span> de Imprensa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Materiais, informações e contatos para jornalistas e profissionais de comunicação
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {companyStats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <h4 className="font-semibold text-gray-900 mb-2">{stat.title}</h4>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Press Releases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Últimos Comunicados
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary">{release.category}</Badge>
                        <span className="text-sm text-gray-500">{release.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                      <p className="text-gray-600">{release.summary}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button variant="outline" className="border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Media Kit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Kit de Imprensa
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mediaKit.map((kit, index) => (
              <Card key={index} className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-lg flex items-center justify-center">
                      <kit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{kit.title}</h3>
                      <Badge variant="outline" className="text-xs">{kit.type}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{kit.description}</p>
                  <div className="space-y-2">
                    {kit.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{file}</span>
                        <Button size="sm" variant="ghost" className="text-uss-primary">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-uss-primary hover:bg-uss-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Todos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Prêmios e Reconhecimentos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mb-3">
                    {award.year}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{award.organization}</p>
                  <p className="text-xs text-gray-500">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Press Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-uss-primary to-uss-secondary text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-6 w-6" />
                <span>Contato para Imprensa</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{pressContact.name}</h3>
                  <p className="text-gray-600">{pressContact.position}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-uss-primary" />
                    <a href={`mailto:${pressContact.email}`} className="text-gray-700 hover:text-uss-primary">
                      {pressContact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-uss-primary" />
                    <a href={`tel:${pressContact.phone}`} className="text-gray-700 hover:text-uss-primary">
                      {pressContact.phone}
                    </a>
                  </div>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-uss-primary" />
                <span>Informações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sobre a USS Brasil</h4>
                  <p className="text-sm text-gray-600">
                    Fundada em 2016, a USS Brasil é uma das principais empresas de tecnologia do país, 
                    especializada em produtos eletrônicos e acessórios de alta qualidade.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Segmentos de Atuação</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Smartphones</Badge>
                    <Badge variant="outline">Fones de Ouvido</Badge>
                    <Badge variant="outline">Drones</Badge>
                    <Badge variant="outline">Acessórios</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Links Úteis</h4>
                  <div className="space-y-2">
                    <Link href="/sobre" className="flex items-center space-x-2 text-uss-primary hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      <span>Sobre a Empresa</span>
                    </Link>
                    <Link href="/produtos" className="flex items-center space-x-2 text-uss-primary hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      <span>Catálogo de Produtos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <Newspaper className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Precisa de Mais Informações?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nossa assessoria de imprensa está à disposição para esclarecer dúvidas e fornecer materiais adicionais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-uss-primary hover:bg-gray-100"
                onClick={() => window.open(`mailto:${pressContact.email}`, '_blank')}
              >
                <Mail className="h-5 w-5 mr-2" />
                Entrar em Contato
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-uss-primary"
                onClick={() => window.open('#', '_blank')}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Kit Completo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ImprensaPage
