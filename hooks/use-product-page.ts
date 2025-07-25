import { useState, useCallback } from 'react';
import { useProductsDatabase } from '@/lib/use-products-database';

export interface ProductPageState {
  // Estados visuais
  selectedImage: number;
  selectedColor: number;
  selectedStorage: number;
  quantity: number;
  activeTab: string;
  zoomedImage: boolean;
  
  // Estados de interação
  isFavorite: boolean;
  isAddedToCart: boolean;
  isShared: boolean;
}

export const useProductPage = (productId: string) => {
  const { 
    getProductById, 
    getRelatedProducts, 
    formatCurrency,
    calculateSavings,
    getDiscountPercentage 
  } = useProductsDatabase();

  // Estados
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [zoomedImage, setZoomedImage] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Produto e dados relacionados
  const product = getProductById(productId);
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];
  
  // Cálculos de preço
  const currentPrice = product?.price || 0;
  const originalPrice = product?.originalPrice;
  const savings = originalPrice ? calculateSavings(originalPrice, currentPrice) : 0;
  const discountPercentage = originalPrice ? getDiscountPercentage(originalPrice, currentPrice) : 0;

  // Handlers
  const handleImageSelect = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleColorSelect = useCallback((index: number) => {
    setSelectedColor(index);
  }, []);

  const handleStorageSelect = useCallback((index: number) => {
    setSelectedStorage(index);
  }, []);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    
    // Aqui você implementaria a lógica real do carrinho
    const cartItem = {
      productId: product?.id,
      name: product?.name,
      price: currentPrice,
      quantity,
      selectedColor: product?.colors?.[selectedColor],
      selectedStorage: product?.storage?.[selectedStorage],
      image: product?.images.main
    };
    
    console.log('Adicionando ao carrinho:', cartItem);
    
    // Exemplo de implementação com localStorage
    // const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // const existingItemIndex = cart.findIndex(item => 
    //   item.productId === cartItem.productId && 
    //   item.selectedColor?.name === cartItem.selectedColor?.name &&
    //   item.selectedStorage === cartItem.selectedStorage
    // );
    
    // if (existingItemIndex >= 0) {
    //   cart[existingItemIndex].quantity += quantity;
    // } else {
    //   cart.push(cartItem);
    // }
    
    // localStorage.setItem('cart', JSON.stringify(cart));
  }, [product, currentPrice, quantity, selectedColor, selectedStorage]);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite(prev => !prev);
    
    // Aqui você implementaria a lógica real dos favoritos
    const favoriteItem = {
      productId: product?.id,
      name: product?.name,
      price: currentPrice,
      image: product?.images.main
    };
    
    console.log(isFavorite ? 'Removendo dos favoritos:' : 'Adicionando aos favoritos:', favoriteItem);
    
    // Exemplo de implementação com localStorage
    // const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // if (isFavorite) {
    //   const updatedFavorites = favorites.filter(fav => fav.productId !== product?.id);
    //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    // } else {
    //   favorites.push(favoriteItem);
    //   localStorage.setItem('favorites', JSON.stringify(favorites));
    // }
  }, [product, currentPrice, isFavorite]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } else {
        // Fallback para copiar URL
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.log('Erro ao compartilhar:', err);
    }
  }, [product]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleZoomToggle = useCallback((zoom?: boolean) => {
    setZoomedImage(zoom !== undefined ? zoom : !zoomedImage);
  }, [zoomedImage]);

  // Estado atual
  const state: ProductPageState = {
    selectedImage,
    selectedColor,
    selectedStorage,
    quantity,
    activeTab,
    zoomedImage,
    isFavorite,
    isAddedToCart,
    isShared
  };

  // Dados calculados
  const computedData = {
    product,
    relatedProducts,
    currentPrice,
    originalPrice,
    savings,
    discountPercentage,
    selectedColorData: product?.colors?.[selectedColor],
    selectedStorageData: product?.storage?.[selectedStorage],
    selectedImageUrl: product?.images.gallery[selectedImage] || product?.images.main,
    totalPrice: currentPrice * quantity,
    hasDiscount: discountPercentage > 0,
    isInStock: true, // Implementar lógica real de estoque
    stockCount: Math.floor(Math.random() * 50) + 10 // Mock - implementar lógica real
  };

  return {
    // Estado
    state,
    
    // Dados
    ...computedData,
    
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
    formatCurrency,
    
    // Setters diretos (para casos especiais)
    setSelectedImage,
    setSelectedColor,
    setSelectedStorage,
    setQuantity,
    setIsFavorite,
    setIsAddedToCart,
    setActiveTab,
    setZoomedImage
  };
};

export default useProductPage;
