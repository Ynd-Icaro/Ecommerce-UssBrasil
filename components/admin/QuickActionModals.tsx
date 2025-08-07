'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Package, 
  ShoppingCart, 
  User, 
  FileText,
  Plus,
  Upload,
  Save,
  Camera
} from 'lucide-react'

interface QuickActionModalsProps {
  activeModal: string | null
  onClose: () => void
}

export default function QuickActionModals({ activeModal, onClose }: QuickActionModalsProps) {
  const [formData, setFormData] = useState({
    // Product form
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productImage: null as File | null,
    
    // Order form
    customerEmail: '',
    orderItems: '',
    orderTotal: '',
    orderStatus: 'pending',
    
    // Customer form
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    
    // Report form
    reportType: 'sales',
    reportPeriod: 'month',
    reportFormat: 'pdf'
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (type: string) => {
    console.log(`Submitting ${type}:`, formData)
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, productImage: file }))
    }
  }

  const ModalWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0C1A33]/95 backdrop-blur-xl border border-[#0E7466]/30 rounded-xl 
                 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-[#0E7466]/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 
                       transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  )

  const InputField = ({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder,
    rows 
  }: { 
    label: string
    type?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    rows?: number
  }) => (
    <div className="space-y-2">
      <label className="block text-gray-300 text-sm font-medium">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                   text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                   focus:ring-2 focus:ring-[#0E7466]/20 transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                   text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7466] 
                   focus:ring-2 focus:ring-[#0E7466]/20 transition-all"
        />
      )}
    </div>
  )

  const SelectField = ({ 
    label, 
    value, 
    onChange, 
    options 
  }: { 
    label: string
    value: string
    onChange: (value: string) => void
    options: { value: string, label: string }[]
  }) => (
    <div className="space-y-2">
      <label className="block text-gray-300 text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl 
                 text-white focus:outline-none focus:border-[#0E7466] focus:ring-2 
                 focus:ring-[#0E7466]/20 transition-all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0C1A33]">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <AnimatePresence>
      {activeModal === 'new-product' && (
        <ModalWrapper title="Novo Produto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nome do Produto"
                value={formData.productName}
                onChange={(value) => handleInputChange('productName', value)}
                placeholder="Digite o nome do produto"
              />
              
              <InputField
                label="Preço"
                type="number"
                value={formData.productPrice}
                onChange={(value) => handleInputChange('productPrice', value)}
                placeholder="0,00"
              />
            </div>

            <SelectField
              label="Categoria"
              value={formData.productCategory}
              onChange={(value) => handleInputChange('productCategory', value)}
              options={[
                { value: '', label: 'Selecione uma categoria' },
                { value: 'smartphones', label: 'Smartphones' },
                { value: 'laptops', label: 'Laptops' },
                { value: 'audio', label: 'Áudio' },
                { value: 'wearables', label: 'Wearables' }
              ]}
            />

            <InputField
              label="Descrição"
              value={formData.productDescription}
              onChange={(value) => handleInputChange('productDescription', value)}
              placeholder="Descreva o produto"
              rows={3}
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-gray-300 text-sm font-medium">Imagem do Produto</label>
              <div className="border-2 border-dashed border-[#0E7466]/30 rounded-xl p-6 text-center
                            hover:border-[#0E7466]/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="product-image"
                />
                <label htmlFor="product-image" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 rounded-lg bg-[#0E7466]/20">
                      <Camera className="w-6 h-6 text-[#0E7466]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Clique para fazer upload</p>
                      <p className="text-gray-400 text-sm">PNG, JPG até 10MB</p>
                    </div>
                  </div>
                </label>
                {formData.productImage && (
                  <p className="text-green-400 text-sm mt-2">
                    Arquivo selecionado: {formData.productImage.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                         transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmit('product')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r 
                         from-[#0E7466] to-[#0C6157] text-white rounded-xl hover:shadow-lg 
                         transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Criar Produto</span>
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {activeModal === 'new-order' && (
        <ModalWrapper title="Novo Pedido">
          <div className="space-y-6">
            <InputField
              label="Email do Cliente"
              type="email"
              value={formData.customerEmail}
              onChange={(value) => handleInputChange('customerEmail', value)}
              placeholder="cliente@email.com"
            />

            <InputField
              label="Itens do Pedido"
              value={formData.orderItems}
              onChange={(value) => handleInputChange('orderItems', value)}
              placeholder="iPhone 15 Pro, AirPods..."
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Total do Pedido"
                type="number"
                value={formData.orderTotal}
                onChange={(value) => handleInputChange('orderTotal', value)}
                placeholder="0,00"
              />

              <SelectField
                label="Status"
                value={formData.orderStatus}
                onChange={(value) => handleInputChange('orderStatus', value)}
                options={[
                  { value: 'pending', label: 'Pendente' },
                  { value: 'processing', label: 'Processando' },
                  { value: 'shipped', label: 'Enviado' },
                  { value: 'delivered', label: 'Entregue' }
                ]}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                         transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmit('order')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r 
                         from-[#0E7466] to-[#0C6157] text-white rounded-xl hover:shadow-lg 
                         transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Criar Pedido</span>
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {activeModal === 'new-customer' && (
        <ModalWrapper title="Novo Cliente">
          <div className="space-y-6">
            <InputField
              label="Nome Completo"
              value={formData.customerName}
              onChange={(value) => handleInputChange('customerName', value)}
              placeholder="Nome do cliente"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Email"
                type="email"
                value={formData.customerEmail}
                onChange={(value) => handleInputChange('customerEmail', value)}
                placeholder="cliente@email.com"
              />

              <InputField
                label="Telefone"
                type="tel"
                value={formData.customerPhone}
                onChange={(value) => handleInputChange('customerPhone', value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <InputField
              label="Endereço"
              value={formData.customerAddress}
              onChange={(value) => handleInputChange('customerAddress', value)}
              placeholder="Endereço completo"
              rows={2}
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                         transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmit('customer')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r 
                         from-[#0E7466] to-[#0C6157] text-white rounded-xl hover:shadow-lg 
                         transition-all"
              >
                <User className="w-4 h-4" />
                <span>Criar Cliente</span>
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {activeModal === 'new-report' && (
        <ModalWrapper title="Novo Relatório">
          <div className="space-y-6">
            <SelectField
              label="Tipo de Relatório"
              value={formData.reportType}
              onChange={(value) => handleInputChange('reportType', value)}
              options={[
                { value: 'sales', label: 'Vendas' },
                { value: 'inventory', label: 'Estoque' },
                { value: 'customers', label: 'Clientes' },
                { value: 'financial', label: 'Financeiro' }
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Período"
                value={formData.reportPeriod}
                onChange={(value) => handleInputChange('reportPeriod', value)}
                options={[
                  { value: 'week', label: 'Última semana' },
                  { value: 'month', label: 'Último mês' },
                  { value: 'quarter', label: 'Último trimestre' },
                  { value: 'year', label: 'Último ano' }
                ]}
              />

              <SelectField
                label="Formato"
                value={formData.reportFormat}
                onChange={(value) => handleInputChange('reportFormat', value)}
                options={[
                  { value: 'pdf', label: 'PDF' },
                  { value: 'excel', label: 'Excel' },
                  { value: 'csv', label: 'CSV' }
                ]}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 
                         transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmit('report')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r 
                         from-[#0E7466] to-[#0C6157] text-white rounded-xl hover:shadow-lg 
                         transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Gerar Relatório</span>
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AnimatePresence>
  )
}
