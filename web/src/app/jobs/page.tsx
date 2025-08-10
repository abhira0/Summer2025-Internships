"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/config";
import type { Job } from "@/types/job";
import { ApplicationsProvider, useApplications } from "@/context/ApplicationsContext";
import { useTableManager } from "@/hooks/useTableManager";
import SearchBar from "@/components/jobs/SearchBar";
import FilterSection from "@/components/jobs/FilterSection";
import SortSection from "@/components/jobs/SortSection";
import JobsTable from "@/components/jobs/JobsTable";
// simplified URL params; no custom query language

function JobsInner() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUsername } = useApplications();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    setUsername("local");
  }, [setUsername]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(config.api.listings);
        if (!res.ok) throw new Error("Failed to fetch listings");
        const listings = await res.json();
        if (!Array.isArray(listings)) throw new Error("Invalid data format");
        const processed: Job[] = listings.map((item: any) => ({
          id: item.id,
          company_name: item.company_name,
          title: item.title,
          locations: Array.isArray(item.locations) ? item.locations.join(", ") : item.locations,
          url: item.url,
          source: item.source,
          date_posted: new Date(item.date_posted * 1000).toLocaleDateString(),
          active: item.active ?? true,
        }));
        setJobs(processed);
      } catch (e: any) {
        setError(e.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const {
    paginatedData,
    pageSize,
    setPageSize,
    page,
    totalPages,
    goToPage,
    searchQuery,
    setSearchQuery,
    searchMode,
    setSearchMode,
    searchField,
    setSearchField,
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
    searchedData,
  } = useTableManager(jobs);

  // URL → state (initial)
  useEffect(() => {
    const q = params.get("q");
    const p = params.get("page");
    const s = params.get("size");
    const scope = params.get("scope");
    const mode = params.get("mode");
    const field = params.get("field");
    if (q) setSearchQuery(q);
    if (p) (goToPage as unknown as (v: number) => void)(Number(p));
    if (s) (setPageSize as unknown as (v: number) => void)(Number(s));
    if (scope) setSearchInFiltered(scope === "filtered");
    if (mode === "fuzzy" || mode === "exact") setSearchMode(mode);
    if (field === "all" || field === "company_name" || field === "title" || field === "locations") setSearchField(field as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // state → URL (simple)
  useEffect(() => {
    const usp = new URLSearchParams();
    if (searchQuery) usp.set("q", searchQuery);
    if (page > 1) usp.set("page", String(page));
    if (pageSize !== 25) usp.set("size", String(pageSize));
    usp.set("scope", searchInFiltered ? "filtered" : "all");
    usp.set("mode", searchMode);
    usp.set("field", searchField);
    const qs = usp.toString();
    router.replace(`/jobs${qs ? `?${qs}` : ""}`);
  }, [router, searchQuery, page, pageSize, searchInFiltered, searchMode, searchField]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const n = Number(e.target.value);
    (setPageSize as unknown as (v: number) => void)(n);
  };

  if (loading) return <p className="text-sm text-muted">Loading jobs…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <section className="flex flex-col gap-6">
      {(() => {
        const filtersCount = activeFilters.length;
        const sortsCount = activeSorts.length;
        return (
          <details className="rounded-lg border border-default">
            <summary className="flex items-center justify-between cursor-pointer px-4 py-3 select-none">
              <span className="text-sm font-medium">Search & Filters</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted">Filters</span>
                <span className="rounded bg-gray-800 px-2 py-0.5 text-xs border border-default">{filtersCount}</span>
                <span className="ml-3 text-xs text-muted">Sorts</span>
                <span className="rounded bg-gray-800 px-2 py-0.5 text-xs border border-default">{sortsCount}</span>
              </span>
            </summary>
            <div className="space-y-4 px-4 pb-4 pt-2">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                mode={searchMode}
                setMode={setSearchMode}
                field={searchField}
                setField={setSearchField}
                searchInFiltered={searchInFiltered}
                setSearchInFiltered={setSearchInFiltered}
              />

              <div className="flex gap-2 flex-wrap">
                <button onClick={resetFilters} className="rounded-md border border-default px-3 py-1.5 text-sm hover:bg-white/5">Reset Filters</button>
                <button onClick={resetSorts} className="rounded-md border border-default px-3 py-1.5 text-sm hover:bg-white/5">Reset Sorts</button>
                <button onClick={clearAll} className="rounded-md border border-default px-3 py-1.5 text-sm hover:bg-white/5">Clear All</button>
                {/* Options removed: page size lives in pagination bars */}
              </div>

              <details open>
                <summary className="cursor-pointer text-sm font-medium">
                  Filters
                  <span className="ml-2 rounded bg-gray-800 px-2 py-0.5 text-xs border border-default align-middle">{filtersCount}</span>
                </summary>
                <div className="mt-3">
                  <FilterSection activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
                </div>
              </details>
              <details open>
                <summary className="cursor-pointer text-sm font-medium">
                  Sort
                  <span className="ml-2 rounded bg-gray-800 px-2 py-0.5 text-xs border border-default align-middle">{sortsCount}</span>
                </summary>
                <div className="mt-3">
                  <SortSection activeSorts={activeSorts} setActiveSorts={setActiveSorts} />
                </div>
              </details>
            </div>
          </details>
        );
      })()}
      

      <JobsTable
        jobs={paginatedData}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={goToPage}
        onPageSizeChange={(n) => (setPageSize as unknown as (v: number) => void)(n)}
        totalPages={totalPages}
        totalCount={searchedData.length}
        activeSorts={activeSorts}
        setActiveSorts={setActiveSorts}
        searchQuery={searchQuery}
      />

      
    </section>
  );
}

export default function JobsPage() {
  return (
    <ApplicationsProvider>
      <JobsInner />
    </ApplicationsProvider>
  );
}

