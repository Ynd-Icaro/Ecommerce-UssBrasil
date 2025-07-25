"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const categories = [
  {
    name: "iPhone",
    href: "/categories/smartphones",
    subcategories: [
      { name: "iPhone 15 Pro", href: "/categories/smartphones?model=iphone-15-pro" },
      { name: "iPhone 15", href: "/categories/smartphones?model=iphone-15" },
      { name: "iPhone 14", href: "/categories/smartphones?model=iphone-14" },
      { name: "iPhone SE", href: "/categories/smartphones?model=iphone-se" },
    ],
  },
  {
    name: "Mac",
    href: "/categories/laptops",
    subcategories: [
      { name: "MacBook Pro", href: "/categories/laptops?model=macbook-pro" },
      { name: "MacBook Air", href: "/categories/laptops?model=macbook-air" },
      { name: "iMac", href: "/categories/laptops?model=imac" },
      { name: "Mac Studio", href: "/categories/laptops?model=mac-studio" },
    ],
  },
  {
    name: "iPad",
    href: "/categories/tablets",
    subcategories: [
      { name: "iPad Pro", href: "/categories/tablets?model=ipad-pro" },
      { name: "iPad Air", href: "/categories/tablets?model=ipad-air" },
      { name: "iPad", href: "/categories/tablets?model=ipad" },
      { name: "iPad mini", href: "/categories/tablets?model=ipad-mini" },
    ],
  },
  {
    name: "Apple Watch",
    href: "/categories/watches",
    subcategories: [
      { name: "Apple Watch Series 9", href: "/categories/watches?model=series-9" },
      { name: "Apple Watch Ultra", href: "/categories/watches?model=ultra" },
      { name: "Apple Watch SE", href: "/categories/watches?model=se" },
    ],
  },
  {
    name: "AirPods",
    href: "/categories/headphones",
    subcategories: [
      { name: "AirPods Pro", href: "/categories/headphones?model=airpods-pro" },
      { name: "AirPods", href: "/categories/headphones?model=airpods" },
      { name: "AirPods Max", href: "/categories/headphones?model=airpods-max" },
    ],
  },
]

export function ShopSubmenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        LOJA
        <ChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-xl z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-8">
            <div className="grid grid-cols-5 gap-8">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-4"
                  >
                    {category.name}
                  </Link>
                  <ul className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.name}>
                        <Link
                          href={subcategory.href}
                          className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ofertas Especiais</h3>
                  <p className="text-sm text-gray-600">Descontos de até 20% em produtos selecionados</p>
                </div>
                <Link
                  href="/products?sale=true"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Ver Ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
