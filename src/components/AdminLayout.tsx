import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut,
  Users,
  ShoppingBag,
  LayoutDashboard,
  Package,
  MessageSquare,
  CreditCard,
  Shield,
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#2874f0] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8" />
                <span className="text-xl font-bold">Flipkart Admin</span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/admin/users"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/users')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
                <Link
                  to="/admin/products"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/products')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </Link>
                <Link
                  to="/admin/reviews"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/reviews')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Reviews</span>
                </Link>
                <Link
                  to="/admin/payments"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/payments')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </Link>
                <Link
                  to="/admin/roles"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin/roles')
                      ? 'bg-[#1967d2] text-white'
                      : 'text-white hover:bg-[#1967d2]'
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span>Roles</span>
                </Link>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 hover:bg-[#1967d2] px-3 py-2 rounded"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}