// src/components/common/IconButton.jsx
import React from 'react';

export const IconButton = ({ 
  icon, 
  label, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full focus:outline-none transition-colors duration-150 ease-in-out';
  
  const variantClasses = {
    default: 'text-gray-400 hover:text-white hover:bg-gray-700',
    primary: 'text-blue-400 hover:text-white hover:bg-blue-700',
    danger: 'text-red-400 hover:text-white hover:bg-red-700',
    success: 'text-green-400 hover:text-white hover:bg-green-700'
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
};
