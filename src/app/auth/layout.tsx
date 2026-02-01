import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-[#D4AF37] tracking-widest">
              FASHION FRENZY
            </h1>
          </Link>
          <p className="text-gray-500 text-sm mt-2 tracking-wide font-medium">
            Luxury Fashion Redefined
          </p>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-8">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 Fashion Frenzy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
