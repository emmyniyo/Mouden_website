import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Documents } from './pages/Documents';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Profile } from './pages/admin/Profile';
import { MemberDirectory } from './pages/MemberDirectory';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { DocumentManagement } from './pages/admin/DocumentManagement';
import { NewsManagement } from './pages/admin/NewsManagement';
import { RegistrationApproval } from './pages/admin/RegistrationApproval';

// Main application component with routing and authentication context

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes (outside layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Main routes (with layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<News />} />
            <Route path="documents" element={<Documents />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="members"
              element={
                <ProtectedRoute>
                  <MemberDirectory />
                </ProtectedRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRoles={['admin', 'editor']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/registration-approval"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <RegistrationApproval />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/documents"
              element={
                <ProtectedRoute requiredRoles={['admin', 'editor']}>
                  <DocumentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/news"
              element={
                <ProtectedRoute requiredRoles={['admin', 'editor']}>
                  <NewsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;