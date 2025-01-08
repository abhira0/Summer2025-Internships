// src/components/jobs/FilterSection.jsx
import React, { useState } from 'react';
import FilterModal from './FilterModal';

const FilterSection = ({ activeFilters, setActiveFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);

  const removeFilter = (index) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
  };

  const editFilter = (filter, index) => {
    setEditingFilter({ filter, index });
    setIsModalOpen(true);
  };

  const duplicateFilter = (filter) => {
    setActiveFilters([...activeFilters, { ...filter }]);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setEditingFilter(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Filter
        </button>
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded"
          >
            <span className="text-white">{filter.column}</span>
            <button
              onClick={() => editFilter(filter, index)}
              className="text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => duplicateFilter(filter)}
              className="text-green-400 hover:text-green-300"
            >
              Copy
            </button>
            <button
              onClick={() => removeFilter(index)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
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
};

export default FilterSection;

