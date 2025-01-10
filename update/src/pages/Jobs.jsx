// src/pages/Jobs.jsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import JobsTable from '../components/jobs/JobsTable';
import SearchBar from '../components/jobs/SearchBar';
import FilterSection from '../components/jobs/FilterSection';
import SortSection from '../components/jobs/SortSection';
import FilterModal from '../components/jobs/FilterModal';
import SortModal from '../components/jobs/SortModal';
import { Icons } from '../components/common/Icons';
import { useJobs } from '../hooks/useJobs';
import { useTableManager } from '../hooks/useTableManager';
import config from '../config';
import { IconButton } from '../components/common/IconButton';

export default function Jobs() {
  const { jobs, loading } = useJobs();
  const {
    paginatedData,
    pageSize,
    setPageSize,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    searchQuery,
    setSearchQuery,
    searchInFiltered,
    setSearchInFiltered,
    activeFilters,
    setActiveFilters,
    activeSorts,
    setActiveSorts,
    resetFilters,
    resetSorts,
    clearAll,
    totalCount,
    searchedData
  } = useTableManager(jobs, config);

  // Collapsible sections state
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isSortsOpen, setIsSortsOpen] = useState(true);
  
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);
  const [editingSort, setEditingSort] = useState(null);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="text-gray-400">Loading internships...</span>
          </div>
        </div>
      </Layout>
    );
  }

  // Header actions
  const renderActions = (type) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={type === 'Filter' ? resetFilters : resetSorts}
        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
        title={`Reset ${type}`}
      >
        <Icons.Reset className="w-5 h-5" />
      </button>
      <button
        onClick={type === 'Filter' ? () => setActiveFilters([]) : () => setActiveSorts([])}
        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
        title={`Clear ${type}`}
      >
        <Icons.Clear className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Search className="w-6 h-6 mr-2" />
              Search
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {searchQuery ? `Found ${searchedData.length} matches` : `${totalCount} total jobs`}
              </span>
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isSearchOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isSearchOpen && (
            <div className="p-6 pt-2">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                searchInFiltered={searchInFiltered}
                setSearchInFiltered={setSearchInFiltered}
              />
            </div>
          )}
        </section>

        {/* Filter Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Filter className="w-6 h-6 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Icons.Add />}
                label="Add Filter"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFilter(null);
                  setFilterModalOpen(true);
                }}
                variant="success"
                size="sm"
              />
              <IconButton
                icon={<Icons.Reset />}
                label="Reset Filters"
                onClick={(e) => {
                  e.stopPropagation();
                  resetFilters();
                }}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Clear />}
                label="Clear Filters"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFilters([]);
                }}
                variant="danger"
                size="sm"
              />
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isFiltersOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isFiltersOpen && (
            <div className="p-6 pt-2">
<FilterSection 
  activeFilters={activeFilters}
  setActiveFilters={setActiveFilters}
  filterModalOpen={filterModalOpen}
  setFilterModalOpen={setFilterModalOpen}
  editingFilter={editingFilter}
  setEditingFilter={setEditingFilter}
/>

            </div>
          )}
        </section>

        {/* Sort Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsSortsOpen(!isSortsOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Sort className="w-6 h-6 mr-2" />
              Sort
              {activeSorts.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {activeSorts.length}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Icons.Add />}
                label="Add Sort"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSort(null);
                  setSortModalOpen(true);
                }}
                variant="success"
                size="sm"
              />
              <IconButton
                icon={<Icons.Reset />}
                label="Reset Sorts"
                onClick={(e) => {
                  e.stopPropagation();
                  resetSorts();
                }}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Clear />}
                label="Clear Sorts"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSorts([]);
                }}
                variant="danger"
                size="sm"
              />
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isSortsOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isSortsOpen && (
            <div className="p-6 pt-2">
<SortSection
  activeSorts={activeSorts} 
  setActiveSorts={setActiveSorts}
  sortModalOpen={sortModalOpen}
  setSortModalOpen={setSortModalOpen}
  editingSort={editingSort}
  setEditingSort={setEditingSort}
/>
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-white">Results</h2>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {searchedData.length} jobs
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-white rounded-md"
              >
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronLeft />
                </button>
                <span className="text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronRight />
                </button>
              </div>
            </div>
          </div>

          <JobsTable 
            jobs={paginatedData}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={goToPage}
            totalPages={totalPages}
            totalCount={searchedData.length}
            sortConfig={activeSorts[0]}
            onSort={(column) => {
              const currentSort = activeSorts.find(s => s.column === column);
              const newOrder = currentSort?.order === 'asc' ? 'desc' : 'asc';
              setActiveSorts([
                { column, order: newOrder },
                ...activeSorts.filter(s => s.column !== column)
              ]);
            }}
          />
        </section>

        <FilterModal 
        isOpen={filterModalOpen}
        onClose={() => {
          setFilterModalOpen(false);
          setEditingFilter(null);
        }}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        editingFilter={editingFilter}
      />

      <SortModal
        isOpen={sortModalOpen}
        onClose={() => {
          setSortModalOpen(false);
          setEditingSort(null);
        }}
        activeSorts={activeSorts}
        setActiveSorts={setActiveSorts}
        editingSort={editingSort}
      />

      </div>
    </Layout>
  );
}