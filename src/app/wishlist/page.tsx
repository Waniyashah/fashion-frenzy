"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-black uppercase">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Heart items you love to save them here for later.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-[#D4AF37] transition-all rounded-full"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ProductCard 
                key={item.id} 
                product={{
                  ...item,
                  // Ensure these properties match the Product interface required by ProductCard
                  // If WishlistItem doesn't have them, provide defaults or fix WishlistItem interface
                  imageUrl: item.imageUrl || '',
                  brand: item.brand || 'Fashion Frenzy'
                }} 
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
