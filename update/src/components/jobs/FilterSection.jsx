import React, { useState } from 'react';
import FilterModal from './FilterModal';
import { Icons } from '../common/Icons';
import { IconButton } from '../common/IconButton';

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
            <IconButton
              icon={<Icons.Edit />}
              label="Edit"
              onClick={() => editFilter(filter, index)}
              variant="primary"
              size="sm"
            />
            <IconButton
              icon={<Icons.Duplicate />}
              label="Duplicate"
              onClick={() => duplicateFilter(filter)}
              variant="success"
              size="sm"
            />
            <IconButton
              icon={<Icons.Delete />}
              label="Remove"
              onClick={() => removeFilter(index)}
              variant="danger"
              size="sm"
            />
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