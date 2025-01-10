// src/pages/Jobs.jsx
import React from 'react';
import Layout from '../components/layout/Layout';
import JobsTable from '../components/jobs/JobsTable';
import SearchBar from '../components/jobs/SearchBar';
import FilterSection from '../components/jobs/FilterSection';
import SortSection from '../components/jobs/SortSection';
import { IconButton } from '../components/common/IconButton';
import { Icons } from '../components/common/Icons';
import { useJobs } from '../hooks/useJobs';
import { useTableManager } from '../hooks/useTableManager';
import config from '../config';

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
    filteredCount,
    searchedData
  } = useTableManager(jobs, config);

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

  return (
    <Layout>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Search</h2>
            <span className="text-sm text-gray-400">
              {searchQuery ? `Found ${searchedData.length} matches` : `${totalCount} total jobs`}
            </span>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            searchInFiltered={searchInFiltered}
            setSearchInFiltered={setSearchInFiltered}
          />
        </section>

        {/* Filter Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <FilterSection
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            filteredCount={searchedData.length}
            totalCount={totalCount}
          />
          {activeFilters.length > 0 && (
            <div className="mt-2 text-sm text-gray-400">
              Showing {filteredCount} of {totalCount} jobs
            </div>
          )}
        </section>

        {/* Sort Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <SortSection
            activeSorts={activeSorts}
            setActiveSorts={setActiveSorts}
          />
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
                  onClick={() => prevPage()}
                  disabled={page === 1}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => nextPage()}
                  disabled={page === totalPages}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
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
      </div>
    </Layout>
  );
}