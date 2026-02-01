"use client";

import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { createOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        alert("Please login to place an order");
        router.push('/auth/login');
        return;
    }
    
    const user = JSON.parse(storedUser);
    setLoading(true);

    // 1. Create Order in Sanity
    const result = await createOrder(items, total, user.email);
    
    setLoading(false);

    if (!result.success || !result.order) {
        alert("Failed to create order. Please try again.");
        return;
    }

    // 2. WhatsApp Redirect
    const phoneNumber = "923322645902"; // Replace with your WhatsApp number
    const message = items.map(item => 
      `- ${item.name} (Size: ${item.size || 'N/A'}, Color: ${item.color || 'N/A'}) x${item.quantity}`
    ).join('\n');
    
    const fullMessage = `Hello, I would like to place an order (Order # ${result.order.orderNumber}):\n\n${message}\n\nTotal: PKR ${total.toLocaleString()}\n\nPlease confirm shipping charges to my address.`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`, '_blank');
    
    // 3. Clear Cart and Redirect to Orders
    clearCart();
    router.push('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
            <div className="flex justify-center mb-6">
                <ShoppingBag className="w-20 h-20 text-gray-200" />
            </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/products"
            className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b39023] transition-colors"
          >
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest border-b pb-4">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
                {/* Image */}
                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-100 flex-shrink-0 relative overflow-hidden rounded-sm">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                       No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                        <Link href={`/products/${item.id}`} className="text-lg font-bold hover:text-[#D4AF37] transition-colors">
                            {item.name}
                        </Link>
                        <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-[#D4AF37] font-medium mt-1">PKR {item.price.toLocaleString()}</p>
                    
                    <div className="mt-2 text-sm text-gray-500 space-y-1">
                        {item.size && <p>Size: <span className="text-black">{item.size}</span></p>}
                        {item.color && <p>Color: <span className="text-black">{item.color}</span></p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                     <div className="flex items-center border border-gray-300 rounded-sm">
                        <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                             onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 font-medium underline"
            >
                Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
             <div className="bg-gray-50 p-6 rounded-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-gray-500 text-sm xl:text-xs">Calculated at Checkout</span>
                    </div>
                </div>

                <div className="flex justify-between mb-8">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-[#D4AF37]">PKR {total.toLocaleString()}</span>
                </div>

                <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                    Complete order via WhatsApp
                </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
