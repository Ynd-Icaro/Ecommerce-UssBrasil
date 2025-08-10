"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { getProductById } from '@/lib/products-manager';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  [key: string]: any;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      const prodData = getProductById(String(product.id));
      const stock = prodData?.stock ?? Infinity;
      if (existingItem) {
        const newQty = Math.min(existingItem.quantity + quantity, stock);
        if (newQty === existingItem.quantity) {
          toast.error('Estoque máximo atingido.');
          return prevItems;
        }
        toast.success(`Quantidade de '${product.name}' atualizada (${newQty}).`);
        return prevItems.map(item => item.id === product.id ? { ...item, quantity: newQty } : item);
      } else {
        const initialQty = Math.min(quantity, stock);
        if (initialQty <= 0) {
          toast.error('Produto sem estoque.');
          return prevItems;
        }
        toast.success(`'${product.name}' adicionado ao carrinho.`);
        return [...prevItems, { ...product, quantity: initialQty }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.error(`'${itemToRemove.name}' removido do carrinho.`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const prodData = getProductById(String(productId));
    const stock = prodData?.stock ?? Infinity;
    if (quantity > stock) {
      toast.error('Quantidade solicitada excede o estoque disponível.');
      quantity = stock;
    }
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrinho esvaziado.');
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
