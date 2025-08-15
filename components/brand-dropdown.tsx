'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice?: number;
}

interface Brand {
  name: string;
  slug: string;
  products: Product[];
}

const BrandDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  // Dados de exemplo das marcas
  useEffect(() => {
    const mockBrands: Brand[] = [
      {
        name: 'Apple',
        slug: 'apple',
        products: [
          {
            id: '1',
            name: 'iPhone 16 Pro',
            images: ['/Produtos/Apple/Iphone 16 Pro.png'],
            price: 8999.99,
            discountPrice: 7999.99
          },
          {
            id: '2',
            name: 'MacBook Pro M3',
            images: ['/Produtos/Apple/Macbook Pro.png'],
            price: 15999.99
          },
          {
            id: '3',
            name: 'Apple Watch Ultra 2',
            images: ['/Produtos/Apple/Apple Watch Ultra 2.png'],
            price: 4999.99
          },
          {
            id: '4',
            name: 'AirPods Pro 2',
            images: ['/Produtos/Apple/Airpods Pro 2.png'],
            price: 1999.99,
            discountPrice: 1799.99
          }
        ]
      },
      {
        name: 'Samsung',
        slug: 'samsung',
        products: [
          {
            id: '5',
            name: 'Galaxy S24 Ultra',
            images: ['/Produtos/Samsung/Galaxy S24 Ultra.png'],
            price: 6999.99,
            discountPrice: 6499.99
          },
          {
            id: '6',
            name: 'Galaxy Watch 6',
            images: ['/Produtos/Samsung/Galaxy Watch 6.png'],
            price: 1999.99
          },
          {
            id: '7',
            name: 'Galaxy Buds Pro',
            images: ['/Produtos/Samsung/Galaxy Buds Pro.png'],
            price: 899.99
          }
        ]
      },
      {
        name: 'Xiaomi',
        slug: 'xiaomi',
        products: [
          {
            id: '8',
            name: 'Xiaomi 14 Ultra',
            images: ['/Produtos/Xiaomi/14 Ultra.png'],
            price: 4999.99
          },
          {
            id: '9',
            name: 'Redmi Note 13 Pro',
            images: ['/Produtos/Xiaomi/Redmi Note 13 Pro.png'],
            price: 1999.99,
            discountPrice: 1799.99
          },
          {
            id: '10',
            name: 'Xiaomi Watch S3',
            images: ['/Produtos/Xiaomi/Watch S3.png'],
            price: 899.99
          },
          {
            id: '11',
            name: 'Xiaomi Pad 6',
            images: ['/Produtos/Xiaomi/Pad 6.png'],
            price: 2499.99
          }
        ]
      },
      {
        name: 'DJI',
        slug: 'dji',
        products: [
          {
            id: '12',
            name: 'DJI Mini 4 Pro',
            images: ['/Produtos/DJI/Mini 4 Pro.png'],
            price: 3999.99
          },
          {
            id: '13',
            name: 'DJI Air 3',
            images: ['/Produtos/DJI/Air 3.png'],
            price: 5999.99
          },
          {
            id: '14',
            name: 'DJI Mavic 3 Pro',
            images: ['/Produtos/DJI/Mavic 3 Pro.png'],
            price: 8999.99
          },
          {
            id: '15',
            name: 'DJI Osmo Action 4',
            images: ['/Produtos/DJI/Osmo Action 4.png'],
            price: 1999.99
          }
        ]
      },
      {
        name: 'JBL',
        slug: 'jbl',
        products: [
          {
            id: '16',
            name: 'JBL Charge 5',
            images: ['/Produtos/JBL/Charge 5.png'],
            price: 599.99,
            discountPrice: 499.99
          },
          {
            id: '17',
            name: 'JBL Flip 6',
            images: ['/Produtos/JBL/Flip 6.png'],
            price: 399.99
          },
          {
            id: '18',
            name: 'JBL Boombox 3',
            images: ['/Produtos/JBL/Boombox 3.png'],
            price: 2499.99
          },
          {
            id: '19',
            name: 'JBL Live 660NC',
            images: ['/Produtos/JBL/Live 660NC.png'],
            price: 799.99,
            discountPrice: 699.99
          }
        ]
      },
      {
        name: 'GeoNav',
        slug: 'geonav',
        products: [
          {
            id: '20',
            name: 'GeoNav Pro GPS',
            images: ['/Produtos/GeoNav/Pro GPS.png'],
            price: 1299.99
          },
          {
            id: '21',
            name: 'GeoNav Marine',
            images: ['/Produtos/GeoNav/Marine.png'],
            price: 1999.99
          },
          {
            id: '22',
            name: 'GeoNav Aviation',
            images: ['/Produtos/GeoNav/Aviation.png'],
            price: 2999.99
          },
          {
            id: '23',
            name: 'GeoNav Tracker',
            images: ['/Produtos/GeoNav/Tracker.png'],
            price: 899.99
          }
        ]
      }
    ];
    setBrands(mockBrands);
  }, []);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-[#00CED1] transition-colors duration-200"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            if (!selectedBrand) setIsOpen(false);
          }, 100);
        }}
      >
        <span className="font-medium">Produtos</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[280px]"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
              setIsOpen(false);
              setSelectedBrand(null);
            }}
          >
            <div className="flex">
              {/* Brands List */}
              <div className="border-r border-gray-200 min-w-[140px]">
                {brands.map((brand) => (
                  <button
                    key={brand.slug}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 ${
                      selectedBrand === brand.slug ? 'bg-[#00CED1]/10 text-[#00CED1] border-[#00CED1]/20' : 'text-gray-700'
                    }`}
                    onMouseEnter={() => setSelectedBrand(brand.slug)}
                  >
                    <span className="font-medium text-sm">{brand.name}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {brand.products.length} produtos
                    </div>
                  </button>
                ))}
              </div>

              {/* Products List */}
              <AnimatePresence mode="wait">
                {selectedBrand && (
                  <motion.div
                    key={selectedBrand}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-[320px] max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                        {brands.find(b => b.slug === selectedBrand)?.name}
                      </h3>
                      <div className="space-y-2">
                        {brands
                          .find(brand => brand.slug === selectedBrand)
                          ?.products.slice(0, 5).map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                            >
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-md transition-shadow">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#00CED1] transition-colors">
                                  {product.name}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  {product.discountPrice ? (
                                    <>
                                      <span className="text-sm font-bold text-[#00CED1]">
                                        R$ {product.discountPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </span>
                                      <span className="text-xs text-gray-500 line-through">
                                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-bold text-gray-900">
                                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                      
                      {/* Ver todos os produtos da marca */}
                      <div className="border-t border-gray-200 mt-4 pt-3">
                        <Link
                          href={`/products?brand=${selectedBrand}`}
                          className="block text-center py-2 px-4 bg-gradient-to-r from-[#00CED1] to-[#20B2AA] text-white rounded-lg hover:shadow-md transition-all duration-150 font-medium text-sm"
                        >
                          Ver todos os produtos {brands.find(b => b.slug === selectedBrand)?.name}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandDropdown;
