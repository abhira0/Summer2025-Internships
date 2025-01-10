// src/components/jobs/SortSection.jsx
import React, { useState } from 'react';
import SortModal from './SortModal';
import { Icons } from '../common/Icons';
import { IconButton } from '../common/IconButton';

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
        {activeSorts.map((sort, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg text-sm cursor-move"
          >
            <div className="text-gray-200">
              {sort.column}
              <span className="ml-1 text-gray-400">
                {sort.order === 'asc' ? '↑' : '↓'}
              </span>
            </div>
            <div className="flex gap-1">
              <IconButton
                icon={<Icons.Edit />}
                label="Edit"
                onClick={() => editSort(sort, index)}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Delete />}
                label="Remove"
                onClick={() => removeSort(index)}
                variant="danger"
                size="sm"
              />
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