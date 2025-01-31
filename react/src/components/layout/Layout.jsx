// src/components/layout/Layout.jsx
import Navbar from './Navbar';
import React from 'react';

export default function Layout({ children, fullWidth = false }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className={`${fullWidth ? 'w-19/20' : 'max-w-7xl'} mx-auto py-6 sm:px-6 lg:px-8`}>
        {children}
      </main>
    </div>
  );
}