// src/components/jobs/SortSection.jsx
import React, { useState } from 'react';
import SortModal from './SortModal';

const SortSection = ({ activeSorts, setActiveSorts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSort, setEditingSort] = useState(null);

  const removeSort = (index) => {
    setActiveSorts(activeSorts.filter((_, i) => i !== index));
  };

  const editSort = (sort, index) => {
    setEditingSort({ sort, index });
    setIsModalOpen(true);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newSorts = [...activeSorts];
    const [removed] = newSorts.splice(oldIndex, 1);
    newSorts.splice(newIndex, 0, removed);
    setActiveSorts(newSorts);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setEditingSort(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Sort
        </button>
        {activeSorts.length > 0 && (
          <button
            onClick={() => setActiveSorts([])}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {activeSorts.map((sort, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded cursor-move"
          >
            <span className="text-white">
              {sort.column} ({sort.order === 'asc' ? '↑' : '↓'})
            </span>
            <button
              onClick={() => editSort(sort, index)}
              className="text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => removeSort(index)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
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
};

export default SortSection;

