import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import MobileNav from './MobileNav';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Job Tracker
            </Link>
            <div className="hidden lg:flex lg:items-center lg:ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/jobs"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Jobs
                </Link>
                <Link
                  to="/analytics"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Analytics
                </Link>
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center">
            {user && (
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                hi, {user.username}
              </Link>
            )}
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}