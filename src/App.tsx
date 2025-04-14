import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import ManageAdmins from './pages/ManageAdmins';
import ManageProducts from './pages/ManageProducts';
import ManageReviews from './pages/ManageReviews';
import PaymentAnalytics from './pages/PaymentAnalytics';
import RoleManagement from './pages/RoleManagement';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<ManageAdmins />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="payments" element={<PaymentAnalytics />} />
            <Route path="roles" element={<RoleManagement />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;