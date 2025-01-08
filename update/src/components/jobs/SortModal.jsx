// src/components/jobs/SortModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const SortModal = ({
  isOpen,
  onClose,
  activeSorts,
  setActiveSorts,
  editingSort
}) => {
  const [column, setColumn] = useState('company');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    if (editingSort) {
      const { sort } = editingSort;
      setColumn(sort.column);
      setOrder(sort.order);
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add Sort">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Column</label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
          >
            <option value="company">Company</option>
            <option value="role">Role</option>
            <option value="location">Location</option>
            <option value="date">Date Posted</option>
            <option value="applied">Applied</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Order</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
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
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SortModal;
