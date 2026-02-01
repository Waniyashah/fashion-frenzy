"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Truck, RotateCcw, ShieldCheck, Heart, Share2, Check, Facebook, Twitter, Linkedin, Link2, MessageCircle } from "lucide-react";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    sizes?: string[];
    colors?: string[];
  };
  image: string; // URL for the cart
}

export default function ProductInfo({ product, image }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [isAdded, setIsAdded] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const text = `Check out ${product.name} on Fashion Frenzy!`;
    
    let url = '';
    
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
          .then(() => alert('Link copied to clipboard!'))
          .catch(() => console.error('Failed to copy'));
        setIsShareOpen(false);
        return;
    }

    if (url) {
        window.open(url, '_blank', 'width=600,height=400');
        setIsShareOpen(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: image,
      size: selectedSize,
      color: selectedColor,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center h-full">
      {/* Brand / Category */}
      <div className="mb-2">
        <span className="text-gray-500 uppercase tracking-widest text-xs font-medium">
          {product.category || "Fashion Frenzy"}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-4 text-black">
        {product.name}
      </h1>

      {/* Price */}
      <div className="text-xl md:text-2xl font-medium mb-8 flex items-center gap-4">
        <span>PKR {product.price ? product.price.toLocaleString() : "Price on Request"}</span>
        <span className="text-sm text-gray-500 font-normal">VAT included</span>
      </div>

      {/* Checkers */}
      <div className="flex flex-col gap-4 mb-8 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4 text-[#D4AF37]" />
          <span>Free shipping</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
          <span>No returns, exchange possible</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>6 months warranty included</span>
        </div>
      </div>

      {/* Selectors */}
      {(product.sizes || product.colors) && (
        <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">
          {product.colors && product.colors.length > 0 && (
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-3 block">Color: {selectedColor}</span>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border border-gray-200 transition-all ${selectedColor === color ? 'ring-2 ring-[#D4AF37] ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-3 block">Size: {selectedSize}</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-3 py-2 border text-sm transition-colors uppercase ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mb-8">
        <button 
          onClick={handleAddToCart}
          disabled={!product.price || isAdded}
          className={`w-full py-4 uppercase tracking-widest text-sm font-medium transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
            isAdded ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-[#D4AF37] hover:text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" /> Added to Cart
            </>
          ) : (
            'Add to Shopping Bag'
          )}
        </button>
        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-3 text-sm uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
            <Heart className="w-4 h-4" /> Add to Wishlist
          </button>
          
          <div className="relative flex-1">
            <button 
              onClick={() => setIsShareOpen(!isShareOpen)}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 text-sm uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            
            {isShareOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white shadow-xl border border-gray-100 p-2 z-50 rounded-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F7] hover:text-[#1877F2] transition-colors text-left w-full"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F7] hover:text-black transition-colors text-left w-full"
                  >
                    <Twitter className="w-4 h-4" /> Twitter
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F7] hover:text-[#25D366] transition-colors text-left w-full"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F7] hover:text-[#D4AF37] transition-colors text-left w-full border-t border-gray-100 mt-1 pt-2"
                  >
                    <Link2 className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none text-gray-600">
        <h3 className="text-black font-medium uppercase tracking-widest text-xs border-b border-gray-200 pb-2 mb-4">
          Product Details
        </h3>
        <p className="leading-relaxed">
          {product.description || "No description available for this product."}
        </p>
      </div>
    </div>
  );
}
