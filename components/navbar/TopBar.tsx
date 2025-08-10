'use client'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, Truck, Zap, Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export const TopBar = () => {
  const left = [
    { icon: Phone, text: '(11) 99999-9999' },
    { icon: Mail, text: 'contato@ussbrasil.com' },
    { icon: Clock, text: 'Seg-Sex: 8h-18h | Sáb: 8h-14h' }
  ]
  const right = [
    { icon: Truck, text: 'Frete Grátis acima de R$ 299', color: 'text-green-300' },
    { icon: Zap, text: 'Entrega Expressa', color: 'text-yellow-300' },
    { icon: Shield, text: 'Compra Segura', color: 'text-blue-300' }
  ]
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="hidden lg:block text-white text-xs py-2 relative overflow-hidden"
      style={{ background: 'var(--uss-gradient-dark)' }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {left.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex items-center space-x-1 hover:text-blue-300 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <item.icon className="h-3 w-3" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {right.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className={`flex items-center space-x-1 ${item.color}`}
                whileHover={{ scale: 1.05, x: -5 }}
              >
                <item.icon className="h-3 w-3" />
                <span>{item.text}</span>
                {index < 2 && <Separator orientation="vertical" className="h-4 bg-slate-600 ml-4" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
