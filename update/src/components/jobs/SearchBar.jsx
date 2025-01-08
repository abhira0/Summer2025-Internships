// src/components/jobs/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="my-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for internships..."
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => onChange('')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

