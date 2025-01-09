// src/components/jobs/FilterModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function FilterModal({
  isOpen,
  onClose,
  activeFilters,
  setActiveFilters,
  editingFilter
}) {
  const [column, setColumn] = useState('company');
  const [conditions, setConditions] = useState([{ type: 'contains', value: '' }]);
  const [conditionType, setConditionType] = useState('OR');
  const [dateRange, setDateRange] = useState({ fromDate: '', toDate: '' });
  const [booleanValue, setBooleanValue] = useState(true);

  useEffect(() => {
    if (editingFilter) {
      const { filter } = editingFilter;
      setColumn(filter.column);
      if (filter.column === 'date') {
        setDateRange({ fromDate: filter.fromDate || '', toDate: filter.toDate || '' });
      } else if (['applied', 'active', 'hidden'].includes(filter.column)) {
        setBooleanValue(filter[filter.column]);
      } else if (filter.conditions) {
        setConditions(filter.conditions);
        setConditionType(filter.conditionType || 'OR');
      }
    } else {
      // Reset form when adding new filter
      setColumn('company');
      setConditions([{ type: 'contains', value: '' }]);
      setConditionType('OR');
      setDateRange({ fromDate: '', toDate: '' });
      setBooleanValue(true);
    }
  }, [editingFilter]);

  const handleApply = () => {
    let newFilter = { column };

    if (column === 'date') {
      newFilter = { ...newFilter, ...dateRange };
    } else if (['applied', 'active', 'hidden'].includes(column)) {
      newFilter[column] = booleanValue;
    } else {
      newFilter.conditions = conditions;
      newFilter.conditionType = conditionType;
    }

    if (editingFilter) {
      const newFilters = [...activeFilters];
      newFilters[editingFilter.index] = newFilter;
      setActiveFilters(newFilters);
    } else {
      setActiveFilters([...activeFilters, newFilter]);
    }

    onClose();
  };

  const addCondition = () => {
    setConditions([...conditions, { type: 'contains', value: '' }]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Filter">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Column
          </label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
          >
            <option value="company">Company</option>
            <option value="role">Role</option>
            <option value="location">Location</option>
            <option value="date">Date Posted</option>
            <option value="applied">Applied</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        {column === 'date' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={dateRange.fromDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, fromDate: e.target.value })
                }
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={dateRange.toDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, toDate: e.target.value })
                }
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              />
            </div>
          </div>
        ) : ['applied', 'active', 'hidden'].includes(column) ? (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Value
            </label>
            <select
              value={booleanValue.toString()}
              onChange={(e) => setBooleanValue(e.target.value === 'true')}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Condition Type
              </label>
              <select
                value={conditionType}
                onChange={(e) => setConditionType(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              >
                <option value="OR">OR</option>
                <option value="AND">AND</option>
              </select>
            </div>

            {conditions.map((condition, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={condition.type}
                  onChange={(e) => updateCondition(index, 'type', e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
                >
                  <option value="contains">Contains</option>
                  <option value="equals">Equals</option>
                  <option value="not-equals">Not Equals</option>
                  <option value="not-contains">Not Contains</option>
                  <option value="regex">Regex</option>
                  <option value="not-regex">Not Regex</option>
                </select>
                <input
                  type="text"
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(index, 'value', e.target.value)
                  }
                  className="flex-1 bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
                />
                <button
                  onClick={() => addCondition()}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  +
                </button>
                {conditions.length > 1 && (
                  <button
                    onClick={() => removeCondition(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

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
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}