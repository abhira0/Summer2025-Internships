// src/components/jobs/FilterSection.jsx
import React, { useState } from 'react';
import FilterModal from './FilterModal';
import config from '../../config';

export default function FilterSection({ activeFilters, setActiveFilters }) {
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

  const resetToDefault = () => {
    setActiveFilters(config.defaults.filters);
  };

  const clearAll = () => {
    setActiveFilters([]);
  };

  const getFilterDisplay = (filter) => {
    switch (filter.column) {
      case 'date':
        return `${filter.column}: ${filter.fromDate || 'Any'} → ${filter.toDate || 'Any'}`;
      
      case 'applied':
      case 'active':
      case 'hidden':
        return `${filter.column}: ${filter[filter.column] ? 'Yes' : 'No'}`;
      
      default:
        if (!filter.conditions) return filter.column;
        
        const conditions = filter.conditions.map(c => 
          `${c.type} "${c.value}"`
        ).join(` ${filter.conditionType} `);
        
        return `${filter.column}: ${conditions}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setEditingFilter(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Filter
        </button>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Reset to Default
        </button>
        {activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => duplicateFilter(filter)}
                className="text-green-400 hover:text-green-300"
                title="Duplicate"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => removeFilter(index)}
                className="text-red-400 hover:text-red-300"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

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