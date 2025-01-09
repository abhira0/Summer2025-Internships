// src/pages/Jobs.jsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import JobsTable from '../components/jobs/JobsTable';
import SearchBar from '../components/jobs/SearchBar';
import FilterSection from '../components/jobs/FilterSection';
import SortSection from '../components/jobs/SortSection';
import { useJobs } from '../hooks/useJobs';
import { applyFilters } from '../utils/filters';
import { applySorts } from '../utils/sorts';
import config from '../config';

export default function Jobs() {
  const { jobs, loading } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(config.defaults.filters);
  const [activeSorts, setActiveSorts] = useState(config.defaults.sorts);
  const [searchInFiltered, setSearchInFiltered] = useState(true);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  // Apply filters and sorts
  let filteredJobs = applyFilters(jobs, activeFilters);
  filteredJobs = applySorts(filteredJobs, activeSorts);

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredJobs = filteredJobs.filter(job => {
      const searchText = [
        job.company_name,
        job.title,
        job.locations,
      ].join(' ').toLowerCase();
      return searchText.includes(query);
    });
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Search</h2>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            searchInFiltered={searchInFiltered}
            setSearchInFiltered={setSearchInFiltered}
          />
        </section>

        <section className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <FilterSection
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </section>

        <section className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Sort</h2>
          <SortSection
            activeSorts={activeSorts}
            setActiveSorts={setActiveSorts}
          />
        </section>

        <section className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Internships</h2>
            <div className="text-gray-400">
              Total Results: {filteredJobs.length}
            </div>
          </div>
          <JobsTable jobs={filteredJobs} />
        </section>
      </div>
    </Layout>
  );
}