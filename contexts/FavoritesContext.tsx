"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        toast.info('Produto removido dos favoritos.');
        return prev.filter(id => id !== productId);
      } else {
        toast.success('Produto adicionado aos favoritos!');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
