// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { SimplifyProvider } from './context/SimplifyContext';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SimplifyProvider>
          <ApplicationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/jobs" replace />} />
            </Routes>
          </ApplicationProvider>
        </SimplifyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;