"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  slug: string;
  brand?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToWishlist = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === newItem.id);
      if (exists) return prevItems;
      return [...prevItems, newItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{ 
      items, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
