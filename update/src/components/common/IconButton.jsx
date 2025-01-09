// src/components/common/IconButton.jsx
import React from 'react';
import { Tooltip } from './Tooltip';

export const IconButton = ({ 
  icon, 
  label, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
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

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const button = (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
      type="button"
      aria-label={label}
    >
      {icon}
    </button>
  );

  if (label) {
    return (
      <Tooltip content={label}>
        {button}
      </Tooltip>
    );
  }

  return button;
};