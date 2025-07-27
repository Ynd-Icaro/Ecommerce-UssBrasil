"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (productId: string) => boolean;
  favoritesCount: number;
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
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('uss-brasil-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uss-brasil-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: FavoriteProduct) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        toast.success('Produto adicionado aos favoritos!', {
          description: product.name
        });
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => {
      const filtered = prev.filter(item => item.id !== productId);
      toast.info('Produto removido dos favoritos.');
      return filtered;
    });
  };

  const toggleFavorite = (product: FavoriteProduct) => {
    const exists = favorites.find(item => item.id === product.id);
    if (exists) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
