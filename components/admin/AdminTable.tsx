'use client'

import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Column {
  key: string
  title: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
  width?: string
}

interface TableProps {
  data: any[]
  columns: Column[]
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string) => void
  loading?: boolean
  emptyMessage?: string
}

export default function AdminTable({
  data,
  columns,
  sortKey,
  sortDirection,
  onSort,
  loading = false,
  emptyMessage = "Nenhum item encontrado"
}: TableProps) {
  if (loading) {
    return (
      <div className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-8">
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-[#0E7466] border-t-transparent rounded-full"
          />
          <span className="ml-3 text-gray-400">Carregando...</span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl p-8">
        <div className="text-center text-gray-400">
          {emptyMessage}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0C1A33]/90 backdrop-blur-sm border border-[#0E7466]/30 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0E7466]/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider
                            ${column.width || ''} ${column.sortable ? 'cursor-pointer hover:text-white' : ''}`}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && sortKey === column.key && (
                      <div className="ml-2">
                        {sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4 text-[#0E7466]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#0E7466]" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0E7466]/10">
            {data.map((row, index) => (
              <motion.tr
                key={row.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-[#0E7466]/5 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
