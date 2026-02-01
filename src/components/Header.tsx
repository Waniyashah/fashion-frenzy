
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, ChevronDown, LogOut, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface UserData {
  id: string;
  email: string;
  firstName: string;
}

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-black backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="container mx-auto flex h-20 md:h-28 items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-full text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Fashion Frenzy"
              width={400}
              height={150}
              className="h-32 w-auto object-contain scale-150"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-white">
          <Link href="/products" className="hover:text-[#D4AF37] transition-colors">PRODUCTS</Link>
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              CATEGORIES
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-0 w-40 bg-black border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <Link href="/products?category=bags" className="block px-4 py-3 text-sm hover:text-[#D4AF37] hover:bg-gray-900 transition-colors">Bags</Link>
              <Link href="/products?category=shoes" className="block px-4 py-3 text-sm hover:text-[#D4AF37] hover:bg-gray-900 transition-colors border-t border-gray-700">Shoes</Link>
              <Link href="/products?category=watch" className="block px-4 py-3 text-sm hover:text-[#D4AF37] hover:bg-gray-900 transition-colors border-t border-gray-700">Watches</Link>
              <Link href="/products?category=glasses" className="block px-4 py-3 text-sm hover:text-[#D4AF37] hover:bg-gray-900 transition-colors border-t border-gray-700">Glasses</Link>
            </div>
          </div>
          
          <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">CONTACT US</Link>
        </nav>

        {/* Right: Search & Icons */}
        <div className="flex items-center gap-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
              window.location.href = `/products?q=${encodeURIComponent(query)}`;
            }}
            className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-64 lg:w-80 transition-all focus-within:ring-2 focus-within:ring-[#D4AF37]"
          >
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              name="search"
              type="text"
              placeholder="Search for items, brands..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-500"
            />
          </form>
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800">
            <Search className="h-5 w-5" />
          </button>

          {/* User Account Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 hover:bg-gray-800 rounded-full text-white hover:text-[#D4AF37] transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
            
            <div className={`absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-xl transition-all duration-200 z-10 ${userDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}>
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Welcome back</p>
                    <p className="text-black font-bold">{user.firstName}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors">My Profile</Link>
                  <Link href="/orders" className="block px-4 py-3 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors border-t border-gray-100">My Orders</Link>
                  <Link href="#" className="block px-4 py-3 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors border-t border-gray-100">Wishlist</Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-red-500 hover:bg-gray-50 transition-colors border-t border-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-4 py-3 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors">Login</Link>
                  <Link href="/auth/signup" className="block px-4 py-3 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors border-t border-gray-100">Sign Up</Link>
                </>
              )}
            </div>
          </div>

          <Link href="/cart" className="p-2 hover:bg-gray-800 rounded-full text-white hover:text-[#D4AF37] relative transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 text-[10px] bg-[#D4AF37] text-white rounded-full flex items-center justify-center">
              {mounted ? getItemCount() : 0}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-[#D4AF37] p-6 shadow-2xl animate-in slide-in-from-left duration-300 md:hidden" style={{ backgroundColor: '#000000' }}>
                <div className="flex justify-between items-center mb-8 border-b border-[#D4AF37]/30 pb-4">
                    <span className="text-xl font-bold text-[#D4AF37] tracking-widest">MENU</span>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-col gap-6 text-lg font-medium text-[#D4AF37]">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">HOME</Link>
                    <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">PRODUCTS</Link>
                    
                    <button 
                        onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                        className="flex items-center justify-between hover:text-white transition-colors"
                    >
                        CATEGORIES
                        <ChevronRight className={`h-5 w-5 transition-transform ${mobileCategoryOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {mobileCategoryOpen && (
                        <div className="flex flex-col gap-4 pl-4 text-[#D4AF37]/70 text-base border-l border-[#D4AF37]/30 ml-2">
                            <Link href="/products?category=bags" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Bags</Link>
                            <Link href="/products?category=shoes" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Shoes</Link>
                            <Link href="/products?category=glasses" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Glasses</Link>
                            <Link href="/products?category=watch" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Watches</Link>
                        </div>
                    )}

                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">CONTACT US</Link>

                    <hr className="border-[#D4AF37]/30 my-2" />

                    {user ? (
                        <>
                            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white transition-colors">
                                <User className="h-5 w-5" />
                                My Profile
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 text-left">
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Login</Link>
                            <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </>
      )}
    </header>
  );
}
