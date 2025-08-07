'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  Eye,
  Share,
  Plus,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import StatCard from '@/components/admin/StatCard'
import AdminChart from '@/components/admin/AdminChart'

interface Report {
  id: string
  title: string
  description: string
  type: 'sales' | 'inventory' | 'customers' | 'financial'
  dateGenerated: string
  status: 'completed' | 'processing' | 'failed'
  size: string
}

interface ReportModal {
  isOpen: boolean
  type: 'create' | 'view' | 'share' | null
  report?: Report
}

export default function ReportsPage() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Relatório de Vendas - Janeiro 2025',
      description: 'Análise completa das vendas do primeiro mês do ano',
      type: 'sales',
      dateGenerated: '2025-01-31',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Inventário - Produtos em Estoque',
      description: 'Levantamento detalhado do estoque atual',
      type: 'inventory',
      dateGenerated: '2025-01-30',
      status: 'completed',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Análise de Clientes - Q4 2024',
      description: 'Perfil e comportamento dos clientes no último trimestre',
      type: 'customers',
      dateGenerated: '2025-01-28',
      status: 'processing',
      size: '3.2 MB'
    },
    {
      id: '4',
      title: 'Relatório Financeiro - Dezembro',
      description: 'Balanço financeiro completo do mês anterior',
      type: 'financial',
      dateGenerated: '2025-01-27',
      status: 'completed',
      size: '4.1 MB'
    }
  ])

  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedType, setSelectedType] = useState('all')
  const [modal, setModal] = useState<ReportModal>({ isOpen: false, type: null })

  const reportTypeColors = {
    sales: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    inventory: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    customers: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    financial: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'processing': return 'Processando'
      case 'failed': return 'Falhou'
      default: return status
    }
  }

  const openModal = (type: 'create' | 'view' | 'share', report?: Report) => {
    setModal({ isOpen: true, type, report })
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: null, report: undefined })
  }

  // Dados para gráficos de exemplo
  const reportsData = [
    { month: 'Jul', generated: 12 },
    { month: 'Ago', generated: 15 },
    { month: 'Set', generated: 8 },
    { month: 'Out', generated: 22 },
    { month: 'Nov', generated: 18 },
    { month: 'Dez', generated: 25 },
    { month: 'Jan', generated: 20 }
  ]

  const typeDistribution = [
    { name: 'Vendas', value: 35, color: '#3B82F6' },
    { name: 'Estoque', value: 25, color: '#10B981' },
    { name: 'Clientes', value: 20, color: '#8B5CF6' },
    { name: 'Financeiro', value: 20, color: '#F59E0B' }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Gerencie e visualize relatórios do sistema"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Relatórios' }
        ]}
        actions={
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal('create')}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#0E7466] to-[#0C6157] 
                     text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Novo Relatório</span>
          </motion.button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Relatórios"
          value={reports.length}
          icon={<FileText className="w-5 h-5" />}
          trend="up"
          trendValue="+12.5%"
          description="Relatórios gerados"
        />
        
        <StatCard
          title="Concluídos"
          value={reports.filter(r => r.status === 'completed').length}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="up"
          trendValue="+8.3%"
          description="Relatórios finalizados"
        />
        
        <StatCard
          title="Em Processamento"
          value={reports.filter(r => r.status === 'processing').length}
          icon={<Clock className="w-5 h-5" />}
          trend="neutral"
          description="Sendo gerados"
        />
        
        <StatCard
          title="Downloads"
          value="2.4k"
          icon={<Download className="w-5 h-5" />}
          trend="up"
          trendValue="+15.7%"
          description="Downloads este mês"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Generated */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Relatórios Gerados</h3>
              <p className="text-gray-400">Últimos 7 meses</p>
            </div>
            <BarChart3 className="w-6 h-6 text-[#0E7466]" />
          </div>
          
          <div className="h-80">
            <AdminChart 
              data={reportsData}
              type="bar"
              dataKey="generated"
              xAxisKey="month"
              color="#0E7466"
              height={320}
            />
          </div>
        </motion.div>

        {/* Report Types Distribution */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Distribuição por Tipo</h3>
              <p className="text-gray-400">Tipos de relatórios</p>
            </div>
            <PieChart className="w-6 h-6 text-[#0E7466]" />
          </div>
          
          <div className="h-64">
            <AdminChart 
              data={typeDistribution}
              type="pie"
              dataKey="value"
              height={256}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            {typeDistribution.map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-gray-300 text-sm">{type.name}</span>
                <span className="text-white text-sm font-medium">{type.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Período
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                       text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                       focus:ring-[#0E7466]/20 transition-all"
            >
              <option value="week" className="bg-[#0C1A33]">Última semana</option>
              <option value="month" className="bg-[#0C1A33]">Último mês</option>
              <option value="quarter" className="bg-[#0C1A33]">Último trimestre</option>
              <option value="year" className="bg-[#0C1A33]">Último ano</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Tipo de Relatório
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                       text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                       focus:ring-[#0E7466]/20 transition-all"
            >
              <option value="all" className="bg-[#0C1A33]">Todos os tipos</option>
              <option value="sales" className="bg-[#0C1A33]">Vendas</option>
              <option value="inventory" className="bg-[#0C1A33]">Estoque</option>
              <option value="customers" className="bg-[#0C1A33]">Clientes</option>
              <option value="financial" className="bg-[#0C1A33]">Financeiro</option>
            </select>
          </div>

          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/10 text-white px-6 py-2.5 
                       rounded-xl hover:bg-white/20 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span>Filtrar</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Reports List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-[#0E7466]/20">
          <h3 className="text-xl font-bold text-white">Relatórios Recentes</h3>
          <p className="text-gray-400">Gerados nos últimos 30 dias</p>
        </div>

        <div className="divide-y divide-[#0E7466]/10">
          {reports.map((report, index) => {
            const colors = reportTypeColors[report.type]
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                      <FileText className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{report.title}</h4>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            report.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            report.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {getStatusText(report.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Gerado em {new Date(report.dateGenerated).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('view', report)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors"
                      title="Visualizar"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('share', report)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors"
                      title="Compartilhar"
                    >
                      <Share className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                               transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Modals */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0C1A33]/95 backdrop-blur-xl border border-[#0E7466]/30 rounded-xl 
                     max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {modal.type === 'create' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Criar Novo Relatório</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Título do Relatório
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                      placeholder="Digite o título do relatório"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tipo de Relatório
                    </label>
                    <select className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                                     text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                                     focus:ring-[#0E7466]/20 transition-all">
                      <option value="sales" className="bg-[#0C1A33]">Vendas</option>
                      <option value="inventory" className="bg-[#0C1A33]">Estoque</option>
                      <option value="customers" className="bg-[#0C1A33]">Clientes</option>
                      <option value="financial" className="bg-[#0C1A33]">Financeiro</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Data Inicial
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                                 text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                                 focus:ring-[#0E7466]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Data Final
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                                 text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                                 focus:ring-[#0E7466]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                               transition-all"
                    >
                      Cancelar
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#0E7466] to-[#0C6157] 
                                     text-white rounded-xl hover:shadow-lg transition-all">
                      Gerar Relatório
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modal.type === 'view' && modal.report && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Visualizar Relatório</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{modal.report.title}</h4>
                    <p className="text-gray-400 text-sm">{modal.report.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Tipo:</span>
                      <span className="text-white ml-2 capitalize">{modal.report.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className="text-white ml-2">{getStatusText(modal.report.status)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Gerado em:</span>
                      <span className="text-white ml-2">
                        {new Date(modal.report.dateGenerated).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tamanho:</span>
                      <span className="text-white ml-2">{modal.report.size}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                               transition-all"
                    >
                      Fechar
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#0E7466] to-[#0C6157] 
                                     text-white rounded-xl hover:shadow-lg transition-all">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modal.type === 'share' && modal.report && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Compartilhar Relatório</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{modal.report.title}</h4>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Compartilhar via email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
                      placeholder="Digite o email do destinatário"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                               text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                               focus:ring-2 focus:ring-[#0E7466]/20 transition-all resize-none"
                      placeholder="Adicione uma mensagem personalizada..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                               transition-all"
                    >
                      Cancelar
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#0E7466] to-[#0C6157] 
                                     text-white rounded-xl hover:shadow-lg transition-all">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
