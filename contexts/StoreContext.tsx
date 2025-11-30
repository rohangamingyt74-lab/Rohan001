import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game, CartItem, User } from '../types';
import { MOCK_GAMES, MOCK_USER } from '../constants';

interface StoreContextType {
  games: Game[];
  cart: CartItem[];
  wishlist: Game[];
  user: User | null;
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, delta: number) => void;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
  login: () => void;
  logout: () => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [games] = useState<Game[]>(MOCK_GAMES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Auto login for demo purposes after welcome
  useEffect(() => {
    // setUser(MOCK_USER); 
  }, []);

  const addToCart = (game: Game) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === game.id);
      if (existing) {
        return prev.map(item => item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addToWishlist = (game: Game) => {
    if (!wishlist.find(g => g.id === game.id)) {
      setWishlist(prev => [...prev, game]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(g => g.id !== id));
  };

  const login = () => setUser(MOCK_USER);
  const logout = () => setUser(null);

  const cartTotal = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <StoreContext.Provider value={{ games, cart, wishlist, user, addToCart, removeFromCart, updateQuantity, addToWishlist, removeFromWishlist, login, logout, cartTotal }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
