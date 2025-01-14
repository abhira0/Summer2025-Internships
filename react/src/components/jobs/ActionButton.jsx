// src/components/jobs/ActionButton.jsx
import React from 'react';

export function ActionButton({ onClick, icon, label, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-400 hover:text-white transition-colors duration-150 ease-in-out rounded-full
      hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${className}`}
      title={label}
    >
      {icon}
    </button>
  );
}

// Add these styles to your CSS
const tooltipStyles = `
  .tooltip-cell {
    position: relative;
  }

  .tooltip-content {
    position: absolute;
    z-index: 50;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease;
    background-color: #1f2937;
    color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    max-width: 24rem;
    white-space: normal;
    word-break: break-word;
  }

  .tooltip-cell:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }

  .table-cell-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// Add a style tag to your HTML
const style = document.createElement('style');
style.textContent = tooltipStyles;
document.head.appendChild(style);