'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import QuickActionModals from '@/components/admin/QuickActionModals'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleQuickAction = (action: string) => {
    setActiveModal(action)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--uss-gradient-dark)' }}>
      {/* Sidebar */}
      <AdminSidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onQuickAction={handleQuickAction}
      />

      {/* Header */}
      <AdminHeader 
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main 
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Quick Action Modals */}
      <QuickActionModals
        activeModal={activeModal}
        onClose={closeModal}
      />
    </div>
  )
}