// src/components/jobs/SortSection.jsx
import React, { useState } from 'react';
import SortModal from './SortModal';
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
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setEditingSort(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Sort
        </button>
        <button
          onClick={resetToDefault}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Reset to Default
        </button>
        {activeSorts.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => removeSort(index)}
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