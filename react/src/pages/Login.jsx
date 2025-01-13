// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Add demo login handler
  const handleDemoLogin = async () => {
    setError('');
    try {
      await login('demo', 'demo');
      navigate('/jobs');
    } catch (err) {
      setError('Demo login failed');
      console.error('Demo login error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/jobs');
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            {/* Add demo login button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="mt-3 w-full flex justify-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Demo?
            </button>
          </div>
        </form>
        
        {/* Collapsible Sign up instructions */}
        <div className="mt-6">
          <button
            onClick={() => setShowSignup(!showSignup)}
            className="w-full text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            Want an account? 
            <svg 
              className={`w-4 h-4 transform transition-transform duration-200 ${showSignup ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showSignup && (
            <div className="mt-4 text-center animate-fade-in">
              <ol className="text-sm text-gray-400 space-y-2">
                <li>
                  1. Star the repository{' '}
                  <a 
                    href="https://github.com/abhira0/Summer2025-Internships" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    abhira0/Summer2025-Internships
                  </a>
                </li>
                <li>
                  2. Raise an issue in the repo with your username and email
                </li>
                <li>
                  3. Once approved by developers, credentials will be sent to your email
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}