'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
}

interface Brand {
  name: string;
  slug: string;
  products: Product[];
}

interface MobileBrandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileBrandMenu({ isOpen, onClose }: MobileBrandMenuProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const brands: Brand[] = [
    {
      name: 'Apple',
      slug: 'apple',
      products: [
        {
          id: 'iphone-16-pro',
          name: 'iPhone 16 Pro',
          price: 9999.00,
          discountPrice: 8999.00,
          images: ['/Produtos/Apple/iphone-16-pro.jpg'],
          category: 'smartphones'
        },
        {
          id: 'macbook-pro-m3',
          name: 'MacBook Pro M3',
          price: 12999.00,
          images: ['/Produtos/Apple/macbook-pro-m3.jpg'],
          category: 'laptops'
        },
        {
          id: 'airpods-pro-2',
          name: 'AirPods Pro 2ª Geração',
          price: 2199.00,
          discountPrice: 1899.00,
          images: ['/Produtos/Apple/airpods-pro-2.jpg'],
          category: 'audio'
        }
      ]
    },
    {
      name: 'Samsung',
      slug: 'samsung',
      products: [
        {
          id: 'galaxy-s24-ultra',
          name: 'Galaxy S24 Ultra',
          price: 8999.00,
          discountPrice: 7999.00,
          images: ['/Produtos/Samsung/galaxy-s24-ultra.jpg'],
          category: 'smartphones'
        },
        {
          id: 'galaxy-watch-6',
          name: 'Galaxy Watch 6',
          price: 1899.00,
          images: ['/Produtos/Samsung/galaxy-watch-6.jpg'],
          category: 'wearables'
        }
      ]
    },
    {
      name: 'Xiaomi',
      slug: 'xiaomi',
      products: [
        {
          id: 'xiaomi-14-ultra',
          name: 'Xiaomi 14 Ultra',
          price: 6999.00,
          discountPrice: 5999.00,
          images: ['/Produtos/Xiaomi/xiaomi-14-ultra.jpg'],
          category: 'smartphones'
        },
        {
          id: 'redmi-note-13-pro',
          name: 'Redmi Note 13 Pro',
          price: 2499.00,
          images: ['/Produtos/Xiaomi/redmi-note-13-pro.jpg'],
          category: 'smartphones'
        }
      ]
    },
    {
      name: 'DJI',
      slug: 'dji',
      products: [
        {
          id: 'dji-mini-4-pro',
          name: 'DJI Mini 4 Pro',
          price: 4999.00,
          discountPrice: 4499.00,
          images: ['/Produtos/DJI/mini-4-pro.jpg'],
          category: 'drones'
        },
        {
          id: 'dji-air-3',
          name: 'DJI Air 3',
          price: 6999.00,
          images: ['/Produtos/DJI/air-3.jpg'],
          category: 'drones'
        }
      ]
    },
    {
      name: 'JBL',
      slug: 'jbl',
      products: [
        {
          id: 'jbl-charge-5',
          name: 'JBL Charge 5',
          price: 899.00,
          discountPrice: 699.00,
          images: ['/Produtos/JBL/charge-5.jpg'],
          category: 'audio'
        },
        {
          id: 'jbl-flip-6',
          name: 'JBL Flip 6',
          price: 599.00,
          images: ['/Produtos/JBL/flip-6.jpg'],
          category: 'audio'
        }
      ]
    },
    {
      name: 'GeoNav',
      slug: 'geonav',
      products: [
        {
          id: 'geonav-pro-gps',
          name: 'GeoNav Pro GPS',
          price: 1299.00,
          discountPrice: 999.00,
          images: ['/Produtos/GeoNav/pro-gps.jpg'],
          category: 'navigation'
        },
        {
          id: 'geonav-marine',
          name: 'GeoNav Marine',
          price: 1899.00,
          images: ['/Produtos/GeoNav/marine.jpg'],
          category: 'navigation'
        }
      ]
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setSelectedBrand(null);
      setShowProducts(false);
    }
  }, [isOpen]);

  const handleBrandSelect = (brandSlug: string) => {
    setSelectedBrand(brandSlug);
    setShowProducts(true);
  };

  const handleBackToBrands = () => {
    setShowProducts(false);
    setSelectedBrand(null);
  };

  const selectedBrandData = brands.find(brand => brand.slug === selectedBrand);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {showProducts ? selectedBrandData?.name : 'Marcas'}
              </h2>
              {showProducts ? (
                <button
                  onClick={handleBackToBrands}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!showProducts ? (
                  <motion.div
                    key="brands"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 space-y-2"
                  >
                    {brands.map((brand) => (
                      <button
                        key={brand.slug}
                        onClick={() => handleBrandSelect(brand.slug)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{brand.name}</h3>
                          <p className="text-sm text-gray-500">
                            {brand.products.length} produtos
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 space-y-4"
                  >
                    {selectedBrandData?.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">
                            {product.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            {product.discountPrice ? (
                              <>
                                <span className="text-sm font-bold text-[#00CED1]">
                                  R$ {product.discountPrice.toLocaleString('pt-BR', { 
                                    minimumFractionDigits: 2 
                                  })}
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  R$ {product.price.toLocaleString('pt-BR', { 
                                    minimumFractionDigits: 2 
                                  })}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">
                                R$ {product.price.toLocaleString('pt-BR', { 
                                  minimumFractionDigits: 2 
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}

                    {/* Ver todos os produtos */}
                    <div className="border-t border-gray-200 pt-4">
                      <Link
                        href={`/products?brand=${selectedBrand}`}
                        onClick={onClose}
                        className="block w-full text-center py-3 px-4 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white rounded-lg hover:shadow-md transition-all duration-150 font-medium"
                      >
                        Ver todos os produtos {selectedBrandData?.name}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
