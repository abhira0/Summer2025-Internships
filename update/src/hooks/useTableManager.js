// src/hooks/useTableManager.js
import { useState, useMemo, useCallback, useRef } from 'react';
import { applyFilters } from '../utils/filters';
import { applySorts } from '../utils/sorts';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

export function useTableManager(initialData, config) {
  const { user } = useAuth();
  const { getApplicationStatus } = useApplications();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(config.defaults.pagination.itemsPerPage);
  const [activeFilters, setActiveFilters] = useState(config.defaults.filters);
  const [activeSorts, setActiveSorts] = useState(config.defaults.sorts);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInFiltered, setSearchInFiltered] = useState(true);
  
  // Debounce search
  const searchTimeoutRef = useRef(null);
  const debouncedSetSearchQuery = useCallback((query) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(query);
      setPage(1); // Reset to first page on new search
    }, 300);
  }, []);
  // Apply filters
  const filteredData = useMemo(() => {
    if (!initialData || !Array.isArray(initialData)) return [];
    return applyFilters(initialData, activeFilters, getApplicationStatus, user?.username);
  }, [initialData, activeFilters, getApplicationStatus, user?.username]);

  // Apply search
  const searchedData = useMemo(() => {
    if (!searchQuery) {
      return searchInFiltered ? filteredData : initialData;
    }

    const dataToSearch = searchInFiltered ? filteredData : initialData;
    const query = searchQuery.toLowerCase();

    return dataToSearch.filter(item => {
      const searchFields = [
        item.company_name,
        item.title,
        item.locations
      ];
      return searchFields.some(field => 
        String(field).toLowerCase().includes(query)
      );
    });
  }, [initialData, filteredData, searchQuery, searchInFiltered]);

  // Apply sorting
  const sortedData = useMemo(() => {
    return applySorts(searchedData, activeSorts);
  }, [searchedData, activeSorts]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, page, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Navigation
  const goToPage = useCallback((newPage) => {
    setPage(Math.min(Math.max(1, newPage), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  // Reset
  const resetFilters = useCallback(() => {
    setActiveFilters(config.defaults.filters);
    setPage(1);
  }, [config.defaults.filters]);

  const resetSorts = useCallback(() => {
    setActiveSorts(config.defaults.sorts);
    setPage(1);
  }, [config.defaults.sorts]);

  const clearAll = useCallback(() => {
    setActiveFilters([]);
    setActiveSorts([]);
    setSearchQuery('');
    setPage(1);
  }, []);

  return {
    // Data
    filteredData,
    searchedData,
    sortedData,
    paginatedData,
    
    // Pagination
    page,
    pageSize,
    totalPages,
    setPageSize,
    goToPage,
    nextPage,
    prevPage,
    
    // Filters
    activeFilters,
    setActiveFilters,
    resetFilters,
    
    // Sorts
    activeSorts,
    setActiveSorts,
    resetSorts,
    
    // Search
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery,
    searchInFiltered,
    setSearchInFiltered,
    
    // Reset
    clearAll,
    
    // Stats
    totalCount: initialData.length,
    filteredCount: filteredData.length,
    displayedCount: sortedData.length
  };
}
