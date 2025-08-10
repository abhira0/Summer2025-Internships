// src/components/jobs/SortModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function SortModal({
  isOpen,
  onClose,
  activeSorts,
  setActiveSorts,
  editingSort
}) {
  const [column, setColumn] = useState('company_name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    if (editingSort) {
      const { sort } = editingSort;
      setColumn(sort.column);
      setOrder(sort.order);
    } else {
      setColumn('company_name');
      setOrder('asc');
    }
  }, [editingSort]);

  const handleApply = () => {
    const newSort = { column, order };

    if (editingSort) {
      const newSorts = [...activeSorts];
      newSorts[editingSort.index] = newSort;
      setActiveSorts(newSorts);
    } else {
      setActiveSorts([...activeSorts, newSort]);
    }

    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingSort ? 'Edit Sort' : 'Add Sort'}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Column
          </label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="company_name">Company Name</option>
            <option value="title">Job Title</option>
            <option value="locations">Location</option>
            <option value="date_posted">Date Updated</option>
            <option value="active">Status</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Order
          </label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingSort ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </Modal>
  );
}