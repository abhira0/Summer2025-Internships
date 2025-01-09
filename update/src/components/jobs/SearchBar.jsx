// src/components/jobs/SearchBar.jsx
import React, { useState } from 'react';

export default function SearchBar({
  onSearch,
  searchInFiltered,
  setSearchInFiltered
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for internships..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="searchFiltered"
          checked={searchInFiltered}
          onChange={(e) => setSearchInFiltered(e.target.checked)}
          className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="searchFiltered" className="text-gray-300">
          Search in filtered results only
        </label>
      </div>
    </div>
  );
}