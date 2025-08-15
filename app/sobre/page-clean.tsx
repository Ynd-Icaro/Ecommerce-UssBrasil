'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheckIcon,
  TruckIcon,
  HeartIcon,
  StarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  AwardIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

export default function SobrePage() {
  const values = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Confiança',
      description: 'Produtos originais com garantia oficial e atendimento especializado'
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: 'Inovação',
      description: 'Sempre à frente das tendências tecnológicas do mercado'
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: 'Paixão',
      description: 'Amor genuíno por tecnologia e satisfação do cliente'
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: 'Comunidade',
      description: 'Construindo relacionamentos duradouros com nossos clientes'
    }
  ]

  const timeline = [
    {
      year: '2018',
      title: 'Fundação',
      description: 'USS Brasil nasce com o sonho de democratizar o acesso à tecnologia premium no Brasil'
    },
    {
      year: '2019',
      title: 'Primeiras Parcerias',
      description: 'Estabelecemos parcerias oficiais com Apple, JBL e DJI'
    },
    {
      year: '2020',
      title: 'Expansão Digital',
      description: 'Lançamento da plataforma e-commerce com entrega nacional'
    },
    {
      year: '2021',
      title: 'Crescimento',
      description: 'Ampliação do catálogo com Xiaomi e Geonav'
    },
    {
      year: '2022',
      title: 'Reconhecimento',
      description: 'Prêmio de Melhor Loja de Tecnologia do ano'
    },
    {
      year: '2023',
      title: 'Presente',
      description: 'Mais de 50.000 clientes satisfeitos e crescimento contínuo'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Clientes Satisfeitos' },
    { number: '100K+', label: 'Produtos Vendidos' },
    { number: '4.9', label: 'Avaliação Média' },
    { number: '99%', label: 'Satisfação do Cliente' }
  ]

  const team = [
    {
      name: 'Ricardo Silva',
      role: 'CEO & Fundador',
      description: 'Visionário da tecnologia com 15 anos de experiência no setor'
    },
    {
      name: 'Marina Santos',
      role: 'CTO',
      description: 'Especialista em inovação e desenvolvimento de produtos'
    },
    {
      name: 'Carlos Oliveira',
      role: 'Head de Vendas',
      description: 'Expert em relacionamento com cliente e estratégias comerciais'
    },
    {
      name: 'Ana Costa',
      role: 'Head de Marketing',
      description: 'Criativa estratégica focada em experiência do cliente'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-uss-primary via-uss-secondary to-cyan-400 text-white">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre a <span className="text-cyan-200">USS Brasil</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Conectando pessoas à tecnologia que transforma vidas desde 2018
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">Missão</span>
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Democratizar o acesso à tecnologia premium, oferecendo produtos originais das melhores marcas mundiais com preços justos, atendimento especializado e a garantia de uma experiência excepcional.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acreditamos que a tecnologia deve ser acessível a todos, transformando sonhos em realidade e conectando pessoas ao futuro.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 text-white text-center">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="text-4xl font-bold mb-2">{stat.number}</div>
                      <div className="text-blue-100">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossos <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam cada decisão e ação em nossa jornada
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-uss-primary to-uss-secondary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-uss-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="historia" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossa <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">História</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma jornada de crescimento, inovação e compromisso com a excelência
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-uss-primary to-uss-secondary rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-3xl font-bold text-uss-primary mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-uss-primary to-uss-secondary rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossa <span className="bg-gradient-to-r from-uss-primary to-uss-secondary bg-clip-text text-transparent">Equipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pessoas apaixonadas por tecnologia trabalhando para oferecer a melhor experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-uss-primary to-uss-secondary rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-uss-primary transition-colors">
                  {member.name}
                </h3>
                <div className="text-uss-secondary font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-uss-primary via-uss-secondary to-cyan-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Faça Parte da Nossa História
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Descubra como a USS Brasil pode transformar sua experiência com tecnologia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-uss-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Explorar Produtos
              </Link>
              <Link
                href="/contato"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-uss-primary transition-all duration-300 transform hover:scale-105"
              >
                Entre em Contato
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
