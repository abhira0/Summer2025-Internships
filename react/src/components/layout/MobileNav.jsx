import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-400 hover:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 shadow-lg py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/jobs"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Jobs
            </Link>
            <Link
              to="/analytics"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Analytics
            </Link>
            {user && (
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Profile
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}