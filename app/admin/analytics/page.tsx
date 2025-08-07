'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Activity,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Filter,
  Calendar,
  MapPin,
  Clock,
  Star,
  Share,
  Download,
  RefreshCw
} from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import StatCard from '@/components/admin/StatCard'
import AdminChart from '@/components/admin/AdminChart'
import ProductImage from '@/components/admin/ProductImage'

interface Product {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
  views: number
  rating: number
  category: string
}

interface AnalyticsModal {
  isOpen: boolean
  type: 'product' | 'customer' | 'geographic' | 'performance' | null
  data?: any
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [modal, setModal] = useState<AnalyticsModal>({ isOpen: false, type: null })

  const topProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      image: '/images/products/iphone15.jpg',
      sales: 245,
      revenue: 294000,
      views: 15420,
      rating: 4.8,
      category: 'Smartphones'
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      image: '/images/products/macbook.jpg',
      sales: 89,
      revenue: 178000,
      views: 8920,
      rating: 4.9,
      category: 'Laptops'
    },
    {
      id: '3',
      name: 'AirPods Pro',
      image: '/images/products/airpods.jpg',
      sales: 156,
      revenue: 62400,
      views: 12560,
      rating: 4.7,
      category: 'Áudio'
    },
    {
      id: '4',
      name: 'Apple Watch Series 9',
      image: '/images/products/watch.jpg',
      sales: 78,
      revenue: 54600,
      views: 6420,
      rating: 4.6,
      category: 'Wearables'
    }
  ]

  // Dados para gráficos
  const salesData = [
    { month: 'Jul', vendas: 65000, visitantes: 12000 },
    { month: 'Ago', vendas: 78000, visitantes: 15000 },
    { month: 'Set', vendas: 89000, visitantes: 18000 },
    { month: 'Out', vendas: 95000, visitantes: 22000 },
    { month: 'Nov', vendas: 120000, visitantes: 28000 },
    { month: 'Dez', vendas: 145000, visitantes: 35000 },
    { month: 'Jan', vendas: 125000, visitantes: 30000 }
  ]

  const trafficSources = [
    { name: 'Busca Orgânica', value: 45, color: '#0E7466' },
    { name: 'Direto', value: 25, color: '#3B82F6' },
    { name: 'Redes Sociais', value: 15, color: '#8B5CF6' },
    { name: 'Email Marketing', value: 10, color: '#F59E0B' },
    { name: 'Outros', value: 5, color: '#EF4444' }
  ]

  const deviceData = [
    { device: 'Desktop', users: 4200, percentage: 45 },
    { device: 'Mobile', users: 3800, percentage: 40 },
    { device: 'Tablet', users: 1400, percentage: 15 }
  ]

  const geographicData = [
    { region: 'São Paulo', users: 3500, revenue: 450000 },
    { region: 'Rio de Janeiro', users: 2800, revenue: 380000 },
    { region: 'Minas Gerais', users: 1900, revenue: 250000 },
    { region: 'Paraná', users: 1200, revenue: 180000 },
    { region: 'Outros', users: 800, revenue: 140000 }
  ]

  const openModal = (type: 'product' | 'customer' | 'geographic' | 'performance', data?: any) => {
    setModal({ isOpen: true, type, data })
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: undefined })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Análises detalhadas de performance e comportamento"
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Analytics' }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2.5 
                       rounded-xl hover:bg-white/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Atualizar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#0E7466] to-[#0C6157] 
                       text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </motion.button>
          </div>
        }
      />

      {/* Period Selector */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-[#0E7466]" />
            <span className="text-white font-medium">Período de Análise:</span>
          </div>
          
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white 
                     focus:outline-none focus:border-[#0E7466] focus:ring-2 focus:ring-[#0E7466]/20 
                     transition-all"
          >
            <option value="week" className="bg-[#0C1A33]">Últimos 7 dias</option>
            <option value="month" className="bg-[#0C1A33]">Últimos 30 dias</option>
            <option value="quarter" className="bg-[#0C1A33]">Últimos 3 meses</option>
            <option value="year" className="bg-[#0C1A33]">Último ano</option>
          </select>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Vendas"
          value="R$ 2.4M"
          icon={<DollarSign className="w-5 h-5" />}
          trend="up"
          trendValue="+15.3%"
          description="vs. mês anterior"
        />
        
        <StatCard
          title="Visitantes Únicos"
          value="35.2k"
          icon={<Users className="w-5 h-5" />}
          trend="up"
          trendValue="+12.8%"
          description="Novos usuários"
        />
        
        <StatCard
          title="Taxa de Conversão"
          value="3.2%"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
          trendValue="+0.8%"
          description="Conversões"
        />
        
        <StatCard
          title="Ticket Médio"
          value="R$ 485"
          icon={<ShoppingCart className="w-5 h-5" />}
          trend="down"
          trendValue="-2.1%"
          description="Por pedido"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Traffic */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Vendas & Tráfego</h3>
              <p className="text-gray-400">Últimos 7 meses</p>
            </div>
            <button 
              onClick={() => openModal('performance')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                       transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80">
            <AdminChart 
              data={salesData}
              type="line"
              dataKey="vendas"
              xAxisKey="month"
              secondaryDataKey="visitantes"
              color="#0E7466"
              secondaryColor="#3B82F6"
              height={320}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#0E7466]" />
              <span className="text-gray-300 text-sm">Vendas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-gray-300 text-sm">Visitantes</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Fontes de Tráfego</h3>
              <p className="text-gray-400">Distribuição de visitantes</p>
            </div>
            <button 
              onClick={() => openModal('customer')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                       transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-64">
            <AdminChart 
              data={trafficSources}
              type="pie"
              dataKey="value"
              height={256}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2 mt-6">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-gray-300 text-sm">{source.name}</span>
                </div>
                <span className="text-white text-sm font-medium">{source.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Produtos Mais Vendidos</h3>
            <p className="text-gray-400">Performance dos produtos</p>
          </div>
          <button 
            onClick={() => openModal('product')}
            className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2.5 
                     rounded-xl hover:bg-white/20 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Todos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 
                       transition-all cursor-pointer group"
              onClick={() => openModal('product', product)}
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <ProductImage 
                    src={product.image}
                    alt={product.name}
                    size="md"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full 
                              px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs">{product.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm group-hover:text-[#0E7466] 
                             transition-colors line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-gray-400 text-xs">{product.category}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Vendas:</span>
                    <span className="text-white block font-medium">{product.sales}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Receita:</span>
                    <span className="text-white block font-medium">
                      R$ {(product.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-400 text-xs">{product.views} visualizações</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">+12%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Geographic & Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Distribuição Geográfica</h3>
              <p className="text-gray-400">Vendas por região</p>
            </div>
            <button 
              onClick={() => openModal('geographic')}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                       transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {geographicData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 
                                        rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#0E7466]" />
                  <div>
                    <span className="text-white font-medium">{region.region}</span>
                    <p className="text-gray-400 text-sm">{region.users} usuários</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-white font-medium">
                    R$ {(region.revenue / 1000).toFixed(0)}k
                  </span>
                  <div className="w-20 h-2 bg-white/10 rounded-full mt-1">
                    <div 
                      className="h-full bg-[#0E7466] rounded-full"
                      style={{ width: `${(region.revenue / 450000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Analytics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Dispositivos</h3>
              <p className="text-gray-400">Acesso por dispositivo</p>
            </div>
            <Activity className="w-6 h-6 text-[#0E7466]" />
          </div>

          <div className="space-y-6">
            {deviceData.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{device.device}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{device.users} usuários</span>
                    <span className="text-white font-medium">{device.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0E7466] to-[#0C6157] rounded-full 
                             transition-all duration-1000"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0C1A33]/95 backdrop-blur-xl border border-[#0E7466]/30 rounded-xl 
                     max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            {modal.type === 'product' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Análise Detalhada de Produtos</h3>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                             transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="aspect-square rounded-lg bg-white/10 flex items-center justify-center 
                                    mb-4 overflow-hidden">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-white font-medium">{product.name}</h4>
                        <p className="text-gray-400 text-sm">{product.category}</p>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Vendas:</span>
                            <span className="text-white block font-medium">{product.sales}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Receita:</span>
                            <span className="text-white block font-medium">
                              R$ {product.revenue.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Visualizações:</span>
                            <span className="text-white block font-medium">{product.views}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Avaliação:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-white font-medium">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modal.type === 'customer' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Análise de Clientes</h3>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                             transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="text-white font-medium mb-4">Fontes de Tráfego Detalhadas</h4>
                    <div className="space-y-4">
                      {trafficSources.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: source.color }}
                            />
                            <span className="text-gray-300">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-medium">{source.value}%</span>
                            <p className="text-gray-400 text-sm">
                              {Math.round((source.value / 100) * 35200)} visitantes
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="text-white font-medium mb-4">Comportamento do Usuário</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tempo médio na página</span>
                        <span className="text-white">2m 34s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Taxa de rejeição</span>
                        <span className="text-white">34.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Páginas por sessão</span>
                        <span className="text-white">3.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sessões recorrentes</span>
                        <span className="text-white">42.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {modal.type === 'geographic' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Análise Geográfica Detalhada</h3>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                             transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {geographicData.map((region, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-[#0E7466]" />
                          <h4 className="text-white font-medium text-lg">{region.region}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">
                            R$ {(region.revenue / 1000).toFixed(0)}k
                          </span>
                          <p className="text-gray-400 text-sm">receita total</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-400 text-sm">Usuários</span>
                          <p className="text-white font-medium">{region.users}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Conversão</span>
                          <p className="text-white font-medium">
                            {((region.revenue / region.users) / 1000).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Ticket Médio</span>
                          <p className="text-white font-medium">
                            R$ {Math.round(region.revenue / region.users)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Crescimento</span>
                          <p className="text-green-400 font-medium">+12.5%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modal.type === 'performance' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Análise de Performance</h3>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                             transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="h-96 mb-6">
                  <AdminChart 
                    data={salesData}
                    type="area"
                    dataKey="vendas"
                    xAxisKey="month"
                    secondaryDataKey="visitantes"
                    color="#0E7466"
                    secondaryColor="#3B82F6"
                    height={384}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">Pico de Vendas</p>
                    <p className="text-white text-xl font-bold">R$ 145k</p>
                    <p className="text-green-400 text-xs">Dezembro</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">Crescimento</p>
                    <p className="text-white text-xl font-bold">+92%</p>
                    <p className="text-green-400 text-xs">vs. ano anterior</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">Melhor Mês</p>
                    <p className="text-white text-xl font-bold">Dezembro</p>
                    <p className="text-green-400 text-xs">35k visitantes</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-sm">Tendência</p>
                    <p className="text-white text-xl font-bold">↗ 15%</p>
                    <p className="text-green-400 text-xs">crescimento</p>
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