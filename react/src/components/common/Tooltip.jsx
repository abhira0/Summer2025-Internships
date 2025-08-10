// src/components/common/Tooltip.jsx
import React from 'react';

export function Tooltip({ children, content, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="hidden group-hover:block absolute z-50 p-2 bg-gray-900 text-white text-sm rounded shadow-lg whitespace-normal max-w-xs">
        {content}
      </div>
    </div>
  );
}

