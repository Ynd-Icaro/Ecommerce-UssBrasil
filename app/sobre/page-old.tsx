'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Globe, 
  Shield, 
  Truck, 
  Clock, 
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Users,
  Package,
  Star
} from 'lucide-react'

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Produtos Importados Originais',
    description: 'Trabalhamos diretamente com fornecedores oficiais dos EUA, China e Europa para garantir autenticidade.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Garantia Estendida',
    description: 'Todos os produtos têm garantia de 12 meses, com suporte técnico especializado da UssBrasil.'
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Entrega Expressa',
    description: 'Entregamos para todo o Brasil em até 3 dias úteis, com rastreamento em tempo real.'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Suporte 24/7',
    description: 'Nossa equipe está disponível 24 horas por dia para ajudar com qualquer dúvida ou problema.'
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Satisfação Garantida',
    description: 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro em até 30 dias.'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Certificações Internacionais',
    description: 'Todos os nossos produtos possuem certificações ANATEL, FCC, CE e outras quando aplicáveis.'
  }
]

const stats = [
  { icon: <Users className="h-8 w-8" />, value: '50K+', label: 'Clientes Satisfeitos' },
  { icon: <Package className="h-8 w-8" />, value: '100K+', label: 'Produtos Entregues' },
  { icon: <Star className="h-8 w-8" />, value: '4.9', label: 'Avaliação Média' },
  { icon: <Globe className="h-8 w-8" />, value: '25+', label: 'Países de Origem' }
]

const team = [
  {
    name: 'Carlos Silva',
    role: 'CEO & Fundador',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    description: 'Especialista em importação com 15 anos de experiência no mercado de tecnologia.'
  },
  {
    name: 'Ana Santos',
    role: 'Diretora de Operações',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    description: 'Responsável pela logística e qualidade dos produtos importados.'
  },
  {
    name: 'Pedro Costa',
    role: 'Gerente de Tecnologia',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
    description: 'Especialista em produtos eletrônicos e inovações tecnológicas.'
  }
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white to-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white border-0 px-4 py-2 text-sm font-medium">
                Sobre a UssBrasil
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6">
                Conectando o Brasil ao mundo da
                <span className="bg-gradient-to-r from-[#00CED1] to-[#20B2AA] bg-clip-text text-transparent"> tecnologia</span>
              </h1>
              
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Somos a principal loja de produtos importados do Brasil, especializada em trazer as mais recentes 
                inovações tecnológicas diretamente dos principais mercados mundiais para a sua casa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
              Por que escolher a UssBrasil?
            </h2>
            <p className="text-xl text-neutral-600">
              Nossa missão é oferecer a melhor experiência em compras de produtos importados, 
              com qualidade e confiabilidade incomparáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl bg-white h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-xl flex items-center justify-center text-white mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
              Nossa equipe
            </h2>
            <p className="text-xl text-neutral-600">
              Conheça as pessoas por trás da UssBrasil, dedicadas a trazer os melhores produtos para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl bg-white overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#00CED1] to-[#20B2AA] p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#00CED1] font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Entre em contato
              </h2>
              <p className="text-xl text-neutral-600">
                Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Endereço</h3>
                <p className="text-neutral-600">
                  Av. Paulista, 1000<br />
                  São Paulo, SP<br />
                  CEP: 01310-100
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Telefone</h3>
                <p className="text-neutral-600">
                  +55 (11) 3000-0000<br />
                  WhatsApp: +55 (11) 99999-9999<br />
                  Atendimento 24/7
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#00CED1] to-[#20B2AA] rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Email</h3>
                <p className="text-neutral-600">
                  contato@ussbrasil.com.br<br />
                  suporte@ussbrasil.com.br<br />
                  vendas@ussbrasil.com.br
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
