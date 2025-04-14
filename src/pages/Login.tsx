import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login credentials
    if (email === 'sahaneomkar311@gmail.com' && password === 'admin123') {
      toast.success('Welcome back!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2874f0] to-[#1967d2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-[#2874f0] text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold">Flipkart Admin</h2>
          <p className="text-sm opacity-80">Manage your store with ease</p>
        </div>
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                  placeholder="Enter your email-address "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-transparent"
                  placeholder="Enter your password.."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#fb641b] text-white py-3 px-4 rounded-md hover:bg-[#f85b0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fb641b] font-medium"
              >
                Sign in to Dashboard
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
}