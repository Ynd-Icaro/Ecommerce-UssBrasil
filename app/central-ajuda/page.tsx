'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  HelpCircle, 
  Book, 
  Shield, 
  Truck, 
  CreditCard,
  RefreshCw,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Users,
  Settings,
  ShoppingCart
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const CentralAjudaPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const helpCategories = [
    {
      id: 'pedidos',
      title: 'Pedidos & Entregas',
      icon: Truck,
      description: 'Rastreamento, prazos e informações sobre entrega',
      articles: 12,
      color: 'text-blue-600 bg-blue-50',
      href: '/central-ajuda/pedidos'
    },
    {
      id: 'pagamentos',
      title: 'Pagamentos',
      icon: CreditCard,
      description: 'Formas de pagamento, parcelamento e problemas',
      articles: 8,
      color: 'text-green-600 bg-green-50',
      href: '/central-ajuda/pagamentos'
    },
    {
      id: 'trocas',
      title: 'Trocas & Devoluções',
      icon: RefreshCw,
      description: 'Política de trocas, prazos e procedimentos',
      articles: 6,
      color: 'text-purple-600 bg-purple-50',
      href: '/central-ajuda/trocas'
    },
    {
      id: 'produtos',
      title: 'Produtos',
      icon: ShoppingCart,
      description: 'Especificações, compatibilidade e garantia',
      articles: 15,
      color: 'text-orange-600 bg-orange-50',
      href: '/central-ajuda/produtos'
    },
    {
      id: 'conta',
      title: 'Minha Conta',
      icon: Users,
      description: 'Cadastro, login e dados pessoais',
      articles: 7,
      color: 'text-indigo-600 bg-indigo-50',
      href: '/central-ajuda/conta'
    },
    {
      id: 'seguranca',
      title: 'Segurança',
      icon: Shield,
      description: 'Proteção de dados e compra segura',
      articles: 5,
      color: 'text-red-600 bg-red-50',
      href: '/central-ajuda/seguranca'
    }
  ]

  const popularArticles = [
    {
      title: 'Como rastrear meu pedido?',
      category: 'Pedidos',
      views: 1250,
      helpful: 95,
      href: '/central-ajuda/como-rastrear-pedido'
    },
    {
      title: 'Quais formas de pagamento aceitas?',
      category: 'Pagamentos',
      views: 980,
      helpful: 92,
      href: '/central-ajuda/formas-pagamento'
    },
    {
      title: 'Como fazer uma troca ou devolução?',
      category: 'Trocas',
      views: 856,
      helpful: 89,
      href: '/central-ajuda/como-trocar'
    },
    {
      title: 'Prazo de entrega para minha região',
      category: 'Pedidos',
      views: 743,
      helpful: 87,
      href: '/central-ajuda/prazos-entrega'
    },
    {
      title: 'Posso parcelar minha compra?',
      category: 'Pagamentos',
      views: 692,
      helpful: 94,
      href: '/central-ajuda/parcelamento'
    },
    {
      title: 'Como cancelar um pedido?',
      category: 'Pedidos',
      views: 634,
      helpful: 91,
      href: '/central-ajuda/cancelar-pedido'
    }
  ]

  const quickActions = [
    {
      title: 'Rastrear Pedido',
      description: 'Digite o código do seu pedido',
      icon: Truck,
      href: '/rastreamento',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Falar com Atendimento',
      description: 'Suporte via WhatsApp ou telefone',
      icon: MessageCircle,
      href: '/atendimento',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Trocar Produto',
      description: 'Solicite troca ou devolução',
      icon: RefreshCw,
      href: '/politica-troca',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Meus Pedidos',
      description: 'Veja histórico de compras',
      icon: FileText,
      href: '/minha-conta/pedidos',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  const filteredArticles = popularArticles.filter(article => 
    selectedCategory === 'all' || 
    article.category.toLowerCase().includes(selectedCategory) ||
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <span style={{ color: 'var(--uss-primary)' }}>Central</span> de Ajuda
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--uss-text-secondary)' }}>
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" 
              style={{ color: 'var(--uss-text-secondary)' }}
            />
            <Input
              type="text"
              placeholder="Busque por dúvidas, produtos ou categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 rounded-full focus:border-transparent focus:ring-2 transition-all"
              style={{
                background: 'var(--uss-bg-light)',
                borderColor: 'var(--uss-border)',
                color: 'var(--uss-text-light)',
                '--tw-ring-color': 'var(--uss-primary)'
              } as React.CSSProperties}
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--uss-text-light)' }}>Ações Rápidas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md"
                  style={{ background: 'var(--uss-bg-light)' }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 
                      className="font-semibold mb-2 transition-colors"
                      style={{ color: 'var(--uss-text-light)' }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.color = 'var(--uss-primary)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.color = 'var(--uss-text-light)';
                      }}
                    >
                      {action.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--uss-text-secondary)' }}>{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--uss-text-light)' }}>Categorias de Ajuda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Link key={category.id} href={category.href}>
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md"
                  style={{ background: 'var(--uss-bg-light)' }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${category.color} group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 
                            className="font-semibold transition-colors"
                            style={{ color: 'var(--uss-text-light)' }}
                            onMouseEnter={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.color = 'var(--uss-primary)';
                            }}
                            onMouseLeave={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.color = 'var(--uss-text-light)';
                            }}
                          >
                            {category.title}
                          </h3>
                          <ChevronRight 
                            className="h-5 w-5 transition-colors group-hover:text-uss-primary" 
                            style={{ color: 'var(--uss-text-secondary)' }}
                          />
                        </div>
                        <p className="text-sm mb-3" style={{ color: 'var(--uss-text-secondary)' }}>{category.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {category.articles} artigos
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="shadow-xl border-0" style={{ background: 'var(--uss-bg-light)' }}>
            <CardHeader 
              className="text-white rounded-t-lg"
              style={{ background: 'var(--uss-gradient-primary)' }}
            >
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-6 w-6" />
                <span>Artigos Mais Populares</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={`transition-all font-semibold ${selectedCategory === 'all' ? '' : 'hover:shadow-md'}`}
                  style={{
                    background: selectedCategory === 'all' ? 'var(--uss-primary)' : 'transparent',
                    color: selectedCategory === 'all' ? 'var(--uss-text)' : 'var(--uss-primary)',
                    borderColor: 'var(--uss-primary)'
                  }}
                >
                  Todos
                </Button>
                {['pedidos', 'pagamentos', 'trocas'].map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-uss-primary text-white' : ''}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                  <Link key={index} href={article.href}>
                    <div className="p-4 rounded-lg border border-gray-100 hover:border-uss-primary hover:shadow-md transition-all group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-uss-primary transition-colors mb-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                            <span>{article.views} visualizações</span>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{article.helpful}% útil</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-uss-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white">
                  Ver Todos os Artigos
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          
          {/* Contact Support */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-uss-primary" />
                <span>Ainda Precisa de Ajuda?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Não encontrou o que procurava? Nossa equipe está pronta para ajudar!
              </p>
              <div className="space-y-3">
                <Link href="/atendimento">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Falar no WhatsApp
                  </Button>
                </Link>
                <Link href="/atendimento">
                  <Button variant="outline" className="w-full border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar para Suporte
                  </Button>
                </Link>
                <Link href="/atendimento">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar E-mail
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base Stats */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="h-5 w-5 text-uss-primary" />
                <span>Nossa Base de Conhecimento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total de Artigos</span>
                  <span className="font-bold text-2xl text-uss-primary">53</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Visualizações este mês</span>
                  <span className="font-bold text-2xl text-green-600">12.5k</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Avaliação média</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-2xl text-yellow-500">4.8</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
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
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-uss-primary to-uss-secondary rounded-3xl p-8 md:p-12 text-white">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Não Encontrou sua Resposta?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nossa equipe especializada está aqui para resolver qualquer dúvida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/atendimento">
                <Button
                  size="lg"
                  className="bg-white text-uss-primary hover:bg-gray-100"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-uss-primary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar Novamente
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CentralAjudaPage
