'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LogOut, Edit2, Mail, Phone, MapPin } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-black">
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-sm flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-sm p-8">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#D4AF37] text-black rounded-full flex items-center justify-center font-bold">
                  {user.firstName && user.firstName.length > 0 ? user.firstName.charAt(0).toUpperCase() : 'U'}
                </span>
                {user.firstName || 'User'} {user.lastName || ''}
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <Mail className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 uppercase tracking-widest font-bold">Email</p>
                    <p className="text-lg text-black">{user.email}</p>
                  </div>
                </div>

                {/* Phone (if available) */}
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <Phone className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 uppercase tracking-widest font-bold">Phone</p>
                    <p className="text-lg text-black">Not provided</p>
                  </div>
                </div>

                {/* Address (if available) */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 uppercase tracking-widest font-bold">Address</p>
                    <p className="text-lg text-black">Not provided</p>
                  </div>
                </div>
              </div>

              <button className="mt-8 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold px-6 py-3 rounded-sm flex items-center gap-2 transition-colors">
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-6">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Quick Links</h3>
              <nav className="space-y-3">
                <Link
                  href="/products"
                  className="block text-gray-700 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  → Continue Shopping
                </Link>
                <Link
                  href="#"
                  className="block text-gray-700 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  → My Orders
                </Link>
                <Link
                  href="#"
                  className="block text-gray-700 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  → Wishlist
                </Link>
                <Link
                  href="#"
                  className="block text-gray-700 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  → Settings
                </Link>
              </nav>
            </div>

            <div className="bg-[#D4AF37]/10 border border-[#D4AF37] rounded-sm p-6">
              <h3 className="text-lg font-bold text-[#D4AF37] mb-2">Member Benefits</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Fast delivery options</li>
                <li>✓ Exclusive member discounts</li>
                <li>✓ Early access to new items</li>
                <li>✓ Priority customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
