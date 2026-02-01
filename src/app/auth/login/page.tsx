'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { loginUser } from '@/app/actions/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email);

      if (!result.success || !result.user) {
        setError('Email or password is incorrect');
        setLoading(false);
        return;
      }

      const user = result.user;

      // Basic password comparison (in production, use bcrypt)
      if (user.password !== password) {
        setError('Email or password is incorrect');
        setLoading(false);
        return;
      }

      // Store user in localStorage (in production, use secure HTTP-only cookies)
      localStorage.setItem('user', JSON.stringify({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }));

      // Redirect to profile or dashboard
      router.push('/profile');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Login to Your Account</h2>
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#D4AF37] hover:text-[#b39023] transition-colors font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              required
              disabled={loading}
            />
          </div>
          <Link href="/auth/forgot-password" className="text-xs text-gray-500 hover:text-[#D4AF37] transition-colors mt-2 inline-block">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold py-3 rounded-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">New to Fashion Frenzy?</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <Link
        href="/auth/signup"
        className="w-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-bold py-3 rounded-md uppercase tracking-widest transition-all duration-300 block text-center"
      >
        Create Account
      </Link>
    </div>
  );
}
