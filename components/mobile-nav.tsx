"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ShoppingCart, User, Phone, Home, Package, Heart } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight" onClick={() => setOpen(false)}>
              USSBRASIL
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-1 px-6">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                INÍCIO
              </Link>
              <Link
                href="/products"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <Package className="h-5 w-5 mr-3" />
                LOJA
              </Link>
              <Link
                href="/categories/smartphones"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                IPHONE
              </Link>
              <Link
                href="/categories/laptops"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                MAC
              </Link>
              <Link
                href="/categories/headphones"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                AIRPODS
              </Link>
              <Link
                href="/categories/watches"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                WATCH
              </Link>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100"></div>

            {/* Action Links */}
            <div className="space-y-1 px-6">
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                CARRINHO
              </Link>
              <Link
                href="/orders"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <Heart className="h-5 w-5 mr-3" />
                PEDIDOS
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                ENTRAR
              </Link>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-base font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-5 w-5 mr-3" />
                WHATSAPP
              </a>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
