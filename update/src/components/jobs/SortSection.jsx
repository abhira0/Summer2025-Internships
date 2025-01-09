// src/components/jobs/SortSection.jsx
import React, { useState } from 'react';
import SortModal from './SortModal';
import { IconButton } from '../common/IconButton';
import { Icons } from '../common/Icons';
import config from '../../config';

export default function SortSection({ activeSorts, setActiveSorts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSort, setEditingSort] = useState(null);

  const removeSort = (index) => {
    setActiveSorts(sorts => sorts.filter((_, i) => i !== index));
  };

  const editSort = (sort, index) => {
    setEditingSort({ sort, index });
    setIsModalOpen(true);
  };

  const resetToDefault = () => {
    setActiveSorts(config.defaults.sorts);
  };

  const clearAll = () => {
    setActiveSorts([]);
  };

  // Handle drag and drop reordering
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (oldIndex === newIndex) return;

    setActiveSorts(sorts => {
      const newSorts = [...sorts];
      const [removed] = newSorts.splice(oldIndex, 1);
      newSorts.splice(newIndex, 0, removed);
      return newSorts;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Icons.Sort className="w-6 h-6 mr-2" />
          Sort
        </h2>
        <div className="flex gap-2">
          <IconButton
            icon={<Icons.Add />}
            label="Add Sort"
            onClick={() => {
              setEditingSort(null);
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
          {activeSorts.length > 0 && (
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
        {activeSorts.map((sort, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg text-sm cursor-move group"
          >
            <div className="flex items-center gap-1 text-gray-200">
              <span>{sort.column}</span>
              <span className="text-gray-400">
                {sort.order === 'asc' ? '↑' : '↓'}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => editSort(sort, index)}
                className="text-blue-400 hover:text-blue-300"
                title="Edit"
              >
                <Icons.Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeSort(index)}
                className="text-red-400 hover:text-red-300"
                title="Remove"
              >
                <Icons.Delete className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SortModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSort(null);
        }}
        activeSorts={activeSorts}
        setActiveSorts={setActiveSorts}
        editingSort={editingSort}
      />
    </div>
  );
}