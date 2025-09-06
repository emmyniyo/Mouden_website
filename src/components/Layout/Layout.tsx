import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '../../contexts/AuthContext';

export const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show header if user is not logged in OR if not on admin routes */}
      {!user || !isAdminRoute ? <Header /> : null}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Only show footer if user is not logged in OR if not on admin routes */}
      {!user || !isAdminRoute ? <Footer /> : null}
    </div>
  );
};