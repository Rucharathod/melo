// pages/auth/forgot-password.js
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError('Failed to reset password: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element element-1">😊</div>
      <div className="floating-element element-2">😌</div>
      <div className="floating-element element-3">😴</div>
      <div className="floating-element element-4">🌼</div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Password Reset</h1>
            <p className="text-gray-600">Enter your email to reset your password</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white/50"
                placeholder="Enter your email"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-md"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/login">
              <a className="text-purple-600 font-medium hover:underline">
                Back to Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}