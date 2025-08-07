'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle, Eye, Truck } from 'lucide-react'

const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-01-15",
    status: "delivered",
    total: 4999.90,
    items: [
      { name: "iPhone 15 Pro", quantity: 1, price: 4999.90 }
    ]
  },
  {
    id: "ORD-002", 
    date: "2025-01-10",
    status: "shipped",
    total: 2399.90,
    items: [
      { name: "AirPods Pro", quantity: 1, price: 2399.90 }
    ]
  }
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0C1A33] mb-8">Meus Pedidos</h1>
        
        <div className="grid gap-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#0C1A33]">Pedido {order.id}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600 capitalize">{order.status}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold text-[#0E7466]">
                      R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}