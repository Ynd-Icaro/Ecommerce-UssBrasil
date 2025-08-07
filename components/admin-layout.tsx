'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  Menu,
  X,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const sidebarItems = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard,
  },
  { 
    name: 'Pedidos', 
    href: '/admin/orders', 
    icon: ShoppingCart,
  },
  { 
    name: 'Produtos', 
    href: '/admin/products', 
    icon: Package,
  },
  { 
    name: 'Clientes', 
    href: '/admin/customers', 
    icon: Users,
  },
  { 
    name: 'Design', 
    href: '/admin/design', 
    icon: FileText,
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3,
  },
  { 
    name: 'Configurações', 
    href: '/admin/settings', 
    icon: Settings,
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

const Sidebar = ({ isCollapsed, setCollapsed }: { isCollapsed: boolean, setCollapsed: (isCollapsed: boolean) => void }) => {
  const pathname = usePathname()

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative hidden lg:flex flex-col h-screen bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-lg z-20"
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-6 h-[88px] border-b border-black/5`}>
        {!isCollapsed && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
            <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Uss Brasil
            </Link>
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!isCollapsed)} className="rounded-full">
          <ChevronRight className={`transition-transform duration-300 ${!isCollapsed && 'rotate-180'}`} />
        </Button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <TooltipProvider delayDuration={0}>
          {sidebarItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white shadow-md'
                        : 'hover:bg-white/50 text-slate-700'
                    }`}
                  >
                    <item.icon className={`h-6 w-6 ${!isCollapsed && 'mr-4'}`} />
                    {!isCollapsed && <span className="font-semibold">{item.name}</span>}
                  </motion.div>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="bg-white/80 backdrop-blur-xl border-gray-300/50 rounded-xl shadow-lg">
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className={`p-4 border-t border-black/5 ${isCollapsed && 'py-6'}`}>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-semibold text-slate-800">Admin</p>
              <p className="text-sm text-slate-500">admin@ussbrasil.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) => {
  const pathname = usePathname()
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 h-[88px] border-b border-black/5 bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white">
              <Link href="/admin" className="text-2xl font-bold" onClick={() => setSidebarOpen(false)}>
                USS BRASIL
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="rounded-full text-white hover:bg-white/20">
                <X />
              </Button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {sidebarItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white shadow-lg'
                        : 'hover:bg-gray-50 text-slate-700 hover:shadow-md'
                    }`}
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    <span className="font-semibold">{item.name}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>
            
            {/* Footer com perfil */}
            <div className="p-4 border-t border-black/5 bg-gray-50">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                  <AvatarFallback className="bg-[#20b2aa] text-white">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">Admin</p>
                  <p className="text-sm text-slate-500">admin@ussbrasil.com</p>
                </div>
              </div>
              
              {/* Botões de ação rápida */}
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Config
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Sair
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Sidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
      <MobileSidebar sidebarOpen={mobileSidebarOpen} setSidebarOpen={setMobileSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between p-4 h-[72px] bg-gradient-to-r from-[#20b2aa] to-[#1a9999] text-white shadow-lg sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileSidebarOpen(true)}
              className="text-white hover:bg-white/20 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/admin" className="text-xl font-bold">
              USS BRASIL
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-lg">
              <BarChart3 className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 ring-2 ring-white/30">
              <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
              <AvatarFallback className="bg-white/20 text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-0">
          {children}
        </main>
      </div>
    </div>
  )
}
