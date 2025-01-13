// src/components/common/ErrorBoundary.jsx

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-white">Something went wrong.</h1>
            <p className="text-gray-400 mt-4">Please try refreshing the page or contact support.</p>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
