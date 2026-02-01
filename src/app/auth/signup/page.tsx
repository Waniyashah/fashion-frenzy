'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { signupUser } from '@/app/actions/auth';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await signupUser(formData);

      if (!result.success) {
        setError(result.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Store user in localStorage
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      }

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-[#D4AF37]" />
        </div>
        <h3 className="text-2xl font-bold text-[#D4AF37]">Welcome to Fashion Frenzy!</h3>
        <p className="text-gray-400">
          Your account has been created successfully. Redirecting you to your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Create Your Account</h2>
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#D4AF37] hover:text-[#b39023] transition-colors font-semibold">
            Login
          </Link>
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors text-sm"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors text-sm"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-2 uppercase tracking-widest">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
              disabled={loading}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2 text-xs text-gray-500 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 accent-[#D4AF37] cursor-pointer"
            required
            disabled={loading}
          />
          <label htmlFor="terms" className="cursor-pointer">
            I agree to the{' '}
            <Link href="#" className="text-[#D4AF37] hover:text-[#b39023] transition-colors font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-[#D4AF37] hover:text-[#b39023] transition-colors font-medium">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold py-3 rounded-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
}
