// src/components/jobs/FilterSection.jsx
import React, { useState } from 'react';
import FilterModal from './FilterModal';
import { IconButton } from '../common/IconButton';
import { Icons } from '../common/Icons';
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Icons.Filter className="w-6 h-6 mr-2" />
          Filters
        </h2>
        <div className="flex gap-2">
          <IconButton
            icon={<Icons.Add />}
            label="Add Filter"
            onClick={() => {
              setEditingFilter(null);
              setIsModalOpen(true);
            }}
            variant="primary"
          />
          <IconButton
            icon={<Icons.Reset />}
            label="Reset to Default"
            onClick={resetToDefault}
            variant="success"
          />
          {activeFilters.length > 0 && (
            <IconButton
              icon={<Icons.Clear />}
              label="Clear All"
              onClick={clearAll}
              variant="danger"
            />
          )}
        </div>
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
                <Icons.Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => duplicateFilter(filter)}
                className="text-green-400 hover:text-green-300"
                title="Duplicate"
              >
                <Icons.Duplicate className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeFilter(index)}
                className="text-red-400 hover:text-red-300"
                title="Remove"
              >
                <Icons.Delete className="w-4 h-4" />
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