// src/components/jobs/FilterSection.jsx
import React, { useState } from 'react';
import FilterModal from './FilterModal';

export default function FilterSection({ activeFilters, setActiveFilters, filteredCount, totalCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);

  const removeFilter = (index) => {
    setActiveFilters(filters => filters.filter((_, i) => i !== index));
  };

  const editFilter = (filter, index) => {
    setEditingFilter({ filter, index });
    setIsModalOpen(true);
  };

  const duplicateFilter = (filter) => {
    setActiveFilters(filters => [...filters, { ...filter }]);
  };

  const getFilterSymbol = (type) => {
    switch (type) {
      case 'contains': return '⊇';
      case 'equals': return '=';
      case 'not-equals': return '≠';
      case 'not-contains': return '⊉';
      case 'regex': return '~';
      case 'not-regex': return '≁';
      default: return type;
    }
  };

  const getFilterDisplay = (filter) => {
    switch (filter.column) {
      case 'date':
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            <span className="text-gray-400"> ∈ [</span>
            <span className="text-green-400">{filter.fromDate || '-∞'}</span>
            <span className="text-gray-400">, </span>
            <span className="text-green-400">{filter.toDate || '∞'}</span>
            <span className="text-gray-400">]</span>
          </span>
        );
      
      case 'applied':
      case 'active':
      case 'hidden':
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            <span className="text-gray-400"> = </span>
            <span className="text-green-400">{filter[filter.column] ? '✓' : '✗'}</span>
          </span>
        );
      
      default:
        if (!filter.conditions) return filter.column;
        
        const conditions = filter.conditions.map((c, i) => (
          <span key={i}>
            {i > 0 && (
              <span className="text-yellow-400">
                {' '}
                {filter.conditionType === 'AND' ? '∧' : '∨'}
                {' '}
              </span>
            )}
            <span className="text-gray-400">{getFilterSymbol(c.type)}</span>
            <span className="text-green-400"> "{c.value}"</span>
          </span>
        ));
        
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            {' '}
            {conditions}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg text-sm"
          >
            <span className="text-gray-200">{getFilterDisplay(filter)}</span>
            <div className="flex gap-1">
              <button
                onClick={() => editFilter(filter, index)}
                className="text-blue-400 hover:text-blue-300"
                title="Edit"
              >
                Edit
              </button>
              <button
                onClick={() => duplicateFilter(filter)}
                className="text-green-400 hover:text-green-300"
                title="Duplicate"
              >
                Copy
              </button>
              <button
                onClick={() => removeFilter(index)}
                className="text-red-400 hover:text-red-300"
                title="Remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setEditingFilter(null);
          setIsModalOpen(true);
        }}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Filter
      </button>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFilter(null);
        }}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        editingFilter={editingFilter}
      />
    </div>
  );
}