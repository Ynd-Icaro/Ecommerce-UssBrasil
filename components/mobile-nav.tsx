"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ShoppingCart, User, Phone, Home, Package, Heart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
      setOpen(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden hover:bg-gray-100 transition-colors duration-200">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-white/95 backdrop-blur-xl border-r border-gray-200/50">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight" onClick={() => setOpen(false)}>
              USSBRASIL
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="hover:bg-gray-100 transition-colors duration-200">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-100">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <div className="space-y-1 px-6">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
                INÍCIO
              </Link>
              <Link
                href="/products"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <Package className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
                PRODUTOS
              </Link>
              
              {/* Navigation Links */}
              <div className="pt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                  Menu
                </div>
                <Link
                  href="/categories"
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  CATEGORIAS
                </Link>
                <Link
                  href="/sobre"
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  ℹ️ SOBRE
                </Link>
                <Link
                  href="/contato"
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  CONTATO
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100"></div>

            {/* Action Links */}
            <div className="space-y-1 px-6">
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" />
                CARRINHO
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
                CONTA
              </Link>
              <Link
                href="/favorites"
                className="flex items-center px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <Heart className="h-5 w-5 mr-3 text-red-500 group-hover:text-red-600" />
                FAVORITOS
              </Link>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100"></div>

            {/* Contact */}
            <div className="px-6">
              <Link
                href="/contact"
                className="flex items-center px-4 py-3 text-base font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-5 w-5 mr-3 text-green-500 group-hover:text-green-600" />
                CONTATO
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
