// src/components/common/TableHeader.jsx
import React from 'react';
import { Icons } from './Icons';

export default function TableHeader({ 
  column, 
  label, 
  sortable = false,
  sortConfig,
  onSort
}) {
  const isSorted = sortConfig?.column === column;
  const sortOrder = isSorted ? sortConfig.order : null;

  return (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
        sortable ? 'cursor-pointer hover:bg-gray-700' : ''
      }`}
      onClick={sortable ? () => onSort(column) : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortable && (
          <span className="text-gray-400">
            {sortOrder === 'asc' ? <Icons.SortAsc /> : 
             sortOrder === 'desc' ? <Icons.SortDesc /> : 
             <Icons.Sort />}
          </span>
        )}
      </div>
    </th>
  );
}