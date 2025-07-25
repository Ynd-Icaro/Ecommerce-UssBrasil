'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductsDatabase } from '@/lib/use-products-database';
import { SimpleProductCard } from '@/components/product/SimpleProductCard';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Eye,
  Check,
  X
} from 'lucide-react';

import { useProductPage } from '@/hooks/use-product-page';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  
  const {
    // Estado e dados
    state,
    product,
    relatedProducts,
    currentPrice,
    originalPrice,
    savings,
    discountPercentage,
    selectedColorData,
    selectedStorageData,
    totalPrice,
    hasDiscount,
    isInStock,
    stockCount,
    
    // Handlers
    handleImageSelect,
    handleColorSelect,
    handleStorageSelect,
    handleQuantityChange,
    handleAddToCart,
    handleFavoriteToggle,
    handleShare,
    handleTabChange,
    handleZoomToggle,
    
    // Utilitários
    formatCurrency
  } = useProductPage(resolvedParams.id);

  const {
    selectedImage,
    selectedColor,
    selectedStorage,
    quantity,
    activeTab,
    zoomedImage,
    isFavorite,
    isAddedToCart,
    isShared
  } = state;

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">Início</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Produtos</Link>
        <span>/</span>
        <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-gray-900 capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Imagem principal com zoom */}
          <motion.div 
            className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border shadow-lg cursor-zoom-in"
            onClick={() => handleZoomToggle(true)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-blue-600">
                Novo
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                -{discountPercentage}%
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomToggle(true);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Galeria de imagens */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.gallery.slice(0, 4).map((image, index) => (
              <motion.div 
                key={index} 
                className={`aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border cursor-pointer transition-all duration-300 shadow-md ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80 hover:scale-105'
                }`}
                onClick={() => handleImageSelect(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Imagem ${index + 2}`}
                  fill
                  className="object-contain p-3"
                />
              </motion.div>
            ))}
          </div>

          {/* Vídeos do produto */}
          {product.videos && product.videos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vídeos do Produto</h3>
              <div className="grid grid-cols-1 gap-4">
                {product.videos.map((video, index) => (
                  <div key={index} className="aspect-video rounded-xl overflow-hidden">
                    <VideoPlayer
                      src={video}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} avaliações)</span>
              <Badge variant="outline" className="ml-2">{product.category}</Badge>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>

          {/* Seleção de Cores */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Cor: {product.colors[selectedColor]?.name}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <motion.button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === index ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Seleção de Armazenamento */}
          {product.storage && product.storage.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                Armazenamento: {product.storage[selectedStorage]}
              </h3>
              <div className="flex space-x-2">
                {product.storage.map((storage, index) => (
                  <Button
                    key={index}
                    variant={selectedStorage === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStorageSelect(index)}
                  >
                    {storage}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(currentPrice)}
              </span>
              {originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    -{discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            {savings > 0 && (
              <p className="text-sm text-green-600 font-medium">
                Você economiza {formatCurrency(savings)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-medium text-green-600">Em estoque</span>
            <span className="text-sm text-gray-500">(+ de 10 unidades)</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Quantidade:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-10 w-10 hover:bg-ussbrasil-50"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-6 py-2 font-semibold text-lg min-w-[60px] text-center bg-gray-50">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-10 w-10 hover:bg-ussbrasil-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full relative"
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              <AnimatePresence mode="wait">
                {isAddedToCart ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Adicionado ao Carrinho!
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleFavoriteToggle}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                {isFavorite ? 'Favoritado' : 'Favoritar'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <p className="text-sm font-medium">Frete Grátis</p>
              <p className="text-xs text-gray-600">Para todo Brasil</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-sm font-medium">Garantia</p>
              <p className="text-xs text-gray-600">1 ano oficial</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <p className="text-sm font-medium">Devolução</p>
              <p className="text-xs text-gray-600">30 dias grátis</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Especificações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="shipping">Entrega</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Especificações Técnicas</CardTitle>
              <CardDescription>Detalhes completos do produto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium text-gray-900">Categoria:</dt>
                    <dd className="text-gray-600 capitalize">{product.category}</dd>
                  </div>
                  {product.storage && (
                    <div>
                      <dt className="font-medium text-gray-900">Armazenamento:</dt>
                      <dd className="text-gray-600">{product.storage.join(', ')}</dd>
                    </div>
                  )}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <dt className="font-medium text-gray-900">Cores disponíveis:</dt>
                      <dd className="text-gray-600">{product.colors.map(c => c.name).join(', ')}</dd>
                    </div>
                  )}
                </dl>
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Características principais:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações dos Clientes</CardTitle>
              <CardDescription>{product.reviews} avaliações verificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">{product.rating}/5</span>
                </div>
                <p className="text-gray-600">
                  As avaliações detalhadas serão carregadas em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Entrega</CardTitle>
              <CardDescription>Opções de frete e prazos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Frete Grátis</h4>
                  <p className="text-sm text-gray-600">
                    Para todo o Brasil. Prazo de entrega: 3-7 dias úteis.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Entrega Expressa</h4>
                  <p className="text-sm text-gray-600">
                    Receba em até 24h nas principais capitais. Taxa adicional de R$ 29,90.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Retirada em Loja</h4>
                  <p className="text-sm text-gray-600">
                    Disponível em nossas lojas físicas. Consulte disponibilidade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Zoom de Imagem */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => handleZoomToggle(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30"
                onClick={() => handleZoomToggle(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Produtos Relacionados */}
      {relatedProducts.length > 0 && (
        <>
          <Separator className="my-12" />
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Produtos Relacionados
              </h2>
              <p className="text-gray-600">
                Outros produtos que você pode gostar
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SimpleProductCard
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    price={formatCurrency(relatedProduct.price)}
                    originalPrice={relatedProduct.originalPrice ? formatCurrency(relatedProduct.originalPrice) : undefined}
                    image={relatedProduct.images.main}
                    category={relatedProduct.category}
                    rating={relatedProduct.rating}
                    isNew={relatedProduct.isNew}
                  />
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link href={`/categories/${product.category.toLowerCase()}`}>
                  Ver todos os produtos de {product.category}
                </Link>
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
